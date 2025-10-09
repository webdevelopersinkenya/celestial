// --- Modal Logic ---
const modal = document.getElementById("bookingModal");
const openBtn = document.getElementById("openBookingModal");
const closeBtn = document.getElementsByClassName("close")[0];

openBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

// --- Form Submission Logic ---
document.getElementById("bookingForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(this).entries());

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyouu0oojzeCUzm1OEG7AcJr1CxjTyQ8IBM0Q_fhxbyfSU5r3cIikBoQcfpe0ZacMaFtQ/exec", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.result === "Success") {
      alert("✅ Thank you! Your booking has been recorded successfully.");
      this.reset();
      modal.style.display = "none";
    } else {
      alert("⚠️ There was a problem recording your booking. Please try again.");
    }
  } catch (error) {
    alert("❌ Error: " + error.message);
  }
});
