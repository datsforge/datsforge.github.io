/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

export class FieldSnackbar {
    static active = null;

    static show(target, message, options = {}) {
        if (!target || !message) return;

        const {
            duration = 3000,
            position = 'bottom',
            offset = 4
        } = options;

        FieldSnackbar.remove(); // cleanup old

        const snackbar = document.createElement('div');
        snackbar.className = 'field-snackbar show';
        snackbar.textContent = message;
        document.body.appendChild(snackbar);

        const rect = target.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        target.scrollIntoView({ behavior: 'smooth', block: 'center' }); // scroll to the target field
        const top = position === 'top'
            ? rect.top + scrollY - snackbar.offsetHeight - offset
            : rect.bottom + scrollY + offset;

        snackbar.style.position = 'absolute';
        snackbar.style.top = `${top}px`;
        snackbar.style.left = `${rect.left + scrollX}px`;

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

