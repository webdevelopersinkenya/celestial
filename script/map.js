// === Initialize Map ===
const map = L.map('map').setView([10, 0], 2);

// === Add OpenStreetMap Tiles ===
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// === Cruise Line Homeports ===
const ports = [
  { name: "Port of Miami (Carnival Cruises)", lat: 25.7781, lng: -80.1794 },
  { name: "Port Canaveral (Royal Caribbean)", lat: 28.4101, lng: -80.6333 },
  { name: "Southampton Port (MSC Cruises)", lat: 50.8998, lng: -1.4043 },
  { name: "Barcelona Port (Norwegian Cruises)", lat: 41.3523, lng: 2.1580 },
  { name: "Fort Lauderdale Port Everglades (Princess Cruises)", lat: 26.0941, lng: -80.1260 },
  { name: "Sydney Harbour (P&O Australia)", lat: -33.8688, lng: 151.2093 },
  { name: "Mombasa Port (Regional)", lat: -4.0435, lng: 39.6682 }
];

// === Cruise Ships with Homeports and Itineraries ===
const ships = [
  { name: "Carnival Horizon", itinerary: [
      [25.7781, -80.1794], // Miami
      [20.5083, -86.9490], // Cozumel
      [18.4031, -77.1031], // Ocho Rios
      [19.2920, -81.3800], // Grand Cayman
      [25.7781, -80.1794]  // Return to Miami
    ]
  },
  { name: "Royal Caribbean Symphony", itinerary: [
      [28.4101, -80.6333], // Port Canaveral
      [25.0850, -77.3230], // Nassau
      [24.5587, -76.8258], // CocoCay
      [28.4101, -80.6333]  // Return
    ]
  },
  { name: "MSC Virtuosa", itinerary: [
      [50.8998, -1.4043],  // Southampton
      [48.8566, 2.3522],   // Le Havre (Paris)
      [43.2965, 5.3698],   // Marseille
      [41.9028, 12.4964],  // Rome (Civitavecchia)
      [50.8998, -1.4043]   // Return
    ]
  },
  { name: "Norwegian Epic", itinerary: [
      [41.3523, 2.1580],   // Barcelona
      [43.5534, 7.0204],   // Cannes
      [41.9028, 12.4964],  // Rome
      [36.1408, -5.3536],  // Gibraltar
      [41.3523, 2.1580]    // Return
    ]
  },
  { name: "Royal Princess", itinerary: [
      [26.0941, -80.1260], // Fort Lauderdale
      [18.3358, -64.8963], // St. Thomas
      [17.3026, -62.7177], // St. Kitts
      [17.1274, -61.8468], // Antigua
      [26.0941, -80.1260]  // Return
    ]
  },
  { name: "Pacific Explorer", itinerary: [
      [-33.8688, 151.2093], // Sydney
      [-17.7333, 168.3273], // Port Vila
      [-19.0565, 169.9187], // Mystery Island
      [-33.8688, 151.2093]  // Return
    ]
  }
];

// === Custom Ship Icon ===
const shipIcon = L.icon({
  iconUrl: 'images/ship-icon.png', // Use your own PNG/SVG ship icon
  iconSize: [45, 45],
  iconAnchor: [22, 22],
  popupAnchor: [0, -25]
});

// === Add Homeport Markers ===
ports.forEach(port => {
  L.circleMarker([port.lat, port.lng], {
    color: "#ff9900",
    radius: 6,
    fillOpacity: 0.8
  }).addTo(map)
    .bindPopup(`<strong>${port.name}</strong>`);
});

// === Add Ships and Their Animated Movement ===
ships.forEach(ship => {
  const start = ship.itinerary[0];

  // Create a marker for each ship
  const marker = L.marker(start, { icon: shipIcon }).addTo(map)
    .bindPopup(`<strong>${ship.name}</strong><br>Starting at ${ship.itinerary[0]}<br>Moving along its route...`);

  // Draw full itinerary path
  const pathLine = L.polyline(ship.itinerary, {
    color: 'blue',
    weight: 2,
    opacity: 0.6,
    dashArray: '4,6'
  }).addTo(map);

  // Trail showing movement progress
  const trail = L.polyline([start], {
    color: 'cyan',
    weight: 3,
    opacity: 0.9
  }).addTo(map);

  // Animate movement between ports
  let segment = 0;

  function moveToNextPort() {
    if (segment >= ship.itinerary.length - 1) segment = 0; // Loop route

    const startPoint = ship.itinerary[segment];
    const endPoint = ship.itinerary[segment + 1];
    const startTime = performance.now();
    const duration = 15000; // 15 seconds per leg

    function animate(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const lat = startPoint[0] + (endPoint[0] - startPoint[0]) * progress;
      const lng = startPoint[1] + (endPoint[1] - startPoint[1]) * progress;

      marker.setLatLng([lat, lng]);
      trail.addLatLng([lat, lng]);

      // Update popup with next port info
      const nextPortIndex = (segment + 1) % ship.itinerary.length;
      marker.bindPopup(`
        <strong>${ship.name}</strong><br>
        Current Position: ${lat.toFixed(2)}, ${lng.toFixed(2)}<br>
        Next Port: ${nextPortIndex + 1 <= ship.itinerary.length - 1 ? `Leg ${nextPortIndex + 1}` : 'Returning Home'}
      `);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        segment++;
        setTimeout(moveToNextPort, 2000);
      }
    }
    requestAnimationFrame(animate);
  }

  moveToNextPort();
});
