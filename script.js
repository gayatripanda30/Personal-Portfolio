document.addEventListener("DOMContentLoaded", () => {
  // ===== Modal Functions =====
  function openModal(id) {
    document.getElementById(id).style.display = "flex";
  }

  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }

  window.onclick = function (e) {
    document.querySelectorAll(".modal").forEach((modal) => {
      if (e.target === modal) modal.style.display = "none";
    });
  };

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // ===== Section Fade-in Animation =====
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
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

  // ===== Navbar Scroll Blur Effect =====
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ===== Active Nav Link Highlight on Scroll =====
  const navLinksEls = document.querySelectorAll(".nav-links a");
  const sectionsEls = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY + window.innerHeight / 3;

    sectionsEls.forEach((sec) => {
      let sectionTop = sec.offsetTop;
      let sectionHeight = sec.offsetHeight;
      let sectionId = sec.getAttribute("id");

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

  // ===== Highlight Nav on Click =====
  navLinksEls.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // stop jump
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Smooth scroll
        targetSection.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile menu if open
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");

      // Update active link color
      navLinksEls.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
