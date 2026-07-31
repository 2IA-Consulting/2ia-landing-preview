/* Progressive enhancement — a página é totalmente legível sem este arquivo. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ano do rodapé */
  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* header encolhe no scroll */
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* FAQ: um aberto por vez (o <details> já funciona sem JS) */
  var faq = document.querySelectorAll(".card--faq .qa");
  Array.prototype.forEach.call(faq, function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      Array.prototype.forEach.call(faq, function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
