import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../scss/main.scss';
import 'air-datepicker/dist/css/datepicker.min.css';

window.$ = window.jQuery = require('jquery');
window.datepicker = require("air-datepicker/dist/js/datepicker.min.js");

$(document).ready(function () {
  $('.datepicker-here').datepicker({
    maxDate: new Date()
  })
});

fetch('/header.html')
  .then(response => response.text())
  .then((header) => {
    const headerComponent = document.createElement('header');
    headerComponent.classList.add('header');
    headerComponent.innerHTML = header;
    document.querySelector('.main').before(headerComponent);
    if (sessionStorage.getItem('login')) {
      document.querySelector('.menu__item:nth-child(2) > a').textContent = `Привет, ${sessionStorage.getItem('login')}`;
      document.querySelector('.menu__item:nth-child(3)').classList.remove('d-none');
    } else {
      document.querySelector('.menu__item:nth-child(2) > a').textContent = 'Войти';
      document.querySelector('.menu__item:nth-child(3)').classList.add('d-none');
    }

    document.querySelector('.menu__item:nth-child(3)').addEventListener('click', () => {
      sessionStorage.removeItem('login');
    });
  });

  document.getElementById('formAdd').addEventListener('submit', async ({
    target
  }) => {
    event.preventDefault();
    fetch(`http://event-archive/server/index.php/addEvent.php`, {
        method: 'POST',
        body: new FormData(target)
      })
      .then((response) => response.text())
      .then((text) => {
        if (text = 'success')
        window.location.href = '/articles.html';
      });
  });