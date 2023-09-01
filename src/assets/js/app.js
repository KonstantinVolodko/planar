document.addEventListener("DOMContentLoaded", () => {


    //= components/

    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });

    function initializeCustomSelect(selectContainer) {
        const select = selectContainer.querySelector('.my-select');
        const selectTriggerContainer = selectContainer.querySelector('.select-trigger');
        const selectTrigger = selectContainer.querySelector('.select-trigger span');
        const selectTriggerArrow = selectContainer.querySelector('.select-trigger i');
        const selectOptions = selectContainer.querySelector('.select-options');
        const selectOptionsList = selectContainer.querySelectorAll('.select-options li');

        selectTrigger.addEventListener('click', function () {
            if (selectOptions.style.display === 'block') {
                selectOptions.style.display = 'none';
                selectTriggerArrow.classList.remove('active')
                selectTriggerContainer.classList.remove('active')
            } else {
                selectOptions.style.display = 'block';
                selectTriggerArrow.classList.add('active')
                selectTriggerContainer.classList.add('active')
            }
        });

        selectOptionsList.forEach(function (option) {
            option.addEventListener('click', function () {
                const value = option.getAttribute('data-value');
                selectTrigger.textContent = option.textContent;
                select.value = value;
                selectOptions.style.display = 'none';
                selectTriggerArrow.classList.remove('active')
                selectTriggerContainer.classList.remove('active')
            });
        });

        document.addEventListener('click', function (event) {
            const target = event.target;
            if (!selectTrigger.contains(target) && !selectOptions.contains(target)) {
                selectOptions.style.display = 'none';
            }
        });
    }

    const selectContainers = document.querySelectorAll('.custom-select');
    selectContainers.forEach(function (container) {
        initializeCustomSelect(container);
    });


    let textElement = document.querySelector(".main-title-block h1");

    if (textElement) {
        let textToType = "ОАО «Планар»";
        textElement.innerText = "";

        function typeText(text, i) {
            if (i < text.length) {
                textElement.innerText += text.charAt(i);
                textElement.innerHTML += '<span class="cursor"></span>';
                setTimeout(function () {
                    typeText(text, i + 1);
                }, 150);
            }
        }

        typeText(textToType, 0);
    }

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
            },
            watchSlidesProgress: true,
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
            productCardBtns.forEach(btn => {
                btn.classList.remove('active')
            })
            e.classList.add('active')

            // Устанавливаем контент с анимацией
            productCardTabContent.classList.remove('active')
            setTimeout(() => {
                productCardTabContent.innerHTML = e.nextElementSibling.innerHTML
                productCardTabContent.classList.add('active')
            }, 300) // Задержка соответствует времени анимации в CSS
        })
    })

    if (productCardTabContent) {
        productCardBtns[0].click()
    }

    let scientificCardSwiper = new Swiper(".scientific-card__swiper", {
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 120,
        loop: true,
        pagination: {
            el: ".scientific-card__swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".scientific-card__swiper-btn-right",
            prevEl: ".scientific-card__swiper-btn-left",
        },
        breakpoints: {
            1024: {
                slidesPerView: 1.5,
            },
        },
    });


    class Modal {
        constructor(modalId, openButtons) {
            this.modal = document.getElementById(modalId);
            this.openButtons = [];

            if (typeof openButtons === 'string') {
                this.openButtons = Array.from(document.getElementsByClassName(openButtons));
            } else if (Array.isArray(openButtons)) {
                this.openButtons = openButtons.map(buttonId => document.getElementById(buttonId));
            }

            this.openButtons.forEach(button => {
                if (button) {
                    button.addEventListener('click', () => {
                        this.open();
                        this.disableBodyScroll();
                    });
                }
            });

            window.addEventListener('click', (event) => {
                if (this.modal && event.target === this.modal) {
                    this.close();
                    this.enableBodyScroll();
                }
            });

            const closeButton = this.modal ? this.modal.querySelector('.close') : null;
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    this.close();
                    this.enableBodyScroll();
                });
            }
        }

        open() {
            this.modal.style.display = 'block';
            setTimeout(() => {
                this.modal.classList.add('open');
            }, 10);
        }

        close() {
            this.modal.classList.remove('open');
            setTimeout(() => {
                this.modal.style.display = 'none';
            }, 300);
        }

        disableBodyScroll() {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = scrollBarWidth + 'px';
            document.body.style.overflow = 'hidden';
        }

        enableBodyScroll() {
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }
    }

    const searchModal = new Modal('search-modal');

    const burgerMenu = new Modal('burger-menu');

    let menuBtns = document.querySelectorAll('.header__menu button');
    menuBtns.forEach(e => {
        e.addEventListener('click', () => {
            menuBtns.forEach(e => {
                e.classList.remove('active')
            })
            e.classList.toggle('active')
            e.nextElementSibling.classList.toggle('active');
            if (e.nextElementSibling.classList.contains('active') === false) {
                e.classList.remove('active')
            }
        });
    });

    document.addEventListener('click', (event) => {
        menuBtns.forEach(btn => {
            const menu = btn.nextElementSibling;
            if (menu.classList.contains('active') && !menu.contains(event.target) && event.target !== btn) {
                menu.classList.remove('active');
                btn.classList.remove('active')
            }
        });
    });

    menuBtns.forEach(btn => {
        const menu = btn.nextElementSibling;
        menu.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });

    const burger = document.querySelector(".header__burger");

    burger.addEventListener("click", function () {

        if (burger.classList.contains("header__burger")) {
            burgerMenu.open()
            burgerMenu.disableBodyScroll()
            burger.classList.add('cross')
            burger.classList.remove('header__burger')
        } else {
            burgerMenu.close()
            burgerMenu.enableBodyScroll()
            burger.classList.add('header__burger')
            burger.classList.remove('cross')
        }
    });

    let header = document.querySelector('.header')
    let burgerMenuContent = document.querySelector('.burger-menu')
    let searchModalContent = document.querySelector('.search-modal')
    burgerMenuContent.style.top = `${header.scrollHeight}px`
    searchModalContent.style.top = `${header.scrollHeight}px`

    document.querySelector('.burger-menu-content__first-list').innerHTML = document.querySelector('.header__menu').innerHTML

    let burgerMenuList = document.querySelectorAll('.burger-menu-content__first-list li')
    let burgerMenuListInner = document.querySelector('.burger-menu-content__second-list')

    if (window.matchMedia("(min-width: 1025px)").matches) {
        burgerMenuList.forEach(e => {
            e.addEventListener('click', () => {
                burgerMenuList.forEach(e => {
                    e.classList.remove('active')
                })
                e.classList.add('active')

                burgerMenuListInner.style.padding = '7.4rem 3rem 0 7rem'
                document.querySelector('.burger-menu-content__second-list').innerHTML = e.querySelector('ul').innerHTML
            })
        })
    }

    if (window.matchMedia("(max-width: 1024px)").matches) {
        let acc = document.querySelectorAll(".burger-menu-content__first-list li button");
        let i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                let panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.paddingTop = "0rem"
                    panel.style.paddingBottom = "0rem"
                    panel.style.borderTop = "none"
                    panel.style.borderBottom = "none"
                    panel.style.maxHeight = null;
                } else {
                    panel.style.paddingTop = "2rem"
                    panel.style.paddingBottom = "2rem"
                    panel.style.borderTop = "0.1rem solid var(--blue)"
                    panel.style.borderBottom = "0.1rem solid var(--blue)"
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
    }

    // const flipCards = document.querySelectorAll(".main-news__content li");

    // if (flipCards) {
    //     flipCards.forEach((card, index) => {
    //         const animation = gsap.to(card, {
    //             duration: 0.5,
    //             rotationY: 0,
    //             transformOrigin: "50% 50%",
    //             ease: "power2.inOut",
    //             paused: true,
    //             scrollTrigger: {
    //                 trigger: card,
    //                 start: "top 80%",
    //             },
    //         });
    //     });
    // }

    // const flipCardsCalendar = document.querySelectorAll(".main-calendar__events li");

    // if (flipCardsCalendar) {
    //     flipCardsCalendar.forEach((card, index) => {
    //         const animation = gsap.to(card, {
    //             duration: 0.5,
    //             rotationY: 0,
    //             transformOrigin: "50% 50%",
    //             ease: "power2.inOut",
    //             paused: true,
    //             scrollTrigger: {
    //                 trigger: card,
    //                 start: "top 80%",
    //             },
    //         });
    //     });
    // }

    let searchIco = document.querySelector('.header__search-ico')
    let searchIcoLoop = document.querySelector('.header__search-ico svg:first-child')

    let searchIcoCross = document.querySelector('.header__search-ico svg:last-child')

    if (window.matchMedia("(max-width: 1024px)").matches) {
        searchIcoLoop.addEventListener('click', e => {
            searchModal.open()
            searchIco.classList.add('active')
        })

        searchIcoCross.addEventListener('click', e => {
            searchModal.close()
            searchIco.classList.remove('active')
        })
    }

    if (window.matchMedia("(min-width: 1024px)").matches) {
        searchIco.addEventListener('click', e => {
            searchIco.classList.toggle('open-search-modal')

            if (searchIco.classList.contains('open-search-modal')) {
                searchModal.open()
            } else {
                searchModal.close()
            }
        })
    }

})



