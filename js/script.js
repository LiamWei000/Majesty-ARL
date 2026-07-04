/* ==========================================================================
   MAJESTY ARL — Aurora Blush Petals
   script.js — vanilla JS, no build step, GitHub Pages friendly
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     1. LOADING SCREEN
     ------------------------------------------------------------------ */
  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    if (!loader) return;
    setTimeout(function () {
      loader.classList.add("hide");
    }, 450);
  });

  /* ------------------------------------------------------------------
     2. NAVBAR: scroll state, active link, scroll progress
     ------------------------------------------------------------------ */
  var navbar = document.getElementById("navbar");
  var scrollProgress = document.getElementById("scrollProgress");
  var sections = document.querySelectorAll("main section[id], .join-cta[id]");
  var navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;

    // navbar background state
    if (navbar) {
      if (y > 40) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    }

    // scroll progress bar
    if (scrollProgress) {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
      scrollProgress.style.width = pct + "%";
    }

    // active section highlight
    var current = "";
    sections.forEach(function (sec) {
      var top = sec.offsetTop - 120;
      if (y >= top) current = sec.getAttribute("id");
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === "#" + current);
    });
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     3. MOBILE MENU
     ------------------------------------------------------------------ */
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMobileMenu() {
    if (!mobileMenu || !navToggle) return;
    mobileMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileMenu();
    });
  }

  /* ------------------------------------------------------------------
     4. SMOOTH SCROLL (with navbar offset) for in-page anchors
     ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = navbar ? navbar.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      history.pushState(null, "", id);
    });
  });

  /* ------------------------------------------------------------------
     5. INTERSECTION OBSERVER — reveal animations
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".reveal, .reveal-scale");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ------------------------------------------------------------------
     6. COUNTER ANIMATION (hero stats)
     ------------------------------------------------------------------ */
  var counters = document.querySelectorAll("[data-counter]");
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    if (reduceMotion) { el.textContent = target; return; }
    var start = 0;
    var duration = 1400;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(start + (target - start) * eased);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  if (counters.length && "IntersectionObserver" in window) {
    var counterIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) { counterIO.observe(c); });
  }

  /* ------------------------------------------------------------------
     7. TEAM FILTER
     ------------------------------------------------------------------ */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var teamCards = document.querySelectorAll(".team-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      var filter = btn.getAttribute("data-filter");
      teamCards.forEach(function (card) {
        var role = card.getAttribute("data-role");
        var show = filter === "all" || filter === role;
        card.style.display = show ? "" : "none";
      });
    });
  });

  /* ------------------------------------------------------------------
     8. FAQ ACCORDION
     ------------------------------------------------------------------ */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // close all other items (single-open accordion)
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        question.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ------------------------------------------------------------------
     9. GALLERY LIGHTBOX
     ------------------------------------------------------------------ */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxPrev = document.getElementById("lightboxPrev");
  var lightboxNext = document.getElementById("lightboxNext");
  var currentIndex = 0;

  function openLightbox(index) {
    if (!lightbox || !galleryItems[index]) return;
    currentIndex = index;
    var item = galleryItems[index];
    lightboxImg.src = item.getAttribute("data-full");
    lightboxImg.alt = item.getAttribute("data-caption") || "";
    lightboxCaption.textContent = item.getAttribute("data-caption") || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function showNext(step) {
    currentIndex = (currentIndex + step + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () { openLightbox(index); });
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "Perbesar gambar: " + (item.getAttribute("data-caption") || ""));
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", function () { showNext(-1); });
  if (lightboxNext) lightboxNext.addEventListener("click", function () { showNext(1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showNext(-1);
    if (e.key === "ArrowRight") showNext(1);
  });

  /* ------------------------------------------------------------------
     10. BUTTON RIPPLE MICRO-INTERACTION
     ------------------------------------------------------------------ */
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (reduceMotion) return;
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      var size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 650);
    });
  });

  /* ------------------------------------------------------------------
     11. FLOATING PETALS — lightweight canvas ambient animation (hero)
     ------------------------------------------------------------------ */
  var canvas = document.getElementById("petal-canvas");
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var petals = [];
    var petalCount = window.innerWidth < 768 ? 14 : 24;
    var heroSection = document.getElementById("home");
    var rafId;

    function resizeCanvas() {
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
    }

    function createPetal() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        r: 4 + Math.random() * 6,
        speedY: 0.4 + Math.random() * 0.8,
        speedX: Math.random() * 0.6 - 0.3,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: 0.008 + Math.random() * 0.01,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.35 + Math.random() * 0.4
      };
    }

    function initPetals() {
      petals = [];
      for (var i = 0; i < petalCount; i++) petals.push(createPetal());
    }

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "#f6c9dc";
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function animatePetals() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(function (p) {
        p.y += p.speedY;
        p.drift += p.driftSpeed;
        p.x += p.speedX + Math.sin(p.drift) * 0.5;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        drawPetal(p);
      });
      rafId = requestAnimationFrame(animatePetals);
    }

    resizeCanvas();
    initPetals();
    animatePetals();

    var resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        resizeCanvas();
        initPetals();
      }, 250);
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(animatePetals);
      }
    });
  }

  /* ------------------------------------------------------------------
     12. FOOTER YEAR
     ------------------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     13. HERO PARALLAX (subtle, disabled on reduced motion / mobile)
     ------------------------------------------------------------------ */
  var heroVideo = document.querySelector(".hero-video");
  if (heroVideo && !reduceMotion && window.innerWidth >= 1024) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        heroVideo.style.transform = "translateY(" + y * 0.15 + "px)";
      }
    }, { passive: true });
  }
})();
