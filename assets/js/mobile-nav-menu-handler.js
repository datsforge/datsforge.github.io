/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

export function setupMobileNavToggles() {
    // Select all checkboxes used to control the mobile nav menu
    const toggles = document.querySelectorAll('.mobile-nav-menu');
    if (!toggles.length) return; // Exit early if no toggle exists

    // Global click listener to close the nav menu when clicking outside
    document.addEventListener('click', (event) => {
        toggles.forEach(toggle => {
            const navLinks = toggle.parentNode.querySelector('.nav-links');
            const toggleLabel = toggle.parentNode.querySelector('.toggle-button-label, .icon-toggle');

            // If the menu is open (checkbox is checked)
            if (toggle.checked) {
                // If the click was outside the toggle, label, and nav links, close the menu
                const clickedOutsideToggle = !toggle.contains(event.target);
                const clickedOutsideLabel = !toggleLabel || !toggleLabel.contains(event.target);
                const clickedOutsideNav = !navLinks || !navLinks.contains(event.target);

                if (clickedOutsideToggle && clickedOutsideLabel && clickedOutsideNav) {
                    toggle.checked = false;
                }
            }
        });
    });

}
