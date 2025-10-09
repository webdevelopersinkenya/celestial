
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-img");
  let current = 0;

  // Show the first slide
  slides[current].classList.add("active");

  // Function to change slides
  function changeSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  // Automatically change slide every 5 seconds
  setInterval(changeSlide, 5000);
});

