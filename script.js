/* ============================================================
   VIRGINIA CATHEY COLLECTIONS — script.js
   Shared across every page. No dependencies.
   ============================================================ */
(function () {

  /* Nav scroll */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* Hamburger */
  const burger = document.querySelector('.burger');
  const menu   = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  /* Hero parallax — desktop only, mobile stays static */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.innerWidth >= 768) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.12}px)`;
      } else {
        heroBg.style.transform = 'none';
      }
    }, { passive: true });
  }

  /* Count-up — fires on scroll into view OR on load if already visible */
  function runCountUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = 'true';
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    if (isNaN(target)) return;
    const duration = 1600;
    const steps = 60;
    let step = 0;
    const t = setInterval(() => {
      step++;
      const cur = Math.round((step / steps) * target);
      el.textContent = (step >= steps ? target : cur) + suffix;
      if (step >= steps) clearInterval(t);
    }, duration / steps);
  }

  const counters = document.querySelectorAll('.count-up');
  if (counters.length) {
    // Try IntersectionObserver first
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            io.unobserve(e.target);
            setTimeout(() => runCountUp(e.target), 200);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px 0px 0px' });
      counters.forEach(el => io.observe(el));
    } else {
      // Fallback: just run all on load
      counters.forEach(el => runCountUp(el));
    }

    // Additional fallback: run any counter that's already in the viewport on load
    window.addEventListener('load', () => {
      counters.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setTimeout(() => runCountUp(el), 400);
        }
      });
    });
  }

  /* Lightbox */
  const lb    = document.querySelector('.lb');
  const lbImg = lb && lb.querySelector('img');
  const lbX   = lb && lb.querySelector('.lb-x');
  if (lb && lbImg) {
    document.addEventListener('click', e => {
      if (e.target.classList.contains('gp')) {
        lbImg.src = e.target.src;
        lbImg.alt = e.target.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    if (lbX) lbX.addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* Page Transitions */
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('mailto') &&
      !href.startsWith('tel') &&
      !href.startsWith('http') &&
      !href.startsWith('sms') &&
      href.endsWith('.html')
    ) {
      link.addEventListener('click', e => {
        e.preventDefault();
        overlay.classList.add('fade-out');
        setTimeout(() => { window.location.href = href; }, 350);
      });
    }
  });

})();
