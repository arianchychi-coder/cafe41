document.addEventListener('DOMContentLoaded', () => {

    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearBtn');
    const allArticlesBtn = document.getElementById('allArticlesBtn');
    const filterContainer = document.querySelector('.filter-container');

    // ===== Dynamic Search Box Expansion =====
    const BASE_WIDTH = 180;
    const MAX_WIDTH = 400;
    const CHAR_EXPAND_RATE = 8; // pixels per character

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const length = query.length;

        // Show/hide clear button
        if (length > 0) {
            clearBtn.classList.add('visible');
            searchBox.classList.add('expanded');
            filterContainer.classList.add('searching');
        } else {
            clearBtn.classList.remove('visible');
            searchBox.classList.remove('expanded');
            filterContainer.classList.remove('searching');
        }

        // Dynamic width based on text length
        const newWidth = Math.min(BASE_WIDTH + (length * CHAR_EXPAND_RATE), MAX_WIDTH);
        searchBox.style.minWidth = `${newWidth}px`;

        // Debounced search
        clearTimeout(searchInput._timeout);
        searchInput._timeout = setTimeout(() => {
            performSearch(query.trim());
        }, 500);
    });

    // ===== Clear Button =====
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.remove('visible');
        searchBox.classList.remove('expanded');
        searchBox.style.minWidth = `${BASE_WIDTH}px`;
        filterContainer.classList.remove('searching');
        searchInput.focus();
    });

    // ===== All Articles Button =====
    allArticlesBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.remove('visible');
        searchBox.classList.remove('expanded');
        searchBox.style.minWidth = `${BASE_WIDTH}px`;
        filterContainer.classList.remove('searching');

        // Fun animation
        allArticlesBtn.style.transform = 'scale(0.93)';
        setTimeout(() => {
            allArticlesBtn.style.transform = '';
        }, 200);

        showAllArticles();
    });

    // ===== Focus Effects =====
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length > 0) {
            searchBox.classList.add('expanded');
        }
    });

    searchInput.addEventListener('blur', () => {
        if (searchInput.value.length === 0) {
            searchBox.classList.remove('expanded');
            searchBox.style.minWidth = `${BASE_WIDTH}px`;
        }
    });

    // ===== Keyboard Shortcuts =====
    document.addEventListener('keydown', (e) => {
        // Ctrl+K or Cmd+K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        // Escape to clear
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            clearBtn.click();
        }
    });

    // ===== Functions =====
    function performSearch(query) {
        if (!query) return;
        console.log('🔍 Searching:', query);
        // API call or local filter here
    }

    function showAllArticles() {
        console.log('📋 Showing all articles');
        // Reset filters here
    }

    console.log('✨ Creative Filter Bar initialized - کافه معدن');
});




document.addEventListener("DOMContentLoaded",function(){
    const serchInput = document.querySelector('.search-input')
    serchInput.addEventListener("input",function(){
        const query = this.value.toLowerCase()
        const products = document.querySelectorAll('.article-card')
        products.forEach(data=>{
            const name = data.getAttribute("data-name")
            if (name === "" || name.includes(query)) {
                data.style.display = ""
            }
            else{
                data.style.display = "none"
            }
        })
    })
})