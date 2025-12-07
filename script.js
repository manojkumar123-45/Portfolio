// script.js
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-links");
    const backToTop = document.querySelector(".back-to-top");
    const revealEls = document.querySelectorAll(".reveal");
    const typingEl = document.querySelector(".typing");

    /* MOBILE NAV TOGGLE */
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    });

    /* SMOOTH SCROLL (extra, even though CSS has scroll-behavior) */
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId.startsWith("#")) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });

    /* ACTIVE NAV ON SCROLL */
    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document
                    .querySelectorAll(".nav-link")
                    .forEach((link) => link.classList.remove("active"));
                const activeLink = document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );
                if (activeLink) activeLink.classList.add("active");
            }
        });

        // Back to top button
        if (scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    /* BACK TO TOP CLICK */
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    /* REVEAL ON SCROLL (IntersectionObserver) */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
        }
    );

    revealEls.forEach((el) => observer.observe(el));

    /* TYPEWRITER EFFECT */
    const roles = [
        "Aspiring Full-Stack Developer",
        "Java | Spring Boot | Angular",
        "Backend & REST API Enthusiast",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = roles[roleIndex];
        if (!isDeleting) {
            typingEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, 1200);
                return;
            }
        } else {
            typingEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        const speed = isDeleting ? 50 : 90;
        setTimeout(type, speed);
    }

    if (typingEl) {
        type();
    }
});
