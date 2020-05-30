import '../scss/main.scss';

const classText = {
  'primary': '1 - 4',
  'middle': '5 - 8',
  'high': '9 - 11',
}
const placeText = {
  'inside': 'В учреждении образования',
  'outside': 'За пределами учреждения образования',
}
const typeText = {
  'training': 'Учебно-воспитательные',
  'hobby': 'Досуговые',
  'sport': 'Спортивно-оздоровительные',
}

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
    })
      
    fetch(`http://event-archive/server/index.php/article${window.location.search}`)
      .then(response => response.json())
      .then(createHtml);
  })

// console.log(window.location.search)
// let data =

function createHtml(data) {
  console.log(data[0]);
  let article = document.querySelector('.article');
  article.innerHTML = `
          <div class="article__body flex">
            <div class="article__img">
              <img src="${data[0].mainImage}" alt=""></img>
            </div>
            <div class="article__info flex">
              <div>
                <div class="article__date">
                  <p>${data[0].date}</p>
                  <button><img src="/assets/img/threePoints.svg" alt="" height="13"></button>
                  <ul class="opasity-0">
                    <li><button>Изменить</button></li>
                    <li><button>Удалить</button></li>
                  </ul>
                </div>
                
                <div class="article__title">${data[0].eventName}</div>
                <div class="article__desc">${data[0].eventDesc}</div>
              </div>
              <div class="article__properties">
                <div class="article__property"><p>Тип: </p><p>${typeText[data[0].typeName]}</p></div>
                <div class="article__property"><p>Место проведения: </p><p>${placeText[data[0].placeName]}</p></div>
                <div class="article__property"><p>Класс: </p><p>${classText[data[0].class]}</p></div>
              </div>
            </div>
          </div>
          <div class="gallery">
          </div>
  `
  let gallery = article.querySelector('.gallery');
  for (let i = 0; i < data.length; i++) {
    gallery.innerHTML += `
  <div class="">
    <img src="${data[i].image}" alt=""></img>
  </div>`
  };
  document.querySelector('.article__date button').addEventListener('click', ({target}) => {
    document.querySelector('.article__date').querySelector('ul').classList.toggle('opasity-0');
  });
  if (sessionStorage.getItem('login')) {
    document.querySelector('.article__date button').classList.remove('d-none');
  } else {
    document.querySelector('.article__date button').classList.add('d-none');
  }
  document.querySelector('.article__date ul li:first-child button').addEventListener('click', () => {
    window.location.href = `/updateEvent.html${window.location.search}`
  })
}



// {
/* <div class="article__body flex">
          <div class="article__img">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="">
            <div class="article__title">Заголовок</div>
            <div class="article__desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, illum tenetur.
              Vitae, libero omnis dolorum quidem laudantium dolores debitis eum cupiditate reprehenderit architecto
              fugiat
              excepturi iure, sint recusandae iusto, rerum quaerat tempore inventore. Cumque suscipit adipisci
              exercitationem iure ad non cum quidem culpa, magnam qui corporis laborum, nostrum sed soluta quo, ut
              excepturi nihil dolores dolorum odio vel ullam recusandae molestiae similique! At aut corrupti et,
              accusamus
              ipsam eum fuga beatae nobis repellendus quas ullam obcaecati ipsum exercitationem eligendi alias
              voluptatem
              sequi. Sint blanditiis, ab, exercitationem ipsam incidunt quo ullam eaque molestias autem deleniti sunt
              porro totam et natus sit.</div>
          </div>
        </div>
        <div class="gallery">
          <div class="">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
          <div class="">
            <img src="assets/img/example.jpg" alt=""></img>
          </div>
        </div> */
// }