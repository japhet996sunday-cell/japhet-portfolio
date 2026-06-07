/* ============================
   JAPHET SUNDAY — PORTFOLIO JS
   ============================ */

"use strict";

// ===== CUSTOM CURSOR =====
(function () {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  let mx = 0, my = 0, fx = 0, fy = 0;
  const ease = 0.12;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });

  function animateFollower() {
    fx += (mx - fx) * ease;
    fy += (my - fy) * ease;
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll("a, button, .skill-item, .project-card, .service-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2)";
      follower.style.width = "56px";
      follower.style.height = "56px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      follower.style.width = "32px";
      follower.style.height = "32px";
    });
  });
})();

// ===== STICKY NAVBAR =====
(function () {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });
})();

// ===== HAMBURGER MENU =====
(function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
})();

// ===== ACTIVE NAV LINK ON SCROLL =====
(function () {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
})();

// ===== TYPING ANIMATION =====
(function () {
  const el = document.getElementById("typingText");
  if (!el) return;

  const words = ["Frontend Developer", "Web Developer", "JavaScript Developer"];
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  function type() {
    const current = words[wordIdx];

    if (paused) return;

    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; }, 2000);
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 80);
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
      setTimeout(type, 45);
    }
  }

  setTimeout(type, 600);
})();

// ===== SCROLL REVEAL =====
(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = Array.from(entry.target.parentElement.querySelectorAll(".reveal"));
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
})();

// ===== SKILL BAR ANIMATION =====
(function () {
  const items = document.querySelectorAll(".skill-item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  items.forEach((el) => observer.observe(el));
})();

// ===== BACK TO TOP =====
(function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// ===== FOOTER YEAR =====
(function () {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

// ===== CONTACT FORM VALIDATION =====
(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successMsg = document.getElementById("formSuccess");

  function showError(input, span, msg) {
    input.classList.add("error");
    span.textContent = msg;
    span.classList.add("visible");
  }

  function clearError(input, span) {
    input.classList.remove("error");
    span.textContent = "";
    span.classList.remove("visible");
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Live clear on input
  nameInput.addEventListener("input", () => clearError(nameInput, nameError));
  emailInput.addEventListener("input", () => clearError(emailInput, emailError));
  messageInput.addEventListener("input", () => clearError(messageInput, messageError));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    successMsg.classList.remove("visible");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
      showError(nameInput, nameError, "Name is required.");
      valid = false;
    } else if (name.length < 2) {
      showError(nameInput, nameError, "Name must be at least 2 characters.");
      valid = false;
    } else {
      clearError(nameInput, nameError);
    }

    if (!email) {
      showError(emailInput, emailError, "Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      showError(emailInput, emailError, "Please enter a valid email address.");
      valid = false;
    } else {
      clearError(emailInput, emailError);
    }

    if (!message) {
      showError(messageInput, messageError, "Message is required.");
      valid = false;
    } else if (message.length < 10) {
      showError(messageInput, messageError, "Message must be at least 10 characters.");
      valid = false;
    } else {
      clearError(messageInput, messageError);
    }

    if (valid) {
      // Simulate send (no backend)
      const submitBtn = form.querySelector(".form-submit");
      submitBtn.textContent = "Sending…";
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = "Send Message →";
        submitBtn.disabled = false;
        successMsg.classList.add("visible");
        setTimeout(() => successMsg.classList.remove("visible"), 5000);
      }, 1200);
    }
  });
})();

// ===== SMOOTH SCROLL for buttons =====
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h") || "72");
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
})();
