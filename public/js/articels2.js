

document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.article-card');

    // ===== Intersection Observer for Fade-In =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = parseInt(card.dataset.index) * 150;

                setTimeout(() => {
                    card.classList.add('fade-in');
                }, delay);

                // Stop observing after animation
                fadeObserver.unobserve(card);
            }
        });
    }, observerOptions);

    // Observe all cards
    cards.forEach(card => {
        fadeObserver.observe(card);
    });

    // ===== Card Click Handler =====
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title').textContent;
            console.log('📖 Opening article:', title);
            // window.location.href = '/article/slug';
        });
    });

    // ===== Image Lazy Load Enhancement =====
    const images = document.querySelectorAll('.card-image');
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.onload = () => {
                    img.style.transition = 'opacity 0.6s ease';
                    img.style.opacity = '1';
                };
                imgObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => imgObserver.observe(img));

    console.log('✨ Articles Cards initialized - کافه معدن');
});