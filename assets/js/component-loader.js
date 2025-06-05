/**
 * Dynamically loads an HTML component and mounts it in the DOM.
 * @param {Object} options
 * @param {string} options.url
 * @param {string} options.targetSelector
 * @param {string} options.mountPoint
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

        mount.appendChild(element);
    } catch (err) {
        console.error('[loadComponent]', err.message);
    }
}

// EXPOSE to global if running in browser
if (typeof window !== 'undefined') {
    window.loadComponent = loadComponent;
}
