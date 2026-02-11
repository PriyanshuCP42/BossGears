/* 
   BossGears Ltd. - Main Script
   Handles scrolling, navbar state, animations, and Google Sheets submission.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Navbar Color Change ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Apply to sections headers and cards
    const animatableElements = document.querySelectorAll('.section-header, .feature-card, .bento-card, .process-step, .about-text, .hero-content');

    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add CSS class for visible via JS to keep CSS clean
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);


    // --- Google Sheets Form Integration ---
    const scriptURL = `https://script.google.com/macros/s/AKfycbxgVMC-bC-LYKGsg3kcUJ9TFNo_wnRuiVWUHBtdyoFSEqsNRoy5KM_sh2Fze_e_C1S0VA/exec`; // <--- USER MUST UPDATE THIS
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();


            const btn = form.querySelector('button');
            const originalBtnText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    msg.style.display = "block";
                    setTimeout(() => {
                        msg.style.display = "none";
                    }, 5000);
                    form.reset();
                    btn.innerText = originalBtnText;
                    btn.disabled = false;
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('Error sending message. Please try again or contact us directly on WhatsApp.');
                    btn.innerText = originalBtnText;
                    btn.disabled = false;
                });
        });
    }
});
