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
