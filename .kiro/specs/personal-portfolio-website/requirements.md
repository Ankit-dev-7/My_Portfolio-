# Requirements Document

## Introduction

A premium, futuristic personal portfolio website for a creator who is simultaneously a Stock Trader, Web Developer, and Indie Game Maker. The site uses a cyberpunk/trading-dashboard/indie-game aesthetic with dark UI, glowing accents, glassmorphism cards, and smooth animations. Built with HTML5, CSS3, and JavaScript (GSAP, AOS, Three.js, Chart.js) — no build step required, opens directly in a browser.

## Glossary

- **Portfolio_Site**: The complete personal portfolio website delivered as static files
- **Hero_Section**: The fullscreen landing section at the top of the page
- **About_Section**: The personal introduction and skills section
- **Three_Worlds_Section**: The interactive portal-card section representing Trading, Web Dev, and Game Dev
- **Trading_Section**: The trading portfolio and market analysis dashboard section
- **Web_Projects_Section**: The web development project showcase section
- **Game_Portfolio_Section**: The indie game showcase section
- **Skill_Tree_Section**: The RPG-style interactive skill tree section
- **Timeline_Section**: The animated vertical journey/history timeline section
- **Missions_Section**: The "current missions" / active work-in-progress section
- **Contact_Section**: The contact form and social links section
- **Custom_Cursor**: A custom-styled mouse cursor replacing the browser default
- **Loading_Screen**: An animated overlay shown while the page assets load
- **Dark_Mode_Toggle**: A UI control that switches between dark and light color themes
- **Typing_Animation**: A looping text animation that cycles through role titles
- **Particle_System**: A canvas/WebGL-based animated background of floating particles
- **Chart_Component**: An animated chart rendered via Chart.js
- **Skill_Node**: A single node in the RPG skill tree representing one technology or skill
- **Portal_Card**: A clickable card in the Three Worlds section that navigates or expands to a domain
- **Project_Card**: A card displaying a web project with hover effects and action buttons
- **Game_Card**: A card displaying an indie game with media preview and action buttons
- **Timeline_Entry**: A single dated entry in the animated vertical timeline
- **Mission_Card**: A card in the Current Missions section showing an active project or goal
- **Easter_Egg_Terminal**: A hidden terminal overlay triggered by a secret keyboard command

---

## Requirements

### Requirement 1: Loading Screen

**User Story:** As a visitor, I want to see an animated loading screen when the page first loads, so that I have a polished first impression while assets initialize.

#### Acceptance Criteria

1. WHEN the page begins loading, THE Loading_Screen SHALL display a fullscreen animated overlay covering all page content.
2. WHEN all page assets have loaded, THE Loading_Screen SHALL animate out and reveal the Portfolio_Site within 500ms of load completion.
3. THE Loading_Screen SHALL display a progress indicator or branded animation (logo, name, or thematic graphic) during the loading period.
4. IF the page load exceeds 5 seconds, THEN THE Loading_Screen SHALL display the Portfolio_Site regardless to prevent indefinite blocking.

---

### Requirement 2: Hero Section

**User Story:** As a visitor, I want a dramatic fullscreen landing section, so that I immediately understand who this person is and feel engaged by the aesthetic.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy 100% of the viewport height on initial page load.
2. THE Typing_Animation SHALL cycle through the role titles "Stock Trader", "Web Developer", and "Game Maker" in a looping typewriter effect.
3. THE Hero_Section SHALL display the tagline "Building Markets, Websites & Worlds."
4. THE Particle_System SHALL render an animated background within the Hero_Section using canvas or WebGL.
5. THE Hero_Section SHALL contain at least two CTA buttons linking to relevant sections of the Portfolio_Site.
6. WHEN a visitor clicks a CTA button, THE Portfolio_Site SHALL smooth-scroll to the target section.
7. THE Hero_Section SHALL be fully responsive, maintaining legibility and visual integrity at viewport widths from 320px to 2560px.

---

### Requirement 3: Custom Cursor

**User Story:** As a visitor, I want a custom cursor that matches the cyberpunk aesthetic, so that the interactive feel is consistent throughout the site.

#### Acceptance Criteria

1. THE Custom_Cursor SHALL replace the browser default cursor across the entire Portfolio_Site.
2. WHEN the Custom_Cursor hovers over a clickable element, THE Custom_Cursor SHALL change its visual state (size, color, or shape) to indicate interactivity.
3. THE Custom_Cursor SHALL follow mouse movement with no more than 16ms of visual lag (targeting 60fps tracking).
4. WHERE a touch device is detected, THE Portfolio_Site SHALL hide the Custom_Cursor and restore default touch behavior.

---

### Requirement 4: Navigation

**User Story:** As a visitor, I want a persistent navigation bar, so that I can jump to any section at any time.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a navigation bar that remains visible while scrolling.
2. WHEN the visitor scrolls past the Hero_Section, THE Portfolio_Site SHALL apply a glassmorphism or solid background style to the navigation bar to maintain readability.
3. WHEN a navigation link is clicked, THE Portfolio_Site SHALL smooth-scroll to the corresponding section.
4. THE Portfolio_Site SHALL highlight the navigation link corresponding to the section currently in the viewport.
5. THE Portfolio_Site SHALL include a hamburger menu for navigation on viewport widths below 768px.

