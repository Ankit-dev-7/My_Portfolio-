/**
 * trading.js — Trading Dashboard: stat cards, Chart.js charts, strategy cards
 * Task 8 — Personal Portfolio Website
 */

const STATS = [
  { value: '68%',    label: 'Win Rate' },
  { value: '2.4:1',  label: 'Avg R:R' },
  { value: '247',    label: 'Total Trades' },
  { value: '+18.3%', label: 'Best Month' },
];

const EQUITY_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const EQUITY_DATA   = [10000, 10420, 10180, 10850, 11300, 10940, 11680, 12100, 11750, 12480, 13050, 13820];

const RADAR_LABELS = ['Momentum','Swing','Mean Rev','Options','Crypto'];
const RADAR_DATA   = [85, 72, 60, 78, 65];

const STRATEGIES = [
  {
    title: 'Momentum Trading',
    description: 'Capitalising on strong directional moves using breakout entries, volume confirmation, and trailing stops. Best suited for trending markets.',
    metrics: [
      { label: 'Win Rate',  value: '68%' },
      { label: 'Avg R:R',   value: '2.8:1' },
      { label: 'Trades/Mo', value: '18' },
    ],
  },
  {
    title: 'Swing Trading',
    description: 'Multi-day holds targeting key support/resistance levels. Combines price action with RSI divergence for high-probability setups.',
    metrics: [
      { label: 'Win Rate',  value: '62%' },
      { label: 'Avg R:R',   value: '2.1:1' },
      { label: 'Trades/Mo', value: '8' },
    ],
  },
  {
    title: 'Options Strategies',
    description: 'Defined-risk plays using spreads and iron condors. Theta decay and IV crush are the primary edges exploited in this approach.',
    metrics: [
      { label: 'Win Rate',  value: '71%' },
      { label: 'Avg R:R',   value: '1.9:1' },
      { label: 'Trades/Mo', value: '6' },
    ],
  },
];

function renderStatCards(container) {
  container.innerHTML = STATS.map(({ value, label }) => `
    <div class="stat-card glass-card">
      <div class="stat-value">${value}</div>
      <div class="stat-label">${label}</div>
    </div>
  `).join('');
}

function renderStrategyCards(container) {
  container.innerHTML = STRATEGIES.map(({ title, description, metrics }) => `
    <div class="strategy-card glass-card">
      <h3 class="strategy-title">${title}</h3>
      <p class="strategy-desc">${description}</p>
      <div class="strategy-metrics">
        ${metrics.map(m => `
          <div class="strategy-metric">
            <span class="metric-value">${m.value}</span>
            <span class="metric-label">${m.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function buildEquityChart(canvas) {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(0, 245, 255, 0.35)');
  gradient.addColorStop(1, 'rgba(0, 245, 255, 0.00)');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: EQUITY_LABELS,
      datasets: [{
        label: 'Equity ($)',
        data: new Array(EQUITY_DATA.length).fill(null),
        borderColor: '#00f5ff',
        backgroundColor: gradient,
        borderWidth: 2,
        pointBackgroundColor: '#00f5ff',
        pointBorderColor: '#0d1117',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 0 },
      plugins: {
        legend: { labels: { color: '#a0a0b0', font: { family: "'Rajdhani', sans-serif", size: 13 } } },
        tooltip: {
          backgroundColor: 'rgba(13,17,23,0.9)',
          borderColor: '#00f5ff',
          borderWidth: 1,
          titleColor: '#00f5ff',
          bodyColor: '#e0e0e0',
          callbacks: { label: ctx => ` $${ctx.parsed.y.toLocaleString()}` },
        },
      },
      scales: {
        x: { grid: { color: 'rgba(0,245,255,0.05)' }, ticks: { color: '#606070', font: { family: "'Rajdhani', sans-serif" } } },
        y: { grid: { color: 'rgba(0,245,255,0.05)' }, ticks: { color: '#606070', font: { family: "'Rajdhani', sans-serif" }, callback: v => `$${v.toLocaleString()}` } },
      },
    },
  });
}

function buildRadarChart(canvas) {
  const ctx = canvas.getContext('2d');
  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: RADAR_LABELS,
      datasets: [{
        label: 'Strategy Score',
        data: new Array(RADAR_DATA.length).fill(0),
        borderColor: '#ff00ff',
        backgroundColor: 'rgba(255, 0, 255, 0.15)',
        borderWidth: 2,
        pointBackgroundColor: '#ff00ff',
        pointBorderColor: '#0d1117',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 0 },
      plugins: {
        legend: { labels: { color: '#a0a0b0', font: { family: "'Rajdhani', sans-serif", size: 13 } } },
        tooltip: { backgroundColor: 'rgba(13,17,23,0.9)', borderColor: '#ff00ff', borderWidth: 1, titleColor: '#ff00ff', bodyColor: '#e0e0e0' },
      },
      scales: {
        r: {
          min: 0, max: 100,
          grid: { color: 'rgba(255,0,255,0.1)' },
          angleLines: { color: 'rgba(255,0,255,0.15)' },
          pointLabels: { color: '#a0a0b0', font: { family: "'Rajdhani', sans-serif", size: 12 } },
          ticks: { color: '#606070', backdropColor: 'transparent', font: { size: 10 }, stepSize: 25 },
        },
      },
    },
  });
}

function observeSection(section, equityChart, radarChart) {
  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        equityChart.data.datasets[0].data = EQUITY_DATA;
        equityChart.update({ duration: 1200, easing: 'easeInOutQuart' });
        radarChart.data.datasets[0].data = RADAR_DATA;
        radarChart.update({ duration: 1200, easing: 'easeInOutQuart' });
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });
  observer.observe(section);
}

export function initTrading() {
  try {
    const section      = document.getElementById('trading');
    const statsEl      = document.getElementById('trading-stats');
    const strategiesEl = document.getElementById('trading-strategies');
    const equityCanvas = document.getElementById('equity-chart');
    const radarCanvas  = document.getElementById('radar-chart');

    if (!section || !statsEl || !strategiesEl) return;
    renderStatCards(statsEl);
    renderStrategyCards(strategiesEl);
    if (!equityCanvas || !radarCanvas || typeof Chart === 'undefined') return;
    const equityChart = buildEquityChart(equityCanvas);
    const radarChart  = buildRadarChart(radarCanvas);
    observeSection(section, equityChart, radarChart);
  } catch (err) {
    console.error('[trading.js] initTrading error:', err);
  }
}
