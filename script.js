const sections = [
  {
    title: "Information",
    page: "information.html",
    image: "./info.png",
  },
  {
    title: "Portfolio",
    page: "portfolio.html",
    image: "./Portfolio.png",
  },
  {
    title: "Contact",
    page: "contact.html",
    image: "./contact.png",
  },
];

const hero = document.getElementById("hero");
const counter = document.getElementById("counter");
const heroImage = document.getElementById("heroImage");
const detailLinkBtn = document.getElementById("detailLinkBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let isAnimating = false;

function renderSection() {
  const current = sections[currentIndex];
  counter.textContent = current.title;
  heroImage.src = current.image;
  heroImage.alt = `${current.title} Tape Box`;
}

function goToDetailPage() {
  window.location.href = sections[currentIndex].page;
}

function slideTo(direction) {
  if (isAnimating) return;

  isAnimating = true;
  const isNext = direction === "next";
  const outClass = isNext ? "slide-out-left" : "slide-out-right";
  const inClass = isNext ? "slide-in-right" : "slide-in-left";

  hero.classList.add(outClass);

  setTimeout(() => {
    currentIndex = isNext
      ? (currentIndex + 1) % sections.length
      : (currentIndex - 1 + sections.length) % sections.length;

    hero.classList.remove(outClass);
    hero.classList.add(inClass);
    renderSection();

    requestAnimationFrame(() => {
      hero.classList.remove(inClass);
      setTimeout(() => {
        isAnimating = false;
      }, 440);
    });
  }, 230);
}

prevBtn.addEventListener("click", () => slideTo("prev"));
nextBtn.addEventListener("click", () => slideTo("next"));
detailLinkBtn.addEventListener("click", goToDetailPage);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") slideTo("prev");
  if (event.key === "ArrowRight") slideTo("next");
  if (event.key === "Enter") goToDetailPage();
});

renderSection();