---

### Requirement 5: About Section

**User Story:** As a visitor, I want to read a personal introduction and see the creator's tech stack, so that I understand their background and capabilities.

#### Acceptance Criteria

1. THE About_Section SHALL display a personal introduction paragraph describing the creator's identity and background.
2. THE About_Section SHALL display a skills and tech stack grid with icons for each technology.
3. WHEN the About_Section enters the viewport, THE About_Section SHALL trigger scroll-reveal animations on its content elements via AOS or equivalent.
4. THE About_Section SHALL be fully responsive at viewport widths from 320px to 2560px.

---

### Requirement 6: Three Interactive Worlds Section

**User Story:** As a visitor, I want to explore three distinct creative domains through portal-style cards, so that I can navigate to the area most relevant to me.

#### Acceptance Criteria

1. THE Three_Worlds_Section SHALL display exactly three Portal_Cards: "The Market" (Trading), "The Lab" (Web Dev), and "The Arcade" (Game Dev).
2. WHEN a visitor hovers over a Portal_Card, THE Portal_Card SHALL display a 3D tilt or glow animation.
3. WHEN a visitor clicks a Portal_Card, THE Portfolio_Site SHALL smooth-scroll to the corresponding domain section.
4. EACH Portal_Card SHALL display a title, a short description, and a thematic icon or visual.
5. THE Three_Worlds_Section SHALL be fully responsive at viewport widths from 320px to 2560px.

---

### Requirement 7: Trading Portfolio Section

**User Story:** As a visitor interested in trading, I want to see trading strategies and market analysis presented in a dashboard style, so that I can assess the creator's trading expertise.

#### Acceptance Criteria

1. THE Trading_Section SHALL display trading strategy cards describing the creator's approaches to the market.
2. THE Trading_Section SHALL render at least one animated Chart_Component using Chart.js to visualize market or performance data.
3. WHEN the Trading_Section enters the viewport, THE Chart_Component SHALL animate its data into view.
4. THE Trading_Section SHALL use a dashboard-inspired visual layout with stat cards or metric displays.
5. THE Trading_Section SHALL be fully responsive at viewport widths from 320px to 2560px.

---

### Requirement 8: Web Projects Section

**User Story:** As a visitor interested in web development, I want to browse the creator's web projects with filtering and hover effects, so that I can find projects relevant to my interests.

#### Acceptance Criteria

1. THE Web_Projects_Section SHALL display a grid of Project_Cards, each showing a project name, description, tech tags, and action buttons.
2. EACH Project_Card SHALL include a "Live Demo" button and a "GitHub" button.
3. WHEN a visitor hovers over a Project_Card, THE Project_Card SHALL display a 3D tilt or lift animation.
4. THE Web_Projects_Section SHALL provide category filter buttons that show only Project_Cards matching the selected category.
5. WHEN a filter button is clicked, THE Web_Projects_Section SHALL animate the transition between filtered states.
6. THE Web_Projects_Section SHALL be fully responsive at viewport widths from 320px to 2560px.

---

### Requirement 9: Game Portfolio Section

**User Story:** As a visitor interested in game development, I want to see the creator's games with media previews and devlog entries, so that I can explore their game development work.

#### Acceptance Criteria

1. THE Game_Portfolio_Section SHALL display a grid of Game_Cards, each showing a game title, screenshot or video preview, and a description.
2. EACH Game_Card SHALL include a "Play" button linking to the game.
3. THE Game_Portfolio_Section SHALL include a devlogs subsection with dated entries describing development progress.
4. WHEN a visitor hovers over a Game_Card, THE Game_Card SHALL display a visual highlight or zoom animation.
5. THE Game_Portfolio_Section SHALL be fully responsive at viewport widths from 320px to 2560px.

---

### Requirement 10: RPG Skill Tree Section

**User Story:** As a visitor, I want to see the creator's skills displayed as an RPG upgrade tree, so that I can understand their expertise in a visually engaging way.

#### Acceptance Criteria

1. THE Skill_Tree_Section SHALL display Skill_Nodes arranged in a branching tree structure representing skill categories and proficiency levels.
2. EACH Skill_Node SHALL display a skill name and a visual indicator of proficiency level.
3. WHEN a visitor hovers over a Skill_Node, THE Skill_Node SHALL display a tooltip or expanded detail panel.
4. WHEN the Skill_Tree_Section enters the viewport, THE Skill_Tree_Section SHALL animate Skill_Nodes into view sequentially.
5. THE Skill_Tree_Section SHALL be fully responsive at viewport widths from 320px to 2560px.

---

### Requirement 11: Timeline / Journey Section

**User Story:** As a visitor, I want to see an animated vertical timeline of the creator's journey, so that I can understand their history and progression.

#### Acceptance Criteria

