"use strict";

// using javascript to automated the footer year
const yearEl = document.querySelector(".year");
// for getting the current year
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;
/////////////////////////////////////////////
// preloader
const loader = document.querySelector(".loader-overlay");
window.addEventListener("load", () => {
  loader.classList.add("hidden");
});

// ===============making mobile nav work============

const btnNavOpen = document.querySelector(".open-mobile-icon");
const btnNavClose = document.querySelector(".close-mobile-icon");
const header = document.querySelector(".header");
btnNavOpen.addEventListener("click", function () {
  header.classList.add("nav-open");
});
btnNavClose.addEventListener("click", function () {
  header.classList.remove("nav-open");
});

// ======smooth scrolling animation =========
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    console.log(e);
    e.preventDefault();
    const href = link.getAttribute("href");
    //  scroll back to top
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      console.log(sectionEl);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // closing the mobile nav after clicking
    if (link.classList.contains("main-nav-link")) {
      header.classList.remove("nav-open");
    }
  });
});

//============== for sticky navigation==============

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    // scrolling just in the viewport
    root: null,
    // threshold will activate when 0 percent of the view port in acheive
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// Fixing flexgap property missing in some saferi version
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
