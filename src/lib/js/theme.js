/* PAGE LOAD */
jQuery(function ($) {
  // ANIMATE
  $('.entry-fadeIn > *:not([class*="wp-block-"])').addClass("animate fadeIn");
  $(
    '.entry-fadeIn *:is([class*="wp-block-"]) > *:not([class*="wp-block-"], ul, ol), .entry-fadeIn li',
  ).addClass("animate fadeIn");

  $(".accordion .animate").each(function () {
    $(this).removeClass("animate fadeIn");
  });

  function pageAnimate() {
    if ($(".animate").length) {
      var wow = new WOW({
        boxClass: "animate",
      });
      wow.init();
    }
  }
  pageAnimate();
});

{
  /* 
    <picture class="object blurred-media">
        <source media="(min-width:992px)" srcset="<?php echo $cover ?>">
        <source media="(min-width:0px)" srcset="<?php echo $cover_m ?>">
        <img
            src="<?php echo $cover; ?>"
            alt="Index Hero Image"
            data-animation="matrixZoomOut"
            class="inside-animation ease-out-cubic"
            data-wow-duration="1s">
    </picture> 
*/
}

// BLURRED UNLOADED IMAGES
jQuery(function ($) {
  if ($(".blurred-media").length) {
    $(".blurred-media").each(function () {
      const blurredImageDiv = $(this);
      const media = blurredImageDiv.find("img, video");

      if (media.length) {
        function loaded() {
          blurredImageDiv.addClass("loaded");
          var insideAnimation = blurredImageDiv.find(".inside-animation");

          if (insideAnimation.length) {
            var animation = insideAnimation.data("animation");
            insideAnimation.addClass("animate").addClass(animation);
            $("html").scrollTop($("html").scrollTop() + 1);
          }
        }

        media.each(function () {
          const element = $(this);
          if (element.is("img")) {
            if (this.complete) {
              loaded();
            } else {
              element.on("load", loaded);
            }
          }

          if (element.is("video")) {
            element.on("loadeddata", loaded);
          }
        });
      } else {
        console.log("No img or video element found inside .blurred-image");
      }
    });
  }
});

/* WINDOW RESIZE */
jQuery(function ($) {
  //BG IMAGE
  function bgChange(Obj) {
    bgImg = $(Obj);
    bgImgSrc = $(Obj).data("bgimg-src");
    bgImgSrcset =
      typeof $(Obj).data("bgimg-srcset") != "undefined"
        ? $(Obj).data("bgimg-srcset")
        : "";

    var width = $(document).width();
    if (width < 992 && bgImgSrcset != "") {
      bgImg.css({ "background-image": "url(" + bgImgSrcset + ")" });
    } else {
      bgImg.css({ "background-image": "url(" + bgImgSrc + ")" });
    }
  }
  function bgChangeInit() {
    $(".bg-img").each(function () {
      var Obj = $(this);
      bgChange(Obj);
    });
  }
  bgChangeInit();
  $(window).resize(function () {
    bgChangeInit();
  });

  //VIDEO
  function vdoChange(Obj) {
    vdo = $(Obj);
    vdoSrc = $(Obj).data("vdo-src");
    vdoSrcset =
      typeof $(Obj).data("vdo-srcset") != "undefined"
        ? $(Obj).data("vdo-srcset")
        : "";

    var width = $(document).width();
    if (width < 992 && vdoSrcset != "") {
      vdo.attr("src", vdoSrcset);
    } else {
      vdo.attr("src", vdoSrc);
    }
  }
  function vdoChangeInit() {
    $(".vdojs").each(function () {
      var Obj = $(this);
      vdoChange(Obj);
    });
  }
  vdoChangeInit();
  //Detect window width change (not height change)
  var lastWidth = $(window).width();
  $(window).resize(function () {
    if ($(window).width() != lastWidth) {
      vdoChangeInit();
    }
  });
});

