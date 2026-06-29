document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('itineraryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = document.getElementById('referenceCode').value.trim();
    if (!code) return;

    const resultSection = document.getElementById('itineraryResult');
    const errorSection = document.getElementById('itineraryError');
    resultSection.classList.add('hidden');
    errorSection.classList.add('hidden');

    try {
      const res = await fetch(`/api/itinerary/${encodeURIComponent(code)}`);

      if (!res.ok) {
        document.getElementById('errorMessage').textContent = 'Itinerario no encontrado. Verifica el código e intenta de nuevo.';
        errorSection.classList.remove('hidden');
        return;
      }

      const data = await res.json();

      document.getElementById('itineraryCard').innerHTML = `
        <div class="itinerary-card">
          <h3>Itinerario de ${data.passenger_name}</h3>
          <div class="itinerary-details">
            <p><strong>Código:</strong> ${data.reference_code}</p>
            ${data.passenger_email ? `<p><strong>Email:</strong> ${data.passenger_email}</p>` : ''}
            ${data.passenger_phone ? `<p><strong>Teléfono:</strong> ${data.passenger_phone}</p>` : ''}
            ${data.flight_details ? `<div class="flight-details"><strong>Detalles del vuelo:</strong><p>${data.flight_details.replace(/\n/g, '<br>')}</p></div>` : ''}
            ${data.notes ? `<div class="notes"><strong>Notas:</strong><p>${data.notes}</p></div>` : ''}
          </div>
          <p class="itinerary-footer">Si tienes dudas, contáctanos por privado.</p>
        </div>
      `;

      resultSection.classList.remove('hidden');
      resultSection.scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
      document.getElementById('errorMessage').textContent = 'Error al consultar el itinerario. Intenta de nuevo.';
      errorSection.classList.remove('hidden');
    }
  });
});
