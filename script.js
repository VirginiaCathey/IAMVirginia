/* ============================================================
   VIRGINIA CATHEY COLLECTIONS — script.js
   Shared across every page. No dependencies.
   Each page: <script src="../script.js"></script>
   Root page: <script src="script.js"></script>
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
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  /* Hero parallax */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    }, { passive: true });
  }

  /* Count-up */
  document.querySelectorAll('.count-up').forEach(el => {
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.unobserve(el);
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const inc = target / (1800 / 16);
      const t = setInterval(() => {
        cur += inc;
        if (cur >= target) { el.textContent = target + suffix; clearInterval(t); }
        else { el.textContent = Math.floor(cur) + suffix; }
      }, 16);
    }, { threshold: 0.5 });
    io.observe(el);
  });

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

})();
