// Professional Business Website JavaScript for DukeOps - Masterpiece Edition

document.addEventListener("DOMContentLoaded", function () {
  // Detect mobile device first (needed throughout the script)
  const isMobile = window.innerWidth <= 768;
  const isTouch = "ontouchstart" in window;

  // Loading Screen Animation
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 1500);
  }

  // Scroll Progress Indicator (handled in mobile optimization section)

  // Enhanced Smooth Scroll with offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 100; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Advanced Navbar Scroll Effects (handled in mobile optimization section)

  // Animated Counter for Statistics
  const animateCounters = () => {
    const counters = document.querySelectorAll("#stats-section h3");
    counters.forEach((counter) => {
      const target = parseInt(counter.textContent.replace(/\D/g, ""));
      const suffix = counter.textContent.replace(/\d/g, "");
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
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === "stats-section") {
          animateCounters();
        }
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observe sections for animations
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Enhanced WhatsApp Button (scroll handling moved to optimized handler)
  const whatsappBtn = document.getElementById("whatsapp-float-btn");
  if (whatsappBtn) {
    // Add click analytics
    whatsappBtn.addEventListener("click", function () {
      // Track WhatsApp clicks (you can integrate with Google Analytics here)
      console.log("WhatsApp button clicked");
    });
  }

  // Form Handling with Enhanced UX
  const contactForm = document.getElementById("contact-form");
  const footerForm = document.getElementById("footer-contact-form");

  const handleFormSubmission = (form, successElement, failureElement) => {
    if (!form) return;

    // Check URL parameters on page load
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true" && successElement) {
      successElement.classList.remove("d-none");
      if (failureElement) failureElement.classList.add("d-none");
    } else if (urlParams.get("success") === "false" && failureElement) {
      if (successElement) successElement.classList.add("d-none");
      failureElement.classList.remove("d-none");
    }

    // Handle form submission
    form.addEventListener("submit", function (e) {
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      submitButton.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
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
    document.getElementById("form-success"),
    document.getElementById("form-failure")
  );

  handleFormSubmission(footerForm);

  // Enhanced Card Interactions
  document.querySelectorAll(".glass-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "";
    });
  });

  // Enhanced Button Interactions
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // WhatsApp Order Button Enhancement
  document.querySelectorAll('[id*="order"]').forEach((button) => {
    if (button.href && button.href.includes("wa.me")) {
      button.addEventListener("click", function (e) {
        // Add loading state
        const originalText = this.innerHTML;
        this.innerHTML =
          '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Opening WhatsApp...';

        // Track the click
        console.log("Product order clicked:", this.id);

        // Reset button after delay
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      });
    }
  });

  // Desktop scroll optimizations (mobile handled separately)
  if (!isMobile) {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    let lastScrollTop = 0;
    let ticking = false;

    const desktopScrollHandler = function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // Update scroll progress
          const scrollProgress = document.getElementById("scroll-progress");
          if (scrollProgress) {
            const scrollHeight =
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercent + "%";
          }

          // Update navbar
          const navbar = document.getElementById("main-navbar");
          if (navbar) {
            if (scrollTop > 50) {
              navbar.classList.add("navbar-scrolled");
            } else {
              navbar.classList.remove("navbar-scrolled");
            }

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
              navbar.style.transform = "translateY(-100%)";
            } else {
              navbar.style.transform = "translateY(0)";
            }
            lastScrollTop = scrollTop;
          }

          // Parallax Effect for Hero Section
          const heroSection = document.getElementById("hero-section");
          if (heroSection) {
            heroSection.style.transform = `translateY(${scrollTop * 0.5}px)`;
          }

          // WhatsApp button show/hide
          if (whatsappBtn) {
            if (scrollTop > 300) {
              whatsappBtn.style.opacity = "1";
              whatsappBtn.style.visibility = "visible";
            } else {
              whatsappBtn.style.opacity = "0";
              whatsappBtn.style.visibility = "hidden";
            }
          }

          // Active Navigation Link Highlighting
          let current = "";
          sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            if (scrollTop >= sectionTop) {
              current = section.getAttribute("id");
            }
          });

          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
              link.classList.add("active");
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", desktopScrollHandler, { passive: true });
  }

  // Lazy Loading for Images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Performance Monitoring
  window.addEventListener("load", function () {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
  });

  // Initialize AOS with custom settings
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }

  // HIGH PRIORITY: MOBILE-SPECIFIC OPTIMIZATIONS
  // Mobile device already detected at the top of the script

  // Mobile-specific optimizations
  if (isMobile) {
    // Optimize scroll events for mobile
    let mobileScrollTicking = false;
    const optimizedScrollHandler = function () {
      if (!mobileScrollTicking) {
        requestAnimationFrame(function () {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // Update scroll progress
          const scrollProgress = document.getElementById("scroll-progress");
          if (scrollProgress) {
            const scrollHeight =
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercent + "%";
          }

          // Update navbar
          const navbar = document.getElementById("main-navbar");
          if (navbar) {
            if (scrollTop > 50) {
              navbar.classList.add("navbar-scrolled");
            } else {
              navbar.classList.remove("navbar-scrolled");
            }
          }

          mobileScrollTicking = false;
        });
        mobileScrollTicking = true;
      }
    };

    window.addEventListener("scroll", optimizedScrollHandler, {
      passive: true,
    });
  }

  // Touch-specific enhancements
  if (isTouch) {
    // Add touch feedback to buttons
    document
      .querySelectorAll(".btn, .glass-card, .social-icon")
      .forEach((element) => {
        element.addEventListener(
          "touchstart",
          function () {
            this.style.transform = "scale(0.98)";
          },
          { passive: true }
        );

        element.addEventListener(
          "touchend",
          function () {
            setTimeout(() => {
              this.style.transform = "";
            }, 150);
          },
          { passive: true }
        );
      });

    // Improve form focus on mobile
    document
      .querySelectorAll(".form-control, .form-select")
      .forEach((input) => {
        input.addEventListener("focus", function () {
          // Scroll input into view on mobile
          setTimeout(() => {
            this.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 300);
        });
      });
  }

  // Mobile menu improvements
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse && isMobile) {
    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInsideNav =
        navbarCollapse.contains(event.target) ||
        navbarToggler.contains(event.target);

      if (!isClickInsideNav && navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
          setTimeout(() => {
            navbarToggler.click();
          }, 100);
        }
      });
    });
  }

  // Mobile-specific WhatsApp button behavior
  if (whatsappBtn && isMobile) {
    // Add haptic feedback simulation
    whatsappBtn.addEventListener("click", function () {
      if (navigator.vibrate) {
        navigator.vibrate(50); // Short vibration
      }

      // Visual feedback
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  }

  // MEDIUM PRIORITY: ENHANCED MOBILE JAVASCRIPT FEATURES

  // Mobile performance monitoring
  if (isMobile) {
    // Monitor performance on mobile
    window.addEventListener("load", function () {
      const loadTime = performance.now();
      if (loadTime > 3000) {
        console.warn(
          "Slow loading detected on mobile:",
          Math.round(loadTime) + "ms"
        );
      }
    });

    // Memory usage monitoring (if available)
    if ("memory" in performance) {
      setInterval(() => {
        const memory = performance.memory;
        if (memory.usedJSHeapSize > 50 * 1024 * 1024) {
          // 50MB threshold
          console.warn("High memory usage detected on mobile");
        }
      }, 30000); // Check every 30 seconds
    }

    // Mobile-specific image lazy loading
    const mobileImages = document.querySelectorAll("img");
    const mobileImageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove("lazy");
              mobileImageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "50px", // Load images 50px before they come into view
      }
    );

    mobileImages.forEach((img) => {
      if (img.dataset.src) {
        mobileImageObserver.observe(img);
      }
    });

    // Mobile swipe gestures for cards (basic implementation)
    let startX, startY, distX, distY;
    const threshold = 100; // Minimum distance for swipe

    document
      .querySelectorAll(".glass-card, .service-btn")
      .forEach((element) => {
        element.addEventListener(
          "touchstart",
          function (e) {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
          },
          { passive: true }
        );

        element.addEventListener(
          "touchmove",
          function (e) {
            if (!startX || !startY) return;

            const touch = e.touches[0];
            distX = touch.clientX - startX;
            distY = touch.clientY - startY;

            // Add subtle visual feedback during swipe
            if (Math.abs(distX) > 10) {
              this.style.transform = `translateX(${distX * 0.1}px)`;
            }
          },
          { passive: true }
        );

        element.addEventListener(
          "touchend",
          function (e) {
            // Reset transform
            this.style.transform = "";

            // Handle swipe actions (can be customized per element)
            if (Math.abs(distX) > threshold && Math.abs(distY) < threshold) {
              if (distX > 0) {
                // Swipe right - could trigger an action
                this.classList.add("swiped-right");
                setTimeout(() => this.classList.remove("swiped-right"), 300);
              } else {
                // Swipe left - could trigger an action
                this.classList.add("swiped-left");
                setTimeout(() => this.classList.remove("swiped-left"), 300);
              }
            }

            startX = startY = distX = distY = null;
          },
          { passive: true }
        );
      });

    // Mobile orientation change handling
    window.addEventListener("orientationchange", function () {
      // Delay to allow for orientation change to complete
      setTimeout(() => {
        // Recalculate any position-dependent elements
        const navbar = document.getElementById("main-navbar");
        if (navbar) {
          navbar.style.transform = "translateY(0)";
        }

        // Trigger a resize event for any responsive components
        window.dispatchEvent(new Event("resize"));
      }, 100);
    });

    // Mobile network status monitoring
    if ("connection" in navigator) {
      const connection = navigator.connection;

      function updateConnectionStatus() {
        if (
          connection.effectiveType === "slow-2g" ||
          connection.effectiveType === "2g"
        ) {
          // Reduce animations and effects for slow connections
          document.body.classList.add("slow-connection");
        } else {
          document.body.classList.remove("slow-connection");
        }
      }

      connection.addEventListener("change", updateConnectionStatus);
      updateConnectionStatus(); // Initial check
    }

    // Mobile battery status (if available)
    if ("getBattery" in navigator) {
      navigator.getBattery().then(function (battery) {
        function updateBatteryStatus() {
          if (battery.level < 0.2 && !battery.charging) {
            // Reduce animations and effects when battery is low
            document.body.classList.add("low-battery");
          } else {
            document.body.classList.remove("low-battery");
          }
        }

        battery.addEventListener("levelchange", updateBatteryStatus);
        battery.addEventListener("chargingchange", updateBatteryStatus);
        updateBatteryStatus(); // Initial check
      });
    }
  }

  // MEDIUM PRIORITY: ENHANCED MOBILE FEATURES

  // Mobile-specific performance optimizations
  if (isMobile) {
    // Disable parallax on mobile for better performance
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.style.backgroundAttachment = "scroll";
    }

    // Optimize AOS animations for mobile
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 400,
        easing: "ease-out",
        once: true,
        offset: 50,
        disable: "phone", // Disable on very small screens
      });
    }

    // Mobile-specific image lazy loading
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px", // Load images 50px before they come into view
      }
    );

    images.forEach((img) => imageObserver.observe(img));

    // Mobile viewport height fix for iOS
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);

    // Mobile-specific form enhancements
    document.querySelectorAll("input, textarea, select").forEach((input) => {
      // Prevent zoom on iOS when focusing inputs
      input.addEventListener("focus", function () {
        if (this.type !== "file") {
          this.style.fontSize = "16px";
        }
      });

      // Restore original font size on blur
      input.addEventListener("blur", function () {
        this.style.fontSize = "";
      });
    });

    // Mobile swipe detection for future carousel features
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - could be used for navigation
          console.log("Swipe left detected");
        } else {
          // Swipe right - could be used for navigation
          console.log("Swipe right detected");
        }
      }
    }

    // Mobile-specific error handling
    window.addEventListener("error", function (e) {
      console.warn("Mobile error detected:", e.message);
      // Could send error reports to analytics
    });

    // Mobile network detection
    if ("connection" in navigator) {
      const connection = navigator.connection;

      if (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
      ) {
        // Reduce animations and effects for slow connections
        document.body.classList.add("slow-connection");
      }

      connection.addEventListener("change", function () {
        if (
          connection.effectiveType === "slow-2g" ||
          connection.effectiveType === "2g"
        ) {
          document.body.classList.add("slow-connection");
        } else {
          document.body.classList.remove("slow-connection");
        }
      });
    }
  }

  // Enhanced touch feedback for all interactive elements
  if (isTouch) {
    document
      .querySelectorAll("a, button, .btn, .glass-card, .social-icon, .nav-link")
      .forEach((element) => {
        element.addEventListener(
          "touchstart",
          function () {
            this.classList.add("touch-active");
          },
          { passive: true }
        );

        element.addEventListener(
          "touchend",
          function () {
            setTimeout(() => {
              this.classList.remove("touch-active");
            }, 150);
          },
          { passive: true }
        );

        element.addEventListener(
          "touchcancel",
          function () {
            this.classList.remove("touch-active");
          },
          { passive: true }
        );
      });
  }

  // Mobile-specific WhatsApp enhancements
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.addEventListener("click", function () {
      // Add visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Haptic feedback if available
      if (navigator.vibrate && isMobile) {
        navigator.vibrate(50);
      }
    });
  });
}); // Close the main DOMContentLoaded event listener
// LOW PRIORITY TASK #2: ADVANCED MOBILE JAVASCRIPT OPTIMIZATIONS

