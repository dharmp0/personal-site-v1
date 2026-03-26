// ===== Theme Toggle =====
(function () {
    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    });
})();

// ===== Custom Cursor =====
(function () {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = document.querySelector('.cursor-dot');
    const trail = document.querySelector('.cursor-trail');
    if (!dot || !trail) return;

    let mouseX = -100, mouseY = -100;
    let trailX = -100, trailY = -100;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px)';
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        trail.style.transform = 'translate(' + trailX + 'px, ' + trailY + 'px)';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover effect on interactive elements
    document.addEventListener('mouseover', function (e) {
        if (e.target.closest('a, button')) {
            dot.classList.add('hovering');
            trail.classList.add('hovering');
        }
    });
    document.addEventListener('mouseout', function (e) {
        if (e.target.closest('a, button')) {
            dot.classList.remove('hovering');
            trail.classList.remove('hovering');
        }
    });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', function () {
        dot.style.opacity = '0';
        trail.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
        dot.style.opacity = '1';
        trail.style.opacity = '1';
    });
})();

// ===== Views Counter =====
(function () {
    var el = document.getElementById('view-count');
    if (!el) return;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dharm.goatcounter.com/counter/' + encodeURIComponent('/') + '.json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                var data = JSON.parse(xhr.responseText);
                el.textContent = data.count + ' views';
            } catch (e) {
                el.textContent = '';
            }
        }
    };
    xhr.onerror = function () {
        el.textContent = '';
    };
    xhr.send();
})();
