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
const scrollHeader = () => {
    const header = document.getElementById("header");

    this.scrollY >= 50 ? header.classList.add("scroll-header") : header.classList.remove("scroll-header");
};

window.addEventListener("scroll", scrollHeader);

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
gsap.defaults({
    opacity: 0,
    ease: "power4.out",
    duration: 1.4,
});

const tl = gsap.timeline();

tl.from(".home__logo", { scale: 5 }, ".5")
    .from(".home__name", { y: 100 }, ".75")
    .from(".home__swiper", { y: 300, rotateZ: -25, rotateX: 40 }, "1.25")
    .from(".home__title span", { y: 100, display: "block" }, "1.5")
    .from(".home__data > *", { y: 20, stagger: 0.15 }, "1.75")
    .from(".home__previews img", { x: 100 }, "1.75")
    .from(".home__sizes", { x: 100 }, "2")
    .from(
        ".home__buttons, .swiper-button-prev, .swiper-button-next, swiper-pagination-bullet",
        {
            y: 100,
            stagger: 0.15,
        },
        "2.25"
    );

gsap.to(
    ".home__sneaker img",
    {
        y: "+=50",
        rotateZ: 3,
        duration: 2,
        repeat: -1,
        opacity: 1,
        yoyo: true,
        ease: "sine.inOut",
    },
    "2.25"
);

/*=============== BUTTON MOUSE MOVE ===============*/
const btn = document.querySelector(".home__button-bag");

btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();

    gsap.to(btn, {
        x: (e.clientX - rect.left - rect.width / 2) * 0.2,
        y: (e.clientY - rect.top - rect.height / 2) * 0.2,
        duration: 0.3,
        opacity: 1,
    });
});

btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
        x: 0,
        y: 0,
        opacity: 1,
    });
});
