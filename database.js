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

function addNews(title, content, category, createdAt) {
  if (createdAt) {
    return query('INSERT INTO news (title, content, category, created_at) VALUES (?, ?, ?, ?)', [title, content, category || 'general', createdAt]);
  }
  return query('INSERT INTO news (title, content, category) VALUES (?, ?, ?)', [title, content, category || 'general']);
}

function deleteNews(id) {
  return query('DELETE FROM news WHERE id = ?', [id]);
}

function recordVisit(ipHash, deviceType, userAgent) {
  return query('INSERT INTO visits (ip_hash, device_type, user_agent) VALUES (?, ?, ?)', [ipHash, deviceType, userAgent || '']);
}

function getStats() {
  const total = query('SELECT COUNT(*) as total FROM visits')[0].total;
  const unique = query('SELECT COUNT(DISTINCT ip_hash) as unique FROM visits')[0].unique;
  const devices = query(`
    SELECT device_type, COUNT(*) as count, ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM visits), 1) as pct
    FROM visits WHERE device_type != '' GROUP BY device_type ORDER BY count DESC
  `);
  const recent = query('SELECT * FROM visits ORDER BY created_at DESC LIMIT 10');
  return { total, unique, devices, recent };
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
  recordVisit,
  getStats
};
