/*
 * mobile-init.js — mobile UI enhancements, shared by the web app (GitHub Pages)
 * and the Capacitor Android build. ONE source of truth.
 *
 * Desktop index.html references this file with a plain <script src>; sync-web.js
 * copies it into mobile/www/ for the phone build. It is self-gating:
 *
 *   - Under Capacitor (the phone app) it ALWAYS activates.
 *   - In a browser it activates only when the viewport is narrow
 *     (<= MOBILE_BP px), so the desktop three-column layout is untouched.
 *
 * When active it adds, for the phone form factor:
 *   1. Safe-area / notch handling (viewport-fit=cover + env() insets).
 *   2. Off-canvas drawers: the Catalog (#catalog) slides in from the LEFT, the
 *      Army summary + Validation (.col.validation) slides in from the RIGHT,
 *      leaving the Roster as the always-visible center column.
 *   3. A hamburger (☰) menu holding the army actions (Save / Library / Save to
 *      file / Open file / Export / Clear).
 *   4. Android hardware Back: closes the top modal, then any open drawer/menu,
 *      and only exits the app when nothing is open.
 *
 * Implementation note: #catalog, .col.validation and the .actions toolbar are
 * MOVED (not cloned) into new shells. Their ids/handlers are preserved, so the
 * app's render() keeps populating them exactly as before. Because the nodes are
 * moved, the shell is built once; if a browser window is resized from mobile
 * back to desktop after the shell was built, the page reloads to restore the
 * clean desktop layout (a real phone never crosses that boundary).
 */
