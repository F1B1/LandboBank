/* =========  простейший словарь  ========= */
import { translations, DEFAULT_LANG } from './translation.js';

  
  const savedLang    = localStorage.getItem('lang') || DEFAULT_LANG;

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translation = translations[lang]?.[key];
  
      if (!translation) return;
  
      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
          node.textContent = translation;
        }
      });
    });
  }
  

  function updateLanguageUI(lang) {
    const active = document.querySelector('.info__link-language');
    const picked = document.querySelector(`.info__sub-link[data-lang="${lang}"]`);
  
    if (active && picked) {
      active.innerHTML = picked.innerHTML;         
    }
  }
  

  function setLanguage(lang) {
    if (!translations[lang] || lang === localStorage.getItem('lang')) return;
  
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
    updateLanguageUI(lang);
  }
  

  function initLanguageDropdown() {
    const wrapper  = document.querySelector('.info__item-language');
    const arrow    = wrapper?.querySelector('.info__arrow');
    const submenu  = wrapper?.querySelector('.info__sub-menu');
  
    wrapper?.addEventListener('click', e => {
      if (e.target.closest('.info__sub-link')) return;
      submenu.classList.toggle('open');
      arrow.classList.toggle('open');
    });
  
    submenu?.addEventListener('click', e => {
      const link = e.target.closest('[data-lang]');
      if (!link) return;
  
      e.preventDefault();
      submenu.classList.remove('open');
      arrow.classList.remove('open');
  
      setLanguage(link.dataset.lang);
    });
  }
  

window.addEventListener('DOMContentLoaded', () => {

    applyTranslations(savedLang);
    updateLanguageUI(savedLang);
    initLanguageDropdown()

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
});