const portfolioItems = document.querySelectorAll(".stack-item");
const portfolioViewer = document.getElementById("portfolioViewer");
const portfolioViewerBackdrop = document.getElementById("portfolioViewerBackdrop");
const portfolioViewerClose = document.getElementById("portfolioViewerClose");
const portfolioViewerFrame = document.getElementById("portfolioViewerFrame");
const portfolioViewerTitle = document.getElementById("portfolioViewerTitle");

let isPortfolioViewerOpen = false;

function getEmbedUrl(videoUrl) {
  try {
    const parsedUrl = new URL(videoUrl);
    const videoId =
      parsedUrl.hostname.includes("youtu.be")
        ? parsedUrl.pathname.replace("/", "")
        : parsedUrl.searchParams.get("v");

    if (!videoId) return "";

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  } catch {
    return "";
  }
}

function openPortfolioViewer(item) {
  const image = item.querySelector("img");
  const embedUrl = getEmbedUrl(item.href);

  if (!image || !embedUrl) return;

  portfolioViewerTitle.textContent = image.alt;
  portfolioViewerFrame.src = embedUrl;
  portfolioViewer.classList.add("is-open");
  portfolioViewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  isPortfolioViewerOpen = true;
}

function closePortfolioViewer() {
  portfolioViewer.classList.remove("is-open");
  portfolioViewer.setAttribute("aria-hidden", "true");
  portfolioViewerFrame.src = "";
  document.body.style.overflow = "";
  isPortfolioViewerOpen = false;
}

portfolioItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    openPortfolioViewer(item);
  });
});

portfolioViewerClose.addEventListener("click", closePortfolioViewer);
portfolioViewerBackdrop.addEventListener("click", closePortfolioViewer);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isPortfolioViewerOpen) {
    closePortfolioViewer();
  }
});
