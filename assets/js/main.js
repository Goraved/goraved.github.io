/**
 * Main JavaScript for Roman Pobotin's portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    initTypedText();

    // Set current year in footer
    setCurrentYear();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Add active state to navigation
    initNavActiveState();

    // Initialize career view toggling
    initCareerView();

    // Improve hero layout
    adjustHeroLayout();

    // Easter egg - Konami code
    initKonamiCode();
});

/**
 * Initialize the typed text animation
 */
function initTypedText() {
    const typedElement = document.getElementById('typed-element');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-element', {
            strings: [
                'Quality Engineering Lead',
                'QA Automation Expert',
                'Test Architecture Designer',
                'SDET Team Lead',
                'Ready for Head of QA challenges'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true
        });
    }
}

/**
 * Set the current year in the footer
 */
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset for fixed header if needed
                const offset = 20;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Highlight active navigation item based on scroll position
 */
function initNavActiveState() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function highlightNavItem() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Apply active class to navigation links
    window.addEventListener('scroll', highlightNavItem);
}

/**
 * Initialize career view toggling
 */
function initCareerView() {
    const viewButtons = document.querySelectorAll('.career-nav__btn');
    const careerViews = document.querySelectorAll('.career-view');

    if (viewButtons.length === 0 || careerViews.length === 0) {
        console.warn('Career view elements not found');
        return;
    }

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');

            // Remove active class from all buttons and views
            viewButtons.forEach(btn => btn.classList.remove('career-nav__btn--active'));
            careerViews.forEach(careerView => careerView.classList.remove('career-view--active'));

            // Add active class to clicked button and corresponding view
            this.classList.add('career-nav__btn--active');
            document.getElementById(`${view}-view`).classList.add('career-view--active');
        });
    });
}

/**
 * Improve hero section header layout
 */
function adjustHeroLayout() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero__content');

    if (window.innerWidth < 768) {
        if (heroContent) heroContent.style.maxWidth = '100%';
    } else {
        if (heroContent) heroContent.style.maxWidth = '700px';
    }
}

/**
 * Easter egg - Konami code (up, up, down, down, left, right, left, right, b, a)
 */
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiCodePosition = 0;

    document.addEventListener('keydown', function(e) {
        const key = e.key;
        const requiredKey = konamiCode[konamiCodePosition];

        if (key === requiredKey) {
            konamiCodePosition++;

            if (konamiCodePosition === konamiCode.length) {
                activateEasterEgg();
                konamiCodePosition = 0;
            }
        } else {
            konamiCodePosition = 0;
        }
    });
}

/**
 * Activate easter egg
 */
function activateEasterEgg() {
    // Create a QA-themed easter egg
    const body = document.body;
    const easterEgg = document.createElement('div');

    easterEgg.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: var(--primary); color: white; padding: 20px; border-radius: 10px; z-index: 1000; box-shadow: 0 0 20px rgba(0,0,0,0.5); text-align: center;">
            <h3>🎉 Test Passed! 🎉</h3>
            <p>You found the hidden feature. Great QA skills!</p>
            <button id="closeEasterEgg" style="background-color: white; color: var(--primary); border: none; padding: 8px 16px; margin-top: 10px; border-radius: 5px; cursor: pointer;">Close</button>
        </div>
    `;

    body.appendChild(easterEgg);

    document.getElementById('closeEasterEgg').addEventListener('click', function() {
        body.removeChild(easterEgg);
    });
}

// Run layout adjustment on load and resize
window.addEventListener('resize', adjustHeroLayout);