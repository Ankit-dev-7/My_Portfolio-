/**
 * missions.js — Current Missions / Active Projects Section
 * Task 13 — Personal Portfolio Website
 */

const MISSIONS = [
  {
    title: 'Building This Portfolio',
    status: 'active',
    description: 'Crafting a cyberpunk-aesthetic portfolio that fuses trading, web dev, and game dev into one experience.',
    progress: 90,
  },
  {
    title: 'Algo Trading Bot v2',
    status: 'active',
    description: 'Refining a momentum-based trading algorithm with improved risk management and backtesting framework.',
    progress: 65,
  },
  {
    title: 'Void Protocol — Puzzle Game',
    status: 'active',
    description: 'Developing a minimalist space puzzle game in Phaser 3. Currently building puzzle set 3.',
    progress: 45,
  },
  {
    title: 'Full-Stack SaaS Dashboard',
    status: 'paused',
    description: 'A real-time analytics dashboard for small trading firms. Paused while focusing on the portfolio.',
    progress: 30,
  },
];

export function initMissions() {
  const grid = document.getElementById('missions-grid');
  if (!grid) return;

  grid.innerHTML = MISSIONS.map((mission, i) => `
    <div class="mission-card glass-card" data-aos="zoom-in" data-aos-delay="${i * 100}">
      <div class="mission-header">
        <h3 class="mission-title">${mission.title}</h3>
        <span class="mission-status mission-status--${mission.status}">${mission.status}</span>
      </div>
      <p class="mission-desc">${mission.description}</p>
      <div class="mission-progress-label">
        <span>Progress</span>
        <span>${mission.progress}%</span>
      </div>
      <div class="mission-progress-bar">
        <div class="mission-progress-fill" style="width: ${mission.progress}%"></div>
      </div>
    </div>
  `).join('');
}
