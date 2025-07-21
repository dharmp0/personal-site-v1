// for active section of nav-bar
const links = document.querySelectorAll('.nav-bar .link a');

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});