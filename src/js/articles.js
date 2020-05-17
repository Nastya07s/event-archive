import '../scss/main.scss';

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
        month: [el.month]
      };
      date.push(temp);
    } else {
      yearInObjFl.month.push(el.month)
    }

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

  // let match = /=/g.exec(window.location.search);
  // console.log(window.location.search);
  // if (!match ||  match.length === 1) {
  //   let aside = document.querySelector('.aside')
  //   date.forEach(el => {
  //     aside.innerHTML += `<a href="articles.html?idtype=2&year=${el.year}" class="aside__item">${el.year}</a>`; //поправить с типом и здесь и в беке
  //   })
  // }
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