const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Update this address in both the visible link and its mailto: target before publishing.
const portfolioEmail = "theadeyemianu@gmail.com";
const emailLink = document.getElementById("email-link");
const copyButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");

if (emailLink && portfolioEmail !== "theadeyemianu@gmail.com") {
  emailLink.textContent = portfolioEmail + " ↗";
  emailLink.href = `mailto:${portfolioEmail}`;
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    if (portfolioEmail === "theadeyemianu@gmail.com") {
      copyStatus.textContent = "Add your email address in script.js before using this feature.";
      return;
    }
    try {
      await navigator.clipboard.writeText(portfolioEmail);
      copyStatus.textContent = "Email copied to clipboard.";
    } catch {
      copyStatus.textContent = `Your email address is ${portfolioEmail}`;
    }
  });
}

/* EXPERTISE SLIDER */
(() => {
  const track = document.getElementById("expertiseTrack");
  const previous = document.getElementById("expertisePrev");
  const next = document.getElementById("expertiseNext");
  const current = document.getElementById("expertiseCurrent");
  const dotsContainer = document.getElementById("expertiseDots");

  if (!track || !previous || !next || !current || !dotsContainer) {
    return;
  }

  const cards = Array.from(
    track.querySelectorAll(".expertise-card")
  );

  if (!cards.length) return;

  let activeIndex = 0;
  const dots = [];

  cards.forEach((card, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "slider-dot";
    dot.setAttribute(
      "aria-label",
      `Go to expertise card ${index + 1}`
    );

    dot.addEventListener("click", () => {
      goToCard(index);
    });

    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function goToCard(index) {
    activeIndex = Math.max(0, Math.min(index, cards.length - 1));

    cards[activeIndex].scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth",
      block: "nearest",
      inline: "start"
    });

    updateControls();
  }

  function updateControls() {
    current.textContent = String(activeIndex + 1).padStart(2, "0");

    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === cards.length - 1;

    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;

      dot.classList.toggle("active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "step");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  previous.addEventListener("click", () => {
    goToCard(activeIndex - 1);
  });

  next.addEventListener("click", () => {
    goToCard(activeIndex + 1);
  });

  track.addEventListener("scroll", () => {
    const trackLeft = track.getBoundingClientRect().left;

    let closestIndex = 0;
    let smallestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left - trackLeft
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    });

    activeIndex = closestIndex;
    updateControls();
  }, { passive: true });

  updateControls();
})();
