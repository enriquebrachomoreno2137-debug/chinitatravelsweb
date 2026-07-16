document.addEventListener('DOMContentLoaded', () => {
  loadRoutes();
  loadNews();
  loadAirlines();

  document.getElementById('navInicio').addEventListener('click', (e) => {
    e.preventDefault();
    showPage('inicio');
  });

  document.getElementById('navNoticias').addEventListener('click', (e) => {
    e.preventDefault();
    showPage('noticias');
  });

  document.getElementById('navPaquetes').addEventListener('click', (e) => {
    e.preventDefault();
    showPage('paquetes');
  });

  document.getElementById('swapBtn').addEventListener('click', () => {
    const o = document.getElementById('origin');
    const d = document.getElementById('destination');
    const tmp = o.value; o.value = d.value; d.value = tmp;
  });

  function normalizeStr(str) {
    return str.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function mapCity(name) {
    const n = normalizeStr(name);
    return n.includes('CARACAS') ? 'Valencia' : name;
  }

  document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    let origin = document.getElementById('origin').value.trim();
    let destination = document.getElementById('destination').value.trim();
    let airline = document.getElementById('airlineInput').value.trim();

    if (!origin && !destination && !airline) return;

    let notice = '';
    const mappedOrigin = origin ? mapCity(origin) : '';
    const mappedDest = destination ? mapCity(destination) : '';
    if ((origin && mappedOrigin !== origin) || (destination && mappedDest !== destination)) {
      notice = '<div class="redirect-notice">✈️ Vuelos con origen/destino Caracas operan desde/hacia <strong>Valencia</strong> (Aeropuerto Arturo Michelena)</div>';
      if (origin) origin = mappedOrigin;
      if (destination) destination = mappedDest;
    }

    try {
      const params = new URLSearchParams();
      if (origin) params.set('origin', origin);
      if (destination) params.set('destination', destination);
      if (airline) params.set('airline', airline);
      const res = await fetch(`/api/flights/search?${params}`);
      const data = await res.json();
      let flights = data.flights || [];

      const dateVal = document.getElementById('travelDate').value;
      const dayIdx = dateVal ? new Date(dateVal + 'T12:00:00').getDay() : -1;
      if (dateVal) {
        const dayNames = ['DOMINGO','LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO'];
        const dayAbbr = ['DO','LU','MA','MI','JU','VI','SA'];
        flights = flights.filter(f => {
          if (!f.frequency) return true;
          const freq = normalizeStr(f.frequency);
          if (freq.includes('DIARIA') || freq.includes('TODOS')) return true;
          return freq.includes(dayNames[dayIdx]) || freq.includes(dayAbbr[dayIdx]);
        });
      }
      const dateText = dateVal ? ` para el ${new Date(dateVal + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}` : '';

      const container = document.getElementById('resultsContainer');
      const section = document.getElementById('results');

      const flightCard = f => `
        <div class="flight-card">
          <div class="flight-header">
            <span class="route">${f.origin} → ${f.destination}</span>
            <span class="airline">${f.airline} ${f.flight_number || ''}</span>
          </div>
          <div class="flight-details">
            ${f.departure_time ? `<p><strong>Salida:</strong> ${f.departure_time}</p>` : ''}
            ${f.arrival_time ? `<p><strong>Llegada:</strong> ${f.arrival_time}</p>` : ''}
            ${f.frequency ? `<p><strong>Frecuencia:</strong> ${f.frequency}</p>` : ''}
            ${f.notes ? `<p class="notes">${f.notes}</p>` : ''}
          </div>
        </div>
      `;

      const routeText = airline ? airline : (origin && destination ? `${origin} - ${destination}` : `Salidas desde ${origin}`);
      const msg = document.getElementById('whatsappMessage');
      msg.value = `Interesado en ${routeText}${dateText}. Solicito información de disponibilidad.`;
      document.querySelector('.whatsapp-section').classList.add('visible');

      let html = notice || '';

      if (data.originOnly && flights.length > 0) {
        const grouped = {};
        flights.forEach(f => {
          if (!grouped[f.destination]) grouped[f.destination] = [];
          grouped[f.destination].push(f);
        });
        html += '<p class="suggestions-title">Todos los vuelos desde <strong>' + origin + '</strong></p>';
        Object.keys(grouped).sort().forEach(dest => {
          html += '<div class="suggestion-group"><p class="suggestion-heading">→ ' + dest + ' (' + grouped[dest].length + ')</p>';
          html += grouped[dest].map(flightCard).join('');
          html += '</div>';
        });
      } else if (flights.length > 0) {
        html += flights.map(flightCard).join('');
      }

      if (airline && allNews.length > 0) {
        const al = normalizeStr(airline);
        const newsFiltered = allNews.filter(n => {
          const detected = detectAirline(n.title);
          return detected && normalizeStr(detected).includes(al);
        });
        if (newsFiltered.length > 0) {
          html += '<div class="suggestions"><p class="suggestions-title">Comunicados / Noticias de ' + airline + '</p>';
          html += newsFiltered.map(n => `
            <div class="news-card">
              <h4>${n.title}</h4>
              <p>${n.content}</p>
              <small>${new Date(n.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
            </div>
          `).join('');
          html += '</div>';
        }
      }

      if (flights.length === 0 && !airline) {
        html += '<div class="no-results"><p>No se encontraron vuelos exactos.</p></div>';

        if (origin && destination && !airline) {
          const [simRes, altRes] = await Promise.all([
            fetch(`/api/flights/from/${encodeURIComponent(origin)}`),
            fetch(`/api/flights/to/${encodeURIComponent(destination)}`)
          ]);
          const fromOrigin = await simRes.json();
          const toDest = await altRes.json();

          const otherDests = fromOrigin.filter(f => normalizeStr(f.destination) !== normalizeStr(destination));
          const otherOrigins = toDest.filter(f => normalizeStr(f.origin) !== normalizeStr(origin));

          if (otherDests.length > 0) {
            const groups = {};
            otherDests.forEach(f => {
              if (!groups[f.destination]) groups[f.destination] = [];
              groups[f.destination].push(f);
            });
            html += '<div class="suggestions"><p class="suggestions-title">También desde <strong>' + origin + '</strong></p>';
            Object.keys(groups).sort().forEach(dest => {
              html += '<div class="suggestion-group"><p class="suggestion-heading">→ ' + dest + '</p>';
              html += groups[dest].map(flightCard).join('');
              html += '</div>';
            });
            html += '</div>';
          }

          if (otherOrigins.length > 0) {
            const groups = {};
            otherOrigins.forEach(f => {
              if (!groups[f.origin]) groups[f.origin] = [];
              groups[f.origin].push(f);
            });
            html += '<div class="suggestions"><p class="suggestions-title">Alternativas para llegar a <strong>' + destination + '</strong></p>';
            Object.keys(groups).sort().forEach(orig => {
              html += '<div class="suggestion-group"><p class="suggestion-heading">' + orig + ' →</p>';
              html += groups[orig].map(flightCard).join('');
              html += '</div>';
            });
            html += '</div>';
          }
        } else if (airline) {
          const altRes = await fetch(`/api/flights/airline/${encodeURIComponent(airline)}`);
          const altFlights = await altRes.json();
          if (altFlights.length > 0) {
            const grouped = {};
            altFlights.forEach(f => {
              const key = f.origin + ' → ' + f.destination;
              if (!grouped[key]) grouped[key] = [];
              grouped[key].push(f);
            });
            html += '<div class="suggestions"><p class="suggestions-title">Alternativas: Todos los vuelos de <strong>' + airline + '</strong></p>';
            Object.entries(grouped).sort().forEach(([route, fls]) => {
              html += '<div class="suggestion-group"><p class="suggestion-heading">' + route + '</p>';
              html += fls.map(flightCard).join('');
              html += '</div>';
            });
            html += '</div>';
          }
        }
      } else if (origin && destination && !airline && flights.length > 0) {
        const [simRes, altRes] = await Promise.all([
          fetch(`/api/flights/from/${encodeURIComponent(origin)}`),
          fetch(`/api/flights/to/${encodeURIComponent(destination)}`)
        ]);
        const fromOrigin = await simRes.json();
        const toDest = await altRes.json();

        const otherDests = fromOrigin.filter(f => normalizeStr(f.destination) !== normalizeStr(destination));
        const otherOrigins = toDest.filter(f => normalizeStr(f.origin) !== normalizeStr(origin));

        if (otherDests.length > 0) {
          const groups = {};
          otherDests.forEach(f => {
            if (!groups[f.destination]) groups[f.destination] = [];
            groups[f.destination].push(f);
          });
          html += '<div class="suggestions"><p class="suggestions-title">También desde <strong>' + origin + '</strong></p>';
          Object.keys(groups).sort().forEach(dest => {
            if (!flights.some(f => normalizeStr(f.destination) === normalizeStr(dest))) {
              html += '<div class="suggestion-group"><p class="suggestion-heading">→ ' + dest + '</p>';
              html += groups[dest].map(flightCard).join('');
              html += '</div>';
            }
          });
          html += '</div>';
        }

        if (otherOrigins.length > 0) {
          const groups = {};
          otherOrigins.forEach(f => {
            if (!groups[f.origin]) groups[f.origin] = [];
            groups[f.origin].push(f);
          });
          html += '<div class="suggestions"><p class="suggestions-title">Alternativas para llegar a <strong>' + destination + '</strong></p>';
          Object.keys(groups).sort().forEach(orig => {
            html += '<div class="suggestion-group"><p class="suggestion-heading">' + orig + ' →</p>';
            html += groups[orig].map(flightCard).join('');
            html += '</div>';
          });
          html += '</div>';
        }
      }

      container.innerHTML = html;
      section.classList.remove('hidden');

    } catch (err) {
      document.getElementById('resultsContainer').innerHTML = '<div class="no-results"><p>Error al buscar. Intenta de nuevo.</p></div>';
      document.getElementById('results').classList.remove('hidden');
    }
  });
});

