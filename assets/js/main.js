// ===========================
// DIAPORAMA HERO
// ===========================

const heroBgs = document.querySelectorAll(".hero-bg");

if (heroBgs.length > 0) {
    let current = 0;
    heroBgs[current].classList.add("active");
    setInterval(() => {
        heroBgs[current].classList.remove("active");
        current = (current + 1) % heroBgs.length;
        heroBgs[current].classList.add("active");
    }, 5000);
}


// ===========================
// MENU MOBILE
// ===========================

const burger = document.querySelector(".burger");
const nav    = document.querySelector("nav");

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
const galleryItems  = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        galleryItems.forEach(item => {
            item.style.display =
                (filter === "all" || item.classList.contains(filter))
                ? "block" : "none";
        });
    });
});


// ===========================
// ANIMATION AU SCROLL
// ===========================

const hiddenElements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
});
hiddenElements.forEach(el => observer.observe(el));


// ===========================
// BANDEAU DÉFILANT FOURNISSEURS
// ===========================

(function initMarquee() {

    const marquee = document.querySelector(".logos-marquee");
    const track   = document.querySelector(".logos-track");

    if (!marquee || !track) return;

    const SPEED = 40; // px/seconde (ajuste si tu veux plus vite ou plus lent)

    // 1. Récupère uniquement les cartes originales
    const originals = Array.from(track.querySelectorAll(".logo-card:not([aria-hidden])"));
    track.innerHTML = "";
    originals.forEach(c => track.appendChild(c));

    // 2. Ajoute 2 copies supplémentaires → 3 sets au total (comme vg-deco)
    //    Avec 3 sets, le translateX en pourcentage se reset à -33.333...%
    //    ce qui correspond exactement à un set, sans aucun calcul de pixels
    [1, 2].forEach(() => {
        originals.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
        });
    });

    // 3. translateX en % : -33.333% = exactement 1 set sur 3
    //    On anime de 0% à -33.333%, puis on repart à 0% instantanément
    const RESET_PERCENT = 100 / 3; // 33.333...%

    let percent = 0;
    let paused  = false;
    let lastTime = null;

    marquee.addEventListener("mouseenter", () => { paused = true; });
    marquee.addEventListener("mouseleave", () => { paused = false; lastTime = null; });

    function step(ts) {
        if (!paused) {
            if (lastTime !== null) {
                // Convertit la vitesse px/s en %/s en fonction de la largeur réelle du track
                const trackWidth = track.scrollWidth;
                const pxPerSecond = SPEED;
                const percentPerSecond = (pxPerSecond / trackWidth) * 100;

                percent += percentPerSecond * ((ts - lastTime) / 1000);

                // Reset à 0 quand on atteint exactement 1/3 (= 1 set sur 3)
                if (percent >= RESET_PERCENT) percent -= RESET_PERCENT;
            }
            lastTime = ts;
            track.style.transform = `translateX(-${percent}%)`;
        }
        requestAnimationFrame(step);
    }

    // Lance après window load — le track doit être rendu pour que scrollWidth soit juste
    if (document.readyState === "complete") {
        requestAnimationFrame(step);
    } else {
        window.addEventListener("load", () => requestAnimationFrame(step));
    }

})();
