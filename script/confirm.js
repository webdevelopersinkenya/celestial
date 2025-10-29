document.addEventListener("DOMContentLoaded", () => {
  // --- Modal Logic ---
  const modal = document.getElementById("bookingModal");
  const openBtn = document.getElementById("openBookingHero");
  const closeBtn = document.getElementById("closeModal");

  openBtn?.addEventListener("click", () => (modal.style.display = "block"));
  closeBtn?.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
  });

  // --- Thank You Popup Elements ---
  const thankYouBox = document.getElementById("thankYouBox");
  const thankYouMsg = document.getElementById("thankYouMessage");
  const closeThankYou = document.getElementById("closeThankYou");

  closeThankYou.addEventListener("click", () => {
    thankYouBox.style.display = "none";
  });

  // --- Form Submission Logic ---
  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = Object.fromEntries(new FormData(form).entries());
      const fullName = formData.fullName || formData.name || "Valued Guest";

      try {
const response = await fetch(
  "https://script.google.com/macros/s/AKfycbwW92Hm64HP2latYaY1zM6cU5Gj4mWAiUngeSLrXOmiXYK8mmojCxhyuLcRwexndf98/exec",
  {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  }
);


        if (result.result === "Success") {
          // ✅ Show branded popup (instead of alert)
          thankYouMsg.textContent = `Thank you, ${fullName}! Your booking has been received successfully.`;
          thankYouBox.style.display = "flex";

          form.reset();
          modal.style.display = "none";

          // Optional auto-close after 5 seconds
          setTimeout(() => (thankYouBox.style.display = "none"), 5000);
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
