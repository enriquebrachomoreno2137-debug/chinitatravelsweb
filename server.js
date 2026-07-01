require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
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
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    req.session.isAdmin = true;
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Credenciales inválidas' });
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

app.use('/api/admin', requireAdmin);

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
