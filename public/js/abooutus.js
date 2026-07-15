document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. Animation Observer for Timeline & Stats Cards
    // =========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If it's a stat card, trigger the number counter
                if (entry.target.classList.contains('stat-card')) {
                    const numElement = entry.target.querySelector('.stat-num');
                    if (numElement && !numElement.classList.contains('counted')) {
                        animateValue(numElement, 0, parseInt(numElement.getAttribute('data-target')), 2200);
                        numElement.classList.add('counted');
                    }
                }

                // Unobserve after animating
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe Timeline Items
    document.querySelectorAll('.timeline-item').forEach(item => {
        elementObserver.observe(item);
    });

    // Observe Stat Cards (adding stagger delay dynamically)
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.12}s`;
        elementObserver.observe(card);
    });


    // =========================================
    // 2. Number Counter Logic with Persian Formatting
    // =========================================
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Ease out cubic function for smoother ending
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(easeOutProgress * (end - start) + start);

            // Format with Persian numerals
            obj.innerHTML = currentValue.toLocaleString('fa-IR');

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end.toLocaleString('fa-IR');
            }
        };
        window.requestAnimationFrame(step);
    }


    // =========================================
    // 3. Parallax Effect on Scroll
    // =========================================


    // =========================================
    // 4. Interactive Timeline Hover Effect
    // =========================================
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Dim other items slightly
            document.querySelectorAll('.timeline-item').forEach(other => {
                if (other !== item) {
                    other.style.opacity = '0.4';
                    other.style.filter = 'blur(1px)';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            document.querySelectorAll('.timeline-item').forEach(other => {
                other.style.opacity = '';
                other.style.filter = '';
            });
        });
    });

});



document.addEventListener('DOMContentLoaded', () => {
    
    // انتخاب تمام المان‌های قابل انیمیشن
    const animateElements = document.querySelectorAll('.pt-animate');
    
    // Intersection Observer برای انیمیشن ورودی
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // محاسبه تاخیر بر اساس ایندکس کارت‌ها
                const allCards = Array.from(document.querySelectorAll('.pt-card'));
                const index = allCards.indexOf(entry.target);
                const delay = index >= 0 ? index * 150 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('pt-visible');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // اتصال آبزرور به المان‌ها
    animateElements.forEach(el => elementObserver.observe(el));

    // افکت Tilt سه‌بعدی روی کارت‌ها
    const cards = document.querySelectorAll('.pt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // محاسبه زاویه چرخش (ملایم)
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            
            // حرکت افکت درخشان با موس
            const glow = card.querySelector('.pt-card-glow');
            if (glow) {
                glow.style.left = `${x - rect.width}px`;
                glow.style.top = `${y - rect.height}px`;
            }
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        // بازگشت به حالت عادی
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // افکت کلیک روی دکمه
    const btn = document.querySelector('.pt-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 200);
        });
    }
});