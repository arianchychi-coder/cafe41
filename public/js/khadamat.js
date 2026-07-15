document.addEventListener('DOMContentLoaded', () => {
    
    // ---- Responsive particle count ----
    // Fewer particles on small screens for smoother performance.
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ایجاد ذرات متحرک
    const particlesContainer = document.querySelector('.kh-particles');
    const particleCount = isSmallScreen ? 15 : 30;
    
    if (particlesContainer && !isReducedMotion) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'kh-particle';
            
            // موقعیت تصادفی
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // تاخیر و مدت زمان تصادفی
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            
            // اندازه تصادفی
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            particlesContainer.appendChild(particle);
        }
    }

    // ---- Parallax only on devices that have a real mouse (skip touch) ----
    const hero = document.querySelector('.kh-hero');
    const bgImage = document.querySelector('.kh-bg-image');
    const content = document.querySelector('.kh-content');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (hero && canHover && !isReducedMotion) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // حرکت پس‌زمینه
            if (bgImage) {
                bgImage.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.1)`;
            }
            
            // حرکت محتوا (برعکس)
            if (content) {
                content.style.transform = `translate(${-x * 10}px, ${-y * 10}px)`;
            }
        });
        
        // بازگشت به حالت عادی
        hero.addEventListener('mouseleave', () => {
            if (bgImage) {
                bgImage.style.transform = 'translate(0, 0) scale(1)';
                bgImage.style.transition = 'transform 0.5s ease';
            }
            if (content) {
                content.style.transform = 'translate(0, 0)';
                content.style.transition = 'transform 0.5s ease';
            }
        });
    }

    // افکت کلیک روی دکمه
    const btn = document.querySelector('.kh-btn');
    if (btn) {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }

    // افکت تایپ برای زیرعنوان (اختیاری)
    const subtitle = document.querySelector('.kh-subtitle');
    if (subtitle) {
        const originalText = subtitle.innerHTML;
        subtitle.innerHTML = '';
        
        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.innerHTML = originalText;
        }, 1300);
    }
});



const reveals = document.querySelectorAll(".reveal");

function animateCounter(counter) {

    const target = +counter.dataset.target;
    const duration = 2000; // دو ثانیه
    const startTime = performance.now();

    function update(currentTime) {

        const progress = Math.min((currentTime - startTime) / duration, 1);

        const value = Math.floor(progress * target);

        counter.textContent = value.toLocaleString() + "+";

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = target.toLocaleString() + "+";
        }
    }

    requestAnimationFrame(update);
}

function revealScroll() {

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            if (!item.classList.contains("active")) {

                item.classList.add("active");

                const counter = item.querySelector(".counter");

                if (counter) {
                    animateCounter(counter);
                }
            }

        }

    });

}

// Use passive listener for smoother scrolling on mobile
window.addEventListener("scroll", revealScroll, { passive: true });

// Re-run reveal check on resize (orientation change, window resize)
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        revealScroll();
    }, 150);
});

revealScroll();
