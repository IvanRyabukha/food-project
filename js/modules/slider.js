function slider() {
  // Slider

  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        btnPrev = document.querySelector('.offer__slider-prev'),
        btnNext = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];

  indicators.classList.add('carusel-indicators');
  indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;

    if (i === 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function replaceNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  btnNext.addEventListener('click', () => {
    if (offset === replaceNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += replaceNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  });

  btnPrev.addEventListener('click', () => {
    if (offset === 0) {
      offset = replaceNotDigits(width) * (slides.length - 1);
    } else {
      offset -= replaceNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = +e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;

      offset = replaceNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  // Default slider
  // document.querySelector('#total').innerText = String(slides.length).padStart(2, '0');
  // const current = document.querySelector('#current');


  // function showSlide(index) {
  //   current.innerText = String(index + 1).padStart(2, '0');
  //   slides.forEach((img, i) => {
  //     img.classList.toggle('hide', i !== slideIndex);
  //   });
  // }

  // btnPrev.addEventListener('click', () => {
  //   slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  //   showSlide(slideIndex);
  // });

  // btnNext.addEventListener('click', () => {
  //   slideIndex = (slideIndex + 1) % slides.length;
  //   showSlide(slideIndex);
  // });


  // showSlide(slideIndex);

};

module.exports = slider;