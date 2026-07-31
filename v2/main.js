/* 2iA — proposta v2 · progressive enhancement apenas */
(function () {
  "use strict";

  /* 1. header encolhe ao rolar */
  var head = document.getElementById("siteHead");
  if (head) {
    var stuck = false;
    var onScroll = function () {
      var next = window.scrollY > 40;
      if (next !== stuck) {
        stuck = next;
        head.classList.toggle("is-stuck", stuck);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 2. reveal discreto — desligado se o usuário pedir menos movimento */
  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduced && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".sec-head, .sec-title, .lede, .note, .datagrid, .frentes, .timeline, .matrix, .steps, .sectors, .ledger, .compare, .faq, .statement, .diag-grid, .close-title",
    );
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  }
})();
