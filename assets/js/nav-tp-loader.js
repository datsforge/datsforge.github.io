/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

import { loadComponent } from './component-loader.js';
import { setupMobileNavToggles } from '/assets/js/mobile-nav-menu-handler.js';
import { setupThemeToggle } from '/assets/js/theme-toggle.js';

export async function loadTPNavComponent() {
    await loadComponent({
        url: '/assets/html/nav/navbar-tp.html',
        targetSelector: '#navbar-tp',
        mountPoint: '#navbar'
    });

    // --- Set Terms/Privacy Links ---
    const links = document.querySelectorAll('.navbar-tp .nav-links a');
    if (links.length >= 2) {
        const parts = window.location.pathname.split('/');
        const appBase = parts[3];
        const currentPage = parts.at(-1);

        links[0].href = `/projects/games/${appBase}/terms.html`;
        links[1].href = `/projects/games/${appBase}/privacy.html`;

        if (currentPage === 'terms.html') links[0].classList.add('active');
        if (currentPage === 'privacy.html') links[1].classList.add('active');
    }

    // --- Dynamic Logo, Brand Text, and Alt ---
    const logoImg = document.querySelector('.navbar-tp .app-logo img');
    const logoText = document.querySelector('.navbar-tp .app-logo span');

    const customLogoSrc = document.body.dataset.logoSrc;
    const customBrandName = document.body.dataset.brandName;
    const customLogoAlt = document.body.dataset.logoAlt;

    if (customLogoSrc && logoImg) {
        logoImg.src = customLogoSrc;
    }

    if (customLogoAlt && logoImg) {
        logoImg.alt = customLogoAlt;
    }

    if (customBrandName && logoText) {
        logoText.textContent = customBrandName;
    }

    setupMobileNavToggles();
    setupThemeToggle();
}
