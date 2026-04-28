/**
 * loader.js — Loading Screen Logic
 *
 * Exports:
 *   showLoader()  — call on DOMContentLoaded; ensures #loading-screen is visible
 *                   and arms a 5-second hard-timeout fallback.
 *   hideLoader()  — call after all modules have initialised; animates the overlay
 *                   out via GSAP (if available) or CSS class, then removes it.
 */

const LOADER_TIMEOUT_MS = 5000;
const EXIT_DURATION_MS  = 500;

let _timeoutId   = null;
let _hideInvoked = false;

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Make the loading screen visible and start the hard-timeout safety net.
 * Safe to call multiple times — subsequent calls are no-ops once the timeout
 * is already armed.
 */
export function showLoader() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  // Ensure the overlay is actually visible (in case it was hidden by CSS/HTML)
  screen.removeAttribute('hidden');
  screen.style.display = '';
  screen.classList.remove('loader--exit');
  screen.setAttribute('aria-hidden', 'true');

  // Arm the hard timeout only once
  if (_timeoutId === null) {
    _timeoutId = setTimeout(() => {
      hideLoader();
    }, LOADER_TIMEOUT_MS);
  }
}

/**
 * Animate the loading screen out and remove it from the DOM.
 * Uses GSAP when available; falls back to the CSS `loader--exit` class.
 * Clears the hard-timeout if it hasn't fired yet.
 */
export function hideLoader() {
  // Guard: only run once
  if (_hideInvoked) return;
  _hideInvoked = true;

  // Cancel the safety timeout (it may have triggered this call — that's fine)
  if (_timeoutId !== null) {
    clearTimeout(_timeoutId);
    _timeoutId = null;
  }

  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  // Prevent further interaction immediately
  screen.setAttribute('aria-hidden', 'true');

  const remove = () => {
    if (screen.parentNode) {
      screen.parentNode.removeChild(screen);
    } else {
      screen.style.display = 'none';
    }
  };

  // ── GSAP path ──────────────────────────────────────────────────────────────
  if (typeof gsap !== 'undefined') {
    gsap.to(screen, {
      opacity: 0,
      scale: 1.05,
      duration: EXIT_DURATION_MS / 1000,
      ease: 'power2.inOut',
      pointerEvents: 'none',
      onComplete: remove,
    });
    return;
  }

  // ── CSS-class fallback ─────────────────────────────────────────────────────
  screen.classList.add('loader--exit');

  // Remove after the CSS transition finishes (or after the timeout as a safety net)
  const onTransitionEnd = () => {
    clearTimeout(fallbackTimer);
    remove();
  };

  screen.addEventListener('transitionend', onTransitionEnd, { once: true });

  // Safety net in case transitionend never fires (e.g. reduced-motion, no transition)
  const fallbackTimer = setTimeout(() => {
    screen.removeEventListener('transitionend', onTransitionEnd);
    remove();
  }, EXIT_DURATION_MS + 100);
}
