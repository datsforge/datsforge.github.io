/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

let lastScroll = 0;

export function setupNavScroll() {
  const header = document.querySelector('header');
  const nav = header?.querySelector('#navbar') || document.getElementById('navbar');
  const mobileNavMenu = document.querySelector('.mobile-nav-menu');
  const toggleLabel = mobileNavMenu?.parentNode.querySelector('.toggle-button-label, .icon-toggle');
  const icon = toggleLabel?.querySelector('svg use');

  if (!nav) return false;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 80) {
      nav.classList.add('hide-on-scroll');
      // Hide mobile menu if open
      if (currentScroll > 200 && mobileNavMenu?.checked) {
        mobileNavMenu.checked = false;
         // Also reset icon to menu_icon
        if (icon) {
          icon.setAttribute('href', '#menu_icon');
          toggleLabel?.classList.remove('toggled');
        }
      }
    } else {
      nav.classList.remove('hide-on-scroll');
    }
    lastScroll = currentScroll;
  });

  return true;
}

