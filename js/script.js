/* =========================================================
   AETHERIS STUDIOS
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HERO ENTRANCE
    ===================================================== */

    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {
        requestAnimationFrame(() => {
            heroContent.classList.add("loaded");
        });
    }


    /* =====================================================
       STARFIELD
    ===================================================== */

    const canvas = document.createElement("canvas");

    canvas.className = "starfield";

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let stars = [];

    let width = 0;
    let height = 0;

    const starCount = window.innerWidth < 700 ? 100 : 180;


    function resizeCanvas() {

        width = window.innerWidth;
        height = document.documentElement.scrollHeight;

        canvas.width = width;
        canvas.height = height;

        createStars();
    }


    function createStars() {

        stars = [];

        for (let i = 0; i < starCount; i++) {

            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,

                size:
                    Math.random() * 1.5 + 0.3,

                opacity:
                    Math.random() * 0.7 + 0.2,

                speed:
                    Math.random() * 0.0008 + 0.0002,

                phase:
                    Math.random() * Math.PI * 2
            });
        }
    }


    function drawStars(time) {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        stars.forEach((star) => {

            const twinkle =
                Math.sin(
                    time * star.speed +
                    star.phase
                );

            const opacity =
                star.opacity +
                twinkle * 0.18;


            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(220, 238, 255, ${Math.max(
                    0.05,
                    opacity
                )})`;

            ctx.fill();

        });


        requestAnimationFrame(drawStars);
    }


    resizeCanvas();

    requestAnimationFrame(drawStars);

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-header, " +
            ".project-card, " +
            ".about-content, " +
            ".technology-list, " +
            ".github-content"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       MOUSE LIGHT
    ===================================================== */

    const mouseLight =
        document.createElement("div");

    mouseLight.className =
        "mouse-light";

    document.body.appendChild(
        mouseLight
    );


    window.addEventListener(
        "mousemove",
        (event) => {

            mouseLight.style.left =
                `${event.clientX}px`;

            mouseLight.style.top =
                `${event.clientY}px`;

        }
    );


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");


    if (hero) {

        window.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5) * 2;

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5) * 2;


                hero.style.setProperty(
                    "--mouse-x",
                    x
                );

                hero.style.setProperty(
                    "--mouse-y",
                    y
                );

            }
        );

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector("header");


    function updateNavbar() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar
    );


    updateNavbar();


    /* =====================================================
       PROJECT CARD TILT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -3;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 3;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            );

        });

});
