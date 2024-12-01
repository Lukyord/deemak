/*!*PAGE SCROLLING*/ !(function (l, s, o, r) {
  "use strict";
  var a = l(""),
    c = 0,
    e = 0,
    t = l(o),
    d = 0,
    n = l(s),
    h = 0,
    $ = 0,
    g = 0,
    i = 0;
  n.on("scroll", function () {
    (c = a.outerHeight()),
      (d = t.height()),
      (h = n.height()),
      (i = g - ($ = n.scrollTop())),
      (e = parseInt(a.css("top")) + i),
      $ <= 0
        ? l("html").removeClass(
            "page-scrolling page-scrolling--up page-scrolling--down",
          )
        : i > 0
          ? (l("html").addClass("page-scrolling"),
            l("html")
              .addClass("page-scrolling--up")
              .removeClass("page-scrolling--down"))
          : i < 0 &&
            (l("html").addClass("page-scrolling"),
            l("html")
              .removeClass("page-scrolling--up")
              .addClass("page-scrolling--down")),
      (g = $);
  });
})(jQuery, window, document);
/*!*DETECT OS*/ jQuery(function (n) {
  var r = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        r.Android() || r.BlackBerry() || r.iOS() || r.Opera() || r.Windows()
      );
    },
  };
  r.any()
    ? n("html").addClass("is-device")
    : n("html").removeClass("is-device");
});
/*!* VIEWPORT UNITS*/ jQuery(function (e) {
  function t() {
    var e = 0.01 * window.innerHeight;
    document.documentElement.style.setProperty("--vh", e + "px");
  }
  function n() {
    var e = 0.01 * window.innerHeight;
    document.documentElement.style.setProperty("--dvh", e + "px");
  }
  t(),
    n(),
    e(window).resize(function () {
      e("html.touchevents").length || t(), n();
    });
});
/*!*imagesLoaded PACKAGED v5.0.0 * JavaScript is all like "You images are done yet or what?" * MIT License*/ !(function (
  t,
  e,
) {
  "object" == typeof module && module.exports
    ? (module.exports = e())
    : (t.EvEmitter = e());
})("undefined" != typeof window ? window : this, function () {
  function t() {}
  let e = t.prototype;
  return (
    (e.on = function (t, e) {
      if (!t || !e) return this;
      let i = (this._events = this._events || {}),
        s = (i[t] = i[t] || []);
      return s.includes(e) || s.push(e), this;
    }),
    (e.once = function (t, e) {
      if (!t || !e) return this;
      this.on(t, e);
      let i = (this._onceEvents = this._onceEvents || {});
      return ((i[t] = i[t] || {})[e] = !0), this;
    }),
    (e.off = function (t, e) {
      let i = this._events && this._events[t];
      if (!i || !i.length) return this;
      let s = i.indexOf(e);
      return -1 != s && i.splice(s, 1), this;
    }),
    (e.emitEvent = function (t, e) {
      let i = this._events && this._events[t];
      if (!i || !i.length) return this;
      (i = i.slice(0)), (e = e || []);
      let s = this._onceEvents && this._onceEvents[t];
      for (let n of i) {
        s && s[n] && (this.off(t, n), delete s[n]), n.apply(this, e);
      }
      return this;
    }),
    (e.allOff = function () {
      return delete this._events, delete this._onceEvents, this;
    }),
    t
  );
}),
  /*!*imagesLoaded v5.0.0 * JavaScript is all like "You images are done yet or what?" * MIT License*/ (function (
    t,
    e,
  ) {
    "object" == typeof module && module.exports
      ? (module.exports = e(t, require("ev-emitter")))
      : (t.imagesLoaded = e(t, t.EvEmitter));
  })("undefined" != typeof window ? window : this, function (t, e) {
    let i = t.jQuery,
      s = t.console;
    function n(t, e, o) {
      if (!(this instanceof n)) return new n(t, e, o);
      let r = t;
      var h;
      ("string" == typeof t && (r = document.querySelectorAll(t)), r)
        ? ((this.elements =
            ((h = r),
            Array.isArray(h)
              ? h
              : "object" == typeof h && "number" == typeof h.length
                ? [...h]
                : [h])),
          (this.options = {}),
          "function" == typeof e ? (o = e) : Object.assign(this.options, e),
          o && this.on("always", o),
          this.getImages(),
          i && (this.jqDeferred = new i.Deferred()),
          setTimeout(this.check.bind(this)))
        : s.error(`Bad element for imagesLoaded ${r || t}`);
    }
    (n.prototype = Object.create(e.prototype)),
      (n.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      });
    const o = [1, 9, 11];
    n.prototype.addElementImages = function (t) {
      "IMG" === t.nodeName && this.addImage(t),
        !0 === this.options.background && this.addElementBackgroundImages(t);
      let { nodeType: e } = t;
      if (!e || !o.includes(e)) return;
      let i = t.querySelectorAll("img");
      for (let t of i) this.addImage(t);
      if ("string" == typeof this.options.background) {
        let e = t.querySelectorAll(this.options.background);
        for (let t of e) this.addElementBackgroundImages(t);
      }
    };
    const r = /url\((['"])?(.*?)\1\)/gi;
    function h(t) {
      this.img = t;
    }
    function d(t, e) {
      (this.url = t), (this.element = e), (this.img = new Image());
    }
    return (
      (n.prototype.addElementBackgroundImages = function (t) {
        let e = getComputedStyle(t);
        if (!e) return;
        let i = r.exec(e.backgroundImage);
        for (; null !== i; ) {
          let s = i && i[2];
          s && this.addBackground(s, t), (i = r.exec(e.backgroundImage));
        }
      }),
      (n.prototype.addImage = function (t) {
        let e = new h(t);
        this.images.push(e);
      }),
      (n.prototype.addBackground = function (t, e) {
        let i = new d(t, e);
        this.images.push(i);
      }),
      (n.prototype.check = function () {
        if (
          ((this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          !this.images.length)
        )
          return void this.complete();
        let t = (t, e, i) => {
          setTimeout(() => {
            this.progress(t, e, i);
          });
        };
        this.images.forEach(function (e) {
          e.once("progress", t), e.check();
        });
      }),
      (n.prototype.progress = function (t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emitEvent("progress", [this, t, e]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, t),
          this.progressedCount === this.images.length && this.complete(),
          this.options.debug && s && s.log(`progress: ${i}`, t, e);
      }),
      (n.prototype.complete = function () {
        let t = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(t, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          let t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (h.prototype = Object.create(e.prototype)),
      (h.prototype.check = function () {
        this.getIsImageComplete()
          ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.img.crossOrigin &&
              (this.proxyImage.crossOrigin = this.img.crossOrigin),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            (this.proxyImage.src = this.img.currentSrc || this.img.src));
      }),
      (h.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (h.prototype.confirm = function (t, e) {
        this.isLoaded = t;
        let { parentNode: i } = this.img,
          s = "PICTURE" === i.nodeName ? i : this.img;
        this.emitEvent("progress", [this, s, e]);
      }),
      (h.prototype.handleEvent = function (t) {
        let e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (h.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (h.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (h.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (d.prototype = Object.create(h.prototype)),
      (d.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url),
          this.getIsImageComplete() &&
            (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
            this.unbindEvents());
      }),
      (d.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (d.prototype.confirm = function (t, e) {
        (this.isLoaded = t),
          this.emitEvent("progress", [this, this.element, e]);
      }),
      (n.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery) &&
          ((i = e),
          (i.fn.imagesLoaded = function (t, e) {
            return new n(this, t, e).jqDeferred.promise(i(this));
          }));
      }),
      n.makeJQueryPlugin(),
      n
    );
  });
/*!*jquery-match-height master by liabru * http://brm.io/jquery-match-height/ * License: MIT*/ !(function (
  t,
) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "undefined" != typeof module && module.exports
      ? (module.exports = t(require("jquery")))
      : t(jQuery);
})(function (t) {
  var e = -1,
    o = -1,
    a = function (t) {
      return parseFloat(t) || 0;
    },
    n = function (e) {
      var o = t(e),
        n = null,
        i = [];
      return (
        o.each(function () {
          var e = t(this),
            o = e.offset().top - a(e.css("margin-top")),
            r = i.length > 0 ? i[i.length - 1] : null;
          null === r
            ? i.push(e)
            : Math.floor(Math.abs(n - o)) <= 1
              ? (i[i.length - 1] = r.add(e))
              : i.push(e),
            (n = o);
        }),
        i
      );
    },
    i = function (e) {
      var o = { byRow: !0, property: "height", target: null, remove: !1 };
      return "object" == typeof e
        ? t.extend(o, e)
        : ("boolean" == typeof e
            ? (o.byRow = e)
            : "remove" === e && (o.remove = !0),
          o);
    },
    r = (t.fn.matchHeight = function (e) {
      var o = i(e);
      if (o.remove) {
        var a = this;
        return (
          this.css(o.property, ""),
          t.each(r._groups, function (t, e) {
            e.elements = e.elements.not(a);
          }),
          this
        );
      }
      return this.length <= 1 && !o.target
        ? this
        : (r._groups.push({ elements: this, options: o }),
          r._apply(this, o),
          this);
    });
  (r.version = "master"),
    (r._groups = []),
    (r._throttle = 80),
    (r._maintainScroll = !1),
    (r._beforeUpdate = null),
    (r._afterUpdate = null),
    (r._rows = n),
    (r._parse = a),
    (r._parseOptions = i),
    (r._apply = function (e, o) {
      var s = i(o),
        h = t(e),
        l = [h],
        c = t(window).scrollTop(),
        p = t("html").outerHeight(!0),
        u = h.parents().filter(":hidden");
      return (
        u.each(function () {
          var e = t(this);
          e.data("style-cache", e.attr("style"));
        }),
        u.css("display", "block"),
        s.byRow &&
          !s.target &&
          (h.each(function () {
            var e = t(this),
              o = e.css("display");
            "inline-block" !== o &&
              "flex" !== o &&
              "inline-flex" !== o &&
              (o = "block"),
              e.data("style-cache", e.attr("style")),
              e.css({
                display: o,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden",
              });
          }),
          (l = n(h)),
          h.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "");
          })),
        t.each(l, function (e, o) {
          var n = t(o),
            i = 0;
          if (s.target) i = s.target.outerHeight(!1);
          else {
            if (s.byRow && n.length <= 1) return void n.css(s.property, "");
            n.each(function () {
              var e = t(this),
                o = e.attr("style"),
                a = e.css("display");
              "inline-block" !== a &&
                "flex" !== a &&
                "inline-flex" !== a &&
                (a = "block");
              var n = { display: a };
              (n[s.property] = ""),
                e.css(n),
                e.outerHeight(!1) > i && (i = e.outerHeight(!1)),
                o ? e.attr("style", o) : e.css("display", "");
            });
          }
          n.each(function () {
            var e = t(this),
              o = 0;
            (s.target && e.is(s.target)) ||
              ("border-box" !== e.css("box-sizing") &&
                ((o +=
                  a(e.css("border-top-width")) +
                  a(e.css("border-bottom-width"))),
                (o += a(e.css("padding-top")) + a(e.css("padding-bottom")))),
              e.css(s.property, i - o + "px"));
          });
        }),
        u.each(function () {
          var e = t(this);
          e.attr("style", e.data("style-cache") || null);
        }),
        r._maintainScroll &&
          t(window).scrollTop((c / p) * t("html").outerHeight(!0)),
        this
      );
    }),
    (r._applyDataApi = function () {
      var e = {};
      t("[data-match-height], [data-mh]").each(function () {
        var o = t(this),
          a = o.attr("data-mh") || o.attr("data-match-height");
        e[a] = a in e ? e[a].add(o) : o;
      }),
        t.each(e, function () {
          this.matchHeight(!0);
        });
    });
  var s = function (e) {
    r._beforeUpdate && r._beforeUpdate(e, r._groups),
      t.each(r._groups, function () {
        r._apply(this.elements, this.options);
      }),
      r._afterUpdate && r._afterUpdate(e, r._groups);
  };
  (r._update = function (a, n) {
    if (n && "resize" === n.type) {
      var i = t(window).width();
      if (i === e) return;
      e = i;
    }
    a
      ? -1 === o &&
        (o = setTimeout(function () {
          s(n), (o = -1);
        }, r._throttle))
      : s(n);
  }),
    t(r._applyDataApi);
  var h = t.fn.on ? "on" : "bind";
  t(window)[h]("load", function (t) {
    r._update(!1, t);
  }),
    t(window)[h]("resize orientationchange", function (t) {
      r._update(!0, t);
    });
});
