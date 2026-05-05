// ===================================
// INKFORGE PRESS - MAIN SCRIPT
// ===================================

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
    initCarousel();
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
    
    // Sample portfolio data - Update with your actual book data
    const portfolioItems = [
        { id: 1, title: 'Book Title 1', category: 'fiction', image: '/images/covers/cover-01.jpeg' },
        { id: 2, title: 'Book Title 2', category: 'nonfiction', image: '/images/covers/cover-02.jpeg' },
        { id: 3, title: 'Book Title 3', category: 'memoir', image: '/images/covers/cover-03.jpeg' },
        { id: 4, title: 'Book Title 4', category: 'fiction', image: '/images/covers/cover-04.jpg' },
        { id: 5, title: 'Book Title 5', category: 'nonfiction', image: '/images/covers/cover-05.jpg' },
        { id: 6, title: 'Book Title 6', category: 'fiction', image: '/images/covers/cover-06.jpg' },
        { id: 7, title: 'Book Title 7', category: 'memoir', image: '/images/covers/cover-07.jpg' },
        { id: 8, title: 'Book Title 8', category: 'nonfiction', image: '/images/covers/cover-08.jpg' },
        { id: 9, title: 'Book Title 9', category: 'fiction', image: '/images/covers/cover-09.jpg' },
        { id: 10, title: 'Book Title 10', category: 'memoir', image: '/images/covers/cover-10.jpg' },
        { id: 11, title: 'Book Title 11', category: 'fiction', image: '/images/covers/cover-11.jpg' },
        { id: 12, title: 'Book Title 12', category: 'nonfiction', image: '/images/covers/cover-12.jpg' },
        { id: 13, title: 'Book Title 13', category: 'fiction', image: '/images/covers/cover-13.jpg' },
        { id: 14, title: 'Book Title 14', category: 'memoir', image: '/images/covers/cover-14.jpg' },
        { id: 15, title: 'Book Title 15', category: 'nonfiction', image: '/images/covers/cover-15.jpg' }
    ];
    
    // Render portfolio grid
    if (portfolioGrid) {
        renderPortfolio(portfolioItems);
        
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

// ========== CAROUSEL ==========

function initCarousel() {
    const carousel = document.getElementById('carouselSlides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorContainer = document.getElementById('indicatorContainer');
    
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (index === 0 ? ' active' : '');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorContainer.appendChild(indicator);
    });
    
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index < currentIndex) {
                slide.classList.add('prev');
            }
        });
        
        // Update indicators
        document.querySelectorAll('.indicator').forEach((ind, index) => {
            ind.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);
}

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
