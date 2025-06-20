/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

export function autoHover(options = {}) {
    const selector = options.selector || '.track-hover';
    const threshold = options.threshold || 120;

    const centerY = () => window.innerHeight / 2;

    const check = () => {
        const elements = document.querySelectorAll(selector);
        const yCenter = centerY();

        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elCenter = rect.top + rect.height / 2;
            const dist = Math.abs(yCenter - elCenter);
            el.classList.toggle('auto-hovered', dist < threshold);
            console.log(`Distance to center: ${dist} threshold: ${threshold}`);
        });
    };

    window.addEventListener('scroll', () => {
        requestAnimationFrame(check);
    });

    window.addEventListener('load', check);
}



