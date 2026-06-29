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
