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