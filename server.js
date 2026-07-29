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

async function fetchImgBuf(url) {
  return new Promise((resolve, reject) => {
    try {
      const urlObj = new URL(url);
      const mod = urlObj.protocol === 'https:' ? https : http;
      const doGet = (u) => {
        mod.get(u, (resp) => {
          if (resp.statusCode >= 300 && resp.statusCode < 400 && resp.headers.location) { doGet(resp.headers.location); return; }
          const chunks = []; resp.on('data', c => chunks.push(c)); resp.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', reject);
      };
      doGet(url);
    } catch (e) { reject(e); }
  });
}

app.post('/api/admin/agency/quote/pdf', async (req, res) => {
  try {
    const { hotelName, hotelRating, hotelCategory, hotelRegime, hotelDesc, hotelAddress, hotelPhotos, checkIn, checkOut, nights, adults, children, ratePp, rateChdPp, flightPriceAdult, flightPriceChild, totalHotel, totalFlight, total, itineraryTitle, idaTramos, retornoTramos, preview } = req.body;

    const doc = new PDFDocument({ margin: 36, size: 'A4' });
    const isPreview = preview === true;
    res.setHeader('Content-Type', 'application/pdf');
    if (!isPreview) {
      res.setHeader('Content-Disposition', `attachment; filename=cotizacion-${Date.now()}.pdf`);
    }
    doc.pipe(res);

    const pw = doc.page.width - 72;
    const cl = '#0E1B68'; const cm = '#662D91'; const cg = '#939598';
    let y = 28;

    const ppAdult = ratePp * nights + flightPriceAdult;
    const ppChild = (rateChdPp || 0) * nights + (flightPriceChild || 0);
    const totalAdultos = ppAdult * adults;
    const totalNinos = ppChild * children;
    const granTotal = totalAdultos + totalNinos;

    // ─── HEADER ───
    const logoPath = path.join(__dirname, 'public', 'images', 'logo.png');
    if (fs.existsSync(logoPath)) doc.image(logoPath, 36, y, { width: 38 });
    doc.fontSize(12).font('Helvetica-Bold').fillColor(cl).text('CHINITA TRAVELS', 82, y + 3);
    doc.fontSize(6).fillColor(cg).text('AGENCIA DE VIAJES & TURISMO  •  RIF J-12345678-0', 82, y + 18);
    doc.fontSize(14).fillColor(cl).text('COTIZACIÓN CONFIRMADA', 36, y + 30, { align: 'right' });
    y += 50;

    // ─── PHOTOS ROW ───
    const photoUrls = (hotelPhotos || []).filter(Boolean).slice(0, 3);
    const labels = ['Instalaciones & Playa', 'Área de Piscina', 'Habitación Superior'];
    if (photoUrls.length) {
      const pm = 4;
      const photoW = (pw - pm * (photoUrls.length - 1)) / photoUrls.length;
      for (let i = 0; i < photoUrls.length; i++) {
        try {
          const buf = await fetchImgBuf(photoUrls[i]);
          doc.image(buf, 36 + i * (photoW + pm), y, { width: photoW, height: 64 });
        } catch (e) { /* skip */ }
      }
      y += 68;
      for (let i = 0; i < photoUrls.length; i++) {
        doc.fontSize(5.5).fillColor(cg).text(labels[i] || '', 36 + i * (photoW + pm), y, { width: photoW, align: 'center' });
      }
      y += 10;
    }

    // ─── HOTEL INFO ───
    doc.fontSize(10).font('Helvetica-Bold').fillColor(cl).text(hotelName || '', 36, y);
    y += 13;
    let hotelLine = hotelAddress || '';
    if (hotelRegime) hotelLine += (hotelLine ? '  •  ' : '') + 'Régimen ' + hotelRegime;
    if (hotelLine) { doc.fontSize(6.5).fillColor(cg).text(hotelLine, 36, y); y += 10; }
    if (hotelDesc) {
      doc.fontSize(6.5).font('Helvetica').fillColor('#555');
      const dh = doc.heightOfString(hotelDesc, { width: pw, lineGap: 1 });
      doc.text('Hotel de categoría ' + (hotelCategory || 'Superior') + ' ideal para el disfrute en familia. ' + hotelDesc, 36, y, { width: pw, lineGap: 1 });
      y += dh + 4;
    }
    doc.moveTo(36, y).lineTo(36 + pw, y).strokeColor('#D1D3D4').stroke();
    y += 8;

    // ─── DATOS DE LA RESERVA ───
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(cl).text('DATOS DE LA RESERVA', 36, y);
    y += 11;
    doc.fontSize(6.5).font('Helvetica').fillColor('#333');
    doc.text('Fechas: ' + checkIn + ' al ' + checkOut, 36, y); y += 9;
    doc.text('Duración: ' + nights + ' Noche' + (nights !== 1 ? 's' : '') + ' / ' + (nights + 1) + ' Día' + ((nights + 1) !== 1 ? 's' : ''), 36, y); y += 9;
    doc.text('Pasajeros: ' + adults + ' Adulto' + (adults !== 1 ? 's' : '') + (children > 0 ? ' + ' + children + ' Niño' + (children !== 1 ? 's' : '') : ''), 36, y); y += 9;
    doc.text('Alojamiento: Habitación Superior', 36, y); y += 9;

    // ─── ITINERARIO AÉREO ───
    doc.moveTo(36, y).lineTo(36 + pw, y).strokeColor('#D1D3D4').stroke();
    y += 8;
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(cl).text('ITINERARIO AÉREO CONFIRMADO', 36, y);
    y += 11;
    if (itineraryTitle) {
      doc.fontSize(6).fillColor(cg).text(itineraryTitle, 36, y); y += 8;
    }
    const drawSeg = (label, tramos) => {
      if (!tramos || !tramos.length) return;
      doc.font('Helvetica-Bold').fillColor('#333').fontSize(6.5).text(label + ':', 36, y); y += 8;
      doc.font('Helvetica').fillColor('#555');
      tramos.forEach(s => {
        doc.text('  ' + s.origen + ' → ' + s.destino + '  |  ' + (s.salida || '') + ' - ' + (s.llegada || '') + '  |  ' + (s.aerolinea || ''), 36, y, { lineGap: 1 });
        y += 7;
      });
    };
    drawSeg('Ida', idaTramos);
    drawSeg('Retorno', retornoTramos);
    y += 2;

    doc.fontSize(6.5).font('Helvetica').fillColor('#333').text('Equipaje: Bolso de mano (5kg) + Maleta (23kg)', 36, y); y += 10;

    // ─── TU PAQUETE INCLUYE ───
    doc.moveTo(36, y).lineTo(36 + pw, y).strokeColor('#D1D3D4').stroke();
    y += 8;
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(cl).text('TU PAQUETE INCLUYE', 36, y);
    y += 11;
    doc.fontSize(6.5).font('Helvetica').fillColor('#333');
    const incluye = [
      '✓  Boletos aéreos ida y vuelta en la ruta seleccionada.',
      '✓  Alojamiento por ' + nights + ' noche' + (nights !== 1 ? 's' : '') + ' en ' + (hotelName || '') + ' en Plan Todo Incluido.',
      '✓  Traslados privados Aeropuerto ↔ Hotel ↔ Aeropuerto.',
      '✓  Asistencia y atención personalizada durante toda tu estancia.'
    ];
    incluye.forEach(line => { doc.text(line, 36, y, { lineGap: 1 }); y += 8; });
    y += 3;

    // ─── PRICE TABLE ───
    const col1 = 36, col2 = pw + 36 - 170, col3 = pw + 36 - 90, col4 = pw + 36 - 40;
    const colW1 = col2 - col1 - 4, colW2 = 44, colW3 = 74, colW4 = 40;
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(cl).text('DESCRIPCIÓN DEL SERVICIO', 36, y); y += 13;

    // Table header
    doc.fontSize(6).fillColor('#333');
    doc.text('DESCRIPCIÓN DEL SERVICIO', col1, y);
    doc.text('CANT.', col2, y, { width: colW2, align: 'center' });
    doc.text('PRECIO PAQUETE / PAX', col3, y, { width: colW3, align: 'center' });
    doc.text('SUBTOTAL', col4, y, { width: colW4, align: 'center' });
    y += 8;

    // Table header underline
    doc.moveTo(col1, y).lineTo(col4 + colW4, y).strokeColor(cl).stroke(); y += 3;

    // Adult row
    doc.fontSize(6.5).font('Helvetica').fillColor('#333');
    doc.text('Paquete Adulto (Vuelo + Traslados + Hotel Todo Incluido)', col1, y);
    doc.text('' + adults, col2, y, { width: colW2, align: 'center' });
    doc.text('$' + ppAdult.toFixed(2), col3, y, { width: colW3, align: 'center' });
    doc.text('$' + totalAdultos.toFixed(2), col4, y, { width: colW4, align: 'center' });
    y += 9;

    // Child row
    if (children > 0) {
      doc.text('Paquete Niño (Vuelo + Traslados + Hotel Todo Incluido)', col1, y);
      doc.text('' + children, col2, y, { width: colW2, align: 'center' });
      doc.text('$' + ppChild.toFixed(2), col3, y, { width: colW3, align: 'center' });
      doc.text('$' + totalNinos.toFixed(2), col4, y, { width: colW4, align: 'center' });
      y += 9;
    }

    // Total row
    doc.moveTo(col1, y).lineTo(col4 + colW4, y).strokeColor(cl).stroke(); y += 3;
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(cl).text('INVERSIÓN TOTAL PAQUETE COMPLETO', col1, y);
    doc.fontSize(8).text('$' + granTotal.toFixed(2), col4, y, { width: colW4, align: 'center' });
    y += 12;

    // ─── DISCLAIMER ───
    doc.moveTo(36, y).lineTo(36 + pw, y).strokeColor('#D1D3D4').stroke();
    y += 6;
    doc.fontSize(6).font('Helvetica').fillColor(cg);
    const discText = 'NOTA IMPORTANTE SOBRE DISPONIBILIDAD Y TARIFAS\n' +
      'Esta cotización ha sido calculada con los cupos aéreos y hoteleros disponibles al momento. ' +
      'La tarifa aérea final y la reserva garantizada quedan reservadas únicamente tras la emisión de los boletos. ' +
      'Le recomendamos confirmar con su asesor vía WhatsApp a la brevedad para asegurar estos costos.';
    const discH = doc.heightOfString(discText, { width: pw, lineGap: 1 });
    doc.text(discText, 36, y, { width: pw, lineGap: 1 });
    y += discH + 6;

    // ─── FOOTER ───
    y = Math.max(y, doc.page.height - 48);
    doc.fontSize(6.5).font('Helvetica-BoldItalic').fillColor(cl).text(
      'Chinita Travels  •  Hacemos de tu viaje una experiencia inolvidable  •  Responde a este mensaje para emitir tus boletos',
      36, y, { align: 'center', width: pw }
    );
    doc.fontSize(6).font('Helvetica').fillColor(cg).text('WhatsApp: +58 424-6902591', 36, y + 10, { align: 'center', width: pw });

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
