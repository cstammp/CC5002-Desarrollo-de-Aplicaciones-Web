// --- Variables ---
const imgDispositivos = document.querySelectorAll(".img-dispositivo");

// --- Event Listener ---
imgDispositivos.forEach(img => {
    img.addEventListener("click", () => {
        img.width = 1280;
        img.height = 1024;
    });
});