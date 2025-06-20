/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

// Now set up IntersectionObserver for animate-on-show
export function animateOnShow() {
    // scroll-based slide animation on class:main-header on show
    // and fade in and slide up animation card and flex tables on show 
    // see /assets/css/components.css on Animate on show section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.animate-on-show').forEach(el => {
        observer.observe(el);
    });
}
