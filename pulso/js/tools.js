/* ═══════════════════════════════════════════
   PULSO · js/tools.js · v20260610
   Filterable tools grid
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
    if (!M || !M.tools) return;

    renderFilters(M.toolCategories);
    renderTools(M.tools);
    initFilters(M.tools);
  });

  function renderFilters(cats) {
    var bar = qs('#tools-filters');
    if (!bar || !cats) return;

    bar.innerHTML = cats.map(function (c) {
      return '<button class="filter-btn' + (c.id === 'all' ? ' active' : '') + '" data-cat="' + esc(c.id) + '">' +
        esc(c.label) + '</button>';
    }).join('');
  }

  function renderTools(tools) {
    var grid = qs('#tools-grid');
    if (!grid || !tools) return;

    grid.innerHTML = tools.map(function (t, i) {
      var href     = t.affiliateUrl || t.url;
      var isAff    = !!t.affiliateUrl;
      var rel      = isAff ? 'nofollow noopener noreferrer sponsored' : 'noopener noreferrer';
      return '<a href="' + esc(href) + '" target="_blank" rel="' + rel + '" ' +
        'class="tool-card reveal' + (isAff ? ' tool-card--aff' : '') + '" data-cat="' + esc(t.cat) + '" ' +
        'style="transition-delay:' + (i * .04) + 's" ' +
        'aria-label="' + esc(t.name) + ' — ' + esc(t.tagline) + '">' +
        '<span class="tool-emoji" aria-hidden="true">' + t.emoji + '</span>' +
        '<div class="tool-body">' +
          '<p class="tool-name">' + esc(t.name) + '</p>' +
          '<p class="tool-tagline">' + esc(t.tagline) + '</p>' +
          '<div class="tool-meta">' +
            '<span class="tool-score">★ ' + t.pulsoscore + '</span>' +
            (t.free ? '<span class="tool-free">Gratis</span>' : '') +
            (isAff ? '<span class="tool-aff" title="Enlace de afiliado — nos llevamos una comisión si te suscribes">♦ Afiliado</span>' : '') +
          '</div>' +
        '</div>' +
      '</a>';
    }).join('');

    /* trigger reveal for newly created elements */
    triggerReveal();
  }

  function initFilters(tools) {
    var bar  = qs('#tools-filters');
    var grid = qs('#tools-grid');
    if (!bar || !grid) return;

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      /* update active button */
      Array.from(bar.querySelectorAll('.filter-btn')).forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      var cat = btn.dataset.cat;
      var cards = Array.from(grid.querySelectorAll('.tool-card'));

      cards.forEach(function (c, i) {
        var show = cat === 'all' || c.dataset.cat === cat;
        c.classList.toggle('hidden', !show);
        /* stagger re-reveal */
        if (show) {
          c.style.transitionDelay = (i * .03) + 's';
          requestAnimationFrame(function () {
            c.classList.add('visible');
          });
        }
      });
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
    }, { threshold: .05 });

    Array.from(document.querySelectorAll('#tools-grid .reveal')).forEach(function (el) {
      io.observe(el);
    });
  }

})();
