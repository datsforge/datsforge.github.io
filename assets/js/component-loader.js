/**
 * Dynamically loads an HTML component and mounts it in the DOM.
 * @param {Object} options
 * @param {string} options.url - The URL of the HTML file to fetch.
 * @param {string} options.targetSelector - Selector for the element to extract from the fetched HTML.
 * @param {string} options.mountPoint - Selector for the element in the current document to mount into.
 */
window.loadComponent = async function({ url, targetSelector, mountPoint }) {
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
};