/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

let lastScroll = 0;

function setupNavScroll() {
  const nav = document.getElementById('navbar');
  const mobileNavMenu = document.querySelector('.mobile-nav-menu');
  // Find the toggle label and icon use element
  const toggleLabel = mobileNavMenu?.parentNode.querySelector('.toggle-button-label, .icon-toggle');
  const icon = toggleLabel?.querySelector('svg use');

  if (!nav) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 80) {
      nav.classList.add('hide-on-scroll');
      // Hide mobile menu if open
      if (currentScroll > 200 && mobileNavMenu && mobileNavMenu.checked) {
        mobileNavMenu.checked = false;
        // Also reset icon to menu_icon
        if (icon) {
          icon.setAttribute('href', '#menu_icon');
          toggleLabel.classList.remove('toggled');
        }
      }
    } else {
      nav.classList.remove('hide-on-scroll');
    }
    lastScroll = currentScroll;
  });
}

// If nav is loaded dynamically, wait for it
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for fetch to finish
  setTimeout(setupNavScroll, 300);
});