if (isMobile) {
  // Advanced touch gesture recognition
  class MobileGestureHandler {
    constructor() {
      this.touchStartTime = 0;
      this.touchStartPos = { x: 0, y: 0 };
      this.touchEndPos = { x: 0, y: 0 };
      this.isLongPress = false;
      this.longPressTimer = null;
      this.tapCount = 0;
      this.tapTimer = null;

      this.init();
    }

    init() {
      document.addEventListener(
        "touchstart",
        this.handleTouchStart.bind(this),
        { passive: false }
      );
      document.addEventListener("touchmove", this.handleTouchMove.bind(this), {
        passive: false,
      });
      document.addEventListener("touchend", this.handleTouchEnd.bind(this), {
        passive: false,
      });
    }

    handleTouchStart(e) {
      const touch = e.touches[0];
      this.touchStartTime = Date.now();
      this.touchStartPos = { x: touch.clientX, y: touch.clientY };
      this.isLongPress = false;

      // Long press detection
      this.longPressTimer = setTimeout(() => {
        this.isLongPress = true;
        this.handleLongPress(e);
      }, 500);
    }

    handleTouchMove(e) {
      // Cancel long press if user moves finger
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer);
        this.longPressTimer = null;
      }
    }

    handleTouchEnd(e) {
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer);
        this.longPressTimer = null;
      }

      if (this.isLongPress) return;

      const touch = e.changedTouches[0];
      this.touchEndPos = { x: touch.clientX, y: touch.clientY };

      const touchDuration = Date.now() - this.touchStartTime;
      const distance = this.calculateDistance();

      // Tap detection
      if (touchDuration < 300 && distance < 10) {
        this.handleTap(e);
      }

      // Swipe detection
      if (distance > 50) {
        this.handleSwipe(e);
      }
    }

    calculateDistance() {
      const dx = this.touchEndPos.x - this.touchStartPos.x;
      const dy = this.touchEndPos.y - this.touchStartPos.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    handleTap(e) {
      this.tapCount++;

      if (this.tapTimer) {
        clearTimeout(this.tapTimer);
      }

      this.tapTimer = setTimeout(() => {
        if (this.tapCount === 1) {
          this.handleSingleTap(e);
        } else if (this.tapCount === 2) {
          this.handleDoubleTap(e);
        }
        this.tapCount = 0;
      }, 300);
    }

    handleSingleTap(e) {
      // Add ripple effect to tapped element
      const target = e.target.closest(".glass-card, .btn, .social-icon");
      if (target) {
        this.addRippleEffect(target, this.touchStartPos);
      }
    }

    handleDoubleTap(e) {
      // Double tap to scroll to top
      if (window.pageYOffset > 200) {
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate([50, 50, 50]);
        }
      }
    }

    handleLongPress(e) {
      const target = e.target.closest(".glass-card");
      if (target) {
        // Add long press visual feedback
        target.classList.add("long-pressed");
        setTimeout(() => target.classList.remove("long-pressed"), 1000);

        // Haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }
      }
    }

    handleSwipe(e) {
      const dx = this.touchEndPos.x - this.touchStartPos.x;
      const dy = this.touchEndPos.y - this.touchStartPos.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0) {
          this.handleSwipeRight(e);
        } else {
          this.handleSwipeLeft(e);
        }
      } else {
        // Vertical swipe
        if (dy > 0) {
          this.handleSwipeDown(e);
        } else {
          this.handleSwipeUp(e);
        }
      }
    }

    handleSwipeLeft(e) {
      // Could be used for navigation or card actions
      const target = e.target.closest(".glass-card");
      if (target) {
        target.style.transform = "translateX(-10px)";
        setTimeout(() => (target.style.transform = ""), 200);
      }
    }

    handleSwipeRight(e) {
      // Could be used for navigation or card actions
      const target = e.target.closest(".glass-card");
      if (target) {
        target.style.transform = "translateX(10px)";
        setTimeout(() => (target.style.transform = ""), 200);
      }
    }

    handleSwipeUp(e) {
      // Quick scroll up
      window.scrollBy({ top: -200, behavior: "smooth" });
    }

    handleSwipeDown(e) {
      // Quick scroll down
      window.scrollBy({ top: 200, behavior: "smooth" });
    }

    addRippleEffect(element, position) {
      const ripple = document.createElement("div");
      ripple.className = "mobile-ripple-effect";

      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = position.x - rect.left - size / 2;
      const y = position.y - rect.top - size / 2;

      ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: mobileRipple 0.6s ease-out;
          pointer-events: none;
          z-index: 1000;
        `;

      element.style.position = "relative";
      element.style.overflow = "hidden";
      element.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    }
  }

  // Initialize gesture handler
  new MobileGestureHandler();

  // Advanced mobile performance monitoring
  class MobilePerformanceMonitor {
    constructor() {
      this.metrics = {
        loadTime: 0,
        scrollPerformance: [],
        memoryUsage: [],
        batteryLevel: null,
        connectionType: null,
      };

      this.init();
    }

    init() {
      this.monitorPageLoad();
      this.monitorScrollPerformance();
      this.monitorMemoryUsage();
      this.monitorBattery();
      this.monitorConnection();
    }

    monitorPageLoad() {
      window.addEventListener("load", () => {
        this.metrics.loadTime = performance.now();

        if (this.metrics.loadTime > 3000) {
          console.warn(
            "Slow page load detected:",
            this.metrics.loadTime + "ms"
          );
          this.optimizeForSlowLoading();
        }
      });
    }

    monitorScrollPerformance() {
      let scrollStart = 0;
      let frameCount = 0;

      const scrollHandler = () => {
        if (scrollStart === 0) {
          scrollStart = performance.now();
          frameCount = 0;
        }

        frameCount++;

        // Check FPS every 100 frames
        if (frameCount >= 100) {
          const scrollEnd = performance.now();
          const duration = scrollEnd - scrollStart;
          const fps = (frameCount / duration) * 1000;

          this.metrics.scrollPerformance.push(fps);

          if (fps < 30) {
            console.warn("Low scroll FPS detected:", fps);
            this.optimizeForLowFPS();
          }

          scrollStart = 0;
        }
      };

      window.addEventListener("scroll", scrollHandler, { passive: true });
    }

    monitorMemoryUsage() {
      if ("memory" in performance) {
        setInterval(() => {
          const memory = performance.memory;
          const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);

          this.metrics.memoryUsage.push(usedMB);

          if (usedMB > 100) {
            console.warn("High memory usage:", usedMB + "MB");
            this.optimizeForHighMemory();
          }
        }, 30000);
      }
    }

    monitorBattery() {
      if ("getBattery" in navigator) {
        navigator.getBattery().then((battery) => {
          this.metrics.batteryLevel = battery.level;

          const updateBattery = () => {
            this.metrics.batteryLevel = battery.level;

            if (battery.level < 0.2 && !battery.charging) {
              this.optimizeForLowBattery();
            }
          };

          battery.addEventListener("levelchange", updateBattery);
          battery.addEventListener("chargingchange", updateBattery);
        });
      }
    }

    monitorConnection() {
      if ("connection" in navigator) {
        const connection = navigator.connection;
        this.metrics.connectionType = connection.effectiveType;

        connection.addEventListener("change", () => {
          this.metrics.connectionType = connection.effectiveType;

          if (
            connection.effectiveType === "slow-2g" ||
            connection.effectiveType === "2g"
          ) {
            this.optimizeForSlowConnection();
          }
        });
      }
    }

    optimizeForSlowLoading() {
      document.body.classList.add("slow-loading");

      // Reduce animation complexity
      document.querySelectorAll(".fade-in, .slide-in-up").forEach((el) => {
        el.style.animationDuration = "0.3s";
      });
    }

    optimizeForLowFPS() {
      document.body.classList.add("low-fps");

      // Disable parallax and complex animations
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        heroSection.style.backgroundAttachment = "scroll";
      }
    }

    optimizeForHighMemory() {
      // Clear unused event listeners and observers
      console.log("Optimizing for high memory usage");

      // Could implement memory cleanup here
    }

    optimizeForLowBattery() {
      document.body.classList.add("low-battery");

      // Reduce animations and effects
      document
        .querySelectorAll(".mobile-pulse, .mobile-float")
        .forEach((el) => {
          el.style.animationPlayState = "paused";
        });
    }

    optimizeForSlowConnection() {
      document.body.classList.add("slow-connection");

      // Disable auto-playing animations
      document.querySelectorAll("video, .auto-play").forEach((el) => {
        if (el.pause) el.pause();
      });
    }

    getMetrics() {
      return this.metrics;
    }
  }

  // Initialize performance monitor
  const performanceMonitor = new MobilePerformanceMonitor();

  // Mobile-specific utility functions
  const MobileUtils = {
    // Detect if device is in landscape mode
    isLandscape() {
      return window.innerWidth > window.innerHeight;
    },

    // Get device pixel ratio
    getPixelRatio() {
      return window.devicePixelRatio || 1;
    },

    // Check if device supports touch
    supportsTouch() {
      return "ontouchstart" in window;
    },

    // Get viewport dimensions
    getViewport() {
      return {
        width: Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        ),
        height: Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        ),
      };
    },

    // Throttle function for performance
    throttle(func, limit) {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    },

    // Debounce function for performance
    debounce(func, wait, immediate) {
      let timeout;
      return function () {
        const context = this,
          args = arguments;
        const later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },

    // Add haptic feedback
    hapticFeedback(pattern = 50) {
      if (navigator.vibrate) {
        navigator.vibrate(pattern);
      }
    },

    // Show mobile toast notification
    showToast(message, duration = 3000) {
      const toast = document.createElement("div");
      toast.className = "mobile-toast";
      toast.textContent = message;
      toast.style.cssText = `
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 14px;
          z-index: 10000;
          animation: mobileToastSlideIn 0.3s ease-out;
        `;

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = "mobileToastSlideOut 0.3s ease-in";
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },
  };

  // Make MobileUtils globally available
  window.MobileUtils = MobileUtils;

  // Advanced mobile event listeners

  // Handle device orientation changes
  window.addEventListener(
    "orientationchange",
    MobileUtils.debounce(() => {
      // Recalculate layout after orientation change
      setTimeout(() => {
        const viewport = MobileUtils.getViewport();
        document.documentElement.style.setProperty(
          "--viewport-width",
          viewport.width + "px"
        );
        document.documentElement.style.setProperty(
          "--viewport-height",
          viewport.height + "px"
        );

        // Trigger custom event for other components
        window.dispatchEvent(
          new CustomEvent("mobileOrientationChanged", {
            detail: {
              isLandscape: MobileUtils.isLandscape(),
              viewport: viewport,
            },
          })
        );
      }, 100);
    }, 250)
  );

  // Handle visibility changes (app backgrounding)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // App is backgrounded - pause animations
      document.body.classList.add("app-backgrounded");
    } else {
      // App is foregrounded - resume animations
      document.body.classList.remove("app-backgrounded");
    }
  });

  // Initialize mobile-specific features
  console.log("Advanced mobile optimizations initialized");
}
// FIXED: Simple and Effective Mobile Gesture Recognition
if (isMobile) {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let tapCount = 0;
  let tapTimer = null;

  // Simple tap and gesture detection
  document.addEventListener(
    "touchstart",
    function (e) {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();

      console.log("Touch started at:", touchStartX, touchStartY); // Debug log
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    function (e) {
      const touch = e.changedTouches[0];
      const touchEndX = touch.clientX;
      const touchEndY = touch.clientY;
      const touchEndTime = Date.now();

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const deltaTime = touchEndTime - touchStartTime;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      console.log("Touch ended. Distance:", distance, "Time:", deltaTime); // Debug log

      // Tap detection (short touch with minimal movement)
      if (distance < 20 && deltaTime < 300) {
        handleTap(e, touch);
      }

      // Swipe detection (longer distance)
      if (distance > 50 && deltaTime < 500) {
        handleSwipe(deltaX, deltaY, e);
      }

      // Long press detection
      if (distance < 20 && deltaTime > 500) {
        handleLongPress(e, touch);
      }
    },
    { passive: true }
  );

  function handleTap(e, touch) {
    tapCount++;
    console.log("Tap detected! Count:", tapCount); // Debug log

    // Clear existing timer
    if (tapTimer) {
      clearTimeout(tapTimer);
    }

    // Set timer to detect single vs double tap
    tapTimer = setTimeout(() => {
      if (tapCount === 1) {
        handleSingleTap(e, touch);
      } else if (tapCount >= 2) {
        handleDoubleTap(e, touch);
      }
      tapCount = 0;
    }, 300);
  }

  function handleSingleTap(e, touch) {
    console.log("Single tap detected!"); // Debug log

    // Add ripple effect to tapped element
    const target = e.target.closest(".glass-card, .btn, .social-icon");
    if (target) {
      addRippleEffect(target, touch);

      // Show visual feedback
      MobileUtils.showToast("Single tap detected!", 1000);
    }
  }

  function handleDoubleTap(e, touch) {
    console.log("Double tap detected!"); // Debug log

    // Scroll to top on double tap
    if (window.pageYOffset > 200) {
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 50]);
      }

      // Show feedback
      MobileUtils.showToast("Scrolled to top!", 1500);
    }
  }

  function handleLongPress(e, touch) {
    console.log("Long press detected!"); // Debug log

    const target = e.target.closest(".glass-card, .btn, .social-icon");
    if (target) {
      // Add visual feedback
      target.style.transform = "scale(0.95)";
      target.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.5)";

      setTimeout(() => {
        target.style.transform = "";
        target.style.boxShadow = "";
      }, 1000);

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }

      // Show feedback
      MobileUtils.showToast("Long press detected!", 1500);
    }
  }

  function handleSwipe(deltaX, deltaY, e) {
    const target = e.target.closest(".glass-card");

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        console.log("Swipe right detected!"); // Debug log
        if (target) {
          target.style.transform = "translateX(10px)";
          setTimeout(() => (target.style.transform = ""), 200);
        }
        MobileUtils.showToast("Swiped right!", 1000);
      } else {
        console.log("Swipe left detected!"); // Debug log
        if (target) {
          target.style.transform = "translateX(-10px)";
          setTimeout(() => (target.style.transform = ""), 200);
        }
        MobileUtils.showToast("Swiped left!", 1000);
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        console.log("Swipe down detected!"); // Debug log
        window.scrollBy({ top: 200, behavior: "smooth" });
        MobileUtils.showToast("Swiped down!", 1000);
      } else {
        console.log("Swipe up detected!"); // Debug log
        window.scrollBy({ top: -200, behavior: "smooth" });
        MobileUtils.showToast("Swiped up!", 1000);
      }
    }
  }

  function addRippleEffect(element, touch) {
    const ripple = document.createElement("div");
    ripple.className = "mobile-ripple-effect";

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = touch.clientX - rect.left - size / 2;
    const y = touch.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: mobileRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
      `;

    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  console.log("Simple gesture recognition initialized!"); // Debug log
}
// Mobile Utils for gesture feedback
if (isMobile) {
  window.MobileUtils = {
    // Show mobile toast notification
    showToast(message, duration = 3000) {
      const toast = document.createElement("div");
      toast.className = "mobile-toast";
      toast.textContent = message;
      toast.style.cssText = `
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 14px;
          z-index: 10000;
          animation: mobileToastSlideIn 0.3s ease-out;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          font-weight: 500;
          letter-spacing: 0.5px;
        `;

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = "mobileToastSlideOut 0.3s ease-in";
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },

    // Add haptic feedback
    hapticFeedback(pattern = 50) {
      if (navigator.vibrate) {
        navigator.vibrate(pattern);
      }
    },
  };
}
// LOW PRIORITY TASK #3: FINAL MOBILE POLISH & MICRO-INTERACTIONS