/* FORM */
jQuery(function ($) {
  $(".field").focusin(function () {
    $(this).siblings().removeClass("focusin");
    $(this).addClass("focusin");
  });

  //INPUT
  var formElement = $("input, textarea, select");
  formElement.focusin(function () {
    $(this).closest(".input").addClass("filled");
  });
  formElement.focusout(function () {
    if (!$(this).val()) {
      $(this).closest(".input").removeClass("filled");
    }
  });
  setTimeout(function () {
    formElement.each(function () {
      if ($(this).is(":-webkit-autofill")) {
        $(this).closest(".input").addClass("filled");
      } else {
        $(this).closest(".input").removeClass("filled");
      }
      if (!$(this).val()) {
        $(this).closest(".input").removeClass("filled");
      } else {
        $(this).closest(".input").addClass("filled");
      }
    });
  }, 100);

  //SELECT
  $(".fn").each(function () {
    $(this)
      .find("select")
      .addClass("select2")
      .wrapAll('<div class="select"></div>');
  });
  $(".select").each(function () {
    var selectParent = $(this),
      select = $(this).find(".select2"),
      select2fixed = $(this).find(".select2-fixed");

    var query = {};
    function markMatch(text, term) {
      var match = text.toUpperCase().indexOf(term.toUpperCase());

      var $result = $("<span></span>");

      if (match < 0) {
        return $result.text(text);
      }

      $result.text(text.substring(0, match));

      var $match = $('<span class="select2-rendered__match"></span>');
      $match.text(text.substring(match, match + term.length));

      $result.append($match);

      $result.append(text.substring(match + term.length));

      return $result;
    }

    select
      .select2({
        width: "100%",
        minimumResultsForSearch: -1,
        dropdownParent: selectParent,
        templateResult: function (item) {
          if (item.loading) {
            return item.text;
          }

          var term = query.term || "";
          var $result = markMatch(item.text, term);

          return $result;
        },
        language: {
          searching: function (params) {
            query = params;
            return "Searching...";
          },
        },
      })
      .on("select2:select", function (e) {
        selectParent.closest(".input").addClass("filled");
      })
      .on("select2:unselect", function (e) {
        selectParent.closest(".input").removeClass("filled");
      });

    select2fixed
      .select2({
        width: "100%",
        minimumResultsForSearch: -1,
        dropdownParent: selectParent,
        templateResult: function (item) {
          if (item.loading) {
            return item.text;
          }

          var term = query.term || "";
          var $result = markMatch(item.text, term);

          return $result;
        },
        language: {
          searching: function (params) {
            query = params;
            return "Searching...";
          },
        },
      })
      .on("select2:select", function (e) {
        selectParent.closest(".input").addClass("filled");
      })
      .on("select2:unselect", function (e) {
        selectParent.closest(".input").removeClass("filled");
      });

    select.closest(".select").addClass("select2-parent");
    select2fixed.closest(".select").addClass("select2-parent");

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      select.select2("destroy");
      select.closest(".select").removeClass("select2-parent");
    }

    $(this)
      .find("select")
      .click(function () {
        if ($(this)[0].selectedIndex < 0) {
          selectParent.closest(".input").removeClass("filled");
        } else {
          selectParent.closest(".input").addClass("filled");
        }
      });
  });
});

