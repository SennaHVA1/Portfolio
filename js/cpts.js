/* ══════════════════════════════════════════════════════════════
   CPTS KENNISBANK — logica
   gate · variabelen · render · zoeken · kopiëren
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* SHA-256 van de passphrase. Wijzig via het commando onderaan cpts.html.
     Let op: dit is 'obscurity', geen echte beveiliging — zie notitie. */
  const GATE_HASH = 'fd20259ccdab38c9c5057af4aee3365b9b0e21c8889bdd178dfac65e10649cd8';
  const SESSION_KEY = 'cpts_kb_unlocked';
  const VARS_KEY = 'cpts_kb_vars';

  /* ─────────────── helpers ─────────────── */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // normaliseer voor zoeken: koppeltekens/underscores/slashes -> spatie, ruis weg.
  // zo vindt "pass the hash" ook "pass-the-hash" en omgekeerd.
  const norm = (s) => s.toLowerCase().replace(/[-_/]+/g, ' ').replace(/\s+/g, ' ').trim();

  async function sha256(str) {
    if (!(window.crypto && crypto.subtle)) return null; // file:// fallback
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /* ─────────────── variabelen ─────────────── */
  let VARS = {};
  function loadVars() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(VARS_KEY)) || {}; } catch (e) {}
    KB_VARS.forEach(v => { VARS[v.key] = (saved[v.key] != null && saved[v.key] !== '') ? saved[v.key] : v.def; });
  }
  function saveVars() { try { localStorage.setItem(VARS_KEY, JSON.stringify(VARS)); } catch (e) {} }

  function substPlain(str) {
    return str.replace(/\{\{(\w+)\}\}/g, (_, k) => (VARS[k] != null ? VARS[k] : '{{' + k + '}}'));
  }

  /* ─────────────── code highlighting ───────────────
     Werkt op reeds ge-escapete tekst. Vervangt {{VAR}} als laatste. */
  function highlight(raw) {
    let out = esc(raw);
    // comments (# ...)  -> tot einde regel
    out = out.replace(/(^|\s)(#[^\n]*)/g, (m, sp, c) => sp + '<span class="tok-cmt">' + c + '</span>');
    // flags  -x / --xx
    out = out.replace(/(^|\s)(--?[A-Za-z][\w-]*)/g, (m, sp, f) => sp + '<span class="tok-flag">' + f + '</span>');
    // eerste woord van elke regel = commando
    out = out.replace(/(^|\n)(\s*)([\w./-]+)/g, (m, nl, ws, w) =>
      nl + ws + (w.startsWith('#') ? w : '<span class="tok-cmd">' + w + '</span>'));
    // variabelen laatst (na subst)
    out = out.replace(/\{\{(\w+)\}\}/g, (_, k) =>
      '<span class="tok-var">' + esc(VARS[k] != null ? VARS[k] : '{{' + k + '}}') + '</span>');
    return out;
  }

  /* ─────────────── render ─────────────── */
  const ICO = (d) => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  const copyIco = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const noteIco = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';

  function renderItem(it) {
    let tags = (it.tags || []).map(t => '<span class="kb-tag">' + esc(t) + '</span>').join('');
    let html = '<div class="kb-card" data-search="' + esc(norm(it.h + ' ' + (it.d || '') + ' ' + (it.code || '') + ' ' + (it.tags || []).join(' '))) + '">';
    html += '<div class="kb-card-h"><h4>' + esc(it.h) + '</h4><div class="kb-card-tags">' + tags + '</div></div>';
    if (it.d) html += '<div class="kb-card-d">' + it.d + '</div>';
    if (it.code) {
      html += '<div class="kb-code"><button class="kb-copy" title="Kopieer">' + copyIco + '</button>' +
        '<pre data-raw="' + esc(substPlain(it.code)) + '"><code>' + highlight(it.code) + '</code></pre></div>';
    }
    if (it.note) {
      html += '<div class="kb-note ' + (it.note.type === 'warn' ? 'warn' : '') + '">' + noteIco + '<div>' + it.note.text + '</div></div>';
    }
    html += '</div>';
    return html;
  }

  function renderModule(m) {
    let badges = '<span class="kb-badge tier">' + esc(m.tier) + '</span>' +
      '<span class="kb-badge diff">' + esc(m.diff) + '</span>' +
      (m.done ? '<span class="kb-badge done">✓ Voltooid</span>' : '');
    let groups = m.groups.map((g, gi) => {
      let items = g.items.map(renderItem).join('');
      let gintro = g.intro ? '<div class="kb-group-intro">' + g.intro + '</div>' : '';
      return '<div class="kb-group" id="' + m.id + '-g' + gi + '">' +
        '<div class="kb-group-h"><span class="chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>' +
        esc(g.title) + '<span class="count">' + g.items.length + '</span></div>' +
        '<div class="kb-group-body">' + gintro + items + '</div></div>';
    }).join('');
    let intro = m.intro ? '<div class="kb-mod-intro">' + m.intro + '</div>' : '';
    return '<section class="kb-mod" id="' + m.id + '">' +
      '<div class="kb-mod-head"><div class="kb-mod-ico">' + ICO(KB_ICONS[m.icon]) + '</div>' +
      '<div><h2>' + esc(m.name) + '</h2><p>' + esc(m.desc) + '</p><div class="kb-mod-badges">' + badges + '</div></div></div>' +
      intro + groups + '</section>';
  }

  function renderSidebar() {
    // groepeer modules per categorie, in volgorde van eerste voorkomen
    const order = [];
    const byCat = {};
    KB_MODULES.forEach(m => {
      const c = m.cat || 'Modules';
      if (!byCat[c]) { byCat[c] = []; order.push(c); }
      byCat[c].push(m);
    });
    return order.map(c =>
      '<div class="kb-side-group"><div class="kb-side-h">' + esc(c) + '</div>' +
      byCat[c].map(m =>
        '<a href="#' + m.id + '" data-id="' + m.id + '"><span class="dot"></span>' + esc(m.name) + '</a>'
      ).join('') + '</div>'
    ).join('');
  }

  function heroHTML() {
    const nSnip = KB_MODULES.reduce((a, m) => a + m.groups.reduce((b, g) => b + g.items.length, 0), 0);
    const nDone = KB_MODULES.filter(m => m.done).length;
    return '<div class="kb-hero"><div class="kb-hero-lbl">// persoonlijke kennisbank · Hack The Box CPTS</div>' +
      '<h1>CPTS <em>Kennisbank</em></h1>' +
      '<p>Mijn complete naslagwerk voor het CPTS-traject: uitleg, methodiek en kant-en-klare commando\'s per module. Zet je target-waarden in de balk — alles vult zich automatisch in. Zoek met <kbd>/</kbd>, kopieer met één klik, klap groepen in met een klik op de titel.</p>' +
      '<div class="kb-hero-meta"><span><b>' + KB_MODULES.length + '</b> modules</span>' +
      '<span><b>' + nSnip + '</b> snippets</span>' +
      '<span><b>' + nDone + '</b> voltooid</span>' +
      '<span>Laatst bijgewerkt <b>jul 2026</b></span></div></div>';
  }

  /* ─────────────── build ─────────────── */
  function build() {
    // variabelen-balk
    $('#kbVars').innerHTML = '<span class="kb-vars-lbl">Target</span>' +
      KB_VARS.map(v =>
        '<div class="kb-var"><label>' + esc(v.label) + '</label>' +
        '<input data-var="' + v.key + '" class="' + (v.wide ? 'wide' : '') + '" value="' + esc(VARS[v.key]) + '" spellcheck="false"></div>'
      ).join('') +
      '<button class="kb-vars-reset" id="varsReset">reset</button>';

    $('#kbSide').innerHTML = renderSidebar();
    $('#kbMain').innerHTML = heroHTML() +
      KB_MODULES.map(renderModule).join('') +
      '<div class="kb-empty" id="kbEmpty" style="display:none">Geen resultaten voor <b id="kbEmptyQ"></b></div>';

    wire();
  }

  /* ─────────────── interactie ─────────────── */
  function toast(msg) {
    const t = $('#kbToast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), 1600);
  }

  function wire() {
    // scrollspy
    const links = $$('#kbSide a');
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.toggle('active', l.dataset.id === e.target.id));
        }
      });
    }, { rootMargin: '-120px 0px -70% 0px' });
    $$('.kb-mod').forEach(s => spy.observe(s));

    // mobiel: sidebar sluiten na klik
    links.forEach(l => l.addEventListener('click', () => closeSide()));

    // groepen in/uitklappen
    $$('.kb-group-h').forEach(h => h.addEventListener('click', () => h.parentElement.classList.toggle('collapsed')));

    // kopiëren (event delegation)
    $('#kbMain').addEventListener('click', e => {
      const btn = e.target.closest('.kb-copy');
      if (!btn) return;
      const raw = btn.parentElement.querySelector('pre').getAttribute('data-raw');
      navigator.clipboard.writeText(raw).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
        toast('Gekopieerd naar klembord');
        setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = copyIco; }, 1300);
      });
    });
  }

  /* ─────────────── zoeken ─────────────── */
  function doSearch(q) {
    q = norm(q);
    let anyGlobal = false;
    $$('.kb-mod').forEach(mod => {
      let modHas = false;
      $$('.kb-group', mod).forEach(grp => {
        let grpHas = false;
        $$('.kb-card', grp).forEach(card => {
          const match = !q || card.dataset.search.indexOf(q) !== -1;
          card.style.display = match ? '' : 'none';
          if (match) grpHas = true;
        });
        grp.style.display = grpHas ? '' : 'none';
        if (q) grp.classList.remove('collapsed');
        if (grpHas) modHas = true;
      });
      mod.style.display = modHas ? '' : 'none';
      if (modHas) anyGlobal = true;
    });
    $('#kbEmpty').style.display = anyGlobal ? 'none' : 'block';
    if (!anyGlobal) $('#kbEmptyQ').textContent = q;
  }

  /* ─────────────── globale wiring (buiten build) ─────────────── */
  function wireGlobal() {
    // variabele inputs
    $('#kbVars').addEventListener('input', e => {
      const key = e.target.dataset.var;
      if (!key) return;
      VARS[key] = e.target.value;
      saveVars();
      fullRebuild(true);
    });
    $('#kbVars').addEventListener('click', e => {
      if (e.target.id !== 'varsReset') return;
      KB_VARS.forEach(v => VARS[v.key] = v.def);
      saveVars();
      fullRebuild(false);
      toast('Variabelen gereset');
    });

    // zoeken
    const search = $('#kbSearch');
    search.addEventListener('input', () => doSearch(search.value));
    document.addEventListener('keydown', e => {
      const gateOpen = !$('#gate').classList.contains('hidden');
      const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
      if (e.key === '/' && !gateOpen && !typing) { e.preventDefault(); search.focus(); }
      if (e.key === 'Escape' && document.activeElement === search) { search.value = ''; doSearch(''); search.blur(); }
    });

    // mobiel menu
    $('#kbBurger').addEventListener('click', openSide);
    $('#kbScrim').addEventListener('click', closeSide);

    // zweefknop: naar boven & meteen zoeken
    const topBtn = $('#kbTop');
    if (topBtn) {
      const onScroll = () => topBtn.classList.toggle('show', window.scrollY > 600);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { const s = $('#kbSearch'); if (s) s.focus(); }, 380);
      });
    }
  }

  function openSide() { $('#kbSide').classList.add('open'); $('#kbScrim').classList.add('show'); }
  function closeSide() { $('#kbSide').classList.remove('open'); $('#kbScrim').classList.remove('show'); }

  /* herbouw main + sidebar met behoud van open/dicht + scroll + zoek */
  function fullRebuild(keepVarsFocus) {
    const active = document.activeElement;
    const varKey = active && active.dataset ? active.dataset.var : null;
    const selStart = active ? active.selectionStart : null;
    const collapsed = new Set($$('.kb-group.collapsed').map(g => g.id));
    const y = window.scrollY;
    const q = $('#kbSearch') ? $('#kbSearch').value : '';

    // herbouw alleen de module-content (main), niet de vars-balk
    $('#kbMain').innerHTML = heroHTML() +
      KB_MODULES.map(renderModule).join('') +
      '<div class="kb-empty" id="kbEmpty" style="display:none">Geen resultaten voor <b id="kbEmptyQ"></b></div>';

    // herstel collapsed
    collapsed.forEach(id => { const g = document.getElementById(id); if (g) g.classList.add('collapsed'); });
    wire();
    if (q) doSearch(q);
    window.scrollTo(0, y);

    // focus terug op het variabele-veld dat je aan het typen was
    if (keepVarsFocus && varKey) {
      const inp = $('[data-var="' + varKey + '"]');
      if (inp) { inp.focus(); if (selStart != null) inp.setSelectionRange(selStart, selStart); }
    }
  }

  /* ─────────────── gate ─────────────── */
  async function tryUnlock(pass) {
    const h = await sha256(pass);
    if (h === null) {
      // geen crypto.subtle (file://) — alleen dan pl-tekst fallback op sessie-basis
      return pass.length > 0;
    }
    return h === GATE_HASH;
  }

  function unlock() {
    $('#gate').classList.add('hidden');
    document.body.classList.remove('locked');
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) {}
    initApp();
  }

  let appReady = false;
  function initApp() {
    if (appReady) return;
    appReady = true;
    loadVars();
    build();
    wireGlobal();
  }

  /* ─────────────── boot ─────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const already = (() => { try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) { return false; } })();
    if (already) {
      unlock();
      return;
    }
    document.body.classList.add('locked');
    const form = $('#gateForm');
    const input = $('#gateInput');
    const err = $('#gateErr');
    input.focus();
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const ok = await tryUnlock(input.value);
      if (ok) unlock();
      else {
        err.classList.add('show');
        err.textContent = 'Onjuiste passphrase.';
        input.value = '';
        input.focus();
        setTimeout(() => err.classList.remove('show'), 2000);
      }
    });
  });
})();
