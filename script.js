// ===================================
// INKFORGE PRESS - MAIN SCRIPT
// ===================================

// Utility function to capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Initialize components
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initPortfolioGrid();
    initVideoTestimonials();
});

// ========== NAVIGATION ==========

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Scroll event handler for navbar
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);
    });
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
}

// ========== SCROLL ANIMATIONS ==========

function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .step-card, .testimonial-card, .pricing-card, .portfolio-item'
    );
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ========== COUNTER ANIMATION ==========

function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-target]');
    const speed = 200;
    
    const runCounter = function(counter) {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        
        const updateCount = function() {
            const count = +counter.innerText;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };
    
    // Start animation when element is in view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// ========== PORTFOLIO GRID ==========

function initPortfolioGrid() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    // Portfolio data with actual book covers
    const portfolioItems = [
        { id: 1, title: 'Classic Novel', category: 'fiction', image: '/images/covers/cover-01.jpeg' },
        { id: 2, title: 'Elara Valerius', category: 'fiction', image: '/images/covers/elara_valerius.jpeg' },
        { id: 3, title: 'Publishing Insights', category: 'nonfiction', image: '/images/covers/IMG-20260502-WA0004.jpg' },
        { id: 4, title: 'Personal Journey', category: 'memoir', image: '/images/covers/WA_1777715460739.jpeg' },
        { id: 5, title: 'Adventure Tales', category: 'fiction', image: '/images/covers/WA_1777715521129.jpeg' },
        { id: 6, title: 'Industry Handbook', category: 'nonfiction', image: '/images/covers/WA_1777715531665 (1).jpeg' },
        { id: 7, title: 'Heritage & Legacy', category: 'memoir', image: '/images/covers/WA_1777715552540.jpeg' },
        { id: 8, title: 'Bestseller Collection', category: 'fiction', image: '/images/covers/WA_1777715566803.jpeg' }
    ];
    
    // Render portfolio grid
    if (portfolioGrid) {
        renderPortfolio(portfolioItems);
        initPortfolioAnimations();
        
        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const filteredItems = filter === 'all' 
                    ? portfolioItems 
                    : portfolioItems.filter(item => item.category === filter);
                
                renderPortfolio(filteredItems);
                initPortfolioAnimations();
            });
        });
    }
}

function renderPortfolio(items) {
    const portfolioGrid = document.getElementById('portfolioGrid');
    portfolioGrid.innerHTML = '';
    
    items.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.style.animationDelay = `${index * 0.05}s`;
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/200x300?text=${encodeURIComponent(item.title)}'">
            <div class="portfolio-overlay">
                <div class="portfolio-info">
                    <h3>${item.title}</h3>
                    <p>${capitalizeFirst(item.category)}</p>
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'portfolioSlideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            }
        });
    }, observerOptions);
    
    portfolioItems.forEach(item => {
        observer.observe(item);
    });
}

// ========== VIDEO TESTIMONIALS ==========

function initVideoTestimonials() {
    const videoGrid = document.getElementById('videoTestimonialsGrid');
    
    // Sample video testimonial data
    // Update these paths with your actual MP4 files
    const videoTestimonials = [
        {
            id: 1,
            video: '/videos/testimonials/testimonial-01.mp4',
            author: 'Author Name 1',
            title: 'Published Author'
        },
        {
            id: 2,
            video: '/videos/testimonials/testimonial-02.mp4',
            author: 'Author Name 2',
            title: 'Bestselling Author'
        }
    ];
    
    if (videoGrid) {
        renderVideoTestimonials(videoTestimonials);
    }
}

function renderVideoTestimonials(videos) {
    const videoGrid = document.getElementById('videoTestimonialsGrid');
    
    videos.forEach((video, index) => {
        const videoContainer = document.createElement('div');
        videoContainer.style.opacity = '0';
        videoContainer.style.animation = `slideInUp 0.6s ease-out forwards`;
        videoContainer.style.animationDelay = `${index * 0.1}s`;
        
        videoContainer.innerHTML = `
            <div class="video-testimonial" onclick="playVideo(this)">
                <video>
                    <source src="${video.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="video-play-button"></div>
            </div>
            <div class="video-meta">
                <h4>${video.author}</h4>
                <p>${video.title}</p>
            </div>
        `;
        
        videoGrid.appendChild(videoContainer);
    });
}

// Play video on click
function playVideo(element) {
    const video = element.querySelector('video');
    const playButton = element.querySelector('.video-play-button');
    
    if (video.paused) {
        video.play();
        playButton.style.opacity = '0';
    } else {
        video.pause();
        playButton.style.opacity = '1';
    }
}

// ========== SMOOTH SCROLL FOR HASH LINKS ==========

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

// ========== BUTTON INTERACTIONS ==========

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

console.log('Inkforge Press website initialized successfully!');