/* UPLOAD FILE */
jQuery(function ($) {
  // Browser supports HTML5 multiple file?
  var multipleSupport = typeof $("<input/>")[0].multiple !== "undefined",
    isIE = /msie/i.test(navigator.userAgent);

  $.fn.customFile = function () {
    return this.each(function () {
      var _txtP;
      var _txtB;

      if (
        typeof $(this).closest(".custom-file-upload").data("placeholder") !=
        "undefined"
          ? $(this).closest(".custom-file-upload").data("placeholder")
          : ""
      ) {
        _txtP = $(this).closest(".custom-file-upload").data("placeholder");
      } else {
        _txtP = "";
      }

      if (
        typeof $(this).closest(".custom-file-upload").data("button") !=
        "undefined"
          ? $(this).closest(".custom-file-upload").data("button")
          : ""
      ) {
        var _txtB = $(this).closest(".custom-file-upload").data("button");
      } else {
        var _txtB = '<i class="ic ic-upload"></i>';
      }

      var $file = $(this).addClass("custom-file-upload-hidden"),
        $wrap = $('<div class="file-upload-wrapper">'),
        $input = $(
          '<input type="text" class="file-upload-input" placeholder="' +
            _txtP +
            '" readonly />',
        ),
        $button = $(
          '<div class="file-upload-action"><button type="button" class="file-upload-button">' +
            _txtB +
            "</button></div>",
        ),
        $label = $(
          '<div class="file-upload-action"><label class="file-upload-button" for="' +
            $file[0].id +
            '">' +
            $(this).closest(".custom-file-upload").data("button") +
            "</label></div>",
        );

      $file.css({
        position: "absolute",
        left: "-9999px",
      });

      $wrap.insertAfter($file).append($file, $input, isIE ? $label : $button);

      $file.attr("tabIndex", -1);
      $button.attr("tabIndex", -1);

      $button.click(function () {
        $file.focus().click();
      });

      $input.click(function () {
        $file.focus().click();
      });

      $file.change(function () {
        var files = [],
          fileArr,
          filename;

        if (multipleSupport) {
          fileArr = $file[0].files;
          for (var i = 0, len = fileArr.length; i < len; i++) {
            files.push(fileArr[i].name);
          }
          filename = files.join(", ");
        } else {
          filename = $file.val().split("\\").pop();
        }

        $input.val(filename).attr("title", filename).focus();

        $input.closest(".input").addClass("filled");
      });

      $input.on({
        blur: function () {
          $file.trigger("blur");
        },
        keydown: function (e) {
          if (e.which === 13) {
            // Enter
            if (!isIE) {
              $file.trigger("click");
            }
          } else if (e.which === 8 || e.which === 46) {
            $file.replaceWith(($file = $file.clone(true)));
            $file.trigger("change");
            $input.val("");
          } else if (e.which === 9) {
            return;
          } else {
            return false;
          }
        },
      });
    });
  };

  // Old browser fallback
  if (!multipleSupport) {
    $(document).on("change", "input.customfile", function () {
      var _this = $(this),
        uniqId = "customfile_" + new Date().getTime(),
        $wrap = _this.parent(),
        $inputs = $wrap
          .siblings()
          .find(".file-upload-input")
          .filter(function () {
            return !this.value;
          }),
        $file = $(
          '<input type="file" id="' +
            uniqId +
            '" name="' +
            _this.attr("name") +
            '"/>',
        );

      setTimeout(function () {
        if (_this.val()) {
          if (!$inputs.length) {
            $wrap.after($file);
            $file.customFile();
          }
        } else {
          $inputs.parent().remove();
          $wrap.appendTo($wrap.parent());
          $wrap.find("input").focus();
        }
      }, 1);
    });
  }

  $("input[type=file]").customFile();
});