if (isMobile) {
  // Advanced Micro-interactions Manager
  class MicroInteractionsManager {
    constructor() {
      this.init();
    }

    init() {
      this.initButtonInteractions();
      this.initFormValidation();
      this.initProgressiveImages();
      this.initPullToRefresh();
      this.initScrollIndicator();
      this.initNotificationSystem();
      this.initLoadingStates();
      console.log("Micro-interactions initialized");
    }

    // Enhanced button interactions
    initButtonInteractions() {
      document.querySelectorAll(".btn").forEach((btn) => {
        btn.classList.add("btn-premium");

        // Add magnetic effect on hover/touch
        btn.addEventListener("touchstart", (e) => {
          btn.classList.add("btn-magnetic");
          this.createRipple(e, btn);
        });

        btn.addEventListener("touchend", () => {
          setTimeout(() => btn.classList.remove("btn-magnetic"), 300);
        });
      });

      // Apply premium styling to cards
      document.querySelectorAll(".glass-card").forEach((card) => {
        card.classList.add("glass-card-premium");
      });
    }

    // Create ripple effect
    createRipple(e, element) {
      const ripple = document.createElement("span");
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.touches[0].clientX - rect.left - size / 2;
      const y = e.touches[0].clientY - rect.top - size / 2;

      ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: rippleEffect 0.6s ease-out;
          pointer-events: none;
        `;

      element.style.position = "relative";
      element.style.overflow = "hidden";
      element.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    }

    // Enhanced form validation
    initFormValidation() {
      document.querySelectorAll(".form-control").forEach((input) => {
        input.classList.add("form-control-premium");

        input.addEventListener("blur", () => {
          this.validateField(input);
        });

        input.addEventListener("input", () => {
          if (input.classList.contains("invalid")) {
            this.validateField(input);
          }
        });
      });
    }

    validateField(input) {
      const isValid = input.checkValidity();

      input.classList.remove("valid", "invalid");

      if (input.value.length > 0) {
        if (isValid) {
          input.classList.add("valid");
          this.showFieldSuccess(input);
        } else {
          input.classList.add("invalid");
          this.showFieldError(input);
        }
      }
    }

    showFieldSuccess(input) {
      // Add success indicator
      let indicator = input.parentNode.querySelector(".field-indicator");
      if (!indicator) {
        indicator = document.createElement("div");
        indicator.className = "field-indicator";
        input.parentNode.appendChild(indicator);
      }

      indicator.innerHTML = `
          <div class="success-checkmark">
            <svg viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
        `;

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }

    showFieldError(input) {
      // Add error indicator
      let indicator = input.parentNode.querySelector(".field-indicator");
      if (!indicator) {
        indicator = document.createElement("div");
        indicator.className = "field-indicator";
        input.parentNode.appendChild(indicator);
      }

      indicator.innerHTML = '<div class="error-indicator"></div>';

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 50]);
      }
    }

    // Progressive image loading
    initProgressiveImages() {
      const images = document.querySelectorAll("img");

      images.forEach((img) => {
        if (img.dataset.src || img.src) {
          img.parentNode.classList.add("progressive-image");

          // Create low-res placeholder
          const placeholder = new Image();
          placeholder.src = this.generatePlaceholder(
            img.width || 300,
            img.height || 200
          );

          img.addEventListener("load", () => {
            img.parentNode.classList.add("loaded");
          });
        }
      });
    }

    generatePlaceholder(width, height) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // Create gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#f0f0f0");
      gradient.addColorStop(1, "#e0e0e0");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      return canvas.toDataURL();
    }

    // Pull to refresh functionality
    initPullToRefresh() {
      let startY = 0;
      let currentY = 0;
      let pullDistance = 0;
      let isPulling = false;

      const refreshElement = document.createElement("div");
      refreshElement.className = "pull-to-refresh";
      refreshElement.innerHTML = '<i class="bi bi-arrow-clockwise"></i>';
      document.body.appendChild(refreshElement);

      document.addEventListener("touchstart", (e) => {
        if (window.pageYOffset === 0) {
          startY = e.touches[0].clientY;
          isPulling = true;
        }
      });

      document.addEventListener("touchmove", (e) => {
        if (!isPulling) return;

        currentY = e.touches[0].clientY;
        pullDistance = currentY - startY;

        if (pullDistance > 0 && pullDistance < 100) {
          refreshElement.style.top = `${-60 + pullDistance}px`;
          refreshElement.style.transform = `translateX(-50%) rotate(${
            pullDistance * 3.6
          }deg)`;
        }
      });

      document.addEventListener("touchend", () => {
        if (isPulling && pullDistance > 60) {
          this.triggerRefresh(refreshElement);
        } else {
          refreshElement.style.top = "-60px";
          refreshElement.style.transform = "translateX(-50%) rotate(0deg)";
        }

        isPulling = false;
        pullDistance = 0;
      });
    }

    triggerRefresh(element) {
      element.classList.add("active");
      element.style.top = "20px";

      // Simulate refresh
      setTimeout(() => {
        element.classList.remove("active");
        element.style.top = "-60px";
        element.style.transform = "translateX(-50%) rotate(0deg)";

        this.showNotification("Page refreshed!", "success");
      }, 2000);
    }

    // Scroll indicator
    initScrollIndicator() {
      const indicator = document.createElement("div");
      indicator.className = "scroll-indicator";
      document.body.appendChild(indicator);

      window.addEventListener("scroll", () => {
        const scrollPercent =
          (window.pageYOffset /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        indicator.style.setProperty("--scroll-percent", `${scrollPercent}%`);
        indicator.querySelector("::after").style.top = `${scrollPercent}%`;
      });
    }

    // Notification system
    initNotificationSystem() {
      this.notificationContainer = document.createElement("div");
      this.notificationContainer.id = "notification-container";
      this.notificationContainer.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          pointer-events: none;
        `;
      document.body.appendChild(this.notificationContainer);
    }

    showNotification(message, type = "info", duration = 3000) {
      const notification = document.createElement("div");
      notification.className = `notification-slide ${type}`;
      notification.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-weight: 600; flex: 1;">${message}</div>
            <button onclick="this.parentNode.parentNode.remove()" style="background: none; border: none; font-size: 18px; cursor: pointer;">&times;</button>
          </div>
        `;

      this.notificationContainer.appendChild(notification);

      // Trigger animation
      setTimeout(() => notification.classList.add("show"), 100);

      // Auto remove
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 400);
      }, duration);

      // Haptic feedback
      if (navigator.vibrate) {
        const pattern =
          type === "success" ? [50] : type === "error" ? [50, 50, 50] : [30];
        navigator.vibrate(pattern);
      }
    }

    // Loading states manager
    initLoadingStates() {
      // Add skeleton loading to cards
      document.querySelectorAll(".glass-card").forEach((card) => {
        const content = card.innerHTML;

        // Create skeleton version
        const skeleton = document.createElement("div");
        skeleton.className = "skeleton";
        skeleton.style.cssText = `
            width: 100%;
            height: 200px;
            margin-bottom: 1rem;
          `;

        // Simulate loading
        if (Math.random() > 0.7) {
          // 30% chance to show loading
          card.innerHTML = "";
          card.appendChild(skeleton);

          setTimeout(() => {
            card.innerHTML = content;
            card.classList.add("elastic-bounce");
          }, 1000 + Math.random() * 2000);
        }
      });
    }

    // Morphing button states
    morphButton(button, state) {
      button.classList.remove("loading", "success", "error");

      switch (state) {
        case "loading":
          button.classList.add("btn-morph", "loading");
          button.innerHTML =
            '<div class="loading-dots"><span></span><span></span><span></span></div>';
          break;

        case "success":
          button.classList.add("btn-morph", "success");
          button.innerHTML = `
              <div class="success-checkmark">
                <svg viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
            `;
          break;

        case "error":
          button.classList.add("btn-morph", "error");
          button.innerHTML = '<div class="error-indicator"></div>';
          break;
      }
    }

    // Card flip animation
    flipCard(card) {
      card.classList.add("card-flip");

      if (!card.querySelector(".card-flip-inner")) {
        const inner = document.createElement("div");
        inner.className = "card-flip-inner";

        const front = document.createElement("div");
        front.className = "card-flip-front";
        front.innerHTML = card.innerHTML;

        const back = document.createElement("div");
        back.className = "card-flip-back";
        back.innerHTML =
          '<div style="padding: 2rem; text-align: center;"><h3>Flipped!</h3><p>This is the back of the card.</p></div>';

        inner.appendChild(front);
        inner.appendChild(back);

        card.innerHTML = "";
        card.appendChild(inner);
      }

      card.classList.toggle("flipped");
    }
  }

  // Initialize micro-interactions
  const microInteractions = new MicroInteractionsManager();

  // Make functions globally available
  window.MicroInteractions = {
    showNotification: (message, type, duration) =>
      microInteractions.showNotification(message, type, duration),
    morphButton: (button, state) =>
      microInteractions.morphButton(button, state),
    flipCard: (card) => microInteractions.flipCard(card),
  };

  // Add CSS for ripple effect
  const style = document.createElement("style");
  style.textContent = `
      @keyframes rippleEffect {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          transform: scale(1);
          opacity: 0;
        }
      }
    `;
  document.head.appendChild(style);

  console.log("Final mobile polish initialized!");
}
// PWA Features & Offline Support
if (isMobile) {
  // Service Worker Registration
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New content available
                MobileUtils.showToast(
                  "New version available! Refresh to update.",
                  5000
                );
              }
            });
          });
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }

  // Install prompt handling
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show install button after 30 seconds
    setTimeout(() => {
      showInstallPrompt();
    }, 30000);
  });

  function showInstallPrompt() {
    if (deferredPrompt) {
      const installBanner = document.createElement("div");
      installBanner.className = "install-banner";
      installBanner.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px; padding: 16px; background: var(--primary); color: white; border-radius: var(--radius-lg); margin: 1rem; box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);">
            <div style="flex: 1;">
              <strong>Install DukeOps App</strong>
              <div style="font-size: 0.9rem; opacity: 0.9;">Get quick access and offline support</div>
            </div>
            <button onclick="installApp()" style="background: white; color: var(--primary); border: none; padding: 8px 16px; border-radius: var(--radius); font-weight: 600;">Install</button>
            <button onclick="this.parentNode.parentNode.remove()" style="background: none; border: none; color: white; font-size: 20px;">&times;</button>
          </div>
        `;

      document.body.appendChild(installBanner);
    }
  }

  window.installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((result) => {
        if (result.outcome === "accepted") {
          console.log("User accepted the install prompt");
          MobileUtils.showToast("App installed successfully!", 3000);
        }
        deferredPrompt = null;
      });

      // Remove banner
      document.querySelector(".install-banner")?.remove();
    }
  };

  // Offline/Online status
  function updateOnlineStatus() {
    const status = navigator.onLine ? "online" : "offline";
    document.body.classList.toggle("offline", !navigator.onLine);

    if (!navigator.onLine) {
      MobileUtils.showToast(
        "You are offline. Some features may be limited.",
        4000
      );
    } else {
      MobileUtils.showToast("Connection restored!", 2000);
    }
  }

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  // Background sync for forms
  if (
    "serviceWorker" in navigator &&
    "sync" in window.ServiceWorkerRegistration.prototype
  ) {
    // Register background sync
    navigator.serviceWorker.ready.then((registration) => {
      document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", (e) => {
          if (!navigator.onLine) {
            e.preventDefault();

            // Store form data for background sync
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            localStorage.setItem("pendingFormSubmission", JSON.stringify(data));

            // Register background sync
            registration.sync.register("background-sync");

            MobileUtils.showToast("Form saved. Will submit when online.", 3000);
          }
        });
      });
    });
  }

  // Push notifications (optional)
  if ("Notification" in window && "serviceWorker" in navigator) {
    // Request notification permission after user interaction
    document.addEventListener("click", requestNotificationPermission, {
      once: true,
    });
  }

  function requestNotificationPermission() {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
          // Could subscribe to push notifications here
        }
      });
    }
  }

  // App-like behavior enhancements

  // Prevent zoom on double tap (iOS)
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    (e) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );

  // Hide address bar on scroll (mobile browsers)
  let ticking = false;
  function hideAddressBar() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.pageYOffset > 50) {
          document.body.classList.add("scrolled");
        } else {
          document.body.classList.remove("scrolled");
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", hideAddressBar, { passive: true });

  // Splash screen handling
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.add("app-loaded");
    }, 1000);
  });

  console.log("PWA features initialized");
}
// BLACK & GOLD THEME JAVASCRIPT UPDATES

