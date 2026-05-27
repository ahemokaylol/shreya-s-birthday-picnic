// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// random sticker placement
const stickers = document.querySelectorAll('.sticker');

stickers.forEach(sticker => {
  sticker.style.top = Math.random() * 85 + "%";
  sticker.style.left = Math.random() * 90 + "%";
  sticker.style.animationDelay = Math.random() * 4 + "s";
});

// reveal on scroll
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});
