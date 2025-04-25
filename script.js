window.addEventListener('DOMContentLoaded',()=>{

    const pageBody = document.querySelector('.page__body')

    const burger = document.querySelector('.menu__icon')
    const header = document.querySelector('.header')

    burger.addEventListener("click", function(e) {
        burger.classList.toggle('active')
        header.classList.toggle('show') 
        pageBody.classList.toggle('no-scrolling') 
    });

    const swiperPrimary = new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 8,
      
        pagination: {
          el: '.primary__pagination',
        },
      
      });

})