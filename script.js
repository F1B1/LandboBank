window.addEventListener('DOMContentLoaded', () => {
  // Проверка и выполнение бургер-меню
  const burger = document.querySelector('.menu__icon');
  const header = document.querySelector('.header');
  const pageBody = document.querySelector('.page__body');

  if (burger && header && pageBody) {
      burger.addEventListener("click", function(e) {
          burger.classList.toggle('active');
          header.classList.toggle('show'); 
          pageBody.classList.toggle('no-scrolling'); 
      });
  }

  const swiperPrimaryEl = document.querySelector('.primary__swiper');
  if (swiperPrimaryEl) {
      const swiperPrimary = new Swiper('.primary__swiper', {
          slidesPerView: 'auto',
          spaceBetween: 8,
          pagination: {
              el: '.primary__pagination',
          },
      });
  }

  const swiperReviewEl = document.querySelector('.reviews__swiper');
  if (swiperReviewEl) {
      const swiperReview = new Swiper('.reviews__swiper', {
          slidesPerView: 'auto',
          spaceBetween: 8,
      });
  }
});