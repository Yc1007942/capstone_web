const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));

const parallaxNodes = document.querySelectorAll("[data-parallax]");

const applyParallax = () => {
  const scrollY = window.scrollY;
  parallaxNodes.forEach(node => {
    const speed = parseFloat(node.dataset.speed) || 0.2;
    const offset = scrollY * speed;
    node.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
};

if (parallaxNodes.length) {
  applyParallax();
  window.addEventListener("scroll", applyParallax, { passive: true });
  window.addEventListener("resize", applyParallax);
}

// Interactive card tilt effect on member cards
document.querySelectorAll('.member-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
    
    const rotateX = (y - 50) / 10;
    const rotateY = (x - 50) / 10;
    card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// Add active state to nav based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.floating-nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Cursor trail effect (desktop only)
if (window.innerWidth > 768) {
  const cursorTrail = [];
  const trailLength = 8;
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: rgba(77, 212, 172, ${0.8 - i * 0.1});
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease;
      opacity: ${1 - i * 0.12};
    `;
    document.body.appendChild(dot);
    cursorTrail.push({ el: dot, x: 0, y: 0 });
  }
  
  let mouseX = 0, mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateTrail() {
    let x = mouseX;
    let y = mouseY;
    
    cursorTrail.forEach((dot, index) => {
      dot.el.style.left = x - 3 + 'px';
      dot.el.style.top = y - 3 + 'px';
      
      const nextDot = cursorTrail[index + 1] || cursorTrail[0];
      x += (nextDot.x - x) * 0.35;
      y += (nextDot.y - y) * 0.35;
      
      dot.x = x;
      dot.y = y;
    });
    
    requestAnimationFrame(animateTrail);
  }
  
  animateTrail();
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  }, 100);
});
