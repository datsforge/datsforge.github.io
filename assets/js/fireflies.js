/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

document.addEventListener('DOMContentLoaded', () => {
  const firefliesContainer = document.querySelector('.fireflies');
  const fireflyCount = 20;

  for (let i = 0; i < fireflyCount; i++) {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');

    firefly.style.top = Math.random() * 100 + '%';
    firefly.style.left = Math.random() * 100 + '%';
    firefly.style.animationDelay = (Math.random() * 8) + 's';
    firefly.style.animationDuration = (5 + Math.random() * 5) + 's';

    const moveX = (Math.random() * 100 - 50) + 'px';
    const moveY = (Math.random() * 100 - 50) + 'px';

    firefly.style.setProperty('--move-x', moveX);
    firefly.style.setProperty('--move-y', moveY);

    firefliesContainer.appendChild(firefly);
  }
});