/* TAB */
jQuery(function ($) {
  var tabGroupParent = null;
  var h = $(window).outerHeight() / 4;

  function tabActive(elem) {
    var tabGroupParent = $(elem).parents(".tab-container");

    if (tabGroupParent.find(".tab-dropdown-ctrl").length) {
      tabGroupParent
        .find(".tab-dropdown-ctrl .value")
        .text(tabGroupParent.find(".tab a.active", this).text());
    }

    if (tabGroupParent.find(".tab-content.active video").length) {
      tabGroupParent.find(".tab-content.active video").each(function () {
        $(this).get(0).play();
        $(this).get(0).currentTime = 0;
      });
    } else {
      tabGroupParent
        .find('.tab-content:not(".active") video')
        .each(function () {
          $(this).get(0).pause();
          $(this).get(0).currentTime = 0;
        });
    }
  }
  tabActive();

  function showTab(elem) {
    $(elem)
      .parents(".tab-container")
      .find(".tab-content")
      .removeClass("active");
    $(elem + ".tab-content").addClass("active");

    tabActive(elem);

    $("html,body").animate(
      { scrollTop: $(elem).offset().top - h },
      800,
      "linear",
    );
  }

  $(".tab-link").click(function (e) {
    e.preventDefault();
    var _id = $(this).attr("href");

    showTab(_id);

    $(this).parents(".tab-container").find(".tab-link").removeClass("active");
    $(this)
      .parents(".tab-container")
      .find('.tab-link[href="' + _id + '"]')
      .addClass("active");

    $(this)
      .parents(".tab-container")
      .find(".tab > li")
      .removeClass("active-parent");
    $(this)
      .parents(".tab-container")
      .find('.tab-link[href="' + _id + '"]')
      .parent("li")
      .addClass("active-parent");

    $(this).parent().siblings().find("> ul").slideUp(300);
    $(this).parent().find("> ul").slideDown(300);
  });

  if ($(".tab").find("li").length) {
    $(".tab li").each(function () {
      if ($(this).find("> a.active").length) {
        $(this).addClass("active-parent");

        $(this).siblings().find("> ul").slideUp(300);
        $(this).find("> ul").slideDown(300);
      } else {
        $(this).removeClass("active-parent");
      }
    });
  }

  if (window.location.hash) {
    $('.tab-link[href="' + window.location.hash + '"]').click();
  }

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  };
  var tabid = getUrlParameter("id");
  if (tabid) {
    var _parent = $('.tab-link[href="#' + tabid + '"]').parents(
      ".tab-container",
    );
    _parent.find(".tab-link").removeClass("active");
    _parent.find('.tab-link[href="#' + tabid + '"]').addClass("active");
    _parent.find(".tab-content").removeClass("active");
    _parent.find(".tab-content#" + tabid).addClass("active");
  }

  $(".tab-dropdown").each(function () {
    var _this = $(this);

    _this
      .find(".tab-dropdown-ctrl .value")
      .text(_this.find(".tab-link.active", this).text());
    _this.find(".tab-link").click(function () {
      _this
        .find(".tab-dropdown-ctrl .value")
        .text(_this.find(".tab-link.active", this).text());
    });

    _this.find("> .tab-dropdown-ctrl").click(function () {
      $(this).parent().toggleClass("active");
      $(this).parent().find("> .tab-dropdown-panel").fadeToggle(200);
    });

    _this.click(function (e) {
      e.stopPropagation();
    });
  });

  $("body, .tab a, .fn-ctrl").click(function () {
    $(".tab-dropdown").removeClass("active");
    $(".tab-dropdown-panel").fadeOut(100);
  });

  if ($(".sc-tab.sticky").length) {
    var bound = $(".sc-tab-bound"),
      _alloc = true;
    function tabStickyScroll() {
      //start
      var _pY = $(window).scrollTop(),
        _top = bound.offset().top;
      if (_pY > _top) {
        if (_alloc) {
          _alloc = false;
          $("html").addClass("sc-sticky-start");
        }
      } else {
        if (!_alloc) {
          _alloc = true;
          $("html").removeClass("sc-sticky-start");
        }
      }
    }
    tabStickyScroll();
    $(window).scroll(tabStickyScroll);

    function tabStickyHeight() {
      $(".sc-tab.sticky").each(function () {
        $(this)
          .siblings(".sc-tab-content")
          .css("--top", $(this).find(".tab").outerHeight() + "px");
      });
    }
    tabStickyHeight();
    $(window).resize(function () {
      tabStickyHeight();
    });
  }
});

/* ACCORDION */
jQuery(function ($) {
  $(".accordion-container").each(function () {
    $(this)
      .find(".accordion")
      .each(function () {
        var _this = $(this);
        var _parent = $(this).parent();

        var _windowHeight = $(window).outerHeight() / 4;

        _this.find("> .entry-title").click(function () {
          var _thisParent = $(this).parent();

          var neighbor = _thisParent.siblings(),
            neighborContent = neighbor.find("> .entry-panel");

          if (_parent.hasClass("toggle")) {
            neighbor.removeClass("active");
            neighborContent.slideUp(300);

            _thisParent.toggleClass("active");
            _thisParent.find("> .entry-panel").slideToggle(300);

            setTimeout(function () {
              if (_thisParent.find("> .entry-panel").is(":visible")) {
                $("html,body").animate(
                  {
                    scrollTop: _thisParent.offset().top - _windowHeight,
                  },
                  800,
                );
              } else {
                $("html,body").animate(
                  {
                    scrollTop: _thisParent.offset().top - _windowHeight,
                  },
                  800,
                );
              }
            }, 350);
          } else {
            _thisParent.toggleClass("active");
            _thisParent.find("> .entry-panel").slideToggle(300);
          }
        });
      });

    if ($(this).hasClass("trigger-first")) {
      $(this).find("> .accordion:first-child").addClass("active");
      $(this).find("> .accordion:first-child > .entry-panel").show();
    }
  });
});

