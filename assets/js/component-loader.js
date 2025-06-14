/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

export async function loadComponent({ url, targetSelector, mountPoint }) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const htmlString = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const element = doc.querySelector(targetSelector);
        const mount = document.querySelector(mountPoint);

        if (!element) throw new Error(`Selector "${targetSelector}" not found in ${url}`);
        if (!mount) throw new Error(`Mount point "${mountPoint}" not found in current document`);

        // Use its content if it's a template
        let nodeToInsert;
        if (element.tagName === 'TEMPLATE') {
            nodeToInsert = element.content.cloneNode(true);
        } else {
            nodeToInsert = element.cloneNode(true);
        }

        mount.innerHTML = '';
        mount.appendChild(nodeToInsert);
    } catch (err) {
        console.error('[loadComponent]', err.message);
    }
}

if (typeof window !== 'undefined') {
    window.loadComponent = loadComponent;
}