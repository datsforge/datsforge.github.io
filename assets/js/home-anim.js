/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

document.addEventListener('DOMContentLoaded', () => {
    import('./parallax-effect.js')
        .then(module => {// use exports here if needed
        })
        .catch(err => {
            console.error('Failed to load fireflies.js', err);
        });
    import('./fireflies.js')
        .then(module => {// use exports here if needed
        })
        .catch(err => {
            console.error('Failed to load fireflies.js', err);
        });
    import('./fab-scroll-top.js')
        .then(module => {// use exports here if needed
        })
        .catch(err => {
            console.error('Failed to load fab-scroll-top.js', err);
        });
    import('./typing-anim.js')
        .then(module => {// use exports here if needed
        })
        .catch(err => {
            console.error('Failed to load typing-anim.js', err);
        });
});

