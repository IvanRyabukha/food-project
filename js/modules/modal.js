function modal() {
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

};

module.exports = modal;