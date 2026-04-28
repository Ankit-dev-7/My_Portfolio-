/**
 * timeline.js — Animated Vertical Timeline
 * Task 12 — Personal Portfolio Website
 */

function parseDateValue(dateStr) {
  const months = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:10, dec:11 };
  const parts = String(dateStr).trim().split(/\s+/);
  if (parts.length === 2) {
    const month = months[parts[0].toLowerCase().slice(0, 3)] ?? 0;
    const year  = parseInt(parts[1], 10);
    return year * 12 + month;
  }
  return parseInt(parts[0], 10) * 12;
}

const TYPE_COLORS = {
  trading:   'var(--accent-gold)',
  webdev:    'var(--accent-cyan)',
  gamedev:   'var(--accent-magenta)',
  milestone: '#00e676',
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderTimeline(list, entries) {
  const sorted = [...entries].sort((a, b) => parseDateValue(a.date) - parseDateValue(b.date));
  list.innerHTML = '';

  sorted.forEach((entry, index) => {
    const aosDir   = index % 2 === 0 ? 'fade-right' : 'fade-left';
    const typeColor = TYPE_COLORS[entry.type] || 'var(--accent-cyan)';

    const li = document.createElement('li');
    li.className = 'timeline-entry';
    li.setAttribute('data-aos', aosDir);
    li.setAttribute('data-aos-delay', String(index * 80));

    li.innerHTML = `
      <div class="timeline-card glass-card">
        <p class="timeline-date">${escapeHtml(entry.date)}</p>
        <h3 class="timeline-title">${escapeHtml(entry.title)}</h3>
        ${entry.type ? `<span class="timeline-type-badge" style="color:${typeColor};border-color:${typeColor}">${escapeHtml(entry.type)}</span>` : ''}
        <p class="timeline-desc">${escapeHtml(entry.description)}</p>
      </div>
    `;
    list.appendChild(li);
  });

  if (typeof AOS !== 'undefined') AOS.refresh();
}

function renderTimelineError(list) {
  list.innerHTML = `
    <li class="timeline-error">
      <div class="timeline-card glass-card" style="text-align:center;padding:3rem 2rem;">
        <span style="font-size:2.5rem;display:block;margin-bottom:1rem;">⚠️</span>
        <p style="font-family:var(--font-heading);color:var(--accent-gold);margin-bottom:0.5rem;">Timeline Unavailable</p>
        <p style="color:var(--text-muted);font-size:var(--text-sm);">Could not load timeline data.</p>
      </div>
    </li>
  `;
}

export function initTimeline() {
  const list = document.getElementById('timeline-list');
  if (!list) return;

  fetch('data/timeline.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(entries => renderTimeline(list, entries))
    .catch(() => renderTimelineError(list));
}
