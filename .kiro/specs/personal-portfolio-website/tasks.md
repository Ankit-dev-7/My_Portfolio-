# Implementation Plan: Personal Portfolio Website

## Overview

Build a fully static cyberpunk-aesthetic portfolio site using HTML5, CSS3, and vanilla JavaScript. No build step — opens directly in `index.html`. Libraries loaded via CDN (GSAP, AOS, Three.js, Chart.js, fast-check). Implementation proceeds from foundation (file structure, CSS base, shared utilities) through each of the 10 sections, then cross-cutting features, and finally property-based tests.

## Tasks

- [x] 1. Scaffold project structure and base CSS
  - Create all directories: `css/`, `js/`, `data/`, `assets/images/`, `assets/icons/`
  - Create `index.html` with semantic HTML5 skeleton: `<head>` with all CDN `<script>` and `<link>` tags (GSAP + ScrollTrigger, AOS, Three.js, Chart.js, Google Fonts — Orbitron + Rajdhani), `<noscript>` fallback, and placeholder `<section>` elements for all 10 sections
  - Create `css/base.css`: CSS reset, `:root` custom properties (color palette: `#0a0a0f`, `#0d1117`, `#00f5ff`, `#ff00ff`, `#ffd700`), fluid typography using `clamp()`, and base element styles
  - Create `css/themes.css`: `[data-theme="light"]` overrides for all custom properties; add `transition: background-color 300ms ease, color 300ms ease` on `:root`
  - Create `css/layout.css`: CSS Grid and Flexbox utility classes, section container widths, responsive breakpoints (320px, 768px, 1024px, 1440px)
  - Create `css/animations.css`: `@keyframes` definitions for glow pulse, fade-in, slide-up, and AOS-compatible utility classes
  - Create `css/components.css`: glassmorphism card base (backdrop-filter, semi-transparent bg), button styles, neon glow box-shadow/text-shadow utilities
  - Create `css/sections.css`: placeholder per-section style blocks (filled in later tasks)
  - Create `js/main.js`: ES module entry point that imports and calls `init()` on each module; wires `window.load` event to trigger `hideLoader()` after all inits complete
  - _Requirements: 16.1, 16.2, 16.3, 18.1_

- [x] 2. Implement Loading Screen
  - Add `#loading-screen` HTML structure to `index.html` (logo div, progress bar, loader-text)
  - Create `js/loader.js`: export `showLoader()` called on `DOMContentLoaded` and `hideLoader()` called by `main.js`; implement 5-second hard timeout that calls `hideLoader()` regardless; `hideLoader()` adds `loader--exit` class and uses GSAP to fade-out + scale-down the overlay
  - Add loading screen styles to `css/components.css`: fullscreen fixed overlay, `@keyframes` progress bar fill animation, `loader--exit` transition styles
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 3. Implement Custom Cursor
  - Add `#cursor-dot` and `#cursor-ring` divs to `index.html` (before closing `</body>`)
  - Create `js/cursor.js`: export `initCursor()`; use `requestAnimationFrame` for 60fps tracking; implement lerp for ring trailing effect; add/remove `cursor--hover` class on `pointerenter`/`pointerleave` of `a, button, [role="button"]`; detect `(pointer: coarse)` and hide cursor elements + restore `cursor: auto`
  - Add cursor styles to `css/components.css`: `#cursor-dot` (8px solid circle, position fixed, pointer-events none), `#cursor-ring` (32px ring, transition for expand to 48px on hover state)
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 4. Implement Navigation
  - Add `<nav id="main-nav">` HTML to `index.html` with nav-logo, `<ul class="nav-links">` (10 links), theme-toggle button, and hamburger button with `aria-expanded="false"`
  - Create `js/nav.js`: export `initNav()`; use `IntersectionObserver` (threshold 0.4) on all `<section>` elements to set `active` class on matching nav link; add `nav--scrolled` class when `scrollY > 80`; implement hamburger toggle (toggle `aria-expanded`, open/close mobile menu)
  - Add nav styles to `css/components.css`: sticky positioning, glassmorphism on `nav--scrolled`, `active` link highlight with neon underline, hamburger icon, mobile menu slide-down at `<768px`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 5. Implement Theme Toggle
  - Create `js/theme.js`: export `initTheme()`; on init read `localStorage.getItem('theme')` and apply via `document.documentElement.setAttribute('data-theme', value)` (with `try/catch` for private browsing); wire `#theme-toggle` button click to toggle between `"dark"` and `"light"`, persist to `localStorage`, update button icon
  - _Requirements: 14.1, 14.2, 14.3, 14.4_

  - [ ]* 5.1 Write property test for theme persistence round-trip
    - **Property 1: Theme persistence round-trip**
    - **Validates: Requirements 14.4**
    - Use fast-check `fc.constantFrom("dark", "light")` as generator; for each value call the theme setter, then assert `localStorage.getItem('theme') === value` and `document.documentElement.dataset.theme === value`
    - Tag comment: `// Feature: personal-portfolio-website, Property 1: Theme persistence round-trip`

