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
      window.location.href = '/articles.html';
    });
});

// function createHtml(data) {
//   const articleBody = document.querySelector('.article__body');
//   articleBody.querySelector('.article__img > img').src = data[0].mainImage;

//   const inputs = articleBody.querySelectorAll('.add__input');
//   console.log('data[0]: ', data[0]);
//   inputs[0].value = data[0].eventName;
//   inputs[1].value = data[0].typeName;
//   inputs[2].value = data[0].placeName;
//   inputs[3].value = data[0].class;
//   inputs[4].value = data[0].date;
//   document.querySelector('.add__desc textarea').value = data[0].eventDesc;
//   let gallery = document.querySelector('.gallery');
//   data.forEach(({
//     image
//   }) => {
//     const div = document.createElement('div');
//     const img = document.createElement('img');
//     img.src = image;
//     div.append(img);
//     console.log(div);
//     gallery.insertAdjacentElement('beforeend', div);
//   })
//   const inputId = document.createElement('input');
//   inputId.name = 'id';
//   inputId.type = 'hidden';
//   inputId.value = window.location.search.replace('?id=', '');
//   gallery.insertAdjacentElement('afterend', inputId)

//   // console.log(articleBody.querySelector('.add_desc textarea'));
// }