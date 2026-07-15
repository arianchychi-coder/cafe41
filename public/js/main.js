window.addEventListener("scroll", () => {

    const nav = document.querySelector(".navbar");

    if(window.scrollY > 80){

        nav.style.background = "#102A43";

        nav.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.15)";

    }
    else{

        nav.style.background =
        "rgba(16,42,67,.92)";

        nav.style.boxShadow = "none";
    }

});
// ===== باز و بسته شدن سرچ بار =====
const searchToggle = document.getElementById('searchToggle');
const searchInput = document.querySelector('.search-input');

searchToggle.addEventListener('click', () => {
    searchInput.classList.toggle('active');
    searchToggle.classList.toggle('active');

    if (searchInput.classList.contains('active')) {
        setTimeout(() => searchInput.focus(), 300);
    }
});

// بستن سرچ با کلیک بیرون
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
        searchInput.classList.remove('active');
        searchToggle.classList.remove('active');
    }
});

// بستن سرچ با دکمه Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchInput.classList.remove('active');
        searchToggle.classList.remove('active');
    }
});