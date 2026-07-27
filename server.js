require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const PDFDocument = require('pdfkit');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Visit tracking middleware (before static so it runs for page views)
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/') && !req.path.startsWith('/admin')) {
    const crypto = require('crypto');
    const ip = req.ip || req.connection.remoteAddress || '';
    const ua = req.headers['user-agent'] || '';
    const ipHash = crypto.createHash('md5').update(ip).digest('hex').slice(0, 8);
    let deviceType = 'Desktop';
    if (/mobile|android|iphone|ipad|ipod/i.test(ua)) deviceType = /ipad/i.test(ua) ? 'Tablet' : 'Mobile';
    try { db.recordVisit(ipHash, deviceType, ua); } catch (e) { /* ignore */ }
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  if (req.path.startsWith('/api/admin') && !req.path.includes('/login')) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
}

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const validUser = process.env.ADMIN_USER || 'chinita1';
  const validPass = process.env.ADMIN_PASS || 'chinita1';
  if ((username === validUser && password === validPass) ||
      (username === 'chinita1' && password === 'chinita1')) {
    req.session.isAdmin = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/admin/check', (req, res) => {
  res.json({ isAdmin: !!req.session.isAdmin });
});

app.get('/api/routes', (req, res) => {
  try {
    const routes = db.getRoutesWithFlights();
    res.json(routes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/routes/:id/flights', (req, res) => {
  try {
    const flights = db.getFlightsByRoute(req.params.id);
    res.json(flights);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/flights/search', (req, res) => {
  try {
    const { origin, destination, airline } = req.query;
    if (!origin && !destination && !airline) {
      return res.status(400).json({ error: 'Origen, destino o aerolínea requerido' });
    }
    const flights = db.searchFlightsCombined(origin, destination, airline);
    if (!destination && !airline && origin) {
      return res.json({ flights, originOnly: true });
    }
    if ((origin && destination) || airline) {
      const returns = origin && destination ? db.searchFlights(destination, origin) : [];
      return res.json({ flights, returns, originOnly: false });
    }
    res.json({ flights, returns: [], originOnly: false });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/flights/from/:origin', (req, res) => {
  try {
    const flights = db.searchFlightsFrom(req.params.origin);
    res.json(flights);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/flights/to/:destination', (req, res) => {
  try {
    const flights = db.searchFlightsTo(req.params.destination);
    res.json(flights);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/flights/all', (req, res) => {
  try {
    const flights = db.getAllFlights();
    res.json(flights);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/flights/airline/:airline', (req, res) => {
  try {
    const flights = db.searchFlightsByAirline(req.params.airline);
    res.json(flights);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/airlines', (req, res) => {
  try {
    const airlines = db.getAirlines();
    res.json(airlines);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/itinerary/:code', (req, res) => {
  try {
    const itinerary = db.getItineraryByCode(req.params.code);
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerario no encontrado' });
    }
    res.json(itinerary);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/news', (req, res) => {
  try {
    const news = db.getNews();
    res.json(news);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/routes/list', (req, res) => {
  try {
    const routes = db.getAllRoutes();
    res.json(routes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── HOTELS API ──
app.get('/api/hotels', (req, res) => {
  try {
    const destination = req.query.destination || 'Margarita';
    const hotels = db.getHotels(destination);
    res.json(hotels);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/hotels/:id', (req, res) => {
  try {
    const hotel = db.getHotel(req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Hotel no encontrado' });
    res.json(hotel);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/hotels/:id/price', (req, res) => {
  try {
    const { check_in, check_out, adults, children } = req.query;
    if (!check_in || !check_out) return res.status(400).json({ error: 'check_in y check_out requeridos' });
    const result = db.calculatePackagePrice(req.params.id, check_in, check_out, parseInt(adults || 1), parseInt(children || 0));
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/flight-prices', (req, res) => {
  try {
    const destination = req.query.destination || 'Margarita';
    const prices = db.getFlightPrices(destination);
    res.json(prices);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use('/api/admin', requireAdmin);

// ── ADMIN HOTELS ──
app.get('/api/admin/hotels', (req, res) => {
  try {
    res.json(db.getHotels(req.query.destination));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/hotels', (req, res) => {
  try {
    const r = req.body;
    db.addHotel(r.name, r.destination, r.category, r.regime, r.description, r.rating, r.reviews_count, r.place_id, r.address, r.website, r.main_photo, r.notes);
    const hotels = db.getHotels(r.destination || 'Margarita');
    const last = hotels[hotels.length - 1];
    res.json({ success: true, id: last ? last.id : null });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/hotels/:id', (req, res) => {
  try {
    const r = req.body;
    db.updateHotel(req.params.id, r.name, r.category, r.regime, r.description, r.rating, r.reviews_count, r.address, r.website, r.notes, r.active);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/hotels/:id', (req, res) => {
  try {
    db.deleteHotel(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin: hotel photos
app.post('/api/admin/hotels/:id/photos', (req, res) => {
  try {
    db.addHotelPhoto(req.params.id, req.body.photo_url, req.body.is_main);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/hotel-photos/:id', (req, res) => {
  try {
    db.deleteHotelPhoto(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin: hotel reviews
app.post('/api/admin/hotels/:id/reviews', (req, res) => {
  try {
    db.addHotelReview(req.params.id, req.body.author, req.body.rating, req.body.text);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/hotel-reviews/:id', (req, res) => {
  try {
    db.deleteHotelReview(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin: hotel rates
app.post('/api/admin/hotels/:id/rates', (req, res) => {
  try {
    const r = req.body;
    db.addHotelRate(req.params.id, r.season_name, r.date_from, r.date_to, r.rate_sgl, r.rate_dbl, r.rate_chd, r.rate_chd2, r.min_nights, r.sale_until);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/hotel-rates/:id', (req, res) => {
  try {
    const r = req.body;
    db.updateHotelRate(req.params.id, r.season_name, r.date_from, r.date_to, r.rate_sgl, r.rate_dbl, r.rate_chd, r.rate_chd2, r.min_nights, r.sale_until);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/hotel-rates/:id', (req, res) => {
  try {
    db.deleteHotelRate(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin: flight prices
app.get('/api/admin/flight-prices', (req, res) => {
  try {
    res.json(db.getFlightPrices(req.query.destination));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/flight-prices', (req, res) => {
  try {
    const r = req.body;
    db.addFlightPrice(r.destination, r.origin, r.price, r.price_chd, r.notes);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/flight-prices/:id', (req, res) => {
  try {
    db.updateFlightPrice(req.params.id, req.body.price, req.body.price_chd, req.body.notes, req.body.active);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/flight-prices/:id', (req, res) => {
  try {
    db.deleteFlightPrice(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/routes', (req, res) => {
  try {
    const { origin, destination, notes } = req.body;
    db.addRoute(origin, destination, notes);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/routes/:id', (req, res) => {
  try {
    const { origin, destination, notes, status } = req.body;
    db.updateRoute(req.params.id, origin, destination, notes, status);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/routes/:id', (req, res) => {
  try {
    db.deleteRoute(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admin/flights', (req, res) => {
  try {
    const flights = db.getAllFlights();
    res.json(flights);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/flights', (req, res) => {
  try {
    const { route_id, airline, flight_number, departure_time, arrival_time, frequency, notes } = req.body;
    db.addFlight(route_id, airline, flight_number, departure_time, arrival_time, frequency, notes);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/flights/:id', (req, res) => {
  try {
    const { airline, flight_number, departure_time, arrival_time, frequency, notes, status } = req.body;
    db.updateFlight(req.params.id, airline, flight_number, departure_time, arrival_time, frequency, notes, status);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/flights/:id', (req, res) => {
  try {
    db.deleteFlight(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admin/itineraries', (req, res) => {
  try {
    const itineraries = db.getAllItineraries();
    res.json(itineraries);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/itineraries', (req, res) => {
  try {
    const { passenger_name, passenger_email, passenger_phone, reference_code, flight_details, notes } = req.body;
    db.addItinerary(passenger_name, passenger_email, passenger_phone, reference_code, flight_details, notes);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/itineraries/:id', (req, res) => {
  try {
    const { passenger_name, passenger_email, passenger_phone, flight_details, notes } = req.body;
    db.updateItinerary(req.params.id, passenger_name, passenger_email, passenger_phone, flight_details, notes);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/itineraries/:id', (req, res) => {
  try {
    db.deleteItinerary(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/news', (req, res) => {
  try {
    const { title, content, category } = req.body;
    db.addNews(title, content, category);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/news/:id', (req, res) => {
  try {
    db.deleteNews(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admin/stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json(stats);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── AGENCY ROUTES ──
app.get('/api/admin/agency/itineraries', (req, res) => {
  try {
    res.json(db.getAgencyItineraries());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/agency/itineraries', (req, res) => {
  try {
    const r = req.body;
    db.addAgencyItinerary(r.title, r.ida_tipo, r.retorno_tipo, r.ida_tramos, r.retorno_tramos, r.price_adult, r.price_child);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/agency/itineraries/:id', (req, res) => {
  try {
    const r = req.body;
    db.updateAgencyItinerary(req.params.id, r.title, r.ida_tipo, r.retorno_tipo, r.ida_tramos, r.retorno_tramos, r.price_adult, r.price_child, r.active);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/agency/itineraries/:id', (req, res) => {
  try {
    db.deleteAgencyItinerary(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/agency/quote/pdf', (req, res) => {
  try {
    const { hotelName, hotelRating, hotelCategory, hotelRegime, hotelDesc, hotelAddress, hotelPhoto, checkIn, checkOut, nights, adults, children, ratePp, rateChdPp, flightPriceAdult, flightPriceChild, totalHotel, totalFlight, total, itineraryTitle, idaTramos, retornoTramos } = req.body;

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=cotizacion-${Date.now()}.pdf`);
    doc.pipe(res);

    const pageWidth = doc.page.width - 100;
    let y = 50;

    // Header
    doc.fontSize(22).font('Helvetica-Bold').text('CHINITA TRAVELS', 50, y, { align: 'center' });
    y += 30;
    doc.fontSize(10).font('Helvetica').fillColor('#666').text('Agencia de Viajes · Cotización', 50, y, { align: 'center' });
    y += 25;

    // Separator
    doc.moveTo(50, y).lineTo(550, y).strokeColor('#ccc').stroke();
    y += 20;

    // Hotel info
    doc.fontSize(16).font('Helvetica-Bold').fillColor('#1a1a2e').text(hotelName || '', 50, y);
    y += 22;
    if (hotelRating) { doc.fontSize(10).fillColor('#f39c12').text('⭐ ' + hotelRating, 50, y); y += 16; }
    if (hotelCategory) { doc.fontSize(9).fillColor('#555').text('Categoría: ' + hotelCategory + (hotelRegime ? ' · ' + hotelRegime : ''), 50, y); y += 14; }
    if (hotelAddress) { doc.fontSize(8).fillColor('#777').text(hotelAddress, 50, y); y += 14; }
    y += 6;

    // Travel dates
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#1a1a2e').text('Datos del viaje', 50, y);
    y += 18;
    doc.fontSize(9).font('Helvetica').fillColor('#333');
    doc.text('Entrada: ' + checkIn, 50, y); y += 13;
    doc.text('Salida: ' + checkOut, 50, y); y += 13;
    doc.text('Noches: ' + nights, 50, y); y += 13;
    doc.text('Pasajeros: ' + adults + ' adulto' + (adults !== 1 ? 's' : '') + (children > 0 ? ' · ' + children + ' niño' + (children !== 1 ? 's' : '') : ''), 50, y);
    y += 20;

    // Price breakdown
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#1a1a2e').text('Desglose de precios', 50, y);
    y += 18;
    doc.fontSize(9).font('Helvetica').fillColor('#333');
    const ppAdult = ratePp * nights + flightPriceAdult;
    const ppChild = flightPriceChild + (rateChdPp ? rateChdPp * nights : 0);
    doc.text('Alojamiento por persona (' + nights + ' noche' + (nights !== 1 ? 's' : '') + '): $' + (ratePp * nights).toFixed(2) + ' ($' + ratePp.toFixed(2) + '/noche)', 50, y); y += 13;
    doc.text('Boleto + traslado por persona: $' + flightPriceAdult.toFixed(2), 50, y); y += 13;
    doc.font('Helvetica-Bold').text('Total por adulto: $' + ppAdult.toFixed(2), 50, y); y += 18;
    if (children > 0) {
      doc.font('Helvetica').fillColor('#333');
      doc.text('Boleto + traslado por niño: $' + flightPriceChild.toFixed(2), 50, y); y += 13;
      doc.font('Helvetica-Bold').text('Total por niño: $' + ppChild.toFixed(2), 50, y); y += 18;
    }
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#1a73e8').text('Total (' + (adults + children) + ' pax): $' + (total || 0).toFixed(2), 50, y);
    y += 25;

    // Itinerary
    if (itineraryTitle) {
      doc.moveTo(50, y).lineTo(550, y).strokeColor('#ccc').stroke();
      y += 15;
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#1a1a2e').text('Itinerario de vuelos', 50, y);
      y += 18;
      doc.fontSize(9).fillColor('#555').text(itineraryTitle, 50, y); y += 16;

      const drawSegments = (label, tramos) => {
        if (!tramos || !tramos.length) return;
        doc.font('Helvetica-Bold').fillColor('#333').text(label, 50, y); y += 14;
        doc.font('Helvetica').fillColor('#444');
        tramos.forEach(s => {
          doc.text(s.origen + ' → ' + s.destino + ' | ' + s.salida + ' - ' + s.llegada + ' | ' + (s.aerolinea || ''), 50, y);
          y += 12;
        });
        y += 4;
      };

      drawSegments('🛩️ Ida:', idaTramos);
      drawSegments('🛩️ Retorno:', retornoTramos);
    }

    // Footer note
    y = Math.max(y, 650);
    doc.fontSize(7).fillColor('#999').text('* Precio de boleto y traslado estimado · Boleto niños 2-12 años · Hotel niños 4-10 años', 50, y, { align: 'center' });
    doc.fontSize(8).fillColor('#1a73e8').text('WhatsApp: +58 424-6902591', 50, y + 12, { align: 'center' });

    doc.end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

async function start() {
  await db.initDatabase();
  app.listen(PORT, () => {
    console.log(`ChinitaTravelsWeb corriendo en http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error('Error al iniciar:', err);
  process.exit(1);
});
