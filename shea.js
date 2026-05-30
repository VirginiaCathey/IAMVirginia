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
