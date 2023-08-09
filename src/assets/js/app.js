document.addEventListener("DOMContentLoaded", () => {


    //= components/

    if (document.querySelector('.main-news__swiper')) {
        new Swiper(".main-news__swiper", {
            slidesPerView: 3,
            spaceBetween: 30,
        });
    }

})



