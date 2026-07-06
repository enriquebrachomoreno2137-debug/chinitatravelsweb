document.addEventListener('DOMContentLoaded', () => {
  loadRoutes();
  loadNews();
  loadAirlines();

  document.getElementById('navNoticias').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('newsSection').scrollIntoView({ behavior: 'smooth' });
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
      const flights = data.flights || [];

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
      msg.value = `Interesado en ${routeText}. Solicito información de disponibilidad.`;
      document.querySelector('.whatsapp-section').classList.add('visible');

      let html = notice || '';

      // ── Show flights ──
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

      // ── Show news filtered by airline ──
      if (airline && allNews.length > 0) {
        const newsFiltered = allNews.filter(n => detectAirline(n.title) && normalizeStr(detectAirline(n.title)).includes(normalizeStr(airline)));
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

      // ── Alternatives when no direct flights ──
      if (flights.length === 0) {
        html += '<div class="no-results"><p>No se encontraron vuelos exactos.</p></div>';

        if (origin && !destination && !airline) {
          // only origin, no results at all
        } else if (origin && destination && !airline) {
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
          // Show all flights for this airline as alternative
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
        // Show alternatives alongside results
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
      section.scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
      document.getElementById('resultsContainer').innerHTML = '<div class="no-results"><p>Error al buscar. Intenta de nuevo.</p></div>';
      document.getElementById('results').classList.remove('hidden');
    }
  });
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