/* LOCATION HASH */
jQuery(function ($) {
  setTimeout(function () {
    var _windowHeight = $(window).outerHeight() / 4;

    if (window.location.hash) {
      var $target = $(window.location.hash);

      if ($target.length) {
        $("html, body")
          .delay(100)
          .animate(
            {
              scrollTop: $target.offset().top - _windowHeight,
            },
            800,
          );
      }
    }
  }, 100);
});

/* LINK SCROLL */
jQuery(function ($) {
  $(".link-scroll").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - $("#header-height").outerHeight(),
          },
          800,
        );
        return false;
      }
    }
  });
});

/* BACK TO TOP */
jQuery(function ($) {
  $("#backtotop").click(function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 800);
  });
});

/* VENDOR */
jQuery(function ($) {
  //RELLAX
  // if ($(".rellax").length) {
  //   new Rellax(".rellax", {
  //     center: true,
  //     speed: -1,
  //   });
  // }

  //COUNTUP
  // if ($(".countup").length) {
  //   $(".countup").countUp({
  //     delay: 150,
  //     time: 1500,
  //   });
  // }

  //LIMARQUEE
  // if ($('*[data-js="liMarquee"]').length) {
  //   $('*[data-js="liMarquee"]:visible').each(function () {
  //     if ($(this).find('> *[class*="-marquee"] > *').length > 1) {
  //       $(this).liMarquee({
  //         circular: true,
  //         startShow: true,
  //         scrollStop: false,
  //       });
  //     }
  //   });
  // }

  // MASONRY GRID
  // jQuery(function ($) {
  //   if (".masonry-grid") {
  //     var $grid = $(".masonry-grid").masonry({
  //       itemSelector: ".masonry-grid-item",
  //       columnWidth: ".masonry-grid-item-sizer",
  //       gutter: ".masonry-grid-gutter-sizer",
  //       percentPosition: true,
  //     });

  //     $grid.imagesLoaded().progress(function () {
  //       $grid.masonry("layout");
  //     });
  //   }
  // });

  //SWIPER (DEFAULT)
  if ($(".swiper.default").length) {
    $(".swiper.default").each(function () {
      var _this = $(this);

      _this.find(".swiper-slide video[autoplay]").each(function () {
        $(this).get(0).pause();
        $(this).get(0).currentTime = 0;
      });

      //CONTROLS
      var slidePagination = _this.find(".swiper-pagination")[0],
        slideButtonNext = _this.find(".swiper-button-next")[0],
        slideButtonPrev = _this.find(".swiper-button-prev")[0];

      var slideButtonNextParent = $(this)
          .parents('*[class*="-slider"]')
          .find(".swiper-button-next")[0],
        slideButtonPrevParent = $(this)
          .parents('*[class*="-slider"]')
          .find(".swiper-button-prev")[0];

      //MODULES
      var slideFade = _this.hasClass("fade"),
        slideLoop = _this.hasClass("loop"),
        slideAutoplay = _this.hasClass("autoplay"),
        slidePause = _this.hasClass("pause");

      //CHECK
      var slideTotal = _this.find(".swiper-slide").length;

      //FUNCTION
      function switchColor() {
        if (_this.find(".swiper-slide").length) {
          if (_this.find(".swiper-slide-active").hasClass("c-white")) {
            setTimeout(function () {
              _this.closest('*[class*="type-slider"]').addClass("c-white");
            }, 200);
          } else {
            setTimeout(function () {
              _this.closest('*[class*="type-slider"]').removeClass("c-white");
            }, 200);
          }
        }

        if (_this.find(".swiper-slide > .sc-billboard").length) {
          if (
            _this
              .find(".swiper-slide-active > .sc-billboard")
              .hasClass("c-white")
          ) {
            setTimeout(function () {
              _this.addClass("c-white");

              if (_this.closest("#highlight").length) {
                $("#page").addClass("header-white");
              }
            }, 200);
          } else {
            setTimeout(function () {
              _this.removeClass("c-white");

              if (_this.closest("#highlight").length) {
                $("#page").removeClass("header-white");
              }
            }, 200);
          }
        }

        if (_this.find(".sc-billboard > .sc-cover .swiper-slide").length) {
          _this
            .find(".sc-billboard > .sc-cover .swiper-slide")
            .each(function () {
              var _slideParent = $(this).parents(".sc-cover");
              var _slideParents = $(this).parents(".sc-billboard");

              if (
                _slideParent.find(".swiper-slide-active").hasClass("c-white")
              ) {
                setTimeout(function () {
                  _slideParents.addClass("c-white");

                  if (_this.closest("#highlight").length) {
                    $("#page").addClass("header-white");
                  }
                }, 200);
              } else {
                setTimeout(function () {
                  _slideParents.removeClass("c-white");

                  if (_this.closest("#highlight").length) {
                    $("#page").removeClass("header-white");
                  }
                }, 200);
              }
            });
        }
      }

      function vdoData() {
        if (_this.find("video").length) {
          _this.find("video[autoplay]").each(function () {
            var vdo = $(this);
            vdo.get(0).preload = "metadata";
            vdo.get(0).onloadedmetadata = function () {
              var vdoTime = (vdo.get(0).duration - 2) * 1000;
              vdo
                .closest(".swiper-slide")
                .attr("data-swiper-autoplay", vdoTime);

              if ($(document).width() < 992) {
                _this
                  .find(".swiper-slide .visible-device-sm")
                  .each(function () {
                    if (!$(this).find("video[autoplay]").length) {
                      $(this)
                        .closest(".swiper-slide")
                        .attr("data-swiper-autoplay", "4000");
                    }
                  });
              } else {
                _this.find(".swiper-slide .hidden-device-sm").each(function () {
                  if (!$(this).find("video[autoplay]").length) {
                    $(this)
                      .closest(".swiper-slide")
                      .attr("data-swiper-autoplay", "4000");
                  }
                });
              }
            };
          });
        }
      }
      vdoData();

      //INITIALIZE
      const swiper = new Swiper(_this[0], {
        resistanceRatio: 0,
        spaceBetween: 0,
        pagination: {
          el: slidePagination,
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: slideButtonNext || slideButtonNextParent,
          prevEl: slideButtonPrev || slideButtonPrevParent,
        },
        effect: slideFade ? "fade" : "slide",
        fadeEffect: {
          crossFade: slideFade,
        },
        loop: slideLoop && slideTotal > 1,
        speed: 1000,
        longSwipesMs: 1000,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        on: {
          init: function () {
            switchColor();
            vdoData();

            if (_this.find(".swiper-slide-active video[autoplay]").length) {
              _this
                .find(".swiper-slide-active video[autoplay]")
                .each(function () {
                  $(this).get(0).play();
                  $(this).get(0).currentTime = 0;
                });
            } else {
              _this
                .find('.swiper-slide:not(".swiper-slide-active") video')
                .each(function () {
                  $(this).get(0).pause();
                  $(this).get(0).currentTime = 0;
                });
            }
          },
          resize: function () {
            vdoData();
          },
        },
        init: false,
      });

      setTimeout(function () {
        swiper.init();
        vdoData();
        swiper.autoplay.stop();

        if (slideAutoplay) {
          if ($("html").hasClass("page-loading-html")) {
            var timer = setInterval(function () {
              if ($("html").hasClass("loading-completed")) {
                swiper.autoplay.start();
                clearInterval(timer);
                // console.log('clearInterval')
              }
            }, 100);
          } else {
            swiper.autoplay.start();
          }
        }

        if (slidePause) {
          _this
            .mouseenter(function () {
              swiper.autoplay.stop();
            })
            .mouseleave(function () {
              swiper.autoplay.start();
            });
        }
      }, 100);

      swiper.on("slideChangeTransitionStart", function () {
        if (_this.find(".swiper-slide-active video[autoplay]").length) {
          _this.find(".swiper-slide-active video[autoplay]").each(function () {
            $(this).get(0).play();
            $(this).get(0).currentTime = 0;
          });
        }

        switchColor();
      });

      swiper.on("slideChangeTransitionEnd", function () {
        if (
          _this.find('.swiper-slide:not(".swiper-slide-active") video').length
        ) {
          _this
            .find('.swiper-slide:not(".swiper-slide-active") video')
            .each(function () {
              $(this).get(0).pause();
              $(this).get(0).currentTime = 0;
            });
        }
      });

      if (_this.hasClass("fix")) {
        _this
          .closest('*[class*="-slider"]')
          .find('*[class*="swiper-button-"]')
          .css("height", _this.find('[class*="object"]').outerHeight());
        $(window).resize(function () {
          _this
            .closest('*[class*="-slider"]')
            .find('*[class*="swiper-button-"]')
            .css("height", _this.find('[class*="object"]').outerHeight());
        });
      }
    });
  }

  //SWIPER (AUTO)
  if ($(".swiper.auto").length) {
    $(".swiper.auto").each(function () {
      var _this = $(this);

      //CONTROLS
      var slidePagination = _this.find(".swiper-pagination")[0],
        slideButtonNext = _this.find(".swiper-button-next")[0],
        slideButtonPrev = _this.find(".swiper-button-prev")[0];

      var slideButtonNextParent = $(this)
          .parents('*[class*="-slider"]')
          .find(".swiper-button-next")[0],
        slideButtonPrevParent = $(this)
          .parents('*[class*="-slider"]')
          .find(".swiper-button-prev")[0];

      //MODULES
      var slideCentered = _this.hasClass("centered"),
        slideCenteredMobile = _this.hasClass("centered-m"),
        slideCenterInsufficient = _this.hasClass("insufficient"),
        slideLoop = _this.hasClass("loop"),
        slideAutoplay = _this.hasClass("autoplay"),
        slideClicked = _this.hasClass("clicked"),
        slidePause = _this.hasClass("pause");

      //CHECK
      var slideTotal = _this.find(".swiper-slide").length;

      //INITIALIZE
      const swiper = new Swiper(_this[0], {
        //resistanceRatio: 0,
        spaceBetween: 0,
        grabCursor: true,
        pagination: {
          el: slidePagination,
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: slideButtonNext || slideButtonNextParent,
          prevEl: slideButtonPrev || slideButtonPrevParent,
        },
        effect: "slide",
        loop: slideLoop && slideTotal > 1,
        speed: 1400,
        longSwipesMs: 1400,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        slidesPerView: "auto",
        centeredSlides: slideCenteredMobile,
        centerInsufficientSlides: slideCenterInsufficient,
        slideToClickedSlide: slideClicked,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        breakpoints: {
          992: {
            centeredSlides: slideCentered,
          },
        },
        init: false,
      });

      setTimeout(function () {
        swiper.init();
        swiper.autoplay.stop();

        if (slideAutoplay) {
          if ($("html").hasClass("page-loading-html")) {
            var timer = setInterval(function () {
              if ($("html").hasClass("loading-completed")) {
                swiper.autoplay.start();
                clearInterval(timer);
                // console.log('clearInterval')
              }
            }, 100);
          } else {
            swiper.autoplay.start();
          }
        }

        if (slidePause) {
          _this
            .mouseenter(function () {
              swiper.autoplay.stop();
            })
            .mouseleave(function () {
              swiper.autoplay.start();
            });
        }
      }, 100);

      swiper.on("transitionStart", function () {
        _this.parent().addClass("beginning");
      });

      if (_this.hasClass("fix")) {
        _this
          .closest('*[class*="-slider"]')
          .find('*[class*="swiper-button-"]')
          .css("height", _this.find('[class*="object"]').outerHeight())
          .addClass();
        $(window).resize(function () {
          _this
            .closest('*[class*="-slider"]')
            .find('*[class*="swiper-button-"]')
            .css("height", _this.find('[class*="object"]').outerHeight());
        });
      }
    });
  }

  //POPUP
  // $(".open-popup-modal").magnificPopup({
  //   type: "inline",
  //   preloader: false,
  //   closeOnBgClick: true,
  //   mainClass: "popup-style popup-style-modal",
  //   showCloseBtn: true,
  //   closeBtnInside: true,
  //   removalDelay: 300,
  //   callbacks: {
  //     open: function () {
  //       $("html").addClass("plugin-mfp-enabled");
  //     },
  //     close: function () {
  //       $("html").removeClass("plugin-mfp-enabled");
  //     },
  //   },
  // });
});

