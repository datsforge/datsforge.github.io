/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

/**
 * Loads an HTML component from a URL and mounts it to a specified DOM element
 * @param {Object} params - Configuration object
 * @param {string} params.url - URL of the HTML component to load
 * @param {string} params.targetSelector - CSS selector to find in the fetched HTML
 * @param {string|Element} params.mountPoint - CSS selector or DOM element to mount to
 * @param {boolean} [params.keepId=false] - Whether to keep the ID attribute
 * @param {boolean} [params.sanitize=true] - Whether to sanitize the HTML
 * @returns {Promise<void>}
 */
export async function loadComponent({
  url,
  targetSelector,
  mountPoint,
  keepId = false,
  sanitize = false,
}) {
  try {
    // Validate inputs
    if (!url || !targetSelector || !mountPoint) {
      throw new Error('Missing required parameters (url, targetSelector, mountPoint)');
    }

    // Fetch the HTML with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
    }

    const htmlString = await res.text();

    //**TODO Basic HTML sanitization (should be expanded based on needs)
    const sanitizedHtml = sanitize ? sanitizeHtml(htmlString) : htmlString;

    // Parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedHtml, 'text/html');

    // Find elements
    const element = doc.querySelector(targetSelector);
    if (!element) {
      throw new Error(`Selector "${targetSelector}" not found in ${url}`);
    }

    const mount = typeof mountPoint === 'string' 
      ? document.querySelector(mountPoint) 
      : mountPoint;
    
    if (!mount) {
      throw new Error(`Mount point not found in current document`);
    }

    // Prepare the node for insertion
    let nodeToInsert;
    if (element.tagName === 'TEMPLATE') {
      nodeToInsert = document.importNode(element.content, true);
    } else {
      nodeToInsert = document.importNode(element, true);
      if (!keepId) {
        nodeToInsert.removeAttribute('id');
      }
    }

    // Clear and mount the component
    mount.replaceChildren(nodeToInsert);

    return { success: true, element: nodeToInsert };

  } catch (err) {
    console.error('[loadComponent]', err);
    return { success: false, error: err };
  }
}

//**TODO Basic HTML sanitizer (should be expanded first based on needs)
function sanitizeHtml(html) {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
}

// Make available globally in browser environment
if (typeof window !== 'undefined') {
  window.loadComponent = loadComponent;
}