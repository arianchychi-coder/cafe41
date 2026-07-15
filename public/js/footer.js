document.addEventListener('DOMContentLoaded', function() {

    // Elements
    const footerLinks = document.querySelectorAll('.footer-link');
    const socialLinks = document.querySelectorAll('.social-link');
    const contactValues = document.querySelectorAll('.contact-value');

    // ===== Smooth Scroll for Footer Links =====
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== Add Click Ripple Effect =====
    const addRipple = (element, e) => {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(201, 168, 76, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    };

    // Add ripple to interactive elements
    [...footerLinks, ...socialLinks, ...contactValues].forEach(el => {
        el.addEventListener('click', function(e) {
            addRipple(this, e);
        });
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

    // ===== Phone Number Formatting =====
    const phoneLink = document.querySelector('a[href^="tel"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', function() {
            console.log('تماس با شماره: 02188029006');
        });
    }

    // ===== Email Click Tracking =====
    const emailLink = document.querySelector('a[href^="mailto"]');
    if (emailLink) {
        emailLink.addEventListener('click', function() {
            console.log('ارسال ایمیل به: info@cafemadan.com');
        });
    }

    // ===== Intersection Observer for Animation =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe footer columns
    document.querySelectorAll('.footer-col').forEach(col => {
        observer.observe(col);
    });

    // ===== Add Active State on Hover =====
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            footerLinks.forEach(l => l.style.opacity = '0.6');
            this.style.opacity = '1';
        });

        link.addEventListener('mouseleave', function() {
            footerLinks.forEach(l => l.style.opacity = '1');
        });
    });

    // ===== Dynamic Year in Copyright =====
    const copyrightEl = document.querySelector('.copyright');
    if (copyrightEl) {
        const currentYear = new Date().getFullYear();
        const text = copyrightEl.textContent;
        copyrightEl.textContent = text.replace('©', `© ${currentYear}`);
    }

    // ===== Logo Placeholder Click (for demo) =====
    const logoPlaceholder = document.querySelector('.logo-placeholder');
    if (logoPlaceholder) {
        logoPlaceholder.addEventListener('click', function() {
            console.log('کلیک بر روی لوگو - بازگشت به صفحه اصلی');
            // window.location.href = '/';
        });
        logoPlaceholder.style.cursor = 'pointer';
    }

    // ===== Social Links Click =====
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label');
            console.log(`باز کردن ${platform}`);
            // e.preventDefault();
            // window.open(this.href, '_blank');
        });
    });

    // ===== Add Glow Effect Following Mouse (Subtle) =====
    const footer = document.querySelector('.site-footer');
    
    footer?.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        let glowCursor = this.querySelector('.mouse-glow');
        
        if (!glowCursor) {
            glowCursor = document.createElement('div');
            glowCursor.className = 'mouse-glow';
            glowCursor.style.cssText = `
                position: absolute;
                width: 300px;
                height: 300px;
                background: radial-gradient(circle, rgba(201, 168, 76, 0.1), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 0;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s;
            `;
            this.appendChild(glowCursor);
        }
        
        glowCursor.style.left = x + 'px';
        glowCursor.style.top = y + 'px';
    });

    console.log('✅ فوتر با موفقیت بارگذاری شد');
});