(function () {
  // ---- 0. Activation gate (web = narrow only, Capacitor = always) ---------
  var MOBILE_BP = 820; // px; below this a browser gets the mobile drawer UI
  var isCap = !!(window.Capacitor);
  var mq = window.matchMedia('(max-width:' + MOBILE_BP + 'px)');
  function mobileActive() { return isCap || mq.matches; }

  function onMqChange(fn) {
    if (mq.addEventListener) mq.addEventListener('change', fn);
    else if (mq.addListener) mq.addListener(fn); // older Safari
  }

  // ---- 1. Safe-area / notch handling + mobile CSS ------------------------
  function injectStyles() {
    var vp = document.querySelector('meta[name=viewport]');
    if (vp && !/viewport-fit/.test(vp.content)) vp.content += ', viewport-fit=cover';

    var css = document.createElement('style');
    css.id = 'm-styles';
    css.textContent = [
      /* two-row header (title removed on mobile) */
      'header{flex-direction:column !important;align-items:stretch !important;',
      '  flex-wrap:nowrap !important;gap:8px !important;',
      '  padding-top:calc(8px + env(safe-area-inset-top)) !important;',
      '  padding-left:calc(8px + env(safe-area-inset-left)) !important;',
      '  padding-right:calc(8px + env(safe-area-inset-right)) !important;',
      '  padding-bottom:8px !important;}',
      'header h1{display:none !important;}',                 /* app title not shown on mobile */
      /* a header row: pinned buttons + one stretchy control (chooser / points setter) */
      '.m-hrow{display:flex;align-items:center;gap:8px;width:100%;}',
      '.m-hrow .limit{flex:1 1 auto;min-width:0;margin:0;display:flex;align-items:center;}',
      '.m-hrow .limit label{display:none;}',
      'header #armySel{flex:1 1 auto;min-width:0;width:100%;max-width:none;}',
      'header #limit{flex:1 1 auto;min-width:0;width:100% !important;}',

      /* used / limit points counter — its own row directly above the category bars */
      '.m-ptsline{display:flex;align-items:baseline;justify-content:center;gap:8px;',
      '  padding:8px 12px 2px;}',
      '.m-ptsline .total{display:flex;align-items:baseline;gap:8px;margin:0;text-align:center;}',
      '.m-ptsline .total .big{font-size:20px !important;}',
      '.m-ptsline .total .note{font-size:12px !important;color:var(--muted,#897b6c);}',

      /* mobile icon buttons in the bar — always pinned, never shrink away */
      '.m-iconbtn{appearance:none;border:1px solid var(--line,#332a21);background:#0f0b08;color:var(--ink,#d8cebf);',
      '  border-radius:8px;font-size:18px;line-height:1;padding:9px 13px;flex:0 0 auto;cursor:pointer;}',
      '.m-iconbtn:active{border-color:var(--fire2,#bd8b50);}',

      /* single-column body: roster fills the width */
      '.wrap{display:block !important;padding:10px !important;',
      '  padding-bottom:calc(10px + env(safe-area-inset-bottom)) !important;}',
      '.col.roster{width:100% !important;max-width:100% !important;padding:0 !important;}',

      /* drawers */
      '.m-drawer{position:fixed;top:0;bottom:0;width:min(88vw,380px);z-index:90;display:flex;flex-direction:column;',
      '  background:var(--panel,#1a1511);box-shadow:0 0 28px rgba(0,0,0,.65);transition:transform .28s ease;}',
      '.m-drawer.left{left:0;transform:translateX(-105%);border-right:2px solid var(--fire,#a35f2c);}',
      '.m-drawer.right{right:0;transform:translateX(105%);border-left:2px solid var(--fire,#a35f2c);}',
      '.m-drawer.m-open{transform:translateX(0);}',
      '.m-drawer-head{display:flex;align-items:center;justify-content:space-between;gap:10px;flex:0 0 auto;',
      '  padding:calc(10px + env(safe-area-inset-top)) 14px 10px;border-bottom:1px solid var(--line,#332a21);',
      '  background:linear-gradient(180deg,#2c1a10,#1a120c);}',
      '.m-drawer-head h3{margin:0;font-size:14px;letter-spacing:.5px;color:var(--fire2,#bd8b50);}',
      '.m-drawer-body{flex:1 1 auto;overflow-y:auto;-webkit-overflow-scrolling:touch;',
      '  padding:12px 14px;padding-bottom:calc(16px + env(safe-area-inset-bottom));}',
      '.m-drawer-body .col{width:auto !important;max-width:none !important;flex:none !important;padding:0 !important;}',
      '.m-x{appearance:none;border:none;background:transparent;color:var(--ink,#d8cebf);font-size:20px;line-height:1;cursor:pointer;padding:4px 6px;}',

      /* hamburger sheet (drops from the top-left) */
      '.m-menu{position:fixed;left:8px;right:8px;top:0;z-index:95;background:var(--panel2,#221b16);',
      '  border:1px solid var(--line,#332a21);border-radius:0 0 12px 12px;box-shadow:0 12px 28px rgba(0,0,0,.6);',
      '  transform:translateY(-115%);transition:transform .26s ease;',
      '  padding:calc(8px + env(safe-area-inset-top)) 12px 12px;display:flex;flex-direction:column;gap:8px;}',
      '.m-menu.m-open{transform:translateY(0);}',
      '.m-menu .actions{display:flex !important;flex-direction:column;gap:8px;margin:0 !important;}',
      '.m-menu .actions .btn{width:100%;text-align:left;font-size:15px;padding:11px 12px;}',
      '.m-menu-title{font-size:12px;letter-spacing:1px;color:var(--muted,#897b6c);text-transform:uppercase;margin:2px 2px 2px;}',

      /* scrim */
      '#m-scrim{position:fixed;inset:0;background:rgba(0,0,0,.5);opacity:0;pointer-events:none;',
      '  transition:opacity .28s;z-index:84;}',
      '#m-scrim.on{opacity:1;pointer-events:auto;}'
    ].join('');
    document.head.appendChild(css);
  }

  // ---- helpers ------------------------------------------------------------
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  // ---- 2/3. Build the drawer + menu shell --------------------------------
  function buildShell() {
    var header = document.querySelector('header');
    var catalog = document.getElementById('catalog');           // left drawer content
    var validation = document.querySelector('.col.validation');  // right drawer content
    var actions = document.querySelector('.col.roster .actions');// move into menu
    if (!header || !catalog || !validation) return; // unexpected DOM; bail gracefully

    var scrim = el('div'); scrim.id = 'm-scrim';
    document.body.appendChild(scrim);

    // LEFT drawer (Catalog)
    var left = el('div', 'm-drawer left');
    var lhead = el('div', 'm-drawer-head', '<h3>Units</h3>');
    var lx = el('button', 'm-x', '✕'); lhead.appendChild(lx);
    var lbody = el('div', 'm-drawer-body');
    left.appendChild(lhead); left.appendChild(lbody); lbody.appendChild(catalog);

    // RIGHT drawer (Army summary + Validation)
    var right = el('div', 'm-drawer right');
    var rhead = el('div', 'm-drawer-head', '<h3>Army Summary</h3>');
    var rx = el('button', 'm-x', '✕'); rhead.appendChild(rx);
    var rbody = el('div', 'm-drawer-body');
    right.appendChild(rhead); right.appendChild(rbody); rbody.appendChild(validation);

    // Hamburger MENU (army actions)
    var menu = el('div', 'm-menu');
    menu.appendChild(el('div', 'm-menu-title', 'Army'));
    if (actions) menu.appendChild(actions); else menu.appendChild(el('div', '', '<em>No actions found.</em>'));

    document.body.appendChild(left);
    document.body.appendChild(right);
    document.body.appendChild(menu);

    // ---- open/close state machine ----
    function closeAll() {
      left.classList.remove('m-open');
      right.classList.remove('m-open');
      menu.classList.remove('m-open');
      scrim.classList.remove('on');
    }
    function open(node) {
      var wasOpen = node.classList.contains('m-open');
      closeAll();
      if (!wasOpen) { node.classList.add('m-open'); scrim.classList.add('on'); }
    }
    window.__mobileUI = {
      anyOpen: function () { return left.classList.contains('m-open') || right.classList.contains('m-open') || menu.classList.contains('m-open'); },
      closeAll: closeAll
    };

    scrim.addEventListener('click', closeAll);
    lx.addEventListener('click', closeAll);
    rx.addEventListener('click', closeAll);

    // ---- toolbar buttons (icon-only) ----
    var btnMenu = el('button', 'm-iconbtn'); btnMenu.innerHTML = '☰';
    btnMenu.setAttribute('aria-label', 'Menu');
    btnMenu.addEventListener('click', function () { open(menu); });

    var btnLeft = el('button', 'm-iconbtn'); btnLeft.innerHTML = '＋';
    btnLeft.setAttribute('aria-label', 'Add units');
    btnLeft.addEventListener('click', function () { open(left); });

    var btnRight = el('button', 'm-iconbtn'); btnRight.innerHTML = 'Σ';
    btnRight.setAttribute('aria-label', 'Army summary');
    btnRight.addEventListener('click', function () { open(right); });

    // ---- two-row header ----
    // Row 1: [☰] [＋ Units] [army chooser]   Row 2: [Σ Summary] [points setter]
    var armySel  = document.getElementById('armySel');
    var limitInp = document.getElementById('limit');
    var armyBox  = armySel  && armySel.closest('.limit');   // Army chooser wrapper
    var ptsBox   = limitInp && limitInp.closest('.limit');  // Points-limit wrapper
    var total    = header.querySelector('.total');

    var row1 = el('div', 'm-hrow');
    var row2 = el('div', 'm-hrow');
    row1.appendChild(btnMenu);
    row1.appendChild(btnLeft);
    if (armyBox) row1.appendChild(armyBox);
    row2.appendChild(btnRight);
    if (ptsBox) row2.appendChild(ptsBox);
    header.appendChild(row1);
    header.appendChild(row2);

    // Move the used/limit points counter out of the header into its own row,
    // directly above the category-distribution bars. render() still updates
    // #totalPts / #totalNote by id, so the node just needs to live somewhere.
    var bars = document.getElementById('bars');
    if (total && bars && bars.parentNode) {
      var ptsLine = el('div', 'm-ptsline');
      ptsLine.appendChild(total);
      bars.parentNode.insertBefore(ptsLine, bars);
    }

    // Close the menu after an action is tapped (the action still runs).
    menu.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.btn')) setTimeout(closeAll, 50);
    });

    // Tapping a unit row in the Army Summary (or a validation message about a
    // unit) closes the drawer and focuses that
    // entry in the roster. The row's own inline onclick=scrollToEntry(uid) fires
    // first (bubbling), scrolling + highlighting the entry; we then close the
    // drawer so the always-visible roster column is revealed.
    right.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.summary .srow, .vmsg.link')) closeAll();
    });
  }

  // ---- 4. Hardware Back button -------------------------------------------
  function app() {
    return (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) || null;
  }
  function isOpen(id) {
    var e = document.getElementById(id);
    return !!(e && e.classList && e.classList.contains('open'));
  }
  function wireBack() {
    var App = app();
    if (!App || !App.addListener) return; // not under Capacitor (e.g. plain browser)
    App.addListener('backButton', function () {
      if (isOpen('modal2Bg')) { if (typeof closeModal2 === 'function') closeModal2(); return; }
      if (isOpen('modalBg'))  { if (typeof closeModal  === 'function') closeModal();  return; }
      if (window.__mobileUI && window.__mobileUI.anyOpen()) { window.__mobileUI.closeAll(); return; }
      App.exitApp();
    });
  }

  // ---- activation ---------------------------------------------------------
  var built = false;
  function activate() {
    if (built) return;
    built = true;
    injectStyles();
    buildShell();
    wireBack();
  }

  function init() {
    if (mobileActive()) activate();
    // React to a browser crossing the breakpoint (devtools / desktop resize;
    // a real phone never does). Enter mobile => build the shell in place; leave
    // mobile after building => reload to restore the clean desktop layout.
    onMqChange(function (e) {
      if (e.matches) activate();
      else if (built && !isCap) location.reload();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
