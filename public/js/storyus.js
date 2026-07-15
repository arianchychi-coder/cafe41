    // Counter Animation
    function animateStatCounter(el) {
        document.querySelectorAll("[data-count]").forEach(el=>{
    console.log(el.dataset.count);
});
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000; // 2 ثانیه
        const step = Math.ceil(target / 50); // سرعت انیمیشن
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current.toLocaleString('fa-IR') + (target > 1000 ? '+' : '');
        }, 40);
    }

    // فعال کردن انیمیشن وقتی بخش وارد viewport شد
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        animateStatCounter(counter);
                        counter.classList.add('animated');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    // اجرای observer
    window.addEventListener('load', () => {
        const statsSection = document.getElementById('stats');
        if (statsSection) observer.observe(statsSection);
    });



        // Tailwind script already loaded
        
        function toggleLang() {
            alert("زبان به انگلیسی تغییر کرد (نسخه دمو)");
        }
        
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: "smooth"
            });
        }
        
        // Parallax effect for background
        window.addEventListener('scroll', () => {
            const hero = document.querySelector('.hero-bg');
            const scrollY = window.scrollY;
            hero.style.backgroundPositionY = `${scrollY * 0.3}px`;
        });
        
        // Add some fake truck movement on load
        setTimeout(() => {
            const trucks = document.querySelectorAll('.truck');
            trucks.forEach((truck, i) => {
                truck.style.animationDelay = `-${i * 8}s`;
            });
        }, 1000);
        
        console.log('%c✅ صفحه داستان ما با موفقیت ساخته شد!', 'color: #f59e0b; font-size: 16px; font-weight: bold;');



        // تابع باز کردن مودا