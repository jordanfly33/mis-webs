/* ═══════════════════════════════════════════
   PULSO · js/glossary.js · v20260610
   Accordion glossary with live search
═══════════════════════════════════════════ */
(function () {
  'use strict';

  function qs(s, c) { return (c || document).querySelector(s); }
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var M = window.__PULSO__;
    if (!M || !M.glossary) return;

    renderGlossary(M.glossary);
    initAccordion();
    initSearch(M.glossary);
  });

  function renderGlossary(terms) {
    var list = qs('#glossary-list');
    if (!list) return;

    list.innerHTML = terms.map(function (t) {
      return '<div class="glossary-item reveal" role="listitem" data-term="' + esc(t.term.toLowerCase()) + '">' +
        '<button class="glossary-trigger" ' +
          'aria-expanded="false" ' +
          'aria-controls="def-' + esc(t.term.replace(/\s+/g,'-').toLowerCase()) + '">' +
          '<span class="glossary-term">' + esc(t.term) + '</span>' +
          '<svg class="glossary-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
            '<path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
          '</svg>' +
        '</button>' +
        '<div class="glossary-body" ' +
          'id="def-' + esc(t.term.replace(/\s+/g,'-').toLowerCase()) + '" ' +
          'role="region">' +
          '<p class="glossary-def">' + esc(t.def) + '</p>' +
        '</div>' +
      '</div>';
    }).join('');

    triggerReveal();
  }

  function initAccordion() {
    var list = qs('#glossary-list');
    if (!list) return;

    list.addEventListener('click', function (e) {
      var trigger = e.target.closest('.glossary-trigger');
      if (!trigger) return;

      var item = trigger.closest('.glossary-item');
      var isOpen = item.classList.contains('open');

      /* close all others */
      Array.from(list.querySelectorAll('.glossary-item.open')).forEach(function (el) {
        if (el !== item) {
          el.classList.remove('open');
          el.querySelector('.glossary-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  function initSearch(terms) {
    var input    = qs('#glossary-search');
    var list     = qs('#glossary-list');
    var emptyEl  = qs('#glossary-empty');
    var queryEl  = qs('#glossary-query');
    if (!input || !list) return;

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var items = Array.from(list.querySelectorAll('.glossary-item'));
      var visible = 0;

      items.forEach(function (item) {
        var termText = item.dataset.term || '';
        var defText  = item.querySelector('.glossary-def')
          ? item.querySelector('.glossary-def').textContent.toLowerCase()
          : '';
        var match = !q || termText.includes(q) || defText.includes(q);
        item.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      if (emptyEl) {
        emptyEl.hidden = visible > 0;
        if (queryEl) queryEl.textContent = q;
      }
    });
  }

  function triggerReveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .04 });

    Array.from(document.querySelectorAll('#glossary-list .reveal')).forEach(function (el) {
      io.observe(el);
    });
  }

})();
