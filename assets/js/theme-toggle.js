/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/
export function setupThemeToggle() {
  const dark = document.getElementById('dark-theme');
  const light = document.getElementById('light-theme');
  const btnOnHero = document.getElementById('theme-toggle');
  const iconOnHero = btnOnHero?.querySelector('.theme-icon use');
  const btnOnFooter = document.getElementById('footer-theme-toggle')
  const iconOnFooter = btnOnFooter?.querySelector('.theme-icon use');

  // Helper to set theme and save preference
  function setTheme(theme) {
    if (theme === 'dark') {
      dark.disabled = false;
      light.disabled = true;
      [iconOnHero, iconOnFooter].forEach((icon) => {
        if (icon) {
          icon.setAttribute('href', '#light_mode_icon');
          btnOnHero?.classList.add('toggled');
          btnOnFooter?.classList.add('toggled');
        }
      }
      )
      // Show fireflies, hide leaves
      document.querySelector('.fireflies')?.classList.remove('hidden');
      document.querySelector('.falling-leaves')?.classList.add('hidden');
    } else {
      dark.disabled = true;
      light.disabled = false;
      [iconOnHero, iconOnFooter].forEach((icon) => {
        if (icon) {
          icon.setAttribute('href', '#dark_mode_icon');
          btnOnHero?.classList.remove('toggled');
          btnOnFooter?.classList.remove('toggled');
        }
      })
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
  [btnOnHero, btnOnFooter].forEach((button) => {
    if (button) {
      button.addEventListener('click', () => {
        const newTheme = dark.disabled ? 'dark' : 'light';
        setTheme(newTheme);
      });
    }
  });

}