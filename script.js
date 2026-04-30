// ========================================
// DOM ELEMENTS
// ========================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// ========================================
// THEME TOGGLE
// ========================================
function initTheme() {
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);
}

function setTheme(theme) {
    const isDark = theme === 'dark';
    
    if (isDark) {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('moon');
    } else {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('sun');
    }
}

function updateThemeIcon(icon) {
    const iconElement = themeToggle.querySelector('i');
    iconElement.className = icon === 'moon' ? 'fas fa-moon' : 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    const isDarkMode = !document.body.classList.contains('light-mode');
    setTheme(isDarkMode ? 'light' : 'dark');
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// ========================================
// SCROLL TO TOP
// ========================================
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .pricing-card').forEach(el => {
    observer.observe(el);
});

// ========================================
// FORM HANDLING
// ========================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!validateForm(formData)) {
        showNotification('Please fill out all required fields.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate form submission (in real app, this would send to a server)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showNotification('Message sent successfully! We\'ll be in touch soon.', 'success');
        contactForm.reset();
    }, 1500);
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';

    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showNotification('Thanks for subscribing!', 'success');
        newsletterForm.reset();
    }, 1000);
});

// ========================================
// FORM VALIDATION
// ========================================
function validateForm(data) {
    return data.name && data.email && data.service && data.message;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// NOTIFICATIONS
// ========================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ========================================
// CURSOR EFFECTS (OPTIONAL)
// ========================================
function addCursorFollowEffect() {
    const cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background-color: #d4af37;
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = (e.clientX - 4) + 'px';
        cursorDot.style.top = (e.clientY - 4) + 'px';
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
    });
}

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================
function initParallax() {
    const heroSection = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        floatingElements.forEach((el, index) => {
            el.style.transform = `translateY(${scrollY * (0.5 + index * 0.1)}px)`;
        });
    });
}

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ========================================
// NUMBER COUNTER ANIMATION
// ========================================
function animateCounters() {
    const stats = document.querySelectorAll('.stat h4');
    
    const observerOptions = {
        threshold: 0.5
    };

    const counter = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalNumber = parseInt(element.textContent);
                
                if (!element.hasAttribute('data-animated')) {
                    element.setAttribute('data-animated', 'true');
                    animateValue(element, 0, finalNumber, 2000);
                }
            }
        });
    }, observerOptions);

    stats.forEach(stat => counter.observe(stat));
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ========================================
// ANIMATION STYLES
// ========================================
function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }

        @keyframes ripple {
            from {
                opacity: 1;
                transform: scale(0);
            }
            to {
                opacity: 0;
                transform: scale(4);
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// SERVICE CARD HOVER EFFECT
// ========================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease-out';
    });
});

// ========================================
// PORTFOLIO ITEM HOVER
// ========================================
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        const cover = this.querySelector('.cover-placeholder');
        if (cover) {
            cover.style.filter = 'brightness(1.1)';
        }
    });

    item.addEventListener('mouseleave', function () {
        const cover = this.querySelector('.cover-placeholder');
        if (cover) {
            cover.style.filter = 'brightness(1)';
        }
    });
});

// ========================================
// NAVBAR ACTIVE LINK UPDATE
// ========================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #d4af37;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initParallax();
    injectAnimationStyles();
    animateCounters();
    
    // Add loading animation to elements
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .portfolio-item, .testimonial-card, .pricing-card, .about-content'
    );
    
    elementsToObserve.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    });

    // Trigger animations after a small delay
    setTimeout(() => {
        elementsToObserve.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});

// ========================================
// CONSOLE MESSAGE (EASTER EGG)
// ========================================
console.log('%cWelcome to InkInkForge Press', 'font-size: 24px; color: #d4af37; font-weight: bold; font-family: serif;');
console.log('%cTransform Your Manuscript Into a Masterpiece', 'font-size: 14px; color: #e8d7c3; font-family: serif;');
