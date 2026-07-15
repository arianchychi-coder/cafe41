document.addEventListener("DOMContentLoaded", () => {
    // انیمیشن ظاهر شدن با IntersectionObserver
    const cfObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('cf-is-visible');
                
                // اجرای انیمیشن شمارش اعداد وقتی stats-section نمایان شد
                if (entry.target.classList.contains('cf-stats-section')) {
                    cfAnimateCounters();
                }
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

    // افکت پارالاکس ملایم روی تصویر با حرکت موس
    const cfImageSection = document.querySelector('.cf-image-section');
    if (cfImageSection && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            cfImageSection.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});




document.addEventListener("DOMContentLoaded", () => {
    // انیمیشن ظاهر شدن با IntersectionObserver
    const ceoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ceo-is-visible');
                
                // اجرای انیمیشن شمارش اعداد وقتی stats-section نمایان شد
                if (entry.target.classList.contains('ceo-stats-section')) {
                    ceoAnimateCounters();
                }
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

    // افکت پارالاکس ملایم روی تصویر با حرکت موس
    const ceoImageSection = document.querySelector('.ceo-image-section');
    if (ceoImageSection && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            ceoImageSection.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});