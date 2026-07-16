const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const { seedDatabase } = require('./seed');

const dbPath = path.join(__dirname, 'data', 'chinitatravels.db');

let db;

function saveDb() {
  try {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  } catch (e) {
    console.error('Error saving database:', e.message);
  }
}

async function initDatabase() {
  const SQL = await initSqlJs();

  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS routes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      notes TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS flights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      route_id INTEGER NOT NULL,
      airline TEXT NOT NULL,
      flight_number TEXT,
      departure_time TEXT,
      arrival_time TEXT,
      frequency TEXT,
      notes TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS itineraries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      passenger_name TEXT NOT NULL,
      passenger_email TEXT,
      passenger_phone TEXT,
      reference_code TEXT UNIQUE NOT NULL,
      flight_details TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT DEFAULT 'general',
      is_published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS hotels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      destination TEXT NOT NULL DEFAULT 'Margarita',
      category TEXT,
      regime TEXT,
      description TEXT,
      rating REAL,
      reviews_count INTEGER DEFAULT 0,
      place_id TEXT,
      address TEXT,
      website TEXT,
      main_photo TEXT,
      notes TEXT,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS hotel_photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hotel_id INTEGER NOT NULL,
      photo_url TEXT NOT NULL,
      is_main INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS hotel_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hotel_id INTEGER NOT NULL,
      author TEXT,
      rating REAL,
      text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS hotel_rates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hotel_id INTEGER NOT NULL,
      season_name TEXT,
      date_from TEXT,
      date_to TEXT,
      rate_sgl REAL,
      rate_dbl REAL,
      rate_chd REAL,
      rate_chd2 REAL,
      min_nights INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS flight_prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      destination TEXT NOT NULL,
      origin TEXT DEFAULT 'Valencia',
      price REAL NOT NULL,
      price_chd REAL,
      notes TEXT,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  saveDb();
  seedDatabase(module.exports);
}

function query(sql, params = []) {
  const stmt = db.prepare(sql);
  if (sql.trim().toUpperCase().startsWith('SELECT') || sql.trim().toUpperCase().startsWith('WITH')) {
    stmt.bind(params);
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  } else {
    const result = stmt.run(params);
    stmt.free();
    saveDb();
    return result;
  }
}

function getAllRoutes() {
  return query('SELECT * FROM routes WHERE status = ? ORDER BY origin, destination', ['active']);
}

function getRoutesWithFlights() {
  return query(`
    SELECT r.*, COUNT(f.id) as flight_count
    FROM routes r
    LEFT JOIN flights f ON f.route_id = r.id AND f.status = 'active'
    WHERE r.status = 'active'
    GROUP BY r.id
    ORDER BY r.origin, r.destination
  `);
}

