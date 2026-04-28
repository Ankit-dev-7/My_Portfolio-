/**
 * games.js — Game Portfolio Cards + Devlogs
 * Task 10 — Personal Portfolio Website
 */

const THUMB_GRADIENTS = [
  'linear-gradient(135deg, #0a0a0f 0%, #1a0533 40%, #ff00ff22 70%, #00f5ff11 100%)',
  'linear-gradient(135deg, #0a0a0f 0%, #001a33 40%, #00f5ff22 70%, #ffd70011 100%)',
  'linear-gradient(135deg, #0a0a0f 0%, #1a1a00 40%, #ffd70022 70%, #ff00ff11 100%)',
];

const THUMB_GLOWS = [
  'rgba(255,0,255,0.6)',
  'rgba(0,245,255,0.6)',
  'rgba(255,215,0,0.6)',
];

function buildGameCard(game, index) {
  const gradient  = THUMB_GRADIENTS[index % THUMB_GRADIENTS.length];
  const glowColor = THUMB_GLOWS[index % THUMB_GLOWS.length];
  const glowStyle = `drop-shadow(0 0 18px ${glowColor})`;

  const imgMarkup = game.screenshotUrl
    ? `<img src="${game.screenshotUrl}" alt="${game.title} screenshot" loading="lazy" onerror="this.style.display='none'" />`
    : '';

  const playBtn = game.playUrl
    ? `<a href="${game.playUrl}" class="btn-primary game-play-btn" target="_blank" rel="noopener noreferrer" aria-label="Play ${game.title}">▶ Play</a>`
    : `<span class="btn-secondary game-play-btn" aria-label="${game.title} — coming soon" style="opacity:0.5;cursor:default;">Coming Soon</span>`;

  return `
    <article class="game-card glass-card" data-id="${game.id}" aria-label="${game.title}">
      <div class="game-thumb" style="background: ${gradient};">
        <div class="game-thumb-icon" aria-hidden="true" style="filter: ${glowStyle};">🎮</div>
        ${imgMarkup}
      </div>
      <div class="game-body">
        <h3 class="game-title">${game.title}</h3>
        <span class="game-engine">${game.engine}</span>
        <p class="game-desc">${game.description}</p>
        ${playBtn}
      </div>
    </article>
  `.trim();
}

function buildDevlogEntry(log) {
  let formatted = log.date;
  try {
    formatted = new Date(log.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (_) {}

  return `
    <div class="devlog-entry glass-card" data-aos="fade-up">
      <div class="devlog-meta">
        <time class="devlog-date" datetime="${log.date}">${formatted}</time>
        <span class="devlog-game">${log.gameTitle}</span>
      </div>
      <p class="devlog-text">${log.entry}</p>
    </div>
  `.trim();
}

function renderError(grid) {
  grid.innerHTML = `
    <div class="games-error" role="alert">
      <div class="games-error-icon">⚠</div>
      <p class="games-error-title">Games Unavailable</p>
      <p class="games-error-msg">Could not load game data. Please try again later.</p>
    </div>
  `.trim();
}

function attachHoverEffects(grid) {
  grid.querySelectorAll('.game-card').forEach((card) => {
    card.addEventListener('mouseenter', () => card.classList.add('game-card--hover'));
    card.addEventListener('mouseleave', () => card.classList.remove('game-card--hover'));
  });
}

export function initGames() {
  const gamesGrid = document.getElementById('games-grid');
  if (!gamesGrid) return;

  const devlogsContainer = document.getElementById('devlogs');

  fetch('data/games.json')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((games) => {
      if (!games.length) {
        gamesGrid.innerHTML = '<p class="games-empty">No games to display yet.</p>';
      } else {
        gamesGrid.innerHTML = games.map((g, i) => buildGameCard(g, i)).join('');
        attachHoverEffects(gamesGrid);
      }

      if (!devlogsContainer) return;

      const allLogs = games.flatMap((game) =>
        (game.devlogs || []).map((log) => ({ ...log, gameTitle: game.title }))
      );
      allLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (!allLogs.length) {
        devlogsContainer.innerHTML = '<p class="games-empty">No devlog entries yet.</p>';
      } else {
        devlogsContainer.innerHTML = allLogs.map(buildDevlogEntry).join('');
      }
    })
    .catch(() => renderError(gamesGrid));
}
