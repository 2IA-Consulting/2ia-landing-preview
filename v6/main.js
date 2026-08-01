(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const THRESHOLD = 24;
  const setVisibility = () => {
    header.classList.toggle("is-visible", window.scrollY > THRESHOLD);
  };

  setVisibility();
  window.addEventListener("scroll", setVisibility, { passive: true });
})();
