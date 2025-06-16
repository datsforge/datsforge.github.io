/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

const typingAnim = document.querySelectorAll('.typing-anim');

typingAnim.forEach((typingAnim) => {
  let lines = [];

  try {
    lines = JSON.parse(typingAnim.getAttribute('data-lines'));
  } catch (e) {
    console.warn("Invalid data-lines JSON:", typingAnim);
    return;
  }

  let currentLine = 0;
  let currentChar = 0;
  let isDeleting = false;
  const typingSpeed = 70;
  const deletingSpeed = 35;

  function type() {
    const line = lines[currentLine];
    if (!isDeleting) {
      typingAnim.textContent = line.substring(0, currentChar + 1);
      currentChar++;
      if (currentChar === line.length) {
        isDeleting = true;
        setTimeout(type, 1000);
      } else {
        setTimeout(type, typingSpeed);
      }
    } else {
      typingAnim.textContent = line.substring(0, currentChar - 1);
      currentChar--;
      if (currentChar === 0) {
        isDeleting = false;
        currentLine = (currentLine + 1) % lines.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, deletingSpeed);
      }
    }
  }

  type();
});



