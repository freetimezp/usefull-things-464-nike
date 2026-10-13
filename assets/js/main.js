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

    if (!header) return;

    header.classList.toggle("scroll-header", window.scrollY >= 50);
};

scrollHeader();
window.addEventListener("scroll", scrollHeader);

/*=============== SWIPER JS ===============*/

// Create the thumbnail slider.
const swiperThumbs = new Swiper(".home__thumbs", {
    slidesPerView: "auto",
    direction: window.innerWidth <= 767 ? "horizontal" : "vertical",
    watchSlidesProgress: true,
});

// Create the main sneaker slider.
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

// Change the thumbnail direction when crossing the mobile breakpoint.
let previousMobileState = window.innerWidth <= 767;

window.addEventListener("resize", () => {
    const isMobile = window.innerWidth <= 767;

    // Avoid updating Swiper when the breakpoint has not changed.
    if (isMobile === previousMobileState) return;

    previousMobileState = isMobile;

    swiperThumbs.changeDirection(isMobile ? "horizontal" : "vertical");
    swiperThumbs.update();
    swiperHome.update();
});

/*=============== CINEMATIC GSAP ANIMATION ===============*/

// Stop the entrance animation for users who prefer reduced motion.
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
).matches;

// Create the animation only when GSAP is available.
if (typeof gsap !== "undefined") {
    // Set common animation settings.
    gsap.defaults({
        ease: "power4.out",
        duration: 1.2,
    });

    // Set the initial state of each animated element.
    gsap.set(
        [
            ".header",
            ".home__logo",
            ".home__name",
            ".home__title span",
            ".home__data > *",
            ".home__buttons",
            ".home__sizes",
            ".home__thumbs",
            ".home__preview img",
            ".home__swiper",
            ".swiper-button-prev",
            ".swiper-button-next",
            ".swiper-pagination",
        ],
        {
            opacity: 0,
        },
    );

    // Skip large entrance movements if reduced motion is enabled.
    if (!prefersReducedMotion) {
        // Build a timeline so all entrance animations work together.
        const intro = gsap.timeline({
            defaults: {
                ease: "power4.out",
            },
        });

        // Reveal header.
        intro.fromTo(
            ".header",
            {
                y: -100,
                opacity: 0,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
            },
            0.15,
        );

        // Reveal the large background logo.
        intro.fromTo(
            ".home__logo",
            {
                scale: 1.5,
                rotate: -12,
            },
            {
                opacity: 0.055,
                scale: 1,
                x: -60,
                y: -70,
                rotate: 0,
                duration: 1.6,
                ease: "power3.out",
            },
            0.2,
        );

        // Bring the background brand lettering into view.
        intro.fromTo(
            ".home__name",
            {
                y: 80,
                scale: 0.9,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.3,
            },
            0.35,
        );

        // Reveal the sneaker with a dramatic 3D entrance.
        intro.fromTo(
            ".home__swiper",
            {
                y: 160,
                x: 40,
                scale: 0.75,
                rotateZ: -14,
                rotateY: 18,
            },
            {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotateZ: 0,
                rotateY: 0,
                duration: 1.6,
                ease: "power3.out",
            },
            0.45,
        );

        // Reveal the main headline from below.
        intro.fromTo(
            ".home__title span",
            {
                yPercent: 110,
                rotateX: -25,
            },
            {
                opacity: 1,
                yPercent: 0,
                rotateX: 0,
                duration: 1.1,
                stagger: 0.12,
            },
            0.7,
        );

        // Reveal product details one after another.
        intro.fromTo(
            ".home__data > *",
            {
                y: 24,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
            },
            1,
        );

        // Slide the thumbnail images into place.
        intro.fromTo(
            ".home__thumbs",
            {
                opacity: 0,
                scale: 0.95,
                x: 50,
            },
            {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 0.3,
            },
            1,
        );

        intro.fromTo(
            ".home__preview img",
            {
                x: 35,
                scale: 0.8,
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
            },
            1.1,
        );

        // Reveal the size selector and CTA.
        intro.fromTo(
            ".home__sizes",
            {
                x: 30,
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.9,
            },
            1.25,
        );

        intro.fromTo(
            ".home__buttons",
            {
                y: 25,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
            },
            1.3,
        );

        // Bring in the navigation controls last.
        intro.fromTo(
            [
                ".swiper-button-prev",
                ".swiper-button-next",
                ".swiper-pagination",
            ],
            {
                y: 18,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
            },
            1.45,
        );

        // Give the visible sneaker a subtle floating motion.
        // This animation runs independently from the entrance.
        gsap.to(".home__sneaker img", {
            y: -12,
            rotateZ: 2,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.8,
        });
    } else {
        // Display everything immediately when reduced motion is enabled.
        gsap.set(
            [
                ".header",
                ".home__logo",
                ".home__name",
                ".home__title span",
                ".home__data > *",
                ".home__buttons",
                ".home__sizes",
                ".home__thumbs",
                ".home__preview img",
                ".home__swiper",
                ".swiper-button-prev",
                ".swiper-button-next",
                ".swiper-pagination",
            ],
            {
                clearProps: "all",
                opacity: 1,
            },
        );
    }
}

/*=============== MAGNETIC ADD TO CART BUTTON ===============*/

const btn = document.querySelector(".home__button-bag");

// Only use the magnetic effect on devices with a fine pointer.
const canUseMagneticEffect = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
).matches;

if (btn && typeof gsap !== "undefined" && canUseMagneticEffect) {
    // Move the button slightly toward the mouse pointer.
    btn.addEventListener("mousemove", (event) => {
        const rect = btn.getBoundingClientRect();

        const moveX = (event.clientX - rect.left - rect.width / 2) * 0.15;

        const moveY = (event.clientY - rect.top - rect.height / 2) * 0.15;

        gsap.to(btn, {
            x: moveX,
            y: moveY,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
        });
    });

    // Return the button to its original position.
    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
        });
    });
}

/*=============== FAVORITE BUTTON ===============*/

const heartButton = document.querySelector(".home__button-heart");
const heartIcon = heartButton?.querySelector("i");

heartButton?.addEventListener("click", () => {
    const isFavorite = heartButton.classList.toggle("is-favorite");

    heartButton.setAttribute("aria-pressed", String(isFavorite));

    if (heartIcon) {
        heartIcon.className = isFavorite
            ? "ri-heart-3-fill"
            : "ri-heart-3-line";
    }

    if (typeof gsap !== "undefined") {
        gsap.fromTo(
            heartButton,
            { scale: 0.85 },
            {
                scale: 1,
                duration: 0.45,
                ease: "elastic.out(1, 0.45)",
            },
        );
    }
});

window.addEventListener("resize", () => location.reload());
