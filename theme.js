// CareerAlign — Theme Toggle
// Include in every page: <script src="{path}/theme.js"></script>
(function () {
  var html = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  // Apply saved theme (also done in <head> to prevent flash)
  var saved = localStorage.getItem('ca-theme');
  if (saved === 'light') {
    html.setAttribute('data-theme', 'light');
    if (toggle) toggle.textContent = '\u2600\uFE0F';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var isLight = html.getAttribute('data-theme') === 'light';
      if (isLight) {
        html.removeAttribute('data-theme');
        localStorage.setItem('ca-theme', 'dark');
        toggle.textContent = '\uD83C\uDF19';
      } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('ca-theme', 'light');
        toggle.textContent = '\u2600\uFE0F';
      }
    });
  }
})();

// CareerAlign — Mobile Hamburger Menu
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  // Find the actual nav-links container (skip the back-link styled as nav-links)
  var navLinks = nav.querySelector('div.nav-links');
  if (!navLinks) return;

  // Inject hamburger button if not already present in HTML
  var hamburger = document.getElementById('nav-hamburger');
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'nav-hamburger';
    hamburger.id = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.innerHTML = '\u2630'; // ☰
    navLinks.parentNode.insertBefore(hamburger, navLinks);
  }

  // Toggle menu open/close
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Close menu when clicking a link inside it
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when clicking outside the nav
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();
