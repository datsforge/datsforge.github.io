/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/
export function setupThemeToggle() {
  const dark = document.getElementById('dark-theme');
  const light = document.getElementById('light-theme');
  const btn = document.getElementById('theme-toggle');
  const icon = btn?.querySelector('.theme-icon use');

  // Helper to set theme and save preference
  function setTheme(theme) {
    if (theme === 'dark') {
      dark.disabled = false;
      light.disabled = true;
      if (icon) {
        icon.setAttribute('href', '#light_mode_icon');
        btn.classList.add('toggled');
      }
      // Show fireflies, hide leaves
      document.querySelector('.fireflies')?.classList.remove('hidden');
      document.querySelector('.falling-leaves')?.classList.add('hidden');
    } else {
      dark.disabled = true;
      light.disabled = false;
      if (icon) {
        icon.setAttribute('href', '#dark_mode_icon');
        btn.classList.remove('toggled');
      }
      // Show leaves, hide fireflies
      document.querySelector('.fireflies')?.classList.add('hidden');
      document.querySelector('.falling-leaves')?.classList.remove('hidden');
    }
    localStorage.setItem('theme', theme);
  }

  // On load: apply saved preference or system preference
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    setTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  // Only attach event if button exists
  if (btn) {
    btn.addEventListener('click', () => {
      const newTheme = dark.disabled ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }
}