if (isMobile) {
  // Update dynamic colors for black & gold theme
  const updateThemeColors = () => {
    // Update CSS custom properties for dynamic elements
    document.documentElement.style.setProperty("--dynamic-primary", "#d4af37");
    document.documentElement.style.setProperty(
      "--dynamic-secondary",
      "#1a1a1a"
    );
    document.documentElement.style.setProperty("--dynamic-accent", "#ffd700");

    // Update ripple effects to use gold
    const style = document.createElement("style");
    style.textContent = `
        .mobile-ripple-effect {
          background: rgba(212, 175, 55, 0.4) !important;
        }
        
        @keyframes mobileRipple {
          from {
            transform: scale(0);
            opacity: 1;
            background: rgba(212, 175, 55, 0.6);
          }
          to {
            transform: scale(1);
            opacity: 0;
            background: rgba(212, 175, 55, 0.1);
          }
        }
        
        .success-checkmark {
          background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%) !important;
          color: #000000 !important;
        }
        
        .mobile-toast {
          background: rgba(0, 0, 0, 0.95) !important;
          color: #d4af37 !important;
          border: 1px solid rgba(212, 175, 55, 0.3) !important;
        }
        
        .pull-to-refresh {
          background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%) !important;
          color: #000000 !important;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4) !important;
        }
        
        .loading-dots span {
          background: #d4af37 !important;
        }
        
        .progress-glow::after {
          background: linear-gradient(90deg, #d4af37, #ffd700) !important;
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.6) !important;
        }
        
        .notification-slide.success {
          border-left: 4px solid #d4af37 !important;
          background: linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(0, 0, 0, 0.9)) !important;
          color: #f5f3f0 !important;
        }
        
        .notification-slide.info {
          border-left: 4px solid #d4af37 !important;
          background: linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(0, 0, 0, 0.9)) !important;
          color: #f5f3f0 !important;
        }
        
        .btn-premium:active {
          box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4) !important;
        }
        
        .glass-card-premium:active {
          box-shadow: 0 15px 35px rgba(212, 175, 55, 0.2) !important;
        }
        
        .fab-pulse {
          box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7) !important;
        }
        
        @keyframes fabPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
          }
        }
        
        .long-pressed {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.6) !important;
        }
        
        .scroll-indicator {
          background: rgba(212, 175, 55, 0.2) !important;
        }
        
        .scroll-indicator::after {
          background: #d4af37 !important;
        }
        
        .install-banner div {
          background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%) !important;
          color: #000000 !important;
        }
        
        .install-banner button {
          background: #000000 !important;
          color: #d4af37 !important;
          border: 1px solid #d4af37 !important;
        }
        
        .install-banner button:hover {
          background: #d4af37 !important;
          color: #000000 !important;
        }
        
        .pwa-splash img {
          box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7) !important;
        }
        
        @keyframes splashPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(212, 175, 55, 0);
          }
        }
      `;
    document.head.appendChild(style);
  };

  // Apply theme colors
  updateThemeColors();

  // Update MobileUtils.showToast to use black & gold theme
  if (window.MobileUtils) {
    const originalShowToast = window.MobileUtils.showToast;
    window.MobileUtils.showToast = function (message, duration = 3000) {
      const toast = document.createElement("div");
      toast.className = "mobile-toast";
      toast.textContent = message;
      toast.style.cssText = `
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.95);
          color: #d4af37;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 14px;
          z-index: 10000;
          animation: mobileToastSlideIn 0.3s ease-out;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          font-weight: 500;
          letter-spacing: 0.5px;
          border: 1px solid rgba(212, 175, 55, 0.3);
        `;

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = "mobileToastSlideOut 0.3s ease-in";
        setTimeout(() => toast.remove(), 300);
      }, duration);
    };
  }

  // Update notification colors in MicroInteractions
  if (window.MicroInteractions) {
    const originalShowNotification = window.MicroInteractions.showNotification;
    window.MicroInteractions.showNotification = function (
      message,
      type = "info",
      duration = 3000
    ) {
      const notification = document.createElement("div");
      notification.className = `notification-slide ${type}`;

      let borderColor = "#d4af37";
      if (type === "success") borderColor = "#10b981";
      if (type === "error") borderColor = "#ef4444";

      notification.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px; background: linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(0, 0, 0, 0.9)); color: #f5f3f0; border-left: 4px solid ${borderColor}; padding: 16px; border-radius: var(--radius-lg); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);">
            <div style="font-weight: 600; flex: 1;">${message}</div>
            <button onclick="this.parentNode.parentNode.remove()" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #d4af37;">&times;</button>
          </div>
        `;

      if (!this.notificationContainer) {
        this.notificationContainer = document.createElement("div");
        this.notificationContainer.id = "notification-container";
        this.notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
          `;
        document.body.appendChild(this.notificationContainer);
      }

      this.notificationContainer.appendChild(notification);

      // Trigger animation
      setTimeout(() => notification.classList.add("show"), 100);

      // Auto remove
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 400);
      }, duration);

      // Haptic feedback
      if (navigator.vibrate) {
        const pattern =
          type === "success" ? [50] : type === "error" ? [50, 50, 50] : [30];
        navigator.vibrate(pattern);
      }
    };
  }

  console.log("Black & Gold theme applied to JavaScript elements");
}
