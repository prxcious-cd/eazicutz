// ============================================
// EAZI CUTZ — SITE SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 300);
  });
  // fallback in case 'load' is slow/blocked
  setTimeout(() => preloader && preloader.classList.add('hide'), 2000);

  /* ---------- Sticky nav background on scroll ---------- */
  const nav = document.getElementById('nav');
  const toggleNavBg = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  toggleNavBg();
  window.addEventListener('scroll', toggleNavBg, { passive: true });

  /* ---------- Mobile hamburger menu ---------- */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // slight stagger for elements revealed together
          setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    // fallback: show everything immediately
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Smooth scroll offset correction for sticky nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - (navHeight - 1);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
