import { onWindowResize, detectDevices, checkIfInView } from "./util.js";
import { gsap } from "gsap";
import WOW from "wow.js";
import Splitting from "splitting";
import Swiper from "swiper";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

/*::* INIT THEME *::*/
function initTheme() {
  // Detect Resizing
  onWindowResize(
    () => {
      document.documentElement.classList.remove("resizing");
    },
    300,
    true,
    () => {
      document.documentElement.classList.add("resizing");
      document.documentElement.classList.remove("header-menu-enabled");
    },
  );

  // Device detection
  const deviceDetector = detectDevices();
  deviceDetector.init();
}

/*::* Animation *::*/
function initAnimations() {
  // WOW
  const wow = new WOW({ boxClass: "animate" });
  wow.init();

  // Splitting
  Splitting({
    target: "[data-split]",
    by: "chars",
    key: null,
  });
  document
    .querySelectorAll("*[data-split][data-split-animate] .word")
    .forEach((word, index) => {
      const delay = index * 0.1 + 0.6;
      const span = document.createElement("span");
      span.className = "word-animate animate";
      span.innerHTML = word.innerHTML;
      span.setAttribute("data-wow-delay", `${delay}s`);
      word.innerHTML = "";
      word.appendChild(span);
    });
}

/*::* SLIDER *::*/
function initSliders() {
  document.querySelectorAll(".swiper.auto").forEach((swiperEl) => {
    const slideTotal = swiperEl.querySelectorAll(".swiper-slide").length;
    const slideLoop = swiperEl.classList.contains("loop") && slideTotal > 1;
    const slideAutoplay = swiperEl.classList.contains("autoplay");
    const slideCenterInsufficient = swiperEl.classList.contains("insufficient");
    const slideToClick = swiperEl.classList.contains("click");
    const noTouchMove = swiperEl.classList.contains("no-touch");
    const slidesPerGroup = parseInt(swiperEl.dataset.slidespergroup, 10) || 1;
    const autoPlayInterval =
      parseInt(swiperEl.dataset.autoplayinterval, 10) || 8000;
    const activeIndex = [
      ...swiperEl.querySelectorAll(".swiper-slide"),
    ].findIndex((slide) => slide.classList.contains("active"));

    const swiper = new Swiper(swiperEl, {
      modules: [Pagination, Navigation, Autoplay, EffectFade],
      resistanceRatio: 0,
      spaceBetween: 0,
      grabCursor: true,
      pagination: {
        el: swiperEl.querySelector(".swiper-pagination"),
        type: swiperEl.querySelector(".swiper-pagination.custom")
          ? "custom"
          : "bullets",
        clickable: !swiperEl.querySelector(".swiper-pagination.custom"),
      },
      navigation: {
        nextEl:
          swiperEl.querySelector(".swiper-button-next") ||
          document.querySelector(".swiper-button-global-next"),
        prevEl:
          swiperEl.querySelector(".swiper-button-prev") ||
          document.querySelector(".swiper-button-global-prev"),
      },
      effect: swiperEl.classList.contains("fade") ? "fade" : "slide",
      fadeEffect: { crossFade: swiperEl.classList.contains("fade") },
      loop: slideLoop,
      speed: 1000,
      autoplay: slideAutoplay
        ? { delay: autoPlayInterval, disableOnInteraction: false }
        : false,
      slidesPerView: "auto",
      centeredSlides: swiperEl.classList.contains("centered-m"),
      centerInsufficientSlides: slideCenterInsufficient,
      watchSlidesProgress: true,
      slideToClickedSlide: slideToClick,
      allowTouchMove: !noTouchMove,
      watchSlidesVisibility: true,
      breakpoints: {
        768: {
          centeredSlides: swiperEl.classList.contains("centered"),
          slidesPerGroup: slidesPerGroup,
        },
      },
      on: {
        init: function () {
          if (activeIndex !== -1) this.slideTo(activeIndex, 0, false);
        },
      },
    });

    if (slideAutoplay) swiper.autoplay.start();
  });
}

