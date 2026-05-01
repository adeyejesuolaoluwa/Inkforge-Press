/* ====================================== */
/* INKFORGE - PREMIUM INTERACTIONS */
/* ====================================== */

// Initialize Feather Icons
feather.replace();

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// ========== SCROLL HANDLERS ==========
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    // Navbar effect
    if (lastScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    // Trigger animations on scroll
    animateOnScroll();
});

// ========== INTERSECTION OBSERVER ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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

// Observe all cards and sections
document.querySelectorAll('.problem-card, .feature-item, .testimonial-card, .pricing-card, .step-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ========== NAVIGATION ==========
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (lastScrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== BUTTON ANIMATIONS ==========
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Ripple effect
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

// ========== CARD HOVER EFFECTS ==========
document.querySelectorAll('.problem-card, .feature-item, .testimonial-card, .pricing-card, .step-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease-out';
    });
});

// ========== PARALLAX EFFECTS ==========
function updateParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroTop = hero.offsetTop;
        const parallaxElements = hero.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = (lastScrollY - heroTop) * speed;
            el.style.transform = `translateY(${yPos}px)`;
        });
    }
}

window.addEventListener('scroll', updateParallax);

// ========== COUNTER ANIMATION ==========
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const range = target - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ========== ANIMATED ELEMENTS ON SCROLL ==========
function animateOnScroll() {
    // Add more sophisticated scroll-based animations here
    // This could include parallax shifts, element reveals, etc.
}

// ========== CURSOR FOLLOWER (Premium Touch) ==========
function createCursorFollower() {
    const follower = document.createElement('div');
    follower.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #8b5cf6, #ec4899);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.2s;
        box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
    `;
    document.body.appendChild(follower);
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.style.left = (mouseX - 4) + 'px';
        follower.style.top = (mouseY - 4) + 'px';
        follower.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
    });
    
    // Remove on touch devices
    if (window.innerWidth < 768) {
        follower.remove();
    }
}

// ========== ANIMATE ON LOAD ==========
window.addEventListener('load', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'slideInUp 0.8s ease-out';
    }
    
    // Optional: Create cursor follower
    createCursorFollower();
    
    // Initialize counters
    setTimeout(() => {
        const metaItems = document.querySelectorAll('.meta-item strong');
        metaItems.forEach(item => {
            const target = parseInt(item.textContent);
            if (target) {
                animateCounter(item, target, 1500);
            }
        });
    }, 300);
});

// ========== MOBILE OPTIMIZATIONS ==========
if (window.innerWidth < 768) {
    // Disable animations on mobile for performance
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animation = 'none';
    });
}

// ========== PERFORMANCE: Debounce scroll events ==========
let scrollTimeout;
function debounceScroll() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        updateParallax();
        animateOnScroll();
    }, 10);
}

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========== SMOOTH ANIMATIONS ==========
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Active nav link */
    .nav-link.active {
        color: #8b5cf6;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    /* Hamburger active state */
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
    
    /* Reduce motion respect */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

// ========== CONSOLE MESSAGE ==========
console.log('%cInkforge', 'font-size: 28px; color: #8b5cf6; font-weight: bold; font-family: Fraunces, serif;');
console.log('%cMaster Your Fictional Universe', 'font-size: 14px; color: #ec4899; font-family: Geist, sans-serif;');
console.log('%cBuilt with premium design principles. Every interaction intentional. Every pixel purposeful.', 'font-size: 12px; color: #cbd5e1; font-family: Geist, sans-serif;');
