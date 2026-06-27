document.addEventListener('DOMContentLoaded', () => {

  // ====== CUSTOM CURSOR ======
  if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    const cursor = document.createElement('div');
    cursor.id = 'clay-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .clay-card, .featured-card, .orb, .timeline-node, .contact-info-card, .strength-item, .project-card');

    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));
  }

  // ====== NAVIGATION ACTIVE STATE ======
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ====== HAMBURGER MENU TOGGLE ======
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', openMenu);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ====== FADE-UP ANIMATIONS ======
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  }

  // ====== HORIZONTAL TIMELINE INTERACTION ======
  const timelineNodes = document.querySelectorAll('.timeline-node');
  if (timelineNodes.length) {
    timelineNodes.forEach(node => {
      node.addEventListener('click', () => {
        timelineNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        node.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });

    const track = document.querySelector('.timeline-track');
    if (track && timelineNodes.length) {
      const firstNode = track.querySelector('.timeline-node');
      if (firstNode && !track.querySelector('.timeline-node.active')) {
        firstNode.classList.add('active');
      }
    }
  }

  // ====== PROJECT FILTER ======
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
            card.classList.add('fade-up');
            setTimeout(() => card.classList.add('visible'), 50);
          } else {
            const categories = card.dataset.category;
            if (categories && categories.includes(filter)) {
              card.style.display = 'block';
              card.classList.add('fade-up');
              setTimeout(() => card.classList.add('visible'), 50);
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // ====== CONTACT FORM ======
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.clay-btn');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent!';
      btn.style.boxShadow = 'inset 5px 5px 10px var(--clay-dark), inset -5px -5px 10px var(--clay-light)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.boxShadow = '';
        contactForm.reset();
      }, 3000);
    });
  }

});
