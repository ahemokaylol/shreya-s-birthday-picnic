// Countdown Timer
function startCountdown() {
  const eventDate = new Date("June 20, 2026 11:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      document.getElementById("countdown").innerHTML = 
        `<p style="font-size:1.3rem; margin:20px 0;">🎉 It's picnic day!</p>`;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
  }, 1000);
}

// Confetti
function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#243324', '#6b8e6b', '#f6e27a', '#d7efc2', '#c7e6ff'];
  const pieces = [];

  class Piece {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.size = Math.random() * 14 + 8;
      this.speed = Math.random() * 5 + 5;
      this.angle = Math.random() * 360;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = Math.random() * 0.15 - 0.05;
    }
    update() {
      this.y += this.speed;
      this.angle += this.rotation;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
      ctx.restore();
    }
  }

  for (let i = 0; i < 200; i++) {
    pieces.push(new Piece());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    pieces.forEach(piece => {
      piece.update();
      piece.draw();
      if (piece.y < canvas.height) active = true;
    });

    if (active) requestAnimationFrame(animate);
  }

  animate();

  setTimeout(() => {
    canvas.style.transition = 'opacity 1.5s';
    canvas.style.opacity = '0';
  }, 5000);
}

// Form Submission
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const attendance = document.getElementById('attendance-select').value;

  this.style.transition = 'opacity 0.4s';
  this.style.opacity = '0';

  setTimeout(() => {
    this.style.display = 'none';
    document.getElementById('success-message').style.display = 'block';

    if (attendance === 'yes') {
      launchConfetti();
    }
  }, 500);
});

// Initialize
startCountdown();
}
