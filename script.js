// Scroll to top on page load/refresh
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

// Confetti Function
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

// Form Submission (AJAX - No Formspree redirect)
document.getElementById('rsvp-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = this;
  const attendance = document.getElementById('attendance-select').value;
  const formData = new FormData(form);

  // Submit to Formspree via fetch
  try {
    const response = await fetch('https://formspree.io/f/mzdwyydy', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Success
      form.style.transition = 'opacity 0.4s';
      form.style.opacity = '0';

      setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('success-message').style.display = 'block';

        if (attendance === 'yes') {
          launchConfetti();
        }
      }, 400);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Connection error. Please check your internet and try again.");
  }
});

// Initialize everything
startCountdown();
