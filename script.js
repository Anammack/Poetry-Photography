// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add subtle parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');

    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for fade-in animations
// Uses a safe rootMargin and disconnects after triggering so sections never get stuck invisible
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px'
};

const observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections — skip the fade-in entirely on small screens
if (window.innerWidth > 600) {
    document.querySelectorAll('.poetry-section, .photography-section, .about-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

// Playlist toggle
function togglePlaylist(header) {
    const body = header.nextElementSibling;
    const arrow = header.querySelector('.toggle-arrow');
    const hint = header.querySelector('.toggle-hint');
    const isOpen = body.classList.contains('open');

    body.classList.toggle('open');
    header.classList.toggle('open');
    arrow.textContent = isOpen ? '▾' : '▴';
    hint.textContent = isOpen ? '— click to expand —' : '— click to collapse —';
}

// Add typewriter effect to subtitle (optional enhancement)
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let index = 0;

    const typeWriter = () => {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typewriter on page load
    window.addEventListener('load', typeWriter);
}

// Add subtle glow effect on mouse move
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
});
