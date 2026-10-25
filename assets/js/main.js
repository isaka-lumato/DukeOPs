/**
 * DukeOps Tanzania — Production Frontend Controller
 * Handles navigation, scroll state, hardware catalog filtering, persistent
 * multi-item quote list, URL parameter pre-filling, and accessible form workflows.
 */

(function () {
  "use strict";

  const WHATSAPP_NUMBER = "255699669959";
  const COMPANY_EMAIL = "info@dukeops.co.tz";
  const QUOTE_STORAGE_KEY = "dukeops_quote_list_v1";
  const QUOTE_NOTES_KEY = "dukeops_quote_notes_v1";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    document.documentElement.classList.add("js-ready");
  }

  /* --------------------------------------------------------------------------
     Utilities & Quote State Management
     -------------------------------------------------------------------------- */

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function buildMailtoUrl(subject, body) {
    return `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  function loadQuoteList() {
    try {
      const raw = localStorage.getItem(QUOTE_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveQuoteList(items) {
    try {
      localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(items));
    } catch (_) {
      // Ignore storage quota errors in private browsing
    }
  }

  function loadQuoteNotes() {
    try {
      return localStorage.getItem(QUOTE_NOTES_KEY) || "";
    } catch (_) {
      return "";
    }
  }

  function saveQuoteNotes(notes) {
    try {
      localStorage.setItem(QUOTE_NOTES_KEY, notes);
    } catch (_) {
      // Ignore storage errors
    }
  }

  function formatQuoteItemsText(items, notes) {
    const lines = [
      "Hello DukeOps, I would like to request a quote for the following hardware supplies:",
      "",
    ];
    items.forEach((item, idx) => {
      lines.push(
        `${idx + 1}. ${item.title} (${item.category}) — Qty: ${item.qty}`
      );
    });
    if (notes && notes.trim()) {
      lines.push("", `Delivery / Spec Notes: ${notes.trim()}`);
    }
    lines.push("", "Please share availability and pricing. Thank you.");
    return lines.join("\n");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* --------------------------------------------------------------------------
     DOM Initialization
     -------------------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    initScrollAndReveal();
    initNavigation();
    initServiceJumpBar();
    initQuoteSystem();
    initHardwareCatalog();
    initContactForm();
    initFooterForms();
    initDynamicYear();
    initServiceWorker();
  });

  /* --------------------------------------------------------------------------
     1. Scroll Progress, Sticky Header Elevation & Reveal Animations
     -------------------------------------------------------------------------- */

  function initScrollAndReveal() {
    const scrollProgress = document.getElementById("scroll-progress");
    const navbar = document.getElementById("main-navbar");
    const waFloat = document.getElementById("whatsapp-float-btn");
    let ticking = false;

    function updateOnScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollProgress) {
        const docHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
        scrollProgress.style.width = `${pct}%`;
      }

      if (navbar) {
        navbar.classList.toggle("navbar-scrolled", scrollTop > 24);
      }

      if (waFloat) {
        const floatBar = document.getElementById("quote-floating-bar");
        const quoteBarVisible =
          floatBar && !floatBar.classList.contains("d-none");
        waFloat.classList.toggle(
          "is-visible",
          scrollTop > 320 && !quoteBarVisible
        );
      }

      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateOnScroll);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateOnScroll();

    // Progressive scroll reveal
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     2. Accessible Desktop & Mobile Navigation
     -------------------------------------------------------------------------- */

  function initNavigation() {
    const navbar = document.getElementById("main-navbar");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    const toggleIcon = menuToggle ? menuToggle.querySelector("i") : null;

    function closeMobileNav() {
      if (!mobileNav || !menuToggle) return;
      mobileNav.classList.remove("is-open");
      if (navbar) navbar.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      if (toggleIcon) {
        toggleIcon.className = "bi bi-list";
      }
    }

    function openMobileNav() {
      if (!mobileNav || !menuToggle) return;
      mobileNav.classList.add("is-open");
      if (navbar) navbar.classList.add("menu-open");
      menuToggle.setAttribute("aria-expanded", "true");
      if (toggleIcon) {
        toggleIcon.className = "bi bi-x-lg";
      }
    }

    if (menuToggle && mobileNav) {
      menuToggle.addEventListener("click", function () {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        if (expanded) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });

      mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileNav);
      });

      document.addEventListener("click", function (e) {
        if (
          mobileNav.classList.contains("is-open") &&
          !mobileNav.contains(e.target) &&
          !menuToggle.contains(e.target)
        ) {
          closeMobileNav();
        }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
          closeMobileNav();
          menuToggle.focus();
        }
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth >= 992) {
          closeMobileNav();
        }
      });
    }

    // Ensure current page active link matches URL path
    const path = window.location.pathname.split("/").pop() || "index.html";
    document
      .querySelectorAll(".nav-link, .mobile-nav__link")
      .forEach((link) => {
        const href = link.getAttribute("href");
        if (href === path || (path === "" && href === "index.html")) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        }
      });
  }

  /* --------------------------------------------------------------------------
     3. Services Page Sticky Jump Bar & Legacy Hash Mapping
     -------------------------------------------------------------------------- */

  function initServiceJumpBar() {
    // Support legacy #hse-service-section hashes alongside clean #hse hashes
    const legacyMap = {
      "#hse-service-section": "#hse",
      "#utility-service-section": "#utility",
      "#hardware-service-section": "#hardware",
      "#construction-service-section": "#construction",
    };

    if (window.location.hash && legacyMap[window.location.hash]) {
      const mapped = document.querySelector(legacyMap[window.location.hash]);
      if (mapped) {
        setTimeout(() => mapped.scrollIntoView({ behavior: "smooth" }), 60);
      }
    }

    const jumpPills = document.querySelectorAll(".jump-pill[href^='#']");
    if (!jumpPills.length || !("IntersectionObserver" in window)) return;

    const targets = Array.from(jumpPills)
      .map((pill) => document.querySelector(pill.getAttribute("href")))
      .filter(Boolean);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            jumpPills.forEach((pill) => {
              pill.classList.toggle(
                "is-active",
                pill.getAttribute("href") === id
              );
            });
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    targets.forEach((t) => sectionObserver.observe(t));
  }

  /* --------------------------------------------------------------------------
     4. Multi-Item Hardware Quote List & Slide-Over Drawer (Cross-Page)
     -------------------------------------------------------------------------- */

  let quoteDrawerEl = null;
  let quoteBackdropEl = null;
  let lastFocusedTrigger = null;

  function ensureQuoteDrawerDOM() {
    if (quoteDrawerEl) return;

    quoteBackdropEl = document.createElement("div");
    quoteBackdropEl.className = "quote-backdrop";
    quoteBackdropEl.id = "quote-backdrop";

    quoteDrawerEl = document.createElement("aside");
    quoteDrawerEl.className = "quote-drawer";
    quoteDrawerEl.id = "quote-drawer";
    quoteDrawerEl.setAttribute("role", "dialog");
    quoteDrawerEl.setAttribute("aria-modal", "true");
    quoteDrawerEl.setAttribute("aria-labelledby", "quote-drawer-title");

    quoteDrawerEl.innerHTML = `
      <div class="quote-drawer__header">
        <h2 class="quote-drawer__title" id="quote-drawer-title">
          <i class="bi bi-clipboard2-check" aria-hidden="true"></i>
          <span>Hardware Quote List</span>
        </h2>
        <button type="button" class="quote-drawer__close" id="quote-drawer-close" aria-label="Close quote list">
          <i class="bi bi-x-lg" aria-hidden="true"></i>
        </button>
      </div>
      <div class="quote-drawer__body" id="quote-drawer-body"></div>
      <div class="quote-drawer__footer" id="quote-drawer-footer"></div>
    `;

    document.body.appendChild(quoteBackdropEl);
    document.body.appendChild(quoteDrawerEl);

    quoteBackdropEl.addEventListener("click", closeQuoteDrawer);
    quoteDrawerEl
      .querySelector("#quote-drawer-close")
      .addEventListener("click", closeQuoteDrawer);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && quoteDrawerEl.classList.contains("is-open")) {
        closeQuoteDrawer();
      }
    });
  }

  function openQuoteDrawer(triggerEl) {
    ensureQuoteDrawerDOM();
    lastFocusedTrigger = triggerEl || document.activeElement;
    renderQuoteDrawerContents();
    quoteBackdropEl.classList.add("is-open");
    quoteDrawerEl.classList.add("is-open");
    document.body.style.overflow = "hidden";
    const closeBtn = quoteDrawerEl.querySelector("#quote-drawer-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeQuoteDrawer() {
    if (!quoteDrawerEl) return;
    quoteBackdropEl.classList.remove("is-open");
    quoteDrawerEl.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") {
      lastFocusedTrigger.focus();
    }
  }

  function renderQuoteDrawerContents() {
    if (!quoteDrawerEl) return;
    const body = quoteDrawerEl.querySelector("#quote-drawer-body");
    const footer = quoteDrawerEl.querySelector("#quote-drawer-footer");
    const items = loadQuoteList();
    const notes = loadQuoteNotes();

    if (!items.length) {
      body.innerHTML = `
        <div class="empty-state" style="border:none; padding: 2rem 0.5rem;">
          <div class="empty-state__icon">
            <i class="bi bi-box-seam" aria-hidden="true"></i>
          </div>
          <h3 class="empty-state__title">Your quote list is empty</h3>
          <p class="empty-state__text">
            Add tools, construction materials, or electrical supplies from our catalog to request consolidated bulk or project pricing.
          </p>
          <a href="hardware.html" class="btn btn-dark btn-sm">
            <i class="bi bi-grid-3x3-gap" aria-hidden="true"></i>
            Browse Hardware Catalog
          </a>
        </div>
      `;
      footer.innerHTML = "";
      footer.style.display = "none";
      return;
    }

    footer.style.display = "flex";

    const listHtml = items
      .map(
        (item) => `
        <div class="quote-item" data-quote-row="${escapeHtml(item.id)}">
          <div class="quote-item__info">
            <div class="quote-item__name">${escapeHtml(item.title)}</div>
            <div class="quote-item__cat">${escapeHtml(item.category)}</div>
          </div>
          <div class="qty-stepper" role="group" aria-label="Quantity for ${escapeHtml(
            item.title
          )}">
            <button type="button" data-qty-dec="${escapeHtml(
              item.id
            )}" aria-label="Decrease quantity">&minus;</button>
            <input type="number" min="1" max="9999" value="${Number(
              item.qty
            )}" data-qty-input="${escapeHtml(
          item.id
        )}" aria-label="Quantity" />
            <button type="button" data-qty-inc="${escapeHtml(
              item.id
            )}" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="quote-item__remove" data-qty-remove="${escapeHtml(
            item.id
          )}" aria-label="Remove ${escapeHtml(item.title)}">
            <i class="bi bi-trash3" aria-hidden="true"></i>
          </button>
        </div>
      `
      )
      .join("");

    body.innerHTML = `
      <div class="quote-item-list">${listHtml}</div>
      <div class="quote-drawer__notes">
        <label for="quote-delivery-notes" class="form-label">Delivery Location or Spec Notes (Optional)</label>
        <textarea id="quote-delivery-notes" class="form-control" rows="2" placeholder="e.g., Deliver to Mikocheni site, specify cable gauge or paint color...">${escapeHtml(
          notes
        )}</textarea>
      </div>
    `;

    const waUrl = buildWhatsAppUrl(formatQuoteItemsText(items, notes));
    footer.innerHTML = `
      <a href="${waUrl}" id="quote-whatsapp-submit" target="_blank" rel="noopener" class="btn btn-whatsapp btn-block">
        <i class="bi bi-whatsapp" aria-hidden="true"></i>
        Send Quote List via WhatsApp (${items.length})
      </a>
      <div style="display:flex; gap:0.5rem;">
        <a href="contact.html?service=Hardware+Supplies&from=quote" class="btn btn-outline btn-sm" style="flex:1;">
          <i class="bi bi-envelope" aria-hidden="true"></i>
          Formal Email Quote
        </a>
        <button type="button" id="quote-clear-all" class="btn btn-outline btn-sm">
          Clear List
        </button>
      </div>
    `;

    // Attach item controls
    body.querySelectorAll("[data-qty-dec]").forEach((btn) => {
      btn.addEventListener("click", function () {
        updateItemQty(this.getAttribute("data-qty-dec"), -1);
      });
    });

    body.querySelectorAll("[data-qty-inc]").forEach((btn) => {
      btn.addEventListener("click", function () {
        updateItemQty(this.getAttribute("data-qty-inc"), 1);
      });
    });

    body.querySelectorAll("[data-qty-input]").forEach((inp) => {
      inp.addEventListener("change", function () {
        const val = Math.max(1, Math.min(9999, parseInt(this.value, 10) || 1));
        setItemQty(this.getAttribute("data-qty-input"), val);
      });
    });

    body.querySelectorAll("[data-qty-remove]").forEach((btn) => {
      btn.addEventListener("click", function () {
        removeQuoteItem(this.getAttribute("data-qty-remove"));
      });
    });

    const notesEl = body.querySelector("#quote-delivery-notes");
    const waBtn = footer.querySelector("#quote-whatsapp-submit");
    if (notesEl && waBtn) {
      notesEl.addEventListener("input", function () {
        saveQuoteNotes(this.value);
        waBtn.href = buildWhatsAppUrl(
          formatQuoteItemsText(loadQuoteList(), this.value)
        );
      });
    }

    const clearBtn = footer.querySelector("#quote-clear-all");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        saveQuoteList([]);
        syncQuoteUI();
        renderQuoteDrawerContents();
      });
    }
  }

  function updateItemQty(id, delta) {
    const items = loadQuoteList();
    const target = items.find((i) => i.id === id);
    if (!target) return;
    target.qty = Math.max(1, Math.min(9999, (Number(target.qty) || 1) + delta));
    saveQuoteList(items);
    syncQuoteUI();
    renderQuoteDrawerContents();
  }

  function setItemQty(id, qty) {
    const items = loadQuoteList();
    const target = items.find((i) => i.id === id);
    if (!target) return;
    target.qty = qty;
    saveQuoteList(items);
    syncQuoteUI();
    renderQuoteDrawerContents();
  }

  function removeQuoteItem(id) {
    const items = loadQuoteList().filter((i) => i.id !== id);
    saveQuoteList(items);
    syncQuoteUI();
    renderQuoteDrawerContents();
  }

  function toggleOrAddQuoteItem(itemData) {
    const items = loadQuoteList();
    const existing = items.find((i) => i.id === itemData.id);
    if (existing) {
      existing.qty = Math.min(9999, (Number(existing.qty) || 1) + 1);
    } else {
      items.push({
        id: itemData.id,
        title: itemData.title,
        category: itemData.category,
        qty: 1,
      });
    }
    saveQuoteList(items);
    syncQuoteUI();
  }

  function syncQuoteUI() {
    const items = loadQuoteList();
    const totalDistinct = items.length;
    const totalUnits = items.reduce((sum, i) => sum + (Number(i.qty) || 1), 0);

    // Header trigger buttons
    document.querySelectorAll("[data-open-quote-drawer]").forEach((btn) => {
      const badge = btn.querySelector(".quote-tray-count");
      if (badge) badge.textContent = String(totalDistinct);

      const isHardwarePage =
        window.location.pathname.includes("hardware.html");
      if (btn.hasAttribute("data-hide-when-empty") && !isHardwarePage) {
        btn.classList.toggle("d-none", totalDistinct === 0);
      }
    });

    // Product card buttons
    document.querySelectorAll("[data-add-quote]").forEach((btn) => {
      const id = btn.getAttribute("data-item-id");
      const found = items.find((i) => i.id === id);
      if (found) {
        btn.classList.add("is-added");
        btn.innerHTML = `<i class="bi bi-check2-circle" aria-hidden="true"></i> In Quote (${found.qty})`;
      } else {
        btn.classList.remove("is-added");
        btn.innerHTML = `<i class="bi bi-plus-lg" aria-hidden="true"></i> Add to Quote`;
      }
    });

    // Floating summary bar on hardware page
    const floatBar = document.getElementById("quote-floating-bar");
    if (floatBar) {
      floatBar.classList.toggle("d-none", totalDistinct === 0);
      const summaryText = floatBar.querySelector("#quote-floating-summary");
      if (summaryText) {
        summaryText.innerHTML = `<strong>${totalDistinct} ${
          totalDistinct === 1 ? "item" : "items"
        }</strong> (${totalUnits} total qty) in quote list`;
      }
      const waFloat = document.getElementById("whatsapp-float-btn");
      if (waFloat) {
        const scrollTop =
          window.scrollY || document.documentElement.scrollTop || 0;
        waFloat.classList.toggle(
          "is-visible",
          scrollTop > 320 && totalDistinct === 0
        );
      }
    }
  }

  function initQuoteSystem() {
    document.querySelectorAll("[data-open-quote-drawer]").forEach((btn) => {
      btn.addEventListener("click", function () {
        openQuoteDrawer(this);
      });
    });

    document.querySelectorAll("[data-add-quote]").forEach((btn) => {
      btn.addEventListener("click", function () {
        toggleOrAddQuoteItem({
          id: this.getAttribute("data-item-id"),
          title: this.getAttribute("data-item-title"),
          category: this.getAttribute("data-item-category") || "Hardware",
        });
      });
    });

    syncQuoteUI();
  }

  /* --------------------------------------------------------------------------
     5. Hardware Catalog Search, Category Filter & Stock Filter
     -------------------------------------------------------------------------- */

  function initHardwareCatalog() {
    const catalogGrid = document.getElementById("hardware-catalog-grid");
    if (!catalogGrid) return;

    const searchInput = document.getElementById("catalog-search");
    const clearSearchBtn = document.getElementById("catalog-search-clear");
    const filterButtons = document.querySelectorAll("[data-category-filter]");
    const stockOnlyCheck = document.getElementById("catalog-stock-only");
    const resultsCountEl = document.getElementById("catalog-results-count");
    const emptyStateEl = document.getElementById("catalog-empty-state");
    const emptyResetBtn = document.getElementById("catalog-empty-reset");
    const emptyWhatsappBtn = document.getElementById("catalog-empty-whatsapp");

    const cards = Array.from(
      catalogGrid.querySelectorAll(".product-card[data-category]")
    );
    const categoryBlocks = Array.from(
      catalogGrid.querySelectorAll(".catalog-category-block")
    );

    let activeCategory = "all";

    // Read initial URL params (?category=tools or ?q=cement)
    const params = new URLSearchParams(window.location.search);
    const paramCat = (params.get("category") || "").toLowerCase();
    if (["tools", "materials", "electrical"].includes(paramCat)) {
      activeCategory = paramCat;
    }
    const paramQ = params.get("q");
    if (paramQ && searchInput) {
      searchInput.value = paramQ;
    }

    function applyFilters() {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      const inStockOnly = stockOnlyCheck ? stockOnlyCheck.checked : false;

      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle("d-none", query.length === 0);
      }

      filterButtons.forEach((btn) => {
        const isMatch =
          btn.getAttribute("data-category-filter") === activeCategory;
        btn.classList.toggle("is-active", isMatch);
        btn.setAttribute("aria-pressed", isMatch ? "true" : "false");
      });

      let visibleCount = 0;

      cards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        const stock = card.getAttribute("data-stock");
        const searchBlob = (
          card.getAttribute("data-search") ||
          card.textContent ||
          ""
        ).toLowerCase();

        const matchesCategory =
          activeCategory === "all" || cat === activeCategory;
        const matchesStock = !inStockOnly || stock === "in-stock";
        const matchesQuery = !query || searchBlob.includes(query);

        const show = matchesCategory && matchesStock && matchesQuery;
        card.classList.toggle("d-none", !show);
        if (show) visibleCount++;
      });

      // Hide category blocks that currently have 0 visible cards
      categoryBlocks.forEach((block) => {
        const hasVisible =
          block.querySelectorAll(".product-card:not(.d-none)").length > 0;
        block.classList.toggle("d-none", !hasVisible);
      });

      if (resultsCountEl) {
        resultsCountEl.textContent = `Showing ${visibleCount} of ${cards.length} items`;
      }

      if (emptyStateEl) {
        emptyStateEl.classList.toggle("d-none", visibleCount > 0);
        if (visibleCount === 0 && emptyWhatsappBtn) {
          const requestedTerm = searchInput && searchInput.value.trim()
            ? `"${searchInput.value.trim()}"`
            : "custom hardware items";
          emptyWhatsappBtn.href = buildWhatsAppUrl(
            `Hello DukeOps, I am looking for ${requestedTerm} which I didn't see in the online filter. Is this available?`
          );
        }
      }
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        activeCategory = this.getAttribute("data-category-filter") || "all";
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    if (clearSearchBtn && searchInput) {
      clearSearchBtn.addEventListener("click", function () {
        searchInput.value = "";
        searchInput.focus();
        applyFilters();
      });
    }

    if (stockOnlyCheck) {
      stockOnlyCheck.addEventListener("change", applyFilters);
    }

    if (emptyResetBtn) {
      emptyResetBtn.addEventListener("click", function () {
        activeCategory = "all";
        if (searchInput) searchInput.value = "";
        if (stockOnlyCheck) stockOnlyCheck.checked = false;
        applyFilters();
      });
    }

    applyFilters();
  }

  /* --------------------------------------------------------------------------
     6. Contact Form Pre-Selection, Validation & Honest Submission
     -------------------------------------------------------------------------- */

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const phoneInput = document.getElementById("contact-phone");
    const serviceSelect = document.getElementById("contact-service");
    const messageInput = document.getElementById("contact-message");
    const submitBtn = document.getElementById("form-submit-button");
    const whatsappDirectBtn = document.getElementById("contact-whatsapp-btn");

    const preselectBanner = document.getElementById("preselect-banner");
    const preselectText = document.getElementById("preselect-banner-text");
    const successBox = document.getElementById("form-success");
    const failureBox = document.getElementById("form-failure");
    const dispatchPanel = document.getElementById("form-direct-dispatch");
    const dispatchEmailLink = document.getElementById("dispatch-email-link");
    const dispatchWaLink = document.getElementById("dispatch-wa-link");
    const dispatchCopyBtn = document.getElementById("dispatch-copy-btn");

    // 1. Pre-fill from URL parameters (?service=hse, ?from=quote, ?success=true)
    const params = new URLSearchParams(window.location.search);

    if (params.get("success") === "true" && successBox) {
      successBox.classList.remove("d-none");
    } else if (params.get("success") === "false" && failureBox) {
      failureBox.classList.remove("d-none");
    }

    const serviceAliasMap = {
      hse: "HSE Consultancy",
      "hse consultancy": "HSE Consultancy",
      utility: "Utility Services",
      "utility services": "Utility Services",
      hardware: "Hardware Supplies",
      "hardware supplies": "Hardware Supplies",
      construction: "Construction Services",
      "construction services": "Construction Services",
      multiple: "Multiple Services",
      "multiple services": "Multiple Services",
      other: "Other",
    };

    const rawServiceParam = params.get("service");
    if (rawServiceParam && serviceSelect) {
      const normalized =
        serviceAliasMap[rawServiceParam.trim().toLowerCase()] ||
        rawServiceParam.trim();
      const matchingOption = Array.from(serviceSelect.options).find(
        (opt) => opt.value.toLowerCase() === normalized.toLowerCase()
      );
      if (matchingOption) {
        serviceSelect.value = matchingOption.value;
        if (preselectBanner && preselectText) {
          preselectText.textContent = `Inquiry category selected: ${matchingOption.value}`;
          preselectBanner.classList.remove("d-none");
        }
      }
    }

    if (params.get("from") === "quote" && messageInput) {
      const quoteItems = loadQuoteList();
      const quoteNotes = loadQuoteNotes();
      if (quoteItems.length > 0 && !messageInput.value.trim()) {
        messageInput.value = formatQuoteItemsText(quoteItems, quoteNotes);
        if (preselectBanner && preselectText) {
          preselectText.textContent = `Loaded ${quoteItems.length} hardware item(s) from your Quote List`;
          preselectBanner.classList.remove("d-none");
        }
      }
    }

    // 2. Accessible Field Validation
    function setFieldError(inputEl, message) {
      if (!inputEl) return;
      const errId = `${inputEl.id}-error`;
      let errEl = document.getElementById(errId);
      if (!errEl) {
        errEl = document.createElement("div");
        errEl.id = errId;
        errEl.className = "field-error";
        errEl.setAttribute("role", "alert");
        inputEl.insertAdjacentElement("afterend", errEl);
      }
      if (message) {
        inputEl.setAttribute("aria-invalid", "true");
        inputEl.setAttribute("aria-describedby", errId);
        errEl.textContent = message;
        errEl.classList.remove("d-none");
      } else {
        inputEl.removeAttribute("aria-invalid");
        errEl.textContent = "";
        errEl.classList.add("d-none");
      }
    }

    function validateSingleField(inputEl) {
      if (!inputEl) return true;
      const val = inputEl.value.trim();

      if (inputEl === nameInput) {
        if (val.length < 2) {
          setFieldError(inputEl, "Please enter your full name.");
          return false;
        }
      } else if (inputEl === emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) {
          setFieldError(inputEl, "Please enter your email address.");
          return false;
        }
        if (!emailRegex.test(val)) {
          setFieldError(inputEl, "Please enter a valid email address.");
          return false;
        }
      } else if (inputEl === phoneInput && val.length > 0) {
        const phoneRegex = /^[+\d\s()-]{7,20}$/;
        if (!phoneRegex.test(val)) {
          setFieldError(
            inputEl,
            "Please enter a valid phone number (e.g., +255 7XX XXX XXX)."
          );
          return false;
        }
      } else if (inputEl === messageInput) {
        if (val.length < 10) {
          setFieldError(
            inputEl,
            "Please share brief project details (at least 10 characters)."
          );
          return false;
        }
      }

      setFieldError(inputEl, "");
      return true;
    }

    [nameInput, emailInput, phoneInput, messageInput].forEach((el) => {
      if (!el) return;
      el.addEventListener("blur", () => validateSingleField(el));
      el.addEventListener("input", () => {
        if (el.getAttribute("aria-invalid") === "true") {
          validateSingleField(el);
        }
      });
    });

    function validateAll() {
      const checks = [
        validateSingleField(nameInput),
        validateSingleField(emailInput),
        validateSingleField(phoneInput),
        validateSingleField(messageInput),
      ];
      return checks.every(Boolean);
    }

    function buildFormattedInquiry() {
      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const phone =
        phoneInput && phoneInput.value.trim()
          ? phoneInput.value.trim()
          : "Not provided";
      const service =
        serviceSelect && serviceSelect.value
          ? serviceSelect.value
          : "General Inquiry";
      const details = messageInput ? messageInput.value.trim() : "";

      const subject = `DukeOps Inquiry: ${service} — ${name}`;
      const body = [
        `New Project Inquiry — DukeOps Website`,
        `--------------------------------------`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service Needed: ${service}`,
        ``,
        `Project Details:`,
        details,
      ].join("\n");

      return { subject, body };
    }

    // Direct WhatsApp Inquiry Button inside Contact Form
    if (whatsappDirectBtn) {
      whatsappDirectBtn.addEventListener("click", function () {
        if (!validateAll()) {
          const firstInvalid = form.querySelector('[aria-invalid="true"]');
          if (firstInvalid) firstInvalid.focus();
          return;
        }
        const { body } = buildFormattedInquiry();
        window.open(buildWhatsAppUrl(body), "_blank", "noopener");
      });
    }

    // Form Submit Handler (Supports real Formspree ID + Honest Direct Dispatch fallback)
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (successBox) successBox.classList.add("d-none");
      if (failureBox) failureBox.classList.add("d-none");
      if (dispatchPanel) dispatchPanel.classList.add("d-none");

      if (!validateAll()) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const { subject, body } = buildFormattedInquiry();
      const actionUrl = form.getAttribute("action") || "";
      const isPlaceholderEndpoint =
        !actionUrl || actionUrl.includes("YOUR_FORM_ID");

      function showDirectDispatch() {
        if (!dispatchPanel) return;
        if (dispatchEmailLink) {
          dispatchEmailLink.href = buildMailtoUrl(subject, body);
        }
        if (dispatchWaLink) {
          dispatchWaLink.href = buildWhatsAppUrl(body);
        }
        if (dispatchCopyBtn) {
          dispatchCopyBtn.onclick = function () {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(body).then(() => {
                dispatchCopyBtn.innerHTML =
                  '<i class="bi bi-check2" aria-hidden="true"></i> Copied to Clipboard';
                setTimeout(() => {
                  dispatchCopyBtn.innerHTML =
                    '<i class="bi bi-clipboard" aria-hidden="true"></i> Copy Inquiry';
                }, 2500);
              });
            }
          };
        }
        dispatchPanel.classList.remove("d-none");
        dispatchPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      if (isPlaceholderEndpoint) {
        // Endpoint not yet configured with live Formspree ID — hand off transparently
        showDirectDispatch();
        return;
      }

      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending Inquiry...";
      }

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          form.reset();
          if (successBox) successBox.classList.remove("d-none");
        } else {
          if (failureBox) failureBox.classList.remove("d-none");
          showDirectDispatch();
        }
      } catch (_) {
        if (failureBox) failureBox.classList.remove("d-none");
        showDirectDispatch();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. Footer Quick Inquiry Form (All Pages)
     -------------------------------------------------------------------------- */

  function initFooterForms() {
    document.querySelectorAll("#footer-contact-form").forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailEl = form.querySelector('input[type="email"]');
        const msgEl = form.querySelector("textarea");
        const email = emailEl ? emailEl.value.trim() : "";
        const msg = msgEl ? msgEl.value.trim() : "";

        if (!email || !msg) return;

        const subject = `Quick Website Inquiry from ${email}`;
        const body = `Sender Email: ${email}\n\nMessage:\n${msg}`;

        let feedback = form.querySelector(".footer-inquiry-feedback");
        if (!feedback) {
          feedback = document.createElement("div");
          feedback.className = "footer-inquiry-feedback";
          feedback.setAttribute("role", "status");
          form.appendChild(feedback);
        }

        const waHref = buildWhatsAppUrl(
          `Hello DukeOps (Email: ${email}): ${msg}`
        );
        const mailHref = buildMailtoUrl(subject, body);

        feedback.innerHTML = `Ready to send: <a href="${mailHref}" style="text-decoration:underline; font-weight:700;">Open Email</a> or <a href="${waHref}" target="_blank" rel="noopener" style="text-decoration:underline; font-weight:700;">Send via WhatsApp</a>.`;
        window.location.href = mailHref;
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. Dynamic Copyright Year & Service Worker
     -------------------------------------------------------------------------- */

  function initDynamicYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = String(year);
    });
  }

  function initServiceWorker() {
    if (
      "serviceWorker" in navigator &&
      (window.location.protocol === "https:" ||
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1")
    ) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () {
          // Non-blocking PWA registration
        });
      });
    }
  }
})();
