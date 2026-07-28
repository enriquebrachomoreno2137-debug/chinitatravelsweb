require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
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

const staticOpts = { maxAge: '1h', setHeaders: (res, filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  }
} };
app.use(express.static(path.join(__dirname, 'public'), staticOpts));
app.use('/admin', express.static(path.join(__dirname, 'admin'), staticOpts));

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

app.post('/api/admin/agency/quote/pdf', async (req, res) => {
  try {
    const { hotelName, hotelRating, hotelCategory, hotelRegime, hotelDesc, hotelAddress, hotelPhoto, checkIn, checkOut, nights, adults, children, ratePp, rateChdPp, flightPriceAdult, flightPriceChild, totalHotel, totalFlight, total, itineraryTitle, idaTramos, retornoTramos } = req.body;

    const doc = new PDFDocument({ margin: 36, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=cotizacion-${Date.now()}.pdf`);
    doc.pipe(res);

    const pageW = doc.page.width - 72;
    let y = 28;

    // ── Header: Logo + Brand ──
    const logoPath = path.join(__dirname, 'public', 'images', 'logo.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 36, y, { width: 42 });
    }
    doc.fontSize(13).font('Helvetica-Bold').fillColor('#1a1a2e').text('CHINITA TRAVELS', 86, y + 4);
    doc.fontSize(6.5).fillColor('#999').text('Agencia de Viajes · RIF J-12345678-0', 86, y + 20);
    y += 36;

    // Separator
    doc.moveTo(36, y).lineTo(36 + pageW, y).strokeColor('#ccc').stroke();
    y += 10;

    // ── Hotel name + tags ──
    let photoY = y;
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#1a1a2e').text(hotelName || '', 36, y);
    y += 15;

    let tags = [];
    if (hotelRating) tags.push('⭐ ' + hotelRating);
    if (hotelCategory) tags.push(hotelCategory);
    if (hotelRegime) tags.push(hotelRegime);
    if (tags.length) {
      doc.fontSize(7).fillColor('#555').text(tags.join(' · '), 36, y);
      y += 10;
    }
    if (hotelAddress) {
      doc.fontSize(6.5).fillColor('#aaa').text(hotelAddress, 36, y);
      y += 9;
    }
    y += 3;

    // ── Hotel photo (right, thumbnail) ──
    if (hotelPhoto) {
      try {
        const imgBuf = await new Promise((resolve, reject) => {
          const urlObj = new URL(hotelPhoto);
          const mod = urlObj.protocol === 'https:' ? https : http;
          const doGet = (url) => {
            mod.get(url, (resp) => {
              if (resp.statusCode >= 300 && resp.statusCode < 400 && resp.headers.location) {
                doGet(resp.headers.location); return;
              }
              const chunks = []; resp.on('data', c => chunks.push(c)); resp.on('end', () => resolve(Buffer.concat(chunks)));
            }).on('error', reject);
          };
          doGet(hotelPhoto);
        });
        doc.image(imgBuf, 36 + pageW - 80, photoY, { width: 76, height: 56 });
      } catch (e) { /* skip photo */ }
    }

    // ── Hotel description ──
    if (hotelDesc) {
      doc.fontSize(6.5).font('Helvetica').fillColor('#555');
      const descLines = doc.heightOfString(hotelDesc, { width: pageW - 86, lineGap: 1 });
      doc.text(hotelDesc, 36, y, { width: pageW - 86, lineGap: 1 });
      y += descLines + 4;
    }

    // ── Todo incluido ──
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor('#1a73e8').text('✦ TODO INCLUIDO', 36, y);
    y += 9;
    doc.fontSize(6.5).font('Helvetica').fillColor('#555');
    const inclText = 'Desayunos, almuerzos y cenas tipo Buffet, bebidas nacionales e internacionales, snack de media tarde, animación diurna y nocturna, piscina, bar en la playa, toldos, sillas, deportes acuáticos no motorizados y WiFi en zonas comunes.';
    const inclH = doc.heightOfString(inclText, { width: pageW, lineGap: 1 });
    doc.text(inclText, 36, y, { width: pageW, lineGap: 1 });
    y += inclH + 5;

    // Separator
    doc.moveTo(36, y).lineTo(36 + pageW, y).strokeColor('#eee').stroke();
    y += 8;

    // ── Travel data ──
    doc.fontSize(8).font('Helvetica-Bold').fillColor('#1a1a2e').text('📅 Datos del viaje', 36, y);
    y += 11;
    doc.fontSize(6.5).font('Helvetica').fillColor('#333');
    doc.text(checkIn + '  →  ' + checkOut + '  |  ' + nights + ' noche' + (nights !== 1 ? 's' : '') + '  |  ' + adults + ' adulto' + (adults !== 1 ? 's' : '') + (children > 0 ? ' + ' + children + ' niño' + (children !== 1 ? 's' : '') : ''), 36, y);
    y += 12;

    // ── Price breakdown ──
    doc.fontSize(8).font('Helvetica-Bold').fillColor('#1a1a2e').text('💰 Desglose de precios', 36, y);
    y += 11;

    const ppAdult = ratePp * nights + flightPriceAdult;
    const ppChild = flightPriceChild + (rateChdPp ? rateChdPp * nights : 0);

    doc.fontSize(7).font('Helvetica').fillColor('#333');
    doc.text('Alojamiento adulto (' + nights + ' noche' + (nights !== 1 ? 's' : '') + '): $' + (ratePp * nights).toFixed(2) + '  ($' + ratePp.toFixed(2) + '/noche)', 36, y); y += 9;
    doc.text('Vuelo + traslado adulto: $' + flightPriceAdult.toFixed(2), 36, y); y += 9;
    doc.font('Helvetica-Bold').text('Total por adulto: $' + ppAdult.toFixed(2), 36, y); y += 12;

    if (children > 0) {
      doc.font('Helvetica').fillColor('#333');
      doc.text('Alojamiento niño (' + nights + ' noche' + (nights !== 1 ? 's' : '') + '): $' + (rateChdPp * nights).toFixed(2) + '  ($' + rateChdPp.toFixed(2) + '/noche)', 36, y); y += 9;
      doc.text('Vuelo + traslado niño: $' + flightPriceChild.toFixed(2), 36, y); y += 9;
      doc.font('Helvetica-Bold').text('Total por niño: $' + ppChild.toFixed(2), 36, y); y += 12;
    }

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a73e8').text('TOTAL (' + (adults + children) + ' pax):  $' + (total || 0).toFixed(2), 36, y);
    y += 12;

    // ── Itinerary ──
    if (itineraryTitle && idaTramos && idaTramos.length) {
      doc.moveTo(36, y).lineTo(36 + pageW, y).strokeColor('#eee').stroke();
      y += 8;
      doc.fontSize(8).font('Helvetica-Bold').fillColor('#1a1a2e').text('🛩️ Itinerario: ' + itineraryTitle, 36, y);
      y += 10;

      const drawSegments = (label, tramos) => {
        if (!tramos || !tramos.length) return;
        doc.font('Helvetica-Bold').fillColor('#333').fontSize(6.5).text(label, 36, y); y += 8;
        doc.font('Helvetica').fillColor('#555');
        tramos.forEach(s => {
          doc.text('  ' + s.origen + ' → ' + s.destino + '  |  ' + (s.salida || '') + ' - ' + (s.llegada || '') + '  |  ' + (s.aerolinea || ''), 36, y, { lineGap: 1 });
          y += 7.5;
        });
        y += 2;
      };

      drawSegments('Ida:', idaTramos);
      drawSegments('Retorno:', retornoTramos);
    }

    // ── Footer ──
    y = Math.max(y, doc.page.height - 60);
    doc.moveTo(36, y).lineTo(36 + pageW, y).strokeColor('#ddd').stroke();
    y += 5;
    doc.fontSize(5.5).fillColor('#aaa').text('* Precio de boleto y traslado estimado · Boleto niños 2-12 años · Hotel niños 4-10 años', 36, y, { align: 'center', width: pageW });
    doc.fontSize(6.5).fillColor('#1a73e8').text('WhatsApp: +58 424-6902591', 36, y + 8, { align: 'center', width: pageW });

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
