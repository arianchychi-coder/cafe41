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
    // 3. Interactive Timeline Hover Effect
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


/* =========================================================
   بخش کارت‌های پارتنر/سرویس (pt-*) - انیمیشن ورود و افکت Tilt
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

    // انتخاب تمام المان‌های قابل انیمیشن
    const animateElements = document.querySelectorAll('.pt-animate');

    // Intersection Observer برای انیمیشن ورودی
    const ptObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const ptElementObserver = new IntersectionObserver((entries, observer) => {
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
    }, ptObserverOptions);

    // اتصال آبزرور به المان‌ها
    animateElements.forEach(el => ptElementObserver.observe(el));

    // افکت Tilt سه‌بعدی روی کارت‌ها (فقط روی دستگاه‌هایی با ماوس فعال می‌شود)
    const cards = document.querySelectorAll('.pt-card');
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (supportsHover) {
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
    }

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


/* =========================================================
   بخش پروفایل بنیان‌گذار (cf-*) — آقای مهندس کلانکی
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    // انیمیشن ظاهر شدن با IntersectionObserver
    const cfObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('cf-is-visible');

                // اجرای انیمیشن شمارش اعداد وقتی stats-section نمایان شد
                if (entry.target.classList.contains('cf-stats-section')) {
                    cfAnimateCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.cf-js-animate').forEach(el => cfObserver.observe(el));

    // تبدیل اعداد انگلیسی به فارسی
    function cfToPersianNumber(num) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, digit => persianDigits[digit]);
    }

    // تابع شمارش اعداد آمار
    function cfAnimateCounters() {
        const counters = document.querySelectorAll('.cf-stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // تابع easing برای حرکت نرم‌تر
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(easeProgress * target);

                // نمایش عدد به فارسی
                counter.textContent = cfToPersianNumber(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = cfToPersianNumber(target);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // افکت پارالاکس ملایم روی تصویر با حرکت موس (فقط دسکتاپ با ماوس)
    const cfImageSection = document.querySelector('.cf-image-section');
    const supportsHoverCf = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (cfImageSection && supportsHoverCf && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            cfImageSection.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});


/* =========================================================
   بخش پروفایل مدیرعامل (ceo-*) — خانم مهندس کلانکی
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    // انیمیشن ظاهر شدن با IntersectionObserver
    const ceoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ceo-is-visible');

                // اجرای انیمیشن شمارش اعداد وقتی stats-section نمایان شد
                if (entry.target.classList.contains('ceo-stats-section')) {
                    ceoAnimateCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.ceo-js-animate').forEach(el => ceoObserver.observe(el));

    // تبدیل اعداد انگلیسی به فارسی
    function ceoToPersianNumber(num) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, digit => persianDigits[digit]);
    }

    // تابع شمارش اعداد آمار
    function ceoAnimateCounters() {
        const counters = document.querySelectorAll('.ceo-stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // تابع easing برای حرکت نرم‌تر
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(easeProgress * target);

                // نمایش عدد به فارسی
                counter.textContent = ceoToPersianNumber(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = ceoToPersianNumber(target);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // افکت پارالاکس ملایم روی تصویر با حرکت موس (فقط دسکتاپ با ماوس)
    const ceoImageSection = document.querySelector('.ceo-image-section');
    const supportsHoverCeo = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (ceoImageSection && supportsHoverCeo && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            ceoImageSection.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});


/* =========================================================
   بخش اکوسیستم کافه معدن (eco2-*)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    // انیمیشن ورود المان‌ها
    const eco2Obs = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('eco2-visible');
                }, idx * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.eco2-js-anim').forEach(el => eco2Obs.observe(el));

    // افکت hover روی کارت‌ها (فقط دسکتاپ با ماوس؛ روی موبایل با :active جایگزین می‌شود)
    const supportsHoverEco = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (supportsHoverEco) {
        document.querySelectorAll('.eco2-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // کلیک روی لینک‌ها
    document.querySelectorAll('.eco2-link').forEach(link => {
        link.addEventListener('click', function () {
            const card = this.closest('.eco2-card');
            const title = card.querySelector('.eco2-card-ttl').textContent;
            console.log('در حال انتقال به بخش:', title);
        });
    });
});
