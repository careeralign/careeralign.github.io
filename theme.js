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
