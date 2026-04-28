/**
 * theme.js — Dark / Light Theme Toggle + localStorage Persistence
 *
 * Exports:
 *   initTheme()  — reads persisted preference, applies it, wires the toggle button
 *   setTheme(value)  — applies a theme value ('dark' | 'light') and persists it
 *   getTheme()   — returns the currently active theme string
 */

/* --------------------------------------------------------------------------
   Constants
   -------------------------------------------------------------------------- */
const STORAGE_KEY   = 'theme';
const VALID_THEMES  = ['dark', 'light'];
const DEFAULT_THEME = 'dark';

/** Icon shown in the toggle button for each mode. */
const ICONS = {
  dark:  '◐',   // half-moon — indicates dark mode is active
  light: '☀',   // sun — indicates light mode is active
};

/* --------------------------------------------------------------------------
   Internal helpers
   -------------------------------------------------------------------------- */

/**
 * Safely read a value from localStorage.
 * Returns null when localStorage is unavailable (private browsing, etc.).
 * @param {string} key
 * @returns {string|null}
 */
function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}

/**
 * Safely write a value to localStorage.
 * Silently swallows errors (private browsing, storage quota, etc.).
 * @param {string} key
 * @param {string} value
 */
function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (_) {
    // Unavailable — continue without persistence
  }
}

/* --------------------------------------------------------------------------
   Public API
   -------------------------------------------------------------------------- */

/**
 * Returns the currently active theme ('dark' | 'light').
 * Reads from the data-theme attribute on <html>; falls back to DEFAULT_THEME.
 * @returns {'dark'|'light'}
 */
export function getTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  return VALID_THEMES.includes(current) ? current : DEFAULT_THEME;
}

/**
 * Applies a theme, persists it to localStorage, and updates the toggle button icon.
 * @param {'dark'|'light'} value
 */
export function setTheme(value) {
  const theme = VALID_THEMES.includes(value) ? value : DEFAULT_THEME;

  // Apply to <html data-theme="..."> — CSS transitions handle the visual change
  document.documentElement.setAttribute('data-theme', theme);

  // Persist for next visit
  storageSet(STORAGE_KEY, theme);

  // Update button icon
  const iconEl = document.querySelector('#theme-toggle .theme-icon');
  if (iconEl) {
    iconEl.textContent = ICONS[theme];
  }

  // Update aria-label for accessibility
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
}

/**
 * Initialises the theme system:
 *   1. Reads the persisted preference from localStorage.
 *   2. Applies it (defaults to 'dark' if nothing is stored or value is invalid).
 *   3. Wires the #theme-toggle button to toggle between 'dark' and 'light'.
 */
export function initTheme() {
  // 1. Determine initial theme
  const saved   = storageGet(STORAGE_KEY);
  const initial = VALID_THEMES.includes(saved) ? saved : DEFAULT_THEME;

  // 2. Apply without triggering a transition flash on first paint
  //    (the CSS transition is on :root, so setting the attribute before the
  //    first paint keeps things instant on load)
  setTheme(initial);

  // 3. Wire toggle button
  const btn = document.getElementById('theme-toggle');
  if (!btn) {
    console.warn('[theme] #theme-toggle button not found in DOM');
    return;
  }

  btn.addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
}
