/* Breadcrumb injection for AIEA book chapters */
(function () {
  'use strict';

  var mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  // Determine chapter title from <h1> or <title>
  var h1 = document.querySelector('.main-content h1');
  var chapterTitle = h1 ? h1.textContent.trim() : document.title.replace(/ — .*/, '').trim();

  // Determine part name from sidebar
  var partName = '';
  var activeCh = document.querySelector('.sidebar-chapter.active');
  if (activeCh) {
    var prev = activeCh.previousElementSibling;
    while (prev) {
      if (prev.classList && prev.classList.contains('sidebar-part')) {
        partName = prev.textContent.trim();
        break;
      }
      prev = prev.previousElementSibling;
    }
  }
  // Fallback: walk all sidebar-part elements and find the one before current page link
  if (!partName) {
    var parts = document.querySelectorAll('.sidebar-part');
    var chapters = document.querySelectorAll('.sidebar-chapter');
    var currentHref = location.pathname.split('/').pop() || 'index.html';
    var lastPart = '';
    var siblings = document.querySelector('.sidebar-body');
    if (siblings) {
      var nodes = siblings.children;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].classList.contains('sidebar-part')) {
          lastPart = nodes[i].textContent.trim();
        }
        if (nodes[i].classList.contains('sidebar-chapter')) {
          var link = nodes[i].querySelector('.chapter-link');
          if (link && link.getAttribute('href') && link.getAttribute('href').indexOf(currentHref) !== -1) {
            partName = lastPart;
            break;
          }
        }
      }
    }
  }

  // Build breadcrumb
  var nav = document.createElement('nav');
  nav.className = 'breadcrumb';
  nav.setAttribute('aria-label', 'Breadcrumb');

  var sep = '<span class="sep">&rsaquo;</span>';
  var crumbs = '<a href="https://careeralign.com/">Home</a>' + sep +
               '<a href="index.html">AI Enterprise Architect</a>';
  if (partName) {
    crumbs += sep + '<span>' + partName + '</span>';
  }
  crumbs += sep + '<span>' + chapterTitle + '</span>';

  nav.innerHTML = crumbs;
  mainContent.insertBefore(nav, mainContent.firstChild);
})();
