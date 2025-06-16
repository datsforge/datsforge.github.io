/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

document.addEventListener('DOMContentLoaded', () => {
  const fab = document.getElementById('fab-scroll-top');
  function updateFabVisibility() {
    if (window.scrollY > 120) {
      fab.classList.remove('fab-hide');
    } else {
      fab.classList.add('fab-hide');
    }
  }
  window.addEventListener('scroll', updateFabVisibility, { passive: true });
  window.addEventListener('DOMContentLoaded', updateFabVisibility);
  fab.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

