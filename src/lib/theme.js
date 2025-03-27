import { onWindowResize, detectDevices } from "./util.js";
import { gsap } from "gsap";

/*::* INIT THEME *::*/
document.addEventListener("DOMContentLoaded", () => {
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
});

/*::* HEADER *::*/
document.addEventListener("DOMContentLoaded", () => {
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
});
