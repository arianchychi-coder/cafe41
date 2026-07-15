document.addEventListener("DOMContentLoaded", () => {
    
    // ========== متغیرها ==========
    const header = document.getElementById("mainHeader");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarNav = document.getElementById("sidebarNav");
    const sectionBlocks = document.querySelectorAll(".article-section-block");
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    
    // ========== افکت اسکرول هدر ==========
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
    
    // ========== تاگل سایدبار ==========
    sidebarToggle.addEventListener("click", () => {
        sidebarNav.classList.toggle("collapsed");
        sidebarToggle.classList.toggle("collapsed");
    });
    
    // ========== هایلایت بخش فعال هنگام اسکرول ==========
    const observerOptions = {
        root: null,
        rootMargin: "-100px 0px -50% 0px",
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // حذف کلاس active از همه بخش‌ها
                sectionBlocks.forEach(block => block.classList.remove("active"));
                sidebarLinks.forEach(link => link.classList.remove("active"));
                
                // اضافه کردن کلاس active به بخش فعلی
                entry.target.classList.add("active");
                
                // به‌روزرسانی لینک فعال در سایدبار
                const activeLink = document.querySelector(`.sidebar-link[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, observerOptions);
    
    sectionBlocks.forEach(block => {
        sectionObserver.observe(block);
    });
    
    // ========== اسکرول نرم با کلیک روی لینک‌های سایدبار ==========
    sidebarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute("data-section");
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // ========== انیمیشن ورود المان‌ها ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".article-section-block");
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };
    
    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
    
    // ========== افکت پارالاکس تصویر اصلی ==========
    const heroImage = document.querySelector(".hero-image img");
    
    window.addEventListener("scroll", () => {
        if (heroImage) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `translateY(${rate}px) scale(1.05)`;
        }
    });
    
});