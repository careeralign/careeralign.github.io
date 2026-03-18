// AIEA Book — Sidebar Navigation & Insight Panel
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  // ── Mobile sidebar toggle ──
  if (mobileBtn) {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    const openSidebar = () => {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    };

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    };

    mobileBtn.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);
  }

  // ── Chapter expand/collapse ──
  document.querySelectorAll('.sidebar-chapter').forEach(chapter => {
    const link = chapter.querySelector('.chapter-link');
    const sections = chapter.querySelector('.sidebar-sections');
    if (!sections) return;

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const linkPage = href.split('#')[0];

      if (linkPage === currentPage) {
        e.preventDefault();
        chapter.classList.toggle('expanded');
      }
    });
  });

  // ── Scroll spy for h2 sections + insight panel ──
  const sectionLinks = document.querySelectorAll('.sidebar-chapter.active .sidebar-sections a');
  if (sectionLinks.length === 0) return;

  const insightCards = document.querySelectorAll('.insight-card');

  const headings = [];
  sectionLinks.forEach(link => {
    const hash = link.getAttribute('href').split('#')[1];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) headings.push({ el, link, id: hash });
    }
  });

  if (headings.length === 0) return;

  let ticking = false;
  let currentActiveId = null;

  const updateActiveSection = () => {
    const scrollY = window.scrollY + window.innerHeight * 0.2;

    let activeIdx = 0;
    for (let i = headings.length - 1; i >= 0; i--) {
      if (headings[i].el.offsetTop <= scrollY) {
        activeIdx = i;
        break;
      }
    }

    // Update sidebar active link
    sectionLinks.forEach(l => l.classList.remove('current'));
    headings[activeIdx].link.classList.add('current');

    const activeLink = headings[activeIdx].link;
    const sidebarBody = document.querySelector('.sidebar-body');
    if (sidebarBody && activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const bodyRect = sidebarBody.getBoundingClientRect();
      if (linkRect.top < bodyRect.top || linkRect.bottom > bodyRect.bottom) {
        activeLink.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }

    // Update insight panel — show card matching current section
    const activeId = headings[activeIdx].id;
    if (activeId !== currentActiveId) {
      currentActiveId = activeId;
      insightCards.forEach(card => {
        if (card.dataset.section === activeId) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateActiveSection);
      ticking = true;
    }
  });

  updateActiveSection();
});
