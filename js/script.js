'use strict';

window.addEventListener('DOMContentLoaded', () => {

  //Tabs

  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(tab => {
      tab.classList.add('hide');
      tab.classList.remove('show', 'fade');
    });

    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if (target === tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer

  const deadline = '2025-07-31';

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;

    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
    }


    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };

  setClock('.timer', deadline);

  //Modal

  const modal = document.querySelector('.modal'),
    openModal = document.querySelectorAll('[data-modal]');

  const modalTaimerId = setTimeout(showModal, 50000);

  function showModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTaimerId);
  }

  openModal.forEach(btn => {
    btn.addEventListener('click', showModal);
  });

  function hideModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
      hideModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      hideModal();
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1) {
      showModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  // Use classes for cards

  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 41;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;

      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({ img, altimg, title, descr, price }) => {
  //       new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //     });
  //   });

  // getResource('http://localhost:3000/menu')
  //   .then(data => createCard(data));

  // function createCard(data) {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     const element = document.createElement('div');
  //     const transferPrice = price * 41;

  //     element.classList.add('menu__item');

  //     element.innerHTML = `
  //       <img src=${img} alt=${altimg}>
  //       <h3 class="menu__item-subtitle">${title}</h3>
  //       <div class="menu__item-descr">${descr}</div>
  //       <div class="menu__item-divider"></div>
  //       <div class="menu__item-price">
  //         <div class="menu__item-cost">Цена:</div>
  //         <div class="menu__item-total"><span>${transferPrice}</span> грн/день</div>
  //       </div>
  //     `;

  //     document.querySelector('.menu .container').append(element);
  //   })
  // };

  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

  // Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach(form => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()))

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    showModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      hideModal();
    }, 4000);
  }

  // Slider

  const slides = document.querySelectorAll('.offer__slide'),
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

  btnNext.addEventListener('click', () => {
    if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
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
  });

  btnPrev.addEventListener('click', () => {
    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
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
  });

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


});
