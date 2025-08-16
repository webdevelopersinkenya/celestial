// Modal
const modal = document.getElementById('bookingModal');
const closeModal = document.getElementById('closeModal');
document.getElementById('openBookingNav').addEventListener('click', e => {
  e.preventDefault();
  modal.style.display = 'block';
});
document.getElementById('openBookingHero').addEventListener('click', e => {
  e.preventDefault();
  modal.style.display = 'block';
});
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// Leaflet Map
const map = L.map('map').setView([25, -40], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Example Ships
const ships = [
  { name: 'Ocean Explorer', coords: [25, -40], nextPort: 'Miami', eta: '2025-08-16' },
  { name: 'Sea Voyager', coords: [35, -50], nextPort: 'Lisbon', eta: '2025-08-18' }
];
ships.forEach(ship => {
  L.marker(ship.coords).addTo(map)
    .bindPopup(`<b>${ship.name}</b><br>Next Port: ${ship.nextPort}<br>ETA: ${ship.eta}`);
});

// Example Itineraries
const itineraries = [
  { line: 'Ocean Cruises', ship: 'Ocean Explorer', route: 'Miami - Nassau - Cozumel', dates: 'Aug 16 - Aug 23, 2025' },
  { line: 'Sea Adventures', ship: 'Sea Voyager', route: 'Lisbon - Barcelona - Rome', dates: 'Aug 18 - Aug 25, 2025' }
];
const itineraryList = document.getElementById('itineraryList');
itineraries.forEach(i => {
  const card = document.createElement('div');
  card.className = 'itinerary-card';
  card.innerHTML = `
    <h3>${i.ship} (${i.line})</h3>
    <p><strong>Route:</strong> ${i.route}</p>
    <p><strong>Dates:</strong> ${i.dates}</p>
    <button class="hero-btn" onclick="modal.style.display='block'">Book Now</button>
  `;
  itineraryList.appendChild(card);
});

// Search functionality
document.getElementById('searchBar').addEventListener('input', function() {
  const term = this.value.toLowerCase();
  document.querySelectorAll('.itinerary-card').forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(term) ? '' : 'none';
  });
});
