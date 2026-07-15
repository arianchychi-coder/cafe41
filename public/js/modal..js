const storyData = {
    '1396': {
        year: '1396',
        title: 'آغاز فعالیت',
        subtitle: 'تاسیس و شروع کار',
        dateBadge: 'تیر ۱۳۹۶',
        image: 'woman.jpg',
        description: 'داستان ما از یک ایده ساده اما بزرگ شروع شد. در تیر ۱۳۹۶، با هدف ارائه راهکارهای نوآورانه در حوزه معدن، شرکت خود را با نام «داستان ما» تاسیس کردیم. با یک تیم کوچک اما پرانرژی، کار خود را آغاز کردیم.',
        events: [
            { date: 'تیر ۱۹۶', title: 'تاسیس شرکت داستان ما', desc: 'ثبت رسمی شرکت و آغاز فعالیت در حوزه معدن' },
            { date: 'شهریور ۱۳۹۶', title: 'اجرای اولین پروژه', desc: 'دریافت و موفقیت در اولین پروژه استخراج' },
            { date: 'دی ۳۹۶', title: 'تشکیل تیم تخصصی', desc: 'گسترش تیم و جذب متخصصان حوزه معدن' },
            { date: 'اسفند ۱۳۶', title: 'توسعه خدمات', desc: 'افزودن خدمات جدید به سبد محصولات شرکت' }
        ],
        progress: { completed: '۸ پروژه', ongoing: '۵ پروژه', planned: '۱۲ پروژه' },
        stats: { members: '۳۲', projects: '+۲۵', awards: '3' }
    },
    '1398': {
        year: '1398',
        title: 'توسعه و گسترش',
        subtitle: 'توسعه تیم و خدمات',
        dateBadge: 'مهر ۱۳۹۸',
        image: 'woman.jpg',
        description: 'در سال ۱۳۹۸، با تجربه دو سال فعالیت، وارد فاز جدیدی از رشد شدیم. تیم ما به بیش از ۳ نفر رسید و پروژه‌های متعددی در سراسر کشور اجرا کردیم.',
        events: [
            { date: 'مهر ۱۹۸', title: 'گسترش تیم به ۳۰ نفر', desc: 'جذب نیروهای متخصص و توسعه ساختار سازمانی' },
            { date: 'آذر ۱۳۹۸', title: 'ورود به بازارهای جدید', desc: 'شروع فعالیت در استان‌های دیگر کشور' },
            { date: 'بهمن ۱۳۹۸', title: 'دریافت گواهینامه کیفیت', desc: 'اخذ استانداردهای بین‌المللی ISO' },
            { date: 'اسفند ۱۳۹۸', title: 'افتتاح دفتر مرکزی جدید', desc: 'انتقال به دفتر مرکزی بزرگ‌تر و مدرن‌تر' }
        ],
        progress: { completed: '۱۵ پروژه', ongoing: '۸ پروژه', planned: '۲ پروژه' },
        stats: { members: '۴۵', projects: '+۴۰', awards: '5' }
    }
};

let currentYear = '1396';

// تابع بارگذاری تصویر با مدیریت خطا
function loadImage(imageSrc, callback) {
    const img = new Image();
    
    img.onload = function() {
        callback(null, imageSrc);
    };
    
    img.onerror = function() {
        console.error('خطا در بارگذاری تصویر:', imageSrc);
        callback(new Error('تصویر لود نشد'), null);
    };
    
    img.src = imageSrc;
}

// تابع باز کردن مودال
function openStoryModal(year) {
    const modal = document.getElementById('storyModal');
    const data = storyData[year];
    
    if (!data) return;
    
    currentYear = year;
    
    // پر کردن اطلاعات
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;
    document.getElementById('modalDateBadge').textContent = data.dateBadge;
    document.getElementById('modalDescription').textContent = data.description;
    
    // بارگذاری تصویر با مدیریت خطا
    const modalImage = document.getElementById('modalImage');
    const imageWrapper = document.getElementById('imageWrapper');
    
    // مخفی کردن عکس قبلی و نمایش placeholder
    modalImage.style.display = 'none';
    imageWrapper.classList.remove('image-loaded');
    
    // تلاش برای بارگذاری تصویر جدید
    loadImage(data.image, function(error, src) {
        if (error) {
            console.warn('تصویر یافت نشد، placeholder نمایش داده می‌شود');
            // placeholder خودکار نمایش داده می‌شود چون عکس مخفی است
        } else {
            // تصویر با موفقیت لود شد
            modalImage.src = src;
            modalImage.alt = data.title;
            modalImage.style.display = 'block';
            imageWrapper.classList.add('image-loaded');
        }
    });
    
    // پر کردن رویدادها
    const eventsContainer = document.getElementById('eventsTimeline');
    eventsContainer.innerHTML = '';
    
    data.events.forEach(event => {
        const eventHTML = `
            <div class="mp-event-item">
                <div class="mp-event-date">${event.date}</div>
                <div class="mp-event-line">
                    <span class="mp-event-dot"></span>
                </div>
                <div class="mp-event-info">
                    <h4 class="mp-event-title">${event.title}</h4>
                    <p class="mp-event-desc">${event.desc}</p>
                </div>
            </div>
        `;
        eventsContainer.insertAdjacentHTML('beforeend', eventHTML);
    });
    
    // پر کردن پیشرفت
    document.getElementById('progressCompleted').textContent = data.progress.completed;
    document.getElementById('progressOngoing').textContent = data.progress.ongoing;
    document.getElementById('progressPlanned').textContent = data.progress.planned;
    
    // پر کردن آمار
    document.getElementById('statMembers').textContent = data.stats.members;
    document.getElementById('statProjects').textContent = data.stats.projects;
    document.getElementById('statAwards').textContent = data.stats.awards;
    
    // نمایش مودال
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // ریست اسکرول
    modal.scrollTop = 0;
}

// تابع بستن مودال
function closeStoryModal() {
    const modal = document.getElementById('storyModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// رویدادها
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('storyModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const openBtn = document.getElementById('openModalBtn');
    
    // باز کردن مودال
    openBtn.addEventListener('click', () => {
        openStoryModal(currentYear);
    });
    
    // بستن با دکمه
    closeBtn.addEventListener('click', closeStoryModal);
    
    // بستن با کلیک روی overlay
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeStoryModal();
        }
    });
    
    // بستن با Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeStoryModal();
        }
    });

    const modal = document.getElementById(`storyModal-${year}`);
    // ...

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // ریست اسکرول به بالا
    setTimeout(() => {
        const modalBody = modal.querySelector('.mp-modal-body');
        if (modalBody) modalBody.scrollTop = 0;
    }, 300);
});