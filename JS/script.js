
// ===================================
// 1. SMOOTH SCROLLING
// ===================================

document.documentElement.style.scrollBehavior = "smooth";

// ===================================
// 2. ACTIVE NAVIGATION HIGHLIGHT
// ===================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `nav a[href="#${entry.target.id}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

}, {
    threshold: 0.3
});

sections.forEach((section) => {
    observer.observe(section);
});

 // ===================================
 // 3. SCROLL REVEAL ANIMATIONS
 // ===================================

const revealElements = document.querySelectorAll(
 ".skill-card, .education-card, .project-card, .achievement-card, .contact-card, .contact-form-container, .screenshot-card, .video-card"
);
const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});

// ===================================
// 4. MOBILE NAVIGATION MENU
// ===================================

const menuToggle = document.getElementById("menu-toggle");
const navLinksMenu = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

    navLinksMenu.classList.toggle("active");

    const isOpen = navLinksMenu.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});

// Close menu after clicking a navigation link

navLinksMenu.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinksMenu.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});
const templateID = "template_y6txjcg";
const publicKey = "FznKgnBZHsA0ssVYM";
const serviceID = "service_3cd2e8m";

// ===================================
// 5. EMAILJS CONTACT FORM
// ===================================

// Initialize EmailJS
emailjs.init({
    publicKey: publicKey
});

// Select contact form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        title: document.getElementById("title").value,
        message: document.getElementById("message").value,
        time: new Date().toLocaleString()
    };

    emailjs.send(serviceID, templateID, templateParams)

        .then(function() {

            formStatus.textContent =
                "Thank you! Your message has been sent successfully.";

            formStatus.style.color = "green";

            contactForm.reset();

        })

        .catch(function(error) {

            console.error("EmailJS Error:", error);

            formStatus.textContent =
                "Sorry! Message could not be sent. Please try again.";

            formStatus.style.color = "red";

        })

        .finally(function() {

            submitButton.disabled = false;
            submitButton.textContent = "Send Message";

        });

});
// ===================================
// SCREENSHOT CLICK-TO-ENLARGE
// ===================================

const screenshotImages = document.querySelectorAll(
    "#screenshots .screenshot-card img"
);

const lightbox = document.getElementById("screenshot-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

// Open screenshot
screenshotImages.forEach((image) => {
    image.addEventListener("click", () => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add("active");
    });
});

// Close using X
lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

// Close by clicking outside the image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }
});

// Close using Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        lightbox.classList.remove("active");
    }
});