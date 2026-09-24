document.addEventListener("DOMContentLoaded", () => {

  const WHATSAPP =
    "https://wa.me/919878808799?text=Hi%20Paaji%2C%20I%E2%80%99d%20like%20to%20book%20a%20cab.";

  // ==========================================
  // WHATSAPP BUTTONS (only those explicitly marked)
  // ==========================================
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(WHATSAPP, "_blank", "noopener,noreferrer");
    });
  });

  // ==========================================
  // FLEET BOOK BUTTONS → WhatsApp
  // ==========================================
  document.querySelectorAll(".book-link").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(WHATSAPP, "_blank", "noopener,noreferrer");
    });
  });

  // ==========================================
  // QUOTE MODAL
  // ==========================================
  const quoteModal = document.getElementById("quoteModal");
  const quoteForm = document.getElementById("quoteForm");

  // Open modal for hero "Get a Quote" and card "Get Quote" buttons
  document.querySelectorAll(".card-btn, .dark-cta").forEach((btn) => {
    const text = btn.textContent.trim().toLowerCase();
    if (!text.includes("quote")) return; // skip "Book Tour" and other buttons

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      quoteModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal (overlay, close button)
  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      quoteModal.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && quoteModal.classList.contains("open")) {
      quoteModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Submit → send details to WhatsApp
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(quoteForm);
      const msg =
        `*New Quote Request*%0A%0A` +
        `*Name:* ${data.get("name")}%0A` +
        `*Phone:* ${data.get("phone")}%0A` +
        `*Pickup:* ${data.get("pickup")}%0A` +
        `*Drop:* ${data.get("drop")}%0A` +
        `*Date:* ${data.get("date")}%0A` +
        `*Vehicle:* ${data.get("vehicle")}%0A` +
        `*Message:* ${data.get("message") || "-"}`;

      window.open(
        `https://wa.me/919878808799?text=${msg}`,
        "_blank",
        "noopener,noreferrer"
      );

      quoteForm.reset();
      quoteModal.classList.remove("open");
      document.body.style.overflow = "";
    });
  }

  // ==========================================
  // TYPING MESSAGE
  // ==========================================
  const typing = document.querySelector("#typing-text");
  const messages = [
    "Need a ride to the Golden Temple?",
    "We are available 24/7.",
    "Book your comfortable ride.",
    "Explore the true culture of Punjab."
  ];

  let mi = 0;
  let ci = 0;
  let deleting = false;

  function typeLoop() {
    if (!typing) return;
    const msg = messages[mi];
    typing.textContent = deleting ? msg.slice(0, --ci) : msg.slice(0, ++ci);

    let delay = deleting ? 45 : 75;

    if (!deleting && ci === msg.length) {
      deleting = true;
      delay = 1900;
    } else if (deleting && ci === 0) {
      deleting = false;
      mi = (mi + 1) % messages.length;
      delay = 350;
    }

    setTimeout(typeLoop, delay);
  }
  setTimeout(typeLoop, 900);

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

});