function showPage(page) {
  document.querySelectorAll('#pageInicio, #pageNoticias, #pagePaquetes').forEach(el => el.classList.add('hidden'));
  document.getElementById('page' + page.charAt(0).toUpperCase() + page.slice(1)).classList.remove('hidden');
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  document.getElementById('nav' + page.charAt(0).toUpperCase() + page.slice(1)).classList.add('active');
  scrollTo(0, 0);
  if (page === 'paquetes') initPaquetes();
}

function openLightbox(url) {
  document.getElementById('lightboxImg').src = url;
  document.getElementById('lightbox').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeLightbox(event) {
  if (event && event.target !== event.currentTarget && event.target.className !== 'lightbox-close') return;
  document.getElementById('lightbox').style.display = 'none';
  document.getElementById('lightboxImg').src = '';
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lb = document.getElementById('lightbox');
    if (lb.style.display === 'flex') { lb.style.display = 'none'; document.getElementById('lightboxImg').src = ''; document.body.style.overflow = ''; }
  }
});

function sendWhatsApp() {
  const msg = document.getElementById('whatsappMessage').value.trim();
  if (!msg) return;
  const url = `https://wa.me/584246902591?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

async function loadRoutes() {
  try {
    const res = await fetch('/api/routes');
    const routes = await res.json();
    const container = document.getElementById('routesContainer');

    if (routes.length === 0) {
      container.innerHTML = '<p class="no-data">No hay rutas disponibles por el momento.</p>';
      return;
    }

    container.innerHTML = routes.map(r => `
      <div class="route-card" onclick="loadFlights(${r.id}, this)">
        <div class="route-header">
          <span class="route-cities">${r.origin} → ${r.destination}</span>
          <span class="flight-count">${r.flight_count || 0} vuelo(s)</span>
        </div>
        ${r.notes ? `<p class="route-notes">${r.notes}</p>` : ''}
        <div class="route-flights hidden" id="flights-${r.id}">
          <p class="loading-sm">Cargando vuelos...</p>
        </div>
      </div>
    `).join('');
  } catch (err) {
    document.getElementById('routesContainer').innerHTML = '<p class="no-data">Error al cargar rutas.</p>';
  }
}

async function loadFlights(routeId, element) {
  const flightsDiv = document.getElementById(`flights-${routeId}`);
  const isHidden = flightsDiv.classList.contains('hidden');

  document.querySelectorAll('.route-flights').forEach(el => el.classList.add('hidden'));

  if (!isHidden) return;

  flightsDiv.classList.remove('hidden');

  try {
    const res = await fetch(`/api/routes/${routeId}/flights`);
    const flights = await res.json();

    if (flights.length === 0) {
      flightsDiv.innerHTML = '<p class="no-data">Sin vuelos registrados</p>';
      return;
    }

    flightsDiv.innerHTML = flights.map(f => `
      <div class="flight-item">
        <span class="airline-tag">${f.airline}</span>
        ${f.flight_number || ''}
        ${f.departure_time ? `| Salida: ${f.departure_time}` : ''}
        ${f.arrival_time ? `| Llegada: ${f.arrival_time}` : ''}
        ${f.frequency ? `<br><small>Frecuencia: ${f.frequency}</small>` : ''}
        ${f.notes ? `<br><small>${f.notes}</small>` : ''}
      </div>
    `).join('');
  } catch (err) {
    flightsDiv.innerHTML = '<p class="no-data">Error al cargar vuelos</p>';
  }
}

async function loadAirlines() {
  try {
    const res = await fetch('/api/airlines');
    const airlines = await res.json();
    const list = document.getElementById('airlineList');
    list.innerHTML = airlines.map(a => `<option value="${a}">`).join('');
  } catch (e) { console.error('Error loading airlines:', e); }
}

const airlineKeywords = [
  { name: 'Conviasa', keywords: ['conviasa'] },
  { name: 'Aeropostal', keywords: ['aeropostal', 'alas de venezuela'] },
  { name: 'Turpial Airlines', keywords: ['turpial'] },
  { name: 'Rutaca Airlines', keywords: ['rutaca'] },
  { name: 'Plus Ultra', keywords: ['plus ultra'] },
  { name: 'Avianca', keywords: ['avianca'] },
  { name: 'Estelar', keywords: ['estelar'] },
  { name: 'Laser Airlines', keywords: ['laser'] },
  { name: 'Venezolana', keywords: ['venezolana'] },
  { name: 'Air Europa', keywords: ['air europa'] },
  { name: 'Avior Airlines', keywords: ['avior'] },
  { name: 'LATAM', keywords: ['latam'] },
  { name: 'Sasca Airlines', keywords: ['sasca'] },
  { name: 'Aerocaribe', keywords: ['aerocaribe'] },
  { name: 'Copa Airlines', keywords: ['copa'] },
  { name: 'Iberia', keywords: ['iberia'] },
  { name: 'American Airlines', keywords: ['american airlines'] }
];

function detectAirline(title) {
  const lower = title.toLowerCase();
  for (const a of airlineKeywords) {
    if (a.keywords.some(k => lower.includes(k))) return a.name;
  }
  return null;
}

let allNews = [];

function filterNews() {
  const search = document.getElementById('newsSearch').value.toLowerCase().trim();
  const selected = document.querySelector('.airline-tag.active');
  const airline = selected ? selected.dataset.airline : null;
  const container = document.getElementById('newsContainer');

  const filtered = allNews.filter(n => {
    const matchAirline = !airline || detectAirline(n.title) === airline;
    const matchSearch = !search || n.title.toLowerCase().includes(search) || n.content.toLowerCase().includes(search);
    return matchAirline && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p class="no-data">No hay noticias que coincidan con tu búsqueda.</p>';
    return;
  }

  container.innerHTML = filtered.map(n => `
    <div class="news-card">
      <h4>${n.title}</h4>
      <p>${n.content}</p>
      <small>${new Date(n.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
    </div>
  `).join('');
}

function renderAirlineTags(news) {
  const airlines = new Set();
  news.forEach(n => {
    const a = detectAirline(n.title);
    if (a) airlines.add(a);
  });
  const tagsDiv = document.getElementById('airlineTags');
  tagsDiv.innerHTML = `<button class="airline-tag active" data-airline="" onclick="selectAirline(this)">Todas</button>` +
    [...airlines].sort().map(a =>
      `<button class="airline-tag" data-airline="${a}" onclick="selectAirline(this)">${a}</button>`
    ).join('');
}

function selectAirline(el) {
  document.querySelectorAll('.airline-tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  filterNews();
}

async function loadNews() {
  try {
    const res = await fetch('/api/news');
    const news = await res.json();
    allNews = news;
    const container = document.getElementById('newsContainer');

    if (news.length === 0) {
      container.innerHTML = '<p class="no-data">No hay información adicional por el momento.</p>';
      return;
    }

    renderAirlineTags(news);
    filterNews();
  } catch (err) {
    document.getElementById('newsContainer').innerHTML = '<p class="no-data">Error al cargar noticias.</p>';
  }
}

// ── PAQUETES HOTELS ──
let paquetesInitialized = false;
let currentResults = [];
let currentDetail = null;

function updateDateRange() {
  const ci = document.getElementById('paqCheckIn');
  const co = document.getElementById('paqCheckOut');
  const display = document.getElementById('dateRangeDisplay');
  if (!ci || !co || !ci.value || !co.value) { if (display) display.textContent = ''; return; }
  const start = new Date(ci.value + 'T12:00:00');
  const end = new Date(co.value + 'T12:00:00');
  const nights = Math.max(0, Math.floor((end - start) / (1000 * 60 * 60 * 24)));
  if (nights <= 0) { display.textContent = 'La fecha de salida debe ser posterior a la entrada'; return; }
  const opts = { day: 'numeric', month: 'long', year: 'numeric' };
  display.textContent = `del ${start.toLocaleDateString('es-ES', opts)} al ${end.toLocaleDateString('es-ES', opts)} (${nights} noche${nights !== 1 ? 's' : ''})`;
}

function initPaquetes() {
  if (paquetesInitialized) return;
  paquetesInitialized = true;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('paqCheckIn').valueAsDate = today;
  document.getElementById('paqCheckOut').valueAsDate = tomorrow;
  updateDateRange();

  document.getElementById('paqCheckIn').addEventListener('change', updateDateRange);
  document.getElementById('paqCheckOut').addEventListener('change', updateDateRange);

  document.getElementById('packageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await loadHotels();
  });

  document.getElementById('backToResults').addEventListener('click', () => {
    document.getElementById('detailSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
  });

  document.getElementById('closeModal').addEventListener('click', () =>
    document.getElementById('whatsappModal').style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === document.getElementById('whatsappModal'))
      document.getElementById('whatsappModal').style.display = 'none';
  });

  loadHotels();
}

async function loadHotels() {
  try {
    const checkIn = document.getElementById('paqCheckIn').value;
    const checkOut = document.getElementById('paqCheckOut').value;
    if (!checkIn || !checkOut) return;
    const nights = calcNights(checkIn, checkOut);
    const adults = parseInt(document.getElementById('adults').value) || 2;
    const children = parseInt(document.getElementById('children').value) || 0;

    const fOpts = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('resultsTitle').textContent = 'Hoteles en Margarita';
    document.getElementById('resultsSubtitle').textContent =
      `${new Date(checkIn + 'T12:00:00').toLocaleDateString('es-ES', fOpts)} → ${new Date(checkOut + 'T12:00:00').toLocaleDateString('es-ES', fOpts)} (${nights} noche${nights !== 1 ? 's' : ''}) · ${adults} adulto${adults !== 1 ? 's' : ''}${children > 0 ? ` · ${children} niño${children !== 1 ? 's' : ''}` : ''}`;

    const hotels = await (await fetch('/api/hotels?destination=Margarita')).json();
    const flightPrices = await (await fetch('/api/flight-prices?destination=Margarita')).json();
    const flightPrice = flightPrices.length > 0 ? flightPrices[0].price : 0;

    const pricedHotels = [];
    for (const hotel of hotels) {
      const priceData = await (await fetch(`/api/hotels/${hotel.id}/price?check_in=${checkIn}&check_out=${checkOut}&adults=${adults}&children=${children}`)).json();
      pricedHotels.push({ ...hotel, priceData, flightPrice, checkIn, checkOut, adults, children });
    }

    currentResults = pricedHotels;
    renderResults(pricedHotels);
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('detailSection').style.display = 'none';
  } catch (err) {
    document.getElementById('hotelResults').innerHTML =
      `<div class="error-msg">Error al cargar hoteles: ${err.message}</div>`;
  }
}

function calcNights(checkIn, checkOut) {
  return Math.max(0, Math.floor((new Date(checkOut + 'T12:00:00') - new Date(checkIn + 'T12:00:00')) / (1000 * 60 * 60 * 24)));
}

function renderResults(hotels) {
  if (!hotels.length) {
    document.getElementById('hotelResults').innerHTML = '<div class="empty-msg">No hay hoteles disponibles.</div>';
    return;
  }
  document.getElementById('hotelResults').innerHTML = hotels.map(h => {
    const pd = h.priceData;
    const hasError = pd && pd.error;
    const totalHotel = pd && !hasError ? pd.total : 0;
    const totalFlight = h.flightPrice * (h.adults || 1);
    const grandTotal = totalHotel + totalFlight;

    return `
      <div class="hotel-card">
        <div class="hotel-card-img">
          ${h.main_photo ? `<img src="${h.main_photo}" alt="${h.name}" loading="lazy">` : '<div class="hotel-placeholder">🏖️</div>'}
        </div>
        <div class="hotel-card-body">
          <div class="hotel-card-header">
            <h3 class="hotel-name">${h.name}</h3>
            ${h.rating ? `<span class="hotel-rating">⭐ ${h.rating}${h.reviews_count ? ` (${h.reviews_count})` : ''}</span>` : ''}
          </div>
          ${h.category ? `<span class="hotel-category">${h.category}</span>` : ''}
          ${h.regime ? `<span class="hotel-regime">${h.regime}</span>` : ''}
          <p class="hotel-desc">${h.description || ''}</p>
          ${hasError ? `<div class="error-msg">${pd.error}</div>` : `
          <div class="hotel-price-breakdown">
            <div class="price-line"><span>Alojamiento:</span> <span>$${totalHotel.toFixed(2)}</span></div>
            <div class="price-line"><span>Vuelo + traslado:</span> <span>$${totalFlight.toFixed(2)}</span></div>
            <div class="price-line total"><span>Total:</span> <span>$${grandTotal.toFixed(2)}</span></div>
          </div>`}
          <div class="hotel-card-actions">
            <button class="btn-secondary" onclick="viewHotel(${h.id})">Visualizar</button>
            <button class="btn-whatsapp" onclick="openWhatsApp(${h.id})">Cotizar</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

async function viewHotel(hotelId) {
  try {
    const hotel = await (await fetch(`/api/hotels/${hotelId}`)).json();
    currentDetail = hotel;

    const checkIn = document.getElementById('paqCheckIn').value || document.getElementById('detCheckIn').value;
    const checkOut = document.getElementById('paqCheckOut').value || document.getElementById('detCheckOut').value;
    const nights = calcNights(checkIn, checkOut);
    const adults = parseInt(document.getElementById('adults').value) || 2;
    const children = parseInt(document.getElementById('children').value) || 0;

    const pd = await (await fetch(`/api/hotels/${hotelId}/price?check_in=${checkIn}&check_out=${checkOut}&adults=${adults}&children=${children}`)).json();
    const hasError = pd && pd.error;
    const flightPrices = await (await fetch('/api/flight-prices?destination=Margarita')).json();
    const flightPrice = flightPrices.length > 0 ? flightPrices[0].price : 0;
    const totalFlight = flightPrice * adults;
    const totalHotel = pd && !hasError ? pd.total : 0;
    const grandTotal = totalHotel + totalFlight;

    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('detailSection').style.display = 'block';

    const startD = new Date(checkIn + 'T12:00:00');
    const endD = new Date(checkOut + 'T12:00:00');
    const fOpts = { day: 'numeric', month: 'long', year: 'numeric' };
    const rangeStr = `del ${startD.toLocaleDateString('es-ES', fOpts)} al ${endD.toLocaleDateString('es-ES', fOpts)}`;

    document.getElementById('hotelDetail').innerHTML = `
      <div class="hotel-detail-header">
        <h2>${hotel.name}</h2>
        ${hotel.rating ? `<span class="hotel-rating-lg">⭐ ${hotel.rating}${hotel.reviews_count ? ` (${hotel.reviews_count} reseñas)` : ''}</span>` : ''}
      </div>
      ${hotel.photos && hotel.photos.length ? `
      <div class="hotel-gallery">
        ${hotel.photos.map(p => `<img src="${p.photo_url}" alt="${hotel.name}" loading="lazy" onclick="openLightbox('${p.photo_url}')">`).join('')}
      </div>` : `
      <div class="hotel-gallery-single"><img src="${hotel.main_photo || ''}" alt="${hotel.name}"></div>`}
      <div class="hotel-detail-body">
        ${hotel.description ? `<p>${hotel.description}</p>` : ''}
        ${hotel.reviews && hotel.reviews.length ? `
        <div class="hotel-reviews">
          <h4>Reseñas destacadas</h4>
          ${hotel.reviews.slice(0, 3).map(r => `
            <div class="review-item">
              <strong>${r.author ? r.author : 'Cliente'}</strong>
              ${r.rating ? `<span class="review-rating">${'⭐'.repeat(Math.round(r.rating))}</span>` : ''}
              <p>"${r.text}"</p>
            </div>`).join('')}
        </div>` : ''}
        <div class="hotel-rate-calculator">
          <h4>Cotizador</h4>
          <p style="margin-bottom:0.8rem;color:#555;">${rangeStr} &middot; ${nights} noche${nights !== 1 ? 's' : ''}</p>
          <div class="form-row">
            <div class="form-group" style="flex:1;">
              <label>Entrada</label>
              <input type="date" id="detCheckIn" value="${checkIn}" onchange="recalcDetail()">
            </div>
            <div class="form-group" style="flex:1;">
              <label>Salida</label>
              <input type="date" id="detCheckOut" value="${checkOut}" onchange="recalcDetail()">
            </div>
            <div class="form-group"><label>Adultos</label><input type="number" id="detAdults" min="1" value="${adults}" onchange="recalcDetail()"></div>
            <div class="form-group"><label>Niños</label><input type="number" id="detChildren" min="0" value="${children}" onchange="recalcDetail()"></div>
          </div>
          <div id="detailPrice">
            ${hasError ? `<div class="error-msg">${pd.error}</div>` : `
            <div class="hotel-price-breakdown">
              <div class="price-line"><span>Alojamiento (${nights} noche${nights !== 1 ? 's' : ''}):</span> <span>$${totalHotel.toFixed(2)}</span></div>
              <div class="price-line"><span>Vuelo + traslado:</span> <span>$${totalFlight.toFixed(2)}</span></div>
              <div class="price-line total"><span>Total:</span> <span>$${grandTotal.toFixed(2)}</span></div>
            </div>`}
          </div>
          <button class="btn-whatsapp" onclick="openWhatsApp(${hotelId})">Cotizar por WhatsApp</button>
        </div>
        ${hotel.rates && hotel.rates.length ? `
        <div class="hotel-rates-table">
          <h4>Tarifas por temporada</h4>
          <table><thead><tr><th>Temporada</th><th>Desde</th><th>Hasta</th><th>SGL</th><th>DBL</th><th>CHD</th></tr></thead>
          <tbody>${hotel.rates.map(r => `
            <tr><td>${r.season_name || '—'}</td><td>${r.date_from}</td><td>${r.date_to}</td><td>€${r.rate_sgl}</td><td>€${r.rate_dbl}</td><td>€${r.rate_chd}</td></tr>`).join('')}
          </tbody></table>
        </div>` : ''}
      </div>`;
  } catch (err) {
    document.getElementById('hotelDetail').innerHTML = `<div class="error-msg">Error: ${err.message}</div>`;
  }
}

async function recalcDetail() {
  if (!currentDetail) return;
  const checkIn = document.getElementById('detCheckIn').value;
  const checkOut = document.getElementById('detCheckOut').value;
  if (!checkIn || !checkOut) return;
  const nights = calcNights(checkIn, checkOut);
  const adults = parseInt(document.getElementById('detAdults').value) || 2;
  const children = parseInt(document.getElementById('detChildren').value) || 0;

  try {
    const pd = await (await fetch(`/api/hotels/${currentDetail.id}/price?check_in=${checkIn}&check_out=${checkOut}&adults=${adults}&children=${children}`)).json();
    const hasError = pd && pd.error;
    const flightPrices = await (await fetch('/api/flight-prices?destination=Margarita')).json();
    const flightPrice = flightPrices.length > 0 ? flightPrices[0].price : 0;
    const totalFlight = flightPrice * adults;
    const totalHotel = pd && !hasError ? pd.total : 0;
    const grandTotal = totalHotel + totalFlight;

    document.getElementById('detailPrice').innerHTML = hasError
      ? `<div class="error-msg">${pd.error}</div>`
      : `<div class="hotel-price-breakdown">
          <div class="price-line"><span>Alojamiento (${nights} noche${nights !== 1 ? 's' : ''}):</span> <span>$${totalHotel.toFixed(2)}</span></div>
          <div class="price-line"><span>Vuelo + traslado:</span> <span>$${totalFlight.toFixed(2)}</span></div>
          <div class="price-line total"><span>Total:</span> <span>$${grandTotal.toFixed(2)}</span></div>
        </div>`;
  } catch (err) {
    document.getElementById('detailPrice').innerHTML = `<div class="error-msg">Error: ${err.message}</div>`;
  }
}

function openWhatsApp(hotelId) {
  const hotel = currentResults.find(h => h.id === hotelId) || currentDetail;
  if (!hotel) return;

  const checkIn = document.getElementById('paqCheckIn').value || document.getElementById('detCheckIn').value;
  const checkOut = document.getElementById('paqCheckOut').value || document.getElementById('detCheckOut').value;
  const nights = calcNights(checkIn, checkOut);
  const adults = parseInt(document.getElementById('adults').value || document.getElementById('detAdults').value) || 2;
  const children = parseInt(document.getElementById('children').value || document.getElementById('detChildren').value) || 0;

  const fOpts = { year: 'numeric', month: 'long', day: 'numeric' };
  const d1 = new Date(checkIn + 'T12:00:00').toLocaleDateString('es-ES', fOpts);
  const d2 = new Date(checkOut + 'T12:00:00').toLocaleDateString('es-ES', fOpts);

  fetch('/api/flight-prices?destination=Margarita').then(r => r.json()).then(fp => {
    const flightPrice = fp.length > 0 ? fp[0].price : 0;
    const msg = `Hola, quiero cotizar este paquete:

🏨 Hotel: ${hotel.name}
📅 Entrada: ${d1}
📅 Salida: ${d2} (${nights} noche${nights !== 1 ? 's' : ''})
👤 Adultos: ${adults}
${children > 0 ? `👶 Niños: ${children}` : ''}
✈️ Vuelo + traslado: $${flightPrice.toFixed(2)} pp

Quedo atento a disponibilidad y precio final. Gracias!`;
    window.open(`https://wa.me/584246390281?text=${encodeURIComponent(msg)}`, '_blank');
  });
}
