/* 2iA Consulting — proposta v1 · progressive enhancement apenas.
   A página é inteiramente legível e navegável sem este arquivo. */
(function () {
  "use strict";

  // Marca que o JS está ativo. O estado inicial escondido do reveal só
  // existe sob esta classe — sem JS, nada fica invisível.
  document.documentElement.classList.add("js");

  var ready = function (fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  };

  ready(function () {
    // Ano do rodapé
    var year = document.getElementById("year");
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }

    // Masthead encolhe ao rolar
    var masthead = document.getElementById("masthead");
    if (masthead) {
      var onScroll = function () {
        masthead.classList.toggle("is-scrolled", window.scrollY > 24);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Fade-in sutil no scroll
    var items = document.querySelectorAll(".reveal");
    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    Array.prototype.forEach.call(items, function (el) {
      observer.observe(el);
    });
  });
})();
