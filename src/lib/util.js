// ON WINDOW RESIZE CALLBACK =============================
export function onWindowResize(
  callback,
  delay = 300,
  executeOnLoad = true,
  initialCallback,
) {
  let lastWidth = window.innerWidth;
  let resizeTimeout;
  let initialCallbackExecuted = false;

  if (executeOnLoad && typeof callback === "function") {
    callback();
  }

  window.addEventListener("resize", function () {
    const newWidth = window.innerWidth;

    if (newWidth !== lastWidth) {
      lastWidth = newWidth;

      if (!initialCallbackExecuted && typeof initialCallback === "function") {
        initialCallbackExecuted = true;
        initialCallback();
      }

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (typeof callback === "function") {
          callback();
        }

        initialCallbackExecuted = false;
      }, delay);
    }
  });
}

// DETECT DEVICES =============================
export function detectDevices() {
  const html = document.documentElement;

  function detectTouchEvents() {
    const isTouchSupported =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    html.classList.toggle("touchevents", isTouchSupported);
    html.classList.toggle("no-touchevents", !isTouchSupported);
  }

  function detectMobileDevices() {
    const isDevice =
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/.test(
        navigator.userAgent,
      );
    html.classList.toggle("is-device", isDevice);
  }

  return {
    init: () => {
      detectTouchEvents();
      detectMobileDevices();
    },
  };
}

// CHECK IF IN VIEW =============================
export function checkIfInView(
  inViewRatio,
  content,
  inViewCallback,
  outOfViewCallback,
) {
  if (!content) {
    console.log("Content not found");
    return;
  }

  var rect = content.getBoundingClientRect();
  var windowHeight = window.innerHeight;
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
