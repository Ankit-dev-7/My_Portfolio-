/**
 * nav.js — Navigation: scroll-spy, scrolled state, hamburger, smooth scroll
 * Feature: personal-portfolio-website
 */

/**
 * Pure function: given an array of visibility ratios (0.0–1.0),
 * returns the index of the section with the highest ratio.
 * Returns 0 if the array is empty.
 *
 * // Feature: personal-portfolio-website, Property 7: Navigation scroll-spy consistency
 *
 * @param {number[]} ratios
 * @returns {number}
 */
export function getActiveSection(ratios) {
  if (!ratios || ratios.length === 0) return 0;
  let maxIdx = 0;
  let maxVal = ratios[0];
  for (let i = 1; i < ratios.length; i++) {
    if (ratios[i] > maxVal) {
      maxVal = ratios[i];
      maxIdx = i;
    }
  }
  return maxIdx;
}

/**
 * Initialise all navigation behaviour:
 *  - Scroll-spy via IntersectionObserver
 *  - nav--scrolled class on scroll
 *  - Hamburger toggle
 *  - Smooth scroll for anchor links and CTA buttons
 */
export function initNav() {
  const nav = document.querySelector('#main-nav');
  if (!nav) return;

  const navLinks  = nav.querySelector('.nav-links');
  const hamburger = nav.querySelector('#hamburger');
  const anchorLinks = nav.querySelectorAll('.nav-links a[href^="#"]');

  // Collect all <section> elements and build a parallel ratios Map
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const ratios   = new Map(sections.map(s => [s.id, 0]));

  // Scroll-spy: IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        ratios.set(entry.target.id, entry.intersectionRatio);
      });

      const ratiosArray = sections.map(s => ratios.get(s.id) ?? 0);
      const activeIdx   = getActiveSection(ratiosArray);
      const activeId    = sections[activeIdx]?.id;

      anchorLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    },
    { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] }
  );

  sections.forEach(section => observer.observe(section));

  // Scrolled state
  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('nav--open', !isOpen);
    });

    anchorLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('nav--open');
      });
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
