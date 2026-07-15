document.addEventListener('DOMContentLoaded', function() {

    const serviceItems = document.querySelectorAll('.service-item');
    const viewAllBtn = document.querySelector('.services-btn');

    // ===== Service Item Click Effect =====
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceName = this.querySelector('.service-title').textContent;
            console.log(`سرویس "${serviceName}" انتخاب شد`);
            
            // Add active state
            serviceItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });

        // Hover sound effect simulation (visual feedback)
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ===== View All Button =====
    viewAllBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('نمایش همه خدمات');
        
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

    // ===== Scroll Animation with Intersection Observer =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    serviceItems.forEach(item => observer.observe(item));

    // ===== Keyboard Navigation =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            serviceItems.forEach(item => {
                item.setAttribute('tabindex', '0');
            });
        }
    });

    console.log('✅ سکشن خدمات ما با موفقیت بارگذاری شد');
});