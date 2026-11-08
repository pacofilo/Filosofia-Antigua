(function () {
  var visor = document.getElementById('visor');
  var visorImg = document.getElementById('visor-img');
  var notaModal = document.getElementById('nota-modal');
  var notaCuerpo = document.getElementById('nota-cuerpo');
  function abrirImagen(src, alt) { visorImg.src = src; visorImg.alt = alt || ''; visor.classList.add('active'); }
  function cerrar(m) { m.classList.remove('active'); }
  document.addEventListener('click', function (e) {
    var img = e.target.closest('img.zoomable');
    if (img) { abrirImagen(img.getAttribute('data-full') || img.src, img.alt); return; }
    var btn = e.target.closest('.nota-btn');
    if (btn) {
      var t = document.getElementById(btn.getAttribute('data-nota'));
      if (t) { notaCuerpo.innerHTML = t.innerHTML; notaModal.classList.add('active'); notaModal.querySelector('.modal-content').scrollTop = 0; }
      return;
    }
    if (e.target.closest('#visor')) { cerrar(visor); return; }
    if (e.target === notaModal || e.target.closest('#nota-modal .modal-close')) cerrar(notaModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (visor.classList.contains('active')) cerrar(visor); else cerrar(notaModal); }
  });
  // Imprimir / guardar como PDF desde el navegador
  function cargarTodo() { document.querySelectorAll('details').forEach(function (d) { d.open = true; }); document.querySelectorAll('img[loading=lazy]').forEach(function (i) { i.loading = 'eager'; }); }
  window.addEventListener('beforeprint', cargarTodo);
  var bi = document.getElementById('btn-imprimir');
  if (bi) bi.addEventListener('click', function () { cargarTodo(); setTimeout(function () { window.print(); }, 400); });
})();
