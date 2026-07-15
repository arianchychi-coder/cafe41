document.addEventListener('DOMContentLoaded', function() {

    const cards = document.querySelectorAll('.eco-card');
    const viewAllBtn = document.querySelector('.eco-btn');

    // ===== Card Hover Tilt Effect =====
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });

        card.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            console.log(`کارت ${index} کلیک شد`);
        });
    });

    // ===== View All Button =====
    viewAllBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('مشاهده همه اکوسیستم');
    });

    // ===== Scroll Animation with Intersection Observer =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

    // ===== Parallax Effect for Topo Pattern =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const topoPattern = document.querySelector('.topo-pattern');
        if (topoPattern) {
            topoPattern.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });

    console.log('✅ سکشن اکوسیستم با موفقیت بارگذاری شد');
});