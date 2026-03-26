// animatii stele pe canvas
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 180;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.3,
    alpha: Math.random(),
    speed: Math.random() * 0.008 + 0.002,
    direction: Math.random() > 0.5 ? 1 : -1,
    color: pickColor(),
  };
}

function pickColor() {
  const colors = [
    'rgba(192,132,252,',
    'rgba(96,165,250,',
    'rgba(244,114,182,',
    'rgba(34,211,238,',
    'rgba(255,255,255,',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(createStar());
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(function(star) {
    star.alpha += star.speed * star.direction;
    if (star.alpha >= 1 || star.alpha <= 0) {
      star.direction *= -1;
    }
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = star.color + Math.max(0, Math.min(1, star.alpha)) + ')';
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', function() {
  resize();
  initStars();
});

resize();
initStars();
drawStars();

console.log("stars ok");


// navbar
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  let current = '';
  sections.forEach(function(section) {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
});

updateActiveLink();


// hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');
const menuLinks = navLinksMenu.querySelectorAll('.nav-link');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
  document.body.style.overflow = navLinksMenu.classList.contains('open') ? 'hidden' : '';
});

menuLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    hamburger.classList.remove('open');
    navLinksMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// animatii la scroll cu IntersectionObserver
const animElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});

animElements.forEach(function(el) {
  observer.observe(el);
});


// skill bars
const bars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      setTimeout(function() {
        bar.style.width = width + '%';
      }, 200);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

bars.forEach(function(bar) {
  skillObserver.observe(bar);
});


// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// buton scroll to top
const scrollBtn = document.getElementById('scroll-top-btn');
if (scrollBtn) {
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// hover glow pe carduri
document.querySelectorAll('.project-card, .timeline-card, .contact-item, .cta-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(192,132,252,0.08) 0%, rgba(255,255,255,0.03) 60%)`;
  });

  card.addEventListener('mouseleave', function() {
    card.style.background = '';
  });
});
