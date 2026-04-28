/**
 * projects.js — Web Projects Section: Fetch, Render, Filter, 3D Tilt
 * Feature: personal-portfolio-website, Task 9
 */

// ─── Pure Utilities ──────────────────────────────────────────────────────────

/**
 * Pure function: filter projects by category.
 * Returns all projects when category === 'all'.
 *
 * @param {Array<{category: string}>} projects
 * @param {string} category
 * @returns {Array}
 */
export function filterProjects(projects, category) {
  if (!Array.isArray(projects)) return [];
  if (category === 'all') return projects;
  return projects.filter(p => p.category === category);
}

// ─── 3D Tilt (same algorithm as Three Worlds) ────────────────────────────────

/**
 * Apply interactive 3D tilt effect to an element.
 * @param {HTMLElement} element
 */
function applyTilt(element) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    element.style.transform =
      `perspective(600px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.02)`;
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform =
      'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
  });
}

// ─── Rendering ───────────────────────────────────────────────────────────────

/**
 * Build a single project card element.
 * @param {{ id, name, description, category, tags, liveUrl, githubUrl }} project
 * @returns {HTMLElement}
 */
function buildCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card glass-card';
  card.dataset.category = project.category;

  const tagsHtml = (project.tags || [])
    .map(tag => `<span class="tag">${tag}</span>`)
    .join('');

  const liveBtn = project.liveUrl
    ? `<a href="${project.liveUrl}" class="btn-primary btn--sm" target="_blank" rel="noopener noreferrer" aria-label="Live demo of ${project.name}">Live Demo</a>`
    : `<span class="btn-ghost btn--sm btn--disabled" aria-disabled="true">No Demo</span>`;

  const githubBtn = project.githubUrl
    ? `<a href="${project.githubUrl}" class="btn-ghost btn--sm" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository for ${project.name}">GitHub</a>`
    : '';

  const categoryBadge = `<span class="project-category-badge">${project.category}</span>`;

  card.innerHTML = `
    <div class="project-card-inner">
      <div class="project-header">
        <h3 class="project-name">${project.name}</h3>
        ${categoryBadge}
      </div>
      <p class="project-desc">${project.description}</p>
      <div class="project-tags" aria-label="Technologies used">${tagsHtml}</div>
      <div class="project-actions">${liveBtn}${githubBtn}</div>
    </div>
  `;

  return card;
}

/**
 * Render an array of projects into the grid with a fade transition.
 * @param {HTMLElement} grid
 * @param {Array} projects
 */
function renderGrid(grid, projects) {
  // Fade out
  grid.style.opacity = '0';

  setTimeout(() => {
    grid.innerHTML = '';

    if (!projects.length) {
      grid.innerHTML = `
        <div class="projects-empty">
          <p>No projects found in this category.</p>
        </div>`;
    } else {
      projects.forEach(project => {
        const card = buildCard(project);
        grid.appendChild(card);
        applyTilt(card);
      });
    }

    // Fade in
    grid.style.transition = 'opacity 0.35s ease';
    grid.style.opacity = '1';
  }, 200);
}

/**
 * Render a "content unavailable" placeholder in the grid.
 * @param {HTMLElement} grid
 */
function renderError(grid) {
  grid.innerHTML = `
    <div class="projects-error glass-card">
      <div class="projects-error-icon">⚠</div>
      <h3 class="projects-error-title">Content Unavailable</h3>
      <p class="projects-error-msg">Could not load project data. Please try again later.</p>
    </div>`;
}

// ─── Filter Button Wiring ─────────────────────────────────────────────────────

/**
 * Wire filter buttons to re-render the grid on click.
 * @param {NodeList} buttons
 * @param {HTMLElement} grid
 * @param {Array} allProjects
 */
function wireFilters(buttons, grid, allProjects) {
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter || 'all';
      const filtered = filterProjects(allProjects, category);
      renderGrid(grid, filtered);
    });
  });
}

// ─── Entry Point ─────────────────────────────────────────────────────────────

export function initProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return; // Guard: section not present

  const filterButtons = document.querySelectorAll('.filter-btn');

  fetch('data/projects.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(projects => {
      // Initial render — show all
      renderGrid(grid, projects);

      // Wire filter buttons
      if (filterButtons.length) {
        wireFilters(filterButtons, grid, projects);
      }
    })
    .catch(err => {
      console.warn('[projects] Failed to load projects.json:', err);
      renderError(grid);
    });
}