function normalizeStr(str) {
  return str.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function mapCity(name) {
  const n = normalizeStr(name);
  if (n.includes('CARACAS')) return 'VALENCIA';
  return n;
}

function searchFlights(origin, destination) {
  const o = mapCity(origin);
  const d = mapCity(destination);
  return query(`
    SELECT f.*, r.origin, r.destination, r.notes as route_notes
    FROM flights f
    JOIN routes r ON r.id = f.route_id
    WHERE f.status = 'active' AND r.status = 'active'
    ORDER BY r.origin, r.destination, f.airline
  `).filter(f => {
    return normalizeStr(f.origin).includes(o) && normalizeStr(f.destination).includes(d);
  });
}

function searchFlightsFrom(origin) {
  const o = mapCity(origin);
  return query(`
    SELECT f.*, r.origin, r.destination, r.notes as route_notes
    FROM flights f
    JOIN routes r ON r.id = f.route_id
    WHERE f.status = 'active' AND r.status = 'active'
    ORDER BY r.destination, f.airline, f.departure_time
  `).filter(f => normalizeStr(f.origin).includes(o));
}

function searchFlightsTo(destination) {
  const d = mapCity(destination);
  return query(`
    SELECT f.*, r.origin, r.destination, r.notes as route_notes
    FROM flights f
    JOIN routes r ON r.id = f.route_id
    WHERE f.status = 'active' AND r.status = 'active'
    ORDER BY r.origin, f.airline, f.departure_time
  `).filter(f => normalizeStr(f.destination).includes(d));
}

function getItineraryByCode(code) {
  const results = query('SELECT * FROM itineraries WHERE reference_code = ?', [code.toUpperCase()]);
  return results.length > 0 ? results[0] : null;
}

function getNews() {
  return query('SELECT * FROM news WHERE is_published = 1 ORDER BY created_at DESC, id DESC');
}

function addRoute(origin, destination, notes) {
  return query('INSERT INTO routes (origin, destination, notes) VALUES (?, ?, ?)', [origin.toUpperCase(), destination.toUpperCase(), notes || null]);
}

function updateRoute(id, origin, destination, notes, status) {
  return query('UPDATE routes SET origin = ?, destination = ?, notes = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [origin.toUpperCase(), destination.toUpperCase(), notes, status, id]);
}

function deleteRoute(id) {
  return query('UPDATE routes SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['inactive', id]);
}

function addFlight(routeId, airline, flightNumber, departureTime, arrivalTime, frequency, notes) {
  return query('INSERT INTO flights (route_id, airline, flight_number, departure_time, arrival_time, frequency, notes) VALUES (?, ?, ?, ?, ?, ?, ?)', [routeId, airline, flightNumber || null, departureTime || null, arrivalTime || null, frequency || null, notes || null]);
}

function updateFlight(id, airline, flightNumber, departureTime, arrivalTime, frequency, notes, status) {
  return query('UPDATE flights SET airline = ?, flight_number = ?, departure_time = ?, arrival_time = ?, frequency = ?, notes = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [airline, flightNumber, departureTime, arrivalTime, frequency, notes, status, id]);
}

function deleteFlight(id) {
  return query('UPDATE flights SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['inactive', id]);
}

function addItinerary(passengerName, passengerEmail, passengerPhone, referenceCode, flightDetails, notes) {
  return query('INSERT INTO itineraries (passenger_name, passenger_email, passenger_phone, reference_code, flight_details, notes) VALUES (?, ?, ?, ?, ?, ?)', [passengerName, passengerEmail || null, passengerPhone || null, referenceCode.toUpperCase(), flightDetails || null, notes || null]);
}

function updateItinerary(id, passengerName, passengerEmail, passengerPhone, flightDetails, notes) {
  return query('UPDATE itineraries SET passenger_name = ?, passenger_email = ?, passenger_phone = ?, flight_details = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [passengerName, passengerEmail, passengerPhone, flightDetails, notes, id]);
}

function deleteItinerary(id) {
  return query('DELETE FROM itineraries WHERE id = ?', [id]);
}

function getAllItineraries() {
  return query('SELECT * FROM itineraries ORDER BY created_at DESC');
}

function searchFlightsByAirline(airline) {
  return query(`
    SELECT f.*, r.origin, r.destination
    FROM flights f
    JOIN routes r ON r.id = f.route_id
    WHERE f.status = 'active' AND r.status = 'active'
    ORDER BY r.origin, r.destination, f.departure_time
  `).filter(f => normalizeStr(f.airline).includes(normalizeStr(airline)));
}

function searchFlightsCombined(origin, destination, airline) {
  const o = origin ? mapCity(origin) : null;
  const d = destination ? mapCity(destination) : null;
  const a = airline ? normalizeStr(airline) : null;
  return query(`
    SELECT f.*, r.origin, r.destination
    FROM flights f
    JOIN routes r ON r.id = f.route_id
    WHERE f.status = 'active' AND r.status = 'active'
    ORDER BY r.origin, r.destination, f.airline, f.departure_time
  `).filter(f => {
    if (o && !normalizeStr(f.origin).includes(o)) return false;
    if (d && !normalizeStr(f.destination).includes(d)) return false;
    if (a && !normalizeStr(f.airline).includes(a)) return false;
    return true;
  });
}

function getAirlines() {
  return query(`
    SELECT DISTINCT f.airline
    FROM flights f
    JOIN routes r ON r.id = f.route_id
    WHERE f.status = 'active' AND r.status = 'active'
    ORDER BY f.airline
  `).map(r => r.airline).filter(Boolean);
}

function getFlightsByRoute(routeId) {
  return query('SELECT * FROM flights WHERE route_id = ? AND status = ? ORDER BY airline', [routeId, 'active']);
}

function getAllFlights() {
  return query(`
    SELECT f.*, r.origin, r.destination
    FROM flights f
    JOIN routes r ON r.id = f.route_id
    WHERE f.status = 'active'
    ORDER BY r.origin, r.destination, f.airline
  `);
}

function clearAllData() {
  try {
    query('DELETE FROM flights');
    query('DELETE FROM routes');
    query('DELETE FROM news');
    query('DELETE FROM itineraries');
  } catch (e) {
    console.error('Error clearing data:', e.message);
  }
}

function clearAllDataIncludingVisits() {
  clearAllData();
  try { query('DELETE FROM visits'); } catch (e) {}
  try { query('DELETE FROM hotel_photos'); } catch (e) {}
  try { query('DELETE FROM hotel_reviews'); } catch (e) {}
  try { query('DELETE FROM hotel_rates'); } catch (e) {}
  try { query('DELETE FROM flight_prices'); } catch (e) {}
  try { query('DELETE FROM hotels'); } catch (e) {}
}

function addNews(title, content, category, createdAt) {
  if (createdAt) {
    return query('INSERT INTO news (title, content, category, created_at) VALUES (?, ?, ?, ?)', [title, content, category || 'general', createdAt]);
  }
  return query('INSERT INTO news (title, content, category) VALUES (?, ?, ?)', [title, content, category || 'general']);
}

function deleteNews(id) {
  return query('DELETE FROM news WHERE id = ?', [id]);
}

function ensureVisitsTable() {
  try { query('SELECT COUNT(*) FROM visits'); } catch (e) {
    db.run(`CREATE TABLE IF NOT EXISTS visits (id INTEGER PRIMARY KEY AUTOINCREMENT, ip_hash TEXT, device_type TEXT, user_agent TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    saveDb();
  }
}

function recordVisit(ipHash, deviceType, userAgent) {
  ensureVisitsTable();
  return query('INSERT INTO visits (ip_hash, device_type, user_agent) VALUES (?, ?, ?)', [ipHash, deviceType, userAgent || '']);
}

function getStats() {
  ensureVisitsTable();
  const total = query('SELECT COUNT(*) as total FROM visits')[0].total;
  const unique = query('SELECT COUNT(DISTINCT ip_hash) as cnt FROM visits')[0].cnt;
  const devices = query(`
    SELECT device_type, COUNT(*) as count, ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM visits), 1) as pct
    FROM visits WHERE device_type != '' GROUP BY device_type ORDER BY count DESC
  `);
  const recent = query('SELECT * FROM visits ORDER BY created_at DESC LIMIT 10');
  return { total, unique, devices, recent };
}

// ── HOTELS CRUD ──
function getHotels(destination) {
  let sql = 'SELECT * FROM hotels WHERE active = 1';
  const params = [];
  if (destination) {
    sql += ' AND destination = ?';
    params.push(destination);
  }
  sql += ' ORDER BY name';
  return query(sql, params);
}

function getHotel(id) {
  const hotels = query('SELECT * FROM hotels WHERE id = ?', [id]);
  if (!hotels.length) return null;
  const hotel = hotels[0];
  hotel.photos = query('SELECT * FROM hotel_photos WHERE hotel_id = ? ORDER BY is_main DESC', [id]);
  hotel.reviews = query('SELECT * FROM hotel_reviews WHERE hotel_id = ? ORDER BY created_at DESC', [id]);
  hotel.rates = query('SELECT * FROM hotel_rates WHERE hotel_id = ? ORDER BY date_from', [id]);
  return hotel;
}

function addHotel(name, destination, category, regime, description, rating, reviewsCount, placeId, address, website, mainPhoto, notes) {
  return query(`INSERT INTO hotels (name, destination, category, regime, description, rating, reviews_count, place_id, address, website, main_photo, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, destination || 'Margarita', category || null, regime || null, description || null, rating || null, reviewsCount || 0, placeId || null, address || null, website || null, mainPhoto || null, notes || null]);
}

function updateHotel(id, name, category, regime, description, rating, reviewsCount, address, website, notes, active) {
  return query(`UPDATE hotels SET name = ?, category = ?, regime = ?, description = ?, rating = ?, reviews_count = ?, address = ?, website = ?, notes = ?, active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [name, category, regime, description, rating, reviewsCount, address, website, notes, active, id]);
}

function deleteHotel(id) {
  return query('UPDATE hotels SET active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
}

function addHotelPhoto(hotelId, photoUrl, isMain) {
  return query('INSERT INTO hotel_photos (hotel_id, photo_url, is_main) VALUES (?, ?, ?)', [hotelId, photoUrl, isMain ? 1 : 0]);
}

function deleteHotelPhoto(id) {
  return query('DELETE FROM hotel_photos WHERE id = ?', [id]);
}

function addHotelReview(hotelId, author, rating, text) {
  return query('INSERT INTO hotel_reviews (hotel_id, author, rating, text) VALUES (?, ?, ?, ?)', [hotelId, author || null, rating || null, text]);
}

function deleteHotelReview(id) {
  return query('DELETE FROM hotel_reviews WHERE id = ?', [id]);
}

function addHotelRate(hotelId, seasonName, dateFrom, dateTo, rateSgl, rateDbl, rateChd, rateChd2, minNights) {
  return query('INSERT INTO hotel_rates (hotel_id, season_name, date_from, date_to, rate_sgl, rate_dbl, rate_chd, rate_chd2, min_nights) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [hotelId, seasonName || null, dateFrom, dateTo, rateSgl || 0, rateDbl || 0, rateChd || 0, rateChd2 || 0, minNights || 1]);
}

function updateHotelRate(id, seasonName, dateFrom, dateTo, rateSgl, rateDbl, rateChd, rateChd2, minNights) {
  return query('UPDATE hotel_rates SET season_name = ?, date_from = ?, date_to = ?, rate_sgl = ?, rate_dbl = ?, rate_chd = ?, rate_chd2 = ?, min_nights = ? WHERE id = ?',
    [seasonName, dateFrom, dateTo, rateSgl, rateDbl, rateChd, rateChd2, minNights, id]);
}

function deleteHotelRate(id) {
  return query('DELETE FROM hotel_rates WHERE id = ?', [id]);
}

function findRateForDate(hotelId, dateStr) {
  const date = new Date(dateStr);
  const rates = query(`SELECT * FROM hotel_rates WHERE hotel_id = ? AND date(date_from) <= date(?) AND date(date_to) >= date(?)`, [hotelId, dateStr, dateStr]);
  return rates.length ? rates[0] : null;
}

function calculatePackagePrice(hotelId, checkIn, checkOut, adults, children) {
  const hotel = query('SELECT * FROM hotels WHERE id = ?', [hotelId])[0];
  if (!hotel) return null;

  const checkInDate = new Date(checkIn + 'T12:00:00');
  const checkOutDate = new Date(checkOut + 'T12:00:00');
  const nights = Math.max(0, Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));

  let total = 0;
  let breakdown = [];

  for (let i = 0; i < nights; i++) {
    const d = new Date(checkInDate);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const rate = findRateForDate(hotelId, dateStr);
    if (!rate) return { error: `Sin tarifa disponible para ${dateStr}` };
    const roomRate = adults <= 1 ? rate.rate_sgl : rate.rate_dbl;
    const nightCost = roomRate + rate.rate_chd * children;
    total += nightCost;
    breakdown.push({ date: dateStr, rateName: rate.season_name, rateDbl: rate.rate_dbl, rateChd: rate.rate_chd, nightCost });
  }

  return { hotel, nights, adults, children, total, breakdown };
}

// ── FLIGHT PRICES CRUD ──
function getFlightPrices(destination) {
  let sql = 'SELECT * FROM flight_prices WHERE active = 1';
  const params = [];
  if (destination) {
    sql += ' AND destination = ?';
    params.push(destination);
  }
  sql += ' ORDER BY destination, origin';
  return query(sql, params);
}

function addFlightPrice(destination, origin, price, priceChd, notes) {
  return query('INSERT INTO flight_prices (destination, origin, price, price_chd, notes) VALUES (?, ?, ?, ?, ?)',
    [destination, origin || 'Valencia', price, priceChd || null, notes || null]);
}

function updateFlightPrice(id, price, priceChd, notes, active) {
  return query('UPDATE flight_prices SET price = ?, price_chd = ?, notes = ?, active = ? WHERE id = ?', [price, priceChd, notes, active, id]);
}

function deleteFlightPrice(id) {
  return query('UPDATE flight_prices SET active = 0 WHERE id = ?', [id]);
}

module.exports = {
  initDatabase,
  getAllRoutes,
  getRoutesWithFlights,
  searchFlights,
  searchFlightsByAirline,
  searchFlightsCombined,
  getAirlines,
  searchFlightsFrom,
  searchFlightsTo,
  getItineraryByCode,
  getNews,
  addRoute,
  updateRoute,
  deleteRoute,
  addFlight,
  updateFlight,
  deleteFlight,
  addItinerary,
  updateItinerary,
  deleteItinerary,
  getAllItineraries,
  getFlightsByRoute,
  getAllFlights,
  addNews,
  deleteNews,
  clearAllData,
  clearAllDataIncludingVisits,
  recordVisit,
  getStats,
  getHotels,
  getHotel,
  addHotel,
  updateHotel,
  deleteHotel,
  addHotelPhoto,
  deleteHotelPhoto,
  addHotelReview,
  deleteHotelReview,
  addHotelRate,
  updateHotelRate,
  deleteHotelRate,
  calculatePackagePrice,
  getFlightPrices,
  addFlightPrice,
  updateFlightPrice,
  deleteFlightPrice
};