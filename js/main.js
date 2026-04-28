/**
 * main.js â€” ES Module Entry Point
 * Imports and initialises all portfolio modules in order.
 * Wires DOMContentLoaded â†’ showLoader, window.load â†’ init all + hideLoader.
 */



/* --------------------------------------------------------------------------
   Reduced-motion preference â€” checked once, shared across modules
   -------------------------------------------------------------------------- */
export const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------------------------------
   DOMContentLoaded â€” show loader immediately
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
});

/* --------------------------------------------------------------------------
   window.load â€” initialise all modules, then hide loader
   -------------------------------------------------------------------------- */
window.addEventListener('load', async () => {
  hideLoader();
  try {

window.addEventListener('DOMContentLoaded', function() {
  var s = document.getElementById('loading-screen');
  if (s) { s.style.opacity = '0'; setTimeout(function(){ s.style.display='none'; }, 600); }
});



