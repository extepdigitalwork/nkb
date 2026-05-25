/* NKB — Nyski Klub Biznesu */

// ===== NAV =====
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== MOBILE MENU =====
const burger  = document.getElementById('burger');
const overlay = document.getElementById('mobileOverlay');
const closeBtn = document.getElementById('overlayClose');

const openMenu  = () => { overlay.classList.add('open');  document.body.style.overflow = 'hidden'; };
const closeMenu = () => { overlay.classList.remove('open'); document.body.style.overflow = ''; };

burger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
document.querySelectorAll('.ol').forEach(a => a.addEventListener('click', closeMenu));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 20;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== REVEAL ON SCROLL =====
const io = new IntersectionObserver(
  entries => entries.forEach(({ target, isIntersecting }) => {
    if (!isIntersecting) return;
    target.classList.add('visible');
    io.unobserve(target);
  }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal, .pillar, .board-card').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = form.querySelector('.btn-dark');
    const text = btn.querySelector('.btn-text');
    const arrow = btn.querySelector('.btn-arrow');
    text.textContent = 'Wiadomość wysłana';
    arrow.textContent = '✓';
    btn.style.background = '#2D5A3D';
    btn.style.borderColor = '#2D5A3D';
    btn.disabled = true;
    setTimeout(() => {
      text.textContent = 'Wyślij wiadomość';
      arrow.textContent = '→';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
}
