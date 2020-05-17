import '../scss/main.scss';

// console.log(window.location.search)
let data = fetch(`http://event-archive/server/index.php/article/${window.location.search}`)
  .then(response => response.json())
  .then(createHtml);

function createHtml(data) {
  let article = document.querySelector('.article');
  article.innerHTML = `
          <div class="article__body flex">
            <div class="article__img">
              <img src="${data[0].mainImage}" alt=""></img>
            </div>
            <div class="">
              <div class="article__title">${data[0].eventName}</div>
              <div class="article__desc">${data[0].eventDesc}</div>
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
  }

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