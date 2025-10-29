document.addEventListener("DOMContentLoaded", () => {
  // --- Modal Logic ---
  const modal = document.getElementById("bookingModal");
  const openBtn = document.getElementById("openBookingHero");
  const closeBtn = document.getElementById("closeModal");

  // Open modal
  openBtn?.addEventListener("click", () => (modal.style.display = "block"));

  // Close modal
  closeBtn?.addEventListener("click", () => (modal.style.display = "none"));

  // Close when clicking outside modal
  window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
  });

  // --- Form Submission Logic ---
  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = Object.fromEntries(new FormData(form).entries());
      const fullName = formData.fullName || formData.name || "Valued Guest"; // fallback

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyouu0oojzeCUzm1OEG7AcJr1CxjTyQ8IBM0Q_fhxbyfSU5r3cIikBoQcfpe0ZacMaFtQ/exec",
          {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
          }
        );

        const result = await response.json();

        if (result.result === "Success") {
          // Personalized thank-you message
          alert(`🌊 Deseret Cruises International says: Thank you, ${fullName}! Your booking has been received successfully.`);
          
          form.reset();
          modal.style.display = "none";
        } else {
          alert("⚠️ There was a problem recording your booking. Please try again.");
        }
      } catch (error) {
        console.error("Booking Error:", error);
        alert("❌ Network or server error. Please try again later.");
      }
    });
  }
});
