/* ============================================================
   VIRGINIA CATHEY COLLECTIONS — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAV SCROLL ────────────────────────────────────────── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── ACTIVE NAV LINK ───────────────────────────────────── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile__links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ─── MOBILE MENU ───────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  const closeMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    hamburger && hamburger.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on any link tap
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    // Close on backdrop tap
    mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMenu(); });
    // Close on Escape
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  /* ─── SCROLL REVEAL ─────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  /* ─── COUNT-UP ──────────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / 2000, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cObs.observe(el));
  }

  /* ─── HERO PARALLAX ─────────────────────────────────────── */
  const heroMedia = document.querySelector('.hero-media');
  if (heroMedia && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      heroMedia.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    }, { passive: true });
  }

  /* ─── MARQUEE PAUSE ─────────────────────────────────────── */
  const marqueeWrapper = document.querySelector('.marquee-wrapper');
  if (marqueeWrapper) {
    marqueeWrapper.addEventListener('mouseenter', () => {
      document.querySelectorAll('.marquee-track').forEach(t => t.style.animationPlayState = 'paused');
    });
    marqueeWrapper.addEventListener('mouseleave', () => {
      document.querySelectorAll('.marquee-track').forEach(t => t.style.animationPlayState = 'running');
    });
  }

  /* ─── LIGHTBOX ──────────────────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
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
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 350);
    };
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  /* ─── SMOOTH ANCHORS ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

});
