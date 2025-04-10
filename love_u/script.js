document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const albums = document.querySelectorAll('.album-container');
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('overlay');
  const yearLinks = document.querySelectorAll('.year-nav a');
  const sections = document.querySelectorAll('.featured-image');

  // Filter functionality
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const filter = button.getAttribute('data-filter');
          
          albums.forEach(album => {
              const albumType = album.querySelector('.album').getAttribute('data-album');
              
              if (filter === 'all' || filter === albumType) {
                  album.classList.remove('hidden');
                  album.classList.add('visible');
              } else {
                  album.classList.remove('visible');
                  album.classList.add('hidden');
              }
          });
      });
  });

  // Navbar functionality
  navbar.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      overlay.classList.toggle('active');
      navbar.classList.toggle('rotated');
  });

  overlay.addEventListener('click', () => {
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      navbar.classList.remove('rotated');
  });

  // Add click handler for year links
  yearLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
              // Calculate the offset to center the section
              const sectionTop = targetSection.offsetTop;
              const windowHeight = window.innerHeight;
              const sectionHeight = targetSection.offsetHeight;
              const scrollTo = sectionTop - (windowHeight / 2) + (sectionHeight / 2);
              
              // Smooth scroll to the target
              window.scrollTo({
                  top: scrollTo,
                  behavior: 'smooth'
              });
              
              // Add visual feedback
              yearLinks.forEach(l => l.classList.remove('active'));
              this.classList.add('active');
          }
      });
  });
  
  // Update active link based on scroll position
  window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY + (window.innerHeight / 2);
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
              const year = section.id;
              yearLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${year}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
  });
});
