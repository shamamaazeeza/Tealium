(function() {



    geolocation = {};
    geolocation.requestGeo = function(c) {
        geolocation.cdn3Requested = +new Date;
        var b = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            a = document.createElement("script");
        a.type = "text/javascript";
        a.async = !0;
        a.src = c;
        b.insertBefore(a, b.firstChild)
    };


    var optly = {
        nativity: {}
    };
    optly.nativity.getNativeGetElementsByClassName = function() {
        var a = document.getElementsByClassName;
        if (!optly.nativity.isNativeFunction(a)) var a = (window.optimizely || {}).getElementsByClassName,
            b = (window.optly || {}).getElementsByClassName,
            a = optly.nativity.isNativeFunction(a) ? a : optly.nativity.isNativeFunction(b) ? b : null;
        return a
    };
    optly.nativity.isNativeFunction = function(a) {
        return a && -1 !== String(a).indexOf("[native code]")
    };
    optly.Cleanse = {};
    optly.Cleanse.each = function(a, b, d) {
        var h = !!Object.prototype.__lookupGetter__,
            e = !!Object.prototype.__lookupSetter__,
            c;
        for (c in a)
            if (a.hasOwnProperty(c)) {
                var f = h ? a.__lookupGetter__(c) : null,
                    g = e ? a.__lookupSetter__(c) : null;
                try {
                    b.call(d, c, !f ? a[c] : null, f, g)
                } catch (i) {}
            }
    };
    optly.Cleanse.finish = function() {
        if (optly.Cleanse.running) {
            optly.Cleanse.running = !1;
            optly.Cleanse.each(optly.Cleanse.types, function(a, d) {
                Object.prototype.__defineGetter__ && optly.Cleanse.each(optly.Cleanse.getters[a], function(c, b) {
                    d.prototype.__defineGetter__(c, b);
                    optly.Cleanse.log("restored getter", a, c)
                });
                Object.prototype.__defineSetter__ && optly.Cleanse.each(optly.Cleanse.setters[a], function(c, b) {
                    d.prototype.__defineSetter__(c, b);
                    optly.Cleanse.log("restored setter", a, c)
                });
                optly.Cleanse.each(optly.Cleanse.properties[a],
                    function(b, f) {
                        d.prototype[b] = f;
                        optly.Cleanse.log("restored property", a, b)
                    })
            });
            optly.Cleanse.unfixGetElementsByClassName();
            optly.Cleanse.log("finish");
            var a = window.console;
            if ((-1 !== window.location.hash.indexOf("optimizely_log=true") || -1 !== window.location.search.indexOf("optimizely_log=true")) && a && a.log)
                for (var b = optly.Cleanse.logs, d = 0; d < b.length; d++) a.log(b[d])
        }
    };
    optly.Cleanse.log = function(a, b, d) {
        b ? (b = b.replace(/_/g, ""), optly.Cleanse.logs.push("Optimizely / Info / Cleanse / " + a + ": " + b + "." + d)) : optly.Cleanse.logs.push("Optimizely / Info / Cleanse / " + a)
    };
    optly.Cleanse.start = function() {
        var a = window.location.hostname;
        if (!(-1 !== a.indexOf("optimizely") && -1 === a.indexOf("edit") && -1 === a.indexOf("preview") && -1 === a.indexOf("test")))
            if (optly.Cleanse.running) optly.Cleanse.log("already running so didn't start");
            else {
                optly.Cleanse.log("start");
                optly.Cleanse.running = !0;
                for (var b in optly.Cleanse.types) optly.Cleanse.types[b] || delete optly.Cleanse.types[b];
                optly.Cleanse.each(optly.Cleanse.types, function(a, b) {
                    optly.Cleanse.getters[a] = {};
                    optly.Cleanse.properties[a] = {};
                    optly.Cleanse.setters[a] = {};
                    optly.Cleanse.each(b.prototype, function(e, c, f, g) {
                        optly.nativity.isNativeFunction(c) || optly.nativity.isNativeFunction(f) || optly.nativity.isNativeFunction(g) ? optly.Cleanse.log("ignore native code", a, e) : (f ? (optly.Cleanse.getters[a][e] = f, optly.Cleanse.log("cleansed getter", a, e)) : (optly.Cleanse.properties[a][e] = c, optly.Cleanse.log("cleansed property", a, e)), g && (optly.Cleanse.setters[a][e] = g, optly.Cleanse.log("cleansed setter", a, e)), delete b.prototype[e])
                    })
                });
                optly.Cleanse.fixGetElementsByClassName();
                optly.Cleanse.hasRunStart = !0
            }
    };
    optly.Cleanse.fixGetElementsByClassName = function() {
        if (!optly.nativity.isNativeFunction(document.getElementsByClassName)) {
            var a = optly.nativity.getNativeGetElementsByClassName();
            a ? (optly.Cleanse.getElementsByClassName = document.getElementsByClassName, document.getElementsByClassName = a) : optly.Cleanse.log("Error: native HTMLElement.prototype.getElementsByClassName missing")
        }
    };
    optly.Cleanse.unfixGetElementsByClassName = function() {
        optly.Cleanse.getElementsByClassName && (document.getElementsByClassName = optly.Cleanse.getElementsByClassName, optly.Cleanse.getElementsByClassName = null)
    };
    optly.Cleanse.getElementsByClassName = null;
    optly.Cleanse.getters = {};
    optly.Cleanse.logs = [];
    optly.Cleanse.properties = {};
    optly.Cleanse.setters = {};
    optly.Cleanse.types = {
        Object_: Object
    };
    window.optly = window.optly || {};
    window.optly.Cleanse = {
        finish: optly.Cleanse.finish,
        logs: optly.Cleanse.logs,
        start: optly.Cleanse.start
    };
    optly.Cleanse.start();
    var $ = function(r, m) {
        function ya(a, b, c) {
            if (c === m && 1 === a.nodeType)
                if (c = "data-" + b.replace(kb, "-$1").toLowerCase(), c = a.getAttribute(c), "string" === typeof c) {
                    try {
                        c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : !d.isNaN(c) ? parseFloat(c) : lb.test(c) ? d.parseJSON(c) : c
                    } catch (g) {}
                    d.data(a, b, c)
                } else c = m;
            return c
        }

        function ha(a) {
            for (var b in a)
                if ("toJSON" !== b) return !1;
            return !0
        }

        function za(a, b, c) {
            var g = b + "defer",
                e = b + "queue",
                f = b + "mark",
                h = d.data(a, g, m, !0);
            h && (("queue" === c || !d.data(a, e, m, !0)) && ("mark" === c || !d.data(a,
                f, m, !0))) && setTimeout(function() {
                !d.data(a, e, m, !0) && !d.data(a, f, m, !0) && (d.removeData(a, g, !0), h.resolve())
            }, 0)
        }

        function w() {
            return !1
        }

        function O() {
            return !0
        }

        function Aa(a, b, c) {
            var g = d.extend({}, c[0]);
            g.type = a;
            g.originalEvent = {};
            g.liveFired = m;
            d.event.handle.call(b, g);
            g.isDefaultPrevented() && c[0].preventDefault()
        }

        function mb(a) {
            var b, c, g, e, f, h, i, j, k, m, l, q = [];
            e = [];
            f = d._data(this, "events");
            if (!(a.liveFired === this || !f || !f.live || a.target.disabled || a.button && "click" === a.type)) {
                a.namespace && (l = RegExp("(^|\\.)" +
                    a.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)"));
                a.liveFired = this;
                var n = f.live.slice(0);
                for (i = 0; i < n.length; i++) f = n[i], f.origType.replace(ia, "") === a.type ? e.push(f.selector) : n.splice(i--, 1);
                e = d(a.target).closest(e, a.currentTarget);
                j = 0;
                for (k = e.length; j < k; j++) {
                    m = e[j];
                    for (i = 0; i < n.length; i++)
                        if (f = n[i], m.selector === f.selector && (!l || l.test(f.namespace)) && !m.elem.disabled) {
                            h = m.elem;
                            g = null;
                            if ("mouseenter" === f.preType || "mouseleave" === f.preType) a.type = f.preType, (g = d(a.relatedTarget).closest(f.selector)[0]) &&
                                d.contains(h, g) && (g = h);
                            (!g || g !== h) && q.push({
                                elem: h,
                                handleObj: f,
                                level: m.level
                            })
                        }
                }
                j = 0;
                for (k = q.length; j < k; j++) {
                    e = q[j];
                    if (c && e.level > c) break;
                    a.currentTarget = e.elem;
                    a.data = e.handleObj.data;
                    a.handleObj = e.handleObj;
                    l = e.handleObj.origHandler.apply(e.elem, arguments);
                    if (!1 === l || a.isPropagationStopped())
                        if (c = e.level, !1 === l && (b = !1), a.isImmediatePropagationStopped()) break
                }
                return b
            }
        }

        function P(a, b) {
            return (a && "*" !== a ? a + "." : "") + b.replace(nb, "`").replace(ob, "&")
        }

        function Ba(a, b, c) {
            b = b || 0;
            if (d.isFunction(b)) return d.grep(a,
                function(a, g) {
                    return !!b.call(a, g, a) === c
                });
            if (b.nodeType) return d.grep(a, function(a) {
                return a === b === c
            });
            if ("string" === typeof b) {
                var g = d.grep(a, function(a) {
                    return 1 === a.nodeType
                });
                if (pb.test(b)) return d.filter(b, g, !c);
                b = d.filter(b, g)
            }
            return d.grep(a, function(a) {
                return 0 <= d.inArray(a, b) === c
            })
        }

        function Ca(a, b) {
            if (1 === b.nodeType && d.hasData(a)) {
                var c = d.expando,
                    g = d.data(a),
                    e = d.data(b, g);
                if (g = g[c]) {
                    var f = g.events,
                        e = e[c] = d.extend({}, g);
                    if (f) {
                        delete e.handle;
                        e.events = {};
                        for (var h in f) {
                            c = 0;
                            for (g = f[h].length; c <
                                g; c++) d.event.add(b, h + (f[h][c].namespace ? "." : "") + f[h][c].namespace, f[h][c], f[h][c].data)
                        }
                    }
                }
            }
        }

        function Da(a, b) {
            var c;
            if (1 === b.nodeType) {
                b.clearAttributes && b.clearAttributes();
                b.mergeAttributes && b.mergeAttributes(a);
                c = b.nodeName.toLowerCase();
                if ("object" === c) b.outerHTML = a.outerHTML;
                else if ("input" === c && ("checkbox" === a.type || "radio" === a.type)) {
                    if (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value) b.value = a.value
                } else if ("option" === c) b.selected = a.defaultSelected;
                else if ("input" === c ||
                    "textarea" === c) b.defaultValue = a.defaultValue;
                b.removeAttribute(d.expando)
            }
        }

        function Q(a) {
            return "getElementsByTagName" in a ? a.getElementsByTagName("*") : "querySelectorAll" in a ? a.querySelectorAll("*") : []
        }

        function Ea(a) {
            if ("checkbox" === a.type || "radio" === a.type) a.defaultChecked = a.checked
        }

        function Fa(a) {
            d.nodeName(a, "input") ? Ea(a) : "getElementsByTagName" in a && d.grep(a.getElementsByTagName("input"), Ea)
        }

        function qb(a, b) {
            b.src ? d.ajax({
                url: b.src,
                async: !1,
                dataType: "script"
            }) : d.globalEval((b.text || b.textContent ||
                b.innerHTML || "").replace(rb, "/*$0*/"));
            b.parentNode && b.parentNode.removeChild(b)
        }

        function Ga(a, b, c) {
            var g = "width" === b ? a.offsetWidth : a.offsetHeight,
                e = "width" === b ? sb : tb;
            if (0 < g) return "border" !== c && d.each(e, function() {
                c || (g -= parseFloat(d.css(a, "padding" + this)) || 0);
                g = "margin" === c ? g + (parseFloat(d.css(a, c + this)) || 0) : g - (parseFloat(d.css(a, "border" + this + "Width")) || 0)
            }), g + "px";
            g = A(a, b, b);
            if (0 > g || null == g) g = a.style[b] || 0;
            g = parseFloat(g) || 0;
            c && d.each(e, function() {
                g += parseFloat(d.css(a, "padding" + this)) || 0;
                "padding" !==
                c && (g += parseFloat(d.css(a, "border" + this + "Width")) || 0);
                "margin" === c && (g += parseFloat(d.css(a, c + this)) || 0)
            });
            return g + "px"
        }
        var l = r.document,
            d, Ha = function() {
                if (!k.isReady) {
                    try {
                        l.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(Ha, 1);
                        return
                    }
                    k.ready()
                }
            },
            k = function(a, b) {
                return new k.fn.init(a, b, Ia)
            },
            ub = r.jQuery,
            vb = r.$,
            Ia, wb = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            Ja = /\S/,
            Ka = /^\s+/,
            La = /\s+$/,
            xb = /\d/,
            yb = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
            zb = /^[\],:{}\s]*$/,
            Ab = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            Bb = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            Cb = /(?:^|:|,)(?:\s*\[)+/g,
            Db = /(webkit)[ \/]([\w.]+)/,
            Eb = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            Fb = /(msie) ([\w.]+)/,
            Gb = /(mozilla)(?:.*? rv:([\w.]+))?/,
            Hb = /-([a-z]|[0-9])/ig,
            Ib = /^-ms-/,
            Jb = function(a, b) {
                return (b + "").toUpperCase()
            },
            Kb = r.navigator.userAgent,
            R, S, B, Lb = Object.prototype.toString,
            ja = Object.prototype.hasOwnProperty,
            ka = Array.prototype.push,
            I = Array.prototype.slice,
            Ma = String.prototype.trim,
            Na = Array.prototype.indexOf,
            Oa = {};
        k.fn = k.prototype = {
            constructor: k,
            init: function(a, b, c) {
                var g;
                if (!a) return this;
                if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
                if ("body" === a && !b && l.body) return this.context = l, this[0] = l.body, this.selector = a, this.length = 1, this;
                if ("string" === typeof a) {
                    if ((g = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : wb.exec(a)) && (g[1] || !b)) {
                        if (g[1]) return c = (b = b instanceof k ? b[0] : b) ? b.ownerDocument || b : l, (a = yb.exec(a)) ? k.isPlainObject(b) ? (a = [l.createElement(a[1])], k.fn.attr.call(a, b, !0)) : a = [c.createElement(a[1])] : (a = k.buildFragment([g[1]], [c]), a = (a.cacheable ?
                            k.clone(a.fragment) : a.fragment).childNodes), k.merge(this, a);
                        if ((b = l.getElementById(g[2])) && b.parentNode) {
                            if (b.id !== g[2]) return c.find(a);
                            this.length = 1;
                            this[0] = b
                        }
                        this.context = l;
                        this.selector = a;
                        return this
                    }
                    return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a)
                }
                if (k.isFunction(a)) return c.ready(a);
                a.selector !== m && (this.selector = a.selector, this.context = a.context);
                return k.makeArray(a, this)
            },
            selector: "",
            jquery: "1.6.4",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return I.call(this,
                    0)
            },
            get: function(a) {
                return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
            },
            pushStack: function(a, b, c) {
                var g = this.constructor();
                k.isArray(a) ? ka.apply(g, a) : k.merge(g, a);
                g.prevObject = this;
                g.context = this.context;
                "find" === b ? g.selector = this.selector + (this.selector ? " " : "") + c : b && (g.selector = this.selector + "." + b + "(" + c + ")");
                return g
            },
            each: function(a, b) {
                return k.each(this, a, b)
            },
            ready: function(a) {
                k.bindReady();
                S.done(a);
                return this
            },
            eq: function(a) {
                return -1 === a ? this.slice(a) : this.slice(a, +a + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(I.apply(this, arguments), "slice", I.call(arguments).join(","))
            },
            map: function(a) {
                return this.pushStack(k.map(this, function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: ka,
            sort: [].sort,
            splice: [].splice
        };
        k.fn.init.prototype = k.fn;
        k.extend = k.fn.extend = function() {
            var a, b, c, g, d, f = arguments[0] || {},
                h = 1,
                i = arguments.length,
                j = !1;
            "boolean" === typeof f && (j = f, f = arguments[1] || {}, h = 2);
            "object" !==
            typeof f && !k.isFunction(f) && (f = {});
            i === h && (f = this, --h);
            for (; h < i; h++)
                if (null != (a = arguments[h]))
                    for (b in a) c = f[b], g = a[b], f !== g && (j && g && (k.isPlainObject(g) || (d = k.isArray(g))) ? (d ? (d = !1, c = c && k.isArray(c) ? c : []) : c = c && k.isPlainObject(c) ? c : {}, f[b] = k.extend(j, c, g)) : g !== m && (f[b] = g));
            return f
        };
        k.extend({
            noConflict: function(a) {
                r.$ === k && (r.$ = vb);
                a && r.jQuery === k && (r.jQuery = ub);
                return k
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) {
                a ? k.readyWait++ : k.ready(!0)
            },
            ready: function(a) {
                if (!0 === a && !--k.readyWait || !0 !== a &&
                    !k.isReady) {
                    if (!l.body) return setTimeout(k.ready, 1);
                    k.isReady = !0;
                    !0 !== a && 0 < --k.readyWait || (S.resolveWith(l, [k]), k.fn.trigger && k(l).trigger("ready").unbind("ready"))
                }
            },
            bindReady: function() {
                if (!S) {
                    S = k._Deferred();
                    if ("complete" === l.readyState) return setTimeout(k.ready, 1);
                    if (l.addEventListener) l.addEventListener("DOMContentLoaded", B, !1), r.addEventListener("load", k.ready, !1);
                    else if (l.attachEvent) {
                        l.attachEvent("onreadystatechange", B);
                        r.attachEvent("onload", k.ready);
                        var a = !1;
                        try {
                            a = null == r.frameElement
                        } catch (b) {}
                        l.documentElement.doScroll &&
                            a && Ha()
                    }
                }
            },
            isFunction: function(a) {
                return "function" === k.type(a)
            },
            isArray: Array.isArray || function(a) {
                return "array" === k.type(a)
            },
            isWindow: function(a) {
                return a && "object" === typeof a && "setInterval" in a
            },
            isNaN: function(a) {
                return null == a || !xb.test(a) || isNaN(a)
            },
            type: function(a) {
                return null == a ? String(a) : Oa[Lb.call(a)] || "object"
            },
            isPlainObject: function(a) {
                if (!a || "object" !== k.type(a) || a.nodeType || k.isWindow(a)) return !1;
                try {
                    if (a.constructor && !ja.call(a, "constructor") && !ja.call(a.constructor.prototype, "isPrototypeOf")) return !1
                } catch (b) {
                    return !1
                }
                for (var c in a);
                return c === m || ja.call(a, c)
            },
            isEmptyObject: function(a) {
                for (var b in a) return !1;
                return !0
            },
            error: function(a) {
                throw a;
            },
            parseJSON: function(a) {
                if ("string" !== typeof a || !a) return null;
                a = k.trim(a);
                if (r.JSON && r.JSON.parse) return r.JSON.parse(a);
                if (zb.test(a.replace(Ab, "@").replace(Bb, "]").replace(Cb, ""))) return (new Function("return " + a))();
                k.error("Invalid JSON: " + a)
            },
            parseXML: function(a) {
                var b, c;
                try {
                    r.DOMParser ? (c = new DOMParser, b = c.parseFromString(a, "text/xml")) : (b = new ActiveXObject("Microsoft.XMLDOM"), b.async =
                        "false", b.loadXML(a))
                } catch (g) {
                    b = m
                }(!b || !b.documentElement || b.getElementsByTagName("parsererror").length) && k.error("Invalid XML: " + a);
                return b
            },
            noop: function() {},
            globalEval: function(a) {
                a && Ja.test(a) && (r.execScript || function(a) {
                    r.eval.call(r, a)
                })(a)
            },
            camelCase: function(a) {
                return a.replace(Ib, "ms-").replace(Hb, Jb)
            },
            nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
            },
            each: function(a, b, c) {
                var g, d = 0,
                    f = a.length,
                    h = f === m || k.isFunction(a);
                if (c)
                    if (h)
                        for (g in a) {
                            if (!1 === b.apply(a[g],
                                    c)) break
                        } else
                            for (; d < f && !1 !== b.apply(a[d++], c););
                    else if (h)
                    for (g in a) {
                        if (!1 === b.call(a[g], g, a[g])) break
                    } else
                        for (; d < f && !1 !== b.call(a[d], d, a[d++]););
                return a
            },
            trim: Ma ? function(a) {
                return null == a ? "" : Ma.call(a)
            } : function(a) {
                return null == a ? "" : a.toString().replace(Ka, "").replace(La, "")
            },
            makeArray: function(a, b) {
                var c = b || [];
                if (null != a) {
                    var g = k.type(a);
                    null == a.length || "string" === g || "function" === g || "regexp" === g || k.isWindow(a) ? ka.call(c, a) : k.merge(c, a)
                }
                return c
            },
            inArray: function(a, b) {
                if (!b) return -1;
                if (Na) return Na.call(b,
                    a);
                for (var c = 0, g = b.length; c < g; c++)
                    if (b[c] === a) return c;
                return -1
            },
            merge: function(a, b) {
                var c = a.length,
                    g = 0;
                if ("number" === typeof b.length)
                    for (var d = b.length; g < d; g++) a[c++] = b[g];
                else
                    for (; b[g] !== m;) a[c++] = b[g++];
                a.length = c;
                return a
            },
            grep: function(a, b, c) {
                for (var g = [], d, c = !!c, f = 0, h = a.length; f < h; f++) d = !!b(a[f], f), c !== d && g.push(a[f]);
                return g
            },
            map: function(a, b, c) {
                var g, d, f = [],
                    h = 0,
                    i = a.length;
                if (a instanceof k || i !== m && "number" === typeof i && (0 < i && a[0] && a[i - 1] || 0 === i || k.isArray(a)))
                    for (; h < i; h++) g = b(a[h], h, c), null !=
                        g && (f[f.length] = g);
                else
                    for (d in a) g = b(a[d], d, c), null != g && (f[f.length] = g);
                return f.concat.apply([], f)
            },
            guid: 1,
            proxy: function(a, b) {
                if ("string" === typeof b) var c = a[b],
                    b = a,
                    a = c;
                if (!k.isFunction(a)) return m;
                var d = I.call(arguments, 2),
                    c = function() {
                        return a.apply(b, d.concat(I.call(arguments)))
                    };
                c.guid = a.guid = a.guid || c.guid || k.guid++;
                return c
            },
            access: function(a, b, c, d, e, f) {
                var h = a.length;
                if ("object" === typeof b) {
                    for (var i in b) k.access(a, i, b[i], d, e, c);
                    return a
                }
                if (c !== m) {
                    d = !f && d && k.isFunction(c);
                    for (i = 0; i < h; i++) e(a[i],
                        b, d ? c.call(a[i], i, e(a[i], b)) : c, f);
                    return a
                }
                return h ? e(a[0], b) : m
            },
            now: function() {
                return (new Date).getTime()
            },
            uaMatch: function(a) {
                a = a.toLowerCase();
                a = Db.exec(a) || Eb.exec(a) || Fb.exec(a) || 0 > a.indexOf("compatible") && Gb.exec(a) || [];
                return {
                    browser: a[1] || "",
                    version: a[2] || "0"
                }
            },
            sub: function() {
                function a(b, d) {
                    return new a.fn.init(b, d)
                }
                k.extend(!0, a, this);
                a.superclass = this;
                a.fn = a.prototype = this();
                a.fn.constructor = a;
                a.sub = this.sub;
                a.fn.init = function(c, d) {
                    d && (d instanceof k && !(d instanceof a)) && (d = a(d));
                    return k.fn.init.call(this,
                        c, d, b)
                };
                a.fn.init.prototype = a.fn;
                var b = a(l);
                return a
            },
            browser: {}
        });
        k.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
            Oa["[object " + b + "]"] = b.toLowerCase()
        });
        R = k.uaMatch(Kb);
        R.browser && (k.browser[R.browser] = !0, k.browser.version = R.version);
        k.browser.webkit && (k.browser.safari = !0);
        Ja.test("\u00a0") && (Ka = /^[\s\xA0]+/, La = /[\s\xA0]+$/);
        Ia = k(l);
        l.addEventListener ? B = function() {
            l.removeEventListener("DOMContentLoaded", B, false);
            k.ready()
        } : l.attachEvent && (B = function() {
            if (l.readyState ===
                "complete") {
                l.detachEvent("onreadystatechange", B);
                k.ready()
            }
        });
        d = k;
        var la = "done fail isResolved isRejected promise then always pipe".split(" "),
            Pa = [].slice;
        d.extend({
            _Deferred: function() {
                var a = [],
                    b, c, g, e = {
                        done: function() {
                            if (!g) {
                                var c = arguments,
                                    h, i, j, k, m;
                                if (b) {
                                    m = b;
                                    b = 0
                                }
                                h = 0;
                                for (i = c.length; h < i; h++) {
                                    j = c[h];
                                    k = d.type(j);
                                    k === "array" ? e.done.apply(e, j) : k === "function" && a.push(j)
                                }
                                m && e.resolveWith(m[0], m[1])
                            }
                            return this
                        },
                        resolveWith: function(d, e) {
                            if (!g && !b && !c) {
                                e = e || [];
                                c = 1;
                                try {
                                    for (; a[0];) a.shift().apply(d, e)
                                } finally {
                                    b = [d, e];
                                    c = 0
                                }
                            }
                            return this
                        },
                        resolve: function() {
                            e.resolveWith(this, arguments);
                            return this
                        },
                        isResolved: function() {
                            return !(!c && !b)
                        },
                        cancel: function() {
                            g = 1;
                            a = [];
                            return this
                        }
                    };
                return e
            },
            Deferred: function(a) {
                var b = d._Deferred(),
                    c = d._Deferred(),
                    g;
                d.extend(b, {
                    then: function(a, c) {
                        b.done(a).fail(c);
                        return this
                    },
                    always: function() {
                        return b.done.apply(b, arguments).fail.apply(this, arguments)
                    },
                    fail: c.done,
                    rejectWith: c.resolveWith,
                    reject: c.resolve,
                    isRejected: c.isResolved,
                    pipe: function(a, c) {
                        return d.Deferred(function(g) {
                            d.each({
                                done: [a,
                                    "resolve"
                                ],
                                fail: [c, "reject"]
                            }, function(a, c) {
                                var f = c[0],
                                    e = c[1],
                                    k;
                                if (d.isFunction(f)) b[a](function() {
                                    if ((k = f.apply(this, arguments)) && d.isFunction(k.promise)) k.promise().then(g.resolve, g.reject);
                                    else g[e + "With"](this === b ? g : this, [k])
                                });
                                else b[a](g[e])
                            })
                        }).promise()
                    },
                    promise: function(a) {
                        if (a == null) {
                            if (g) return g;
                            g = a = {}
                        }
                        for (var c = la.length; c--;) a[la[c]] = b[la[c]];
                        return a
                    }
                });
                b.done(c.cancel).fail(b.cancel);
                delete b.cancel;
                a && a.call(b, b);
                return b
            },
            when: function(a) {
                function b(a) {
                    return function(b) {
                        c[a] = arguments.length >
                            1 ? Pa.call(arguments, 0) : b;
                        --f || h.resolveWith(h, Pa.call(c, 0))
                    }
                }
                var c = arguments,
                    g = 0,
                    e = c.length,
                    f = e,
                    h = e <= 1 && a && d.isFunction(a.promise) ? a : d.Deferred();
                if (e > 1) {
                    for (; g < e; g++) c[g] && d.isFunction(c[g].promise) ? c[g].promise().then(b(g), h.reject) : --f;
                    f || h.resolveWith(h, c)
                } else h !== a && h.resolveWith(h, e ? [a] : []);
                return h.promise()
            }
        });
        var Mb = d,
            ma;
        var o = l.createElement("div"),
            Nb = l.documentElement,
            na, C, T, U, u, D, s, V, J, W, x, X, K, Y, E, F;
        o.setAttribute("className", "t");
        o.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        na = o.getElementsByTagName("*");
        C = o.getElementsByTagName("a")[0];
        if (!na || !na.length || !C) ma = {};
        else {
            T = l.createElement("select");
            U = T.appendChild(l.createElement("option"));
            u = o.getElementsByTagName("input")[0];
            s = {
                leadingWhitespace: 3 === o.firstChild.nodeType,
                tbody: !o.getElementsByTagName("tbody").length,
                htmlSerialize: !!o.getElementsByTagName("link").length,
                style: /top/.test(C.getAttribute("style")),
                hrefNormalized: "/a" === C.getAttribute("href"),
                opacity: /^0.55$/.test(C.style.opacity),
                cssFloat: !!C.style.cssFloat,
                checkOn: "on" === u.value,
                optSelected: U.selected,
                getSetAttribute: "t" !== o.className,
                submitBubbles: !0,
                changeBubbles: !0,
                focusinBubbles: !1,
                deleteExpando: !0,
                noCloneEvent: !0,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableMarginRight: !0
            };
            u.checked = !0;
            s.noCloneChecked = u.cloneNode(!0).checked;
            T.disabled = !0;
            s.optDisabled = !U.disabled;
            try {
                delete o.test
            } catch (jc) {
                s.deleteExpando = !1
            }!o.addEventListener && (o.attachEvent && o.fireEvent) && (o.attachEvent("onclick", function() {
                s.noCloneEvent = false
            }), o.cloneNode(!0).fireEvent("onclick"));
            u = l.createElement("input");
            u.value = "t";
            u.setAttribute("type", "radio");
            s.radioValue = "t" === u.value;
            u.setAttribute("checked", "checked");
            o.appendChild(u);
            V = l.createDocumentFragment();
            V.appendChild(o.firstChild);
            s.checkClone = V.cloneNode(!0).cloneNode(!0).lastChild.checked;
            o.innerHTML = "";
            o.style.width = o.style.paddingLeft = "1px";
            J = l.getElementsByTagName("body")[0];
            x = l.createElement(J ? "div" : "body");
            X = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            J && d.extend(X, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (E in X) x.style[E] = X[E];
            x.appendChild(o);
            W = J || Nb;
            W.insertBefore(x, W.firstChild);
            s.appendChecked = u.checked;
            s.boxModel = 2 === o.offsetWidth;
            "zoom" in o.style && (o.style.display = "inline", o.style.zoom = 1, s.inlineBlockNeedsLayout = 2 === o.offsetWidth, o.style.display = "", o.innerHTML = "<div style='width:4px;'></div>", s.shrinkWrapBlocks = 2 !== o.offsetWidth);
            o.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
            K = o.getElementsByTagName("td");
            F = 0 === K[0].offsetHeight;
            K[0].style.display = "";
            K[1].style.display = "none";
            s.reliableHiddenOffsets = F && 0 === K[0].offsetHeight;
            o.innerHTML = "";
            l.defaultView && l.defaultView.getComputedStyle && (D = l.createElement("div"), D.style.width = "0", D.style.marginRight = "0", o.appendChild(D), s.reliableMarginRight = 0 === (parseInt((l.defaultView.getComputedStyle(D, null) || {
                marginRight: 0
            }).marginRight, 10) || 0));
            x.innerHTML = "";
            W.removeChild(x);
            if (o.attachEvent)
                for (E in {
                        submit: 1,
                        change: 1,
                        focusin: 1
                    }) Y = "on" + E, F = Y in o, F || (o.setAttribute(Y,
                    "return;"), F = "function" === typeof o[Y]), s[E + "Bubbles"] = F;
            x = V = T = U = J = D = o = u = null;
            ma = s
        }
        Mb.support = ma;
        d.boxModel = d.support.boxModel;
        var lb = /^(?:\{.*\}|\[.*\])$/,
            kb = /([A-Z])/g;
        d.extend({
            cache: {},
            uuid: 0,
            expando: "jQuery" + (d.fn.jquery + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function(a) {
                a = a.nodeType ? d.cache[a[d.expando]] : a[d.expando];
                return !!a && !ha(a)
            },
            data: function(a, b, c, g) {
                if (d.acceptData(a)) {
                    var e = d.expando,
                        f = typeof b === "string",
                        h = a.nodeType,
                        i = h ? d.cache : a,
                        j = h ? a[d.expando] : a[d.expando] && d.expando;
                    if (j && (!g || !j || !i[j] || i[j][e]) || !(f && c === m)) {
                        if (!j) h ? a[d.expando] = j = ++d.uuid : j = d.expando;
                        if (!i[j]) {
                            i[j] = {};
                            if (!h) i[j].toJSON = d.noop
                        }
                        if (typeof b === "object" || typeof b === "function") g ? i[j][e] = d.extend(i[j][e], b) : i[j] = d.extend(i[j], b);
                        a = i[j];
                        if (g) {
                            a[e] || (a[e] = {});
                            a = a[e]
                        }
                        c !== m && (a[d.camelCase(b)] = c);
                        if (b === "events" && !a[b]) return a[e] && a[e].events;
                        if (f) {
                            c = a[b];
                            c == null && (c = a[d.camelCase(b)])
                        } else c = a;
                        return c
                    }
                }
            },
            removeData: function(a, b, c) {
                if (d.acceptData(a)) {
                    var g,
                        e = d.expando,
                        f = a.nodeType,
                        h = f ? d.cache : a,
                        i = f ? a[d.expando] : d.expando;
                    if (h[i]) {
                        if (b)
                            if (g = c ? h[i][e] : h[i]) {
                                g[b] || (b = d.camelCase(b));
                                delete g[b];
                                if (!ha(g)) return
                            }
                        if (c) {
                            delete h[i][e];
                            if (!ha(h[i])) return
                        }
                        b = h[i][e];
                        d.support.deleteExpando || !h.setInterval ? delete h[i] : h[i] = null;
                        if (b) {
                            h[i] = {};
                            if (!f) h[i].toJSON = d.noop;
                            h[i][e] = b
                        } else f && (d.support.deleteExpando ? delete a[d.expando] : a.removeAttribute ? a.removeAttribute(d.expando) : a[d.expando] = null)
                    }
                }
            },
            _data: function(a, b, c) {
                return d.data(a, b, c, true)
            },
            acceptData: function(a) {
                if (a.nodeName) {
                    var b =
                        d.noData[a.nodeName.toLowerCase()];
                    if (b) return !(b === true || a.getAttribute("classid") !== b)
                }
                return true
            }
        });
        d.fn.extend({
            data: function(a, b) {
                var c = null;
                if (typeof a === "undefined") {
                    if (this.length) {
                        c = d.data(this[0]);
                        if (this[0].nodeType === 1)
                            for (var g = this[0].attributes, e, f = 0, h = g.length; f < h; f++) {
                                e = g[f].name;
                                if (e.indexOf("data-") === 0) {
                                    e = d.camelCase(e.substring(5));
                                    ya(this[0], e, c[e])
                                }
                            }
                    }
                    return c
                }
                if (typeof a === "object") return this.each(function() {
                    d.data(this, a)
                });
                var i = a.split(".");
                i[1] = i[1] ? "." + i[1] : "";
                if (b ===
                    m) {
                    c = this.triggerHandler("getData" + i[1] + "!", [i[0]]);
                    if (c === m && this.length) {
                        c = d.data(this[0], a);
                        c = ya(this[0], a, c)
                    }
                    return c === m && i[1] ? this.data(i[0]) : c
                }
                return this.each(function() {
                    var c = d(this),
                        g = [i[0], b];
                    c.triggerHandler("setData" + i[1] + "!", g);
                    d.data(this, a, b);
                    c.triggerHandler("changeData" + i[1] + "!", g)
                })
            },
            removeData: function(a) {
                return this.each(function() {
                    d.removeData(this, a)
                })
            }
        });
        d.extend({
            _mark: function(a, b) {
                if (a) {
                    b = (b || "fx") + "mark";
                    d.data(a, b, (d.data(a, b, m, true) || 0) + 1, true)
                }
            },
            _unmark: function(a, b,
                c) {
                if (a !== true) {
                    c = b;
                    b = a;
                    a = false
                }
                if (b) {
                    var c = c || "fx",
                        g = c + "mark";
                    if (a = a ? 0 : (d.data(b, g, m, true) || 1) - 1) d.data(b, g, a, true);
                    else {
                        d.removeData(b, g, true);
                        za(b, c, "mark")
                    }
                }
            },
            queue: function(a, b, c) {
                if (a) {
                    var b = (b || "fx") + "queue",
                        g = d.data(a, b, m, true);
                    c && (!g || d.isArray(c) ? g = d.data(a, b, d.makeArray(c), true) : g.push(c));
                    return g || []
                }
            },
            dequeue: function(a, b) {
                var b = b || "fx",
                    c = d.queue(a, b),
                    g = c.shift();
                g === "inprogress" && (g = c.shift());
                if (g) {
                    b === "fx" && c.unshift("inprogress");
                    g.call(a, function() {
                        d.dequeue(a, b)
                    })
                }
                if (!c.length) {
                    d.removeData(a,
                        b + "queue", true);
                    za(a, b, "queue")
                }
            }
        });
        d.fn.extend({
            queue: function(a, b) {
                if (typeof a !== "string") {
                    b = a;
                    a = "fx"
                }
                return b === m ? d.queue(this[0], a) : this.each(function() {
                    var c = d.queue(this, a, b);
                    a === "fx" && c[0] !== "inprogress" && d.dequeue(this, a)
                })
            },
            dequeue: function(a) {
                return this.each(function() {
                    d.dequeue(this, a)
                })
            },
            delay: function(a, b) {
                a = d.fx ? d.fx.speeds[a] || a : a;
                b = b || "fx";
                return this.queue(b, function() {
                    var c = this;
                    setTimeout(function() {
                        d.dequeue(c, b)
                    }, a)
                })
            },
            clearQueue: function(a) {
                return this.queue(a || "fx", [])
            },
            promise: function(a) {
                function b() {
                    --f ||
                        c.resolveWith(g, [g])
                }
                typeof a !== "string" && (a = m);
                for (var a = a || "fx", c = d.Deferred(), g = this, e = g.length, f = 1, h = a + "defer", i = a + "queue", a = a + "mark", j; e--;)
                    if (j = d.data(g[e], h, m, true) || (d.data(g[e], i, m, true) || d.data(g[e], a, m, true)) && d.data(g[e], h, d._Deferred(), true)) {
                        f++;
                        j.done(b)
                    }
                b();
                return c.promise()
            }
        });
        var Qa = /[\n\t\r]/g,
            oa = /\s+/,
            Ob = /\r/g,
            Pb = /^(?:button|input)$/i,
            Qb = /^(?:button|input|object|select|textarea)$/i,
            Rb = /^a(?:rea)?$/i,
            Ra = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            y, Sa;
        d.fn.extend({
            attr: function(a, b) {
                return d.access(this, a, b, true, d.attr)
            },
            removeAttr: function(a) {
                return this.each(function() {
                    d.removeAttr(this, a)
                })
            },
            prop: function(a, b) {
                return d.access(this, a, b, true, d.prop)
            },
            removeProp: function(a) {
                a = d.propFix[a] || a;
                return this.each(function() {
                    try {
                        this[a] = m;
                        delete this[a]
                    } catch (b) {}
                })
            },
            addClass: function(a) {
                var b, c, g, e, f, h, i;
                if (d.isFunction(a)) return this.each(function(b) {
                    d(this).addClass(a.call(this, b, this.className))
                });
                if (a && typeof a === "string") {
                    b = a.split(oa);
                    c =
                        0;
                    for (g = this.length; c < g; c++) {
                        e = this[c];
                        if (e.nodeType === 1)
                            if (!e.className && b.length === 1) e.className = a;
                            else {
                                f = " " + e.className + " ";
                                h = 0;
                                for (i = b.length; h < i; h++) ~f.indexOf(" " + b[h] + " ") || (f = f + (b[h] + " "));
                                e.className = d.trim(f)
                            }
                    }
                }
                return this
            },
            removeClass: function(a) {
                var b, c, g, e, f, h, i;
                if (d.isFunction(a)) return this.each(function(b) {
                    d(this).removeClass(a.call(this, b, this.className))
                });
                if (a && typeof a === "string" || a === m) {
                    b = (a || "").split(oa);
                    c = 0;
                    for (g = this.length; c < g; c++) {
                        e = this[c];
                        if (e.nodeType === 1 && e.className)
                            if (a) {
                                f =
                                    (" " + e.className + " ").replace(Qa, " ");
                                h = 0;
                                for (i = b.length; h < i; h++) f = f.replace(" " + b[h] + " ", " ");
                                e.className = d.trim(f)
                            } else e.className = ""
                    }
                }
                return this
            },
            toggleClass: function(a, b) {
                var c = typeof a,
                    g = typeof b === "boolean";
                return d.isFunction(a) ? this.each(function(c) {
                    d(this).toggleClass(a.call(this, c, this.className, b), b)
                }) : this.each(function() {
                    if (c === "string")
                        for (var e, f = 0, h = d(this), i = b, j = a.split(oa); e = j[f++];) {
                            i = g ? i : !h.hasClass(e);
                            h[i ? "addClass" : "removeClass"](e)
                        } else if (c === "undefined" || c === "boolean") {
                            this.className &&
                                d._data(this, "__className__", this.className);
                            this.className = this.className || a === false ? "" : d._data(this, "__className__") || ""
                        }
                })
            },
            hasClass: function(a) {
                for (var a = " " + a + " ", b = 0, c = this.length; b < c; b++)
                    if (this[b].nodeType === 1 && (" " + this[b].className + " ").replace(Qa, " ").indexOf(a) > -1) return true;
                return false
            },
            val: function(a) {
                var b, c, g = this[0];
                if (!arguments.length) {
                    if (g) {
                        if ((b = d.valHooks[g.nodeName.toLowerCase()] || d.valHooks[g.type]) && "get" in b && (c = b.get(g, "value")) !== m) return c;
                        c = g.value;
                        return typeof c ===
                            "string" ? c.replace(Ob, "") : c == null ? "" : c
                    }
                    return m
                }
                var e = d.isFunction(a);
                return this.each(function(c) {
                    var g = d(this);
                    if (this.nodeType === 1) {
                        c = e ? a.call(this, c, g.val()) : a;
                        c == null ? c = "" : typeof c === "number" ? c = c + "" : d.isArray(c) && (c = d.map(c, function(a) {
                            return a == null ? "" : a + ""
                        }));
                        b = d.valHooks[this.nodeName.toLowerCase()] || d.valHooks[this.type];
                        if (!b || !("set" in b) || b.set(this, c, "value") === m) this.value = c
                    }
                })
            }
        });
        d.extend({
            valHooks: {
                option: {
                    get: function(a) {
                        var b = a.attributes.value;
                        return !b || b.specified ? a.value : a.text
                    }
                },
                select: {
                    get: function(a) {
                        var b, c = a.selectedIndex,
                            g = [],
                            e = a.options,
                            a = a.type === "select-one";
                        if (c < 0) return null;
                        for (var f = a ? c : 0, h = a ? c + 1 : e.length; f < h; f++) {
                            b = e[f];
                            if (b.selected && (d.support.optDisabled ? !b.disabled : b.getAttribute("disabled") === null) && (!b.parentNode.disabled || !d.nodeName(b.parentNode, "optgroup"))) {
                                b = d(b).val();
                                if (a) return b;
                                g.push(b)
                            }
                        }
                        return a && !g.length && e.length ? d(e[c]).val() : g
                    },
                    set: function(a, b) {
                        var c = d.makeArray(b);
                        d(a).find("option").each(function() {
                            this.selected = d.inArray(d(this).val(),
                                c) >= 0
                        });
                        if (!c.length) a.selectedIndex = -1;
                        return c
                    }
                }
            },
            attrFn: {
                val: !0,
                css: !0,
                html: !0,
                text: !0,
                data: !0,
                width: !0,
                height: !0,
                offset: !0
            },
            attrFix: {
                tabindex: "tabIndex"
            },
            attr: function(a, b, c, g) {
                var e = a.nodeType;
                if (!a || e === 3 || e === 8 || e === 2) return m;
                if (g && b in d.attrFn) return d(a)[b](c);
                if (!("getAttribute" in a)) return d.prop(a, b, c);
                var f, h;
                if (g = e !== 1 || !d.isXMLDoc(a)) {
                    b = d.attrFix[b] || b;
                    (h = d.attrHooks[b]) || (Ra.test(b) ? h = Sa : y && (h = y))
                }
                if (c !== m) {
                    if (c === null) {
                        d.removeAttr(a, b);
                        return m
                    }
                    if (h && "set" in h && g && (f = h.set(a, c,
                            b)) !== m) return f;
                    a.setAttribute(b, "" + c);
                    return c
                }
                if (h && "get" in h && g && (f = h.get(a, b)) !== null) return f;
                f = a.getAttribute(b);
                return f === null ? m : f
            },
            removeAttr: function(a, b) {
                var c;
                if (a.nodeType === 1) {
                    b = d.attrFix[b] || b;
                    d.attr(a, b, "");
                    a.removeAttribute(b);
                    if (Ra.test(b) && (c = d.propFix[b] || b) in a) a[c] = false
                }
            },
            attrHooks: {
                type: {
                    set: function(a, b) {
                        if (Pb.test(a.nodeName) && a.parentNode) d.error("type property can't be changed");
                        else if (!d.support.radioValue && b === "radio" && d.nodeName(a, "input")) {
                            var c = a.value;
                            a.setAttribute("type",
                                b);
                            if (c) a.value = c;
                            return b
                        }
                    }
                },
                value: {
                    get: function(a, b) {
                        return y && d.nodeName(a, "button") ? y.get(a, b) : b in a ? a.value : null
                    },
                    set: function(a, b, c) {
                        if (y && d.nodeName(a, "button")) return y.set(a, b, c);
                        a.value = b
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function(a, b, c) {
                var g =
                    a.nodeType;
                if (!a || g === 3 || g === 8 || g === 2) return m;
                var e, f;
                if (g !== 1 || !d.isXMLDoc(a)) {
                    b = d.propFix[b] || b;
                    f = d.propHooks[b]
                }
                return c !== m ? f && "set" in f && (e = f.set(a, c, b)) !== m ? e : a[b] = c : f && "get" in f && (e = f.get(a, b)) !== null ? e : a[b]
            },
            propHooks: {
                tabIndex: {
                    get: function(a) {
                        var b = a.getAttributeNode("tabindex");
                        return b && b.specified ? parseInt(b.value, 10) : Qb.test(a.nodeName) || Rb.test(a.nodeName) && a.href ? 0 : m
                    }
                }
            }
        });
        d.attrHooks.tabIndex = d.propHooks.tabIndex;
        Sa = {
            get: function(a, b) {
                var c;
                return d.prop(a, b) === true || (c = a.getAttributeNode(b)) &&
                    c.nodeValue !== false ? b.toLowerCase() : m
            },
            set: function(a, b, c) {
                if (b === false) d.removeAttr(a, c);
                else {
                    b = d.propFix[c] || c;
                    b in a && (a[b] = true);
                    a.setAttribute(c, c.toLowerCase())
                }
                return c
            }
        };
        d.support.getSetAttribute || (y = d.valHooks.button = {
            get: function(a, b) {
                var c;
                return (c = a.getAttributeNode(b)) && c.nodeValue !== "" ? c.nodeValue : m
            },
            set: function(a, b, c) {
                var d = a.getAttributeNode(c);
                if (!d) {
                    d = l.createAttribute(c);
                    a.setAttributeNode(d)
                }
                return d.nodeValue = b + ""
            }
        }, d.each(["width", "height"], function(a, b) {
            d.attrHooks[b] = d.extend(d.attrHooks[b], {
                set: function(a, d) {
                    if (d === "") {
                        a.setAttribute(b, "auto");
                        return d
                    }
                }
            })
        }));
        d.support.hrefNormalized || d.each(["href", "src", "width", "height"], function(a, b) {
            d.attrHooks[b] = d.extend(d.attrHooks[b], {
                get: function(a) {
                    a = a.getAttribute(b, 2);
                    return a === null ? m : a
                }
            })
        });
        d.support.style || (d.attrHooks.style = {
            get: function(a) {
                return a.style.cssText.toLowerCase() || m
            },
            set: function(a, b) {
                return a.style.cssText = "" + b
            }
        });
        d.support.optSelected || (d.propHooks.selected = d.extend(d.propHooks.selected, {
            get: function(a) {
                if (a = a.parentNode) {
                    a.selectedIndex;
                    a.parentNode && a.parentNode.selectedIndex
                }
                return null
            }
        }));
        d.support.checkOn || d.each(["radio", "checkbox"], function() {
            d.valHooks[this] = {
                get: function(a) {
                    return a.getAttribute("value") === null ? "on" : a.value
                }
            }
        });
        d.each(["radio", "checkbox"], function() {
            d.valHooks[this] = d.extend(d.valHooks[this], {
                set: function(a, b) {
                    if (d.isArray(b)) return a.checked = d.inArray(d(a).val(), b) >= 0
                }
            })
        });
        var ia = /\.(.*)$/,
            pa = /^(?:textarea|input|select)$/i,
            nb = /\./g,
            ob = / /g,
            Sb = /[^\w\s.|`]/g,
            Tb = function(a) {
                return a.replace(Sb, "\\$&")
            };
        d.event = {
            add: function(a, b, c, g) {
                if (!(a.nodeType === 3 || a.nodeType === 8)) {
                    if (c === false) c = w;
                    else if (!c) return;
                    var e, f;
                    if (c.handler) {
                        e = c;
                        c = e.handler
                    }
                    if (!c.guid) c.guid = d.guid++;
                    if (f = d._data(a)) {
                        var h = f.events,
                            i = f.handle;
                        if (!h) f.events = h = {};
                        if (!i) f.handle = i = function(a) {
                            return typeof d !== "undefined" && (!a || d.event.triggered !== a.type) ? d.event.handle.apply(i.elem, arguments) : m
                        };
                        i.elem = a;
                        for (var b = b.split(" "), j, k = 0, l; j = b[k++];) {
                            f = e ? d.extend({}, e) : {
                                handler: c,
                                data: g
                            };
                            if (j.indexOf(".") > -1) {
                                l = j.split(".");
                                j = l.shift();
                                f.namespace =
                                    l.slice(0).sort().join(".")
                            } else {
                                l = [];
                                f.namespace = ""
                            }
                            f.type = j;
                            if (!f.guid) f.guid = c.guid;
                            var n = h[j],
                                q = d.event.special[j] || {};
                            if (!n) {
                                n = h[j] = [];
                                if (!q.setup || q.setup.call(a, g, l, i) === false) a.addEventListener ? a.addEventListener(j, i, false) : a.attachEvent && a.attachEvent("on" + j, i)
                            }
                            if (q.add) {
                                q.add.call(a, f);
                                if (!f.handler.guid) f.handler.guid = c.guid
                            }
                            n.push(f);
                            d.event.global[j] = true
                        }
                        a = null
                    }
                }
            },
            global: {},
            remove: function(a, b, c, g) {
                if (!(a.nodeType === 3 || a.nodeType === 8)) {
                    c === false && (c = w);
                    var e, f, h = 0,
                        i, j, k, l, n, q, p = d.hasData(a) &&
                        d._data(a),
                        o = p && p.events;
                    if (p && o) {
                        if (b && b.type) {
                            c = b.handler;
                            b = b.type
                        }
                        if (!b || typeof b === "string" && b.charAt(0) === ".") {
                            b = b || "";
                            for (e in o) d.event.remove(a, e + b)
                        } else {
                            for (b = b.split(" "); e = b[h++];) {
                                l = e;
                                i = e.indexOf(".") < 0;
                                j = [];
                                if (!i) {
                                    j = e.split(".");
                                    e = j.shift();
                                    k = RegExp("(^|\\.)" + d.map(j.slice(0).sort(), Tb).join("\\.(?:.*\\.)?") + "(\\.|$)")
                                }
                                if (n = o[e])
                                    if (c) {
                                        l = d.event.special[e] || {};
                                        for (f = g || 0; f < n.length; f++) {
                                            q = n[f];
                                            if (c.guid === q.guid) {
                                                if (i || k.test(q.namespace)) {
                                                    g == null && n.splice(f--, 1);
                                                    l.remove && l.remove.call(a,
                                                        q)
                                                }
                                                if (g != null) break
                                            }
                                        }
                                        if (n.length === 0 || g != null && n.length === 1) {
                                            (!l.teardown || l.teardown.call(a, j) === false) && d.removeEvent(a, e, p.handle);
                                            delete o[e]
                                        }
                                    } else
                                        for (f = 0; f < n.length; f++) {
                                            q = n[f];
                                            if (i || k.test(q.namespace)) {
                                                d.event.remove(a, l, q.handler, f);
                                                n.splice(f--, 1)
                                            }
                                        }
                            }
                            if (d.isEmptyObject(o)) {
                                if (b = p.handle) b.elem = null;
                                delete p.events;
                                delete p.handle;
                                d.isEmptyObject(p) && d.removeData(a, m, true)
                            }
                        }
                    }
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function(a, b, c, g) {
                var e = a.type || a,
                    f = [],
                    h;
                if (e.indexOf("!") >=
                    0) {
                    e = e.slice(0, -1);
                    h = true
                }
                if (e.indexOf(".") >= 0) {
                    f = e.split(".");
                    e = f.shift();
                    f.sort()
                }
                if (c && !d.event.customEvent[e] || d.event.global[e]) {
                    a = typeof a === "object" ? a[d.expando] ? a : new d.Event(e, a) : new d.Event(e);
                    a.type = e;
                    a.exclusive = h;
                    a.namespace = f.join(".");
                    a.namespace_re = RegExp("(^|\\.)" + f.join("\\.(?:.*\\.)?") + "(\\.|$)");
                    if (g || !c) {
                        a.preventDefault();
                        a.stopPropagation()
                    }
                    if (c) {
                        if (!(c.nodeType === 3 || c.nodeType === 8)) {
                            a.result = m;
                            a.target = c;
                            b = b != null ? d.makeArray(b) : [];
                            b.unshift(a);
                            f = c;
                            g = e.indexOf(":") < 0 ? "on" +
                                e : "";
                            do {
                                h = d._data(f, "handle");
                                a.currentTarget = f;
                                h && h.apply(f, b);
                                if (g && d.acceptData(f) && f[g] && f[g].apply(f, b) === false) {
                                    a.result = false;
                                    a.preventDefault()
                                }
                                f = f.parentNode || f.ownerDocument || f === a.target.ownerDocument && r
                            } while (f && !a.isPropagationStopped());
                            if (!a.isDefaultPrevented()) {
                                var i, f = d.event.special[e] || {};
                                if ((!f._default || f._default.call(c.ownerDocument, a) === false) && !(e === "click" && d.nodeName(c, "a")) && d.acceptData(c)) {
                                    try {
                                        if (g && c[e]) {
                                            (i = c[g]) && (c[g] = null);
                                            d.event.triggered = e;
                                            c[e]()
                                        }
                                    } catch (j) {}
                                    i &&
                                        (c[g] = i);
                                    d.event.triggered = m
                                }
                            }
                            return a.result
                        }
                    } else d.each(d.cache, function() {
                        var c = this[d.expando];
                        c && (c.events && c.events[e]) && d.event.trigger(a, b, c.handle.elem)
                    })
                }
            },
            handle: function(a) {
                var a = d.event.fix(a || r.event),
                    b = ((d._data(this, "events") || {})[a.type] || []).slice(0),
                    c = !a.exclusive && !a.namespace,
                    g = Array.prototype.slice.call(arguments, 0);
                g[0] = a;
                a.currentTarget = this;
                for (var e = 0, f = b.length; e < f; e++) {
                    var h = b[e];
                    if (c || a.namespace_re.test(h.namespace)) {
                        a.handler = h.handler;
                        a.data = h.data;
                        a.handleObj = h;
                        h =
                            h.handler.apply(this, g);
                        if (h !== m) {
                            a.result = h;
                            if (h === false) {
                                a.preventDefault();
                                a.stopPropagation()
                            }
                        }
                        if (a.isImmediatePropagationStopped()) break
                    }
                }
                return a.result
            },
            props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
            fix: function(a) {
                if (a[d.expando]) return a;
                for (var b = a, a = d.Event(b), c = this.props.length, g; c;) {
                    g = this.props[--c];
                    a[g] = b[g]
                }
                if (!a.target) a.target = a.srcElement || l;
                if (a.target.nodeType === 3) a.target = a.target.parentNode;
                if (!a.relatedTarget && a.fromElement) a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
                if (a.pageX == null && a.clientX != null) {
                    c = a.target.ownerDocument || l;
                    b = c.documentElement;
                    c = c.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b && b.clientLeft || c && c.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop ||
                        0) - (b && b.clientTop || c && c.clientTop || 0)
                }
                if (a.which == null && (a.charCode != null || a.keyCode != null)) a.which = a.charCode != null ? a.charCode : a.keyCode;
                if (!a.metaKey && a.ctrlKey) a.metaKey = a.ctrlKey;
                if (!a.which && a.button !== m) a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
                return a
            },
            guid: 1E8,
            proxy: d.proxy,
            special: {
                ready: {
                    setup: d.bindReady,
                    teardown: d.noop
                },
                live: {
                    add: function(a) {
                        d.event.add(this, P(a.origType, a.selector), d.extend({}, a, {
                            handler: mb,
                            guid: a.handler.guid
                        }))
                    },
                    remove: function(a) {
                        d.event.remove(this, P(a.origType,
                            a.selector), a)
                    }
                },
                beforeunload: {
                    setup: function(a, b, c) {
                        if (d.isWindow(this)) this.onbeforeunload = c
                    },
                    teardown: function(a, b) {
                        if (this.onbeforeunload === b) this.onbeforeunload = null
                    }
                }
            }
        };
        d.removeEvent = l.removeEventListener ? function(a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, false)
        } : function(a, b, c) {
            a.detachEvent && a.detachEvent("on" + b, c)
        };
        d.Event = function(a, b) {
            if (!this.preventDefault) return new d.Event(a, b);
            if (a && a.type) {
                this.originalEvent = a;
                this.type = a.type;
                this.isDefaultPrevented = a.defaultPrevented ||
                    a.returnValue === false || a.getPreventDefault && a.getPreventDefault() ? O : w
            } else this.type = a;
            b && d.extend(this, b);
            this.timeStamp = d.now();
            this[d.expando] = true
        };
        d.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = O;
                var a = this.originalEvent;
                if (a) a.preventDefault ? a.preventDefault() : a.returnValue = false
            },
            stopPropagation: function() {
                this.isPropagationStopped = O;
                var a = this.originalEvent;
                if (a) {
                    a.stopPropagation && a.stopPropagation();
                    a.cancelBubble = true
                }
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped =
                    O;
                this.stopPropagation()
            },
            isDefaultPrevented: w,
            isPropagationStopped: w,
            isImmediatePropagationStopped: w
        };
        var Ta = function(a) {
                var b = a.relatedTarget,
                    c = false,
                    g = a.type;
                a.type = a.data;
                if (b !== this) {
                    b && (c = d.contains(this, b));
                    if (!c) {
                        d.event.handle.apply(this, arguments);
                        a.type = g
                    }
                }
            },
            Ua = function(a) {
                a.type = a.data;
                d.event.handle.apply(this, arguments)
            };
        d.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(a, b) {
            d.event.special[a] = {
                setup: function(c) {
                    d.event.add(this, b, c && c.selector ? Ua : Ta, a)
                },
                teardown: function(a) {
                    d.event.remove(this,
                        b, a && a.selector ? Ua : Ta)
                }
            }
        });
        d.support.submitBubbles || (d.event.special.submit = {
            setup: function() {
                if (d.nodeName(this, "form")) return false;
                d.event.add(this, "click.specialSubmit", function(a) {
                    var b = a.target,
                        c = d.nodeName(b, "input") || d.nodeName(b, "button") ? b.type : "";
                    (c === "submit" || c === "image") && d(b).closest("form").length && Aa("submit", this, arguments)
                });
                d.event.add(this, "keypress.specialSubmit", function(a) {
                    var b = a.target,
                        c = d.nodeName(b, "input") || d.nodeName(b, "button") ? b.type : "";
                    (c === "text" || c === "password") &&
                    (d(b).closest("form").length && a.keyCode === 13) && Aa("submit", this, arguments)
                })
            },
            teardown: function() {
                d.event.remove(this, ".specialSubmit")
            }
        });
        if (!d.support.changeBubbles) {
            var L, Va = function(a) {
                    var b = d.nodeName(a, "input") ? a.type : "",
                        c = a.value;
                    if (b === "radio" || b === "checkbox") c = a.checked;
                    else if (b === "select-multiple") c = a.selectedIndex > -1 ? d.map(a.options, function(a) {
                        return a.selected
                    }).join("-") : "";
                    else if (d.nodeName(a, "select")) c = a.selectedIndex;
                    return c
                },
                Z = function(a, b) {
                    var c = a.target,
                        g, e;
                    if (pa.test(c.nodeName) &&
                        !c.readOnly) {
                        g = d._data(c, "_change_data");
                        e = Va(c);
                        (a.type !== "focusout" || c.type !== "radio") && d._data(c, "_change_data", e);
                        if (!(g === m || e === g))
                            if (g != null || e) {
                                a.type = "change";
                                a.liveFired = m;
                                d.event.trigger(a, b, c)
                            }
                    }
                };
            d.event.special.change = {
                filters: {
                    focusout: Z,
                    beforedeactivate: Z,
                    click: function(a) {
                        var b = a.target,
                            c = d.nodeName(b, "input") ? b.type : "";
                        (c === "radio" || c === "checkbox" || d.nodeName(b, "select")) && Z.call(this, a)
                    },
                    keydown: function(a) {
                        var b = a.target,
                            c = d.nodeName(b, "input") ? b.type : "";
                        (a.keyCode === 13 && !d.nodeName(b,
                            "textarea") || a.keyCode === 32 && (c === "checkbox" || c === "radio") || c === "select-multiple") && Z.call(this, a)
                    },
                    beforeactivate: function(a) {
                        a = a.target;
                        d._data(a, "_change_data", Va(a))
                    }
                },
                setup: function() {
                    if (this.type === "file") return false;
                    for (var a in L) d.event.add(this, a + ".specialChange", L[a]);
                    return pa.test(this.nodeName)
                },
                teardown: function() {
                    d.event.remove(this, ".specialChange");
                    return pa.test(this.nodeName)
                }
            };
            L = d.event.special.change.filters;
            L.focus = L.beforeactivate
        }
        d.support.focusinBubbles || d.each({
            focus: "focusin",
            blur: "focusout"
        }, function(a, b) {
            function c(a) {
                var c = d.event.fix(a);
                c.type = b;
                c.originalEvent = {};
                d.event.trigger(c, null, c.target);
                c.isDefaultPrevented() && a.preventDefault()
            }
            var g = 0;
            d.event.special[b] = {
                setup: function() {
                    g++ === 0 && l.addEventListener(a, c, true)
                },
                teardown: function() {
                    --g === 0 && l.removeEventListener(a, c, true)
                }
            }
        });
        d.each(["bind", "one"], function(a, b) {
            d.fn[b] = function(a, g, e) {
                var f;
                if (typeof a === "object") {
                    for (var h in a) this[b](h, g, a[h], e);
                    return this
                }
                if (arguments.length === 2 || g === false) {
                    e = g;
                    g = m
                }
                if (b ===
                    "one") {
                    f = function(a) {
                        d(this).unbind(a, f);
                        return e.apply(this, arguments)
                    };
                    f.guid = e.guid || d.guid++
                } else f = e;
                if (a === "unload" && b !== "one") this.one(a, g, e);
                else {
                    h = 0;
                    for (var i = this.length; h < i; h++) d.event.add(this[h], a, f, g)
                }
                return this
            }
        });
        d.fn.extend({
            unbind: function(a, b) {
                if (typeof a === "object" && !a.preventDefault)
                    for (var c in a) this.unbind(c, a[c]);
                else {
                    c = 0;
                    for (var g = this.length; c < g; c++) d.event.remove(this[c], a, b)
                }
                return this
            },
            delegate: function(a, b, c, d) {
                return this.live(b, c, d, a)
            },
            undelegate: function(a, b, c) {
                return arguments.length ===
                    0 ? this.unbind("live") : this.die(b, null, c, a)
            },
            trigger: function(a, b) {
                return this.each(function() {
                    d.event.trigger(a, b, this)
                })
            },
            triggerHandler: function(a, b) {
                if (this[0]) return d.event.trigger(a, b, this[0], true)
            },
            toggle: function(a) {
                var b = arguments,
                    c = a.guid || d.guid++,
                    g = 0,
                    e = function(c) {
                        var e = (d.data(this, "lastToggle" + a.guid) || 0) % g;
                        d.data(this, "lastToggle" + a.guid, e + 1);
                        c.preventDefault();
                        return b[e].apply(this, arguments) || false
                    };
                for (e.guid = c; g < b.length;) b[g++].guid = c;
                return this.click(e)
            },
            hover: function(a, b) {
                return this.mouseenter(a).mouseleave(b ||
                    a)
            }
        });
        var qa = {
            focus: "focusin",
            blur: "focusout",
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        d.each(["live", "die"], function(a, b) {
            d.fn[b] = function(a, g, e, f) {
                var h = 0,
                    i, j, k = f || this.selector,
                    l = f ? this : d(this.context);
                if (typeof a === "object" && !a.preventDefault) {
                    for (i in a) l[b](i, g, a[i], k);
                    return this
                }
                if (b === "die" && !a && f && f.charAt(0) === ".") {
                    l.unbind(f);
                    return this
                }
                if (g === false || d.isFunction(g)) {
                    e = g || w;
                    g = m
                }
                for (a = (a || "").split(" ");
                    (f = a[h++]) != null;) {
                    i = ia.exec(f);
                    j = "";
                    if (i) {
                        j = i[0];
                        f = f.replace(ia, "")
                    }
                    if (f === "hover") a.push("mouseenter" +
                        j, "mouseleave" + j);
                    else {
                        i = f;
                        if (qa[f]) {
                            a.push(qa[f] + j);
                            f = f + j
                        } else f = (qa[f] || f) + j;
                        if (b === "live") {
                            j = 0;
                            for (var n = l.length; j < n; j++) d.event.add(l[j], "live." + P(f, k), {
                                data: g,
                                selector: k,
                                handler: e,
                                origType: f,
                                origHandler: e,
                                preType: i
                            })
                        } else l.unbind("live." + P(f, k), e)
                    }
                }
                return this
            }
        });
        d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(a, b) {
            d.fn[b] =
                function(a, d) {
                    if (d == null) {
                        d = a;
                        a = null
                    }
                    return arguments.length > 0 ? this.bind(b, a, d) : this.trigger(b)
                };
            d.attrFn && (d.attrFn[b] = true)
        });
        var Wa = function(a, b, c, d, e, f) {
                for (var e = 0, h = d.length; e < h; e++) {
                    var i = d[e];
                    if (i) {
                        for (var j = false, i = i[a]; i;) {
                            if (i.sizcache === c) {
                                j = d[i.sizset];
                                break
                            }
                            if (i.nodeType === 1 && !f) {
                                i.sizcache = c;
                                i.sizset = e
                            }
                            if (i.nodeName.toLowerCase() === b) {
                                j = i;
                                break
                            }
                            i = i[a]
                        }
                        d[e] = j
                    }
                }
            },
            Xa = function(a, b, c, d, e, f) {
                for (var e = 0, h = d.length; e < h; e++) {
                    var i = d[e];
                    if (i) {
                        for (var j = false, i = i[a]; i;) {
                            if (i.sizcache === c) {
                                j =
                                    d[i.sizset];
                                break
                            }
                            if (i.nodeType === 1) {
                                if (!f) {
                                    i.sizcache = c;
                                    i.sizset = e
                                }
                                if (typeof b !== "string") {
                                    if (i === b) {
                                        j = true;
                                        break
                                    }
                                } else if (n.filter(b, [i]).length > 0) {
                                    j = i;
                                    break
                                }
                            }
                            i = i[a]
                        }
                        d[e] = j
                    }
                }
            },
            ra = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            sa = 0,
            Ya = Object.prototype.toString,
            aa = !1,
            Za = !0,
            G = /\\/g,
            ba = /\W/;
        [0, 0].sort(function() {
            Za = false;
            return 0
        });
        var n = function(a, b, c, d) {
            var c = c || [],
                e = b = b || l;
            if (b.nodeType !== 1 && b.nodeType !== 9) return [];
            if (!a || typeof a !== "string") return c;
            var f, h, i, j, k, m = true,
                o = n.isXML(b),
                q = [],
                r = a;
            do {
                ra.exec("");
                if (f = ra.exec(r)) {
                    r = f[3];
                    q.push(f[1]);
                    if (f[2]) {
                        j = f[3];
                        break
                    }
                }
            } while (f);
            if (q.length > 1 && Ub.exec(a))
                if (q.length === 2 && p.relative[q[0]]) h = $a(q[0] + q[1], b);
                else
                    for (h = p.relative[q[0]] ? [b] : n(q.shift(), b); q.length;) {
                        a = q.shift();
                        p.relative[a] && (a = a + q.shift());
                        h = $a(a, h)
                    } else {
                        if (!d && q.length > 1 && b.nodeType === 9 && !o && p.match.ID.test(q[0]) && !p.match.ID.test(q[q.length - 1])) {
                            f = n.find(q.shift(), b, o);
                            b = f.expr ? n.filter(f.expr,
                                f.set)[0] : f.set[0]
                        }
                        if (b) {
                            f = d ? {
                                expr: q.pop(),
                                set: v(d)
                            } : n.find(q.pop(), q.length === 1 && (q[0] === "~" || q[0] === "+") && b.parentNode ? b.parentNode : b, o);
                            h = f.expr ? n.filter(f.expr, f.set) : f.set;
                            for (q.length > 0 ? i = v(h) : m = false; q.length;) {
                                f = k = q.pop();
                                p.relative[k] ? f = q.pop() : k = "";
                                f == null && (f = b);
                                p.relative[k](i, f, o)
                            }
                        } else i = []
                    }
                i || (i = h);
            i || n.error(k || a);
            if (Ya.call(i) === "[object Array]")
                if (m)
                    if (b && b.nodeType === 1)
                        for (a = 0; i[a] != null; a++) i[a] && (i[a] === true || i[a].nodeType === 1 && n.contains(b, i[a])) && c.push(h[a]);
                    else
                        for (a = 0; i[a] !=
                            null; a++) i[a] && i[a].nodeType === 1 && c.push(h[a]);
            else c.push.apply(c, i);
            else v(i, c);
            if (j) {
                n(j, e, c, d);
                n.uniqueSort(c)
            }
            return c
        };
        n.uniqueSort = function(a) {
            if (ca) {
                aa = Za;
                a.sort(ca);
                if (aa)
                    for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        };
        n.matches = function(a, b) {
            return n(a, null, null, b)
        };
        n.matchesSelector = function(a, b) {
            return n(b, null, null, [a]).length > 0
        };
        n.find = function(a, b, c) {
            var d;
            if (!a) return [];
            for (var e = 0, f = p.order.length; e < f; e++) {
                var h, i = p.order[e];
                if (h = p.leftMatch[i].exec(a)) {
                    var j =
                        h[1];
                    h.splice(1, 1);
                    if (j.substr(j.length - 1) !== "\\") {
                        h[1] = (h[1] || "").replace(G, "");
                        d = p.find[i](h, b, c);
                        if (d != null) {
                            a = a.replace(p.match[i], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName !== "undefined" ? b.getElementsByTagName("*") : []);
            return {
                set: d,
                expr: a
            }
        };
        n.filter = function(a, b, c, d) {
            for (var e, f, h = a, i = [], j = b, k = b && b[0] && n.isXML(b[0]); a && b.length;) {
                for (var l in p.filter)
                    if ((e = p.leftMatch[l].exec(a)) != null && e[2]) {
                        var o, q, r = p.filter[l];
                        q = e[1];
                        f = false;
                        e.splice(1, 1);
                        if (q.substr(q.length - 1) !== "\\") {
                            j === i && (i = []);
                            if (p.preFilter[l])
                                if (e = p.preFilter[l](e, j, c, i, d, k)) {
                                    if (e === true) continue
                                } else f = o = true;
                            if (e)
                                for (var s = 0;
                                    (q = j[s]) != null; s++)
                                    if (q) {
                                        o = r(q, e, s, j);
                                        var t = d ^ !!o;
                                        if (c && o != null) t ? f = true : j[s] = false;
                                        else if (t) {
                                            i.push(q);
                                            f = true
                                        }
                                    }
                            if (o !== m) {
                                c || (j = i);
                                a = a.replace(p.match[l], "");
                                if (!f) return [];
                                break
                            }
                        }
                    }
                if (a === h)
                    if (f == null) n.error(a);
                    else break;
                h = a
            }
            return j
        };
        n.error = function(a) {
            throw "Syntax error, unrecognized expression: " + a;
        };
        var p = n.selectors = {
                order: ["ID", "NAME", "TAG"],
                match: {
                    ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                    TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                    CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                    PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                },
                leftMatch: {},
                attrMap: {
                    "class": "className",
                    "for": "htmlFor"
                },
                attrHandle: {
                    href: function(a) {
                        return a.getAttribute("href")
                    },
                    type: function(a) {
                        return a.getAttribute("type")
                    }
                },
                relative: {
                    "+": function(a, b) {
                        var c = typeof b === "string",
                            d = c && !ba.test(b),
                            c = c && !d;
                        d && (b = b.toLowerCase());
                        for (var d = 0, e = a.length, f; d < e; d++)
                            if (f = a[d]) {
                                for (;
                                    (f = f.previousSibling) && f.nodeType !== 1;);
                                a[d] = c || f && f.nodeName.toLowerCase() === b ? f || false : f === b
                            }
                        c && n.filter(b, a, true)
                    },
                    ">": function(a, b) {
                        var c, d = typeof b === "string",
                            e = 0,
                            f = a.length;
                        if (d &&
                            !ba.test(b))
                            for (b = b.toLowerCase(); e < f; e++) {
                                if (c = a[e]) {
                                    c = c.parentNode;
                                    a[e] = c.nodeName.toLowerCase() === b ? c : false
                                }
                            } else {
                                for (; e < f; e++)(c = a[e]) && (a[e] = d ? c.parentNode : c.parentNode === b);
                                d && n.filter(b, a, true)
                            }
                    },
                    "": function(a, b, c) {
                        var d, e = sa++,
                            f = Xa;
                        if (typeof b === "string" && !ba.test(b)) {
                            d = b = b.toLowerCase();
                            f = Wa
                        }
                        f("parentNode", b, e, a, d, c)
                    },
                    "~": function(a, b, c) {
                        var d, e = sa++,
                            f = Xa;
                        if (typeof b === "string" && !ba.test(b)) {
                            d = b = b.toLowerCase();
                            f = Wa
                        }
                        f("previousSibling", b, e, a, d, c)
                    }
                },
                find: {
                    ID: function(a, b, c) {
                        if (typeof b.getElementById !==
                            "undefined" && !c) return (a = b.getElementById(a[1])) && a.parentNode ? [a] : []
                    },
                    NAME: function(a, b) {
                        if (typeof b.getElementsByName !== "undefined") {
                            for (var c = [], d = b.getElementsByName(a[1]), e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                            return c.length === 0 ? null : c
                        }
                    },
                    TAG: function(a, b) {
                        if (typeof b.getElementsByTagName !== "undefined") return b.getElementsByTagName(a[1])
                    }
                },
                preFilter: {
                    CLASS: function(a, b, c, d, e, f) {
                        a = " " + a[1].replace(G, "") + " ";
                        if (f) return a;
                        for (var f = 0, h;
                            (h = b[f]) != null; f++) h && (e ^ (h.className &&
                            (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[f] = false));
                        return false
                    },
                    ID: function(a) {
                        return a[1].replace(G, "")
                    },
                    TAG: function(a) {
                        return a[1].replace(G, "").toLowerCase()
                    },
                    CHILD: function(a) {
                        if (a[1] === "nth") {
                            a[2] || n.error(a[0]);
                            a[2] = a[2].replace(/^\+|\s*/g, "");
                            var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                            a[2] = b[1] + (b[2] || 1) - 0;
                            a[3] = b[3] - 0
                        } else a[2] && n.error(a[0]);
                        a[0] = sa++;
                        return a
                    },
                    ATTR: function(a,
                        b, c, d, e, f) {
                        b = a[1] = a[1].replace(G, "");
                        !f && p.attrMap[b] && (a[1] = p.attrMap[b]);
                        a[4] = (a[4] || a[5] || "").replace(G, "");
                        a[2] === "~=" && (a[4] = " " + a[4] + " ");
                        return a
                    },
                    PSEUDO: function(a, b, c, d, e) {
                        if (a[1] === "not")
                            if ((ra.exec(a[3]) || "").length > 1 || /^\w/.test(a[3])) a[3] = n(a[3], null, null, b);
                            else {
                                a = n.filter(a[3], b, c, 1 ^ e);
                                c || d.push.apply(d, a);
                                return false
                            }
                        else if (p.match.POS.test(a[0]) || p.match.CHILD.test(a[0])) return true;
                        return a
                    },
                    POS: function(a) {
                        a.unshift(true);
                        return a
                    }
                },
                filters: {
                    enabled: function(a) {
                        return a.disabled ===
                            false && a.type !== "hidden"
                    },
                    disabled: function(a) {
                        return a.disabled === true
                    },
                    checked: function(a) {
                        return a.checked === true
                    },
                    selected: function(a) {
                        a.parentNode && a.parentNode.selectedIndex;
                        return a.selected === true
                    },
                    parent: function(a) {
                        return !!a.firstChild
                    },
                    empty: function(a) {
                        return !a.firstChild
                    },
                    has: function(a, b, c) {
                        return !!n(c[3], a).length
                    },
                    header: function(a) {
                        return /h\d/i.test(a.nodeName)
                    },
                    text: function(a) {
                        return "text" === a.getAttribute("type")
                    },
                    radio: function(a) {
                        return "radio" === a.type
                    },
                    checkbox: function(a) {
                        return "checkbox" ===
                            a.type
                    },
                    file: function(a) {
                        return "file" === a.type
                    },
                    password: function(a) {
                        return "password" === a.type
                    },
                    submit: function(a) {
                        return "submit" === a.type
                    },
                    image: function(a) {
                        return "image" === a.type
                    },
                    reset: function(a) {
                        return "reset" === a.type
                    },
                    button: function(a) {
                        return "button" === a.type || a.nodeName.toLowerCase() === "button"
                    },
                    input: function(a) {
                        return /input|select|textarea|button/i.test(a.nodeName)
                    }
                },
                setFilters: {
                    first: function(a, b) {
                        return b === 0
                    },
                    last: function(a, b, c, d) {
                        return b === d.length - 1
                    },
                    even: function(a, b) {
                        return b % 2 ===
                            0
                    },
                    odd: function(a, b) {
                        return b % 2 === 1
                    },
                    lt: function(a, b, c) {
                        return b < c[3] - 0
                    },
                    gt: function(a, b, c) {
                        return b > c[3] - 0
                    },
                    nth: function(a, b, c) {
                        return c[3] - 0 === b
                    },
                    eq: function(a, b, c) {
                        return c[3] - 0 === b
                    }
                },
                filter: {
                    PSEUDO: function(a, b, c, d) {
                        var e = b[1],
                            f = p.filters[e];
                        if (f) return f(a, c, b, d);
                        if (e === "contains") return (a.textContent || a.innerText || n.getText([a]) || "").indexOf(b[3]) >= 0;
                        if (e === "not") {
                            b = b[3];
                            c = 0;
                            for (d = b.length; c < d; c++)
                                if (b[c] === a) return false;
                            return true
                        }
                        n.error(e)
                    },
                    CHILD: function(a, b) {
                        var c = b[1],
                            d = a;
                        switch (c) {
                            case "only":
                            case "first":
                                for (; d =
                                    d.previousSibling;)
                                    if (d.nodeType === 1) return false;
                                if (c === "first") return true;
                                d = a;
                            case "last":
                                for (; d = d.nextSibling;)
                                    if (d.nodeType === 1) return false;
                                return true;
                            case "nth":
                                var c = b[2],
                                    e = b[3];
                                if (c === 1 && e === 0) return true;
                                var f = b[0],
                                    h = a.parentNode;
                                if (h && (h.sizcache !== f || !a.nodeIndex)) {
                                    for (var i = 0, d = h.firstChild; d; d = d.nextSibling)
                                        if (d.nodeType === 1) d.nodeIndex = ++i;
                                    h.sizcache = f
                                }
                                d = a.nodeIndex - e;
                                return c === 0 ? d === 0 : d % c === 0 && d / c >= 0
                        }
                    },
                    ID: function(a, b) {
                        return a.nodeType === 1 && a.getAttribute("id") === b
                    },
                    TAG: function(a,
                        b) {
                        return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b
                    },
                    CLASS: function(a, b) {
                        return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                    },
                    ATTR: function(a, b) {
                        var c = b[1],
                            c = p.attrHandle[c] ? p.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                            d = c + "",
                            e = b[2],
                            f = b[4];
                        return c == null ? e === "!=" : e === "=" ? d === f : e === "*=" ? d.indexOf(f) >= 0 : e === "~=" ? (" " + d + " ").indexOf(f) >= 0 : !f ? d && c !== false : e === "!=" ? d !== f : e === "^=" ? d.indexOf(f) === 0 : e === "$=" ? d.substr(d.length - f.length) === f : e === "|=" ? d === f || d.substr(0, f.length +
                            1) === f + "-" : false
                    },
                    POS: function(a, b, c, d) {
                        var e = p.setFilters[b[2]];
                        if (e) return e(a, c, b, d)
                    }
                }
            },
            Ub = p.match.POS,
            Vb = function(a, b) {
                return "\\" + (b - 0 + 1)
            },
            M;
        for (M in p.match) p.match[M] = RegExp(p.match[M].source + /(?![^\[]*\])(?![^\(]*\))/.source), p.leftMatch[M] = RegExp(/(^(?:.|\r|\n)*?)/.source + p.match[M].source.replace(/\\(\d+)/g, Vb));
        var v = function(a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(l.documentElement.childNodes, 0)[0].nodeType
        } catch (kc) {
            v =
                function(a, b) {
                    var c = 0,
                        d = b || [];
                    if (Ya.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                    else if (typeof a.length === "number")
                        for (var e = a.length; c < e; c++) d.push(a[c]);
                    else
                        for (; a[c]; c++) d.push(a[c]);
                    return d
                }
        }
        var ca, N;
        l.documentElement.compareDocumentPosition ? ca = function(a, b) {
            if (a === b) {
                aa = true;
                return 0
            }
            return !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (ca = function(a, b) {
            var c, d, e = [],
                f = [];
            c = a.parentNode;
            d = b.parentNode;
            var h = c;
            if (a === b) {
                aa = true;
                return 0
            }
            if (c === d) return N(a, b);
            if (c) {
                if (!d) return 1
            } else return -1;
            for (; h;) {
                e.unshift(h);
                h = h.parentNode
            }
            for (h = d; h;) {
                f.unshift(h);
                h = h.parentNode
            }
            c = e.length;
            d = f.length;
            for (h = 0; h < c && h < d; h++)
                if (e[h] !== f[h]) return N(e[h], f[h]);
            return h === c ? N(a, f[h], -1) : N(e[h], b, 1)
        }, N = function(a, b, c) {
            if (a === b) return c;
            for (a = a.nextSibling; a;) {
                if (a === b) return -1;
                a = a.nextSibling
            }
            return 1
        });
        n.getText = function(a) {
            for (var b = "", c, d = 0; a[d]; d++) {
                c = a[d];
                c.nodeType === 3 || c.nodeType === 4 ? b = b + c.nodeValue : c.nodeType !==
                    8 && (b = b + n.getText(c.childNodes))
            }
            return b
        };
        var da = l.createElement("div"),
            ab = "script" + (new Date).getTime(),
            ea = l.documentElement;
        da.innerHTML = "<a name='" + ab + "'/>";
        ea.insertBefore(da, ea.firstChild);
        l.getElementById(ab) && (p.find.ID = function(a, b, c) {
            if (typeof b.getElementById !== "undefined" && !c) return (b = b.getElementById(a[1])) ? b.id === a[1] || typeof b.getAttributeNode !== "undefined" && b.getAttributeNode("id").nodeValue === a[1] ? [b] : m : []
        }, p.filter.ID = function(a, b) {
            var c = typeof a.getAttributeNode !== "undefined" &&
                a.getAttributeNode("id");
            return a.nodeType === 1 && c && c.nodeValue === b
        });
        ea.removeChild(da);
        var ea = da = null,
            z = l.createElement("div");
        z.appendChild(l.createComment(""));
        0 < z.getElementsByTagName("*").length && (p.find.TAG = function(a, b) {
            var c = b.getElementsByTagName(a[1]);
            if (a[1] === "*") {
                for (var d = [], e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                c = d
            }
            return c
        });
        z.innerHTML = "<a href='#'></a>";
        z.firstChild && ("undefined" !== typeof z.firstChild.getAttribute && "#" !== z.firstChild.getAttribute("href")) && (p.attrHandle.href =
            function(a) {
                return a.getAttribute("href", 2)
            });
        z = null;
        if (l.querySelectorAll) {
            var ta = n,
                fa = l.createElement("div");
            fa.innerHTML = "<p class='TEST'></p>";
            if (!(fa.querySelectorAll && 0 === fa.querySelectorAll(".TEST").length)) {
                var n = function(a, b, c, d) {
                        b = b || l;
                        if (!d && !n.isXML(b)) {
                            var e = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(a);
                            if (e && (b.nodeType === 1 || b.nodeType === 9)) {
                                if (e[1]) return v(b.getElementsByTagName(a), c);
                                if (e[2] && p.find.CLASS && b.getElementsByClassName) return v(b.getElementsByClassName(e[2]), c)
                            }
                            if (b.nodeType ===
                                9) {
                                if (a === "body" && b.body) return v([b.body], c);
                                if (e && e[3]) {
                                    var f = b.getElementById(e[3]);
                                    if (f && f.parentNode) {
                                        if (f.id === e[3]) return v([f], c)
                                    } else return v([], c)
                                }
                                try {
                                    return v(b.querySelectorAll(a), c)
                                } catch (h) {}
                            } else if (b.nodeType === 1 && b.nodeName.toLowerCase() !== "object") {
                                var e = b,
                                    i = (f = b.getAttribute("id")) || "__sizzle__",
                                    j = b.parentNode,
                                    k = /^\s*[+~]/.test(a);
                                f ? i = i.replace(/'/g, "\\$&") : b.setAttribute("id", i);
                                if (k && j) b = b.parentNode;
                                try {
                                    if (!k || j) return v(b.querySelectorAll("[id='" + i + "'] " + a), c)
                                } catch (m) {} finally {
                                    f ||
                                        e.removeAttribute("id")
                                }
                            }
                        }
                        return ta(a, b, c, d)
                    },
                    ua;
                for (ua in ta) n[ua] = ta[ua];
                fa = null
            }
        }
        var ga = l.documentElement,
            va = ga.matchesSelector || ga.mozMatchesSelector || ga.webkitMatchesSelector || ga.msMatchesSelector,
            bb = !1;
        try {
            va.call(l.documentElement, "[test!='']:sizzle")
        } catch (lc) {
            bb = !0
        }
        va && (n.matchesSelector = function(a, b) {
            b = b.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
            if (!n.isXML(a)) try {
                if (bb || !p.match.PSEUDO.test(b) && !/!=/.test(b)) return va.call(a, b)
            } catch (c) {}
            return n(b, null, null, [a]).length > 0
        });
        var H = l.createElement("div");
        H.innerHTML = "<div class='test e'></div><div class='test'></div>";
        H.getElementsByClassName && 0 !== H.getElementsByClassName("e").length && (H.lastChild.className = "e", 1 !== H.getElementsByClassName("e").length && (p.order.splice(1, 0, "CLASS"), p.find.CLASS = function(a, b, c) {
            if (typeof b.getElementsByClassName !== "undefined" && !c) return b.getElementsByClassName(a[1])
        }, H = null));
        n.contains = l.documentElement.contains ? function(a, b) {
                return a !== b && (a.contains ? a.contains(b) : true)
            } : l.documentElement.compareDocumentPosition ?
            function(a, b) {
                return !!(a.compareDocumentPosition(b) & 16)
            } : function() {
                return false
            };
        n.isXML = function(a) {
            return (a = (a ? a.ownerDocument || a : 0).documentElement) ? a.nodeName !== "HTML" : false
        };
        var $a = function(a, b) {
            for (var c, d = [], e = "", f = b.nodeType ? [b] : b; c = p.match.PSEUDO.exec(a);) {
                e = e + c[0];
                a = a.replace(p.match.PSEUDO, "")
            }
            a = p.relative[a] ? a + "*" : a;
            c = 0;
            for (var h = f.length; c < h; c++) n(a, f[c], d);
            return n.filter(e, d)
        };
        d.find = n;
        d.expr = n.selectors;
        d.expr[":"] = d.expr.filters;
        d.unique = n.uniqueSort;
        d.text = n.getText;
        d.isXMLDoc =
            n.isXML;
        d.contains = n.contains;
        var Wb = /Until$/,
            Xb = /^(?:parents|prevUntil|prevAll)/,
            Yb = /,/,
            pb = /^.[^:#\[\.,]*$/,
            Zb = Array.prototype.slice,
            cb = d.expr.match.POS,
            $b = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        d.fn.extend({
            find: function(a) {
                var b = this,
                    c, g;
                if (typeof a !== "string") return d(a).filter(function() {
                    c = 0;
                    for (g = b.length; c < g; c++)
                        if (d.contains(b[c], this)) return true
                });
                var e = this.pushStack("", "find", a),
                    f, h, i;
                c = 0;
                for (g = this.length; c < g; c++) {
                    f = e.length;
                    d.find(a, this[c], e);
                    if (c > 0)
                        for (h = f; h < e.length; h++)
                            for (i =
                                0; i < f; i++)
                                if (e[i] === e[h]) {
                                    e.splice(h--, 1);
                                    break
                                }
                }
                return e
            },
            has: function(a) {
                var b = d(a);
                return this.filter(function() {
                    for (var a = 0, g = b.length; a < g; a++)
                        if (d.contains(this, b[a])) return true
                })
            },
            not: function(a) {
                return this.pushStack(Ba(this, a, false), "not", a)
            },
            filter: function(a) {
                return this.pushStack(Ba(this, a, true), "filter", a)
            },
            is: function(a) {
                return !!a && (typeof a === "string" ? d.filter(a, this).length > 0 : this.filter(a).length > 0)
            },
            closest: function(a, b) {
                var c = [],
                    g, e, f = this[0];
                if (d.isArray(a)) {
                    var h, i = {},
                        j = 1;
                    if (f &&
                        a.length) {
                        g = 0;
                        for (e = a.length; g < e; g++) {
                            h = a[g];
                            i[h] || (i[h] = cb.test(h) ? d(h, b || this.context) : h)
                        }
                        for (; f && f.ownerDocument && f !== b;) {
                            for (h in i) {
                                g = i[h];
                                (g.jquery ? g.index(f) > -1 : d(f).is(g)) && c.push({
                                    selector: h,
                                    elem: f,
                                    level: j
                                })
                            }
                            f = f.parentNode;
                            j++
                        }
                    }
                    return c
                }
                h = cb.test(a) || typeof a !== "string" ? d(a, b || this.context) : 0;
                g = 0;
                for (e = this.length; g < e; g++)
                    for (f = this[g]; f;)
                        if (h ? h.index(f) > -1 : d.find.matchesSelector(f, a)) {
                            c.push(f);
                            break
                        } else {
                            f = f.parentNode;
                            if (!f || !f.ownerDocument || f === b || f.nodeType === 11) break
                        }
                c = c.length > 1 ?
                    d.unique(c) : c;
                return this.pushStack(c, "closest", a)
            },
            index: function(a) {
                return !a ? this[0] && this[0].parentNode ? this.prevAll().length : -1 : typeof a === "string" ? d.inArray(this[0], d(a)) : d.inArray(a.jquery ? a[0] : a, this)
            },
            add: function(a, b) {
                var c = typeof a === "string" ? d(a, b) : d.makeArray(a && a.nodeType ? [a] : a),
                    g = d.merge(this.get(), c);
                return this.pushStack(!c[0] || !c[0].parentNode || c[0].parentNode.nodeType === 11 || !g[0] || !g[0].parentNode || g[0].parentNode.nodeType === 11 ? g : d.unique(g))
            },
            andSelf: function() {
                return this.add(this.prevObject)
            }
        });
        d.each({
            parent: function(a) {
                return (a = a.parentNode) && a.nodeType !== 11 ? a : null
            },
            parents: function(a) {
                return d.dir(a, "parentNode")
            },
            parentsUntil: function(a, b, c) {
                return d.dir(a, "parentNode", c)
            },
            next: function(a) {
                return d.nth(a, 2, "nextSibling")
            },
            prev: function(a) {
                return d.nth(a, 2, "previousSibling")
            },
            nextAll: function(a) {
                return d.dir(a, "nextSibling")
            },
            prevAll: function(a) {
                return d.dir(a, "previousSibling")
            },
            nextUntil: function(a, b, c) {
                return d.dir(a, "nextSibling", c)
            },
            prevUntil: function(a, b, c) {
                return d.dir(a, "previousSibling",
                    c)
            },
            siblings: function(a) {
                return d.sibling(a.parentNode.firstChild, a)
            },
            children: function(a) {
                return d.sibling(a.firstChild)
            },
            contents: function(a) {
                return d.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : d.makeArray(a.childNodes)
            }
        }, function(a, b) {
            d.fn[a] = function(c, g) {
                var e = d.map(this, b, c),
                    f = Zb.call(arguments);
                Wb.test(a) || (g = c);
                g && typeof g === "string" && (e = d.filter(g, e));
                e = this.length > 1 && !$b[a] ? d.unique(e) : e;
                if ((this.length > 1 || Yb.test(g)) && Xb.test(a)) e = e.reverse();
                return this.pushStack(e,
                    a, f.join(","))
            }
        });
        d.extend({
            filter: function(a, b, c) {
                c && (a = ":not(" + a + ")");
                return b.length === 1 ? d.find.matchesSelector(b[0], a) ? [b[0]] : [] : d.find.matches(a, b)
            },
            dir: function(a, b, c) {
                for (var g = [], a = a[b]; a && a.nodeType !== 9 && (c === m || a.nodeType !== 1 || !d(a).is(c));) {
                    a.nodeType === 1 && g.push(a);
                    a = a[b]
                }
                return g
            },
            nth: function(a, b, c) {
                for (var b = b || 1, d = 0; a; a = a[c])
                    if (a.nodeType === 1 && ++d === b) break;
                return a
            },
            sibling: function(a, b) {
                for (var c = []; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
                return c
            }
        });
        var ac = / jQuery\d+="(?:\d+|null)"/g,
            wa = /^\s+/,
            db = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
            eb = /<([\w:]+)/,
            bc = /<tbody/i,
            cc = /<|&#?\w+;/,
            fb = /<(?:script|object|embed|option|style)/i,
            gb = /checked\s*(?:[^=]|=\s*.checked.)/i,
            dc = /\/(java|ecma)script/i,
            rb = /^\s*<!(?:\[CDATA\[|\-\-)/,
            t = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>",
                    "</colgroup></table>"
                ],
                area: [1, "<map>", "</map>"],
                _default: [0, "", ""]
            };
        t.optgroup = t.option;
        t.tbody = t.tfoot = t.colgroup = t.caption = t.thead;
        t.th = t.td;
        d.support.htmlSerialize || (t._default = [1, "div<div>", "</div>"]);
        d.fn.extend({
            text: function(a) {
                return d.isFunction(a) ? this.each(function(b) {
                    var c = d(this);
                    c.text(a.call(this, b, c.text()))
                }) : typeof a !== "object" && a !== m ? this.empty().append((this[0] && this[0].ownerDocument || l).createTextNode(a)) : d.text(this)
            },
            wrapAll: function(a) {
                if (d.isFunction(a)) return this.each(function(b) {
                    d(this).wrapAll(a.call(this,
                        b))
                });
                if (this[0]) {
                    var b = d(a, this[0].ownerDocument).eq(0).clone(true);
                    this[0].parentNode && b.insertBefore(this[0]);
                    b.map(function() {
                        for (var a = this; a.firstChild && a.firstChild.nodeType === 1;) a = a.firstChild;
                        return a
                    }).append(this)
                }
                return this
            },
            wrapInner: function(a) {
                return d.isFunction(a) ? this.each(function(b) {
                    d(this).wrapInner(a.call(this, b))
                }) : this.each(function() {
                    var b = d(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },
            wrap: function(a) {
                return this.each(function() {
                    d(this).wrapAll(a)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    d.nodeName(this,
                        "body") || d(this).replaceWith(this.childNodes)
                }).end()
            },
            append: function() {
                return this.domManip(arguments, true, function(a) {
                    this.nodeType === 1 && this.appendChild(a)
                })
            },
            prepend: function() {
                return this.domManip(arguments, true, function(a) {
                    this.nodeType === 1 && this.insertBefore(a, this.firstChild)
                })
            },
            before: function() {
                if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function(a) {
                    this.parentNode.insertBefore(a, this)
                });
                if (arguments.length) {
                    var a = d(arguments[0]);
                    a.push.apply(a, this.toArray());
                    return this.pushStack(a,
                        "before", arguments)
                }
            },
            after: function() {
                if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function(a) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                });
                if (arguments.length) {
                    var a = this.pushStack(this, "after", arguments);
                    a.push.apply(a, d(arguments[0]).toArray());
                    return a
                }
            },
            remove: function(a, b) {
                for (var c = 0, g;
                    (g = this[c]) != null; c++)
                    if (!a || d.filter(a, [g]).length) {
                        if (!b && g.nodeType === 1) {
                            d.cleanData(g.getElementsByTagName("*"));
                            d.cleanData([g])
                        }
                        g.parentNode && g.parentNode.removeChild(g)
                    }
                return this
            },
            empty: function() {
                for (var a = 0, b;
                    (b = this[a]) != null; a++)
                    for (b.nodeType === 1 && d.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
                return this
            },
            clone: function(a, b) {
                a = a == null ? false : a;
                b = b == null ? a : b;
                return this.map(function() {
                    return d.clone(this, a, b)
                })
            },
            html: function(a) {
                if (a === m) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(ac, "") : null;
                if (typeof a === "string" && !fb.test(a) && (d.support.leadingWhitespace || !wa.test(a)) && !t[(eb.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a =
                        a.replace(db, "<$1></$2>");
                    try {
                        for (var b = 0, c = this.length; b < c; b++)
                            if (this[b].nodeType === 1) {
                                d.cleanData(this[b].getElementsByTagName("*"));
                                this[b].innerHTML = a
                            }
                    } catch (g) {
                        this.empty().append(a)
                    }
                } else d.isFunction(a) ? this.each(function(b) {
                    var c = d(this);
                    c.html(a.call(this, b, c.html()))
                }) : this.empty().append(a);
                return this
            },
            replaceWith: function(a) {
                if (this[0] && this[0].parentNode) {
                    if (d.isFunction(a)) return this.each(function(b) {
                        var c = d(this),
                            g = c.html();
                        c.replaceWith(a.call(this, b, g))
                    });
                    typeof a !== "string" &&
                        (a = d(a).detach());
                    return this.each(function() {
                        var b = this.nextSibling,
                            c = this.parentNode;
                        d(this).remove();
                        b ? d(b).before(a) : d(c).append(a)
                    })
                }
                return this.length ? this.pushStack(d(d.isFunction(a) ? a() : a), "replaceWith", a) : this
            },
            detach: function(a) {
                return this.remove(a, true)
            },
            domManip: function(a, b, c) {
                var g, e, f, h = a[0],
                    i = [];
                if (!d.support.checkClone && arguments.length === 3 && typeof h === "string" && gb.test(h)) return this.each(function() {
                    d(this).domManip(a, b, c, true)
                });
                if (d.isFunction(h)) return this.each(function(e) {
                    var f =
                        d(this);
                    a[0] = h.call(this, e, b ? f.html() : m);
                    f.domManip(a, b, c)
                });
                if (this[0]) {
                    g = h && h.parentNode;
                    g = d.support.parentNode && g && g.nodeType === 11 && g.childNodes.length === this.length ? {
                        fragment: g
                    } : d.buildFragment(a, this, i);
                    f = g.fragment;
                    if (e = f.childNodes.length === 1 ? f = f.firstChild : f.firstChild) {
                        b = b && d.nodeName(e, "tr");
                        e = 0;
                        for (var j = this.length, k = j - 1; e < j; e++) c.call(b ? d.nodeName(this[e], "table") ? this[e].getElementsByTagName("tbody")[0] || this[e].appendChild(this[e].ownerDocument.createElement("tbody")) : this[e] : this[e],
                            g.cacheable || j > 1 && e < k ? d.clone(f, true, true) : f)
                    }
                    i.length && d.each(i, qb)
                }
                return this
            }
        });
        d.buildFragment = function(a, b, c) {
            var g, e, f, h;
            b && b[0] && (h = b[0].ownerDocument || b[0]);
            h.createDocumentFragment || (h = l);
            if (a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && h === l && a[0].charAt(0) === "<" && !fb.test(a[0]) && (d.support.checkClone || !gb.test(a[0]))) {
                e = true;
                (f = d.fragments[a[0]]) && f !== 1 && (g = f)
            }
            if (!g) {
                g = h.createDocumentFragment();
                d.clean(a, h, g, c)
            }
            e && (d.fragments[a[0]] = f ? g : 1);
            return {
                fragment: g,
                cacheable: e
            }
        };
        d.fragments = {};
        d.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(a, b) {
            d.fn[a] = function(c) {
                var g = [],
                    c = d(c),
                    e = this.length === 1 && this[0].parentNode;
                if (e && e.nodeType === 11 && e.childNodes.length === 1 && c.length === 1) {
                    c[b](this[0]);
                    return this
                }
                for (var e = 0, f = c.length; e < f; e++) {
                    var h = (e > 0 ? this.clone(true) : this).get();
                    d(c[e])[b](h);
                    g = g.concat(h)
                }
                return this.pushStack(g, a, c.selector)
            }
        });
        d.extend({
            clone: function(a, b, c) {
                var g = a.cloneNode(true),
                    e, f, h;
                if ((!d.support.noCloneEvent ||
                        !d.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !d.isXMLDoc(a)) {
                    Da(a, g);
                    e = Q(a);
                    f = Q(g);
                    for (h = 0; e[h]; ++h) f[h] && Da(e[h], f[h])
                }
                if (b) {
                    Ca(a, g);
                    if (c) {
                        e = Q(a);
                        f = Q(g);
                        for (h = 0; e[h]; ++h) Ca(e[h], f[h])
                    }
                }
                return g
            },
            clean: function(a, b, c, g) {
                b = b || l;
                typeof b.createElement === "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || l);
                for (var e = [], f, h = 0, i;
                    (i = a[h]) != null; h++) {
                    typeof i === "number" && (i = i + "");
                    if (i) {
                        if (typeof i === "string")
                            if (cc.test(i)) {
                                i = i.replace(db, "<$1></$2>");
                                f = (eb.exec(i) || ["", ""])[1].toLowerCase();
                                var j = t[f] || t._default,
                                    k = j[0],
                                    m = b.createElement("div");
                                for (m.innerHTML = j[1] + i + j[2]; k--;) m = m.lastChild;
                                if (!d.support.tbody) {
                                    k = bc.test(i);
                                    j = f === "table" && !k ? m.firstChild && m.firstChild.childNodes : j[1] === "<table>" && !k ? m.childNodes : [];
                                    for (f = j.length - 1; f >= 0; --f) d.nodeName(j[f], "tbody") && !j[f].childNodes.length && j[f].parentNode.removeChild(j[f])
                                }!d.support.leadingWhitespace && wa.test(i) && m.insertBefore(b.createTextNode(wa.exec(i)[0]), m.firstChild);
                                i = m.childNodes
                            } else i = b.createTextNode(i);
                        var n;
                        if (!d.support.appendChecked)
                            if (i[0] &&
                                typeof(n = i.length) === "number")
                                for (f = 0; f < n; f++) Fa(i[f]);
                            else Fa(i);
                        i.nodeType ? e.push(i) : e = d.merge(e, i)
                    }
                }
                if (c) {
                    a = function(a) {
                        return !a.type || dc.test(a.type)
                    };
                    for (h = 0; e[h]; h++)
                        if (g && d.nodeName(e[h], "script") && (!e[h].type || e[h].type.toLowerCase() === "text/javascript")) g.push(e[h].parentNode ? e[h].parentNode.removeChild(e[h]) : e[h]);
                        else {
                            if (e[h].nodeType === 1) {
                                b = d.grep(e[h].getElementsByTagName("script"), a);
                                e.splice.apply(e, [h + 1, 0].concat(b))
                            }
                            c.appendChild(e[h])
                        }
                }
                return e
            },
            cleanData: function(a) {
                for (var b, c,
                        g = d.cache, e = d.expando, f = d.event.special, h = d.support.deleteExpando, i = 0, j;
                    (j = a[i]) != null; i++)
                    if (!j.nodeName || !d.noData[j.nodeName.toLowerCase()])
                        if (c = j[d.expando]) {
                            if ((b = g[c] && g[c][e]) && b.events) {
                                for (var k in b.events) f[k] ? d.event.remove(j, k) : d.removeEvent(j, k, b.handle);
                                if (b.handle) b.handle.elem = null
                            }
                            h ? delete j[d.expando] : j.removeAttribute && j.removeAttribute(d.expando);
                            delete g[c]
                        }
            }
        });
        var xa = /alpha\([^)]*\)/i,
            ec = /opacity=([^)]*)/,
            fc = /([A-Z]|^ms)/g,
            hb = /^-?\d+(?:px)?$/i,
            gc = /^-?\d/,
            hc = /^([\-+])=([\-+.\de]+)/,
            ic = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            sb = ["Left", "Right"],
            tb = ["Top", "Bottom"],
            A, ib, jb;
        d.fn.css = function(a, b) {
            return arguments.length === 2 && b === m ? this : d.access(this, a, b, true, function(a, b, e) {
                return e !== m ? d.style(a, b, e) : d.css(a, b)
            })
        };
        d.extend({
            cssHooks: {
                opacity: {
                    get: function(a, b) {
                        if (b) {
                            var c = A(a, "opacity", "opacity");
                            return c === "" ? "1" : c
                        }
                        return a.style.opacity
                    }
                }
            },
            cssNumber: {
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": d.support.cssFloat ?
                    "cssFloat" : "styleFloat"
            },
            style: function(a, b, c, g) {
                if (a && !(a.nodeType === 3 || a.nodeType === 8 || !a.style)) {
                    var e, f = d.camelCase(b),
                        h = a.style,
                        i = d.cssHooks[f],
                        b = d.cssProps[f] || f;
                    if (c !== m) {
                        g = typeof c;
                        if (g === "string" && (e = hc.exec(c))) {
                            c = +(e[1] + 1) * +e[2] + parseFloat(d.css(a, b));
                            g = "number"
                        }
                        if (!(c == null || g === "number" && isNaN(c))) {
                            g === "number" && !d.cssNumber[f] && (c = c + "px");
                            if (!i || !("set" in i) || (c = i.set(a, c)) !== m) try {
                                h[b] = c
                            } catch (j) {}
                        }
                    } else return i && "get" in i && (e = i.get(a, false, g)) !== m ? e : h[b]
                }
            },
            css: function(a, b, c) {
                var g,
                    e, b = d.camelCase(b);
                e = d.cssHooks[b];
                b = d.cssProps[b] || b;
                b === "cssFloat" && (b = "float");
                if (e && "get" in e && (g = e.get(a, true, c)) !== m) return g;
                if (A) return A(a, b)
            },
            swap: function(a, b, c) {
                var d = {},
                    e;
                for (e in b) {
                    d[e] = a.style[e];
                    a.style[e] = b[e]
                }
                c.call(a);
                for (e in b) a.style[e] = d[e]
            }
        });
        d.curCSS = d.css;
        d.each(["height", "width"], function(a, b) {
            d.cssHooks[b] = {
                get: function(a, g, e) {
                    var f;
                    if (g) {
                        if (a.offsetWidth !== 0) return Ga(a, b, e);
                        d.swap(a, ic, function() {
                            f = Ga(a, b, e)
                        });
                        return f
                    }
                },
                set: function(a, b) {
                    if (hb.test(b)) {
                        b = parseFloat(b);
                        if (b >= 0) return b + "px"
                    } else return b
                }
            }
        });
        d.support.opacity || (d.cssHooks.opacity = {
            get: function(a, b) {
                return ec.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
            },
            set: function(a, b) {
                var c = a.style,
                    g = a.currentStyle,
                    e = d.isNaN(b) ? "" : "alpha(opacity=" + b * 100 + ")",
                    f = g && g.filter || c.filter || "";
                c.zoom = 1;
                if (b >= 1 && d.trim(f.replace(xa, "")) === "") {
                    c.removeAttribute("filter");
                    if (g && !g.filter) return
                }
                c.filter = xa.test(f) ? f.replace(xa, e) : f + " " + e
            }
        });
        d(function() {
            if (!d.support.reliableMarginRight) d.cssHooks.marginRight = {
                get: function(a, b) {
                    var c;
                    d.swap(a, {
                        display: "inline-block"
                    }, function() {
                        c = b ? A(a, "margin-right", "marginRight") : a.style.marginRight
                    });
                    return c
                }
            }
        });
        l.defaultView && l.defaultView.getComputedStyle && (ib = function(a, b) {
            var c, g, b = b.replace(fc, "-$1").toLowerCase();
            if (!(g = a.ownerDocument.defaultView)) return m;
            if (g = g.getComputedStyle(a, null)) {
                c = g.getPropertyValue(b);
                c === "" && !d.contains(a.ownerDocument.documentElement, a) && (c = d.style(a, b))
            }
            return c
        });
        l.documentElement.currentStyle && (jb = function(a, b) {
            var c, d = a.currentStyle &&
                a.currentStyle[b],
                e = a.runtimeStyle && a.runtimeStyle[b],
                f = a.style;
            if (!hb.test(d) && gc.test(d)) {
                c = f.left;
                if (e) a.runtimeStyle.left = a.currentStyle.left;
                f.left = b === "fontSize" ? "1em" : d || 0;
                d = f.pixelLeft + "px";
                f.left = c;
                if (e) a.runtimeStyle.left = e
            }
            return d === "" ? "auto" : d
        });
        A = ib || jb;
        d.expr && d.expr.filters && (d.expr.filters.hidden = function(a) {
            var b = a.offsetHeight;
            return a.offsetWidth === 0 && b === 0 || !d.support.reliableHiddenOffsets && (a.style.display || d.css(a, "display")) === "none"
        }, d.expr.filters.visible = function(a) {
            return !d.expr.filters.hidden(a)
        });
        return d
    }(window);


    var optimizelyCode = function() {
        var DATA = {
            "log_host": "log.optimizely.com",
            "goal_expressions": {
                "5130230015": ["^dropdown\\_menu\\_clicks$"],
                "5393751808": ["^leadspace\\_click$"],
                "5590980247": ["^scroll100$"],
                "4934840963": ["^email\\_ibm\\_click$"],
                "5128560044": ["^learn\\_clicks$"],
                "5589662656": ["^150seconds$"],
                "4696188679": ["^button\\_to\\_open\\_form$"],
                "5665242603": ["^dummy\\_email\\_cta\\_click$"],
                "3743181066": ["^leadspace\\_image\\_click$"],
                "3925500812": ["^candidate\\_cta\\_click$"],
                "5129360044": ["^(https?://)?(www\\.)?ibm\\.com\\/commerce\\/us\\-en\\/industries/?\\?location\\=header\\-menu$"],
                "4058003032": ["^image\\_clicks$"],
                "4702508434": ["^orange\\_cta\\_click\\_\\-\\_try\\/buy\\_bottom$"],
                "4859490214": ["^workload\\_automation\\_click$"],
                "3916251160": ["^email\\_click$"],
                "4233941530": ["^whitepaper\\_cta\\_click$"],
                "3838729116": ["^see\\_recruiter\\_cta\\_click$"],
                "4714831645": ["^orange\\_cta\\_click\\_\\-\\_try\\/buy\\_\\-\\_top$"],
                "4059692705": ["^green\\_button$"],
                "3917383714": ["^whitepaper\\_click$"],
                "5593640485": ["^scroll75$"],
                "3785930662": ["^primary\\_email\\_cta\\_click$"],
                "3686085799": ["^email\\_cta\\_click$"],
                "5607830107": ["^primary\\_cta\\_\\-\\_leadspace$"],
                "5606722218": ["^primary\\_cta\\_click$"],
                "4955530027": ["^downloads\\_tab\\_click$"],
                "4160245549": ["^video\\_player\\_click$"],
                "4236612145": ["^ibv\\_study\\_cta\\_click$"],
                "5567172786": ["^180seconds$"],
                "4706562614": ["^orange\\_cta\\_click\\_\\-\\_try\\/buy$"],
                "4966700344": ["^cta\\_offer\\_button$"],
                "3769751354": ["^leadspace\\_cta\\_click\\_alt$"],
                "4879820093": ["^launch\\_forms\\_experience\\_build\\_click$"],
                "5576050879": ["^scroll50$"],
                "5400320832": ["^email\\_us\\_clicks$"],
                "5593022149": ["^90seconds$"],
                "4151741255": ["^secondary\\-cta\\-clk$"],
                "5593812209": ["^60seconds$"],
                "5123780042": ["^(https?://)?(www\\.)?ibm\\.com\\/commerce\\/us\\-en\\/payments/?\\?location\\=header\\-menu$"],
                "5126220237": ["^(https?://)?(www\\.)?ibm\\.com\\/commerce\\/us\\-en\\/business\\-partners/?\\?location\\=header\\-menu$"],
                "5597442237": ["^30seconds$"],
                "5587942480": ["^120seconds$"],
                "5123570130": ["^(https?://)?(www\\.)?ibm\\.com\\/commerce\\/us\\-en\\/b2bintegration/?\\?location\\=header\\-menu$"],
                "5130190035": ["^(https?://)?(www\\.)?ibm\\.com\\/commerce\\/us\\-en\\/ecommerce/?\\?location\\=header\\-menu$"],
                "6039250260": ["^secondary\\_cta$"],
                "3742960121": ["^leadspace\\_cta\\_click$"],
                "4242550232": ["^e\\-book\\_cta\\_click$"],
                "4155015898": ["^player\\-cta\\-clicks\\_\\(combined\\)$"],
                "3514662748": ["^engagement$"],
                "5125590009": ["^(https?://)?(www\\.)?ibm\\.com\\/commerce\\/us\\-en\\/customeranalytics/?\\?location\\=header\\-menu$"],
                "4803100641": ["^cta\\_button$"],
                "5123590115": ["^(https?://)?(www\\.)?ibm\\.com\\/commerce\\/us\\-en\\/procurement/?\\?location\\=header\\-menu$"],
                "4968201317": ["^cta\\_offer\\_button$"],
                "4242450534": ["^did\\_you\\_know\\_cta\\_clicks$"],
                "5125340135": ["^(https?://)?(www\\.)?ibm\\.com\\/commerce\\/us\\-en\\/marketing/?\\?location\\=header\\-menu$"],
                "3723804523": ["^email\\_cta\\_click\\_alt$"],
                "3771111404": ["^leadspace\\_image\\_cta\\_click$"],
                "5601270511": ["^scroll25$"],
                "5128410097": ["^overview\\_clicks$"],
                "3879272692": ["^video\\_click$"],
                "4858080166": ["^service\\_request\\_click$"],
                "3925820024": ["^contact\\_cta\\_click$"],
                "3899960313": ["^recruiter\\_candidate\\_cta\\_click\\_\\(combined\\)$"]
            },
            "experiments": {
                "3885370880": {
                    "name": "PerformanceTest_Opti_Tealium_asynch v2",
                    "variation_ids": ["3877000837", "3891410849"],
                    "urls": [{
                        "match": "exact",
                        "value": "http://www.ibm.com/data/optimizely-test/tealium_asynchronous.html"
                    }],
                    "enabled_variation_ids": ["3877000837", "3891410849"]
                },
                "4941101184": {
                    "code": "\n\n\n",
                    "variation_weights": {
                        "4935981160": 5000,
                        "4939231186": 5000
                    },
                    "name": "Coremetrics Integration Pilot",
                    "enabled": true,
                    "variation_ids": ["4935981160", "4939231186"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-01.ibm.com/software/info/sterling-commerce/"
                    }],
                    "enabled_variation_ids": ["4935981160", "4939231186"]
                },
                "4851850883": {
                    "name": "MyIBM Dashboard",
                    "variation_ids": ["4848890916", "4848850955"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/myibm/"
                    }],
                    "enabled_variation_ids": ["4848890916", "4848850955"]
                },
                "5122290067": {
                    "name": "Bluemix",
                    "variation_ids": ["5116171071", "5122290068"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://console.ng.bluemix.net/"
                    }],
                    "enabled_variation_ids": ["5116171071", "5122290068"]
                },
                "5879652117": {
                    "name": "Test",
                    "variation_ids": ["5875533653", "5892040978"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-01.ibm.com/software/uk/commerce/b2c-ecommerce/"
                    }],
                    "enabled_variation_ids": ["5875533653", "5892040978"]
                },
                "3768861463": {
                    "variation_weights": {
                        "3771161492": 5000,
                        "3769961344": 5000
                    },
                    "name": "PerformanceTest_Opti_Tealium_synch v2",
                    "enabled": true,
                    "variation_ids": ["3769961344", "3771161492"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/tealium_synchronous.html"
                    }],
                    "enabled_variation_ids": ["3769961344", "3771161492"]
                },
                "5188040345": {
                    "name": "Demo_for_Pam",
                    "variation_ids": ["5184891430", "5168337503"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/cloud-computing/bluemix/"
                    }],
                    "enabled_variation_ids": ["5184891430", "5168337503"]
                },
                "5611330588": {
                    "name": "Test",
                    "variation_ids": ["5604990587", "5598771422"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/commerce/us-en/"
                    }],
                    "enabled_variation_ids": ["5604990587", "5598771422"]
                },
                "3699090719": {
                    "variation_weights": {
                        "3703482134": 4999,
                        "3681800411": 5001
                    },
                    "name": "Image Test",
                    "enabled": true,
                    "variation_ids": ["3681800411", "3703482134"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/optimizely_tealium.html"
                    }],
                    "enabled_variation_ids": ["3681800411", "3703482134"]
                },
                "3743602089": {
                    "variation_weights": {
                        "3747413968": 5000,
                        "3742851442": 5000
                    },
                    "name": "PerformanceTest_Opti_synch",
                    "enabled": true,
                    "variation_ids": ["3747413968", "3742851442"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/optimizely_synchronous.html"
                    }],
                    "enabled_variation_ids": ["3747413968", "3742851442"]
                },
                "5393170347": {
                    "name": "Optimizely_viaTealium_Asynch_3.22",
                    "variation_ids": ["5400230686", "5384420881"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/tealium_asynchronous.html"
                    }],
                    "enabled_variation_ids": ["5400230686", "5384420881"]
                },
                "5117070381": {
                    "name": "ibm.com/commerce menu randomizer",
                    "variation_ids": ["5119840387", "5124200855"],
                    "urls": [{
                        "match": "simple",
                        "value": "ibm.com/commerce/us-en/"
                    }],
                    "enabled_variation_ids": ["5119840387", "5124200855"]
                },
                "4714041648": {
                    "audiences": [4697298630],
                    "variation_weights": {
                        "4708166418": 5000,
                        "4712783352": 5000
                    },
                    "name": "Commerce-Software: Notes / Domino-A/B/N-CTA-Copy",
                    "enabled": true,
                    "variation_ids": ["4712783352", "4708166418"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-03.ibm.com/software/products/en/ibm-verse"
                    }],
                    "enabled_variation_ids": ["4712783352", "4708166418"]
                },
                "4679239220": {
                    "audiences": [4697298630],
                    "name": "Verse - Free trial CTA - Alternative copy",
                    "variation_ids": ["4677769578", "4706207289"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-03.ibm.com/software/products/en/ibm-verse"
                    }],
                    "enabled_variation_ids": ["4677769578", "4706207289"]
                },
                "3766121272": {
                    "name": "PerformanceTest_Opti_Tealium_asynch",
                    "variation_ids": ["3764961324", "3768831373"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/tealium_asynchronous.html"
                    }],
                    "enabled_variation_ids": ["3764961324", "3768831373"]
                },
                "3788190777": {
                    "name": "PerformanceTest_Opti_Tealium_asynch (1)",
                    "variation_ids": ["3783210773", "3768833136"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/tealium_asynchronous.html"
                    }],
                    "enabled_variation_ids": ["3783210773", "3768833136"]
                },
                "3954550332": {
                    "name": "Feedback_QA_Change Demo CTA Location",
                    "variation_ids": ["3960010278", "3953580319"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-01.ibm.com/software/commerce/offers/b2b-ecommerce-cloud.html"
                    }],
                    "enabled_variation_ids": ["3960010278", "3953580319"]
                },
                "4229230023": {
                    "css": ".CTA-btn{\n \t\tborder: #FFF solid 4px; \n  \tpadding: 10px; \n  \tfont-size: 18px;\n  \tfont-family: \"HelveticaNeue-Bold\",\"HelvBoldIBM\",Arial,sans-serif;\n \t\tposition: relative;\n  \ttop: 10px;\n  \t\n  \n}\n\n.CTA-btn:hover{\n \t\tborder: #FFF solid 4px; \n  \tcolor: #008571;\n  \tbackground-color: #FFF;\n  \tpadding: 10px; \n  \tfont-size: 18px;\n  \tfont-family: \"HelveticaNeue-Bold\",\"HelvBoldIBM\",Arial,sans-serif;\n \t\ttext-decoration: none;\n \n  \n}",
                    "name": "Social-Software: Kenexa Talent Acquisition on Cloud-A/B/N-CTA-Other",
                    "variation_ids": ["4221940054", "4224720063"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-01.ibm.com/software/smarterworkforce/"
                    }],
                    "enabled_variation_ids": ["4221940054", "4224720063"]
                },
                "5835630281": {
                    "name": "Social Test",
                    "variation_ids": ["5844130888", "5852140168"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-03.ibm.com/software/products/en/ibmnotes"
                    }],
                    "enabled_variation_ids": ["5844130888", "5852140168"]
                },
                "3792770253": {
                    "name": "PerformanceTest_Opti_Tealium_asynch (2)",
                    "variation_ids": ["3807180250", "3805290248"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/tealium_asynchronous.html"
                    }],
                    "enabled_variation_ids": ["3807180250", "3805290248"]
                },
                "3768010062": {
                    "name": "SPSS_testing_button",
                    "variation_ids": ["3789930243", "3769731185"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-01.ibm.com/software/analytics/spss/products/statistics/"
                    }],
                    "enabled_variation_ids": ["3789930243", "3769731185"]
                },
                "5889550391": {
                    "name": "Social Banner Test",
                    "variation_ids": ["5879581308", "5886710402"],
                    "urls": [{
                        "match": "simple",
                        "value": "https://app.optimizely.com/edit?experiment_id=5835630281&pth_ovr=/software/products/en/ibmnotess&loc_ovr=www-01.ibm.com"
                    }],
                    "enabled_variation_ids": ["5879581308", "5886710402"]
                },
                "4241291726": {
                    "audiences": [4066333447],
                    "name": "Sterling Commerce \u2013 Button Color A/B/C 02",
                    "variation_ids": ["4227631674", "4241271647", "4232111712"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-01.ibm.com/software/info/sterling-commerce/"
                    }],
                    "enabled_variation_ids": ["4227631674", "4241271647", "4232111712"]
                },
                "3766732375": {
                    "name": "PerformanceTest_Opti_Tealium_synch v2",
                    "variation_ids": ["3767952000", "3768721668"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/tealium_synchronous.html"
                    }],
                    "enabled_variation_ids": ["3767952000", "3768721668"]
                },
                "4950802648": {
                    "name": "demo",
                    "variation_ids": ["4972380012", "4972380013"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/commerce/us-en/campaigns/procurement-analytics/?lnk=com_free_app"
                    }],
                    "enabled_variation_ids": ["4972380012", "4972380013"]
                },
                "5682420834": {
                    "name": "Optimizely_viaTealium_Asynch_3.22_user_rights_evaluation",
                    "variation_ids": ["5678230520", "5677240507"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/tealium_asynchronous.html"
                    }],
                    "enabled_variation_ids": ["5678230520", "5677240507"]
                },
                "4256303076": {
                    "name": "Leadspace_Copy_Test1",
                    "variation_ids": ["4237090519", "4252242444"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibmmarketingcloud.com/personalization.html"
                    }],
                    "enabled_variation_ids": ["4237090519", "4252242444"]
                },
                "3711109989": {
                    "name": "Recruitment Marketing Landing Page, CTA Copy, 01",
                    "variation_ids": ["3724153441", "3699424123"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-01.ibm.com/software/smarterworkforce/recruitment-marketing/"
                    }],
                    "enabled_variation_ids": ["3724153441", "3699424123"]
                },
                "3734898026": {
                    "variation_weights": {
                        "3741197468": 5000,
                        "3733087254": 5000
                    },
                    "name": "PerformanceTest_Opti_Asynch",
                    "enabled": true,
                    "variation_ids": ["3741197468", "3733087254"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/optimizely_asynchronous.html"
                    }],
                    "enabled_variation_ids": ["3741197468", "3733087254"]
                },
                "5289801324": {
                    "name": "PerformanceTest_Opti_Tealium_Asynch - 3/11",
                    "variation_ids": ["5292180845", "5294190860"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/data/optimizely-test/tealium_asynchronous.html"
                    }],
                    "enabled_variation_ids": ["5292180845", "5294190860"]
                },
                "4038486254": {
                    "name": "Sterling Commerce \u2013 Button Color + Hero Image, 01",
                    "section_ids": ["4053262896", "4067172647"],
                    "urls": [{
                        "match": "simple",
                        "value": "www-01.ibm.com/software/info/sterling-commerce/"
                    }],
                    "enabled_variation_ids": ["4060772725_4059692704", "4060772725_4042355318", "4053202924_4059692704", "4053202924_4042355318", "4051302753_4059692704", "4051302753_4042355318"]
                },
                "5462354542": {
                    "name": "www-01.ibm.com/software/info/sterling-commerce/ Experiment",
                    "variation_ids": ["5466495623", "5463805169"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-01.ibm.com/software/info/sterling-commerce/"
                    }],
                    "enabled_variation_ids": ["5466495623", "5463805169"]
                },
                "6050130174": {
                    "name": "Tealium-Optimizely POC Test",
                    "variation_ids": ["6027700313", "6050200137"],
                    "urls": [{
                        "match": "simple",
                        "value": "http://www-01.ibm.com/software/lotus/"
                    }],
                    "enabled_variation_ids": ["6027700313", "6050200137"]
                }
            },
            "audiences": {
                "4697298630": {
                    "conditions": ["and", ["or", ["or", {
                        "dimension_id": 4679239221,
                        "value": "search"
                    }]]],
                    "name": "Search traffic"
                },
                "4066333447": {
                    "conditions": ["and", ["or", ["not", ["or", {
                        "dimension_id": 4069143348,
                        "value": "iphone"
                    }]]]],
                    "name": "iPhone exclude"
                }
            },
            "www_host": "app.optimizely.com",
            "public_suffixes": {
                "ibmmarketingcloud.com": ["www.ibmmarketingcloud.com"],
                "ibm.com": ["www-03.ibm.com", "ibm.com", "www.ibm.com", "www-01.ibm.com"],
                "bluemix.net": ["console.ng.bluemix.net"],
                "optimizely.com": ["app.optimizely.com"]
            },
            "force_variation": true,
            "dimensions": {
                "4069143348": {
                    "condition_type": "device"
                },
                "4679239221": {
                    "condition_type": "source_type"
                }
            },
            "version": "master-2417.393207928873452215",
            "admin_account_id": 2972860641,
            "blacklisted_experiments": [5639390990, 5457085441, 5135232003, 5675990532, 5597720581, 5595732486, 5547160071, 4145880074, 6017830410, 5703360013, 4890591248, 4868000274, 4663051285, 5597464087, 5287910424, 5679791641, 5598302234, 5458880539, 3743493151, 5867893850, 5455971363, 4558621701, 5566751269, 5601250992, 5145525287, 5451812332, 5628432427, 5735630384, 5278260061, 5302761525, 5636651574, 5968373303, 5434500787, 5413402170, 5805160507, 4566787849, 5689030717, 4545551934, 5740420159, 5591932481, 5592982594, 5588935770, 5630160748, 5205720138, 5441384011, 5594090060, 5593600591, 5579805283, 5411860049, 5579692628, 5283870819, 5528052494, 5442682459, 5287060844, 4926600292, 4926910560, 5429311073, 5598292067, 5172381284, 5555220069, 5584984336, 5406620263, 5404570217, 5627080810, 5612931179, 5749612141, 5791290983, 5578814065, 5584040466, 5383761014, 5550370935, 5597790329, 5629990011, 5271774996, 5433941632, 5597030563, 5597920021, 5449801865, 5663100182, 5694260363, 4931792290, 5683426668, 3713291409, 5339370133, 5146541039, 5381981338, 5438340763, 5645481118, 5596070047, 5599210656, 5219980963, 5398540453, 5312671911, 4465863110, 5846802091, 5307011245, 5209313968, 5279530399, 5597020851, 5434440375, 5597720606, 5469390610, 5594060484, 5301653778, 5701004489, 5589770870, 5040740043, 5312760478, 5760031778, 4910742739, 4854980310, 5760010531, 5397983449, 4618205402, 5569741021, 5219790558, 5579283681, 4856280802, 5422661859, 5631590116, 5915793127, 5598252264, 3729370859, 4850320107, 5546801292, 5983950574, 5588730101, 5099271379, 5600420090, 5596410661, 3684071165, 5403325181, 5116771166, 5383192323, 5848580157, 5458090248, 4940000009, 5630710539, 5605060481, 5675296014, 5416072464, 5445051666, 5700560149, 5221702420, 5595604245, 5929031640, 5598302488, 5682451226, 5686950802, 5752531228, 5622911706, 5564720931, 5881700133, 5598630182, 5461220648, 5766540076, 5116921102, 5591962494, 5295531828, 5677941560, 5597940025, 5579283678, 5616922427, 5442241516, 5364023613, 5601400126, 5588321087, 5598292293, 5982270603, 5678230070, 5311802593, 4879521101, 5758950222, 5531560784, 5520840018, 5445253461, 5577102679, 5456862041, 5630590350, 5540330845, 5308511204, 4552672095, 5410512344, 5031532688, 5532350494, 5591882088, 5286641368, 5463002986, 5405610859, 5617321836, 5089120743, 5801660306, 5088821108, 4921901942, 5577150014, 5435103209, 5660531830, 5103821185, 5700604394, 4932230293, 5854522759, 5112153153, 4870260622, 5564222866, 4932281751, 5991200154, 6037490075, 5437932957, 5626621854, 5921833375, 5603150240, 5591052194, 5492684708, 5508070822, 5690330023, 5544150441, 6127631788, 5801660336, 4873890802, 5596080051, 5733900212, 5593802168, 5588935609, 5599210938, 5287750076, 5775962527, 5599281089, 5698730570, 5329370051, 5558910918, 5457500235, 5683980234, 5598640075, 5737531854, 5595562911, 5621001169, 5698740690, 5664850765, 4872570838, 5180790744, 4653421221, 5468470757, 5319022567, 5120451561, 5163122666, 5788770796, 5588780525, 5598640111, 5171946480, 5666490354, 4749840884, 5192762358, 5889300985, 5839160315, 5206332924, 5439531517, 5593742420],
            "project_id": 3519582641,
            "sections": {
                "4053262896": {
                    "name": "Section #1",
                    "variation_ids": ["4060772725", "4053202924", "4051302753"]
                },
                "4067172647": {
                    "name": "Images",
                    "variation_ids": ["4059692704", "4042355318"]
                }
            },
            "revision": 525,
            "summary_revenue_goal_id": 3519252474,
            "installation_verified": true,
            "preview_host": "//optimizely.s3.amazonaws.com",
            "api_host": "api.optimizely.com",
            "variations": {
                "3767952000": {
                    "name": "Original"
                },
                "3769961344": {
                    "name": "Original"
                },
                "3789930243": {
                    "name": "Original"
                },
                "3768721668": {
                    "name": "Variation #1"
                },
                "3877000837": {
                    "name": "Original"
                },
                "3805290248": {
                    "code": "$(\"#ibm-leadspace-body\").replaceWith(\"<div id=\\\"ibm-leadspace-body\\\" style=\\\"background: url(http://www.iglou.com/wp-content/uploads/2012/10/photodune-2392898-server-m.jpg) no-repeat 100% 50%;\\\">\\n                            <h1>Tealium Page</h1>\\n                        </div>\");",
                    "name": "Leadspace Image #1"
                },
                "5852140168": {
                    "name": "Variation #1"
                },
                "4848850955": {
                    "name": "Variation #1"
                },
                "3768831373": {
                    "code": "$(\"#ibm-leadspace-body\").replaceWith(\"<div id=\\\"ibm-leadspace-body\\\" style=\\\"background: url(http://www.iglou.com/wp-content/uploads/2012/10/photodune-2392898-server-m.jpg) no-repeat 100% 50%;\\\">\\n                            <h1>Tealium Page</h1>\\n                        </div>\");",
                    "name": "Leadspace Image #1"
                },
                "5400230686": {
                    "name": "Original"
                },
                "5384420881": {
                    "code": "$(\"#ibm-leadspace-body\").css({\"background-image\":\"url(//cdn.optimizely.com/img/2972860641/dcaaf7df92e441fc9402509befb524c6.jpg)\"});\n$(\"#ibm-content-main > .ibm-columns > div:eq(0) > h2:eq(0)\").html(\"YOU ARE IN A TEST\");",
                    "name": "Variation #1"
                },
                "5892040978": {
                    "name": "Variation #1"
                },
                "3771161492": {
                    "code": "$(\"h1\").replaceWith(\"<h1>Copy Test</h1>\");\n$(\"#ibm-leadspace-body\").replaceWith(\"<div id=\\\"ibm-leadspace-body\\\" style=\\\"background: url(&quot;http://www.iglou.com/wp-content/uploads/2012/10/photodune-2392898-server-m.jpg&quot;) no-repeat 100% 50%;\\\">\\n                            <h1>Copy Test</h1>\\n                        </div>\");",
                    "name": "Variation #1"
                },
                "3783210773": {
                    "name": "Original"
                },
                "3703482134": {
                    "code": "//$(\"#ibm-leadspace-body\").replaceWith(\"<div id=\\\"ibm-leadspace-body\\\" style=\\\"background: url(http://www.iglou.com/wp-content/uploads/2012/10/photodune-2392898-server-m.jpg) no-repeat 100% 50%;\\\">\\n<h1>Optimizely Test Page (Tealium Test)</h1>\\n</div>\");\n$(\"#ibm-leadspace-body\").css({\"background-image\":\"url(http://www.iglou.com/wp-content/uploads/2012/10/photodune-2392898-server-m.jpg)\"});",
                    "name": "Variant Image"
                },
                "5124200855": {
                    "code": "$(\".ibm-sitenav-menu-list > ul > li:eq(1)\").replaceWith(\"<li role=\\\"presentation\\\" class=\\\"ibm-haschildlist\\\" data-widget=\\\"randomized-menu\\\"><button role=\\\"menuitem\\\" tabindex=\\\"-1\\\">Explore</button><ul role=\\\"menu\\\" class=\\\"ibm-align-right\\\"><li role=\\\"presentation\\\" class=\\\"\\\">\\n                                        <a role=\\\"menuitem\\\" target=\\\"_self\\\" href=\\\"marketing/?location=header-menu\\\">\\n                                            Marketing\\n                                        </a>\\n                                    </li><li role=\\\"presentation\\\" class=\\\"\\\">\\n                                        <a role=\\\"menuitem\\\" target=\\\"_self\\\" href=\\\"customeranalytics/?location=header-menu\\\">\\n                                            Customer Analytics\\n                                        </a>\\n                                    </li><li role=\\\"presentation\\\" class=\\\"\\\">\\n                                        <a role=\\\"menuitem\\\" target=\\\"_self\\\" href=\\\"ecommerce/?location=header-menu\\\">\\n                                            eCommerce &amp; Merchandising\\n                                        </a>\\n                                    </li><li role=\\\"presentation\\\" class=\\\"\\\">\\n                                        <a role=\\\"menuitem\\\" target=\\\"_self\\\" href=\\\"procurement/?location=header-menu\\\">\\n                                            Procurement\\n                                        </a>\\n                                    </li><li role=\\\"presentation\\\" class=\\\"\\\">\\n                                        <a role=\\\"menuitem\\\" target=\\\"_self\\\" href=\\\"payments/?location=header-menu\\\">\\n                                            Payments\\n                                        </a>\\n                                    </li><li role=\\\"presentation\\\" class=\\\"\\\">\\n                                        <a role=\\\"menuitem\\\" target=\\\"_self\\\" href=\\\"b2bintegration/?location=header-menu\\\">\\n                                            B2B Integration\\n                                        </a>\\n                                    </li><li role=\\\"presentation\\\" class=\\\"\\\">\\n                                        <a role=\\\"menuitem\\\" target=\\\"_self\\\" href=\\\"business-partners/\\\">\\n                                            Business Partners\\n                                        </a>\\n                                    </li><li role=\\\"presentation\\\" class=\\\"\\\">\\n                                        <a role=\\\"menuitem\\\" target=\\\"_self\\\" href=\\\"industries/?location=header-menu\\\">\\n                                            Industries\\n                                        </a>\\n                                    </li></ul></li>\");",
                    "name": "Randomized Menu Overview"
                },
                "5119840387": {
                    "name": "Original"
                },
                "3741197468": {
                    "name": "Original"
                },
                "6027700313": {
                    "name": "Original"
                },
                "3953580319": {
                    "code": "$(\".ibm-col-6-2 a > img:eq(0)\").css({\"left\":\"0px\", \"position\":\"relative\", \"top\":\"0px\"});\n$(\".ibm-col-6-2 a > img:eq(0)\").detach().insertAfter(\".ibm-col-1-1 > p\");\n$(\".ibm-col-1-1 > img\").css({\"left\":\"0px\", \"position\":\"relative\", \"top\":\"0px\"});\n$(\".ibm-col-1-1 > img\").detach().insertAfter(\"#ibm-content-main > .ibm-columns\");",
                    "name": "DemoCTA_Rearranged_LowerLeftCorner"
                },
                "4059692704": {
                    "name": "Forrester"
                },
                "3891410849": {
                    "code": "$(\"#ibm-leadspace-body\").css({\"background-image\":\"url(http://www.iglou.com/wp-content/uploads/2012/10/photodune-2392898-server-m.jpg)\"});\n$(\"h1\").css({\"color\":\"#ffffff\"});",
                    "name": "Variation #1"
                },
                "4712783352": {
                    "name": "Original"
                },
                "4221940054": {
                    "name": "Original"
                },
                "4848890916": {
                    "name": "Original"
                },
                "3960010278": {
                    "name": "Original"
                },
                "5184891430": {
                    "name": "Original"
                },
                "3764961324": {
                    "name": "Original"
                },
                "3742851442": {
                    "code": "$(\"#ibm-leadspace-body\").replaceWith(\"<div id=\\\"ibm-leadspace-body\\\" style=\\\"background: url(http://www.iglou.com/wp-content/uploads/2012/10/photodune-2392898-server-m.jpg) no-repeat 100% 50%;\\\">\\n                            <h1>Optimizely synchronous</h1>\\n                        </div>\");",
                    "name": "Leadspace_image #1"
                },
                "5466495623": {
                    "name": "Original"
                },
                "5844130888": {
                    "name": "Original"
                },
                "4706207289": {
                    "code": "$(\".leadspace-button\").css({\"position\":\"relative\", \"left\":0, \"top\":0, \"width\":196, \"height\":30});\n$(\".leadspace-button\").html(\"Discover how Verse can work for you\");\n$(\".leadspace-button\").css({});\n$(\".leadspace-button\").css({\"width\":256, \"height\":34});\n$(\"#vp1 .ibm-btn-pri\").html(\"Discover how Verse can work for you\");\n$(\"#vp .ibm-btn-pri\").html(\"Try it for free now\");",
                    "name": "Variation #1"
                },
                "4241271647": {
                    "code": "$(\".ibm-tabs > li:eq(1) > a:eq(0)\").css({\"background-color\":\"#6797e0\"});\n$(\".ibm-tabs > li:eq(1) > a:eq(0)\").css({\"color\":\"#ffffff\"});\n$(\".ibm-tabs > li:eq(1) > a:eq(0)\").css({\"background-color\":\"#8cd211\"});\n$(\".ibm-tabs > li:eq(1) > a:eq(0)\").css({\"color\":\"#000000\"});\n$(\"img.ibm-no-mobile\").replaceWith(\"<img src=\\\"http://www.ibm.com/software/data/images/order_mgmt_video-620x120.jpg\\\" alt=\\\"What is order management? Watch the video (00:00:28)\\\" height=\\\"120\\\" width=\\\"620\\\">\");\n$(\".ibm-no-proxy\").attr({\"href\":\"https://www.youtube.com/watch?v=Xo1gWmTK8ts\"});\n$(\".ibm-no-proxy\").attr({\"target\":\"_blank\"});\n$(\".ibm-no-proxy > img:eq(0)\").replaceWith(\"<img class=\\\"optimizely-highlight\\\" src=\\\"https://www-01.ibm.com/software/commerce/images/web/order_mgmt_hero_620X120-dz68s.jpg\\\" height=\\\"120\\\" width=\\\"620\\\">\");\n$(\".ibm-no-proxy\").attr({\"href\":\"https://www-01.ibm.com/software/commerce/images/web/order_mgmt_hero_620X120-dz68s.jpg\"});",
                    "name": "Green Tab"
                },
                "5677240507": {
                    "code": "$(\"#ibm-content-main > .ibm-columns > div:eq(1) > p:eq(0) > strong:eq(0)\").html(\"Please contact IBM using email here:\");",
                    "name": "Variation #1"
                },
                "4224720063": {
                    "code": "$(\"#didyouknow\").replaceWith(\"<div class=\\\"ibm-band ibm-alternate-background\\\" style=\\\"background-color: #008571\\\">\\n\\t\\t\\t\\t\\t<div class=\\\"ibm-columns\\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\\"ibm-col-1-1\\\">\\n\\t\\t\\t\\t\\t\\t\\t<h2 class=\\\"ibm-h1 ibm-bold ibm-padding-top-2 ibm-padding-bottom-2\\\">Did you know...</h2>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t</div>\\n                  \\n                  <div class=\\\"ibm-columns ibm-center\\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\\"ibm-col-6-2 ibm-col-medium-1-1\\\">\\n                          <figure><img src=\\\"/software/smarterworkforce/images/BdHy9W2.png\\\">\\n                            <p class=\\\"ibm-h3 ibm-bold\\\">You can reduce your applicants-to-hire ratio by nearly 66%</p></figure>\\n                          \\t\\t\\n            <div><p>Find out how your HR team can make even smarter decisions using analytics. This e-book showcases some of the most talented thought leaders and visionaries in the HR space for a discussion on building a smarter workforce and the future of work.</p> <p><a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov42559&amp;S_TACT=C28004HW&amp;dynform=20722&amp;lang=en_US\\\">e-Book: Building a #Smarter Workforce: What is the Future of HR?</a></p></div>\\n            \\n\\t\\t\\t\\t\\t\\t</div>\\n                    <div class=\\\"ibm-col-6-2 ibm-col-medium-1-1\\\">\\n                          <figure><img src=\\\"/software/smarterworkforce/images/chart2v2.png\\\">\\n                            <p class=\\\"ibm-h3 ibm-bold\\\">Analytics pays $13.01 for every dollar spent</p></figure>\\n                          \\t\\t\\n            <div><p>Spend less time guessing and more time on value add efforts that will impact the business. Uncover insights you might never have known existed. Keep a pulse on the business through the eyes of your workforce.</p> <p><a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov25249&amp;=109HD3PW&amp;dynform=12961&amp;lang=en_US\\\" onclick=\\\"goPage(this); return false;\\\">IBV Study: Unlock the people equation</a></p></div>\\n            \\n\\t\\t\\t\\t\\t\\t</div>\\n                    <div class=\\\"ibm-col-6-2 ibm-col-medium-1-1\\\">\\n                          <figure><img src=\\\"/software/smarterworkforce/images/chart3v2.png\\\">\\n                            <p class=\\\"ibm-h3 ibm-bold\\\">Total replacement costs can reach double salary</p></figure>\\n                          \\t\\t\\n            <div><p>Use predictive hiring to identify candidates that have the potential to stay at your company longer. Retain employees with surveys that identify areas for improvement.</p> <p><a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov28391&amp;=109HD3PW&amp;dynform=13873&amp;lang=en_US\\\" onclick=\\\"goPage(this); return false;\\\">White Paper: Are traditional HR practices keeping your organization average?</a></p></div>\\n            \\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t</div>\\n                  \\n\\t\\t\\t\\t</div>\");\n$(\".ibm-band > .ibm-center > div:eq(0) > div:eq(0) > p:eq(1) > a:eq(0)\").replaceWith(\"<a class=\\\"CTA-btn\\\" target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov42559&amp;S_TACT=C28004HW&amp;dynform=20722&amp;lang=en_US\\\">Find Out How</a>\");\n$(\".CTA-btn\").css({\"margin\":\"10px\"});\n$(\".CTA-btn\").css({\"margin\":\"\"});\n$(\".ibm-band > .ibm-center > div:eq(2) > div:eq(0) > p:eq(1) > a:eq(0)\").replaceWith(\"<a class=\\\"CTA-btn\\\" target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov28391&amp;=109HD3PW&amp;dynform=13873&amp;lang=en_US\\\" onclick=\\\"goPage(this); return false;\\\">Learn How</a>\");\n$(\".ibm-band > .ibm-center > div:eq(2) > div:eq(0) > p:eq(0)\").replaceWith(\"<p>Use predictive hiring to identify candidates that have the potential to stay at your company longer. Retain employees with surveys that identify areas for improvement.<br><br></p>\");\n$(\".ibm-band > .ibm-center > div:eq(1) > div:eq(0) > p:eq(1) > a:eq(0)\").replaceWith(\"<a class=\\\"CTA-btn\\\" target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov25249&amp;=109HD3PW&amp;dynform=12961&amp;lang=en_US\\\" onclick=\\\"goPage(this); return false;\\\">Uncover How</a>\");\n$(\".ibm-band > .ibm-center > div:eq(1) > div:eq(0) > p:eq(1) > a:eq(0)\").html(\"Uncover Insights Now\");\n$(\".ibm-band > .ibm-center > div:eq(2)\").replaceWith(\"<div class=\\\"ibm-col-6-2 ibm-col-medium-1-1\\\">\\n                        <a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov28391&amp;=109HD3PW&amp;dynform=13873&amp;lang=en_US\\\">  <figure><img src=\\\"/software/smarterworkforce/images/chart3v2.png\\\"> </a>\\n                            <p class=\\\"ibm-h3 ibm-bold\\\">Total replacement costs can reach double salary</p></figure>\\n                          \\t\\t\\n            <div><p>Use predictive hiring to identify candidates that have the potential to stay at your company longer. Retain employees with surveys that identify areas for improvement.<br><br></p> <p><a class=\\\"CTA-btn\\\" target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov28391&amp;=109HD3PW&amp;dynform=13873&amp;lang=en_US\\\" onclick=\\\"goPage(this); return false;\\\">Learn How</a></p></div>\\n            \\n\\t\\t\\t\\t\\t\\t</div>\");\n$(\".ibm-band > .ibm-center > div:eq(1) > a:eq(0)\").replaceWith(\"<a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov25249&amp;=109HD3PW&amp;dynform=12961&amp;lang=en_US\\\"> </a>\");\n$(\".ibm-band > .ibm-center > div:eq(0) > a:eq(0)\").replaceWith(\"<a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov42559&amp;S_TACT=C28004HW&amp;dynform=20722&amp;lang=en_US\\\"></a>\");\n$(\".ibm-band > .ibm-center > div:eq(1)\").replaceWith(\"<div class=\\\"ibm-col-6-2 ibm-col-medium-1-1\\\">\\n                          <a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov25249&amp;=109HD3PW&amp;dynform=12961&amp;lang=en_US\\\"> </a><figure><a href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov25249&amp;=109HD3PW&amp;dynform=12961&amp;lang=en_US\\\"><img src=\\\"/software/smarterworkforce/images/chart2v2.png\\\"></a>\\n                            <p class=\\\"ibm-h3 ibm-bold\\\">Analytics pays $13.01 for every dollar spent</p></figure>\\n                          \\t\\t\\n            <div><p>Spend less time guessing and more time on value add efforts that will impact the business. Uncover insights you might never have known existed. Keep a pulse on the business through the eyes of your workforce.</p> <p><a class=\\\"CTA-btn\\\" target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov25249&amp;=109HD3PW&amp;dynform=12961&amp;lang=en_US\\\" onclick=\\\"goPage(this); return false;\\\">Uncover Insights Now</a></p></div>\\n            \\n\\t\\t\\t\\t\\t\\t</div>\");\n$(\".ibm-band > .ibm-center > div:eq(0) > figure:eq(0) > a:eq(0)\").replaceWith(\"<img src=\\\"/software/smarterworkforce/images/BdHy9W2.png\\\">\");\n$(\".ibm-band > .ibm-center > div:eq(1) > a:eq(0)\").replaceWith(\"<a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov25249&amp;=109HD3PW&amp;dynform=12961&amp;lang=en_US\\\"></a>\");\n$(\".ibm-band > .ibm-center > div:eq(1) > figure:eq(0) > a:eq(0)\").replaceWith(\"<a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov25249&amp;=109HD3PW&amp;dynform=12961&amp;lang=en_US\\\"><img src=\\\"/software/smarterworkforce/images/chart2v2.png\\\"></a>\");\n$(\".ibm-band > .ibm-center > div:eq(2) > figure:eq(0) > a:eq(0)\").replaceWith(\"<a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov28391&amp;=109HD3PW&amp;dynform=13873&amp;lang=en_US\\\"> <img src=\\\"/software/smarterworkforce/images/chart3v2.png\\\"> </a>\");\n$(\".ibm-band > .ibm-center > div:eq(0)\").replaceWith(\"<div class=\\\"ibm-col-6-2 ibm-col-medium-1-1\\\">\\n                          <a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov42559&amp;S_TACT=C28004HW&amp;dynform=20722&amp;lang=en_US\\\"><figure><img src=\\\"/software/smarterworkforce/images/BdHy9W2.png\\\">\\n                            <p class=\\\"ibm-h3 ibm-bold\\\">You can reduce your applicants-to-hire ratio by nearly 66%</p></figure></a>\\n                          \\t\\t\\n            <div><p>Find out how your HR team can make even smarter decisions using analytics. This e-book showcases some of the most talented thought leaders and visionaries in the HR space for a discussion on building a smarter workforce and the future of work.</p> <p><a class=\\\"CTA-btn\\\" target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov42559&amp;S_TACT=C28004HW&amp;dynform=20722&amp;lang=en_US\\\">Find Out How</a></p></div>\\n            \\n\\t\\t\\t\\t\\t\\t</div>\");\n$(\"a > figure\").replaceWith(\"<figure class=\\\"e-book\\\"><img src=\\\"/software/smarterworkforce/images/BdHy9W2.png\\\">\\n                            <p class=\\\"ibm-h3 ibm-bold\\\">You can reduce your applicants-to-hire ratio by nearly 66%</p></figure>\");\n$(\".ibm-band > .ibm-center > div:eq(1) > figure:eq(0)\").replaceWith(\"<figure class=\\\"study\\\"><a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov25249&amp;=109HD3PW&amp;dynform=12961&amp;lang=en_US\\\"><img src=\\\"/software/smarterworkforce/images/chart2v2.png\\\">\\n                            <p class=\\\"ibm-h3 ibm-bold\\\">Analytics pays $13.01 for every dollar spent</p></a></figure>\");\n$(\".ibm-band > .ibm-center > div:eq(2) > figure:eq(0)\").replaceWith(\"<figure class=\\\"whitepaper\\\"><a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov28391&amp;=109HD3PW&amp;dynform=13873&amp;lang=en_US\\\"> <img src=\\\"/software/smarterworkforce/images/chart3v2.png\\\">\\n                            <p class=\\\"ibm-h3 ibm-bold\\\">Total replacement costs can reach double salary</p></a></figure>\");\n$(\".study\").replaceWith(\"<figure class=\\\"study\\\"><a target=\\\"_blank\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov25249&amp;=109HD3PW&amp;dynform=12961&amp;lang=en_US\\\"><img src=\\\"/software/smarterworkforce/images/chart2v2.png\\\">\\n                            <p class=\\\"ibm-h3 ibm-bold\\\">Analytics pays $13.01 for every dollar spent</p></a></figure>\");",
                    "name": "No Transition - CTA only"
                },
                "5116171071": {
                    "name": "Original"
                },
                "4232111712": {
                    "code": "$(\".ibm-tabs > li:eq(1) > a:eq(0)\").replaceWith(\"<a class=\\\"optimizely-highlight\\\" style=\\\"background-color: rgb(255, 80, 3); color: rgb(255, 255, 255);\\\" aria-label=\\\"Downloads\\\" tabindex=\\\"-1\\\" aria-selected=\\\"false\\\" role=\\\"tab\\\" href=\\\"/software/info/sterling-commerce/downloads.html\\\">Downloads</a>\");\n$(\"img.ibm-no-mobile\").replaceWith(\"<img src=\\\"http://www.ibm.com/software/data/images/order_mgmt_video-620x120.jpg\\\" alt=\\\"What is order management? Watch the video (00:00:28)\\\" height=\\\"120\\\" width=\\\"620\\\">\");\n$(\".ibm-no-proxy\").attr({\"href\":\"https://www.youtube.com/watch?v=Xo1gWmTK8ts\"});\n$(\".ibm-no-proxy\").attr({\"target\":\"_blank\"});\n$(\".ibm-no-proxy\").attr({\"href\":\"https://www.youtube.com/watch?v=nX0oUcK6dYw\"});\n$(\".ibm-no-proxy\").attr({\"href\":\"http://www.ibm.com/commerce/us-en/campaigns/omni-channel-fulfillment/\"});\n$(\".ibm-no-proxy > img:eq(0)\").replaceWith(\"<img src=\\\"https://www-01.ibm.com/software/commerce/images/web/order_mgmt_hero_620X120-dz68s.jpg\\\" height=\\\"120\\\" width=\\\"620\\\">\");",
                    "name": "Orange Tab"
                },
                "4051302753": {
                    "code": "$(\".ibm-tabs > li:eq(1) > a:eq(0)\").replaceWith(\"<a class=\\\"optimizely-highlight\\\" style=\\\"background-color: rgb(255, 80, 3); color: rgb(255, 255, 255);\\\" aria-label=\\\"Downloads\\\" tabindex=\\\"-1\\\" aria-selected=\\\"false\\\" role=\\\"tab\\\" href=\\\"/software/info/sterling-commerce/downloads.html\\\">Downloads</a>\");",
                    "name": "Orange Tab"
                },
                "5292180845": {
                    "name": "Original"
                },
                "4252242444": {
                    "name": "Variation #1"
                },
                "6050200137": {
                    "name": "Variation #1"
                },
                "5294190860": {
                    "code": "$(\"h1\").replaceWith(\"<h1>Insert Variant Copy Here</h1>\");\n$(\"#ibm-leadspace-body\").css({\"background-image\":\"url(//cdn.optimizely.com/img/2972860641/8a5eb62dd40a46d89f9eb9bd5638bfbf.jpg)\"});",
                    "name": "Variation #1"
                },
                "3747413968": {
                    "name": "Original"
                },
                "4939231186": {
                    "name": "Variation #1"
                },
                "5875533653": {
                    "name": "Original"
                },
                "4237090519": {
                    "name": "Original"
                },
                "3807180250": {
                    "name": "Original"
                },
                "3681800411": {
                    "name": "Original"
                },
                "4227631674": {
                    "code": "$(\"img.ibm-no-mobile\").replaceWith(\"<img src=\\\"http://www.ibm.com/software/data/images/order_mgmt_video-620x120.jpg\\\" alt=\\\"What is order management? Watch the video (00:00:28)\\\" height=\\\"120\\\" width=\\\"620\\\">\");\n$(\".ibm-no-proxy\").attr({\"href\":\"https://www.youtube.com/watch?v=Xo1gWmTK8ts\"});\n$(\".ibm-no-proxy\").attr({\"href\":\"https://www.youtube.com/watch?v=nX0oUcK6dYw\", \"target\":\"_blank\"});\n$(\".ibm-no-proxy\").attr({\"href\":\"https://www-01.ibm.com/software/commerce/images/web/order_mgmt_hero_620X120-dz68s.jpg\"});\n$(\".ibm-no-proxy > img:eq(0)\").replaceWith(\"<img class=\\\"optimizely-highlight\\\" src=\\\"https://www-01.ibm.com/software/commerce/images/web/order_mgmt_hero_620X120-dz68s.jpg\\\" height=\\\"120\\\" width=\\\"620\\\">\");",
                    "name": "Original"
                },
                "3733087254": {
                    "code": "$(\"#ibm-leadspace-body\").replaceWith(\"<div id=\\\"ibm-leadspace-body\\\" style=\\\"background: url(http://www.iglou.com/wp-content/uploads/2012/10/photodune-2392898-server-m.jpg) no-repeat 100% 50%;\\\">\\n                            <h1>Optimizely asynchronous</h1>\\n                        </div>\");",
                    "name": "LeadSpace_Graphic #1"
                },
                "5598771422": {
                    "name": "Variation #1"
                },
                "5168337503": {
                    "code": "$(\".ibm-padding-top-1 > .ibm-btn-pri\").css({\"background-color\":\"#fa675a\"});\n$(\".ibm-padding-top-1 > .ibm-btn-pri\").css({\"background-color\":\"#fad65a\"});",
                    "name": "Variation #1"
                },
                "3724153441": {
                    "name": "Original"
                },
                "4935981160": {
                    "name": "Original"
                },
                "4677769578": {
                    "name": "Original"
                },
                "4053202924": {
                    "code": "$(\".ibm-tabs > li:eq(1) > a:eq(0)\").css({\"background-color\":\"#6797e0\"});\n$(\".ibm-tabs > li:eq(1) > a:eq(0)\").css({\"color\":\"#ffffff\"});\n$(\".ibm-tabs > li:eq(1) > a:eq(0)\").css({\"background-color\":\"#8cd211\"});\n$(\".ibm-tabs > li:eq(1) > a:eq(0)\").css({\"color\":\"#000000\"});",
                    "name": "Green Tab"
                },
                "4972380012": {
                    "name": "Original"
                },
                "4972380013": {
                    "name": "Variation #1"
                },
                "3768833136": {
                    "code": "$(\"#ibm-leadspace-body\").replaceWith(\"<div id=\\\"ibm-leadspace-body\\\" style=\\\"background: url(http://www.iglou.com/wp-content/uploads/2012/10/photodune-2392898-server-m.jpg) no-repeat 100% 50%;\\\">\\n                            <h1>Tealium Page</h1>\\n                        </div>\");",
                    "name": "Leadspace Image #1"
                },
                "3769731185": {
                    "name": "Variation #1"
                },
                "5463805169": {
                    "name": "Variation #1"
                },
                "4708166418": {
                    "code": "/* Don't touch this code */\nfunction waitForDelayedContent(selector, experiment, timeout, keepAlive) {\n    var intervalTime = 50;\n    var timeout = timeout || 3000;\n    var keepAlive = keepAlive || false;\n    var maxAttempts = timeout / intervalTime;\n    var attempts = 0;\n    var elementsCount = 0;\n    var interval = setInterval(function() {\n        if ($(selector).length > elementsCount) {\n            if (!keepAlive) {\n                clearInterval(interval);\n            }\n            experiment();\n            elementsCount = $(selector).length;\n        } else  if (attempts > maxAttempts) {\n            clearInterval(interval);\n        }\n        attempts ++;\n    }, intervalTime);\n}\n/* --------------------------------------------- */\n\nwaitForDelayedContent(\"#vp .ibm-btn-pri\", function(){\n   $(\"#vp .ibm-btn-pri\").html(\"Try it for free now\");\n});\n$(\"#vp1 .ibm-btn-pri\").html(\"Try it for free now\");",
                    "name": "Copy Change"
                },
                "5886710402": {
                    "name": "Variation #1"
                },
                "4060772725": {
                    "code": "$(\".ibm-no-proxy > img:eq(0)\").addClass(\"OM\");\n$(\".OM\").removeClass(\"OM\");",
                    "name": "Original"
                },
                "4042355318": {
                    "code": "$(\"img.ibm-no-mobile\").replaceWith(\"<img src=\\\"http://www.ibm.com/software/data/images/order_mgmt_video-620x120.jpg\\\" alt=\\\"What is order management? Watch the video (00:00:28)\\\" height=\\\"120\\\" width=\\\"620\\\">\");\n$(\".ibm-no-proxy\").attr({\"href\":\"https://www.youtube.com/watch?v=Xo1gWmTK8ts\"});",
                    "name": "OM"
                },
                "5678230520": {
                    "name": "Original"
                },
                "3699424123": {
                    "code": "$(\"#ibm-content-main > div:eq(0) > div:eq(1) > p:eq(0) > a:eq(0)\").replaceWith(\"<a target=\\\"_blank\\\" class=\\\"orange-button feature-link ibm-no-proxy\\\" href=\\\"https://www-01.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov40003&amp;S_TACT=C28008TW&amp;dynform=20474\\\" style=\\\"border-style: solid; border-width: 2px;\\\"><b>View as Candidate</b></a>\");\n$(\"b\").css({\"font-size\":\"20px\"});\n$(\"#ibm-content-main > div:eq(0) > div:eq(0) > p:eq(0) > a:eq(0)\").replaceWith(\"<a target=\\\"_blank\\\" class=\\\"orange-button feature-link ibm-no-proxy\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov40002&amp;S_TACT=C28008TW&amp;dynform=20471\\\" style=\\\"border-style: solid; border-width: 2px; font-size: 20px;\\\"><b>View as Recruiter</b></a>\");\n$(\"#ibm-content-main > div:eq(0) > div:eq(0) > p:eq(0) > a:eq(0)\").css({\"border-width\":\"3px\"});\n$(\"#ibm-content-main > div:eq(0) > div:eq(1) > p:eq(0) > a:eq(0)\").css({\"border-width\":\"3px\"});\n$(\"#ibm-content > div:eq(2) > div:eq(0) > div:eq(0) > div:eq(1) > div:eq(0) > p:eq(0) > a:eq(0)\").replaceWith(\"<a target=\\\"_blank\\\" class=\\\"orange-button feature-link ibm-no-proxy\\\" href=\\\"https://www.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov40002&amp;S_TACT=C28008TW&amp;dynform=20471\\\" style=\\\"border-style: solid; border-width: 3px; font-size: 20px;\\\"><b>View as Recruiter</b></a>\");\n$(\"#ibm-content > div:eq(2) > div:eq(0) > div:eq(0) > div:eq(1) > div:eq(1) > p:eq(0) > a:eq(0)\").replaceWith(\"<a target=\\\"_blank\\\" class=\\\"orange-button feature-link ibm-no-proxy\\\" href=\\\"https://www-01.ibm.com/marketing/iwm/iwm/web/signup.do?source=swg-US_Lotus_WebMerch&amp;S_PKG=ov40003&amp;S_TACT=C28008TW&amp;dynform=20474\\\" style=\\\"border-style: solid; border-width: 3px;\\\"><b style=\\\"font-size: 20px;\\\">View as Candidate</b></a>\");",
                    "name": "CTA Variant"
                },
                "5604990587": {
                    "name": "Original"
                },
                "5879581308": {
                    "name": "Original"
                },
                "5122290068": {
                    "name": "Variation #1"
                }
            },
            //"project_js": "//Coremetrics Integration\n//create one element tag\n//put in project JS\n\nif (window.location.search.indexOf(\"optimizely\") > -1) {\n  optlyExecute = false;\n}\nelse {\n  optlyExecute = true;\n}\n\nif (typeof DATA !== 'undefined' && typeof $ !== 'undefined' && optlyExecute) {\n  $(document).ready(function(){\n     var o = window.optimizely,\n         aE = o.activeExperiments,\n         v = o.data.variations,\n         cmKeyArray = [],\n         cmValueArray = [],\n         cmKey = \"\",\n         cmValue = \"\",\n         rD = o.data.state.redirectExperiment;\n\n     for(var i = 0; i < aE.length; i++) {\n         var e = aE[i],\n         vId = o.variationIdsMap[e],\n         vIndex = o.variationMap[e],\n         isMvt = vId.length > 1,\n         eName = o.data.experiments[e].name;\n\n         cmKeyArray.push( (isMvt ? \"MVT\" : \"AB\") + \" Test: \" + eName + \"\");\n         if (!isMvt) {\n             cmValueArray.push((vIndex === 0 ? \"Control\" : \"V\") + vIndex + \": \" + o.variationNamesMap[e]);\n         } else {\n             var s = o.data.sections,\n                 sId = o.data.experiments[e].section_ids;\n             for (i = 0; i < sId.length; i++) {\n                 cmValueArray.push(s[sId[i]].name.toString() + \": \" + v[vId[i]].name); \n             }\n         }\n     }\n     \n     if (rD !== undefined) {\n         var rDe = rD.experimentId,\n         rvId = o.variationIdsMap[rDe],\n         rVIndex = o.variationMap[rDe],\n         rIsMvt = rvId.length > 1,\n         rEName = o.data.experiments[rDe].name;\n\n         cmKeyArray.push( (rIsMvt ? \"MVT Redirect\" : \"AB Redirect\") + \" Test: \" + rEName + \"\");\n\n         if (!rIsMvt) {\n             cmValueArray.push((rVIndex === 0 ? \"Control\" : \"V\") + rVIndex + \" Redirect: \" + o.variationNamesMap[rDe]);\n         } else {\n             var sR = o.data.sections,\n                 sIdR = o.data.experiments[rDe].section_ids;\n\n             for(i = 0; i < sIdR.length; i++) {\n                 cmValueArray.push(sR[sIdR[i]].name.toString() + \"Redirect: \" + v[rvId[i]].name); \n             }\n         }\n     }\n\n     if (cmKeyArray.length===0) {\n       cmKeyArray.push(\"AB Test: 0\");\n     }\n     if (cmValueArray.length===0) {\n       cmValueArray.push(\"Control: 0\");\n     }\n    \n     cmKey = cmKeyArray.join(\", \");\n     cmValue = cmValueArray.join(\", \");\n\n     var optlyCookie = document.cookie.match(\"optimizelyEndUserId\"+'=([^;]*)')[1];\n   \n     pollForCmCookie = function() {\n\u00a0       if (document.cookie.match(\"CoreID6\"+'=([^;]*)')!== null) {\n           var cmCookie = document.cookie.match(\"CoreID6\"+'=([^;]*)')[1];\n           window.optimizely = window.optimizely || [];\n           window.optimizely.push([\"trackEvent\", cmCookie]); //added on March 8th\n           window.cmCreateElementTag(cmValue, cmKey, optlyCookie); \n        }\n        else {\n           //window.optimizely = window.optimizely || [];\n           //window.optimizely.push([\"trackEvent\", \"CoreID6 not found\"]);\n           setTimeout(pollForCmCookie, 25);\n        }\n     };\n     pollForCmCookie();\n  });\n}\n\n/*\n * Usage\n *    This function fires custom events at different scroll depth milestones.  \n */\n\n  // Variables to prevent continuous firing of custom events\n\n  var scrollTwentyFive = true;\n  var scrollFifty = true;\n  var scrollSeventyFive = true;\n  var scrollOneHundred = true;\n\n  // Create the scrollPercentage\n\n  $(window).bind('scroll', function() {\n      window.scrollPercent = ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100;\n\n      // Conditional code we'll use to fire events based on scrollPercentage.\n\n      if (window.scrollPercent >= 25 && scrollTwentyFive) {\n          window['optimizely'] = window['optimizely'] || [];\n          window.optimizely.push([\"trackEvent\", \"scroll25\"]);\n          scrollTwentyFive = false;\n      }\n\n      if (window.scrollPercent >= 50 && scrollFifty) {\n          window['optimizely'] = window['optimizely'] || [];\n          window.optimizely.push([\"trackEvent\", \"scroll50\"]);\n          scrollFifty = false;\n      }\n\n      if (window.scrollPercent >= 75 && scrollSeventyFive) {\n          window['optimizely'] = window['optimizely'] || [];\n          window.optimizely.push([\"trackEvent\", \"scroll75\"]);\n          scrollSeventyFive = false;\n      }\n\n      if (window.scrollPercent >= 100 && scrollOneHundred) {\n          window['optimizely'] = window['optimizely'] || [];\n          window.optimizely.push([\"trackEvent\", \"scroll100\"]);\n          scrollOneHundred = false;\n      }\n\n});",
            "segments": {
                "3543752571": {
                    "segment_value_type": "mobile",
                    "api_name": "optimizely_mobile",
                    "id": 3543752571,
                    "name": "Mobile Visitors"
                },
                "3539332580": {
                    "segment_value_type": "campaign",
                    "api_name": "optimizely_campaign",
                    "id": 3539332580,
                    "name": "Campaign"
                },
                "3520872541": {
                    "segment_value_type": "browser",
                    "api_name": "optimizely_browser",
                    "id": 3520872541,
                    "name": "Browser"
                },
                "3514772614": {
                    "segment_value_type": "source_type",
                    "api_name": "optimizely_source_type",
                    "id": 3514772614,
                    "name": "Source Type"
                }
            },
            "click_goals": [{
                "event_name": "email_cta_click",
                "experiments": {
                    "3766121272": true,
                    "3788190777": true,
                    "3734898026": true,
                    "3792770253": true
                },
                "selector": "#ibm-content-main > .ibm-columns > div:eq(1) > p:eq(0) > a:eq(0)"
            }, {
                "event_name": "email_cta_click_alt",
                "experiments": {
                    "3743602089": true
                },
                "selector": "#ibm-content-main > .ibm-columns > div:eq(1) > p:eq(0) > a:eq(0)"
            }, {
                "event_name": "leadspace_cta_click",
                "experiments": {
                    "3734898026": true
                },
                "selector": "#ibm-leadspace-body"
            }, {
                "event_name": "leadspace_image_click",
                "experiments": {
                    "3885370880": true,
                    "3743602089": true,
                    "3768861463": true
                },
                "selector": "#ibm-leadspace-body"
            }, {
                "event_name": "leadspace_cta_click_alt",
                "experiments": {
                    "3766121272": true,
                    "3788190777": true,
                    "3792770253": true,
                    "5289801324": true
                },
                "selector": "#ibm-leadspace-body"
            }, {
                "event_name": "leadspace_image_cta_click",
                "experiments": {
                    "3770081373": true
                },
                "selector": "#ibm-leadspace-body"
            }, {
                "event_name": "primary_email_cta_click",
                "experiments": {
                    "3770081373": true
                },
                "selector": "#ibm-content-main > .ibm-columns > div:eq(1) > p:eq(0) > a:eq(0)"
            }, {
                "event_name": "see_recruiter_cta_click",
                "experiments": {
                    "3711109989": true
                },
                "selector": "#ibm-content-main > div:eq(0) > div:eq(0) > p:eq(0) > a:eq(0),#ibm-content > div:eq(2) > div:eq(0) > div:eq(0) > div:eq(1) > div:eq(0) > p:eq(0) > a:eq(0)"
            }, {
                "event_name": "video_click",
                "experiments": {
                    "3711109989": true
                },
                "selector": "#ibm-content-main .ibm-resize,#ibm-content > div:eq(1) > div:eq(0) > div:eq(0) > div:eq(1) > a:eq(0) > img:eq(0),#ibm-tooltip-0,#ibm-tooltip-1"
            }, {
                "event_name": "recruiter_candidate_cta_click_(combined)",
                "experiments": {
                    "3711109989": true
                },
                "selector": "#ibm-content-main > div:eq(0) > div:eq(0) > p:eq(0) > a:eq(0),#ibm-content-main > div:eq(0) > div:eq(1) > p:eq(0) > a:eq(0),#ibm-content > div:eq(2) > div:eq(0) > div:eq(0) > div:eq(1) > div:eq(0) > p:eq(0) > a:eq(0),#ibm-content > div:eq(2) > div:eq(0) > div:eq(0) > div:eq(1) > div:eq(1) > p:eq(0) > a:eq(0)"
            }, {
                "event_name": "email_click",
                "experiments": {
                    "3711109989": true
                },
                "selector": ".center .btn-contact"
            }, {
                "event_name": "whitepaper_click",
                "experiments": {
                    "3711109989": true
                },
                "selector": "#ibm-content > div:eq(2) > div:eq(0) > div:eq(0) > div:eq(0) > div:eq(2) > p:eq(1) > a:eq(0),#ibm-content > div:eq(2) > div:eq(2) > div:eq(0) > div:eq(0) > div:eq(1) > p:eq(1) > a:eq(0),#ibm-content > div:eq(2) > div:eq(1) > div:eq(0) > div:eq(0) > div:eq(0) > p:eq(1) > a:eq(0)"
            }, {
                "event_name": "candidate_cta_click",
                "experiments": {
                    "3711109989": true
                },
                "selector": "#ibm-content-main > div:eq(0) > div:eq(1) > p:eq(0) > a:eq(0),#ibm-content > div:eq(2) > div:eq(0) > div:eq(0) > div:eq(1) > div:eq(1) > p:eq(0) > a:eq(0)"
            }, {
                "event_name": "contact_cta_click",
                "experiments": {
                    "3711109989": true
                },
                "selector": ".contact-band .ibm-col-1-1 > div:eq(0) > div:eq(2) > p:eq(0) > a:eq(0)"
            }, {
                "event_name": "image_clicks",
                "experiments": {
                    "4241291726": true,
                    "4038486254": true
                },
                "selector": ".ibm-no-proxy > img:eq(0)"
            }, {
                "event_name": "green_button",
                "experiments": {
                    "4241291726": true,
                    "4038486254": true
                },
                "selector": ".ibm-tabs > li:eq(1) > a:eq(0)"
            }, {
                "event_name": "secondary-cta-clk",
                "experiments": {
                    "4169565274": true
                },
                "selector": ".CTA-btn2,.CTA-btn"
            }, {
                "event_name": "player-cta-clicks_(combined)",
                "experiments": {
                    "4169565274": true
                },
                "selector": ".CTA-btn, .CTA-btn2,#ibm-content-main .ibm-resize,#ibm-content > div:eq(1) > div:eq(0) > div:eq(0) > div:eq(1) > a:eq(0) > img:eq(0)"
            }, {
                "event_name": "video_player_click",
                "experiments": {
                    "4169565274": true
                },
                "selector": "#ibm-content-main .ibm-resize,#ibm-content > div:eq(1) > div:eq(0) > div:eq(0) > div:eq(1) > a:eq(0) > img:eq(0)"
            }, {
                "event_name": "whitepaper_cta_click",
                "experiments": {
                    "4229230023": true
                },
                "selector": ".ibm-band > .ibm-center > div:eq(2) > div:eq(0) > p:eq(1) > a:eq(0), .whitepaper,#didyouknow > .ibm-center > div:eq(2) > figure:eq(0)"
            }, {
                "event_name": "ibv_study_cta_click",
                "experiments": {
                    "4229230023": true
                },
                "selector": ".ibm-band > .ibm-center > div:eq(1) > div:eq(0) > p:eq(1) > a:eq(0),.study,#didyouknow > .ibm-center > div:eq(1) > figure:eq(0)"
            }, {
                "event_name": "did_you_know_cta_clicks",
                "experiments": {
                    "4229230023": true
                },
                "selector": ".ibm-band > .ibm-center > div:eq(2) > div:eq(0) > p:eq(1) > a:eq(0),.ibm-band > .ibm-center > div:eq(0) > div:eq(0) > p:eq(1) > a:eq(0), .ibm-band > .ibm-center > div:eq(1) > div:eq(0) > p:eq(1) > a:eq(0),.study,.e-book, .whitepaper,#didyouknow > .ibm-center > div:eq(0) > figure:eq(0),#didyouknow > .ibm-center > div:eq(1) > figure:eq(0),#didyouknow > .ibm-center > div:eq(2) > figure:eq(0)"
            }, {
                "event_name": "e-book_cta_click",
                "experiments": {
                    "4229230023": true
                },
                "selector": ".ibm-band > .ibm-center > div:eq(0) > div:eq(0) > p:eq(1) > a:eq(0), a > figure,#didyouknow > .ibm-center > div:eq(0) > figure:eq(0)"
            }, {
                "event_name": "button_to_open_form",
                "experiments": {
                    "4679239220": true
                },
                "selector": ".leadspace-button"
            }, {
                "event_name": "orange_cta_click_-_try/buy_bottom",
                "experiments": {
                    "4714041648": true
                },
                "selector": "#vp1 .ibm-btn-pri"
            }, {
                "event_name": "orange_cta_click_-_try/buy",
                "experiments": {
                    "4714041648": true
                },
                "selector": "#vp .ibm-btn-pri,#vp1 .ibm-btn-pri"
            }, {
                "event_name": "orange_cta_click_-_try/buy_-_top",
                "experiments": {
                    "4714041648": true
                },
                "selector": "#vp .ibm-btn-pri"
            }, {
                "event_name": "service_request_click",
                "experiments": {
                    "4851850883": true
                },
                "selector": ".ibm-col-6-2 div.ibm-light > ul:eq(0) > li:eq(0) > a:eq(0)"
            }, {
                "event_name": "workload_automation_click",
                "experiments": {
                    "4851850883": true
                },
                "selector": "#products-and-services .myibm-dashboard__module__container > article:eq(0) > div:eq(0) > h5:eq(0) > a:eq(0)"
            }, {
                "event_name": "launch_forms_experience_build_click",
                "experiments": {
                    "4851850883": true
                },
                "selector": "#products-and-services .myibm-dashboard__module__container > article:eq(1) > aside:eq(0) > button:eq(0)"
            }, {
                "event_name": "email_ibm_click",
                "experiments": {
                    "4941101184": true
                },
                "selector": ".ibm-email-link"
            }, {
                "event_name": "downloads_tab_click",
                "experiments": {
                    "4941101184": true
                },
                "selector": ".ibm-tabs > li:eq(1) > a:eq(0)"
            }, {
                "event_name": "overview_clicks",
                "experiments": {
                    "5121070111": true,
                    "5117070381": true
                },
                "selector": ".ibm-sitenav-menu-list .ibm-highlight > a:eq(0)"
            }, {
                "event_name": "learn_clicks",
                "experiments": {
                    "5121070111": true,
                    "5117070381": true
                },
                "selector": ".ibm-sitenav-menu-list > ul > li:eq(2) > button:eq(0)"
            }, {
                "event_name": "dropdown_menu_clicks",
                "experiments": {
                    "5121070111": true,
                    "5117070381": true
                },
                "selector": ".ibm-sitenav-menu-list > ul > li:eq(1) > button:eq(0)"
            }, {
                "event_name": "leadspace_click",
                "experiments": {
                    "5393170347": true
                },
                "selector": "#ibm-leadspace-body"
            }, {
                "event_name": "email_us_clicks",
                "experiments": {
                    "5393170347": true
                },
                "selector": "#ibm-content-main > .ibm-columns > div:eq(1) > p:eq(0) > a:eq(0)"
            }, {
                "event_name": "primary_cta_click",
                "experiments": {
                    "5611330588": true
                },
                "selector": ".ibm-background-green-30"
            }, {
                "event_name": "primary_cta_-_leadspace",
                "url_conditions": {
                    "values": [{
                        "match": "simple",
                        "value": "http://www.ibm.com/commerce/us-en/"
                    }, {
                        "match": "simple",
                        "value": "http://www.ibm.com/analytics/watson-analytics/us-en/"
                    }]
                },
                "selector": ".ibm-background-green-30,.ibm-tabs .registerlink"
            }, {
                "event_name": "dummy_email_cta_click",
                "experiments": {
                    "5682420834": true
                },
                "selector": "#ibm-content-main > .ibm-columns > div:eq(1) > p:eq(0) > strong:eq(0)"
            }, {
                "event_name": "secondary_cta",
                "experiments": {
                    "6050130174": true
                },
                "selector": "#ibm-leadspace-body > .ibm-btn-row > a:eq(1)"
            }]
        };

        function g(a) {
            throw a;
        }
        var i = void 0,
            j = !0,
            k = null,
            o = !1;

        function aa() {
            return function(a) {
                return a
            }
        }

        function ca(a) {
            var b = typeof a;
            return "object" == b && a != k || "function" == b
        }

        function da(a, b, c) {
            return a.call.apply(a.bind, arguments)
        }

        function ea(a, b, c) {
            a || g(Error());
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        }

        function p(a, b, c) {
            p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? da : ea;
            return p.apply(k, arguments)
        }

        function t(a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function() {
                var b = Array.prototype.slice.call(arguments);
                b.unshift.apply(b, c);
                return a.apply(this, b)
            }
        };

        function u(a) {
            try {
                return window.JSON.stringify(a)
            } catch (b) {
                g(Error("JSON: Unable to stringify (" + b.message + ")"))
            }
        }

        function fa(a) {
            try {
                return window.JSON.parse(a)
            } catch (b) {
                g(Error("JSON: Unable to parse (" + b.message + ")"))
            }
        };
        var ha = /\s*;\s*/,
            ja = /^([^=]+)=?(.*)$/;

        function v(a) {
            var b = [];
            w(ka(), function(c) {
                a === c.name && b.push(la(c.value))
            });
            if (0 === b.length) return k;
            1 < b.length && x("Cookie", "Values found for %s: %s", a, b.length);
            return b.pop()
        }
        var ma = o;

        function ka() {
            var a, b = [];
            a = a || "";
            w((document.cookie || "").split(ha), function(c) {
                var d = c.match(ja);
                d && 0 === d[1].indexOf(a) && b.push({
                    name: d[1],
                    value: d[2],
                    P: c
                })
            });
            return b
        }

        function y(a, b, c) {
            if (ma) x("Cookie", "Already initialized.");
            else {
                x("Cookie", "Initializing.");
                var d = document.location.hostname;
                if (na()) {
                    oa = d;
                    for (var d = document.location.hostname.split("."), e = [], f = d.length - 1; 0 <= f; --f) {
                        var h = d.slice(f).join("."),
                            l = "optimizelyDomainTest-" + Math.random().toString(16).replace("0.", ""),
                            n = Math.random().toString(16).replace("0.", "");
                        qa(l, n, h, 3);
                        v(l) === n && e.push(h)
                    }
                    ra = e;
                    0 < ra.length ? (oa = ra[0], x("Cookie", "Highest level domain: %s", oa)) : (x("Cookie", "Disabling event tracking because cookies could not be set"),
                        z = o)
                } else e = d.split("."), f = d, h = e[e.length - 1], 2 < e.length && "appspot" === e[e.length - 2] && "com" === h ? f = e[e.length - 3] + ".appspot.com" : 1 < e.length && ua(h, va) && (f = e[e.length - 2] + "." + h), wa = f, x("Cookie", "Guessed public suffix: %s", wa), xa = ya(d), x("Cookie", "Public suffix (from data): %s", xa);
                za && x("Cookie", "Domain specified by API: %s", za);
                ma = j;
                x("Cookie", "Done initializing.")
            }
            b = b || "";
            na() ? (w(ra, function(b) {
                Aa(a, b)
            }), d = Ba(), qa(a, b, d, c), c = v(a) === b ? "Succeeded" : "Failed", x("Cookie", "%s setting %s=%s on %s", c, a, b, d)) : (d =
                Ba(), e = document.location.hostname, !xa && B("remote_public_suffix") && Ca.push({
                    xb: c,
                    name: a,
                    value: b
                }), d && (d === xa && d !== wa) && (Aa(a, e), Aa(a, wa)), qa(a, b, d, c), f = v(a), f === b) ? x("Cookie", "Successfully set %s=%s on %s", a, b, d) : (x("Cookie", "Setting %s on %s apparently failed (%s != %s)", a, d, f, b), x("Cookie", "Setting %s on %s", a, e), qa(a, b, e, c), f = v(a), f === b ? (x("Cookie", "Setting %s on %s worked; saving as new public suffix", a, e), wa = e) : (x("Cookie", "Could not set cookie %s, disabling event tracking.", a), z = o))
        }

        function Aa(a, b) {
            var c = [a, "=", "; ", Da(b), "; path=/", "; expires=", (new Date(0)).toUTCString()];
            document.cookie = c.join("")
        }

        function Ba() {
            return na() ? za || oa : za || xa || wa
        }

        function Da(a) {
            var b = [];
            b.push("domain=");
            "localhost" !== a && (b.push("."), b.push(a));
            return b.join("")
        }

        function qa(a, b, c, d) {
            a = [a, "=", encodeURIComponent(b), "; ", Da(c), "; path=/"];
            d && a.push("; expires=", (new Date(+new Date + 1E3 * d)).toUTCString());
            document.cookie = a.join("")
        }

        function Ea(a) {
            Ba() !== a && (za = String(a) || "", x("Cookie", "Api public suffix set to: %s", za))
        }
        var wa = "",
            za = "",
            oa = "",
            ra = [],
            xa = "",
            Ca = [];
        var Fa = window.OPTIMIZELY_TEST_MODULE,
            va = "com local net org xxx edu es gov biz info fr nl ca de kr it me ly tv mx cn jp il in iq test".split(" "),
            Ga = /\/\*\s*_optimizely_variation_url( +include="([^"]*)")?( +exclude="([^"]*)")?( +match_type="([^"]*)")?( +include_match_types="([^"]*)")?( +exclude_match_types="([^"]*)")?( +id="([^"]*)")?\s*\*\//;
        var Ha, Ia = 0,
            Ja = o,
            C = j,
            Ka = o,
            La = o,
            Ma = o,
            Na = "",
            Oa = o,
            Pa = o,
            Qa = o,
            Ra = o,
            Sa = o,
            Ta = o,
            z = j,
            Ua = 31536E4;

        function Va() {
            var a = v("optimizelyEndUserId");
            a || (a = "oeu" + +new Date + "r" + Math.random(), y("optimizelyEndUserId", a, Ua));
            return a
        }

        function Wa() {
            return v("optimizelyPPID")
        };

        function Xa(a, b) {
            var c = j;
            w(a, function(a) {
                if (!b(a)) return c = o
            });
            return c
        }

        function D(a, b) {
            var c = o;
            w(a, function(a) {
                if (b(a)) return c = j
            });
            return c
        }

        function E(a, b) {
            for (var c = 0; c < a.length; c++)
                if (b == a[c]) return j;
            return o
        }

        function Ya(a, b) {
            var c = Za(arguments, 1);
            return function() {
                var b = Za(arguments);
                b.unshift.apply(b, c);
                return a.apply(this, b)
            }
        }

        function w(a, b) {
            var c = k;
            if (G(a))
                for (var d = a.length, e = 0; e < d && !(c = b.call(i, a[e], e), H(c)); ++e);
            else
                for (d in a)
                    if (Object.prototype.hasOwnProperty.call(a, d) && (c = b.call(i, d, a[d]), H(c))) break; return c
        }

        function I(a, b) {
            if ("function" === typeof a.map) return a.map(b);
            for (var c = [], d = 0; d < a.length; d++) c.push(b(a[d], d));
            return c
        }

        function J(a, b) {
            w(b, function(b, d) {
                a[b] = d
            });
            return a
        }

        function $a(a, b) {
            if (G(b)) {
                for (var c = a, d = 0; d < b.length; d++) {
                    var e = b[d];
                    if (!ca(c) || !c.hasOwnProperty(e)) return;
                    c = c[e]
                }
                return c
            }
        }

        function K(a, b) {
            for (var c = [], d = 0, e = a.length; d < e; d++) {
                var f = a[d];
                b(f) && c.push(f)
            }
            return c
        }

        function ua(a, b) {
            return w(b, function(b) {
                if (b === a) return j
            }) || o
        }

        function G(a) {
            return !!a && "object" === typeof a && "number" === typeof a.length
        }

        function H(a) {
            return "undefined" !== typeof a
        }

        function ab(a) {
            return "object" === typeof a && a !== k
        }

        function bb(a) {
            return ("number" === typeof a || "string" === typeof a) && Number(a) == a
        }

        function cb(a) {
            return "string" === typeof a
        }

        function L(a) {
            L = Object.yb || function(a) {
                var c = [];
                w(a, function(a) {
                    c.push(a)
                });
                return c
            };
            return L.call(k, a)
        }

        function db(a, b) {
            function c() {
                var b = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
                    c = document.createElement("script");
                c.src = a;
                c.type = "text/javascript";
                b.appendChild(c)
            }
            if (b) try {
                if ("loading" === document.readyState) {
                    var d = "optimizely_synchronous_script_" + Math.floor(1E5 * Math.random()); - 1 !== a.indexOf('"') ? M("loadScript", "Blocked attempt to load unsafe script: " + a) : (document.write('<script id="' + d + '" src="' + a + '"><\/script>'), 1 !== $("#" + d).length && g(Error("Document.write failed to append script")))
                } else g(Error("Not safe to attempt document.write"))
            } catch (e) {
                try {
                    var f =
                        new XMLHttpRequest;
                    f.open("GET", a, o);
                    f.onload = function() {
                        eval(f.responseText)
                    };
                    f.onerror = function() {
                        g(Error())
                    };
                    f.send()
                } catch (h) {
                    x("Common", "Failed to load %s synchronously", a), c()
                }
            } else c()
        }

        function x(a, b, c) {
            var d = window.console;
            if (Qa && d && d.log) {
                var e = Za(arguments, 1);
                e[0] = "Optimizely / " + a + " / " + b;
                Function.prototype.apply.call(d.log, d, e)
            }
        }

        function la(a) {
            try {
                return decodeURIComponent(a)
            } catch (b) {
                return a
            }
        }

        function Za(a, b) {
            return Array.prototype.slice.call(a, b || 0, a.length)
        }

        function eb(a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        };

        function fb(a) {
            this.r = a;
            this.c = {
                totalGets: 0,
                totalGetLength: 0,
                totalGetTime: 0,
                totalSets: 0,
                totalSetLength: 0,
                totalSetTime: 0,
                numKeys: 0,
                totalSize: 0
            }
        }
        fb.prototype.get = function(a) {
            try {
                var b = +new Date,
                    c = this.r.getItem([gb, a].join("$$")),
                    d = fa(c);
                this.c.totalGetTime += +new Date - b;
                this.c.totalGets++;
                this.c.totalGetLength += (c || "").length;
                return d
            } catch (e) {
                return k
            }
        };
        fb.prototype.set = function(a, b) {
            try {
                var c = +new Date,
                    d = u(b);
                H(b) ? this.r.setItem([gb, a].join("$$"), d) : this.r.removeItem([gb, a].join("$$"));
                this.c.totalSetTime += +new Date - c;
                this.c.totalSets++;
                this.c.totalSetLength += d.length
            } catch (e) {}
        };
        fb.prototype.ua = function() {
            var a = 0,
                b = 0,
                c;
            for (c in this.r)
                if (0 === c.indexOf(gb)) {
                    b++;
                    var d = this.r.getItem(c),
                        a = a + (c.length + (d ? d.length : 0))
                }
            this.c.numKeys = b;
            this.c.totalSize = a;
            return this.c
        };
        var hb = {
                get: function() {},
                set: function() {},
                ua: function() {
                    return {}
                }
            },
            gb = "optimizely_data",
            N = hb,
            ib = hb;
        try {
            var N = new fb(window.localStorage),
                ib = new fb(window.sessionStorage),
                jb = N,
                kb = jb.r.getItem(gb),
                lb = {};
            try {
                lb = fa(kb) || {}
            } catch (mb) {}
            if (0 !== L(lb).length) {
                var nb = Wa() || v("optimizelyEndUserId"),
                    ob = lb[nb] || {},
                    pb;
                for (pb in ob)
                    if (ob.hasOwnProperty(pb)) {
                        var qb = [nb, pb].join("$$");
                        jb.get(qb) === k && jb.set(qb, ob[pb])
                    }
                delete lb[nb];
                for (pb in lb) lb.hasOwnProperty(pb) && (jb.get(pb) === k && jb.set(pb, lb[pb]), delete lb[pb]);
                try {
                    kb = u(lb)
                } catch (rb) {
                    kb = {}
                }
                jb.r.setItem(gb, kb)
            }
        } catch (sb) {};

        function tb() {
            return B("admin_account_id")
        }

        function ub(a) {
            return B("audiences", a)
        }

        function vb(a) {
            a = B("audiences", a, "segment_id");
            return !a ? k : a
        }

        function wb() {
            if (!xb) {
                var a = B("click_goals") || [];
                xb = [];
                for (var b = 0, c = a.length; b < c; b++)
                    for (var d = a[b], e = d.selector.split(","), f = 0, h = e.length; f < h; f++) {
                        var l = e[f];
                        l && (l = {
                            event_name: d.event_name,
                            selector: l
                        }, "experiments" in d ? l.experiments = d.experiments : "url_conditions" in d && (l.url_conditions = d.url_conditions), "revenue" in d && (l.revenue = d.revenue), xb.push(l))
                    }
            }
            return xb
        }

        function yb(a, b) {
            return B("dimensions", a, b)
        }

        function zb(a) {
            a = yb(a, "condition_type");
            return !a ? k : a
        }

        function Ab(a) {
            a = yb(a, "name");
            return !a ? k : a
        }

        function Cb() {
            Db || (Db = K(Eb(), Fb));
            return Db
        }

        function Gb(a) {
            var b = B("goal_expressions"),
                c = [],
                d;
            for (d in b)
                if (b.hasOwnProperty(d))
                    for (var e = b[d], f = 0; f < e.length; f++) try {
                        if (RegExp(e[f], "i").test(a)) {
                            c.push(d);
                            break
                        }
                    } catch (h) {}
                return c
        }

        function Hb(a) {
            var b = Ib(),
                c;
            for (c in b)
                if (Object.prototype.hasOwnProperty.call(b, c)) {
                    var d = b[c];
                    if (d && d.api_name === a) return String(c)
                }
            return k
        }

        function Jb() {
            return B("experiments") || {}
        }

        function Eb() {
            return L(B("experiments") || {})
        }

        function Kb(a) {
            return "manual" === O(a, "activation_mode")
        }

        function Lb(a) {
            return "conditional" === O(a, "activation_mode")
        }

        function Mb(a) {
            return O(a, "name") || "Exp " + a
        }

        function P(a) {
            return 'experiment "' + Mb(a) + '" (' + a + ")"
        }

        function Nb(a) {
            return O(a, "section_ids") || []
        }

        function Ob(a) {
            return O(a, "variation_ids") || []
        }

        function Pb() {
            return B("list_targeted_keys") || {}
        }

        function Qb() {
            return B("project_id")
        }

        function Ib() {
            return B("segments") || {}
        }

        function Rb(a, b) {
            for (var c = Nb(a), d = 0; d < c.length; d++) {
                var e = Sb(c[d]);
                if (E(e, b)) return c[d]
            }
            return ""
        }

        function ya(a) {
            var b = {},
                c = B("public_suffixes") || {};
            w(c, function(a, c) {
                w(c, function(c) {
                    b[c] = a
                })
            });
            ya = function(a) {
                return b[a] || ""
            };
            return ya.call(k, a)
        }

        function Sb(a) {
            return B("sections", a, "variation_ids") || []
        }

        function Tb(a) {
            var b = [];
            w(a.split("_"), function(a) {
                (a = B("variations", a, "code")) && b.push(a)
            });
            return b.join("\n")
        }

        function Q(a) {
            if (!Ub) {
                var b = {};
                w(Eb(), function(a) {
                    w(Nb(a), function(d) {
                        w(Sb(d), function(d) {
                            b[d] = a
                        })
                    });
                    w(Ob(a), function(d) {
                        b[d] = a
                    })
                });
                Ub = b
            }
            return Ub[a.split("_")[0]] || ""
        }

        function Vb(a) {
            var b = Q(a),
                c = Nb(b);
            if (0 === c.length) {
                c = Ob(b);
                for (b = 0; b < c.length; b++)
                    if (c[b] === a) return b
            } else {
                for (var a = a.split("_"), b = [], d = 0; d < c.length; d++)
                    for (var e = Sb(c[d]), f = 0; f < e.length; f++) e[f] === a[d] && b.push(f);
                if (b !== []) return b
            }
            return -1
        }

        function Wb(a) {
            var b;
            return Xb(a).join(b || ", ")
        }

        function Xb(a) {
            var b = [];
            w(a.split("_"), function(a) {
                b.push(B("variations", a, "name") || "Var " + a)
            });
            return b
        }

        function Yb() {
            return B("www_host")
        }

        function Fb(a) {
            return !!O(a, "enabled")
        }

        function na() {
            return !!B("simple_cookies")
        }

        function O(a, b) {
            return B("experiments", a, b)
        }

        function Zb(a) {
            a = O(a, "comscore");
            return H(a) ? a.url : k
        }

        function $b(a) {
            return O(a, "google_analytics")
        }

        function ac(a, b) {
            var c = O(a, "universal_analytics");
            return H(c) ? c[b] : k
        }

        function bc(a, b) {
            var c = O(a, "at_internet");
            return H(c) ? c[b] : k
        }

        function B(a) {
            var b = DATA;
            if (w(arguments, function(a) {
                    a = b[a];
                    if (H(a)) b = a;
                    else return k
                }) !== k) return b
        }

        function cc(a, b) {
            return B("segments", a, b)
        }

        function dc() {
            var a = B("rum_sampling_rate");
            return H(a) ? a : 0.001
        }
        var xb = k,
            Db = k,
            Ub = k;

        function ec(a, b) {
            function c(a, b) {
                var c = b & 65535;
                return ((b - c) * a | 0) + (c * a | 0) | 0
            }
            for (var d = a.length, e = b || 0, f = d & -4, h, l = 0; l < f; l += 4) h = a.charCodeAt(l) & 255 | (a.charCodeAt(l + 1) & 255) << 8 | (a.charCodeAt(l + 2) & 255) << 16 | (a.charCodeAt(l + 3) & 255) << 24, h = c(h, 3432918353), h = (h & 131071) << 15 | h >>> 17, h = c(h, 461845907), e ^= h, e = (e & 524287) << 13 | e >>> 19, e = 5 * e + 3864292196 | 0;
            h = 0;
            switch (d % 4) {
                case 3:
                    h = (a.charCodeAt(f + 2) & 255) << 16;
                case 2:
                    h |= (a.charCodeAt(f + 1) & 255) << 8;
                case 1:
                    h |= a.charCodeAt(f) & 255, h = c(h, 3432918353), e ^= c((h & 131071) << 15 | h >>> 17, 461845907)
            }
            e ^=
                d;
            e = c(e ^ e >>> 16, 2246822507);
            e = c(e ^ e >>> 13, 3266489909);
            return e ^ e >>> 16
        };
        var fc = Math.pow(2, 32);

        function gc(a, b) {
            var c = ec(a, b);
            return (c >>> 16).toString(16) + (c & 65535).toString(16)
        };

        function hc() {
            return ic = ic || jc()
        }

        function kc() {
            return hc().aa
        }

        function lc() {
            return hc().ba
        }

        function mc() {
            return hc().F
        }

        function nc(a) {
            if (!a) return "";
            try {
                return a.match(/:\/\/(?:www[0-9]?\.)?(.[^/:]+)/)[1]
            } catch (b) {
                return ""
            }
        }

        function oc() {
            return hc().platform
        }

        function pc(a) {
            return N.get([Wa() || Va(), a].join("$$"))
        }

        function qc(a) {
            N.set([Wa() || Va(), "asyncInfo"].join("$$"), a)
        }

        function rc() {
            var a = "android;blackberry;ipad;iphone;ipod;windows phone".split(";");
            return E(a, mc().id) ? mc().id : E(a, oc().id) ? oc().id : sc() ? "mobile" : "unknown"
        }

        function sc() {
            return mc().w
        }

        function tc() {
            return uc ? "returning" : "new"
        }
        oc = function() {
            return hc().platform
        };

        function vc(a) {
            x("User", "Setting current URL to %s", a);
            wc = a
        }
        var wc = i,
            ic = i,
            uc = i;

        function M(a, b, c) {
            xc.push({
                Da: new Date,
                Ba: a,
                message: b,
                sa: c || o
            });
            yc && zc()
        }

        function Bc() {
            Qa = j
        }

        function Cc() {
            Ra = Qa = j
        }

        function zc() {
            Qa && (w(xc, function(a) {
                if (!a.ab && (!a.sa || a.sa === Ra)) {
                    var b = +a.Da;
                    x(a.Ba, a.message + (" [time " + (Dc ? b - Dc : 0) + " +" + (Ec ? b - Ec : 0) + "]"));
                    Ec = b;
                    Dc || (Dc = b);
                    a.ab = j
                }
            }), yc = j)
        }
        var Ec = k,
            Dc = k,
            xc = [],
            yc = o;
        var R = {};

        function Fc(a, b) {
            R[a] = b
        }

        function Gc(a, b) {
            var c = pc("asyncInfo") || {};
            c[a] = b;
            qc(c)
        }

        function Hc() {
            var a = (R.odds || k) && (R.odds || k).ip || (R.cdn3 || k) && (R.cdn3 || k).ip;
            return a ? Ic(a) : k
        }

        function Jc() {
            return !R.odds ? k : (R.odds || k).lists || {}
        }

        function Kc(a) {
            if (!Jc()) return M("Async Info", "Invalid response from ODDS"), {
                value: i,
                M: o
            };
            if (!Jc().hasOwnProperty(a)) return M("Async Info", "Deduced cachetime value that was checked for presence in list: " + a), {
                value: i,
                M: j
            };
            var b = !R.odds ? k : (R.odds || k).lists_metadata || {};
            if (!b || !b[a] || !b[a][0]) return M("Async Info", "Can't find cachetime value that was checked for presence in list: " + a), {
                value: i,
                M: o
            };
            M("Async Info", "Found cachetime value that was checked for presence in list: " + a);
            return {
                value: b[a][0].value,
                M: j
            }
        }

        function Lc(a) {
            var b = Pb()[a],
                c = H(b) && Mc(b);
            if (c) {
                var d = Nc(b);
                if (d === k) return M("Async Info", "Deduced membership status (false) for list: " + a), o;
                M("Async Info", "Found current value to check for presence in list: " + a)
            }
            b = Jc();
            if (!b) return M("Async Info", "No list membership info."), k;
            if (c && (c = Kc(a), c.M && c.value !== d)) return M("Async Info", "Ignoring out-of-date membership status for list: " + a), k;
            d = !!b[a];
            M("Async Info", "Found membership status (" + d + ") for list: " + a);
            return d
        }

        function Oc() {
            if (!R.cdn3) return k;
            var a = (R.cdn3 || k).location || {};
            return {
                continent: Ic(a.continent),
                country: Ic(a.country),
                region: Ic(a.region),
                city: Ic(a.city)
            }
        }
        var Pc = {
            get: function() {
                return R.dcps || k
            },
            set: function(a) {
                Gc("dcps", a);
                R.dcps = a
            }
        };

        function Qc() {
            var a = Pc.get();
            return !a || a.rulesResults === k ? k : a.rulesResults || {}
        }

        function Ic(a) {
            return "string" !== typeof a || "N/A" === a.toUpperCase() ? k : a.toUpperCase()
        };

        function Rc(a) {
            a = a || {};
            if (z) {
                a && a.sVariable && (Sc = a.sVariable);
                var b = Sc || ("undefined" !== typeof window.s ? window.s : k);
                if (b)
                    if (Tc) {
                        a = Uc;
                        if (a !== k && b) try {
                            x("Integrator", "Fixing SiteCatalyst referrer to %s", a), b.referrer = String(a)
                        } catch (c) {
                            x("Integrator", "Error setting SiteCatalyst referrer: %s", c)
                        }
                        x("Integrator", "Tracking with SiteCatalyst");
                        w(Vc(), function(a) {
                            var c = Q(a),
                                a = S(c, a, 100, 100, 25, j),
                                f = a.key + ": " + a.value,
                                a = [],
                                h = O(c, "site_catalyst_evar") || k,
                                c = O(c, "site_catalyst_prop") || k;
                            h !== k && a.push("eVar" + h);
                            c !== k && a.push("prop" + c);
                            w(a, function(a) {
                                x("Integrator", "Setting SiteCatalyst %s='%s'", a, f);
                                b[a] = f
                            })
                        })
                    } else Wc = j;
                else M("Integrator", "Error with SiteCatalyst integration: 's' variable not defined")
            }
        }

        function Xc(a) {
            a = bb(a) ? Number(a) : -1;
            if (-1 !== [1, 2, 3].indexOf(a)) Yc = a;
            else return Yc
        }

        function Zc() {
            if (z) {
                var a = Uc;
                if (a !== k) try {
                    x("Integrator", "Fixing _gaq._setReferrerOverride with %s", a), _gaq.push(["_setReferrerOverride", a])
                } catch (b) {
                    x("Integrator", "Error setting Google Analytics referrer: %s", b)
                }
                var c = [];
                w(Vc(), function(a) {
                    var b = Q(a);
                    if (O(b, "chartbeat")) {
                        var d = $c;
                        $c = "";
                        var e = S(b, a, 10, 10, 5, o);
                        $c = d;
                        d = Vb(a);
                        ad = e.key + ": " + String(d);
                        try {
                            x("Integrator", "Calling _cbq.push"), _cbq.push(["_optlyx", ad])
                        } catch (m) {
                            M("Integrator", "Error sending Chartbeat data for " + P(b))
                        }
                    }
                    if (Zb(b)) {
                        var e = Zb(b),
                            d = S(b, a, 100, 100, 25, j),
                            r = e + (-1 !== e.indexOf("?") ? "&" : "?") + "optimizely_experiment_id=" + b + "&optimizely_experiment_name=" + encodeURIComponent(d.key) + "&optimizely_variation_id=" + a + "&optimizely_variation_name=" + encodeURIComponent(d.value) + "&ns_m_exp=(" + b + ") " + encodeURIComponent(d.key) + "&ns_m_chs=(" + a + ") " + encodeURIComponent(d.value) + "&type=hidden";
                        try {
                            $(window).load(function() {
                                M("Integrator", "Sending comScore log call");
                                bd(r, k)
                            })
                        } catch (q) {
                            M("Integrator", "Error sending comScore data for " + P(b))
                        }
                    }
                    if (O(b, "crazyegg")) {
                        e =
                            S(b, a, 100, 100, 15, o);
                        try {
                            x("Integrator", "Defining CE_SNAPSHOT_NAME"), window.CE_SNAPSHOT_NAME = e.key + ": " + e.value
                        } catch (F) {
                            M("Integrator", "Error sending CrazyEgg data for " + P(b))
                        }
                    }
                    if ($b(b)) {
                        e = $b(b);
                        d = 0;
                        H(e) && (d = e.slot || d);
                        var e = d,
                            d = $b(b),
                            A = "";
                        H(d) && (A = d.tracker || A);
                        d = A;
                        A = S(b, a, 28, 24, 5, j);
                        try {
                            var ba = "";
                            "" !== d && (ba = d + ".");
                            x("Integrator", "Calling _gaq._setCustomVar for slot %d and scope %d", e, Yc);
                            _gaq.push([ba + "_setCustomVar", e, A.key, A.value, Yc])
                        } catch (pa) {
                            M("Integrator", "Error sending Google Analytics data for " +
                                P(b))
                        }
                    }
                    if (O(b, "inspectlet")) {
                        e = $c;
                        $c = "";
                        d = S(b, a, 100, 100, 25, o);
                        $c = e;
                        try {
                            M("Integrator", "Calling __insp.push for sending data to Inspectlet"), window.__insp = window.__insp || [], window.__insp.push(["tagSession", {
                                "Optimizely Experiment Name": d.key,
                                "Optimizely Variation Name": d.value,
                                "Optimizely Experiment ID": b,
                                "Optimizely Variation ID": a
                            }])
                        } catch (xe) {
                            M("Integrator", "Error sending Inspectlet data for " + P(b))
                        }
                    }
                    if (B("kissmetrics")) {
                        e = S(b, a, 100, 100, 15, j);
                        d = {};
                        d[e.key] = e.value;
                        try {
                            x("Integrator", "Calling _kmq.set"),
                                _kmq.push(["set", d])
                        } catch (Eh) {
                            M("Integrator", "Error sending KISSmetrics data for " + P(b))
                        }
                    }
                    if (O(b, "mixpanel")) {
                        e = S(b, a, 100, 100, 15, o);
                        d = {};
                        d[e.key] = e.value;
                        try {
                            x("Integrator", "Calling mixpanel.push"), mixpanel.push(["register", d])
                        } catch (Fh) {
                            M("Integrator", "Error sending Mixpanel data for " + P(b))
                        }
                    }
                    if (O(b, "moat")) {
                        e = S(b, a, 100, 100, 15, o);
                        e = e.key + ": " + e.value;
                        try {
                            x("Integrator", "Calling optimizelyMoat.push"), optimizelyMoat.push(e)
                        } catch (Gh) {
                            M("Integrator", "Error sending Moat data for " + P(b))
                        }
                    }
                    O(b, "sessioncam") &&
                        (c = c.concat(cd(b, a)));
                    if (bc(b, "acct_no")) {
                        e = bc(b, "acct_no");
                        d = bc(b, "url");
                        A = S(b, a, 28, 24, 5, j);
                        a = d + "/hit.xiti?s=" + e + "&abmvc=" + (b + "[" + encodeURIComponent(A.key) + "]-0-" + a + "[" + encodeURIComponent(A.value) + "]") + "&type=mvt&rn=" + (new Date).getTime();
                        try {
                            x("Integrator", "Sending AT Internet log call for account %s", e), bd(a, k)
                        } catch (Hh) {
                            M("Integrator", "Error sending AT Internet data for " + P(b))
                        }
                    }
                });
                if (0 < c.length) {
                    a = c;
                    try {
                        M("Integrator", "Calling sessioncamConfiguration object"), window.sessioncamConfiguration = window.sessioncamConfiguration || {}, window.sessioncamConfiguration.customDataObjects = window.sessioncamConfiguration.customDataObjects || [], window.sessioncamConfiguration.customDataObjects = window.sessioncamConfiguration.customDataObjects.concat(a)
                    } catch (d) {
                        M("Integrator", "Error sending sessioncam data " + a)
                    }
                }
                a = v("optimizelyChartbeat") || "";
                try {
                    if (a && ad != a && (x("Integrator", "Calling _cbq.push for referral"), _cbq.push(["_optlyr", a])), ad != a) x("Integrator", "Set new Chartbeat referral cookie."), y("optimizelyChartbeat", ad)
                } catch (e) {
                    M("Integrator",
                        "Error sending Chartbeat referral for " + a)
                }
                Tc = j;
                dd && (ed(), dd = o);
                Wc && (Rc(), Wc = o)
            }
        }

        function fd() {
            if (window.ClickTaleContext) {
                try {
                    window.ClickTaleContext.getAggregationContextAsync("1", function(a) {
                        a.Location && window.optimizely.push(["overrideUrl", a.Location]);
                        for (var b in a.PageEvents) {
                            var e = a.PageEvents[b][2].match(/x[0-9]+=[0-9_]+/g);
                            x("Integrator", "Playback ClickTale Integration - %s", e);
                            for (b = 0; b < e.length; b++) {
                                x("Integrator", "Playback ClickTale Integration - %s", e[b]);
                                for (var f = e[b].split("=")[0].substr(1), h = e[b].split("=")[1].split("_"), l = 0; l < h.length; l++) gd(h[l]) ? x("Integrator",
                                    "Skip activation for redirect.") : window.optimizely.push(["activate", f, h[l], {
                                    force: j
                                }])
                            }
                        }
                    })
                } catch (a) {
                    x("Integrator", "Playback ClickTale Aggregation Integration failed.")
                }
                try {
                    window.ClickTaleContext.getRecordingContextAsync("1.1", function(a) {
                        if (a.inSingleRecordingScope) {
                            a.location && window.optimizely.push(["overrideUrl", a.location]);
                            x("Integrator", "Playback ClickTale getRecordingContextAsync callback");
                            for (var b in a.fields) x("Integrator", "Playback ClickTale Integration - %s=%s", b, a.fields[b]), gd(a.fields[b]) ?
                                x("Integrator", "Skip activation for redirect.") : window.optimizely.push(["activate", b, a.fields[b], {
                                    force: j
                                }])
                        }
                    })
                } catch (b) {
                    x("Integrator", "Playback ClickTale Recording Integration failed.")
                }
            } else x("Integrator", "ClickTaleContext not defined.")
        }

        function hd() {
            x("Integrator", "Tracking with ClickTale.");
            "function" == typeof window.ClickTaleField ? w(Vc(), function(a) {
                var b = Q(a),
                    c = S(b, a, 100, 100, 15, o),
                    c = c.key + ": " + c.value + " (x" + b + "=" + a + ")";
                x("Integrator", "Setting ClickTale - %s", c);
                window.ClickTaleField(b, a);
                window.ClickTaleEvent(c)
            }) : x("Integrator", "ClickTaleField() not defined.")
        }

        function id(a) {
            $c = a
        }

        function jd(a) {
            Sc = a
        }

        function kd(a, b) {
            return a.replace(/[^a-zA-Z0-9\.\~\!\*\(\)\']+/g, "_").substring(0, b)
        }

        function Vc() {
            var a = ld.concat(T),
                b = [];
            w(md(), function(c) {
                var e = Q(c),
                    f = o;
                if (Fb(e)) {
                    var h = Wb(c);
                    E(a, e) && (x("Integrator", '"%s" relevant because experiment active', h), f = j);
                    f && b.push(c)
                }
            });
            var c = nd;
            c && b.push(c);
            return b
        }

        function gd(a) {
            if (a = Tb(a))
                if (a = od(a.toString())) return a[1];
            return k
        }

        function ed() {
            if (z)
                if (Tc) {
                    var a = window[window.GoogleAnalyticsObject || "ga"];
                    if (a) {
                        var b = Uc;
                        if (b !== k) try {
                            x("Integrator", "Fixing Universal Analytics set referrer with %s", b), (0, window[window.GoogleAnalyticsObject || "ga"])("set", "referrer", b)
                        } catch (c) {
                            x("Integrator", "Error setting Universal Analytics referrer: %s", c)
                        }
                        x("Integrator", "Tracking with Universal Analytics");
                        w(Vc(), function(b) {
                            var c = Q(b);
                            if (ac(c, "slot")) {
                                var f = ac(c, "slot"),
                                    h = ac(c, "tracker"),
                                    l = S(c, b, 100, 100, 25, j),
                                    b = l.key + " (" + c + "): " + l.value;
                                150 < b.length && (b = l.key.substring(0, 80) + " (" + c + "): " + l.value, b = b.substring(0, 149));
                                c = h ? h + "." : "";
                                x("Integrator", "Calling ua set dimension - ga(%sset, dimension%d, %s)", c, f, b);
                                a(c + "set", "dimension" + f, b)
                            }
                        })
                    } else M("Integrator", "Error with Universal Analytics integration: 'GoogleAnalyticsObject' not defined")
                } else dd = j
        }

        function cd(a, b) {
            M("Integrator", "Preparing to send data to Sessioncam");
            return [S(a, b, 100, 100, 15, o), {
                key: "Optimizely Exp " + a,
                value: "Optimizely Var " + b
            }]
        }

        function S(a, b, c, d, e, f) {
            a = $c + Mb(a);
            b = Xb(b);
            1 < b.length ? (b = $.map(b, function(a) {
                return a.substr(0, e - 1)
            }), b = b.join("~")) : b = b[0];
            f ? (a = kd(a, c), b = kd(b.replace("#", ""), d)) : (a = a.substring(0, c), b = b.substring(0, d));
            return {
                key: a,
                value: b
            }
        }

        function pd(a, b, c) {
            try {
                var d = N.get(qd) || {},
                    e = d[a],
                    f;
                if (c && e) {
                    var c = {},
                        h;
                    if (e)
                        for (h in e) e.hasOwnProperty(h) && (c[h] = e[h]);
                    if (b)
                        for (h in b)
                            if (b.hasOwnProperty(h)) {
                                var e = c,
                                    l = h,
                                    n;
                                if (c[h]) {
                                    var m = c[h],
                                        r = b[h];
                                    G(m) || (m = [m]);
                                    G(r) || (r = [r]);
                                    for (var q = [].concat(m), F = i, F = 0; F < r.length; F++) ua(r[F], q) || q.push(r[F]);
                                    n = q
                                } else n = b[h];
                                e[l] = n
                            }
                    f = c
                } else f = b;
                d[a] = f;
                N.set(qd, d)
            } catch (A) {}
        }
        var dd = o,
            Wc = o,
            ad = "",
            Yc = 2,
            Tc = o,
            $c = "Optimizely ",
            Sc = k,
            qd = "thirdParty";

        function rd(a, b, c, d) {
            if (!C) return o;
            var e = "number" === typeof c || "string" === typeof c ? String(c) : k,
                f = !!(c === j || c && c.force === j || d && d.force === j),
                d = ("object" === typeof c ? c : d) || {},
                c = d.skip === j,
                h = d.skipPageview === j,
                d = d.enabledStatus;
            if (e) try {
                sd(b, e, j)
            } catch (l) {
                M("Activator", "Error while activating experiment " + b + " for variation " + e + " -- proceeding without bucketing user.")
            }
            var n = [];
            bb(b) ? n.push(b) : w(Eb(), function(a) {
                Kb(a) && n.push(a)
            });
            td(a, n, {
                Fa: f,
                bb: j,
                Ea: d,
                hb: c,
                ya: h
            })
        }

        function ud(a, b, c) {
            if (!C) return o;
            if (!("object" === typeof b && "string" === typeof c))
                if ("object" === typeof b && !H(c)) c = b.hasOwnProperty("lists") ? "odds" : "cdn3";
                else if (H(b) || H(c)) {
                M("Activator", "Unrecognized arguments to activateGeoDelayedExperiment: " + arguments);
                return
            }
            if ("object" === typeof b && "string" === typeof c) {
                M("Activator", "Saving async info from '" + c + "'");
                "cdn3" === c && U("geoArrive");
                Gc(c, b);
                var d = (R[c] = b) && b.lists || {},
                    e = {},
                    f, h, l, n, m;
                for (m in d) d.hasOwnProperty(m) && (0 === m.indexOf("_") && d[m]) && (f = m.substring(1).split("__"),
                    h = f.shift(), l = f.shift(), f = f.join("__"), h && (l && f) && (n = e, n[h] || (n[h] = {}), n = n[h], n[l] || (n[l] = []), n = n[l], n.push(f)));
                for (h in e) pd(h, e[h], o);
                vd ? (M("Activator", "Post-timeout; too late to act on new async info."), geolocation.cdn3Requested && U("geoFailed")) : (d = wd.slice(), M("Activator", "Trying to activate " + d.length + " delayed segments"), xd(d), d = yd.slice(), M("Activator", "Trying to activate " + d.length + " experiments"), td(a, d, {
                    ya: Ta
                }), zd(), "object" === typeof b && "string" === typeof c && "cdn3" === c && U("geoSuccess"))
            } else M("Activator",
                "Timeout: will not act on future async info."), U("geoTimeout"), vd = j
        }

        function td(a, b, c) {
            M("Activator", "Triaging " + b.length + " experiments.");
            var d = [],
                e = [],
                f = [];
            w(b, function(b) {
                c.Fa ? (M("Activator", "Force-ignoring conditions for experiment " + b), d.push(b)) : Ad(b) ? Bd(b, {
                    manualActivation: c.bb,
                    objectType: "experiment",
                    enabledStatus: c.Ea,
                    visitor: a
                }) ? (M("Activator", "Passed conditions for experiment " + b), d.push(b)) : (M("Activator", "Failed conditions for experiment " + b), f.push(b)) : (M("Activator", "Can't test conditions for experiment " + b), e.push(b))
            });
            w(e, Cd);
            Dd(d);
            Dd(f);
            var h = [];
            w(d, function(a) {
                Ed(a, c.hb) && h.push(a)
            });
            Fd(h, b);
            Gd();
            Zc();
            C && !c.ya && Hd(document.location.href, "pageview", {
                gb: j
            })
        }

        function xd(a) {
            M("Activator", "Triaging " + a.length + " segments.");
            var b = [],
                c = [],
                d = [],
                e = [];
            w(a, function(a) {
                cc(a, "is_api_only") ? (M("Activator", "Ignoring API-only segment " + a), e.push(a)) : Ad(a) ? Bd(a, {
                    objectType: "segment"
                }) ? (M("Activator", "Passed conditions for segment " + a), b.push(a)) : (M("Activator", "Failed conditions for segment " + a), d.push(a)) : (M("Activator", "Can't test conditions for segment " + a), c.push(a))
            });
            w(c, Id);
            Jd(b);
            Jd(d);
            Jd(e);
            w(b, Kd)
        }

        function Cd(a) {
            M("Activator", "Deferring test for experiment " + a);
            E(yd, a) || yd.push(a)
        }

        function Id(a) {
            M("Activator", "Deferring test for segment " + a);
            E(wd, a) || wd.push(a)
        }

        function Dd(a) {
            yd = K(yd, function(b) {
                return !ua(b, a)
            })
        }

        function Jd(a) {
            wd = K(wd, function(b) {
                return !ua(b, a)
            })
        }
        var yd = [],
            wd = [],
            vd = o;
        /*


         UAParser.js v0.7.9
         Lightweight JavaScript-based User-Agent string parser
         https://github.com/faisalman/ua-parser-js

         Copyright ? 2012-2015 Faisal Salman <fyzlman@gmail.com>
         Dual licensed under GPLv2 & MIT
        */
        function Od() {}
        var Pd = {
            extend: function(a, b) {
                for (var c in b) - 1 !== "browser cpu device engine os".indexOf(c) && 0 === b[c].length % 2 && (a[c] = b[c].concat(a[c]));
                return a
            },
            has: function(a, b) {
                return "string" === typeof a ? -1 !== b.toLowerCase().indexOf(a.toLowerCase()) : o
            },
            N: function(a) {
                return a.toLowerCase()
            },
            ta: function(a) {
                return "string" === typeof a ? a.split(".")[0] : i
            }
        };

        function Qd() {
            for (var a, b = 0, c, d, e, f, h, l, n = arguments; b < n.length && !h;) {
                var m = n[b],
                    r = n[b + 1];
                if ("undefined" === typeof a)
                    for (e in a = {}, r) f = r[e], "object" === typeof f ? a[f[0]] = i : a[f] = i;
                for (c = d = 0; c < m.length && !h;)
                    if (h = m[c++].exec(this.qa()))
                        for (e = 0; e < r.length; e++) l = h[++d], f = r[e], "object" === typeof f && 0 < f.length ? 2 == f.length ? a[f[0]] = "function" == typeof f[1] ? f[1].call(this, l) : f[1] : 3 == f.length ? a[f[0]] = "function" === typeof f[1] && (!f[1].exec || !f[1].test) ? l ? f[1].call(this, l, f[2]) : i : l ? l.replace(f[1], f[2]) : i : 4 == f.length &&
                            (a[f[0]] = l ? f[3].call(this, l.replace(f[1], f[2])) : i) : a[f] = l ? l : i;
                b += 2
            }
            return a
        }

        function Rd(a, b) {
            for (var c in b)
                if ("object" === typeof b[c] && 0 < b[c].length)
                    for (var d = 0; d < b[c].length; d++) {
                        if (Pd.has(b[c][d], a)) return "?" === c ? i : c
                    } else if (Pd.has(b[c], a)) return "?" === c ? i : c;
            return a
        }
        var Sd = {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2E3: "NT 5.0",
                XP: ["NT 5.1", "NT 5.2"],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                "8.1": "NT 6.3",
                10: ["NT 6.4", "NT 10.0"],
                RT: "ARM"
            },
            Td = {
                browser: [
                    [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
                    ["name", "version"],
                    [/\s(opr)\/([\w\.]+)/i],
                    [
                        ["name", "Opera"], "version"
                    ],
                    [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                        /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium)\/([\w\.-]+)/i
                    ],
                    ["name", "version"],
                    [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                    [
                        ["name", "IE"], "version"
                    ],
                    [/(edge)\/((\d+)?[\w\.]+)/i],
                    ["name", "version"],
                    [/(yabrowser)\/([\w\.]+)/i],
                    [
                        ["name", "Yandex"], "version"
                    ],
                    [/(comodo_dragon)\/([\w\.]+)/i],
                    [
                        ["name", /_/g, " "], "version"
                    ],
                    [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i],
                    ["name", "version"],
                    [/(dolfin)\/([\w\.]+)/i],
                    [
                        ["name", "Dolphin"], "version"
                    ],
                    [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                    [
                        ["name", "Chrome"], "version"
                    ],
                    [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],
                    ["version", ["name", "MIUI Browser"]],
                    [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],
                    ["version", ["name", "Android Browser"]],
                    [/FBAV\/([\w\.]+);/i],
                    ["version", ["name", "Facebook"]],
                    [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                    ["version", ["name", "Mobile Safari"]],
                    [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                    ["version", "name"],
                    [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                    ["name", ["version", Rd, {
                        "1.0": "/8",
                        "1.2": "/1",
                        "1.3": "/3",
                        "2.0": "/412",
                        "2.0.2": "/416",
                        "2.0.3": "/417",
                        "2.0.4": "/419",
                        "?": "/"
                    }]],
                    [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
                    ["name", "version"],
                    [/(navigator|netscape)\/([\w\.-]+)/i],
                    [
                        ["name", "Netscape"], "version"
                    ],
                    [/fxios\/([\w\.-]+)/i],
                    ["version", ["name", "Firefox"]],
                    [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                        /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i
                    ],
                    ["name", "version"]
                ],
                ca: [
                    [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                    [
                        ["architecture", "amd64"]
                    ],
                    [/(ia32(?=;))/i],
                    [
                        ["architecture", Pd.N]
                    ],
                    [/((?:i[346]|x)86)[;\)]/i],
                    [
                        ["architecture", "ia32"]
                    ],
                    [/windows\s(ce|mobile);\sppc;/i],
                    [
                        ["architecture", "arm"]
                    ],
                    [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                    [
                        ["architecture", /ower/, "", Pd.N]
                    ],
                    [/(sun4\w)[;\)]/i],
                    [
                        ["architecture", "sparc"]
                    ],
                    [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
                    [
                        ["architecture", Pd.N]
                    ]
                ],
                F: [
                    [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
                    ["model", "vendor", ["type", "tablet"]],
                    [/applecoremedia\/[\w\.]+ \((ipad)/],
                    ["model", ["vendor", "Apple"],
                        ["type", "tablet"]
                    ],
                    [/(apple\s{0,1}tv)/i],
                    [
                        ["model", "Apple TV"],
                        ["vendor",
                            "Apple"
                        ]
                    ],
                    [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
                    ["vendor", "model", ["type", "tablet"]],
                    [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],
                    ["model", ["vendor", "Amazon"],
                        ["type", "tablet"]
                    ],
                    [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],
                    [
                        ["model", Rd, {
                            "Fire Phone": ["SD", "KF"]
                        }],
                        ["vendor", "Amazon"],
                        ["type", "mobile"]
                    ],
                    [/\((ip[honed|\s\w*]+);.+(apple)/i],
                    ["model", "vendor", ["type", "mobile"]],
                    [/\((ip[honed|\s\w*]+);/i],
                    ["model", ["vendor", "Apple"],
                        ["type", "mobile"]
                    ],
                    [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
                    ["vendor", "model", ["type", "mobile"]],
                    [/\(bb10;\s(\w+)/i],
                    ["model", ["vendor", "BlackBerry"],
                        ["type", "mobile"]
                    ],
                    [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],
                    ["model", ["vendor", "Asus"],
                        ["type", "tablet"]
                    ],
                    [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
                    [
                        ["vendor", "Sony"],
                        ["model", "Xperia Tablet"],
                        ["type", "tablet"]
                    ],
                    [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],
                    [
                        ["vendor", "Sony"],
                        ["model", "Xperia Phone"],
                        ["type", "mobile"]
                    ],
                    [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                    ["vendor", "model", ["type", "console"]],
                    [/android.+;\s(shield)\sbuild/i],
                    ["model", ["vendor", "Nvidia"],
                        ["type", "console"]
                    ],
                    [/(playstation\s[3portablevi]+)/i],
                    ["model", ["vendor", "Sony"],
                        ["type", "console"]
                    ],
                    [/(sprint\s(\w+))/i],
                    [
                        ["vendor", Rd, {
                            HTC: "APA",
                            Sprint: "Sprint"
                        }],
                        ["model",
                            Rd, {
                                "Evo Shift 4G": "7373KT"
                            }
                        ],
                        ["type", "mobile"]
                    ],
                    [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
                    ["vendor", "model", ["type", "tablet"]],
                    [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],
                    ["vendor", ["model", /_/g, " "],
                        ["type", "mobile"]
                    ],
                    [/(nexus\s9)/i],
                    ["model", ["vendor", "HTC"],
                        ["type", "tablet"]
                    ],
                    [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                    ["model", ["vendor", "Microsoft"],
                        ["type", "console"]
                    ],
                    [/(kin\.[onetw]{3})/i],
                    [
                        ["model", /\./g,
                            " "
                        ],
                        ["vendor", "Microsoft"],
                        ["type", "mobile"]
                    ],
                    [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i],
                    ["model", ["vendor", "Motorola"],
                        ["type", "mobile"]
                    ],
                    [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                    ["model", ["vendor", "Motorola"],
                        ["type", "tablet"]
                    ],
                    [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
                    [
                        ["vendor", "Samsung"], "model", ["type", "tablet"]
                    ],
                    [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i,
                        /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i
                    ],
                    [
                        ["vendor", "Samsung"], "model", ["type", "mobile"]
                    ],
                    [/(samsung);smarttv/i],
                    ["vendor", "model", ["type", "smarttv"]],
                    [/\(dtv[\);].+(aquos)/i],
                    ["model", ["vendor", "Sharp"],
                        ["type", "smarttv"]
                    ],
                    [/sie-(\w+)*/i],
                    ["model", ["vendor", "Siemens"],
                        ["type", "mobile"]
                    ],
                    [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i],
                    [
                        ["vendor", "Nokia"], "model", ["type", "mobile"]
                    ],
                    [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
                    ["model", ["vendor", "Acer"],
                        ["type", "tablet"]
                    ],
                    [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                    [
                        ["vendor", "LG"], "model", ["type", "tablet"]
                    ],
                    [/(lg) netcast\.tv/i],
                    ["vendor", "model", ["type", "smarttv"]],
                    [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i],
                    ["model", ["vendor", "LG"],
                        ["type", "mobile"]
                    ],
                    [/android.+(ideatab[a-z0-9\-\s]+)/i],
                    ["model", ["vendor", "Lenovo"],
                        ["type", "tablet"]
                    ],
                    [/linux;.+((jolla));/i],
                    ["vendor", "model", ["type", "mobile"]],
                    [/((pebble))app\/[\d\.]+\s/i],
                    ["vendor", "model", ["type", "wearable"]],
                    [/android.+;\s(glass)\s\d/i],
                    ["model", ["vendor", "Google"],
                        ["type", "wearable"]
                    ],
                    [/android.+(\w+)\s+build\/hm\1/i,
                        /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i
                    ],
                    [
                        ["model", /_/g, " "],
                        ["vendor", "Xiaomi"],
                        ["type", "mobile"]
                    ],
                    [/(mobile|tablet);.+rv\:.+gecko\//i],
                    [
                        ["type", Pd.N], "vendor", "model"
                    ]
                ],
                ea: [
                    [/windows.+\sedge\/([\w\.]+)/i],
                    ["version", ["name", "EdgeHTML"]],
                    [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
                    ["name", "version"],
                    [/rv\:([\w\.]+).*(gecko)/i],
                    ["version", "name"]
                ],
                va: [
                    [/microsoft\s(windows)\s(vista|xp)/i],
                    ["name", "version"],
                    [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
                    ["name", ["version", Rd, Sd]],
                    [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                    [
                        ["name", "Windows"],
                        ["version", Rd, Sd]
                    ],
                    [/\((bb)(10);/i],
                    [
                        ["name", "BlackBerry"], "version"
                    ],
                    [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
                        /linux;.+(sailfish);/i
                    ],
                    ["name", "version"],
                    [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
                    [
                        ["name", "Symbian"], "version"
                    ],
                    [/\((series40);/i],
                    ["name"],
                    [/mozilla.+\(mobile;.+gecko.+firefox/i],
                    [
                        ["name", "Firefox OS"], "version"
                    ],
                    [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i,
                        /(gnu)\s?([\w\.]+)*/i
                    ],
                    ["name", "version"],
                    [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                    [
                        ["name", "Chromium OS"], "version"
                    ],
                    [/(sunos)\s?([\w\.]+\d)*/i],
                    [
                        ["name", "Solaris"], "version"
                    ],
                    [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
                    ["name", "version"],
                    [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],
                    [
                        ["name", "iOS"],
                        ["version", /_/g, "."]
                    ],
                    [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i],
                    [
                        ["name", "Mac OS"],
                        ["version", /_/g, "."]
                    ],
                    [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i,
                        /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i
                    ],
                    ["name", "version"]
                ]
            };

        function Ud(a, b) {
            if (!(this instanceof Ud)) return (new Ud(a, b)).Sa();
            var c = a || (Od && Od.navigator && Od.navigator.userAgent ? Od.navigator.userAgent : ""),
                d = b ? Pd.extend(Td, b) : Td;
            this.u = function() {
                var a = Qd.apply(this, d.browser);
                a.ta = Pd.ta(a.version);
                return a
            };
            this.Ja = function() {
                return Qd.apply(this, d.ca)
            };
            this.K = function() {
                return Qd.apply(this, d.F)
            };
            this.Oa = function() {
                return Qd.apply(this, d.ea)
            };
            this.na = function() {
                return Qd.apply(this, d.va)
            };
            this.Sa = function() {
                return {
                    zb: this.qa(),
                    browser: this.u(),
                    ea: this.Oa(),
                    va: this.na(),
                    F: this.K(),
                    ca: this.Ja()
                }
            };
            this.qa = function() {
                return c
            };
            this.fb = function(a) {
                c = a
            };
            this.fb(c);
            return this
        }
        Ud.VERSION = "0.7.9";
        Ud.jb = {
            e: "name",
            pb: "major",
            VERSION: "version"
        };
        Ud.lb = {
            ib: "architecture"
        };
        Ud.mb = {
            rb: "model",
            VENDOR: "vendor",
            g: "type",
            kb: "console",
            qb: "mobile",
            ub: "smarttv",
            vb: "tablet",
            wb: "wearable",
            nb: "embedded"
        };
        Ud.ob = {
            e: "name",
            VERSION: "version"
        };
        Ud.sb = {
            e: "name",
            VERSION: "version"
        };
        Od.Aa = Ud;

        function jc() {
            var a = new Od.Aa(window.navigator.userAgent),
                b = a.u(),
                c = a.na(),
                a = a.K(),
                d = a.model in Vd ? Vd[a.model] : "unknown",
                e = (c.name || "unknown").toLowerCase(),
                f;
            a: if (E(["mobile", "tablet"], a.type)) f = j;
                else {
                    if (d && "unknown" !== d)
                        for (f in Vd)
                            if (d === Vd[f]) {
                                f = j;
                                break a
                            }
                    f = E(["android", "blackberry", "ios", "windows phone"], e) ? j : o
                }
            return {
                aa: Wd(b.name),
                ba: b.version,
                platform: {
                    id: e,
                    version: c.version
                },
                F: {
                    id: d,
                    type: a.type || (f ? "mobile" : "desktop"),
                    w: f
                }
            }
        }

        function Wd(a) {
            a = (a || "").toLowerCase();
            if (a in Xd) return a;
            for (var b in Xd)
                if (D(Xd[b] || [], function(b) {
                        return b.toLowerCase() === a
                    })) return b;
            return "unknown"
        }
        var Xd = {
                gc: ["Chrome", "chromium", "silk", "yandex", "maxthon"],
                ie: ["Internet Explorer", "iemobile"],
                edge: ["Edge"],
                ff: ["Firefox", "iceweasel"],
                opera: ["Opera", "opera mini", "opera tablet"],
                safari: ["Safari", "mobile safari", "webkit"],
                ucbrowser: ["UC Browser"]
            },
            Vd = {
                iPhone: "iphone",
                iPad: "ipad"
            };

        function od(a) {
            return a.match(/_optimizely_redirect(?:_no_cookie)?=(\S+)/)
        }

        function Yd(a) {
            return -1 !== a.indexOf("_optimizely_redirect_no_cookie")
        }

        function Zd(a) {
            var a = a || "",
                b = v("optimizelyRedirect");
            return Yd(a) || !b || b && "true" === b.split("|")[1] ? j : o
        }

        function $d() {
            var a;
            a = H(a) ? a : document.referrer;
            y("optimizelyReferrer", a, 5)
        }
        var Uc = k,
            nd = "",
            ae = /^\/\* _optimizely_redirect.+\*\/[ ]*\nwindow\.location\.replace\(_optly\.redir\.href.*\)[ ]*[;]?$/,
            be = /^\/\* _optimizely_redirect.+\*\/[ ]*\nvar[ ]*_optly[ ]*=[ ]*\{[ ]*redir:document\.createElement\("a"\)\}[;]?\n_optly\.redir\.href=.*\n_optly\.cur=.+\nif \(_optly.cur\)[ ]?\{.+\}[ ]*\nwindow\.location\.replace\(_optly\.redir\.href.*\)[ ]*[;]?$/,
            ce = /^\/\* _optimizely_redirect.+\*\/[ ]*[\n]+window\.location\.replace\([ ]*redirectFirst.*\)[ ]*[;]?$/;
        var de, ee;

        function fe() {
            var a = {
                    disable: ge,
                    optOut: he,
                    setCookieDomain: Ea,
                    setCookieExpiration: ie,
                    verifyPreviewProject: function(a) {
                        Qb() !== a && M("API", "Preview projectId (" + Qb() + ") does not match expected (" + a + "), disabling.")
                    }
                },
                b = window.optimizely,
                c = [];
            C && G(b) && (w(b, function(b) {
                var e = b;
                G(b) ? e = b[0] : ab(b) && (e = b.type);
                a[e] ? je([a], b, j) : c.push(b)
            }), window.optimizely = c)
        }

        function ke(a, b, c) {
            pd(a, b, !!c);
            zd()
        }

        function le(a, b) {
            var c = Hb(a) || a,
                d = Ib()[c];
            d ? d.audience_id ? V.D(d.audience_id) : d.dimension_id ? V.B(d.dimension_id, b || j, o) : me(c, b) : M("API", "Unable to find segment: " + c)
        }

        function sd(a, b, c) {
            Sa = j;
            C && c !== j && Hd(document.location.href, "pageview", {
                gb: j
            });
            var a = String(a),
                b = String(b),
                d = k,
                e = b.split("_"),
                f = Nb(a),
                b = f && 0 !== f.length;
            if ("-1" === e[0]) {
                c = a;
                ne[c] && delete ne[c];
                oe[c] && delete oe[c];
                for (e = 0; e < W.length; e++) W[e].H === c && W.splice(e, 1);
                pe()
            } else if (b && e.length == f.length) d = [], w(e, function(a, b) {
                256 >= Number(a) ? d.push(Sb(f[b])[a]) : d.push(a)
            }), d = d.join("_");
            else if (!b && 1 == e.length && 256 >= Number(e[0])) {
                var c = String,
                    e = e[0],
                    h = Ob(a),
                    l = k;
                try {
                    l = h[e]
                } catch (n) {}
                d = c(l)
            } else 1 == e.length ?
                d = e[0] : M("API", "Error: could not bucket user. Unknown arguments.");
            d && (b && Rb(a, d) ? (b = d, c = Rb(a, b), qe[a] = qe[a] || {}, qe[a][c] = b, M("Distributor", "Preferring variation partial " + b + " of section " + c + " of experiment " + a), a = re(a), 1 === a.length && se(a[0], "api.bucketUser", j)) : se(d, "api.bucketUser", j));
            Gd()
        }

        function ge(a) {
            a && "tracking" === a || (M("API", "Optimizely disabled"), C = o);
            z = o
        }

        function te() {
            M("API", "Finalizing API.");
            zd();
            de = j
        }

        function ue() {
            if (B("slave")) return SLAVE_CLIENT.optimizely.get.apply(k, Array.prototype.slice.call(arguments))
        }
        var ve = [];

        function we(a) {
            ve.push(a);
            zd()
        }

        function je(a, b, c) {
            var d = [],
                e = b,
                c = H(c) ? c : o,
                f = 0;
            G(b) ? (e = b[0], d = Za(b, 1)) : ab(b) && (f = H(b.version) ? b.version : 1, e = b.type, d = [b]);
            var a = a[f],
                h;
            a && (h = a[e]);
            h ? (M("API", 'Called function "' + e + '"'), h.apply(k, d)) : c || M("API", 'Error for unknown function "' + e + '"');
            B("slave") && SLAVE_CLIENT.optimizely.push(b);
            zc()
        }

        function ye(a, b) {
            de ? M("API", "Error: can't add custom tags after Optimizely loads") : (ee = ee || {}, 2 == arguments.length ? ee[a] = b : 1 == arguments.length && $.extend(j, ee, a))
        }

        function ze(a, b) {
            var c = Hb(a) || a,
                b = H(b) ? b : j,
                d = Ib()[c];
            d ? d.audience_id ? V.Z(d.audience_id) : d.dimension_id ? V.B(d.dimension_id, k) : Ae(c, b) : M("API", "Unable find segment for: " + c)
        }

        function Be() {
            var a = L(Ib());
            w(a, function(a) {
                ze(a, o)
            });
            Ce()
        }

        function zd() {
            De = {};
            Ee = {};
            Fe = {};
            w(md(), function(a) {
                var b = Q(a);
                De[b] = a.split("_");
                Ee[b] = Vb(a);
                Fe[b] = Wb(a)
            });
            X = {};
            var a = B("audiences");
            a && (X.audiences = a);
            X.experiments = {};
            X.sections = {};
            X.segments = {};
            X.state = {};
            X.variations = {};
            X.visitor = {};
            X.customTags = ee;
            X.thirdParty = N.get(qd) || {};
            for (var b = Eb(), a = 0; a < b.length; a++) {
                var c = b[a],
                    d = {};
                d.code = O(c, "code") || "";
                d.name = Mb(c);
                d.conditional = Lb(c);
                d.manual = Kb(c);
                d.section_ids = Nb(c);
                d.variation_ids = Ob(c);
                X.experiments[c] = d
            }
            b = L(Ib());
            for (a = 0; a < b.length; a++) c = b[a],
                X.segments[c] = {
                    name: cc(c, "name") || "Seg " + c
                };
            b = L(B("sections") || {});
            for (a = 0; a < b.length; a++) c = b[a], d = {}, d.name = B("sections", c, "name") || "Sec " + c, d.variation_ids = Sb(c), X.sections[c] = d;
            b = L(B("variations") || {});
            for (a = 0; a < b.length; a++) c = b[a], d = {}, d.name = Wb(c), d.code = Tb(c), X.variations[c] = d;
            b = {};
            a = kc();
            J(b, {
                browser: Xd[a] ? Xd[a][0] : a,
                browserVersion: lc(),
                device: mc().id,
                deviceType: mc().type,
                platform: oc(),
                mobile: sc(),
                mobileId: rc(),
                os: oc().id
            });
            var e = {};
            w(Pb(), function(a) {
                e[a] = Lc(a)
            });
            b.lists = e;
            b.location = Oc();
            b.ip = Hc();
            b.matchingRules = Qc();
            b.params = {};
            c = Ge();
            c.reverse();
            a = 0;
            for (d = c.length; a < d; a++) try {
                b.params[la(c[a][0])] = la(c[a][1])
            } catch (f) {
                M("API", "Failed to decode parameter " + c[a][0] + "=" + c[a][1])
            }
            b.referrer = String(document.referrer);
            b.segments = He();
            b.dimensions = V.t;
            b.audiences = V.p;
            X.visitor = b;
            a = {};
            a.activeExperiments = ld || [];
            a: {
                if (b = nd)
                    if (c = Q(b)) {
                        b = {
                            variationId: b,
                            experimentId: c,
                            referrer: Uc
                        };
                        break a
                    }
                b = i
            }
            a.redirectExperiment = b;
            a.variationIdsMap = De;
            a.variationMap = Ee;
            a.variationNamesMap = Fe;
            a.enabled = C;
            a.integrations = {};
            a.integrations.activeOAuthClientIds = ve;
            X.state = a;
            J(window.optimizely, {
                activeExperiments: ld,
                allExperiments: Jb(),
                all_experiments: Jb(),
                data: X,
                variationIdsMap: De,
                variationMap: Ee,
                variationNamesMap: Fe,
                variation_map: Ee
            })
        }

        function Ie(a) {
            if (!bb(a)) return o;
            Ia = Number(a)
        }

        function Je() {
            Ma = j
        }

        function ie(a) {
            var b = "";
            "number" !== typeof a ? (b = "must be a number.", a = 31536E4) : a = Math.floor(86400 * a);
            7776E3 > a && (b = "less then minimum.", a = 7776E3);
            M("API", (b && "Days argument " + b) + " Cookie expiration set to " + a + " seconds.");
            Ua = a
        }

        function Ke() {
            Ta = j
        }

        function Le() {
            v("optimizelyReportableFix") ? M("API", "skipping because cookie is set") : (w(B("audiences"), function(a) {
                vb(a) && (M("API", "Removing from reportable audience: " + a), V.Z(a))
            }), y("optimizelyReportableFix", "1", 7776E3))
        }

        function Me(a) {
            var b = Wa();
            !a && 0 !== a ? (M("API", "Clearing PPID"), Aa("optimizelyPPID", Ba())) : "string" === typeof a || "number" === typeof a ? (M("API", "Setting PPID to " + a), a = String(a), y("optimizelyPPID", a, Ua)) : M("API", "Ignoring non-string, non-number PPID: " + a);
            Wa() !== b && (M("API", "Clearing plan because of PPID change"), M("Plan", "Resetting visitor buckets"), Ne = {}, ne = {}, oe = {}, W = [], Gd())
        }
        var Pe = {
                event: function(a) {
                    Oe(a.eventName, a.tags)
                },
                user: function(a) {
                    a.userId && Me(a.userId);
                    a.attributes && w(a.attributes, function(a, c) {
                        V.B(a, c)
                    })
                },
                integration: function(a) {
                    a.OAuthClientId && we(a.OAuthClientId)
                }
            },
            X = {},
            Qe = {},
            De = {},
            Ee = {},
            Fe = {},
            V = k;

        function Oe(a, b) {
            var c;
            a: {
                c = {};
                var d, e = B("custom_revenue_goals");e && (a in e && bb(e[a])) && (d = Number(e[a]));
                if (b)
                    if (bb(b)) d = Number(b);
                    else if ("object" === typeof b) {
                    if (c = J({}, b), "revenue" in c)
                        if (bb(c.revenue)) d = Number(c.revenue), delete c.revenue;
                        else {
                            x("tracker", "Revenue field %s not a number.", c.revenue);
                            c = k;
                            break a
                        }
                } else {
                    x("tracker", "Revenue argument %s not a number.", b);
                    c = k;
                    break a
                }
                H(d) && (c.Q = d)
            }
            if (c === k) x("tracker", "Bad options. Will not track this event.");
            else {
                d = Cb();
                var f = {};
                w(d, function(a) {
                    f[a] =
                        j
                });
                $.extend(c, {
                    S: f
                });
                Hd(a, "custom", c)
            }
        }

        function Hd(a, b, c) {
            c = c || {};
            z && (Re.push({
                name: a,
                type: b,
                da: +new Date / 1E3,
                options: c
            }), Se ? (Te(), M("Tracker", "Tracking event '" + a + "'")) : M("Tracker", "Queued tracking event '" + a + "'"))
        }

        function Ue() {
            Ve();
            $("html").bind("mousedown", We);
            $("html").bind("touchstart", Xe)
        }

        function Ve() {
            $("html").unbind("touchstart", Xe);
            $("html").unbind("mousedown touchend", We);
            $("html").unbind("touchmove", Ue)
        }

        function Xe() {
            $("html").bind("touchend", We);
            $("html").bind("touchmove", Ue)
        }

        function Ye() {
            var a = document.location.href,
                b = B("pageview_revenue_goals");
            b && 0 < L(b) ? w(L(b), function(c) {
                Hd(a, "pageview", {
                    Q: c,
                    S: b[c]
                })
            }) : Hd(a, "pageview")
        }

        function Ze() {
            var a = v("optimizelyPendingLogEvents") || "[]",
                b = [];
            try {
                b = fa(a)
            } catch (c) {}
            if (G(b))
                for (var a = 0, d = b.length; a < d; a++) {
                    var e = b[a];
                    if ("string" !== typeof e) {
                        b = [];
                        break
                    } else try {
                        fa(e);
                        b = [];
                        break
                    } catch (f) {}
                } else b = [];
            return b
        }

        function $e(a) {
            a = I(a.split("&"), function(a) {
                return a.split("=")
            });
            a.sort(function(a, c) {
                return a[0] < c[0] ? -1 : a[0] > c[0] ? 1 : 0
            });
            return I(a, function(a) {
                return a.join("=")
            }).join("&")
        }

        function bd(a, b) {
            if (af && -1 !== a.indexOf(bf)) try {
                var c = new XMLHttpRequest;
                if ("withCredentials" in c) {
                    c.onload = b;
                    c.open("GET", a, j);
                    c.withCredentials = j;
                    c.send();
                    return
                }
                af = o;
                M("Tracker", "Found that XHR with credentials is not supported in this browser.")
            } catch (d) {
                M("Tracker", "XHR not supported"), af = o
            }
            var c = a,
                e = new Image;
            e.onload = b;
            c = c.replace("&" + bf, "");
            e.src = c;
            cf.push(e)
        }

        function he(a, b) {
            a = !H(a) || "true" === String(a);
            H(b) || (b = window.alert);
            var c = a ? "true" : "false";
            a ? (y("optimizelyOptOut", c, Ua), y("optimizelyBuckets", c, Ua), b("You have successfully opted out of Optimizely for this domain.")) : (y("optimizelyOptOut", c, Ua), b("You are NOT opted out of Optimizely for this domain."))
        }

        function ef() {
            return "true" === v("optimizelyOptOut")
        }

        function We() {
            Ve();
            Hd("engagement", "engagement")
        }
        var Re = [],
            Se = o;

        function Te() {
            var a = ["a=" + Qb(), "d=" + tb(), "y=" + !!B("ip_anonymization"), "src=js"];
            Sa && a.push("override=true");
            w(md(), function(b) {
                var c = Q(b);
                a.push("x" + c + "=" + b)
            });
            w(He(), function(b, c) {
                c = encodeURIComponent(la(c));
                a.push("s" + b + "=" + c)
            });
            a.push("tsent=" + +new Date / 1E3);
            var b = [],
                c = Va(),
                d = Wa();
            w(Re, function(a) {
                var e = [],
                    f = [];
                a.name && (e.push("n=" + encodeURIComponent(a.name)), f = f.concat(Gb(a.name)));
                if (a.type && "pageview" === a.type) {
                    var f = f.concat(ld.concat(T)),
                        h = nd;
                    h && (h = Q(h), f.push(h))
                }
                a.options.anonymous !== j &&
                    (e.push("u=" + c), d && e.push("p=" + encodeURIComponent(d)));
                af && e.push(bf);
                a.da && e.push("time=" + a.da);
                Ma && e.push("dtpc=" + Ma);
                var l = !!a.options && !!a.options.Q && a.options.S || {},
                    h = L(l),
                    m = K(Cb(), function(a) {
                        return !l[a]
                    }),
                    f = [{
                        T: h,
                        ra: f.concat([B("summary_revenue_goal_id") || k]),
                        fa: ["v=" + encodeURIComponent(a.options.Q)]
                    }, {
                        T: m,
                        ra: f,
                        fa: []
                    }];
                w(f, function(a) {
                    (a.T.length || Ja) && b.push(e.concat(a.fa).concat(["f=" + a.T.join(","), "g=" + a.ra.join(",")]).join("&"))
                });
                if ("custom" === a.type) try {
                    var n = a.name,
                        q = Va(),
                        r = N.get("customEvents") || {},
                        ia = r[q] || (r[q] = []),
                        ia = G(ia) ? ia : []; - 1 !== $.inArray(n, ia) && ia.splice($.inArray(n, ia), 1);
                    ia.push(n);
                    100 < ia.length && ia.shift();
                    r[q] = ia;
                    N.set("customEvents", r);
                    Aa("optimizelyCustomEvents", Ba())
                } catch (df) {}
            });
            var e = b.concat(Ze());
            ff(e);
            var f = a.join("&"),
                e = gf ? b : e;
            gf = j;
            for (var h = 0, l = e.length; h < l; h++) {
                var n = e[h],
                    m = f + "&" + n;
                M("Tracker", "Making a log request.");
                var m = m + ("&cx2=" + gc($e(m), 65259)),
                    r = Qb(),
                    q = B("log_host");
                r && (q = r.toString() + "." + q);
                bd("https://" + q + "/event?" + m, function() {
                    for (var a = n, b = Ze(), c = 0, d =
                            b.length; c < d; c++)
                        if (b[c] === a) {
                            b.splice(c, 1);
                            break
                        }
                    ff(b);
                    M("Tracker", "Removed a pending log event from the pending events cookie.")
                })
            }
            Re = [];
            Se = j
        }

        function ff(a) {
            for (var b = u(a); 1536 < b.length;) a = a.slice(0, -1), b = u(a);
            y("optimizelyPendingLogEvents", b, 15)
        }
        var cf = [],
            gf = o,
            bf = "wxhr=true",
            af = j;
        var Y = {
            e: "n",
            b: "t",
            g: "y",
            l: "c",
            m: "r",
            o: "s",
            f: "o"
        };

        function hf(a, b, c, d, e) {
            this[Y.e] = a;
            this[Y.g] = b;
            "string" === typeof c && 0 < eb(c).length && (this[Y.l] = eb(c));
            d && 0 < L(d).length && (this[Y.f] = d);
            H(e) && (this[Y.m] = e)
        }
        hf.prototype.hash = function() {
            if (this.v) return this.v;
            var a;
            a = [];
            a.push(encodeURIComponent(Y.e) + "=" + encodeURIComponent(this[Y.e]));
            a.push(encodeURIComponent(Y.g) + "=" + encodeURIComponent(this[Y.g]));
            this[Y.l] && a.push(encodeURIComponent(Y.l) + "=" + encodeURIComponent(this[Y.l]));
            this[Y.m] && a.push(encodeURIComponent(Y.m) + "=" + encodeURIComponent(this[Y.m]));
            if (this[Y.f])
                for (var b = this[Y.f] || {}, c = K(L(b), function(a) {
                        return b.hasOwnProperty(a)
                    }), c = c.sort(), d = 0; d < c.length; d++) a.push(encodeURIComponent(c[d]) + "=" +
                    encodeURIComponent(b[c[d]]));
            a = a.join("&");
            var e = String.fromCharCode;
            a = a.replace(/[\S\s]/gi, function(a) {
                var a = a.charCodeAt(0),
                    b = e(a & 255);
                255 < a && (b = e(a >>> 8 & 255) + b);
                65535 < a && (b = e(a >>> 16) + b);
                return b
            });
            return this.v = gc(a, 2716770798)
        };

        function jf(a, b) {
            if (a.hash() !== b.hash() || a[Y.e] !== b[Y.e] || a[Y.g] !== b[Y.g] || a[Y.l] !== b[Y.l] || a[Y.m] !== b[Y.m]) return o;
            if (!a[Y.f] && !b[Y.f]) return j;
            var c = a[Y.f] || {},
                d = b[Y.f] || {},
                e = K(L(c), function(a) {
                    return c.hasOwnProperty(a)
                }),
                f = K(L(d), function(a) {
                    return d.hasOwnProperty(a)
                });
            if (e.length !== f.length) return o;
            for (f = 0; f < e.length; f++) {
                var h = e[f];
                if (!d.hasOwnProperty(h) || c[h] !== d[h]) return o
            }
            return j
        }
        hf.prototype.k = function(a, b) {
            var c = $a(this, a);
            return H(c) ? c : b
        };
        hf.prototype.R = function(a, b) {
            if (a === Y.e || a === Y.g || a === Y.l || a === Y.m || a === Y.f) this[a] = b, this.v = k, this.hash()
        };

        function kf(a, b, c) {
            this.G = a;
            this[Y.b] = b;
            H(c) && (this[Y.o] = c)
        }
        kf.prototype.k = function(a, b) {
            if (0 === a.length) return this;
            var c = {};
            c[Y.b] = this[Y.b];
            c[Y.o] = this[Y.o];
            c = $a(c, a);
            return H(c) ? c : this.G.k(a, b)
        };
        kf.prototype.R = function(a, b) {
            a === Y.b || a === Y.o ? this[a] = b : this.G.R(a, b)
        };
        var lf = {},
            mf = [];

        function nf(a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a[c],
                    e = of(d);
                b[c] = new kf(e, d[Y.b])
            }
            return b
        }

        function of(a, b) {
            var c = new hf(a[Y.e], a[Y.g], a[Y.l], a[Y.f], a[Y.m]);
            H(b) && (c.v = b);
            return c
        }

        function pf(a) {
            for (var b = [], c = 0; c < a.length; c++)
                for (var d = a[c], e = of(d.eb, d.h), f = d.tb, d = d.ts, h = 0; h < d.length; h++) {
                    var l = d[h];
                    b[l.i] = new kf(e, f + l.d)
                }
            return b
        };

        function qf() {
            try {
                var a;
                if (B("is_behavior_enabled")) {
                    if (0 === mf.length && B("is_behavior_enabled")) {
                        var b = pc("events") || [],
                            c = pc("event_queue") || [];
                        if (0 === b.length && 0 === c.length) mf = [];
                        else {
                            "eb" in (b[0] || c[0]) ? (b = pf(b), c = pf(c)) : (b = nf(b), c = nf(c));
                            mf = b.concat(c);
                            1E3 < mf.length && (mf = mf.slice(-1E3));
                            c = mf;
                            for (b = 0; b < c.length; b++) {
                                var d = c[b],
                                    e;
                                b: {
                                    var f = c[b].G,
                                        h = f.hash(),
                                        l = lf[h];
                                    if ("undefined" === typeof l) lf[h] = [f];
                                    else {
                                        for (var n = 0; n < l.length; n++)
                                            if (jf(f, l[n])) {
                                                e = l[n];
                                                break b
                                            }
                                        l.push(f)
                                    }
                                    e = f
                                }
                                d.G = e
                            }
                        }
                        var d = mf,
                            m = d.length;
                        if (0 !== m) {
                            d[0].R(Y.o, d[0].k([Y.b]));
                            for (e = 1; e < m; e++) {
                                var r = d[e - 1],
                                    q = d[e];
                                q.R(Y.o, 18E5 > Math.abs(r.k([Y.b], 0) - q.k([Y.b], 0)) ? r.k([Y.o]) : q.k([Y.b]))
                            }
                        }
                    }
                    a = mf.slice(-1E3)
                } else a = [];
                return a
            } catch (F) {
                x("Behavior", "Error " + F.toString() + " getting events")
            }
            return []
        };

        function rf() {
            return (new Date).getTime() - (sf || 0)
        }
        var sf = rf();

        function U(a) {
            var b = tf;
            b.n[a] || (b.n[a] = rf())
        }
        var uf;
        try {
            uf = !document.getElementsByTagName("body")[0]
        } catch (vf) {
            uf = k
        }
        var wf = k;
        try {
            window.requestAnimationFrame(function() {
                wf = rf()
            })
        } catch (xf) {}
        var yf = /\/\/[^.]+\.optimizely\.(com|test)\/(js|api\/client)\/[\d]+\.js/gi,
            tf = new function() {
                this.n = {};
                this.Ya = Math.random() < dc();
                geolocation.cdn3Requested && (this.n.geoRequest = geolocation.cdn3Requested - sf)
            };

        function Ed(a, b) {
            var b = b === j,
                c, d = k;
            w(W, function(b) {
                a == b.H && (d = b.id)
            });
            if ((c = d) && 0 < c.length) return M("Distributor", "Not distributing experiment " + a + " (already in plan)"), j;
            if (b || a in ne) return M("Distributor", "Not distributing experiment " + a + " (is ignored)"), o;
            c = O(a, "enabled_variation_ids") || [];
            if (0 === c.length) return M("Distributor", "Permanently ignoring experiment " + a + " (no enabled variations)"), zf(a), o;
            var e = O(a, "ignore") || 0,
                f = Af();
            if (e > Math.floor(1E4 * ((ec(f + a, 0) >>> 0) / fc))) return M("Distributor",
                "Permanently ignoring experiment " + a + "(" + e / 100 + "% likelihood)"), zf(a), o;
            e = c;
            qe[a] !== i && (M("Distributor", "Taking into account bucketUser variations for experiment " + a), e = re(a));
            var f = e,
                h = [],
                l = O(a, "variation_weights") || {};
            w(f, function(a) {
                h.push(l[a])
            });
            f = Bf(a, h);
            e = e[f];
            M("Distributor", "Picked variation " + e + " [index " + f + " of " + c.length + "]");
            se(e, "distributor");
            return j
        }

        function Cf(a, b) {
            b = b || {};
            M("Distributor", "Configuring conditionally-activated experiment: " + a);
            Qe[a] ? M("Distributor", "Not configuring conditionally-activated experiment (already done): " + a) : !Fb(a) && b.force !== j ? M("Distributor", "Not configuring conditionally-activated experiment (not enabled): " + a) : (Df(a, b), de && zd())
        }

        function Df(a, b) {
            function c() {
                rd(V, a, b);
                n.isActive = E(ld.concat(T), a);
                M("Distributor", "Activating conditionally activated experiment " + a)
            }
            var d = O(a, "conditional_code"),
                e = j,
                f, h;
            if ("function" === typeof d) e = o, f = d;
            else try {
                h = eval("(function() {return " + ("(" + d + ")") + ";})()"), "function" === typeof h && (e = o, f = h)
            } catch (l) {}
            var n = {
                isActive: o,
                experimentId: a
            };
            if (e) {
                if (e = {
                        objectType: "experiment",
                        enabledStatus: b.enabledStatus
                    }, b.force || !Ad(a) || Bd(a, e)) {
                    var m = function() {
                        Ad(a) && (Ef(0, {
                            value: d
                        }) || h) ? c() : setTimeout(m, 50)
                    };
                    m();
                    M("Distributor", "Set up conditional polling for " + a);
                    Qe[a] = j
                }
            } else try {
                f(c, n), M("Distributor", "Set up conditional callback for " + a), Qe[a] = j
            } catch (r) {
                M("Distributor", "Error running conditional callback function for " + a)
            }
        }

        function Af() {
            return Wa() || Va()
        }

        function Bf(a, b) {
            var c = b.length;
            if (0 === c) return k;
            if (1 === c) return 0;
            for (var d = 0, e = 0; e < c; e++) d += b[e];
            e = Af();
            d *= (ec(e + a, 1) >>> 0) / fc;
            for (e = 0; e < c; e++) {
                if (d < b[e]) return e;
                d -= b[e]
            }
            d = Af();
            return Math.floor((ec(d + a, 2) >>> 0) / fc * c)
        }

        function re(a) {
            var b = [];
            w(O(a, "enabled_variation_ids") || [], function(c) {
                var d = j,
                    e;
                for (e in qe[a]) - 1 === c.indexOf(qe[a][e]) && (d = o);
                d && b.push(c)
            });
            return b
        }
        var qe = {};

        function Ff() {
            for (var a = B("dcp_keyfield_locators") || [], b = k, c = [], d = 0; d < a.length; d++) {
                var e = a[d],
                    f = e.dcp_datasource_id || k,
                    h = e.is_optimizely || o,
                    l = e.type,
                    e = e.name || "";
                if (f === k) M("DCP", "No DCP datasource id specified");
                else {
                    var n = k;
                    l === Gf ? n = Z.I(e) : l === Hf ? n = Z.ka(e) : l === If ? n = Z.j(e) : l === Jf && (n = Kf());
                    if (bb(n) || "string" === typeof n) f = {
                        datasourceId: f,
                        id: n
                    }, h ? b = f : c.push(f)
                }
            }
            return {
                q: b,
                z: c
            }
        }
        var Kf = Af;

        function Lf() {
            var a = Ff(),
                b = Pc.get() || {};
            if (Mf(a.z, b.aliases || {})) return o;
            b.rulesResults = k;
            Pc.set(b);
            return j
        }

        function Mf(a, b) {
            b = b || {};
            return Xa(a, function(a) {
                return b[a.datasourceId] === a.id
            })
        }
        var Gf = "cookie",
            Hf = "js_variable",
            If = "query_param",
            Jf = "uid";

        function Nc(a) {
            if (!Mc(a)) return M("Async Request", "Can't determine a value for this list-targeted key: " + a), k;
            var b = a.split("_"),
                c = b[0],
                b = b.slice(1).join("_"),
                d = i;
            if ("c" === c) d = Z.I(b);
            else if ("j" === c) d = Z.ka(b);
            else if ("q" === c) d = Z.j(b);
            else return M("Async Request", "Can't determine a value for this list-targeted key: " + a), k;
            if ("string" === typeof d || "number" === typeof d || "boolean" === typeof d) d = d.toString();
            else return d === k || "undefined" === typeof d ? M("Async Request", "No value is set for this list-targeted key: " +
                a) : M("Async Request", "Unacceptable value (must be string, number, or boolean) for this list-targeted key: " + a), k;
            if (100 < d.length) return M("Async Request", "Withholding the overlong value for this list-targeted key: " + a), k;
            M("Async Request", "Returning a value for this list-targeted key: " + a);
            return d
        }

        function Mc(a) {
            return -1 !== a.indexOf("_") ? E(["c", "j", "q"], a.split("_")[0]) : o
        };

        function Nf(a) {
            if (0 === $("body").length) setTimeout(function() {
                Nf(a)
            }, 20);
            else {
                var b;
                b = '<div id="optimizely-loading" style="position:absolute;top:0;right:0;left:0;bottom:0;background-color:white;opacity:0.9;z-index: 3271000;"><h2 style="color:#9a9a9a;top:40%;position:absolute;font-size:2.25em;text-align:center;width:100%;font-family:\'Lucida Grande\',sans-serif;">' + a + "</h2></div>";
                $("#optimizely-loading").remove();
                $("body").append(b)
            }
        }
        var Of = B("preview_host");

        function Ge() {
            var a = window.location.search || "";
            0 === a.indexOf("?") && (a = a.substring(1));
            for (var a = a.split("&"), b = [], c = 0; c < a.length; c++) {
                var d = "",
                    e = "",
                    f = a[c].split("=");
                0 < f.length && (d = f[0]);
                1 < f.length && (e = f[1]);
                b.push([d, e])
            }
            return b
        }

        function Pf() {
            for (var a = window.location.search, b, c = /optimizely_([^=]+)=([^&]*)/g, d = {}; b = c.exec(a);) d[b[1]] = b[2];
            return d
        }
        var Qf = /x(\d+)/;

        function Rf(a) {
            return a && -1 !== String(a).indexOf("[native code]")
        };

        function Sf(a) {
            var b = a || Tf;
            M("Segmenter", "Loading segments cookie.");
            if (a = v("optimizelySegments")) {
                try {
                    a = fa(a)
                } catch (c) {
                    a = {}
                }
                w(a, function(a, c) {
                    var d = Ib()[a];
                    M("Segmenter", "Segments cookie contains segment id: " + a);
                    d && d.audience_id ? b.D(d.audience_id) : d && d.dimension_id ? b.B(d.dimension_id, c, o) : Uf[a] = c
                })
            }
            xd(L(Ib()));
            Vf.push(Wf);
            Ce();
            M("Integrator", "Loading third-party segments.");
            if (window.bk_results) {
                a = window.bk_results;
                M("Integrator", "Loading BlueKai segments.");
                try {
                    w(a.campaigns, function(a) {
                        a = a.seg_id;
                        Ib()[a] ? me(a, j) : ub(a) && b.D(a)
                    })
                } catch (d) {
                    M("Integrator", "Error loading BlueKai segments.")
                }
            }
        }

        function Wf() {
            var a = {};
            w(Uf, function(b, c) {
                c && (a[b] = c)
            });
            y("optimizelySegments", u(a), Ua)
        }

        function me(a, b) {
            a && !isNaN(parseInt(a, 10)) ? (!b && "" !== b && (b = j), Uf[a] = b, Ce()) : M("Segmenter", "Unable to find segment for ID: " + a)
        }

        function Ce() {
            w(Vf, function(a) {
                a()
            })
        }

        function Kd(a) {
            M("Segmenter", "Evaluating Segment " + a);
            var b = Xf(a);
            b !== k && me(a, b)
        }

        function Xf(a) {
            if (cc(a, "is_api_only")) return k;
            var b = k,
                c = k;
            switch (cc(a, "segment_value_type") || "") {
                case "browser":
                    b = Z.ha();
                    c = "unknown";
                    break;
                case "campaign":
                    b = Z.Ka();
                    c = "none";
                    break;
                case "country":
                    b = Z.L().country;
                    c = "unknown";
                    break;
                case "language":
                    b = Z.U();
                    c = "none";
                    break;
                case "mobile":
                    b = Z.w();
                    break;
                case "os":
                    b = Z.oa().id;
                    c = "unknown";
                    break;
                case "referrer":
                    b = Z.Ra();
                    c = "none";
                    break;
                case "source_type":
                    b = Z.Ta();
                    c = "direct";
                    break;
                default:
                    return "true"
            }
            if (b === k) {
                if (Uf.hasOwnProperty(a)) return k;
                b = c
            }
            return Yf(b)
        }

        function Zf() {
            var a = Z.W();
            if (Z.j("utm_source") || Z.j("utm_campaign") || Z.j("gclid") || Z.j("otm_source")) return "campaign";
            for (var b = ["google\\.\\w{2,3}(\\.\\w{2,3})?/(search|url)", "https://(www\\.)?google\\..*?/$", "http(s)?://www\\.bing\\.\\w{2,3}(\\.\\w{2,3})?/", "r\\.search\\.yahoo\\.\\w{2,3}(\\.\\w{2,3})?/", "baidu\\.\\w{2,3}(\\.\\w{2,3})?/"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    if (a.match(d)) return "search"
                } catch (e) {
                    x("Segmenter", "%s: %s while matching %s", e.name, e.message, d)
                }
            }
            return a && nc(a) !== nc(Z.J()) ?
                "referral" : k
        }

        function $f() {
            var a = [];
            w(Uf, function(b, c) {
                c && a.push(b)
            });
            return a
        }

        function He() {
            var a = {};
            w(Uf, function(b, c) {
                c && (a[String(b)] = c)
            });
            return a
        }

        function ag(a) {
            return w(Uf, function(b, c) {
                if ((cc(b, "segment_value_type") || "") == a) return c
            })
        }

        function Ae(a, b) {
            var c = Hb(a) || a;
            Uf[c] ? (Uf[c] = o, ("undefined" === typeof b || b) && Ce()) : M("Segmenter", "Not removing " + a + ", not found")
        }

        function Yf(a, b) {
            var c, b = H(b) ? b : j;
            c = c || bg;
            a = la(a);
            a = String(a);
            b && (a = a.toLowerCase());
            a = a.substring(0, c);
            return encodeURIComponent(a)
        }
        var Vf = [],
            Uf = {},
            bg = 20;

        function cg() {}
        J(cg.prototype, {
            ha: kc,
            Ia: lc,
            Qa: rc,
            w: sc,
            u: function() {
                return {
                    id: this.ha(),
                    version: this.Ia(),
                    mobileId: this.Qa()
                }
            },
            Ka: function() {
                return this.j("utm_campaign")
            },
            I: v,
            K: mc,
            V: Hc,
            ka: function(a) {
                try {
                    return window[a]
                } catch (b) {
                    return k
                }
            },
            Ha: qf,
            U: function() {
                var a = "";
                try {
                    a = navigator.userLanguage || window.navigator.language, a = a.toLowerCase()
                } catch (b) {
                    a = ""
                }
                return a
            },
            Ma: function() {
                return (pc("visitor_profile") || {}).defaultBehavior || {}
            },
            L: Oc,
            J: function() {
                return wc || window.location.href
            },
            ma: tc,
            Pa: function() {
                return !uc ? j :
                    !!ib.get("first_session")
            },
            Ga: Ge,
            oa: oc,
            W: function() {
                return v("optimizelyReferrer") || document.referrer || ""
            },
            Ua: function(a) {
                var a = a.split("."),
                    b = a[0];
                a: {
                    for (var a = a.slice(1), b = (N.get(qd) || {})[b], c = 0, d = a.length; c < d; c++)
                        if (ca(b) && b.hasOwnProperty(a[c])) b = b[a[c]];
                        else {
                            a = i;
                            break a
                        }
                    a = b
                }
                return a
            },
            Wa: function() {
                return Wa() !== k
            },
            Ra: function() {
                return nc(this.W())
            },
            pa: $f,
            Ta: Zf,
            Na: function() {
                return document.referrer
            },
            j: function(a) {
                a: {
                    for (var b = this.Ga(), b = b || Ge(), c = 0; c < b.length; c++) {
                        var d = b[c];
                        if (d[0] === a) {
                            a =
                                d[1];
                            a = a.replace(/\+/g, " ");
                            a = la(a);
                            break a
                        }
                    }
                    a = k
                }
                return a
            },
            La: function() {
                return ee
            },
            ia: function(a) {
                return (this.La() || {})[a]
            },
            Va: function() {
                var a = (N.get("customEvents") || {})[Va()] || [];
                return G(a) ? a : []
            },
            Xa: function(a) {
                var b = this.pa();
                return E(b, a)
            },
            za: function(a) {
                return E(this.Va(), a)
            },
            getDate: function() {
                return new Date
            },
            la: Lc,
            ja: Qc
        });
        var Z = new cg;

        function dg(a, b, c) {
            if (a.k) return a.k(b, c);
            a = $a(a, b);
            "undefined" === typeof a && (a = c);
            return a
        }

        function eg(a) {
            return "string" === typeof a ? eb(a).toLowerCase() : a
        }
        var fg = ["*"],
            hg = {
                eq: function(a) {
                    a = I(a, eg);
                    return a[0] == a[1]
                },
                is: function(a) {
                    return a[0] === a[1]
                },
                gt: function(a) {
                    return a[0] > a[1]
                },
                lt: function(a) {
                    return a[0] < a[1]
                },
                gte: function(a) {
                    return a[0] >= a[1]
                },
                lte: function(a) {
                    return a[0] <= a[1]
                },
                "in": function(a) {
                    var b = I(a[1] || [], eg);
                    return E(b, eg(a[0]))
                },
                between: function(a) {
                    return a[1] <= a[0] && a[0] <= a[2]
                },
                contains: function(a) {
                    a = I(a, function(a) {
                        return "string" === typeof a ? a.toLowerCase() : a
                    });
                    return -1 !== (a[0] || "").indexOf(a[1])
                },
                regex: function(a) {
                    try {
                        var b, c;
                        "string" ===
                        typeof a[1] ? (b = a[1], c = "i") : (b = a[1][0] || "", c = a[1][1] || "");
                        return RegExp(b, c).test(a[0])
                    } catch (d) {
                        return x("Rules", 'In operator "regex", error: ' + (d.message || "invalid RegExp /" + [b, c].join("/"))), o
                    }
                },
                exists: function(a) {
                    return "undefined" !== typeof a[0]
                },
                and: function(a) {
                    return Xa(a, aa())
                },
                or: function(a) {
                    return D(a, aa())
                },
                not: function(a) {
                    return !a[0]
                }
            },
            ig = {
                "+": function(a) {
                    return (a[0] || 0) + (a[1] || 0)
                },
                "-": function(a) {
                    return (a[0] || 0) - (a[1] || 0)
                },
                "/": function(a) {
                    return (a[0] || 0) / (a[1] || 1)
                },
                "%": function(a) {
                    return (a[0] ||
                        0) % (a[1] || 1)
                }
            },
            jg = {
                sum: function(a, b) {
                    for (var c = a[0] || fg, d = 0, e = 0; e < b.length; e++) d += dg(b[e], c, 0);
                    return d
                },
                avg: function(a, b) {
                    if (0 == b.length) return 0;
                    for (var c = a[0] || fg, d = 0, e = 0; e < b.length; e++) d += dg(b[e], c, 0);
                    return d / b.length
                },
                max: function(a, b) {
                    for (var c = a[0] || fg, d = Number.NEGATIVE_INFINITY, e = 0; e < b.length; e++) d = Math.max(d, dg(b[e], c, Number.NEGATIVE_INFINITY));
                    return d
                },
                min: function(a, b) {
                    for (var c = a[0] || fg, d = Number.POSITIVE_INFINITY, e = 0; e < b.length; e++) d = Math.min(d, dg(b[e], c, Number.POSITIVE_INFINITY));
                    return d
                },
                count: function(a, b) {
                    return b.length
                }
            },
            kg = {
                now: function() {
                    return +new Date
                }
            };

        function lg(a, b) {
            if (b.hasOwnProperty("value")) return b.value;
            if (b.hasOwnProperty("field")) return dg(a, b.field);
            if (b.hasOwnProperty("eval")) {
                if (!(b.eval in kg)) {
                    x("Rules", "Unknown function: " + b.eval);
                    return
                }
                return kg[b.eval]()
            }
            if (b.op) {
                var c = b.op in hg ? hg[b.op] : b.op in ig ? ig[b.op] : k;
                if (c) {
                    var d = t(lg, a),
                        e = I(b.args || [], function(a) {
                            return d(a)
                        });
                    return c(e, a)
                }
                x("Rules", "Unknown operator: " + b.op)
            } else x("Rules", "No operator specified: " + u(b))
        }

        function mg(a) {
            function b(a, e) {
                G(a) && ("and" !== a[0] && ("or" !== a[0] && "not" !== a[0]) && x("Rules", "Unexpected operation " + a[0] + ". Continuing optimistically."), a = {
                    op: a[0],
                    args: a.slice(1)
                });
                if (a.hasOwnProperty("field") || a.hasOwnProperty("value") || a.hasOwnProperty("eval")) return a;
                if (e && a.op in jg) {
                    var f = "_" + a.op + "_" + ((a.args && a.args[0] || {}).field || fg).join(".");
                    f in d || (c.push({
                        op: a.op,
                        args: a.args
                    }), d[f] = j);
                    return {
                        field: [f]
                    }
                }
                for (var f = [], h = a.args || [], q = 0; q < h.length; q++) f[q] = b(h[q], e);
                return {
                    op: a.op,
                    args: f
                }
            }
            var c = [],
                d = {},
                e = {};
            a.hasOwnProperty("where") && (e.where = b(a.where, o));
            a.hasOwnProperty("having") && (e.having = b(a.having, j));
            if (a.hasOwnProperty("aggregate") || 0 < c.length) e.aggregate = (a.aggregate || []).concat(c);
            for (var f = ["groupBy", "orderBy", "select", "limit"], h = 0; h < f.length; h++) a.hasOwnProperty(f[h]) && (e[f[h]] = a[f[h]]);
            a.hasOwnProperty("from") && (e.from = mg(a.from));
            return e
        }

        function ng(a, b) {
            var b = b || 0,
                c = [];
            a.hasOwnProperty("where") ? a.where.op ? a.where.op in hg || c.push("Non-boolean WHERE clause operator") : c.push("Missing WHERE clause operator") : c.push("Missing WHERE clause");
            a.hasOwnProperty("having") && (a.having.op ? a.having.op in hg || c.push("Non-boolean HAVING clause operator") : c.push("Missing HAVING clause operator"));
            a.hasOwnProperty("groupBy") && !a.hasOwnProperty("aggregate") && c.push("No AGGREGATE clause specified with GROUP_BY clause");
            if (a.hasOwnProperty("select")) {
                var d =
                    a.select;
                if (G(d))
                    for (var e = 0; e < d.length; e++) d[e].op && d[e].op in jg && c.push('In SELECT clause, aggregate operator "' + d[e].op + '" specified in selector at index ' + e);
                else c.push("SELECT clause must be an array")
            }
            a.hasOwnProperty("limit") && (d = a.limit, (!bb(d) || 0 >= Number(d) || Number(d) != Math.floor(Number(d))) && c.push("LIMIT must be a positive integer"));
            0 < b && (c = I(c, function(a) {
                return "Sub-rule " + b + ": " + a
            }));
            a.hasOwnProperty("from") && (c = c.concat(ng(a.from, b + 1)));
            return c
        }

        function og(a, b) {
            var c = b;
            a.hasOwnProperty("from") && (c = og(a.from, c));
            c = K(c, function(b) {
                return lg(b, a.where)
            });
            if (a.hasOwnProperty("aggregate")) {
                var d = a.groupBy;
                if ("undefined" === typeof d || !G(d) || 0 === d.length) {
                    var d = {},
                        e = {};
                    e[fg] = "_";
                    d[fg + "=_"] = {
                        ga: e,
                        n: c
                    };
                    c = d
                } else {
                    for (var d = I(d, function(a) {
                            return a.field
                        }), e = {}, f = 0; f < c.length; f++) {
                        for (var h = c[f], l = [], n = {}, m = 0; m < d.length; m++) {
                            var r = d[m],
                                q = dg(h, r, "_"),
                                r = r.join(".");
                            n[r] = q;
                            l.push(encodeURIComponent(r) + "=" + encodeURIComponent(String(q)))
                        }
                        l = l.join("&");
                        e.hasOwnProperty(l) ||
                            (e[l] = {
                                ga: n,
                                n: []
                            });
                        e[l].n.push(h)
                    }
                    c = e
                }
                var F = a.aggregate,
                    A = {};
                w(c, function(a, b) {
                    A[a] = {};
                    for (var c = 0; c < F.length; c++) {
                        var d = F[c],
                            e = d.op;
                        if (e in jg) {
                            var f = (d.args && d.args[0] || {}).field || fg,
                                d = "_" + e + "_" + f.join("."),
                                e = jg[e]([f], b.n);
                            A[a][d] = e
                        } else x("Rules", "Unknown aggregate operator " + e)
                    }
                });
                var ba = [];
                w(c, function(a, b) {
                    var c = J({}, b.ga);
                    J(c, A[a] || {});
                    ba.push(c)
                });
                c = ba
            }
            a.hasOwnProperty("having") && (c = K(c, function(b) {
                return lg(b, a.having)
            }));
            if (a.hasOwnProperty("orderBy")) {
                var pa = a.orderBy;
                G(pa) ? c = 0 == pa.length ?
                    c : c.sort(function(a, b) {
                        for (var c = 0; c < pa.length; c++) {
                            var d = pa[c],
                                e = "ASC" === (d.direction || "ASC") ? 1 : -1,
                                f = d.field,
                                d = dg(a, f, 0),
                                f = dg(b, f, 0);
                            if (d < f) return -e;
                            if (d > f) return e
                        }
                        return 0
                    }) : x("Rules", "groupBy rule must be an array")
            }
            a.hasOwnProperty("limit") && (c = c.slice(0, Number(a.limit)));
            if (a.hasOwnProperty("select")) var xe = a.select,
                c = I(c, function(a) {
                    return I(xe, function(b) {
                        return lg(a, b)
                    })
                });
            return c
        }

        function pg(a, b) {
            try {
                var c;
                c = mg(a);
                var d = ng(c);
                0 < d.length && g(Error("Rule " + u(c) + " has violations: " + d.join("\n")));
                return 0 < og(c, b).length
            } catch (e) {
                return x("Rules", "Error " + e.toString() + " while evaluating rule " + u(a)), o
            }
        };

        function qg() {
            this.p = {};
            this.t = {};
            this.A = {};
            this.xa = {}
        }
        qg.prototype.$a = function(a) {
            var b = this.A.hasOwnProperty(a) || this.xa.hasOwnProperty(a);
            if (!this.p.hasOwnProperty(a) || !b) try {
                var c = this.p,
                    d = ub(a);
                d || g(Error("Unable to find audience for id: " + a));
                var e = rg(this, d.conditions);
                M("Visitor", "Checking if in audience " + a + ": " + e);
                c[a] = e
            } catch (f) {
                M("Visitor", "Error: " + f.message)
            }
            return this.p[a]
        };

        function sg(a, b, c, d) {
            d = J({
                O: j,
                wa: j,
                C: j
            }, d);
            if (ub(b)) {
                a.p[b] = c;
                var e = vb(b);
                e ? a.xa[b] = c : d.O ? a.A[b] = c : delete a.A[b];
                e && d.C && a.C(e, c);
                if (!e && d.O && d.wa) {
                    var f = [];
                    w(a.A, p(function(a) {
                        this.p[a] && f.push(a)
                    }, a));
                    f.sort();
                    y("optimizelyAudiences", f.join(","), 31536E4)
                }
            } else M("Visitor", "Unable to find audience " + b)
        }
        qg.prototype.D = function(a) {
            sg(this, a, j)
        };
        qg.prototype.Z = function(a) {
            sg(this, a, o)
        };
        qg.prototype.cb = function() {
            w(this.p, p(function(a) {
                sg(this, a, o, {
                    O: !!this.A.hasOwnProperty(a)
                })
            }, this))
        };

        function tg(a, b, c, d) {
            d = !H(d) || d;
            H(c) && c !== k && String(c) ? (d && (c = Yf(String(c), o)), a.t[b] = c) : delete a.t[b];
            return a.t[b]
        }
        qg.prototype.B = function(a, b, c) {
            var d;
            a: {
                for (d in B("dimensions") || {}) {
                    var e = a,
                        f = yb(d, "api_name");
                    if (e === (!f ? k : f)) break a
                }
                d = k
            }
            d = d || a;
            B("dimensions", d) ? "custom_dimension" === zb(d) ? (b = tg(this, d, b, c), a = yb(d, "segment_id"), (a = !a ? k : a) && this.C(a, b), M("Visitor", 'Set dimension "' + d + '" to "' + b + '"')) : M("Visitor", 'Unknown dimension "' + d + '"') : M("Visitor", "Unable to find dimension " + a)
        };
        qg.prototype.C = function(a, b) {
            b ? me(a, b) : Ae(a)
        };
        var Tf = new qg;

        function ug(a, b) {
            cb(b) && (b = [b]);
            b = b || fg;
            return ["_" + a + "_" + b.join(".")]
        }

        function vg(a) {
            cb(a) && (a = [a]);
            a = a || fg;
            return [a.join(".")]
        }
        var wg = {
            "<": "lt",
            "<=": "lte",
            ">": "gt",
            ">=": "gte",
            "=": "eq",
            "==": "eq"
        };

        function xg(a) {
            a = eb((a || "").toString());
            return wg[a] || a
        }

        function yg(a, b, c) {
            cb(b) && (b = [b]);
            return {
                op: xg(a),
                args: [{
                    field: b
                }, {
                    value: c
                }]
            }
        }

        function zg(a) {
            for (var b = [], c = 0; c < a.length; c++) b[c] = {
                field: a[c]
            };
            return b
        }

        function Ag(a, b) {
            cb(b) && (b = [b]);
            b = b || fg;
            return {
                op: a,
                args: [{
                    field: b
                }]
            }
        }
        var Bg = {};
        w(Y, function(a, b) {
            Bg[b] = j
        });

        function Cg(a, b) {
            var c = [];
            cb(a) ? (c = [a], "events" === (b || "events") && !(a in Bg) && (c = [Y.f, a])) : c = a;
            return c
        };

        function Dg(a) {
            var b = a.split(":");
            2 !== b.length && g(Error("optly.timeAndDayInterval.timeStringToMinutes: Invalid time string " + a));
            return 60 * parseInt(b[0], 10) + parseInt(b[1], 10)
        };

        function Bd(a, b) {
            var c = !!b.manualActivation,
                d = b.objectType ? b.objectType : "experiment",
                e = "experiment" === d,
                f = b.enabledStatus,
                h = b.visitor || Tf;
            M("Condition", "Testing " + d + " " + a);
            var f = e && (H(f) ? !!f : Fb(a)),
                l = e && Kb(a),
                n;
            a: switch (d) {
                case "experiment":
                    n = O(a, "conditions");
                    break a;
                case "segment":
                    n = cc(a, "add_condition");
                    break a;
                default:
                    n = []
            }
            if (e && !f) return M("Condition", "Failed for " + d + " " + a + " (paused)"), o;
            if (e && !c && l) return M("Condition", " Failed for " + d + " " + a + " (manual activation mode)"), o;
            if (n) {
                var m = "experiment" ===
                    (d || "experiment"),
                    r = j;
                w(n, function(b) {
                    var c = b.type;
                    if (m && b.only_first_time && Eg(a)) M("Condition", c + " condition passed because it only gets checked when bucketing", j);
                    else {
                        var d = !b.not,
                            b = (0, Fg[c])(b),
                            e = b !== d;
                        M("Condition", "Found that " + ("the visitor " + (b ? "passed" : "failed") + " a " + c + " targeting condition  when it needed to " + (d ? "pass" : "fail")), !e);
                        if (e) return r = o
                    }
                });
                if (!r) return M("Condition", "Failed for " + d + " " + a + " (condition failed)"), o
            } else {
                a: {
                    c = [];e = [];
                    if ("experiment" === d) c = O(a, "audiences") || [],
                    e =
                    O(a, "urls") || [];
                    else if ("segment" === d)(f = cc(a, "audience_id")) && (c = [f]);
                    else {
                        M("Condition", "Not a valid objectType: " + d);
                        d = o;
                        break a
                    }
                    if (0 < c.length && (M("Condition", "Testing audiences for " + d + " " + a + ": " + c), !D(c, p(h.$a, h)))) {
                        M("Condition", "Failed to match any audiences for " + d + " " + a);
                        d = o;
                        break a
                    }
                    if (0 < e.length) {
                        M("Condition", "Testing URLs for " + d + " " + a);
                        var h = e,
                            q = Z.J(),
                            F = [],
                            A = [];
                        w(h, function(a) {
                            a.negate ? A.push(a) : F.push(a)
                        });
                        h = function(a) {
                            return D(a, function(a) {
                                return Gg(q, a)
                            })
                        };
                        if (h(A) || !(0 === F.length ||
                                h(F))) {
                            M("Condition", "Failed to match any URL for " + d + " " + a);
                            d = o;
                            break a
                        }
                    }
                    d = j
                }
                if (!d) return o
            }
            return j
        }

        function Hg(a, b) {
            if (!b) return 0;
            for (var c = b.toString().split("."), d = a.toString().split("."), e = 0; e < c.length; e++)
                if (H(d[e])) {
                    if (Number(d[e]) < Number(c[e])) return -1;
                    if (Number(d[e]) > Number(c[e])) return 1
                } else return -1;
            return 0
        }

        function Ig(a, b) {
            var c = b.value,
                d = a.id,
                e = a.version,
                f = a.mobileId;
            return f && "unknown" !== f ? (M("Condition", f, j), "mobile" === c || c === f) : 0 === c.indexOf(d) ? 0 === Hg(e, c.substr(d.length)) : o
        }

        function Ef(a, b) {
            var c = b.value;
            if (c === i) return j;
            try {
                return Boolean(Jg(c))
            } catch (d) {
                return o
            }
        }

        function Kg(a, b) {
            return Lg(b.value, b.match, a)
        }

        function Mg(a, b) {
            return Lg(b.value, b.match, a)
        }

        function Ng(a, b) {
            if (a === k) return o;
            var c = b.value;
            switch (b.match) {
                case "exact":
                    if (a == c && "" != a) return j;
                    break;
                case "prefix":
                    if (0 == a.indexOf(c)) return j;
                    break;
                case "regex":
                    try {
                        var d = RegExp(c)
                    } catch (e) {
                        break
                    }
                    if (d.test(a)) return j;
                    break;
                case "cidr":
                    try {
                        var f;
                        a: {
                            var h = new Og(c),
                                l = Pg(a);l === k && g(Error("Invalid ip: " + a));
                            for (c = 0; 4 > c; c++)
                                if ((l[c] & h.X[c]) !== h.Y[c]) {
                                    f = o;
                                    break a
                                }
                            f = j
                        }
                        return f
                    } catch (n) {}
            }
            return o
        }

        function Qg(a, b) {
            var c = b.value;
            return "any" === c || 0 === a.indexOf(c)
        }

        function Rg(a, b) {
            if (a === k) return o;
            var c = b.value.split("|"),
                d = $.trim(c[0]),
                e = $.trim(c[1]),
                f = $.trim(c[2]),
                h = $.trim(c[3]);
            switch (c.length) {
                case 1:
                    if (a.country === d) return j;
                    break;
                case 2:
                    if (a.region === e && a.country === d) return j;
                    break;
                case 3:
                    if (a.city === f && (a.region === e || "" === e) && a.country === d) return j;
                    break;
                case 4:
                    if (a.continent === h) return j
            }
            return o
        }

        function Sg(a, b) {
            return Lg(b.value, b.match, a)
        }

        function Tg(a, b) {
            var c = b.value,
                d = b.match;
            M("Condition", "Testing referrer " + a + " against  " + c + " (" + d + ")", j);
            return Ug(a, c, d)
        }

        function Vg(a) {
            return !!a
        }

        function Wg(a) {
            var b = Z.J();
            return D(a.values, t(Gg, b))
        }

        function Gg(a, b) {
            var c = b.value,
                d = b.match;
            M("Condition", "Testing URL " + a + " against  " + c + " (" + d + ")", j);
            return Ug(a, c, d)
        }

        function Xg(a, b) {
            switch (b.value) {
                case "new":
                    if ("returning" === a) return o;
                    break;
                case "returning":
                    return "returning" === a
            }
            return j
        }

        function rg(a, b) {
            var c = {
                and: function(b) {
                    return Xa(b, t(rg, a))
                },
                or: function(b) {
                    return D(b, t(rg, a))
                },
                not: function(b) {
                    1 !== b.length && g(Error('"not" argument too long: ' + u(b)));
                    return !rg(a, b[0])
                }
            };
            if (G(b)) {
                if (b[0] in c) return c[b[0]](b.slice(1));
                g(Error("Not an operator"))
            }
            var c = b.dimension_id,
                d = zb(c),
                e = b.value;
            d || g(Error("No dimension type for dimension: " + c));
            var f = Yg[d];
            f || g(Error("Unknown dimension type: " + d));
            d = i;
            if (a.t.hasOwnProperty(c)) d = a.t[c];
            else try {
                var h = zb(c) || "",
                    l, n;
                B("dimensions", c) || g(Error("Unable to find dimension for id: " +
                    c));
                "custom_dimension" === h && g(Error("calculateDimensionValue called on custom dimension " + c));
                (l = {
                    browser: p(Z.u, Z),
                    browser_version: p(Z.u, Z),
                    behavior: p(Z.Ha, Z),
                    campaign: t(ag, "campaign"),
                    cookies: p(Z.I, Z),
                    custom_tag: p(Z.ia, Z),
                    default_behavior: p(Z.Ma, Z),
                    device: p(Z.K, Z),
                    event: p(Z.za, Z),
                    first_session: p(Z.Pa, Z),
                    has_ppid: p(Z.Wa, Z),
                    ip: p(Z.V, Z),
                    language: p(Z.U, Z),
                    list: p(Z.la, Z),
                    location: p(Z.L, Z),
                    query: p(Z.j, Z),
                    platform: p(Z.oa, Z),
                    referrer: p(Z.W, Z),
                    segment: p(Z.Xa, Z),
                    source_type: t(ag, "source_type"),
                    third_party_dimension: p(Z.Ua,
                        Z),
                    time_and_day: p(Z.getDate, Z),
                    url: p(Z.J, Z),
                    visitor: p(Z.ma, Z),
                    dynamic_customer_profile: p(Z.ja, Z)
                }[h]) && (n = l(Ab(c)));
                M("Visitor", "Got dimension (" + h + ") value " + c + ": " + u(n));
                d = n
            } catch (m) {
                M("Visitor", "Error: " + m.message)
            }
            return f(d, {
                value: e,
                match: b.match || "exact"
            })
        }

        function Ad(a) {
            var b = j;
            !O(a, "conditions") && !cc(a, "add_condition") ? (b = [cc(a, "audience_id")], b[0] || (b = O(a, "audiences") || []), b = Xa(b, function(a) {
                a = ub(a);
                return !a.conditions ? j : Zg(a.conditions)
            })) : (O(a, "uses_geotargeting") || cc(a, "uses_geotargeting")) && (b = $g.ip(k) || $g.location(k));
            b || M("Condition", "Not ready to test (geotargeting): " + a);
            return b
        }

        function Zg(a) {
            if (G(a)) return Xa(a.slice(1), Zg);
            var b = zb(a.dimension_id) || "";
            return (b = $g[b]) ? b(a) : j
        }
        var Fg = {
                browser: function(a) {
                    var b = Z.u();
                    return D(a.values, function(a) {
                        return Ig(b, {
                            value: a
                        })
                    })
                },
                code: function(a) {
                    return Ef(0, a)
                },
                cookies: function(a) {
                    for (var b = a.names || [], a = a.values || [], c, d = 0; d < b.length; d++)
                        if (c = b[d], Kg(Z.I(c), {
                                value: a[d] || i
                            })) return j;
                    return o
                },
                custom_tag: function(a) {
                    return D(a.values, function(a) {
                        return Mg(Z.ia(a.key), {
                            value: a.value
                        })
                    })
                },
                event: function(a) {
                    return D(a.values, function(a) {
                        return Z.za(a)
                    })
                },
                ip: function(a) {
                    var b = Z.V();
                    return D(a.values, t(Ng, b))
                },
                language: function(a) {
                    var b =
                        Z.U();
                    return D(a.values, function(a) {
                        return Qg(b, {
                            value: a
                        })
                    })
                },
                location: function(a) {
                    var b = Z.L();
                    return D(a.values, function(a) {
                        return Rg(b, {
                            value: a
                        })
                    })
                },
                query: function(a) {
                    return 0 === a.values.length ? j : D(a.values, function(a) {
                        return Sg(Z.j(a.key), {
                            value: a.value
                        })
                    })
                },
                referrer: function(a) {
                    return D(a.values, t(Tg, Z.Na()))
                },
                segment: function(a) {
                    var b = Z.pa();
                    return D(a.values, function(a) {
                        return Vg(ua(a, b))
                    })
                },
                url: Wg,
                visitor: function(a) {
                    var b = Z.ma();
                    return Xg(b, a)
                }
            },
            Yg = {
                browser: Ig,
                browser_version: function(a, b) {
                    var c =
                        b.value,
                        d = a.id,
                        e = a.version;
                    return 0 === c.indexOf(d) ? 0 === Hg(e, c.substr(d.length)) : o
                },
                behavior: function(a, b) {
                    try {
                        var c = fa(b.value),
                            d;
                        if (H(c.version)) {
                            !c.action && (!c.filters || 0 === c.filters.length) && g(Error('Audience spec must have an "action" field or at least one "filter" ' + u(c)));
                            var e = yg("gt", Y.b, 0),
                                f = [],
                                h = [];
                            c.action && (h.push(yg("eq", Y.e, c.action.value)), c.action.type && h.push(yg("eq", Y.g, c.action.type)));
                            if (c.time)
                                if ("last_days" === c.time.type) h.push({
                                    op: xg("lte"),
                                    args: [{
                                        op: "-",
                                        args: [{
                                            eval: "now"
                                        }, {
                                            field: [Y.b]
                                        }]
                                    }, {
                                        value: 864E5 * c.time.days
                                    }]
                                });
                                else if ("range" === c.time.type) {
                                var l;
                                var n = [c.time.start, c.time.stop];
                                G(n) ? l = {
                                    op: "between",
                                    args: [{
                                        field: [Y.b]
                                    }, {
                                        value: n[0] || +new Date(0)
                                    }, {
                                        value: n[1] || +new Date
                                    }]
                                } : (M("Rule builder", "rangeTimeComparison passed invalid range " + u(n)), l = k);
                                l && h.push(l)
                            } else M("Rule builder", 'Audience spec has bad "time" type', c.time.type);
                            e = {
                                op: "and",
                                args: h
                            };
                            c.count && f.push({
                                where: yg(c.count.comparator, "0", c.count.value),
                                from: {
                                    select: [{
                                        field: ug("count")
                                    }],
                                    where: e,
                                    aggregate: [Ag("count")]
                                }
                            });
                            c.filters && w(c.filters, function(a) {
                                var b = Cg(a.name, c.source),
                                    d, l;
                                if (a.modifier === "most_frequent") {
                                    d = Ag("count");
                                    l = ug("count")
                                } else if (a.modifier === "most_recent") {
                                    d = Ag("max", Y.b);
                                    l = ug("max", Y.b)
                                }
                                if (d) {
                                    var m = vg(b);
                                    f.push({
                                        where: yg(a.comparator, "0", a.value),
                                        from: {
                                            select: [{
                                                field: m
                                            }],
                                            where: e,
                                            groupBy: zg([b]),
                                            aggregate: [d],
                                            orderBy: [{
                                                field: l,
                                                direction: "DESC"
                                            }],
                                            limit: 1
                                        }
                                    })
                                } else h.push(yg(a.comparator, b, a.value))
                            });
                            if (c.pick) {
                                0 < f.length && g(Error('A "pick" clause must not be specified with "count" or "most_recent", "most_frequent" modifiers' +
                                    u(c)));
                                var m;
                                var r = c.pick,
                                    q = c.source;
                                l = {
                                    where: e
                                };
                                r.count && (l.limit = r.count);
                                if ("most_frequent" === r.modifier) {
                                    var F = Cg(r.name, q);
                                    m = J(l, {
                                        select: [{
                                            field: vg(F)
                                        }],
                                        groupBy: zg([F]),
                                        aggregate: [Ag("count")],
                                        orderBy: [{
                                            field: ug("count"),
                                            direction: "DESC"
                                        }]
                                    })
                                } else m = J(l, {
                                    orderBy: [{
                                        field: [Y.b],
                                        direction: "DESC"
                                    }]
                                });
                                d = [m]
                            } else d = 0 < f.length ? f : [{
                                where: e
                            }]
                        } else d = [c];
                        return Xa(d, function(b) {
                            return pg(b, a)
                        })
                    } catch (A) {}
                    return o
                },
                campaign: function(a, b) {
                    var c = b.value;
                    "string" === typeof c && ("regex" === b.match ? a = la(a) : c = Yf(c));
                    "none" === a && (a = k);
                    return Lg(c, b.match, a)
                },
                code: Ef,
                cookies: Kg,
                custom_dimension: function(a, b) {
                    var c = b.value;
                    return !H(c) ? H(a) : c == a
                },
                custom_tag: Mg,
                default_behavior: function(a, b) {
                    try {
                        var a = a || {},
                            c = fa(b.value);
                        return pg(c, [a])
                    } catch (d) {}
                    return o
                },
                device: function(a, b) {
                    var c = b.value;
                    return "unknown" !== a.id ? a.id === c : "tablet" === c ? "tablet" === a.type : "mobile" === c ? a.w && "tablet" !== a.type : "desktop" === c ? !a.w : o
                },
                event: aa(),
                first_session: aa(),
                ip: Ng,
                language: Qg,
                list: function(a, b) {
                    if (a === k || !H(a)) return o;
                    var c = b.value;
                    return !H(c) ? "" === a || a !== o : a.toString() === c
                },
                location: Rg,
                query: Sg,
                platform: function(a, b) {
                    var c = b.value.split("_"),
                        d = c[0],
                        c = c.slice(1);
                    return d === a.id ? 0 === c.length ? j : 1 < c.length ? 0 <= Hg(a.version, c[0]) && 0 >= Hg(a.version, c[1]) : 0 === Hg(a.version, c[0]) : o
                },
                referrer: Tg,
                segment: Vg,
                source_type: function(a, b) {
                    return b.value === a
                },
                time_and_day: function(a, b) {
                    var c, d, e;
                    c = b.value;
                    e = c.split("_");
                    3 !== e.length && g(Error("Invalid time and day string " + c));
                    c = e[0];
                    d = e[1];
                    e = e[2].split(",");
                    c = Dg(c);
                    d = Dg(d);
                    var f = 60 * a.getHours() +
                        a.getMinutes(),
                        h = "sunday monday tuesday wednesday thursday friday saturday".split(" ")[a.getDay()];
                    return f >= c && f <= d && -1 !== $.inArray(h, e)
                },
                third_party_dimension: function(a, b) {
                    return G(a) ? D(a, t(Lg, b.value, b.match)) : Lg(b.value, b.match, a)
                },
                url: Gg,
                visitor: Xg,
                dynamic_customer_profile: function(a, b) {
                    return a === k ? o : !!a[b.value]
                },
                has_ppid: aa()
            },
            $g = {
                ip: function() {
                    U("checkGeo");
                    return Z.V() !== k
                },
                location: function() {
                    U("checkGeo");
                    return Z.L() !== k
                },
                list: function(a) {
                    return Z.la(Ab(a.dimension_id) || "") !== k
                },
                dynamic_customer_profile: function(a) {
                    var b =
                        Z.ja();
                    return ab(b) && a.value in b
                }
            };

        function Lg(a, b, c) {
            var d = H(c) && c !== k,
                e = H(a) && a !== k;
            switch (b || (e ? "exact" : "exists")) {
                case "exists":
                    return d;
                case "exact":
                    return d && String(c) === a;
                case "substring":
                    return d && -1 !== String(c).indexOf(a);
                case "regex":
                    try {
                        return e && d ? Boolean(String(c).match(RegExp(a))) : o
                    } catch (f) {
                        return o
                    }
                case "range":
                    return a = a.split(":"), b = parseFloat(a[1]), c = parseFloat(c), c >= parseFloat(a[0]) && c <= b;
                default:
                    return o
            }
        };
        var ah = [function() {
            var a = jc();
            if ("ie" === a.aa) {
                try {
                    var b = Number(a.ba)
                } catch (c) {
                    return
                }
                7 > b && g(Error("IE is only supported on version 8+ (detected " + b + ")"));
                8 > b && ("windows" === a.platform.id && a.platform.version && E(["xp", "vista"], a.platform.version.toLowerCase())) && g(Error("IE7 is not supported"))
            }
        }, function() {
            return fa(u({
                a: 123
            }))
        }];

        function se(a, b, c) {
            var d;
            d = o === j;
            var c = c === j,
                e = o,
                f = Q(a);
            if (f && (c || !Eg(f))) {
                e = j;
                if (c && Eg(f))
                    for (c = 0; c < W.length; c++) W[c].H === f && W.splice(c, 1);
                W.push({
                    H: f,
                    id: a,
                    source: b
                });
                d && (T = T || [], T.push(f));
                oe[f] = j;
                pe();
                M("Plan", "Added experiment " + f + " and variation id " + a + " to the plan, source is " + b, j)
            }
            return e
        }

        function Eg(a) {
            return a in ne || a in oe
        }

        function md(a) {
            var b = [],
                c = !H(a),
                a = a || [];
            w(W, function(d) {
                (c || E(a, d.H)) && b.push(d.id)
            });
            return b
        }

        function zf(a) {
            var b;
            if (b === j || !Eg(a)) ne[a] = j, pe()
        }

        function Gd() {
            var a = {};
            w(Ne, function(b, c) {
                a[b] = c
            });
            w(W, function(b) {
                var c = Q(b.id);
                a[c] = b.id
            });
            w(ne, function(b) {
                a[b] = "0"
            });
            w(B("blacklisted_experiments") || {}, function(b) {
                b in a && delete a[b]
            });
            y("optimizelyBuckets", u(a), Ua)
        }

        function pe() {
            w(bh, function(a) {
                a()
            })
        }

        function ch(a, b, c, d) {
            if (-1 !== a.indexOf("_optimizely_redirect")) b.push({
                code: a,
                type: "code forced (redirect)",
                variationId: d
            });
            else {
                for (var a = a.split("\n"), e = o, f = o, h = [], l = []; 0 < a.length;) {
                    var n = eb(a.shift()),
                        m = 0 < l.length;
                    if (n)
                        if (Boolean(n.match(/_optimizely_evaluate\s{0,9}=\s{0,9}force/i))) f = j;
                        else if (Boolean(n.match(/_optimizely_evaluate\s{0,9}=\s{0,9}safe/i)) || Boolean(n.match(/_optimizely_evaluate\s{0,9}=\s{0,9}end_force/i))) f = o;
                    else if (Boolean(n.match(/_optimizely_evaluate\s{0,9}=\s{0,9}editor_only/i))) e =
                        j;
                    else if (Boolean(n.match(/_optimizely_evaluate\s{0,9}=\s{0,9}end_editor_only/i))) e = o;
                    else if (!dh.exec(n) && !e)
                        if (f) h.push(n);
                        else {
                            if (!m) {
                                var r = eh.exec(n),
                                    q = [];
                                r ? (q.push(r[1].replace(/^['"]|['"]$/g, "")), (r = fh.exec(n)) && 4 < r.length && q.push(r[4]), c.push({
                                    code: n,
                                    selector: q,
                                    type: "safe jquery",
                                    waitUntilSelectorReady: j,
                                    variationId: d
                                })) : m = j
                            }
                            m && l.push(n)
                        }
                }
                0 < h.length && b.push({
                    code: h.join("\n"),
                    type: "forced evaluation",
                    variationId: d
                });
                0 < l.length && c.push({
                    code: l.join("\n"),
                    type: "safe non-jquery",
                    waitUntilDocumentReady: j,
                    variationId: d
                })
            }
        }

        function gh(a, b, c) {
            for (var d = {
                    values: []
                }, e = 0, f = a.length; e < f; e++) d.values.push({
                value: a[e],
                match: b[e] || c
            });
            return d
        }
        var bh = [],
            Ne = {},
            ne = {},
            fh = /^\$j?\(['"](.+?)['"]\)\.detach\(\)\.(appendTo|insertAfter|insertBefore|prependTo)\(['"](.+?)['"]\);(?:\s|(?:\/\/.*|\/\*(?:[^*]|\*(?!\/))*\*\/))*$/,
            dh = /^(?:\s|(?:\/\/.*|\/\*(?:[^*]|\*(?!\/))*\*\/))*$/,
            eh = /^\$j?\((['"].+?['"]|document)\)\..+;(?:\s|(?:\/\/.*|\/\*(?:[^*]|\*(?!\/))*\*\/))*$/,
            oe = {},
            W = [];

        function hh(a) {
            Uf = {};
            Sf(a)
        };

        function ih(a, b) {
            if (a && b)
                if (jh) M("Evaluator", "Bound event " + b + " to selector " + a), kh(a, b);
                else {
                    var c = {
                        eventName: b,
                        selector: a,
                        type: "event '" + b + "' (click goal)",
                        waitUntilSelectorReady: j
                    };
                    M("Evaluator", "Add step to bind event " + c.eventName + " to selector " + c.selector);
                    lh.push(c)
                }
        }

        function Fd(a, b) {
            if (C) {
                G(a) ? mh(a) : (a = [], mh(b));
                a = a.concat(T);
                T = [];
                for (var c = 0; c < a.length; c++) E(ld, a[c]) || ld.push(a[c]);
                c = a;
                c === i ? c = [] : bb(c) && (c = [c]);
                for (var d = md(c), e = [], f = [], h = [], l = [], n = K(wb(), function(a) {
                        return a.experiments ? o : Wg(a.url_conditions || [])
                    }), m = 0, r = n.length; m < r; m++) {
                    var q = {
                        eventName: n[m].event_name,
                        selector: n[m].selector,
                        type: "event '" + n[m].event_name + "' (click goal)",
                        waitUntilSelectorReady: j
                    };
                    "revenue" in n[m] && (q.revenue = n[m].revenue);
                    e.push(q)
                }
                w(c, function(a) {
                    var b = {},
                        c = O(a, "events") || {};
                    w(c, function(a, c) {
                        b[a] = [c]
                    });
                    var c = K(wb(), function(b) {
                            return "experiments" in b ? a in b.experiments : o
                        }),
                        d = 0;
                    for (; d < c.length; d++) {
                        var m = c[d];
                        b[m.selector] || (b[m.selector] = []);
                        b[m.selector].push({
                            eventName: m.event_name,
                            revenue: m.revenue,
                            experimentIds: m.experiments
                        })
                    }
                    w(b, function(b, c) {
                        w(c, function(c) {
                            e.push({
                                eventName: c.eventName,
                                experimentIds: c.experimentIds,
                                revenue: c.revenue,
                                selector: b,
                                type: "event '" + c.eventName + "' (experiment " + a + ")",
                                waitUntilSelectorReady: j
                            })
                        })
                    });
                    var n = O(a, "css") || "";
                    n && h.push({
                        code: function() {
                            $("body").append("<style>" +
                                n + "</style>")
                        },
                        selector: "body",
                        type: "global css (experiment " + a + ")",
                        waitUntilSelectorReady: j
                    });
                    if (c = O(a, "steps")) {
                        w(c.forced, function(a) {
                            f.push(a)
                        });
                        w(c.safe, function(a) {
                            l.push(a)
                        })
                    } else(c = O(a, "code") || "") && ch(c, f, l)
                });
                w(d, function(a) {
                    var b = B("variations", a, "pages");
                    if (b) w(b, function(a) {
                        if (a.steps && (!a.includes || Wg({
                                values: a.includes
                            })) && (!a.excludes || !Wg({
                                values: a.excludes
                            }))) {
                            f.push.apply(f, a.steps.forced);
                            l.push.apply(l, a.steps.safe)
                        }
                    });
                    else {
                        for (var b = Tb(a), b = b.split("\n"), c = [], d = j, e = 0, h = b.length; e <
                            h; e++) {
                            var m = $.trim(b[e]);
                            if (m === "/* _optimizely_variation_url_end */") d = j;
                            else if (m !== "") {
                                var n = Ga.exec(m);
                                if (n && n.length === 13) {
                                    var q = n[2] ? n[2].split(" ") : [],
                                        m = n[4] ? n[4].split(" ") : [],
                                        r = n[6] ? n[6] : "substring",
                                        df = n[8] ? n[8].split(" ") : [],
                                        n = n[10] ? n[10].split(" ") : [];
                                    if (q.length > 0) {
                                        d = gh(q, df, r);
                                        d = Wg(d)
                                    }
                                    if (d && m.length > 0) {
                                        d = gh(m, n, r);
                                        d = !Wg(d)
                                    }
                                } else d && c.push(m)
                            }
                        }
                        b = c.join("\n");
                        ch(b, f, l, a)
                    }
                });
                c = [];
                c.push.apply(c, f);
                c.push.apply(c, h);
                c.push.apply(c, l);
                c.push.apply(c, e);
                lh.push.apply(lh, c);
                nh()
            }
        }

        function nh() {
            var a = o;
            oh = k;
            for (M("Evaluator", ph + " times waited"); !a && 0 < lh.length;) {
                M("Evaluator", lh.length + " steps remaining");
                var b = lh.shift(),
                    c = b,
                    a = o;
                if (c.waitUntilDocumentReady && !jh) M("Evaluator", "Document not ready yet"), a = j;
                else if (c.waitUntilSelectorReady && !jh && (c = c.selector))
                    for (var c = G(c) ? c : [c], d = 0; d < c.length; d++) {
                        var e = c[d];
                        if (!(e === k || e === i || !e.length))
                            if (0 === ("document" == e ? $(document) : $(e)).length) M("Evaluator", "'" + e + "' not found"), a = j
                    }
                a ? lh.unshift(b) : b.eventName ? (qh(), M("Evaluator", "Bound event " +
                    b.eventName + " to selector " + b.selector), c = {}, b.revenue && (c = {
                    Q: b.revenue,
                    S: b.experimentIds
                }), kh(b.selector, b.eventName, c)) : b.code && (M("Evaluator", "Run code: " + b.code.toString()), rh(b.code, b.variationId))
            }
            a ? (oh = setTimeout(nh, 0 === ph ? 10 : 50), ph++) : (M("Evaluator", ph + " total times waited"), qh())
        }

        function Jg(a) {
            return "string" === typeof a ? eval(a) : a()
        }

        function qh() {
            U("flash");
            0 < yd.length || U("flashGeo")
        }

        function rh(a, b) {
            if (a) {
                var c = o,
                    d;
                "string" === typeof a ? (d = a, c = j) : d = a.toString();
                if (od(d))
                    if (M("Evaluator", "Redirect detected"), Zd(d)) {
                        M("Evaluator", "OK to redirect");
                        var e = Yd(d);
                        M("Evaluator", "setting a redirect cookie" + (b ? " for variation: " + b : ""));
                        y("optimizelyRedirect", (b || "unknown variation") + "|" + (e ? "true" : "false"), 5);
                        $d()
                    } else {
                        M("Evaluator", "NOT OK to redirect");
                        return
                    }
                c && eval("var $j = $;");
                try {
                    if (od(d)) {
                        $("head").append("<style type='text/css'>body{display:none;visibility:hidden;}</style>");
                        M("Evaluator",
                            "Hiding body before redirect");
                        var f = be.test(d) || ae.test(d) || ce.test(d),
                            h = /_keep_body_hidden=(\S+)/.test(d);
                        f || h ? M("Evaluator", "Standard redirect detected - Will not unhide body.") : setTimeout(function() {
                            if (document.body) {
                                document.body.style.visibility = "visible";
                                document.body.style.display = "block";
                                M("Evaluator", "Unhiding body -- did not redirect");
                                U("bodyUnhidden")
                            }
                        }, 1700)
                    }
                    Jg(a)
                } catch (l) {
                    c = Qa, Qa = j, M("Evaluator", "Error: " + l.message), M("Evaluator", "Code: " + d), Qa = c, M("Evaluator", "Failed to run code: " +
                        l.message)
                }
            }
        }

        function kh(a, b, c) {
            c = c || {};
            if (!sh[a] || !sh[a][b]) {
                var d = function() {
                        Hd(b, "custom", c)
                    },
                    e = $(a);
                if (0 < e.length) {
                    var f = function() {
                            e.unbind("touchend", d);
                            e.unbind("touchmove", f);
                            e.unbind("mousedown", d)
                        },
                        h = function() {
                            f();
                            e.bind("touchmove", f);
                            e.bind("touchend", d)
                        };
                    e.bind("mousedown", d);
                    e.bind("touchstart", h)
                } else e = $("html"), f = function() {
                    e.undelegate(a, "touchend", d);
                    e.undelegate(a, "touchmove", f);
                    e.undelegate(a, "mousedown", d)
                }, e.delegate(a, "touchstart", function() {
                    f();
                    e.delegate(a, "touchend", d);
                    e.delegate(a,
                        "touchmove", f)
                }), e.delegate(a, "mousedown", d);
                sh[a] || (sh[a] = {});
                sh[a][b] = "mousedown touchstart"
            }
        }

        function th(a) {
            uh = a
        }

        function mh(a) {
            a || (a = Eb());
            for (var b = 0; b < a.length; b++) P(a[b])
        }
        var sh = {},
            ld = [],
            T = T || [],
            uh = 0,
            jh = o,
            lh = [],
            oh = k,
            ph = 0;
        $(function() {
            setTimeout(function() {
                U("docReady");
                jh = j;
                oh !== k && (M("Evaluator", "Document is ready"), clearTimeout(oh), 0 < uh ? setTimeout(nh, uh) : nh())
            }, 50)
        });

        function Og(a) {
            this.Ca = $.trim(a);
            a = vh(this.Ca);
            a === k && g(Error("Invalid CIDR specification"));
            this.Y = a.Y;
            this.X = a.X
        }

        function vh(a) {
            a = a.split("/");
            if (2 != a.length) return k;
            var b = parseInt(a[1], 10);
            if (isNaN(b) || 0 > b || 32 < b) return k;
            a = Pg(a[0]);
            if (a === k) return k;
            if (0 > b || 32 < b) b = k;
            else {
                for (var c = [], d = 0; 4 > d; d++) c[d] = 0;
                for (var e = Math.floor(b / 8), d = 0; d < e; d++) c[d] = 255;
                4 > e && (c[e] = wh[b % 8]);
                b = c
            }
            for (c = 0; 4 > c; c++) a[c] &= b[c];
            return {
                Y: a,
                X: b
            }
        }

        function Pg(a) {
            a = a.split(".");
            if (4 != a.length) return k;
            for (var b = [], c = 0; 4 > c; c++) {
                var d;
                d = a[c];
                if (3 < d.length) d = k;
                else {
                    var e = parseInt(d, 10);
                    d = isNaN(e) || d !== e.toString() || 0 > e || 255 < e ? k : e
                }
                if (d === k) return k;
                b[c] = d
            }
            return b
        }
        var wh = [0, 128, 192, 224, 240, 248, 252, 254, 255];

        function Ug(a, b, c) {
            var d = a.split("?");
            if (d[1]) {
                var e = [];
                $.each(d[1].split("&"), function() {
                    0 !== this.indexOf(xh) && e.push(this)
                });
                d[1] = e.join("&");
                a = d.join("?")
            }
            switch (c) {
                case "exact":
                    return a = yh(a), a === yh(b);
                case "regex":
                    try {
                        return Boolean(a.match(b))
                    } catch (f) {
                        return o
                    }
                case "simple":
                    return a = yh(zh(a)), b = yh(zh(b)), a === b;
                case "substring":
                    return a = yh(a, j), b = yh(b, j), -1 !== a.indexOf(b);
                default:
                    return o
            }
        }

        function zh(a) {
            var b = a.indexOf("?"); - 1 !== b && (a = a.substring(0, b));
            b = a.indexOf("#"); - 1 !== b && (a = a.substring(0, b));
            return a
        }

        function yh(a, b) {
            var a = a.replace("/?", "?"),
                a = a.toLowerCase().replace(/[/&?]+$/, ""),
                c = Bh.slice(0);
            b || (c = c.concat(Ch));
            for (var d = c.length, e = 0; e < d; e++) a = a.replace(RegExp("^" + c[e]), "");
            return a
        }
        var Bh = ["https?://.*?.?optimizelyedit.(com|test)/", "https?://.*.?optimizelypreview.(com|test)/", "https?://(edit|preview)(-hrd|-devel)?.optimizely.(com|test)/", "https?://.*?.?optimizelyedit(-hrd)?.appspot.com/", "https?://"],
            Ch = ["www."],
            xh = "optimizely_";

        function Dh(a) {
            return function(b) {
                if ("object" === typeof b && Ih()) {
                    var c = k,
                        d;
                    for (d in b) b.hasOwnProperty(d) && (c = a.call(this, d, b[d]));
                    return c
                }
                return a.apply(this, arguments)
            }
        }

        function Ih() {
            for (var a in {}) return j;
            return o
        };

        function Jh() {
            if (!Fa) {
                var a = $;
                a.fn.attr = Dh(a.fn.attr);
                a.fn.css = Dh(a.fn.css);
                a.fn.extend = Dh(a.fn.extend);
                var b = a.each;
                a.each = function(c, d, e) {
                    if (!(c.length === i || a.isFunction(c)) || !Ih()) b.apply(this, arguments);
                    else if (e)
                        for (var f in c) {
                            if (c.hasOwnProperty(f) && d.apply(c[f], e) === o) break
                        } else
                            for (f in c)
                                if (c.hasOwnProperty(f) && !d.call(c[f], f, c[f]) === o) break;
                    return c
                };
                var c = a.fn.Za,
                    d = function(a, b, d) {
                        return new c(a, b, d)
                    },
                    e, f = document.getElementsByClassName;
                if (!Rf(f)) var f = (window.optimizely || {}).getElementsByClassName,
                    h = (window.optly || {}).getElementsByClassName,
                    f = Rf(f) ? f : Rf(h) ? h : k;
                e = f;
                a.fn.Za = function(b, c, f) {
                    var h = d,
                        l = document.getElementsByClassName;
                    !Rf(l) && e && (h = function(a, b, c) {
                        document.getElementsByClassName = e;
                        a = d(a, b, c);
                        document.getElementsByClassName = l;
                        return a
                    });
                    if (!("string" === typeof b && c && "object" === a.type(c) && Ih())) return h(b, c, f);
                    b = h(b, i, f);
                    b.attr(c);
                    return b
                }
            }
            M("Main", "Started, revision " + B("revision"));
            try {
                var l = [];
                w(ah, function(a) {
                    try {
                        a()
                    } catch (b) {
                        l.push(b.message)
                    }
                });
                0 < l.length && g(Error("Feature(s) not supported: " +
                    l.join("; ")))
            } catch (n) {
                M("Main", "Disabling: " + n.message);
                return
            }
            var f = Pf(),
                h = o,
                m;
            for (m in f)
                if (Qf.exec(m)) {
                    h = j;
                    break
                }("true" === f.opt_out || "false" === f.opt_out) && he("true" === f.opt_out);
            Ja = "true" === f.force_tracking;
            if ("true" === f.disable || "true" === f.opt_out || ef()) C = o;
            Ka = "true" === f.editor;
            La = "true" === f.p13n;
            Pa = "true" === f.show_preview;
            (m = v("optimizelyToken")) && y("optimizelyToken", m, 15);
            m = f.token || m;
            /^[0-9a-f]{64}$/.test(m) ? Na = m : /^[0-9a-f]{32}$/.test(m) ? (M("Query", "Using legacy MD5 token"), Na = m) : (Aa("optimizelyToken",
                Ba()), M("Query", "Blocked request to load unsafe script: " + m));
            Qa = "true" === f.log;
            Ra = "true" === f.verbose;
            z = !(Pa || h) || Ja;
            "false" === f.client && (C = o, Ha = "js/" + Qb() + ".js");
            if (La) M("Main", "Disabling because personalization editor flag is set."), db("https://" + Yb() + "/js/innie.js?_=" + +new Date);
            else if (fe(), ef()) M("Main", "Disabling because opted out"), zc();
            else if (Na) {
                if (!window.optimizelyPreview) {
                    if (!window.optimizely || !window.optimizely.unshift) window.optimizely = [];
                    window.optimizely.unshift(["verifyPreviewProject",
                        Qb()
                    ]);
                    db([Of, "/js/preview/", Na, ".js"].join(""), j);
                    Pa && Nf('Loading Preview<br /><img alt="loading" src="//' + Yb() + '/static/img/loading-32.gif" style="padding-top:20px; width: 32px; margin: 0 auto;" />')
                }
            } else if (Pa && !Na) Nf("This preview link has expired. Please return to Optimizely and preview again to get a new link.");
            else {
                if (C && (m = B("project_js"))) M("Evaluator", "Running project level javascript."), rh(m);
                fe();
                if (C) {
                    m = v("optimizelyEndUserId");
                    uc = m !== i && m !== k;
                    a: {
                        m = "googlebot;yahoo! slurp;bingbot;bingpreview;msnbot;keynote;ktxn;khte;gomezagent;alertsite;yottaamonitor;pingdom.com_bot;aihitbot;baiduspider;adsbot-google;mediapartners-google;applebot".split(";");
                        f = navigator.userAgent;f = f.toLowerCase();
                        for (h = 0; h < m.length; h++)
                            if (-1 !== f.indexOf(m[h])) {
                                m = j;
                                break a
                            }
                        m = o
                    }
                    m ? z = o : uc || ib.set("first_session", j)
                }
                if (m = N.get("asyncInfo")) pc("asyncInfo") || qc(m), N.set("asyncInfo", k);
                (m = pc("asyncInfo")) && w(m, Fc);
                if (B("uses_list_targeting")) {
                    m = "https://odds.optimizely.com/js/geo2.js";
                    var r = {};
                    w(Pb(), function(a, b) {
                        var c = Nc(b);
                        typeof c === "string" && (r[b] = c)
                    });
                    r.project = Qb().toString();
                    var f = [],
                        q;
                    for (q in r) r.hasOwnProperty(q) && f.push(encodeURIComponent(q) + "=" + encodeURIComponent(r[q]));
                    f.length && (m += "?" + f.join("&"));
                    db(m)
                }
                B("uses_dynamic_customer_profile_targeting") && (Lf(), q = Ff(), !q.q || !q.q.datasourceId ? (M("DCP", "No Optimizely datasource found in data."), q = k) : (m = q.q.datasourceId, f = q.q.id, m = I([Qb().toString(), m, f], encodeURIComponent), m = ["https://vis.optimizely.com/api/targetingEmbed"].concat(m).join("/"), f = (Pc.get() || {}).aliases || {}, Mf(q.z, f) || (q = I(q.z, function(a) {
                    return encodeURIComponent(a.datasourceId) + "=" + encodeURIComponent(a.id)
                }), m += "?" + q.join("&")), q = m), q !== k && db(q));
                (B("dcp_service_id") ||
                    k) !== k && setTimeout(function() {
                    var a = B("dcp_service_id") || k;
                    if (a !== k) {
                        var b = Ff();
                        if (b.q)
                            if (b.z.length === 0) M("DCP", "Must specify at least one non-Optimizely datasource to alias");
                            else if (Lf()) {
                            var a = I([a, b.q.datasourceId, b.q.id], encodeURIComponent).join("/"),
                                c = b.z;
                            try {
                                var d = new XMLHttpRequest;
                                d.open("POST", ["https://vis.optimizely.com/api/alias", a].join("/"));
                                if ("withCredentials" in d) d.withCredentials = j;
                                d.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                                var e = {};
                                w(c, function(a) {
                                    e[a.datasourceId] =
                                        a.id
                                });
                                d.onerror = function() {
                                    M("DCP", "Failed to POST alias request")
                                };
                                d.onload = function() {
                                    if (d.status >= 200 && d.status < 300) {
                                        var a = Pc.get() || {},
                                            b = a.aliases || {},
                                            b = b || {};
                                        w(c, function(a) {
                                            b[a.datasourceId] = a.id
                                        });
                                        a.aliases = b;
                                        Pc.set(a)
                                    } else M("DCP", "Alias POST failed with", d.statusText)
                                };
                                d.send(u({
                                    data: e
                                }))
                            } catch (f) {
                                M("DCP", "Exception %s trying to POST alias request", f)
                            }
                        } else M("DCP", "Duplicate alias request; skipping.");
                        else M("DCP", "Must specify Optimizely datasource in alias")
                    }
                }, 0);
                if (q = v("optimizelyBuckets")) {
                    try {
                        q =
                            fa(q)
                    } catch (F) {
                        q = {}
                    }
                    var A = {};
                    w(q, function(a, b) {
                        var b = String(b),
                            c = Q(b);
                        if (Nb(c).length > 1 && b.indexOf("_") === -1) {
                            A[c] = A[c] || {};
                            A[c][a] = b
                        } else b !== "0" ? se(b, "cookie") || (Ne[a] = b) : zf(a)
                    });
                    w(A, function(a, b) {
                        var c;
                        a: {
                            c = [];
                            for (var d = Nb(a), e = 0; e < d.length; e++) {
                                var f = b[d[e]];
                                if (f === "0") {
                                    c = "";
                                    break a
                                }
                                c.push(f)
                            }
                            c = c.join("_")
                        }
                        c.length > 0 ? se(c, "cookie") : zf(a)
                    })
                }
                Sf();
                nd = (v("optimizelyRedirect") || "|").split("|")[0];
                q = v("optimizelyReferrer");
                q !== k && (Uc = 0 == q.length ? "" : q, y("optimizelyReferrer", ""));
                q = Tf;
                M("Visitor", "Initializing");
                (m = v("optimizelyAudiences")) && 0 < m.length && w(m.split(","), p(function(a) {
                    sg(this, a, j, {
                        O: j,
                        wa: o
                    })
                }, q));
                w($f(), p(function(a) {
                    M("Visitor", "Found segment " + a);
                    var b = Ib()[a];
                    if (b && b.audience_id) {
                        M("Visitor", "Adding to audience " + b.audience_id);
                        sg(this, b.audience_id, j, {
                            C: o
                        })
                    } else if (b && b.dimension_id) {
                        M("Visitor", "Setting dimension value " + b.dimension_id);
                        tg(this, b.dimension_id, Uf[a], o)
                    }
                }, q));
                V = Tf;
                de = o;
                Vf.push(zd);
                bh.push(zd);
                q = {
                    $: $,
                    activeExperiments: ld || [],
                    allExperiments: Jb(),
                    all_experiments: Jb(),
                    allVariations: B("variations") || {},
                    data: X,
                    getElementsByClassName: document.getElementsByClassName,
                    revision: B("revision"),
                    variationIdsMap: De,
                    variation_map: Ee,
                    variationMap: Ee,
                    variationNamesMap: Fe
                };
                m = {};
                var ba = Ya(je, [m, Pe]);
                J(m, {
                    activate: t(rd, V),
                    activateGeoDelayedExperiments: t(ud, V),
                    activateSiteCatalyst: Rc,
                    activateUniversalAnalytics: ed,
                    addOAuthClientId: we,
                    addToAudience: p(V.D, V),
                    addToSegment: le,
                    bindTrackElement: ih,
                    bucketUser: sd,
                    bucketVisitor: sd,
                    clickTaleRecord: hd,
                    clickTalePlayback: fd,
                    customTag: ye,
                    delayDomReadyEval: th,
                    delayPageviewTracking: Ie,
                    disable: ge,
                    log: Bc,
                    getAccountId: tb,
                    getProjectId: Qb,
                    googleAnalyticsCustomVariableScope: Xc,
                    integrationPrefix: id,
                    optOut: he,
                    overrideUrl: vc,
                    push: ba,
                    removeFromAllAudiences: p(V.cb, V),
                    removeFromAllSegments: Be,
                    removeFromAudience: p(V.Z, V),
                    removeFromSegment: ze,
                    sc_activate: Rc,
                    sc_svar: jd,
                    skipPageTracking: Ke,
                    optOutThirdPartyCookies: Je,
                    setDimensionValue: p(V.B, V),
                    setUserId: Me,
                    storeThirdPartyData: ke,
                    timeout: ge,
                    trackEvent: Oe,
                    verbose: Cc
                });
                B("slave") && J(m, {
                    get: ue
                });
                m.removeFromReportableAudiences = Le;
                J(q, m);
                m = window.optimizely;
                G(m) && w(m, function(a) {
                    ba(a)
                });
                window.optimizely = q;
                U("apiInitialize");
                window.optimizely.iapi = {
                    evaluateSegments: t(hh, i)
                };
                var pa = !B("force_variation");
                q = Pf();
                w(q, function(a, b) {
                    var c = Qf.exec(a);
                    if (c)
                        if (pa) {
                            Oa = j;
                            x("Query", "Ignored parameter %s", a)
                        } else {
                            c = c[1];
                            sd(c, b, j);
                            Lb(c) ? Cf(c, {
                                force: j,
                                skipPageviewTracking: j
                            }) : Bd(c, {}) || rd(V, c, {
                                force: j,
                                skipPageviewTracking: j
                            })
                        }
                });
                Oa ? Nf("Force parameters are disabled for this project. See Project Code Settings.") : (Jh.log(), Ka && db("https://" + Yb() + "/js/innie.js?_=" + +new Date),
                    C && (U("distributeExperiments"), w(Eb(), function(a) {
                        if (!ua(a, T))
                            if (Lb(a)) Cf(a);
                            else if (Ad(a)) {
                            if (Bd(a, {
                                    objectType: "experiment"
                                })) {
                                M("Distributor", "Going to distribute " + P(a));
                                if (Ed(a)) {
                                    T = T || [];
                                    T.push(a)
                                }
                            }
                        } else !Kb(a) && !E(ld, a) && Cd(a)
                    }), Gd(), Ue(), Ta || (0 < Ia ? setTimeout(function() {
                        Ye()
                    }, Ia) : Ye()), Te(), Zc()), Qa && (w(ne, function(a) {
                        var b = Mb(a);
                        M("Plan", "Ignore experiment '" + b + "' (" + a + ")")
                    }), w(W, function(a) {
                        var b = Q(a.id),
                            c = Wb(a.id);
                        M("Plan", P(b) + ' in variation "' + c + '" (' + a.id + ")")
                    })), Ka ? te() : C && (U("beginEvaluate"),
                        Fd(), te(), zc(), !B("installation_verified") && z && (q = "https://" + Yb() + "/account/snippet_installed?project_id=" + Qb() + "&wxhr=true", M("Tracker", "Making snippet verification request."), bd(q, k))), setTimeout(function() {
                        ud(V)
                    }, 2E3), setTimeout(function() {
                        if (z) {
                            var a = tf;
                            if (a.Ya) {
                                var b = Va(),
                                    c = Wa(),
                                    d = Qb(),
                                    e = uf,
                                    f = sf,
                                    h = wf,
                                    l = dc(),
                                    m = ld.concat(T).length,
                                    n = qf().length,
                                    q;
                                q = pc("events") || [];
                                var r = pc("event_queue") || [];
                                q = u(q).length + u(r).length;
                                var A;
                                a: {
                                    try {
                                        A = window.optimizely.get("behavior").getEvents()[0].timestamp;
                                        break a
                                    } catch (F) {}
                                    A =
                                    i
                                }
                                A = !A ? 0 : (new Date).getTime() - A.getTime();
                                for (var r = ve.slice(), sa = r.length - 1; sa > 0; sa--) {
                                    var ba = Math.floor(Math.random() * (sa + 1)),
                                        pa = r[sa];
                                    r[sa] = r[ba];
                                    r[ba] = pa
                                }
                                for (sa = r.join(","); sa.length > 64;) {
                                    r.pop();
                                    sa = r.join(",")
                                }
                                var b = {
                                        user: b,
                                        ppid: c,
                                        project: d,
                                        sync: e,
                                        timebase: f,
                                        render: h,
                                        sampleRate: l,
                                        numExps: m,
                                        numBehaviorEvents: n,
                                        behaviorEventsSize: q,
                                        oldestBehaviorEventAge: A,
                                        integrationOAuthClientIds: sa,
                                        codeVersion: B("version"),
                                        hasSlave: !!B("slave"),
                                        docVisibilityState: document.Ab || document.webkitVisibilityState,
                                        wxhr: j
                                    },
                                    ta;
                                a: {
                                    c = k;
                                    try {
                                        ta = K(window.performance.getEntries(), function(a) {
                                            return !!yf.test(a.name)
                                        })[0]
                                    } catch (Kh) {
                                        ta = c;
                                        break a
                                    }
                                    if (ta) {
                                        var c = {},
                                            Bb;
                                        for (Bb in ta) typeof ta[Bb] === "number" && ta[Bb] !== 0 && (c[Bb] = ta[Bb])
                                    }
                                    ta = c
                                }
                                J(b, ta || {});
                                J(b, a.n);
                                var Ah = ["optimizelyAudiences", "optimizelyBuckets", "optimizelyCustomEvents", "optimizelyPendingLogEvents", "optimizelyReferrer", "optimizelySegments"],
                                    Ld = {},
                                    Md = 0,
                                    Nd = 0;
                                w(ka(), function(a) {
                                    if (a.name.indexOf("optimizely") === 0) {
                                        if (E(Ah, a.name)) {
                                            M("RUM", "Cookie size for " + a.name +
                                                ": " + a.P.length);
                                            Ld[a.name + "Len"] = a.P.length
                                        }
                                        Md = Md + a.P.length
                                    }
                                    Nd = Nd + a.P.length
                                });
                                J(Ld, {
                                    allOptimizelyCookiesLen: Md,
                                    allCookiesLen: Nd
                                });
                                J(b, Ld || {});
                                var gg = {};
                                w(N.ua() || {}, function(a, b) {
                                    gg["ls" + a] = b
                                });
                                J(b, gg);
                                var a = [],
                                    Ac;
                                for (Ac in b) Object.prototype.hasOwnProperty.call(b, Ac) && a.push(window.encodeURIComponent(Ac) + "=" + window.encodeURIComponent(b[Ac]));
                                bd("https://rum.optimizely.com/rum?" + a.join("&"), k)
                            }
                        }
                    }, 3E3), M("Main", "End of main"), U("mainEnd"))
            }
        }
        Jh.log = function() {
            M("Info", "Is enabled: " + C);
            M("Info", "Diagnostic enabled: false");
            M("Info", "Force variation enabled: " + !!B("force_variation"));
            M("Info", "Script to load: " + (Ha || "none"));
            M("Info", "Browser type: " + kc());
            M("Info", "Browser version: " + lc());
            var a = rc();
            "unknown" !== a && M("Info", "Mobile browser type: " + a);
            M("Info", "New vs returning: " + tc());
            M("Info", "Source type: " + Zf());
            M("Info", "User ID: " + Va())
        };
        Jh();
    };
    var SLAVE_CLIENT = {
        optimizely: []
    };
    optimizelyCode();
    optly.Cleanse.finish();

}());