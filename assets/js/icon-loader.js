/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

export function loadSvg(url, target) {
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error(`Failed to load ${url}`);
            return res.text();
        })
        .then(svg => {
            const container = document.getElementById(target);
            if (container) {
                container.innerHTML = svg;
            } else {
                console.warn(`Target container #${target} not found.`);
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}
