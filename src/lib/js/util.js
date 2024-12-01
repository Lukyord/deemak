// ON WINDOW RESIZE CALLBACK =============================
function onWindowResize(callback, delay = 300, executeOnLoad = true) {
  let lastWidth = $(window).width();
  let resizeTimeout;

  if (executeOnLoad && typeof callback === "function") {
    callback();
  }

  $(window).on("resize", function () {
    const newWidth = $(window).width();

    if (newWidth !== lastWidth) {
      lastWidth = newWidth;

      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        if (typeof callback === "function") {
          callback();
        }
      }, delay);
    }
  });
}

// Function to calculate the 'vw' value
function calcVw(vw) {
  return (vw / 100) * window.innerWidth;
}

// Function to calculate the 'rem' value
function calcRem(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// THROTTLE ============================
// usage -> document
//     .querySelector(".work")
//     .addEventListener("wheel", throttle(handleScroll, 1000));
function throttle(func, limit) {
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
}

// CHECK IF IN VIEW ============================
// var ratioInView = 1 / 2; 1/2 of the section is in view
function checkIfInView(
  inViewRatio,
  content,
  inViewCallback,
  outOfViewCallback,
) {
  if (content.length === 0) {
    console.log("Content not found");
    return;
  }

  var rect = content[0].getBoundingClientRect();
  var windowHeight = $(window).height();
  var sectionHeight = rect.height;
  var inViewSectionHeight = sectionHeight * inViewRatio;

  if (
    rect.top + inViewSectionHeight <= windowHeight &&
    rect.top + sectionHeight > 0
  ) {
    inViewCallback();
  } else {
    outOfViewCallback();
  }
}

// CHECK IF SCROLL PAST ============================
// var offset = 100;
// var headerOffset = $header.outerHeight();
function checkIfScrolledPast(
  content,
  offSet,
  scrollPastCallback,
  notScrolledPastCallback,
) {
  if (content.length === 0) {
    console.log("Content not found");
    return;
  }

  var sectionTop = content.offset().top;
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition > sectionTop + content.outerHeight() - offSet) {
    scrollPastCallback();
  } else {
    notScrolledPastCallback();
  }
}

// SCROLL TO TOP============================
function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
