// Professional Business Website JavaScript for DukeOps - Masterpiece Edition

document.addEventListener('DOMContentLoaded', function () {
  // Loading Screen Animation
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 1500);
  }

  // Scroll Progress Indicator
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    });
  }

  // Enhanced Smooth Scroll with offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 100; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Advanced Navbar Scroll Effects
  const navbar = document.getElementById('main-navbar');
  let lastScrollTop = 0;
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add/remove scrolled class
      if (scrollTop > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
      
      // Hide/show navbar on scroll
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScrollTop = scrollTop;
    });
  }

  // Animated Counter for Statistics
  const animateCounters = () => {
    const counters = document.querySelectorAll('#stats-section h3');
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace(/\D/g, ''));
      const suffix = counter.textContent.replace(/\d/g, '');
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }, 30);
    });
  };

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'stats-section') {
          animateCounters();
        }
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe sections for animations
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Enhanced WhatsApp Button
  const whatsappBtn = document.getElementById('whatsapp-float-btn');
  if (whatsappBtn) {
    // Show/hide based on scroll
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 300) {
        whatsappBtn.style.opacity = '1';
        whatsappBtn.style.visibility = 'visible';
      } else {
        whatsappBtn.style.opacity = '0';
        whatsappBtn.style.visibility = 'hidden';
      }
    });

    // Add click analytics
    whatsappBtn.addEventListener('click', function() {
      // Track WhatsApp clicks (you can integrate with Google Analytics here)
      console.log('WhatsApp button clicked');
    });
  }

  // Form Handling with Enhanced UX
  const contactForm = document.getElementById('contact-form');
  const footerForm = document.getElementById('footer-contact-form');
  
  const handleFormSubmission = (form, successElement, failureElement) => {
    if (!form) return;
    
    // Check URL parameters on page load
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true' && successElement) {
      successElement.classList.remove('d-none');
      if (failureElement) failureElement.classList.add('d-none');
    } else if (urlParams.get('success') === 'false' && failureElement) {
      if (successElement) successElement.classList.add('d-none');
      failureElement.classList.remove('d-none');
    }

    // Handle form submission
    form.addEventListener('submit', function (e) {
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
      submitButton.disabled = true;
      
      // Re-enable button after timeout (in case of network issues)
      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 10000);
    });
  };

  // Apply form handling
  handleFormSubmission(
    contactForm, 
    document.getElementById('form-success'), 
    document.getElementById('form-failure')
  );
  
  handleFormSubmission(footerForm);

  // Enhanced Card Interactions
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });

  // Enhanced Button Interactions
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // WhatsApp Order Button Enhancement
  document.querySelectorAll('[id*="order"]').forEach(button => {
    if (button.href && button.href.includes('wa.me')) {
      button.addEventListener('click', function(e) {
        // Add loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Opening WhatsApp...';
        
        // Track the click
        console.log('Product order clicked:', this.id);
        
        // Reset button after delay
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      });
    }
  });

  // Parallax Effect for Hero Section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Active Navigation Link Highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.pageYOffset >= sectionTop) {
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

  // Lazy Loading for Images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Performance Monitoring
  window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
  });

  // Initialize AOS with custom settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }
}); 