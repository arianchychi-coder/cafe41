document.addEventListener("DOMContentLoaded",function(){
    const searchInput = document.querySelector('.search-input')
    searchInput.addEventListener("input",function(){
        const query = this.value.trim().toLowerCase()
        const products = document.querySelectorAll('.article-card')
        products.forEach(data=>{
            const name = data.getAttribute("data-name")
            if (!name === "" || name.includes(query)) {
                data.style.display = ""
            }
            else{
                data.style.display = "none"
            }
        })
    })
})