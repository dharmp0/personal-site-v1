// for active section of nav-bar
const links = document.querySelectorAll('.nav-bar .link a');

// light/dark mode toggle
const THEME_STORAGE_KEY = 'theme';
const themeToggleButton = document.getElementById('theme-toggle');

function getPreferredTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (document.body) {
    document.body.dataset.theme = theme;
    document.body.classList.toggle('theme-dark', theme === 'dark');
    document.body.classList.toggle('theme-light', theme === 'light');
  }

  if (!themeToggleButton) return;

  const isDark = theme === 'dark';
  themeToggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggleButton.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggleButton.innerHTML = isDark
    ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_STORAGE_KEY, next);
  setTheme(next);
}

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

/* for typing effect */
const roles = ["Dharm!", "a Developer!", "a Student!"];
let currentIndex = 0;
let charIndex = 0;
const typingText = document.getElementById("typing-text");

function type() {
  if (charIndex < roles[currentIndex].length) {
    typingText.textContent += roles[currentIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = roles[currentIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 100);
  } else {
    currentIndex = (currentIndex + 1) % roles.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTheme(getPreferredTheme());
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
  }
  type();
});


// Certifications carousel
let currentCertIndex = 1;
const certImages = [
    "images/JPMC-Cert-1.png",
    "images/Microsoft-Azure-Cert-1.png", 
    "images/Fortinet-Cert-1.png"
];

function changeCert(direction) {
    currentCertIndex += direction;
    if (currentCertIndex > certImages.length) currentCertIndex = 1;
    if (currentCertIndex < 1) currentCertIndex = certImages.length;
    
    document.getElementById("certImage").src = certImages[currentCertIndex - 1];
    
    // Update dots
    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentCertIndex - 1);
    });
}

function currentCert(index) {
    currentCertIndex = index;
    document.getElementById("certImage").src = certImages[currentCertIndex - 1];
    
    // Update dots
    document.querySelectorAll(".dot").forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentCertIndex - 1);
    });
}


// for active section highlighting on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-bar .link a');
let isUserScrolling = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
  isUserScrolling = true;

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isUserScrolling = false;
    highlightCurrentSection(); 
  }, 100); 
});

function highlightCurrentSection() {
    let currentSectionId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}