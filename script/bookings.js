// === Cruise Booking Modal Control ===

// Get modal and close button
const bookingModal = document.getElementById("bookingModal");
const closeModal = document.getElementById("closeModal");

// Get all "Book Now" buttons (you can have many)
const openBookingBtns = document.querySelectorAll("#openBookingHero");
// Attach click event to each button
openBookingBtns.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent anchor default
    bookingModal.style.display = "flex"; // ✅ Use flex (to match CSS centering)
  });
});

// Close modal when clicking X
closeModal.addEventListener("click", () => {
  bookingModal.style.display = "none";
});

// Close when clicking outside modal
window.addEventListener("click", (event) => {
  if (event.target === bookingModal) {
    bookingModal.style.display = "none";
  }
});

// === Form Handling ===
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("fullName").value;
  const cruiseLine = document.getElementById("cruiseLine").value;
  const destination = document.getElementById("destination").value;
  const departureDate = document.getElementById("departureDate").value;

  alert(`🎉 Thank you, ${name}!\n\nYour booking with ${cruiseLine} to ${destination} departing on ${departureDate} has been successfully received.\n\nWe’ll contact you shortly with more details.`);

  bookingForm.reset();
  bookingModal.style.display = "none";
});
