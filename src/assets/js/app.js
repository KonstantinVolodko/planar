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

})



