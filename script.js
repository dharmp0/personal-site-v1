// for active section of nav-bar
const links = document.querySelectorAll('.nav-bar .link a');

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// for typing effect
const roles = ["Dharm!", "a Student!", "an Engineer!"];
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
  type();
});

const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certModalImg");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".clickable-cert").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};