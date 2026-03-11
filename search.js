/* ── CareerAlign Site Search ─────────────────────────────── */
(function () {
  'use strict';

  let index = null;
  let modal = null;
  let input = null;
  let results = null;
  let selected = -1;

  /* ── Determine base path (handles pages at different depths) ── */
  function getBasePath() {
    const scripts = document.querySelectorAll('script[src*="search.js"]');
    if (scripts.length === 0) return '';
    const src = scripts[scripts.length - 1].getAttribute('src');
    return src.replace('search.js', '');
  }

  const basePath = getBasePath();

  /* ── Inject search button into nav ── */
  function injectButton() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const toggle = nav.querySelector('.theme-toggle');
    if (!toggle) return;

    const btn = document.createElement('button');
    btn.className = 'search-btn';
    btn.setAttribute('aria-label', 'Search');
    btn.innerHTML = '<svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    btn.addEventListener('click', openSearch);
    toggle.parentNode.insertBefore(btn, toggle);
  }

  /* ── Create modal ── */
  function createModal() {
    modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML =
      '<div class="search-backdrop"></div>' +
      '<div class="search-dialog">' +
        '<div class="search-input-wrap">' +
          '<svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
          '<input type="text" class="search-input" placeholder="Search pages, topics, keywords..." autocomplete="off" />' +
          '<kbd class="search-esc">Esc</kbd>' +
        '</div>' +
        '<div class="search-results"></div>' +
        '<div class="search-footer">Use <kbd>&uarr;</kbd><kbd>&darr;</kbd> to navigate, <kbd>Enter</kbd> to open</div>' +
      '</div>';
    document.body.appendChild(modal);

    input = modal.querySelector('.search-input');
    results = modal.querySelector('.search-results');

    modal.querySelector('.search-backdrop').addEventListener('click', closeSearch);
    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeydown);
  }

  /* ── Load index ── */
  async function loadIndex() {
    if (index) return;
    try {
      const resp = await fetch(basePath + 'search-index.json');
      index = await resp.json();
    } catch (e) {
      index = [];
    }
  }

  /* ── Open / Close ── */
  function openSearch() {
    if (!modal) createModal();
    loadIndex();
    modal.classList.add('active');
    input.value = '';
    results.innerHTML = '';
    selected = -1;
    setTimeout(function () { input.focus(); }, 50);
  }

  function closeSearch() {
    if (modal) modal.classList.remove('active');
    selected = -1;
  }

  /* ── Search logic ── */
  function onInput() {
    var q = input.value.trim().toLowerCase();
    selected = -1;
    if (!q || q.length < 2) {
      results.innerHTML = '';
      return;
    }
    if (!index) { results.innerHTML = ''; return; }

    var terms = q.split(/\s+/);
    var scored = [];

    for (var i = 0; i < index.length; i++) {
      var item = index[i];
      var hay = (item.title + ' ' + item.desc + ' ' + item.tags + ' ' + item.section).toLowerCase();
      var match = true;
      var score = 0;

      for (var t = 0; t < terms.length; t++) {
        if (hay.indexOf(terms[t]) === -1) { match = false; break; }
        if (item.title.toLowerCase().indexOf(terms[t]) !== -1) score += 10;
        if (item.tags.toLowerCase().indexOf(terms[t]) !== -1) score += 5;
        if (item.section.toLowerCase().indexOf(terms[t]) !== -1) score += 3;
        score += 1;
      }

      if (match) scored.push({ item: item, score: score });
    }

    scored.sort(function (a, b) { return b.score - a.score; });
    var top = scored.slice(0, 8);

    if (top.length === 0) {
      results.innerHTML = '<div class="search-empty">No results found</div>';
      return;
    }

    var html = '';
    for (var j = 0; j < top.length; j++) {
      var it = top[j].item;
      html += '<a href="' + basePath + it.url + '" class="search-result" data-idx="' + j + '">' +
        '<div class="search-result-title">' + escapeHtml(it.title) + '</div>' +
        '<div class="search-result-meta"><span class="search-badge">' + escapeHtml(it.section) + '</span> ' + escapeHtml(truncate(it.desc, 80)) + '</div>' +
      '</a>';
    }
    results.innerHTML = html;
  }

  /* ── Keyboard nav ── */
  function onKeydown(e) {
    var items = results.querySelectorAll('.search-result');
    if (e.key === 'Escape') { closeSearch(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selected = Math.min(selected + 1, items.length - 1);
      updateSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selected = Math.max(selected - 1, 0);
      updateSelection(items);
    } else if (e.key === 'Enter' && selected >= 0 && items[selected]) {
      e.preventDefault();
      items[selected].click();
    }
  }

  function updateSelection(items) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('selected', i === selected);
    }
    if (items[selected]) items[selected].scrollIntoView({ block: 'nearest' });
  }

  /* ── Helpers ── */
  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function truncate(s, n) {
    return s.length > n ? s.substring(0, n) + '...' : s;
  }

  /* ── Keyboard shortcut: Ctrl/Cmd + K ── */
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  /* ── Init ── */
  injectButton();
})();
