/**
 * threeWorlds.js — Portal Card 3D Tilt + Glow Interactions
 * Feature: personal-portfolio-website, Task 7
 */

export function initThreeWorlds() {
  const cards = document.querySelectorAll('.portal-card');

  // Guard: nothing to do if no cards exist
  if (!cards.length) return;

  cards.forEach((card) => {
    // ── 3D Tilt on mousemove ──────────────────────────────────────────────
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        `perspective(600px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.02)`;
    });

    // ── Reset on mouseleave ───────────────────────────────────────────────
    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
    });

    // ── Smooth-scroll helper ──────────────────────────────────────────────
    const navigateToTarget = () => {
      const targetId = card.dataset.target;
      if (!targetId) return;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // ── Click to navigate ─────────────────────────────────────────────────
    card.addEventListener('click', navigateToTarget);

    // ── Keyboard accessibility (Enter / Space) ────────────────────────────
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateToTarget();
      }
    });
  });
}
