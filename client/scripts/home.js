document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded');

  // Recursive scroll animation setup
  const fadeElements = document.querySelectorAll('.features, .reviews');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show'); // make it reversible
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  // Menu toggle still here
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      console.log('toggle clicked');
      navLinks.classList.toggle('show');
    });
  } else {
    console.error('Toggle or navLinks not found!');
  }
});