/*::* HEADER *::*/
function initHeader() {
  // Header Menu Toggle
  function initMenuToggle() {
    const html = document.documentElement;
    const menuToggle = document.querySelector(".header-menu-ctrl");

    if (!menuToggle) return;

    function toggleMenu() {
      html.classList.toggle("header-menu-enabled");
    }

    menuToggle.addEventListener("click", toggleMenu);

    // Optional: Close menu when clicking overlay
    const overlay = document.querySelector(".panel-overlay");
    if (overlay) {
      overlay.addEventListener("click", () => {
        html.classList.remove("header-menu-enabled");
      });
    }

    // Optional: Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        html.classList.contains("header-menu-enabled")
      ) {
        html.classList.remove("header-menu-enabled");
      }
    });
  }

  function initHeaderAnimation() {
    const header = document.querySelector("#header");
    if (!header) return;

    const isIndexPage = header.classList.contains("index");
    let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
    let lastWidth = window.innerWidth;

    function checkInitialState() {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > 0) {
        header.classList.remove("at-top");
      }
    }
    checkInitialState();

    function handleHeaderAnimation() {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const topOffset = header.offsetHeight * 1.5;
      const isMobile = window.innerWidth <= 991;
      const atTop = header.classList.contains("at-top");

      if (currentScroll === 0 && isIndexPage && isMobile && !atTop) {
        gsap.to(header, {
          y: -topOffset,
          duration: 0.3,
          ease: "none",
          onComplete: () => {
            header.classList.add("at-top");
            gsap.to(header, {
              y: 0,
              duration: 0.3,
              ease: "none",
              delay: 0.3,
            });
          },
        });
      } else if (currentScroll > lastScroll) {
        gsap.to(header, {
          y: -header.offsetHeight,
          duration: 0.3,
          ease: "none",
          onComplete: () => {
            header.classList.remove("at-top");
          },
        });
      } else if (currentScroll < lastScroll) {
        gsap.to(header, {
          y: 0,
          duration: 0.3,
          ease: "none",
        });
      }

      lastScroll = currentScroll;
      lastWidth = window.innerWidth;
    }

    // Throttle the scroll event for better performance
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleHeaderAnimation();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
  }

  initMenuToggle();
  initHeaderAnimation();
}

/*::* COUNTUP *::*/
function initCountUp() {
  function easeOutCubicCustom(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function startCountAnimation(element) {
    const countTo = Number(element.getAttribute("data-stop").replace(/,/g, ""));
    const duration = Number(element.getAttribute("data-duration")) || 2000;
    const startValue = Number(element.textContent.replace(/,/g, "")) || 0;
    const startTime = performance.now();

    function addSeparator(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function updateCount(timestamp) {
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutCubicCustom(progress);
      const currentValue = Math.floor(
        startValue + (countTo - startValue) * easedProgress,
      );
      element.textContent = addSeparator(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = addSeparator(countTo);
      }
    }

    requestAnimationFrame(updateCount);
  }

  const countupElements = document.querySelectorAll(".countup");

  if (countupElements.length) {
    countupElements.forEach((element) => {
      const ratioInView = 1 / 100;

      function inViewCallback() {
        if (
          !document.documentElement.classList.contains("overflow-hidden") &&
          !element.classList.contains("animated")
        ) {
          element.classList.add("in-view", "animated");
          startCountAnimation(element);
        }
      }

      window.addEventListener("scroll", () =>
        checkIfInView(ratioInView, element, inViewCallback, () => {}),
      );
      window.addEventListener("resize", () =>
        checkIfInView(ratioInView, element, inViewCallback, () => {}),
      );

      checkIfInView(ratioInView, element, inViewCallback, () => {});
    });
  }
}

/*::* READMORE BUTTON *::*/
function initReadMore() {
  const description2Container = document.querySelector(
    ".description-2-container",
  );
  if (description2Container) {
    const description2 = description2Container.querySelector(".description-2");
    const readMoreBtn = description2Container.querySelector(".read-more-btn");

    if (description2 && readMoreBtn) {
      readMoreBtn.addEventListener("click", () => {
        const isExpanded =
          description2.getAttribute("data-expanded") === "true";
        description2.setAttribute("data-expanded", (!isExpanded).toString());
        readMoreBtn.textContent = isExpanded ? "Read More" : "Show Less";
      });
    }
  }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initAnimations();
  initSliders();
  initHeader();
  initCountUp();
  initReadMore();
});

// Astro page transitions
document.addEventListener("astro:page-load", () => {
  initAnimations();
  initSliders();
  initHeader();
  initCountUp();
  initReadMore();
});

// Clean up before page transitions
document.addEventListener("astro:before-swap", () => {
  // Remove any event listeners or clean up animations if needed
  document.querySelectorAll(".swiper.auto").forEach((swiperEl) => {
    if (swiperEl.swiper) {
      swiperEl.swiper.destroy();
    }
  });
});
