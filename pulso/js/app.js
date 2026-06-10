/* ═══════════════════════════════════════════
   PULSO · js/app.js · v20260610
   Main IIFE — cursor, nav, splash, hero canvas,
   ticker, news, analysis, newsletter
═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ─────────────────────────────── */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function fmtDate(iso) {
    var d = new Date(iso);
    var months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  /* ── wait for DOM + manifest ─────────────── */
  document.addEventListener('DOMContentLoaded', function () {

    /* remove no-js class immediately */
    document.documentElement.classList.remove('no-js');

    var M = window.__PULSO__;
    if (!M) { console.warn('[Pulso] manifest missing'); return; }

    initSplash();
    initCursor();
    initNav();
    initHeroCanvas();
    initTicker(M.ticker);
    initNews(M.articles);
    initAnalysis(M.articles);
    initNewsletter();
    initReveal();
  });

  /* ══════════════════════════════════════════
     SPLASH
  ══════════════════════════════════════════ */
  function initSplash() {
    var splash = qs('#splash');
    if (!splash) return;

    /* hide after 4.5 s */
    setTimeout(function () {
      splash.classList.add('hidden');
      splash.addEventListener('transitionend', function () {
        splash.remove();
      }, { once: true });
    }, 4500);
  }

  /* ══════════════════════════════════════════
     CURSOR
  ══════════════════════════════════════════ */
  function initCursor() {
    var cursor = qs('#cursor');
    if (!cursor || window.matchMedia('(hover: none)').matches) return;

    var ring  = qs('.cur-ring',  cursor);
    var label = qs('.cur-label', cursor);
    var cx = -100, cy = -100; /* start off-screen */
    var rx = -100, ry = -100; /* ring lags behind */
    var raf;

    function loop() {
      rx += (cx - rx) * .14;
      ry += (cy - ry) * .14;
      cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      ring.style.transform   = 'translate(calc(-50% + ' + (rx - cx) + 'px), calc(-50% + ' + (ry - cy) + 'px))';
      raf = requestAnimationFrame(loop);
    }
    loop();

    document.addEventListener('mousemove', function (e) {
      cx = e.clientX;
      cy = e.clientY;
    });

    document.addEventListener('mouseenter', function () { cursor.style.opacity = '1'; });
    document.addEventListener('mouseleave', function () { cursor.style.opacity = '0'; });

    /* interactive elements */
    document.addEventListener('mouseover', function (e) {
      var el = e.target.closest('a, button, [data-label], input, textarea');
      if (el) {
        document.body.classList.add('cursor-hover');
        var lbl = el.dataset.label || el.getAttribute('aria-label') || '';
        label.textContent = lbl;
      }
    });
    document.addEventListener('mouseout', function (e) {
      var el = e.target.closest('a, button, [data-label], input, textarea');
      if (el) {
        document.body.classList.remove('cursor-hover');
        label.textContent = '';
      }
    });
  }

  /* ══════════════════════════════════════════
     NAVIGATION
  ══════════════════════════════════════════ */
  function initNav() {
    var nav    = qs('#nav');
    var burger = qs('#burger');
    var menu   = qs('#mobile-menu');
    if (!nav) return;

    /* scrolled state */
    var lastY = 0;
    function onScroll() {
      var y = window.scrollY;
      if (y > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* active link highlight */
    var sections = qsa('section[id], footer[id]');
    var links = qsa('.nav-links a');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: .05, rootMargin: '-' + (64) + 'px 0px -60% 0px' });

    sections.forEach(function (s) { io.observe(s); });

    /* burger */
    if (!burger || !menu) return;

    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('menu-open', open);
    });

    /* close on link click */
    qsa('#mobile-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
      });
    });
  }

  /* ══════════════════════════════════════════
     HERO NEURAL CANVAS
  ══════════════════════════════════════════ */
  function initHeroCanvas() {
    var canvas = qs('#neural-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var W, H, particles, raf;
    var mouse = { x: -9999, y: -9999 };
    var NUM = 70;
    var LINK_DIST = 130;
    var MOUSE_DIST = 180;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function mkParticle() {
      return {
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - .5) * .28,
        vy: (Math.random() - .5) * .28,
        r:  Math.random() * 1.5 + .8
      };
    }

    function init() {
      resize();
      particles = [];
      for (var i = 0; i < NUM; i++) particles.push(mkParticle());
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      /* connections */
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(184,154,92,' + ((1 - d / LINK_DIST) * .35) + ')';
            ctx.lineWidth = .8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        /* mouse attraction lines */
        var mx = particles[i].x - mouse.x;
        var my = particles[i].y - mouse.y;
        var md = Math.sqrt(mx * mx + my * my);
        if (md < MOUSE_DIST) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(184,154,92,' + ((1 - md / MOUSE_DIST) * .5) + ')';
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      /* dots */
      particles.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(184,154,92,.7)';
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10)  p.x = W + 10;
        if (p.x > W+10) p.x = -10;
        if (p.y < -10)  p.y = H + 10;
        if (p.y > H+10) p.y = -10;
      });

      raf = requestAnimationFrame(draw);
    }

    init();
    draw();

    window.addEventListener('resize', function () {
      cancelAnimationFrame(raf);
      init();
      draw();
    });

    var hero = qs('#hero');
    if (hero) {
      hero.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });
      hero.addEventListener('mouseleave', function () {
        mouse.x = -9999; mouse.y = -9999;
      });
    }

    /* pause when not visible (perf) */
    var visIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) {
          cancelAnimationFrame(raf);
        } else {
          raf = requestAnimationFrame(draw);
        }
      });
    }, { threshold: 0 });
    visIo.observe(canvas);
  }

  /* ══════════════════════════════════════════
     TICKER
  ══════════════════════════════════════════ */
  function initTicker(items) {
    var track = qs('#ticker-track');
    if (!track || !items) return;

    var repeated = items.concat(items); /* duplicate for seamless loop */
    var html = repeated.map(function (t) {
      return '<span class="ticker-item">' + esc(t) + '</span>';
    }).join('');
    track.innerHTML = html;
  }

  /* ══════════════════════════════════════════
     NEWS
  ══════════════════════════════════════════ */
  function initNews(articles) {
    var grid = qs('#news-grid');
    if (!grid || !articles) return;

    grid.innerHTML = articles.map(function (a, i) {
      var feat = a.featured ? ' featured' : '';
      var href = a.url ? a.url : '#';
      return '<a href="' + href + '" class="news-card reveal' + feat + '" style="transition-delay:' + (i * .1) + 's;text-decoration:none">' +
        (a.featured ? '<div class="news-accent-bar" style="background:' + a.accent + '"></div>' : '') +
        '<div class="nc-body">' +
          '<div class="news-meta">' +
            '<span class="news-tag">' + esc(a.tag) + '</span>' +
            '<time class="news-date" datetime="' + a.date + '">' + fmtDate(a.date) + '</time>' +
          '</div>' +
          '<h3 class="news-title">' + esc(a.title) + '</h3>' +
          (a.excerpt ? '<p class="news-excerpt">' + esc(a.excerpt) + '</p>' : '') +
          '<span class="news-read">' + a.readTime + ' min de lectura →</span>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  /* ══════════════════════════════════════════
     ANALYSIS ARTICLES
  ══════════════════════════════════════════ */
  function initAnalysis(articles) {
    var grid = qs('#analysis-grid');
    if (!grid || !articles) return;

    grid.innerHTML = articles.map(function (a, i) {
      var feat = a.featured ? ' featured' : '';
      var href = a.url ? a.url : '#';
      return '<a href="' + href + '" class="article-card reveal' + feat + '" style="transition-delay:' + (i * .1) + 's;text-decoration:none">' +
        '<div class="article-meta">' +
          '<span class="article-tag">' + esc(a.tag) + '</span>' +
          '<span class="article-time">' + a.readTime + ' min</span>' +
        '</div>' +
        '<h3 class="article-title">' + esc(a.title) + '</h3>' +
        '<p class="article-excerpt">' + esc(a.excerpt) + '</p>' +
        '<span class="article-cta">Leer análisis completo →</span>' +
      '</a>';
    }).join('');
  }

  /* ══════════════════════════════════════════
     NEWSLETTER
  ══════════════════════════════════════════ */
  function initNewsletter() {
    var form    = qs('#nl-form');
    var input   = qs('#nl-email');
    var errEl   = qs('#nl-error');
    var success = qs('#nl-success');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errEl.textContent = '';

      var email = input.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errEl.textContent = 'Introduce un email válido.';
        input.focus();
        return;
      }

      /* simulate submission */
      var btn = qs('.nl-submit', form);
      btn.disabled = true;
      btn.style.opacity = '.5';

      setTimeout(function () {
        form.hidden = true;
        success.hidden = false;
      }, 800);
    });
  }

  /* ══════════════════════════════════════════
     REVEAL (IntersectionObserver)
  ══════════════════════════════════════════ */
  function initReveal() {
    var els = qsa('.reveal');
    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .05 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ── XSS-safe text escape ────────────────── */
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

})();
