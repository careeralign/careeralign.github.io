/* ── CareerAlign Site Search (inline nav) ────────────────── */
(function () {
  'use strict';

  var index = null;
  var wrap = null;
  var input = null;
  var results = null;
  var selected = -1;
  var isOpen = false;

  /* ── Determine base path ── */
  function getBasePath() {
    var scripts = document.querySelectorAll('script[src*="search.js"]');
    if (scripts.length === 0) return '';
    var src = scripts[scripts.length - 1].getAttribute('src');
    return src.replace('search.js', '');
  }

  var basePath = getBasePath();

  /* ── Inject search into nav ── */
  function inject() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var toggle = nav.querySelector('.theme-toggle');
    if (!toggle) return;

    wrap = document.createElement('div');
    wrap.className = 'search-wrap';
    wrap.innerHTML =
      '<button class="search-btn" aria-label="Search">' +
        '<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      '</button>' +
      '<input type="text" class="search-input" placeholder="Search..." autocomplete="off" />' +
      '<div class="search-results"></div>';

    toggle.parentNode.insertBefore(wrap, toggle);

    input = wrap.querySelector('.search-input');
    results = wrap.querySelector('.search-results');

    wrap.querySelector('.search-btn').addEventListener('click', function (e) {
      e.stopPropagation();
      if (isOpen) closeSearch(); else openSearch();
    });

    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeydown);
    input.addEventListener('focus', function () { if (input.value.length >= 2) onInput(); });

    document.addEventListener('click', function (e) {
      if (isOpen && !wrap.contains(e.target)) closeSearch();
    });
  }

  /* ── Load index ── */
  function loadIndex() {
    if (index) return;
    fetch(basePath + 'search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (d) { index = d; })
      .catch(function () { index = []; });
  }

  /* ── Open / Close ── */
  function openSearch() {
    if (!wrap) return;
    loadIndex();
    isOpen = true;
    wrap.classList.add('active');
    input.value = '';
    results.innerHTML = '';
    selected = -1;
    setTimeout(function () { input.focus(); }, 30);
  }

  function closeSearch() {
    if (!wrap) return;
    isOpen = false;
    wrap.classList.remove('active');
    results.innerHTML = '';
    selected = -1;
    input.blur();
  }

  /* ── Search logic ── */
  function onInput() {
    var q = input.value.trim().toLowerCase();
    selected = -1;
    if (!q || q.length < 2) { results.innerHTML = ''; return; }
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
        '<div class="search-result-title">' + esc(it.title) + '</div>' +
        '<div class="search-result-meta"><span class="search-badge">' + esc(it.section) + '</span> ' + esc(trunc(it.desc, 70)) + '</div>' +
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
      updateSel(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selected = Math.max(selected - 1, 0);
      updateSel(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selected >= 0 && items[selected]) items[selected].click();
      else if (items.length > 0) items[0].click();
    }
  }

  function updateSel(items) {
    for (var i = 0; i < items.length; i++) items[i].classList.toggle('selected', i === selected);
    if (items[selected]) items[selected].scrollIntoView({ block: 'nearest' });
  }

  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function trunc(s, n) { return s.length > n ? s.substring(0, n) + '...' : s; }

  /* ── Ctrl/Cmd+K shortcut ── */
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape' && isOpen) closeSearch();
  });

  inject();
})();
