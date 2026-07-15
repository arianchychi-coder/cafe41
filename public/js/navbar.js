// ===== Navigation Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // ===== Scroll Effect =====
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== Mobile Menu Toggle =====
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // ===== Close Mobile Menu on Link Click =====
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 1200) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // ===== Smooth Scroll for Navigation Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 90;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== Active Link on Scroll =====
    const sections = document.querySelectorAll('section[id], div[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
    
    // ===== Create Particles (Optional Visual Effect) =====
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'navbar-particles';
        navbar.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // ===== Logo Animation on Hover =====
    const logoWrapper = document.querySelector('.logo-wrapper');
    const logoIcon = document.querySelector('.logo-icon');
    
    logoWrapper.addEventListener('mouseenter', function() {
        logoIcon.style.transform = 'rotate(15deg) scale(1.1)';
    });
    
    logoWrapper.addEventListener('mouseleave', function() {
        logoIcon.style.transform = 'rotate(0deg) scale(1)';
    });
    
    // ===== Button Ripple Effect =====
    const ecosystemBtn = document.querySelector('.btn-ecosystem');
    
    ecosystemBtn.addEventListener('click', function(e) {
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
    
    // Add ripple styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .btn-ecosystem .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===== Keyboard Navigation =====
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===== Touch Support for Mobile =====
    let touchStartY = 0;
    let touchEndY = 0;
    
    navbar.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, {passive: true});
    
    navbar.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 100;
        if (touchStartY - touchEndY > swipeThreshold) {
            // Swipe up - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        }
        if (touchEndY - touchStartY > swipeThreshold) {
            // Swipe down - show navbar
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    // Reset navbar transform on scroll
    window.addEventListener('scroll', function() {
        navbar.style.transform = 'translateY(0)';
    });
    
    console.log('✅ Navigation initialized successfully!');
});

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll listener
window.addEventListener('scroll', debounce(function() {
    // Heavy operations here
}, 10));


