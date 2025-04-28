/* =========  простейший словарь  ========= */
import { translations, DEFAULT_LANG } from './translation.js';

  
  const savedLang = localStorage.getItem('lang') || DEFAULT_LANG;

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = translations[lang]?.[key];
  
      if (translation) {
        if (translation.includes('<') || translation.includes('<br>') || translation.includes('<a') ) {
          el.innerHTML = translation; 
        } else {
          el.textContent = translation; 
        }
      }
    });
  
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = translations[lang]?.[key];
      if (translation) {
        el.setAttribute('placeholder', translation);
      }
    });
  }
  
  function updateLanguageUI(lang) {
    document.querySelectorAll('.info__item-language').forEach(wrapper => {
      const active = wrapper.querySelector('.info__link-language');
      const picked = wrapper.querySelector(`.info__sub-link[data-lang="${lang}"]`);
  
      if (active && picked) {
        active.innerHTML = picked.innerHTML;
      }
    });
  }
  
  function setLanguage(lang) {
    if (!translations[lang] || lang === localStorage.getItem('lang')) return;
  
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
    updateLanguageUI(lang);
  }
  
  function initLanguageDropdowns() {
    document.querySelectorAll('.info__item-language').forEach(wrapper => {
      const arrow = wrapper.querySelector('.info__arrow');
      const submenu = wrapper.querySelector('.info__sub-menu');
  
      wrapper.addEventListener('click', e => {
        if (e.target.closest('.info__sub-link')) return;
        submenu.classList.toggle('open');
        arrow.classList.toggle('open');
      });
  
      submenu.addEventListener('click', e => {
        const link = e.target.closest('[data-lang]');
        if (!link) return;
  
        e.preventDefault();
        submenu.classList.remove('open');
        arrow.classList.remove('open');
  
        setLanguage(link.dataset.lang);
      });
    });
  }


  
  

window.addEventListener('DOMContentLoaded', () => {

    applyTranslations(savedLang);
    updateLanguageUI(savedLang);
    initLanguageDropdowns()

    const burger = document.querySelector('.menu__icon');
    const header = document.querySelector('.header');
    const sidebar = document.querySelector('.sidebar');
    const pageBody = document.querySelector('.page__body');
    const menuClose = document.querySelector('.menu-close')
    const isSidebarPage = document.body.classList.contains('page--with-sidebar');

    const menuTarget = isSidebarPage ? sidebar : header;

    if (burger && menuTarget && pageBody) {
        burger.addEventListener('click', function(e) {
            burger.classList.toggle('active');
            menuTarget.classList.toggle('show');
            pageBody.classList.toggle('no-scrolling');
        });
    }

    if(menuClose){
        menuClose.addEventListener("click", function(e) {
            burger.classList.remove('active');
            menuTarget.classList.remove('show');
            pageBody.classList.remove('no-scrolling');
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

  const accordion = document.querySelector('.info__details')
  if(accordion){
        accordion.addEventListener("click", function(e) {
            accordion.classList.toggle('active')
        });
   }

   const alert = document.querySelectorAll('.content__alert')
   const alertClose = document.querySelectorAll('.content__alert-close')

   if(alert && alertClose){
        alertClose.forEach(element => {
            element.addEventListener("click", function(e) {
                alert.forEach(el=>{
                    el.remove()
                })
            });
        });
    }

    const rublesSlider = document.getElementById('rublesSlider');
    const monthsSlider = document.getElementById('monthsSlider');
    const rublesValue = document.getElementById('rublesValue');
    const monthsValue = document.getElementById('monthsValue');

    if(rublesSlider && monthsSlider){

      rublesSlider.addEventListener('input', () => {
        rublesValue.textContent = `${rublesSlider.value}`;
      });

      monthsSlider.addEventListener('input', () => {
        monthsValue.textContent = `${monthsSlider.value}`;
      });
    }

    function initModals() {
      const openButtons = document.querySelectorAll('[data-click-btn]');
    
      if (!openButtons.length) return;
    
      openButtons.forEach(button => {
        button.addEventListener('click', e => {
          const modalSelector = button.dataset.clickBtn;
          const bodyClass = button.dataset.clickBody || '';
          const modal = document.querySelector(modalSelector);
    
          if (!modal) return;
    
          modal.classList.add('show');
          if (bodyClass) {
            document.body.classList.add(bodyClass);
          }

          const closeModal = () => {
            modal.classList.remove('show');
            if (bodyClass) {
              document.body.classList.remove(bodyClass);
            }
          };
    

          modal.querySelectorAll('[data-click-close]').forEach(closeBtn => {
            closeBtn.addEventListener('click', closeModal, { once: true });
          });
    
          modal.addEventListener('click', e => {
            if (e.target === modal) {
              closeModal();
            }
          }, { once: true });
    
          modal.querySelectorAll('[data-click-close-inside]').forEach(btn => {
            btn.addEventListener('click', closeModal, { once: true });
          });
        });
      });
    }
    
    initModals();

    const cardsVisual = document.querySelectorAll('.sidebar__card-visual');

    if (cardsVisual) {

      cardsVisual.forEach(cardVisual => {
        const cardDataNumber = cardVisual.querySelector('.sidebar__card-number');
        const cardNumber = cardVisual.querySelector('.sidebar__card-number span');
        const toggleBtn = cardVisual.querySelector('.sidebar__card-hide img');
        
    
        cardVisual.addEventListener('click', () => {
          if (cardNumber.textContent.includes('*')) {
            cardNumber.textContent = cardDataNumber.dataset.fullNumber; 
            toggleBtn.src = 'img/eye-hide.svg'; 
          } else {
            cardNumber.textContent = '**** **** ****';
            toggleBtn.src = 'img/eye-hide.svg'; 
          }
        });
      });

    }
    
});