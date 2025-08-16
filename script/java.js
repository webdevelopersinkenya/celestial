// Sample cruise data
const cruises = [
  {
    id: 1,
    line: "Oceanic Cruises",
    ship: "Ocean Dream",
    itinerary: [
      { port: "Miami", lat: 25.774, lng: -80.19, date: "2025-08-15" },
      { port: "Nassau", lat: 25.034, lng: -77.396, date: "2025-08-16" },
      { port: "Cozumel", lat: 20.423, lng: -86.922, date: "2025-08-18" }
    ]
  },
  {
    id: 2,
    line: "BlueWave Voyages",
    ship: "Sea Explorer",
    itinerary: [
      { port: "Barcelona", lat: 41.385, lng: 2.173, date: "2025-08-20" },
      { port: "Marseille", lat: 43.296, lng: 5.369, date: "2025-08-21" },
      { port: "Rome", lat: 41.902, lng: 12.496, date: "2025-08-23" }
    ]
  }
];

// Initialize Leaflet Map
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Render cruises
function renderCruises(data) {
  const itineraryList = document.getElementById('itineraryList');
  itineraryList.innerHTML = '';

  data.forEach(cruise => {
    const coords = cruise.itinerary.map(p => [p.lat, p.lng]);
    L.polyline(coords, { color: 'blue' }).addTo(map);

    const marker = L.marker(coords[0]).addTo(map);
    marker.bindPopup(`<strong>${cruise.ship}</strong><br>${cruise.line}`);

    const card = document.createElement('div');
    card.className = 'itinerary-card';
    card.innerHTML = `
      <h3>${cruise.ship} — ${cruise.line}</h3>
      <ul>
        ${cruise.itinerary.map(stop => `<li>${stop.port} — ${stop.date}</li>`).join('')}
      </ul>
      <button data-id="${cruise.id}">Book Now</button>
    `;
    itineraryList.appendChild(card);
  });
}

renderCruises(cruises);

// Booking modal
const modal = document.getElementById('bookingModal');
const closeModal = document.getElementById('closeModal');
const bookingNav = document.getElementById('openBookingNav');

document.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
    modal.style.display = 'block';
  }
});

bookingNav.addEventListener('click', e => {
  e.preventDefault();
  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Booking confirmed! We will email you shortly.');
  modal.style.display = 'none';
});

// Search
document.getElementById('searchBar').addEventListener('input', e => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = cruises.filter(c => 
    c.line.toLowerCase().includes(searchTerm) ||
    c.ship.toLowerCase().includes(searchTerm) ||
    c.itinerary.some(stop => stop.port.toLowerCase().includes(searchTerm))
  );
  renderCruises(filtered);
});
