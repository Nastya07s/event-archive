import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../scss/main.scss';

const sortBtn = document.querySelector('.aside__button');

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

console.log(`http://event-archive/server/index.php/articles.php${window.location.search}`);
let data = fetch(`http://event-archive/server/index.php/articles.php${window.location.search}`)
  .then(response => response.json())
  .then(createHtml);

function createHtml(data) {
  console.log(data)
  let articles = document.querySelector('.articles');
  articles.innerHTML = '';
  let date = [];
  data.forEach((el, i) => {
    console.log('el: ', el);

    let yearInObjFl = yearInObj(el.year, date)
    if (!yearInObjFl) {
      let temp = {
        year: el.year,
        month: [months[el.month - 1]]
      };
      date.push(temp);
    } else {
      yearInObjFl.month.push(months[el.month - 1]);
    }
    // console.log(date);
    // date.push(obj)
    // date[i].year = el.year;
    // date[i].month = ;
    articles.innerHTML += `
      <div class="articles__item article-short">
        <div class="article-short__title">${el.eventName}</div>
        <div class="article-short__img">
          <img src="${el.mainImage}" alt=""></img>
        </div>
        <div class="article-short__bottom flex">
          <div class="article-short__desc">${el.eventDesc}</div>
          <a href="article.html?id=${el.id}" class="article-short__continue"  data-id="${el.id}">Продолжение →</a>
        </div>
      </div>`;
  });

  console.log(date);
  // if (window.location.search.length < 2) {
  let match = /=/g.exec(window.location.search);

  if (!match || match.length === 1) {
    const aside = document.querySelector('.aside:nth-child(1)');

    aside.innerHTML = `
      <div class="aside__search">
        <img src="assets/img/magnifier.svg" alt="" height="15">
        <label for="search">
          <input class="aside__input" type="text" placeholder="Поиск по названию..." id="search">
        </label>
      </div>
    `;
    // console.log('aside: ', aside);
    date.forEach(({
      year,
      month
    }) => {
      const yearItem = document.createElement('div');
  
      yearItem.classList.add('aside__item', 'tab');
      yearItem.innerHTML = `
        <input id="${year}" type="checkbox">
        <label for="${year}">${year}</label>
      `;

      let str = '';

      month.forEach((el, i) => {
        str += `<li><a href="articles.html?year=${year}&month=${months.indexOf(el) + 1}">${el}</a></li>`;
      });
      const tabContent = document.createElement('section');
      tabContent.classList.add('tab-content');
      const listOfMonths = document.createElement('ul');
      listOfMonths.classList.add('flex');
      listOfMonths.innerHTML = str;
      tabContent.append(listOfMonths);
      yearItem.append(tabContent);
      aside.append(yearItem);
    })
  }
  // }
}

function yearInObj(year, date) {
  for (let i = 0; i < date.length; i++) {
    if (date[i].year === year)
      return date[i]
  }
  return false
};

const createStringForQuerries = (str, el) => {
  if (el.checked) str += `${el.id},`;
  console.log(str);
  return str;
}

const createArrayQueriesFromString = (index) => {
  // let str ='[';
  let str = '';
  document.querySelectorAll(`fieldset:nth-child(${index}) input`).forEach((el) => str = createStringForQuerries(str, el));

  str = str.slice(0, str.length - 1);
  // str += (str) ? ']' : '[]';
  return str;
}

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const classes = createArrayQueriesFromString(1);
  const places = createArrayQueriesFromString(2);
  const type = createArrayQueriesFromString(3);

  console.log(`http://event-archive/server/index.php/articles.php?class=${classes}&place=${places}&type=${type}`);
  let data = fetch(`http://event-archive/server/index.php/articles.php?class=${classes}&place=${places}&type=${type}`)
    .then(response => response.json())
    .then(createHtml);
});

/*
<section class="articles__item article-short">
          <div class="article-short__title">Заголовок</div>
          <div class="article-short__img">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="article-short__bottom flex">
            <div class="article-short__desc">Описание мероприятия</div>
            <a href="#" class="article-short__continue">Продолжение →</a>
          </div>
        </section>
        <section class="articles__item article-short">
          <div class="article-short__title">Заголовок</div>
          <div class="article-short__img">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="article-short__bottom flex">
            <div class="article-short__desc">Описание мероприятия</div>
            <a href="#" class="article-short__continue">Продолжение →</a>
          </div>
        </section>
        <section class="articles__item article-short">
          <div class="article-short__title">Заголовок</div>
          <div class="article-short__img">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="article-short__bottom flex">
            <div class="article-short__desc">Описание мероприятия</div>
            <a href="#" class="article-short__continue">Продолжение →</a>
          </div>
        </section>

        <div class="aside__item">2020</div>
        <div class="aside__item">2019</div>
        <div class="aside__item">2018</div>
        */