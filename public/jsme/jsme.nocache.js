function jsme() {
  var U = "",
    R = " top: -1000px;",
    pb = '" for "gwt:onLoadErrorFn"',
    nb = '" for "gwt:onPropertyErrorFn"',
    $ = '");',
    qb = "#",
    mc = ".cache.js",
    sb = "/",
    yb = "//",
    Vb = "0ADE505A5718D4BE2E0EE1B7C54CC163",
    kc = "4277561D0E87B89F4DFCCC3A712D5B19",
    lc = ":",
    Xb = ":1",
    Yb = ":10",
    Zb = ":11",
    $b = ":12",
    _b = ":13",
    ac = ":14",
    bc = ":15",
    cc = ":2",
    dc = ":3",
    ec = ":4",
    fc = ":5",
    gc = ":6",
    hc = ":7",
    ic = ":8",
    jc = ":9",
    hb = "::",
    T = "<!doctype html>",
    V = "<html><head><\/head><body><\/body><\/html>",
    kb = "=",
    rb = "?",
    Ab = "BackCompat",
    mb = 'Bad handler "',
    S = "CSS1Compat",
    Y = "Chrome",
    X = "DOMContentLoaded",
    M = "DUMMY",
    Fb = "android",
    xb = "base",
    vb = "baseUrl",
    H = "begin",
    N = "body",
    G = "bootstrap",
    ub = "clear.cache.gif",
    zb = "compat.mode",
    jb = "content",
    Bb = "drag_and_drop_support_html5",
    vc = "end",
    Z = 'eval("',
    Ub = "false",
    Pb = "gecko",
    Qb = "gecko1_8",
    I = "gwt.codesvr.jsme=",
    J = "gwt.codesvr=",
    tc = "gwt/chrome/chrome.css",
    uc = "gwt/chrome/mosaic.css",
    ob = "gwt:onLoadErrorFn",
    lb = "gwt:onPropertyErrorFn",
    ib = "gwt:property",
    db = "head",
    qc = "href",
    Ob = "ie6",
    Nb = "ie8",
    Mb = "ie9",
    O = "iframe",
    tb = "img",
    Eb = "ipad",
    Db = "iphone",
    Cb = "is_android_or_ios",
    ab = "javascript",
    P = 'javascript:""',
    sc = "jsa.css",
    K = "jsme",
    Tb = "jsme.devmode.js",
    wb = "jsme.nocache.js",
    gb = "jsme::",
    nc = "link",
    rc = "loadExternalRefs",
    eb = "meta",
    cb = "moduleRequested",
    bb = "moduleStartup",
    Lb = "msie",
    Gb = "msie_clipboard",
    fb = "name",
    Ib = "opera",
    Q = "position:absolute; width:0; height:0; border:none; left: -1000px;",
    oc = "rel",
    Kb = "safari",
    _ = "script",
    Sb = "selectingPermutation",
    L = "startup",
    pc = "stylesheet",
    Wb = "true",
    W = "undefined",
    Rb = "unknown",
    Hb = "user.agent",
    Jb = "webkit";
  var o = window;
  var p = document;
  r(G, H);
  function q() {
    var a = o.location.search;
    return a.indexOf(I) != -1 || a.indexOf(J) != -1;
  }
  function r(a, b) {
    if (o.__gwtStatsEvent) {
      o.__gwtStatsEvent({
        moduleName: K,
        sessionId: o.__gwtStatsSessionId,
        subSystem: L,
        evtGroup: a,
        millis: new Date().getTime(),
        type: b,
      });
    }
  }
  jsme.__sendStats = r;
  jsme.__moduleName = K;
  jsme.__errFn = null;
  jsme.__moduleBase = M;
  jsme.__softPermutationId = 0;
  jsme.__computePropValue = null;
  jsme.__getPropMap = null;
  jsme.__gwtInstallCode = function () {};
  jsme.__gwtStartLoadingFragment = function () {
    return null;
  };
  var s = function () {
    return false;
  };
  var t = function () {
    return null;
  };
  __propertyErrorFunction = null;
  var u = (o.__gwt_activeModules = o.__gwt_activeModules || {});
  u[K] = { moduleName: K };
  var v;
  function w() {
    y();
    return v;
  }
  function x() {
    y();
    return v.getElementsByTagName(N)[0];
  }
  function y() {
    if (v) {
      return;
    }
    var a = p.createElement(O);
    a.src = P;
    a.id = K;
    a.style.cssText = Q + R;
    a.tabIndex = -1;
    p.body.appendChild(a);
    v = a.contentDocument;
    if (!v) {
      v = a.contentWindow.document;
    }
    v.open();
    var b = document.compatMode == S ? T : U;
    v.write(b + V);
    v.close();
  }
  function z(k) {
    function l(a) {
      function b() {
        if (typeof p.readyState == W) {
          return typeof p.body != W && p.body != null;
        }
        return /loaded|complete/.test(p.readyState);
      }
      var c = b();
      if (c) {
        a();
        return;
      }
      function d() {
        if (!c) {
          c = true;
          a();
          if (p.removeEventListener) {
            p.removeEventListener(X, d, false);
          }
          if (e) {
            clearInterval(e);
          }
        }
      }
      if (p.addEventListener) {
        p.addEventListener(X, d, false);
      }
      var e = setInterval(function () {
        if (b()) {
          d();
        }
      }, 50);
    }
    function m(c) {
      function d(a, b) {
        a.removeChild(b);
      }
      var e = x();
      var f = w();
      var g;
      if (navigator.userAgent.indexOf(Y) > -1 && window.JSON) {
        var h = f.createDocumentFragment();
        h.appendChild(f.createTextNode(Z));
        for (var i = 0; i < c.length; i++) {
          var j = window.JSON.stringify(c[i]);
          h.appendChild(f.createTextNode(j.substring(1, j.length - 1)));
        }
        h.appendChild(f.createTextNode($));
        g = f.createElement(_);
        g.language = ab;
        g.appendChild(h);
        e.appendChild(g);
        d(e, g);
      } else {
        for (var i = 0; i < c.length; i++) {
          g = f.createElement(_);
          g.language = ab;
          g.text = c[i];
          e.appendChild(g);
          d(e, g);
        }
      }
    }
    jsme.onScriptDownloaded = function (a) {
      l(function () {
        m(a);
      });
    };
    r(bb, cb);
    var n = p.createElement(_);
    n.src = k;
    p.getElementsByTagName(db)[0].appendChild(n);
  }
  jsme.__startLoadingFragment = function (a) {
    return C(a);
  };
  jsme.__installRunAsyncCode = function (a) {
    var b = x();
    var c = w().createElement(_);
    c.language = ab;
    c.text = a;
    b.appendChild(c);
    b.removeChild(c);
  };
  function A() {
    var c = {};
    var d;
    var e;
    var f = p.getElementsByTagName(eb);
    for (var g = 0, h = f.length; g < h; ++g) {
      var i = f[g],
        j = i.getAttribute(fb),
        k;
      if (j) {
        j = j.replace(gb, U);
        if (j.indexOf(hb) >= 0) {
          continue;
        }
        if (j == ib) {
          k = i.getAttribute(jb);
          if (k) {
            var l,
              m = k.indexOf(kb);
            if (m >= 0) {
              j = k.substring(0, m);
              l = k.substring(m + 1);
            } else {
              j = k;
              l = U;
            }
            c[j] = l;
          }
        } else if (j == lb) {
          k = i.getAttribute(jb);
          if (k) {
            try {
              d = eval(k);
            } catch (a) {
              alert(mb + k + nb);
            }
          }
        } else if (j == ob) {
          k = i.getAttribute(jb);
          if (k) {
            try {
              e = eval(k);
            } catch (a) {
              alert(mb + k + pb);
            }
          }
        }
      }
    }
    t = function (a) {
      var b = c[a];
      return b == null ? null : b;
    };
    __propertyErrorFunction = d;
    jsme.__errFn = e;
  }
  function B() {
    function e(a) {
      var b = a.lastIndexOf(qb);
      if (b == -1) {
        b = a.length;
      }
      var c = a.indexOf(rb);
      if (c == -1) {
        c = a.length;
      }
      var d = a.lastIndexOf(sb, Math.min(c, b));
      return d >= 0 ? a.substring(0, d + 1) : U;
    }
    function f(a) {
      if (a.match(/^\w+:\/\//)) {
      } else {
        var b = p.createElement(tb);
        b.src = a + ub;
        a = e(b.src);
      }
      return a;
    }
    function g() {
      var a = t(vb);
      if (a != null) {
        return a;
      }
      return U;
    }
    function h() {
      var a = p.getElementsByTagName(_);
      for (var b = 0; b < a.length; ++b) {
        if (a[b].src.indexOf(wb) != -1) {
          return e(a[b].src);
        }
      }
      return U;
    }
    function i() {
      var a = p.getElementsByTagName(xb);
      if (a.length > 0) {
        return a[a.length - 1].href;
      }
      return U;
    }
    function j() {
      var a = p.location;
      return (
        a.href == a.protocol + yb + a.host + a.pathname + a.search + a.hash
      );
    }
    var k = g();
    if (k == U) {
      k = h();
    }
    if (k == U) {
      k = i();
    }
    if (k == U && j()) {
      k = e(p.location.href);
    }
    k = f(k);
    return k;
  }
  function C(a) {
    if (a.match(/^\//)) {
      return a;
    }
    if (a.match(/^[a-zA-Z]+:\/\//)) {
      return a;
    }
    return jsme.__moduleBase + a;
  }
  function D() {
    var f = [];
    var g;
    function h(a, b) {
      var c = f;
      for (var d = 0, e = a.length - 1; d < e; ++d) {
        c = c[a[d]] || (c[a[d]] = []);
      }
      c[a[e]] = b;
    }
    var i = [];
    var j = [];
    function k(a) {
      var b = j[a](),
        c = i[a];
      if (b in c) {
        return b;
      }
      var d = [];
      for (var e in c) {
        d[c[e]] = e;
      }
      if (__propertyErrorFunc) {
        __propertyErrorFunc(a, d, b);
      }
      throw null;
    }
    j[zb] = function () {
      return document.compatMode == S ? S : Ab;
    };
    i[zb] = { BackCompat: 0, CSS1Compat: 1 };
    j[Bb] = function () {
      return U + (window.FileReader != undefined);
    };
    i[Bb] = { false: 0, true: 1 };
    j[Cb] = function () {
      var a = navigator.userAgent.toLowerCase();
      return (
        U + (a.indexOf(Db) != -1 || a.indexOf(Eb) != -1 || a.indexOf(Fb) != -1)
      );
    };
    i[Cb] = { false: 0, true: 1 };
    j[Gb] = function () {
      return U + (window.clipboardData != undefined);
    };
    i[Gb] = { false: 0, true: 1 };
    j[Hb] = function () {
      var b = navigator.userAgent.toLowerCase();
      var c = function (a) {
        return parseInt(a[1]) * 1000 + parseInt(a[2]);
      };
      if (
        (function () {
          return b.indexOf(Ib) != -1;
        })()
      )
        return Ib;
      if (
        (function () {
          return b.indexOf(Jb) != -1;
        })()
      )
        return Kb;
      if (
        (function () {
          return b.indexOf(Lb) != -1 && p.documentMode >= 9;
        })()
      )
        return Mb;
      if (
        (function () {
          return b.indexOf(Lb) != -1 && p.documentMode >= 8;
        })()
      )
        return Nb;
      if (
        (function () {
          var a = /msie ([0-9]+)\.([0-9]+)/.exec(b);
          if (a && a.length == 3) return c(a) >= 6000;
        })()
      )
        return Ob;
      if (
        (function () {
          return b.indexOf(Pb) != -1;
        })()
      )
        return Qb;
      return Rb;
    };
    i[Hb] = { gecko1_8: 0, ie6: 1, ie8: 2, ie9: 3, opera: 4, safari: 5 };
    s = function (a, b) {
      return b in i[a];
    };
    jsme.__getPropMap = function () {
      var a = {};
      for (var b in i) {
        if (i.hasOwnProperty(b)) {
          a[b] = k(b);
        }
      }
      return a;
    };
    jsme.__computePropValue = k;
    o.__gwt_activeModules[K].bindings = jsme.__getPropMap;
    r(G, Sb);
    if (q()) {
      return C(Tb);
    }
    var l;
    try {
      h([Ab, Ub, Ub, Ub, Qb], Vb);
      h([Ab, Ub, Wb, Ub, Qb], Vb);
      h([Ab, Wb, Ub, Ub, Qb], Vb);
      h([Ab, Wb, Wb, Ub, Qb], Vb);
      h([Ab, Ub, Ub, Ub, Kb], Vb + Xb);
      h([Ab, Ub, Wb, Ub, Kb], Vb + Xb);
      h([Ab, Wb, Ub, Ub, Kb], Vb + Xb);
      h([Ab, Wb, Wb, Ub, Kb], Vb + Xb);
      h([Ab, Ub, Ub, Wb, Qb], Vb + Yb);
      h([Ab, Ub, Wb, Wb, Qb], Vb + Yb);
      h([Ab, Wb, Ub, Wb, Qb], Vb + Yb);
      h([Ab, Wb, Wb, Wb, Qb], Vb + Yb);
      h([Ab, Ub, Ub, Wb, Kb], Vb + Zb);
      h([Ab, Ub, Wb, Wb, Kb], Vb + Zb);
      h([Ab, Wb, Ub, Wb, Kb], Vb + Zb);
      h([Ab, Wb, Wb, Wb, Kb], Vb + Zb);
      h([Ab, Ub, Ub, Ub, Qb], Vb + $b);
      h([Ab, Ub, Wb, Ub, Qb], Vb + $b);
      h([Ab, Wb, Ub, Ub, Qb], Vb + $b);
      h([Ab, Wb, Wb, Ub, Qb], Vb + $b);
      h([Ab, Ub, Ub, Ub, Kb], Vb + _b);
      h([Ab, Ub, Wb, Ub, Kb], Vb + _b);
      h([Ab, Wb, Ub, Ub, Kb], Vb + _b);
      h([Ab, Wb, Wb, Ub, Kb], Vb + _b);
      h([Ab, Ub, Ub, Wb, Qb], Vb + ac);
      h([Ab, Ub, Wb, Wb, Qb], Vb + ac);
      h([Ab, Wb, Ub, Wb, Qb], Vb + ac);
      h([Ab, Wb, Wb, Wb, Qb], Vb + ac);
      h([Ab, Ub, Ub, Wb, Kb], Vb + bc);
      h([Ab, Ub, Wb, Wb, Kb], Vb + bc);
      h([Ab, Wb, Ub, Wb, Kb], Vb + bc);
      h([Ab, Wb, Wb, Wb, Kb], Vb + bc);
      h([Ab, Ub, Ub, Wb, Qb], Vb + cc);
      h([Ab, Ub, Wb, Wb, Qb], Vb + cc);
      h([Ab, Wb, Ub, Wb, Qb], Vb + cc);
      h([Ab, Wb, Wb, Wb, Qb], Vb + cc);
      h([Ab, Ub, Ub, Wb, Kb], Vb + dc);
      h([Ab, Ub, Wb, Wb, Kb], Vb + dc);
      h([Ab, Wb, Ub, Wb, Kb], Vb + dc);
      h([Ab, Wb, Wb, Wb, Kb], Vb + dc);
      h([Ab, Ub, Ub, Ub, Qb], Vb + ec);
      h([Ab, Ub, Wb, Ub, Qb], Vb + ec);
      h([Ab, Wb, Ub, Ub, Qb], Vb + ec);
      h([Ab, Wb, Wb, Ub, Qb], Vb + ec);
      h([Ab, Ub, Ub, Ub, Kb], Vb + fc);
      h([Ab, Ub, Wb, Ub, Kb], Vb + fc);
      h([Ab, Wb, Ub, Ub, Kb], Vb + fc);
      h([Ab, Wb, Wb, Ub, Kb], Vb + fc);
      h([Ab, Ub, Ub, Wb, Qb], Vb + gc);
      h([Ab, Ub, Wb, Wb, Qb], Vb + gc);
      h([Ab, Wb, Ub, Wb, Qb], Vb + gc);
      h([Ab, Wb, Wb, Wb, Qb], Vb + gc);
      h([Ab, Ub, Ub, Wb, Kb], Vb + hc);
      h([Ab, Ub, Wb, Wb, Kb], Vb + hc);
      h([Ab, Wb, Ub, Wb, Kb], Vb + hc);
      h([Ab, Wb, Wb, Wb, Kb], Vb + hc);
      h([Ab, Ub, Ub, Ub, Qb], Vb + ic);
      h([Ab, Ub, Wb, Ub, Qb], Vb + ic);
      h([Ab, Wb, Ub, Ub, Qb], Vb + ic);
      h([Ab, Wb, Wb, Ub, Qb], Vb + ic);
      h([Ab, Ub, Ub, Ub, Kb], Vb + jc);
      h([Ab, Ub, Wb, Ub, Kb], Vb + jc);
      h([Ab, Wb, Ub, Ub, Kb], Vb + jc);
      h([Ab, Wb, Wb, Ub, Kb], Vb + jc);
      h([S, Ub, Ub, Ub, Qb], kc);
      h([S, Ub, Wb, Ub, Qb], kc);
      h([S, Wb, Ub, Ub, Qb], kc);
      h([S, Wb, Wb, Ub, Qb], kc);
      h([S, Ub, Ub, Ub, Kb], kc + Xb);
      h([S, Ub, Wb, Ub, Kb], kc + Xb);
      h([S, Wb, Ub, Ub, Kb], kc + Xb);
      h([S, Wb, Wb, Ub, Kb], kc + Xb);
      h([S, Ub, Ub, Wb, Qb], kc + Yb);
      h([S, Ub, Wb, Wb, Qb], kc + Yb);
      h([S, Wb, Ub, Wb, Qb], kc + Yb);
      h([S, Wb, Wb, Wb, Qb], kc + Yb);
      h([S, Ub, Ub, Wb, Kb], kc + Zb);
      h([S, Ub, Wb, Wb, Kb], kc + Zb);
      h([S, Wb, Ub, Wb, Kb], kc + Zb);
      h([S, Wb, Wb, Wb, Kb], kc + Zb);
      h([S, Ub, Ub, Ub, Qb], kc + $b);
      h([S, Ub, Wb, Ub, Qb], kc + $b);
      h([S, Wb, Ub, Ub, Qb], kc + $b);
      h([S, Wb, Wb, Ub, Qb], kc + $b);
      h([S, Ub, Ub, Ub, Kb], kc + _b);
      h([S, Ub, Wb, Ub, Kb], kc + _b);
      h([S, Wb, Ub, Ub, Kb], kc + _b);
      h([S, Wb, Wb, Ub, Kb], kc + _b);
      h([S, Ub, Ub, Wb, Qb], kc + ac);
      h([S, Ub, Wb, Wb, Qb], kc + ac);
      h([S, Wb, Ub, Wb, Qb], kc + ac);
      h([S, Wb, Wb, Wb, Qb], kc + ac);
      h([S, Ub, Ub, Wb, Kb], kc + bc);
      h([S, Ub, Wb, Wb, Kb], kc + bc);
      h([S, Wb, Ub, Wb, Kb], kc + bc);
      h([S, Wb, Wb, Wb, Kb], kc + bc);
      h([S, Ub, Ub, Wb, Qb], kc + cc);
      h([S, Ub, Wb, Wb, Qb], kc + cc);
      h([S, Wb, Ub, Wb, Qb], kc + cc);
      h([S, Wb, Wb, Wb, Qb], kc + cc);
      h([S, Ub, Ub, Wb, Kb], kc + dc);
      h([S, Ub, Wb, Wb, Kb], kc + dc);
      h([S, Wb, Ub, Wb, Kb], kc + dc);
      h([S, Wb, Wb, Wb, Kb], kc + dc);
      h([S, Ub, Ub, Ub, Qb], kc + ec);
      h([S, Ub, Wb, Ub, Qb], kc + ec);
      h([S, Wb, Ub, Ub, Qb], kc + ec);
      h([S, Wb, Wb, Ub, Qb], kc + ec);
      h([S, Ub, Ub, Ub, Kb], kc + fc);
      h([S, Ub, Wb, Ub, Kb], kc + fc);
      h([S, Wb, Ub, Ub, Kb], kc + fc);
      h([S, Wb, Wb, Ub, Kb], kc + fc);
      h([S, Ub, Ub, Wb, Qb], kc + gc);
      h([S, Ub, Wb, Wb, Qb], kc + gc);
      h([S, Wb, Ub, Wb, Qb], kc + gc);
      h([S, Wb, Wb, Wb, Qb], kc + gc);
      h([S, Ub, Ub, Wb, Kb], kc + hc);
      h([S, Ub, Wb, Wb, Kb], kc + hc);
      h([S, Wb, Ub, Wb, Kb], kc + hc);
      h([S, Wb, Wb, Wb, Kb], kc + hc);
      h([S, Ub, Ub, Ub, Qb], kc + ic);
      h([S, Ub, Wb, Ub, Qb], kc + ic);
      h([S, Wb, Ub, Ub, Qb], kc + ic);
      h([S, Wb, Wb, Ub, Qb], kc + ic);
      h([S, Ub, Ub, Ub, Kb], kc + jc);
      h([S, Ub, Wb, Ub, Kb], kc + jc);
      h([S, Wb, Ub, Ub, Kb], kc + jc);
      h([S, Wb, Wb, Ub, Kb], kc + jc);
      l = f[k(zb)][k(Bb)][k(Cb)][k(Gb)][k(Hb)];
      var m = l.indexOf(lc);
      if (m != -1) {
        g = parseInt(l.substring(m + 1), 10);
        l = l.substring(0, m);
      }
    } catch (a) {}
    jsme.__softPermutationId = g;
    return C(l + mc);
  }
  function E() {
    if (!o.__gwt_stylesLoaded) {
      o.__gwt_stylesLoaded = {};
    }
    function c(a) {
      if (!__gwt_stylesLoaded[a]) {
        var b = p.createElement(nc);
        b.setAttribute(oc, pc);
        b.setAttribute(qc, C(a));
        p.getElementsByTagName(db)[0].appendChild(b);
        __gwt_stylesLoaded[a] = true;
      }
    }
    r(rc, H);
    c(sc);
    c(tc);
    c(uc);
    r(rc, vc);
  }
  A();
  jsme.__moduleBase = B();
  u[K].moduleBase = jsme.__moduleBase;
  var F = D();
  E();
  r(G, vc);
  z(F);
  return true;
}
jsme.succeeded = jsme();
