/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
    const selected = dropdown.querySelector('.dropdown-selected');
    const options = dropdown.querySelector('.dropdown-options');
    const label = dropdown.querySelector('.dropdown-label');
    const name = dropdown.dataset.name || 'dropdown';

    // Create hidden input
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    dropdown.appendChild(input);

    selected.addEventListener('click', () => {
        dropdown.classList.toggle('open');
        options.style.display = dropdown.classList.contains('open') ? 'block' : 'none';
    });

    options.querySelectorAll('li').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.dataset.value;
            const text = option.textContent;

            input.value = value;
            selected.textContent = text;
            dropdown.classList.add('filled');
            dropdown.classList.remove('open');
            options.style.display = 'none';

        });
    });

    document.addEventListener('click', e => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            options.style.display = 'none';
        }
    });
});