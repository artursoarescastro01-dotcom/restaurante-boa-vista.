const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const links = document.getElementById('navLinks');

// Barra fixa ganha fundo ao rolar
const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menu mobile
const setMenu = open => {
  links.classList.toggle('is-open', open);
  burger.classList.toggle('is-open', open);
  nav.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', open);
};
burger.addEventListener('click', () => setMenu(!links.classList.contains('is-open')));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Abas do cardápio
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
    document.querySelectorAll('.menu').forEach(m => m.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.getElementById(tab.dataset.tab).classList.add('is-active');
  });
});

// Animação de entrada
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

// Status aberto/fechado (horário de São Paulo)
(() => {
  const el = document.getElementById('status'), txt = document.getElementById('statusText');
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const d = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  const close = d >= 1 && d <= 5 ? 22 : d === 6 ? 17 : 0;
  const open = close && h >= 6 && h < close;
  el.classList.add(open ? 'is-open' : 'is-closed');
  txt.textContent = open ? `Aberto até ${close}h` : 'Fechado agora';
})();
