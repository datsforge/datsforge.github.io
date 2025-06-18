/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

const leavesContainer = document.querySelector('.falling-leaves');
const leafCount = 27;

for (let i = 0; i < leafCount; i++) {
  setTimeout(() => {
    createLeaf();
  }, Math.random() * 2000); // 0–2s random delay
}

function createLeaf() {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');

  // Size
  const size = 8 + Math.random() * 7; // 8–15px
  leaf.style.width = size + 'px';
  leaf.style.height = (size * (0.7 + Math.random() * 0.3)).toFixed(1) + 'px';

  // Position
  leaf.style.left = Math.random() * 100 + '%';
  leaf.style.top = (-10 - Math.random() * 20) + 'px';

  // Animation
  const fallDuration = (21 + Math.random() * 15).toFixed(2) + 's';
  const sway = 40 + Math.random() * 60;
  const swayDuration = (5 + Math.random() * 4).toFixed(2) + 's';
  const delay = (-Math.random() * 10).toFixed(2) + 's';

  leaf.style.setProperty('--sway', `${sway}px`);
  leaf.style.animation = `
    leaf-fall ${fallDuration} linear infinite,
    leaf-sway ${swayDuration} ease-in-out infinite alternate
  `;
  leaf.style.animationDelay = `${delay}, ${delay}`;

  // Random rotation
  const startRot = Math.floor(Math.random() * 360);
  const endRot = startRot + (Math.random() * 60 - 30); // random end rotation
  leaf.style.setProperty('--leaf-rotate', `${startRot}deg`);
  leaf.style.setProperty('--leaf-rotate-end', `${endRot}deg`);

  // --- RANDOM GREEN COLOR ---
  // HSL: hue 90–140 (green), saturation 40–60%, lightness 20–50%
  const hue = 90 + Math.random() * 50;
  const sat = 40 + Math.random() * 20;
  const light = 20 + Math.random() * 30;
  const fill = `hsl(${hue},${sat}%,${light}%)`;
  const stroke = `hsl(${hue},${sat}%,${light - 40}%)`;

  // SVG leaf background with random green
  leaf.style.background = `url('data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 2 C50 12, 50 52, 32 62 C14 52, 14 12, 32 2 Z" fill="${encodeURIComponent(fill)}" stroke="${encodeURIComponent(stroke)}" stroke-width="2"/><path d="M32 2 L32 62" stroke="${encodeURIComponent(stroke)}" stroke-width="1.5"/></svg>') center/contain no-repeat`;

  leavesContainer.appendChild(leaf);
}