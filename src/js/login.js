import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../scss/main.scss';

const notificationArea = document.querySelector('.form-row:nth-child(3)');

document.getElementById('formLogin').addEventListener('submit', async ({
  target
}) => {
  event.preventDefault();
  fetch(`http://event-archive/server/index.php/login.php`, {
      method: 'POST',
      body: new FormData(target)
    })
    .then((response) => response.json())
    .catch((err) => {
      notificationArea.textContent = 'Данные введены неверно';
      notificationArea.style.color = 'red';
    })
    .then((login) => {
      if (login[0]) {
        sessionStorage.setItem('login', login[0].login);
        notificationArea.textContent = '';
        window.location.href = '/';
      } else {
        notificationArea.textContent = 'Данные введены неверно';
        notificationArea.style.color = 'red';
      }
    });
});