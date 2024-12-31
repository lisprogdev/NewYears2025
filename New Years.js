document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const finalMessage = document.getElementById("finalMessage");
  const mainTitle = document.getElementById("mainTitle");
  let timeLeft = 20;

  function createFirework(x, y) {
    const colors = [
      "#FF5733",
      "#FFC300",
      "#DAF7A6",
      "#900C3F",
      "#C70039",
      "#FF5733",
      "#FFC300",
      "#DAF7A6",
      "#900C3F",
      "#C70039",
    ];

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${Math.random() * 8 + 4}px ${color}`;

      const angle = Math.random() * 360 * (Math.PI / 180);
      const velocity = Math.random() * 50 + 20;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      document.body.appendChild(particle);

      const animation = particle.animate(
        [
          {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
          },
          {
            transform: `translate(${Math.cos(angle) * velocity}px, ${
              Math.sin(angle) * velocity
            }px) scale(0)`,
            opacity: 0.6,
          },
          {
            transform: `translate(${Math.cos(angle) * velocity}px, ${
              Math.sin(angle) * velocity
            }px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: 2000,
          easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
          fill: "forwards",
        }
      );

      animation.onfinish = () => particle.remove();
    }
  }

  function launchFireworks() {
    setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = (Math.random() * window.innerHeight) / 2;
      createFirework(x, y);
    }, 500);
  }

  const countdown = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      countdownElement.style.display = "none";
      finalMessage.classList.add("show");
      mainTitle.style.opacity = 0;

      setTimeout(() => {
        mainTitle.textContent = "Happy New Year!";
        mainTitle.style.opacity = 1;
      }, 1000);

      launchFireworks();
    } else {
      countdownElement.textContent = timeLeft;
      if (timeLeft <= 5) {
        countdownElement.style.fontSize = "8rem";
        countdownElement.style.color = "#FF5733";
      }
    }
  }, 1000);
});
