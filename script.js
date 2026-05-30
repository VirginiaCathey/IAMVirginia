/* ============================================================
   VIRGINIA CATHEY COLLECTIONS — global.js
   Cursor · Scroll Reveal · Nav Scroll · Mobile Menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CUSTOM CURSOR ──────────────────────────────────────── */
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice()) {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    // Ring follows with slight lag
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Hover state on interactive elements
    const hoverTargets = 'a, button, .btn, .gallery-item, .brand-card, .service-card, .nav-hamburger';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    // Also handle dynamically added elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .btn, .gallery-item, .brand-card, .service-card')) {
        ring.classList.add('hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, .btn, .gallery-item, .brand-card, .service-card')) {
        ring.classList.remove('hover');
      }
    });
  }

  /* ─── NAV SCROLL BEHAVIOR ───────────────────────────────── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const handleNavScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  /* ─── ACTIVE NAV LINK ───────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── MOBILE MENU ───────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay   = document.querySelector('.nav-overlay');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = overlay.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on overlay link click
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── SCROLL REVEAL ─────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ─── COUNT-UP ANIMATION ────────────────────────────────── */
  const countEls = document.querySelectorAll('[data-count]');

  if (countEls.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = performance.now();

          const tick = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;

            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => countObserver.observe(el));
  }

  /* ─── HERO PARALLAX ─────────────────────────────────────── */
  const heroMedia = document.querySelector('.hero-parallax');
  if (heroMedia && !isTouchDevice()) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroMedia.style.transform = `translateY(${scrolled * 0.35}px)`;
    }, { passive: true });
  }

  /* ─── SMOOTH SCROLL FOR ANCHOR LINKS ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
/* ============================================================
   VIRGINIA CATHEY COLLECTIONS — index.js
   Landing page specific JS (minimal — global.js handles most)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Hero name letter split for staggered reveal (optional enhancement)
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    // Already handled by CSS animation — nothing needed
  }

  // Pause press ticker on hover
  const ticker = document.querySelector('.press-ticker__track');
  const tickerWrapper = document.querySelector('.press-ticker');
  if (ticker && tickerWrapper) {
    tickerWrapper.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });
    tickerWrapper.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
  }
});
/* ============================================================
   VIRGINIA CATHEY COLLECTIONS — fashion.js
   Lightbox · Marquee pause-on-hover
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── LIGHTBOX ──────────────────────────────────────────── */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
    // Open on gallery item click
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close button
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Click outside image to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.src = '';
      }, 400);
    }
  }

  /* ─── MARQUEE PAUSE ON HOVER ────────────────────────────── */
  const marqueeWrapper = document.querySelector('.marquee-wrapper');
  if (marqueeWrapper) {
    const tracks = marqueeWrapper.querySelectorAll('.marquee-track');
    marqueeWrapper.addEventListener('mouseenter', () => {
      tracks.forEach(t => t.style.animationPlayState = 'paused');
    });
    marqueeWrapper.addEventListener('mouseleave', () => {
      tracks.forEach(t => t.style.animationPlayState = 'running');
    });
  }

});
/* ============================================================
   VIRGINIA CATHEY COLLECTIONS — shea.js
   Shea page specific JS (minimal — global.js handles most)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Subtle parallax on shea hero texture
  const texture = document.querySelector('.shea-hero__texture');
  if (texture) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      texture.style.transform = `translateY(${scrolled * 0.15}px)`;
    }, { passive: true });
  }
});
/* ============================================================
   VIRGINIA CATHEY COLLECTIONS — finance.js
   Finance page specific JS (Calendly loads via script tag)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Calendly widget is loaded via async script tag in the HTML.
  // No additional initialization needed — it auto-initializes
  // from the data-url attribute on .calendly-inline-widget.
});
