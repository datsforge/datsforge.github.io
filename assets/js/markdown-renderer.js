/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

// Renders a Markdown file into a target container using marked.js
export async function renderMarkdownFromFile(markdownPath, targetElementId) {
    try {
        const res = await fetch(markdownPath);
        const markdown = await res.text();
        document.getElementById(targetElementId).innerHTML = marked.parse(markdown);
    } catch (err) {
        console.error("Markdown render error:", err);
        const fallback = document.getElementById(targetElementId);
        if (fallback) {
            fallback.innerText = "Failed to load content. Please check your connection or try again later.";
        }
    }
}
