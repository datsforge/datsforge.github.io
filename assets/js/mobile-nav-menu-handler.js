/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

export function setupMobileNavToggles() {
    // Select all checkboxes used to control the mobile nav menu
    const toggles = document.querySelectorAll('.mobile-nav-menu');
    if (!toggles.length) return;

    // For each toggle, set up icon swap and click-outside-to-close
    toggles.forEach(toggle => {
        // Find the associated label/button and icon
        const toggleLabel = toggle.parentNode.querySelector('.toggle-button-label, .icon-toggle');
        const icon = toggleLabel?.querySelector('svg use');

        // Update icon based on toggle state
        function setIcon() {
            if (!icon) return;
            if (toggle.checked) {
                icon.setAttribute('href', '#close_icon');
                toggleLabel.classList.add('toggled');
            } else {
                icon.setAttribute('href', '#menu_icon');
                toggleLabel.classList.remove('toggled');
            }
        }
        setIcon();

        // Listen for toggle changes (click or keyboard)
        toggle.addEventListener('change', setIcon);
        if (toggleLabel) {
            toggleLabel.addEventListener('click', () => {
                // Delay to allow checkbox state to update
                setTimeout(setIcon, 0);
            });
        }
    });

    // Global click listener to close the nav menu when clicking outside
    document.addEventListener('click', (event) => {
        toggles.forEach(toggle => {
            const navLinks = toggle.parentNode.querySelector('.nav-links');
            const toggleLabel = toggle.parentNode.querySelector('.toggle-button-label, .icon-toggle');
            if (toggle.checked) {
                const clickedOutsideToggle = !toggle.contains(event.target);
                const clickedOutsideLabel = !toggleLabel || !toggleLabel.contains(event.target);
                const clickedOutsideNav = !navLinks || !navLinks.contains(event.target);
                if (clickedOutsideToggle && clickedOutsideLabel && clickedOutsideNav) {
                    toggle.checked = false;
                    // Also update icon immediately
                    if (toggleLabel) toggleLabel.classList.remove('toggled');
                    const icon = toggleLabel?.querySelector('svg use');
                    if (icon) icon.setAttribute('href', '#menu_icon');
                }
            }

            // Also close menu when a nav link is clicked
            if (navLinks) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        toggle.checked = false;
                        if (toggleLabel) toggleLabel.classList.remove('toggled');
                        const icon = toggleLabel?.querySelector('svg use');
                        if (icon) icon.setAttribute('href', '#menu_icon');
                    });
                });
            }
        });
    });

}
