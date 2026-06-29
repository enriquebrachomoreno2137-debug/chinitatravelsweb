document.addEventListener('DOMContentLoaded', () => {
  loadRoutes();
  loadNews();

  document.getElementById('navNoticias').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('newsSection').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();

    if (!origin || !destination) return;

    try {
      const res = await fetch(`/api/flights/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
      const data = await res.json();

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

      let allFlights = [];
      if (data.forward) allFlights = allFlights.concat(data.forward);
      if (data.returns) allFlights = allFlights.concat(data.returns);

      const routeText = `${origin} - ${destination}`;
      const msg = document.getElementById('whatsappMessage');
      msg.value = `Interesado en ${routeText}. Solicito información de disponibilidad.`;
      document.querySelector('.whatsapp-section').classList.add('visible');

      const html = allFlights.length > 0
        ? allFlights.map(flightCard).join('')
        : '<div class="no-results"><p>No se encontraron vuelos para esta ruta.</p><p>Contáctanos por privado para más información.</p></div>';

      container.innerHTML = html;
      section.classList.remove('hidden');
      section.scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
      document.getElementById('resultsContainer').innerHTML = '<div class="no-results"><p>Error al buscar vuelos. Intenta de nuevo.</p></div>';
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

async function loadNews() {
  try {
    const res = await fetch('/api/news');
    const news = await res.json();
    const container = document.getElementById('newsContainer');

    if (news.length === 0) {
      container.innerHTML = '<p class="no-data">No hay información adicional por el momento.</p>';
      return;
    }

    container.innerHTML = news.map(n => `
      <div class="news-card">
        <h4>${n.title}</h4>
        <p>${n.content}</p>
        <small>${new Date(n.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
      </div>
    `).join('');
  } catch (err) {
    document.getElementById('newsContainer').innerHTML = '<p class="no-data">Error al cargar noticias.</p>';
  }
}
