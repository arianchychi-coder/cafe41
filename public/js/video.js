const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".article-card").forEach(card => {
  card.addEventListener("click", () => {

    const clone = card.cloneNode(true);
    clone.onclick = null;

    modalBody.innerHTML = "";
    modalBody.appendChild(clone);

    modal.style.display = "flex";

    // 🔥 قفل کردن تعامل پشت مودال
    document.body.classList.add("modal-open");
  });
});

// بستن مودال
function closeModal() {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});