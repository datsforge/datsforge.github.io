/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

// Parallax effect for .hero background (with smooth interpolation)
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (!hero) return;
    // Adjust the divisor for more/less parallax effect
    const offset = window.scrollY * 0.44;
    hero.style.setProperty('--hero-parallax', `${offset}px`);
}, { passive: true });