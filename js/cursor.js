/**
 * cursor.js — Custom Cursor Tracking
 * Dual-ring cyberpunk cursor with GPU-accelerated lerp trailing effect.
 */

export function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  // Touch detection — hide on coarse pointer devices and bail out
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display  = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  // Current mouse position (snapped — for dot)
  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;

  // Interpolated position (lerped — for ring)
  let ringX = mouseX;
  let ringY = mouseY;

  // Lerp factor: ~0.12 gives a smooth trailing effect at 60fps
  const LERP = 0.12;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover state — add/remove cursor--hover on interactive elements
  const interactiveSelector = 'a, button, [role="button"]';

  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      dot.classList.add('cursor--hover');
      ring.classList.add('cursor--hover');
    }
  });

  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      dot.classList.remove('cursor--hover');
      ring.classList.remove('cursor--hover');
    }
  });

  // rAF loop — 60fps GPU-accelerated positioning via translate3d
  function animate() {
    // Dot snaps immediately to mouse position
    // Preserve scale(1.5) when cursor--hover is active (CSS hover overridden by JS transform)
    const dotScale = dot.classList.contains('cursor--hover') ? ' scale(1.5)' : '';
    dot.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)${dotScale}`;

    // Ring lerps toward mouse position for trailing effect
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    ring.style.transform = `translate3d(calc(${ringX}px - 50%), calc(${ringY}px - 50%), 0)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
