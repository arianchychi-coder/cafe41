document.addEventListener('DOMContentLoaded', () => {

    const heroSection = document.getElementById('heroSection');
    const bgImage = heroSection.querySelector('.hero-bg-image');
    const topoPattern = heroSection.querySelector('.hero-topo-pattern');
    const heroContent = heroSection.querySelector('.hero-content');

    // ===== 1. Load Animation =====
    // Trigger loaded state after a short delay for smooth entrance
    setTimeout(() => {
        heroSection.classList.add('loaded');
    }, 200);

    // ===== 2. Parallax on Scroll =====
    let ticking = false;

    function updateParallax() {
        const scrollY = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;

        if (scrollY <= heroHeight) {
            // Background moves slower than scroll (parallax)
            bgImage.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;

            // Topo pattern subtle movement
            topoPattern.style.transform = `translateY(${scrollY * 0.15}px)`;

            // Content fades out as user scrolls
            const opacity = 1 - (scrollY / heroHeight) * 1.5;
            const translateY = scrollY * 0.4;
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${translateY}px)`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ===== 3. Mouse Move Parallax (Desktop) =====
    if (window.innerWidth > 768) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Subtle background shift
            bgImage.style.transform = `scale(1.05) translate(${x * -15}px, ${y * -10}px)`;

            // Topo pattern moves opposite direction
            topoPattern.style.transform = `translate(${x * 8}px, ${y * 5}px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            bgImage.style.transform = 'scale(1)';
            topoPattern.style.transform = 'translate(0, 0)';
        });
    }

    // ===== 4. Dynamic Topo Lines Enhancement =====
    // Add more random topo lines for richer pattern
    function addDynamicTopoLines() {
        const svg = topoPattern;
        const ns = 'http://www.w3.org/2000/svg';

        for (let i = 0; i < 5; i++) {
            const path = document.createElementNS(ns, 'path');
            const startY = 50 + Math.random() * 500;
            const cp1x = 200 + Math.random() * 400;
            const cp1y = startY - 50 + Math.random() * 100;
            const cp2x = 600 + Math.random() * 400;
            const cp2y = startY + 20 - Math.random() * 60;
            const endX = 1200 + Math.random() * 240;
            const endY = startY - 20 + Math.random() * 80;

            path.setAttribute('d', `M0,${startY} C${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'url(#topoGrad)');
            path.setAttribute('stroke-width', (0.4 + Math.random() * 0.8).toFixed(2));
            path.classList.add('topo-line');
            path.style.animationDelay = `${1.5 + i * 0.2}s`;

            svg.appendChild(path);
        }
    }

    addDynamicTopoLines();

    // ===== 5. Gold Dust Particles (Canvas-like effect with DOM) =====
    function createGoldParticles() {
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'gold-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${1 + Math.random() * 2}px;
                height: ${1 + Math.random() * 2}px;
                background: rgba(212, 160, 23, ${0.1 + Math.random() * 0.3});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                z-index: 5;
                pointer-events: none;
                animation: goldFloat ${3 + Math.random() * 4}s ease-in-out infinite alternate;
                animation-delay: ${Math.random() * 3}s;
            `;
            heroSection.appendChild(particle);
        }

        // Add keyframes dynamically
        if (!document.getElementById('goldParticleStyle')) {
            const style = document.createElement('style');
            style.id = 'goldParticleStyle';
            style.textContent = `
                @keyframes goldFloat {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                    50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${10 + Math.random() * 20}px, -${10 + Math.random() * 30}px) scale(1.5); opacity: 0.6; }
                    100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${5 + Math.random() * 15}px, ${5 + Math.random() * 10}px) scale(0.8); opacity: 0.2; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createGoldParticles();

    // ===== 6. Intersection Observer for Re-trigger =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroSection.classList.add('loaded');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(heroSection);

    // ===== 7. Breadcrumb Link Interaction =====
    const breadcrumbLink = heroSection.querySelector('.breadcrumb-link');
    if (breadcrumbLink) {
        breadcrumbLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Add a subtle pulse effect
            breadcrumbLink.style.transform = 'scale(0.95)';
            setTimeout(() => {
                breadcrumbLink.style.transform = 'scale(1)';
            }, 150);
        });
    }

    console.log('🏔️ Hero Section initialized - کافه معدن');
});