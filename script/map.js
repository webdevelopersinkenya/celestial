// Initialize the map
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Example ports
const ports = [
  { name: "San Francisco Port", lat: 37.7749, lng: -122.4194 },
  { name: "Port of London", lat: 51.5074, lng: -0.1278 },
  { name: "Tokyo Port", lat: 35.6895, lng: 139.6917 },
  { name: "Sydney Port", lat: -33.8688, lng: 151.2093 },
  { name: "Cape Town Port", lat: -33.9249, lng: 18.4241 }
];

// Example ships (dummy positions)
const ships = [
  { name: "Ocean Explorer", lat: 36.0, lng: -122.0, port: "San Francisco Port", schedule: "Arrive: 25 Aug 2025" },
  { name: "Sea Voyager", lat: 52.0, lng: 0.0, port: "Port of London", schedule: "Arrive: 23 Aug 2025" },
  { name: "Global Mariner", lat: 34.0, lng: 138.0, port: "Tokyo Port", schedule: "Arrive: 29 Aug 2025" }
];

// Add port markers
ports.forEach(port => {
  L.circleMarker([port.lat, port.lng], {
    color: "#ff9900",
    radius: 6,
    fillOpacity: 0.8
  }).addTo(map).bindPopup(`<strong>${port.name}</strong>`);
});

// Add ship markers
ships.forEach(ship => {
  L.marker([ship.lat, ship.lng], { draggable: false })
    .addTo(map)
    .bindPopup(`
      <div class="popup-content">
        <strong>${ship.name}</strong><br>
        Destination: ${ship.port}<br>
        Schedule: ${ship.schedule}
      </div>
    `);
});
