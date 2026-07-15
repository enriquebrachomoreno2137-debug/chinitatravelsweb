document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        document.getElementById('loginError').classList.add('hidden');
        showDashboard();
      } else {
        document.getElementById('loginError').classList.remove('hidden');
      }
    } catch {
      document.getElementById('loginError').classList.remove('hidden');
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/admin/logout', { method: 'POST' });
    showLogin();
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`${btn.dataset.tab}Tab`).classList.add('active');
    });
  });
});

async function checkAuth() {
  try {
    const res = await fetch('/api/admin/check');
    const data = await res.json();
    if (data.isAdmin) showDashboard();
  } catch {}
}

function showLogin() {
  document.getElementById('loginSection').classList.remove('hidden');
  document.getElementById('dashboardSection').classList.add('hidden');
  document.getElementById('logoutBtn').classList.add('hidden');
  document.getElementById('loginForm').reset();
}

function showDashboard() {
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('dashboardSection').classList.remove('hidden');
  document.getElementById('logoutBtn').classList.remove('hidden');
  loadRoutesList();
  loadFlightsList();
  loadItinerariesList();
  loadNewsList();
  loadHotelsList();
  loadFlightPricesList();
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function showModal(html) {
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modal').classList.remove('hidden');
}

async function loadRoutesList() {
  try {
    const res = await fetch('/api/routes/list');
    const routes = await res.json();
    const container = document.getElementById('routesList');

    if (routes.length === 0) {
      container.innerHTML = '<p class="no-data">No hay rutas registradas.</p>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Origen</th>
            <th>Destino</th>
            <th>Notas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${routes.map(r => `
            <tr>
              <td>${r.origin}</td>
              <td>${r.destination}</td>
              <td>${r.notes || '-'}</td>
              <td><span class="badge ${r.status === 'active' ? 'badge-active' : 'badge-inactive'}">${r.status}</span></td>
              <td class="actions">
                <button class="btn-primary btn-sm" onclick="editRoute(${r.id}, '${r.origin}', '${r.destination}', '${(r.notes || '').replace(/'/g, "\\'")}', '${r.status}')">Editar</button>
                <button class="btn-danger btn-sm" onclick="deleteRoute(${r.id})">Eliminar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch {
    document.getElementById('routesList').innerHTML = '<p class="no-data">Error al cargar rutas.</p>';
  }
}

function showAddRouteForm() {
  showModal(`
    <h3>Nueva Ruta</h3>
    <form id="routeForm" onsubmit="saveRoute(event)">
      <div class="form-group">
        <label>Origen</label>
        <input type="text" name="origin" required placeholder="Ej: Caracas">
      </div>
      <div class="form-group">
        <label>Destino</label>
        <input type="text" name="destination" required placeholder="Ej: Bogotá">
      </div>
      <div class="form-group">
        <label>Notas</label>
        <textarea name="notes" placeholder="Información adicional sobre la ruta"></textarea>
      </div>
      <button type="submit" class="btn-primary">Guardar</button>
      <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
    </form>
  `);
}

function editRoute(id, origin, destination, notes, status) {
  showModal(`
    <h3>Editar Ruta</h3>
    <form id="routeForm" onsubmit="updateRoute(event, ${id})">
      <div class="form-group">
        <label>Origen</label>
        <input type="text" name="origin" value="${origin}" required>
      </div>
      <div class="form-group">
        <label>Destino</label>
        <input type="text" name="destination" value="${destination}" required>
      </div>
      <div class="form-group">
        <label>Notas</label>
        <textarea name="notes">${notes !== '-' ? notes : ''}</textarea>
      </div>
      <div class="form-group">
        <label>Estado</label>
        <select name="status">
          <option value="active" ${status === 'active' ? 'selected' : ''}>Activo</option>
          <option value="inactive" ${status === 'inactive' ? 'selected' : ''}>Inactivo</option>
        </select>
      </div>
      <button type="submit" class="btn-primary">Actualizar</button>
      <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
    </form>
  `);
}

async function saveRoute(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch('/api/admin/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      closeModal();
      loadRoutesList();
    }
  } catch {}
}

async function updateRoute(e, id) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch(`/api/admin/routes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      closeModal();
      loadRoutesList();
    }
  } catch {}
}

async function deleteRoute(id) {
  if (!confirm('¿Eliminar esta ruta?')) return;
  try {
    await fetch(`/api/admin/routes/${id}`, { method: 'DELETE' });
    loadRoutesList();
  } catch {}
}

async function loadFlightsList() {
  try {
    const [flightsRes, routesRes] = await Promise.all([
      fetch('/api/admin/flights'),
      fetch('/api/routes/list')
    ]);
    const flights = await flightsRes.json();
    const routes = await routesRes.json();
    const routeMap = {};
    routes.forEach(r => routeMap[r.id] = `${r.origin} → ${r.destination}`);

    const container = document.getElementById('flightsList');

    if (flights.length === 0) {
      container.innerHTML = '<p class="no-data">No hay vuelos registrados.</p>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Ruta</th>
            <th>Aerolínea</th>
            <th>Vuelo</th>
            <th>Salida</th>
            <th>Llegada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${flights.map(f => `
            <tr>
              <td>${routeMap[f.route_id] || 'N/A'}</td>
              <td>${f.airline}</td>
              <td>${f.flight_number || '-'}</td>
              <td>${f.departure_time || '-'}</td>
              <td>${f.arrival_time || '-'}</td>
              <td class="actions">
                <button class="btn-primary btn-sm" onclick="editFlight(${f.id}, ${f.route_id}, '${f.airline.replace(/'/g, "\\'")}', '${(f.flight_number || '').replace(/'/g, "\\'")}', '${(f.departure_time || '').replace(/'/g, "\\'")}', '${(f.arrival_time || '').replace(/'/g, "\\'")}', '${(f.frequency || '').replace(/'/g, "\\'")}', '${(f.notes || '').replace(/'/g, "\\'")}')">Editar</button>
                <button class="btn-danger btn-sm" onclick="deleteFlight(${f.id})">Eliminar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch {
    document.getElementById('flightsList').innerHTML = '<p class="no-data">Error al cargar vuelos.</p>';
  }
}

async function showAddFlightForm() {
  const res = await fetch('/api/routes/list');
  const routes = await res.json();

  const routeOptions = routes.map(r =>
    `<option value="${r.id}">${r.origin} → ${r.destination}</option>`
  ).join('');

  showModal(`
    <h3>Nuevo Vuelo</h3>
    <form id="flightForm" onsubmit="saveFlight(event)">
      <div class="form-group">
        <label>Ruta</label>
        <select name="route_id" required>
          <option value="">Seleccionar ruta...</option>
          ${routeOptions}
        </select>
      </div>
      <div class="form-group">
        <label>Aerolínea</label>
        <input type="text" name="airline" required placeholder="Ej: Copa Airlines">
      </div>
      <div class="form-group">
        <label>Número de Vuelo</label>
        <input type="text" name="flight_number" placeholder="Ej: CM123">
      </div>
      <div class="form-group">
        <label>Hora de Salida</label>
        <input type="text" name="departure_time" placeholder="Ej: 14:30">
      </div>
      <div class="form-group">
        <label>Hora de Llegada</label>
        <input type="text" name="arrival_time" placeholder="Ej: 18:45">
      </div>
      <div class="form-group">
        <label>Frecuencia</label>
        <input type="text" name="frequency" placeholder="Ej: Diario, Lunes, Miércoles y Viernes">
      </div>
      <div class="form-group">
        <label>Notas</label>
        <textarea name="notes" placeholder="Información adicional"></textarea>
      </div>
      <button type="submit" class="btn-primary">Guardar</button>
      <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
    </form>
  `);
}

function editFlight(id, routeId, airline, flightNumber, depTime, arrTime, frequency, notes) {
  fetch('/api/routes/list').then(r => r.json()).then(routes => {
    const routeOptions = routes.map(r =>
      `<option value="${r.id}" ${r.id === routeId ? 'selected' : ''}>${r.origin} → ${r.destination}</option>`
    ).join('');

    showModal(`
      <h3>Editar Vuelo</h3>
      <form id="flightForm" onsubmit="updateFlight(event, ${id})">
        <div class="form-group">
          <label>Ruta</label>
          <select name="route_id" required>${routeOptions}</select>
        </div>
        <div class="form-group">
          <label>Aerolínea</label>
          <input type="text" name="airline" value="${airline}" required>
        </div>
        <div class="form-group">
          <label>Número de Vuelo</label>
          <input type="text" name="flight_number" value="${flightNumber}">
        </div>
        <div class="form-group">
          <label>Hora de Salida</label>
          <input type="text" name="departure_time" value="${depTime}">
        </div>
        <div class="form-group">
          <label>Hora de Llegada</label>
          <input type="text" name="arrival_time" value="${arrTime}">
        </div>
        <div class="form-group">
          <label>Frecuencia</label>
          <input type="text" name="frequency" value="${frequency}">
        </div>
        <div class="form-group">
          <label>Notas</label>
          <textarea name="notes">${notes}</textarea>
        </div>
        <button type="submit" class="btn-primary">Actualizar</button>
        <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
      </form>
    `);
  });
}

async function saveFlight(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  data.route_id = parseInt(data.route_id);

  try {
    const res = await fetch('/api/admin/flights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      closeModal();
      loadFlightsList();
    }
  } catch {}
}

async function updateFlight(e, id) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  data.route_id = parseInt(data.route_id);

  try {
    const res = await fetch(`/api/admin/flights/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      closeModal();
      loadFlightsList();
    }
  } catch {}
}

async function deleteFlight(id) {
  if (!confirm('¿Eliminar este vuelo?')) return;
  try {
    await fetch(`/api/admin/flights/${id}`, { method: 'DELETE' });
    loadFlightsList();
  } catch {}
}

async function loadItinerariesList() {
  try {
    const res = await fetch('/api/admin/itineraries');
    const itineraries = await res.json();
    const container = document.getElementById('itinerariesList');

    if (itineraries.length === 0) {
      container.innerHTML = '<p class="no-data">No hay itinerarios registrados.</p>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Pasajero</th>
            <th>Código</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${itineraries.map(i => `
            <tr>
              <td>${i.passenger_name}</td>
              <td><strong>${i.reference_code}</strong></td>
              <td>${i.passenger_email || '-'}</td>
              <td>${i.passenger_phone || '-'}</td>
              <td class="actions">
                <button class="btn-primary btn-sm" onclick="editItinerary(${i.id}, '${i.passenger_name.replace(/'/g, "\\'")}', '${(i.passenger_email || '').replace(/'/g, "\\'")}', '${(i.passenger_phone || '').replace(/'/g, "\\'")}', '${(i.flight_details || '').replace(/'/g, "\\'").replace(/\n/g, '\\n')}', '${(i.notes || '').replace(/'/g, "\\'").replace(/\n/g, '\\n')}')">Editar</button>
                <button class="btn-danger btn-sm" onclick="deleteItinerary(${i.id})">Eliminar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch {
    document.getElementById('itinerariesList').innerHTML = '<p class="no-data">Error al cargar itinerarios.</p>';
  }
}

function showAddItineraryForm() {
  showModal(`
    <h3>Nuevo Itinerario</h3>
    <form id="itineraryForm" onsubmit="saveItinerary(event)">
      <div class="form-group">
        <label>Nombre del Pasajero</label>
        <input type="text" name="passenger_name" required placeholder="Ej: María Pérez">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" name="passenger_email" placeholder="correo@ejemplo.com">
      </div>
      <div class="form-group">
        <label>Teléfono</label>
        <input type="text" name="passenger_phone" placeholder="+58 412 123 4567">
      </div>
      <div class="form-group">
        <label>Código de Referencia</label>
        <input type="text" name="reference_code" required placeholder="Ej: CHT-001">
      </div>
      <div class="form-group">
        <label>Detalles del Vuelo</label>
        <textarea name="flight_details" placeholder="Detalles del itinerario del pasajero"></textarea>
      </div>
      <div class="form-group">
        <label>Notas</label>
        <textarea name="notes" placeholder="Notas adicionales"></textarea>
      </div>
      <button type="submit" class="btn-primary">Guardar</button>
      <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
    </form>
  `);
}

function editItinerary(id, name, email, phone, flightDetails, notes) {
  showModal(`
    <h3>Editar Itinerario</h3>
    <form id="itineraryForm" onsubmit="updateItinerary(event, ${id})">
      <div class="form-group">
        <label>Nombre del Pasajero</label>
        <input type="text" name="passenger_name" value="${name}" required>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" name="passenger_email" value="${email}">
      </div>
      <div class="form-group">
        <label>Teléfono</label>
        <input type="text" name="passenger_phone" value="${phone}">
      </div>
      <div class="form-group">
        <label>Detalles del Vuelo</label>
        <textarea name="flight_details">${flightDetails}</textarea>
      </div>
      <div class="form-group">
        <label>Notas</label>
        <textarea name="notes">${notes}</textarea>
      </div>
      <button type="submit" class="btn-primary">Actualizar</button>
      <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
    </form>
  `);
}

async function saveItinerary(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch('/api/admin/itineraries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      closeModal();
      loadItinerariesList();
    }
  } catch {}
}

async function updateItinerary(e, id) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch(`/api/admin/itineraries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      closeModal();
      loadItinerariesList();
    }
  } catch {}
}

async function deleteItinerary(id) {
  if (!confirm('¿Eliminar este itinerario?')) return;
  try {
    await fetch(`/api/admin/itineraries/${id}`, { method: 'DELETE' });
    loadItinerariesList();
  } catch {}
}

async function loadNewsList() {
  try {
    const res = await fetch('/api/news');
    const news = await res.json();
    const container = document.getElementById('newsList');

    if (news.length === 0) {
      container.innerHTML = '<p class="no-data">No hay noticias publicadas.</p>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${news.map(n => `
            <tr>
              <td>${n.title}</td>
              <td>${n.category}</td>
              <td>${new Date(n.created_at).toLocaleDateString('es-ES')}</td>
              <td class="actions">
                <button class="btn-danger btn-sm" onclick="deleteNewsItem(${n.id})">Eliminar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch {
    document.getElementById('newsList').innerHTML = '<p class="no-data">Error al cargar noticias.</p>';
  }
}

function showAddNewsForm() {
  showModal(`
    <h3>Nueva Noticia</h3>
    <form id="newsForm" onsubmit="saveNews(event)">
      <div class="form-group">
        <label>Título</label>
        <input type="text" name="title" required placeholder="Título de la noticia">
      </div>
      <div class="form-group">
        <label>Contenido</label>
        <textarea name="content" required placeholder="Contenido de la noticia..."></textarea>
      </div>
      <div class="form-group">
        <label>Categoría</label>
        <select name="category">
          <option value="general">General</option>
          <option value="importante">Importante</option>
          <option value="aviso">Aviso</option>
          <option value="ruta">Nueva Ruta</option>
        </select>
      </div>
      <button type="submit" class="btn-primary">Publicar</button>
      <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
    </form>
  `);
}

async function saveNews(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch('/api/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      closeModal();
      loadNewsList();
    }
  } catch {}
}

async function deleteNewsItem(id) {
  if (!confirm('¿Eliminar esta noticia?')) return;
  try {
    await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    loadNewsList();
  } catch {}
}

// ── HOTEL ADMIN ──
async function loadHotelsList() {
  try {
    const res = await fetch('/api/admin/hotels?destination=Margarita');
    const hotels = await res.json();
    const container = document.getElementById('hotelsList');
    if (hotels.length === 0) {
      container.innerHTML = '<p class="no-data">No hay hoteles registrados.</p>';
      return;
    }
    container.innerHTML = `
      <table class="data-table">
        <thead><tr>
          <th>Nombre</th><th>Categoría</th><th>Régimen</th><th>Rating</th><th>Acciones</th>
        </tr></thead>
        <tbody>${hotels.map(h => `
          <tr>
            <td><strong>${h.name}</strong></td>
            <td>${h.category || '-'}</td>
            <td>${h.regime || '-'}</td>
            <td>${h.rating ? `${h.rating} ⭐` : '-'}</td>
            <td class="actions">
              <button class="btn-primary btn-sm" onclick="showEditHotelForm(${h.id})">Editar</button>
              <button class="btn-primary btn-sm" onclick="showHotelRates(${h.id})">Tarifas</button>
              <button class="btn-primary btn-sm" onclick="showHotelPhotos(${h.id})">Fotos</button>
              <button class="btn-primary btn-sm" onclick="showHotelReviews(${h.id})">Reseñas</button>
              <button class="btn-danger btn-sm" onclick="deleteHotel(${h.id})">Eliminar</button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>`;
  } catch {
    document.getElementById('hotelsList').innerHTML = '<p class="no-data">Error al cargar hoteles.</p>';
  }
}

function showAddHotelForm() {
  showModal(`
    <h3>Nuevo Hotel</h3>
    <form id="hotelForm" onsubmit="saveHotel(event)">
      <div class="form-group"><label>Nombre</label><input type="text" name="name" required></div>
      <div class="form-group"><label>Destino</label><input type="text" name="destination" value="Margarita"></div>
      <div class="form-group"><label>Categoría</label><input type="text" name="category" placeholder="3 estrellas"></div>
      <div class="form-group"><label>Régimen</label><input type="text" name="regime" placeholder="Todo incluido"></div>
      <div class="form-group"><label>Descripción</label><textarea name="description" rows="3"></textarea></div>
      <div class="form-group"><label>Rating (1-5)</label><input type="number" name="rating" min="0" max="5" step="0.1"></div>
      <div class="form-group"><label>Place ID (Google)</label><input type="text" name="place_id"></div>
      <div class="form-group"><label>Dirección</label><input type="text" name="address"></div>
      <div class="form-group"><label>Website</label><input type="url" name="website"></div>
      <div class="form-group"><label>Foto principal (URL)</label><input type="url" name="main_photo"></div>
      <div class="form-group"><label>Notas internas</label><textarea name="notes" rows="2"></textarea></div>
      <button type="submit" class="btn-primary">Guardar</button>
      <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
    </form>`);
}

async function saveHotel(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (data.rating) data.rating = parseFloat(data.rating);
  try {
    const res = await fetch('/api/admin/hotels', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (res.ok) { closeModal(); loadHotelsList(); }
  } catch {}
}

function showEditHotelForm(id) {
  fetch(`/api/hotels/${id}`).then(r => r.json()).then(h => {
    showModal(`
      <h3>Editar Hotel</h3>
      <form id="hotelForm" onsubmit="updateHotel(event, ${id})">
        <div class="form-group"><label>Nombre</label><input type="text" name="name" value="${h.name.replace(/"/g, '&quot;')}" required></div>
        <div class="form-group"><label>Categoría</label><input type="text" name="category" value="${h.category || ''}"></div>
        <div class="form-group"><label>Régimen</label><input type="text" name="regime" value="${h.regime || ''}"></div>
        <div class="form-group"><label>Descripción</label><textarea name="description" rows="3">${h.description || ''}</textarea></div>
        <div class="form-group"><label>Rating</label><input type="number" name="rating" min="0" max="5" step="0.1" value="${h.rating || ''}"></div>
        <div class="form-group"><label>Dirección</label><input type="text" name="address" value="${h.address || ''}"></div>
        <div class="form-group"><label>Website</label><input type="url" name="website" value="${h.website || ''}"></div>
        <div class="form-group"><label>Notas</label><textarea name="notes" rows="2">${h.notes || ''}</textarea></div>
        <div class="form-group">
          <label>Estado</label>
          <select name="active">
            <option value="1" ${h.active ? 'selected' : ''}>Activo</option>
            <option value="0" ${!h.active ? 'selected' : ''}>Inactivo</option>
          </select>
        </div>
        <button type="submit" class="btn-primary">Actualizar</button>
        <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
      </form>`);
  });
}

async function updateHotel(e, id) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (data.rating) data.rating = parseFloat(data.rating);
  data.active = parseInt(data.active);
  try {
    const res = await fetch(`/api/admin/hotels/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (res.ok) { closeModal(); loadHotelsList(); }
  } catch {}
}

async function deleteHotel(id) {
  if (!confirm('¿Desactivar este hotel?')) return;
  try {
    await fetch(`/api/admin/hotels/${id}`, { method: 'DELETE' });
    loadHotelsList();
  } catch {}
}

// ── HOTEL RATES ──
let currentRateHotelId = null;

function showHotelRates(hotelId) {
  currentRateHotelId = hotelId;
  fetch(`/api/hotels/${hotelId}`).then(r => r.json()).then(h => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="rates"]').classList.add('active');
    document.getElementById('ratesTab').classList.add('active');
    loadRatesList(h);
  });
}

function loadRatesList(hotel) {
  const container = document.getElementById('ratesList');
  container.innerHTML = `
    <div class="tab-header">
      <h3>Tarifas: ${hotel.name}</h3>
      <button class="btn-primary btn-sm" onclick="showAddRateForm()">+ Nueva Tarifa</button>
    </div>
    ${hotel.rates && hotel.rates.length ? `
    <table class="data-table">
      <thead><tr><th>Temporada</th><th>Desde</th><th>Hasta</th><th>SGL (€)</th><th>DBL (€)</th><th>CHD (€)</th><th>CHD2 (€)</th><th>Min Noches</th><th>Acciones</th></tr></thead>
      <tbody>${hotel.rates.map(r => `
        <tr>
          <td>${r.season_name || '—'}</td>
          <td>${r.date_from}</td><td>${r.date_to}</td>
          <td>${r.rate_sgl}</td><td>${r.rate_dbl}</td><td>${r.rate_chd}</td><td>${r.rate_chd2 || 0}</td>
          <td>${r.min_nights}</td>
          <td class="actions">
            <button class="btn-primary btn-sm" onclick="showEditRateForm(${r.id})">Editar</button>
            <button class="btn-danger btn-sm" onclick="deleteRate(${r.id})">Eliminar</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>` : '<p class="no-data">Sin tarifas registradas.</p>'}
    <p style="margin-top:1rem;"><button class="btn-secondary" onclick="loadHotelsList(); document.querySelector(\'[data-tab=\\\'hotels\\\']\').click();">&larr; Volver a hoteles</button></p>`;
}

function showAddRateForm() {
  showModal(`
    <h3>Nueva Tarifa</h3>
    <form id="rateForm" onsubmit="saveRate(event)">
      <div class="form-group"><label>Temporada</label><input type="text" name="season_name" placeholder="Alta / Baja"></div>
      <div class="form-group"><label>Fecha desde</label><input type="date" name="date_from" required></div>
      <div class="form-group"><label>Fecha hasta</label><input type="date" name="date_to" required></div>
      <div class="form-group"><label>Tarifa SGL (€)</label><input type="number" name="rate_sgl" step="0.01" value="0"></div>
      <div class="form-group"><label>Tarifa DBL (€)</label><input type="number" name="rate_dbl" step="0.01" value="0"></div>
      <div class="form-group"><label>Tarifa CHD (€)</label><input type="number" name="rate_chd" step="0.01" value="0"></div>
      <div class="form-group"><label>Tarifa CHD2 (€)</label><input type="number" name="rate_chd2" step="0.01" value="0"></div>
      <div class="form-group"><label>Min. noches</label><input type="number" name="min_nights" value="1"></div>
      <button type="submit" class="btn-primary">Guardar</button>
      <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
    </form>`);
}

async function saveRate(e) {
  e.preventDefault();
  if (!currentRateHotelId) return;
  const data = Object.fromEntries(new FormData(e.target));
  ['rate_sgl','rate_dbl','rate_chd','rate_chd2','min_nights'].forEach(k => data[k] = parseFloat(data[k]) || 0);
  try {
    const res = await fetch(`/api/admin/hotels/${currentRateHotelId}/rates`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (res.ok) { closeModal(); fetch(`/api/hotels/${currentRateHotelId}`).then(r => r.json()).then(loadRatesList); }
  } catch {}
}

function showEditRateForm(id) {
  fetch(`/api/hotels/${currentRateHotelId}`).then(r => r.json()).then(h => {
    const rate = h.rates.find(r => r.id === id);
    if (!rate) return;
    showModal(`
      <h3>Editar Tarifa</h3>
      <form id="rateForm" onsubmit="updateRate(event, ${id})">
        <div class="form-group"><label>Temporada</label><input type="text" name="season_name" value="${rate.season_name || ''}"></div>
        <div class="form-group"><label>Fecha desde</label><input type="date" name="date_from" value="${rate.date_from}" required></div>
        <div class="form-group"><label>Fecha hasta</label><input type="date" name="date_to" value="${rate.date_to}" required></div>
        <div class="form-group"><label>Tarifa SGL (€)</label><input type="number" name="rate_sgl" step="0.01" value="${rate.rate_sgl}"></div>
        <div class="form-group"><label>Tarifa DBL (€)</label><input type="number" name="rate_dbl" step="0.01" value="${rate.rate_dbl}"></div>
        <div class="form-group"><label>Tarifa CHD (€)</label><input type="number" name="rate_chd" step="0.01" value="${rate.rate_chd}"></div>
        <div class="form-group"><label>Tarifa CHD2 (€)</label><input type="number" name="rate_chd2" step="0.01" value="${rate.rate_chd2 || 0}"></div>
        <div class="form-group"><label>Min. noches</label><input type="number" name="min_nights" value="${rate.min_nights}"></div>
        <button type="submit" class="btn-primary">Actualizar</button>
        <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
      </form>`);
  });
}

async function updateRate(e, id) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  ['rate_sgl','rate_dbl','rate_chd','rate_chd2','min_nights'].forEach(k => data[k] = parseFloat(data[k]) || 0);
  try {
    const res = await fetch(`/api/admin/hotel-rates/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (res.ok) { closeModal(); fetch(`/api/hotels/${currentRateHotelId}`).then(r => r.json()).then(loadRatesList); }
  } catch {}
}

async function deleteRate(id) {
  if (!confirm('¿Eliminar esta tarifa?')) return;
  try {
    await fetch(`/api/admin/hotel-rates/${id}`, { method: 'DELETE' });
    fetch(`/api/hotels/${currentRateHotelId}`).then(r => r.json()).then(loadRatesList);
  } catch {}
}

// ── HOTEL PHOTOS ──
function showHotelPhotos(hotelId) {
  fetch(`/api/hotels/${hotelId}`).then(r => r.json()).then(h => {
    let html = `<h3>Fotos: ${h.name}</h3>
      <form id="photoForm" onsubmit="savePhoto(event, ${hotelId})" style="margin-bottom:1rem;">
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
          <input type="url" name="photo_url" placeholder="URL de la foto" required style="flex:1;min-width:200px;padding:.5rem;border:1.5px solid #ddd;border-radius:6px;">
          <label style="display:flex;align-items:center;gap:.3rem;"><input type="checkbox" name="is_main" value="1"> Principal</label>
          <button type="submit" class="btn-primary btn-sm">Agregar</button>
        </div>
      </form>`;
    if (h.photos && h.photos.length) {
      html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:.5rem;">`;
      h.photos.forEach(p => {
        html += `<div style="position:relative;">
          <img src="${p.photo_url}" style="width:100%;height:120px;object-fit:cover;border-radius:6px;">
          ${p.is_main ? '<span style="position:absolute;top:4px;left:4px;background:#1a1a2e;color:#fff;font-size:.7rem;padding:2px 6px;border-radius:4px;">Principal</span>' : ''}
          <button class="btn-danger btn-sm" onclick="deletePhoto(${p.id}, ${hotelId})" style="position:absolute;top:4px;right:4px;padding:2px 6px;font-size:.75rem;">×</button>
        </div>`;
      });
      html += `</div>`;
    } else {
      html += `<p class="no-data">Sin fotos registradas.</p>`;
    }
    html += `<p style="margin-top:1rem;"><button class="btn-secondary" onclick="loadHotelsList(); document.querySelector('[data-tab=\\'hotels\\']').click();">&larr; Volver</button></p>`;
    showModal(html);
  });
}

async function savePhoto(e, hotelId) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.is_main = data.is_main === '1';
  try {
    const res = await fetch(`/api/admin/hotels/${hotelId}/photos`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (res.ok) { closeModal(); showHotelPhotos(hotelId); }
  } catch {}
}

async function deletePhoto(id, hotelId) {
  if (!confirm('¿Eliminar esta foto?')) return;
  try {
    await fetch(`/api/admin/hotel-photos/${id}`, { method: 'DELETE' });
    closeModal(); showHotelPhotos(hotelId);
  } catch {}
}

// ── HOTEL REVIEWS ──
function showHotelReviews(hotelId) {
  fetch(`/api/hotels/${hotelId}`).then(r => r.json()).then(h => {
    let html = `<h3>Reseñas: ${h.name}</h3>
      <form id="reviewForm" onsubmit="saveReview(event, ${hotelId})" style="margin-bottom:1rem;">
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:flex-end;">
          <div style="flex:1;min-width:150px;"><label style="font-size:.85rem;font-weight:600;">Autor</label><input type="text" name="author" style="width:100%;padding:.5rem;border:1.5px solid #ddd;border-radius:6px;"></div>
          <div style="min-width:80px;"><label style="font-size:.85rem;font-weight:600;">Rating</label><input type="number" name="rating" min="0" max="5" step="0.5" style="width:100%;padding:.5rem;border:1.5px solid #ddd;border-radius:6px;"></div>
          <div style="flex:2;min-width:200px;"><label style="font-size:.85rem;font-weight:600;">Texto</label><textarea name="text" required style="width:100%;padding:.5rem;border:1.5px solid #ddd;border-radius:6px;resize:vertical;" rows="2"></textarea></div>
          <button type="submit" class="btn-primary btn-sm" style="margin-bottom:2px;">Agregar</button>
        </div>
      </form>`;
    if (h.reviews && h.reviews.length) {
      html += h.reviews.map(r => `
        <div style="background:#f8f9fa;padding:.7rem 1rem;border-radius:8px;margin-bottom:.5rem;display:flex;justify-content:space-between;align-items:flex-start;">
          <div><strong>${r.author || 'Anónimo'}</strong> ${r.rating ? '⭐'.repeat(Math.round(r.rating)) : ''}<br><span style="font-style:italic;">"${r.text}"</span></div>
          <button class="btn-danger btn-sm" onclick="deleteReview(${r.id}, ${hotelId})" style="flex-shrink:0;">×</button>
        </div>`).join('');
    } else {
      html += `<p class="no-data">Sin reseñas.</p>`;
    }
    html += `<p style="margin-top:1rem;"><button class="btn-secondary" onclick="loadHotelsList(); document.querySelector('[data-tab=\\'hotels\\']').click();">&larr; Volver</button></p>`;
    showModal(html);
  });
}

async function saveReview(e, hotelId) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (data.rating) data.rating = parseFloat(data.rating);
  try {
    const res = await fetch(`/api/admin/hotels/${hotelId}/reviews`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (res.ok) { closeModal(); showHotelReviews(hotelId); }
  } catch {}
}

async function deleteReview(id, hotelId) {
  if (!confirm('¿Eliminar esta reseña?')) return;
  try {
    await fetch(`/api/admin/hotel-reviews/${id}`, { method: 'DELETE' });
    closeModal(); showHotelReviews(hotelId);
  } catch {}
}

// ── FLIGHT PRICES ADMIN ──
async function loadFlightPricesList() {
  try {
    const res = await fetch('/api/admin/flight-prices?destination=Margarita');
    const prices = await res.json();
    const container = document.getElementById('flightpricesList');
    if (prices.length === 0) {
      container.innerHTML = '<p class="no-data">No hay precios de vuelo registrados.<br><br><button class="btn-primary" onclick="showAddFlightPriceForm()">+ Nuevo Precio</button></p>';
      return;
    }
    container.innerHTML = `
      <table class="data-table">
        <thead><tr><th>Destino</th><th>Origen</th><th>Precio Adulto ($)</th><th>Precio Niño ($)</th><th>Notas</th><th>Estado</th><th>Acciones</th></tr></thead>
      <tbody>${prices.map(p => `
        <tr>
          <td>${p.destination}</td><td>${p.origin}</td>
          <td><strong>$${p.price}</strong></td>
          <td>${p.price_chd ? `$${p.price_chd}` : '-'}</td>
          <td>${p.notes || '-'}</td>
          <td><span class="badge ${p.active ? 'badge-active' : 'badge-inactive'}">${p.active ? 'Activo' : 'Inactivo'}</span></td>
          <td class="actions">
            <button class="btn-primary btn-sm" onclick="showEditFlightPriceForm(${p.id})">Editar</button>
            <button class="btn-danger btn-sm" onclick="deleteFlightPrice(${p.id})">Eliminar</button>
          </td>
        </tr>`).join('')}
      </tbody></table>`;
  } catch {
    document.getElementById('flightpricesList').innerHTML = '<p class="no-data">Error al cargar precios.</p>';
  }
}

function showAddFlightPriceForm() {
  showModal(`
    <h3>Nuevo Precio Vuelo+Hotel</h3>
    <form id="fpForm" onsubmit="saveFlightPrice(event)">
      <div class="form-group"><label>Destino</label><input type="text" name="destination" value="Margarita" required></div>
      <div class="form-group"><label>Origen</label><input type="text" name="origin" value="Valencia"></div>
      <div class="form-group"><label>Precio Adulto ($)</label><input type="number" name="price" step="0.01" required></div>
      <div class="form-group"><label>Precio Niño ($)</label><input type="number" name="price_chd" step="0.01"></div>
      <div class="form-group"><label>Notas</label><textarea name="notes" rows="2" placeholder="Ej: Incluye vuelo ida y vuelta + traslado"></textarea></div>
      <button type="submit" class="btn-primary">Guardar</button>
      <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
    </form>`);
}

async function saveFlightPrice(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.price = parseFloat(data.price);
  if (data.price_chd) data.price_chd = parseFloat(data.price_chd);
  try {
    const res = await fetch('/api/admin/flight-prices', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (res.ok) { closeModal(); loadFlightPricesList(); }
  } catch {}
}

function showEditFlightPriceForm(id) {
  fetch('/api/admin/flight-prices?destination=Margarita').then(r => r.json()).then(prices => {
    const p = prices.find(x => x.id === id);
    if (!p) return;
    showModal(`
      <h3>Editar Precio Vuelo+Hotel</h3>
      <form id="fpForm" onsubmit="updateFlightPrice(event, ${id})">
        <div class="form-group"><label>Precio Adulto ($)</label><input type="number" name="price" step="0.01" value="${p.price}" required></div>
        <div class="form-group"><label>Precio Niño ($)</label><input type="number" name="price_chd" step="0.01" value="${p.price_chd || ''}"></div>
        <div class="form-group"><label>Notas</label><textarea name="notes" rows="2">${p.notes || ''}</textarea></div>
        <div class="form-group">
          <label>Estado</label>
          <select name="active">
            <option value="1" ${p.active ? 'selected' : ''}>Activo</option>
            <option value="0" ${!p.active ? 'selected' : ''}>Inactivo</option>
          </select>
        </div>
        <button type="submit" class="btn-primary">Actualizar</button>
        <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
      </form>`);
  });
}

async function updateFlightPrice(e, id) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.price = parseFloat(data.price);
  if (data.price_chd) data.price_chd = parseFloat(data.price_chd);
  data.active = parseInt(data.active);
  try {
    const res = await fetch(`/api/admin/flight-prices/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (res.ok) { closeModal(); loadFlightPricesList(); }
  } catch {}
}

async function deleteFlightPrice(id) {
  if (!confirm('¿Desactivar este precio?')) return;
  try {
    await fetch(`/api/admin/flight-prices/${id}`, { method: 'DELETE' });
    loadFlightPricesList();
  } catch {}
}
