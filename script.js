/* Strauss Production — front-end behavior
   Sticky header, reveal-on-scroll, smooth scroll, form UX. */

(function () {
  "use strict";

  /* ---------- Year stamp ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header on scroll ---------- */
  const header = document.getElementById("siteHeader");
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 24);
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal-on-scroll ---------- */
  const items = document.querySelectorAll("[data-reveal]");
  items.forEach((el) => {
    const delay = el.dataset.delay;
    if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Smooth scroll for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ---------- Mobile menu toggle (lightweight) ---------- */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.style.display = expanded ? "" : "flex";
      nav.style.position = "fixed";
      nav.style.top = "70px";
      nav.style.left = "16px";
      nav.style.right = "16px";
      nav.style.background = "rgba(244,238,227,0.96)";
      nav.style.backdropFilter = "blur(14px)";
      nav.style.border = "1px solid rgba(15,14,12,0.08)";
      nav.style.borderRadius = "20px";
      nav.style.padding = "20px";
      nav.style.flexDirection = "column";
      nav.style.gap = "10px";
      nav.style.zIndex = "60";
      if (expanded) nav.style.display = "none";
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        if (window.innerWidth <= 880) {
          nav.style.display = "none";
          toggle.setAttribute("aria-expanded", "false");
        }
      })
    );
  }

  /* ---------- Contact form (display-only) ---------- */
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const label = btn.querySelector("span");
      const arrow = btn.querySelector(".arrow");
      const original = label ? label.textContent : "";
      if (label) label.textContent = "Thank you — we'll be in touch";
      if (arrow) arrow.textContent = "✓";
      btn.disabled = true;
      btn.style.background = "#1A1816";
      setTimeout(() => {
        if (label) label.textContent = original;
        if (arrow) arrow.textContent = "→";
        btn.disabled = false;
        form.reset();
      }, 3200);
    });
  }

  const footerForm = document.querySelector(".footer-form");
  if (footerForm) {
    footerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = footerForm.querySelector("input");
      const btn = footerForm.querySelector("button .arrow");
      if (input) input.value = "";
      if (btn) {
        btn.textContent = "✓";
        setTimeout(() => (btn.textContent = "→"), 2200);
      }
    });
  }

  /* ---------- Subtle parallax on hero blobs ---------- */
  const blobs = document.querySelectorAll(".hero-bg-blob");
  if (blobs.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let raf = 0;
    window.addEventListener(
      "mousemove",
      (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5) * 30;
          const y = (e.clientY / window.innerHeight - 0.5) * 30;
          blobs.forEach((b, i) => {
            const f = (i + 1) * 0.6;
            b.style.transform = `translate3d(${x * f}px, ${y * f}px, 0)`;
          });
          raf = 0;
        });
      },
      { passive: true }
    );
  }
})();
