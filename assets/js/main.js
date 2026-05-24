/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
    const navMenu = document.getElementById("nav-menu");

    navMenu.classList.remove("show-menu");
};

navLink.forEach((el) => el.addEventListener("click", linkAction));

/*=============== CHANGE HEADER STYLES ===============*/

/*=============== SWIPER JS ===============*/
const swiperThumbs = new Swiper(".home__thumbs", {
    slidesPerView: "auto",
    direction: "vertical",
});

const swiperHome = new Swiper(".home__swiper", {
    direction: "vertical",
    loop: true,
    speed: 500,
    effect: "creative",
    creativeEffect: {
        prev: {
            translate: [100, -200, -100],
            opacity: 0,
        },
        next: {
            translate: [100, 200, 100],
            opacity: 0,
        },
    },

    breakpoints: {
        1150: {
            creativeEffect: {
                prev: {
                    translate: [200, -500, -100],
                },
                next: {
                    translate: [200, 500, 100],
                },
            },
        },
    },

    thumbs: {
        swiper: swiperThumbs,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
/*=============== GSAP ANIMATION ===============*/

/*=============== BUTTON MOUSE MOVE ===============*/