/* VIDEO */
jQuery(function ($) {
  if ($(".wp-block-video").length) {
    $(".wp-block-video").each(function () {
      $(this).find("video").wrap('<div class="video"></div>');
    });
  }

  if ($(".video").length) {
    $(".video").each(function () {
      var _this = $(this);
      var vdo = $(this).find("video");
      var ctrlOverlaidPlay = $(this).find(".ctrls-overlaid .play");
      var ctrlOverlaidPause = $(this).find(".ctrls-overlaid .pause");

      $(this).find("video[autoplay]").parent().addClass("playing");

      ctrlOverlaidPlay.click(function () {
        vdo.get(0).play();
        _this.addClass("playing");
      });
      ctrlOverlaidPause.click(function () {
        vdo.get(0).pause();
        _this.removeClass("playing");
      });

      //FIX SAFARI
      if (!$(this).hasClass("hidden-ctrls")) {
        var _poster = vdo.attr("poster");
        if (typeof _poster !== "undefined" || _poster !== false) {
          vdo.css({
            "background-image": 'url("' + vdo.attr("poster") + '")',
          });
        }
      }
    });
  }
});
document
  .querySelectorAll(".video video, .wp-block-video video")
  .forEach(function (item) {
    item.addEventListener("playing", function (e) {
      e.target.closest(".video").classList.add("playing");

      if (e.target.closest(".video").classList.contains("hidden-ctrls")) {
        e.target.removeAttribute("controls");
      } else {
        e.target.setAttribute("controls", "");
      }
    });

    item.addEventListener("pause", function (e) {
      e.target.closest(".video").classList.remove("playing");
      e.target.removeAttribute("controls");
    });

    item.addEventListener("ended", function (e) {
      e.target.closest(".video").classList.remove("playing");
      e.target.src = "";
      e.target.src = e.target.currentSrc;
      e.target.removeAttribute("controls");
    });
  });

