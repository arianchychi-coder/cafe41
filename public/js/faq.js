document.addEventListener('DOMContentLoaded', function() {

    // Elements
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.getElementById('faqSearch');
    const clearSearch = document.getElementById('clearSearch');
    const searchStats = document.getElementById('searchStats');
    const noResults = document.getElementById('noResults');
    const faqList = document.getElementById('faqList');

    // ===== Accordion Functionality =====
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other items (accordion behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // ===== Search Functionality =====
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Show/hide clear button
        if (searchTerm.length > 0) {
            clearSearch.classList.add('visible');
        } else {
            clearSearch.classList.remove('visible');
        }
        
        // Filter FAQ items
        filterFAQItems(searchTerm);
    });

    // Clear Search
    clearSearch.addEventListener('click', function() {
        searchInput.value = '';
        clearSearch.classList.remove('visible');
        filterFAQItems('');
        searchInput.focus();
    });

    // Filter Function
    function filterFAQItems(searchTerm) {
        let visibleCount = 0;
        
        faqItems.forEach(item => {
            const questionText = item.querySelector('.question-text').textContent.toLowerCase();
            const answerText = item.querySelector('.answer-content p').textContent.toLowerCase();
            const category = item.getAttribute('data-category');
            
            const matchesSearch = questionText.includes(searchTerm) || 
                                 answerText.includes(searchTerm) || 
                                 category.includes(searchTerm);
            
            if (matchesSearch || searchTerm === '') {
                item.classList.remove('hidden');
                visibleCount++;
                
                // Highlight matching text
                if (searchTerm.length > 0) {
                    highlightText(item, searchTerm);
                } else {
                    removeHighlight(item);
                }
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Update stats
        updateStats(visibleCount, faqItems.length);
        
        // Show/hide no results message
        if (visibleCount === 0 && searchTerm.length > 0) {
            noResults.style.display = 'block';
            faqList.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            faqList.style.display = 'flex';
        }
    }

    // Highlight Text
    function highlightText(item, searchTerm) {
        const questionEl = item.querySelector('.question-text');
        const answerEl = item.querySelector('.answer-content p');
        
        const questionHTML = questionEl.textContent;
        const answerHTML = answerEl.textContent;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        questionEl.innerHTML = questionHTML.replace(regex, '<mark>$1</mark>');
        answerEl.innerHTML = answerHTML.replace(regex, '<mark>$1</mark>');
    }

    // Remove Highlight
    function removeHighlight(item) {
        const questionEl = item.querySelector('.question-text');
        const answerEl = item.querySelector('.answer-content p');
        
        const marks = item.querySelectorAll('mark');
        marks.forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }

    // Update Stats
    function updateStats(visible, total) {
        if (searchInput.value.trim().length > 0) {
            searchStats.textContent = `${visible} نتیجه از ${total} سوال`;
        } else {
            searchStats.textContent = '';
        }
    }

    // ===== Keyboard Navigation =====
    document.addEventListener('keydown', function(e) {
        // Focus search on Ctrl/Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Close on Escape
        if (e.key === 'Escape') {
            faqItems.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            searchInput.blur();
        }
    });

    // ===== Add Mark Styles =====
    const style = document.createElement('style');
    style.textContent = `
        mark {
            background: rgba(244, 180, 0, 0.3);
            color: var(--gold-light);
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);

    // ===== Smooth Scroll to FAQ =====
    const faqSection = document.querySelector('.faq-section');
    if (faqSection) {
        faqSection.style.scrollBehavior = 'smooth';
    }

    console.log('✅ بخش سوالات متداول با موفقیت بارگذاری شد');
});