- [x] 6. Implement Hero Section
  - Add `<section id="hero">` HTML to `index.html`: `<canvas id="hero-canvas">`, heading with `<span id="typing-text">`, tagline "Building Markets, Websites & Worlds.", two CTA buttons (`href="#trading"` and `href="#projects"`)
  - Create `js/hero.js`: export `initHero()`; implement Three.js particle system (`THREE.Scene`, `THREE.PerspectiveCamera`, `THREE.BufferGeometry` with 3000 random points, `THREE.PointsMaterial` cyan, `THREE.WebGLRenderer` on `#hero-canvas`); wrap renderer creation in `try/catch` — on WebGL failure fall back to CSS animated gradient background; add `requestAnimationFrame` loop rotating point cloud on Y-axis; add `window.resize` handler updating camera aspect + renderer size
  - In `js/hero.js`: implement typing animation using `setInterval`; cycle through `["Stock Trader", "Web Developer", "Game Maker"]`; type character-by-character, pause, delete character-by-character; target `#typing-text`
  - Add hero section styles to `css/sections.css`: `height: 100vh`, canvas absolute positioning, heading styles with Orbitron font, CTA button neon glow styles
  - Wire CTA button clicks to smooth-scroll (`scrollIntoView({ behavior: 'smooth' })`)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ]* 6.1 Write property test for typing animation cycles
    - **Property 5: Typing animation cycles through all roles**
    - **Validates: Requirements 2.2**
    - Extract `getNextTypingFrame(state)` as a pure exported function from `hero.js`; use fast-check arbitrary starting state (role index 0–2, char index, direction); run state machine for sufficient steps; assert all 3 role strings were visited
    - Tag comment: `// Feature: personal-portfolio-website, Property 5: Typing animation cycles through all roles`

- [x] 7. Implement Three Worlds Section
  - Add `<section id="three-worlds">` HTML to `index.html`: three `.portal-card` divs each with `data-target` attribute, title, description, and thematic icon placeholder
  - Create `js/threeWorlds.js`: export `initThreeWorlds()`; for each `.portal-card` add `mousemove` listener implementing tilt calculation (`x = (clientX - rect.left) / rect.width - 0.5`, `y = ...`; `transform = perspective(600px) rotateY(${x*20}deg) rotateX(${-y*20}deg)`); add `mouseleave` to reset transform; add GSAP `gsap.to()` pulse on border color on hover; wire card click to smooth-scroll to `data-target` section
  - Add Three Worlds styles to `css/sections.css`: three-column grid, portal card glassmorphism, hover glow box-shadow transition
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 8. Implement Trading Section
  - Create `data/timeline.json` with sample timeline entries (date, title, description, type)
  - Add `<section id="trading">` HTML to `index.html`: stat cards row, strategy cards container, two `<canvas>` elements (`#equity-chart`, `#radar-chart`)
  - Create `js/trading.js`: export `initTrading()`; guard with null check on canvas elements; create Chart.js line chart on `#equity-chart` (simulated monthly P&L data) and radar chart on `#radar-chart` (strategy breakdown); use `IntersectionObserver` to trigger `chart.update()` with `{ duration: 1200, easing: 'easeInOutQuart' }` when section enters viewport
  - Add trading section styles to `css/sections.css`: dashboard grid layout, stat card styles, chart container sizing
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 9. Implement Web Projects Section
  - Create `data/projects.json` with sample project entries (id, name, description, category, tags, liveUrl, githubUrl, imageUrl)
  - Add `<section id="projects">` HTML to `index.html`: filter buttons row (all, frontend, fullstack, tool), empty `#projects-grid` container
  - Create `js/projects.js`: export `initProjects()`; `fetch('data/projects.json')` with `catch` rendering "content unavailable" placeholder on error; render `.project-card` elements with `data-category`, name, description, tech tags, Live Demo and GitHub buttons; implement `filterProjects(projects, category)` as a pure exported function (returns filtered array; "all" returns all); wire filter buttons to re-render grid with fade transition; apply `applyTilt(element)` reusable tilt utility (same algorithm as Three Worlds) to each card
  - Add project section styles to `css/sections.css`: responsive grid, project card styles, filter button active state, tag pill styles
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ]* 9.1 Write property test for project filter invariant
    - **Property 3: Project filter invariant**
    - **Validates: Requirements 8.4**
    - Use fast-check `fc.array(fc.record({ category: fc.constantFrom("frontend","fullstack","tool","game"), ...}))` and `fc.constantFrom("frontend","fullstack","tool","game")` as generators; assert every item in `filterProjects(projects, category)` has `.category === category`
    - Tag comment: `// Feature: personal-portfolio-website, Property 3: Project filter invariant`

