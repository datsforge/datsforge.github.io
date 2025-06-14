/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/
export function setupThemeToggle() {
    const dark = document.getElementById('dark-theme');
    const light = document.getElementById('light-theme');
    const btn = document.getElementById('theme-toggle');
    const icon = btn?.querySelector('.theme-icon use');
    if (!btn || !icon || !dark || !light) return;

    // Set initial icon based on current theme
    function setIcon() {
        if (dark.disabled) {
            icon.setAttribute('href', '#dark_mode_icon');
            btn.classList.remove('toggled');
        } else {
            icon.setAttribute('href', '#light_mode_icon');
            btn.classList.add('toggled');
        }
    }
    setIcon();

    btn.addEventListener('click', () => {
        dark.disabled = !dark.disabled;
        light.disabled = !light.disabled;
        setIcon();
    });
}