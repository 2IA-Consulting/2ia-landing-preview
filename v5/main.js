/* 2iA — proposta v5. Progressive enhancement apenas:
   a página é totalmente legível e navegável sem este arquivo.
   Nenhum conteúdo depende de JS para ficar visível. */
(function () {
  "use strict";

  /* Header: o filete de 1px só aparece quando a página sai do topo. */
  var hdr = document.querySelector(".hdr");
  if (!hdr) return;

  var sync = function () {
    hdr.classList.toggle("is-stuck", window.scrollY > 8);
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
})();
