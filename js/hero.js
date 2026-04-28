/**
 * hero.js — Three.js Particle System + Typing Animation + GSAP Parallax
 * Task 6: Full implementation
 */

/* --------------------------------------------------------------------------
   Typing animation state machine — exported as pure function for testing
   -------------------------------------------------------------------------- */

const ROLES = ['Stock Trader', 'Web Developer', 'Game Maker'];

/**
 * Pure state-machine step for the typing animation.
 * State shape: { roleIndex, charIndex, direction, pauseTicks }
 *   direction: 'typing' | 'deleting' | 'pause-after-type' | 'pause-after-delete'
 *
 * @param {object} state
 * @returns {{ state: object, display: string | null }}
 *   display is null when no DOM update is needed (pause tick)
 */
export function getNextTypingFrame(state) {
  const { roleIndex, charIndex, direction, pauseTicks } = state;
  const word = ROLES[roleIndex];

  if (direction === 'pause-after-type') {
    if (pauseTicks > 1) {
      return { state: { ...state, pauseTicks: pauseTicks - 1 }, display: null };
    }
    // Start deleting
    return {
      state: { roleIndex, charIndex, direction: 'deleting', pauseTicks: 0 },
      display: null,
    };
  }

  if (direction === 'pause-after-delete') {
    if (pauseTicks > 1) {
      return { state: { ...state, pauseTicks: pauseTicks - 1 }, display: null };
    }
    // Move to next word, start typing
    const nextRole = (roleIndex + 1) % ROLES.length;
    return {
      state: { roleIndex: nextRole, charIndex: 0, direction: 'typing', pauseTicks: 0 },
      display: '',
    };
  }

  if (direction === 'typing') {
    const nextChar = charIndex + 1;
    const display = word.slice(0, nextChar);
    if (nextChar >= word.length) {
      // Finished typing — enter pause (≈1500ms / 50ms per tick = 30 ticks)
      return {
        state: { roleIndex, charIndex: nextChar, direction: 'pause-after-type', pauseTicks: 30 },
        display,
      };
    }
    return {
      state: { roleIndex, charIndex: nextChar, direction: 'typing', pauseTicks: 0 },
      display,
    };
  }

  if (direction === 'deleting') {
    const nextChar = charIndex - 1;
    const display = word.slice(0, nextChar);
    if (nextChar <= 0) {
      // Finished deleting — enter pause (≈500ms / 30ms per tick ≈ 17 ticks)
      return {
        state: { roleIndex, charIndex: 0, direction: 'pause-after-delete', pauseTicks: 17 },
        display: '',
      };
    }
    return {
      state: { roleIndex, charIndex: nextChar, direction: 'deleting', pauseTicks: 0 },
      display,
    };
  }

  // Fallback — should never reach here
  return { state, display: null };
}

/* --------------------------------------------------------------------------
   initHero — main entry point called by main.js
   -------------------------------------------------------------------------- */
export function initHero() {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  _initParticles(prefersReducedMotion);
  _initTyping(prefersReducedMotion);
  _initParallax(prefersReducedMotion);
}

/* --------------------------------------------------------------------------
   Three.js particle system
   -------------------------------------------------------------------------- */
function _initParticles(prefersReducedMotion) {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // If user prefers reduced motion, skip the 3D canvas entirely
  if (prefersReducedMotion) {
    document.getElementById('hero')?.classList.add('hero--fallback');
    return;
  }

  try {
    if (typeof THREE === 'undefined') {
      throw new Error('Three.js not loaded');
    }

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent background

    // Geometry — 3000 random points distributed in a sphere of radius 5
    const PARTICLE_COUNT = 3000;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Uniform distribution inside a sphere using rejection sampling
      let x, y, z;
      do {
        x = (Math.random() - 0.5) * 2;
        y = (Math.random() - 0.5) * 2;
        z = (Math.random() - 0.5) * 2;
      } while (x * x + y * y + z * z > 1);
      positions[i * 3]     = x * 5;
      positions[i * 3 + 1] = y * 5;
      positions[i * 3 + 2] = z * 5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material
    const material = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation loop
    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      points.rotation.y += 0.0005;
      points.rotation.x += 0.0002;
      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    function onResize() {
      const hero = document.getElementById('hero');
      if (!hero) return;
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // Cleanup on page hide (optional — prevents memory leaks in SPAs)
    window.addEventListener('pagehide', () => {
      cancelAnimationFrame(animId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      window.removeEventListener('resize', onResize);
    });

  } catch (err) {
    console.warn('[hero] WebGL particle system unavailable, using fallback:', err.message);
    document.getElementById('hero')?.classList.add('hero--fallback');
  }
}

/* --------------------------------------------------------------------------
   Typing animation
   -------------------------------------------------------------------------- */
function _initTyping(prefersReducedMotion) {
  const el = document.querySelector('#typing-text');
  if (!el) return;

  // If reduced motion, just show the first role statically
  if (prefersReducedMotion) {
    el.textContent = ROLES[0];
    return;
  }

  let typingState = {
    roleIndex: 0,
    charIndex: 0,
    direction: 'typing',
    pauseTicks: 0,
  };

  // Typing interval: 50ms; deleting: 30ms; pauses handled via tick counts
  // We use a single adaptive interval that adjusts speed based on direction
  let intervalId = null;

  function tick() {
    const { state: nextState, display } = getNextTypingFrame(typingState);
    typingState = nextState;

    if (display !== null) {
      el.textContent = display;
    }

    // Adjust interval speed based on new direction
    const newDelay = _getDelay(typingState.direction);
    const currentDelay = _getDelay(
      typingState.direction === 'pause-after-type' || typingState.direction === 'pause-after-delete'
        ? typingState.direction
        : typingState.direction
    );

    // Re-schedule with correct timing when direction changes
    clearInterval(intervalId);
    intervalId = setInterval(tick, newDelay);
  }

  intervalId = setInterval(tick, _getDelay('typing'));
}

function _getDelay(direction) {
  switch (direction) {
    case 'typing':             return 50;
    case 'deleting':           return 30;
    case 'pause-after-type':   return 50;  // ticks at 50ms, 30 ticks ≈ 1500ms
    case 'pause-after-delete': return 30;  // ticks at 30ms, 17 ticks ≈ 510ms
    default:                   return 50;
  }
}

/* --------------------------------------------------------------------------
   GSAP ScrollTrigger parallax on hero canvas
   -------------------------------------------------------------------------- */
function _initParallax(prefersReducedMotion) {
  if (prefersReducedMotion) return;

  // GSAP and ScrollTrigger are loaded via CDN with defer — they may not be
  // available synchronously. Poll briefly or rely on main.js registration.
  function applyParallax() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to('#hero-canvas', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }

  // Try immediately (main.js may have already registered the plugin)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    applyParallax();
  } else {
    // Defer until after window.load scripts have executed
    window.addEventListener('load', applyParallax, { once: true });
  }
}
