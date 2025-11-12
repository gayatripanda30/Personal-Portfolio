document.addEventListener("DOMContentLoaded", () => {
  // ===== MODAL HANDLING =====
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "flex";
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
  }

  // Make modal functions accessible globally (for inline button onclick)
  window.openModal = openModal;
  window.closeModal = closeModal;

  // Close modal when clicking outside content
  window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach((modal) => {
      if (e.target === modal) modal.style.display = "none";
    });
  });

  // ===== MOBILE MENU TOGGLE =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // ===== SECTION FADE-IN ANIMATION =====
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const navLinksEls = document.querySelectorAll(".nav-links a");
  const sectionsEls = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + window.innerHeight / 3;

    sectionsEls.forEach((sec) => {
      const sectionTop = sec.offsetTop;
      const sectionHeight = sec.offsetHeight;
      const sectionId = sec.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinksEls.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // ===== SMOOTH SCROLL + ACTIVE LINK ON CLICK =====
  navLinksEls.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile menu if open
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");

      // Update active link state
      navLinksEls.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
