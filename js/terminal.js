/**
 * terminal.js — Easter Egg Terminal Overlay
 * Task 16 — Personal Portfolio Website
 * Triggered by typing "terminal" anywhere on the page (not in an input).
 * // Feature: personal-portfolio-website, Property 6: Terminal command response completeness
 */

const TRIGGER_SEQUENCE = 'terminal';
const BUFFER_SIZE = TRIGGER_SEQUENCE.length;

const ASCII_WHOAMI = `
 ┌─────────────────────────────────────────────────────────────────────┐
 │  IDENTITY MATRIX LOADED                                             │
 │  ─────────────────────────────────────────────────────────────────  │
 │  NAME     : Portfolio Owner                                         │
 │  ROLES    : Stock Trader  ·  Web Developer  ·  Indie Game Maker     │
 │  MISSION  : Building Markets, Websites & Worlds.                    │
 │  STATUS   : [ ONLINE ]                                              │
 └─────────────────────────────────────────────────────────────────────┘`.trimStart();

const PROJECTS_LIST = `
 ┌─ /projects ──────────────────────────────────────────────────────────┐
 │  Trading Dashboard       [fullstack]  Chart.js · WebSocket           │
 │  Cyberpunk Portfolio     [frontend]   GSAP · Three.js                │
 │  Dev Toolkit CLI         [tool]       Node.js · CLI                  │
 │  Market Screener         [fullstack]  Python · FastAPI               │
 │  Component Library       [frontend]   CSS3 · Vanilla JS              │
 │  Log Analyzer            [tool]       Node.js · Regex                │
 └──────────────────────────────────────────────────────────────────────┘
 6 items  ·  type "help" for more commands`.trimStart();

const HACK_OUTPUT = `
 [SYS] Initiating intrusion sequence...
 [NET] Scanning open ports.............. DONE
 [EXP] Loading exploit modules.......... OK
 [SYS] Bypassing firewall...
       [████████████████████████████████] 100%
 [SYS] Escalating privileges............ ROOT ACQUIRED
 [SYS] ─────────────────────────────────────────
 [SYS] ACCESS GRANTED. Welcome, operator.
 [SYS] Just kidding — this is a portfolio. 😄`.trimStart();

const HELP_OUTPUT = `
 ┌─ Available Commands ─────────────────────────────────────────────────┐
 │  whoami        Display identity matrix                               │
 │  ls projects   List all projects                                     │
 │  hack          Initiate (fake) hack sequence                         │
 │  help          Show this help menu                                   │
 │  exit          Close terminal                                        │
 │                                                                      │
 │  TIP: You found this by typing "terminal" — nice work, operator.     │
 └──────────────────────────────────────────────────────────────────────┘`.trimStart();

/**
 * Pure function: handle a terminal command and return its output.
 * @param {string} cmd
 * @returns {{ output: string }}
 */
export function handleCommand(cmd) {
  const command = (cmd || '').trim().toLowerCase();
  switch (command) {
    case 'whoami':      return { output: ASCII_WHOAMI };
    case 'ls projects': return { output: PROJECTS_LIST };
    case 'hack':        return { output: HACK_OUTPUT };
    case 'help':        return { output: HELP_OUTPUT };
    case 'exit':        return { output: 'Closing terminal...' };
    default:            return { output: `bash: ${cmd || '(empty)'}: command not found\nType "help" to see available commands.` };
  }
}

function appendOutput(outputEl, text) {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.textContent = text;
  outputEl.appendChild(line);
  outputEl.scrollTop = outputEl.scrollHeight;
}

function appendCommand(outputEl, cmd) {
  const line = document.createElement('div');
  line.className = 'terminal-line terminal-line--cmd';
  line.textContent = '> ' + cmd;
  outputEl.appendChild(line);
}

function animateIn(overlay, win) {
  overlay.removeAttribute('hidden');
  if (typeof gsap !== 'undefined') {
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(win, { opacity: 0, scale: 0.88, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' });
  } else {
    overlay.style.opacity = '0';
    win.style.opacity = '0';
    win.style.transform = 'scale(0.88) translateY(24px)';
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.25s ease';
      win.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      overlay.style.opacity = '1';
      win.style.opacity = '1';
      win.style.transform = 'scale(1) translateY(0)';
    });
  }
}

function animateOut(overlay, win) {
  if (typeof gsap !== 'undefined') {
    gsap.to(win, { opacity: 0, scale: 0.88, y: 24, duration: 0.25, ease: 'power2.in' });
    gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
      overlay.setAttribute('hidden', '');
      overlay.style.opacity = '';
      win.style.opacity = '';
      win.style.transform = '';
    }});
  } else {
    overlay.style.transition = 'opacity 0.3s ease';
    win.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    overlay.style.opacity = '0';
    win.style.opacity = '0';
    win.style.transform = 'scale(0.88) translateY(24px)';
    setTimeout(() => {
      overlay.setAttribute('hidden', '');
      overlay.style.opacity = '';
      win.style.opacity = '';
      win.style.transform = '';
    }, 310);
  }
}

export function initTerminal() {
  const overlay = document.getElementById('terminal-overlay');
  if (!overlay) return;

  const termWindow = overlay.querySelector('.terminal-window');
  const outputEl   = document.getElementById('terminal-output');
  const inputEl    = document.getElementById('terminal-input');
  const closeBtn   = document.getElementById('terminal-close');

  let buffer = '';
  let isOpen = false;

  function openTerminal() {
    if (isOpen) return;
    isOpen = true;
    buffer = '';
    if (!outputEl.hasChildNodes()) {
      appendOutput(outputEl, '╔══════════════════════════════════════════════════╗');
      appendOutput(outputEl, '║  PORTFOLIO TERMINAL  v1.0.0                      ║');
      appendOutput(outputEl, '║  Type "help" to see available commands.          ║');
      appendOutput(outputEl, '╚══════════════════════════════════════════════════╝');
      appendOutput(outputEl, '');
    }
    animateIn(overlay, termWindow);
    setTimeout(() => inputEl && inputEl.focus(), 350);
  }

  function closeTerminal() {
    if (!isOpen) return;
    isOpen = false;
    animateOut(overlay, termWindow);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (isOpen) closeTerminal(); return; }
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-BUFFER_SIZE);
    if (buffer === TRIGGER_SEQUENCE) openTerminal();
  });

  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const raw = inputEl.value;
      const cmd = raw.trim().toLowerCase();
      inputEl.value = '';
      if (!cmd) return;
      appendCommand(outputEl, raw.trim());
      const { output } = handleCommand(cmd);
      appendOutput(outputEl, output);
      appendOutput(outputEl, '');
      if (cmd === 'exit') setTimeout(closeTerminal, 400);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeTerminal(); });
}