- [x] 10. Implement Game Portfolio Section
  - Create `data/games.json` with sample game entries (id, title, description, screenshotUrl, playUrl, engine, devlogs array)
  - Add `<section id="games">` HTML to `index.html`: empty `#games-grid` container, empty `#devlogs` container
  - Create `js/games.js`: export `initGames()`; `fetch('data/games.json')` with error fallback; render `.game-card` elements with title, screenshot `<img>`, description, Play button; render devlog entries sorted by date; add `mouseenter`/`mouseleave` for zoom/highlight animation via CSS class toggle
  - Add game section styles to `css/sections.css`: responsive grid, game card image zoom on hover, devlog entry styles
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 11. Implement RPG Skill Tree Section
  - Create `data/skills.json` with sample skill nodes (id, label, level 0–100, parent, category, icon)
  - Add `<section id="skills">` HTML to `index.html`: `<svg id="skill-tree-svg">` element and a `<div id="skill-tooltip">` for hover tooltips
  - Create `js/skillTree.js`: export `initSkillTree()`; `fetch('data/skills.json')` with error fallback; export `renderSkillNode(node)` as a pure function returning an HTML/SVG string containing the label and a numeric level representation; render SVG programmatically via `document.createElementNS` — `<circle>` + `<text>` groups on a calculated grid, `<line>` edges for parent→child connections, fill opacity mapped to skill level; add `mouseenter` on each node to position and show `#skill-tooltip` via `getBoundingClientRect()`; use `IntersectionObserver` to animate nodes into view sequentially (staggered AOS or GSAP `stagger`)
  - Add skill tree styles to `css/sections.css`: SVG container sizing, tooltip styles, node hover state
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 11.1 Write property test for skill node data completeness
    - **Property 4: Skill node data completeness**
    - **Validates: Requirements 10.1, 10.2**
    - Use fast-check `fc.record({ label: fc.string({ minLength: 1 }), level: fc.integer({ min: 0, max: 100 }), id: fc.string(), parent: fc.option(fc.string()), category: fc.string(), icon: fc.string() })`; assert `renderSkillNode(node)` output contains the label text and a numeric representation of the level
    - Tag comment: `// Feature: personal-portfolio-website, Property 4: Skill node data completeness`

- [x] 12. Implement Timeline Section
  - Add `<section id="timeline">` HTML to `index.html`: empty `#timeline-list` container
  - Create `js/timeline.js`: export `initTimeline()`; `fetch('data/timeline.json')` with error fallback; render `.timeline-entry` elements in chronological order, each with date, title, description; use AOS `data-aos="fade-left"` / `data-aos="fade-right"` attributes (alternating sides) so entries animate in on scroll
  - Add timeline styles to `css/sections.css`: vertical axis line, alternating left/right entry layout, responsive single-column at `<768px`
  - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [x] 13. Implement Current Missions Section
  - Add `<section id="missions">` HTML to `index.html`: empty `#missions-grid` container (or inline mission data)
  - Create `js/missions.js`: export `initMissions()`; render `.mission-card` elements from inline data or `data/missions.json`; each card shows title, status indicator (active/paused/completed), description, and progress bar; apply AOS `data-aos="zoom-in"` for scroll-reveal
  - Add missions styles to `css/sections.css`: mission card glassmorphism, status indicator color coding, progress bar styles
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [x] 14. Implement Contact Section
  - Add `<section id="contact">` HTML to `index.html`: `<form id="contact-form">` with name, email, message fields and submit button; social icon links row
  - Create `js/contact.js`: export `initContact()`; export `validateContactForm({ name, email, message })` as a pure function returning `{ isValid: boolean, errors: string[] }` — invalid when any required field is empty/whitespace-only; wire form `submit` event: call validator, if invalid display inline error messages next to each field, if valid display confirmation message and reset form
  - Add contact styles to `css/sections.css`: form field styles with neon focus glow, error message styles (red), success message styles, social icon button styles
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ]* 14.1 Write property test for contact form validation rejects incomplete submissions
    - **Property 2: Contact form validation rejects incomplete submissions**
    - **Validates: Requirements 13.3**
    - Use fast-check to generate `{ name, email, message }` objects where at least one field is empty or whitespace-only (use `fc.oneof(fc.constant(""), fc.string().map(s => " ".repeat(s.length)))`); assert `validateContactForm(input).isValid === false` and `validateContactForm(input).errors.length >= 1`
    - Tag comment: `// Feature: personal-portfolio-website, Property 2: Contact form validation rejects incomplete submissions`

