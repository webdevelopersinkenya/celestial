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

  closeThankYou?.addEventListener("click", () => {
    thankYouBox.style.display = "none";
  });

  // --- Create Loading Spinner ---
  const loadingOverlay = document.createElement("div");
  loadingOverlay.id = "loadingOverlay";
  loadingOverlay.innerHTML = `
    <div class="spinner"></div>
    <p class="loading-text">Processing your booking, please wait...</p>
  `;
  document.body.appendChild(loadingOverlay);

  // --- Hide initially ---
  loadingOverlay.style.display = "none";

  // --- Form Submission Logic ---
  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = Object.fromEntries(new FormData(form).entries());
      const fullName = formData.fullName || formData.name || "Valued Guest";

      // Show loading spinner
      loadingOverlay.style.display = "flex";

      try {
        // ✅ Replace with your actual deployed Google Apps Script URL
        const response = await fetch(
  "https://script.google.com/macros/s/AKfycbxCC3lSBeJPsMtxT5koUfvWN6jg70XKVaMuzkMADZo7Ctl4Td9HIN_jH5p_hgzXClQw/exec",
  {
    method: "POST",
    mode: "cors", // ✅ allow CORS
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }
);


        if (!response.ok) throw new Error(`Server error ${response.status}`);

        const result = await response.json();

        if (result.result === "Success") {
          thankYouMsg.textContent = `🌊 Deseret Cruises International says: Thank you, ${fullName}! Your booking has been received successfully.`;
          thankYouBox.style.display = "flex";

          form.reset();
          modal.style.display = "none";

          setTimeout(() => (thankYouBox.style.display = "none"), 5000);
        } else {
          alert("⚠️ There was a problem recording your booking. Please try again.");
        }
      } catch (error) {
        console.error("Booking Error:", error);
        alert("❌ Network or server error. Please try again later.");
      } finally {
        // Hide spinner
        loadingOverlay.style.display = "none";
      }
    });
  }
});
