/* ═══════════════════════════════════════════
   PULSO · js/consent.js · v20260610
   GDPR Cookie Consent — carga AdSense solo
   si el usuario acepta
═══════════════════════════════════════════ */
(function () {
  'use strict';

  var STORAGE_KEY = 'pulso_consent';
  var ADSENSE_ID  = 'ca-pub-9896340574339321';

  /* ── cargar AdSense dinámicamente ────────── */
  function loadAdSense() {
    if (document.querySelector('script[src*="adsbygoogle"]')) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_ID;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }

  /* ── guardar elección ─────────────────────── */
  function saveConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch(e) {}
  }

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch(e) { return null; }
  }

  /* ── ocultar banner ───────────────────────── */
  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    banner.style.transform = 'translateY(110%)';
    banner.style.opacity   = '0';
    setTimeout(function () { banner.remove(); }, 500);
  }

  /* ── aceptar todo ─────────────────────────── */
  function acceptAll() {
    saveConsent('all');
    loadAdSense();
    hideBanner();
  }

  /* ── solo esenciales ──────────────────────── */
  function acceptEssential() {
    saveConsent('essential');
    hideBanner();
  }

  /* ── init ─────────────────────────────────── */
  function init() {
    var consent = getConsent();

    if (consent === 'all') {
      loadAdSense();
      return; /* ya decidió, no mostrar banner */
    }

    if (consent === 'essential') {
      return; /* rechazó, no cargar ads ni banner */
    }

    /* primera visita — mostrar banner */
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;

    banner.hidden = false;
    requestAnimationFrame(function () {
      banner.classList.add('visible');
    });

    var btnAll  = document.getElementById('cookie-accept-all');
    var btnEss  = document.getElementById('cookie-accept-essential');
    var btnInfo = document.getElementById('cookie-more-info');

    if (btnAll)  btnAll.addEventListener('click',  acceptAll);
    if (btnEss)  btnEss.addEventListener('click',  acceptEssential);
    if (btnInfo) btnInfo.addEventListener('click', function () {
      window.location.href = 'privacidad.html';
    });
  }

  document.addEventListener('DOMContentLoaded', init);

})();
