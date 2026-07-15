document.addEventListener("DOMContentLoaded", () => {
    // انیمیشن ورود المان‌ها
    const eco2Obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('eco2-visible');
                }, idx * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.eco2-js-anim').forEach(el => eco2Obs.observe(el));

    // افکت hover روی کارت‌ها
    document.querySelectorAll('.eco2-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // کلیک روی لینک‌ها
    document.querySelectorAll('.eco2-link').forEach(link => {
        link.addEventListener('click', function () {
            const card = this.closest('.eco2-card');
            const title = card.querySelector('.eco2-card-ttl').textContent;
            console.log('در حال انتقال به بخش:', title);
        });
    });
});