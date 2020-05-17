import '../scss/main.scss';

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',	'Июнь',	'Июль', 'Август', 'Сентябрь',	'Октябрь', 'Ноябрь', 'Декабрь']

console.log(`http://event-archive/index.php/articles${window.location.search}`);
let data = fetch(`http://event-archive/server/index.php/articles${window.location.search}`)
  .then(response => response.json())
  .then(createHtml);

function createHtml(data) {
  console.log(data)
  let articles = document.querySelector('.articles');
  articles.innerHTML = '';
  let date = [];
  data.forEach((el, i) => {
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
    console.log(date);
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

  let match = /=/g.exec(window.location.search);
  console.log(window.location.search);
  if (!match ||  match.length === 1) {
    const sortBtn = document.querySelector('.aside__button')
    date.forEach(({ year, month}) => {
      const yearItem = document.createElement('div');
      yearItem.classList.add('aside__item', 'tab');
      yearItem.innerHTML = `
        <input id="${year}" type="checkbox">
        <label for="${year}">${year}</label>
      `;
      let str = '';
      month.forEach((el) => {
        str += `<li><a href="#">${el}</a></li>`;
      });
      const tabContent = document.createElement('section');
      tabContent.classList.add('tab-content');
      const listOfMonths = document.createElement('ul');
      listOfMonths.classList.add('flex');
      listOfMonths.innerHTML = str ;
      tabContent.append(listOfMonths);
      yearItem.append(tabContent);
      sortBtn.before(yearItem);
      // console.log(yearItem.querySelector('.flex'));
    })
  }
}

function yearInObj(year, date) {
  for (let i = 0; i < date.length; i++) {
    if (date[i].year === year)
      return date[i]
  }
  return false
}
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