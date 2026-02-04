/* NO button escape */
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("mouseover", moveNo);
  noBtn.addEventListener("touchstart", moveNo);
}

function moveNo() {
  const isMobile = window.innerWidth < 600;
  const maxX = isMobile ? 120 : 200;
  const maxY = isMobile ? 60 : 100;
  const x = Math.random() * maxX - maxX / 2;
  const y = Math.random() * maxY - maxY / 2;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

/* Sprinkles (only if canvas exists) */
const canvas = document.getElementById("sprinkle");
if (canvas) {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const colors = ["#ff4d6d", "#ff7eb3", "#ffc2d1"];
  const drops = [];

  function addDrop() {
    drops.push({
      x: Math.random() * canvas.width,
      y: -10,
      size: Math.random() * 4 + 3,
      speed: Math.random() * 1.2 + 0.6,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach((d, i) => {
      d.y += d.speed;
      ctx.fillStyle = d.color;
      ctx.fillRect(d.x, d.y, d.size, d.size);
      if (d.y > canvas.height) drops.splice(i, 1);
    });
    requestAnimationFrame(animate);
  }

  setInterval(addDrop, 180);
  animate();
}
