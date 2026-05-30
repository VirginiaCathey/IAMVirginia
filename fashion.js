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
