/**
 * contact.js — Contact Form Validation + Submission
 * Task 14 — Personal Portfolio Website
 * // Feature: personal-portfolio-website, Property 2: Contact form validation rejects incomplete submissions
 */

/**
 * Pure function: validate contact form fields.
 * @param {{ name: string, email: string, message: string }} fields
 * @returns {{ isValid: boolean, errors: { field: string, message: string }[] }}
 */
export function validateContactForm({ name, email, message }) {
  const errors = [];
  if (!name || name.trim() === '')    errors.push({ field: 'name',    message: 'Name is required.' });
  if (!email || email.trim() === '')  errors.push({ field: 'email',   message: 'Email is required.' });
  if (!message || message.trim() === '') errors.push({ field: 'message', message: 'Message is required.' });
  return { isValid: errors.length === 0, errors };
}

export function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successEl = document.getElementById('form-success');

  function showError(field, msg) {
    const span = document.getElementById(`error-${field}`);
    if (span) span.textContent = msg;
  }

  function clearError(field) {
    const span = document.getElementById(`error-${field}`);
    if (span) span.textContent = '';
  }

  ['name', 'email', 'message'].forEach((field) => {
    const input = form.querySelector(`[name="${field}"]`);
    if (input) input.addEventListener('focus', () => clearError(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = (form.querySelector('[name="name"]')?.value    || '');
    const email   = (form.querySelector('[name="email"]')?.value   || '');
    const message = (form.querySelector('[name="message"]')?.value || '');

    ['name', 'email', 'message'].forEach(clearError);
    if (successEl) successEl.hidden = true;

    const { isValid, errors } = validateContactForm({ name, email, message });

    if (!isValid) {
      errors.forEach(({ field, message: msg }) => showError(field, msg));
      return;
    }

    if (successEl) successEl.removeAttribute('hidden');
    form.reset();
  });
}
