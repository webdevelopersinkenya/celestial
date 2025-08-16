// Booking Modal
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

// Cruises Data
const cruises = [
  { name: 'Ocean Explorer.', company: 'Ocean Cruises', img: 'images/ship2.jpg' },
  { name: 'Sea Voyager.', company: 'Sea Adventures', img: 'images/ship1.jpg' },
  { name: 'Island Star.', company: 'Island Getaways', img: 'images/ship3.jpg' },
  { name: 'Royal Spirit.', company: 'Royal Voyages', img: 'images/ship4.jpg' },
  { name: 'Majestic Pearl.', company: 'Pearl Cruises', img: 'images/ship5.jpg' },
  { name: 'Blue Horizon.', company: 'Horizon Lines', img: 'images/ship6.jpg' }
];

const cruiseList = document.getElementById('cruiseList');
cruises.forEach(ship => {
  const card = document.createElement('div');
  card.className = 'cruise-card';
  card.innerHTML = `
    <img src="${ship.img}" alt="${ship.name}">
    <div class="card-body">
      <h3 class="cruise-name">${ship.name}</h3>
      <p class="cruise-company">${ship.company}</p>
    </div>
  `;
  cruiseList.appendChild(card);
});
