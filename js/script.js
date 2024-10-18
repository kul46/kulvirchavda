// Get the contact link
const contactLink = document.querySelector('a[href="#contact"]');

// Add an event listener to the contact link
contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
});

// Smooth Scrolling for in-page links (e.g., Contact)
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetID);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
};

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-menu li a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

/* --- Click Outside to Close Menu Functionality --- */
document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Slideshow Functionality
document.addEventListener('DOMContentLoaded', () => {
    const slideshows = document.querySelectorAll('.slideshow');

    slideshows.forEach((slideshow, index) => {
        let slideIndex = 0;
        const slides = slideshow.querySelectorAll('.slide');
        const prev = slideshow.parentElement.querySelector('.slideshow-nav .prev');
        const next = slideshow.parentElement.querySelector('.slideshow-nav .next');
        const dots = slideshow.parentElement.querySelectorAll('.slideshow-nav .dot');

        // Function to show a specific slide
        function showSlide(n) {
            if (n >= slides.length) { slideIndex = 0; }
            if (n < 0) { slideIndex = slides.length - 1; }
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active-dot'));
            slides[slideIndex].classList.add('active');
            if (dots[slideIndex]) dots[slideIndex].classList.add('active-dot');
        }

        // Show the first slide initially
        showSlide(slideIndex);

        // Event listeners for navigation buttons
        if (next) {
            next.addEventListener('click', () => {
                slideIndex++;
                showSlide(slideIndex);
            });
        }

        if (prev) {
            prev.addEventListener('click', () => {
                slideIndex--;
                showSlide(slideIndex);
            });
        }

        // Event listeners for dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                slideIndex = i;
                showSlide(slideIndex);
            });
        });
    });
});
