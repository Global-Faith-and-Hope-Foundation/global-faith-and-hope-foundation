/* =========================================================
   GLOBAL FAITH AND HOPE FOUNDATION (GFHF)
   Professional Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ---------------------------------------------------------
       1. MOBILE NAVIGATION
       --------------------------------------------------------- */

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (menuToggle && navigation) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.classList.toggle("active", isOpen);
        });

        // Close menu when a navigation link is clicked
        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* ---------------------------------------------------------
       2. ACTIVE NAVIGATION LINK
       --------------------------------------------------------- */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navLinks = document.querySelectorAll(".main-nav a");

    navLinks.forEach(link => {

        const linkPage = link.getAttribute("href");

        if (!linkPage) return;

        const cleanLink = linkPage
            .split("/")
            .pop()
            .toLowerCase();

        // Homepage
        if (
            (currentPage === "" || currentPage === "index.html") &&
            (cleanLink === "" || cleanLink === "index.html")
        ) {
            link.classList.add("active");
        }

        // Other pages
        else if (
            currentPage !== "" &&
            currentPage !== "index.html" &&
            cleanLink === currentPage
        ) {
            link.classList.add("active");
        }

    });


    /* ---------------------------------------------------------
       3. SMOOTH SCROLLING
       --------------------------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetID = this.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const target = document.querySelector(targetID);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ---------------------------------------------------------
       4. HEADER SHADOW WHEN SCROLLING
       --------------------------------------------------------- */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        updateHeader();

    }


    /* ---------------------------------------------------------
       5. BACK TO TOP BUTTON
       --------------------------------------------------------- */

    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        };

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

        updateBackToTop();

    }


    /* ---------------------------------------------------------
       6. IMAGE LOADING
       --------------------------------------------------------- */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("load", () => {
            image.classList.add("loaded");
        });

        image.addEventListener("error", () => {

            console.warn(
                "GFHF: Unable to load image:",
                image.getAttribute("src")
            );

            image.classList.add("image-error");

        });

        // Images already loaded before JavaScript started
        if (image.complete) {
            image.classList.add("loaded");
        }

    });


    /* ---------------------------------------------------------
       7. CURRENT YEAR IN FOOTER
       --------------------------------------------------------- */

    const yearElements = document.querySelectorAll(
        "#currentYear, .current-year"
    );

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* ---------------------------------------------------------
       8. REVEAL ELEMENTS WHILE SCROLLING
       --------------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".reveal, .fade-in, .section-card, .impact-card, .project-card"
    );

    if ("IntersectionObserver" in window && revealElements.length) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* ---------------------------------------------------------
       9. CONTACT FORM PROTECTION
       --------------------------------------------------------- */

    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            const name = contactForm.querySelector(
                '[name="name"]'
            );

            const email = contactForm.querySelector(
                '[name="email"]'
            );

            const message = contactForm.querySelector(
                '[name="message"]'
            );

            let valid = true;

            if (name && name.value.trim() === "") {
                name.classList.add("input-error");
                valid = false;
            }

            if (
                email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
            ) {
                email.classList.add("input-error");
                valid = false;
            }

            if (message && message.value.trim() === "") {
                message.classList.add("input-error");
                valid = false;
            }

            if (!valid) {
                event.preventDefault();
                alert("Please complete the required fields.");
            }

        });

    }


    /* ---------------------------------------------------------
       10. REMOVE INPUT ERROR WHEN USER STARTS TYPING
       --------------------------------------------------------- */

    document.querySelectorAll(
        "input, textarea, select"
    ).forEach(input => {

        input.addEventListener("input", () => {
            input.classList.remove("input-error");
        });

    });


    /* ---------------------------------------------------------
       11. PREVENT BROKEN INTERNAL LINKS
       --------------------------------------------------------- */

    document.querySelectorAll("a").forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;

        // Ignore external links, email, telephone and anchors
        if (
            href.startsWith("http") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("#")
        ) {
            return;
        }

        // Allow normal HTML page navigation
        link.addEventListener("click", () => {

            console.log(
                "GFHF navigation:",
                href
            );

        });

    });


    /* ---------------------------------------------------------
       12. WEBSITE INITIALIZED
       --------------------------------------------------------- */

    console.log(
        "GFHF website initialized successfully."
    );

});
