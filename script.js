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
