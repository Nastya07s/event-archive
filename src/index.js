import './scss/main.scss';

let data = fetch('http://event-archive/server/index.php')
  .then(response => response.json())
  .then(createHtml)

function createHtml(data) {
  let slider = document.querySelector('.slider');
  console.log(data);
  slider.innerHTML = `       
        <div class="slider__current" data-id="${data[0].idevent}">
          <img src="${data[0].mainImage}" alt="" class="slider__img">
          <div class="slider__info info flex">
            <div class="">
              <div class="info__title">${data[0].eventName}</div>
              <div class="info__desc">${data[0].eventDesc}</div>
            </div>
            <div class="info__date">${data[0].date}</div>
          </div>
        </div>
        <div class="slider__list flex">
        </div>`;

  let sliderList = slider.querySelector('.slider__list');
  data.forEach((el, i) => {
    if (i === 0) {
      sliderList.innerHTML += `
          <div class="slider__item slider__item-active flex">
            <img src="${el.mainImage}" alt="" class="slider__img">
            <div class="slider__title">${el.eventName}</div>
            <div class="slider__date">${el.date}</div>
          </div>`;
    } else {
      sliderList.innerHTML += `
            <div class="slider__item flex">
              <img src="${el.mainImage}" alt="" class="slider__img">
              <div class="slider__title">${el.eventName}</div>
              <div class="slider__date">${el.date}</div>
            </div>`;
    }
  });
  let slides = sliderList.querySelectorAll('.slider__item');
  slides.forEach(slide => {
    slide.addEventListener('click', resetInterval)
  });
  let sliderCurrent = document.querySelector('.slider__current').addEventListener('click',moveToCurrentArticle);
  let current = 0;
  let looper = setInterval(function () {
    autoSlide(sliderList, data)
  }, 3000);

  function resetInterval() { //add this method which wil reset the timer
    // current = [...slides].indexOf(event.target.closest('.slider__item'));
    // console.log(event);
    window.clearInterval(looper); //clear current interval
    // looper = setInterval(function () {
    autoSlide(sliderList, data, event.target)
    // }, 3000); //start auto slide again.
    looper = setInterval(function () {
      autoSlide(sliderList, data)
    }, 5000);
  }
}

function moveToCurrentArticle({ target }){
  window.location.href =`/article.html?id=${target.closest('.slider__current').dataset.id}`
}

function autoSlide(sliderList, data, tar) {
  let slide = document.querySelector('.slider__item-active');
  let current = [...sliderList.querySelectorAll('.slider__item')].indexOf(slide) + 1
  slide.classList.remove('slider__item-active');
  if (slide.nextSibling) {
    if (tar) {
      console.log(tar)
      tar.closest('.slider__item').classList.add('slider__item-active');
      current = [...sliderList.querySelectorAll('.slider__item')].indexOf(tar.closest('.slider__item'));
    } else
      slide.nextSibling.nextSibling.classList.add('slider__item-active');
  } else {
    document.querySelector('.slider__item').classList.add('slider__item-active');
    current = 0
  }
  let sliderCurrent = document.querySelector('.slider__current');
  sliderCurrent.dataset.id = data[current].idevent;
  sliderCurrent.innerHTML = ` <img src="${data[current].mainImage}" alt="" class="slider__img">
                              <div class="slider__info info flex">
                                <div class="">
                                  <div class="info__title">${data[current].eventName}</div>
                                  <div class="info__desc">${data[current].eventDesc}</div>
                                </div>
                                <div class="info__date">${data[current].date}</div>
                              </div>`
};