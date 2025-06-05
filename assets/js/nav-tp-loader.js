import { loadComponent } from './component-loader.js'; 

/**
 * Loads the Terms and Privacy navigation component and sets the correct links.
 * This function fetches the HTML for the terms and privacy links, mounts it in the navbar,
 * and updates the links based on the current page.
 */
export async function loadTPNavComponent() {
    await loadComponent({
        url: '/assets/html/nav.html',
        targetSelector: '.navbar-terms-privacy',
        mountPoint: '#navbar'
    });

    const links = document.querySelectorAll('.navbar-terms-privacy .nav-links a');
    if (links.length >= 2) {
        const parts = window.location.pathname.split('/');
        const appBase = parts[3];
        const currentPage = parts.at(-1);

        links[0].href = `/projects/games/${appBase}/terms.html`;
        links[1].href = `/projects/games/${appBase}/privacy.html`;

        if (currentPage === 'terms.html') links[0].classList.add('active');
        if (currentPage === 'privacy.html') links[1].classList.add('active');
    }
}
