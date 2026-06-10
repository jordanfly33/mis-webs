/* ═══════════════════════════════════════════
   PULSO · js/comparator.js · v20260610
   Horizontal scroll model comparator
   Desktop: GSAP ScrollTrigger pin
   Mobile:  CSS scroll-snap
═══════════════════════════════════════════ */
(function () {
  'use strict';

  var BENCH_COLORS = {
    mmlu:      '#B89A5C',
    humaneval: '#6C63FF',
    math:      '#E05577'
  };

  var BENCH_MAX = { mmlu: 100, humaneval: 100, math: 100 };

  function qs(s, c) { return (c || document).querySelector(s); }

  document.addEventListener('DOMContentLoaded', function () {
    var M = window.__PULSO__;
    if (!M || !M.models) return;

    renderCards(M.models);
    initCounter(M.models.length);

    /* wait for GSAP to be ready */
    function tryGsap(attempts) {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initHorizontalScroll();
        initBarAnimations();
      } else if (attempts > 0) {
        setTimeout(function () { tryGsap(attempts - 1); }, 200);
      }
    }
    tryGsap(20);
  });

  /* ── render model cards ─────────────────── */
  function renderCards(models) {
    var track = qs('#comp-track');
    if (!track) return;

    track.innerHTML = models.map(function (m, i) {
      var glow = hexToRgba(m.accentColor, .12);
      var scores = [
        { key: 'mmlu',      label: 'MMLU',       val: m.scores.mmlu },
        { key: 'humaneval', label: 'HumanEval',   val: m.scores.humaneval },
        { key: 'math',      label: 'MATH',        val: m.scores.math }
      ];

      var barsHtml = scores.map(function (s) {
        var pct = ((s.val / BENCH_MAX[s.key]) * 100).toFixed(1);
        return '<div class="mc-score-row">' +
          '<span class="mc-score-label">' + s.label + '</span>' +
          '<div class="mc-score-bar-wrap">' +
            '<div class="mc-score-bar" data-pct="' + pct + '" style="--bar-color:' + BENCH_COLORS[s.key] + '"></div>' +
          '</div>' +
          '<span class="mc-score-val">' + s.val + '</span>' +
        '</div>';
      }).join('');

      var openBadge = m.open
        ? '<span class="mc-badge open">Open Source</span>'
        : '<span class="mc-badge closed">Privado</span>';

      var svgIcon = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="' + m.icon + '" stroke="' + m.accentColor + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
        '</svg>';

      return '<article class="model-card" data-index="' + i + '" style="--card-glow:' + glow + '" role="listitem">' +
        '<div class="mc-head">' +
          '<div class="mc-icon" style="border:1px solid ' + hexToRgba(m.accentColor,.25) + '">' + svgIcon + '</div>' +
          openBadge +
        '</div>' +
        '<div>' +
          '<p class="mc-company">' + esc(m.company) + '</p>' +
          '<h3 class="mc-name" style="color:' + m.accentColor + '">' + esc(m.name) + '</h3>' +
          '<p class="mc-cat">' + esc(m.category) + '</p>' +
        '</div>' +
        '<blockquote class="mc-quote">' + esc(m.quote) + '</blockquote>' +
        '<div class="mc-scores">' + barsHtml + '</div>' +
        '<div class="mc-pulsoscore">' +
          '<span class="mc-score-main" style="color:' + m.accentColor + '">' + m.pulsoscore + '</span>' +
          '<div class="mc-score-meta">' +
            '<span class="mc-score-title">Pulso Score</span>' +
            '<span class="mc-price"><strong>' + m.pricing.input + '</strong> entrada · <strong>' + m.pricing.output + '</strong> salida ' + m.pricing.unit + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="mc-foot">' +
          '<span class="mc-tag">⚡ ' + esc(m.speed) + '</span>' +
          '<span class="mc-tag">📏 ' + esc(m.context) + '</span>' +
          '<a href="' + esc(m.url) + '" target="_blank" rel="noopener noreferrer" class="mc-tag" data-label="visitar" style="color:' + m.accentColor + ';cursor:none">Sitio oficial →</a>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* ── counter update ─────────────────────── */
  function initCounter(total) {
    var curr = qs('#comp-curr');
    var tot  = qs('#comp-tot');
    if (tot) tot.textContent = String(total).padStart(2, '0');

    if (!curr) return;

    /* update counter based on scroll position (mobile) or GSAP progress (desktop) */
    var viewport = qs('#comp-viewport');
    if (!viewport) return;

    viewport.addEventListener('scroll', function () {
      var cards = Array.from(qs('#comp-track').children);
      if (!cards.length) return;
      var cardW = cards[0].offsetWidth + 24; /* gap */
      var idx = Math.round(viewport.scrollLeft / cardW);
      curr.textContent = String(Math.min(idx + 1, total)).padStart(2, '0');
    }, { passive: true });
  }

  /* ── GSAP horizontal scroll (desktop) ───── */
  function initHorizontalScroll() {
    var isMobile = window.matchMedia('(max-width: 959px)').matches;
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    var section = qs('#comparator');
    var track   = qs('#comp-track');
    if (!section || !track) return;

    var getScrollAmount = function () {
      return -(track.scrollWidth - window.innerWidth + 80);
    };

    var tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.2,
        end: function () { return '+=' + Math.abs(getScrollAmount()); },
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          /* update counter from progress */
          var total = window.__PULSO__.models.length;
          var idx = Math.round(self.progress * (total - 1));
          var curr = qs('#comp-curr');
          if (curr) curr.textContent = String(idx + 1).padStart(2, '0');
        }
      }
    });

    window.addEventListener('resize', function () {
      isMobile = window.matchMedia('(max-width: 959px)').matches;
      if (isMobile) { tween.kill(); }
    });
  }

  /* ── animate score bars when visible ────── */
  function initBarAnimations() {
    var bars = Array.from(document.querySelectorAll('.mc-score-bar'));
    if (!bars.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var pct = bar.dataset.pct;
          /* slight delay per card index */
          var card = bar.closest('.model-card');
          var idx  = card ? parseInt(card.dataset.index || 0, 10) : 0;
          setTimeout(function () {
            bar.style.width = pct + '%';
          }, idx * 60);
          io.unobserve(bar);
        }
      });
    }, { threshold: .05 });

    bars.forEach(function (b) { io.observe(b); });
  }

  /* ── utils ──────────────────────────────── */
  function hexToRgba(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

})();
