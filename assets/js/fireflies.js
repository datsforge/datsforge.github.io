/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

const firefliesContainer = document.querySelector('.fireflies');
const fireflyCount = 27;

for (let i = 0; i < fireflyCount; i++) {
  const firefly = document.createElement('div');
  firefly.classList.add('firefly');

  firefly.style.top = Math.random() * 100 + '%';
  firefly.style.left = Math.random() * 100 + '%';

  // Size & opacity
  const size = 2 + Math.random() * 2;
  firefly.style.width = firefly.style.height = size + 'px';
  firefly.style.opacity = 0.5 + Math.random() * 0.5;

  // Color and glow
  const hue = 45 + Math.random() * 15; // Yellow range: 45–60
  firefly.style.boxShadow = `0 0 3px 1px hsl(${hue}, 80%, 50%)`;
  firefly.style.background = `hsl(${hue}, 100%, 80%)`;

  // Animation
  const moveX = (Math.random() * 100 - 50) + 'px';
  const moveY = (Math.random() * 100 - 50) + 'px';
  firefly.style.setProperty('--move-x', moveX);
  firefly.style.setProperty('--move-y', moveY);

  const duration = (5 + Math.random() * 5).toFixed(2) + 's';
  const flicker = (1 + Math.random() * 2).toFixed(2) + 's';
  firefly.style.animation = `firefly-move ${duration} linear infinite, firefly-flicker ${flicker} infinite alternate`;

  firefliesContainer.appendChild(firefly);
}
