document.addEventListener('DOMContentLoaded', function() {

    // ===== Counter Animation =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target < 10 ? `0${target}` : target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    // ===== Intersection Observer for Counter Animation =====
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    // ===== Button Click Effect =====
    const contentBtn = document.querySelector('.content-btn');
    
    contentBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('مشاهده گزارش‌ها');
        
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
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===== Parallax Effect for Topographic Pattern =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const topoPattern = document.querySelector('.topo-pattern-research');
        if (topoPattern) {
            const rate = scrolled * 0.03;
            topoPattern.style.transform = `translateY(${rate}px)`;
        }
    });

    // ===== Hover Effect for Stats =====
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // ===== Image Reveal Animation on Scroll =====
    const imageWrapper = document.querySelector('.research-image-wrapper');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (imageWrapper) {
        imageWrapper.style.opacity = '0';
        imageWrapper.style.transform = 'translateX(-30px)';
        imageWrapper.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        imageObserver.observe(imageWrapper);
    }

    console.log('✅ سکشن مرکز تحقیقات با موفقیت بارگذاری شد');
});