1. THE Timeline_Section SHALL display Timeline_Entries in chronological order along a vertical axis.
2. EACH Timeline_Entry SHALL display a date, a title, and a short description.
3. WHEN a Timeline_Entry enters the viewport during scroll, THE Timeline_Entry SHALL animate into view (slide, fade, or reveal).
4. THE Timeline_Section SHALL be fully responsive at viewport widths from 320px to 2560px.

---

### Requirement 12: Current Missions Section

**User Story:** As a visitor, I want to see what the creator is actively working on right now, so that I understand their current focus and momentum.

#### Acceptance Criteria

1. THE Missions_Section SHALL display a set of Mission_Cards each describing an active project, trade, or goal.
2. EACH Mission_Card SHALL display a title, status indicator, and short description.
3. WHEN the Missions_Section enters the viewport, THE Missions_Section SHALL trigger scroll-reveal animations on Mission_Cards.
4. THE Missions_Section SHALL be fully responsive at viewport widths from 320px to 2560px.

---

### Requirement 13: Contact Section

**User Story:** As a visitor who wants to get in touch, I want a stylish contact form and social links, so that I can reach out easily.

#### Acceptance Criteria

1. THE Contact_Section SHALL display a contact form with fields for name, email, and message.
2. WHEN a visitor submits the contact form with all required fields filled, THE Contact_Section SHALL display a confirmation message to the visitor.
3. IF a visitor submits the contact form with one or more required fields empty, THEN THE Contact_Section SHALL display inline validation error messages identifying the missing fields.
4. THE Contact_Section SHALL display social media links as styled icon buttons.
5. THE Contact_Section SHALL be fully responsive at viewport widths from 320px to 2560px.

---

### Requirement 14: Dark Mode Toggle

**User Story:** As a visitor, I want to switch between dark and light themes, so that I can view the site in my preferred visual mode.

#### Acceptance Criteria

1. THE Dark_Mode_Toggle SHALL be accessible from the navigation bar at all times.
2. WHEN the Dark_Mode_Toggle is activated, THE Portfolio_Site SHALL switch to the light color theme within 300ms using a CSS transition.
3. WHEN the Dark_Mode_Toggle is deactivated, THE Portfolio_Site SHALL switch back to the dark color theme within 300ms using a CSS transition.
4. THE Portfolio_Site SHALL persist the visitor's theme preference in localStorage so that it is restored on subsequent visits.

---

### Requirement 15: Scroll Reveal and Parallax Animations

**User Story:** As a visitor, I want smooth scroll-triggered animations and parallax effects throughout the site, so that the browsing experience feels dynamic and premium.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL apply scroll-reveal animations to section content as it enters the viewport, using AOS or GSAP ScrollTrigger.
2. THE Portfolio_Site SHALL apply parallax depth effects to at least the Hero_Section background.
3. WHEN the visitor scrolls, THE Portfolio_Site SHALL update parallax layers at 60fps on devices capable of that frame rate.
4. WHERE a visitor has enabled the "prefers-reduced-motion" OS setting, THE Portfolio_Site SHALL disable or reduce animations to respect accessibility preferences.

---

### Requirement 16: Responsive Design

**User Story:** As a visitor on any device, I want the site to look and function correctly on my screen size, so that I have a consistent experience regardless of device.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render correctly at viewport widths of 320px, 768px, 1024px, and 1440px without horizontal overflow or broken layouts.
2. THE Portfolio_Site SHALL use fluid typography that scales between viewport sizes without fixed pixel font sizes for body text.
3. THE Portfolio_Site SHALL use CSS Grid or Flexbox for all multi-column layouts to ensure flexible reflow.
4. THE Portfolio_Site SHALL pass browser rendering without JavaScript errors on Chrome, Firefox, and Edge (latest stable versions).

---

### Requirement 17: Easter Egg Terminal (Optional)

**User Story:** As a curious visitor, I want to discover a hidden terminal by typing a secret command, so that I can enjoy a fun interactive easter egg.

#### Acceptance Criteria

1. WHERE the Easter_Egg_Terminal feature is enabled, THE Portfolio_Site SHALL listen for a specific keyboard sequence typed anywhere on the page.
2. WHEN the correct keyboard sequence is detected, THE Easter_Egg_Terminal SHALL animate into view as an overlay terminal window.
3. THE Easter_Egg_Terminal SHALL respond to at least three typed commands with thematic output (e.g., `whoami`, `ls projects`, `hack`).
4. WHEN the visitor presses Escape or types `exit`, THE Easter_Egg_Terminal SHALL animate out and close.

---

### Requirement 18: Performance Baseline

**User Story:** As a visitor, I want the site to load and respond quickly, so that I am not frustrated by slow performance.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL achieve a Lighthouse Performance score of 70 or above when tested on a standard desktop connection.
2. THE Portfolio_Site SHALL load and display the Hero_Section within 3 seconds on a simulated Fast 3G connection.
3. THE Portfolio_Site SHALL not block the main thread for more than 200ms during initial page load due to JavaScript execution.
4. WHERE large images are used, THE Portfolio_Site SHALL use compressed formats (WebP or optimized JPEG/PNG) to minimize asset size.
