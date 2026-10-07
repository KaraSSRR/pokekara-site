/* Pokekara Studio — progressive enhancement only. The site works without this file. */
(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  var collapsedQuery = window.matchMedia("(max-width: 1100px)");

  /* Header background once the page scrolls */
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile navigation */
  function setOpen(open, returnFocus) {
    if (!header || !toggle) return;
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (!open && returnFocus) toggle.focus();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(open);
      if (open) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      }
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) setOpen(false, true);
    });

    /* Keep focus inside the open menu: the toggle and the menu links, in that order */
    header.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !header.classList.contains("is-open")) return;
      var items = [toggle].concat(Array.prototype.slice.call(nav.querySelectorAll("a")));
      var i = items.indexOf(document.activeElement);
      e.preventDefault();
      var next = i === -1 ? 0 : (i + (e.shiftKey ? -1 : 1) + items.length) % items.length;
      items[next].focus();
    });

    var onBreakpoint = function (mq) {
      if (!mq.matches) setOpen(false);
    };
    if (collapsedQuery.addEventListener) collapsedQuery.addEventListener("change", onBreakpoint);
    else if (collapsedQuery.addListener) collapsedQuery.addListener(onBreakpoint);
  }

  /* Reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* Scroll-spy for in-page navigation (primary nav on home, table of contents on /claude/) */
  function spy(linkSelector) {
    var links = Array.prototype.slice.call(document.querySelectorAll(linkSelector));
    var map = [];
    links.forEach(function (a) {
      var hash = a.getAttribute("href");
      var id = hash && hash.indexOf("#") === 0 ? hash.slice(1) : "";
      var target = id && id !== "top" ? document.getElementById(id) : null;
      if (target) map.push({ link: a, target: target });
    });
    if (!map.length || !("IntersectionObserver" in window)) return;

    var visible = new Set();
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      var current = null;
      map.forEach(function (m) {
        if (visible.has(m.target) && !current) current = m;
      });
      map.forEach(function (m) {
        m.link.classList.toggle("is-active", m === current);
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    map.forEach(function (m) { obs.observe(m.target); });
  }

  spy("[data-nav] a[href^='#']");
  spy(".toc a[href^='#']");

  /* Hero interface concept: tabs switch the phone screen (ARIA tabs pattern) */
  var tablist = document.querySelector("[data-tabs]");
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll("[role='tab']"));
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) {
          panel.hidden = !on;
          panel.classList.toggle("is-active", on);
        }
      });
      if (focus) tab.focus();
      var showcase = tablist.closest(".showcase");
      if (showcase && tab !== tabs[0]) showcase.classList.add("is-exploring");
    };
    tabs.forEach(function (t) {
      t.addEventListener("click", function () { select(t); });
    });
    tablist.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i === -1) return;
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        select(next, true);
      }
    });
  }

  /* Career journey strip: previous / next controls */
  var strip = document.querySelector("[data-strip]");
  var controls = document.querySelector("[data-strip-controls]");
  if (strip && controls) {
    var prev = controls.querySelector("[data-strip-prev]");
    var nextBtn = controls.querySelector("[data-strip-next]");
    var step = function () {
      var card = strip.querySelector("li");
      return card ? card.getBoundingClientRect().width + 16 : strip.clientWidth * 0.8;
    };
    var update = function () {
      var max = strip.scrollWidth - strip.clientWidth - 2;
      prev.disabled = strip.scrollLeft <= 2;
      nextBtn.disabled = strip.scrollLeft >= max;
    };
    prev.addEventListener("click", function () {
      strip.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" });
    });
    nextBtn.addEventListener("click", function () {
      strip.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" });
    });
    strip.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    controls.hidden = false;
    update();
  }

})();