- [x] 15. Checkpoint — Core sections complete
  - Verify `index.html` loads without console errors in Chrome, Firefox, and Edge
  - Confirm all 10 sections render with placeholder or real data
  - Confirm loading screen appears and exits, nav scroll-spy works, theme toggle persists
  - Ensure all tests pass, ask the user if questions arise.

- [x] 16. Implement Easter Egg Terminal
  - Add `<div id="terminal-overlay">` HTML to `index.html`: terminal window with `#terminal-output` and `#terminal-input` elements
  - Create `js/terminal.js`: export `initTerminal()`; export `handleCommand(cmd)` as a pure function returning `{ output: string }` for commands `whoami`, `ls projects`, `hack`, `help`, `exit` (non-empty output for each; unknown command returns error string); maintain rolling keypress buffer on `document.keydown`; on match of sequence `t-e-r-m-i-n-a-l` use GSAP to animate terminal overlay into view; wire `#terminal-input` keydown Enter to call `handleCommand`, append output to `#terminal-output`; wire Escape key and `exit` command to GSAP animate-out and close
  - Add terminal styles to `css/components.css`: fullscreen overlay, terminal window glassmorphism, monospace font, green-on-black text, blinking cursor
  - _Requirements: 17.1, 17.2, 17.3, 17.4_

  - [ ]* 16.1 Write property test for terminal command response completeness
    - **Property 6: Terminal command response completeness**
    - **Validates: Requirements 17.3**
    - Use fast-check `fc.constantFrom("whoami", "ls projects", "hack", "help", "exit")` as generator; assert `handleCommand(cmd).output.length > 0` for every sampled command
    - Tag comment: `// Feature: personal-portfolio-website, Property 6: Terminal command response completeness`

- [x] 17. Implement scroll/parallax animations and reduced-motion support
  - In `main.js` init: call `AOS.init({ duration: 800, once: true })` after all modules are ready
  - In `js/hero.js`: add GSAP ScrollTrigger parallax on the hero canvas/background layer (`gsap.to('#hero-canvas', { yPercent: 30, ease: 'none', scrollTrigger: { ... } })`)
  - Add `window.matchMedia('(prefers-reduced-motion: reduce)')` check in `main.js`; if true, skip AOS init and pass `{ duration: 0 }` to all GSAP animations; add `@media (prefers-reduced-motion: reduce)` block in `css/animations.css` setting all transitions/animations to `none`
  - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [x] 18. Implement navigation scroll-spy pure function and property test
  - Extract `getActiveSection(ratios)` as a pure exported function from `nav.js`: takes an array of visibility ratios (0.0–1.0), returns the index of the highest ratio (the dominant section)
  - Wire `getActiveSection` into the `IntersectionObserver` callback so the active nav link is set based on its return value
  - _Requirements: 4.4_

  - [ ]* 18.1 Write property test for navigation scroll-spy consistency
    - **Property 7: Navigation scroll-spy consistency**
    - **Validates: Requirements 4.4**
    - Use fast-check `fc.array(fc.float({ min: 0, max: 1 }), { minLength: 1 })` as generator; assert `getActiveSection(ratios)` returns the index of the maximum value and returns exactly one index
    - Tag comment: `// Feature: personal-portfolio-website, Property 7: Navigation scroll-spy consistency`

- [x] 19. Wire all modules in main.js and finalize index.html
  - Ensure `main.js` imports and calls `init()` for every module: `loader`, `cursor`, `nav`, `theme`, `hero`, `threeWorlds`, `trading`, `projects`, `games`, `skillTree`, `timeline`, `missions`, `contact`, `terminal`
  - Add all `<link rel="stylesheet">` tags for all CSS files in correct order in `index.html` `<head>`
  - Add all `<script type="module" src="js/main.js">` tag at end of `<body>`
  - Verify all CDN scripts have `crossorigin="anonymous"` and `defer` attributes
  - Ensure smooth-scroll behavior is set: `html { scroll-behavior: smooth; }` in `base.css`
  - _Requirements: 2.6, 4.3, 16.4_

- [x] 20. Final checkpoint — Ensure all tests pass
  - Run all property-based tests (Properties 1–7) and confirm 100 iterations each pass
  - Verify no JavaScript console errors on page load in Chrome, Firefox, Edge
  - Confirm responsive layout at 320px, 768px, 1024px, 1440px viewport widths
  - Confirm `prefers-reduced-motion` disables animations
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Property tests use fast-check loaded via CDN; run them in a separate `tests/` HTML file or via a minimal Node.js script
- Each property test is tagged with `// Feature: personal-portfolio-website, Property N: <text>` for traceability
- All `fetch()` calls include `.catch()` handlers rendering graceful "content unavailable" placeholders
- `localStorage` calls are wrapped in `try/catch` for private browsing compatibility
- Three.js WebGL creation is wrapped in `try/catch` with CSS gradient fallback
