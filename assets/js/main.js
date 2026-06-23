// ===========================
// DIAPORAMA HERO
// ===========================

const heroBgs = document.querySelectorAll(".hero-bg");

if (heroBgs.length > 0) {
    let current = 0;

    // Active la première image immédiatement
    heroBgs[current].classList.add("active");

    setInterval(() => {
        // Retire l'active de l'image courante
        heroBgs[current].classList.remove("active");

        // Passe à la suivante (boucle)
        current = (current + 1) % heroBgs.length;

        // Active la nouvelle image
        heroBgs[current].classList.add("active");

    }, 5000); // 3s affichage + 2s fondu = 5s par image
}


// ===========================
// MENU MOBILE
// ===========================

const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");

if (burger) {
    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
        burger.classList.toggle("open");
    });
}


// ===========================
// HEADER AU SCROLL
// ===========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// ===========================
// GALERIE FILTRABLE
// ===========================

const filterButtons = document.querySelectorAll(".filters button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (
                filter === "all" ||
                item.classList.contains(filter)
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});


// ===========================
// ANIMATION AU SCROLL
// ===========================

const hiddenElements =
    document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});

hiddenElements.forEach(el =>
    observer.observe(el)
);