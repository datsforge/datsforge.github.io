/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

export class FieldSnackbar {
  static active = null;

  static show(target, message, options = {}) {
    if (!message) return;

    const {
      duration = 3000,
      position = 'bottom',
      offset = 4,
      type = 'error' // 'success', 'info', 'warning', 'error'
    } = options;

    FieldSnackbar.remove(); // clean up old snackbar

    const snackbar = document.createElement('div');
    snackbar.className = `field-snackbar show ${type}`;
    snackbar.textContent = message;
    document.body.appendChild(snackbar);

    // Default positioning
    snackbar.style.position = 'fixed';

    if (target instanceof Element) {
      const rect = target.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;

      target.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const top = position === 'top'
        ? rect.top + scrollY - snackbar.offsetHeight - offset
        : rect.bottom + scrollY + offset;

      snackbar.style.position = 'absolute';
      snackbar.style.top = `${top}px`;
      snackbar.style.left = `${rect.left + scrollX}px`;
    } else {
      snackbar.style.bottom = '20px';
      snackbar.style.left = '50%';
      snackbar.style.transform = 'translateX(-50%)';
    }

    FieldSnackbar.active = snackbar;
    setTimeout(() => FieldSnackbar.remove(), duration);
  }

  static remove() {
    if (FieldSnackbar.active) {
      FieldSnackbar.active.remove();
      FieldSnackbar.active = null;
    }
  }
}



function showSnackbar(message, duration = 3000) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.classList.add('show');

    setTimeout(() => {
        snackbar.classList.remove('show');
    }, duration);
}

export function updateSnackbar() {
    // Example of using normal snackbar
    document.getElementById('snackbar-btn').addEventListener('click', () => {
        showSnackbar("Hey, I'm a snackbar!");
    });
}