/* MAIN */
jQuery(function ($) {
  if ($("#main").length) {
  }
});

/* HEADER&FOOTER */
jQuery(function ($) {
  //MENU CONTROL
  $(".header-menu-ctrl > .ctrl").click(function (e) {
    e.preventDefault();
    $("html").toggleClass("header-menu-enabled");
    $(".header-menu-ctrl > .ctrl").toggleClass("active");
    $(".header-menu .panel-scroll").animate({ scrollTop: 0 });
  });

  // Function to close the header menu
  function closeHeaderMenu() {
    $("html").removeClass("header-menu-enabled");
    $(".header-menu-ctrl > .ctrl").removeClass("active");
    $(".header-menu").removeClass("active");
    setTimeout(function () {
      $(".header-menu .panel-scroll").animate({ scrollTop: 0 });
    }, 500);
  }

  $(".header-menu .link-scroll, .header-menu .panel-overlay").click(
    function () {
      closeHeaderMenu();
    },
  );

  $(".header-menu").on("click", ".link-scroll, .panel-overlay, a", function () {
    closeHeaderMenu();
  });
});

// EFFECT

// ===== LENIS =====
// const lenis = new Lenis();

// lenis.on("scroll", (e) => {});

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

// ===== GSAP =====
// let panels = gsap.utils.toArray(".gsap-panel");

// panels.forEach((panel) => {
//   ScrollTrigger.create({
//     trigger: panel,
//     start: "top top",
//     pin: true,
//     pinSpacing: false,
//   });
// });
