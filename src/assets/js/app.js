document.addEventListener("DOMContentLoaded", () => {


    //= components/

    if (document.querySelector('.main-news__swiper')) {
        new Swiper(".main-news__swiper", {
            slidesPerView: 3,
            spaceBetween: 30,
        });
    }

    let language = document.querySelector('.header__language a.active')
    let languageAll = document.querySelectorAll('.header__language a:not(.active)')

    if (window.matchMedia("(max-width: 1330px)").matches) {
        // language.preventDefault()
        languageAll.forEach(e => {
            language.nextElementSibling.appendChild(e)
        })
    }

    language.addEventListener('click', e => {
        e.preventDefault()
        console.log()
        language.nextElementSibling.classList.toggle('active')
        // if (language.classList.contains('active')) {
        //     language.nextElementSibling.style.height = `${language.nextElementSibling.querySelector('a').scrollHeight}px`
        // }else {
        //     language.nextElementSibling.style.height = "0px"
        // }

    })

    if (document.querySelector('.about-company__sertificate-swiper')) {
        new Swiper(".about-company__sertificate-swiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: ".about-company__arrow-next",
                prevEl: ".about-company__arrow-prev",
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },

                650: {
                    slidesPerView: 2,
                },
            }
        });
    }

    const accordionButtons = document.querySelectorAll('.products__accordion');
    const subAccordionButtons = document.querySelectorAll('.products__sub-accordion');
  
    accordionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const panel = button.nextElementSibling;
        panel.classList.toggle('expanded');
        button.classList.toggle('active')
      });
    });
  
    subAccordionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const subPanel = button.nextElementSibling;
        subPanel.classList.toggle('expanded');
        button.classList.toggle('active')
      });
    });

    let productCardBtns = document.querySelectorAll('.product-card__tab-btn')
    let productCardTabContent = document.querySelector('.product-card__tab-content')

    productCardBtns.forEach(e => {
        e.addEventListener('click', () => {
            productCardBtns.forEach(e => {
                e.classList.remove('active')
            })
            e.classList.add('active')
            productCardTabContent.innerHTML = e.nextElementSibling.innerHTML
        })
    })

    let scientificCardSwiper = new Swiper(".scientific-card__swiper", {
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 70,
        loop: true,
    });
})



