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

        MailApp.sendEmail({
  to: "mirah.gabriel1969@gmail.com",
  subject: "New Booking Received",
  htmlBody: `<p><b>${payload.fullName}</b> just made a booking.</p>
             <p>Email: ${payload.email}</p>
             <p>Phone: ${payload.phone}</p>
             <p>Message: ${payload.message}</p>`
});

        // Convert FormData to URL-encoded string
const urlEncoded = new URLSearchParams(formData);

// ✅ Use your deployed Google Apps Script Web App URL here:
const webAppUrl = "https://script.google.com/macros/s/AKfycbxTaFW4ezIQMv_amlvLeLf2ThSLTJcF7g_B2XRjPtOc_0vFwUJwKvWghb54x0B2eNbduA/exec";

const response = await fetch(webAppUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  body: urlEncoded.toString(),
});

const result = await response.json();


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
