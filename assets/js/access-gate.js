/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

(function () {
    const query = new URLSearchParams(window.location.search);
    const allowedToken = 'forgeonlybydat';
    const userToken = query.get('access');
    if (userToken !== allowedToken) {
        window.location.href = '/';
    } else {
        document.body.style.visibility = 'visible';
    }
})();