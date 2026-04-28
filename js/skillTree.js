/**
 * skillTree.js — RPG Skill Tree Section
 * Task 11 — Personal Portfolio Website
 */

const CATEGORY_COLORS = {
  frontend: { border: '#00f5ff', glow: 'rgba(0,245,255,0.35)', text: '#00f5ff' },
  backend:  { border: '#ff00ff', glow: 'rgba(255,0,255,0.35)', text: '#ff00ff' },
  trading:  { border: '#ffd700', glow: 'rgba(255,215,0,0.35)', text: '#ffd700' },
  gamedev:  { border: '#00ff88', glow: 'rgba(0,255,136,0.35)', text: '#00ff88' },
};

/**
 * Pure function: render a skill node to an HTML string.
 * Returns a string containing the node's label and a numeric level representation.
 * // Feature: personal-portfolio-website, Property 4: Skill node data completeness
 */
export function renderSkillNode(node) {
  const level = Number(node.level) || 0;
  const icon  = node.icon || '◆';
  return `<div class="skill-node" data-id="${node.id}" data-level="${level}" data-label="${node.label}">
  <div class="skill-node-header">
    <span class="skill-node-label"><span class="skill-node-icon" aria-hidden="true">${icon}</span>${node.label}</span>
    <span class="skill-node-level">${level}</span>
  </div>
  <div class="skill-bar" role="progressbar" aria-valuenow="${level}" aria-valuemin="0" aria-valuemax="100" aria-label="${node.label} proficiency ${level}%">
    <div class="skill-bar-fill" style="--target-width: ${level}%"></div>
  </div>
</div>`;
}

function renderError(container) {
  container.innerHTML = `
    <div class="skill-tree-error">
      <span class="skill-tree-error-icon">⚠️</span>
      <p class="skill-tree-error-title">Skill data unavailable</p>
      <p class="skill-tree-error-msg">Could not load skills.json.</p>
    </div>`;
}

function showTooltip(tooltip, nodeEl, label, level) {
  const rect = nodeEl.getBoundingClientRect();
  const ttWidth = 180;
  let left = rect.right + 12;
  let top  = rect.top + rect.height / 2 - 28;
  if (left + ttWidth > window.innerWidth - 8) left = rect.left - ttWidth - 12;
  top = Math.max(8, Math.min(top, window.innerHeight - 80));
  tooltip.style.left = `${left}px`;
  tooltip.style.top  = `${top}px`;
  tooltip.innerHTML  = `<span class="tooltip-label">${label}</span><span class="tooltip-level">LVL ${level}</span>`;
  tooltip.classList.add('visible');
  tooltip.removeAttribute('aria-hidden');
}

function hideTooltip(tooltip) {
  tooltip.classList.remove('visible');
  tooltip.setAttribute('aria-hidden', 'true');
}

function wireTooltips(container, tooltip) {
  container.querySelectorAll('.skill-node').forEach(nodeEl => {
    const label = nodeEl.dataset.label || '';
    const level = parseInt(nodeEl.dataset.level, 10) || 0;
    nodeEl.addEventListener('mouseenter', () => showTooltip(tooltip, nodeEl, label, level));
    nodeEl.addEventListener('mouseleave', () => hideTooltip(tooltip));
    nodeEl.addEventListener('focusin',    () => showTooltip(tooltip, nodeEl, label, level));
    nodeEl.addEventListener('focusout',   () => hideTooltip(tooltip));
  });
}

function observeNodes(section) {
  const nodes = section.querySelectorAll('.skill-node');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nodes.forEach((node, i) => {
        setTimeout(() => {
          node.classList.add('skill-node--visible');
          const fill = node.querySelector('.skill-bar-fill');
          if (fill) fill.style.width = (node.dataset.level || '0') + '%';
        }, i * 80);
      });
      observer.disconnect();
    });
  }, { threshold: 0.15 });
  observer.observe(section);
}

function buildTree(nodes, wrapper, tooltip) {
  const roots    = nodes.filter(n => n.parent === null);
  const children = nodes.filter(n => n.parent !== null);

  const treeEl = document.createElement('div');
  treeEl.className = 'skill-tree';

  roots.forEach(root => {
    const colors = CATEGORY_COLORS[root.category] || CATEGORY_COLORS.frontend;
    const kids   = children.filter(c => c.parent === root.id);

    const catEl = document.createElement('div');
    catEl.className = 'skill-category glass-card';
    catEl.style.setProperty('--cat-border', colors.border);
    catEl.style.setProperty('--cat-glow',   colors.glow);
    catEl.style.setProperty('--cat-text',   colors.text);
    catEl.style.borderColor = colors.border;

    const titleEl = document.createElement('div');
    titleEl.className = 'skill-category-title';
    titleEl.innerHTML = `<span class="skill-cat-icon" aria-hidden="true">${root.icon || '◆'}</span>${root.label}`;
    titleEl.style.color      = colors.text;
    titleEl.style.textShadow = `0 0 12px ${colors.border}`;

    const nodesEl = document.createElement('div');
    nodesEl.className = 'skill-nodes';
    nodesEl.innerHTML = kids.map(k => renderSkillNode(k)).join('');

    catEl.appendChild(titleEl);
    catEl.appendChild(nodesEl);
    treeEl.appendChild(catEl);
  });

  wrapper.appendChild(treeEl);
  wireTooltips(wrapper, tooltip);
}

export function initSkillTree() {
  const section = document.getElementById('skills');
  if (!section) return;

  const svgEl  = document.getElementById('skill-tree-svg');
  const tooltip = document.getElementById('skill-tooltip');
  if (!svgEl || !tooltip) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'skill-tree-container';
  wrapper.className = 'skill-tree-container';
  svgEl.replaceWith(wrapper);

  fetch('data/skills.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      const nodes = data.nodes || [];
      if (!nodes.length) throw new Error('Empty nodes');
      buildTree(nodes, wrapper, tooltip);
      observeNodes(section);
    })
    .catch(err => {
      console.warn('[skillTree] Failed to load skills.json:', err);
      renderError(wrapper);
    });
}
