/* 20150518 0712 */
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/
/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/
(function() {
    eval("var djConfig = {locale:\"en-us\",ibmForceConfig:\"production\",isDebug:false,parseOnLoad:false,baseUrl:\"./\",modulePaths:{\"ibmweb\":\"//webdev.webmaster.ibm.com/common/js/dojo/1.6/ibmweb\",\"ext\":\"//webdev.webmaster.ibm.com/common/js/dojo/1.6/ext\"},useXDomain:true,xdWaitSeconds:15,xdDojoPath:\"//webdev.webmaster.ibm.com/common/js/dojo/1.6\"};");
    var _1 = null;
    if ((_1 || (typeof djConfig != "undefined" && djConfig.scopeMap)) && (typeof window != "undefined")) {
        var _2 = "",
            _3 = "",
            _4 = "",
            _5 = {},
            _6 = {};
        _1 = _1 || djConfig.scopeMap;
        for (var i = 0; i < _1.length; i++) {
            var _7 = _1[i];
            _2 += "var " + _7[0] + " = {}; " + _7[1] + " = " + _7[0] + ";" + _7[1] + "._scopeName = '" + _7[1] + "';";
            _3 += (i == 0 ? "" : ",") + _7[0];
            _4 += (i == 0 ? "" : ",") + _7[1];
            _5[_7[0]] = _7[1];
            _6[_7[1]] = _7[0];
        }
        eval(_2 + "dojo._scopeArgs = [" + _4 + "];");
        dojo._scopePrefixArgs = _3;
        dojo._scopePrefix = "(function(" + _3 + "){";
        dojo._scopeSuffix = "})(" + _4 + ")";
        dojo._scopeMap = _5;
        dojo._scopeMapRev = _6;
    }(function() {
        if (typeof this["loadFirebugConsole"] == "function") {
            this["loadFirebugConsole"]();
        } else {
            this.console = this.console || {};
            var cn = ["assert", "count", "debug", "dir", "dirxml", "error", "group", "groupEnd", "info", "profile", "profileEnd", "time", "timeEnd", "trace", "warn", "log"];
            var i = 0,
                tn;
            while ((tn = cn[i++])) {
                if (!console[tn]) {
                    (function() {
                        var _8 = tn + "";
                        console[_8] = ("log" in console) ? function() {
                            var a = Array.apply({}, arguments);
                            a.unshift(_8 + ":");
                            console["log"](a.join(" "));
                        } : function() {};
                        console[_8]._fake = true;
                    })();
                }
            }
        }
        if (typeof dojo == "undefined") {
            dojo = {
                _scopeName: "dojo",
                _scopePrefix: "",
                _scopePrefixArgs: "",
                _scopeSuffix: "",
                _scopeMap: {},
                _scopeMapRev: {}
            };
        }
        var d = dojo;
        if (typeof dijit == "undefined") {
            dijit = {
                _scopeName: "dijit"
            };
        }
        if (typeof dojox == "undefined") {
            dojox = {
                _scopeName: "dojox"
            };
        }
        if (!d._scopeArgs) {
            d._scopeArgs = [dojo, dijit, dojox];
        }
        d.global = this;
        d.config = {
            isDebug: false,
            debugAtAllCosts: false
        };
        var _9 = typeof djConfig != "undefined" ? djConfig : typeof dojoConfig != "undefined" ? dojoConfig : null;
        if (_9) {
            for (var c in _9) {
                d.config[c] = _9[c];
            }
        }
        dojo.locale = d.config.locale;
        var _a = "$Rev: 23843 $".match(/\d+/);
        dojo.version = {
            major: 1,
            minor: 6,
            patch: 0,
            flag: "-ibm",
            revision: _a ? +_a[0] : NaN,
            toString: function() {
                with(d.version) {
                    return major + "." + minor + "." + patch + flag + " (" + revision + ")";
                }
            }
        };
        if (typeof OpenAjax != "undefined") {
            OpenAjax.hub.registerLibrary(dojo._scopeName, "http://dojotoolkit.org", d.version.toString());
        }
        var _b, _c, _d = {};
        for (var i in {
                toString: 1
            }) {
            _b = [];
            break;
        }
        dojo._extraNames = _b = _b || ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"];
        _c = _b.length;
        dojo._mixin = function(_e, _f) {
            var _10, s, i;
            for (_10 in _f) {
                s = _f[_10];
                if (!(_10 in _e) || (_e[_10] !== s && (!(_10 in _d) || _d[_10] !== s))) {
                    _e[_10] = s;
                }
            }
            if (_c && _f) {
                for (i = 0; i < _c; ++i) {
                    _10 = _b[i];
                    s = _f[_10];
                    if (!(_10 in _e) || (_e[_10] !== s && (!(_10 in _d) || _d[_10] !== s))) {
                        _e[_10] = s;
                    }
                }
            }
            return _e;
        };
        dojo.mixin = function(obj, _11) {
            if (!obj) {
                obj = {};
            }
            for (var i = 1, l = arguments.length; i < l; i++) {
                d._mixin(obj, arguments[i]);
            }
            return obj;
        };
        dojo._getProp = function(_12, _13, _14) {
            var obj = _14 || d.global;
            for (var i = 0, p; obj && (p = _12[i]); i++) {
                if (i == 0 && d._scopeMap[p]) {
                    p = d._scopeMap[p];
                }
                obj = (p in obj ? obj[p] : (_13 ? obj[p] = {} : undefined));
            }
            return obj;
        };
        dojo.setObject = function(_15, _16, _17) {
            var _18 = _15.split("."),
                p = _18.pop(),
                obj = d._getProp(_18, true, _17);
            return obj && p ? (obj[p] = _16) : undefined;
        };
        dojo.getObject = function(_19, _1a, _1b) {
            return d._getProp(_19.split("."), _1a, _1b);
        };
        dojo.exists = function(_1c, obj) {
            return d.getObject(_1c, false, obj) !== undefined;
        };
        dojo["eval"] = function(_1d) {
            return d.global.eval ? d.global.eval(_1d) : eval(_1d);
        };
        d.deprecated = d.experimental = function() {};
    })();
    (function() {
        var d = dojo,
            _1e;
        d.mixin(d, {
            _loadedModules: {},
            _inFlightCount: 0,
            _hasResource: {},
            _modulePrefixes: {
                dojo: {
                    name: "dojo",
                    value: "."
                },
                doh: {
                    name: "doh",
                    value: "../util/doh"
                },
                tests: {
                    name: "tests",
                    value: "tests"
                }
            },
            _moduleHasPrefix: function(_1f) {
                var mp = d._modulePrefixes;
                return !!(mp[_1f] && mp[_1f].value);
            },
            _getModulePrefix: function(_20) {
                var mp = d._modulePrefixes;
                if (d._moduleHasPrefix(_20)) {
                    return mp[_20].value;
                }
                return _20;
            },
            _loadedUrls: [],
            _postLoad: false,
            _loaders: [],
            _unloaders: [],
            _loadNotifying: false
        });
        dojo._loadUriAndCheck = function(uri, _21, cb) {
            var ok = false;
            try {
                ok = d._loadUri(uri, cb);
            } catch (e) {}
            return !!(ok && d._loadedModules[_21]);
        };
        dojo.loaded = function() {
            d._loadNotifying = true;
            d._postLoad = true;
            var mll = d._loaders;
            d._loaders = [];
            for (var x = 0; x < mll.length; x++) {
                mll[x]();
            }
            d._loadNotifying = false;
            if (d._postLoad && d._inFlightCount == 0 && mll.length) {
                d._callLoaded();
            }
        };
        dojo.unloaded = function() {
            var mll = d._unloaders;
            while (mll.length) {
                (mll.pop())();
            }
        };
        d._onto = function(arr, obj, fn) {
            if (!fn) {
                arr.push(obj);
            } else {
                if (fn) {
                    var _22 = (typeof fn == "string") ? obj[fn] : fn;
                    arr.push(function() {
                        _22.call(obj);
                    });
                }
            }
        };
        dojo.ready = dojo.addOnLoad = function(obj, _23) {
            d._onto(d._loaders, obj, _23);
            if (d._postLoad && d._inFlightCount == 0 && !d._loadNotifying) {
                d._callLoaded();
            }
        };
        var dca = d.config.addOnLoad;
        if (dca) {
            d.addOnLoad[(dca instanceof Array ? "apply" : "call")](d, dca);
        }
        dojo._modulesLoaded = function() {
            if (d._postLoad) {
                return;
            }
            if (d._inFlightCount > 0) {
                return;
            }
            d._callLoaded();
        };
        dojo._callLoaded = function() {
            if (typeof setTimeout == "object" || (d.config.useXDomain && d.isOpera)) {
                setTimeout(d.isAIR ? function() {
                    d.loaded();
                } : d._scopeName + ".loaded();", 0);
            } else {
                d.loaded();
            }
        };
        dojo._getModuleSymbols = function(_24) {
            var _25 = _24.split(".");
            for (var i = _25.length; i > 0; i--) {
                var _26 = _25.slice(0, i).join(".");
                if (i == 1 && !d._moduleHasPrefix(_26)) {
                    _25[0] = "../" + _25[0];
                } else {
                    var _27 = d._getModulePrefix(_26);
                    if (_27 != _26) {
                        _25.splice(0, i, _27);
                        break;
                    }
                }
            }
            return _25;
        };
        dojo._global_omit_module_check = false;
        dojo.loadInit = function(_28) {
            _28();
        };
        dojo._loadModule = dojo.require = function(_29, _2a) {
            _2a = d._global_omit_module_check || _2a;
            var _2b = d._loadedModules[_29];
            if (_2b) {
                return _2b;
            }
            var _2c = d._getModuleSymbols(_29).join("/") + ".js";
            var _2d = !_2a ? _29 : null;
            var ok = d._loadPath(_2c, _2d);
            if (!ok && !_2a) {
                throw new Error("Could not load '" + _29 + "'; last tried '" + _2c + "'");
            }
            if (!_2a && !d._isXDomain) {
                _2b = d._loadedModules[_29];
                if (!_2b) {
                    throw new Error("symbol '" + _29 + "' is not defined after loading '" + _2c + "'");
                }
            }
            return _2b;
        };
        dojo.provide = function(_2e) {
            _2e = _2e + "";
            return (d._loadedModules[_2e] = d.getObject(_2e, true));
        };
        dojo.platformRequire = function(_2f) {
            var _30 = _2f.common || [];
            var _31 = _30.concat(_2f[d._name] || _2f["default"] || []);
            for (var x = 0; x < _31.length; x++) {
                var _32 = _31[x];
                if (_32.constructor == Array) {
                    d._loadModule.apply(d, _32);
                } else {
                    d._loadModule(_32);
                }
            }
        };
        dojo.requireIf = function(_33, _34) {
            if (_33 === true) {
                var _35 = [];
                for (var i = 1; i < arguments.length; i++) {
                    _35.push(arguments[i]);
                }
                d.require.apply(d, _35);
            }
        };
        dojo.requireAfterIf = d.requireIf;
        dojo.registerModulePath = function(_36, _37) {
            d._modulePrefixes[_36] = {
                name: _36,
                value: _37
            };
        };
        if (typeof dojo.config["useXDomain"] == "undefined") {
            dojo.config.useXDomain = true;
        }
        dojo.registerModulePath("dojo", "//webdev.webmaster.ibm.com/common/js/dojo/1.6/dojo");
        dojo.registerModulePath("dijit", "//webdev.webmaster.ibm.com/common/js/dojo/1.6/dijit");
        dojo.registerModulePath("dojox", "//webdev.webmaster.ibm.com/common/js/dojo/1.6/dojox");
        dojo.requireLocalization = function(_38, _39, _3a, _3b) {
            d.require("dojo.i18n");
            d.i18n._requireLocalization.apply(d.hostenv, arguments);
        };
        var ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),
            ire = new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
        dojo._Url = function() {
            var n = null,
                _3c = arguments,
                uri = [_3c[0]];
            for (var i = 1; i < _3c.length; i++) {
                if (!_3c[i]) {
                    continue;
                }
                var _3d = new d._Url(_3c[i] + ""),
                    _3e = new d._Url(uri[0] + "");
                if (_3d.path == "" && !_3d.scheme && !_3d.authority && !_3d.query) {
                    if (_3d.fragment != n) {
                        _3e.fragment = _3d.fragment;
                    }
                    _3d = _3e;
                } else {
                    if (!_3d.scheme) {
                        _3d.scheme = _3e.scheme;
                        if (!_3d.authority) {
                            _3d.authority = _3e.authority;
                            if (_3d.path.charAt(0) != "/") {
                                var _3f = _3e.path.substring(0, _3e.path.lastIndexOf("/") + 1) + _3d.path;
                                var _40 = _3f.split("/");
                                for (var j = 0; j < _40.length; j++) {
                                    if (_40[j] == ".") {
                                        if (j == _40.length - 1) {
                                            _40[j] = "";
                                        } else {
                                            _40.splice(j, 1);
                                            j--;
                                        }
                                    } else {
                                        if (j > 0 && !(j == 1 && _40[0] == "") && _40[j] == ".." && _40[j - 1] != "..") {
                                            if (j == (_40.length - 1)) {
                                                _40.splice(j, 1);
                                                _40[j - 1] = "";
                                            } else {
                                                _40.splice(j - 1, 2);
                                                j -= 2;
                                            }
                                        }
                                    }
                                }
                                _3d.path = _40.join("/");
                            }
                        }
                    }
                }
                uri = [];
                if (_3d.scheme) {
                    uri.push(_3d.scheme, ":");
                }
                if (_3d.authority) {
                    uri.push("//", _3d.authority);
                }
                uri.push(_3d.path);
                if (_3d.query) {
                    uri.push("?", _3d.query);
                }
                if (_3d.fragment) {
                    uri.push("#", _3d.fragment);
                }
            }
            this.uri = uri.join("");
            var r = this.uri.match(ore);
            this.scheme = r[2] || (r[1] ? "" : n);
            this.authority = r[4] || (r[3] ? "" : n);
            this.path = r[5];
            this.query = r[7] || (r[6] ? "" : n);
            this.fragment = r[9] || (r[8] ? "" : n);
            if (this.authority != n) {
                r = this.authority.match(ire);
                this.user = r[3] || n;
                this.password = r[4] || n;
                this.host = r[6] || r[7];
                this.port = r[9] || n;
            }
        };
        dojo._Url.prototype.toString = function() {
            return this.uri;
        };
        dojo.moduleUrl = function(_41, url) {
            var loc = d._getModuleSymbols(_41).join("/");
            if (!loc) {
                return null;
            }
            if (loc.lastIndexOf("/") != loc.length - 1) {
                loc += "/";
            }
            var _42 = loc.indexOf(":");
            if (loc.charAt(0) != "/" && (_42 == -1 || _42 > loc.indexOf("/"))) {
                loc = d.baseUrl + loc;
            }
            return new d._Url(loc, url);
        };
    })();
    dojo.provide("dojo._base._loader.loader_xd");
    dojo._xdReset = function() {
        dojo._isXDomain = dojo.config.useXDomain || false;
        dojo._xdClearInterval();
        dojo._xdInFlight = {};
        dojo._xdOrderedReqs = [];
        dojo._xdDepMap = {};
        dojo._xdContents = [];
        dojo._xdDefList = [];
    };
    dojo._xdClearInterval = function() {
        if (dojo._xdTimer) {
            clearInterval(dojo._xdTimer);
            dojo._xdTimer = 0;
        }
    };
    dojo._xdReset();
    dojo._xdCreateResource = function(_43, _44, _45) {
        var _46 = _43.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg, "");
        var _47 = [];
        var _48 = /dojo.(require|requireIf|provide|requireAfterIf|platformRequire|requireLocalization)\s*\(([\w\W]*?)\)/mg;
        var _49;
        while ((_49 = _48.exec(_46)) != null) {
            if (_49[1] == "requireLocalization") {
                eval(_49[0]);
            } else {
                _47.push("\"" + _49[1] + "\", " + _49[2]);
            }
        }
        var _4a = [];
        _4a.push(dojo._scopeName + "._xdResourceLoaded(function(" + dojo._scopePrefixArgs + "){\n");
        var _4b = dojo._xdExtractLoadInits(_43);
        if (_4b) {
            _43 = _4b[0];
            for (var i = 1; i < _4b.length; i++) {
                _4a.push(_4b[i] + ";\n");
            }
        }
        _4a.push("return {");
        if (_47.length > 0) {
            _4a.push("depends: [");
            for (i = 0; i < _47.length; i++) {
                if (i > 0) {
                    _4a.push(",\n");
                }
                _4a.push("[" + _47[i] + "]");
            }
            _4a.push("],");
        }
        _4a.push("\ndefineResource: function(" + dojo._scopePrefixArgs + "){");
        if (!dojo.config["debugAtAllCosts"] || _44 == "dojo._base._loader.loader_debug") {
            _4a.push(_43);
        }
        _4a.push("\n}, resourceName: '" + _44 + "', resourcePath: '" + _45 + "'};});");
        return _4a.join("");
    };
    dojo._xdExtractLoadInits = function(_4c) {
        var _4d = /dojo.loadInit\s*\(/g;
        _4d.lastIndex = 0;
        var _4e = /[\(\)]/g;
        _4e.lastIndex = 0;
        var _4f = [];
        var _50;
        while ((_50 = _4d.exec(_4c))) {
            _4e.lastIndex = _4d.lastIndex;
            var _51 = 1;
            var _52;
            while ((_52 = _4e.exec(_4c))) {
                if (_52[0] == ")") {
                    _51 -= 1;
                } else {
                    _51 += 1;
                }
                if (_51 == 0) {
                    break;
                }
            }
            if (_51 != 0) {
                throw "unmatched paren around character " + _4e.lastIndex + " in: " + _4c;
            }
            var _53 = _4d.lastIndex - _50[0].length;
            _4f.push(_4c.substring(_53, _4e.lastIndex));
            var _54 = _4e.lastIndex - _53;
            _4c = _4c.substring(0, _53) + _4c.substring(_4e.lastIndex, _4c.length);
            _4d.lastIndex = _4e.lastIndex - _54;
            _4d.lastIndex = _4e.lastIndex;
        }
        if (_4f.length > 0) {
            _4f.unshift(_4c);
        }
        return (_4f.length ? _4f : null);
    };
    dojo._xdIsXDomainPath = function(_55) {
        var _56 = _55.indexOf(":");
        var _57 = _55.indexOf("/");
        if (_56 > 0 && _56 < _57 || _55.indexOf("//") === 0) {
            return true;
        } else {
            var url = dojo.baseUrl;
            _56 = url.indexOf(":");
            _57 = url.indexOf("/");
            if (url.indexOf("//") === 0 || (_56 > 0 && _56 < _57 && (!location.host || url.indexOf("http://" + location.host) != 0))) {
                return true;
            }
        }
        return false;
    };
    dojo._loadPath = function(_58, _59, cb) {
        var _5a = dojo._xdIsXDomainPath(_58);
        dojo._isXDomain |= _5a;
        var uri = ((_58.charAt(0) == "/" || _58.match(/^\w+:/)) ? "" : dojo.baseUrl) + _58;
        try {
            return ((!_59 || dojo._isXDomain) ? dojo._loadUri(uri, cb, _5a, _59) : dojo._loadUriAndCheck(uri, _59, cb));
        } catch (e) {
            return false;
        }
    };
    dojo._xdCharSet = "utf-8";
    dojo._loadUri = function(uri, cb, _5b, _5c) {
        if (dojo._loadedUrls[uri]) {
            return 1;
        }
        if (dojo._isXDomain && _5c && _5c != "dojo.i18n") {
            dojo._xdOrderedReqs.push(_5c);
            if (_5b || uri.indexOf("/nls/") == -1) {
                dojo._xdInFlight[_5c] = true;
                dojo._inFlightCount++;
            }
            if (!dojo._xdTimer) {
                if (dojo.isAIR) {
                    dojo._xdTimer = setInterval(function() {
                        dojo._xdWatchInFlight();
                    }, 100);
                } else {
                    dojo._xdTimer = setInterval(dojo._scopeName + "._xdWatchInFlight();", 100);
                }
            }
            dojo._xdStartTime = (new Date()).getTime();
        }
        if (_5b) {
            var _5d = uri.lastIndexOf(".");
            if (_5d <= 0) {
                _5d = uri.length - 1;
            }
            var _5e = uri.substring(0, _5d) + ".xd";
            if (_5d != uri.length - 1) {
                _5e += uri.substring(_5d, uri.length);
            }
            if (dojo.isAIR) {
                _5e = _5e.replace("app:/", "/");
            }
            var _5f = document.createElement("script");
            _5f.type = "text/javascript";
            if (dojo._xdCharSet) {
                _5f.charset = dojo._xdCharSet;
            }
            _5f.src = _5e;
            if (!dojo.headElement) {
                dojo._headElement = document.getElementsByTagName("head")[0];
                if (!dojo._headElement) {
                    dojo._headElement = document.getElementsByTagName("html")[0];
                }
            }
            dojo._headElement.appendChild(_5f);
        } else {
            var _60 = dojo._getText(uri, null, true);
            if (_60 == null) {
                return 0;
            }
            if (dojo._isXDomain && uri.indexOf("/nls/") == -1 && _5c != "dojo.i18n") {
                var res = dojo._xdCreateResource(_60, _5c, uri);
                dojo.eval(res);
            } else {
                if (cb) {
                    _60 = "(" + _60 + ")";
                } else {
                    _60 = dojo._scopePrefix + _60 + dojo._scopeSuffix;
                }
                if (!dojo.isIE) {
                    _60 += "\r\n//@ sourceURL=" + uri;
                }
                var _61 = dojo["eval"](_60);
                if (cb) {
                    cb(_61);
                }
            }
        }
        dojo._loadedUrls[uri] = true;
        dojo._loadedUrls.push(uri);
        return true;
    };
    dojo._xdResourceLoaded = function(res) {
        res = res.apply(dojo.global, dojo._scopeArgs);
        var _62 = res.depends;
        var _63 = null;
        var _64 = null;
        var _65 = [];
        if (_62 && _62.length > 0) {
            var dep = null;
            var _66 = 0;
            var _67 = false;
            for (var i = 0; i < _62.length; i++) {
                dep = _62[i];
                if (dep[0] == "provide") {
                    _65.push(dep[1]);
                } else {
                    if (!_63) {
                        _63 = [];
                    }
                    if (!_64) {
                        _64 = [];
                    }
                    var _68 = dojo._xdUnpackDependency(dep);
                    if (_68.requires) {
                        _63 = _63.concat(_68.requires);
                    }
                    if (_68.requiresAfter) {
                        _64 = _64.concat(_68.requiresAfter);
                    }
                }
                var _69 = dep[0];
                var _6a = _69.split(".");
                if (_6a.length == 2) {
                    dojo[_6a[0]][_6a[1]].apply(dojo[_6a[0]], dep.slice(1));
                } else {
                    dojo[_69].apply(dojo, dep.slice(1));
                }
            }
            if (_65.length == 1 && _65[0] == "dojo._base._loader.loader_debug") {
                res.defineResource(dojo);
            } else {
                var _6b = dojo._xdContents.push({
                    content: res.defineResource,
                    resourceName: res["resourceName"],
                    resourcePath: res["resourcePath"],
                    isDefined: false
                }) - 1;
                for (i = 0; i < _65.length; i++) {
                    dojo._xdDepMap[_65[i]] = {
                        requires: _63,
                        requiresAfter: _64,
                        contentIndex: _6b
                    };
                }
            }
            for (i = 0; i < _65.length; i++) {
                dojo._xdInFlight[_65[i]] = false;
            }
        }
    };
    dojo._xdLoadFlattenedBundle = function(_6c, _6d, _6e, _6f) {
        _6e = _6e || "root";
        var _70 = dojo.i18n.normalizeLocale(_6e).replace("-", "_");
        var _71 = [_6c, "nls", _6d].join(".");
        var _72 = dojo["provide"](_71);
        _72[_70] = _6f;
        var _73 = [_6c, _70, _6d].join(".");
        var _74 = dojo._xdBundleMap[_73];
        if (_74) {
            for (var _75 in _74) {
                _72[_75] = _6f;
            }
        }
    };
    dojo._xdInitExtraLocales = function() {
        var _76 = dojo.config.extraLocale;
        if (_76) {
            if (!_76 instanceof Array) {
                _76 = [_76];
            }
            dojo._xdReqLoc = dojo.xdRequireLocalization;
            dojo.xdRequireLocalization = function(m, b, _77, _78) {
                dojo._xdReqLoc(m, b, _77, _78);
                if (_77) {
                    return;
                }
                for (var i = 0; i < _76.length; i++) {
                    dojo._xdReqLoc(m, b, _76[i], _78);
                }
            };
        }
    };
    dojo._xdBundleMap = {};
    dojo.xdRequireLocalization = function(_79, _7a, _7b, _7c) {
        if (dojo._xdInitExtraLocales) {
            dojo._xdInitExtraLocales();
            dojo._xdInitExtraLocales = null;
            dojo.xdRequireLocalization.apply(dojo, arguments);
            return;
        }
        var _7d = _7c.split(",");
        var _7e = dojo.i18n.normalizeLocale(_7b);
        var _7f = "";
        for (var i = 0; i < _7d.length; i++) {
            if (_7e.indexOf(_7d[i]) == 0) {
                if (_7d[i].length > _7f.length) {
                    _7f = _7d[i];
                }
            }
        }
        var _80 = _7f.replace("-", "_");
        var _81 = dojo.getObject([_79, "nls", _7a].join("."));
        if (!_81 || !_81[_80]) {
            var _82 = [_79, (_80 || "root"), _7a].join(".");
            var _83 = dojo._xdBundleMap[_82];
            if (!_83) {
                _83 = dojo._xdBundleMap[_82] = {};
            }
            _83[_7e.replace("-", "_")] = true;
            dojo.require(_79 + ".nls" + (_7f ? "." + _7f : "") + "." + _7a);
        }
    };
    dojo._xdRealRequireLocalization = dojo.requireLocalization;
    dojo.requireLocalization = function(_84, _85, _86, _87) {
        var _88 = dojo.moduleUrl(_84).toString();
        if (dojo._xdIsXDomainPath(_88)) {
            return dojo.xdRequireLocalization.apply(dojo, arguments);
        } else {
            return dojo._xdRealRequireLocalization.apply(dojo, arguments);
        }
    };
    dojo._xdUnpackDependency = function(dep) {
        var _89 = null;
        var _8a = null;
        switch (dep[0]) {
            case "requireIf":
            case "requireAfterIf":
                if (dep[1] === true) {
                    _89 = [{
                        name: dep[2],
                        content: null
                    }];
                }
                break;
            case "platformRequire":
                var _8b = dep[1];
                var _8c = _8b["common"] || [];
                _89 = (_8b[dojo.hostenv.name_]) ? _8c.concat(_8b[dojo.hostenv.name_] || []) : _8c.concat(_8b["default"] || []);
                if (_89) {
                    for (var i = 0; i < _89.length; i++) {
                        if (_89[i] instanceof Array) {
                            _89[i] = {
                                name: _89[i][0],
                                content: null
                            };
                        } else {
                            _89[i] = {
                                name: _89[i],
                                content: null
                            };
                        }
                    }
                }
                break;
            case "require":
                _89 = [{
                    name: dep[1],
                    content: null
                }];
                break;
            case "i18n._preloadLocalizations":
                dojo.i18n._preloadLocalizations.apply(dojo.i18n._preloadLocalizations, dep.slice(1));
                break;
        }
        if (dep[0] == "requireAfterIf" || dep[0] == "requireIf") {
            _8a = _89;
            _89 = null;
        }
        return {
            requires: _89,
            requiresAfter: _8a
        };
    };
    dojo._xdWalkReqs = function() {
        var _8d = null;
        var req;
        for (var i = 0; i < dojo._xdOrderedReqs.length; i++) {
            req = dojo._xdOrderedReqs[i];
            if (dojo._xdDepMap[req]) {
                _8d = [req];
                _8d[req] = true;
                dojo._xdEvalReqs(_8d);
            }
        }
    };
    dojo._xdEvalReqs = function(_8e) {
        while (_8e.length > 0) {
            var req = _8e[_8e.length - 1];
            var res = dojo._xdDepMap[req];
            var i, _8f, _90;
            if (res) {
                _8f = res.requires;
                if (_8f && _8f.length > 0) {
                    for (i = 0; i < _8f.length; i++) {
                        _90 = _8f[i].name;
                        if (_90 && !_8e[_90]) {
                            _8e.push(_90);
                            _8e[_90] = true;
                            dojo._xdEvalReqs(_8e);
                        }
                    }
                }
                var _91 = dojo._xdContents[res.contentIndex];
                if (!_91.isDefined) {
                    var _92 = _91.content;
                    _92["resourceName"] = _91["resourceName"];
                    _92["resourcePath"] = _91["resourcePath"];
                    dojo._xdDefList.push(_92);
                    _91.isDefined = true;
                }
                dojo._xdDepMap[req] = null;
                _8f = res.requiresAfter;
                if (_8f && _8f.length > 0) {
                    for (i = 0; i < _8f.length; i++) {
                        _90 = _8f[i].name;
                        if (_90 && !_8e[_90]) {
                            _8e.push(_90);
                            _8e[_90] = true;
                            dojo._xdEvalReqs(_8e);
                        }
                    }
                }
            }
            _8e.pop();
        }
    };
    dojo._xdWatchInFlight = function() {
        var _93 = "";
        var _94 = (dojo.config.xdWaitSeconds || 15) * 1000;
        var _95 = (dojo._xdStartTime + _94) < (new Date()).getTime();
        for (var _96 in dojo._xdInFlight) {
            if (dojo._xdInFlight[_96] === true) {
                if (_95) {
                    _93 += _96 + " ";
                } else {
                    return;
                }
            }
        }
        dojo._xdClearInterval();
        if (_95) {
            throw "Could not load cross-domain resources: " + _93;
        }
        dojo._xdWalkReqs();
        var _97 = dojo._xdDefList.length;
        for (var i = 0; i < _97; i++) {
            var _98 = dojo._xdDefList[i];
            if (dojo.config["debugAtAllCosts"] && _98["resourceName"]) {
                if (!dojo["_xdDebugQueue"]) {
                    dojo._xdDebugQueue = [];
                }
                dojo._xdDebugQueue.push({
                    resourceName: _98.resourceName,
                    resourcePath: _98.resourcePath
                });
            } else {
                _98.apply(dojo.global, dojo._scopeArgs);
            }
        }
        for (i = 0; i < dojo._xdContents.length; i++) {
            var _99 = dojo._xdContents[i];
            if (_99.content && !_99.isDefined) {
                _99.content.apply(dojo.global, dojo._scopeArgs);
            }
        }
        dojo._xdReset();
        if (dojo["_xdDebugQueue"] && dojo._xdDebugQueue.length > 0) {
            dojo._xdDebugFileLoaded();
        } else {
            dojo._xdNotifyLoaded();
        }
    };
    dojo._xdNotifyLoaded = function() {
        for (var _9a in dojo._xdInFlight) {
            if (typeof dojo._xdInFlight[_9a] == "boolean") {
                return;
            }
        }
        dojo._inFlightCount = 0;
        if (dojo._initFired && !dojo._loadNotifying) {
            dojo._callLoaded();
        }
    };
    if (typeof window != "undefined") {
        dojo.isBrowser = true;
        dojo._name = "browser";
        (function() {
            var d = dojo;
            if (document && document.getElementsByTagName) {
                var _9b = document.getElementsByTagName("script");
                var _9c = /dojo(\.xd)?\.js(\W|$)/i;
                for (var i = 0; i < _9b.length; i++) {
                    var src = _9b[i].getAttribute("src");
                    if (!src) {
                        continue;
                    }
                    var m = src.match(_9c);
                    if (m) {
                        if (!d.config.baseUrl) {
                            d.config.baseUrl = src.substring(0, m.index);
                        }
                        var cfg = (_9b[i].getAttribute("djConfig") || _9b[i].getAttribute("data-dojo-config"));
                        if (cfg) {
                            var _9d = eval("({ " + cfg + " })");
                            for (var x in _9d) {
                                dojo.config[x] = _9d[x];
                            }
                        }
                        break;
                    }
                }
            }
            d.baseUrl = d.config.baseUrl;
            var n = navigator;
            var dua = n.userAgent,
                dav = n.appVersion,
                tv = parseFloat(dav);
            if (dua.indexOf("Opera") >= 0) {
                d.isOpera = tv;
            }
            if (dua.indexOf("AdobeAIR") >= 0) {
                d.isAIR = 1;
            }
            d.isKhtml = (dav.indexOf("Konqueror") >= 0) ? tv : 0;
            d.isWebKit = parseFloat(dua.split("WebKit/")[1]) || undefined;
            d.isChrome = parseFloat(dua.split("Chrome/")[1]) || undefined;
            d.isMac = dav.indexOf("Macintosh") >= 0;
            var _9e = Math.max(dav.indexOf("WebKit"), dav.indexOf("Safari"), 0);
            if (_9e && !dojo.isChrome) {
                d.isSafari = parseFloat(dav.split("Version/")[1]);
                if (!d.isSafari || parseFloat(dav.substr(_9e + 7)) <= 419.3) {
                    d.isSafari = 2;
                }
            }
            if (dua.indexOf("Gecko") >= 0 && !d.isKhtml && !d.isWebKit) {
                d.isMozilla = d.isMoz = tv;
            }
            if (d.isMoz) {
                d.isFF = parseFloat(dua.split("Firefox/")[1] || dua.split("Minefield/")[1]) || undefined;
            }
            if (document.all && !d.isOpera) {
                d.isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;
                var _9f = document.documentMode;
                if (_9f && _9f != 5 && Math.floor(d.isIE) != _9f) {
                    d.isIE = _9f;
                }
            }
            if (dojo.isIE && window.location.protocol === "file:") {
                dojo.config.ieForceActiveXXhr = true;
            }
            d.isQuirks = document.compatMode == "BackCompat";
            d.locale = dojo.config.locale || (d.isIE ? n.userLanguage : n.language).toLowerCase();
            d._XMLHTTP_PROGIDS = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"];
            d._xhrObj = function() {
                var _a0, _a1;
                if (!dojo.isIE || !dojo.config.ieForceActiveXXhr) {
                    try {
                        _a0 = new XMLHttpRequest();
                    } catch (e) {}
                }
                if (!_a0) {
                    for (var i = 0; i < 3; ++i) {
                        var _a2 = d._XMLHTTP_PROGIDS[i];
                        try {
                            _a0 = new ActiveXObject(_a2);
                        } catch (e) {
                            _a1 = e;
                        }
                        if (_a0) {
                            d._XMLHTTP_PROGIDS = [_a2];
                            break;
                        }
                    }
                }
                if (!_a0) {
                    throw new Error("XMLHTTP not available: " + _a1);
                }
                return _a0;
            };
            d._isDocumentOk = function(_a3) {
                var _a4 = _a3.status || 0;
                return (_a4 >= 200 && _a4 < 300) || _a4 == 304 || _a4 == 1223 || !_a4;
            };
            var _a5 = window.location + "";
            var _a6 = document.getElementsByTagName("base");
            var _a7 = (_a6 && _a6.length > 0);
            d._getText = function(uri, _a8) {
                var _a9 = d._xhrObj();
                if (!_a7 && dojo._Url) {
                    uri = (new dojo._Url(_a5, uri)).toString();
                }
                if (d.config.cacheBust) {
                    uri += "";
                    uri += (uri.indexOf("?") == -1 ? "?" : "&") + String(d.config.cacheBust).replace(/\W+/g, "");
                }
                _a9.open("GET", uri, false);
                try {
                    _a9.send(null);
                    if (!d._isDocumentOk(_a9)) {
                        var err = Error("Unable to load " + uri + " status:" + _a9.status);
                        err.status = _a9.status;
                        err.responseText = _a9.responseText;
                        throw err;
                    }
                } catch (e) {
                    if (_a8) {
                        return null;
                    }
                    throw e;
                }
                return _a9.responseText;
            };
            var _aa = window;
            var _ab = function(_ac, fp) {
                var _ad = _aa.attachEvent || _aa.addEventListener;
                _ac = _aa.attachEvent ? _ac : _ac.substring(2);
                _ad(_ac, function() {
                    fp.apply(_aa, arguments);
                }, false);
            };
            d._windowUnloaders = [];
            d.windowUnloaded = function() {
                var mll = d._windowUnloaders;
                while (mll.length) {
                    (mll.pop())();
                }
                d = null;
            };
            var _ae = 0;
            d.addOnWindowUnload = function(obj, _af) {
                d._onto(d._windowUnloaders, obj, _af);
                if (!_ae) {
                    _ae = 1;
                    _ab("onunload", d.windowUnloaded);
                }
            };
            var _b0 = 0;
            d.addOnUnload = function(obj, _b1) {
                d._onto(d._unloaders, obj, _b1);
                if (!_b0) {
                    _b0 = 1;
                    _ab("onbeforeunload", dojo.unloaded);
                }
            };
        })();
        dojo._initFired = false;
        dojo._loadInit = function(e) {
            if (dojo._scrollIntervalId) {
                clearInterval(dojo._scrollIntervalId);
                dojo._scrollIntervalId = 0;
            }
            if (!dojo._initFired) {
                dojo._initFired = true;
                if (!dojo.config.afterOnLoad && window.detachEvent) {
                    window.detachEvent("onload", dojo._loadInit);
                }
                if (dojo._inFlightCount == 0) {
                    dojo._modulesLoaded();
                }
            }
        };
        if (!dojo.config.afterOnLoad) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", dojo._loadInit, false);
                window.addEventListener("load", dojo._loadInit, false);
            } else {
                if (window.attachEvent) {
                    window.attachEvent("onload", dojo._loadInit);
                    if (!dojo.config.skipIeDomLoaded && self === self.top) {
                        dojo._scrollIntervalId = setInterval(function() {
                            try {
                                if (document.body) {
                                    document.documentElement.doScroll("left");
                                    dojo._loadInit();
                                }
                            } catch (e) {}
                        }, 30);
                    }
                }
            }
        }
        if (dojo.isIE) {
            try {
                (function() {
                    document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
                    var _b2 = ["*", "group", "roundrect", "oval", "shape", "rect", "imagedata", "path", "textpath", "text"],
                        i = 0,
                        l = 1,
                        s = document.createStyleSheet();
                    if (dojo.isIE >= 8) {
                        i = 1;
                        l = _b2.length;
                    }
                    for (; i < l; ++i) {
                        s.addRule("v\\:" + _b2[i], "behavior:url(#default#VML); display:inline-block");
                    }
                })();
            } catch (e) {}
        }
    }(function() {
        var mp = dojo.config["modulePaths"];
        if (mp) {
            for (var _b3 in mp) {
                dojo.registerModulePath(_b3, mp[_b3]);
            }
        }
    })();
    if (dojo.config.isDebug) {
        dojo.require("dojo._firebug.firebug");
    }
    if (dojo.config.debugAtAllCosts) {
        dojo.require("dojo._base._loader.loader_debug");
    }
    if (!dojo._hasResource["dojo._base.lang"]) {
        dojo._hasResource["dojo._base.lang"] = true;
        dojo.provide("dojo._base.lang");
        (function() {
            var d = dojo,
                _b4 = Object.prototype.toString;
            dojo.isString = function(it) {
                return (typeof it == "string" || it instanceof String);
            };
            dojo.isArray = function(it) {
                return it && (it instanceof Array || typeof it == "array");
            };
            dojo.isFunction = function(it) {
                return _b4.call(it) === "[object Function]";
            };
            dojo.isObject = function(it) {
                return it !== undefined && (it === null || typeof it == "object" || d.isArray(it) || d.isFunction(it));
            };
            dojo.isArrayLike = function(it) {
                return it && it !== undefined && !d.isString(it) && !d.isFunction(it) && !(it.tagName && it.tagName.toLowerCase() == "form") && (d.isArray(it) || isFinite(it.length));
            };
            dojo.isAlien = function(it) {
                return it && !d.isFunction(it) && /\{\s*\[native code\]\s*\}/.test(String(it));
            };
            dojo.extend = function(_b5, _b6) {
                for (var i = 1, l = arguments.length; i < l; i++) {
                    d._mixin(_b5.prototype, arguments[i]);
                }
                return _b5;
            };
            dojo._hitchArgs = function(_b7, _b8) {
                var pre = d._toArray(arguments, 2);
                var _b9 = d.isString(_b8);
                return function() {
                    var _ba = d._toArray(arguments);
                    var f = _b9 ? (_b7 || d.global)[_b8] : _b8;
                    return f && f.apply(_b7 || this, pre.concat(_ba));
                };
            };
            dojo.hitch = function(_bb, _bc) {
                if (arguments.length > 2) {
                    return d._hitchArgs.apply(d, arguments);
                }
                if (!_bc) {
                    _bc = _bb;
                    _bb = null;
                }
                if (d.isString(_bc)) {
                    _bb = _bb || d.global;
                    if (!_bb[_bc]) {
                        throw (["dojo.hitch: scope[\"", _bc, "\"] is null (scope=\"", _bb, "\")"].join(""));
                    }
                    return function() {
                        return _bb[_bc].apply(_bb, arguments || []);
                    };
                }
                return !_bb ? _bc : function() {
                    return _bc.apply(_bb, arguments || []);
                };
            };
            dojo.delegate = dojo._delegate = (function() {
                function TMP() {};
                return function(obj, _bd) {
                    TMP.prototype = obj;
                    var tmp = new TMP();
                    TMP.prototype = null;
                    if (_bd) {
                        d._mixin(tmp, _bd);
                    }
                    return tmp;
                };
            })();
            var _be = function(obj, _bf, _c0) {
                return (_c0 || []).concat(Array.prototype.slice.call(obj, _bf || 0));
            };
            var _c1 = function(obj, _c2, _c3) {
                var arr = _c3 || [];
                for (var x = _c2 || 0; x < obj.length; x++) {
                    arr.push(obj[x]);
                }
                return arr;
            };
            dojo._toArray = d.isIE ? function(obj) {
                return ((obj.item) ? _c1 : _be).apply(this, arguments);
            } : _be;
            dojo.partial = function(_c4) {
                var arr = [null];
                return d.hitch.apply(d, arr.concat(d._toArray(arguments)));
            };
            var _c5 = d._extraNames,
                _c6 = _c5.length,
                _c7 = {};
            dojo.clone = function(o) {
                if (!o || typeof o != "object" || d.isFunction(o)) {
                    return o;
                }
                if (o.nodeType && "cloneNode" in o) {
                    return o.cloneNode(true);
                }
                if (o instanceof Date) {
                    return new Date(o.getTime());
                }
                if (o instanceof RegExp) {
                    return new RegExp(o);
                }
                var r, i, l, s, _c8;
                if (d.isArray(o)) {
                    r = [];
                    for (i = 0, l = o.length; i < l; ++i) {
                        if (i in o) {
                            r.push(d.clone(o[i]));
                        }
                    }
                } else {
                    r = o.constructor ? new o.constructor() : {};
                }
                for (_c8 in o) {
                    s = o[_c8];
                    if (!(_c8 in r) || (r[_c8] !== s && (!(_c8 in _c7) || _c7[_c8] !== s))) {
                        r[_c8] = d.clone(s);
                    }
                }
                if (_c6) {
                    for (i = 0; i < _c6; ++i) {
                        _c8 = _c5[i];
                        s = o[_c8];
                        if (!(_c8 in r) || (r[_c8] !== s && (!(_c8 in _c7) || _c7[_c8] !== s))) {
                            r[_c8] = s;
                        }
                    }
                }
                return r;
            };
            dojo.trim = String.prototype.trim ? function(str) {
                return str.trim();
            } : function(str) {
                return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
            };
            var _c9 = /\{([^\}]+)\}/g;
            dojo.replace = function(_ca, map, _cb) {
                return _ca.replace(_cb || _c9, d.isFunction(map) ? map : function(_cc, k) {
                    return d.getObject(k, false, map);
                });
            };
        })();
    }
    if (!dojo._hasResource["dojo._base.array"]) {
        dojo._hasResource["dojo._base.array"] = true;
        dojo.provide("dojo._base.array");
        (function() {
            var _cd = function(arr, obj, cb) {
                return [(typeof arr == "string") ? arr.split("") : arr, obj || dojo.global, (typeof cb == "string") ? new Function("item", "index", "array", cb) : cb];
            };
            var _ce = function(_cf, arr, _d0, _d1) {
                var _d2 = _cd(arr, _d1, _d0);
                arr = _d2[0];
                for (var i = 0, l = arr.length; i < l; ++i) {
                    var _d3 = !!_d2[2].call(_d2[1], arr[i], i, arr);
                    if (_cf ^ _d3) {
                        return _d3;
                    }
                }
                return _cf;
            };
            dojo.mixin(dojo, {
                indexOf: function(_d4, _d5, _d6, _d7) {
                    var _d8 = 1,
                        end = _d4.length || 0,
                        i = 0;
                    if (_d7) {
                        i = end - 1;
                        _d8 = end = -1;
                    }
                    if (_d6 != undefined) {
                        i = _d6;
                    }
                    if ((_d7 && i > end) || i < end) {
                        for (; i != end; i += _d8) {
                            if (_d4[i] == _d5) {
                                return i;
                            }
                        }
                    }
                    return -1;
                },
                lastIndexOf: function(_d9, _da, _db) {
                    return dojo.indexOf(_d9, _da, _db, true);
                },
                forEach: function(arr, _dc, _dd) {
                    if (!arr || !arr.length) {
                        return;
                    }
                    var _de = _cd(arr, _dd, _dc);
                    arr = _de[0];
                    for (var i = 0, l = arr.length; i < l; ++i) {
                        _de[2].call(_de[1], arr[i], i, arr);
                    }
                },
                every: function(arr, _df, _e0) {
                    return _ce(true, arr, _df, _e0);
                },
                some: function(arr, _e1, _e2) {
                    return _ce(false, arr, _e1, _e2);
                },
                map: function(arr, _e3, _e4) {
                    var _e5 = _cd(arr, _e4, _e3);
                    arr = _e5[0];
                    var _e6 = (arguments[3] ? (new arguments[3]()) : []);
                    for (var i = 0, l = arr.length; i < l; ++i) {
                        _e6.push(_e5[2].call(_e5[1], arr[i], i, arr));
                    }
                    return _e6;
                },
                filter: function(arr, _e7, _e8) {
                    var _e9 = _cd(arr, _e8, _e7);
                    arr = _e9[0];
                    var _ea = [];
                    for (var i = 0, l = arr.length; i < l; ++i) {
                        if (_e9[2].call(_e9[1], arr[i], i, arr)) {
                            _ea.push(arr[i]);
                        }
                    }
                    return _ea;
                }
            });
        })();
    }
    if (!dojo._hasResource["dojo._base.declare"]) {
        dojo._hasResource["dojo._base.declare"] = true;
        dojo.provide("dojo._base.declare");
        (function() {
            var d = dojo,
                mix = d._mixin,
                op = Object.prototype,
                _eb = op.toString,
                _ec = new Function,
                _ed = 0,
                _ee = "constructor";

            function err(msg, cls) {
                throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg);
            };

            function _ef(_f0, _f1) {
                var _f2 = [],
                    _f3 = [{
                        cls: 0,
                        refs: []
                    }],
                    _f4 = {},
                    _f5 = 1,
                    l = _f0.length,
                    i = 0,
                    j, lin, _f6, top, _f7, rec, _f8, _f9;
                for (; i < l; ++i) {
                    _f6 = _f0[i];
                    if (!_f6) {
                        err("mixin #" + i + " is unknown. Did you use dojo.require to pull it in?", _f1);
                    } else {
                        if (_eb.call(_f6) != "[object Function]") {
                            err("mixin #" + i + " is not a callable constructor.", _f1);
                        }
                    }
                    lin = _f6._meta ? _f6._meta.bases : [_f6];
                    top = 0;
                    for (j = lin.length - 1; j >= 0; --j) {
                        _f7 = lin[j].prototype;
                        if (!_f7.hasOwnProperty("declaredClass")) {
                            _f7.declaredClass = "uniqName_" + (_ed++);
                        }
                        _f8 = _f7.declaredClass;
                        if (!_f4.hasOwnProperty(_f8)) {
                            _f4[_f8] = {
                                count: 0,
                                refs: [],
                                cls: lin[j]
                            };
                            ++_f5;
                        }
                        rec = _f4[_f8];
                        if (top && top !== rec) {
                            rec.refs.push(top);
                            ++top.count;
                        }
                        top = rec;
                    }++top.count;
                    _f3[0].refs.push(top);
                }
                while (_f3.length) {
                    top = _f3.pop();
                    _f2.push(top.cls);
                    --_f5;
                    while (_f9 = top.refs, _f9.length == 1) {
                        top = _f9[0];
                        if (!top || --top.count) {
                            top = 0;
                            break;
                        }
                        _f2.push(top.cls);
                        --_f5;
                    }
                    if (top) {
                        for (i = 0, l = _f9.length; i < l; ++i) {
                            top = _f9[i];
                            if (!--top.count) {
                                _f3.push(top);
                            }
                        }
                    }
                }
                if (_f5) {
                    err("can't build consistent linearization", _f1);
                }
                _f6 = _f0[0];
                _f2[0] = _f6 ? _f6._meta && _f6 === _f2[_f2.length - _f6._meta.bases.length] ? _f6._meta.bases.length : 1 : 0;
                return _f2;
            };

            function _fa(_fb, a, f) {
                var _fc, _fd, _fe, _ff, meta, base, _100, opf, pos, _101 = this._inherited = this._inherited || {};
                if (typeof _fb == "string") {
                    _fc = _fb;
                    _fb = a;
                    a = f;
                }
                f = 0;
                _ff = _fb.callee;
                _fc = _fc || _ff.nom;
                if (!_fc) {
                    err("can't deduce a name to call inherited()", this.declaredClass);
                }
                meta = this.constructor._meta;
                _fe = meta.bases;
                pos = _101.p;
                if (_fc != _ee) {
                    if (_101.c !== _ff) {
                        pos = 0;
                        base = _fe[0];
                        meta = base._meta;
                        if (meta.hidden[_fc] !== _ff) {
                            _fd = meta.chains;
                            if (_fd && typeof _fd[_fc] == "string") {
                                err("calling chained method with inherited: " + _fc, this.declaredClass);
                            }
                            do {
                                meta = base._meta;
                                _100 = base.prototype;
                                if (meta && (_100[_fc] === _ff && _100.hasOwnProperty(_fc) || meta.hidden[_fc] === _ff)) {
                                    break;
                                }
                            } while (base = _fe[++pos]);
                            pos = base ? pos : -1;
                        }
                    }
                    base = _fe[++pos];
                    if (base) {
                        _100 = base.prototype;
                        if (base._meta && _100.hasOwnProperty(_fc)) {
                            f = _100[_fc];
                        } else {
                            opf = op[_fc];
                            do {
                                _100 = base.prototype;
                                f = _100[_fc];
                                if (f && (base._meta ? _100.hasOwnProperty(_fc) : f !== opf)) {
                                    break;
                                }
                            } while (base = _fe[++pos]);
                        }
                    }
                    f = base && f || op[_fc];
                } else {
                    if (_101.c !== _ff) {
                        pos = 0;
                        meta = _fe[0]._meta;
                        if (meta && meta.ctor !== _ff) {
                            _fd = meta.chains;
                            if (!_fd || _fd.constructor !== "manual") {
                                err("calling chained constructor with inherited", this.declaredClass);
                            }
                            while (base = _fe[++pos]) {
                                meta = base._meta;
                                if (meta && meta.ctor === _ff) {
                                    break;
                                }
                            }
                            pos = base ? pos : -1;
                        }
                    }
                    while (base = _fe[++pos]) {
                        meta = base._meta;
                        f = meta ? meta.ctor : base;
                        if (f) {
                            break;
                        }
                    }
                    f = base && f;
                }
                _101.c = f;
                _101.p = pos;
                if (f) {
                    return a === true ? f : f.apply(this, a || _fb);
                }
            };

            function _102(name, args) {
                if (typeof name == "string") {
                    return this.inherited(name, args, true);
                }
                return this.inherited(name, true);
            };

            function _103(cls) {
                var _104 = this.constructor._meta.bases;
                for (var i = 0, l = _104.length; i < l; ++i) {
                    if (_104[i] === cls) {
                        return true;
                    }
                }
                return this instanceof cls;
            };

            function _105(_106, _107) {
                var name, i = 0,
                    l = d._extraNames.length;
                for (name in _107) {
                    if (name != _ee && _107.hasOwnProperty(name)) {
                        _106[name] = _107[name];
                    }
                }
                for (; i < l; ++i) {
                    name = d._extraNames[i];
                    if (name != _ee && _107.hasOwnProperty(name)) {
                        _106[name] = _107[name];
                    }
                }
            };

            function _108(_109, _10a) {
                var name, t, i = 0,
                    l = d._extraNames.length;
                for (name in _10a) {
                    t = _10a[name];
                    if ((t !== op[name] || !(name in op)) && name != _ee) {
                        if (_eb.call(t) == "[object Function]") {
                            t.nom = name;
                        }
                        _109[name] = t;
                    }
                }
                for (; i < l; ++i) {
                    name = d._extraNames[i];
                    t = _10a[name];
                    if ((t !== op[name] || !(name in op)) && name != _ee) {
                        if (_eb.call(t) == "[object Function]") {
                            t.nom = name;
                        }
                        _109[name] = t;
                    }
                }
                return _109;
            };

            function _10b(_10c) {
                _108(this.prototype, _10c);
                return this;
            };

            function _10d(_10e, _10f) {
                return function() {
                    var a = arguments,
                        args = a,
                        a0 = a[0],
                        f, i, m, l = _10e.length,
                        _110;
                    if (!(this instanceof a.callee)) {
                        return _111(a);
                    }
                    if (_10f && (a0 && a0.preamble || this.preamble)) {
                        _110 = new Array(_10e.length);
                        _110[0] = a;
                        for (i = 0;;) {
                            a0 = a[0];
                            if (a0) {
                                f = a0.preamble;
                                if (f) {
                                    a = f.apply(this, a) || a;
                                }
                            }
                            f = _10e[i].prototype;
                            f = f.hasOwnProperty("preamble") && f.preamble;
                            if (f) {
                                a = f.apply(this, a) || a;
                            }
                            if (++i == l) {
                                break;
                            }
                            _110[i] = a;
                        }
                    }
                    for (i = l - 1; i >= 0; --i) {
                        f = _10e[i];
                        m = f._meta;
                        f = m ? m.ctor : f;
                        if (f) {
                            f.apply(this, _110 ? _110[i] : a);
                        }
                    }
                    f = this.postscript;
                    if (f) {
                        f.apply(this, args);
                    }
                };
            };

            function _112(ctor, _113) {
                return function() {
                    var a = arguments,
                        t = a,
                        a0 = a[0],
                        f;
                    if (!(this instanceof a.callee)) {
                        return _111(a);
                    }
                    if (_113) {
                        if (a0) {
                            f = a0.preamble;
                            if (f) {
                                t = f.apply(this, t) || t;
                            }
                        }
                        f = this.preamble;
                        if (f) {
                            f.apply(this, t);
                        }
                    }
                    if (ctor) {
                        ctor.apply(this, a);
                    }
                    f = this.postscript;
                    if (f) {
                        f.apply(this, a);
                    }
                };
            };

            function _114(_115) {
                return function() {
                    var a = arguments,
                        i = 0,
                        f, m;
                    if (!(this instanceof a.callee)) {
                        return _111(a);
                    }
                    for (; f = _115[i]; ++i) {
                        m = f._meta;
                        f = m ? m.ctor : f;
                        if (f) {
                            f.apply(this, a);
                            break;
                        }
                    }
                    f = this.postscript;
                    if (f) {
                        f.apply(this, a);
                    }
                };
            };

            function _116(name, _117, _118) {
                return function() {
                    var b, m, f, i = 0,
                        step = 1;
                    if (_118) {
                        i = _117.length - 1;
                        step = -1;
                    }
                    for (; b = _117[i]; i += step) {
                        m = b._meta;
                        f = (m ? m.hidden : b.prototype)[name];
                        if (f) {
                            f.apply(this, arguments);
                        }
                    }
                };
            };

            function _119(ctor) {
                _ec.prototype = ctor.prototype;
                var t = new _ec;
                _ec.prototype = null;
                return t;
            };

            function _111(args) {
                var ctor = args.callee,
                    t = _119(ctor);
                ctor.apply(t, args);
                return t;
            };
            d.declare = function(_11a, _11b, _11c) {
                if (typeof _11a != "string") {
                    _11c = _11b;
                    _11b = _11a;
                    _11a = "";
                }
                _11c = _11c || {};
                var _11d, i, t, ctor, name, _11e, _11f, _120 = 1,
                    _121 = _11b;
                if (_eb.call(_11b) == "[object Array]") {
                    _11e = _ef(_11b, _11a);
                    t = _11e[0];
                    _120 = _11e.length - t;
                    _11b = _11e[_120];
                } else {
                    _11e = [0];
                    if (_11b) {
                        if (_eb.call(_11b) == "[object Function]") {
                            t = _11b._meta;
                            _11e = _11e.concat(t ? t.bases : _11b);
                        } else {
                            err("base class is not a callable constructor.", _11a);
                        }
                    } else {
                        if (_11b !== null) {
                            err("unknown base class. Did you use dojo.require to pull it in?", _11a);
                        }
                    }
                }
                if (_11b) {
                    for (i = _120 - 1;; --i) {
                        _11d = _119(_11b);
                        if (!i) {
                            break;
                        }
                        t = _11e[i];
                        (t._meta ? _105 : mix)(_11d, t.prototype);
                        ctor = new Function;
                        ctor.superclass = _11b;
                        ctor.prototype = _11d;
                        _11b = _11d.constructor = ctor;
                    }
                } else {
                    _11d = {};
                }
                _108(_11d, _11c);
                t = _11c.constructor;
                if (t !== op.constructor) {
                    t.nom = _ee;
                    _11d.constructor = t;
                }
                for (i = _120 - 1; i; --i) {
                    t = _11e[i]._meta;
                    if (t && t.chains) {
                        _11f = mix(_11f || {}, t.chains);
                    }
                }
                if (_11d["-chains-"]) {
                    _11f = mix(_11f || {}, _11d["-chains-"]);
                }
                t = !_11f || !_11f.hasOwnProperty(_ee);
                _11e[0] = ctor = (_11f && _11f.constructor === "manual") ? _114(_11e) : (_11e.length == 1 ? _112(_11c.constructor, t) : _10d(_11e, t));
                ctor._meta = {
                    bases: _11e,
                    hidden: _11c,
                    chains: _11f,
                    parents: _121,
                    ctor: _11c.constructor
                };
                ctor.superclass = _11b && _11b.prototype;
                ctor.extend = _10b;
                ctor.prototype = _11d;
                _11d.constructor = ctor;
                _11d.getInherited = _102;
                _11d.inherited = _fa;
                _11d.isInstanceOf = _103;
                if (_11a) {
                    _11d.declaredClass = _11a;
                    d.setObject(_11a, ctor);
                }
                if (_11f) {
                    for (name in _11f) {
                        if (_11d[name] && typeof _11f[name] == "string" && name != _ee) {
                            t = _11d[name] = _116(name, _11e, _11f[name] === "after");
                            t.nom = name;
                        }
                    }
                }
                return ctor;
            };
            d.safeMixin = _108;
        })();
    }
    if (!dojo._hasResource["dojo._base.connect"]) {
        dojo._hasResource["dojo._base.connect"] = true;
        dojo.provide("dojo._base.connect");
        dojo._listener = {
            getDispatcher: function() {
                return function() {
                    var ap = Array.prototype,
                        c = arguments.callee,
                        ls = c._listeners,
                        t = c.target,
                        r = t && t.apply(this, arguments),
                        i, lls = [].concat(ls);
                    for (i in lls) {
                        if (!(i in ap)) {
                            lls[i].apply(this, arguments);
                        }
                    }
                    return r;
                };
            },
            add: function(_122, _123, _124) {
                _122 = _122 || dojo.global;
                var f = _122[_123];
                if (!f || !f._listeners) {
                    var d = dojo._listener.getDispatcher();
                    d.target = f;
                    d._listeners = [];
                    f = _122[_123] = d;
                }
                return f._listeners.push(_124);
            },
            remove: function(_125, _126, _127) {
                var f = (_125 || dojo.global)[_126];
                if (f && f._listeners && _127--) {
                    delete f._listeners[_127];
                }
            }
        };
        dojo.connect = function(obj, _128, _129, _12a, _12b) {
            var a = arguments,
                args = [],
                i = 0;
            args.push(dojo.isString(a[0]) ? null : a[i++], a[i++]);
            var a1 = a[i + 1];
            args.push(dojo.isString(a1) || dojo.isFunction(a1) ? a[i++] : null, a[i++]);
            for (var l = a.length; i < l; i++) {
                args.push(a[i]);
            }
            return dojo._connect.apply(this, args);
        };
        dojo._connect = function(obj, _12c, _12d, _12e) {
            var l = dojo._listener,
                h = l.add(obj, _12c, dojo.hitch(_12d, _12e));
            return [obj, _12c, h, l];
        };
        dojo.disconnect = function(_12f) {
            if (_12f && _12f[0] !== undefined) {
                dojo._disconnect.apply(this, _12f);
                delete _12f[0];
            }
        };
        dojo._disconnect = function(obj, _130, _131, _132) {
            _132.remove(obj, _130, _131);
        };
        dojo._topics = {};
        dojo.subscribe = function(_133, _134, _135) {
            return [_133, dojo._listener.add(dojo._topics, _133, dojo.hitch(_134, _135))];
        };
        dojo.unsubscribe = function(_136) {
            if (_136) {
                dojo._listener.remove(dojo._topics, _136[0], _136[1]);
            }
        };
        dojo.publish = function(_137, args) {
            var f = dojo._topics[_137];
            if (f) {
                f.apply(this, args || []);
            }
        };
        dojo.connectPublisher = function(_138, obj, _139) {
            var pf = function() {
                dojo.publish(_138, arguments);
            };
            return _139 ? dojo.connect(obj, _139, pf) : dojo.connect(obj, pf);
        };
    }
    if (!dojo._hasResource["dojo._base.Deferred"]) {
        dojo._hasResource["dojo._base.Deferred"] = true;
        dojo.provide("dojo._base.Deferred");
        (function() {
            var _13a = function() {};
            var _13b = Object.freeze || function() {};
            dojo.Deferred = function(_13c) {
                var _13d, _13e, _13f, head, _140;
                var _141 = (this.promise = {});

                function _142(_143) {
                    if (_13e) {
                        throw new Error("This deferred has already been resolved");
                    }
                    _13d = _143;
                    _13e = true;
                    _144();
                };

                function _144() {
                    var _145;
                    while (!_145 && _140) {
                        var _146 = _140;
                        _140 = _140.next;
                        if ((_145 = (_146.progress == _13a))) {
                            _13e = false;
                        }
                        var func = (_13f ? _146.error : _146.resolved);
                        if (func) {
                            try {
                                var _147 = func(_13d);
                                if (_147 && typeof _147.then === "function") {
                                    _147.then(dojo.hitch(_146.deferred, "resolve"), dojo.hitch(_146.deferred, "reject"));
                                    continue;
                                }
                                var _148 = _145 && _147 === undefined;
                                if (_145 && !_148) {
                                    _13f = _147 instanceof Error;
                                }
                                _146.deferred[_148 && _13f ? "reject" : "resolve"](_148 ? _13d : _147);
                            } catch (e) {
                                _146.deferred.reject(e);
                            }
                        } else {
                            if (_13f) {
                                _146.deferred.reject(_13d);
                            } else {
                                _146.deferred.resolve(_13d);
                            }
                        }
                    }
                };
                this.resolve = this.callback = function(_149) {
                    this.fired = 0;
                    this.results = [_149, null];
                    _142(_149);
                };
                this.reject = this.errback = function(_14a) {
                    _13f = true;
                    this.fired = 1;
                    _142(_14a);
                    this.results = [null, _14a];
                    if (!_14a || _14a.log !== false) {
                        (dojo.config.deferredOnError || function(x) {})(_14a);
                    }
                };
                this.progress = function(_14b) {
                    var _14c = _140;
                    while (_14c) {
                        var _14d = _14c.progress;
                        _14d && _14d(_14b);
                        _14c = _14c.next;
                    }
                };
                this.addCallbacks = function(_14e, _14f) {
                    this.then(_14e, _14f, _13a);
                    return this;
                };
                this.then = _141.then = function(_150, _151, _152) {
                    var _153 = _152 == _13a ? this : new dojo.Deferred(_141.cancel);
                    var _154 = {
                        resolved: _150,
                        error: _151,
                        progress: _152,
                        deferred: _153
                    };
                    if (_140) {
                        head = head.next = _154;
                    } else {
                        _140 = head = _154;
                    }
                    if (_13e) {
                        _144();
                    }
                    return _153.promise;
                };
                var _155 = this;
                this.cancel = _141.cancel = function() {
                    if (!_13e) {
                        var _156 = _13c && _13c(_155);
                        if (!_13e) {
                            if (!(_156 instanceof Error)) {
                                _156 = new Error(_156);
                            }
                            _156.log = false;
                            _155.reject(_156);
                        }
                    }
                };
                _13b(_141);
            };
            dojo.extend(dojo.Deferred, {
                addCallback: function(_157) {
                    return this.addCallbacks(dojo.hitch.apply(dojo, arguments));
                },
                addErrback: function(_158) {
                    return this.addCallbacks(null, dojo.hitch.apply(dojo, arguments));
                },
                addBoth: function(_159) {
                    var _15a = dojo.hitch.apply(dojo, arguments);
                    return this.addCallbacks(_15a, _15a);
                },
                fired: -1
            });
        })();
        dojo.when = function(_15b, _15c, _15d, _15e) {
            if (_15b && typeof _15b.then === "function") {
                return _15b.then(_15c, _15d, _15e);
            }
            return _15c(_15b);
        };
    }
    if (!dojo._hasResource["dojo._base.json"]) {
        dojo._hasResource["dojo._base.json"] = true;
        dojo.provide("dojo._base.json");
        dojo.fromJson = function(json) {
            return eval("(" + json + ")");
        };
        dojo._escapeString = function(str) {
            return ("\"" + str.replace(/(["\\])/g, "\\$1") + "\"").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
        };
        dojo.toJsonIndentStr = "\t";
        dojo.toJson = function(it, _15f, _160) {
            if (it === undefined) {
                return "undefined";
            }
            var _161 = typeof it;
            if (_161 == "number" || _161 == "boolean") {
                return it + "";
            }
            if (it === null) {
                return "null";
            }
            if (dojo.isString(it)) {
                return dojo._escapeString(it);
            }
            var _162 = arguments.callee;
            var _163;
            _160 = _160 || "";
            var _164 = _15f ? _160 + dojo.toJsonIndentStr : "";
            var tf = it.__json__ || it.json;
            if (dojo.isFunction(tf)) {
                _163 = tf.call(it);
                if (it !== _163) {
                    return _162(_163, _15f, _164);
                }
            }
            if (it.nodeType && it.cloneNode) {
                throw new Error("Can't serialize DOM nodes");
            }
            var sep = _15f ? " " : "";
            var _165 = _15f ? "\n" : "";
            if (dojo.isArray(it)) {
                var res = dojo.map(it, function(obj) {
                    var val = _162(obj, _15f, _164);
                    if (typeof val != "string") {
                        val = "undefined";
                    }
                    return _165 + _164 + val;
                });
                return "[" + res.join("," + sep) + _165 + _160 + "]";
            }
            if (_161 == "function") {
                return null;
            }
            var _166 = [],
                key;
            for (key in it) {
                var _167, val;
                if (typeof key == "number") {
                    _167 = "\"" + key + "\"";
                } else {
                    if (typeof key == "string") {
                        _167 = dojo._escapeString(key);
                    } else {
                        continue;
                    }
                }
                val = _162(it[key], _15f, _164);
                if (typeof val != "string") {
                    continue;
                }
                _166.push(_165 + _164 + _167 + ":" + sep + val);
            }
            return "{" + _166.join("," + sep) + _165 + _160 + "}";
        };
    }
    if (!dojo._hasResource["dojo._base.Color"]) {
        dojo._hasResource["dojo._base.Color"] = true;
        dojo.provide("dojo._base.Color");
        (function() {
            var d = dojo;
            dojo.Color = function(_168) {
                if (_168) {
                    this.setColor(_168);
                }
            };
            dojo.Color.named = {
                black: [0, 0, 0],
                silver: [192, 192, 192],
                gray: [128, 128, 128],
                white: [255, 255, 255],
                maroon: [128, 0, 0],
                red: [255, 0, 0],
                purple: [128, 0, 128],
                fuchsia: [255, 0, 255],
                green: [0, 128, 0],
                lime: [0, 255, 0],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                navy: [0, 0, 128],
                blue: [0, 0, 255],
                teal: [0, 128, 128],
                aqua: [0, 255, 255],
                transparent: d.config.transparentColor || [255, 255, 255]
            };
            dojo.extend(dojo.Color, {
                r: 255,
                g: 255,
                b: 255,
                a: 1,
                _set: function(r, g, b, a) {
                    var t = this;
                    t.r = r;
                    t.g = g;
                    t.b = b;
                    t.a = a;
                },
                setColor: function(_169) {
                    if (d.isString(_169)) {
                        d.colorFromString(_169, this);
                    } else {
                        if (d.isArray(_169)) {
                            d.colorFromArray(_169, this);
                        } else {
                            this._set(_169.r, _169.g, _169.b, _169.a);
                            if (!(_169 instanceof d.Color)) {
                                this.sanitize();
                            }
                        }
                    }
                    return this;
                },
                sanitize: function() {
                    return this;
                },
                toRgb: function() {
                    var t = this;
                    return [t.r, t.g, t.b];
                },
                toRgba: function() {
                    var t = this;
                    return [t.r, t.g, t.b, t.a];
                },
                toHex: function() {
                    var arr = d.map(["r", "g", "b"], function(x) {
                        var s = this[x].toString(16);
                        return s.length < 2 ? "0" + s : s;
                    }, this);
                    return "#" + arr.join("");
                },
                toCss: function(_16a) {
                    var t = this,
                        rgb = t.r + ", " + t.g + ", " + t.b;
                    return (_16a ? "rgba(" + rgb + ", " + t.a : "rgb(" + rgb) + ")";
                },
                toString: function() {
                    return this.toCss(true);
                }
            });
            dojo.blendColors = function(_16b, end, _16c, obj) {
                var t = obj || new d.Color();
                d.forEach(["r", "g", "b", "a"], function(x) {
                    t[x] = _16b[x] + (end[x] - _16b[x]) * _16c;
                    if (x != "a") {
                        t[x] = Math.round(t[x]);
                    }
                });
                return t.sanitize();
            };
            dojo.colorFromRgb = function(_16d, obj) {
                var m = _16d.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
                return m && dojo.colorFromArray(m[1].split(/\s*,\s*/), obj);
            };
            dojo.colorFromHex = function(_16e, obj) {
                var t = obj || new d.Color(),
                    bits = (_16e.length == 4) ? 4 : 8,
                    mask = (1 << bits) - 1;
                _16e = Number("0x" + _16e.substr(1));
                if (isNaN(_16e)) {
                    return null;
                }
                d.forEach(["b", "g", "r"], function(x) {
                    var c = _16e & mask;
                    _16e >>= bits;
                    t[x] = bits == 4 ? 17 * c : c;
                });
                t.a = 1;
                return t;
            };
            dojo.colorFromArray = function(a, obj) {
                var t = obj || new d.Color();
                t._set(Number(a[0]), Number(a[1]), Number(a[2]), Number(a[3]));
                if (isNaN(t.a)) {
                    t.a = 1;
                }
                return t.sanitize();
            };
            dojo.colorFromString = function(str, obj) {
                var a = d.Color.named[str];
                return a && d.colorFromArray(a, obj) || d.colorFromRgb(str, obj) || d.colorFromHex(str, obj);
            };
        })();
    }
    if (!dojo._hasResource["dojo._base.window"]) {
        dojo._hasResource["dojo._base.window"] = true;
        dojo.provide("dojo._base.window");
        dojo.doc = window["document"] || null;
        dojo.body = function() {
            return dojo.doc.body || dojo.doc.getElementsByTagName("body")[0];
        };
        dojo.setContext = function(_16f, _170) {
            dojo.global = _16f;
            dojo.doc = _170;
        };
        dojo.withGlobal = function(_171, _172, _173, _174) {
            var _175 = dojo.global;
            try {
                dojo.global = _171;
                return dojo.withDoc.call(null, _171.document, _172, _173, _174);
            } finally {
                dojo.global = _175;
            }
        };
        dojo.withDoc = function(_176, _177, _178, _179) {
            var _17a = dojo.doc,
                _17b = dojo._bodyLtr,
                oldQ = dojo.isQuirks;
            try {
                dojo.doc = _176;
                delete dojo._bodyLtr;
                dojo.isQuirks = dojo.doc.compatMode == "BackCompat";
                if (_178 && typeof _177 == "string") {
                    _177 = _178[_177];
                }
                return _177.apply(_178, _179 || []);
            } finally {
                dojo.doc = _17a;
                delete dojo._bodyLtr;
                if (_17b !== undefined) {
                    dojo._bodyLtr = _17b;
                }
                dojo.isQuirks = oldQ;
            }
        };
    }
    if (!dojo._hasResource["dojo._base.event"]) {
        dojo._hasResource["dojo._base.event"] = true;
        dojo.provide("dojo._base.event");
        (function() {
            var del = (dojo._event_listener = {
                add: function(node, name, fp) {
                    if (!node) {
                        return;
                    }
                    name = del._normalizeEventName(name);
                    fp = del._fixCallback(name, fp);
                    if (!dojo.isIE && (name == "mouseenter" || name == "mouseleave")) {
                        var ofp = fp;
                        name = (name == "mouseenter") ? "mouseover" : "mouseout";
                        fp = function(e) {
                            if (!dojo.isDescendant(e.relatedTarget, node)) {
                                return ofp.call(this, e);
                            }
                        };
                    }
                    node.addEventListener(name, fp, false);
                    return fp;
                },
                remove: function(node, _17c, _17d) {
                    if (node) {
                        _17c = del._normalizeEventName(_17c);
                        if (!dojo.isIE && (_17c == "mouseenter" || _17c == "mouseleave")) {
                            _17c = (_17c == "mouseenter") ? "mouseover" : "mouseout";
                        }
                        node.removeEventListener(_17c, _17d, false);
                    }
                },
                _normalizeEventName: function(name) {
                    return name.slice(0, 2) == "on" ? name.slice(2) : name;
                },
                _fixCallback: function(name, fp) {
                    return name != "keypress" ? fp : function(e) {
                        return fp.call(this, del._fixEvent(e, this));
                    };
                },
                _fixEvent: function(evt, _17e) {
                    switch (evt.type) {
                        case "keypress":
                            del._setKeyChar(evt);
                            break;
                    }
                    return evt;
                },
                _setKeyChar: function(evt) {
                    evt.keyChar = evt.charCode >= 32 ? String.fromCharCode(evt.charCode) : "";
                    evt.charOrCode = evt.keyChar || evt.keyCode;
                },
                _punctMap: {
                    106: 42,
                    111: 47,
                    186: 59,
                    187: 43,
                    188: 44,
                    189: 45,
                    190: 46,
                    191: 47,
                    192: 96,
                    219: 91,
                    220: 92,
                    221: 93,
                    222: 39
                }
            });
            dojo.fixEvent = function(evt, _17f) {
                return del._fixEvent(evt, _17f);
            };
            dojo.stopEvent = function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
            };
            var _180 = dojo._listener;
            dojo._connect = function(obj, _181, _182, _183, _184) {
                var _185 = obj && (obj.nodeType || obj.attachEvent || obj.addEventListener);
                var lid = _185 ? (_184 ? 2 : 1) : 0,
                    l = [dojo._listener, del, _180][lid];
                var h = l.add(obj, _181, dojo.hitch(_182, _183));
                return [obj, _181, h, lid];
            };
            dojo._disconnect = function(obj, _186, _187, _188) {
                ([dojo._listener, del, _180][_188]).remove(obj, _186, _187);
            };
            dojo.keys = {
                BACKSPACE: 8,
                TAB: 9,
                CLEAR: 12,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                META: dojo.isSafari ? 91 : 224,
                PAUSE: 19,
                CAPS_LOCK: 20,
                ESCAPE: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT_ARROW: 37,
                UP_ARROW: 38,
                RIGHT_ARROW: 39,
                DOWN_ARROW: 40,
                INSERT: 45,
                DELETE: 46,
                HELP: 47,
                LEFT_WINDOW: 91,
                RIGHT_WINDOW: 92,
                SELECT: 93,
                NUMPAD_0: 96,
                NUMPAD_1: 97,
                NUMPAD_2: 98,
                NUMPAD_3: 99,
                NUMPAD_4: 100,
                NUMPAD_5: 101,
                NUMPAD_6: 102,
                NUMPAD_7: 103,
                NUMPAD_8: 104,
                NUMPAD_9: 105,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_PLUS: 107,
                NUMPAD_ENTER: 108,
                NUMPAD_MINUS: 109,
                NUMPAD_PERIOD: 110,
                NUMPAD_DIVIDE: 111,
                F1: 112,
                F2: 113,
                F3: 114,
                F4: 115,
                F5: 116,
                F6: 117,
                F7: 118,
                F8: 119,
                F9: 120,
                F10: 121,
                F11: 122,
                F12: 123,
                F13: 124,
                F14: 125,
                F15: 126,
                NUM_LOCK: 144,
                SCROLL_LOCK: 145,
                copyKey: dojo.isMac && !dojo.isAIR ? (dojo.isSafari ? 91 : 224) : 17
            };
            var _189 = dojo.isMac ? "metaKey" : "ctrlKey";
            dojo.isCopyKey = function(e) {
                return e[_189];
            };
            if (dojo.isIE < 9 || (dojo.isIE && dojo.isQuirks)) {
                dojo.mouseButtons = {
                    LEFT: 1,
                    MIDDLE: 4,
                    RIGHT: 2,
                    isButton: function(e, _18a) {
                        return e.button & _18a;
                    },
                    isLeft: function(e) {
                        return e.button & 1;
                    },
                    isMiddle: function(e) {
                        return e.button & 4;
                    },
                    isRight: function(e) {
                        return e.button & 2;
                    }
                };
            } else {
                dojo.mouseButtons = {
                    LEFT: 0,
                    MIDDLE: 1,
                    RIGHT: 2,
                    isButton: function(e, _18b) {
                        return e.button == _18b;
                    },
                    isLeft: function(e) {
                        return e.button == 0;
                    },
                    isMiddle: function(e) {
                        return e.button == 1;
                    },
                    isRight: function(e) {
                        return e.button == 2;
                    }
                };
            }
            if (dojo.isIE) {
                var _18c = function(e, code) {
                    try {
                        return (e.keyCode = code);
                    } catch (e) {
                        return 0;
                    }
                };
                var iel = dojo._listener;
                var _18d = (dojo._ieListenersName = "_" + dojo._scopeName + "_listeners");
                if (!dojo.config._allow_leaks) {
                    _180 = iel = dojo._ie_listener = {
                        handlers: [],
                        add: function(_18e, _18f, _190) {
                            _18e = _18e || dojo.global;
                            var f = _18e[_18f];
                            if (!f || !f[_18d]) {
                                var d = dojo._getIeDispatcher();
                                d.target = f && (ieh.push(f) - 1);
                                d[_18d] = [];
                                f = _18e[_18f] = d;
                            }
                            return f[_18d].push(ieh.push(_190) - 1);
                        },
                        remove: function(_191, _192, _193) {
                            var f = (_191 || dojo.global)[_192],
                                l = f && f[_18d];
                            if (f && l && _193--) {
                                delete ieh[l[_193]];
                                delete l[_193];
                            }
                        }
                    };
                    var ieh = iel.handlers;
                }
                dojo.mixin(del, {
                    add: function(node, _194, fp) {
                        if (!node) {
                            return;
                        }
                        _194 = del._normalizeEventName(_194);
                        if (_194 == "onkeypress") {
                            var kd = node.onkeydown;
                            if (!kd || !kd[_18d] || !kd._stealthKeydownHandle) {
                                var h = del.add(node, "onkeydown", del._stealthKeyDown);
                                kd = node.onkeydown;
                                kd._stealthKeydownHandle = h;
                                kd._stealthKeydownRefs = 1;
                            } else {
                                kd._stealthKeydownRefs++;
                            }
                        }
                        return iel.add(node, _194, del._fixCallback(fp));
                    },
                    remove: function(node, _195, _196) {
                        _195 = del._normalizeEventName(_195);
                        iel.remove(node, _195, _196);
                        if (_195 == "onkeypress") {
                            var kd = node.onkeydown;
                            if (--kd._stealthKeydownRefs <= 0) {
                                iel.remove(node, "onkeydown", kd._stealthKeydownHandle);
                                delete kd._stealthKeydownHandle;
                            }
                        }
                    },
                    _normalizeEventName: function(_197) {
                        return _197.slice(0, 2) != "on" ? "on" + _197 : _197;
                    },
                    _nop: function() {},
                    _fixEvent: function(evt, _198) {
                        if (!evt) {
                            var w = _198 && (_198.ownerDocument || _198.document || _198).parentWindow || window;
                            evt = w.event;
                        }
                        if (!evt) {
                            return (evt);
                        }
                        evt.target = evt.srcElement;
                        evt.currentTarget = (_198 || evt.srcElement);
                        evt.layerX = evt.offsetX;
                        evt.layerY = evt.offsetY;
                        var se = evt.srcElement,
                            doc = (se && se.ownerDocument) || document;
                        var _199 = ((dojo.isIE < 6) || (doc["compatMode"] == "BackCompat")) ? doc.body : doc.documentElement;
                        var _19a = dojo._getIeDocumentElementOffset();
                        evt.pageX = evt.clientX + dojo._fixIeBiDiScrollLeft(_199.scrollLeft || 0) - _19a.x;
                        evt.pageY = evt.clientY + (_199.scrollTop || 0) - _19a.y;
                        if (evt.type == "mouseover") {
                            evt.relatedTarget = evt.fromElement;
                        }
                        if (evt.type == "mouseout") {
                            evt.relatedTarget = evt.toElement;
                        }
                        if (dojo.isIE < 9 || dojo.isQuirks) {
                            evt.stopPropagation = del._stopPropagation;
                            evt.preventDefault = del._preventDefault;
                        }
                        return del._fixKeys(evt);
                    },
                    _fixKeys: function(evt) {
                        switch (evt.type) {
                            case "keypress":
                                var c = ("charCode" in evt ? evt.charCode : evt.keyCode);
                                if (c == 10) {
                                    c = 0;
                                    evt.keyCode = 13;
                                } else {
                                    if (c == 13 || c == 27) {
                                        c = 0;
                                    } else {
                                        if (c == 3) {
                                            c = 99;
                                        }
                                    }
                                }
                                evt.charCode = c;
                                del._setKeyChar(evt);
                                break;
                        }
                        return evt;
                    },
                    _stealthKeyDown: function(evt) {
                        var kp = evt.currentTarget.onkeypress;
                        if (!kp || !kp[_18d]) {
                            return;
                        }
                        var k = evt.keyCode;
                        var _19b = (k != 13 || (dojo.isIE >= 9 && !dojo.isQuirks)) && k != 32 && k != 27 && (k < 48 || k > 90) && (k < 96 || k > 111) && (k < 186 || k > 192) && (k < 219 || k > 222);
                        if (_19b || evt.ctrlKey) {
                            var c = _19b ? 0 : k;
                            if (evt.ctrlKey) {
                                if (k == 3 || k == 13) {
                                    return;
                                } else {
                                    if (c > 95 && c < 106) {
                                        c -= 48;
                                    } else {
                                        if ((!evt.shiftKey) && (c >= 65 && c <= 90)) {
                                            c += 32;
                                        } else {
                                            c = del._punctMap[c] || c;
                                        }
                                    }
                                }
                            }
                            var faux = del._synthesizeEvent(evt, {
                                type: "keypress",
                                faux: true,
                                charCode: c
                            });
                            kp.call(evt.currentTarget, faux);
                            if (dojo.isIE < 9 || (dojo.isIE && dojo.isQuirks)) {
                                evt.cancelBubble = faux.cancelBubble;
                            }
                            evt.returnValue = faux.returnValue;
                            _18c(evt, faux.keyCode);
                        }
                    },
                    _stopPropagation: function() {
                        this.cancelBubble = true;
                    },
                    _preventDefault: function() {
                        this.bubbledKeyCode = this.keyCode;
                        if (this.ctrlKey) {
                            _18c(this, 0);
                        }
                        this.returnValue = false;
                    }
                });
                dojo.stopEvent = (dojo.isIE < 9 || dojo.isQuirks) ? function(evt) {
                    evt = evt || window.event;
                    del._stopPropagation.call(evt);
                    del._preventDefault.call(evt);
                } : dojo.stopEvent;
            }
            del._synthesizeEvent = function(evt, _19c) {
                var faux = dojo.mixin({}, evt, _19c);
                del._setKeyChar(faux);
                faux.preventDefault = function() {
                    evt.preventDefault();
                };
                faux.stopPropagation = function() {
                    evt.stopPropagation();
                };
                return faux;
            };
            if (dojo.isOpera) {
                dojo.mixin(del, {
                    _fixEvent: function(evt, _19d) {
                        switch (evt.type) {
                            case "keypress":
                                var c = evt.which;
                                if (c == 3) {
                                    c = 99;
                                }
                                c = c < 41 && !evt.shiftKey ? 0 : c;
                                if (evt.ctrlKey && !evt.shiftKey && c >= 65 && c <= 90) {
                                    c += 32;
                                }
                                return del._synthesizeEvent(evt, {
                                    charCode: c
                                });
                        }
                        return evt;
                    }
                });
            }
            if (dojo.isWebKit) {
                del._add = del.add;
                del._remove = del.remove;
                dojo.mixin(del, {
                    add: function(node, _19e, fp) {
                        if (!node) {
                            return;
                        }
                        var _19f = del._add(node, _19e, fp);
                        if (del._normalizeEventName(_19e) == "keypress") {
                            _19f._stealthKeyDownHandle = del._add(node, "keydown", function(evt) {
                                var k = evt.keyCode;
                                var _1a0 = k != 13 && k != 32 && (k < 48 || k > 90) && (k < 96 || k > 111) && (k < 186 || k > 192) && (k < 219 || k > 222);
                                if (_1a0 || evt.ctrlKey) {
                                    var c = _1a0 ? 0 : k;
                                    if (evt.ctrlKey) {
                                        if (k == 3 || k == 13) {
                                            return;
                                        } else {
                                            if (c > 95 && c < 106) {
                                                c -= 48;
                                            } else {
                                                if (!evt.shiftKey && c >= 65 && c <= 90) {
                                                    c += 32;
                                                } else {
                                                    c = del._punctMap[c] || c;
                                                }
                                            }
                                        }
                                    }
                                    var faux = del._synthesizeEvent(evt, {
                                        type: "keypress",
                                        faux: true,
                                        charCode: c
                                    });
                                    fp.call(evt.currentTarget, faux);
                                }
                            });
                        }
                        return _19f;
                    },
                    remove: function(node, _1a1, _1a2) {
                        if (node) {
                            if (_1a2._stealthKeyDownHandle) {
                                del._remove(node, "keydown", _1a2._stealthKeyDownHandle);
                            }
                            del._remove(node, _1a1, _1a2);
                        }
                    },
                    _fixEvent: function(evt, _1a3) {
                        switch (evt.type) {
                            case "keypress":
                                if (evt.faux) {
                                    return evt;
                                }
                                var c = evt.charCode;
                                c = c >= 32 ? c : 0;
                                return del._synthesizeEvent(evt, {
                                    charCode: c,
                                    faux: true
                                });
                        }
                        return evt;
                    }
                });
            }
        })();
        if (dojo.isIE) {
            dojo._ieDispatcher = function(args, _1a4) {
                var ap = Array.prototype,
                    h = dojo._ie_listener.handlers,
                    c = args.callee,
                    ls = c[dojo._ieListenersName],
                    t = h[c.target];
                var r = t && t.apply(_1a4, args);
                var lls = [].concat(ls);
                for (var i in lls) {
                    var f = h[lls[i]];
                    if (!(i in ap) && f) {
                        f.apply(_1a4, args);
                    }
                }
                return r;
            };
            dojo._getIeDispatcher = function() {
                return new Function(dojo._scopeName + "._ieDispatcher(arguments, this)");
            };
            dojo._event_listener._fixCallback = function(fp) {
                var f = dojo._event_listener._fixEvent;
                return function(e) {
                    return fp.call(this, f(e, this));
                };
            };
        }
    }
    if (!dojo._hasResource["dojo._base.html"]) {
        dojo._hasResource["dojo._base.html"] = true;
        dojo.provide("dojo._base.html");
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {}
        if (dojo.isIE) {
            dojo.byId = function(id, doc) {
                if (typeof id != "string") {
                    return id;
                }
                var _1a5 = doc || dojo.doc,
                    te = _1a5.getElementById(id);
                if (te && (te.attributes.id.value == id || te.id == id)) {
                    return te;
                } else {
                    var eles = _1a5.all[id];
                    if (!eles || eles.nodeName) {
                        eles = [eles];
                    }
                    var i = 0;
                    while ((te = eles[i++])) {
                        if ((te.attributes && te.attributes.id && te.attributes.id.value == id) || te.id == id) {
                            return te;
                        }
                    }
                }
            };
        } else {
            dojo.byId = function(id, doc) {
                return ((typeof id == "string") ? (doc || dojo.doc).getElementById(id) : id) || null;
            };
        }(function() {
            var d = dojo;
            var byId = d.byId;
            var _1a6 = null,
                _1a7;
            d.addOnWindowUnload(function() {
                _1a6 = null;
            });
            dojo._destroyElement = dojo.destroy = function(node) {
                node = byId(node);
                try {
                    var doc = node.ownerDocument;
                    if (!_1a6 || _1a7 != doc) {
                        _1a6 = doc.createElement("div");
                        _1a7 = doc;
                    }
                    _1a6.appendChild(node.parentNode ? node.parentNode.removeChild(node) : node);
                    _1a6.innerHTML = "";
                } catch (e) {}
            };
            dojo.isDescendant = function(node, _1a8) {
                try {
                    node = byId(node);
                    _1a8 = byId(_1a8);
                    while (node) {
                        if (node == _1a8) {
                            return true;
                        }
                        node = node.parentNode;
                    }
                } catch (e) {}
                return false;
            };
            dojo.setSelectable = function(node, _1a9) {
                node = byId(node);
                if (d.isMozilla) {
                    node.style.MozUserSelect = _1a9 ? "" : "none";
                } else {
                    if (d.isKhtml || d.isWebKit) {
                        node.style.KhtmlUserSelect = _1a9 ? "auto" : "none";
                    } else {
                        if (d.isIE) {
                            var v = (node.unselectable = _1a9 ? "" : "on");
                            d.query("*", node).forEach("item.unselectable = '" + v + "'");
                        }
                    }
                }
            };
            var _1aa = function(node, ref) {
                var _1ab = ref.parentNode;
                if (_1ab) {
                    _1ab.insertBefore(node, ref);
                }
            };
            var _1ac = function(node, ref) {
                var _1ad = ref.parentNode;
                if (_1ad) {
                    if (_1ad.lastChild == ref) {
                        _1ad.appendChild(node);
                    } else {
                        _1ad.insertBefore(node, ref.nextSibling);
                    }
                }
            };
            dojo.place = function(node, _1ae, _1af) {
                _1ae = byId(_1ae);
                if (typeof node == "string") {
                    node = /^\s*</.test(node) ? d._toDom(node, _1ae.ownerDocument) : byId(node);
                }
                if (typeof _1af == "number") {
                    var cn = _1ae.childNodes;
                    if (!cn.length || cn.length <= _1af) {
                        _1ae.appendChild(node);
                    } else {
                        _1aa(node, cn[_1af < 0 ? 0 : _1af]);
                    }
                } else {
                    switch (_1af) {
                        case "before":
                            _1aa(node, _1ae);
                            break;
                        case "after":
                            _1ac(node, _1ae);
                            break;
                        case "replace":
                            _1ae.parentNode.replaceChild(node, _1ae);
                            break;
                        case "only":
                            d.empty(_1ae);
                            _1ae.appendChild(node);
                            break;
                        case "first":
                            if (_1ae.firstChild) {
                                _1aa(node, _1ae.firstChild);
                                break;
                            }
                        default:
                            _1ae.appendChild(node);
                    }
                }
                return node;
            };
            dojo.boxModel = "content-box";
            if (d.isIE) {
                d.boxModel = document.compatMode == "BackCompat" ? "border-box" : "content-box";
            }
            var gcs;
            if (d.isWebKit) {
                gcs = function(node) {
                    var s;
                    if (node.nodeType == 1) {
                        var dv = node.ownerDocument.defaultView;
                        s = dv.getComputedStyle(node, null);
                        if (!s && node.style) {
                            node.style.display = "";
                            s = dv.getComputedStyle(node, null);
                        }
                    }
                    return s || {};
                };
            } else {
                if (d.isIE) {
                    gcs = function(node) {
                        return node.nodeType == 1 ? node.currentStyle : {};
                    };
                } else {
                    gcs = function(node) {
                        return node.nodeType == 1 ? node.ownerDocument.defaultView.getComputedStyle(node, null) : {};
                    };
                }
            }
            dojo.getComputedStyle = gcs;
            if (!d.isIE) {
                d._toPixelValue = function(_1b0, _1b1) {
                    return parseFloat(_1b1) || 0;
                };
            } else {
                d._toPixelValue = function(_1b2, _1b3) {
                    if (!_1b3) {
                        return 0;
                    }
                    if (_1b3 == "medium") {
                        return 4;
                    }
                    if (_1b3.slice && _1b3.slice(-2) == "px") {
                        return parseFloat(_1b3);
                    }
                    with(_1b2) {
                        var _1b4 = style.left;
                        var _1b5 = runtimeStyle.left;
                        runtimeStyle.left = currentStyle.left;
                        try {
                            style.left = _1b3;
                            _1b3 = style.pixelLeft;
                        } catch (e) {
                            _1b3 = 0;
                        }
                        style.left = _1b4;
                        runtimeStyle.left = _1b5;
                    }
                    return _1b3;
                };
            }
            var px = d._toPixelValue;
            var astr = "DXImageTransform.Microsoft.Alpha";
            var af = function(n, f) {
                try {
                    return n.filters.item(astr);
                } catch (e) {
                    return f ? {} : null;
                }
            };
            dojo._getOpacity = d.isIE < 9 ? function(node) {
                try {
                    return af(node).Opacity / 100;
                } catch (e) {
                    return 1;
                }
            } : function(node) {
                return gcs(node).opacity;
            };
            dojo._setOpacity = d.isIE < 9 ? function(node, _1b6) {
                var ov = _1b6 * 100,
                    _1b7 = _1b6 == 1;
                node.style.zoom = _1b7 ? "" : 1;
                if (!af(node)) {
                    if (_1b7) {
                        return _1b6;
                    }
                    node.style.filter += " progid:" + astr + "(Opacity=" + ov + ")";
                } else {
                    af(node, 1).Opacity = ov;
                }
                af(node, 1).Enabled = !_1b7;
                if (node.nodeName.toLowerCase() == "tr") {
                    d.query("> td", node).forEach(function(i) {
                        d._setOpacity(i, _1b6);
                    });
                }
                return _1b6;
            } : function(node, _1b8) {
                return node.style.opacity = _1b8;
            };
            var _1b9 = {
                left: true,
                top: true
            };
            var _1ba = /margin|padding|width|height|max|min|offset/;
            var _1bb = function(node, type, _1bc) {
                type = type.toLowerCase();
                if (d.isIE) {
                    if (_1bc == "auto") {
                        if (type == "height") {
                            return node.offsetHeight;
                        }
                        if (type == "width") {
                            return node.offsetWidth;
                        }
                    }
                    if (type == "fontweight") {
                        switch (_1bc) {
                            case 700:
                                return "bold";
                            case 400:
                            default:
                                return "normal";
                        }
                    }
                }
                if (!(type in _1b9)) {
                    _1b9[type] = _1ba.test(type);
                }
                return _1b9[type] ? px(node, _1bc) : _1bc;
            };
            var _1bd = d.isIE ? "styleFloat" : "cssFloat",
                _1be = {
                    "cssFloat": _1bd,
                    "styleFloat": _1bd,
                    "float": _1bd
                };
            dojo.style = function(node, _1bf, _1c0) {
                var n = byId(node),
                    args = arguments.length,
                    op = (_1bf == "opacity");
                _1bf = _1be[_1bf] || _1bf;
                if (args == 3) {
                    return op ? d._setOpacity(n, _1c0) : n.style[_1bf] = _1c0;
                }
                if (args == 2 && op) {
                    return d._getOpacity(n);
                }
                var s = gcs(n);
                if (args == 2 && typeof _1bf != "string") {
                    for (var x in _1bf) {
                        d.style(node, x, _1bf[x]);
                    }
                    return s;
                }
                return (args == 1) ? s : _1bb(n, _1bf, s[_1bf] || n.style[_1bf]);
            };
            dojo._getPadExtents = function(n, _1c1) {
                var s = _1c1 || gcs(n),
                    l = px(n, s.paddingLeft),
                    t = px(n, s.paddingTop);
                return {
                    l: l,
                    t: t,
                    w: l + px(n, s.paddingRight),
                    h: t + px(n, s.paddingBottom)
                };
            };
            dojo._getBorderExtents = function(n, _1c2) {
                var ne = "none",
                    s = _1c2 || gcs(n),
                    bl = (s.borderLeftStyle != ne ? px(n, s.borderLeftWidth) : 0),
                    bt = (s.borderTopStyle != ne ? px(n, s.borderTopWidth) : 0);
                return {
                    l: bl,
                    t: bt,
                    w: bl + (s.borderRightStyle != ne ? px(n, s.borderRightWidth) : 0),
                    h: bt + (s.borderBottomStyle != ne ? px(n, s.borderBottomWidth) : 0)
                };
            };
            dojo._getPadBorderExtents = function(n, _1c3) {
                var s = _1c3 || gcs(n),
                    p = d._getPadExtents(n, s),
                    b = d._getBorderExtents(n, s);
                return {
                    l: p.l + b.l,
                    t: p.t + b.t,
                    w: p.w + b.w,
                    h: p.h + b.h
                };
            };
            dojo._getMarginExtents = function(n, _1c4) {
                var s = _1c4 || gcs(n),
                    l = px(n, s.marginLeft),
                    t = px(n, s.marginTop),
                    r = px(n, s.marginRight),
                    b = px(n, s.marginBottom);
                if (d.isWebKit && (s.position != "absolute")) {
                    r = l;
                }
                return {
                    l: l,
                    t: t,
                    w: l + r,
                    h: t + b
                };
            };
            dojo._getMarginBox = function(node, _1c5) {
                var s = _1c5 || gcs(node),
                    me = d._getMarginExtents(node, s);
                var l = node.offsetLeft - me.l,
                    t = node.offsetTop - me.t,
                    p = node.parentNode;
                if (d.isMoz) {
                    var sl = parseFloat(s.left),
                        st = parseFloat(s.top);
                    if (!isNaN(sl) && !isNaN(st)) {
                        l = sl, t = st;
                    } else {
                        if (p && p.style) {
                            var pcs = gcs(p);
                            if (pcs.overflow != "visible") {
                                var be = d._getBorderExtents(p, pcs);
                                l += be.l, t += be.t;
                            }
                        }
                    }
                } else {
                    if (d.isOpera || (d.isIE > 7 && !d.isQuirks)) {
                        if (p) {
                            be = d._getBorderExtents(p);
                            l -= be.l;
                            t -= be.t;
                        }
                    }
                }
                return {
                    l: l,
                    t: t,
                    w: node.offsetWidth + me.w,
                    h: node.offsetHeight + me.h
                };
            };
            dojo._getMarginSize = function(node, _1c6) {
                node = byId(node);
                var me = d._getMarginExtents(node, _1c6 || gcs(node));
                var size = node.getBoundingClientRect();
                return {
                    w: (size.right - size.left) + me.w,
                    h: (size.bottom - size.top) + me.h
                };
            };
            dojo._getContentBox = function(node, _1c7) {
                var s = _1c7 || gcs(node),
                    pe = d._getPadExtents(node, s),
                    be = d._getBorderExtents(node, s),
                    w = node.clientWidth,
                    h;
                if (!w) {
                    w = node.offsetWidth, h = node.offsetHeight;
                } else {
                    h = node.clientHeight, be.w = be.h = 0;
                }
                if (d.isOpera) {
                    pe.l += be.l;
                    pe.t += be.t;
                }
                return {
                    l: pe.l,
                    t: pe.t,
                    w: w - pe.w - be.w,
                    h: h - pe.h - be.h
                };
            };
            dojo._getBorderBox = function(node, _1c8) {
                var s = _1c8 || gcs(node),
                    pe = d._getPadExtents(node, s),
                    cb = d._getContentBox(node, s);
                return {
                    l: cb.l - pe.l,
                    t: cb.t - pe.t,
                    w: cb.w + pe.w,
                    h: cb.h + pe.h
                };
            };
            dojo._setBox = function(node, l, t, w, h, u) {
                u = u || "px";
                var s = node.style;
                if (!isNaN(l)) {
                    s.left = l + u;
                }
                if (!isNaN(t)) {
                    s.top = t + u;
                }
                if (w >= 0) {
                    s.width = w + u;
                }
                if (h >= 0) {
                    s.height = h + u;
                }
            };
            dojo._isButtonTag = function(node) {
                return node.tagName == "BUTTON" || node.tagName == "INPUT" && (node.getAttribute("type") || "").toUpperCase() == "BUTTON";
            };
            dojo._usesBorderBox = function(node) {
                var n = node.tagName;
                return d.boxModel == "border-box" || n == "TABLE" || d._isButtonTag(node);
            };
            dojo._setContentSize = function(node, _1c9, _1ca, _1cb) {
                if (d._usesBorderBox(node)) {
                    var pb = d._getPadBorderExtents(node, _1cb);
                    if (_1c9 >= 0) {
                        _1c9 += pb.w;
                    }
                    if (_1ca >= 0) {
                        _1ca += pb.h;
                    }
                }
                d._setBox(node, NaN, NaN, _1c9, _1ca);
            };
            dojo._setMarginBox = function(node, _1cc, _1cd, _1ce, _1cf, _1d0) {
                var s = _1d0 || gcs(node),
                    bb = d._usesBorderBox(node),
                    pb = bb ? _1d1 : d._getPadBorderExtents(node, s);
                if (d.isWebKit) {
                    if (d._isButtonTag(node)) {
                        var ns = node.style;
                        if (_1ce >= 0 && !ns.width) {
                            ns.width = "4px";
                        }
                        if (_1cf >= 0 && !ns.height) {
                            ns.height = "4px";
                        }
                    }
                }
                var mb = d._getMarginExtents(node, s);
                if (_1ce >= 0) {
                    _1ce = Math.max(_1ce - pb.w - mb.w, 0);
                }
                if (_1cf >= 0) {
                    _1cf = Math.max(_1cf - pb.h - mb.h, 0);
                }
                d._setBox(node, _1cc, _1cd, _1ce, _1cf);
            };
            var _1d1 = {
                l: 0,
                t: 0,
                w: 0,
                h: 0
            };
            dojo.marginBox = function(node, box) {
                var n = byId(node),
                    s = gcs(n),
                    b = box;
                return !b ? d._getMarginBox(n, s) : d._setMarginBox(n, b.l, b.t, b.w, b.h, s);
            };
            dojo.contentBox = function(node, box) {
                var n = byId(node),
                    s = gcs(n),
                    b = box;
                return !b ? d._getContentBox(n, s) : d._setContentSize(n, b.w, b.h, s);
            };
            var _1d2 = function(node, prop) {
                if (!(node = (node || 0).parentNode)) {
                    return 0;
                }
                var val, _1d3 = 0,
                    _1d4 = d.body();
                while (node && node.style) {
                    if (gcs(node).position == "fixed") {
                        return 0;
                    }
                    val = node[prop];
                    if (val) {
                        _1d3 += val - 0;
                        if (node == _1d4) {
                            break;
                        }
                    }
                    node = node.parentNode;
                }
                return _1d3;
            };
            dojo._docScroll = function() {
                var n = d.global;
                return "pageXOffset" in n ? {
                    x: n.pageXOffset,
                    y: n.pageYOffset
                } : (n = d.isQuirks ? d.doc.body : d.doc.documentElement, {
                    x: d._fixIeBiDiScrollLeft(n.scrollLeft || 0),
                    y: n.scrollTop || 0
                });
            };
            dojo._isBodyLtr = function() {
                return "_bodyLtr" in d ? d._bodyLtr : d._bodyLtr = (d.body().dir || d.doc.documentElement.dir || "ltr").toLowerCase() == "ltr";
            };
            dojo._getIeDocumentElementOffset = function() {
                var de = d.doc.documentElement;
                if (d.isIE < 8) {
                    var r = de.getBoundingClientRect();
                    var l = r.left,
                        t = r.top;
                    if (d.isIE < 7) {
                        l += de.clientLeft;
                        t += de.clientTop;
                    }
                    return {
                        x: l < 0 ? 0 : l,
                        y: t < 0 ? 0 : t
                    };
                } else {
                    return {
                        x: 0,
                        y: 0
                    };
                }
            };
            dojo._fixIeBiDiScrollLeft = function(_1d5) {
                var ie = d.isIE;
                if (ie && !d._isBodyLtr()) {
                    var qk = d.isQuirks,
                        de = qk ? d.doc.body : d.doc.documentElement;
                    if (ie == 6 && !qk && d.global.frameElement && de.scrollHeight > de.clientHeight) {
                        _1d5 += de.clientLeft;
                    }
                    return (ie < 8 || qk) ? (_1d5 + de.clientWidth - de.scrollWidth) : -_1d5;
                }
                return _1d5;
            };
            dojo._abs = dojo.position = function(node, _1d6) {
                node = byId(node);
                var db = d.body(),
                    dh = db.parentNode,
                    ret = node.getBoundingClientRect();
                ret = {
                    x: ret.left,
                    y: ret.top,
                    w: ret.right - ret.left,
                    h: ret.bottom - ret.top
                };
                if (d.isIE) {
                    var _1d7 = d._getIeDocumentElementOffset();
                    ret.x -= _1d7.x + (d.isQuirks ? db.clientLeft + db.offsetLeft : 0);
                    ret.y -= _1d7.y + (d.isQuirks ? db.clientTop + db.offsetTop : 0);
                } else {
                    if (d.isFF == 3) {
                        var cs = gcs(dh);
                        ret.x -= px(dh, cs.marginLeft) + px(dh, cs.borderLeftWidth);
                        ret.y -= px(dh, cs.marginTop) + px(dh, cs.borderTopWidth);
                    }
                }
                if (_1d6) {
                    var _1d8 = d._docScroll();
                    ret.x += _1d8.x;
                    ret.y += _1d8.y;
                }
                return ret;
            };
            dojo.coords = function(node, _1d9) {
                var n = byId(node),
                    s = gcs(n),
                    mb = d._getMarginBox(n, s);
                var abs = d.position(n, _1d9);
                mb.x = abs.x;
                mb.y = abs.y;
                return mb;
            };
            var _1da = {
                    "class": "className",
                    "for": "htmlFor",
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    colspan: "colSpan",
                    frameborder: "frameBorder",
                    rowspan: "rowSpan",
                    valuetype: "valueType"
                },
                _1db = {
                    classname: "class",
                    htmlfor: "for",
                    tabindex: "tabIndex",
                    readonly: "readOnly"
                },
                _1dc = {
                    innerHTML: 1,
                    className: 1,
                    htmlFor: d.isIE,
                    value: 1
                };
            var _1dd = function(name) {
                return _1db[name.toLowerCase()] || name;
            };
            var _1de = function(node, name) {
                var attr = node.getAttributeNode && node.getAttributeNode(name);
                return attr && attr.specified;
            };
            dojo.hasAttr = function(node, name) {
                var lc = name.toLowerCase();
                return _1dc[_1da[lc] || name] || _1de(byId(node), _1db[lc] || name);
            };
            var _1df = {},
                _1e0 = 0,
                _1e1 = dojo._scopeName + "attrid",
                _1e2 = {
                    col: 1,
                    colgroup: 1,
                    table: 1,
                    tbody: 1,
                    tfoot: 1,
                    thead: 1,
                    tr: 1,
                    title: 1
                };
            dojo.attr = function(node, name, _1e3) {
                node = byId(node);
                var args = arguments.length,
                    prop;
                if (args == 2 && typeof name != "string") {
                    for (var x in name) {
                        d.attr(node, x, name[x]);
                    }
                    return node;
                }
                var lc = name.toLowerCase(),
                    _1e4 = _1da[lc] || name,
                    _1e5 = _1dc[_1e4],
                    _1e6 = _1db[lc] || name;
                if (args == 3) {
                    do {
                        if (_1e4 == "style" && typeof _1e3 != "string") {
                            d.style(node, _1e3);
                            break;
                        }
                        if (_1e4 == "innerHTML") {
                            if (d.isIE && node.tagName.toLowerCase() in _1e2) {
                                d.empty(node);
                                node.appendChild(d._toDom(_1e3, node.ownerDocument));
                            } else {
                                node[_1e4] = _1e3;
                            }
                            break;
                        }
                        if (d.isFunction(_1e3)) {
                            var _1e7 = d.attr(node, _1e1);
                            if (!_1e7) {
                                _1e7 = _1e0++;
                                d.attr(node, _1e1, _1e7);
                            }
                            if (!_1df[_1e7]) {
                                _1df[_1e7] = {};
                            }
                            var h = _1df[_1e7][_1e4];
                            if (h) {
                                d.disconnect(h);
                            } else {
                                try {
                                    delete node[_1e4];
                                } catch (e) {}
                            }
                            _1df[_1e7][_1e4] = d.connect(node, _1e4, _1e3);
                            break;
                        }
                        if (_1e5 || typeof _1e3 == "boolean") {
                            node[_1e4] = _1e3;
                            break;
                        }
                        node.setAttribute(_1e6, _1e3);
                    } while (false);
                    return node;
                }
                _1e3 = node[_1e4];
                if (_1e5 && typeof _1e3 != "undefined") {
                    return _1e3;
                }
                if (_1e4 != "href" && (typeof _1e3 == "boolean" || d.isFunction(_1e3))) {
                    return _1e3;
                }
                return _1de(node, _1e6) ? node.getAttribute(_1e6) : null;
            };
            dojo.removeAttr = function(node, name) {
                byId(node).removeAttribute(_1dd(name));
            };
            dojo.getNodeProp = function(node, name) {
                node = byId(node);
                var lc = name.toLowerCase(),
                    _1e8 = _1da[lc] || name;
                if ((_1e8 in node) && _1e8 != "href") {
                    return node[_1e8];
                }
                var _1e9 = _1db[lc] || name;
                return _1de(node, _1e9) ? node.getAttribute(_1e9) : null;
            };
            dojo.create = function(tag, _1ea, _1eb, pos) {
                var doc = d.doc;
                if (_1eb) {
                    _1eb = byId(_1eb);
                    doc = _1eb.ownerDocument;
                }
                if (typeof tag == "string") {
                    tag = doc.createElement(tag);
                }
                if (_1ea) {
                    d.attr(tag, _1ea);
                }
                if (_1eb) {
                    d.place(tag, _1eb, pos);
                }
                return tag;
            };
            d.empty = d.isIE ? function(node) {
                node = byId(node);
                for (var c; c = node.lastChild;) {
                    d.destroy(c);
                }
            } : function(node) {
                byId(node).innerHTML = "";
            };
            var _1ec = {
                    option: ["select"],
                    tbody: ["table"],
                    thead: ["table"],
                    tfoot: ["table"],
                    tr: ["table", "tbody"],
                    td: ["table", "tbody", "tr"],
                    th: ["table", "thead", "tr"],
                    legend: ["fieldset"],
                    caption: ["table"],
                    colgroup: ["table"],
                    col: ["table", "colgroup"],
                    li: ["ul"]
                },
                _1ed = /<\s*([\w\:]+)/,
                _1ee = {},
                _1ef = 0,
                _1f0 = "__" + d._scopeName + "ToDomId";
            for (var _1f1 in _1ec) {
                if (_1ec.hasOwnProperty(_1f1)) {
                    var tw = _1ec[_1f1];
                    tw.pre = _1f1 == "option" ? "<select multiple=\"multiple\">" : "<" + tw.join("><") + ">";
                    tw.post = "</" + tw.reverse().join("></") + ">";
                }
            }
            d._toDom = function(frag, doc) {
                doc = doc || d.doc;
                var _1f2 = doc[_1f0];
                if (!_1f2) {
                    doc[_1f0] = _1f2 = ++_1ef + "";
                    _1ee[_1f2] = doc.createElement("div");
                }
                frag += "";
                var _1f3 = frag.match(_1ed),
                    tag = _1f3 ? _1f3[1].toLowerCase() : "",
                    _1f4 = _1ee[_1f2],
                    wrap, i, fc, df;
                if (_1f3 && _1ec[tag]) {
                    wrap = _1ec[tag];
                    _1f4.innerHTML = wrap.pre + frag + wrap.post;
                    for (i = wrap.length; i; --i) {
                        _1f4 = _1f4.firstChild;
                    }
                } else {
                    _1f4.innerHTML = frag;
                }
                if (_1f4.childNodes.length == 1) {
                    return _1f4.removeChild(_1f4.firstChild);
                }
                df = doc.createDocumentFragment();
                while (fc = _1f4.firstChild) {
                    df.appendChild(fc);
                }
                return df;
            };
            var _1f5 = "className";
            dojo.hasClass = function(node, _1f6) {
                return ((" " + byId(node)[_1f5] + " ").indexOf(" " + _1f6 + " ") >= 0);
            };
            var _1f7 = /\s+/,
                a1 = [""],
                _1f8 = {},
                _1f9 = function(s) {
                    if (typeof s == "string" || s instanceof String) {
                        if (s.indexOf(" ") < 0) {
                            a1[0] = s;
                            return a1;
                        } else {
                            return s.split(_1f7);
                        }
                    }
                    return s || "";
                };
            dojo.addClass = function(node, _1fa) {
                node = byId(node);
                _1fa = _1f9(_1fa);
                var cls = node[_1f5],
                    _1fb;
                cls = cls ? " " + cls + " " : " ";
                _1fb = cls.length;
                for (var i = 0, len = _1fa.length, c; i < len; ++i) {
                    c = _1fa[i];
                    if (c && cls.indexOf(" " + c + " ") < 0) {
                        cls += c + " ";
                    }
                }
                if (_1fb < cls.length) {
                    node[_1f5] = cls.substr(1, cls.length - 2);
                }
            };
            dojo.removeClass = function(node, _1fc) {
                node = byId(node);
                var cls;
                if (_1fc !== undefined) {
                    _1fc = _1f9(_1fc);
                    cls = " " + node[_1f5] + " ";
                    for (var i = 0, len = _1fc.length; i < len; ++i) {
                        cls = cls.replace(" " + _1fc[i] + " ", " ");
                    }
                    cls = d.trim(cls);
                } else {
                    cls = "";
                }
                if (node[_1f5] != cls) {
                    node[_1f5] = cls;
                }
            };
            dojo.replaceClass = function(node, _1fd, _1fe) {
                node = byId(node);
                _1f8.className = node.className;
                dojo.removeClass(_1f8, _1fe);
                dojo.addClass(_1f8, _1fd);
                if (node.className !== _1f8.className) {
                    node.className = _1f8.className;
                }
            };
            dojo.toggleClass = function(node, _1ff, _200) {
                if (_200 === undefined) {
                    _200 = !d.hasClass(node, _1ff);
                }
                d[_200 ? "addClass" : "removeClass"](node, _1ff);
            };
        })();
    }
    if (!dojo._hasResource["dojo._base.NodeList"]) {
        dojo._hasResource["dojo._base.NodeList"] = true;
        dojo.provide("dojo._base.NodeList");
        (function() {
            var d = dojo;
            var ap = Array.prototype,
                aps = ap.slice,
                apc = ap.concat;
            var tnl = function(a, _201, _202) {
                if (!a.sort) {
                    a = aps.call(a, 0);
                }
                var ctor = _202 || this._NodeListCtor || d._NodeListCtor;
                a.constructor = ctor;
                dojo._mixin(a, ctor.prototype);
                a._NodeListCtor = ctor;
                return _201 ? a._stash(_201) : a;
            };
            var _203 = function(f, a, o) {
                a = [0].concat(aps.call(a, 0));
                o = o || d.global;
                return function(node) {
                    a[0] = node;
                    return f.apply(o, a);
                };
            };
            var _204 = function(f, o) {
                return function() {
                    this.forEach(_203(f, arguments, o));
                    return this;
                };
            };
            var _205 = function(f, o) {
                return function() {
                    return this.map(_203(f, arguments, o));
                };
            };
            var _206 = function(f, o) {
                return function() {
                    return this.filter(_203(f, arguments, o));
                };
            };
            var _207 = function(f, g, o) {
                return function() {
                    var a = arguments,
                        body = _203(f, a, o);
                    if (g.call(o || d.global, a)) {
                        return this.map(body);
                    }
                    this.forEach(body);
                    return this;
                };
            };
            var _208 = function(a) {
                return a.length == 1 && (typeof a[0] == "string");
            };
            var _209 = function(node) {
                var p = node.parentNode;
                if (p) {
                    p.removeChild(node);
                }
            };
            dojo.NodeList = function() {
                return tnl(Array.apply(null, arguments));
            };
            d._NodeListCtor = d.NodeList;
            var nl = d.NodeList,
                nlp = nl.prototype;
            nl._wrap = nlp._wrap = tnl;
            nl._adaptAsMap = _205;
            nl._adaptAsForEach = _204;
            nl._adaptAsFilter = _206;
            nl._adaptWithCondition = _207;
            d.forEach(["slice", "splice"], function(name) {
                var f = ap[name];
                nlp[name] = function() {
                    return this._wrap(f.apply(this, arguments), name == "slice" ? this : null);
                };
            });
            d.forEach(["indexOf", "lastIndexOf", "every", "some"], function(name) {
                var f = d[name];
                nlp[name] = function() {
                    return f.apply(d, [this].concat(aps.call(arguments, 0)));
                };
            });
            d.forEach(["attr", "style"], function(name) {
                nlp[name] = _207(d[name], _208);
            });
            d.forEach(["connect", "addClass", "removeClass", "replaceClass", "toggleClass", "empty", "removeAttr"], function(name) {
                nlp[name] = _204(d[name]);
            });
            dojo.extend(dojo.NodeList, {
                _normalize: function(_20a, _20b) {
                    var _20c = _20a.parse === true ? true : false;
                    if (typeof _20a.template == "string") {
                        var _20d = _20a.templateFunc || (dojo.string && dojo.string.substitute);
                        _20a = _20d ? _20d(_20a.template, _20a) : _20a;
                    }
                    var type = (typeof _20a);
                    if (type == "string" || type == "number") {
                        _20a = dojo._toDom(_20a, (_20b && _20b.ownerDocument));
                        if (_20a.nodeType == 11) {
                            _20a = dojo._toArray(_20a.childNodes);
                        } else {
                            _20a = [_20a];
                        }
                    } else {
                        if (!dojo.isArrayLike(_20a)) {
                            _20a = [_20a];
                        } else {
                            if (!dojo.isArray(_20a)) {
                                _20a = dojo._toArray(_20a);
                            }
                        }
                    }
                    if (_20c) {
                        _20a._runParse = true;
                    }
                    return _20a;
                },
                _cloneNode: function(node) {
                    return node.cloneNode(true);
                },
                _place: function(ary, _20e, _20f, _210) {
                    if (_20e.nodeType != 1 && _20f == "only") {
                        return;
                    }
                    var _211 = _20e,
                        _212;
                    var _213 = ary.length;
                    for (var i = _213 - 1; i >= 0; i--) {
                        var node = (_210 ? this._cloneNode(ary[i]) : ary[i]);
                        if (ary._runParse && dojo.parser && dojo.parser.parse) {
                            if (!_212) {
                                _212 = _211.ownerDocument.createElement("div");
                            }
                            _212.appendChild(node);
                            dojo.parser.parse(_212);
                            node = _212.firstChild;
                            while (_212.firstChild) {
                                _212.removeChild(_212.firstChild);
                            }
                        }
                        if (i == _213 - 1) {
                            dojo.place(node, _211, _20f);
                        } else {
                            _211.parentNode.insertBefore(node, _211);
                        }
                        _211 = node;
                    }
                },
                _stash: function(_214) {
                    this._parent = _214;
                    return this;
                },
                end: function() {
                    if (this._parent) {
                        return this._parent;
                    } else {
                        return new this._NodeListCtor();
                    }
                },
                concat: function(item) {
                    var t = d.isArray(this) ? this : aps.call(this, 0),
                        m = d.map(arguments, function(a) {
                            return a && !d.isArray(a) && (typeof NodeList != "undefined" && a.constructor === NodeList || a.constructor === this._NodeListCtor) ? aps.call(a, 0) : a;
                        });
                    return this._wrap(apc.apply(t, m), this);
                },
                map: function(func, obj) {
                    return this._wrap(d.map(this, func, obj), this);
                },
                forEach: function(_215, _216) {
                    d.forEach(this, _215, _216);
                    return this;
                },
                coords: _205(d.coords),
                position: _205(d.position),
                place: function(_217, _218) {
                    var item = d.query(_217)[0];
                    return this.forEach(function(node) {
                        d.place(node, item, _218);
                    });
                },
                orphan: function(_219) {
                    return (_219 ? d._filterQueryResult(this, _219) : this).forEach(_209);
                },
                adopt: function(_21a, _21b) {
                    return d.query(_21a).place(this[0], _21b)._stash(this);
                },
                query: function(_21c) {
                    if (!_21c) {
                        return this;
                    }
                    var ret = this.map(function(node) {
                        return d.query(_21c, node).filter(function(_21d) {
                            return _21d !== undefined;
                        });
                    });
                    return this._wrap(apc.apply([], ret), this);
                },
                filter: function(_21e) {
                    var a = arguments,
                        _21f = this,
                        _220 = 0;
                    if (typeof _21e == "string") {
                        _21f = d._filterQueryResult(this, a[0]);
                        if (a.length == 1) {
                            return _21f._stash(this);
                        }
                        _220 = 1;
                    }
                    return this._wrap(d.filter(_21f, a[_220], a[_220 + 1]), this);
                },
                addContent: function(_221, _222) {
                    _221 = this._normalize(_221, this[0]);
                    for (var i = 0, node;
                        (node = this[i]); i++) {
                        this._place(_221, node, _222, i > 0);
                    }
                    return this;
                },
                instantiate: function(_223, _224) {
                    var c = d.isFunction(_223) ? _223 : d.getObject(_223);
                    _224 = _224 || {};
                    return this.forEach(function(node) {
                        new c(_224, node);
                    });
                },
                at: function() {
                    var t = new this._NodeListCtor();
                    d.forEach(arguments, function(i) {
                        if (i < 0) {
                            i = this.length + i;
                        }
                        if (this[i]) {
                            t.push(this[i]);
                        }
                    }, this);
                    return t._stash(this);
                }
            });
            nl.events = ["blur", "focus", "change", "click", "error", "keydown", "keypress", "keyup", "load", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "submit"];
            d.forEach(nl.events, function(evt) {
                var _225 = "on" + evt;
                nlp[_225] = function(a, b) {
                    return this.connect(_225, a, b);
                };
            });
        })();
    }
    if (!dojo._hasResource["dojo._base.query"]) {
        dojo._hasResource["dojo._base.query"] = true;
        (function() {
            var _226 = function(d) {
                var trim = d.trim;
                var each = d.forEach;
                var qlc = (d._NodeListCtor = d.NodeList);
                var _227 = function() {
                    return d.doc;
                };
                var _228 = ((d.isWebKit || d.isMozilla) && ((_227().compatMode) == "BackCompat"));
                var _229 = ">~+";
                var _22a = false;
                var _22b = function() {
                    return true;
                };
                var _22c = function(_22d) {
                    if (_229.indexOf(_22d.slice(-1)) >= 0) {
                        _22d += " * ";
                    } else {
                        _22d += " ";
                    }
                    var ts = function(s, e) {
                        return trim(_22d.slice(s, e));
                    };
                    var _22e = [];
                    var _22f = -1,
                        _230 = -1,
                        _231 = -1,
                        _232 = -1,
                        _233 = -1,
                        inId = -1,
                        _234 = -1,
                        lc = "",
                        cc = "",
                        _235;
                    var x = 0,
                        ql = _22d.length,
                        _236 = null,
                        _237 = null;
                    var _238 = function() {
                        if (_234 >= 0) {
                            var tv = (_234 == x) ? null : ts(_234, x);
                            _236[(_229.indexOf(tv) < 0) ? "tag" : "oper"] = tv;
                            _234 = -1;
                        }
                    };
                    var _239 = function() {
                        if (inId >= 0) {
                            _236.id = ts(inId, x).replace(/\\/g, "");
                            inId = -1;
                        }
                    };
                    var _23a = function() {
                        if (_233 >= 0) {
                            _236.classes.push(ts(_233 + 1, x).replace(/\\/g, ""));
                            _233 = -1;
                        }
                    };
                    var _23b = function() {
                        _239();
                        _238();
                        _23a();
                    };
                    var _23c = function() {
                        _23b();
                        if (_232 >= 0) {
                            _236.pseudos.push({
                                name: ts(_232 + 1, x)
                            });
                        }
                        _236.loops = (_236.pseudos.length || _236.attrs.length || _236.classes.length);
                        _236.oquery = _236.query = ts(_235, x);
                        _236.otag = _236.tag = (_236["oper"]) ? null : (_236.tag || "*");
                        if (_236.tag) {
                            _236.tag = _236.tag.toUpperCase();
                        }
                        if (_22e.length && (_22e[_22e.length - 1].oper)) {
                            _236.infixOper = _22e.pop();
                            _236.query = _236.infixOper.query + " " + _236.query;
                        }
                        _22e.push(_236);
                        _236 = null;
                    };
                    for (; lc = cc, cc = _22d.charAt(x), x < ql; x++) {
                        if (lc == "\\") {
                            continue;
                        }
                        if (!_236) {
                            _235 = x;
                            _236 = {
                                query: null,
                                pseudos: [],
                                attrs: [],
                                classes: [],
                                tag: null,
                                oper: null,
                                id: null,
                                getTag: function() {
                                    return (_22a) ? this.otag : this.tag;
                                }
                            };
                            _234 = x;
                        }
                        if (_22f >= 0) {
                            if (cc == "]") {
                                if (!_237.attr) {
                                    _237.attr = ts(_22f + 1, x);
                                } else {
                                    _237.matchFor = ts((_231 || _22f + 1), x);
                                }
                                var cmf = _237.matchFor;
                                if (cmf) {
                                    if ((cmf.charAt(0) == "\"") || (cmf.charAt(0) == "'")) {
                                        _237.matchFor = cmf.slice(1, -1);
                                    }
                                }
                                _236.attrs.push(_237);
                                _237 = null;
                                _22f = _231 = -1;
                            } else {
                                if (cc == "=") {
                                    var _23d = ("|~^$*".indexOf(lc) >= 0) ? lc : "";
                                    _237.type = _23d + cc;
                                    _237.attr = ts(_22f + 1, x - _23d.length);
                                    _231 = x + 1;
                                }
                            }
                        } else {
                            if (_230 >= 0) {
                                if (cc == ")") {
                                    if (_232 >= 0) {
                                        _237.value = ts(_230 + 1, x);
                                    }
                                    _232 = _230 = -1;
                                }
                            } else {
                                if (cc == "#") {
                                    _23b();
                                    inId = x + 1;
                                } else {
                                    if (cc == ".") {
                                        _23b();
                                        _233 = x;
                                    } else {
                                        if (cc == ":") {
                                            _23b();
                                            _232 = x;
                                        } else {
                                            if (cc == "[") {
                                                _23b();
                                                _22f = x;
                                                _237 = {};
                                            } else {
                                                if (cc == "(") {
                                                    if (_232 >= 0) {
                                                        _237 = {
                                                            name: ts(_232 + 1, x),
                                                            value: null
                                                        };
                                                        _236.pseudos.push(_237);
                                                    }
                                                    _230 = x;
                                                } else {
                                                    if ((cc == " ") && (lc != cc)) {
                                                        _23c();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return _22e;
                };
                var _23e = function(_23f, _240) {
                    if (!_23f) {
                        return _240;
                    }
                    if (!_240) {
                        return _23f;
                    }
                    return function() {
                        return _23f.apply(window, arguments) && _240.apply(window, arguments);
                    };
                };
                var _241 = function(i, arr) {
                    var r = arr || [];
                    if (i) {
                        r.push(i);
                    }
                    return r;
                };
                var _242 = function(n) {
                    return (1 == n.nodeType);
                };
                var _243 = "";
                var _244 = function(elem, attr) {
                    if (!elem) {
                        return _243;
                    }
                    if (attr == "class") {
                        return elem.className || _243;
                    }
                    if (attr == "for") {
                        return elem.htmlFor || _243;
                    }
                    if (attr == "style") {
                        return elem.style.cssText || _243;
                    }
                    return (_22a ? elem.getAttribute(attr) : elem.getAttribute(attr, 2)) || _243;
                };
                var _245 = {
                    "*=": function(attr, _246) {
                        return function(elem) {
                            return (_244(elem, attr).indexOf(_246) >= 0);
                        };
                    },
                    "^=": function(attr, _247) {
                        return function(elem) {
                            return (_244(elem, attr).indexOf(_247) == 0);
                        };
                    },
                    "$=": function(attr, _248) {
                        var tval = " " + _248;
                        return function(elem) {
                            var ea = " " + _244(elem, attr);
                            return (ea.lastIndexOf(_248) == (ea.length - _248.length));
                        };
                    },
                    "~=": function(attr, _249) {
                        var tval = " " + _249 + " ";
                        return function(elem) {
                            var ea = " " + _244(elem, attr) + " ";
                            return (ea.indexOf(tval) >= 0);
                        };
                    },
                    "|=": function(attr, _24a) {
                        var _24b = " " + _24a + "-";
                        return function(elem) {
                            var ea = " " + _244(elem, attr);
                            return ((ea == _24a) || (ea.indexOf(_24b) == 0));
                        };
                    },
                    "=": function(attr, _24c) {
                        return function(elem) {
                            return (_244(elem, attr) == _24c);
                        };
                    }
                };
                var _24d = (typeof _227().firstChild.nextElementSibling == "undefined");
                var _24e = !_24d ? "nextElementSibling" : "nextSibling";
                var _24f = !_24d ? "previousElementSibling" : "previousSibling";
                var _250 = (_24d ? _242 : _22b);
                var _251 = function(node) {
                    while (node = node[_24f]) {
                        if (_250(node)) {
                            return false;
                        }
                    }
                    return true;
                };
                var _252 = function(node) {
                    while (node = node[_24e]) {
                        if (_250(node)) {
                            return false;
                        }
                    }
                    return true;
                };
                var _253 = function(node) {
                    var root = node.parentNode;
                    var i = 0,
                        tret = root.children || root.childNodes,
                        ci = (node["_i"] || -1),
                        cl = (root["_l"] || -1);
                    if (!tret) {
                        return -1;
                    }
                    var l = tret.length;
                    if (cl == l && ci >= 0 && cl >= 0) {
                        return ci;
                    }
                    root["_l"] = l;
                    ci = -1;
                    for (var te = root["firstElementChild"] || root["firstChild"]; te; te = te[_24e]) {
                        if (_250(te)) {
                            te["_i"] = ++i;
                            if (node === te) {
                                ci = i;
                            }
                        }
                    }
                    return ci;
                };
                var _254 = function(elem) {
                    return !((_253(elem)) % 2);
                };
                var _255 = function(elem) {
                    return ((_253(elem)) % 2);
                };
                var _256 = {
                    "checked": function(name, _257) {
                        return function(elem) {
                            return !!("checked" in elem ? elem.checked : elem.selected);
                        };
                    },
                    "first-child": function() {
                        return _251;
                    },
                    "last-child": function() {
                        return _252;
                    },
                    "only-child": function(name, _258) {
                        return function(node) {
                            if (!_251(node)) {
                                return false;
                            }
                            if (!_252(node)) {
                                return false;
                            }
                            return true;
                        };
                    },
                    "empty": function(name, _259) {
                        return function(elem) {
                            var cn = elem.childNodes;
                            var cnl = elem.childNodes.length;
                            for (var x = cnl - 1; x >= 0; x--) {
                                var nt = cn[x].nodeType;
                                if ((nt === 1) || (nt == 3)) {
                                    return false;
                                }
                            }
                            return true;
                        };
                    },
                    "contains": function(name, _25a) {
                        var cz = _25a.charAt(0);
                        if (cz == "\"" || cz == "'") {
                            _25a = _25a.slice(1, -1);
                        }
                        return function(elem) {
                            return (elem.innerHTML.indexOf(_25a) >= 0);
                        };
                    },
                    "not": function(name, _25b) {
                        var p = _22c(_25b)[0];
                        var _25c = {
                            el: 1
                        };
                        if (p.tag != "*") {
                            _25c.tag = 1;
                        }
                        if (!p.classes.length) {
                            _25c.classes = 1;
                        }
                        var ntf = _25d(p, _25c);
                        return function(elem) {
                            return (!ntf(elem));
                        };
                    },
                    "nth-child": function(name, _25e) {
                        var pi = parseInt;
                        if (_25e == "odd") {
                            return _255;
                        } else {
                            if (_25e == "even") {
                                return _254;
                            }
                        }
                        if (_25e.indexOf("n") != -1) {
                            var _25f = _25e.split("n", 2);
                            var pred = _25f[0] ? ((_25f[0] == "-") ? -1 : pi(_25f[0])) : 1;
                            var idx = _25f[1] ? pi(_25f[1]) : 0;
                            var lb = 0,
                                ub = -1;
                            if (pred > 0) {
                                if (idx < 0) {
                                    idx = (idx % pred) && (pred + (idx % pred));
                                } else {
                                    if (idx > 0) {
                                        if (idx >= pred) {
                                            lb = idx - idx % pred;
                                        }
                                        idx = idx % pred;
                                    }
                                }
                            } else {
                                if (pred < 0) {
                                    pred *= -1;
                                    if (idx > 0) {
                                        ub = idx;
                                        idx = idx % pred;
                                    }
                                }
                            }
                            if (pred > 0) {
                                return function(elem) {
                                    var i = _253(elem);
                                    return (i >= lb) && (ub < 0 || i <= ub) && ((i % pred) == idx);
                                };
                            } else {
                                _25e = idx;
                            }
                        }
                        var _260 = pi(_25e);
                        return function(elem) {
                            return (_253(elem) == _260);
                        };
                    }
                };
                var _261 = (d.isIE < 9 || (dojo.isIE && dojo.isQuirks)) ? function(cond) {
                    var clc = cond.toLowerCase();
                    if (clc == "class") {
                        cond = "className";
                    }
                    return function(elem) {
                        return (_22a ? elem.getAttribute(cond) : elem[cond] || elem[clc]);
                    };
                } : function(cond) {
                    return function(elem) {
                        return (elem && elem.getAttribute && elem.hasAttribute(cond));
                    };
                };
                var _25d = function(_262, _263) {
                    if (!_262) {
                        return _22b;
                    }
                    _263 = _263 || {};
                    var ff = null;
                    if (!("el" in _263)) {
                        ff = _23e(ff, _242);
                    }
                    if (!("tag" in _263)) {
                        if (_262.tag != "*") {
                            ff = _23e(ff, function(elem) {
                                return (elem && (elem.tagName == _262.getTag()));
                            });
                        }
                    }
                    if (!("classes" in _263)) {
                        each(_262.classes, function(_264, idx, arr) {
                            var re = new RegExp("(?:^|\\s)" + _264 + "(?:\\s|$)");
                            ff = _23e(ff, function(elem) {
                                return re.test(elem.className);
                            });
                            ff.count = idx;
                        });
                    }
                    if (!("pseudos" in _263)) {
                        each(_262.pseudos, function(_265) {
                            var pn = _265.name;
                            if (_256[pn]) {
                                ff = _23e(ff, _256[pn](pn, _265.value));
                            }
                        });
                    }
                    if (!("attrs" in _263)) {
                        each(_262.attrs, function(attr) {
                            var _266;
                            var a = attr.attr;
                            if (attr.type && _245[attr.type]) {
                                _266 = _245[attr.type](a, attr.matchFor);
                            } else {
                                if (a.length) {
                                    _266 = _261(a);
                                }
                            }
                            if (_266) {
                                ff = _23e(ff, _266);
                            }
                        });
                    }
                    if (!("id" in _263)) {
                        if (_262.id) {
                            ff = _23e(ff, function(elem) {
                                return (!!elem && (elem.id == _262.id));
                            });
                        }
                    }
                    if (!ff) {
                        if (!("default" in _263)) {
                            ff = _22b;
                        }
                    }
                    return ff;
                };
                var _267 = function(_268) {
                    return function(node, ret, bag) {
                        while (node = node[_24e]) {
                            if (_24d && (!_242(node))) {
                                continue;
                            }
                            if ((!bag || _269(node, bag)) && _268(node)) {
                                ret.push(node);
                            }
                            break;
                        }
                        return ret;
                    };
                };
                var _26a = function(_26b) {
                    return function(root, ret, bag) {
                        var te = root[_24e];
                        while (te) {
                            if (_250(te)) {
                                if (bag && !_269(te, bag)) {
                                    break;
                                }
                                if (_26b(te)) {
                                    ret.push(te);
                                }
                            }
                            te = te[_24e];
                        }
                        return ret;
                    };
                };
                var _26c = function(_26d) {
                    _26d = _26d || _22b;
                    return function(root, ret, bag) {
                        var te, x = 0,
                            tret = root.children || root.childNodes;
                        while (te = tret[x++]) {
                            if (_250(te) && (!bag || _269(te, bag)) && (_26d(te, x))) {
                                ret.push(te);
                            }
                        }
                        return ret;
                    };
                };
                var _26e = function(node, root) {
                    var pn = node.parentNode;
                    while (pn) {
                        if (pn == root) {
                            break;
                        }
                        pn = pn.parentNode;
                    }
                    return !!pn;
                };
                var _26f = {};
                var _270 = function(_271) {
                    var _272 = _26f[_271.query];
                    if (_272) {
                        return _272;
                    }
                    var io = _271.infixOper;
                    var oper = (io ? io.oper : "");
                    var _273 = _25d(_271, {
                        el: 1
                    });
                    var qt = _271.tag;
                    var _274 = ("*" == qt);
                    var ecs = _227()["getElementsByClassName"];
                    if (!oper) {
                        if (_271.id) {
                            _273 = (!_271.loops && _274) ? _22b : _25d(_271, {
                                el: 1,
                                id: 1
                            });
                            _272 = function(root, arr) {
                                var te = d.byId(_271.id, (root.ownerDocument || root));
                                if (!te || !_273(te)) {
                                    return;
                                }
                                if (9 == root.nodeType) {
                                    return _241(te, arr);
                                } else {
                                    if (_26e(te, root)) {
                                        return _241(te, arr);
                                    }
                                }
                            };
                        } else {
                            if (ecs && /\{\s*\[native code\]\s*\}/.test(String(ecs)) && _271.classes.length && !_228) {
                                _273 = _25d(_271, {
                                    el: 1,
                                    classes: 1,
                                    id: 1
                                });
                                var _275 = _271.classes.join(" ");
                                _272 = function(root, arr, bag) {
                                    var ret = _241(0, arr),
                                        te, x = 0;
                                    var tret = root.getElementsByClassName(_275);
                                    while ((te = tret[x++])) {
                                        if (_273(te, root) && _269(te, bag)) {
                                            ret.push(te);
                                        }
                                    }
                                    return ret;
                                };
                            } else {
                                if (!_274 && !_271.loops) {
                                    _272 = function(root, arr, bag) {
                                        var ret = _241(0, arr),
                                            te, x = 0;
                                        var tret = root.getElementsByTagName(_271.getTag());
                                        while ((te = tret[x++])) {
                                            if (_269(te, bag)) {
                                                ret.push(te);
                                            }
                                        }
                                        return ret;
                                    };
                                } else {
                                    _273 = _25d(_271, {
                                        el: 1,
                                        tag: 1,
                                        id: 1
                                    });
                                    _272 = function(root, arr, bag) {
                                        var ret = _241(0, arr),
                                            te, x = 0;
                                        var tret = root.getElementsByTagName(_271.getTag());
                                        while ((te = tret[x++])) {
                                            if (_273(te, root) && _269(te, bag)) {
                                                ret.push(te);
                                            }
                                        }
                                        return ret;
                                    };
                                }
                            }
                        }
                    } else {
                        var _276 = {
                            el: 1
                        };
                        if (_274) {
                            _276.tag = 1;
                        }
                        _273 = _25d(_271, _276);
                        if ("+" == oper) {
                            _272 = _267(_273);
                        } else {
                            if ("~" == oper) {
                                _272 = _26a(_273);
                            } else {
                                if (">" == oper) {
                                    _272 = _26c(_273);
                                }
                            }
                        }
                    }
                    return _26f[_271.query] = _272;
                };
                var _277 = function(root, _278) {
                    var _279 = _241(root),
                        qp, x, te, qpl = _278.length,
                        bag, ret;
                    for (var i = 0; i < qpl; i++) {
                        ret = [];
                        qp = _278[i];
                        x = _279.length - 1;
                        if (x > 0) {
                            bag = {};
                            ret.nozip = true;
                        }
                        var gef = _270(qp);
                        for (var j = 0;
                            (te = _279[j]); j++) {
                            gef(te, ret, bag);
                        }
                        if (!ret.length) {
                            break;
                        }
                        _279 = ret;
                    }
                    return ret;
                };
                var _27a = {},
                    _27b = {};
                var _27c = function(_27d) {
                    var _27e = _22c(trim(_27d));
                    if (_27e.length == 1) {
                        var tef = _270(_27e[0]);
                        return function(root) {
                            var r = tef(root, new qlc());
                            if (r) {
                                r.nozip = true;
                            }
                            return r;
                        };
                    }
                    return function(root) {
                        return _277(root, _27e);
                    };
                };
                var nua = navigator.userAgent;
                var wk = "WebKit/";
                var _27f = (d.isWebKit && (nua.indexOf(wk) > 0) && (parseFloat(nua.split(wk)[1]) > 528));
                var _280 = d.isIE ? "commentStrip" : "nozip";
                var qsa = "querySelectorAll";
                var _281 = (!!_227()[qsa] && (!d.isSafari || (d.isSafari > 3.1) || _27f));
                var _282 = /n\+\d|([^ ])?([>~+])([^ =])?/g;
                var _283 = function(_284, pre, ch, post) {
                    return ch ? (pre ? pre + " " : "") + ch + (post ? " " + post : "") : _284;
                };
                var _285 = function(_286, _287) {
                    _286 = _286.replace(_282, _283);
                    if (_281) {
                        var _288 = _27b[_286];
                        if (_288 && !_287) {
                            return _288;
                        }
                    }
                    var _289 = _27a[_286];
                    if (_289) {
                        return _289;
                    }
                    var qcz = _286.charAt(0);
                    var _28a = (-1 == _286.indexOf(" "));
                    if ((_286.indexOf("#") >= 0) && (_28a)) {
                        _287 = true;
                    }
                    var _28b = (_281 && (!_287) && (_229.indexOf(qcz) == -1) && (!d.isIE || (_286.indexOf(":") == -1)) && (!(_228 && (_286.indexOf(".") >= 0))) && (_286.indexOf(":contains") == -1) && (_286.indexOf(":checked") == -1) && (_286.indexOf("|=") == -1));
                    if (_28b) {
                        var tq = (_229.indexOf(_286.charAt(_286.length - 1)) >= 0) ? (_286 + " *") : _286;
                        return _27b[_286] = function(root) {
                            try {
                                if (!((9 == root.nodeType) || _28a)) {
                                    throw "";
                                }
                                var r = root[qsa](tq);
                                r[_280] = true;
                                return r;
                            } catch (e) {
                                return _285(_286, true)(root);
                            }
                        };
                    } else {
                        var _28c = _286.split(/\s*,\s*/);
                        return _27a[_286] = ((_28c.length < 2) ? _27c(_286) : function(root) {
                            var _28d = 0,
                                ret = [],
                                tp;
                            while ((tp = _28c[_28d++])) {
                                ret = ret.concat(_27c(tp)(root));
                            }
                            return ret;
                        });
                    }
                };
                var _28e = 0;
                var _28f = d.isIE ? function(node) {
                    if (_22a) {
                        return (node.getAttribute("_uid") || node.setAttribute("_uid", ++_28e) || _28e);
                    } else {
                        return node.uniqueID;
                    }
                } : function(node) {
                    return (node._uid || (node._uid = ++_28e));
                };
                var _269 = function(node, bag) {
                    if (!bag) {
                        return 1;
                    }
                    var id = _28f(node);
                    if (!bag[id]) {
                        return bag[id] = 1;
                    }
                    return 0;
                };
                var _290 = "_zipIdx";
                var _291 = function(arr) {
                    if (arr && arr.nozip) {
                        return (qlc._wrap) ? qlc._wrap(arr) : arr;
                    }
                    var ret = new qlc();
                    if (!arr || !arr.length) {
                        return ret;
                    }
                    if (arr[0]) {
                        ret.push(arr[0]);
                    }
                    if (arr.length < 2) {
                        return ret;
                    }
                    _28e++;
                    if (d.isIE && _22a) {
                        var _292 = _28e + "";
                        arr[0].setAttribute(_290, _292);
                        for (var x = 1, te; te = arr[x]; x++) {
                            if (arr[x].getAttribute(_290) != _292) {
                                ret.push(te);
                            }
                            te.setAttribute(_290, _292);
                        }
                    } else {
                        if (d.isIE && arr.commentStrip) {
                            try {
                                for (var x = 1, te; te = arr[x]; x++) {
                                    if (_242(te)) {
                                        ret.push(te);
                                    }
                                }
                            } catch (e) {}
                        } else {
                            if (arr[0]) {
                                arr[0][_290] = _28e;
                            }
                            for (var x = 1, te; te = arr[x]; x++) {
                                if (arr[x][_290] != _28e) {
                                    ret.push(te);
                                }
                                te[_290] = _28e;
                            }
                        }
                    }
                    return ret;
                };
                d.query = function(_293, root) {
                    qlc = d._NodeListCtor;
                    if (!_293) {
                        return new qlc();
                    }
                    if (_293.constructor == qlc) {
                        return _293;
                    }
                    if (typeof _293 != "string") {
                        return new qlc(_293);
                    }
                    if (typeof root == "string") {
                        root = d.byId(root);
                        if (!root) {
                            return new qlc();
                        }
                    }
                    root = root || _227();
                    var od = root.ownerDocument || root.documentElement;
                    _22a = (root.contentType && root.contentType == "application/xml") || (d.isOpera && (root.doctype || od.toString() == "[object XMLDocument]")) || (!!od) && (d.isIE ? od.xml : (root.xmlVersion || od.xmlVersion));
                    var r = _285(_293)(root);
                    if (r && r.nozip && !qlc._wrap) {
                        return r;
                    }
                    return _291(r);
                };
                d.query.pseudos = _256;
                d._filterQueryResult = function(_294, _295, root) {
                    var _296 = new d._NodeListCtor(),
                        _297 = _22c(_295),
                        _298 = (_297.length == 1 && !/[^\w#\.]/.test(_295)) ? _25d(_297[0]) : function(node) {
                            return dojo.query(_295, root).indexOf(node) != -1;
                        };
                    for (var x = 0, te; te = _294[x]; x++) {
                        if (_298(te)) {
                            _296.push(te);
                        }
                    }
                    return _296;
                };
            };
            var _299 = function() {
                acme = {
                    trim: function(str) {
                        str = str.replace(/^\s+/, "");
                        for (var i = str.length - 1; i >= 0; i--) {
                            if (/\S/.test(str.charAt(i))) {
                                str = str.substring(0, i + 1);
                                break;
                            }
                        }
                        return str;
                    },
                    forEach: function(arr, _29a, _29b) {
                        if (!arr || !arr.length) {
                            return;
                        }
                        for (var i = 0, l = arr.length; i < l; ++i) {
                            _29a.call(_29b || window, arr[i], i, arr);
                        }
                    },
                    byId: function(id, doc) {
                        if (typeof id == "string") {
                            return (doc || document).getElementById(id);
                        } else {
                            return id;
                        }
                    },
                    doc: document,
                    NodeList: Array
                };
                var n = navigator;
                var dua = n.userAgent;
                var dav = n.appVersion;
                var tv = parseFloat(dav);
                acme.isOpera = (dua.indexOf("Opera") >= 0) ? tv : undefined;
                acme.isKhtml = (dav.indexOf("Konqueror") >= 0) ? tv : undefined;
                acme.isWebKit = parseFloat(dua.split("WebKit/")[1]) || undefined;
                acme.isChrome = parseFloat(dua.split("Chrome/")[1]) || undefined;
                var _29c = Math.max(dav.indexOf("WebKit"), dav.indexOf("Safari"), 0);
                if (_29c && !acme.isChrome) {
                    acme.isSafari = parseFloat(dav.split("Version/")[1]);
                    if (!acme.isSafari || parseFloat(dav.substr(_29c + 7)) <= 419.3) {
                        acme.isSafari = 2;
                    }
                }
                if (document.all && !acme.isOpera) {
                    acme.isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;
                }
                Array._wrap = function(arr) {
                    return arr;
                };
                return acme;
            };
            if (this["dojo"]) {
                dojo.provide("dojo._base.query");
                _226(this["queryPortability"] || this["acme"] || dojo);
            } else {
                _226(this["queryPortability"] || this["acme"] || _299());
            }
        })();
    }
    if (!dojo._hasResource["dojo._base.xhr"]) {
        dojo._hasResource["dojo._base.xhr"] = true;
        dojo.provide("dojo._base.xhr");
        (function() {
            var _29d = dojo,
                cfg = _29d.config;

            function _29e(obj, name, _29f) {
                if (_29f === null) {
                    return;
                }
                var val = obj[name];
                if (typeof val == "string") {
                    obj[name] = [val, _29f];
                } else {
                    if (_29d.isArray(val)) {
                        val.push(_29f);
                    } else {
                        obj[name] = _29f;
                    }
                }
            };
            dojo.fieldToObject = function(_2a0) {
                var ret = null;
                var item = _29d.byId(_2a0);
                if (item) {
                    var _2a1 = item.name;
                    var type = (item.type || "").toLowerCase();
                    if (_2a1 && type && !item.disabled) {
                        if (type == "radio" || type == "checkbox") {
                            if (item.checked) {
                                ret = item.value;
                            }
                        } else {
                            if (item.multiple) {
                                ret = [];
                                _29d.query("option", item).forEach(function(opt) {
                                    if (opt.selected) {
                                        ret.push(opt.value);
                                    }
                                });
                            } else {
                                ret = item.value;
                            }
                        }
                    }
                }
                return ret;
            };
            dojo.formToObject = function(_2a2) {
                var ret = {};
                var _2a3 = "file|submit|image|reset|button|";
                _29d.forEach(dojo.byId(_2a2).elements, function(item) {
                    var _2a4 = item.name;
                    var type = (item.type || "").toLowerCase();
                    if (_2a4 && type && _2a3.indexOf(type) == -1 && !item.disabled) {
                        _29e(ret, _2a4, _29d.fieldToObject(item));
                        if (type == "image") {
                            ret[_2a4 + ".x"] = ret[_2a4 + ".y"] = ret[_2a4].x = ret[_2a4].y = 0;
                        }
                    }
                });
                return ret;
            };
            dojo.objectToQuery = function(map) {
                var enc = encodeURIComponent;
                var _2a5 = [];
                var _2a6 = {};
                for (var name in map) {
                    var _2a7 = map[name];
                    if (_2a7 != _2a6[name]) {
                        var _2a8 = enc(name) + "=";
                        if (_29d.isArray(_2a7)) {
                            for (var i = 0; i < _2a7.length; i++) {
                                _2a5.push(_2a8 + enc(_2a7[i]));
                            }
                        } else {
                            _2a5.push(_2a8 + enc(_2a7));
                        }
                    }
                }
                return _2a5.join("&");
            };
            dojo.formToQuery = function(_2a9) {
                return _29d.objectToQuery(_29d.formToObject(_2a9));
            };
            dojo.formToJson = function(_2aa, _2ab) {
                return _29d.toJson(_29d.formToObject(_2aa), _2ab);
            };
            dojo.queryToObject = function(str) {
                var ret = {};
                var qp = str.split("&");
                var dec = decodeURIComponent;
                _29d.forEach(qp, function(item) {
                    if (item.length) {
                        var _2ac = item.split("=");
                        var name = dec(_2ac.shift());
                        var val = dec(_2ac.join("="));
                        if (typeof ret[name] == "string") {
                            ret[name] = [ret[name]];
                        }
                        if (_29d.isArray(ret[name])) {
                            ret[name].push(val);
                        } else {
                            ret[name] = val;
                        }
                    }
                });
                return ret;
            };
            dojo._blockAsync = false;
            var _2ad = _29d._contentHandlers = dojo.contentHandlers = {
                text: function(xhr) {
                    return xhr.responseText;
                },
                json: function(xhr) {
                    return _29d.fromJson(xhr.responseText || null);
                },
                "json-comment-filtered": function(xhr) {
                    if (!dojo.config.useCommentedJson) {}
                    var _2ae = xhr.responseText;
                    var _2af = _2ae.indexOf("/*");
                    var _2b0 = _2ae.lastIndexOf("*/");
                    if (_2af == -1 || _2b0 == -1) {
                        throw new Error("JSON was not comment filtered");
                    }
                    return _29d.fromJson(_2ae.substring(_2af + 2, _2b0));
                },
                javascript: function(xhr) {
                    return _29d.eval(xhr.responseText);
                },
                xml: function(xhr) {
                    var _2b1 = xhr.responseXML;
                    if (_29d.isIE && (!_2b1 || !_2b1.documentElement)) {
                        var ms = function(n) {
                            return "MSXML" + n + ".DOMDocument";
                        };
                        var dp = ["Microsoft.XMLDOM", ms(6), ms(4), ms(3), ms(2)];
                        _29d.some(dp, function(p) {
                            try {
                                var dom = new ActiveXObject(p);
                                dom.async = false;
                                dom.loadXML(xhr.responseText);
                                _2b1 = dom;
                            } catch (e) {
                                return false;
                            }
                            return true;
                        });
                    }
                    return _2b1;
                },
                "json-comment-optional": function(xhr) {
                    if (xhr.responseText && /^[^{\[]*\/\*/.test(xhr.responseText)) {
                        return _2ad["json-comment-filtered"](xhr);
                    } else {
                        return _2ad["json"](xhr);
                    }
                }
            };
            dojo._ioSetArgs = function(args, _2b2, _2b3, _2b4) {
                var _2b5 = {
                    args: args,
                    url: args.url
                };
                var _2b6 = null;
                if (args.form) {
                    var form = _29d.byId(args.form);
                    var _2b7 = form.getAttributeNode("action");
                    _2b5.url = _2b5.url || (_2b7 ? _2b7.value : null);
                    _2b6 = _29d.formToObject(form);
                }
                var _2b8 = [{}];
                if (_2b6) {
                    _2b8.push(_2b6);
                }
                if (args.content) {
                    _2b8.push(args.content);
                }
                if (args.preventCache) {
                    _2b8.push({
                        "dojo.preventCache": new Date().valueOf()
                    });
                }
                _2b5.query = _29d.objectToQuery(_29d.mixin.apply(null, _2b8));
                _2b5.handleAs = args.handleAs || "text";
                var d = new _29d.Deferred(_2b2);
                d.addCallbacks(_2b3, function(_2b9) {
                    return _2b4(_2b9, d);
                });
                var ld = args.load;
                if (ld && _29d.isFunction(ld)) {
                    d.addCallback(function(_2ba) {
                        return ld.call(args, _2ba, _2b5);
                    });
                }
                var err = args.error;
                if (err && _29d.isFunction(err)) {
                    d.addErrback(function(_2bb) {
                        return err.call(args, _2bb, _2b5);
                    });
                }
                var _2bc = args.handle;
                if (_2bc && _29d.isFunction(_2bc)) {
                    d.addBoth(function(_2bd) {
                        return _2bc.call(args, _2bd, _2b5);
                    });
                }
                if (cfg.ioPublish && _29d.publish && _2b5.args.ioPublish !== false) {
                    d.addCallbacks(function(res) {
                        _29d.publish("/dojo/io/load", [d, res]);
                        return res;
                    }, function(res) {
                        _29d.publish("/dojo/io/error", [d, res]);
                        return res;
                    });
                    d.addBoth(function(res) {
                        _29d.publish("/dojo/io/done", [d, res]);
                        return res;
                    });
                }
                d.ioArgs = _2b5;
                return d;
            };
            var _2be = function(dfd) {
                dfd.canceled = true;
                var xhr = dfd.ioArgs.xhr;
                var _2bf = typeof xhr.abort;
                if (_2bf == "function" || _2bf == "object" || _2bf == "unknown") {
                    xhr.abort();
                }
                var err = dfd.ioArgs.error;
                if (!err) {
                    err = new Error("xhr cancelled");
                    err.dojoType = "cancel";
                }
                return err;
            };
            var _2c0 = function(dfd) {
                var ret = _2ad[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
                return ret === undefined ? null : ret;
            };
            var _2c1 = function(_2c2, dfd) {
                if (!dfd.ioArgs.args.failOk) {}
                return _2c2;
            };
            var _2c3 = null;
            var _2c4 = [];
            var _2c5 = 0;
            var _2c6 = function(dfd) {
                if (_2c5 <= 0) {
                    _2c5 = 0;
                    if (cfg.ioPublish && _29d.publish && (!dfd || dfd && dfd.ioArgs.args.ioPublish !== false)) {
                        _29d.publish("/dojo/io/stop");
                    }
                }
            };
            var _2c7 = function() {
                var now = (new Date()).getTime();
                if (!_29d._blockAsync) {
                    for (var i = 0, tif; i < _2c4.length && (tif = _2c4[i]); i++) {
                        var dfd = tif.dfd;
                        var func = function() {
                            if (!dfd || dfd.canceled || !tif.validCheck(dfd)) {
                                _2c4.splice(i--, 1);
                                _2c5 -= 1;
                            } else {
                                if (tif.ioCheck(dfd)) {
                                    _2c4.splice(i--, 1);
                                    tif.resHandle(dfd);
                                    _2c5 -= 1;
                                } else {
                                    if (dfd.startTime) {
                                        if (dfd.startTime + (dfd.ioArgs.args.timeout || 0) < now) {
                                            _2c4.splice(i--, 1);
                                            var err = new Error("timeout exceeded");
                                            err.dojoType = "timeout";
                                            dfd.errback(err);
                                            dfd.cancel();
                                            _2c5 -= 1;
                                        }
                                    }
                                }
                            }
                        };
                        if (dojo.config.debugAtAllCosts) {
                            func.call(this);
                        } else {
                            try {
                                func.call(this);
                            } catch (e) {
                                dfd.errback(e);
                            }
                        }
                    }
                }
                _2c6(dfd);
                if (!_2c4.length) {
                    clearInterval(_2c3);
                    _2c3 = null;
                    return;
                }
            };
            dojo._ioCancelAll = function() {
                try {
                    _29d.forEach(_2c4, function(i) {
                        try {
                            i.dfd.cancel();
                        } catch (e) {}
                    });
                } catch (e) {}
            };
            if (_29d.isIE) {
                _29d.addOnWindowUnload(_29d._ioCancelAll);
            }
            _29d._ioNotifyStart = function(dfd) {
                if (cfg.ioPublish && _29d.publish && dfd.ioArgs.args.ioPublish !== false) {
                    if (!_2c5) {
                        _29d.publish("/dojo/io/start");
                    }
                    _2c5 += 1;
                    _29d.publish("/dojo/io/send", [dfd]);
                }
            };
            _29d._ioWatch = function(dfd, _2c8, _2c9, _2ca) {
                var args = dfd.ioArgs.args;
                if (args.timeout) {
                    dfd.startTime = (new Date()).getTime();
                }
                _2c4.push({
                    dfd: dfd,
                    validCheck: _2c8,
                    ioCheck: _2c9,
                    resHandle: _2ca
                });
                if (!_2c3) {
                    _2c3 = setInterval(_2c7, 50);
                }
                if (args.sync) {
                    _2c7();
                }
            };
            var _2cb = "application/x-www-form-urlencoded";
            var _2cc = function(dfd) {
                return dfd.ioArgs.xhr.readyState;
            };
            var _2cd = function(dfd) {
                return 4 == dfd.ioArgs.xhr.readyState;
            };
            var _2ce = function(dfd) {
                var xhr = dfd.ioArgs.xhr;
                if (_29d._isDocumentOk(xhr)) {
                    dfd.callback(dfd);
                } else {
                    var err = new Error("Unable to load " + dfd.ioArgs.url + " status:" + xhr.status);
                    err.status = xhr.status;
                    err.responseText = xhr.responseText;
                    dfd.errback(err);
                }
            };
            dojo._ioAddQueryToUrl = function(_2cf) {
                if (_2cf.query.length) {
                    _2cf.url += (_2cf.url.indexOf("?") == -1 ? "?" : "&") + _2cf.query;
                    _2cf.query = null;
                }
            };
            dojo.xhr = function(_2d0, args, _2d1) {
                var dfd = _29d._ioSetArgs(args, _2be, _2c0, _2c1);
                var _2d2 = dfd.ioArgs;
                var xhr = _2d2.xhr = _29d._xhrObj(_2d2.args);
                if (!xhr) {
                    dfd.cancel();
                    return dfd;
                }
                if ("postData" in args) {
                    _2d2.query = args.postData;
                } else {
                    if ("putData" in args) {
                        _2d2.query = args.putData;
                    } else {
                        if ("rawBody" in args) {
                            _2d2.query = args.rawBody;
                        } else {
                            if ((arguments.length > 2 && !_2d1) || "POST|PUT".indexOf(_2d0.toUpperCase()) == -1) {
                                _29d._ioAddQueryToUrl(_2d2);
                            }
                        }
                    }
                }
                xhr.open(_2d0, _2d2.url, args.sync !== true, args.user || undefined, args.password || undefined);
                if (args.headers) {
                    for (var hdr in args.headers) {
                        if (hdr.toLowerCase() === "content-type" && !args.contentType) {
                            args.contentType = args.headers[hdr];
                        } else {
                            if (args.headers[hdr]) {
                                xhr.setRequestHeader(hdr, args.headers[hdr]);
                            }
                        }
                    }
                }
                xhr.setRequestHeader("Content-Type", args.contentType || _2cb);
                if (!args.headers || !("X-Requested-With" in args.headers)) {
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                }
                _29d._ioNotifyStart(dfd);
                if (dojo.config.debugAtAllCosts) {
                    xhr.send(_2d2.query);
                } else {
                    try {
                        xhr.send(_2d2.query);
                    } catch (e) {
                        _2d2.error = e;
                        dfd.cancel();
                    }
                }
                _29d._ioWatch(dfd, _2cc, _2cd, _2ce);
                xhr = null;
                return dfd;
            };
            dojo.xhrGet = function(args) {
                return _29d.xhr("GET", args);
            };
            dojo.rawXhrPost = dojo.xhrPost = function(args) {
                return _29d.xhr("POST", args, true);
            };
            dojo.rawXhrPut = dojo.xhrPut = function(args) {
                return _29d.xhr("PUT", args, true);
            };
            dojo.xhrDelete = function(args) {
                return _29d.xhr("DELETE", args);
            };
        })();
    }
    if (!dojo._hasResource["dojo._base.fx"]) {
        dojo._hasResource["dojo._base.fx"] = true;
        dojo.provide("dojo._base.fx");
        (function() {
            var d = dojo;
            var _2d3 = d._mixin;
            dojo._Line = function(_2d4, end) {
                this.start = _2d4;
                this.end = end;
            };
            dojo._Line.prototype.getValue = function(n) {
                return ((this.end - this.start) * n) + this.start;
            };
            dojo.Animation = function(args) {
                _2d3(this, args);
                if (d.isArray(this.curve)) {
                    this.curve = new d._Line(this.curve[0], this.curve[1]);
                }
            };
            d._Animation = d.Animation;
            d.extend(dojo.Animation, {
                duration: 350,
                repeat: 0,
                rate: 20,
                _percent: 0,
                _startRepeatCount: 0,
                _getStep: function() {
                    var _2d5 = this._percent,
                        _2d6 = this.easing;
                    return _2d6 ? _2d6(_2d5) : _2d5;
                },
                _fire: function(evt, args) {
                    var a = args || [];
                    if (this[evt]) {
                        if (d.config.debugAtAllCosts) {
                            this[evt].apply(this, a);
                        } else {
                            try {
                                this[evt].apply(this, a);
                            } catch (e) {}
                        }
                    }
                    return this;
                },
                play: function(_2d7, _2d8) {
                    var _2d9 = this;
                    if (_2d9._delayTimer) {
                        _2d9._clearTimer();
                    }
                    if (_2d8) {
                        _2d9._stopTimer();
                        _2d9._active = _2d9._paused = false;
                        _2d9._percent = 0;
                    } else {
                        if (_2d9._active && !_2d9._paused) {
                            return _2d9;
                        }
                    }
                    _2d9._fire("beforeBegin", [_2d9.node]);
                    var de = _2d7 || _2d9.delay,
                        _2da = dojo.hitch(_2d9, "_play", _2d8);
                    if (de > 0) {
                        _2d9._delayTimer = setTimeout(_2da, de);
                        return _2d9;
                    }
                    _2da();
                    return _2d9;
                },
                _play: function(_2db) {
                    var _2dc = this;
                    if (_2dc._delayTimer) {
                        _2dc._clearTimer();
                    }
                    _2dc._startTime = new Date().valueOf();
                    if (_2dc._paused) {
                        _2dc._startTime -= _2dc.duration * _2dc._percent;
                    }
                    _2dc._active = true;
                    _2dc._paused = false;
                    var _2dd = _2dc.curve.getValue(_2dc._getStep());
                    if (!_2dc._percent) {
                        if (!_2dc._startRepeatCount) {
                            _2dc._startRepeatCount = _2dc.repeat;
                        }
                        _2dc._fire("onBegin", [_2dd]);
                    }
                    _2dc._fire("onPlay", [_2dd]);
                    _2dc._cycle();
                    return _2dc;
                },
                pause: function() {
                    var _2de = this;
                    if (_2de._delayTimer) {
                        _2de._clearTimer();
                    }
                    _2de._stopTimer();
                    if (!_2de._active) {
                        return _2de;
                    }
                    _2de._paused = true;
                    _2de._fire("onPause", [_2de.curve.getValue(_2de._getStep())]);
                    return _2de;
                },
                gotoPercent: function(_2df, _2e0) {
                    var _2e1 = this;
                    _2e1._stopTimer();
                    _2e1._active = _2e1._paused = true;
                    _2e1._percent = _2df;
                    if (_2e0) {
                        _2e1.play();
                    }
                    return _2e1;
                },
                stop: function(_2e2) {
                    var _2e3 = this;
                    if (_2e3._delayTimer) {
                        _2e3._clearTimer();
                    }
                    if (!_2e3._timer) {
                        return _2e3;
                    }
                    _2e3._stopTimer();
                    if (_2e2) {
                        _2e3._percent = 1;
                    }
                    _2e3._fire("onStop", [_2e3.curve.getValue(_2e3._getStep())]);
                    _2e3._active = _2e3._paused = false;
                    return _2e3;
                },
                status: function() {
                    if (this._active) {
                        return this._paused ? "paused" : "playing";
                    }
                    return "stopped";
                },
                _cycle: function() {
                    var _2e4 = this;
                    if (_2e4._active) {
                        var curr = new Date().valueOf();
                        var step = (curr - _2e4._startTime) / (_2e4.duration);
                        if (step >= 1) {
                            step = 1;
                        }
                        _2e4._percent = step;
                        if (_2e4.easing) {
                            step = _2e4.easing(step);
                        }
                        _2e4._fire("onAnimate", [_2e4.curve.getValue(step)]);
                        if (_2e4._percent < 1) {
                            _2e4._startTimer();
                        } else {
                            _2e4._active = false;
                            if (_2e4.repeat > 0) {
                                _2e4.repeat--;
                                _2e4.play(null, true);
                            } else {
                                if (_2e4.repeat == -1) {
                                    _2e4.play(null, true);
                                } else {
                                    if (_2e4._startRepeatCount) {
                                        _2e4.repeat = _2e4._startRepeatCount;
                                        _2e4._startRepeatCount = 0;
                                    }
                                }
                            }
                            _2e4._percent = 0;
                            _2e4._fire("onEnd", [_2e4.node]);
                            !_2e4.repeat && _2e4._stopTimer();
                        }
                    }
                    return _2e4;
                },
                _clearTimer: function() {
                    clearTimeout(this._delayTimer);
                    delete this._delayTimer;
                }
            });
            var ctr = 0,
                _2e5 = null,
                _2e6 = {
                    run: function() {}
                };
            d.extend(d.Animation, {
                _startTimer: function() {
                    if (!this._timer) {
                        this._timer = d.connect(_2e6, "run", this, "_cycle");
                        ctr++;
                    }
                    if (!_2e5) {
                        _2e5 = setInterval(d.hitch(_2e6, "run"), this.rate);
                    }
                },
                _stopTimer: function() {
                    if (this._timer) {
                        d.disconnect(this._timer);
                        this._timer = null;
                        ctr--;
                    }
                    if (ctr <= 0) {
                        clearInterval(_2e5);
                        _2e5 = null;
                        ctr = 0;
                    }
                }
            });
            var _2e7 = d.isIE ? function(node) {
                var ns = node.style;
                if (!ns.width.length && d.style(node, "width") == "auto") {
                    ns.width = "auto";
                }
            } : function() {};
            dojo._fade = function(args) {
                args.node = d.byId(args.node);
                var _2e8 = _2d3({
                        properties: {}
                    }, args),
                    _2e9 = (_2e8.properties.opacity = {});
                _2e9.start = !("start" in _2e8) ? function() {
                    return +d.style(_2e8.node, "opacity") || 0;
                } : _2e8.start;
                _2e9.end = _2e8.end;
                var anim = d.animateProperty(_2e8);
                d.connect(anim, "beforeBegin", d.partial(_2e7, _2e8.node));
                return anim;
            };
            dojo.fadeIn = function(args) {
                return d._fade(_2d3({
                    end: 1
                }, args));
            };
            dojo.fadeOut = function(args) {
                return d._fade(_2d3({
                    end: 0
                }, args));
            };
            dojo._defaultEasing = function(n) {
                return 0.5 + ((Math.sin((n + 1.5) * Math.PI)) / 2);
            };
            var _2ea = function(_2eb) {
                this._properties = _2eb;
                for (var p in _2eb) {
                    var prop = _2eb[p];
                    if (prop.start instanceof d.Color) {
                        prop.tempColor = new d.Color();
                    }
                }
            };
            _2ea.prototype.getValue = function(r) {
                var ret = {};
                for (var p in this._properties) {
                    var prop = this._properties[p],
                        _2ec = prop.start;
                    if (_2ec instanceof d.Color) {
                        ret[p] = d.blendColors(_2ec, prop.end, r, prop.tempColor).toCss();
                    } else {
                        if (!d.isArray(_2ec)) {
                            ret[p] = ((prop.end - _2ec) * r) + _2ec + (p != "opacity" ? prop.units || "px" : 0);
                        }
                    }
                }
                return ret;
            };
            dojo.animateProperty = function(args) {
                var n = args.node = d.byId(args.node);
                if (!args.easing) {
                    args.easing = d._defaultEasing;
                }
                var anim = new d.Animation(args);
                d.connect(anim, "beforeBegin", anim, function() {
                    var pm = {};
                    for (var p in this.properties) {
                        if (p == "width" || p == "height") {
                            this.node.display = "block";
                        }
                        var prop = this.properties[p];
                        if (d.isFunction(prop)) {
                            prop = prop(n);
                        }
                        prop = pm[p] = _2d3({}, (d.isObject(prop) ? prop : {
                            end: prop
                        }));
                        if (d.isFunction(prop.start)) {
                            prop.start = prop.start(n);
                        }
                        if (d.isFunction(prop.end)) {
                            prop.end = prop.end(n);
                        }
                        var _2ed = (p.toLowerCase().indexOf("color") >= 0);

                        function _2ee(node, p) {
                            var v = {
                                height: node.offsetHeight,
                                width: node.offsetWidth
                            }[p];
                            if (v !== undefined) {
                                return v;
                            }
                            v = d.style(node, p);
                            return (p == "opacity") ? +v : (_2ed ? v : parseFloat(v));
                        };
                        if (!("end" in prop)) {
                            prop.end = _2ee(n, p);
                        } else {
                            if (!("start" in prop)) {
                                prop.start = _2ee(n, p);
                            }
                        }
                        if (_2ed) {
                            prop.start = new d.Color(prop.start);
                            prop.end = new d.Color(prop.end);
                        } else {
                            prop.start = (p == "opacity") ? +prop.start : parseFloat(prop.start);
                        }
                    }
                    this.curve = new _2ea(pm);
                });
                d.connect(anim, "onAnimate", d.hitch(d, "style", anim.node));
                return anim;
            };
            dojo.anim = function(node, _2ef, _2f0, _2f1, _2f2, _2f3) {
                return d.animateProperty({
                    node: node,
                    duration: _2f0 || d.Animation.prototype.duration,
                    properties: _2ef,
                    easing: _2f1,
                    onEnd: _2f2
                }).play(_2f3 || 0);
            };
        })();
    }
    if (!dojo._hasResource["dojo.i18n"]) {
        dojo._hasResource["dojo.i18n"] = true;
        dojo.provide("dojo.i18n");
        dojo.getObject("i18n", true, dojo);
        dojo.i18n.getLocalization = dojo.i18n.getLocalization || function(_2f4, _2f5, _2f6) {
            _2f6 = dojo.i18n.normalizeLocale(_2f6);
            var _2f7 = _2f6.split("-");
            var _2f8 = [_2f4, "nls", _2f5].join(".");
            var _2f9 = dojo._loadedModules[_2f8];
            if (_2f9) {
                var _2fa;
                for (var i = _2f7.length; i > 0; i--) {
                    var loc = _2f7.slice(0, i).join("_");
                    if (_2f9[loc]) {
                        _2fa = _2f9[loc];
                        break;
                    }
                }
                if (!_2fa) {
                    _2fa = _2f9.ROOT;
                }
                if (_2fa) {
                    var _2fb = function() {};
                    _2fb.prototype = _2fa;
                    return new _2fb();
                }
            }
            throw new Error("Bundle not found: " + _2f5 + " in " + _2f4 + " , locale=" + _2f6);
        };
        dojo.i18n.normalizeLocale = function(_2fc) {
            var _2fd = _2fc ? _2fc.toLowerCase() : dojo.locale;
            if (_2fd == "root") {
                _2fd = "ROOT";
            }
            return _2fd;
        };
        dojo.i18n._requireLocalization = function(_2fe, _2ff, _300, _301) {
            var _302 = dojo.i18n.normalizeLocale(_300);
            var _303 = [_2fe, "nls", _2ff].join(".");
            var _304 = "";
            if (_301) {
                var _305 = _301.split(",");
                for (var i = 0; i < _305.length; i++) {
                    if (_302["indexOf"](_305[i]) == 0) {
                        if (_305[i].length > _304.length) {
                            _304 = _305[i];
                        }
                    }
                }
                if (!_304) {
                    _304 = "ROOT";
                }
            }
            var _306 = _301 ? _304 : _302;
            var _307 = dojo._loadedModules[_303];
            var _308 = null;
            if (_307) {
                if (dojo.config.localizationComplete && _307._built) {
                    return;
                }
                var _309 = _306.replace(/-/g, "_");
                var _30a = _303 + "." + _309;
                _308 = dojo._loadedModules[_30a];
            }
            if (!_308) {
                _307 = dojo["provide"](_303);
                var syms = dojo._getModuleSymbols(_2fe);
                var _30b = syms.concat("nls").join("/");
                var _30c;
                dojo.i18n._searchLocalePath(_306, _301, function(loc) {
                    var _30d = loc.replace(/-/g, "_");
                    var _30e = _303 + "." + _30d;
                    var _30f = false;
                    if (!dojo._loadedModules[_30e]) {
                        dojo["provide"](_30e);
                        var _310 = [_30b];
                        if (loc != "ROOT") {
                            _310.push(loc);
                        }
                        _310.push(_2ff);
                        var _311 = _310.join("/") + ".js";
                        _30f = dojo._loadPath(_311, null, function(hash) {
                            hash = hash.root || hash;
                            var _312 = function() {};
                            _312.prototype = _30c;
                            _307[_30d] = new _312();
                            for (var j in hash) {
                                _307[_30d][j] = hash[j];
                            }
                        });
                    } else {
                        _30f = true;
                    }
                    if (_30f && _307[_30d]) {
                        _30c = _307[_30d];
                    } else {
                        _307[_30d] = _30c;
                    }
                    if (_301) {
                        return true;
                    }
                });
            }
            if (_301 && _302 != _304) {
                _307[_302.replace(/-/g, "_")] = _307[_304.replace(/-/g, "_")];
            }
        };
        (function() {
            var _313 = dojo.config.extraLocale;
            if (_313) {
                if (!_313 instanceof Array) {
                    _313 = [_313];
                }
                var req = dojo.i18n._requireLocalization;
                dojo.i18n._requireLocalization = function(m, b, _314, _315) {
                    req(m, b, _314, _315);
                    if (_314) {
                        return;
                    }
                    for (var i = 0; i < _313.length; i++) {
                        req(m, b, _313[i], _315);
                    }
                };
            }
        })();
        dojo.i18n._searchLocalePath = function(_316, down, _317) {
            _316 = dojo.i18n.normalizeLocale(_316);
            var _318 = _316.split("-");
            var _319 = [];
            for (var i = _318.length; i > 0; i--) {
                _319.push(_318.slice(0, i).join("-"));
            }
            _319.push(false);
            if (down) {
                _319.reverse();
            }
            for (var j = _319.length - 1; j >= 0; j--) {
                var loc = _319[j] || "ROOT";
                var stop = _317(loc);
                if (stop) {
                    break;
                }
            }
        };
        dojo.i18n._preloadLocalizations = function(_31a, _31b) {
            function _31c(_31d) {
                _31d = dojo.i18n.normalizeLocale(_31d);
                dojo.i18n._searchLocalePath(_31d, true, function(loc) {
                    for (var i = 0; i < _31b.length; i++) {
                        if (_31b[i] == loc) {
                            dojo["require"](_31a + "_" + loc);
                            return true;
                        }
                    }
                    return false;
                });
            };
            _31c();
            var _31e = dojo.config.extraLocale || [];
            for (var i = 0; i < _31e.length; i++) {
                _31c(_31e[i]);
            }
        };
    }
    if (!dojo._hasResource["dojo._base.browser"]) {
        dojo._hasResource["dojo._base.browser"] = true;
        dojo.provide("dojo._base.browser");
        dojo.forEach(dojo.config.require, function(i) {
            dojo["require"](i);
        });
    }
    if (!dojo._hasResource["dojo._base"]) {
        dojo._hasResource["dojo._base"] = true;
        dojo.provide("dojo._base");
    }
    if (dojo.isBrowser && (document.readyState === "complete" || dojo.config.afterOnLoad)) {
        window.setTimeout(dojo._loadInit, 100);
    }
})();
/* $Id$ 
 * Copyright (c) 2011 IBM Corporation
 * Owner: Corporate Webmaster (NUS_N_NIWWW)
 */
if (!dojo._hasResource["ibmweb.config"]) {
    dojo._hasResource["ibmweb.config"] = true;
    dojo.provide("ibmweb.config");
    ibmweb.config.set = function(_1, _2) {
        if (dojo.isString(_1)) {
            dojo.setObject(_1, _2, ibmweb.config);
        } else {
            if (dojo.isArray(_1)) {
                dojo.setObject(_1.join("."), _2, ibmweb.config);
            } else {
                if (dojo.isObject(_1)) {
                    for (var _3 in _1) {
                        if (dojo.isObject(_1[_3]) && !dojo.isArray(_1[_3])) {
                            ibmweb.config[_3] = dojo.mixin(ibmweb.config[_3], _1[_3]);
                        } else {
                            ibmweb.config.set([_3], _1[_3]);
                        }
                    }
                }
            }
        }
    };
    ibmweb.config.get = function(_4) {
        if (dojo.isArray(_4)) {
            _4 = _4.join(".");
        }
        return dojo.getObject(_4, false, ibmweb.config);
    };
    ibmweb.config.parseMetaTags = function() {
        if (!!window.ibmwebConfig && dojo.isObject(window.ibmwebConfig)) {
            ibmweb.config.set(window.ibmwebConfig);
        }
        if (dojo.byId("ibm-top") && dojo.hasClass("ibm-top", "ibm-popup")) {
            ibmweb.config.dynnav.enabled = false;
            if (!!ibmweb.config.pagetitle) {
                if (!dojo.byId("ibm-title")) {
                    dojo.create("li", {
                        id: "ibm-title"
                    }, "ibm-unav-links");
                }
                dojo.byId("ibm-title").innerHTML = ibmweb.config.pagetitle.htmlspecialchars();
            }
        }
        var _5 = function(_6) {
            if (_6 == "true") {
                return true;
            }
            if (_6 == "false") {
                return false;
            }
            if (parseFloat(_6) == _6) {
                return parseFloat(_6);
            }
            return _6;
        };
        for (var _7 in ibmweb.meta) {
            if (_7.indexOf("ibmweb_config_") === 0) {
                var _8 = _7.substring(11).replace("_", ".");
                var _9 = ibmweb.meta[_7];
                var _a = _9.split("||");
                for (var i = 0, j = _a.length; i < j; i++) {
                    var _b = _a[i].split(":");
                    if (_b.length == 1) {
                        ibmweb.config.set(_8, _5(_b[0]));
                    } else {
                        var _c = _b.shift();
                        if (_b.length == 1) {
                            ibmweb.config.set([_8, _c], _5(_b[0]));
                        } else {
                            ibmweb.config.set([_8, _c], _b);
                        }
                    }
                }
            }
        }
    };
}
if (!dojo._hasResource["ibmweb.www.config"]) {
    dojo._hasResource["ibmweb.www.config"] = true;
    dojo.provide("ibmweb.www.config");
    dojo.mixin(ibmweb.config, {
        config: "www",
        usedSettings: "production",
        forced: false,
        dataUrl: "//1.www.s81c.com/common/js/dynamicnav/www/",
        dynNavBaseUrl: "https://www.ibm.com/gateway/secstate/?",
        annotatorServUrl: "http://connect.ibm.com/transform/public/service/common_profile/profile/shared/",
        imageUrl: "//1.www.s81c.com/i/v17/",
        timeout: 10000,
        eluminate: {
            enabled: false,
            path: "/common/testpages/coremetrics/",
            CID: "50200000",
            cmSetClientID: {
                id: null,
                managedFirstParty: true,
                dataCollectionDomain: "data.coremetrics.com",
                cookieDomain: (document.domain.indexOf("ibm.com") !== -1) ? "ibm.com" : document.domain
            }
        },
        dynnav: {
            enabled: true
        },
        lazyload: {},
        signin: {
            enabled: true,
            overlay: true,
            formAction: "https://www-304.ibm.com/pkmslogin.form",
            signoutUrl: "https://www-304.ibm.com/pkmslogout?page=http://www.ibm.com/account/${cc}/${lc}/signout.html",
            signinUrl: "https://www.ibm.com/gss/instantprofile/InstantSignin?",
            registerUrl: "https://www.ibm.com/gss/instantprofile/InstantRegisterServlet?requestType=registerPart1&",
            codeRepository: "//1.www.s81c.com/common/v17/register/${NAME}.js"
        },
        register: {},
        footer: {
            enabled: true,
            feedbackLink: ""
        },
        footermenu: {
            enabled: true
        },
        megamenu: {
            enabled: true,
            linksonly: false,
            disabledLocales: ["ilhe"],
            maxColumns: 6,
            maxRows: 8,
            noScroll: false,
            minimizeByDefault: false,
            icons: "none",
            disableUniversalNav: false
        },
        easyaccess: {
            enabled: false,
            lifetime: 43200
        },
        merchandising: {
            enabled: true
        },
        greeting: {
            enabled: true,
            signinWidget: "ibmweb.dynnav.signinWidget"
        },
        localeselector: {
            enabled: false,
            maxitems: 12
        },
        video: {
            enabled: true
        },
        myinterests: {
            enabled: false
        },
        intercountry: {
            enabled: true
        },
        sbs: {
            enabled: true,
            email: true,
            print: true
        },
        bitly: {
            login: "ibmdigital",
            key: "R_1ed9169df98d3b072731d88ec80d18a7",
            timeout: 3000
        },
        noticechoice: {
            jsonUrl: "//1.www.s81c.com/common/translations"
        },
        opinionlab: {
            footer: {
                enabled: false,
                type: "overlay"
            },
            floating: {
                enabled: false,
                type: "popup",
                verticalFloating: true
            }
        },
        backtocountry: {
            enabled: false,
            id: "ibm-backtocountry",
            keepfilename: true
        },
        appmast: {
            enabled: false
        },
        idm: {
            profiling: {
                expliciturl: "https://www.ibm.com/gateway/profile_id/{INPUT_profile_id}/",
                anonymousurl: "https://www.ibm.com/instantprofile/iwmoverlay/service/anouser",
                filter: "//www.ibm.com/common/v17/instantprofile/blackwhite_lists.json",
                profilingjs: "//www.ibm.com/common/v17/instantprofile/profiling.js"
            }
        },
        subtabs: {
            viewtext: {
                all: "View all...",
                less: "View less..."
            }
        }
    });
    dojo.config.blankGif = "//1.www.s81c.com/i/c.gif";
    dojo.config.dojoBlankHtmlUrl = "//www.ibm.com/common/js/dojo/1.6/dojo/resources/blank.html";
    (function(_d) {
        _d = _d || "";
        if (_d) {
            ibmweb.config.forced = true;
        }
        var _e = document.cookie.match(/__DOJO=(\w*)/);
        if (_e) {
            _d = _e[1];
        }
        _d = _d || "production";
        ibmweb.config.usedSettings = _d;
        if (_d == "staging") {
            ibmweb.config.set({
                dataUrl: "//1.wwwstage.s81c.com/common/js/dynamicnav/www/",
                dynNavBaseUrl: "https://www-sso.toronto.ca.ibm.com/gateway/?",
                imageUrl: "//1.wwwstage.s81c.com/i/v17/",
                noticechoice: {
                    jsonUrl: "//1.wwwstage.s81c.com/common/translations"
                },
                signin: {
                    formAction: "https://www-wi-sso3.toronto.ca.ibm.com:445/usrsrvc/account/userservices/ait/jsp/login.jsp?persistPage=true&PD-REFERER=none&error=&page=${page}",
                    signoutUrl: "https://www-sso.toronto.ca.ibm.com/pkmslogout?page=http://wwwstage.ibm.com/account/${cc}/${lc}/signout.html",
                    signinUrl: "https://wwwstage.ibm.com/gss/instantprofile/InstantSignin?",
                    registerUrl: "https://wwwstage.ibm.com/gss/instantprofile/InstantRegisterServlet?requestType=registerPart1&",
                    codeRepository: "//1.wwwstage.s81c.com/common/v17/register/${NAME}.js"
                },
                idm: {
                    profiling: {
                        expliciturl: "https://wwwstage.ibm.com/gateway/profile_id/{INPUT_profile_id}/",
                        anonymousurl: "https://wwwstage.ibm.com/instantprofile/iwmoverlay/service/anouser",
                        filter: "//wwwstage.ibm.com/common/v17/instantprofile/blackwhite_lists.json",
                        profilingjs: "//wwwstage.ibm.com/common/v17/instantprofile/profiling.js"
                    }
                }
            });
        }
        if (_d == "wwwpreview") {
            ibmweb.config.set({
                dataUrl: "//1.wwwpreview.s81c.com/common/js/dynamicnav/www/",
                dynNavBaseUrl: "https://www-sso.toronto.ca.ibm.com/gateway/?",
                imageUrl: "//1.wwwpreview.s81c.com/i/v17/",
                noticechoice: {
                    jsonUrl: "//1.wwwpreview.s81c.com/common/translations"
                },
                signin: {
                    formAction: "https://www-wi-sso3.toronto.ca.ibm.com:445/usrsrvc/account/userservices/ait/jsp/login.jsp?persistPage=true&PD-REFERER=none&error=&page=${page}",
                    signoutUrl: "https://www-sso.toronto.ca.ibm.com/pkmslogout?page=http://wwwstage.ibm.com/account/${cc}/${lc}/signout.html",
                    signinUrl: "https://wwwstage.ibm.com/gss/instantprofile/InstantSignin?",
                    registerUrl: "https://wwwstage.ibm.com/gss/instantprofile/InstantRegisterServlet?requestType=registerPart1&",
                    codeRepository: "//wwwstage.ibm.com/common/v17/register/${NAME}.source.js"
                },
                idm: {
                    profiling: {
                        expliciturl: "https://wwwstage.ibm.com/gateway/profile_id/{INPUT_profile_id}/",
                        anonymousurl: "https://wwwstage.ibm.com/instantprofile/iwmoverlay/service/anouser",
                        filter: "//wwwstage.ibm.com/common/v17/instantprofile/blackwhite_lists.json",
                        profilingjs: "//wwwstage.ibm.com/common/v17/instantprofile/profiling.js"
                    }
                }
            });
        }
        if (_d == "development") {
            ibmweb.config.set({
                dataUrl: "//1.wwwpreview.s81c.com/common/js/dynamicnav/www/",
                dynNavBaseUrl: "https://www.ibm.com/gateway/secstate/?",
                imageUrl: "/i/v17/",
                annotatorServUrl: "https://iebalpha.cdtdp.toronto.ca.ibm.com:3443/transform/public/service/common_profile_test/profile/shared/",
                noticechoice: {
                    jsonUrl: "//1.www.s81c.com/common/translations"
                },
                signin: {
                    formAction: "https://www-sso.toronto.ca.ibm.com/usrsrvc/account/userservices/ait/jsp/login.jsp?persistPage=true&PD-REFERER=none&error=&page=${page}",
                    signoutUrl: "https://wwwbeta-sso.toronto.ca.ibm.com:444/pkmslogout?page=http://v17ecmpreview.webmaster.ibm.com/accoun/${cc}/${lc}/signout.html",
                    signinUrl: "https://wwwtest.ibm.com/gss/instantprofile/InstantSignin?",
                    registerUrl: "https://wwwtest.ibm.com/gss/instantprofile/InstantRegisterServlet?requestType=registerPart1&",
                    codeRepository: "//wwwtest.ibm.com/common/v17/register/${NAME}.source.js"
                },
                idm: {
                    profiling: {
                        expliciturl: "https://wwwtest.ibm.com/gateway/profile_id/{INPUT_profile_id}/",
                        anonymousurl: "https://wwwtest.ibm.com/ibmweb/idm/instantprofile/iwmoverlay/service/anouser",
                        filter: "//wwwtest.ibm.com/common/v17/instantprofile/blackwhite_lists.json",
                        profilingjs: "//wwwtest.ibm.com/common/v17/instantprofile/profiling.js"
                    }
                }
            });
        }
    })(dojo.config.ibmForceConfig);
}
if (!dojo._hasResource["ibmweb.dojoReadyForLegacyDojo"]) {
    dojo._hasResource["ibmweb.dojoReadyForLegacyDojo"] = true;
    dojo.provide("ibmweb.dojoReadyForLegacyDojo");
    (function() {
        dojo.ready = dojo.ready || dojo.addOnLoad;
    })();
}
if (!dojo._hasResource["ibmweb.moduleDomain"]) {
    dojo._hasResource["ibmweb.moduleDomain"] = true;
    dojo.provide("ibmweb.moduleDomain");
    ibmweb.moduleDomain.get = function() {
        var _f = getModuleUrl().match(/\/\/([^\/]*)\//);
        if (_f) {
            return _f[0];
        } else {
            if (getModuleUrl().substr(0, 1) === "/") {
                return "//" + window.location.host + "/";
            }
        }
        return "//1.www.s81c.com/";
    };

    function getModuleUrl() {
        if (dojo && dojo.moduleUrl) {
            var _10 = dojo.moduleUrl("ibmweb");
            if (typeof(_10) === "string") {
                return _10;
            } else {
                if (_10.uri && typeof(_10.uri) === "string") {
                    return _10.uri;
                }
            }
        }
        return "";
    };
}
if (!dojo._hasResource["ibmweb.cookieCheck"]) {
    dojo._hasResource["ibmweb.cookieCheck"] = true;
    dojo.provide("ibmweb.cookieCheck");
    var x, str;
    var h = false;
    var cookies = document.cookie.split(";");
    for (i = 0; i < cookies.length; i++) {
        x = cookies[i].substr(0, cookies[i].indexOf("="));
        str = cookies[i].substr(cookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        var cookieCheck = x.match("CookieChecker");
        if (cookieCheck) {
            h = true;
            break;
        }
    }
    if (h == false) {
        document.cookie = "CookieChecker=set;path=/;expires=Tue, 31 Dec 19 12:00:00 UTC";
        document.cookie = "CoreID6=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }
}
if (!dojo._hasResource["dijit._base.manager"]) {
    dojo._hasResource["dijit._base.manager"] = true;
    dojo.provide("dijit._base.manager");
    dojo.declare("dijit.WidgetSet", null, {
        constructor: function() {
            this._hash = {};
            this.length = 0;
        },
        add: function(_11) {
            if (this._hash[_11.id]) {
                throw new Error("Tried to register widget with id==" + _11.id + " but that id is already registered");
            }
            this._hash[_11.id] = _11;
            this.length++;
        },
        remove: function(id) {
            if (this._hash[id]) {
                delete this._hash[id];
                this.length--;
            }
        },
        forEach: function(_12, _13) {
            _13 = _13 || dojo.global;
            var i = 0,
                id;
            for (id in this._hash) {
                _12.call(_13, this._hash[id], i++, this._hash);
            }
            return this;
        },
        filter: function(_14, _15) {
            _15 = _15 || dojo.global;
            var res = new dijit.WidgetSet(),
                i = 0,
                id;
            for (id in this._hash) {
                var w = this._hash[id];
                if (_14.call(_15, w, i++, this._hash)) {
                    res.add(w);
                }
            }
            return res;
        },
        byId: function(id) {
            return this._hash[id];
        },
        byClass: function(cls) {
            var res = new dijit.WidgetSet(),
                id, _16;
            for (id in this._hash) {
                _16 = this._hash[id];
                if (_16.declaredClass == cls) {
                    res.add(_16);
                }
            }
            return res;
        },
        toArray: function() {
            var ar = [];
            for (var id in this._hash) {
                ar.push(this._hash[id]);
            }
            return ar;
        },
        map: function(_17, _18) {
            return dojo.map(this.toArray(), _17, _18);
        },
        every: function(_19, _1a) {
            _1a = _1a || dojo.global;
            var x = 0,
                i;
            for (i in this._hash) {
                if (!_19.call(_1a, this._hash[i], x++, this._hash)) {
                    return false;
                }
            }
            return true;
        },
        some: function(_1b, _1c) {
            _1c = _1c || dojo.global;
            var x = 0,
                i;
            for (i in this._hash) {
                if (_1b.call(_1c, this._hash[i], x++, this._hash)) {
                    return true;
                }
            }
            return false;
        }
    });
    (function() {
        dijit.registry = new dijit.WidgetSet();
        var _1d = dijit.registry._hash,
            _1e = dojo.attr,
            _1f = dojo.hasAttr,
            _20 = dojo.style;
        dijit.byId = function(id) {
            return typeof id == "string" ? _1d[id] : id;
        };
        var _21 = {};
        dijit.getUniqueId = function(_22) {
            var id;
            do {
                id = _22 + "_" + (_22 in _21 ? ++_21[_22] : _21[_22] = 0);
            } while (_1d[id]);
            return dijit._scopeName == "dijit" ? id : dijit._scopeName + "_" + id;
        };
        dijit.findWidgets = function(_23) {
            var _24 = [];

            function _25(_26) {
                for (var _27 = _26.firstChild; _27; _27 = _27.nextSibling) {
                    if (_27.nodeType == 1) {
                        var _28 = _27.getAttribute("widgetId");
                        if (_28) {
                            var _29 = _1d[_28];
                            if (_29) {
                                _24.push(_29);
                            }
                        } else {
                            _25(_27);
                        }
                    }
                }
            };
            _25(_23);
            return _24;
        };
        dijit._destroyAll = function() {
            dijit._curFocus = null;
            dijit._prevFocus = null;
            dijit._activeStack = [];
            dojo.forEach(dijit.findWidgets(dojo.body()), function(_2a) {
                if (!_2a._destroyed) {
                    if (_2a.destroyRecursive) {
                        _2a.destroyRecursive();
                    } else {
                        if (_2a.destroy) {
                            _2a.destroy();
                        }
                    }
                }
            });
        };
        if (dojo.isIE) {
            dojo.addOnWindowUnload(function() {
                dijit._destroyAll();
            });
        }
        dijit.byNode = function(_2b) {
            return _1d[_2b.getAttribute("widgetId")];
        };
        dijit.getEnclosingWidget = function(_2c) {
            while (_2c) {
                var id = _2c.getAttribute && _2c.getAttribute("widgetId");
                if (id) {
                    return _1d[id];
                }
                _2c = _2c.parentNode;
            }
            return null;
        };
        var _2d = (dijit._isElementShown = function(_2e) {
            var s = _20(_2e);
            return (s.visibility != "hidden") && (s.visibility != "collapsed") && (s.display != "none") && (_1e(_2e, "type") != "hidden");
        });
        dijit.hasDefaultTabStop = function(_2f) {
            switch (_2f.nodeName.toLowerCase()) {
                case "a":
                    return _1f(_2f, "href");
                case "area":
                case "button":
                case "input":
                case "object":
                case "select":
                case "textarea":
                    return true;
                case "iframe":
                    var _30;
                    try {
                        var _31 = _2f.contentDocument;
                        if ("designMode" in _31 && _31.designMode == "on") {
                            return true;
                        }
                        _30 = _31.body;
                    } catch (e1) {
                        try {
                            _30 = _2f.contentWindow.document.body;
                        } catch (e2) {
                            return false;
                        }
                    }
                    return _30.contentEditable == "true" || (_30.firstChild && _30.firstChild.contentEditable == "true");
                default:
                    return _2f.contentEditable == "true";
            }
        };
        var _32 = (dijit.isTabNavigable = function(_33) {
            if (_1e(_33, "disabled")) {
                return false;
            } else {
                if (_1f(_33, "tabIndex")) {
                    return _1e(_33, "tabIndex") >= 0;
                } else {
                    return dijit.hasDefaultTabStop(_33);
                }
            }
        });
        dijit._getTabNavigable = function(_34) {
            var _35, _36, _37, _38, _39, _3a, _3b = {};

            function _3c(_3d) {
                return _3d && _3d.tagName.toLowerCase() == "input" && _3d.type && _3d.type.toLowerCase() == "radio" && _3d.name && _3d.name.toLowerCase();
            };
            var _3e = function(_3f) {
                dojo.query("> *", _3f).forEach(function(_40) {
                    if ((dojo.isIE && _40.scopeName !== "HTML") || !_2d(_40)) {
                        return;
                    }
                    if (_32(_40)) {
                        var _41 = _1e(_40, "tabIndex");
                        if (!_1f(_40, "tabIndex") || _41 == 0) {
                            if (!_35) {
                                _35 = _40;
                            }
                            _36 = _40;
                        } else {
                            if (_41 > 0) {
                                if (!_37 || _41 < _38) {
                                    _38 = _41;
                                    _37 = _40;
                                }
                                if (!_39 || _41 >= _3a) {
                                    _3a = _41;
                                    _39 = _40;
                                }
                            }
                        }
                        var rn = _3c(_40);
                        if (dojo.attr(_40, "checked") && rn) {
                            _3b[rn] = _40;
                        }
                    }
                    if (_40.nodeName.toUpperCase() != "SELECT") {
                        _3e(_40);
                    }
                });
            };
            if (_2d(_34)) {
                _3e(_34);
            }

            function rs(_42) {
                return _3b[_3c(_42)] || _42;
            };
            return {
                first: rs(_35),
                last: rs(_36),
                lowest: rs(_37),
                highest: rs(_39)
            };
        };
        dijit.getFirstInTabbingOrder = function(_43) {
            var _44 = dijit._getTabNavigable(dojo.byId(_43));
            return _44.lowest ? _44.lowest : _44.first;
        };
        dijit.getLastInTabbingOrder = function(_45) {
            var _46 = dijit._getTabNavigable(dojo.byId(_45));
            return _46.last ? _46.last : _46.highest;
        };
        dijit.defaultDuration = dojo.config["defaultDuration"] || 200;
    })();
}
if (!dojo._hasResource["dojo.Stateful"]) {
    dojo._hasResource["dojo.Stateful"] = true;
    dojo.provide("dojo.Stateful");
    dojo.declare("dojo.Stateful", null, {
        postscript: function(_47) {
            if (_47) {
                dojo.mixin(this, _47);
            }
        },
        get: function(_48) {
            return this[_48];
        },
        set: function(_49, _4a) {
            if (typeof _49 === "object") {
                for (var x in _49) {
                    this.set(x, _49[x]);
                }
                return this;
            }
            var _4b = this[_49];
            this[_49] = _4a;
            if (this._watchCallbacks) {
                this._watchCallbacks(_49, _4b, _4a);
            }
            return this;
        },
        watch: function(_4c, _4d) {
            var _4e = this._watchCallbacks;
            if (!_4e) {
                var _4f = this;
                _4e = this._watchCallbacks = function(_50, _51, _52, _53) {
                    var _54 = function(_55) {
                        if (_55) {
                            _55 = _55.slice();
                            for (var i = 0, l = _55.length; i < l; i++) {
                                try {
                                    _55[i].call(_4f, _50, _51, _52);
                                } catch (e) {}
                            }
                        }
                    };
                    _54(_4e["_" + _50]);
                    if (!_53) {
                        _54(_4e["*"]);
                    }
                };
            }
            if (!_4d && typeof _4c === "function") {
                _4d = _4c;
                _4c = "*";
            } else {
                _4c = "_" + _4c;
            }
            var _56 = _4e[_4c];
            if (typeof _56 !== "object") {
                _56 = _4e[_4c] = [];
            }
            _56.push(_4d);
            return {
                unwatch: function() {
                    _56.splice(dojo.indexOf(_56, _4d), 1);
                }
            };
        }
    });
}
if (!dojo._hasResource["dijit._WidgetBase"]) {
    dojo._hasResource["dijit._WidgetBase"] = true;
    dojo.provide("dijit._WidgetBase");
    (function() {
        dojo.declare("dijit._WidgetBase", dojo.Stateful, {
            id: "",
            lang: "",
            dir: "",
            "class": "",
            style: "",
            title: "",
            tooltip: "",
            baseClass: "",
            srcNodeRef: null,
            domNode: null,
            containerNode: null,
            attributeMap: {
                id: "",
                dir: "",
                lang: "",
                "class": "",
                style: "",
                title: ""
            },
            _blankGif: (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")).toString(),
            postscript: function(_57, _58) {
                this.create(_57, _58);
            },
            create: function(_59, _5a) {
                this.srcNodeRef = dojo.byId(_5a);
                this._connects = [];
                this._subscribes = [];
                if (this.srcNodeRef && (typeof this.srcNodeRef.id == "string")) {
                    this.id = this.srcNodeRef.id;
                }
                if (_59) {
                    this.params = _59;
                    dojo._mixin(this, _59);
                }
                this.postMixInProperties();
                if (!this.id) {
                    this.id = dijit.getUniqueId(this.declaredClass.replace(/\./g, "_"));
                }
                dijit.registry.add(this);
                this.buildRendering();
                if (this.domNode) {
                    this._applyAttributes();
                    var _5b = this.srcNodeRef;
                    if (_5b && _5b.parentNode && this.domNode !== _5b) {
                        _5b.parentNode.replaceChild(this.domNode, _5b);
                    }
                }
                if (this.domNode) {
                    this.domNode.setAttribute("widgetId", this.id);
                }
                this.postCreate();
                if (this.srcNodeRef && !this.srcNodeRef.parentNode) {
                    delete this.srcNodeRef;
                }
                this._created = true;
            },
            _applyAttributes: function() {
                var _5c = function(_5d, _5e) {
                    if ((_5e.params && _5d in _5e.params) || _5e[_5d]) {
                        _5e.set(_5d, _5e[_5d]);
                    }
                };
                for (var _5f in this.attributeMap) {
                    _5c(_5f, this);
                }
                dojo.forEach(this._getSetterAttributes(), function(a) {
                    if (!(a in this.attributeMap)) {
                        _5c(a, this);
                    }
                }, this);
            },
            _getSetterAttributes: function() {
                var _60 = this.constructor;
                if (!_60._setterAttrs) {
                    var r = (_60._setterAttrs = []),
                        _61, _62 = _60.prototype;
                    for (var _63 in _62) {
                        if (dojo.isFunction(_62[_63]) && (_61 = _63.match(/^_set([a-zA-Z]*)Attr$/)) && _61[1]) {
                            r.push(_61[1].charAt(0).toLowerCase() + _61[1].substr(1));
                        }
                    }
                }
                return _60._setterAttrs;
            },
            postMixInProperties: function() {},
            buildRendering: function() {
                if (!this.domNode) {
                    this.domNode = this.srcNodeRef || dojo.create("div");
                }
                if (this.baseClass) {
                    var _64 = this.baseClass.split(" ");
                    if (!this.isLeftToRight()) {
                        _64 = _64.concat(dojo.map(_64, function(_65) {
                            return _65 + "Rtl";
                        }));
                    }
                    dojo.addClass(this.domNode, _64);
                }
            },
            postCreate: function() {},
            startup: function() {
                this._started = true;
            },
            destroyRecursive: function(_66) {
                this._beingDestroyed = true;
                this.destroyDescendants(_66);
                this.destroy(_66);
            },
            destroy: function(_67) {
                this._beingDestroyed = true;
                this.uninitialize();
                var d = dojo,
                    dfe = d.forEach,
                    dun = d.unsubscribe;
                dfe(this._connects, function(_68) {
                    dfe(_68, d.disconnect);
                });
                dfe(this._subscribes, function(_69) {
                    dun(_69);
                });
                dfe(this._supportingWidgets || [], function(w) {
                    if (w.destroyRecursive) {
                        w.destroyRecursive();
                    } else {
                        if (w.destroy) {
                            w.destroy();
                        }
                    }
                });
                this.destroyRendering(_67);
                dijit.registry.remove(this.id);
                this._destroyed = true;
            },
            destroyRendering: function(_6a) {
                if (this.bgIframe) {
                    this.bgIframe.destroy(_6a);
                    delete this.bgIframe;
                }
                if (this.domNode) {
                    if (_6a) {
                        dojo.removeAttr(this.domNode, "widgetId");
                    } else {
                        dojo.destroy(this.domNode);
                    }
                    delete this.domNode;
                }
                if (this.srcNodeRef) {
                    if (!_6a) {
                        dojo.destroy(this.srcNodeRef);
                    }
                    delete this.srcNodeRef;
                }
            },
            destroyDescendants: function(_6b) {
                dojo.forEach(this.getChildren(), function(_6c) {
                    if (_6c.destroyRecursive) {
                        _6c.destroyRecursive(_6b);
                    }
                });
            },
            uninitialize: function() {
                return false;
            },
            _setClassAttr: function(_6d) {
                var _6e = this[this.attributeMap["class"] || "domNode"];
                dojo.replaceClass(_6e, _6d, this["class"]);
                this._set("class", _6d);
            },
            _setStyleAttr: function(_6f) {
                var _70 = this[this.attributeMap.style || "domNode"];
                if (dojo.isObject(_6f)) {
                    dojo.style(_70, _6f);
                } else {
                    if (_70.style.cssText) {
                        _70.style.cssText += "; " + _6f;
                    } else {
                        _70.style.cssText = _6f;
                    }
                }
                this._set("style", _6f);
            },
            _attrToDom: function(_71, _72) {
                var _73 = this.attributeMap[_71];
                dojo.forEach(dojo.isArray(_73) ? _73 : [_73], function(_74) {
                    var _75 = this[_74.node || _74 || "domNode"];
                    var _76 = _74.type || "attribute";
                    switch (_76) {
                        case "attribute":
                            if (dojo.isFunction(_72)) {
                                _72 = dojo.hitch(this, _72);
                            }
                            var _77 = _74.attribute ? _74.attribute : (/^on[A-Z][a-zA-Z]*$/.test(_71) ? _71.toLowerCase() : _71);
                            dojo.attr(_75, _77, _72);
                            break;
                        case "innerText":
                            _75.innerHTML = "";
                            _75.appendChild(dojo.doc.createTextNode(_72));
                            break;
                        case "innerHTML":
                            _75.innerHTML = _72;
                            break;
                        case "class":
                            dojo.replaceClass(_75, _72, this[_71]);
                            break;
                    }
                }, this);
            },
            get: function(_78) {
                var _79 = this._getAttrNames(_78);
                return this[_79.g] ? this[_79.g]() : this[_78];
            },
            set: function(_7a, _7b) {
                if (typeof _7a === "object") {
                    for (var x in _7a) {
                        this.set(x, _7a[x]);
                    }
                    return this;
                }
                var _7c = this._getAttrNames(_7a);
                if (this[_7c.s]) {
                    var _7d = this[_7c.s].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    if (_7a in this.attributeMap) {
                        this._attrToDom(_7a, _7b);
                    }
                    this._set(_7a, _7b);
                }
                return _7d || this;
            },
            _attrPairNames: {},
            _getAttrNames: function(_7e) {
                var apn = this._attrPairNames;
                if (apn[_7e]) {
                    return apn[_7e];
                }
                var uc = _7e.charAt(0).toUpperCase() + _7e.substr(1);
                return (apn[_7e] = {
                    n: _7e + "Node",
                    s: "_set" + uc + "Attr",
                    g: "_get" + uc + "Attr"
                });
            },
            _set: function(_7f, _80) {
                var _81 = this[_7f];
                this[_7f] = _80;
                if (this._watchCallbacks && this._created && _80 !== _81) {
                    this._watchCallbacks(_7f, _81, _80);
                }
            },
            toString: function() {
                return "[Widget " + this.declaredClass + ", " + (this.id || "NO ID") + "]";
            },
            getDescendants: function() {
                return this.containerNode ? dojo.query("[widgetId]", this.containerNode).map(dijit.byNode) : [];
            },
            getChildren: function() {
                return this.containerNode ? dijit.findWidgets(this.containerNode) : [];
            },
            connect: function(obj, _82, _83) {
                var _84 = [dojo._connect(obj, _82, this, _83)];
                this._connects.push(_84);
                return _84;
            },
            disconnect: function(_85) {
                for (var i = 0; i < this._connects.length; i++) {
                    if (this._connects[i] == _85) {
                        dojo.forEach(_85, dojo.disconnect);
                        this._connects.splice(i, 1);
                        return;
                    }
                }
            },
            subscribe: function(_86, _87) {
                var _88 = dojo.subscribe(_86, this, _87);
                this._subscribes.push(_88);
                return _88;
            },
            unsubscribe: function(_89) {
                for (var i = 0; i < this._subscribes.length; i++) {
                    if (this._subscribes[i] == _89) {
                        dojo.unsubscribe(_89);
                        this._subscribes.splice(i, 1);
                        return;
                    }
                }
            },
            isLeftToRight: function() {
                return this.dir ? (this.dir == "ltr") : dojo._isBodyLtr();
            },
            placeAt: function(_8a, _8b) {
                if (_8a.declaredClass && _8a.addChild) {
                    _8a.addChild(this, _8b);
                } else {
                    dojo.place(this.domNode, _8a, _8b);
                }
                return this;
            }
        });
    })();
}
if (!dojo._hasResource["dojo.window"]) {
    dojo._hasResource["dojo.window"] = true;
    dojo.provide("dojo.window");
    dojo.getObject("window", true, dojo);
    dojo.window.getBox = function() {
        var _8c = (dojo.doc.compatMode == "BackCompat") ? dojo.body() : dojo.doc.documentElement;
        var _8d = dojo._docScroll();
        return {
            w: _8c.clientWidth,
            h: _8c.clientHeight,
            l: _8d.x,
            t: _8d.y
        };
    };
    dojo.window.get = function(doc) {
        if (dojo.isIE && window !== document.parentWindow) {
            doc.parentWindow.execScript("document._parentWindow = window;", "Javascript");
            var win = doc._parentWindow;
            doc._parentWindow = null;
            return win;
        }
        return doc.parentWindow || doc.defaultView;
    };
    dojo.window.scrollIntoView = function(_8e, pos) {
        try {
            _8e = dojo.byId(_8e);
            var doc = _8e.ownerDocument || dojo.doc,
                _8f = doc.body || dojo.body(),
                _90 = doc.documentElement || _8f.parentNode,
                _91 = dojo.isIE,
                _92 = dojo.isWebKit;
            if ((!(dojo.isMoz || _91 || _92 || dojo.isOpera) || _8e == _8f || _8e == _90) && (typeof _8e.scrollIntoView != "undefined")) {
                _8e.scrollIntoView(false);
                return;
            }
            var _93 = doc.compatMode == "BackCompat",
                _94 = (_91 >= 9 && _8e.ownerDocument.parentWindow.frameElement) ? ((_90.clientHeight > 0 && _90.clientWidth > 0 && (_8f.clientHeight == 0 || _8f.clientWidth == 0 || _8f.clientHeight > _90.clientHeight || _8f.clientWidth > _90.clientWidth)) ? _90 : _8f) : (_93 ? _8f : _90),
                _95 = _92 ? _8f : _94,
                _96 = _94.clientWidth,
                _97 = _94.clientHeight,
                rtl = !dojo._isBodyLtr(),
                _98 = pos || dojo.position(_8e),
                el = _8e.parentNode,
                _99 = function(el) {
                    return ((_91 <= 6 || (_91 && _93)) ? false : (dojo.style(el, "position").toLowerCase() == "fixed"));
                };
            if (_99(_8e)) {
                return;
            }
            while (el) {
                if (el == _8f) {
                    el = _95;
                }
                var _9a = dojo.position(el),
                    _9b = _99(el);
                if (el == _95) {
                    _9a.w = _96;
                    _9a.h = _97;
                    if (_95 == _90 && _91 && rtl) {
                        _9a.x += _95.offsetWidth - _9a.w;
                    }
                    if (_9a.x < 0 || !_91) {
                        _9a.x = 0;
                    }
                    if (_9a.y < 0 || !_91) {
                        _9a.y = 0;
                    }
                } else {
                    var pb = dojo._getPadBorderExtents(el);
                    _9a.w -= pb.w;
                    _9a.h -= pb.h;
                    _9a.x += pb.l;
                    _9a.y += pb.t;
                    var _9c = el.clientWidth,
                        _9d = _9a.w - _9c;
                    if (_9c > 0 && _9d > 0) {
                        _9a.w = _9c;
                        _9a.x += (rtl && (_91 || el.clientLeft > pb.l)) ? _9d : 0;
                    }
                    _9c = el.clientHeight;
                    _9d = _9a.h - _9c;
                    if (_9c > 0 && _9d > 0) {
                        _9a.h = _9c;
                    }
                }
                if (_9b) {
                    if (_9a.y < 0) {
                        _9a.h += _9a.y;
                        _9a.y = 0;
                    }
                    if (_9a.x < 0) {
                        _9a.w += _9a.x;
                        _9a.x = 0;
                    }
                    if (_9a.y + _9a.h > _97) {
                        _9a.h = _97 - _9a.y;
                    }
                    if (_9a.x + _9a.w > _96) {
                        _9a.w = _96 - _9a.x;
                    }
                }
                var l = _98.x - _9a.x,
                    t = _98.y - Math.max(_9a.y, 0),
                    r = l + _98.w - _9a.w,
                    bot = t + _98.h - _9a.h;
                if (r * l > 0) {
                    var s = Math[l < 0 ? "max" : "min"](l, r);
                    if (rtl && ((_91 == 8 && !_93) || _91 >= 9)) {
                        s = -s;
                    }
                    _98.x += el.scrollLeft;
                    el.scrollLeft += s;
                    _98.x -= el.scrollLeft;
                }
                if (bot * t > 0) {
                    _98.y += el.scrollTop;
                    el.scrollTop += Math[t < 0 ? "max" : "min"](t, bot);
                    _98.y -= el.scrollTop;
                }
                el = (el != _95) && !_9b && el.parentNode;
            }
        } catch (error) {
            _8e.scrollIntoView(false);
        }
    };
}
if (!dojo._hasResource["dijit._base.focus"]) {
    dojo._hasResource["dijit._base.focus"] = true;
    dojo.provide("dijit._base.focus");
    dojo.mixin(dijit, {
        _curFocus: null,
        _prevFocus: null,
        isCollapsed: function() {
            return dijit.getBookmark().isCollapsed;
        },
        getBookmark: function() {
            var bm, rg, tg, sel = dojo.doc.selection,
                cf = dijit._curFocus;
            if (dojo.global.getSelection) {
                sel = dojo.global.getSelection();
                if (sel) {
                    if (sel.isCollapsed) {
                        tg = cf ? cf.tagName : "";
                        if (tg) {
                            tg = tg.toLowerCase();
                            if (tg == "textarea" || (tg == "input" && (!cf.type || cf.type.toLowerCase() == "text"))) {
                                sel = {
                                    start: cf.selectionStart,
                                    end: cf.selectionEnd,
                                    node: cf,
                                    pRange: true
                                };
                                return {
                                    isCollapsed: (sel.end <= sel.start),
                                    mark: sel
                                };
                            }
                        }
                        bm = {
                            isCollapsed: true
                        };
                        if (sel.rangeCount) {
                            bm.mark = sel.getRangeAt(0).cloneRange();
                        }
                    } else {
                        rg = sel.getRangeAt(0);
                        bm = {
                            isCollapsed: false,
                            mark: rg.cloneRange()
                        };
                    }
                }
            } else {
                if (sel) {
                    tg = cf ? cf.tagName : "";
                    tg = tg.toLowerCase();
                    if (cf && tg && (tg == "button" || tg == "textarea" || tg == "input")) {
                        if (sel.type && sel.type.toLowerCase() == "none") {
                            return {
                                isCollapsed: true,
                                mark: null
                            };
                        } else {
                            rg = sel.createRange();
                            return {
                                isCollapsed: rg.text && rg.text.length ? false : true,
                                mark: {
                                    range: rg,
                                    pRange: true
                                }
                            };
                        }
                    }
                    bm = {};
                    try {
                        rg = sel.createRange();
                        bm.isCollapsed = !(sel.type == "Text" ? rg.htmlText.length : rg.length);
                    } catch (e) {
                        bm.isCollapsed = true;
                        return bm;
                    }
                    if (sel.type.toUpperCase() == "CONTROL") {
                        if (rg.length) {
                            bm.mark = [];
                            var i = 0,
                                len = rg.length;
                            while (i < len) {
                                bm.mark.push(rg.item(i++));
                            }
                        } else {
                            bm.isCollapsed = true;
                            bm.mark = null;
                        }
                    } else {
                        bm.mark = rg.getBookmark();
                    }
                } else {}
            }
            return bm;
        },
        moveToBookmark: function(_9e) {
            var _9f = dojo.doc,
                _a0 = _9e.mark;
            if (_a0) {
                if (dojo.global.getSelection) {
                    var sel = dojo.global.getSelection();
                    if (sel && sel.removeAllRanges) {
                        if (_a0.pRange) {
                            var r = _a0;
                            var n = r.node;
                            n.selectionStart = r.start;
                            n.selectionEnd = r.end;
                        } else {
                            sel.removeAllRanges();
                            sel.addRange(_a0);
                        }
                    } else {}
                } else {
                    if (_9f.selection && _a0) {
                        var rg;
                        if (_a0.pRange) {
                            rg = _a0.range;
                        } else {
                            if (dojo.isArray(_a0)) {
                                rg = _9f.body.createControlRange();
                                dojo.forEach(_a0, function(n) {
                                    rg.addElement(n);
                                });
                            } else {
                                rg = _9f.body.createTextRange();
                                rg.moveToBookmark(_a0);
                            }
                        }
                        rg.select();
                    }
                }
            }
        },
        getFocus: function(_a1, _a2) {
            var _a3 = !dijit._curFocus || (_a1 && dojo.isDescendant(dijit._curFocus, _a1.domNode)) ? dijit._prevFocus : dijit._curFocus;
            return {
                node: _a3,
                bookmark: (_a3 == dijit._curFocus) && dojo.withGlobal(_a2 || dojo.global, dijit.getBookmark),
                openedForWindow: _a2
            };
        },
        focus: function(_a4) {
            if (!_a4) {
                return;
            }
            var _a5 = "node" in _a4 ? _a4.node : _a4,
                _a6 = _a4.bookmark,
                _a7 = _a4.openedForWindow,
                _a8 = _a6 ? _a6.isCollapsed : false;
            if (_a5) {
                var _a9 = (_a5.tagName.toLowerCase() == "iframe") ? _a5.contentWindow : _a5;
                if (_a9 && _a9.focus) {
                    try {
                        _a9.focus();
                    } catch (e) {}
                }
                dijit._onFocusNode(_a5);
            }
            if (_a6 && dojo.withGlobal(_a7 || dojo.global, dijit.isCollapsed) && !_a8) {
                if (_a7) {
                    _a7.focus();
                }
                try {
                    dojo.withGlobal(_a7 || dojo.global, dijit.moveToBookmark, null, [_a6]);
                } catch (e2) {}
            }
        },
        _activeStack: [],
        registerIframe: function(_aa) {
            return dijit.registerWin(_aa.contentWindow, _aa);
        },
        unregisterIframe: function(_ab) {
            dijit.unregisterWin(_ab);
        },
        registerWin: function(_ac, _ad) {
            var _ae = function(evt) {
                dijit._justMouseDowned = true;
                setTimeout(function() {
                    dijit._justMouseDowned = false;
                }, 0);
                if (dojo.isIE && evt && evt.srcElement && evt.srcElement.parentNode == null) {
                    return;
                }
                dijit._onTouchNode(_ad || evt.target || evt.srcElement, "mouse");
            };
            var doc = dojo.isIE ? _ac.document.documentElement : _ac.document;
            if (doc) {
                if (dojo.isIE) {
                    _ac.document.body.attachEvent("onmousedown", _ae);
                    var _af = function(evt) {
                        if (evt.srcElement.tagName.toLowerCase() != "#document" && dijit.isTabNavigable(evt.srcElement)) {
                            dijit._onFocusNode(_ad || evt.srcElement);
                        } else {
                            dijit._onTouchNode(_ad || evt.srcElement);
                        }
                    };
                    doc.attachEvent("onactivate", _af);
                    var _b0 = function(evt) {
                        dijit._onBlurNode(_ad || evt.srcElement);
                    };
                    doc.attachEvent("ondeactivate", _b0);
                    return function() {
                        _ac.document.detachEvent("onmousedown", _ae);
                        doc.detachEvent("onactivate", _af);
                        doc.detachEvent("ondeactivate", _b0);
                        doc = null;
                    };
                } else {
                    doc.body.addEventListener("mousedown", _ae, true);
                    var _b1 = function(evt) {
                        dijit._onFocusNode(_ad || evt.target);
                    };
                    doc.addEventListener("focus", _b1, true);
                    var _b2 = function(evt) {
                        dijit._onBlurNode(_ad || evt.target);
                    };
                    doc.addEventListener("blur", _b2, true);
                    return function() {
                        doc.body.removeEventListener("mousedown", _ae, true);
                        doc.removeEventListener("focus", _b1, true);
                        doc.removeEventListener("blur", _b2, true);
                        doc = null;
                    };
                }
            }
        },
        unregisterWin: function(_b3) {
            _b3 && _b3();
        },
        _onBlurNode: function(_b4) {
            dijit._prevFocus = dijit._curFocus;
            dijit._curFocus = null;
            if (dijit._justMouseDowned) {
                return;
            }
            if (dijit._clearActiveWidgetsTimer) {
                clearTimeout(dijit._clearActiveWidgetsTimer);
            }
            dijit._clearActiveWidgetsTimer = setTimeout(function() {
                delete dijit._clearActiveWidgetsTimer;
                dijit._setStack([]);
                dijit._prevFocus = null;
            }, 100);
        },
        _onTouchNode: function(_b5, by) {
            if (dijit._clearActiveWidgetsTimer) {
                clearTimeout(dijit._clearActiveWidgetsTimer);
                delete dijit._clearActiveWidgetsTimer;
            }
            var _b6 = [];
            try {
                while (_b5) {
                    var _b7 = dojo.attr(_b5, "dijitPopupParent");
                    if (_b7) {
                        _b5 = dijit.byId(_b7).domNode;
                    } else {
                        if (_b5.tagName && _b5.tagName.toLowerCase() == "body") {
                            if (_b5 === dojo.body()) {
                                break;
                            }
                            _b5 = dojo.window.get(_b5.ownerDocument).frameElement;
                        } else {
                            var id = _b5.getAttribute && _b5.getAttribute("widgetId"),
                                _b8 = id && dijit.byId(id);
                            if (_b8 && !(by == "mouse" && _b8.get("disabled"))) {
                                _b6.unshift(id);
                            }
                            _b5 = _b5.parentNode;
                        }
                    }
                }
            } catch (e) {}
            dijit._setStack(_b6, by);
        },
        _onFocusNode: function(_b9) {
            if (!_b9) {
                return;
            }
            if (_b9.nodeType == 9) {
                return;
            }
            dijit._onTouchNode(_b9);
            if (_b9 == dijit._curFocus) {
                return;
            }
            if (dijit._curFocus) {
                dijit._prevFocus = dijit._curFocus;
            }
            dijit._curFocus = _b9;
            dojo.publish("focusNode", [_b9]);
        },
        _setStack: function(_ba, by) {
            var _bb = dijit._activeStack;
            dijit._activeStack = _ba;
            for (var _bc = 0; _bc < Math.min(_bb.length, _ba.length); _bc++) {
                if (_bb[_bc] != _ba[_bc]) {
                    break;
                }
            }
            var _bd;
            for (var i = _bb.length - 1; i >= _bc; i--) {
                _bd = dijit.byId(_bb[i]);
                if (_bd) {
                    _bd._focused = false;
                    _bd.set("focused", false);
                    _bd._hasBeenBlurred = true;
                    if (_bd._onBlur) {
                        _bd._onBlur(by);
                    }
                    dojo.publish("widgetBlur", [_bd, by]);
                }
            }
            for (i = _bc; i < _ba.length; i++) {
                _bd = dijit.byId(_ba[i]);
                if (_bd) {
                    _bd._focused = true;
                    _bd.set("focused", true);
                    if (_bd._onFocus) {
                        _bd._onFocus(by);
                    }
                    dojo.publish("widgetFocus", [_bd, by]);
                }
            }
        }
    });
    dojo.addOnLoad(function() {
        var _be = dijit.registerWin(window);
        if (dojo.isIE) {
            dojo.addOnWindowUnload(function() {
                dijit.unregisterWin(_be);
                _be = null;
            });
        }
    });
}
if (!dojo._hasResource["dojo.AdapterRegistry"]) {
    dojo._hasResource["dojo.AdapterRegistry"] = true;
    dojo.provide("dojo.AdapterRegistry");
    dojo.AdapterRegistry = function(_bf) {
        this.pairs = [];
        this.returnWrappers = _bf || false;
    };
    dojo.extend(dojo.AdapterRegistry, {
        register: function(_c0, _c1, _c2, _c3, _c4) {
            this.pairs[((_c4) ? "unshift" : "push")]([_c0, _c1, _c2, _c3]);
        },
        match: function() {
            for (var i = 0; i < this.pairs.length; i++) {
                var _c5 = this.pairs[i];
                if (_c5[1].apply(this, arguments)) {
                    if ((_c5[3]) || (this.returnWrappers)) {
                        return _c5[2];
                    } else {
                        return _c5[2].apply(this, arguments);
                    }
                }
            }
            throw new Error("No match found");
        },
        unregister: function(_c6) {
            for (var i = 0; i < this.pairs.length; i++) {
                var _c7 = this.pairs[i];
                if (_c7[0] == _c6) {
                    this.pairs.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    });
}
if (!dojo._hasResource["dijit._base.place"]) {
    dojo._hasResource["dijit._base.place"] = true;
    dojo.provide("dijit._base.place");
    dijit.getViewport = function() {
        return dojo.window.getBox();
    };
    dijit.placeOnScreen = function(_c8, pos, _c9, _ca) {
        var _cb = dojo.map(_c9, function(_cc) {
            var c = {
                corner: _cc,
                pos: {
                    x: pos.x,
                    y: pos.y
                }
            };
            if (_ca) {
                c.pos.x += _cc.charAt(1) == "L" ? _ca.x : -_ca.x;
                c.pos.y += _cc.charAt(0) == "T" ? _ca.y : -_ca.y;
            }
            return c;
        });
        return dijit._place(_c8, _cb);
    };
    dijit._place = function(_cd, _ce, _cf, _d0) {
        var _d1 = dojo.window.getBox();
        if (!_cd.parentNode || String(_cd.parentNode.tagName).toLowerCase() != "body") {
            dojo.body().appendChild(_cd);
        }
        var _d2 = null;
        dojo.some(_ce, function(_d3) {
            var _d4 = _d3.corner;
            var pos = _d3.pos;
            var _d5 = 0;
            var _d6 = {
                w: _d4.charAt(1) == "L" ? (_d1.l + _d1.w) - pos.x : pos.x - _d1.l,
                h: _d4.charAt(1) == "T" ? (_d1.t + _d1.h) - pos.y : pos.y - _d1.t
            };
            if (_cf) {
                var res = _cf(_cd, _d3.aroundCorner, _d4, _d6, _d0);
                _d5 = typeof res == "undefined" ? 0 : res;
            }
            var _d7 = _cd.style;
            var _d8 = _d7.display;
            var _d9 = _d7.visibility;
            _d7.visibility = "hidden";
            _d7.display = "";
            var mb = dojo.marginBox(_cd);
            _d7.display = _d8;
            _d7.visibility = _d9;
            var _da = Math.max(_d1.l, _d4.charAt(1) == "L" ? pos.x : (pos.x - mb.w)),
                _db = Math.max(_d1.t, _d4.charAt(0) == "T" ? pos.y : (pos.y - mb.h)),
                _dc = Math.min(_d1.l + _d1.w, _d4.charAt(1) == "L" ? (_da + mb.w) : pos.x),
                _dd = Math.min(_d1.t + _d1.h, _d4.charAt(0) == "T" ? (_db + mb.h) : pos.y),
                _de = _dc - _da,
                _df = _dd - _db;
            _d5 += (mb.w - _de) + (mb.h - _df);
            if (_d2 == null || _d5 < _d2.overflow) {
                _d2 = {
                    corner: _d4,
                    aroundCorner: _d3.aroundCorner,
                    x: _da,
                    y: _db,
                    w: _de,
                    h: _df,
                    overflow: _d5,
                    spaceAvailable: _d6
                };
            }
            return !_d5;
        });
        if (_d2.overflow && _cf) {
            _cf(_cd, _d2.aroundCorner, _d2.corner, _d2.spaceAvailable, _d0);
        }
        var l = dojo._isBodyLtr(),
            s = _cd.style;
        s.top = _d2.y + "px";
        s[l ? "left" : "right"] = (l ? _d2.x : _d1.w - _d2.x - _d2.w) + "px";
        return _d2;
    };
    dijit.placeOnScreenAroundNode = function(_e0, _e1, _e2, _e3) {
        _e1 = dojo.byId(_e1);
        var _e4 = dojo.position(_e1, true);
        return dijit._placeOnScreenAroundRect(_e0, _e4.x, _e4.y, _e4.w, _e4.h, _e2, _e3);
    };
    dijit.placeOnScreenAroundRectangle = function(_e5, _e6, _e7, _e8) {
        return dijit._placeOnScreenAroundRect(_e5, _e6.x, _e6.y, _e6.width, _e6.height, _e7, _e8);
    };
    dijit._placeOnScreenAroundRect = function(_e9, x, y, _ea, _eb, _ec, _ed) {
        var _ee = [];
        for (var _ef in _ec) {
            _ee.push({
                aroundCorner: _ef,
                corner: _ec[_ef],
                pos: {
                    x: x + (_ef.charAt(1) == "L" ? 0 : _ea),
                    y: y + (_ef.charAt(0) == "T" ? 0 : _eb)
                }
            });
        }
        return dijit._place(_e9, _ee, _ed, {
            w: _ea,
            h: _eb
        });
    };
    dijit.placementRegistry = new dojo.AdapterRegistry();
    dijit.placementRegistry.register("node", function(n, x) {
        return typeof x == "object" && typeof x.offsetWidth != "undefined" && typeof x.offsetHeight != "undefined";
    }, dijit.placeOnScreenAroundNode);
    dijit.placementRegistry.register("rect", function(n, x) {
        return typeof x == "object" && "x" in x && "y" in x && "width" in x && "height" in x;
    }, dijit.placeOnScreenAroundRectangle);
    dijit.placeOnScreenAroundElement = function(_f0, _f1, _f2, _f3) {
        return dijit.placementRegistry.match.apply(dijit.placementRegistry, arguments);
    };
    dijit.getPopupAroundAlignment = function(_f4, _f5) {
        var _f6 = {};
        dojo.forEach(_f4, function(pos) {
            switch (pos) {
                case "after":
                    _f6[_f5 ? "BR" : "BL"] = _f5 ? "BL" : "BR";
                    break;
                case "before":
                    _f6[_f5 ? "BL" : "BR"] = _f5 ? "BR" : "BL";
                    break;
                case "below-alt":
                    _f5 = !_f5;
                case "below":
                    _f6[_f5 ? "BL" : "BR"] = _f5 ? "TL" : "TR";
                    _f6[_f5 ? "BR" : "BL"] = _f5 ? "TR" : "TL";
                    break;
                case "above-alt":
                    _f5 = !_f5;
                case "above":
                default:
                    _f6[_f5 ? "TL" : "TR"] = _f5 ? "BL" : "BR";
                    _f6[_f5 ? "TR" : "TL"] = _f5 ? "BR" : "BL";
                    break;
            }
        });
        return _f6;
    };
}
if (!dojo._hasResource["dijit._base.window"]) {
    dojo._hasResource["dijit._base.window"] = true;
    dojo.provide("dijit._base.window");
    dijit.getDocumentWindow = function(doc) {
        return dojo.window.get(doc);
    };
}
if (!dojo._hasResource["dijit._base.popup"]) {
    dojo._hasResource["dijit._base.popup"] = true;
    dojo.provide("dijit._base.popup");
    dijit.popup = {
        _stack: [],
        _beginZIndex: 2000,
        _idGen: 1,
        _createWrapper: function(_f7) {
            var _f8 = _f7.declaredClass ? _f7._popupWrapper : (_f7.parentNode && dojo.hasClass(_f7.parentNode, "dijitPopup")),
                _f9 = _f7.domNode || _f7;
            if (!_f8) {
                _f8 = dojo.create("div", {
                    "class": "dijitPopup",
                    style: {
                        display: "none"
                    },
                    role: "presentation"
                }, dojo.body());
                _f8.appendChild(_f9);
                var s = _f9.style;
                s.display = "";
                s.visibility = "";
                s.position = "";
                s.top = "0px";
                if (_f7.declaredClass) {
                    _f7._popupWrapper = _f8;
                    dojo.connect(_f7, "destroy", function() {
                        dojo.destroy(_f8);
                        delete _f7._popupWrapper;
                    });
                }
            }
            return _f8;
        },
        moveOffScreen: function(_fa) {
            var _fb = this._createWrapper(_fa);
            dojo.style(_fb, {
                visibility: "hidden",
                top: "-9999px",
                display: ""
            });
        },
        hide: function(_fc) {
            var _fd = this._createWrapper(_fc);
            dojo.style(_fd, "display", "none");
        },
        getTopPopup: function() {
            var _fe = this._stack;
            for (var pi = _fe.length - 1; pi > 0 && _fe[pi].parent === _fe[pi - 1].widget; pi--) {}
            return _fe[pi];
        },
        open: function(_ff) {
            var _100 = this._stack,
                _101 = _ff.popup,
                _102 = _ff.orient || ((_ff.parent ? _ff.parent.isLeftToRight() : dojo._isBodyLtr()) ? {
                    "BL": "TL",
                    "BR": "TR",
                    "TL": "BL",
                    "TR": "BR"
                } : {
                    "BR": "TR",
                    "BL": "TL",
                    "TR": "BR",
                    "TL": "BL"
                }),
                _103 = _ff.around,
                id = (_ff.around && _ff.around.id) ? (_ff.around.id + "_dropdown") : ("popup_" + this._idGen++);
            while (_100.length && (!_ff.parent || !dojo.isDescendant(_ff.parent.domNode, _100[_100.length - 1].widget.domNode))) {
                dijit.popup.close(_100[_100.length - 1].widget);
            }
            var _104 = this._createWrapper(_101);
            dojo.attr(_104, {
                id: id,
                style: {
                    zIndex: this._beginZIndex + _100.length
                },
                "class": "dijitPopup " + (_101.baseClass || _101["class"] || "").split(" ")[0] + "Popup",
                dijitPopupParent: _ff.parent ? _ff.parent.id : ""
            });
            if (dojo.isIE || dojo.isMoz) {
                if (!_101.bgIframe) {
                    _101.bgIframe = new dijit.BackgroundIframe(_104);
                }
            }
            var best = _103 ? dijit.placeOnScreenAroundElement(_104, _103, _102, _101.orient ? dojo.hitch(_101, "orient") : null) : dijit.placeOnScreen(_104, _ff, _102 == "R" ? ["TR", "BR", "TL", "BL"] : ["TL", "BL", "TR", "BR"], _ff.padding);
            _104.style.display = "";
            _104.style.visibility = "visible";
            _101.domNode.style.visibility = "visible";
            var _105 = [];
            _105.push(dojo.connect(_104, "onkeypress", this, function(evt) {
                if (evt.charOrCode == dojo.keys.ESCAPE && _ff.onCancel) {
                    dojo.stopEvent(evt);
                    _ff.onCancel();
                } else {
                    if (evt.charOrCode === dojo.keys.TAB) {
                        dojo.stopEvent(evt);
                        var _106 = this.getTopPopup();
                        if (_106 && _106.onCancel) {
                            _106.onCancel();
                        }
                    }
                }
            }));
            if (_101.onCancel) {
                _105.push(dojo.connect(_101, "onCancel", _ff.onCancel));
            }
            _105.push(dojo.connect(_101, _101.onExecute ? "onExecute" : "onChange", this, function() {
                var _107 = this.getTopPopup();
                if (_107 && _107.onExecute) {
                    _107.onExecute();
                }
            }));
            _100.push({
                widget: _101,
                parent: _ff.parent,
                onExecute: _ff.onExecute,
                onCancel: _ff.onCancel,
                onClose: _ff.onClose,
                handlers: _105
            });
            if (_101.onOpen) {
                _101.onOpen(best);
            }
            return best;
        },
        close: function(_108) {
            var _109 = this._stack;
            while ((_108 && dojo.some(_109, function(elem) {
                    return elem.widget == _108;
                })) || (!_108 && _109.length)) {
                var top = _109.pop(),
                    _10a = top.widget,
                    _10b = top.onClose;
                if (_10a.onClose) {
                    _10a.onClose();
                }
                dojo.forEach(top.handlers, dojo.disconnect);
                if (_10a && _10a.domNode) {
                    this.hide(_10a);
                }
                if (_10b) {
                    _10b();
                }
            }
        }
    };
    dijit._frames = new function() {
        var _10c = [];
        this.pop = function() {
            var _10d;
            if (_10c.length) {
                _10d = _10c.pop();
                _10d.style.display = "";
            } else {
                if (dojo.isIE < 9) {
                    var burl = dojo.config["dojoBlankHtmlUrl"] || (dojo.moduleUrl("dojo", "resources/blank.html") + "") || "javascript:\"\"";
                    var html = "<iframe src='" + burl + "'" + " style='position: absolute; left: 0px; top: 0px;" + "z-index: -1; filter:Alpha(Opacity=\"0\");'>";
                    _10d = dojo.doc.createElement(html);
                } else {
                    _10d = dojo.create("iframe");
                    _10d.src = "javascript:\"\"";
                    _10d.className = "dijitBackgroundIframe";
                    dojo.style(_10d, "opacity", 0.1);
                }
                _10d.tabIndex = -1;
                dijit.setWaiRole(_10d, "presentation");
            }
            return _10d;
        };
        this.push = function(_10e) {
            _10e.style.display = "none";
            _10c.push(_10e);
        };
    }();
    dijit.BackgroundIframe = function(node) {
        if (!node.id) {
            throw new Error("no id");
        }
        if (dojo.isIE || dojo.isMoz) {
            var _10f = (this.iframe = dijit._frames.pop());
            node.appendChild(_10f);
            if (dojo.isIE < 7 || dojo.isQuirks) {
                this.resize(node);
                this._conn = dojo.connect(node, "onresize", this, function() {
                    this.resize(node);
                });
            } else {
                dojo.style(_10f, {
                    width: "100%",
                    height: "100%"
                });
            }
        }
    };
    dojo.extend(dijit.BackgroundIframe, {
        resize: function(node) {
            if (this.iframe) {
                dojo.style(this.iframe, {
                    width: node.offsetWidth + "px",
                    height: node.offsetHeight + "px"
                });
            }
        },
        destroy: function() {
            if (this._conn) {
                dojo.disconnect(this._conn);
                this._conn = null;
            }
            if (this.iframe) {
                dijit._frames.push(this.iframe);
                delete this.iframe;
            }
        }
    });
}
if (!dojo._hasResource["dijit._base.scroll"]) {
    dojo._hasResource["dijit._base.scroll"] = true;
    dojo.provide("dijit._base.scroll");
    dijit.scrollIntoView = function(node, pos) {
        dojo.window.scrollIntoView(node, pos);
    };
}
if (!dojo._hasResource["dojo.uacss"]) {
    dojo._hasResource["dojo.uacss"] = true;
    dojo.provide("dojo.uacss");
    (function() {
        var d = dojo,
            html = d.doc.documentElement,
            ie = d.isIE,
            _110 = d.isOpera,
            maj = Math.floor,
            ff = d.isFF,
            _111 = d.boxModel.replace(/-/, ""),
            _112 = {
                dj_ie: ie,
                dj_ie6: maj(ie) == 6,
                dj_ie7: maj(ie) == 7,
                dj_ie8: maj(ie) == 8,
                dj_ie9: maj(ie) == 9,
                dj_quirks: d.isQuirks,
                dj_iequirks: ie && d.isQuirks,
                dj_opera: _110,
                dj_khtml: d.isKhtml,
                dj_webkit: d.isWebKit,
                dj_safari: d.isSafari,
                dj_chrome: d.isChrome,
                dj_gecko: d.isMozilla,
                dj_ff3: maj(ff) == 3
            };
        _112["dj_" + _111] = true;
        var _113 = "";
        for (var clz in _112) {
            if (_112[clz]) {
                _113 += clz + " ";
            }
        }
        html.className = d.trim(html.className + " " + _113);
        dojo._loaders.unshift(function() {
            if (!dojo._isBodyLtr()) {
                var _114 = "dj_rtl dijitRtl " + _113.replace(/ /g, "-rtl ");
                html.className = d.trim(html.className + " " + _114);
            }
        });
    })();
}
if (!dojo._hasResource["dijit._base.sniff"]) {
    dojo._hasResource["dijit._base.sniff"] = true;
    dojo.provide("dijit._base.sniff");
}
if (!dojo._hasResource["dijit._base.typematic"]) {
    dojo._hasResource["dijit._base.typematic"] = true;
    dojo.provide("dijit._base.typematic");
    dijit.typematic = {
        _fireEventAndReload: function() {
            this._timer = null;
            this._callback(++this._count, this._node, this._evt);
            this._currentTimeout = Math.max(this._currentTimeout < 0 ? this._initialDelay : (this._subsequentDelay > 1 ? this._subsequentDelay : Math.round(this._currentTimeout * this._subsequentDelay)), this._minDelay);
            this._timer = setTimeout(dojo.hitch(this, "_fireEventAndReload"), this._currentTimeout);
        },
        trigger: function(evt, _115, node, _116, obj, _117, _118, _119) {
            if (obj != this._obj) {
                this.stop();
                this._initialDelay = _118 || 500;
                this._subsequentDelay = _117 || 0.9;
                this._minDelay = _119 || 10;
                this._obj = obj;
                this._evt = evt;
                this._node = node;
                this._currentTimeout = -1;
                this._count = -1;
                this._callback = dojo.hitch(_115, _116);
                this._fireEventAndReload();
                this._evt = dojo.mixin({
                    faux: true
                }, evt);
            }
        },
        stop: function() {
            if (this._timer) {
                clearTimeout(this._timer);
                this._timer = null;
            }
            if (this._obj) {
                this._callback(-1, this._node, this._evt);
                this._obj = null;
            }
        },
        addKeyListener: function(node, _11a, _11b, _11c, _11d, _11e, _11f) {
            if (_11a.keyCode) {
                _11a.charOrCode = _11a.keyCode;
                dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.", "", "2.0");
            } else {
                if (_11a.charCode) {
                    _11a.charOrCode = String.fromCharCode(_11a.charCode);
                    dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.", "", "2.0");
                }
            }
            return [dojo.connect(node, "onkeypress", this, function(evt) {
                if (evt.charOrCode == _11a.charOrCode && (_11a.ctrlKey === undefined || _11a.ctrlKey == evt.ctrlKey) && (_11a.altKey === undefined || _11a.altKey == evt.altKey) && (_11a.metaKey === undefined || _11a.metaKey == (evt.metaKey || false)) && (_11a.shiftKey === undefined || _11a.shiftKey == evt.shiftKey)) {
                    dojo.stopEvent(evt);
                    dijit.typematic.trigger(evt, _11b, node, _11c, _11a, _11d, _11e, _11f);
                } else {
                    if (dijit.typematic._obj == _11a) {
                        dijit.typematic.stop();
                    }
                }
            }), dojo.connect(node, "onkeyup", this, function(evt) {
                if (dijit.typematic._obj == _11a) {
                    dijit.typematic.stop();
                }
            })];
        },
        addMouseListener: function(node, _120, _121, _122, _123, _124) {
            var dc = dojo.connect;
            return [dc(node, "mousedown", this, function(evt) {
                dojo.stopEvent(evt);
                dijit.typematic.trigger(evt, _120, node, _121, node, _122, _123, _124);
            }), dc(node, "mouseup", this, function(evt) {
                dojo.stopEvent(evt);
                dijit.typematic.stop();
            }), dc(node, "mouseout", this, function(evt) {
                dojo.stopEvent(evt);
                dijit.typematic.stop();
            }), dc(node, "mousemove", this, function(evt) {
                evt.preventDefault();
            }), dc(node, "dblclick", this, function(evt) {
                dojo.stopEvent(evt);
                if (dojo.isIE) {
                    dijit.typematic.trigger(evt, _120, node, _121, node, _122, _123, _124);
                    setTimeout(dojo.hitch(this, dijit.typematic.stop), 50);
                }
            })];
        },
        addListener: function(_125, _126, _127, _128, _129, _12a, _12b, _12c) {
            return this.addKeyListener(_126, _127, _128, _129, _12a, _12b, _12c).concat(this.addMouseListener(_125, _128, _129, _12a, _12b, _12c));
        }
    };
}
if (!dojo._hasResource["dijit._base.wai"]) {
    dojo._hasResource["dijit._base.wai"] = true;
    dojo.provide("dijit._base.wai");
    dijit.wai = {
        onload: function() {
            var div = dojo.create("div", {
                id: "a11yTestNode",
                style: {
                    cssText: "border: 1px solid;" + "border-color:red green;" + "position: absolute;" + "height: 5px;" + "top: -999px;" + "background-image: url(\"" + (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")) + "\");"
                }
            }, dojo.body());
            var cs = dojo.getComputedStyle(div);
            if (cs) {
                var _12d = cs.backgroundImage;
                var _12e = (cs.borderTopColor == cs.borderRightColor) || (_12d != null && (_12d == "none" || _12d == "url(invalid-url:)"));
                dojo[_12e ? "addClass" : "removeClass"](dojo.body(), "dijit_a11y");
                if (dojo.isIE) {
                    div.outerHTML = "";
                } else {
                    dojo.body().removeChild(div);
                }
            }
        }
    };
    if (dojo.isIE || dojo.isMoz) {
        dojo._loaders.unshift(dijit.wai.onload);
    }
    dojo.mixin(dijit, {
        hasWaiRole: function(elem, role) {
            var _12f = this.getWaiRole(elem);
            return role ? (_12f.indexOf(role) > -1) : (_12f.length > 0);
        },
        getWaiRole: function(elem) {
            return dojo.trim((dojo.attr(elem, "role") || "").replace("wairole:", ""));
        },
        setWaiRole: function(elem, role) {
            dojo.attr(elem, "role", role);
        },
        removeWaiRole: function(elem, role) {
            var _130 = dojo.attr(elem, "role");
            if (!_130) {
                return;
            }
            if (role) {
                var t = dojo.trim((" " + _130 + " ").replace(" " + role + " ", " "));
                dojo.attr(elem, "role", t);
            } else {
                elem.removeAttribute("role");
            }
        },
        hasWaiState: function(elem, _131) {
            return elem.hasAttribute ? elem.hasAttribute("aria-" + _131) : !!elem.getAttribute("aria-" + _131);
        },
        getWaiState: function(elem, _132) {
            return elem.getAttribute("aria-" + _132) || "";
        },
        setWaiState: function(elem, _133, _134) {
            elem.setAttribute("aria-" + _133, _134);
        },
        removeWaiState: function(elem, _135) {
            elem.removeAttribute("aria-" + _135);
        }
    });
}
if (!dojo._hasResource["dijit._base"]) {
    dojo._hasResource["dijit._base"] = true;
    dojo.provide("dijit._base");
}
if (!dojo._hasResource["dijit._Widget"]) {
    dojo._hasResource["dijit._Widget"] = true;
    dojo.provide("dijit._Widget");
    dojo.connect(dojo, "_connect", function(_136, _137) {
        if (_136 && dojo.isFunction(_136._onConnect)) {
            _136._onConnect(_137);
        }
    });
    dijit._connectOnUseEventHandler = function(_138) {};
    dijit._lastKeyDownNode = null;
    if (dojo.isIE) {
        (function() {
            var _139 = function(evt) {
                dijit._lastKeyDownNode = evt.srcElement;
            };
            dojo.doc.attachEvent("onkeydown", _139);
            dojo.addOnWindowUnload(function() {
                dojo.doc.detachEvent("onkeydown", _139);
            });
        })();
    } else {
        dojo.doc.addEventListener("keydown", function(evt) {
            dijit._lastKeyDownNode = evt.target;
        }, true);
    }(function() {
        dojo.declare("dijit._Widget", dijit._WidgetBase, {
            _deferredConnects: {
                onClick: "",
                onDblClick: "",
                onKeyDown: "",
                onKeyPress: "",
                onKeyUp: "",
                onMouseMove: "",
                onMouseDown: "",
                onMouseOut: "",
                onMouseOver: "",
                onMouseLeave: "",
                onMouseEnter: "",
                onMouseUp: ""
            },
            onClick: dijit._connectOnUseEventHandler,
            onDblClick: dijit._connectOnUseEventHandler,
            onKeyDown: dijit._connectOnUseEventHandler,
            onKeyPress: dijit._connectOnUseEventHandler,
            onKeyUp: dijit._connectOnUseEventHandler,
            onMouseDown: dijit._connectOnUseEventHandler,
            onMouseMove: dijit._connectOnUseEventHandler,
            onMouseOut: dijit._connectOnUseEventHandler,
            onMouseOver: dijit._connectOnUseEventHandler,
            onMouseLeave: dijit._connectOnUseEventHandler,
            onMouseEnter: dijit._connectOnUseEventHandler,
            onMouseUp: dijit._connectOnUseEventHandler,
            create: function(_13a, _13b) {
                this._deferredConnects = dojo.clone(this._deferredConnects);
                for (var attr in this.attributeMap) {
                    delete this._deferredConnects[attr];
                }
                for (attr in this._deferredConnects) {
                    if (this[attr] !== dijit._connectOnUseEventHandler) {
                        delete this._deferredConnects[attr];
                    }
                }
                this.inherited(arguments);
                if (this.domNode) {
                    for (attr in this.params) {
                        this._onConnect(attr);
                    }
                }
            },
            _onConnect: function(_13c) {
                if (_13c in this._deferredConnects) {
                    var _13d = this[this._deferredConnects[_13c] || "domNode"];
                    this.connect(_13d, _13c.toLowerCase(), _13c);
                    delete this._deferredConnects[_13c];
                }
            },
            focused: false,
            isFocusable: function() {
                return this.focus && (dojo.style(this.domNode, "display") != "none");
            },
            onFocus: function() {},
            onBlur: function() {},
            _onFocus: function(e) {
                this.onFocus();
            },
            _onBlur: function() {
                this.onBlur();
            },
            setAttribute: function(attr, _13e) {
                dojo.deprecated(this.declaredClass + "::setAttribute(attr, value) is deprecated. Use set() instead.", "", "2.0");
                this.set(attr, _13e);
            },
            attr: function(name, _13f) {
                if (dojo.config.isDebug) {
                    var _140 = arguments.callee._ach || (arguments.callee._ach = {}),
                        _141 = (arguments.callee.caller || "unknown caller").toString();
                    if (!_140[_141]) {
                        dojo.deprecated(this.declaredClass + "::attr() is deprecated. Use get() or set() instead, called from " + _141, "", "2.0");
                        _140[_141] = true;
                    }
                }
                var args = arguments.length;
                if (args >= 2 || typeof name === "object") {
                    return this.set.apply(this, arguments);
                } else {
                    return this.get(name);
                }
            },
            nodesWithKeyClick: ["input", "button"],
            connect: function(obj, _142, _143) {
                var d = dojo,
                    dc = d._connect,
                    _144 = this.inherited(arguments, [obj, _142 == "ondijitclick" ? "onclick" : _142, _143]);
                if (_142 == "ondijitclick") {
                    if (d.indexOf(this.nodesWithKeyClick, obj.nodeName.toLowerCase()) == -1) {
                        var m = d.hitch(this, _143);
                        _144.push(dc(obj, "onkeydown", this, function(e) {
                            if ((e.keyCode == d.keys.ENTER || e.keyCode == d.keys.SPACE) && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
                                dijit._lastKeyDownNode = e.target;
                                if (!("openDropDown" in this && obj == this._buttonNode)) {
                                    e.preventDefault();
                                }
                            }
                        }), dc(obj, "onkeyup", this, function(e) {
                            if ((e.keyCode == d.keys.ENTER || e.keyCode == d.keys.SPACE) && e.target == dijit._lastKeyDownNode && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
                                dijit._lastKeyDownNode = null;
                                return m(e);
                            }
                        }));
                    }
                }
                return _144;
            },
            _onShow: function() {
                this.onShow();
            },
            onShow: function() {},
            onHide: function() {},
            onClose: function() {
                return true;
            }
        });
    })();
}
if (!dojo._hasResource["dojo.string"]) {
    dojo._hasResource["dojo.string"] = true;
    dojo.provide("dojo.string");
    dojo.getObject("string", true, dojo);
    dojo.string.rep = function(str, num) {
        if (num <= 0 || !str) {
            return "";
        }
        var buf = [];
        for (;;) {
            if (num & 1) {
                buf.push(str);
            }
            if (!(num >>= 1)) {
                break;
            }
            str += str;
        }
        return buf.join("");
    };
    dojo.string.pad = function(text, size, ch, end) {
        if (!ch) {
            ch = "0";
        }
        var out = String(text),
            pad = dojo.string.rep(ch, Math.ceil((size - out.length) / ch.length));
        return end ? out + pad : pad + out;
    };
    dojo.string.substitute = function(_145, map, _146, _147) {
        _147 = _147 || dojo.global;
        _146 = _146 ? dojo.hitch(_147, _146) : function(v) {
            return v;
        };
        return _145.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g, function(_148, key, _149) {
            var _14a = dojo.getObject(key, false, map);
            if (_149) {
                _14a = dojo.getObject(_149, false, _147).call(_147, _14a, key);
            }
            return _146(_14a, key).toString();
        });
    };
    dojo.string.trim = String.prototype.trim ? dojo.trim : function(str) {
        str = str.replace(/^\s+/, "");
        for (var i = str.length - 1; i >= 0; i--) {
            if (/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return str;
    };
}
if (!dojo._hasResource["dojo.date.stamp"]) {
    dojo._hasResource["dojo.date.stamp"] = true;
    dojo.provide("dojo.date.stamp");
    dojo.getObject("date.stamp", true, dojo);
    dojo.date.stamp.fromISOString = function(_14b, _14c) {
        if (!dojo.date.stamp._isoRegExp) {
            dojo.date.stamp._isoRegExp = /^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
        }
        var _14d = dojo.date.stamp._isoRegExp.exec(_14b),
            _14e = null;
        if (_14d) {
            _14d.shift();
            if (_14d[1]) {
                _14d[1]--;
            }
            if (_14d[6]) {
                _14d[6] *= 1000;
            }
            if (_14c) {
                _14c = new Date(_14c);
                dojo.forEach(dojo.map(["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds"], function(prop) {
                    return _14c["get" + prop]();
                }), function(_14f, _150) {
                    _14d[_150] = _14d[_150] || _14f;
                });
            }
            _14e = new Date(_14d[0] || 1970, _14d[1] || 0, _14d[2] || 1, _14d[3] || 0, _14d[4] || 0, _14d[5] || 0, _14d[6] || 0);
            if (_14d[0] < 100) {
                _14e.setFullYear(_14d[0] || 1970);
            }
            var _151 = 0,
                _152 = _14d[7] && _14d[7].charAt(0);
            if (_152 != "Z") {
                _151 = ((_14d[8] || 0) * 60) + (Number(_14d[9]) || 0);
                if (_152 != "-") {
                    _151 *= -1;
                }
            }
            if (_152) {
                _151 -= _14e.getTimezoneOffset();
            }
            if (_151) {
                _14e.setTime(_14e.getTime() + _151 * 60000);
            }
        }
        return _14e;
    };
    dojo.date.stamp.toISOString = function(_153, _154) {
        var _155 = function(n) {
            return (n < 10) ? "0" + n : n;
        };
        _154 = _154 || {};
        var _156 = [],
            _157 = _154.zulu ? "getUTC" : "get",
            date = "";
        if (_154.selector != "time") {
            var year = _153[_157 + "FullYear"]();
            date = ["0000".substr((year + "").length) + year, _155(_153[_157 + "Month"]() + 1), _155(_153[_157 + "Date"]())].join("-");
        }
        _156.push(date);
        if (_154.selector != "date") {
            var time = [_155(_153[_157 + "Hours"]()), _155(_153[_157 + "Minutes"]()), _155(_153[_157 + "Seconds"]())].join(":");
            var _158 = _153[_157 + "Milliseconds"]();
            if (_154.milliseconds) {
                time += "." + (_158 < 100 ? "0" : "") + _155(_158);
            }
            if (_154.zulu) {
                time += "Z";
            } else {
                if (_154.selector != "time") {
                    var _159 = _153.getTimezoneOffset();
                    var _15a = Math.abs(_159);
                    time += (_159 > 0 ? "-" : "+") + _155(Math.floor(_15a / 60)) + ":" + _155(_15a % 60);
                }
            }
            _156.push(time);
        }
        return _156.join("T");
    };
}
if (!dojo._hasResource["dojo.parser"]) {
    dojo._hasResource["dojo.parser"] = true;
    dojo.provide("dojo.parser");
    new Date("X");
    dojo.parser = new function() {
        var d = dojo;

        function _15b(_15c) {
            if (d.isString(_15c)) {
                return "string";
            }
            if (typeof _15c == "number") {
                return "number";
            }
            if (typeof _15c == "boolean") {
                return "boolean";
            }
            if (d.isFunction(_15c)) {
                return "function";
            }
            if (d.isArray(_15c)) {
                return "array";
            }
            if (_15c instanceof Date) {
                return "date";
            }
            if (_15c instanceof d._Url) {
                return "url";
            }
            return "object";
        };

        function _15d(_15e, type) {
            switch (type) {
                case "string":
                    return _15e;
                case "number":
                    return _15e.length ? Number(_15e) : NaN;
                case "boolean":
                    return typeof _15e == "boolean" ? _15e : !(_15e.toLowerCase() == "false");
                case "function":
                    if (d.isFunction(_15e)) {
                        _15e = _15e.toString();
                        _15e = d.trim(_15e.substring(_15e.indexOf("{") + 1, _15e.length - 1));
                    }
                    try {
                        if (_15e === "" || _15e.search(/[^\w\.]+/i) != -1) {
                            return new Function(_15e);
                        } else {
                            return d.getObject(_15e, false) || new Function(_15e);
                        }
                    } catch (e) {
                        return new Function();
                    }
                case "array":
                    return _15e ? _15e.split(/\s*,\s*/) : [];
                case "date":
                    switch (_15e) {
                        case "":
                            return new Date("");
                        case "now":
                            return new Date();
                        default:
                            return d.date.stamp.fromISOString(_15e);
                    }
                case "url":
                    return d.baseUrl + _15e;
                default:
                    return d.fromJson(_15e);
            }
        };
        var _15f = {},
            _160 = {};
        d.connect(d, "extend", function() {
            _160 = {};
        });

        function _161(cls, _162) {
            for (var name in cls) {
                if (name.charAt(0) == "_") {
                    continue;
                }
                if (name in _15f) {
                    continue;
                }
                _162[name] = _15b(cls[name]);
            }
            return _162;
        };

        function _163(_164, _165) {
            var c = _160[_164];
            if (!c) {
                var cls = d.getObject(_164),
                    _166 = null;
                if (!cls) {
                    return null;
                }
                if (!_165) {
                    _166 = _161(cls.prototype, {});
                }
                c = {
                    cls: cls,
                    params: _166
                };
            } else {
                if (!_165 && !c.params) {
                    c.params = _161(c.cls.prototype, {});
                }
            }
            return c;
        };
        this._functionFromScript = function(_167, _168) {
            var _169 = "";
            var _16a = "";
            var _16b = (_167.getAttribute(_168 + "args") || _167.getAttribute("args"));
            if (_16b) {
                d.forEach(_16b.split(/\s*,\s*/), function(part, idx) {
                    _169 += "var " + part + " = arguments[" + idx + "]; ";
                });
            }
            var _16c = _167.getAttribute("with");
            if (_16c && _16c.length) {
                d.forEach(_16c.split(/\s*,\s*/), function(part) {
                    _169 += "with(" + part + "){";
                    _16a += "}";
                });
            }
            return new Function(_169 + _167.innerHTML + _16a);
        };
        this.instantiate = function(_16d, _16e, args) {
            var _16f = [],
                _16e = _16e || {};
            args = args || {};
            var _170 = (args.scope || d._scopeName) + "Type",
                _171 = "data-" + (args.scope || d._scopeName) + "-";
            d.forEach(_16d, function(obj) {
                if (!obj) {
                    return;
                }
                var node, type, _172, _173, _174, _175;
                if (obj.node) {
                    node = obj.node;
                    type = obj.type;
                    _175 = obj.fastpath;
                    _172 = obj.clsInfo || (type && _163(type, _175));
                    _173 = _172 && _172.cls;
                    _174 = obj.scripts;
                } else {
                    node = obj;
                    type = _170 in _16e ? _16e[_170] : node.getAttribute(_170);
                    _172 = type && _163(type);
                    _173 = _172 && _172.cls;
                    _174 = (_173 && (_173._noScript || _173.prototype._noScript) ? [] : d.query("> script[type^='dojo/']", node));
                }
                if (!_172) {
                    throw new Error("Could not load class '" + type);
                }
                var _176 = {};
                if (args.defaults) {
                    d._mixin(_176, args.defaults);
                }
                if (obj.inherited) {
                    d._mixin(_176, obj.inherited);
                }
                if (_175) {
                    var _177 = node.getAttribute(_171 + "props");
                    if (_177 && _177.length) {
                        try {
                            _177 = d.fromJson.call(args.propsThis, "{" + _177 + "}");
                            d._mixin(_176, _177);
                        } catch (e) {
                            throw new Error(e.toString() + " in data-dojo-props='" + _177 + "'");
                        }
                    }
                    var _178 = node.getAttribute(_171 + "attach-point");
                    if (_178) {
                        _176.dojoAttachPoint = _178;
                    }
                    var _179 = node.getAttribute(_171 + "attach-event");
                    if (_179) {
                        _176.dojoAttachEvent = _179;
                    }
                    dojo.mixin(_176, _16e);
                } else {
                    var _17a = node.attributes;
                    for (var name in _172.params) {
                        var item = name in _16e ? {
                            value: _16e[name],
                            specified: true
                        } : _17a.getNamedItem(name);
                        if (!item || (!item.specified && (!dojo.isIE || name.toLowerCase() != "value"))) {
                            continue;
                        }
                        var _17b = item.value;
                        switch (name) {
                            case "class":
                                _17b = "className" in _16e ? _16e.className : node.className;
                                break;
                            case "style":
                                _17b = "style" in _16e ? _16e.style : (node.style && node.style.cssText);
                        }
                        var _17c = _172.params[name];
                        if (typeof _17b == "string") {
                            _176[name] = _15d(_17b, _17c);
                        } else {
                            _176[name] = _17b;
                        }
                    }
                }
                var _17d = [],
                    _17e = [];
                d.forEach(_174, function(_17f) {
                    node.removeChild(_17f);
                    var _180 = (_17f.getAttribute(_171 + "event") || _17f.getAttribute("event")),
                        type = _17f.getAttribute("type"),
                        nf = d.parser._functionFromScript(_17f, _171);
                    if (_180) {
                        if (type == "dojo/connect") {
                            _17d.push({
                                event: _180,
                                func: nf
                            });
                        } else {
                            _176[_180] = nf;
                        }
                    } else {
                        _17e.push(nf);
                    }
                });
                var _181 = _173.markupFactory || _173.prototype && _173.prototype.markupFactory;
                var _182 = _181 ? _181(_176, node, _173) : new _173(_176, node);
                _16f.push(_182);
                var _183 = (node.getAttribute(_171 + "id") || node.getAttribute("jsId"));
                if (_183) {
                    d.setObject(_183, _182);
                }
                d.forEach(_17d, function(_184) {
                    d.connect(_182, _184.event, null, _184.func);
                });
                d.forEach(_17e, function(func) {
                    func.call(_182);
                });
            });
            if (!_16e._started) {
                d.forEach(_16f, function(_185) {
                    if (!args.noStart && _185 && dojo.isFunction(_185.startup) && !_185._started && (!_185.getParent || !_185.getParent())) {
                        _185.startup();
                    }
                });
            }
            return _16f;
        };
        this.parse = function(_186, args) {
            var root;
            if (!args && _186 && _186.rootNode) {
                args = _186;
                root = args.rootNode;
            } else {
                root = _186;
            }
            root = root ? dojo.byId(root) : dojo.body();
            args = args || {};
            var _187 = (args.scope || d._scopeName) + "Type",
                _188 = "data-" + (args.scope || d._scopeName) + "-";

            function scan(_189, list) {
                var _18a = dojo.clone(_189.inherited);
                dojo.forEach(["dir", "lang"], function(name) {
                    var val = _189.node.getAttribute(name);
                    if (val) {
                        _18a[name] = val;
                    }
                });
                var _18b = _189.clsInfo && !_189.clsInfo.cls.prototype._noScript ? _189.scripts : null;
                var _18c = (!_189.clsInfo || !_189.clsInfo.cls.prototype.stopParser) || (args && args.template);
                for (var _18d = _189.node.firstChild; _18d; _18d = _18d.nextSibling) {
                    if (_18d.nodeType == 1) {
                        var type, _18e = _18c && _18d.getAttribute(_188 + "type");
                        if (_18e) {
                            type = _18e;
                        } else {
                            type = _18c && _18d.getAttribute(_187);
                        }
                        var _18f = _18e == type;
                        if (type) {
                            var _190 = {
                                "type": type,
                                fastpath: _18f,
                                clsInfo: _163(type, _18f),
                                node: _18d,
                                scripts: [],
                                inherited: _18a
                            };
                            list.push(_190);
                            scan(_190, list);
                        } else {
                            if (_18b && _18d.nodeName.toLowerCase() == "script") {
                                type = _18d.getAttribute("type");
                                if (type && /^dojo\/\w/i.test(type)) {
                                    _18b.push(_18d);
                                }
                            } else {
                                if (_18c) {
                                    scan({
                                        node: _18d,
                                        inherited: _18a
                                    }, list);
                                }
                            }
                        }
                    }
                }
            };
            var _191 = {};
            if (args && args.inherited) {
                for (var key in args.inherited) {
                    if (args.inherited[key]) {
                        _191[key] = args.inherited[key];
                    }
                }
            }
            var list = [];
            scan({
                node: root,
                inherited: _191
            }, list);
            var _192 = args && args.template ? {
                template: true
            } : null;
            return this.instantiate(list, _192, args);
        };
    }();
    (function() {
        var _193 = function() {
            if (dojo.config.parseOnLoad) {
                dojo.parser.parse();
            }
        };
        if (dojo.getObject("dijit.wai.onload") === dojo._loaders[0]) {
            dojo._loaders.splice(1, 0, _193);
        } else {
            dojo._loaders.unshift(_193);
        }
    })();
}
if (!dojo._hasResource["dojo.cache"]) {
    dojo._hasResource["dojo.cache"] = true;
    dojo.provide("dojo.cache");
    var cache = {};
    dojo.cache = function(_194, url, _195) {
        if (typeof _194 == "string") {
            var _196 = dojo.moduleUrl(_194, url);
        } else {
            _196 = _194;
            _195 = url;
        }
        var key = _196.toString();
        var val = _195;
        if (_195 != undefined && !dojo.isString(_195)) {
            val = ("value" in _195 ? _195.value : undefined);
        }
        var _197 = _195 && _195.sanitize ? true : false;
        if (typeof val == "string") {
            val = cache[key] = _197 ? dojo.cache._sanitize(val) : val;
        } else {
            if (val === null) {
                delete cache[key];
            } else {
                if (!(key in cache)) {
                    val = dojo._getText(key);
                    cache[key] = _197 ? dojo.cache._sanitize(val) : val;
                }
                val = cache[key];
            }
        }
        return val;
    };
    dojo.cache._sanitize = function(val) {
        if (val) {
            val = val.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, "");
            var _198 = val.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
            if (_198) {
                val = _198[1];
            }
        } else {
            val = "";
        }
        return val;
    };
}
if (!dojo._hasResource["dijit._Templated"]) {
    dojo._hasResource["dijit._Templated"] = true;
    dojo.provide("dijit._Templated");
    dojo.declare("dijit._Templated", null, {
        templateString: null,
        templatePath: null,
        widgetsInTemplate: false,
        _skipNodeCache: false,
        _earlyTemplatedStartup: false,
        constructor: function() {
            this._attachPoints = [];
            this._attachEvents = [];
        },
        _stringRepl: function(tmpl) {
            var _199 = this.declaredClass,
                _19a = this;
            return dojo.string.substitute(tmpl, this, function(_19b, key) {
                if (key.charAt(0) == "!") {
                    _19b = dojo.getObject(key.substr(1), false, _19a);
                }
                if (typeof _19b == "undefined") {
                    throw new Error(_199 + " template:" + key);
                }
                if (_19b == null) {
                    return "";
                }
                return key.charAt(0) == "!" ? _19b : _19b.toString().replace(/"/g, "&quot;");
            }, this);
        },
        buildRendering: function() {
            var _19c = dijit._Templated.getCachedTemplate(this.templatePath, this.templateString, this._skipNodeCache);
            var node;
            if (dojo.isString(_19c)) {
                node = dojo._toDom(this._stringRepl(_19c));
                if (node.nodeType != 1) {
                    throw new Error("Invalid template: " + _19c);
                }
            } else {
                node = _19c.cloneNode(true);
            }
            this.domNode = node;
            this.inherited(arguments);
            this._attachTemplateNodes(node);
            if (this.widgetsInTemplate) {
                var cw = (this._startupWidgets = dojo.parser.parse(node, {
                    noStart: !this._earlyTemplatedStartup,
                    template: true,
                    inherited: {
                        dir: this.dir,
                        lang: this.lang
                    },
                    propsThis: this,
                    scope: "dojo"
                }));
                this._supportingWidgets = dijit.findWidgets(node);
                this._attachTemplateNodes(cw, function(n, p) {
                    return n[p];
                });
            }
            this._fillContent(this.srcNodeRef);
        },
        _fillContent: function(_19d) {
            var dest = this.containerNode;
            if (_19d && dest) {
                while (_19d.hasChildNodes()) {
                    dest.appendChild(_19d.firstChild);
                }
            }
        },
        _attachTemplateNodes: function(_19e, _19f) {
            _19f = _19f || function(n, p) {
                return n.getAttribute(p);
            };
            var _1a0 = dojo.isArray(_19e) ? _19e : (_19e.all || _19e.getElementsByTagName("*"));
            var x = dojo.isArray(_19e) ? 0 : -1;
            for (; x < _1a0.length; x++) {
                var _1a1 = (x == -1) ? _19e : _1a0[x];
                if (this.widgetsInTemplate && (_19f(_1a1, "dojoType") || _19f(_1a1, "data-dojo-type"))) {
                    continue;
                }
                var _1a2 = _19f(_1a1, "dojoAttachPoint") || _19f(_1a1, "data-dojo-attach-point");
                if (_1a2) {
                    var _1a3, _1a4 = _1a2.split(/\s*,\s*/);
                    while ((_1a3 = _1a4.shift())) {
                        if (dojo.isArray(this[_1a3])) {
                            this[_1a3].push(_1a1);
                        } else {
                            this[_1a3] = _1a1;
                        }
                        this._attachPoints.push(_1a3);
                    }
                }
                var _1a5 = _19f(_1a1, "dojoAttachEvent") || _19f(_1a1, "data-dojo-attach-event");
                if (_1a5) {
                    var _1a6, _1a7 = _1a5.split(/\s*,\s*/);
                    var trim = dojo.trim;
                    while ((_1a6 = _1a7.shift())) {
                        if (_1a6) {
                            var _1a8 = null;
                            if (_1a6.indexOf(":") != -1) {
                                var _1a9 = _1a6.split(":");
                                _1a6 = trim(_1a9[0]);
                                _1a8 = trim(_1a9[1]);
                            } else {
                                _1a6 = trim(_1a6);
                            }
                            if (!_1a8) {
                                _1a8 = _1a6;
                            }
                            this._attachEvents.push(this.connect(_1a1, _1a6, _1a8));
                        }
                    }
                }
                var role = _19f(_1a1, "waiRole");
                if (role) {
                    dijit.setWaiRole(_1a1, role);
                }
                var _1aa = _19f(_1a1, "waiState");
                if (_1aa) {
                    dojo.forEach(_1aa.split(/\s*,\s*/), function(_1ab) {
                        if (_1ab.indexOf("-") != -1) {
                            var pair = _1ab.split("-");
                            dijit.setWaiState(_1a1, pair[0], pair[1]);
                        }
                    });
                }
            }
        },
        startup: function() {
            dojo.forEach(this._startupWidgets, function(w) {
                if (w && !w._started && w.startup) {
                    w.startup();
                }
            });
            this.inherited(arguments);
        },
        destroyRendering: function() {
            dojo.forEach(this._attachPoints, function(_1ac) {
                delete this[_1ac];
            }, this);
            this._attachPoints = [];
            dojo.forEach(this._attachEvents, this.disconnect, this);
            this._attachEvents = [];
            this.inherited(arguments);
        }
    });
    dijit._Templated._templateCache = {};
    dijit._Templated.getCachedTemplate = function(_1ad, _1ae, _1af) {
        var _1b0 = dijit._Templated._templateCache;
        var key = _1ae || _1ad;
        var _1b1 = _1b0[key];
        if (_1b1) {
            try {
                if (!_1b1.ownerDocument || _1b1.ownerDocument == dojo.doc) {
                    return _1b1;
                }
            } catch (e) {}
            dojo.destroy(_1b1);
        }
        if (!_1ae) {
            _1ae = dojo.cache(_1ad, {
                sanitize: true
            });
        }
        _1ae = dojo.string.trim(_1ae);
        if (_1af || _1ae.match(/\$\{([^\}]+)\}/g)) {
            return (_1b0[key] = _1ae);
        } else {
            var node = dojo._toDom(_1ae);
            if (node.nodeType != 1) {
                throw new Error("Invalid template: " + _1ae);
            }
            return (_1b0[key] = node);
        }
    };
    if (dojo.isIE) {
        dojo.addOnWindowUnload(function() {
            var _1b2 = dijit._Templated._templateCache;
            for (var key in _1b2) {
                var _1b3 = _1b2[key];
                if (typeof _1b3 == "object") {
                    dojo.destroy(_1b3);
                }
                delete _1b2[key];
            }
        });
    }
    dojo.extend(dijit._Widget, {
        dojoAttachEvent: "",
        dojoAttachPoint: "",
        waiRole: "",
        waiState: ""
    });
}
if (!dojo._hasResource["dijit._Container"]) {
    dojo._hasResource["dijit._Container"] = true;
    dojo.provide("dijit._Container");
    dojo.declare("dijit._Container", null, {
        isContainer: true,
        buildRendering: function() {
            this.inherited(arguments);
            if (!this.containerNode) {
                this.containerNode = this.domNode;
            }
        },
        addChild: function(_1b4, _1b5) {
            var _1b6 = this.containerNode;
            if (_1b5 && typeof _1b5 == "number") {
                var _1b7 = this.getChildren();
                if (_1b7 && _1b7.length >= _1b5) {
                    _1b6 = _1b7[_1b5 - 1].domNode;
                    _1b5 = "after";
                }
            }
            dojo.place(_1b4.domNode, _1b6, _1b5);
            if (this._started && !_1b4._started) {
                _1b4.startup();
            }
        },
        removeChild: function(_1b8) {
            if (typeof _1b8 == "number") {
                _1b8 = this.getChildren()[_1b8];
            }
            if (_1b8) {
                var node = _1b8.domNode;
                if (node && node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }
        },
        hasChildren: function() {
            return this.getChildren().length > 0;
        },
        destroyDescendants: function(_1b9) {
            dojo.forEach(this.getChildren(), function(_1ba) {
                _1ba.destroyRecursive(_1b9);
            });
        },
        _getSiblingOfChild: function(_1bb, dir) {
            var node = _1bb.domNode,
                _1bc = (dir > 0 ? "nextSibling" : "previousSibling");
            do {
                node = node[_1bc];
            } while (node && (node.nodeType != 1 || !dijit.byNode(node)));
            return node && dijit.byNode(node);
        },
        getIndexOfChild: function(_1bd) {
            return dojo.indexOf(this.getChildren(), _1bd);
        },
        startup: function() {
            if (this._started) {
                return;
            }
            dojo.forEach(this.getChildren(), function(_1be) {
                _1be.startup();
            });
            this.inherited(arguments);
        }
    });
}
if (!dojo._hasResource["dijit._Contained"]) {
    dojo._hasResource["dijit._Contained"] = true;
    dojo.provide("dijit._Contained");
    dojo.declare("dijit._Contained", null, {
        getParent: function() {
            var _1bf = dijit.getEnclosingWidget(this.domNode.parentNode);
            return _1bf && _1bf.isContainer ? _1bf : null;
        },
        _getSibling: function(_1c0) {
            var node = this.domNode;
            do {
                node = node[_1c0 + "Sibling"];
            } while (node && node.nodeType != 1);
            return node && dijit.byNode(node);
        },
        getPreviousSibling: function() {
            return this._getSibling("previous");
        },
        getNextSibling: function() {
            return this._getSibling("next");
        },
        getIndexInParent: function() {
            var p = this.getParent();
            if (!p || !p.getIndexOfChild) {
                return -1;
            }
            return p.getIndexOfChild(this);
        }
    });
}
if (!dojo._hasResource["dojo.NodeList-traverse"]) {
    dojo._hasResource["dojo.NodeList-traverse"] = true;
    dojo.provide("dojo.NodeList-traverse");
    dojo.extend(dojo.NodeList, {
        _buildArrayFromCallback: function(_1c1) {
            var ary = [];
            for (var i = 0; i < this.length; i++) {
                var _1c2 = _1c1.call(this[i], this[i], ary);
                if (_1c2) {
                    ary = ary.concat(_1c2);
                }
            }
            return ary;
        },
        _getUniqueAsNodeList: function(_1c3) {
            var ary = [];
            for (var i = 0, node; node = _1c3[i]; i++) {
                if (node.nodeType == 1 && dojo.indexOf(ary, node) == -1) {
                    ary.push(node);
                }
            }
            return this._wrap(ary, null, this._NodeListCtor);
        },
        _getUniqueNodeListWithParent: function(_1c4, _1c5) {
            var ary = this._getUniqueAsNodeList(_1c4);
            ary = (_1c5 ? dojo._filterQueryResult(ary, _1c5) : ary);
            return ary._stash(this);
        },
        _getRelatedUniqueNodes: function(_1c6, _1c7) {
            return this._getUniqueNodeListWithParent(this._buildArrayFromCallback(_1c7), _1c6);
        },
        children: function(_1c8) {
            return this._getRelatedUniqueNodes(_1c8, function(node, ary) {
                return dojo._toArray(node.childNodes);
            });
        },
        closest: function(_1c9, root) {
            return this._getRelatedUniqueNodes(null, function(node, ary) {
                do {
                    if (dojo._filterQueryResult([node], _1c9, root).length) {
                        return node;
                    }
                } while (node != root && (node = node.parentNode) && node.nodeType == 1);
                return null;
            });
        },
        parent: function(_1ca) {
            return this._getRelatedUniqueNodes(_1ca, function(node, ary) {
                return node.parentNode;
            });
        },
        parents: function(_1cb) {
            return this._getRelatedUniqueNodes(_1cb, function(node, ary) {
                var pary = [];
                while (node.parentNode) {
                    node = node.parentNode;
                    pary.push(node);
                }
                return pary;
            });
        },
        siblings: function(_1cc) {
            return this._getRelatedUniqueNodes(_1cc, function(node, ary) {
                var pary = [];
                var _1cd = (node.parentNode && node.parentNode.childNodes);
                for (var i = 0; i < _1cd.length; i++) {
                    if (_1cd[i] != node) {
                        pary.push(_1cd[i]);
                    }
                }
                return pary;
            });
        },
        next: function(_1ce) {
            return this._getRelatedUniqueNodes(_1ce, function(node, ary) {
                var next = node.nextSibling;
                while (next && next.nodeType != 1) {
                    next = next.nextSibling;
                }
                return next;
            });
        },
        nextAll: function(_1cf) {
            return this._getRelatedUniqueNodes(_1cf, function(node, ary) {
                var pary = [];
                var next = node;
                while ((next = next.nextSibling)) {
                    if (next.nodeType == 1) {
                        pary.push(next);
                    }
                }
                return pary;
            });
        },
        prev: function(_1d0) {
            return this._getRelatedUniqueNodes(_1d0, function(node, ary) {
                var prev = node.previousSibling;
                while (prev && prev.nodeType != 1) {
                    prev = prev.previousSibling;
                }
                return prev;
            });
        },
        prevAll: function(_1d1) {
            return this._getRelatedUniqueNodes(_1d1, function(node, ary) {
                var pary = [];
                var prev = node;
                while ((prev = prev.previousSibling)) {
                    if (prev.nodeType == 1) {
                        pary.push(prev);
                    }
                }
                return pary;
            });
        },
        andSelf: function() {
            return this.concat(this._parent);
        },
        first: function() {
            return this._wrap(((this[0] && [this[0]]) || []), this);
        },
        last: function() {
            return this._wrap((this.length ? [this[this.length - 1]] : []), this);
        },
        even: function() {
            return this.filter(function(item, i) {
                return i % 2 != 0;
            });
        },
        odd: function() {
            return this.filter(function(item, i) {
                return i % 2 == 0;
            });
        }
    });
}
if (!dojo._hasResource["dojo.NodeList-manipulate"]) {
    dojo._hasResource["dojo.NodeList-manipulate"] = true;
    dojo.provide("dojo.NodeList-manipulate");
    (function() {
        function _1d2(node) {
            var text = "",
                ch = node.childNodes;
            for (var i = 0, n; n = ch[i]; i++) {
                if (n.nodeType != 8) {
                    if (n.nodeType == 1) {
                        text += _1d2(n);
                    } else {
                        text += n.nodeValue;
                    }
                }
            }
            return text;
        };

        function _1d3(node) {
            while (node.childNodes[0] && node.childNodes[0].nodeType == 1) {
                node = node.childNodes[0];
            }
            return node;
        };

        function _1d4(html, _1d5) {
            if (typeof html == "string") {
                html = dojo._toDom(html, (_1d5 && _1d5.ownerDocument));
                if (html.nodeType == 11) {
                    html = html.childNodes[0];
                }
            } else {
                if (html.nodeType == 1 && html.parentNode) {
                    html = html.cloneNode(false);
                }
            }
            return html;
        };
        dojo.extend(dojo.NodeList, {
            _placeMultiple: function(_1d6, _1d7) {
                var nl2 = typeof _1d6 == "string" || _1d6.nodeType ? dojo.query(_1d6) : _1d6;
                var _1d8 = [];
                for (var i = 0; i < nl2.length; i++) {
                    var _1d9 = nl2[i];
                    var _1da = this.length;
                    for (var j = _1da - 1, item; item = this[j]; j--) {
                        if (i > 0) {
                            item = this._cloneNode(item);
                            _1d8.unshift(item);
                        }
                        if (j == _1da - 1) {
                            dojo.place(item, _1d9, _1d7);
                        } else {
                            _1d9.parentNode.insertBefore(item, _1d9);
                        }
                        _1d9 = item;
                    }
                }
                if (_1d8.length) {
                    _1d8.unshift(0);
                    _1d8.unshift(this.length - 1);
                    Array.prototype.splice.apply(this, _1d8);
                }
                return this;
            },
            innerHTML: function(_1db) {
                if (arguments.length) {
                    return this.addContent(_1db, "only");
                } else {
                    return this[0].innerHTML;
                }
            },
            text: function(_1dc) {
                if (arguments.length) {
                    for (var i = 0, node; node = this[i]; i++) {
                        if (node.nodeType == 1) {
                            dojo.empty(node);
                            node.appendChild(node.ownerDocument.createTextNode(_1dc));
                        }
                    }
                    return this;
                } else {
                    var _1dd = "";
                    for (i = 0; node = this[i]; i++) {
                        _1dd += _1d2(node);
                    }
                    return _1dd;
                }
            },
            val: function(_1de) {
                if (arguments.length) {
                    var _1df = dojo.isArray(_1de);
                    for (var _1e0 = 0, node; node = this[_1e0]; _1e0++) {
                        var name = node.nodeName.toUpperCase();
                        var type = node.type;
                        var _1e1 = _1df ? _1de[_1e0] : _1de;
                        if (name == "SELECT") {
                            var opts = node.options;
                            for (var i = 0; i < opts.length; i++) {
                                var opt = opts[i];
                                if (node.multiple) {
                                    opt.selected = (dojo.indexOf(_1de, opt.value) != -1);
                                } else {
                                    opt.selected = (opt.value == _1e1);
                                }
                            }
                        } else {
                            if (type == "checkbox" || type == "radio") {
                                node.checked = (node.value == _1e1);
                            } else {
                                node.value = _1e1;
                            }
                        }
                    }
                    return this;
                } else {
                    node = this[0];
                    if (!node || node.nodeType != 1) {
                        return undefined;
                    }
                    _1de = node.value || "";
                    if (node.nodeName.toUpperCase() == "SELECT" && node.multiple) {
                        _1de = [];
                        opts = node.options;
                        for (i = 0; i < opts.length; i++) {
                            opt = opts[i];
                            if (opt.selected) {
                                _1de.push(opt.value);
                            }
                        }
                        if (!_1de.length) {
                            _1de = null;
                        }
                    }
                    return _1de;
                }
            },
            append: function(_1e2) {
                return this.addContent(_1e2, "last");
            },
            appendTo: function(_1e3) {
                return this._placeMultiple(_1e3, "last");
            },
            prepend: function(_1e4) {
                return this.addContent(_1e4, "first");
            },
            prependTo: function(_1e5) {
                return this._placeMultiple(_1e5, "first");
            },
            after: function(_1e6) {
                return this.addContent(_1e6, "after");
            },
            insertAfter: function(_1e7) {
                return this._placeMultiple(_1e7, "after");
            },
            before: function(_1e8) {
                return this.addContent(_1e8, "before");
            },
            insertBefore: function(_1e9) {
                return this._placeMultiple(_1e9, "before");
            },
            remove: dojo.NodeList.prototype.orphan,
            wrap: function(html) {
                if (this[0]) {
                    html = _1d4(html, this[0]);
                    for (var i = 0, node; node = this[i]; i++) {
                        var _1ea = this._cloneNode(html);
                        if (node.parentNode) {
                            node.parentNode.replaceChild(_1ea, node);
                        }
                        var _1eb = _1d3(_1ea);
                        _1eb.appendChild(node);
                    }
                }
                return this;
            },
            wrapAll: function(html) {
                if (this[0]) {
                    html = _1d4(html, this[0]);
                    this[0].parentNode.replaceChild(html, this[0]);
                    var _1ec = _1d3(html);
                    for (var i = 0, node; node = this[i]; i++) {
                        _1ec.appendChild(node);
                    }
                }
                return this;
            },
            wrapInner: function(html) {
                if (this[0]) {
                    html = _1d4(html, this[0]);
                    for (var i = 0; i < this.length; i++) {
                        var _1ed = this._cloneNode(html);
                        this._wrap(dojo._toArray(this[i].childNodes), null, this._NodeListCtor).wrapAll(_1ed);
                    }
                }
                return this;
            },
            replaceWith: function(_1ee) {
                _1ee = this._normalize(_1ee, this[0]);
                for (var i = 0, node; node = this[i]; i++) {
                    this._place(_1ee, node, "before", i > 0);
                    node.parentNode.removeChild(node);
                }
                return this;
            },
            replaceAll: function(_1ef) {
                var nl = dojo.query(_1ef);
                var _1f0 = this._normalize(this, this[0]);
                for (var i = 0, node; node = nl[i]; i++) {
                    this._place(_1f0, node, "before", i > 0);
                    node.parentNode.removeChild(node);
                }
                return this;
            },
            clone: function() {
                var ary = [];
                for (var i = 0; i < this.length; i++) {
                    ary.push(this._cloneNode(this[i]));
                }
                return this._wrap(ary, this, this._NodeListCtor);
            }
        });
        if (!dojo.NodeList.prototype.html) {
            dojo.NodeList.prototype.html = dojo.NodeList.prototype.innerHTML;
        }
    })();
}
if (!dojo._hasResource["ibmweb.string"]) {
    dojo._hasResource["ibmweb.string"] = true;
    dojo.provide("ibmweb.string");
    ibmweb.string.normalizeSpace = function(str) {
        return str.replace(/\s+/g, " ");
    };
    String.prototype.normalizeSpace = function() {
        return ibmweb.string.normalizeSpace(this);
    };
    ibmweb.string.trim = function(str) {
        return str.replace(/^\s+/, "").replace(/\s+$/, "");
    };
    String.prototype.trim = function() {
        return ibmweb.string.trim(this);
    };
    ibmweb.string.htmlspecialchars = function(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;");
    };
    String.prototype.htmlspecialchars = function() {
        return ibmweb.string.htmlspecialchars(this);
    };
    ibmweb.string.StringBuffer = function() {
        this.buffer = [];
    };
    ibmweb.string.StringBuffer.prototype.append = function append(_1f1) {
        this.buffer.push(_1f1);
        return this;
    };
    ibmweb.string.StringBuffer.prototype.toString = function toString(_1f2) {
        if (!this.buffer) {
            return "";
        }
        _1f2 = _1f2 || "";
        return this.buffer.join(_1f2);
    };
}
if (!dojo._hasResource["ibmweb.util"]) {
    dojo._hasResource["ibmweb.util"] = true;
    dojo.provide("ibmweb.util");
    ibmweb.util.__idcount = 0;
    ibmweb.util.generateId = function() {
        var nid;
        do {
            ibmweb.util.__idcount++;
            nid = "gi-" + ibmweb.util.__idcount;
        } while (document.getElementById(nid) != null);
        return nid;
    };
    ibmweb.util.getUrl = function() {
        var url = dojo.query("link[rel=canonical]").attr("href");
        if (url.length != 0) {
            return url[0];
        }
        url = location.href;
        if (url.indexOf("?") != -1) {
            var _1f3 = url.substr(0, url.indexOf("?"));
            var _1f4 = url.substr(url.indexOf("?") + 1).split("&");
            var _1f5 = /^(cm_re|ca|me|met|re|lnk)=/;
            var _1f6 = [];
            for (var i = 0, j = _1f4.length; i < j; i++) {
                if (!_1f5.test(_1f4[i])) {
                    _1f6.push(_1f4[i]);
                }
            }
            if (_1f6.length > 0) {
                url = _1f3 + "?" + _1f6.join("&");
            } else {
                url = _1f3;
            }
        }
        return url;
    };
    ibmweb.util.statsHelper = function(e) {
        if (typeof(ibmStats) !== "undefined" && typeof(ibmStats.event) !== "undefined") {
            if (typeof(ibmweb) !== "undefined" && typeof(ibmweb.eluminate) !== "undefined" && typeof(ibmweb.eluminate.utilstatsHelper) === "function") {
                ibmweb.eluminate.utilstatsHelper(e);
            }
        }
    };
    ibmweb.util.preloadImages = function(_1f7, _1f8) {
        var _1f9 = dojo.create("div", {
            style: {
                position: "absolute",
                top: "-9999px",
                height: "1px",
                overflow: "hidden"
            }
        }, dojo.body());
        var _1fa = 0;
        dojo.forEach(_1f7, function(url) {
            var img = dojo.create("img", {
                src: url
            }, _1f9);
            dojo.connect(img, "onload", function() {
                _1fa += 1;
                if (_1fa == _1f7.length) {
                    if (typeof(_1f8) == "string") {
                        dojo.publish(_1f8);
                    } else {
                        _1f8();
                    }
                }
            });
        });
    };
    ibmweb.util.xhrGetHtml = function(_1fb) {
        if (_1fb.handleAs != "html") {
            return dojo.xhrGet(_1fb);
        }
        _1fb.handleAs = "text";
        var _1fc = _1fb.load;
        _1fb.load = function(_1fd) {
            _1fd = _1fd.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
            var html = dojo.create("div", {
                innerHTML: _1fd
            }, null);
            _1fc(html);
        };
        return dojo.xhrGet(_1fb);
    };
}
if (!dojo._hasResource["ibmweb.queue"]) {
    dojo._hasResource["ibmweb.queue"] = true;
    dojo.provide("ibmweb.queue");
    ibmweb.queue._queue = [];
    ibmweb.queue._timer = null;
    ibmweb.queue._count = 0;
    ibmweb.queue._lock = false;
    ibmweb.queue.push = function(_1fe, _1ff) {
        ibmweb.queue._count++;
        ibmweb.queue._queue.push([ibmweb.queue._count, _1fe, _1ff]);
        ibmweb.queue._work();
        return ibmweb.queue._count;
    };
    ibmweb.queue.unshift = function(_200, _201) {
        ibmweb.queue._count++;
        ibmweb.queue._queue.unshift([ibmweb.queue._count, _200, _201]);
        ibmweb.queue._work();
        return ibmweb.queue._count;
    };
    ibmweb.queue.remove = function(_202) {
        for (var i = 0, j = ibmweb.queue._queue.length; i < j; i++) {
            if (ibmweb.queue._queue[i][0] == _202) {
                ibmweb.queue._queue.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    ibmweb.queue._work = function() {
        if (ibmweb.queue._lock) {
            return;
        }
        if (ibmweb.queue._queue.length == 0) {
            return;
        }
        ibmweb.queue._lock = true;
        for (var i = 0, j = ibmweb.queue._queue.length; i < j; i++) {
            if (ibmweb.queue._queue[i][1]()) {
                ibmweb.queue._queue[i][2]();
                ibmweb.queue._queue.splice(i, 1);
                i--;
                j = ibmweb.queue._queue.length;
            }
        }
        ibmweb.queue._lock = false;
        ibmweb.queue._timer = setTimeout(ibmweb.queue._work, 50);
    };
    ibmweb.queue.waitForElement = function(_203, _204, _205) {
        if (dojo._postLoad && typeof(_205) != "undefined" && _205 == true) {
            _204();
            return;
        }
        var done = false;
        var eid = ibmweb.queue.push(function() {
            return document.getElementById(_203) != null;
        }, function() {
            if (done) {
                return;
            }
            done = true;
            _204();
        });
        if (typeof(_205) != "undefined" && _205 == true) {
            dojo.addOnLoad(function() {
                if (done) {
                    return;
                }
                done = true;
                ibmweb.queue.remove(eid);
                _204();
            });
        }
    };
}
if (!dojo._hasResource["ibmweb.meta"]) {
    dojo._hasResource["ibmweb.meta"] = true;
    dojo.provide("ibmweb.meta");
    ibmweb.meta.isLoaded = false;
    ibmweb.meta._init = function() {
        var tags = dojo.query("head meta").forEach(function(tag, _206, _207) {
            var name = tag.httpEquiv || tag.name;
            name = name.toLowerCase().replace(/[^\w]/g, "_");
            ibmweb.meta[name] = dojo.attr(tag, "content");
        });
        this.wwCase = "";
        this.cc = "";
        this.lc = "";
        if (!!this.ibm_country) {
            this.cc = this.ibm_country.toLowerCase().trim();
            if (this.cc.indexOf(",") > -1) {
                this.cc = this.cc.substring(0, this.cc.indexOf(",")).trim();
            }
            if (this.cc == "gb") {
                this.cc = "uk";
            }
            if (this.cc == "zz") {
                this.cc = "us";
                this.wwCase = "Y";
            }
        }
        if (!!this.dc_language) {
            this.lc = this.dc_language.substring(0, 2).toLowerCase();
        }
        var _208 = document.getElementsByTagName("html")[0].lang;
        if (!!_208) {
            this.lc = this.lc || _208.substring(0, 2).toLowerCase();
            this.cc = this.cc || _208.substring(3, 5).toLowerCase();
        }
        this.lc = this.lc || "en";
        this.cc = this.cc || "us";
        this.cc = dojo.getObject("ibmweb.config.meta.cc") || this.cc;
        this.lc = dojo.getObject("ibmweb.config.meta.lc") || this.lc;
        this.cpi = this.cc + this.lc;
        if (this.cc === "us" && this.lc !== "en") {
            var _209 = {
                pt: "br",
                zh: "cn",
                de: "de",
                es: "es",
                fr: "fr",
                it: "it",
                ja: "jp",
                ko: "kr"
            };
            if (_209[this.lc]) {
                this.cpi = _209[this.lc] + this.lc;
            }
        }
        if (!this.dc_subject) {
            this.dc_subject = "ZZ999";
        }
        if (this.ibm_pageattributes == null) {
            this.ibm_pageattributes = "";
        }
        this.encoding = "utf8";
        this.encodingRaw = "UTF-8";
        if (this.content_type != null) {
            this.encodingRaw = this.content_type.substring(this.content_type.indexOf("=") + 1);
            this.encoding = this.encodingRaw.replace("-", "").replace("_", "").toLowerCase();
        }
        this.title = "";
        var tmp = dojo.query("title");
        if (tmp.length > 0) {
            this.title = tmp[0].innerHTML;
        }
        if (typeof(ibmwebConfigPortalFix) == "undefined") {
            if (!!window.ibmwebConfig && !!window.ibmwebConfig.noDojoLocaleOverride) {
                ibmweb.config.noDojoLocaleOverride = window.ibmwebConfig.noDojoLocaleOverride;
            }
            if (!ibmweb.config.noDojoLocaleOverride) {
                var cc = (this.cc == "uk") ? "gb" : this.cc;
                dojo.locale = dojo.config.locale = this.lc + "-" + cc;
            }
            if (ibmweb.meta._preloads.length > 0 && dojo.locale != "en-us") {
                for (var i = 0, j = ibmweb.meta._preloads.length; i < j; i++) {
                    ibmweb.meta._preloadHack(ibmweb.meta._preloads[i], ibmweb.meta._preloadLocales);
                }
            }
        }
        ibmweb.meta.isLoaded = true;
    };
    if (typeof(ibmwebConfigPortalFix) == "undefined") {
        ibmweb.meta._preloads = [];
        if (dojo._hasResource["dojo.i18n"]) {
            ibmweb.meta._preloadHack = dojo.i18n._preloadLocalizations;
            dojo.i18n._preloadLocalizations = function(_20a, _20b) {
                ibmweb.meta._preloads.push(_20a);
                ibmweb.meta._preloadLocales = _20b;
                ibmweb.meta._preloadHack.apply(dojo.i18n, arguments);
            };
        }
    }
    ibmweb.queue.waitForElement("ibm-top", function() {
        ibmweb.meta._init();
    }, true);
}
if (!dojo._hasResource["ibmweb.info"]) {
    dojo._hasResource["ibmweb.info"] = true;
    dojo.provide("ibmweb.info");
    ibmweb.info.isLoaded = false;
    ibmweb.info._init = function() {
        this.v11 = this.v14 = this.v15 = this.v16 = this.v17 = this.www = this.w3 = false;
        dojo.query("link[rel^=\"style\"]").forEach(function(node) {
            if (node.href.indexOf("/common/v17/") != -1 || node.href.indexOf("/common/v17e/") != -1 || node.href.indexOf("/resources/ecm/") != -1) {
                ibmweb.info.v17 = true;
            } else {
                if (node.href.indexOf("/common/v16/css/screen") != -1) {
                    ibmweb.info.v16 = true;
                } else {
                    if (node.href.indexOf("/common/v15/") != -1) {
                        ibmweb.info.v15 = true;
                    } else {
                        if (node.href.indexOf("/common/v14/") != -1) {
                            ibmweb.info.v14 = true;
                        } else {
                            if (node.href.indexOf("/data/css/v11/") != -1) {
                                ibmweb.info.v11 = true;
                            }
                        }
                    }
                }
            }
        });
        if (ibmweb.info.v16 && ibmweb.info.v17) {
            ibmweb.info.v17 = false;
        }
        if (ibmweb.config.config == "www") {
            this.www = true;
        }
        if (ibmweb.config.config == "w3") {
            this.w3 = true;
        }
        var m = "msie",
            ua = navigator.userAgent.toLowerCase(),
            v = 0;
        var mi = ua.indexOf(m);
        if (ua.indexOf("opera") == -1 && mi != -1) {
            this.isIE = true;
            v = parseFloat(ua.substring(mi + m.length).replace(/^[^0-9]+/, ""));
        } else {
            this.isIE = false;
        }
        this.ieVersion = isNaN(v) ? 0 : v;
        var ts = [];
        this.isGecko = ua.indexOf("gecko") != -1 && ua.indexOf("khtml") == -1;
        this.geckoVersion = 0;
        if (this.isGecko) {
            ts = ua.split("rv:");
            if (ts.length > 1) {
                v = parseFloat(ts[1]);
            }
            this.geckoVersion = isNaN(v) ? 0 : v;
        }
        var str = "opera";
        var si = ua.indexOf(str);
        if (si == -1) {
            this.isOldOpera = false;
        } else {
            var ver = parseFloat(ua.substring(si + str.length));
            if (ver < 9) {
                this.isOldOpera = true;
            } else {
                this.isOldOpera = false;
            }
            this.OperaVersion = parseFloat(ua.substring(ua.indexOf("version") + 8));
        }
        this.isLinux = (navigator.userAgent.indexOf("Linux") > -1);
        this.isDOM = (!!document.createElement && !!document.createTextNode && !!document.getElementById && !!document.getElementsByTagName);
        this.iDevice = /iPad|iPhone|iPod/i.test(navigator.userAgent);
        ibmweb.info.isLoaded = true;
    };
    ibmweb.queue.waitForElement("ibm-top", function() {
        ibmweb.info._init();
    }, true);
}
if (!dojo._hasResource["ibmweb.ibmcodesample"]) {
    dojo._hasResource["ibmweb.ibmcodesample"] = true;
    dojo.provide("ibmweb.ibmcodesample");
    ibmweb.ibmcodesample._init = function() {
        var _20c = [
            [/<br[\s|\W]*\/?>/gi, "<br />"],
            [/<(?!br \/)/gi, "&lt;"],
            [/&lt;(\/?)(\w*)/gi, function() {
                var _20d = (arguments[1] == "") ? "" : "/",
                    _20e = arguments[2].toLowerCase(),
                    _20f = (_20e == "hr") ? "/" : "";
                return "&lt;" + _20d + _20e + _20f;
            }],
            [/&(?!amp;|nbsp;|lt;|gt;)/gi, "&amp;"],
            [/(&lt;select[^&>]*(&gt;|>)|&lt;\/option[^&>]*(&gt;|>))/gi, function() {
                if (!dojo.isIE) {
                    return arguments[0];
                }
                return arguments[0] + "<br />";
            }],
            [/\n\s*|\r\s*/gi, "<br />"],
            [/<br \/><br \/>/gi, "<br />"]
        ];
        dojo.query(".ibm-alternate-code-sample pre, .ibm-alternate-code-sample code, .ibm-code-sample pre, .ibm-code-sample code").forEach(function(_210) {
            var _211 = _210.innerHTML;
            dojo.forEach(_20c, function(_212) {
                _211 = _211.replace(_212[0], _212[1]);
            });
            _210.innerHTML = _211;
        });
    };
    ibmweb.queue.waitForElement("ibm-top", function() {
        ibmweb.ibmcodesample._init();
    }, true);
}
if (!dojo._hasResource["ibmweb.callback"]) {
    dojo._hasResource["ibmweb.callback"] = true;
    dojo.provide("ibmweb.callback");
    ibmweb.callback.__callbacks = {};
    ibmweb.callback.register = function(_213, _214) {
        dojo.subscribe("/ibmweb/callback/" + _213, _214);
    };
    ibmweb.callback.call = function(_215, data) {
        dojo.publish("/ibmweb/callback/" + _215, data);
    };
    ibmweb.callback.createJSONPWrapper = function() {
        var _216 = null;
        if (typeof(arguments[0]) == "function") {
            _216 = dojo.partial.apply(dojo.partial, arguments);
        } else {
            _216 = dojo.hitch.apply(dojo.hitch, arguments);
        }
        var _217 = "__tcb" + Math.round(Math.random() * 100000);
        window[_217] = _216;
        dojo.connect(null, _217, function() {
            window[_217] = null;
        });
        return _217;
    };
}
if (!dojo._hasResource["dojo.io.script"]) {
    dojo._hasResource["dojo.io.script"] = true;
    dojo.provide("dojo.io.script");
    dojo.getObject("io", true, dojo);
    (function() {
        var _218 = dojo.isIE ? "onreadystatechange" : "load",
            _219 = /complete|loaded/;
        dojo.io.script = {
            get: function(args) {
                var dfd = this._makeScriptDeferred(args);
                var _21a = dfd.ioArgs;
                dojo._ioAddQueryToUrl(_21a);
                dojo._ioNotifyStart(dfd);
                if (this._canAttach(_21a)) {
                    var node = this.attach(_21a.id, _21a.url, args.frameDoc);
                    if (!_21a.jsonp && !_21a.args.checkString) {
                        var _21b = dojo.connect(node, _218, function(evt) {
                            if (evt.type == "load" || _219.test(node.readyState)) {
                                dojo.disconnect(_21b);
                                _21a.scriptLoaded = evt;
                            }
                        });
                    }
                }
                dojo._ioWatch(dfd, this._validCheck, this._ioCheck, this._resHandle);
                return dfd;
            },
            attach: function(id, url, _21c) {
                var doc = (_21c || dojo.doc);
                var _21d = doc.createElement("script");
                _21d.type = "text/javascript";
                _21d.src = url;
                _21d.id = id;
                _21d.charset = "utf-8";
                return doc.getElementsByTagName("head")[0].appendChild(_21d);
            },
            remove: function(id, _21e) {
                dojo.destroy(dojo.byId(id, _21e));
                if (this["jsonp_" + id]) {
                    delete this["jsonp_" + id];
                }
            },
            _makeScriptDeferred: function(args) {
                var dfd = dojo._ioSetArgs(args, this._deferredCancel, this._deferredOk, this._deferredError);
                var _21f = dfd.ioArgs;
                _21f.id = dojo._scopeName + "IoScript" + (this._counter++);
                _21f.canDelete = false;
                _21f.jsonp = args.callbackParamName || args.jsonp;
                if (_21f.jsonp) {
                    _21f.query = _21f.query || "";
                    if (_21f.query.length > 0) {
                        _21f.query += "&";
                    }
                    _21f.query += _21f.jsonp + "=" + (args.frameDoc ? "parent." : "") + dojo._scopeName + ".io.script.jsonp_" + _21f.id + "._jsonpCallback";
                    _21f.frameDoc = args.frameDoc;
                    _21f.canDelete = true;
                    dfd._jsonpCallback = this._jsonpCallback;
                    this["jsonp_" + _21f.id] = dfd;
                }
                return dfd;
            },
            _deferredCancel: function(dfd) {
                dfd.canceled = true;
                if (dfd.ioArgs.canDelete) {
                    dojo.io.script._addDeadScript(dfd.ioArgs);
                }
            },
            _deferredOk: function(dfd) {
                var _220 = dfd.ioArgs;
                if (_220.canDelete) {
                    dojo.io.script._addDeadScript(_220);
                }
                return _220.json || _220.scriptLoaded || _220;
            },
            _deferredError: function(_221, dfd) {
                if (dfd.ioArgs.canDelete) {
                    if (_221.dojoType == "timeout") {
                        dojo.io.script.remove(dfd.ioArgs.id, dfd.ioArgs.frameDoc);
                    } else {
                        dojo.io.script._addDeadScript(dfd.ioArgs);
                    }
                }
                return _221;
            },
            _deadScripts: [],
            _counter: 1,
            _addDeadScript: function(_222) {
                dojo.io.script._deadScripts.push({
                    id: _222.id,
                    frameDoc: _222.frameDoc
                });
                _222.frameDoc = null;
            },
            _validCheck: function(dfd) {
                var _223 = dojo.io.script;
                var _224 = _223._deadScripts;
                if (_224 && _224.length > 0) {
                    for (var i = 0; i < _224.length; i++) {
                        _223.remove(_224[i].id, _224[i].frameDoc);
                        _224[i].frameDoc = null;
                    }
                    dojo.io.script._deadScripts = [];
                }
                return true;
            },
            _ioCheck: function(dfd) {
                var _225 = dfd.ioArgs;
                if (_225.json || (_225.scriptLoaded && !_225.args.checkString)) {
                    return true;
                }
                var _226 = _225.args.checkString;
                if (_226 && eval("typeof(" + _226 + ") != 'undefined'")) {
                    return true;
                }
                return false;
            },
            _resHandle: function(dfd) {
                if (dojo.io.script._ioCheck(dfd)) {
                    dfd.callback(dfd);
                } else {
                    dfd.errback(new Error("inconceivable dojo.io.script._resHandle error"));
                }
            },
            _canAttach: function(_227) {
                return true;
            },
            _jsonpCallback: function(json) {
                this.ioArgs.json = json;
            }
        };
    })();
}
if (!dojo._hasResource["ibmweb.data"]) {
    dojo._hasResource["ibmweb.data"] = true;
    dojo.provide("ibmweb.data");
    ibmweb.data.settings = {
        "url": "//www.ibm.com/common/translations/{TOKEN}/{CC}/{LC}/{ENC}.js",
        "cc": null,
        "lc": null,
        "enc": null
    };
    ibmweb.data.require = function(_228, _229, _22a) {
        if (!_228) {
            return;
        }
        if (!dojo.isArray(_228)) {
            _228 = [_228];
        }
        var _22b = true;
        for (var i = 0, j = _228.length; i < j; i++) {
            _22b = _22b && ibmweb.data.exists(_228[i]);
        }
        if (!_22b) {
            var _22c = dojo.mixin(_22c, ibmweb.data.settings, _22a);
            ibmweb.queue.push(function() {
                return ibmweb.meta.isLoaded;
            }, function() {
                var _22d = function(_22e) {
                    var url = _22c.url.replace("{CC}", _22c.cc ? _22c.cc : ibmweb.meta.cc).replace("{LC}", _22c.lc ? _22c.lc : ibmweb.meta.lc).replace("{TOKEN}", _22e).replace("{ENC}", _22c.enc ? _22c.enc : ibmweb.meta.encoding);
                    dojo.io.script.attach(null, url, null);
                };
                for (var i = 0, j = _228.length; i < j; i++) {
                    if (!ibmweb.data.exists(_228[i])) {
                        _22d(_228[i]);
                    }
                }
                ibmweb.queue.push(function() {
                    var _22f = true;
                    for (var i = 0, j = _228.length; i < j; i++) {
                        _22f = _22f && ibmweb.data.exists(_228[i]);
                    }
                    return _22f;
                }, function() {
                    if (typeof(_229) == "function") {
                        _229(ibmweb.data);
                    }
                });
            });
        } else {
            if (typeof(_229) == "function") {
                _229(ibmweb.data);
            }
        }
    };
    ibmweb.data.provide = function(_230, _231) {
        ibmweb.data[_230] = _231;
    };
    ibmweb.data.exists = function(_232) {
        return !!ibmweb.data[_232];
    };
}
if (!dojo._hasResource["dojo.fx.Toggler"]) {
    dojo._hasResource["dojo.fx.Toggler"] = true;
    dojo.provide("dojo.fx.Toggler");
    dojo.declare("dojo.fx.Toggler", null, {
        node: null,
        showFunc: dojo.fadeIn,
        hideFunc: dojo.fadeOut,
        showDuration: 200,
        hideDuration: 200,
        constructor: function(args) {
            var _233 = this;
            dojo.mixin(_233, args);
            _233.node = args.node;
            _233._showArgs = dojo.mixin({}, args);
            _233._showArgs.node = _233.node;
            _233._showArgs.duration = _233.showDuration;
            _233.showAnim = _233.showFunc(_233._showArgs);
            _233._hideArgs = dojo.mixin({}, args);
            _233._hideArgs.node = _233.node;
            _233._hideArgs.duration = _233.hideDuration;
            _233.hideAnim = _233.hideFunc(_233._hideArgs);
            dojo.connect(_233.showAnim, "beforeBegin", dojo.hitch(_233.hideAnim, "stop", true));
            dojo.connect(_233.hideAnim, "beforeBegin", dojo.hitch(_233.showAnim, "stop", true));
        },
        show: function(_234) {
            return this.showAnim.play(_234 || 0);
        },
        hide: function(_235) {
            return this.hideAnim.play(_235 || 0);
        }
    });
}
if (!dojo._hasResource["dojo.fx"]) {
    dojo._hasResource["dojo.fx"] = true;
    dojo.provide("dojo.fx");
    (function() {
        var d = dojo,
            _236 = {
                _fire: function(evt, args) {
                    if (this[evt]) {
                        this[evt].apply(this, args || []);
                    }
                    return this;
                }
            };
        var _237 = function(_238) {
            this._index = -1;
            this._animations = _238 || [];
            this._current = this._onAnimateCtx = this._onEndCtx = null;
            this.duration = 0;
            d.forEach(this._animations, function(a) {
                this.duration += a.duration;
                if (a.delay) {
                    this.duration += a.delay;
                }
            }, this);
        };
        d.extend(_237, {
            _onAnimate: function() {
                this._fire("onAnimate", arguments);
            },
            _onEnd: function() {
                d.disconnect(this._onAnimateCtx);
                d.disconnect(this._onEndCtx);
                this._onAnimateCtx = this._onEndCtx = null;
                if (this._index + 1 == this._animations.length) {
                    this._fire("onEnd");
                } else {
                    this._current = this._animations[++this._index];
                    this._onAnimateCtx = d.connect(this._current, "onAnimate", this, "_onAnimate");
                    this._onEndCtx = d.connect(this._current, "onEnd", this, "_onEnd");
                    this._current.play(0, true);
                }
            },
            play: function(_239, _23a) {
                if (!this._current) {
                    this._current = this._animations[this._index = 0];
                }
                if (!_23a && this._current.status() == "playing") {
                    return this;
                }
                var _23b = d.connect(this._current, "beforeBegin", this, function() {
                        this._fire("beforeBegin");
                    }),
                    _23c = d.connect(this._current, "onBegin", this, function(arg) {
                        this._fire("onBegin", arguments);
                    }),
                    _23d = d.connect(this._current, "onPlay", this, function(arg) {
                        this._fire("onPlay", arguments);
                        d.disconnect(_23b);
                        d.disconnect(_23c);
                        d.disconnect(_23d);
                    });
                if (this._onAnimateCtx) {
                    d.disconnect(this._onAnimateCtx);
                }
                this._onAnimateCtx = d.connect(this._current, "onAnimate", this, "_onAnimate");
                if (this._onEndCtx) {
                    d.disconnect(this._onEndCtx);
                }
                this._onEndCtx = d.connect(this._current, "onEnd", this, "_onEnd");
                this._current.play.apply(this._current, arguments);
                return this;
            },
            pause: function() {
                if (this._current) {
                    var e = d.connect(this._current, "onPause", this, function(arg) {
                        this._fire("onPause", arguments);
                        d.disconnect(e);
                    });
                    this._current.pause();
                }
                return this;
            },
            gotoPercent: function(_23e, _23f) {
                this.pause();
                var _240 = this.duration * _23e;
                this._current = null;
                d.some(this._animations, function(a) {
                    if (a.duration <= _240) {
                        this._current = a;
                        return true;
                    }
                    _240 -= a.duration;
                    return false;
                });
                if (this._current) {
                    this._current.gotoPercent(_240 / this._current.duration, _23f);
                }
                return this;
            },
            stop: function(_241) {
                if (this._current) {
                    if (_241) {
                        for (; this._index + 1 < this._animations.length; ++this._index) {
                            this._animations[this._index].stop(true);
                        }
                        this._current = this._animations[this._index];
                    }
                    var e = d.connect(this._current, "onStop", this, function(arg) {
                        this._fire("onStop", arguments);
                        d.disconnect(e);
                    });
                    this._current.stop();
                }
                return this;
            },
            status: function() {
                return this._current ? this._current.status() : "stopped";
            },
            destroy: function() {
                if (this._onAnimateCtx) {
                    d.disconnect(this._onAnimateCtx);
                }
                if (this._onEndCtx) {
                    d.disconnect(this._onEndCtx);
                }
            }
        });
        d.extend(_237, _236);
        dojo.fx.chain = function(_242) {
            return new _237(_242);
        };
        var _243 = function(_244) {
            this._animations = _244 || [];
            this._connects = [];
            this._finished = 0;
            this.duration = 0;
            d.forEach(_244, function(a) {
                var _245 = a.duration;
                if (a.delay) {
                    _245 += a.delay;
                }
                if (this.duration < _245) {
                    this.duration = _245;
                }
                this._connects.push(d.connect(a, "onEnd", this, "_onEnd"));
            }, this);
            this._pseudoAnimation = new d.Animation({
                curve: [0, 1],
                duration: this.duration
            });
            var self = this;
            d.forEach(["beforeBegin", "onBegin", "onPlay", "onAnimate", "onPause", "onStop", "onEnd"], function(evt) {
                self._connects.push(d.connect(self._pseudoAnimation, evt, function() {
                    self._fire(evt, arguments);
                }));
            });
        };
        d.extend(_243, {
            _doAction: function(_246, args) {
                d.forEach(this._animations, function(a) {
                    a[_246].apply(a, args);
                });
                return this;
            },
            _onEnd: function() {
                if (++this._finished > this._animations.length) {
                    this._fire("onEnd");
                }
            },
            _call: function(_247, args) {
                var t = this._pseudoAnimation;
                t[_247].apply(t, args);
            },
            play: function(_248, _249) {
                this._finished = 0;
                this._doAction("play", arguments);
                this._call("play", arguments);
                return this;
            },
            pause: function() {
                this._doAction("pause", arguments);
                this._call("pause", arguments);
                return this;
            },
            gotoPercent: function(_24a, _24b) {
                var ms = this.duration * _24a;
                d.forEach(this._animations, function(a) {
                    a.gotoPercent(a.duration < ms ? 1 : (ms / a.duration), _24b);
                });
                this._call("gotoPercent", arguments);
                return this;
            },
            stop: function(_24c) {
                this._doAction("stop", arguments);
                this._call("stop", arguments);
                return this;
            },
            status: function() {
                return this._pseudoAnimation.status();
            },
            destroy: function() {
                d.forEach(this._connects, dojo.disconnect);
            }
        });
        d.extend(_243, _236);
        dojo.fx.combine = function(_24d) {
            return new _243(_24d);
        };
        dojo.fx.wipeIn = function(args) {
            var node = args.node = d.byId(args.node),
                s = node.style,
                o;
            var anim = d.animateProperty(d.mixin({
                properties: {
                    height: {
                        start: function() {
                            o = s.overflow;
                            s.overflow = "hidden";
                            if (s.visibility == "hidden" || s.display == "none") {
                                s.height = "1px";
                                s.display = "";
                                s.visibility = "";
                                return 1;
                            } else {
                                var _24e = d.style(node, "height");
                                return Math.max(_24e, 1);
                            }
                        },
                        end: function() {
                            return node.scrollHeight;
                        }
                    }
                }
            }, args));
            d.connect(anim, "onEnd", function() {
                s.height = "auto";
                s.overflow = o;
            });
            return anim;
        };
        dojo.fx.wipeOut = function(args) {
            var node = args.node = d.byId(args.node),
                s = node.style,
                o;
            var anim = d.animateProperty(d.mixin({
                properties: {
                    height: {
                        end: 1
                    }
                }
            }, args));
            d.connect(anim, "beforeBegin", function() {
                o = s.overflow;
                s.overflow = "hidden";
                s.display = "";
            });
            d.connect(anim, "onEnd", function() {
                s.overflow = o;
                s.height = "auto";
                s.display = "none";
            });
            return anim;
        };
        dojo.fx.slideTo = function(args) {
            var node = args.node = d.byId(args.node),
                top = null,
                left = null;
            var init = (function(n) {
                return function() {
                    var cs = d.getComputedStyle(n);
                    var pos = cs.position;
                    top = (pos == "absolute" ? n.offsetTop : parseInt(cs.top) || 0);
                    left = (pos == "absolute" ? n.offsetLeft : parseInt(cs.left) || 0);
                    if (pos != "absolute" && pos != "relative") {
                        var ret = d.position(n, true);
                        top = ret.y;
                        left = ret.x;
                        n.style.position = "absolute";
                        n.style.top = top + "px";
                        n.style.left = left + "px";
                    }
                };
            })(node);
            init();
            var anim = d.animateProperty(d.mixin({
                properties: {
                    top: args.top || 0,
                    left: args.left || 0
                }
            }, args));
            d.connect(anim, "beforeBegin", anim, init);
            return anim;
        };
    })();
}
if (!dojo._hasResource["dojo.NodeList-fx"]) {
    dojo._hasResource["dojo.NodeList-fx"] = true;
    dojo.provide("dojo.NodeList-fx");
    dojo.extend(dojo.NodeList, {
        _anim: function(obj, _24f, args) {
            args = args || {};
            var a = dojo.fx.combine(this.map(function(item) {
                var _250 = {
                    node: item
                };
                dojo.mixin(_250, args);
                return obj[_24f](_250);
            }));
            return args.auto ? a.play() && this : a;
        },
        wipeIn: function(args) {
            return this._anim(dojo.fx, "wipeIn", args);
        },
        wipeOut: function(args) {
            return this._anim(dojo.fx, "wipeOut", args);
        },
        slideTo: function(args) {
            return this._anim(dojo.fx, "slideTo", args);
        },
        fadeIn: function(args) {
            return this._anim(dojo, "fadeIn", args);
        },
        fadeOut: function(args) {
            return this._anim(dojo, "fadeOut", args);
        },
        animateProperty: function(args) {
            return this._anim(dojo, "animateProperty", args);
        },
        anim: function(_251, _252, _253, _254, _255) {
            var _256 = dojo.fx.combine(this.map(function(item) {
                return dojo.animateProperty({
                    node: item,
                    properties: _251,
                    duration: _252 || 350,
                    easing: _253
                });
            }));
            if (_254) {
                dojo.connect(_256, "onEnd", _254);
            }
            return _256.play(_255 || 0);
        }
    });
}
if (!dojo._hasResource["ibmweb.twisty"]) {
    dojo._hasResource["ibmweb.twisty"] = true;
    dojo.provide("ibmweb.twisty");
    ibmweb.twisty._duration = 200;
    ibmweb.twisty.cachetimeout = 3600 * 12 * 7;
    ibmweb.twisty.initTwisty = function(ul) {
        var li = dojo.query("> li", ul);
        if (!dojo.hasClass(ul, "ibm-twisty")) {
            return;
        }
        li.forEach(function(node) {
            if (!dojo.hasClass(node, "ibm-active")) {
                ibmweb.twisty.collapseTwisty(node);
            }
            var _257 = dojo.query("> a.ibm-twisty-trigger", node).onclick(ibmweb.twisty.toggleTwisty);
            var _258 = dojo.query("> span.ibm-twisty-head", node).onclick(ibmweb.twisty.toggleTwisty);
        });
    };
    ibmweb.twisty.expandTwisty = function(li) {
        dojo.addClass(li, "ibm-active");
        dojo.query("> a.ibm-twisty-trigger", li).removeClass("ibm-twisty-trigger-closed").query("img").attr("alt", "-");
        dojo.query("> div.ibm-twisty-body", li).style("display", "block");
    };
    ibmweb.twisty.collapseTwisty = function(li) {
        dojo.removeClass(li, "ibm-active");
        dojo.query("> a.ibm-twisty-trigger", li).addClass("ibm-twisty-trigger-closed").query("img").attr("alt", "+");
        dojo.query("> div.ibm-twisty-body", li).style("display", "none");
    };
    ibmweb.twisty.toggleTwisty = function(_259) {
        var li = this.parentNode;
        if (dojo.hasClass(li, "ibm-active")) {
            ibmweb.twisty.collapseTwisty(li);
        } else {
            ibmweb.twisty.expandTwisty(li);
        }
        dojo.stopEvent(_259);
        return false;
    };
    ibmweb.twisty.initSimpleShowHide = function(el) {
        if (!dojo.hasClass(el, "ibm-simple-show-hide")) {
            return;
        }
        var _25a = dojo.query("div.ibm-hideable", el);
        _25a.wipeOut({
            duration: 1
        }).play();
        var _25b = true;
        var _25c = 0;
        var _25d = dojo.query("p.ibm-show-hide-controls", el).style("display", "block");
        if (_25d.length) {
            dojo.place("<div class=\"ibm-rule\"><hr /></div>", _25d[0], "last");
        }
        _25d.query("a").onclick(function(_25e) {
            dojo.query("a", this.parentNode).removeClass("ibm-active");
            dojo.addClass(_25e.target, "ibm-active");
            var href = _25e.target.href;
            if (href.indexOf("#show-hide") != -1) {
                if (_25b) {
                    _25a.wipeIn().play();
                    _25b = false;
                } else {
                    _25a.wipeOut().play();
                    _25b = true;
                    dojo.removeClass(_25e.target, "ibm-active");
                }
            } else {
                if (href.indexOf("#show") != -1) {
                    if (_25c != 1) {
                        _25a.wipeIn().play();
                        _25c = 1;
                    }
                } else {
                    if (href.indexOf("#hide") != -1) {
                        if (_25c != 2) {
                            _25a.wipeOut().play();
                            _25c = 2;
                        }
                    }
                }
            }
            dojo.stopEvent(_25e);
            return false;
        });
        return false;
    };
    ibmweb.twisty.initShowHide = function(el, _25f) {
        if (!dojo.hasClass(el, "ibm-show-hide")) {
            return;
        }
        if (!_25f) {
            _25f = "h2";
        }
        var _260 = dojo.query("> div.ibm-container-body, > div.ibm-columns", el);
        var _261 = dojo.query("> " + _25f, el);
        _261.forEach(function(_262, i) {
            var body = _260[i];
            var a = dojo.query("a", _262);
            a.attr("href", "#show-hide");
            dojo.style(body, "overflow", "hidden");
            var r = 0;
            if (el.id) {
                r = ibmweb.storage.getItem("ibmweb.twisty." + ibmweb.util.getUrl() + "." + el.id);
                if (r !== "h") {
                    r = isNaN(Number(r)) ? 0 : Number(r);
                }
            }
            if (i === r) {
                a.addClass("ibm-show-active");
                if (dojo.hasClass(el, "ibm-alternate")) {
                    a.removeClass("ibm-show-active");
                    dojo.style(body, {
                        "display": "none",
                        "height": "1px"
                    });
                }
            } else {
                a.removeClass("ibm-show-active");
                dojo.style(_262, "border-top", "none");
                dojo.style(body, {
                    "display": "none",
                    "height": "1px"
                });
            }
            a.onclick(function(_263) {
                dojo.stopEvent(_263);
                if (dojo.hasClass(this, "ibm-show-active")) {
                    if (_260.length == 1 || dojo.hasClass(el, "ibm-alternate")) {
                        dojo.removeClass(this, "ibm-show-active");
                        if (dojo.hasClass(el, "ibm-alternate")) {
                            var _264 = dojo.query(this).parent().next();
                            _264.style("overflow", "hidden");
                            _264.anim({
                                height: 1
                            }, ibmweb.twisty._duration, null, function() {
                                _264.style("display", "none");
                                if (el.id) {
                                    ibmweb.storage.setItem("ibmweb.twisty." + ibmweb.util.getUrl() + "." + el.id, "h", ibmweb.twisty.cachetimeout);
                                }
                            });
                        }
                        var _265 = _260[0];
                        _265.style.overflow = "hidden";
                        dojo.anim(_265, {
                            height: 1
                        }, ibmweb.twisty._duration, null, function() {
                            _265.style.display = "none";
                            if (el.id) {
                                ibmweb.storage.setItem("ibmweb.twisty." + ibmweb.util.getUrl() + "." + el.id, "h", ibmweb.twisty.cachetimeout);
                            }
                        });
                    }
                    return false;
                }
                var _266 = this;
                _261.forEach(function(_267, i) {
                    var body = dojo.query(_260[i])[0];
                    var a = dojo.query("a", _267);
                    if (a[0] === _266) {
                        a.addClass("ibm-show-active");
                        dojo.style(body, {
                            "display": "block",
                            "overflow": "visible",
                            "height": "auto"
                        });
                        var _268 = body.clientHeight || body.scrollHeight;
                        dojo.style(body, {
                            "overflow": "hidden",
                            "height": "1px"
                        });
                        dojo.anim(body, {
                            height: _268
                        }, ibmweb.twisty._duration, null, function() {
                            body.style.height = "auto";
                            var _269 = window.document.documentElement.scrollTop || window.document.body.scrollTop;
                            var top = dojo.marginBox(_267).t;
                            var mhh = dojo.position(dojo.byId("ibm-masthead")).h;
                            if (top - mhh < _269) {
                                window.scrollTo(0, dojo.marginBox(_267).t - dojo.position(dojo.byId("ibm-masthead")).h);
                            }
                            if (el.id) {
                                ibmweb.storage.setItem("ibmweb.twisty." + ibmweb.util.getUrl() + "." + el.id, i, ibmweb.twisty.cachetimeout);
                            }
                        });
                    } else {
                        a.removeClass("ibm-show-active");
                        dojo.anim(body, {
                            height: 1
                        }, ibmweb.twisty._duration, null, function() {
                            body.style.display = "none";
                        });
                    }
                });
                return false;
            });
        });
    };
    dojo.addOnLoad(function() {
        if (!ibmweb.info.v17) {
            return;
        }
        dojo.query("div.ibm-simple-show-hide").forEach(function(node) {
            ibmweb.twisty.initSimpleShowHide(node);
        });
        dojo.query("div.ibm-container.ibm-show-hide").forEach(function(node) {
            ibmweb.twisty.initShowHide(node);
        });
        var _26a = false;
        dojo.query("ul.ibm-twisty").forEach(function(node) {
            if (!_26a) {
                (new Image()).src = "//www.ibm.com/i/v16/icons/tw_closed.gif";
                _26a = true;
            }
            ibmweb.twisty.initTwisty(node);
        });
    });
}
if (!dojo._hasResource["ibmweb.overlay"]) {
    dojo._hasResource["ibmweb.overlay"] = true;
    dojo.provide("ibmweb.overlay");
    ibmweb.overlay.show = function(_26b, _26c, _26d) {
        dojo["require"]("dijit.Dialog");
        dojo.addOnLoad(function() {
            var _26e = dijit.byId("dialog_" + _26b);
            if (!_26e) {
                dojo.byId(_26b).style.display = "block";
                _26e = new dijit.Dialog(dojo.mixin({
                    "content": dojo.byId(_26b),
                    "id": "dialog_" + _26b,
                    draggable: !navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/g)
                }, _26d));
                dojo.connect(dijit.byId("dialog_" + _26b), "onHide", function() {
                    ibmweb.overlay.hide(_26b);
                });
            }
            try {
                _26e.show().then(function() {
                    var _26f = dojo.query("#" + _26b + " .ibm-body .ibm-main .ibm-title").children()[0];
                    if (typeof(_26f) != "undefined") {
                        var _270 = dojo.attr(_26f, "id");
                        if (_270 != null) {
                            dojo.removeAttr(dojo.query("#dialog_" + _26b + "_title")[0], "id");
                            dojo.attr(dojo.query("#dialog_" + _26b)[0], "aria-labelledby", _270);
                        } else {
                            dojo.removeAttr(dojo.query("#dialog_" + _26b + "_title")[0], "id");
                            dojo.attr(_26f, "id", "dialog_" + _26b + "_title");
                        }
                    }
                    var _271 = dojo.query("#" + _26b + " .ibm-body .ibm-main .ibm-container .ibm-container-body")[0];
                    if (_271 != undefined) {
                        var _272 = dojo.attr(_271, "id");
                        if (_272 != null) {
                            dojo.attr(dojo.query("#dialog_" + _26b)[0], "aria-describedby", _272);
                        } else {
                            dojo.attr(dojo.query("#dialog_" + _26b)[0], "aria-describedby", "dialog_" + _26b + "_description");
                            dojo.attr(_271, "id", "dialog_" + _26b + "_description");
                        }
                    }
                    var _273 = dojo.query("#dialog_" + _26b + " .dijitDialogCloseIcon")[0];
                    if (_273 != undefined) {
                        dojo.attr(_273, "aria-label", "Close");
                        dojo.attr(_273, "tabindex", "0");
                        _273.focus();
                    }
                });
            } catch (e) {}
            ibmweb.util.statsHelper({
                "ibmEV": "overlay",
                "ibmEvAction": "show",
                "ibmEvGroup": "Opening overlay",
                "ibmEvModule": _26b
            });
        });
    };
    ibmweb.overlay.hide = function(_274) {
        var _275 = dijit.byId("dialog_" + _274);
        ibmweb.util.statsHelper({
            "ibmEV": "overlay",
            "ibmEvAction": "close",
            "ibmEvGroup": "Closing overlay",
            "ibmEvModule": _274
        });
        if (_275.open === true) {
            _275.hide();
        }
        if (dojo.hasClass(dojo.byId(_274), "ibm-rebuild-after-close")) {
            var _276 = dojo.query(".ibm-body", dojo.byId(_274))[0],
                _277 = _276.innerHTML;
            _276.innerHTML = "";
            setTimeout(function() {
                _276.innerHTML = _277;
            }, 0);
        }
    };
    ibmweb.overlay.init = function() {};
}
if (!dojo._hasResource["ibmweb.storage"]) {
    dojo._hasResource["ibmweb.storage"] = true;
    dojo.provide("ibmweb.storage");
    ibmweb.storage = {
        getItem: function(key, _278) {
            if (!_278) {
                var _278 = null;
            }
            if (!this.isSupported()) {
                return null;
            }
            if (localStorage.getItem(key + "_expire") !== null) {
                var _279 = localStorage.getItem(key + "_expire");
                var _27a = new Date();
                var _27a = _27a.getTime();
                if (_279 < _27a) {
                    this.removeItem(key);
                    return _278;
                }
            }
            return localStorage.getItem(key);
        },
        setItem: function(key, _27b, _27c) {
            if (!this.isSupported()) {
                return false;
            }
            this.removeItem(key);
            if (_27c) {
                var time = new Date();
                var _27d = _27c * 1000;
                _27d += time.getTime();
                localStorage.setItem(key + "_expire", _27d);
            }
            localStorage.setItem(key, _27b);
            return localStorage[key];
        },
        removeItem: function(key) {
            if (!this.isSupported()) {
                return false;
            }
            localStorage.removeItem(key);
            localStorage.removeItem(key + "_expire");
        },
        clear: function() {
            if (!this.isSupported()) {
                return false;
            }
            localStorage.clear();
        },
        isSupported: function() {
            try {
                return window.localStorage && typeof(window.localStorage) == "object";
            } catch (e) {
                return false;
            }
        }
    };
}
if (!dojo._hasResource["ibmweb.form"]) {
    dojo._hasResource["ibmweb.form"] = true;
    dojo.provide("ibmweb.form");
    ibmweb.form = {
        _loaded: false,
        _init: function() {
            if (ibmweb.form._loaded) {
                return;
            }
            ibmweb.form._loaded = true;
            dojo["require"]("ibmweb.ibm-form");
        },
        initElement: function(elem) {
            if (elem.nodeName == "SELECT") {
                this.initSelect(elem);
            } else {
                if (elem.nodeName == "INPUT") {
                    if (elem.type.toLowerCase() == "checkbox") {
                        this.initCheckbox(elem);
                    } else {
                        if (elem.type.toLowerCase() == "radio") {
                            this.initRadio(elem);
                        }
                    }
                }
            }
        },
        initRadio: function(elem) {
            var p = {
                srcNodeRef: elem,
                checked: elem.checked,
                disabled: elem.disabled,
                name: elem.name,
                value: elem.value
            };
            if (elem.id) {
                p.id = elem.id;
            }
            if (elem.title) {
                p.title = elem.title;
            }
            new dijit.form.RadioButton(p);
        },
        initSelect: function(elem) {
            if (dojo.hasClass(elem, "ibm-filteringselect")) {
                return;
            }
            var p = {
                srcNodeRef: elem,
                disabled: elem.disabled,
                name: elem.name,
                maxHeight: 200
            };
            if (elem.id) {
                p.id = elem.id;
            }
            if (elem.title) {
                p.title = elem.title;
            }
            if (dojo.version && !(dojo.version.major === 1 && dojo.version.minor < 8)) {
                dojo.query("> option", elem).forEach(function(elem) {
                    if (dojo.attr(elem, "value") === "") {
                        dojo.attr(elem, "value", " ");
                    }
                });
            }
            if (elem.multiple) {
                p.size = elem.size;
                new dijit.form.MultiSelect(p);
            } else {
                new dijit.form.Select(p);
            }
        },
        initCheckbox: function(elem) {
            var p = {
                srcNodeRef: elem,
                checked: elem.checked,
                disabled: elem.disabled,
                name: elem.name,
                value: elem.value
            };
            if (elem.id) {
                p.id = elem.id;
            }
            if (elem.title) {
                p.title = elem.title;
            }
            new dijit.form.CheckBox(p);
        }
    };
    dojo.addOnLoad(function() {
        if (dojo.version.major <= 1 && dojo.version.minor <= 3) {
            return;
        }
        dojo.query("input[disabled], select[disabled], textarea[disabled]").forEach(function(i) {
            if (i.id) {
                var _27e = dojo.query("label[for=\"" + i.id + "\"]");
                if (_27e.length == 1) {
                    dojo.addClass(_27e[0], "ibm-label-disabled");
                }
            }
        });
        var _27f = dojo.query("select.ibm-styled,select.ibm-styled-select, input[type=checkbox].ibm-styled, input[type=radio].ibm-styled, form.ibm-styled-form input[type=radio], form.ibm-styled-form input[type=checkbox], form.ibm-styled-form select");
        if (_27f.length > 0) {
            ibmweb.form._init();
            dojo.addOnLoad(function() {
                for (var i = 0, j = _27f.length; i < j; i++) {
                    ibmweb.form.initElement(_27f[i]);
                }
                dojo.publish("/ibmweb/form/initialized");
            });
        }
        dojo.addOnLoad(function() {
            dojo.query("form.ibm-jump-form").forEach(function(item) {
                dojo.query("input.ibm-btn-go", item).remove();
                var _280 = dojo.query(".dijitSelect", item);
                if (!_280 || _280.length != 1) {
                    return;
                }
                var id = _280[0].id;
                _280 = dijit.byId(id);
                _280.onChange = function(_281) {
                    if (_281) {
                        if (dojo.hasClass(item, "ibm-new-window")) {
                            window.open(_281);
                        } else {
                            location.href = _281;
                        }
                    }
                };
                dojo.style(id, "width", "100%");
            });
        });
        var tmp = dojo.query(".ibm-date-picker");
        if (tmp.length > 0) {
            dojo["require"]("dijit.form.DateTextBox");
            dojo.addOnLoad(function() {
                tmp.forEach(function(elem) {
                    var _282 = {
                            srcNodeRef: elem,
                            disabled: elem.disabled,
                            name: elem.name,
                            id: elem.id,
                            hasDownArrow: false,
                            style: "width: 196px"
                        },
                        lbl;
                    if (elem.name) {
                        lbl = dojo.query("label[for=\"" + elem.name + "\"] span.ibm-date-format");
                        if (lbl.length != 0) {
                            _282.constraints = {
                                datePattern: lbl[0].innerHTML
                            };
                            _282.serialize = function(_283) {
                                return dojo.date.locale.format(_283, {
                                    datePattern: "yyyy-MM-dd",
                                    selector: "date"
                                });
                            };
                        }
                    }
                    if (elem.value) {
                        try {
                            var val = elem.value,
                                _284 = Date.parseString(val);
                            if (lbl.length != 0 && !isNaN(_284) && _284 instanceof Date) {
                                val = dojo.date.locale.format(_284, {
                                    datePattern: lbl[0].innerHTML,
                                    selector: "date"
                                });
                            }
                            _282.value = dojo.date.locale.parse(val, {
                                datePattern: (lbl.length != 0) ? lbl[0].innerHTML : "y-M-d",
                                selector: "date"
                            });
                        } catch (e) {}
                    }
                    var dtb = new dijit.form.DateTextBox(_282);
                });
            });
        }
        dojo.query(".ibm-required").forEach(function(item) {
            var _285 = item.parentNode;
            var _286 = dojo.attr(_285, "for");
            var _287 = dojo.query("input#" + _286)[0];
            if (_287) {
                if (dojo.attr(_287, "type") == "text") {
                    dojo.attr(_287, "aria-required", "true");
                }
                if (dojo.attr(_287, "type") == "checkbox" || dojo.attr(_287, "type") == "radio") {
                    var _288 = _287.parentNode;
                    dojo.query("input", _288).forEach(function(i) {
                        dojo.attr(i, "aria-required", "true");
                    });
                }
            }
        });
    });
    ibmweb.form.initFilterSelect = (function() {
        var $fs = dojo.query("form.ibm-styled-form .ibm-filteringselect");
        if ($fs.length > 0) {
            ibmweb.form._init();
            dojo.ready(function() {
                $fs.forEach(function(elem, _289) {
                    var p = {
                        id: elem.id,
                        srcNodeRef: elem,
                        disabled: elem.disabled,
                        name: elem.name,
                        maxHeight: 200,
                        invalidMessage: "",
                        missingMessage: "",
                        forceWidth: true
                    };
                    var _28a = p.srcNodeRef.parentElement;
                    var _28b = new dijit.form.Select(p);
                    var _28c = dojo.create("input", {
                        type: "text",
                        "class": "searchinput filtering_select_readonly",
                        value: "Select or click to filter"
                    });
                    dojo.connect(_28b, "openDropDown", function() {
                        _28d();
                        var _28e = dojo.query("#" + _28b.id + "_dropdown table tbody")[0];
                        if (dojo.query("#" + _28b.id + "_searchText").length == 0) {
                            var _28f;
                            dojo.connect(_28c, "onkeyup", function(e) {
                                _28f = 1;
                                for (var i = 1; i < _28e.children.length; i++) {
                                    _28e.children[i].style.display = "";
                                    var _290 = RegExp("^" + e.currentTarget.value + "", "i");
                                    match = _28e.children[i].children[1].innerHTML.match(_290);
                                    if (match && match.index === 0) {
                                        _28e.children[i].style.display = "";
                                    } else {
                                        _28e.children[i].style.display = "none";
                                        _28f++;
                                    }
                                }
                                if (_28f == _28e.children.length) {
                                    dojo.addClass(e.currentTarget, "filtering_select_erroricon");
                                } else {
                                    dojo.removeClass(e.currentTarget, "filtering_select_erroricon");
                                }
                                if (e.currentTarget.value.length > 0) {
                                    dojo.query("#" + _28b.id + "_dropdown div.dijitSelectMenu")[0].style.height = "auto";
                                    dojo.query("#" + _28b.id + "_dropdown div.dijitSelectMenu")[0].style.overflowY = "scroll";
                                } else {
                                    _296();
                                }
                            });
                            dojo.connect(_28c, "onfocus", function(e) {
                                _28c.value = "";
                                dojo.removeClass(_28c, "filtering_select_readonly");
                                dojo.addClass(_28c, "filtering_select_typing");
                            });
                            var td1 = dojo.create("td", {
                                id: "test",
                                "class": "dijitReset dijitMenuItemIconCell",
                                role: "presentation"
                            });
                            var td2 = dojo.create("td", {
                                id: _28b.id + "_text",
                                "class": "dijitReset dijitMenuItemLabel, ibm-filter-sel",
                                role: "presentation",
                                dojoattachpoint: "containerNode",
                                innerHTML: "",
                                style: "width:100%; display: block;",
                                colspan: "2"
                            });
                            var td3 = dojo.create("td", {
                                id: _28b.id + "_accel",
                                "class": "dijitReset dijitMenuItemAccelKey",
                                style: "display: none"
                            });
                            var td4 = dojo.create("td", {
                                "class": "dijitReset dijitMenuArrowCell",
                                role: "presentation"
                            });
                            var _291 = dojo.create("img", {
                                "class": "dijitIcon dijitMenuItemIcon",
                                alt: "",
                                src: "//1.w3.s81c.com/common/js/dojo/1.6/dojo/resources/blank.gif",
                                role: "presentation"
                            });
                            var _292 = dojo.create("div", {
                                style: "visibility: hidden"
                            });
                            var _293 = dojo.create("img", {
                                "class": "dijitMenuExpand",
                                alt: "",
                                src: "//1.w3.s81c.com/common/js/dojo/1.6/dojo/resources/blank.gif"
                            });
                            var _294 = dojo.create("span", {
                                "class": "dijitMenuExpandA11y",
                                innerHTML: "+"
                            });
                            dojo.place(_291, td1);
                            dojo.place(_292, td4);
                            dojo.place(_293, _292);
                            dojo.place(_294, _292);
                            var tr = dojo.create("tr", {
                                id: _28b.id + "_searchText",
                                "class": "dijitReset dijitMenuItem",
                                role: "listitem",
                                "aria-labelledby": "test"
                            });
                            dojo.place(td1, tr);
                            dojo.place(td2, tr);
                            dojo.place(td3, tr);
                            dojo.place(td4, tr);
                            dojo.place(_28c, td2);
                            dojo.place(tr, _28e, "first");
                        }
                    });
                    return _28b;

                    function _28d() {
                        _28c.value = "Select or click to filter";
                        if (dojo.hasClass(_28c, "filtering_select_typing")) {
                            dojo.removeClass(_28c, "filtering_select_typing");
                        }
                        if (dojo.hasClass(_28c, "filtering_select_erroricon")) {
                            dojo.removeClass(_28c, "filtering_select_erroricon");
                        }
                        if (!dojo.hasClass(_28c, "filtering_select_readonly")) {
                            dojo.addClass(_28c, "filtering_select_readonly");
                        }
                        var _295 = dojo.query("#" + _28b.id + "_dropdown table tbody")[0];
                        for (var i = 1; i < _295.children.length; i++) {
                            _295.children[i].style.display = "";
                        }
                        _296();
                    };

                    function _296() {
                        dojo.query("#" + _28b.id + "_dropdown div.dijitSelectMenu")[0].style.height = "206px";
                        dojo.query("#" + _28b.id + "_dropdown div.dijitSelectMenu")[0].style.overflowY = "scroll";
                    };
                });
            });
        }
    });
    dojo.ready(function() {
        ibmweb.form.initFilterSelect();
    });
    Date.LZ = function(x) {
        return (x < 0 || x > 9 ? "" : "0") + x;
    };
    Date.monthNames = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    Date.monthAbbreviations = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    Date.dayNames = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    Date.dayAbbreviations = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    Date.preferAmericanFormat = true;
    if (!Date.prototype.getFullYear) {
        Date.prototype.getFullYear = function() {
            var yy = this.getYear();
            return (yy < 1900 ? yy + 1900 : yy);
        };
    }
    Date.parseString = function(val, _297) {
        if (typeof(_297) == "undefined" || _297 == null || _297 == "") {
            var _298 = new Array("y-M-d", "MMM d, y", "MMM d,y", "y-MMM-d", "d-MMM-y", "MMM d", "MMM-d", "d-MMM"),
                _299 = new Array("M/d/y", "M-d-y", "M.d.y", "M/d", "M-d"),
                _29a = new Array("d/M/y", "d-M-y", "d.M.y", "d/M", "d-M"),
                _29b = new Array(_298, Date.preferAmericanFormat ? _299 : _29a, Date.preferAmericanFormat ? _29a : _299);
            for (var i = 0; i < _29b.length; i++) {
                var l = _29b[i];
                for (var j = 0; j < l.length; j++) {
                    var d = Date.parseString(val, l[j]);
                    if (d != null) {
                        return d;
                    }
                }
            }
            return null;
        }
        this.isInteger = function(val) {
            for (var i = 0; i < val.length; i++) {
                if ("1234567890".indexOf(val.charAt(i)) == -1) {
                    return false;
                }
            }
            return true;
        };
        this.getInt = function(str, i, _29c, _29d) {
            for (var x = _29d; x >= _29c; x--) {
                var _29e = str.substring(i, i + x);
                if (_29e.length < _29c) {
                    return null;
                }
                if (this.isInteger(_29e)) {
                    return _29e;
                }
            }
            return null;
        };
        val = val + "";
        _297 = _297 + "";
        var _29f = 0,
            _2a0 = 0,
            c = "",
            _2a1 = "",
            _2a2 = "",
            x, y, year = new Date().getFullYear(),
            _2a3 = 1,
            date = 1,
            hh = 0,
            mm = 0,
            ss = 0,
            ampm = "";
        while (_2a0 < _297.length) {
            c = _297.charAt(_2a0);
            _2a1 = "";
            while ((_297.charAt(_2a0) == c) && (_2a0 < _297.length)) {
                _2a1 += _297.charAt(_2a0++);
            }
            switch (_2a1) {
                case "yyyy":
                case "yy":
                case "y":
                    if (_2a1 == "yyyy") {
                        x = 4;
                        y = 4;
                    }
                    if (_2a1 == "yy") {
                        x = 2;
                        y = 2;
                    }
                    if (_2a1 == "y") {
                        x = 2;
                        y = 4;
                    }
                    year = this.getInt(val, _29f, x, y);
                    if (year == null) {
                        return null;
                    }
                    _29f += year.length;
                    if (year.length == 2) {
                        if (year > 70) {
                            year = 1900 + (year - 0);
                        } else {
                            year = 2000 + (year - 0);
                        }
                    }
                    break;
                case "MMM":
                case "NNN":
                    _2a3 = 0;
                    var _2a4 = (_2a1 == "MMM" ? (Date.monthNames.concat(Date.monthAbbreviations)) : Date.monthAbbreviations);
                    for (var i = 0; i < _2a4.length; i++) {
                        var _2a5 = _2a4[i];
                        if (val.substring(_29f, _29f + _2a5.length).toLowerCase() == _2a5.toLowerCase()) {
                            _2a3 = (i % 12) + 1;
                            _29f += _2a5.length;
                            break;
                        }
                    }
                    if ((_2a3 < 1) || (_2a3 > 12)) {
                        return null;
                    }
                    break;
                case "EE":
                case "E":
                    var _2a4 = (_2a1 == "EE" ? Date.dayNames : Date.dayAbbreviations);
                    for (var i = 0; i < _2a4.length; i++) {
                        var _2a6 = _2a4[i];
                        if (val.substring(_29f, _29f + _2a6.length).toLowerCase() == _2a6.toLowerCase()) {
                            _29f += _2a6.length;
                            break;
                        }
                    }
                    break;
                case "MM":
                case "M":
                    _2a3 = this.getInt(val, _29f, _2a1.length, 2);
                    if (_2a3 == null || (_2a3 < 1) || (_2a3 > 12)) {
                        return null;
                    }
                    _29f += _2a3.length;
                    break;
                case "dd":
                case "d":
                    date = this.getInt(val, _29f, _2a1.length, 2);
                    if (date == null || (date < 1) || (date > 31)) {
                        return null;
                    }
                    _29f += date.length;
                    break;
                case "hh":
                case "h":
                    hh = this.getInt(val, _29f, _2a1.length, 2);
                    if (hh == null || (hh < 1) || (hh > 12)) {
                        return null;
                    }
                    _29f += hh.length;
                    break;
                case "HH":
                case "H":
                    hh = this.getInt(val, _29f, _2a1.length, 2);
                    if (hh == null || (hh < 0) || (hh > 23)) {
                        return null;
                    }
                    _29f += hh.length;
                    break;
                case "KK":
                case "K":
                    hh = this.getInt(val, _29f, _2a1.length, 2);
                    if (hh == null || (hh < 0) || (hh > 11)) {
                        return null;
                    }
                    _29f += hh.length;
                    hh++;
                    break;
                case "kk":
                case "k":
                    hh = this.getInt(val, _29f, _2a1.length, 2);
                    if (hh == null || (hh < 1) || (hh > 24)) {
                        return null;
                    }
                    _29f += hh.length;
                    hh--;
                    break;
                case "mm":
                case "m":
                    mm = this.getInt(val, _29f, _2a1.length, 2);
                    if (mm == null || (mm < 0) || (mm > 59)) {
                        return null;
                    }
                    _29f += mm.length;
                    break;
                case "ss":
                case "s":
                    ss = this.getInt(val, _29f, _2a1.length, 2);
                    if (ss == null || (ss < 0) || (ss > 59)) {
                        return null;
                    }
                    _29f += ss.length;
                    break;
                case "a":
                    if (val.substring(_29f, _29f + 2).toLowerCase() == "am") {
                        ampm = "AM";
                    } else {
                        if (val.substring(_29f, _29f + 2).toLowerCase() == "pm") {
                            ampm = "PM";
                        } else {
                            return null;
                        }
                    }
                    _29f += 2;
                    break;
                default:
                    if (val.substring(_29f, _29f + _2a1.length) != _2a1) {
                        return null;
                    } else {
                        _29f += _2a1.length;
                    }
            }
        }
        if (_29f != val.length) {
            return null;
        }
        if (_2a3 == 2) {
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
                if (date > 29) {
                    return null;
                }
            } else {
                if (date > 28) {
                    return null;
                }
            }
        }
        if ((_2a3 == 4) || (_2a3 == 6) || (_2a3 == 9) || (_2a3 == 11)) {
            if (date > 30) {
                return null;
            }
        }
        if (hh < 12 && ampm == "PM") {
            hh = hh - 0 + 12;
        } else {
            if (hh > 11 && ampm == "AM") {
                hh -= 12;
            }
        }
        return new Date(year, _2a3 - 1, date, hh, mm, ss);
    };
    Date.isValid = function(val, _2a7) {
        return (Date.parseString(val, _2a7) != null);
    };
    Date.prototype.isBefore = function(_2a8) {
        if (_2a8 == null) {
            return false;
        }
        return (this.getTime() < _2a8.getTime());
    };
    Date.prototype.isAfter = function(_2a9) {
        if (_2a9 == null) {
            return false;
        }
        return (this.getTime() > _2a9.getTime());
    };
    Date.prototype.equals = function(_2aa) {
        if (_2aa == null) {
            return false;
        }
        return (this.getTime() == _2aa.getTime());
    };
    Date.prototype.equalsIgnoreTime = function(_2ab) {
        if (_2ab == null) {
            return false;
        }
        var d1 = new Date(this.getTime()).clearTime(),
            d2 = new Date(_2ab.getTime()).clearTime();
        return (d1.getTime() == d2.getTime());
    };
    Date.prototype.format = function(_2ac) {
        _2ac = _2ac + "";
        var _2ad = "",
            _2ae = 0,
            c = "",
            _2af = "",
            y = this.getYear() + "",
            M = this.getMonth() + 1,
            d = this.getDate(),
            E = this.getDay(),
            H = this.getHours(),
            m = this.getMinutes(),
            s = this.getSeconds(),
            yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k, _2b0 = new Object();
        if (y.length < 4) {
            y = "" + (+y + 1900);
        }
        _2b0["y"] = "" + y;
        _2b0["yyyy"] = y;
        _2b0["yy"] = y.substring(2, 4);
        _2b0["M"] = M;
        _2b0["MM"] = Date.LZ(M);
        _2b0["MMM"] = Date.monthNames[M - 1];
        _2b0["NNN"] = Date.monthAbbreviations[M - 1];
        _2b0["d"] = d;
        _2b0["dd"] = Date.LZ(d);
        _2b0["E"] = Date.dayAbbreviations[E];
        _2b0["EE"] = Date.dayNames[E];
        _2b0["H"] = H;
        _2b0["HH"] = Date.LZ(H);
        if (H == 0) {
            _2b0["h"] = 12;
        } else {
            if (H > 12) {
                _2b0["h"] = H - 12;
            } else {
                _2b0["h"] = H;
            }
        }
        _2b0["hh"] = Date.LZ(_2b0["h"]);
        _2b0["K"] = _2b0["h"] - 1;
        _2b0["k"] = _2b0["H"] + 1;
        _2b0["KK"] = Date.LZ(_2b0["K"]);
        _2b0["kk"] = Date.LZ(_2b0["k"]);
        if (H > 11) {
            _2b0["a"] = "PM";
        } else {
            _2b0["a"] = "AM";
        }
        _2b0["m"] = m;
        _2b0["mm"] = Date.LZ(m);
        _2b0["s"] = s;
        _2b0["ss"] = Date.LZ(s);
        while (_2ae < _2ac.length) {
            c = _2ac.charAt(_2ae);
            _2af = "";
            while ((_2ac.charAt(_2ae) == c) && (_2ae < _2ac.length)) {
                _2af += _2ac.charAt(_2ae++);
            }
            if (typeof(_2b0[_2af]) != "undefined") {
                _2ad = _2ad + _2b0[_2af];
            } else {
                _2ad = _2ad + _2af;
            }
        }
        return _2ad;
    };
    Date.prototype.getDayName = function() {
        return Date.dayNames[this.getDay()];
    };
    Date.prototype.getDayAbbreviation = function() {
        return Date.dayAbbreviations[this.getDay()];
    };
    Date.prototype.getMonthName = function() {
        return Date.monthNames[this.getMonth()];
    };
    Date.prototype.getMonthAbbreviation = function() {
        return Date.monthAbbreviations[this.getMonth()];
    };
    Date.prototype.clearTime = function() {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this;
    };
    Date.prototype.add = function(_2b1, _2b2) {
        if (typeof(_2b1) == "undefined" || _2b1 == null || typeof(_2b2) == "undefined" || _2b2 == null) {
            return this;
        }
        _2b2 = +_2b2;
        switch (_2b1) {
            case "y":
                this.setFullYear(this.getFullYear() + _2b2);
                break;
            case "M":
                this.setMonth(this.getMonth() + _2b2);
                break;
            case "d":
                this.setDate(this.getDate() + _2b2);
                break;
            case "w":
                var step = (_2b2 > 0) ? 1 : -1;
                while (_2b2 != 0) {
                    this.add("d", step);
                    while (this.getDay() == 0 || this.getDay() == 6) {
                        this.add("d", step);
                    }
                    _2b2 -= step;
                }
                break;
            case "h":
                this.setHours(this.getHours() + _2b2);
                break;
            case "m":
                this.setMinutes(this.getMinutes() + _2b2);
                break;
            case "s":
                this.setSeconds(this.getSeconds() + _2b2);
                break;
        }
        return this;
    };
}
if (!dojo._hasResource["ibmweb.stepindicator"]) {
    dojo._hasResource["ibmweb.stepindicator"] = true;
    dojo.provide("ibmweb.stepindicator");
    ibmweb.stepindicator = {
        indicators: {},
        id_inc: 0,
        classnames: {
            indicator: "ibm-step-indicator",
            container: "ibm-step-container",
            past_step: "ibm-active-completed",
            present_step: "ibm-active-current",
            future_step: "ibm-disabled",
            inactive_content: "ibm-hidden-content",
            disable_previous: "ibm-disable-previous"
        },
        init: function(_2b3, _2b4) {
            _2b3 = _2b3 || dojo.query("body")[0];
            dojo.query("div." + this.classnames.indicator, _2b3).forEach(function(node, i) {
                if (!new ibmweb.stepindicator.StepIndicator(node, _2b4)) {}
            });
        },
        StepIndicator: function(node, _2b5) {
            var that = this;
            if (typeof(node) == "string") {
                node = dojo.byId(node);
            }
            if (!node) {
                throw "Cannot build StepIndicator, node does not exist";
            }
            if (dojo.attr(node, "data-step-indicator-init")) {
                return false;
            }
            dojo.attr(node, "data-step-indicator-init", true);
            var me = this,
                id = dojo.attr(node, "id"),
                _2b6 = {
                    future_clickable: false,
                    disable_previous: ~node.className.indexOf(ibmweb.stepindicator.classnames.disable_previous) ? true : false,
                    content: dojo.NodeList(node).next()[0],
                    focus_index: -1
                };
            if (id) {
                indicators[id] = me;
            }
            dojo.query(".ibm-hide-if-no-js", _2b6.content).forEach(function(_2b7) {
                dojo.removeClass(_2b7, "ibm-hide-if-no-js");
            });
            _2b5 = _2b5 || {};
            for (var key in _2b5) {
                _2b6[key] = _2b5[key];
            }
            node.setAttribute("role", "navigation");
            node.setAttribute("aria-level", "2");
            node.setAttribute("aria-label", "Step Indicator");
            var _2b8 = dojo.query("h2.ibm-access", node)[0];
            if (_2b8) {
                node.removeChild(_2b8);
            }
            var _2b9 = function() {
                return dojo.query("li", node);
            };
            var _2ba = function() {
                return dojo.query("." + ibmweb.stepindicator.classnames.container, _2b6.content);
            };
            this.currentStep = function() {
                var cs = -1;
                _2b9().forEach(function(node, i) {
                    if (dojo.query("." + ibmweb.stepindicator.classnames.present_step, node).length > 0) {
                        cs = i;
                    }
                });
                return cs;
            };
            this.totalSteps = function() {
                return _2b9().length;
            };
            this.isOnFirst = function() {
                return me.currentStep() === 0;
            };
            this.isOnLast = function() {
                return me.currentStep() === me.totalSteps() - 1;
            };
            this.goToStep = function(_2bb) {
                var $a;
                _2b9().forEach(function(_2bc, i) {
                    $a = dojo.query("a", _2bc)[0];
                    if (_2b6.disable_previous) {
                        dojo[(i !== _2bb) ? "addClass" : "removeClass"]($a, ibmweb.stepindicator.classnames.future_step);
                        dojo[(i === _2bb) ? "addClass" : "removeClass"]($a, ibmweb.stepindicator.classnames.present_step);
                    } else {
                        dojo[(i < _2bb) ? "addClass" : "removeClass"]($a, ibmweb.stepindicator.classnames.past_step);
                        dojo[(i === _2bb) ? "addClass" : "removeClass"]($a, ibmweb.stepindicator.classnames.present_step);
                        dojo[(i > _2bb) ? "addClass" : "removeClass"]($a, ibmweb.stepindicator.classnames.future_step);
                    }
                    if (i === _2bb) {
                        $a.setAttribute("aria-selected", true);
                        $a.tabIndex = 0;
                    } else {
                        $a.setAttribute("aria-selected", false);
                        $a.tabIndex = -1;
                    }
                });
                _2ba().forEach(function(_2bd, i) {
                    dojo.style(_2bd, "display", (i === _2bb) ? "block" : "none");
                    dojo.attr(_2bd, "role", (i === _2bb) ? "tabpanel" : "");
                });
                _2b6.focus_index = _2bb;
            };
            _2b9().forEach(function(_2be, i) {
                $a = dojo.query("a", _2be)[0];
                dojo.connect($a, "onclick", function(e) {
                    var _2bf = me.currentStep() < i;
                    if ((!_2bf || (_2bf && _2b6.future_clickable)) && !_2b6.disable_previous) {
                        me.goToStep(i);
                    }
                    e.preventDefault();
                });
                dojo.connect($a, "onkeypress", function(e) {
                    var key = e.keyCode || e.charCode;
                    if (key === dojo.keys.RIGHT_ARROW || key === dojo.keys.LEFT_ARROW) {
                        _2b6.focus_index = (_2b6.focus_index === -1) ? me.currentStep() : _2b6.focus_index;
                        _2b6.focus_index += (key === dojo.keys.RIGHT_ARROW) ? 1 : -1;
                        if (_2b6.focus_index === me.totalSteps()) {
                            _2b6.focus_index = me.totalSteps() - 1;
                        } else {
                            if (_2b6.focus_index < 0) {
                                _2b6.focus_index = 0;
                            }
                        }
                        _2b9().forEach(function(_2c0, i) {
                            $a_focus = dojo.query("a", _2c0)[0];
                            if (_2b6.focus_index === i) {
                                dijit.focus($a_focus);
                            }
                        });
                    } else {
                        if (key === dojo.keys.SPACE && !_2b6.disable_previous) {
                            me.goToStep(_2b6.focus_index);
                            e.preventDefault();
                        }
                    }
                });
            });
            this.next = function() {
                if (!me.isOnLast()) {
                    me.goToStep(me.currentStep() + 1);
                }
            };
            this.prev = function(_2c1) {
                if (!me.isOnFirst()) {
                    me.goToStep(me.currentStep() - 1);
                }
            };
            _2ba().forEach(function(_2c2, i) {
                var _2c3 = dojo.query("[data-step=next]", _2c2);
                _2c3.forEach(function(_2c4) {
                    dojo.attr(_2c4, "role", "button");
                    dojo.connect(_2c4, "onclick", function() {
                        me.next();
                    });
                });
                var _2c5 = dojo.query("[data-step=prev]", _2c2);
                _2c5.forEach(function(_2c6) {
                    dojo.attr(_2c6, "role", "button");
                    dojo.connect(_2c6, "onclick", function() {
                        me.prev();
                    });
                });
            });
            var cs = me.currentStep();
            if (cs == -1) {
                cs = 0;
            }
            me.goToStep(cs);
        },
        byId: function(id) {
            return this.indicators[id] || null;
        }
    };
}
if (!dojo._hasResource["ibmweb.dynnav._module"]) {
    dojo._hasResource["ibmweb.dynnav._module"] = true;
    dojo.provide("ibmweb.dynnav._module");
    dojo.declare("ibmweb.dynnav._module", null, {
        isA_Module: true,
        init: function() {
            return false;
        },
        onLoad: function() {},
        onData: function(data) {},
        onError: function() {}
    });
}
if (!dojo._hasResource["ibmweb.dynnav.mediacontroller"]) {
    dojo._hasResource["ibmweb.dynnav.mediacontroller"] = true;
    dojo.provide("ibmweb.dynnav.mediacontroller");
    dojo.declare("ibmweb.dynnav.mediacontroller", [ibmweb.dynnav._module], {
        _widgets: [],
        init: function() {
            return ibmweb.dynnav.isServiceEnabled("video");
        },
        createWidgets: function(_2c7) {
            if (!_2c7) {
                _2c7 = dojo.query(".ibm-media");
            }
            var self = this;
            _2c7.forEach(function(item) {
                if (dojo.hasClass(item, "ibm-media-processed")) {
                    return;
                }
                dojo.addClass(item, "ibm-media-processed");
                if (item.tagName == "A" || item.tagName == "AREA") {
                    dojo.connect(item, "onclick", function(_2c8) {
                        self._onLinkClick(_2c8, this);
                    });
                    return;
                }
                var link = dojo.query(".ibm-rss-link", item);
                if (link.length == 0) {
                    return;
                }
                link = link[0];
                var _2c9 = dojo.queryToObject(link.rel);
                var _2ca, data = null;
                var _2cb = dojo.query("img", link);
                var _2cc;
                if (_2cb.length != 0) {
                    if (_2c9.format == "ribbon") {
                        htmlBackground_arr = [];
                        _2cb.forEach(function(i) {
                            var src = dojo.attr(i, "src");
                            htmlBackground_arr.push(src);
                            dojo.destroy(i);
                        });
                        _2cb = htmlBackground_arr;
                    } else {
                        var src = dojo.attr(_2cb[0], "src");
                        _2cc = dojo.attr(_2cb[0], "alt");
                        _2cb.forEach(dojo.destroy);
                        _2cb = src;
                    }
                } else {
                    _2cb = null;
                }
                var _2cd = {
                    container: item,
                    url: link.href,
                    options: dojo.queryToObject(link.rel),
                    title: link.innerHTML,
                    htmlBackground: _2cb,
                    htmlBackgroundAlt: _2cc
                };
                if (_2c9.loadVideoUrl) {
                    data = [{
                        isVideo: true,
                        url: {
                            mp4: link.href
                        }
                    }];
                    if (_2c9.height) {
                        data[0].height = _2c9.height;
                    }
                    if (_2c9.width) {
                        data[0].width = _2c9.width;
                    }
                }
                switch (_2c9.format) {
                    case "video_small":
                        dojo.mixin(_2cd, {
                            maxWidth: 300
                        });
                        _2ca = "videowidget";
                        data = [{
                            height: "225",
                            width: "300",
                            isVideo: true,
                            thumbnails: {},
                            url: {
                                mp4: link.href
                            }
                        }];
                        break;
                    case "inline_small":
                        var _2ce = 300;
                        try {
                            if (link.parentNode) {
                                var _2cf = link.parentNode;
                                _2ce = dojo.coords(_2cf).w;
                            }
                        } catch (e) {}
                        dojo.mixin(_2cd, {
                            maxWidth: _2ce,
                            format: "inline_small"
                        });
                        _2cd.options.no_hide = true;
                        _2ca = "videowidget";
                        break;
                    case "inline_large":
                        dojo.mixin(_2cd, {
                            maxWidth: 940,
                            maxHeight: 332,
                            format: "inline_large"
                        });
                        _2ca = "largewidget";
                        break;
                    case "inline_medium":
                        dojo.mixin(_2cd, {
                            maxWidth: 620,
                            maxHeight: 332,
                            format: "inline_medium"
                        });
                        _2ca = "mediumwidget";
                        break;
                    case "playlist":
                        dojo.mixin(_2cd, {
                            maxWidth: 940,
                            maxHeight: 332,
                            format: "playlist"
                        });
                        _2ca = "playlistwidget";
                        break;
                    case "inline_thumbnail":
                        dojo.mixin(_2cd, {
                            maxWidth: 940,
                            maxHeight: 332,
                            format: "inline_thumbnail"
                        });
                        _2ca = "thumbnailwidget";
                        break;
                    case "ribbon":
                    default:
                        dojo.mixin(_2cd, {
                            maxWidth: 940,
                            maxHeight: 332,
                            format: "ribbon"
                        });
                        _2ca = "ribbonwidget";
                        break;
                }
                _2ca = new ext.media[_2ca](_2cd);
                dojo.empty(item);
                _2ca.placeAt(item);
                _2ca.startup(data);
                self._widgets.push(_2ca);
                dojo.publish("/ibmweb/dynnav/mediacontroller/created", _2ca);
            });
        },
        onData: function() {
            var _2d0 = dojo.query(".ibm-media");
            var self = this;
            if (_2d0.length > 0) {
                dojo["require"]("ext.media._base");
                dojo.addOnLoad(dojo.hitch(this, function() {
                    this.createWidgets();
                }));
            }
        },
        onError: function() {
            for (var i = 0, j = this._widgets.length; i < j; i++) {
                this._widgets[i].removeWaitingImage();
            }
        },
        useNewYTPlayer: function() {
            var _2d1 = dojo.query("meta[name=__RMSBETA]");
            var _2d2 = false;
            if (_2d1 && _2d1.length > 0 && dojo.attr(_2d1[0], "value") == "newYT") {
                _2d2 = true;
            }
            var _2d3 = /[&?]rmsbeta=newyt/.test(document.location.search);
            if (dojo.cookie("__RMSBETA") == "newYT" || _2d2 || _2d3) {
                if (dojo.isIE) {
                    return dojo.isIE > 8;
                }
                return true;
            }
            return false;
        },
        _onLinkClick: function(_2d4, link) {
            var _2d5 = {};
            var _2d6 = link.href && link.href.indexOf("youtube.com") > -1;
            if (link.rel) {
                _2d5 = dojo.queryToObject(link.rel);
            }
            if (ibmweb.info.iDevice && _2d6 && !this.useNewYTPlayer()) {
                return;
            }
            if (!!_2d5.format && _2d5.format == "overlay") {
                dojo.stopEvent(_2d4);
                var _2d7 = {
                    url: link.href,
                    options: _2d5
                };
                var _2d8 = new ext.media.overlaywidget(_2d7);
                _2d8.startup();
                return;
            }
            if (!_2d6 && (!_2d5.height || !_2d5.width)) {
                return;
            }
            dojo.stopEvent(_2d4);
            var _2d8 = new ext.media.overlaywidget();
            _2d8.url = link.href;
            _2d8.options = _2d5;
            var obj = {
                isVideo: true,
                url: {
                    mp4: link.href
                }
            };
            if (_2d6) {
                obj.type = "youtube";
                obj.url = {
                    youtube: link.href
                };
                if (!_2d5.height) {
                    obj.height = 360;
                }
                if (!_2d5.width) {
                    obj.width = 640;
                }
            }
            _2d8.startup([dojo.mixin({}, _2d5, obj)], true);
        }
    });
}
if (!dojo._hasResource["ibmweb.external.expertise"]) {
    dojo._hasResource["ibmweb.external.expertise"] = true;
    dojo.provide("ibmweb.external.expertise");
    dojo.declare("ibmweb.external.expertise", ibmweb.dynnav._module, {
        init: function() {
            return ibmweb.dynnav.isServiceEnabled("expertise");
        },
        onData: function(data) {
            if (ibmweb.config.config == "www") {
                ibmweb.config.set({
                    expv17css: "//1.www.s81c.com/common/v17/css/external/expertise.css"
                });
            } else {
                ibmweb.config.set({
                    expv17css: "//1.w3.s81c.com/common/v17/css/external/expertise.css"
                });
            }
            var RE = /\,{1,}/g;
            if (ibmweb.config.siteid == "www" || ibmweb.config.siteid == "w3") {
                if (ibmweb.config.expertise.template == "col-5-1") {
                    dojo["require"]("ext.expertise.AbstractExpertiseV17Widget");
                    dojo["require"]("ext.expertise.Five1V17Widget");
                    ibmweb.queue.push(function() {
                        return typeof(ext) == "object" && typeof(ext.expertise) == "object" && typeof(ext.expertise.Five1V17Widget) == "function";
                    }, function() {
                        if (!ibmweb.config.expertise.debug) {
                            dojo.doc.getElementsByTagName("head")[0].appendChild(dojo.create("link", {
                                type: "text/css",
                                rel: "stylesheet",
                                href: ibmweb.config.expv17css
                            }));
                        }
                        ibmweb.data.require("expertlocator", function(_2d9) {
                            if (RE.test(ibmweb.config.expertise.placeat)) {
                                if (ibmweb.config.expertise.expertid && ibmweb.config.expertise.displaytype == "one") {
                                    for (var i = 0; i < ibmweb.config.expertise.placeat.length; i++) {
                                        var _2da = new ext.expertise.Five1V17Widget();
                                        _2da.startup(i);
                                    }
                                } else {
                                    if (ibmweb.config.expertise.listid && ibmweb.config.expertise.displaytype == "multi") {
                                        for (var i = 0; i < ibmweb.config.expertise.placeat.length; i++) {
                                            var _2da = new ext.expertise.Five1V17Widget();
                                            _2da.startup(i);
                                        }
                                    } else {
                                        return;
                                    }
                                }
                            } else {
                                var _2da = new ext.expertise.Five1V17Widget();
                                _2da.startup();
                            }
                        });
                    });
                } else {
                    if (ibmweb.config.expertise.template == "col-6-1") {
                        dojo["require"]("ext.expertise.AbstractExpertiseV17Widget");
                        dojo["require"]("ext.expertise.Six1V17Widget");
                        ibmweb.queue.push(function() {
                            return typeof(ext) == "object" && typeof(ext.expertise) == "object" && typeof(ext.expertise.Six1V17Widget) == "function";
                        }, function() {
                            if (!ibmweb.config.expertise.debug) {
                                dojo.doc.getElementsByTagName("head")[0].appendChild(dojo.create("link", {
                                    type: "text/css",
                                    rel: "stylesheet",
                                    href: ibmweb.config.expv17css
                                }));
                            }
                            ibmweb.data.require("expertlocator", function(_2db) {
                                if (RE.test(ibmweb.config.expertise.placeat)) {
                                    if (ibmweb.config.expertise.expertid && ibmweb.config.expertise.displaytype == "one") {
                                        for (var i = 0; i < ibmweb.config.expertise.placeat.length; i++) {
                                            var _2dc = new ext.expertise.Six1V17Widget();
                                            _2dc.startup(i);
                                        }
                                    } else {
                                        if (ibmweb.config.expertise.listid && ibmweb.config.expertise.displaytype == "multi") {
                                            for (var i = 0; i < ibmweb.config.expertise.placeat.length; i++) {
                                                var _2dc = new ext.expertise.Six1V17Widget();
                                                _2dc.startup(i);
                                            }
                                        } else {
                                            return;
                                        }
                                    }
                                } else {
                                    var _2dc = new ext.expertise.Six1V17Widget();
                                    _2dc.startup();
                                }
                            });
                        });
                    } else {
                        if (ibmweb.config.expertise.template == "col-6-2") {
                            dojo["require"]("ext.expertise.AbstractExpertiseV17Widget");
                            dojo["require"]("ext.expertise.Six2V17Widget");
                            ibmweb.queue.push(function() {
                                return typeof(ext) == "object" && typeof(ext.expertise) == "object" && typeof(ext.expertise.Six2V17Widget) == "function";
                            }, function() {
                                if (!ibmweb.config.expertise.debug) {
                                    dojo.doc.getElementsByTagName("head")[0].appendChild(dojo.create("link", {
                                        type: "text/css",
                                        rel: "stylesheet",
                                        href: ibmweb.config.expv17css
                                    }));
                                }
                                ibmweb.data.require("expertlocator", function(_2dd) {
                                    if (RE.test(ibmweb.config.expertise.placeat)) {
                                        if (ibmweb.config.expertise.expertid && ibmweb.config.expertise.displaytype == "one") {
                                            for (var i = 0; i < ibmweb.config.expertise.placeat.length; i++) {
                                                var _2de = new ext.expertise.Six2V17Widget();
                                                _2de.startup(i);
                                            }
                                        } else {
                                            if (ibmweb.config.expertise.listid && ibmweb.config.expertise.displaytype == "multi") {
                                                for (var i = 0; i < ibmweb.config.expertise.placeat.length; i++) {
                                                    var _2de = new ext.expertise.Six2V17Widget();
                                                    _2de.startup(i);
                                                }
                                            } else {
                                                return;
                                            }
                                        }
                                    } else {
                                        var _2de = new ext.expertise.Six2V17Widget();
                                        _2de.startup();
                                    }
                                });
                            });
                        } else {
                            if (ibmweb.config.config == "www") {
                                dojo["require"]("ext.expertise.AbstractExpertiseWidget");
                                dojo["require"]("ext.expertise.WWWExpertiseWidget");
                                ibmweb.queue.push(function() {
                                    return typeof(ext) == "object" && typeof(ext.expertise) == "object" && typeof(ext.expertise.WWWExpertiseWidget) == "function";
                                }, function() {
                                    var _2df = new ext.expertise.WWWExpertiseWidget();
                                    _2df.startup();
                                });
                            } else {
                                if (ibmweb.config.config == "w3") {
                                    dojo["require"]("ext.expertise.AbstractExpertiseWidget");
                                    dojo["require"]("ext.expertise.W3ExpertiseWidget");
                                    ibmweb.queue.push(function() {
                                        return typeof(ext) == "object" && typeof(ext.expertise) == "object" && typeof(ext.expertise.W3ExpertiseWidget) == "function";
                                    }, function() {
                                        var _2e0 = new ext.expertise.W3ExpertiseWidget();
                                        _2e0.startup();
                                    });
                                }
                            }
                        }
                    }
                }
            } else {
                if (ibmweb.config.siteid == "smarterplanet") {
                    dojo["require"]("ext.expertise.AbstractExpertiseWidget");
                    dojo["require"]("ext.expertise.ExternalExpertiseWidget");
                    ibmweb.queue.push(function() {
                        return typeof(ext) == "object" && typeof(ext.expertise) == "object" && typeof(ext.expertise.ExternalExpertiseWidget) == "function";
                    }, function() {
                        var _2e1 = new ext.expertise.ExternalExpertiseWidget();
                        _2e1.startup();
                    });
                } else {
                    if (ibmweb.config.siteid == "ibm100") {
                        dojo["require"]("ext.expertise.AbstractExpertiseWidget");
                        dojo["require"]("ext.expertise.IBM100ExpertiseWidget");
                        ibmweb.queue.push(function() {
                            return typeof(ext) == "object" && typeof(ext.expertise) == "object" && typeof(ext.expertise.IBM100ExpertiseWidget) == "function";
                        }, function() {
                            var _2e2 = new ext.expertise.IBM100ExpertiseWidget();
                            _2e2.startup();
                        });
                    } else {
                        if (ibmweb.config.config == "www") {
                            dojo["require"]("ext.expertise.AbstractExpertiseWidget");
                            dojo["require"]("ext.expertise.WWWExpertiseWidget");
                            ibmweb.queue.push(function() {
                                return typeof(ext) == "object" && typeof(ext.expertise) == "object" && typeof(ext.expertise.WWWExpertiseWidget) == "function";
                            }, function() {
                                var _2e3 = new ext.expertise.WWWExpertiseWidget();
                                _2e3.startup();
                            });
                        } else {
                            if (ibmweb.config.config == "w3") {
                                dojo["require"]("ext.expertise.AbstractExpertiseWidget");
                                dojo["require"]("ext.expertise.W3ExpertiseWidget");
                                ibmweb.queue.push(function() {
                                    return typeof(ext) == "object" && typeof(ext.expertise) == "object" && typeof(ext.expertise.W3ExpertiseWidget) == "function";
                                }, function() {
                                    var _2e4 = new ext.expertise.W3ExpertiseWidget();
                                    _2e4.startup();
                                });
                            }
                        }
                    }
                }
            }
        }
    });
}
if (!dojo._hasResource["ibmweb.external.noticechoice"]) {
    dojo._hasResource["ibmweb.external.noticechoice"] = true;
    dojo.provide("ibmweb.external.noticechoice");
    dojo.declare("ibmweb.external.noticechoice", [ibmweb.dynnav._module], {
        init: function() {
            if (!!ibmweb.meta.nc_pagedesc) {
                dojo["require"]("ext.noticechoice.nc");
                ibmweb.queue.push(function() {
                    return typeof(ext) == "object" && typeof(ext.noticechoice) == "object" && typeof(ext.noticechoice.nc.init) == "function";
                }, function() {
                    ibmweb.queue.waitForElement("ibm-top", function() {
                        ext.noticechoice.nc.init();
                    }, true);
                });
            }
            return !!ibmweb.meta.nc_questiontype && !!ibmweb.meta.nc_pagedesc;
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav._base-all"]) {
    dojo._hasResource["ibmweb.dynnav._base-all"] = true;
    dojo.provide("ibmweb.dynnav._base-all");
}
if (!dojo._hasResource["ibmweb.dynnav"]) {
    dojo._hasResource["ibmweb.dynnav"] = true;
    dojo.provide("ibmweb.dynnav");
    if (typeof(window.PMM) == "undefined" || window.PMM == null) {
        window.PMM = {
            isLoaded: false
        };
    }
    dojo.mixin(ibmweb.dynnav, {
        disabledCountries: ["xxilhe"],
        _modules: {},
        isDOMLoaded: false,
        PMM: {},
        isDataLoaded: false,
        isValid: true,
        _bundleCallbacks: [],
        _bundleParams: {},
        _bundleBlock: [],
        init: function() {
            if (!ibmweb.meta.lc || !ibmweb.meta.cc) {
                return;
            }
            if (dojo.indexOf(this.disabledCountries, ibmweb.meta.cpi) != -1) {
                return;
            }
            dojo.io.script.get({
                url: ibmweb.config.dataUrl + ibmweb.meta.cpi + "-" + ibmweb.meta.encoding + ".js",
                checkString: "ibmweb.dynnav.__checkString",
                timeout: ibmweb.config.timeout,
                error: function(_2e5, _2e6) {
                    ibmweb.dynnav.dataCallback = function() {};
                    ibmweb.dynnav._onError();
                    ibmweb.dynnav.isDataLoaded = true;
                }
            });
            if (ibmweb.meta.cc == "us") {
                if (ibmweb.meta.ibm_pageattributes.indexOf("flashlead") > -1) {
                    dojo.query("#ibm-esite-link").style("display", "none");
                }
            }
            ibmweb.config.parseMetaTags();
            var _2e7 = false;
            for (var key in ibmweb.config.lazyload) {
                if (ibmweb.config.get([key, "enabled"])) {
                    dojo["require"](ibmweb.config.lazyload[key]);
                    _2e7 = true;
                }
            }
            var _2e8 = function() {
                var tmp = dojo.mixin({}, ibmweb.external, ibmweb.dynnav);
                for (var key in tmp) {
                    if (key.substring(0, 1) != "_" && typeof(tmp[key].prototype) != "undefined" && !!tmp[key].prototype.isA_Module) {
                        var _2e9 = new tmp[key]();
                        if (_2e9.init()) {
                            this._modules[key] = _2e9;
                        }
                    }
                }
                this.executeBundleCall();
                dojo.addOnLoad(function() {
                    ibmweb.dynnav._initWithDOM();
                });
            };
            if (_2e7) {
                dojo.addOnLoad(dojo.hitch(this, _2e8));
            } else {
                _2e8.call(this);
            }
        },
        registerModule: function(_2ea) {
            if (_2ea.init()) {
                this._modules[_2ea.declaredClass] = _2ea;
            }
        },
        isServiceEnabled: function(_2eb) {
            return ibmweb.config.dynnav.enabled && !!ibmweb.config.get([_2eb, "enabled"]);
        },
        getCallback: function(_2ec, _2ed) {
            return ibmweb.callback.createJSONPWrapper(null, function() {
                var args = arguments;
                ibmweb.queue.push(function() {
                    return ibmweb.dynnav.isDataLoaded && ibmweb.dynnav.isDOMLoaded;
                }, function() {
                    try {
                        _2ec[_2ed].apply(_2ec, args);
                    } catch (e) {}
                });
            });
        },
        fetchData: function(id, _2ee, _2ef, _2f0) {
            ibmweb.queue.push(function() {
                return ibmweb.dynnav._bundleCallbacks.length == 0;
            }, function() {
                ibmweb.dynnav.addBundleCallback(id, _2ee, _2ef, _2f0);
                ibmweb.dynnav.executeBundleCall();
            });
        },
        addBundleCallback: function(id, _2f1, _2f2, _2f3) {
            var func = this.getCallback(_2f1, _2f2);
            this._bundleCallbacks.push(id + ":" + func);
            dojo.mixin(this._bundleParams, _2f3);
            return func;
        },
        blockBundle: function(sid) {
            this._bundleBlock[sid] = 1;
        },
        releaseBundle: function(sid) {
            var i = dojo.indexOf(this._bundleBlock, sid);
            if (i != -1) {
                this._bundleBlock.splice(i, 1);
            }
        },
        isBundleBlocked: function() {
            return this._bundleBlock.length != 0;
        },
        executeBundleCall: function() {
            ibmweb.queue.push(function() {
                return !ibmweb.dynnav.isBundleBlocked();
            }, function() {
                var _2f4 = ibmweb.dynnav._bundleCallbacks.join("@");
                if (!_2f4) {
                    return;
                }
                var _2f5 = dojo.mixin({
                    cc: ibmweb.meta.cc,
                    lc: ibmweb.meta.lc,
                    format: "json",
                    ts: ((new Date).getTime())
                }, ibmweb.dynnav._bundleParams, {
                    cb: _2f4
                });
                var ip = /ip=([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.exec(document.location.search);
                var _2f6 = /domain=([a-zA-Z\.\-0-9]+)/.exec(document.location.search);
                if (ip && _2f6) {
                    _2f5.ip = ip[1];
                    _2f5.domain = _2f6[1];
                }
                dojo.io.script.get({
                    url: ibmweb.config.dynNavBaseUrl,
                    content: _2f5,
                    timeout: ibmweb.config.timeout,
                    error: function(_2f7, _2f8) {
                        var cb = dojo.getObject("args.content.cb", false, _2f8);
                        if (cb) {
                            var cbs = cb.split("@");
                            for (var i = 0, j = cbs.length; i < j; i++) {
                                var _2f9 = cbs[i].split(":");
                                if (_2f9.length == 2 && typeof(window[_2f9[1]]) == "function") {
                                    window[_2f9[1]].call(window);
                                    window[_2f9[1]] = function() {};
                                }
                            }
                        }
                    }
                });
                ibmweb.dynnav._bundleParams = {};
                ibmweb.dynnav._bundleCallbacks = [];
            });
        },
        _initWithDOM: function() {
            this.isDOMLoaded = true;
            this.isValid = dojo.byId("ibm-top") && dojo.byId("ibm-masthead") && dojo.byId("ibm-footer") && (dojo.byId("ibm-content") || dojo.query("div.lotusFrame")[0]);
            if (!this.isValid && ibmweb.w3) {
                this.isValid = true;
            }
            if (!this.isValid) {
                return;
            }
            for (var _2fa in this._modules) {
                if (typeof(this._modules[_2fa]) == "object") {
                    try {
                        this._modules[_2fa].onLoad();
                    } catch (e) {}
                }
            }
        },
        _initWithData: function(data) {
            if (!this.isDOMLoaded) {
                dojo.addOnLoad(function() {
                    ibmweb.dynnav._initWithData(data);
                });
                return;
            }
            if (!this.isValid) {
                return;
            }
            for (var _2fb in this._modules) {
                if (typeof(this._modules[_2fb]) == "object") {
                    try {
                        this._modules[_2fb].onData(data);
                    } catch (e) {}
                }
            }
        },
        _onError: function() {
            for (var _2fc in this._modules) {
                if (typeof(this._modules[_2fc]) == "object") {
                    try {
                        this._modules[_2fc].onError();
                    } catch (e) {}
                }
            }
        },
        dataCallback: function(data) {
            data.isLoaded = true;
            ibmweb.dynnav.__checkString = true;
            ibmweb.dynnav.PMM = data;
            if (!window.PMM.isLoaded && !ibmweb.info.v16) {
                window.PMM = data;
            }
            ibmweb.dynnav.isDataLoaded = true;
            dojo.addOnLoad(function() {
                ibmweb.dynnav._initWithData(data);
            });
        },
        isModuleLoaded: function(_2fd) {
            return !!ibmweb.dynnav._modules[_2fd];
        },
        getLoadedModule: function(_2fe) {
            return ibmweb.dynnav._modules[_2fe];
        },
        executeOnModule: function(_2ff, _300, _301) {
            if (!!ibmweb.dynnav._modules[_2ff] && typeof(ibmweb.dynnav._modules[_2ff][_300]) == "function") {
                if (!!_301) {
                    ibmweb.dynnav._modules[_2ff][_300].apply(ibmweb.dynnav._modules[_2ff], _301);
                } else {
                    ibmweb.dynnav._modules[_2ff][_300].apply(ibmweb.dynnav._modules[_2ff]);
                }
            }
        }
    });
    ibmCommonDynamicNavShowResults = function() {};
}
if (!dojo._hasResource["dojo.regexp"]) {
    dojo._hasResource["dojo.regexp"] = true;
    dojo.provide("dojo.regexp");
    dojo.getObject("regexp", true, dojo);
    dojo.regexp.escapeString = function(str, _302) {
        return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(ch) {
            if (_302 && _302.indexOf(ch) != -1) {
                return ch;
            }
            return "\\" + ch;
        });
    };
    dojo.regexp.buildGroupRE = function(arr, re, _303) {
        if (!(arr instanceof Array)) {
            return re(arr);
        }
        var b = [];
        for (var i = 0; i < arr.length; i++) {
            b.push(re(arr[i]));
        }
        return dojo.regexp.group(b.join("|"), _303);
    };
    dojo.regexp.group = function(_304, _305) {
        return "(" + (_305 ? "?:" : "") + _304 + ")";
    };
}
if (!dojo._hasResource["dojo.cookie"]) {
    dojo._hasResource["dojo.cookie"] = true;
    dojo.provide("dojo.cookie");
    dojo.cookie = function(name, _306, _307) {
        var c = document.cookie;
        if (arguments.length == 1) {
            var _308 = c.match(new RegExp("(?:^|; )" + dojo.regexp.escapeString(name) + "=([^;]*)"));
            return _308 ? decodeURIComponent(_308[1]) : undefined;
        } else {
            _307 = _307 || {};
            var exp = _307.expires;
            if (typeof exp == "number") {
                var d = new Date();
                d.setTime(d.getTime() + exp * 24 * 60 * 60 * 1000);
                exp = _307.expires = d;
            }
            if (exp && exp.toUTCString) {
                _307.expires = exp.toUTCString();
            }
            _306 = encodeURIComponent(_306);
            var _309 = name + "=" + _306,
                _30a;
            for (_30a in _307) {
                _309 += "; " + _30a;
                var _30b = _307[_30a];
                if (_30b !== true) {
                    _309 += "=" + _30b;
                }
            }
            document.cookie = _309;
        }
    };
    dojo.cookie.isSupported = function() {
        if (!("cookieEnabled" in navigator)) {
            this("__djCookieTest__", "CookiesAllowed");
            navigator.cookieEnabled = this("__djCookieTest__") == "CookiesAllowed";
            if (navigator.cookieEnabled) {
                this("__djCookieTest__", "", {
                    expires: -1
                });
            }
        }
        return navigator.cookieEnabled;
    };
}
if (!dojo._hasResource["ibmweb.legacy"]) {
    dojo._hasResource["ibmweb.legacy"] = true;
    dojo.provide("ibmweb.legacy");
    if (typeof(ibmCommon) != "object") {
        ibmCommon = {};
    }
    if (typeof(ibmCommon.data) != "object") {
        ibmCommon.data = {};
    }
    ibmCommon.data.provide = ibmweb.data.provide;
    dojo.addOnLoad(function() {
        if (ibmweb.info.v17 && !document.getElementById("ibm-print-masthead") && !!dojo.byId("ibm-masthead")) {
            dojo.place("<img src=\"" + ibmweb.config.imageUrl + "t/ibm_logo_print.png\" width=\"43\" height=\"15\" id=\"ibm-print-masthead\" alt=\"IBM Print\" />", "ibm-top", "first");
        }
    });
    (function() {
        var dc = document.cookie;
        var _30c = "ibmSurvey=";
        var _30d = dc.indexOf(_30c);
        var now = new Date();
        if (_30d == -1 || (_30d > 0 && dc.indexOf("; " + _30c) == -1)) {
            if (window.location.href.indexOf(".ibm.com") > 0) {
                document.cookie = _30c + now.getTime().toString() + "; path=/; domain=.ibm.com";
            }
        }
    })();
    if (typeof(encodeURIComponent) != "function") {
        encodeURIComponent = escape;
    }
    if (typeof(decodeURIComponent) != "function") {
        decodeURIComponent = unescape;
    }
    dojo.addOnLoad(function() {
        if (ibmweb.meta.encoding != "utf8") {
            dojo.query("#ibm-search-form input[name=\"en\"][value=\"utf\"]").orphan();
        }
    });
    var ibmStats = ibmStats || {};
    if (!!ibmStats.event) {
        ibmStats.event = function(_30e) {
            ibmweb.queue.push(function() {
                return typeof(ibmStats.loaded) != "undefined";
            }, function() {
                ibmStats.event(_30e);
            });
        };
    }
    if (document.cookie.indexOf("ipcInfo=") == -1 && document.cookie.indexOf("lenovoPrefs=") != -1 && !!window && !!window.location && String(window.location.hostname).toLowerCase().indexOf("ibm.com") != -1) {
        document.cookie = "ipcInfo=" + escape("cc=;lc=") + "; path=/; domain=.ibm.com";
        if (document.cookie.indexOf("ipcInfo=") != -1) {
            if (typeof ibmCommonCookie == "undefined") {
                document.write("<scr", "ipt type=\"text/javascript\" src=\"//www.ibm.com/common/cookie/cookie.js\"></scr", "ipt>");
            }
            document.write("<scr", "ipt type=\"text/javascript\" src=\"//www.ibm.com/common/ocaiset.js\"></scr", "ipt>");
        }
    }
    dojo.addOnLoad(function() {
        dojo.cookie("cmTPSet", null, {
            expires: -1,
            domain: ".ibm.com",
            path: "/"
        });
        dojo.cookie("sauidp", null, {
            expires: -1,
            domain: ".ibm.com",
            path: "/"
        });
    });
    if (dojo.isOpera) {
        dojo.addOnLoad(function() {
            if (dojo.byId("ibm-leadspace-head")) {
                dojo.byId("ibm-leadspace-head").style.marginTop = "0px !important";
            }
        });
    }
    dojo.addOnLoad(function() {
        if (ibmweb.meta.cpi == "roro" || ibmweb.meta.cpi == "plpl" || ibmweb.meta.cpi == "rssr" || ibmweb.meta.cpi == "ilhe" || ibmweb.meta.cpi == "sksk" || ibmweb.meta.cpi == "czcs" || ibmweb.meta.cpi == "sisl") {
            var url = dojo.config.modulePaths ? dojo.config.modulePaths.ibmweb.substr(0, dojo.config.modulePaths.ibmweb.indexOf("js/dojo/")) + "v17/css/" : "/common/v17/css/";
            dojo.create("link", {
                type: "text/css",
                title: "www",
                rel: "stylesheet",
                href: url + "font-replacement.css"
            }, dojo.query("head")[0]);
        }
    });
    if (dojo.isIE < 7) {
        dojo.addOnLoad(function() {
            var node = dojo.byId("ibm-leadspace-body");
            if (node) {
                var _30f = dojo.style(node, "backgroundImage");
                if (_30f.indexOf(".png") > -1) {
                    var _30f = _30f.substr(4);
                    _30f = _30f.substr(0, _30f.length - 1);
                    node.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + _30f + ", sizingMethod=crop);";
                    dojo.style(node, "backgroundImage", "none");
                }
            }
        });
    }
    if (dojo.version.major <= 1 && dojo.version.minor < 4 && dojo.isIE) {
        var origAddOnLoad = dojo.addOnLoad;
        dojo.addOnLoad = function() {
            var args = arguments;
            if (document.readyState == "complete") {
                dojo.addOnLoad = origAddOnLoad;
                dojo.addOnLoad.apply(dojo, args);
            } else {
                setTimeout(function() {
                    dojo.addOnLoad.apply(dojo, args);
                }, 10);
            }
        };
    }
}
if (!dojo._hasResource["ibmweb.truste"]) {
    dojo._hasResource["ibmweb.truste"] = true;
    dojo.provide("ibmweb.truste");
    if (ibmweb.config.config === "www") {
        ibmweb.truste.enabled = function() {};
        ibmweb.truste.decision = function() {};
        var id = ibmweb.queue.push(function() {
            return typeof(truste) != "undefined";
        }, function() {
            ibmweb.truste.enabled = function() {
                return true;
            };
            ibmweb.truste.decision = function(_310, dump) {
                if (!_310) {
                    _310 = "ibm.com";
                }
                var json = truste.cma.callApi("getConsentDecision", _310);
                return dump ? json : json.consentDecision;
            };
            var json = "{\"PrivacyManagerAPI\":{\"action\":\"getConsent\",\"timestamp\":" + new Date().getTime() + "}}";
            window.top.postMessage(json, "*");
            var _311 = function() {
                dojo.publish("/ibm/truste-api/update");
            };
            if (window.addEventListener) {
                window.addEventListener("message", _311, false);
            } else {
                if (window.attachEvent) {
                    window.attachEvent("onmessage", _311);
                }
            }
        });
        dojo.addOnLoad(function() {
            var _312 = ["gb", "fr", "de", "uk", "es", "nl", "gr", "at", "hu", "lv", "lt", "pl", "se", "bg", "dk", "fi", "cz", "ee", "pt", "be", "cy", "no", "sk", "ie", "it", "ro", "si", "ch"];
            if (dojo.indexOf(_312, ibmweb.meta.cc) == -1 || typeof(ibmStats) == "undefined") {
                ibmweb.queue.remove(id);
                ibmweb.truste.enabled = function() {
                    return false;
                };
                dojo.publish("/ibm/truste-api/disabling");
            }
        });
        dojo.ready(function() {
            ibmweb.queue.push(function() {
                return (typeof(truste) !== "undefined" && truste.eu && truste.eu.iconid && dojo.byId(truste.eu.iconid) && typeof(truste.eu.clickListener) === "function");
            }, function() {
                var _313 = dojo.query("#ibm-footer > ul > li:last-child"),
                    _314 = dojo.query(dojo.create("a")),
                    _315 = dojo.query(dojo.create("li")).append(_314);
                var meta = document.getElementsByTagName("meta"),
                    _316 = "Cookie Preferences",
                    lc = "",
                    name = "";
                for (var i = 0, j = meta.length; i < j; i += 1) {
                    name = meta[i].httpEquiv || meta[i].name;
                    name = name.toLowerCase();
                    if (name == "dc.language") {
                        lc = meta[i].getAttribute("content").toLowerCase();
                    }
                    switch (lc.substring(0, 2)) {
                        case "en":
                            _316 = "Cookie Preferences";
                            break;
                        case "es":
                            _316 = "Configuración de Cookies";
                            break;
                        case "fr":
                            _316 = "Préférences relatives aux témoins";
                            break;
                        default:
                            _316 = "Cookie Preferences";
                    }
                }
                _314.attr("href", "#").innerHTML(_316).onclick(function(e) {
                    truste.eu.clickListener();
                    e.preventDefault();
                }).onkeyup(function(e) {
                    if (e.keyCode === 13) {
                        truste.eu.clickListener();
                        e.preventDefault();
                    }
                });
                if (_313[0]) {
                    if (dojo.query("> a", _313[0])[0] && dojo.query("> a", _313[0]).innerHTML().indexOf("Feedback") !== -1) {
                        _313.before(_315);
                    } else {
                        _313.after(_315);
                    }
                    dojo.query("#" + truste.eu.iconid).style("display", "none");
                }
            });
        });
    }
}
if (!dojo._hasResource["ibmweb.readmore"]) {
    dojo._hasResource["ibmweb.readmore"] = true;
    dojo.provide("ibmweb.readmore");
    ibmweb.readmore.content = "";
    ibmweb.readmore.defaultLimit = 200;
    ibmweb.readmore.limit = "";
    ibmweb.readmore.init = function() {
        ibmweb.queue.push(function() {
            if (dojo.query(".ibm-readmore").length <= 0) {
                return false;
            } else {
                return true;
            }
        }, function() {
            dojo.query(".ibm-readmore").forEach(function(node, _317) {
                if (node.tagName == "DIV") {
                    var lrm = dojo.create("p", {
                        innerHTML: "<a href='javascript:;' class='ibm-maximize-link' style='display:inline;' aria-label='Click to Expand'>Show&nbsp;more</a>",
                        style: {
                            margin: "0px"
                        }
                    });
                    var lrl = dojo.create("p", {
                        innerHTML: "<a href='javascript:;' class='ibm-minimize-link' style='display:inline;' aria-label='Click to Shrink'>Show&nbsp;less</a>",
                        style: {
                            margin: "0"
                        }
                    });
                } else {
                    if (node.tagName == "UL" || node.tagName == "OL") {
                        var lrm = dojo.create("li", {
                            innerHTML: "<a href='javascript:;' class='ibm-maximize-link' style='display:inline;text-decoration:none;' aria-label='Click to Expand'>Show&nbsp;more</a>",
                            style: {
                                margin: "0",
                                background: "none",
                                listStyle: "none"
                            }
                        });
                        var lrl = dojo.create("li", {
                            innerHTML: "<a href='javascript:;' class='ibm-minimize-link' style='display:inline;text-decoration:none;' aria-label='Click to Shrink'>Show&nbsp;less</a>",
                            style: {
                                margin: "0",
                                background: "none",
                                listStyle: "none"
                            }
                        });
                    } else {
                        var lrm = dojo.create("span", {
                            innerHTML: "<a href='javascript:;' class='ibm-maximize-link' style='display:inline;text-decoration:none;' aria-label='Click to Expand'>Show&nbsp;more</a>",
                            style: {
                                margin: "0px 0px 0px 11px"
                            }
                        });
                        var lrl = dojo.create("span", {
                            innerHTML: "<a href='javascript:;' class='ibm-minimize-link' style='display:inline;text-decoration:none;' aria-label='Click to Shrink'>Show&nbsp;less</a>",
                            style: {
                                margin: "0px 0px 0px 11px"
                            }
                        });
                    }
                }
                ibmweb.readmore.readLength(node);
                var _318 = node.innerHTML.trim();
                dojo.connect(lrm, "onclick", function(e) {
                    node.innerHTML = _318;
                    lrl.innerHTML = "<a href='javascript:;' class='ibm-minimize-link' style='display:inline;text-decoration:none;' aria-label='click to Shrink'>Show&nbsp;less</a>";
                    dojo.place(lrl, node);
                });
                _318 = _318.replace(new RegExp(">[\n\t ]+<", "g"), "><");
                _318 = _318.replace(/<!--[\s\S]*?-->/g, "");
                var _319 = ibmweb.readmore.htmlSubstring(_318, ibmweb.readmore.limit);
                var ind = _318.trim().indexOf(_319) + _319.length;
                node.innerHTML = _319;
                dojo.place(lrm, node);
                dojo.connect(lrl, "onclick", function(e) {
                    ibmweb.readmore.readLength(node);
                    node.innerHTML = ibmweb.readmore.htmlSubstring(_318, ibmweb.readmore.limit);
                    lrm.innerHTML = "<a href='javascript:;' class='ibm-maximize-link' style='display:inline;text-decoration:none;' aria-label='click to Expand'>Show&nbsp;more</a>";
                    dojo.place(lrm, node);
                });
            });
        });
    };
    ibmweb.readmore.readLength = function(elem) {
        ibmweb.readmore.limit = ibmweb.readmore.defaultLimit;
        var _31a = dojo.query(".ibm-readmore-length", elem)[0];
        if (_31a.parentElement.tagName == "LI") {
            dojo.style(_31a.parentElement, "display", "none");
        } else {
            dojo.style(_31a, "display", "none");
        }
        if (typeof _31a != "undefined") {
            if (/^\d+$/.test(_31a.innerHTML)) {
                ibmweb.readmore.limit = _31a.innerHTML;
            } else {}
        }
    };
    ibmweb.readmore.htmlSubstring = function(s, n) {
        var m, r = /<([^>\s]*)[^>]*>/g,
            _31b = [],
            _31c = 0,
            _31d = "",
            _31e = 0;
        n = (parseInt(n) + parseInt(n.length));
        while ((m = r.exec(s)) && n) {
            _31e = 0;
            var temp = s.substring(_31c, m.index).substr(0, n);
            if (temp.match(/\s/g) != null) {
                _31e = temp.match(/\s/g).length;
            }
            temp = s.substring(_31c, m.index).substr(0, n);
            _31d += temp;
            n -= temp.length;
            if (n == 0 && (s.substring(_31c, m.index).substr(temp.length, 1) != " " || temp.length == s.substring(_31c, m.index).length)) {
                _31d = _31d.replace(new RegExp("><", "g"), "> <");
                if (temp.length != s.substring(_31c, m.index).length) {
                    _31d = _31d.substr(0, _31d.lastIndexOf(" "));
                } else {
                    _31d = _31d.substr(0, _31d.length);
                }
            }
            _31c = r.lastIndex;
            if (n) {
                _31d += m[0];
                if (m[1].indexOf("/") === 0) {
                    _31b.pop();
                } else {
                    if (m[1].lastIndexOf("/") !== m[1].length - 1) {
                        _31b.push(m[1]);
                    }
                }
            }
        }
        if (n != 0) {
            if (s.substr(_31c, n).match(/\s/g) != null) {
                _31e = s.substr(_31c, n).match(/\s/g).length;
            }
            _31d += s.replace(/\s{2,}/g, "").substr(_31c, (n));
            if (s.replace(/\s{2,}/g, "").substr(_31d.length, 1) != " ") {
                _31d = _31d.substr(0, _31d.lastIndexOf(" "));
            }
        }
        _31d += "...";
        while (_31b.length) {
            _31d += "</" + _31b.pop() + ">";
        }
        return _31d;
    };
    dojo.ready(function() {
        ibmweb.readmore.init();
    });
}
if (!dojo._hasResource["ibmweb.filebrowse"]) {
    dojo._hasResource["ibmweb.filebrowse"] = true;
    dojo.provide("ibmweb.filebrowse");
    dojo.ready(function() {
        var _31f = {
            id: "filebrowse",
            init: function() {
                dojo.query("form.ibm-styled-form input[type=file].ibm-multi-file-browser, form.ibm-styled-form input[type=file].ibm-single-file-browser").forEach(function(_320) {
                    var form = _320.parentElement;
                    while (form.tagName != "FORM") {
                        form = form.parentElement;
                    }
                    if (form.className.indexOf("ibm-column-form") < 0 && form.className.indexOf("ibm-row-form") < 0) {
                        return false;
                    }
                    var span = dojo.create("span", {});
                    var _321 = dojo.create("span", {
                        className: "ibm-filebrowser"
                    }, span);
                    dojo.place(span, _320.parentElement, "replace");
                    var _322 = dojo.create("a", {
                        className: "ibm-upload-link",
                        role: "button",
                        href: "javascript:;",
                        innerHTML: "Browse",
                        "aria-label": "Browse for a file..."
                    }, _321);
                    var _323 = dojo.query(_320);
                    dojo.place(_322, _321);
                    dojo.place(_323[0], _321);
                    dojo.connect(_322, "onclick", _31f.onclick);
                    dojo.connect(_320, "onchange", _31f.onchange);
                    dojo.query(_320).forEach(function(node, _324) {
                        var name = dojo.attr(node, "name");
                        if (!name && dojo.hasClass(node, "ibm-single-file-browser")) {
                            dojo.attr(node, "name", "uploadFile");
                        } else {
                            if (!name && dojo.hasClass(node, "ibm-multi-file-browser")) {
                                dojo.attr(node, "name", "uploadFile[]");
                            } else {
                                if (name && dojo.hasClass(node, "ibm-multi-file-browser")) {
                                    dojo.attr(node, "name", dojo.attr(node, "name") + "[]");
                                }
                            }
                        }
                    });
                });
            },
            onclick: function(e) {
                var _325 = e.currentTarget;
                if (dojo.hasClass(e.currentTarget, "ibm-delete-link")) {
                    if (dojo.query(e.currentTarget.parentElement.parentElement).children(".ibm-filebrowser").length === 1) {
                        dojo.destroy(e.currentTarget.nextSibling.nextSibling);
                        dojo.removeClass(e.currentTarget, "ibm-delete-link");
                        dojo.addClass(e.currentTarget, "ibm-upload-link");
                        e.currentTarget.innerHTML = "Browse";
                        dojo.attr(e.currentTarget, "aria-label", "Browse for a file...");
                        var _326 = dojo.query(_325.parentElement).children(".ibm-multi-file-browser")[0];
                        if (!_326) {
                            return;
                        }
                        var _327 = dojo.query(e.currentTarget.parentElement.parentElement).children(".ibm-addlink-display")[0];
                        if (_327) {
                            dojo.removeClass(_327, "ibm-addlink-display");
                            dojo.addClass(_327, "ibm-addlink");
                        }
                    } else {
                        var _328 = e.currentTarget.parentElement.nextSibling;
                        while (_328.tagName != "SPAN") {
                            _328 = _328.nextSibling;
                        }
                        var _329 = e.currentTarget.parentElement.parentElement;
                        dojo.destroy(e.currentTarget.parentElement);
                        var _32a = dojo.query(_329).children(".ibm-filebrowser").last();
                        var _32b = "";
                        if (_32a) {
                            var _32c = dojo.query(_32a).children("input")[0];
                            _32b = dojo.attr(_32c, "value");
                        }
                        var _32d = dojo.query(_329).children(".ibm-addlink-display")[0];
                        dojo.attr(dojo.query(".ibm-add1-link", _32d)[0], "aria-label", "Browse for another file ... Already selected " + _32b);
                        dojo.query("a", _328)[0].focus();
                        dojo.destroy(e.currentTarget.parentElement);
                    }
                } else {
                    dojo.query("input[type=file]", _325.parentElement)[0].click();
                }
            },
            onchange: function(evt) {
                var form = evt.currentTarget.parentElement;
                while (form.tagName != "FORM") {
                    form = form.parentElement;
                }
                var _32e = dojo.query(evt.currentTarget);
                var _32f = _32e.val().split("\\");
                if (_32f.length > 1) {
                    name = _32f[_32f.length - 1];
                } else {
                    name = _32f[0];
                }
                if (form.className.indexOf("column-form") > 0 && name.length > 30) {
                    name = name.substring(0, 14) + "..." + name.substring((name.length - 10), name.length);
                } else {
                    if (form.className.indexOf("row-form") > 0 && name.length > 15) {
                        name = name.substring(0, 6) + "..." + name.substring((name.length - 7), name.length);
                    }
                }
                var _330 = dojo.create("span", {});
                dojo.place(_330, _32e[0], "after");
                _32e.next().text("(" + name + ")");
                _32e.prev().text("Remove");
                _32e.prev().attr("aria-label", "Remove " + _32f);
                _32e.prev()[0].className = "ibm-delete-link";
                if (_32e[0].className.indexOf("ibm-multi-file-browser") == -1) {
                    return;
                }
                var _331 = dojo.query(_32e[0].parentElement.parentElement).children(".ibm-addlink-display, .ibm-addlink")[0];
                if (!_331) {
                    var _332 = dojo.create("span", {
                        className: "ibm-addlink-display"
                    });
                    var _333 = dojo.create("a", {
                        className: "ibm-add1-link",
                        role: "button",
                        "aria-label": "Browse for another file ... Already selected " + _32f,
                        href: "javascript:;",
                        innerHTML: "Add more"
                    });
                    dojo.connect(_333, "onclick", _31f.createBrowse);
                    dojo.place(_333, _332);
                    dojo.place(_332, _32e[0].parentElement.parentElement);
                    _333.focus();
                } else {
                    dojo.removeClass(_331, "ibm-addlink");
                    dojo.addClass(_331, "ibm-addlink-display");
                    dojo.attr(dojo.query(".ibm-add1-link", _331)[0], "aria-label", "Browse for another file ... Already selected " + _32f);
                }
            },
            createBrowse: function(e) {
                var form = e.currentTarget.parentElement;
                while (form.tagName != "FORM") {
                    form = form.parentElement;
                }
                var _334 = dojo.create("span", {
                    className: "ibm-filebrowser"
                });
                var _335 = dojo.create("a", {
                    className: "ibm-upload-link",
                    role: "button",
                    href: "javascript:;",
                    innerHTML: "Browse",
                    "aria-label": "Browse for a file..."
                });
                var _336 = dojo.create("input", {
                    className: "ibm-multi-file-browser",
                    type: "file",
                    name: "uploadFile[]"
                });
                dojo.place(_335, _334);
                dojo.place(_336, _334);
                var _337 = dojo.query(".ibm-filebrowser", form)[0].parentElement;
                dojo.place(_334, dojo.query(".ibm-addlink-display", _337)[0], "before");
                dojo.connect(_335, "onclick", _31f.onclick);
                dojo.connect(_336, "onchange", _31f.onchange);
                dojo.removeClass(e.currentTarget.parentElement, "ibm-addlink-display");
                dojo.addClass(e.currentTarget.parentElement, "ibm-addlink");
                _336.click();
            }
        };
        _31f.init();
    });
}
if (!dojo._hasResource["ibmweb.filesize"]) {
    dojo._hasResource["ibmweb.filesize"] = true;
    dojo.provide("ibmweb.filesize");
    dojo.ready(function() {
        var _338 = {
            youtubeLinks: [],
            youtubeVideoTimings: [],
            init: function() {
                var _339 = [".ibm-document-link", ".ibm-pdf-link", ".ibm-video-link"];
                for (var i = 0; i < _339.length; i++) {
                    dojo.query(_339[i]).forEach(function(node, _33a) {
                        if (dojo.query(".ibm-item-note", node).length <= 0) {
                            if (node.getAttribute("href") && node.getAttribute("href").indexOf("youtube.com") > 0) {
                                var _33b = node.getAttribute("href").substring(node.getAttribute("href").indexOf("?") + 1, node.getAttribute("href").length);
                                var _33c = dojo.queryToObject(_33b);
                                if (typeof _33c["v"] !== "undefined" && _33c["v"] != "") {
                                    if (/^[A-Za-z0-9_-]{8,11}$/.test(_33c["v"])) {
                                        _338.youtubeLinks.push(node);
                                    } else {}
                                } else {}
                            } else {
                                try {
                                    dojo.xhr("HEAD", {
                                        url: node.getAttribute("href"),
                                        handle: function(_33d, _33e) {
                                            var _33f = _338.formatSize(_33e.xhr.getResponseHeader("Content-Length"));
                                            _338.displayNote(node, _33f);
                                        }
                                    });
                                } catch (e) {}
                            }
                        }
                    });
                }
                if (_338.youtubeLinks.length > 0) {}
            },
            displayNote: function(node, _340) {
                if ((_340 != null && _340.indexOf("0.00") < 0) && !(node.getAttribute("href") == "#" || node.getAttribute("href") == "")) {
                    var _341 = dojo.query(".ibm-item-note", node);
                    if (_341.length == 0) {
                        dojo.create("span", {
                            className: "ibm-item-note",
                            innerHTML: " (" + _340 + ")"
                        }, node);
                    } else {
                        if (_341.innerHTML().indexOf(",") > 0) {
                            var cont = _341.innerHTML().split(",");
                            if (cont[0].indexOf("(") < 0) {
                                _340 = cont[0] + ", " + _340;
                            } else {
                                _340 = cont[0].replace("(", "") + ", " + _340;
                            }
                        }
                        _341.innerHTML(" (" + _340 + ")");
                    }
                }
            },
            formatSize: function(_342) {
                if (_342 != null) {
                    if (_342 >= 1073741824) {
                        _342 = (_342 / 1073741824).toFixed(0) + "GB";
                    } else {
                        if (_342 >= 1048576) {
                            _342 = (_342 / 1048576).toFixed(0) + "MB";
                        } else {
                            _342 = (_342 / 1024).toFixed(0) + "KB";
                        }
                    }
                }
                return _342;
            },
            getYoutubeTiming: function() {
                if (_338.youtubeLinks.length > 0) {
                    for (var i = 0; i < _338.youtubeLinks.length; i++) {
                        var node = _338.youtubeLinks[i];
                        var _343 = node.getAttribute("href").substring(node.getAttribute("href").indexOf("?") + 1, node.getAttribute("href").length);
                        var _344 = dojo.queryToObject(_343);
                        if (typeof _344["v"] !== "undefined") {
                            dojo.io.script.get({
                                url: "http://gdata.youtube.com/feeds/api/videos/" + _344["v"] + "?v=2&alt=jsonc&callback=ibmweb.filesize.youtubeFeedCallback&prettyprint=true",
                                error: function(_345, _346) {
                                    for (var key in _338.youtubeLinks) {
                                        var _347 = _346.url.substring(_346.url.indexOf("api/videos/") + 11, _346.url.indexOf("?v="));
                                        if (_338.youtubeLinks[key].href.indexOf(_347) > 0) {
                                            break;
                                        }
                                    }
                                    _338.youtubeLinks.splice(key, 1);
                                }
                            });
                        }
                    }
                    ibmweb.queue.push(function() {
                        if (_338.youtubeVideoTimings.length == _338.youtubeLinks.length) {
                            return true;
                        } else {
                            return false;
                        }
                    }, function() {
                        for (var i = 0; i < _338.youtubeLinks.length; i++) {
                            var node = _338.youtubeLinks[i];
                            var _348 = node.getAttribute("href").substring(node.getAttribute("href").indexOf("?") + 1, node.getAttribute("href").length);
                            var _349 = dojo.queryToObject(_348);
                            var j = 0;
                            while (_338.youtubeVideoTimings[j]) {
                                if (_349["v"] == _338.youtubeVideoTimings[j].id) {
                                    _338.displayNote(node, _338.youtubeVideoTimings[j].time);
                                    break;
                                }
                                j++;
                                if (j == _338.youtubeVideoTimings.length) {
                                    j = 0;
                                }
                            }
                        }
                    });
                }
            },
            youtubeFeedCallback: function(json) {
                if (typeof json.data != "undefined") {
                    var secs = json.data.duration;
                    var hr = Math.floor(secs / 3600);
                    var min = Math.floor((secs - (hr * 3600)) / 60);
                    var sec = Math.floor(secs - (hr * 3600) - (min * 60));
                    if (hr < 10) {
                        hr = "0" + hr;
                    }
                    if (min < 10) {
                        min = "0" + min;
                    }
                    if (sec < 10) {
                        sec = "0" + sec;
                    }
                    _338.youtubeVideoTimings.push({
                        id: json.data.id,
                        time: hr + ":" + min + ":" + sec
                    });
                }
            }
        };
        ibmweb.filesize.youtubeFeedCallback = _338.youtubeFeedCallback;
        _338.init();
    });
}
if (!dojo._hasResource["ibmweb._base"]) {
    dojo._hasResource["ibmweb._base"] = true;
    dojo.provide("ibmweb._base");
    (function() {
        var path = ibmweb.moduleDomain.get().slice(0, -1);
        if (ibmweb.config.config === "www") {
            path += ibmweb.config.eluminate.path + "eluminate.js";
        } else {
            if (ibmweb.config.config === "w3") {
                path += ibmweb.config.w3_eluminate.path + "w3_eluminate.js";
            }
        }
        script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", path);
        document.getElementsByTagName("head")[0].appendChild(script);
    })();
}
if (!dojo._hasResource["ibmweb.bitly"]) {
    dojo._hasResource["ibmweb.bitly"] = true;
    dojo.provide("ibmweb.bitly");
    dojo.declare("ibmweb.bitly", [], {
        url: null,
        onSuccess: null,
        onError: null,
        shorturl: null,
        rawData: null,
        constructor: function(_34a) {
            dojo.mixin(this, _34a);
        },
        shorten: function() {
            if (!this.url) {
                this.url = location.href;
            }
            dojo.io.script.get({
                url: "http://api.bit.ly/v3/shorten?login=" + ibmweb.config.bitly.login + "&apiKey=" + ibmweb.config.bitly.key + "&longUrl=" + escape(this.url) + "&format=json&callback=" + ibmweb.callback.createJSONPWrapper(this, "_callback"),
                timeout: ibmweb.config.bitly.timeout,
                error: dojo.hitch(this, function(_34b, _34c) {
                    this._error();
                })
            });
        },
        _callback: function(data) {
            if (!data || !data.status_code || !data.status_code == 200) {
                this._error();
            }
            this.shorturl = data.data.url;
            this.rawData = data;
            if (this.onSuccess) {
                this.onSuccess(data.data.url);
            }
        },
        _error: function() {
            this.shorturl = this.url;
            if (this.onError) {
                this.onError(this.url);
            } else {
                if (this.onSuccess) {
                    this.onSuccess(this.url);
                }
            }
        }
    });
}
if (!dojo._hasResource["ibmweb.sbs"]) {
    dojo._hasResource["ibmweb.sbs"] = true;
    dojo.provide("ibmweb.sbs");
    (function() {
        var _34d = {
            "cc": "us",
            "lc": "en",
            "encoding": "utf8",
            "element": "ibm-sbs-icons",
            "loadManually": false,
            init: function(_34e) {
                if (document.getElementsByTagName("head").length != 1) {
                    return;
                }
                if (!!_34e) {
                    if (!!_34e.cc) {
                        this.cc = _34e.cc;
                    }
                    if (!!_34e.lc) {
                        this.lc = _34e.lc;
                    }
                    if (!!_34e.encoding) {
                        this.encoding = _34e.encoding;
                    }
                    if (!!_34e.element) {
                        this.element = _34e.element;
                    }
                    if (!!_34e.loadManually) {
                        this.loadManually = _34e.loadManually;
                    }
                }
                if (!this.loadManually) {
                    var _34f = document.createElement("link");
                    _34f.href = "//www.ibm.com/common/v16/css/sbs.css";
                    _34f.rel = "stylesheet";
                    _34f.type = "text/css";
                    document.getElementsByTagName("head")[0].appendChild(_34f);
                    var _350 = document.createElement("script");
                    _350.src = "//www.ibm.com/common/js/sbs/" + this.cc + "/" + this.lc + "/" + this.cc + this.lc + "-" + this.encoding + ".js";
                    _350.type = "text/javascript";
                    document.getElementsByTagName("head")[0].appendChild(_350);
                }
            },
            getUrl: function() {
                return location.href;
            },
            render: function(data, _351) {
                if (!_351) {
                    _351 = this.element;
                }
                if (typeof(_351) == "string") {
                    _351 = document.getElementById(_351);
                }
                if (_351 == null) {
                    return;
                }
                if (_351.childNodes.length != 0) {
                    return;
                }
                var _352 = this.getUrl();
                if (document.getElementsByTagName("title").length == 0) {
                    return;
                }
                var _353 = document.getElementsByTagName("title")[0].innerHTML;
                var ul = document.createElement("ul");
                for (var i = 0, j = data.length; i < j; i++) {
                    var $i = data[i];
                    if ($i.id == "print" || $i.id == "w3-print") {
                        var li = this.getPTPLink($i);
                        if (li) {
                            ul.appendChild(li);
                        }
                        continue;
                    }
                    if ($i.id == "email" || $i.id == "w3-email") {
                        var li = this.getETPLink($i);
                        if (li) {
                            ul.appendChild(li);
                        }
                        continue;
                    }
                    if (!$i.url) {
                        continue;
                    }
                    $i.targeturl = $i.url.replace(/%\{URL\}/g, encodeURIComponent(_352)).replace(/%\{TITLE\}/g, encodeURIComponent(_353));
                    var a = this.createLink($i);
                    var li = document.createElement("li");
                    li.appendChild(a);
                    ul.appendChild(li);
                }
                _351.appendChild(ul);
                _351.onmouseover = function() {
                    _351.className += " ibm-active";
                };
                _351.onmouseout = function() {
                    _351.className = _351.className.replace(/\s+ibm-active/, "");
                };
                _351.style.display = "block";
            },
            createLink: function($i) {
                var a = dojo.create("a", {
                    className: "ibm-share-" + $i.id,
                    title: $i.title,
                    innerHTML: $i.title,
                    href: (!!$i.targeturl) ? $i.targeturl : "#",
                    rel: $i.id,
                    onmousedown: function() {
                        this.className += " ibm-share-active-" + this.rel;
                    },
                    onmouseout: function() {
                        this.className = this.className.replace(/\s+ibm-share-active-.*/, "");
                    },
                    onclick: function(e) {
                        ibmweb.sbs.clickHandler(e, $i);
                    }
                });
                if (document.getElementById("ibm-com").className.indexOf("dijit_a11y") != -1) {
                    a.innerHTML = "";
                    var img = document.createElement("img");
                    img.className = "ibm-access";
                    img.src = ibmweb.config.imageUrl + "icons/sprites-pt-all.png";
                    img.alt = $i.title;
                    a.appendChild(img);
                }
                return a;
            },
            clickHandler: function() {
                return true;
            },
            getPTPLink: function() {
                return null;
            },
            getETPLink: function() {
                return null;
            }
        };
        ibmweb.sbs = _34d;
    })();
    ibmweb.sbs.getUrl = ibmweb.util.getUrl;
    ibmweb.sbs.clickHandler = function(_354, data) {
        if (data.id == "ibm-dogear") {
            _354.preventDefault();
            window.open(data.targeturl, data.title, "width=600,height=550");
            return false;
        }
        if (!data.url) {
            return;
        }
        _354.preventDefault();
        var a = _354.target;
        ibmweb.util.statsHelper({
            "ibmEV": "external link",
            "ibmEvAction": a.href,
            "ibmEvGroup": "SBS icons",
            "ibmEvName": "sbs-" + a.rel
        });
        dojo.style(a, "cursor", "wait");
        if (dojo.hasClass(a, "clicked")) {
            return;
        }
        dojo.addClass(a, "clicked");
        if (data && data.id == "stumble") {
            var url = data.url.replace(/%\{URL\}/g, encodeURIComponent(document.location.href)).replace(/%\{TITLE\}/g, encodeURIComponent(ibmweb.meta.title));
            window.location = url;
            return true;
        }
        var b = new ibmweb.bitly({
            url: ibmweb.util.getUrl(),
            onSuccess: function(_355) {
                dojo.style(a, "cursor", "auto");
                dojo.removeClass(a, "clicked");
                var url = data.url.replace(/%\{URL\}/g, encodeURIComponent(_355)).replace(/%\{TITLE\}/g, encodeURIComponent(ibmweb.meta.title));
                setTimeout(function() {
                    window.location = url;
                }, 0);
            }
        });
        b.shorten();
        return true;
    };
    ibmweb.sbs.getETPLink = function(data) {
        if (ibmweb.config.sbs.email != true) {
            return null;
        }
        var a = this.createLink(data);
        dojo.connect(a, "onclick", null, function(_356) {
            dojo.stopEvent(_356);
            var link = _356.target;
            ibmweb.util.statsHelper({
                "ibmEV": "external link",
                "ibmEvAction": link.href,
                "ibmEvGroup": "SBS icons",
                "ibmEvName": "sbs-email"
            });
            ibmweb.dynnav.executeOnModule("emailthispage", "showForm", []);
            return false;
        });
        var li = document.createElement("li");
        li.appendChild(a);
        return li;
    };
    ibmweb.sbs.getPTPLink = function(data) {
        if (ibmweb.config.sbs.print != true) {
            return null;
        }
        var a = this.createLink(data);
        dojo.connect(a, "onclick", null, function(_357) {
            dojo.stopEvent(_357);
            var link = _357.target;
            ibmweb.util.statsHelper({
                "ibmEV": "external link",
                "ibmEvAction": link.href,
                "ibmEvGroup": "SBS icons",
                "ibmEvName": "sbs-print"
            });
            javascript: print();
            return false;
        });
        var li = document.createElement("li");
        li.appendChild(a);
        return li;
    };
    ibmweb.sbs.register = function(elem, all) {
        if (!(typeof(ibmweb.dynnav.PMM) == "object" && !!ibmweb.dynnav.PMM.footerToolData)) {
            window.setTimeout(function() {
                ibmweb.sbs.register(elem, all);
            }, 50);
            return;
        }
        if (ibmweb.dynnav.PMM.footerToolData.length == 0) {
            return false;
        }
        ibmweb.sbs.init({
            "cc": ibmweb.meta.cc,
            "lc": ibmweb.meta.lc,
            "encoding": ibmweb.meta.encoding,
            "loadManually": true,
            "element": null
        });
        if (!elem) {
            elem = ".ibm-share-this";
        }
        elem = dojo.query(elem);
        elem.forEach(function(node) {
            ibmweb.sbs.render(ibmweb.dynnav.PMM.footerToolData, node, all);
        });
    };
    dojo.addOnLoad(ibmweb.sbs.register);
}
if (!dojo._hasResource["ibmweb.ribbon"]) {
    dojo._hasResource["ibmweb.ribbon"] = true;
    dojo.provide("ibmweb.ribbon");
    dojo.provide("ibmweb.ribbonSlide");
    dojo.provide("ibmweb.ribbonItem");
    dojo.provide("ibmweb.ribbonItemAbstract");
    dojo.provide("ibmweb.ribbonLeadspace");
    dojo.declare("ibmweb.ribbon", [dijit._Widget, dijit._Templated], {
        columns: 3,
        autoscroll: false,
        freeScroll: false,
        interval: 5000,
        leadNoHomeInterval: 15000,
        _interval: null,
        _intervalHandlers: {
            resize: null,
            onmouseleave: null,
            onmouseenter: null
        },
        rotationCount: 0,
        _rotationCount: 0,
        defaultDuration: 500,
        _isBeingAnimated: false,
        _isBegingAutoscroll: false,
        _isLeadSpace: false,
        _isLeadNoHome: false,
        _scrollableNodeAnimObj: null,
        templateString: "<div class='ibm-container-body' dojoAttachPoint='ribbonContainer'>" + "<a class='ibm-ribbon-prev' dojoAttachPoint='scrollLeftButton' role='button' href='#'></a>" + "<div class='ibm-ribbon-pane' dojoAttachPoint='scrollContainer'>" + "<div class='ibm-ribbon-section' dojoAttachPoint='scrollableNode' role='listbox'></div>" + "</div>" + "<a class='ibm-ribbon-next' dojoAttachPoint='scrollRightButton' role='button' href='#'></a>" + "<div class='ibm-ribbon-nav' dojoAttachPoint='navNode' role='toolbar'></div>" + "</div>",
        constructor: function(_358) {
            this.slides = [];
            this.currentSlideIndex = 0;
            this.originalNode = null;
            this.duration = this.defaultDuration;
            this._durationCopy = this.duration;
            !!_358 && _358.srcNodeRef && (this.originalNode = _358.srcNodeRef);
        },
        postCreate: function() {
            var self = this;
            if (self.originalNode) {
                dojo.query(".ibm-columns", this.originalNode).forEach(function(_359, _35a) {
                    var _35b = null;
                    if (_359.id) {
                        _35b = _359.id;
                    }
                    dojo.query("> *", _359).forEach(function(item, j) {
                        self.addItem(new ibmweb.ribbonItemAbstract({
                            srcNodeRef: item
                        }), _35a, _35b);
                    });
                });
                if (self.originalNode.id) {
                    self.domNode.id = self.originalNode.id;
                }
            }
            var _35c = this.domNode.parentNode ? dojo.hasClass(this.domNode.parentNode, "ibm-no-rotate") : true;
            if (this._isLeadSpace && !this.checkHome() && !_35c) {
                this._isLeadNoHome = true;
                this.autoscroll = true;
                this.interval = this.leadNoHomeInterval;
            }
        },
        startup: function() {
            if (!dojo.hasClass(this.ribbonContainer.parentNode, "ibm-ribbon-fixed")) {
                var temp = dojo.coords(this.scrollableNode).h;
                var ob = dojo.query("object", this.id);
                if (ob.length > 0) {
                    var max = 0;
                    ob.forEach(function(i) {
                        if (i.height) {
                            if (i.height > max) {
                                max = i.height;
                            }
                        }
                    });
                    if (max > temp) {
                        temp = max;
                    }
                }
                dojo.style(this.scrollContainer, "height", temp + "px");
            }
            dojo.style(this.scrollLeftButton, {
                marginTop: (dojo.coords(this.scrollContainer).h / 2) - 12 + "px"
            });
            dojo.style(this.scrollRightButton, {
                marginTop: "-" + ((dojo.coords(this.scrollContainer).h) / 2 + 12) + "px"
            });
            if (ibmweb.meta.cpi == "ilhe" && this._isLeadSpace && this._isLeadNoHome) {
                var pos = (dojo.window.getBox().w - 1050) / 2;
                dojo.style(this.scrollLeftButton, {
                    left: "auto",
                    right: (pos < 1 ? 1 : pos) + "px"
                });
                dojo.style(this.scrollRightButton, {
                    right: "auto",
                    left: (pos < 1 ? 1 : pos) + "px"
                });
            }
            dojo.addClass(this.scrollLeftButton, "ibm-disabled");
            if (this.slideCount() <= 1) {
                dojo.addClass(this.scrollRightButton, "ibm-disabled");
                dojo.query(this.navNode).orphan();
            } else {
                dojo.query(":first-child", this.navNode).addClass("ibm-active");
                dojo.query(":first-child", this.navNode)[0].tabIndex = 0;
                dojo.connect(this.scrollLeftButton, "onclick", dojo.hitch(this, this.slideLeft));
                dojo.connect(this.scrollRightButton, "onclick", dojo.hitch(this, this.slideRight));
            }
            if (this.ribbonContainer.parentNode.id != "ibm-promotion-module") {
                dojo.query("div[role=\"document\"] a, div[role=\"document\"] input, div[role=\"document\"]", this.scrollableNode).forEach(function(n) {
                    n.tabIndex = -1;
                });
                var _35d = dojo.query("div[role=\"option\"]", this.scrollableNode);
                if (_35d.length > 0) {
                    dojo.query("div[role=\"document\"] a, div[role=\"document\"] input, div[role=\"document\"]", _35d[0]).forEach(function(n) {
                        n.tabIndex = 0;
                    });
                }
            }
            ibmweb.queue.push(function() {
                return ibmweb.dynnav.isDataLoaded;
            }, dojo.hitch(this, function() {
                dojo.attr(this.scrollLeftButton, "title", ibmweb.dynnav.PMM.buttonData.prev);
                this.scrollLeftButton.innerHTML = ibmweb.dynnav.PMM.buttonData.prev;
                dojo.attr(this.scrollRightButton, "title", ibmweb.dynnav.PMM.buttonData.next);
                this.scrollRightButton.innerHTML = ibmweb.dynnav.PMM.buttonData.next;
            }));
            if (this.autoscroll) {
                if (!this._isLeadNoHome) {
                    var _35e = this.slides[0].domNode,
                        _35f = dojo.clone(_35e);
                    dojo.addClass(_35f, "ibm-cloned");
                    dojo.removeAttr(_35f, "id");
                    dojo.query("div", _35f).removeAttr("id");
                    dojo.place(_35f, this.scrollableNode);
                }
                var self = this;
                this._interval = setInterval(function() {
                    self.next();
                }, this.interval);
                if (!this.freeScroll) {
                    this._intervalHandlers.onmouseenter = dojo.connect(this.domNode, "onmouseenter", dojo.hitch(this, function() {
                        clearInterval(this._interval);
                    }));
                    this._intervalHandlers.onmouseleave = dojo.connect(this.domNode, "onmouseleave", dojo.hitch(this, function() {
                        clearInterval(this._interval);
                        this._interval = setInterval(function() {
                            self.next();
                        }, this.interval);
                    }));
                    this._intervalHandlers.resize = dojo.connect(window, "resize", dojo.hitch(this, function() {
                        clearInterval(this._interval);
                    }));
                }
            }
            if (ibmweb.info.iDevice) {
                var _360 = 0;
                this.domNode.ontouchstart = function(e) {
                    _360 = e.touches[0].clientX;
                };
                this.domNode.ontouchmove = function(e) {
                    e.preventDefault();
                };
                this.domNode.ontouchend = dojo.hitch(this, function(e) {
                    swipeEnd = e.changedTouches[0].clientX;
                    var diff = swipeEnd - _360;
                    if (diff < 0) {
                        this.slideRight();
                    } else {
                        if (diff > 0) {
                            this.slideLeft();
                        }
                    }
                });
            }
            dojo.forEach(this.slides, function(w) {
                if (w && !w._started && w.startup) {
                    w.startup();
                }
            });
            this.inherited(arguments);
        },
        addSlide: function(_361) {
            this.slides.push(_361);
            dojo.place(_361.domNode, this.scrollableNode);
            if (!this.scrollableNode.id) {
                this.scrollableNode.id = this.ribbonContainer.id + "_scrollable";
            }
            var _362 = dojo.create("a", {
                href: "#",
                innerHTML: "Show carousel " + this.slides.length,
                "role": "button",
                "aria-controls": this.scrollableNode.id,
                "IbmCarouselIndex": this.slides.length - 1
            }, this.navNode);
            _362.tabIndex = -1;
            dojo.connect(_362, "onclick", dojo.hitch(this, function(_363) {
                if (dojo.hasClass(_363.target, "ibm-ribbon-view")) {
                    slideToIdx = dojo.attr(_363.target.parentNode, "IbmCarouselIndex") * 1;
                } else {
                    slideToIdx = dojo.attr(_363.target, "IbmCarouselIndex") * 1;
                }
                this.slideTo(slideToIdx, _363);
            }));
            dojo.connect(_362, "keypress", dojo.hitch(this, function(_364) {
                if (_364.keyCode == dojo.keys.TAB && !_364.shiftKey) {
                    _364.target.parentNode.lastChild.focus();
                }
                if (_364.keyCode == dojo.keys.TAB && _364.shiftKey) {
                    _364.target.parentNode.firstChild.focus();
                }
                if (_364.keyCode == dojo.keys.DOWN_ARROW || _364.keyCode == dojo.keys.RIGHT_ARROW) {
                    if (!!_364.target.nextSibling) {
                        dojo.stopEvent(_364);
                        _364.target.nextSibling.focus();
                    } else {
                        dojo.stopEvent(_364);
                        _364.target.parentNode.firstChild.focus();
                    }
                }
                if (_364.keyCode == dojo.keys.UP_ARROW || _364.keyCode == dojo.keys.LEFT_ARROW) {
                    if (!!_364.target.previousSibling) {
                        dojo.stopEvent(_364);
                        _364.target.previousSibling.focus();
                    } else {
                        dojo.stopEvent(_364);
                        _364.target.parentNode.lastChild.focus();
                    }
                }
                if (_364.keyCode == dojo.keys.ENTER || _364.keyCode == dojo.keys.SPACE || _364.keyCode == 0) {
                    slideToIdx = dojo.attr(_364.target, "IbmCarouselIndex") * 1;
                    this.slideTo(slideToIdx, _364);
                }
            }));
            return _361;
        },
        _focusSlideContent: function(_365) {
            var _366 = dojo.query("div[role=\"document\"]", this.scrollableNode.childNodes[_365]);
            if (_366[0]) {
                _366[0].focus();
            }
        },
        addItem: function(item, _367, _368) {
            if (_367 == undefined || _367 < 0 || _367 >= this.slides.length) {
                if (_367 && _367 >= this.slides.length) {
                    this.addSlide(new ibmweb.ribbonSlide({
                        pid: _368
                    }));
                }
                if (!_367 && (this.slides.length == 0 || this.slides[this.slides.length - 1].getChildren().length == this.columns)) {
                    this.addSlide(new ibmweb.ribbonSlide({
                        pid: _368
                    }));
                }
                _367 = this.slides.length - 1;
            }
            this.slides[_367].addChild(item);
            return item;
        },
        checkHome: function() {
            if (dojo.attr(this.ribbonContainer.parentNode, "id") == "ibm-leadspace-head" && dojo.query(".ibm-home-page").length > 0) {
                return 1;
            }
            return 0;
        },
        slideTo: function(_369, _36a, _36b) {
            var that = this;
            _36a && dojo.stopEvent(_36a);
            _369 = parseInt(_369, 10);
            if (_369 < 0 || _369 >= this.slides.length || _369 == this.currentSlideIndex) {
                if (_36a && !this.autoscroll) {
                    this._focusSlideContent(this.currentSlideIndex);
                }
                return;
            }
            var _36c = dojo.coords(dojo.query("> *", this.scrollableNode)[0]).w;
            if (_36b && !this.checkHome() && !this._isLeadNoHome) {
                _369 = 0;
                dojo.animateProperty({
                    node: this.scrollableNode,
                    duration: this._durationCopy,
                    properties: {
                        left: _36c * (this.slideCount() - 1) * -1
                    },
                    onEnd: function() {
                        if (_36a && !this.autoscroll) {
                            that._focusSlideContent(_369);
                        }
                    }
                }).play();
            }
            if (this.customSeekAnimation) {
                if (this._isBeingAnimated) {
                    return;
                }
                this._isBeingAnimated = true;
                this.customSeekAnimation(_36c, _369, _36b);
                if (_36b) {
                    _369 = 0;
                }
            } else {
                if (!dojo._isBodyLtr()) {
                    dojo.style(this.scrollableNode, {
                        right: (_36c * _369 * -1) + "px"
                    });
                } else {
                    if (this._scrollableNodeAnimObj) {
                        this._scrollableNodeAnimObj.stop();
                    }
                    this._scrollableNodeAnimObj = dojo.animateProperty({
                        node: this.scrollableNode,
                        duration: this.duration,
                        properties: {
                            left: _36c * _369 * -1
                        },
                        onEnd: function() {
                            if (_36a && !this.autoscroll) {
                                that._focusSlideContent(_369);
                            }
                        }
                    }).play();
                }
            }
            if (_369 == 0) {
                dojo.addClass(this.scrollLeftButton, "ibm-disabled");
            } else {
                dojo.removeClass(this.scrollLeftButton, "ibm-disabled");
            }
            if (_369 == this.slides.length - 1) {
                dojo.addClass(this.scrollRightButton, "ibm-disabled");
            } else {
                dojo.removeClass(this.scrollRightButton, "ibm-disabled");
            }
            if (this._isBegingAutoscroll && this._isLeadNoHome) {
                var _36d = ibmweb.ribbonLeadspace._widget.scrollLeftButton,
                    _36e = ibmweb.ribbonLeadspace._widget.scrollRightButton;
                if (dojo.isIE < 7) {
                    _36d.style.display = "none";
                    _36e.style.display = "none";
                } else {
                    dojo.forEach([_36d, _36e], function(item) {
                        dojo.anim(item, {
                            opacity: 0
                        }, 250, null, function() {
                            item.style.display = "none";
                        });
                    });
                }
            }
            var _36f = "div[role=\"document\"] a, div[role=\"document\"] input, div[role=\"document\"]";
            if (this.ribbonContainer.parentNode.id != "ibm-promotion-module") {
                dojo.query(_36f, this.scrollableNode).forEach(function(n) {
                    n.tabIndex = -1;
                });
            }
            this.currentSlideIndex = _369;
            if (this.ribbonContainer.parentNode.id != "ibm-promotion-module") {
                dojo.query(_36f, dojo.query("div[role=\"option\"]", this.scrollableNode)[_369]).forEach(function(n) {
                    n.tabIndex = 0;
                });
            }
            var _370 = dojo.query("a.ibm-active", this.navNode);
            if (_370.length > 0) {
                _370.removeClass("ibm-active");
                _370[0].tabIndex = -1;
            }
            dojo.query("a:nth-child(" + (_369 + 1) + ")", this.navNode).addClass("ibm-active");
            dojo.query("a:nth-child(" + (_369 + 1) + ")", this.navNode)[0].tabIndex = 0;
        },
        slideLeft: function(_371) {
            this.slideTo(this.currentSlideIndex - 1, _371);
        },
        slideRight: function(_372) {
            this.slideTo(this.currentSlideIndex + 1, _372);
        },
        slideFirst: function() {
            this.slideTo(0);
        },
        slideLast: function() {
            this.slideTo(this.slides.length - 1);
        },
        next: function() {
            if (this.checkHome()) {
                dojo.query(".ibm-cloned").attr("id", "ibm-lead-1");
                var _373 = dojo.query(".ibm-cloned div").attr("widgetId");
                dojo.query(".ibm-cloned div").attr("id", _373);
            }
            if (this.rotationCount > 0 && this.rotationCount == this._rotationCount) {
                this.autoscroll = false;
                this._isBegingAutoscroll = false;
                return false;
            }
            this._isBegingAutoscroll = true;
            if ((this.currentSlideIndex + 1) == this.slideCount()) {
                if (!this.checkHome()) {
                    this.duration = 1;
                }
                this._rotationCount += 1;
                this.slides.length += 1;
                this.slideTo(this.slides.length - 1, null, true);
                this.slides.length -= 1;
                if (!this.checkHome()) {
                    this.currentSlideIndex = -1;
                }
            } else {
                this.slideRight();
                if (!this.checkHome()) {
                    this.duration = this._durationCopy;
                }
            }
        },
        placeAt: function(_374) {
            dojo.place(this.domNode, _374);
        },
        slideCount: function() {
            return this.slides.length;
        },
        setDuration: function(_375) {
            this.duration = _375;
            this._durationCopy = _375;
        },
        hideNavigationDots: function() {
            dojo.query(this.navNode).style("display", "none");
            dojo.query(this.navNode).orphan();
        },
        addRibbonCloseBtn: function() {
            var _376 = "Close";
            if (ibmweb.dynnav.isDataLoaded && ibmweb.config.config == "www") {
                _376 = PMM.buttonData.close;
            }
            if (dojo.byId("ibm-com").className.indexOf("dijit_a11y") != -1) {
                dojo.create("div", {
                    className: "ibm-mm-close",
                    innerHTML: "<span tabindex='0' aria-label='" + _376 + "' role='button' title='" + _376 + "'>&#9650;</span>"
                }, this.ribbonContainer, "last");
            } else {
                dojo.create("div", {
                    className: "ibm-mm-close",
                    innerHTML: "<span tabindex='0' aria-label='" + _376 + "' role='button' title='" + _376 + "'></span>"
                }, this.ribbonContainer, "last");
            }
        }
    });
    dojo.declare("ibmweb.ribbonSlide", [dijit._Widget, dijit._Templated, dijit._Container], {
        pid: null,
        templateString: "<div class='ibm-columns' dojoAttachPoint='containerNode' role='option'></div>",
        postCreate: function() {
            if (this.pid && this.pid !== "") {
                this.containerNode.id = this.pid;
            }
        }
    });
    dojo.declare("ibmweb.ribbonItemAbstract", [dijit._Widget], {
        constructor: function(_377) {
            if (!_377.srcNodeRef) {
                return;
            }
            if (!dojo.attr(_377.srcNodeRef, "role")) {
                dojo.attr(_377.srcNodeRef, "role", "document");
            }
            _377.srcNodeRef.tabIndex = 0;
            if (!_377.enableKeypress || _377.enableKeypress == false) {
                dojo.connect(_377.srcNodeRef, "keypress", this, function(e) {
                    if (e.keyCode == dojo.keys.UP_ARROW || e.keyCode == dojo.keys.LEFT_ARROW || e.keyCode == dojo.keys.DOWN_ARROW || e.keyCode == dojo.keys.RIGHT_ARROW) {
                        e && dojo.stopEvent(e);
                    }
                });
            }
            this.srcNodeRef = dojo.clone(_377.srcNodeRef);
        }
    });
    dojo.declare("ibmweb.ribbonItem", [dijit._Widget, dijit._Templated, dijit._Container], {
        columns: 3,
        templateString: "<div dojoAttachPoint='containerNode' role='option'></div>",
        attributeMap: {
            type: {
                node: "containerNode",
                type: "class"
            },
            content: {
                node: "containerNode",
                type: "innerHTML"
            }
        },
        postCreate: function() {
            switch (parseInt(this.columns)) {
                case 1:
                    this.attr("class", "ibm-col-1-1");
                    break;
                case 3:
                    this.attr("class", "ibm-col-6-2");
                    break;
                case 5:
                    this.attr("class", "ibm-col-5-1");
                    break;
                case 6:
                    this.attr("class", "ibm-col-6-1");
                    break;
                default:
                    this.attr("class", "ibm-col-6-2");
                    break;
            }
        }
    });
    ibmweb.ribbonLeadspace = {
        onWindowResize: function() {
            var temp = dojo.byId("ibm-leadspace-body");
            var _378 = null;
            if (temp) {
                var id = dojo.hasAttr(temp, "widgetid") ? dojo.attr(temp, "widgetid") : null;
                if (id) {
                    _378 = dijit.byId(id);
                } else {
                    return false;
                }
            }
            var _379 = dojo.window.getBox();
            dojo.query("#ibm-leadspace-head > div.ibm-container-body > div.ibm-ribbon-pane")[0].style.width = (_379.w > 1030 ? _379.w : 1030) + "px";
            dojo.query("#ibm-leadspace-head > div.ibm-container-body > div.ibm-ribbon-pane > div.ibm-ribbon-section > div").forEach(function(i) {
                var _37a = _379.w + 30;
                if (_37a < 1030) {
                    _37a = 1030;
                }
                i.style.width = _37a + "px";
            });
            dojo.query("#ibm-leadspace-head > div.ibm-container-body > div.ibm-ribbon-pane > div.ibm-ribbon-section > div > div").forEach(function(i) {
                var _37b = (_379.w + 30 - dojo.coords(i).w) / 2;
                if ((_379.w + 30) < 1030) {
                    _37b = (1030 - dojo.coords(i).w) / 2;
                }
                dojo.style(i, "padding", "0 " + _37b + "px");
                i.style.height = "100%";
            });
            var _37c = dojo.query("#ibm-leadspace-head > div.ibm-container-body > div.ibm-ribbon-pane > div.ibm-ribbon-section")[0];
            if (!_37c.style.left || _37c.style.left == "0px") {} else {
                var dim = _379.w;
                if (dim < 1000) {
                    dim = 1000;
                }
                _37c.style.left = "-" + ((_378.currentSlideIndex * dim) + (_378.currentSlideIndex * 30)) + "px";
            }
            if (ibmweb.ribbonLeadspace._widget) {
                var pos = (_379.w - 1050) / 2;
                if (ibmweb.meta.cpi == "ilhe") {
                    ibmweb.ribbonLeadspace._widget.scrollLeftButton.style.right = (pos < 1 ? 1 : pos) + "px";
                } else {
                    ibmweb.ribbonLeadspace._widget.scrollLeftButton.style.left = (pos < 1 ? 1 : pos) + "px";
                }
                if (dojo.isIE < 8) {
                    if (ibmweb.meta.cpi == "ilhe") {
                        ibmweb.ribbonLeadspace._widget.scrollRightButton.style.left = (pos < 1 ? 5 : pos) + "px";
                    } else {
                        ibmweb.ribbonLeadspace._widget.scrollRightButton.style.right = (pos < 1 ? 5 : pos) + "px";
                    }
                } else {
                    if (ibmweb.meta.cpi == "ilhe") {
                        ibmweb.ribbonLeadspace._widget.scrollRightButton.style.left = (pos < 1 ? (-1) * (_379.w - 988) : pos) + "px";
                    } else {
                        ibmweb.ribbonLeadspace._widget.scrollRightButton.style.right = (pos < 1 ? (-1) * (_379.w - 988) : pos) + "px";
                    }
                }
            }
        },
        arrowsToggle: {
            generic: function(x) {
                var _37d = ibmweb.ribbonLeadspace._widget.scrollLeftButton;
                var _37e = ibmweb.ribbonLeadspace._widget.scrollRightButton;
                switch (x) {
                    case "show":
                        if (dojo.isIE < 7) {
                            _37d.style.display = "block";
                            _37e.style.display = "block";
                        } else {
                            dojo.forEach([_37d, _37e], function(item) {
                                dojo.style(item, {
                                    opacity: "0",
                                    display: "block"
                                });
                                dojo.anim(item, {
                                    opacity: 1
                                }, 300, null, function() {
                                    if (ibmweb.ribbonLeadspace.arrowsToggle._stat != "show") {
                                        ibmweb.ribbonLeadspace.arrowsToggle.generic("hide");
                                    }
                                });
                            });
                        }
                        break;
                    case "hide":
                        if (dojo.isIE < 7) {
                            _37d.style.display = "none";
                            _37e.style.display = "none";
                        } else {
                            dojo.forEach([_37d, _37e], function(item) {
                                dojo.anim(item, {
                                    opacity: 0
                                }, 250, null, function() {
                                    item.style.display = "none";
                                    if (ibmweb.ribbonLeadspace.arrowsToggle._stat != "hide") {
                                        ibmweb.ribbonLeadspace.arrowsToggle.generic("show");
                                    }
                                });
                            });
                        }
                        break;
                }
            },
            show: function() {
                this.ribbonLeadspace.arrowsToggle._stat = "show";
                this.ribbonLeadspace.arrowsToggle.generic("show");
            },
            hide: function() {
                this.ribbonLeadspace.arrowsToggle._stat = "hide";
                this.ribbonLeadspace.arrowsToggle.generic("hide");
            }
        },
        init: function() {
            var _37f = new ibmweb.ribbon({
                srcNodeRef: dojo.query("#ibm-leadspace-head.ibm-ribbon > div#ibm-leadspace-body.ibm-container-body")[0],
                _isLeadSpace: true,
                customSeekAnimation: function(_380, _381, _382) {
                    if (_382 && this._isLeadNoHome) {
                        _381 = 0;
                        this.currentSlideIndex = -1;
                    }
                    switch (this.currentSlideIndex) {
                        case 1:
                            var _383 = dojo.query("#ibm-lead-2 div.ibm-col-1-1")[0];
                            break;
                        case 2:
                            var _383 = dojo.query("#ibm-lead-3 div.ibm-col-1-1")[0];
                            break;
                        default:
                            var _383 = dojo.query("#ibm-lead-1 div.ibm-col-1-1")[0];
                    }
                    var _384 = {
                            left: {
                                start: 0,
                                end: -2000,
                                unit: "px"
                            }
                        },
                        _385 = {
                            left: {
                                start: -1000,
                                end: 0,
                                unit: "px"
                            }
                        };
                    if (ibmweb.meta.cpi == "ilhe") {
                        _384.right = _384.left;
                        _384.left = undefined;
                        _385.right = _385.left;
                        _385.left = undefined;
                    }
                    var _386 = dojo.fx.chain([dojo.animateProperty({
                            node: _383,
                            properties: _384,
                            duration: 950,
                            easing: function(n) {
                                return -1 * (Math.sqrt(1 - Math.pow(n, 2)) - 1);
                            }
                        }), dojo.animateProperty({
                            node: _383,
                            properties: _385,
                            duration: 200
                        })]),
                        _387 = {
                            left: {
                                start: (ibmweb.meta.cpi == "ilhe" ? (this.scrollableNode.style.right || 0) : (this.scrollableNode.style.left || 0)),
                                end: _380 * _381 * -1,
                                nit: "px"
                            }
                        };
                    if (ibmweb.meta.cpi == "ilhe") {
                        _387.right = _387.left;
                        _387.left = undefined;
                    }
                    var _388 = dojo.animateProperty({
                            node: this.scrollableNode,
                            properties: _387,
                            duration: 2100,
                            easing: function(n) {
                                if (n == 0) {
                                    return 0;
                                }
                                if (n == 1) {
                                    return 1;
                                }
                                n = n * 2;
                                if (n < 1) {
                                    return Math.pow(2, 10 * (n - 1)) / 2;
                                }--n;
                                return (-1 * Math.pow(2, -10 * n) + 2) / 2;
                            }
                        }),
                        _389 = dojo.fx.combine([_386, _388]);
                    if (ibmweb.meta.cpi == "ilhe" && dojo.isIE < 9) {
                        dojo.style(this.scrollableNode, {
                            right: _380 * _381 * -1
                        });
                        this._isBeingAnimated = false;
                    } else {
                        _389.play();
                    }
                    dojo.connect(_389, "onEnd", dojo.hitch(this, function() {
                        this._isBeingAnimated = false;
                        this._isBegingAutoscroll = false;
                        if (_382 && this._isLeadNoHome) {
                            this.currentSlideIndex = 0;
                        }
                    }));
                }
            });
            this._widget = _37f;
            if (dojo.isIE < 8) {
                dojo.place(ibmweb.ribbonLeadspace._widget.scrollRightButton, ibmweb.ribbonLeadspace._widget.scrollLeftButton, "after");
                dojo.style(ibmweb.ribbonLeadspace._widget.scrollRightButton, {
                    marginTop: "140px",
                    zIndex: "1"
                });
            }
            dojo.connect(_37f, "onMouseEnter", ibmweb, ibmweb.ribbonLeadspace.arrowsToggle.show);
            dojo.connect(_37f, "onMouseLeave", ibmweb, ibmweb.ribbonLeadspace.arrowsToggle.hide);
            if (_37f.slides.length > 1) {
                _37f.startup();
                dojo.query("#ibm-leadspace-body div.ibm-ribbon-nav a").forEach(function(i, e) {
                    var pos = e + 1;
                    dojo.connect(i, "onclick", function() {
                        ibmweb.util.statsHelper({
                            "ibmEV": "track",
                            "ibmEvAction": "ibmlink",
                            "ibmEvLinktitle": "ls" + pos,
                            "ibmEvSection": "ls" + pos
                        });
                        return true;
                    });
                    dojo.connect(i, "onmouseenter", function(e) {
                        e.stopPropagation();
                        ibmweb.util.statsHelper({
                            "ibmEV": "track",
                            "ibmEvAction": "ibmhover",
                            "ibmEvLinktitle": "ls" + pos,
                            "ibmEvSection": "ls" + pos
                        });
                        return false;
                    });
                });
            }
            dojo.query("#ibm-lead-2, #ibm-lead-3").forEach(function(item) {
                item.style.display = "block";
            });
            if (_37f.slides.length > 1) {
                dojo.query("#ibm-leadspace-head .ibm-ribbon-nav a").forEach(function(item, i) {
                    var j = i + 1;
                    var temp = dojo.query("#ibm-lead-" + j + " div.ibm-ribbon-view");
                    if (temp.length == 1) {
                        dojo.place(temp[0], item);
                        var _38a = dojo.query("div.ibm-pagination-overlay", item)[0];
                        dojo.connect(_38a, "onclick", function(e) {
                            _37f.slideTo(i, e);
                        });
                        dojo.connect(item, "onmouseenter", function(e) {
                            if (_38a.style.display == "block") {
                                return false;
                            }
                            if (dojo.isIE < 7) {
                                dojo.style(_38a, {
                                    display: "block"
                                });
                            } else {
                                dojo.style(_38a, {
                                    opacity: "0",
                                    display: "block"
                                });
                                dojo.anim(_38a, {
                                    opacity: 1
                                }, 300);
                            }
                            var _38b = dojo.connect(item, "onmouseleave", function() {
                                if (dojo.isIE < 7) {
                                    _38a.style.display = "none";
                                } else {
                                    dojo.anim(_38a, {
                                        opacity: 0
                                    }, 200, null, function() {
                                        _38a.style.display = "none";
                                    });
                                }
                                dojo.disconnect(_38b);
                            });
                        });
                    }
                });
            } else {
                dojo.query(_37f.navNode).orphan();
            }
            if (dojo.isIE < 8) {
                dojo.byId("ibm-leadspace-body").style.position = "static";
            }
            dojo.connect(window, "resize", ibmweb.ribbonLeadspace.onWindowResize);
            ibmweb.ribbonLeadspace.onWindowResize();
            var _38c = dojo.query("#ibm-leadspace-head div.ibm-ribbon-nav a");
            dojo.connect(dojo.query("#ibm-leadspace-head div.ibm-ribbon-pane")[0], "onkeypress", dojo.hitch(this, function(evt) {
                if (evt.keyCode == dojo.keys.TAB && !evt.shiftKey) {
                    if (_38c.length > 0) {
                        dojo.query("#ibm-leadspace-head div.ibm-ribbon-nav a:first-child")[0].focus();
                    } else {
                        dojo.byId("ibm-promotion-module").focus();
                    }
                    dojo.stopEvent(evt);
                }
            }));
            if (dojo.isIE < 7) {
                dojo.query("#ibm-leadspace-body div.ibm-columns img:first-child").forEach(function(item) {
                    var _38d = item.width;
                    var _38e = item.height;
                    var src = item.src;
                    dojo.query(item).wrap("<span style=\"width:" + _38d + "px;height:" + _38e + "px;display:inline-block; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "');\"></span>");
                    item.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=0)";
                });
            }
        }
    };
}
if (!dojo._hasResource["ibmweb.dynnav.megamenu"]) {
    dojo._hasResource["ibmweb.dynnav.megamenu"] = true;
    dojo.provide("ibmweb.dynnav.megamenu");
    dojo.declare("ibmweb.dynnav.megamenu", ibmweb.dynnav._module, {
        _currentMenu: null,
        _mouseover: false,
        _slideUpTimer: null,
        _slideUpDuration: 600,
        _keepexpanded: false,
        _mouseleaveHandlerEnabled: true,
        _expandTimer: null,
        _slideToTimer: null,
        _delayedExpandTimer: null,
        _isExpanded: true,
        _itemtitle: null,
        _lock: false,
        _beingAnimated: false,
        _doubleClickLock: null,
        _waitBeforeAssignPage: null,
        _unicaTagsW3MenuNames: [],
        _unicaTagsWWWMenuNames: [],
        _hasFocus: [],
        _isMinimizingOnMouseLeaveSemaphore: false,
        _newDataSource: {
            use: true,
            hidden: true,
            isBeingAnimated: false,
            isSubBeingAnimated: false,
            hasDynTitle: false,
            subTabs: [],
            subTabsContent: [],
            subTabsActItem: [],
            subTabsActItem_idx: [],
            subTabsHover: [],
            subTabMenu: null,
            curSubMenu: null
        },
        _w3SwapDesign: {
            secondSwitchEnabled: false,
            waitOnExist: null,
            waitOnMouseOver: null,
            stopClickForMoment: null,
            leavingItem: null,
            mouseOverOpenMethod: false,
            mouseOnMenuButton: false,
            currentLink: -1,
            profileLinks: null,
            newSso: null,
            portalLogOutLink: null,
            profileCustomLinks: null
        },
        _dimensions: {
            basicUniversalHeight: 50,
            basicMarginTop: 74
        },
        init: function() {
            if (dojo.isIE) {
                dojo.query(".lotusui30 .lotusBanner").style({
                    position: "static"
                });
            }
            if (ibmweb.config.config == "w3") {
                this._dimensions.basicMarginTop = 90;
                this._w3SwapDesign.secondSwitchEnabled = !dojo.hasClass(dojo.query("#ibm-masthead")[0], "ibm-w3-masthead");
            }
            if (dojo.indexOf(ibmweb.config.megamenu.disabledLocales, ibmweb.meta.cpi) != -1) {
                ibmweb.config.megamenu.linksonly = true;
            }
            if (ibmweb.config.config == "w3") {
                if (this._w3SwapDesign.secondSwitchEnabled) {
                    dojo.query("#ibm-masthead").addClass("ibm-w3-masthead");
                } else {
                    if (!dojo.byId("ibm-profile-links")) {
                        this._w3SwapDesign.profileLinks = dojo.create("div", {
                            id: "ibm-profile-links"
                        }, "ibm-universal-nav", "last");
                    } else {
                        this._w3SwapDesign.profileLinks = dojo.query("[id=\"ibm-profile-links\"]")[0];
                    }
                    if (!dojo.byId("ibm-sso")) {
                        this._w3SwapDesign.newSso = dojo.create("div", {
                            id: "ibm-sso",
                            role: ""
                        }, this._w3SwapDesign.profileLinks, "last");
                        dijit.setWaiRole(this._w3SwapDesign.newSso, "presentation");
                        if (dojo.query("#ibm-portal-logout-link").length == 1 || dojo.query("#ibm-profile-custom-links").length == 1) {
                            dojo.addClass(this._w3SwapDesign.newSso, "ibm-profile-links-divider");
                        }
                    } else {
                        this._w3SwapDesign.newSso = dojo.query("#ibm-sso")[0];
                    }
                }
            }(function() {
                if (ibmweb.config.config === "w3") {
                    var $st = dojo.query("#ibm-site-title");
                    if ($st[0]) {
                        if (dojo.query("> *", $st[0]).length === 0 && (dojo.trim($st[0].innerHTML).length === 0)) {
                            $st[0].innerHTML = "<em>&nbsp;</em>";
                        }
                        if (dojo.query("> em", $st[0]).length === 1 && dojo.trim(dojo.query("> em", $st[0])[0].innerHTML).length === 0) {
                            dojo.query("> em", $st[0])[0].innerHTML = "&nbsp;";
                        }
                    }
                }
            })();
            if (ibmweb.config.megamenu.disableUniversalNav) {
                this._dimensions.basicMarginTop = 42;
                this._dimensions.basicUniversalHeight = 0;
                dojo.query("#ibm-site-title").style("display", "none");
                dojo.query("#ibm-universal-nav").style("height", "0px");
                dojo.query("#ibm-top").style("marginTop", "42px");
            }
            return ibmweb.dynnav.isServiceEnabled("megamenu") && !ibmweb.config.appmast.enabled;
        },
        onLoad: function() {
            if (!dojo.byId("ibm-common-menu")) {
                var _38f = ibmweb.config.config == "www" ? "ibm-universal-nav" : "ibm-mast-options";
                dojo.create("div", {
                    id: "ibm-common-menu"
                }, dojo.byId(_38f), "after");
            }
            dojo.style("ibm-common-menu", "display", "none");
            if (ibmweb.config.config == "www") {
                var _390 = dojo.query("#ibm-unav-links");
            }
            if (ibmweb.config.config == "www" && ibmweb.config.megamenu.icons != "none") {
                if (ibmweb.config.megamenu.icons == "arrow") {
                    if (!dojo.byId("ibm-arrow-logo")) {
                        var _391 = dojo.create("span", {
                            id: "ibm-arrow-logo",
                            className: "ibm-masthead-indicator"
                        });
                        dojo.create("img", {
                            src: ibmweb.config.imageUrl + "t/v17_min_mast_anim_que.gif"
                        }, _391);
                        dojo.place(_391, dojo.query("#ibm-universal-nav")[0], "first");
                    }
                } else {
                    if (!dojo.byId("ibm-search-logo")) {
                        var _392 = dojo.create("li", {
                            id: "ibm-search-logo",
                            className: "ibm-masthead-indicator"
                        });
                        if (ibmweb.config.megamenu.icons == "text") {
                            _392.innerHTML = "Search";
                            dojo.addClass(_392, "ibm-text");
                        }
                        dojo.place(_392, _390[0], "last");
                    }
                    if (!dojo.byId("ibm-links-logo")) {
                        var _393 = dojo.create("li", {
                            id: "ibm-links-logo",
                            className: "ibm-masthead-indicator"
                        });
                        if (ibmweb.config.megamenu.icons == "text") {
                            _393.innerHTML = "Links";
                            dojo.addClass(_393, "ibm-text");
                        }
                        dojo.place(_393, _390[0], "last");
                    }
                }
                dojo.query(".ibm-masthead-indicator").addClass("ibm-access");
            }
            if (ibmweb.config.config == "www" && dojo.query("li", _390[0]).length == 1) {
                if (!dojo.hasAttr(_390, "role")) {
                    dojo.attr(_390[0], "role", "");
                    dijit.setWaiRole(_390[0], "presentation");
                }
            }
            if (ibmweb.config.config == "w3" && ibmweb.config.megamenu.icons != "none") {
                if (ibmweb.config.megamenu.icons == "arrow") {
                    if (!dojo.byId("ibm-arrow-logo")) {
                        var _391 = dojo.create("span", {
                            id: "ibm-arrow-logo",
                            className: "ibm-masthead-indicator"
                        });
                        dojo.create("img", {
                            src: ibmweb.config.imageUrl + "t/w3_min_menu_open_icon.png"
                        }, _391);
                        dojo.place(_391, dojo.query("#ibm-universal-nav")[0], "first");
                    }
                }
            }
            if (!ibmweb.config.megamenu.noScroll) {
                dojo.connect(window, "onscroll", this, "onVScrollCallback");
                dojo.connect(window, "onresize", this, "onVScrollCallback");
            } else {
                dojo.addClass("ibm-top", "ibm-no-scroll");
            }
            dojo.connect(window, "onscroll", this, "onHScrollCallback");
            dojo.connect(window, "onresize", this, function(_394) {
                dojo.stopEvent(_394);
                if (!window.pageXOffset && window.pageXOffset != 0) {
                    dojo.style(dojo.byId("ibm-masthead"), "left", "-" + document.documentElement.scrollLeft + "px");
                } else {
                    dojo.style(dojo.byId("ibm-masthead"), "left", "-" + window.pageXOffset + "px");
                }
            });
            dojo.connect(window, "blur", this, function(_395) {
                this.meta = this.shift = this.ctrl = this.cmmd = this.alt = false;
                dojo.publish("/ibm/dynnav/slideUp");
            });
            if (ibmweb.config.config == "w3" && ibmweb.config.megamenu.expandOnClick) {
                dojo.connect(dojo.byId("ibm-masthead"), "onclick", this, "onMouseEnter");
            } else {
                if (ibmweb.config.config == "w3" && ibmweb.config.megamenu.delay > 0) {
                    dojo.connect(dojo.byId("ibm-masthead"), "onmouseenter", this, function(_396) {
                        this._delayedExpandTimer = setTimeout(dojo.hitch(this, function() {
                            this.onMouseEnter(_396);
                        }), ibmweb.config.megamenu.delay);
                    });
                } else {
                    dojo.connect(dojo.byId("ibm-masthead"), "onmouseenter", this, "onMouseEnter");
                }
            }
            dojo.connect(dojo.byId("ibm-masthead"), "onmouseleave", this, "onMouseLeave");
            dojo.subscribe("/ibm/dynnav/slideUp", this, "_slideUp");
            dojo.subscribe("/ibm/dynnav/megamenu/slideUp", this, "_slideUp");
            dojo.subscribe("/ibm/dynnav/megamenu/slideDown", this, "_slideDown");
            dojo.subscribe("/ibm/dynnav/megamenu/expandMenu", this, "_expandMenu");
            if (ibmweb.config.megamenu.minimizeByDefault) {
                this._minimizeMenu(1);
            }
            dojo.publish("/ibmweb/dynnav/megamenu/finished");
        },
        onData: function(data) {
            var ul = dojo.byId("ibm-menu-links");
            dojo.empty(ul);
            dijit.setWaiRole("ibm-menu-links", "toolbar");
            var _397 = new ibmweb.ribbon();
            dijit.setWaiRole(_397.scrollableNode, "region");
            dijit.setWaiState(_397.scrollableNode, "label", data.accessibilityData.sitemap || "Site map");
            dojo.forEach(data.menuData, dojo.hitch(this, function(item, i) {
                var li = dojo.create("li", {}, ul);
                dijit.setWaiRole(li, "presentation");
                if (ibmweb.config.megamenu.minimizeByDefault) {
                    dojo.addClass(li, "ibm-access");
                }
                var a = dojo.create("a", {
                    href: item.url || "#",
                    role: "",
                    tabIndex: (ibmweb.info.OperaVersion != 11.11) ? "-1" : "0",
                    innerHTML: item.title.htmlspecialchars()
                }, li);
                dijit.setWaiRole(a, "button");
                if (ibmweb.config.megamenu.linksonly) {
                    return;
                }
                this._itemtitle = item.title.htmlspecialchars();
                if (ibmweb.config.config == "www") {
                    this._unicaTagsWWWMenuNames.push(item.title.htmlspecialchars());
                }
                if (ibmweb.config.config == "w3") {
                    this._unicaTagsW3MenuNames.push(item.title.htmlspecialchars());
                }
                if (item.child) {
                    var div = this._buildMegaMenu(item.child, i);
                    _397.addItem(new ibmweb.ribbonItemAbstract({
                        srcNodeRef: div,
                        enableKeypress: true
                    }), i);
                    dijit.setWaiRole(div.parentNode, "dialog");
                    dijit.setWaiState(div.parentNode, "labelledby", "ibm-rib-head-" + i);
                    dojo.create("h2", {
                        className: "ibm-access",
                        id: "ibm-rib-head-" + i,
                        innerHTML: item.title.htmlspecialchars()
                    }, div.parentNode, "first");
                    childAnk = dojo.query("a", _397.navNode);
                    if (childAnk.length > 0 && i < childAnk.length) {
                        dojo.attr(childAnk[i], "title", item.title.htmlspecialchars());
                        childAnk[i].innerHTML = item.title.htmlspecialchars();
                    }
                    dojo.connect(a, "onblur", this, function(_398) {
                        dojo.stopEvent(_398);
                        dojo.query("#ibm-menu-links li.ibm-inactive").removeClass("ibm-inactive");
                        return false;
                    });
                    dojo.connect(a, "onfocus", this, function(_399) {
                        dojo.stopEvent(_399);
                        if (ibmweb.config.config === "www" && this._currentMenu != null) {
                            dojo.removeClass(dojo.query("#ibm-menu-links a")[this._currentMenu], "ibm-active");
                        }
                        if (dojo.byId("ibm-menu-links").className == "ibm-access") {
                            dojo.publish("/ibm/dynnav/megamenu/expandMenu");
                        }
                        var _39a = (ibmweb.config.config == "w3") ? dojo.query("#ibm-menu-links a[tabindex $='2']") : dojo.query("#ibm-menu-links a[tabindex $='0']");
                        _39a.forEach(function(i) {
                            i.tabIndex = "-1";
                        });
                        if (this._currentMenu != null) {
                            _397.setDuration(_397.defaultDuration);
                            this._currentMenu = i;
                            dojo.query("a", _397.scrollableNode).attr("tabIndex", "-1");
                            _397.slideTo(i);
                            _399.target.parentNode.className = "ibm-active";
                            dojo.addClass(_399.target, "ibm-active");
                            var _39b = dojo.query("> div", _397.scrollableNode),
                                temp = dojo.query("a", _39b[i]);
                            if (temp.length > 0) {
                                temp.attr("tabIndex", (ibmweb.config.config == "w3") ? "2" : "0");
                            }
                        } else {
                            dojo.query("#ibm-menu-links li.ibm-inactive").removeClass("ibm-inactive");
                            _399.target.parentNode.className = "ibm-inactive";
                        }
                        a.tabIndex = (ibmweb.config.config == "w3") ? 2 : 0;
                        return false;
                    });
                    dojo.connect(a, "onkeypress", this, function(_39c) {
                        if (_39c.shiftKey && _39c.charOrCode == dojo.keys.TAB) {
                            this._slideUp();
                        } else {
                            if (_39c.keyCode == dojo.keys.TAB) {
                                if (this._currentMenu != null) {
                                    dojo.stopEvent(_39c);
                                    var _39d = dojo.query("> div", _397.scrollableNode),
                                        temp = dojo.query("a", _39d[i]);
                                    if (temp.length > 0) {
                                        temp[0].focus();
                                    }
                                    _39c.target.className = "ibm-active";
                                } else {
                                    this._slideUp();
                                }
                            }
                        }
                        if (_39c.keyCode == dojo.keys.LEFT_ARROW || _39c.keyCode == dojo.keys.UP_ARROW) {
                            a.tabIndex = -1;
                            var prev = _39c.target.parentNode.previousSibling;
                            if (prev) {
                                dojo.stopEvent(_39c);
                                prev.firstChild.focus();
                            } else {
                                prev = _39c.target.parentNode.parentNode.lastChild;
                                if (prev) {
                                    dojo.stopEvent(_39c);
                                    prev.firstChild.focus();
                                }
                            }
                        }
                        if (_39c.keyCode == dojo.keys.RIGHT_ARROW || (_39c.keyCode == dojo.keys.DOWN_ARROW && this._currentMenu == null)) {
                            a.tabIndex = -1;
                            var next = _39c.target.parentNode.nextSibling;
                            if (next) {
                                dojo.stopEvent(_39c);
                                next.firstChild.focus();
                            } else {
                                next = _39c.target.parentNode.parentNode.firstChild;
                                if (next) {
                                    dojo.stopEvent(_39c);
                                    next.firstChild.focus();
                                }
                            }
                        }
                        if (this._isExpanded && (_39c.keyCode == dojo.keys.ENTER || (_39c.keyCode == dojo.keys.SPACE || _39c.charOrCode == " "))) {
                            dojo.stopEvent(_39c);
                            if (this._currentMenu == null) {
                                ibmweb.util.statsHelper({
                                    "ibmEV": ibmweb.config.config + " Megamenu",
                                    "ibmEvAction": "Expand menu",
                                    "ibmEvName": ((ibmweb.config.config === "w3") ? this._unicaTagsW3MenuNames[i] : this._unicaTagsWWWMenuNames[i]),
                                    "ibmEvSection": "Initial"
                                });
                                _397.setDuration(1);
                                dojo.publish("/ibm/dynnav/slideUp");
                                dojo.publish("/ibm/dynnav/signin/slideUp", [_39c]);
                                dojo.publish("/ibm/dynnav/megamenu/slideDown", [i]);
                                _397.slideTo(i);
                                if (typeof this._newDataSource.subTabs[i] !== "undefined") {
                                    dojo.query(this._newDataSource.subTabs[i][this._newDataSource.subTabsActItem_idx[i]]).children("a")[0].focus();
                                } else {
                                    var _39d = dojo.query("> div", _397.scrollableNode),
                                        temp = dojo.query("a", _39d[i]);
                                    if (temp.length > 0) {
                                        temp.attr("tabIndex", "0");
                                        this._slideToTimer = setTimeout(dojo.hitch(this, function() {
                                            temp[0].focus();
                                        }), _397.defaultDuration + 60);
                                    }
                                }
                            } else {
                                ibmweb.util.statsHelper({
                                    "ibmEV": ibmweb.config.config + " Megamenu",
                                    "ibmEvAction": "Expand menu",
                                    "ibmEvName": ((ibmweb.config.config === "w3") ? this._unicaTagsW3MenuNames[i] : this._unicaTagsWWWMenuNames[i]),
                                    "ibmEvSection": "Secondary"
                                });
                                _397.setDuration(_397.defaultDuration);
                                this._slideUp();
                            }
                        }
                        if (_39c.keyCode == dojo.keys.DOWN_ARROW && this._currentMenu != null) {
                            dojo.stopEvent(_39c);
                            var _39d = dojo.query("> div", _397.scrollableNode),
                                temp = dojo.query("a", _39d[i]);
                            if (temp.length > 0) {
                                temp[0].focus();
                            }
                            _39c.target.className = "ibm-active";
                        }
                        if (_39c.keyCode == dojo.keys.ESCAPE) {
                            if (this._currentMenu != null) {
                                dojo.stopEvent(_39c);
                                this._slideUp();
                            } else {
                                var _39e = dojo.query("#q");
                                if (_39e.length > 0) {
                                    _39e[0].focus();
                                }
                            }
                        }
                        return false;
                    });
                    dojo.connect(a, "ondblclick", this, function(_39f) {
                        dojo.stopEvent(_39f);
                        if (!!this._doubleClickLock) {
                            clearTimeout(this._doubleClickLock);
                            this._doubleClickLock = null;
                        }
                        location.href = _39f.target.href;
                    });
                    dojo.connect(a, "onclick", this, function(_3a0) {
                        dojo.stopEvent(_3a0);
                        if (!!this._doubleClickLock) {
                            return;
                        }
                        this._doubleClickLock = setTimeout(dojo.hitch(this, function() {
                            this._doubleClickLock = null;
                            if (ibmweb.config.config === "w3" && this._w3SwapDesign.mouseOverOpenMethod == true) {
                                return false;
                            }
                            _3a0.target.focus();
                            if (this._currentMenu == null) {
                                ibmweb.util.statsHelper({
                                    "ibmEV": ((ibmweb.config.config === "www") ? "www" : "w3") + " Megamenu",
                                    "ibmEvAction": "Expand menu",
                                    "ibmEvName": (ibmweb.config.config === "www") ? this._unicaTagsWWWMenuNames[i] : this._unicaTagsW3MenuNames[i],
                                    "ibmEvSection": "Initial"
                                });
                                dojo.addClass(_3a0.target.parentNode, "ibm-active");
                                dojo.addClass(_3a0.target, "ibm-active");
                                _397.setDuration(1);
                                dojo.publish("/ibm/dynnav/slideUp");
                                dojo.publish("/ibm/dynnav/signin/slideUp", [_3a0]);
                                dojo.publish("/ibm/dynnav/megamenu/slideDown", [i]);
                                _397.slideTo(i);
                                this._hasFocus[i] == false;
                                if (typeof this._newDataSource.subTabs[i] !== "undefined") {
                                    dojo.query(this._newDataSource.subTabs[i][this._newDataSource.subTabsActItem_idx[i]]).children("a")[0].focus();
                                } else {
                                    var _3a1 = dojo.query("> div", _397.scrollableNode),
                                        temp = dojo.query("a", _3a1[i]);
                                    if (temp.length > 0) {
                                        temp.attr("tabIndex", "0");
                                        if (ibmweb.config.config === "www") {
                                            this._slideToTimer = setTimeout(dojo.hitch(this, function() {
                                                temp[0].focus();
                                            }), _397.defaultDuration + 60);
                                        }
                                    }
                                }
                            } else {
                                ibmweb.util.statsHelper({
                                    "ibmEV": ((ibmweb.config.config === "www") ? "www" : "w3") + " Megamenu",
                                    "ibmEvAction": "Expand menu",
                                    "ibmEvName": (ibmweb.config.config === "www") ? this._unicaTagsWWWMenuNames[i] : this._unicaTagsW3MenuNames[i],
                                    "ibmEvSection": "Secondary"
                                });
                                dojo.query("#ibm-menu-links a.ibm-active").removeClass("ibm-active");
                                dojo.query("#ibm-menu-links li.ibm-active").removeClass("ibm-active");
                                dojo.addClass(_3a0.target.parentNode, "ibm-active");
                                dojo.addClass(_3a0.target, "ibm-active");
                                if (this._currentMenu == i && this._hasFocus[i] == true) {
                                    this._slideUp();
                                } else {
                                    if (this._newDataSource.use) {
                                        var id = this._newDataSource.curSubMenu;
                                        if (typeof this._newDataSource.subTabs[id] !== "undefined") {
                                            dojo.forEach(this._newDataSource.subTabs[id], dojo.hitch(this, function(_3a2, _3a3) {
                                                if (_3a3 === this._newDataSource.subTabsActItem_idx[id]) {
                                                    dojo.removeClass(_3a2, "ibm-active");
                                                }
                                                dojo.style(_3a2, "display", "none");
                                            }));
                                        }
                                        id = i;
                                        this._newDataSource.curSubMenu = i;
                                        if (typeof this._newDataSource.subTabs[id] !== "undefined") {
                                            dojo.forEach(this._newDataSource.subTabs[id], dojo.hitch(this, function(_3a4, _3a5) {
                                                dojo.style(_3a4, "display", "block");
                                                if (_3a5 === this._newDataSource.subTabsActItem_idx[id]) {
                                                    dojo.addClass(_3a4, "ibm-active");
                                                }
                                            }));
                                        }
                                    }
                                    _397.slideTo(i);
                                }
                            }
                            for (var j = 0; j < this._hasFocus.length; j++) {
                                this._hasFocus[j] = false;
                            }
                            this._hasFocus[i] = true;
                            return false;
                        }), 250);
                    });
                }
            }));
            _397.placeAt("ibm-common-menu");
            this._createSubTabs();
            _397.hideNavigationDots();
            _397.addRibbonCloseBtn();
            _397.startup();
            dojo.connect(_397.scrollableNode, "onkeypress", this, function(_3a6) {
                if (_3a6.keyCode == dojo.keys.ESCAPE) {
                    dojo.stopEvent(_3a6);
                    var k = this._newDataSource.curSubMenu;
                    if (k !== null) {
                        var l = this._newDataSource.subTabsActItem_idx[k];
                        dojo.query("a", this._newDataSource.subTabs[k][l])[0].focus();
                    } else {
                        dojo.publish("/ibm/dynnav/megamenu/slideUp");
                    }
                }
                if ((!_3a6.shiftKey && _3a6.keyCode == dojo.keys.TAB) || (_3a6.shiftKey && _3a6.keyCode == dojo.keys.TAB)) {
                    dojo.stopEvent(_3a6);
                    var _3a7, _3a8 = false,
                        _3a9 = false;
                    (_3a6.target.parentNode.nodeName == "H3") ? _3a7 = _3a6.target.parentNode.parentNode: _3a7 = _3a6.target.parentNode.parentNode.parentNode;
                    if (dojo.hasClass(_3a7, "ibm-col-last")) {
                        _3a8 = true;
                    }
                    if (dojo.hasClass(_3a7, "ibm-menu-static")) {
                        _3a9 = true;
                    }
                    if (!_3a6.shiftKey && _3a6.keyCode == dojo.keys.TAB) {
                        if (_3a8) {
                            dojo.query("a", dojo.query(_3a7.parentNode).siblings(".ibm-menu-static")[0])[0].focus();
                        } else {
                            (_3a7.nextSibling && dojo.query("a", _3a7.nextSibling)[0]) ? dojo.query("a", _3a7.nextSibling)[0].focus(): dojo.query("div#ibm-common-menu span")[0].focus();
                        }
                    }
                    if (_3a6.shiftKey && _3a6.keyCode == dojo.keys.TAB) {
                        if (_3a9) {
                            var k = this._newDataSource.curSubMenu,
                                l = this._newDataSource.subTabsActItem_idx[k];
                            dojo.query(".ibm-col-last a", this._newDataSource.subTabsContent[k][l])[0].focus();
                        } else {
                            (_3a7.previousSibling && dojo.query("a", _3a7.previousSibling)[0]) ? dojo.query("a", _3a7.previousSibling)[0].focus(): dojo.query("div#ibm-common-menu span")[0].focus();
                        }
                    }
                }
                if (_3a6.keyCode == dojo.keys.UP_ARROW || _3a6.keyCode == dojo.keys.LEFT_ARROW) {
                    var _3aa = dojo.query("> div", _397.scrollableNode),
                        _3ab = dojo.query("a", _3aa[this._currentMenu])[0],
                        curr = dojo.query("a.ibm-active", _3aa[this._currentMenu])[0];
                    if (!!curr) {
                        dojo.stopEvent(_3a6);
                        var prev = curr.parentNode.previousSibling;
                        if (prev == null) {
                            if (curr.parentNode.parentNode.nodeName == "UL") {
                                prev = curr.parentNode.parentNode.previousSibling;
                            }
                        }
                        if (prev != null && prev.firstChild != null && prev.firstChild.nodeName == "A") {
                            prev.firstChild.focus();
                        }
                    }
                }
                if (_3a6.keyCode == dojo.keys.DOWN_ARROW || _3a6.keyCode == dojo.keys.RIGHT_ARROW) {
                    var _3aa = dojo.query("> div", _397.scrollableNode),
                        curr = dojo.query("a.ibm-active", _3aa[this._currentMenu])[0];
                    if (!!curr) {
                        dojo.stopEvent(_3a6);
                        var next = curr.parentNode.nextSibling;
                        if (next) {
                            if (next.nodeName == "UL") {
                                next = next.firstChild;
                            }
                            if (next && next.firstChild && next.firstChild.nodeName == "A") {
                                next.firstChild.focus();
                            }
                        }
                    }
                }
            });
            var span = dojo.query("div#ibm-common-menu div.ibm-mm-close span")[0];
            if (span) {
                dojo.connect(span, "onclick", this, function(_3ac) {
                    ibmweb.util.statsHelper({
                        "ibmEV": ibmweb.config.config + " Megamenu",
                        "ibmEvAction": "Arrow",
                        "ibmEvName": "Close"
                    });
                    dojo.publish("/ibm/dynnav/megamenu/slideUp");
                });
                dojo.connect(span, "onkeypress", this, function(_3ad) {
                    if (_3ad.keyCode == dojo.keys.ESCAPE || _3ad.keyCode == dojo.keys.ENTER || _3ad.keyCode == dojo.keys.SPACE || _3ad.charOrCode == " ") {
                        dojo.stopEvent(_3ad);
                        ibmweb.util.statsHelper({
                            "ibmEV": ibmweb.config.config + " Megamenu",
                            "ibmEvAction": "Arrow",
                            "ibmEvName": "Close"
                        });
                        dojo.publish("/ibm/dynnav/megamenu/slideUp");
                    }
                    if (_3ad.keyCode == dojo.keys.TAB) {
                        var _3ae = dojo.query("> div", _397.scrollableNode),
                            _3af = dojo.query("a", _3ae[this._currentMenu]);
                        if (!_3ad.shiftKey) {
                            dojo.stopEvent(_3ad);
                            _3af[0].focus();
                        }
                        if (_3ad.shiftKey) {
                            dojo.stopEvent(_3ad);
                            var _3b0;
                            if (_3af[_3af.length - 1].parentNode.nodeName == "H3") {
                                _3b0 = _3af[_3af.length - 1].parentNode.parentNode;
                            } else {
                                _3b0 = _3af[_3af.length - 1].parentNode.parentNode.parentNode;
                            }
                            dojo.query("a", _3b0)[0].focus();
                        }
                    }
                    if (_3ad.keyCode == dojo.keys.UP_ARROW || _3ad.keyCode == dojo.keys.RIGHT_ARROW || _3ad.keyCode == dojo.keys.DOWN_ARROW || _3ad.keyCode == dojo.keys.LEFT_ARROW) {
                        dojo.stopEvent(_3ad);
                    }
                });
            }
            var a = dojo.query("#ibm-menu-links a");
            if (a.length > 0) {
                dojo.attr(a[0], "tabindex", (ibmweb.config.config == "w3") ? "2" : "0");
            }
            if (ibmweb.config.config == "w3") {
                dojo.attr(dojo.query("#ibm-home a")[0], "tabindex", "1");
                var _3b1 = dojo.query("#ibm-sso"),
                    _3b2 = _3b1.next("li[role=presentation]");
                dojo.forEach(_3b1.children("a"), function(_3b3) {
                    dojo.attr(_3b3, "tabindex", "3");
                });
                dojo.forEach(_3b2.children("a"), function(_3b4) {
                    dojo.attr(_3b4, "tabindex", "3");
                });
                if (this._w3SwapDesign.secondSwitchEnabled) {
                    if (!ibmweb.config.megamenu.disableUniversalNav) {
                        this._w3SwapDesign.profileLinks = dojo.create("div", {
                            id: "ibm-profile-links"
                        }, "ibm-universal-nav", "last");
                        if (_3b1.length > 0) {
                            this._w3SwapDesign.newSso = dojo.create("div", {
                                id: "ibm-sso",
                                className: "ibm-profile-links-divider",
                                role: "",
                                innerHTML: _3b1[0].innerHTML
                            }, this._w3SwapDesign.profileLinks, "last");
                            dijit.setWaiRole(this._w3SwapDesign.newSso, "presentation");
                        }
                        if (_3b2.length > 0) {
                            this._w3SwapDesign.portalLogOutLink = dojo.create("div", {
                                id: "ibm-portal-logout-link",
                                className: "ibm-profile-links-divider ibm-profile-links-divider--transparent",
                                role: "",
                                innerHTML: _3b2[0].innerHTML
                            }, this._w3SwapDesign.profileLinks, "last");
                            dijit.setWaiRole(this._w3SwapDesign.portalLogOutLink, "presentation");
                        }
                        this._w3SwapDesign.profileCustomLinks = dojo.create("div", {
                            className: "ibm-profile-custom-links"
                        }, this._w3SwapDesign.profileLinks, "last");
                    }
                    if (_3b1.length > 0) {
                        dojo.destroy(_3b1[0]);
                    }
                    if (_3b2.length > 0) {
                        dojo.destroy(_3b2[0]);
                    }
                    var _3b5 = dojo.query("#ibm-mast-options ul");
                    dojo.forEach(_3b5, dojo.hitch(this, function(_3b6) {
                        if (dojo.query(_3b6).children().length == 0) {
                            dojo.destroy(_3b6);
                            return;
                        }
                        dojo.forEach(dojo.query("li:not([id=ibm-home])", _3b6), dojo.hitch(this, function(_3b7) {
                            if (!ibmweb.config.megamenu.disableUniversalNav) {
                                dojo.place(dojo.query("a", _3b7)[0], this._w3SwapDesign.profileCustomLinks, "last");
                            }
                            dojo.destroy(_3b7);
                        }));
                    }));
                } else {
                    this._w3SwapDesign.profileLinks = dojo.query("#ibm-profile-links");
                    this._w3SwapDesign.profileCustomLinks = dojo.query("#ibm-profile-links .ibm-profile-custom-links");
                }
            }
        },
        _subTabs: {
            _title: [],
            _div: [],
            _id: []
        },
        _createSubTabs: function() {
            var con, _3b8, _3b9, _3ba;
            if (this._subTabs._title.length == 0) {
                return;
            }
            var _3bb = dojo.query("#ibm-common-menu > div"),
                _3bc = null,
                jump = dojo.hitch(this, function(e, _3bd) {
                    var li = _3bd.parentNode,
                        _3be = parseInt(/(?:subTab\-\d+\-)(\d+)/g.exec(dojo.attr(li, "className"))[1]),
                        _3bf = null,
                        _3c0 = null;
                    this._newDataSource.subTabsHover[this._newDataSource.curSubMenu][_3be] = true;
                    setTimeout(dojo.hitch(this, function() {
                        if ((!this._newDataSource.subTabsHover[this._newDataSource.curSubMenu][_3be]) || (dojo.hasClass(li, "ibm-active") || this._newDataSource.isSubBeingAnimated)) {
                            return false;
                        }
                        this._newDataSource.isSubBeingAnimated = true;
                        this._newDataSource.subTabsActItem[this._newDataSource.curSubMenu] = e.target.textContent;
                        this._newDataSource.subTabsActItem_idx[this._newDataSource.curSubMenu] = _3be;
                        ibmweb.util.statsHelper({
                            "ibmEV": ibmweb.config.config + " Megamenu",
                            "ibmEvAction": "Mouse over",
                            "ibmEvName": ((ibmweb.config.config === "www") ? this._unicaTagsWWWMenuNames[this._currentMenu] : this._unicaTagsW3MenuNames[this._currentMenu]) + " - " + this._newDataSource.subTabsActItem[this._newDataSource.curSubMenu],
                            "ibmEvSection": "Subcategory Change"
                        });
                        dojo.query("li.ibm-active", _3b8).removeClass("ibm-active");
                        dojo.addClass(li, "ibm-active");
                        dojo.forEach(this._newDataSource.subTabs[this._newDataSource.curSubMenu], dojo.hitch(this, function(_3c1, i) {
                            var _3c2 = dojo.query("a", _3c1)[0],
                                _3c3 = this._newDataSource.subTabsContent[this._newDataSource.curSubMenu][i],
                                disp = dojo.style(_3c3, "display");
                            if (disp == "none" && i == _3be) {
                                _3c0 = _3c3;
                            }
                            if (disp == "block" && i != _3be) {
                                _3bf = _3c3;
                            }
                        }));
                        dojo.animateProperty({
                            node: _3bf,
                            properties: {
                                opacity: {
                                    start: 1,
                                    end: 0
                                }
                            },
                            duration: 180,
                            onEnd: dojo.hitch(this, function() {
                                dojo.style(_3bf, "display", "none");
                                dojo.style(_3c0, {
                                    opacity: 1,
                                    display: "block"
                                });
                                this._newDataSource.isSubBeingAnimated = false;
                            })
                        }).play();
                    }), 200);
                });
            if (_3bb.length == 1 && _3bb[0].id) {
                _3bc = _3bb[0].id;
            } else {
                return false;
            }
            con = dojo.query(this._subTabs._div[0]).closest(".ibm-container-body");
            if (dojo.query(".ibm-menu-subtabs", con[0]).length == 0) {
                _3b8 = dojo.create("div", {
                    className: "ibm-menu-subtabs ibm-is-hidden"
                }, con[0], "first");
                _3b9 = dojo.create("ul", {
                    role: ""
                }, _3b8);
                dijit.setWaiRole(_3b9, "toolbar");
                dojo.attr(_3b9, "aria-label", "subtab menu list");
            }
            this._newDataSource.subTabMenu = _3b8;
            dojo.forEach(this._subTabs._title, dojo.hitch(this, function(_3c4, t) {
                if (typeof _3c4 === "undefined") {
                    return;
                }
                var _3c5 = dojo.query("#ibmweb_ribbonSlide_" + this._subTabs._div[t].id.split("ibmweb_ribbonItemAbstract_")[1]);
                if (typeof this._newDataSource.subTabs[t] === "undefined") {
                    this._newDataSource.subTabs[t] = new Array();
                    this._newDataSource.subTabsContent[t] = new Array();
                    this._newDataSource.subTabsHover[t] = new Array();
                    dojo.forEach(_3c4, dojo.hitch(this, function(_3c6, x) {
                        var _3c7 = dojo.create("li", {
                            className: "subTab-" + t + "-" + x,
                            role: ""
                        }, _3b9);
                        dijit.setWaiRole(_3c7, "presentation");
                        if (x == 0) {
                            if (t == 0) {
                                dojo.addClass(_3c7, "ibm-active");
                            }
                            this._newDataSource.subTabsActItem[t] = _3c6;
                            this._newDataSource.subTabsActItem_idx[t] = 0;
                        }
                        var link = dojo.create("a", {
                            href: "#",
                            innerHTML: _3c6,
                            role: ""
                        }, _3c7);
                        dijit.setWaiRole(link, "button");
                        dojo.style(_3c7, "display", "none");
                        this._newDataSource.subTabs[t][x] = _3c7;
                        this._newDataSource.subTabsContent[t][x] = dojo.query(".ibm-menu-dynamic", _3c5[0])[x];
                        this._newDataSource.subTabsHover[t][x] = false;
                        dojo.connect(link, "onfocus", this, function(_3c8) {
                            dojo.stopEvent(_3c8);
                            jump(_3c8, link);
                        });
                        dojo.connect(link, "onclick", function(_3c9) {
                            dojo.stopEvent(_3c9);
                        });
                        dojo.connect(link, "onmouseover", function(_3ca) {
                            dojo.stopEvent(_3ca);
                            link.focus();
                        });
                        dojo.connect(link, "onmouseout", this, function(_3cb) {
                            dojo.stopEvent(_3cb);
                            this._newDataSource.subTabsHover[t][x] = false;
                        });
                        dojo.connect(link, "onkeypress", this, function(_3cc) {
                            if (_3cc.keyCode == dojo.keys.ESCAPE) {
                                dojo.stopEvent(_3cc);
                                dojo.publish("/ibm/dynnav/megamenu/slideUp");
                            }
                            if (_3cc.keyCode == dojo.keys.LEFT_ARROW || _3cc.keyCode == dojo.keys.UP_ARROW) {
                                var prev = _3cc.target.parentNode.previousSibling;
                                if (dojo.indexOf(this._newDataSource.subTabs[t], prev) >= 0) {
                                    dojo.stopEvent(_3cc);
                                    prev.firstChild.focus();
                                } else {
                                    dojo.stopEvent(_3cc);
                                    var last = this._newDataSource.subTabs[t].length - 1;
                                    dojo.query(this._newDataSource.subTabs[t][last]).children("a")[0].focus();
                                }
                            }
                            if (_3cc.keyCode == dojo.keys.RIGHT_ARROW || _3cc.keyCode == dojo.keys.DOWN_ARROW) {
                                var next = _3cc.target.parentNode.nextSibling;
                                if (dojo.indexOf(this._newDataSource.subTabs[t], next) >= 0) {
                                    dojo.stopEvent(_3cc);
                                    next.firstChild.focus();
                                } else {
                                    dojo.stopEvent(_3cc);
                                    dojo.query(this._newDataSource.subTabs[t][0]).children("a")[0].focus();
                                }
                            }
                            if (_3cc.keyCode == dojo.keys.ENTER || (_3cc.keyCode == dojo.keys.SPACE || _3cc.charOrCode == " ")) {
                                dojo.stopEvent(_3cc);
                                var _3cd = dojo.query(this._newDataSource.subTabsContent[t][x]).children()[0],
                                    ul = dojo.query(_3cd).children()[1],
                                    li = dojo.query(ul).children()[0],
                                    a = dojo.query(li).children()[0];
                                a.focus();
                            }
                        });
                    }));
                }
            }));
            dojo.forEach(dojo.query(".ibm-menu-dynamic a", con[0]), dojo.hitch(this, function(link) {
                dojo.connect(link, "onclick", dojo.hitch(this, function(_3ce) {
                    dojo.stopEvent(_3ce);
                    ibmweb.util.statsHelper({
                        "ibmEV": ibmweb.config.config + " Megamenu",
                        "ibmEvAction": _3ce.target.href,
                        "ibmEvName": ((ibmweb.config.config === "www") ? this._unicaTagsWWWMenuNames[this._currentMenu] : this._unicaTagsW3MenuNames[this._currentMenu]) + " - " + this._newDataSource.subTabsActItem[this._newDataSource.curSubMenu],
                        "ibmEvSection": "Link Clicks"
                    });
                    this._waitBeforeAssignPage = setTimeout(dojo.hitch(this, function() {
                        clearTimeout(this._waitBeforeAssignPage);
                        location.assign(_3ce.target.href);
                    }), 800);
                }));
                dojo.connect(link, "onfocus", function(_3cf) {
                    _3cf.target.className = "ibm-active";
                });
                dojo.connect(link, "onblur", function(_3d0) {
                    _3d0.target.className = "";
                });
                dojo.connect(link, "onkeypress", dojo.hitch(this, function(_3d1) {
                    if (_3d1.keyCode == dojo.keys.ENTER) {
                        dojo.stopEvent(_3d1);
                        ibmweb.util.statsHelper({
                            "ibmEV": ibmweb.config.config + " Megamenu",
                            "ibmEvAction": _3d1.target.href,
                            "ibmEvName": ((ibmweb.config.config === "www") ? this._unicaTagsWWWMenuNames[this._currentMenu] : this._unicaTagsW3MenuNames[this._currentMenu]) + " - " + this._newDataSource.subTabsActItem[this._newDataSource.curSubMenu],
                            "ibmEvSection": "Link Clicks"
                        });
                        this._waitBeforeAssignPage = setTimeout(dojo.hitch(this, function() {
                            clearTimeout(this._waitBeforeAssignPage);
                            location.assign(_3d1.target.href);
                        }), 800);
                    }
                }));
            }));
            dojo.forEach(dojo.query(".ibm-menu-static a", con[0]), dojo.hitch(this, function(link) {
                dojo.connect(link, "onfocus", function(_3d2) {
                    _3d2.target.className = "ibm-active";
                });
                dojo.connect(link, "onblur", function(_3d3) {
                    _3d3.target.className = "";
                });
                dojo.connect(link, "onclick", dojo.hitch(this, function(_3d4) {
                    dojo.stopEvent(_3d4);
                    ibmweb.util.statsHelper({
                        "ibmEV": ibmweb.config.config + " Megamenu",
                        "ibmEvAction": _3d4.target.href,
                        "ibmEvName": ((ibmweb.config.config === "www") ? this._unicaTagsWWWMenuNames[this._currentMenu] : this._unicaTagsW3MenuNames[this._currentMenu]) + " - persistentColumn",
                        "ibmEvSection": "Link Clicks"
                    });
                    this._waitBeforeAssignPage = setTimeout(dojo.hitch(this, function() {
                        clearTimeout(this._waitBeforeAssignPage);
                        location.assign(_3d4.target.href);
                    }), 800);
                }));
                dojo.connect(link, "onkeypress", dojo.hitch(this, function(_3d5) {
                    if (_3d5.keyCode == dojo.keys.ENTER) {
                        dojo.stopEvent(_3d5);
                        ibmweb.util.statsHelper({
                            "ibmEV": ibmweb.config.config + " Megamenu",
                            "ibmEvAction": _3d5.target.href,
                            "ibmEvName": ((ibmweb.config.config === "www") ? this._unicaTagsWWWMenuNames[this._currentMenu] : this._unicaTagsW3MenuNames[this._currentMenu]) + " - persistentColumn",
                            "ibmEvSection": "Link Clicks"
                        });
                        this._waitBeforeAssignPage = setTimeout(dojo.hitch(this, function() {
                            clearTimeout(this._waitBeforeAssignPage);
                            location.assign(_3d5.target.href);
                        }), 800);
                    }
                    if (!_3d5.shiftKey && _3d5.keyCode == dojo.keys.TAB) {
                        dojo.stopEvent(_3d5);
                    }
                }));
            }));
            dojo.connect(dijit.byId(_3bc), "slideTo", dojo.hitch(this, function(i) {
                if (typeof this._newDataSource.subTabs[i] !== "undefined") {
                    if (this._newDataSource.hidden) {
                        if (this._newDataSource.isBeingAnimated) {
                            return false;
                        }
                        this._newDataSource.isBeingAnimated = true;
                        dojo.animateProperty({
                            node: _3b8,
                            properties: {
                                opacity: {
                                    start: 0,
                                    end: 1
                                },
                                marginTop: {
                                    start: -39,
                                    end: 0
                                },
                                marginBottom: {
                                    start: 20,
                                    end: 0
                                }
                            },
                            duration: 600,
                            onBegin: function() {
                                dojo.query("#ibm-masthead .ibm-mm-close")[0].style.marginTop = "0px";
                            },
                            onEnd: dojo.hitch(this, function() {
                                this._newDataSource.hidden = false;
                                this._newDataSource.isBeingAnimated = false;
                                dojo.query("#ibm-masthead .ibm-mm-close")[0].style.marginTop = "-65px";
                            })
                        }).play();
                    }
                } else {
                    if (!this._newDataSource.hidden) {
                        if (this._newDataSource.isBeingAnimated) {
                            return false;
                        }
                        this._newDataSource.isBeingAnimated = true;
                        dojo.animateProperty({
                            node: _3b8,
                            properties: {
                                opacity: {
                                    start: 1,
                                    end: 0
                                },
                                marginTop: {
                                    start: 0,
                                    end: -39
                                },
                                marginBottom: {
                                    start: 0,
                                    end: 20
                                }
                            },
                            duration: 600,
                            onBegin: function() {
                                dojo.query("#ibm-masthead .ibm-mm-close")[0].style.marginTop = "0px";
                            },
                            onEnd: dojo.hitch(this, function() {
                                this._newDataSource.hidden = true;
                                this._newDataSource.isBeingAnimated = false;
                                dojo.query("#ibm-masthead .ibm-mm-close")[0].style.marginTop = "-45px";
                            })
                        }).play();
                    }
                }
            }));
        },
        _buildMegaMenu: function(data, _3d6) {
            var id = ibmweb.util.generateId(),
                div = dojo.create("div", {
                    className: "ibm-columns",
                    id: id
                });
            this._subTabs._div[_3d6] = div;
            this._subTabs._id[_3d6] = id;
            if (this._newDataSource.use && data.length > 1) {
                dijit.setWaiRole(div, "group");
                dojo.attr(div, "aria-labelledby", "ibm-rib-head-" + _3d6);
                var _3d7 = [],
                    _3d8 = 4,
                    con, _3d9, _3da, _3db = dojo.create("div"),
                    _3dc;
                dojo.forEach(data, dojo.hitch(this, function(_3dd, dIdx) {
                    this._newDataSource.hasDynTitle = false;
                    var dif = 1;
                    if (dojo.filter(_3dd.child, function(item) {
                            return item.persistentColumn;
                        }).length == 1) {
                        if (dIdx > 6) {
                            return;
                        }
                        dif = 2;
                    } else {
                        if (dIdx > 5) {
                            return;
                        }
                    }
                    if (typeof this._subTabs._title[_3d6] == "undefined") {
                        this._subTabs._title[_3d6] = new Array();
                    }
                    this._subTabs._title[_3d6][dIdx] = _3dd.title.htmlspecialchars();
                    var _3de = -1,
                        _3df = dojo.create("div", {
                            className: "ibm-col-5-4 ibm-menu-dynamic"
                        }, _3db);
                    if (dIdx > 0) {
                        dojo.style(_3df, "display", "none");
                    }
                    dojo.forEach(_3dd.child, dojo.hitch(this, function(_3e0, x) {
                        if (_3e0.persistentColumn && _3e0.persistentColumn == "yes") {
                            _3dc = dojo.create("div", {
                                className: "ibm-col-5-1 ibm-menu-static"
                            });
                            var _3e1 = dojo.create("h3", {
                                    innerHTML: _3e0.title.htmlspecialchars(),
                                    id: "ibm-menu-related-links-title"
                                }, _3dc),
                                _3e2 = dojo.create("ul", {
                                    role: "",
                                    "aria-labelledby": "ibm-menu-related-links-title"
                                }, _3dc);
                            dijit.setWaiRole(_3e2, "menu");
                            dojo.forEach(_3e0.child, function(_3e3) {
                                var tLi = dojo.create("li", {
                                        role: ""
                                    }, _3e2),
                                    tA = dojo.create("a", {
                                        href: _3e3.url,
                                        tabindex: -1,
                                        role: "",
                                        innerHTML: _3e3.title.htmlspecialchars()
                                    }, tLi);
                                dijit.setWaiRole(tLi, "presentation");
                                dijit.setWaiRole(tA, "menuitem");
                            });
                        } else {
                            _3de++;
                            if (_3de >= _3d8) {
                                dojo.addClass(dojo.query(".ibm-col-4-1:last-child", _3df)[0], "ibm-col-last");
                                return;
                            }
                            var _3e4 = (x + dif == _3dd.child.length) ? " ibm-col-last" : "",
                                _3e5 = dojo.create("div", {
                                    className: "ibm-col-4-1" + _3e4,
                                    role: ""
                                }, _3df),
                                h3 = dojo.create("h3", null, _3e5),
                                _3e6 = dojo.create("ul", {
                                    role: "menu"
                                }, _3e5);
                            dijit.setWaiRole(_3e5, "menu");
                            dojo.attr(_3e5, "aria-label", "menu list");
                            dojo.attr(_3e6, "aria-label", "menu list");
                            if (_3e0.title == "" || _3e0.title == " " || _3e0.title.length == 0) {
                                dojo.destroy(h3);
                                dojo.style(_3e6, "marginTop", "26px");
                            } else {
                                if (!this._newDataSource.hasDynTitle) {
                                    this._newDataSource.hasDynTitle = true;
                                }
                                if (_3e0.url && _3e0.url.length > 0 && _3e0.url != " ") {
                                    dojo.create("a", {
                                        tabIndex: "-1",
                                        href: _3e0.url,
                                        innerHTML: _3e0.title.htmlspecialchars()
                                    }, h3);
                                    dojo.attr(h3, "role", "");
                                    dijit.setWaiRole(h3, "menuitem");
                                } else {
                                    dojo.attr(h3, "innerHTML", _3e0.title.htmlspecialchars());
                                }
                            }
                            dojo.forEach(_3e0.child, function(_3e7, cIdx) {
                                var _3e8 = dojo.create("li", {
                                        role: ""
                                    }, _3e6),
                                    _3e9 = dojo.create("a", {
                                        href: _3e7.url,
                                        tabIndex: "-1",
                                        role: "",
                                        innerHTML: _3e7.title.htmlspecialchars()
                                    }, _3e8);
                                dijit.setWaiRole(_3e8, "presentation");
                                dijit.setWaiRole(_3e9, "menuitem");
                            });
                        }
                    }));
                    if (!this._newDataSource.hasDynTitle) {
                        dojo.style(_3df, "paddingTop", "0px");
                    }
                }));
                if (typeof _3dc !== "undefined") {
                    dojo.place(_3dc, _3db);
                }
                div.innerHTML = _3db.innerHTML;
            }
            if (!this._newDataSource.use || (this._newDataSource.use && data.length == 1)) {
                dijit.setWaiRole(div, "group");
                dojo.attr(div, "aria-labelledby", "ibm-rib-head-" + _3d6);
                var _3ea = null,
                    _3eb = dojo.hitch(this, function(_3ec) {
                        var col = dojo.create("div", {
                            className: "ibm-col-6-1"
                        }, div);
                        dijit.setWaiRole(col, "menu");
                        dojo.attr(col, "aria-label", "menu list");
                        if (_3ec.title && _3ec.title.length > 0 && _3ec.title != " ") {
                            _3ea = _3ec.title.htmlspecialchars();
                            co = 1;
                        }
                        if (_3ea == null) {
                            _3ea = this._itemtitle;
                        }
                        if (_3ec.url) {
                            var h3 = dojo.create("h3", {}, col),
                                a = dojo.create("a", {
                                    innerHTML: _3ec.title.htmlspecialchars(),
                                    href: _3ec.url,
                                    tabIndex: "-1"
                                }, h3);
                            dijit.setWaiRole(h3, "menuitem");
                            dojo.connect(a, "onfocus", this, function(_3ed) {
                                _3ed.target.className = "ibm-active";
                            });
                            dojo.connect(a, "onblur", this, function(_3ee) {
                                _3ee.target.className = "";
                            });
                            dijit.setWaiState(col, "label", _3ec.title.htmlspecialchars() + " menu");
                        } else {
                            if (_3ec.title == " ") {
                                co++;
                                dojo.create("h3", {
                                    innerHTML: _3ea + " menu list " + co,
                                    className: "ibm-access"
                                }, col);
                                dijit.setWaiState(col, "label", _3ea + " menu list " + co);
                            } else {
                                dojo.create("h3", {
                                    innerHTML: _3ec.title.htmlspecialchars()
                                }, col);
                                dijit.setWaiState(col, "label", _3ea + " menu");
                            }
                        }
                        var ul;
                        if (_3ec.title == " ") {
                            ul = dojo.create("ul", _3ec.extraClass ? {
                                "className": "ibm-" + _3ec.extraClass,
                                style: {
                                    marginTop: ((ibmweb.config.config == "www") ? 26 : 19) + "px"
                                }
                            } : {
                                style: {
                                    marginTop: ((ibmweb.config.config == "www") ? 26 : 19) + "px"
                                }
                            }, col);
                        } else {
                            ul = dojo.create("ul", _3ec.extraClass ? {
                                "className": "ibm-" + _3ec.extraClass
                            } : null, col);
                        }
                        dijit.setWaiRole(ul, "menu");
                        dojo.attr(ul, "aria-label", _3ea + " menu list");
                        var _3ef = (_3ec.child.length > ibmweb.config.megamenu.maxRows) ? ibmweb.config.megamenu.maxRows : _3ec.child.length;
                        for (var k = 0; k < _3ef; k++) {
                            var _3f0 = _3ec.child[k];
                            if (_3f0.url != null && _3f0.url != "" && _3f0.title.htmlspecialchars().replace(/^\s+|\s+$/g, "") != "") {
                                var li = dojo.create("li", {}, ul);
                                dijit.setWaiRole(li, "presentation");
                                var a = dojo.create("a", {
                                    innerHTML: _3f0.title.htmlspecialchars(),
                                    href: _3f0.url,
                                    tabIndex: "-1"
                                }, li);
                                dijit.setWaiRole(a, "menuitem");
                                dojo.connect(a, "onclick", dojo.hitch(this, function(_3f1) {
                                    dojo.stopEvent(_3f1);
                                    ibmweb.util.statsHelper({
                                        "ibmEV": ibmweb.config.config + " Megamenu",
                                        "ibmEvAction": _3f1.target.href,
                                        "ibmEvName": ((ibmweb.config.config === "w3") ? this._unicaTagsW3MenuNames[this._currentMenu] : this._unicaTagsWWWMenuNames[this._currentMenu]),
                                        "ibmEvSection": "Link Clicks"
                                    });
                                    this._waitBeforeAssignPage = setTimeout(dojo.hitch(this, function() {
                                        clearTimeout(this._waitBeforeAssignPage);
                                        location.assign(_3f1.target.href);
                                    }), 800);
                                }));
                                dojo.connect(a, "onkeypress", dojo.hitch(this, function(_3f2) {
                                    if (_3f2.keyCode == dojo.keys.ENTER) {
                                        dojo.stopEvent(_3f2);
                                        ibmweb.util.statsHelper({
                                            "ibmEV": ibmweb.config.config + " Megamenu",
                                            "ibmEvAction": _3f2.target.href,
                                            "ibmEvName": ((ibmweb.config.config === "w3") ? this._unicaTagsW3MenuNames[this._currentMenu] : this._unicaTagsWWWMenuNames[this._currentMenu]),
                                            "ibmEvSection": "Link Clicks"
                                        });
                                        this._waitBeforeAssignPage = setTimeout(dojo.hitch(this, function() {
                                            clearTimeout(this._waitBeforeAssignPage);
                                            location.assign(_3f2.target.href);
                                        }), 800);
                                    }
                                }));
                                dojo.connect(a, "onfocus", this, function(_3f3) {
                                    _3f3.target.className = "ibm-active";
                                });
                                dojo.connect(a, "onblur", this, function(_3f4) {
                                    _3f4.target.className = "";
                                });
                            }
                        }
                    }),
                    max = (data.length > ibmweb.config.megamenu.maxColumns) ? ibmweb.config.megamenu.maxColumns : data.length;
                for (var co, i = 0; i < max; i++) {
                    if (this._newDataSource.use) {
                        var _3f5 = data[i].child;
                        dojo.style(div, "paddingTop", "10px");
                        dojo.forEach(_3f5, dojo.hitch(this, function(cd) {
                            _3eb(cd);
                        }));
                    } else {
                        _3eb(data[i]);
                    }
                }
            }
            return div;
        },
        _slideDown: function(id) {
            if (!id && arguments[0]) {
                id = arguments[0];
            }
            if (this._animationInProgress) {
                return false;
            }
            this._animationInProgress = true;
            if (this._newDataSource.use && this._newDataSource.subTabMenu !== null) {
                if (typeof this._newDataSource.subTabs[id] === "undefined") {
                    dojo.style(this._newDataSource.subTabMenu, {
                        marginBottom: "20px",
                        marginTop: "-39px",
                        opacity: 0
                    });
                    this._newDataSource.hidden = true;
                } else {
                    dojo.addClass(this._newDataSource.subTabs[id][this._newDataSource.subTabsActItem_idx[id]], "ibm-active");
                }
            }
            dojo.query("#ibm-common-menu").style({
                display: "block",
                height: "1px",
                overflow: "hidden"
            });
            dojo.anim("ibm-common-menu", {
                height: 292
            }, 200);
            if (!ibmweb.config.megamenu.noScroll) {
                if (true) {
                    if ((ibmweb.info.isIE && ibmweb.info.ieVersion <= 6) || ibmweb.info.iDevice) {} else {
                        dojo.anim("ibm-top", {
                            marginTop: 292 + this._dimensions.basicMarginTop
                        }, 200);
                    }
                }
            }
            dojo.animateProperty({
                node: dojo.query("#ibm-common-menu .ibm-ribbon-pane")[0],
                duration: 200,
                properties: {
                    height: {
                        start: "1",
                        end: "292"
                    }
                },
                onBefore: function() {
                    if (this._newDataSource.use) {
                        dojo.query("#ibm-masthead .ibm-mm-close")[0].style.marginTop = "0px";
                    }
                },
                onEnd: dojo.hitch(this, function() {
                    this._animationInProgress = false;
                    dojo.query("div#ibm-common-menu .ibm-ribbon-section a").attr("tabIndex", "-1");
                    var temp = dojo.query("div#ibm-common-menu .ibm-ribbon-section > div");
                    if (temp.length > 0) {
                        temp = dojo.query("a", temp[id]);
                    }
                    if (temp.length != 0) {
                        temp.attr("tabIndex", "0");
                    }
                    if (this._newDataSource.use) {
                        dojo.query("#ibm-masthead .ibm-mm-close")[0].style.marginTop = (typeof this._newDataSource.subTabs[id] === "undefined") ? "-45px" : "-65px";
                    }
                })
            }).play();
            dojo.query("#ibm-menu-links a")[id].className = "ibm-active";
            dojo.query("#ibm-menu-links li")[id].className = "ibm-active";
            dojo.query("#ibm-menu-links li.ibm-inactive").removeClass("ibm-inactive");
            this._currentMenu = id;
            if (this._newDataSource.use) {
                if (typeof this._newDataSource.subTabs[id] !== "undefined") {
                    this._newDataSource.curSubMenu = id;
                    dojo.forEach(this._newDataSource.subTabs[id], dojo.hitch(this, function(_3f6) {
                        dojo.style(_3f6, "display", "block");
                    }));
                }
            }
            if (!this._lock) {
                this._lock = true;
                dojo.query("#ibm-common-menu .ibm-col-6-1 ul").forEach(function(item) {
                    var h = dojo.coords(item, true).h;
                    if (item.parentNode.firstChild.className == "ibm-access") {
                        for (; h > 272; h = dojo.coords(item, true).h) {
                            dojo.destroy(item.lastChild);
                        }
                    } else {
                        for (; h > 242; h = dojo.coords(item, true).h) {
                            dojo.destroy(item.lastChild);
                        }
                    }
                });
            }
        },
        _slideUp: function(evt, _3f7) {
            if (this._currentMenu == null || this._animationInProgress) {
                return;
            }
            if (this._slideToTimer) {
                clearTimeout(this._slideToTimer);
                this._slideToTimer = null;
            }
            this._animationInProgress = true;
            var id = this._currentMenu;
            dojo.animateProperty({
                node: "ibm-common-menu",
                duration: 400,
                properties: {
                    height: {
                        start: "292",
                        end: "1"
                    }
                },
                onEnd: dojo.hitch(this, function() {
                    dojo.query("#ibm-common-menu").style("display", "none");
                    if (this._newDataSource.use && this._newDataSource.subTabMenu !== null) {
                        dojo.style(this._newDataSource.subTabMenu, {
                            marginBottom: "20px",
                            marginTop: "-39px",
                            opacity: 0
                        });
                        this._newDataSource.hidden = true;
                    }
                    if (ibmweb.config.config === "w3") {
                        this._w3SwapDesign.currentLink = -1;
                    }
                    if (_3f7) {
                        setTimeout(_3f7, 1);
                    }
                })
            }).play();
            dojo.animateProperty({
                node: dojo.query("#ibm-common-menu .ibm-ribbon-pane")[0],
                duration: 400,
                properties: {
                    height: {
                        start: "292",
                        end: "1"
                    }
                },
                onEnd: dojo.hitch(this, function() {
                    if (this._newDataSource.use) {
                        if (typeof this._newDataSource.subTabs[id] !== "undefined") {
                            dojo.forEach(this._newDataSource.subTabs[id], dojo.hitch(this, function(_3f8) {
                                dojo.style(_3f8, "display", "none");
                            }));
                        }
                        this._newDataSource.curSubMenu = null;
                    }
                    this._animationInProgress = false;
                    if (ibmweb.config.megamenu.minimizeByDefault) {
                        (evt && evt.target && evt.target.id === "ibm-masthead") ? this._minimizeMenu(): null;
                    }
                })
            }).play();
            dojo.query("#ibm-common-menu a").attr("tabIndex", "-1");
            this._currentMenu = null;
            var _3f9 = dojo.query("#ibm-menu-links a.ibm-active")[0];
            if (typeof _3f9 !== "undefined") {
                _3f9.focus();
                _3f9.parentNode.className = "ibm-inactive";
                dojo.removeClass(_3f9, "ibm-active");
            }
            if (!((ibmweb.info.isIE && ibmweb.info.ieVersion <= 6) || ibmweb.info.iDevice)) {
                dojo.anim("ibm-top", {
                    marginTop: (!ibmweb.config.megamenu.noScroll) ? (ibmweb.config.megamenu.minimizeByDefault && this._isMinimizingOnMouseLeaveSemaphore === true) ? 33 : this._dimensions.basicMarginTop : 0
                }, 370);
            }
        },
        onVScrollCallback: function(_3fa) {
            if (this._mouseover || this._keepexpanded || this._beingAnimated) {
                return;
            }
            var _3fb = true,
                _3fc = (this._isExpanded) ? this._dimensions.basicMarginTop : 36,
                _3fd = (self.pageYOffset) ? self.pageYOffset : (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : (document.body) ? document.body.scrollTop : 0;
            if ((this._isExpanded == false && _3fd < _3fc) || (this._isExpanded == true && _3fd <= _3fc && _3fd >= 0)) {
                _3fb = false;
            }
            if (!ibmweb.config.megamenu.minimizeByDefault) {
                if (!window.pageYOffset && document.documentElement.scrollTop == 0 || (window.pageYOffset && window.pageYOffset == 0)) {
                    if (dojo.byId("ibm-menu-links").className == "ibm-access") {
                        this._expandMenu();
                    }
                } else {
                    if (dojo.byId("ibm-menu-links").className != "ibm-access" && _3fb) {
                        this._minimizeMenu();
                    }
                }
            } else {
                this._minimizeMenu();
            }
        },
        onHScrollCallback: function(_3fe) {
            dojo.stopEvent(_3fe);
            if (!window.pageXOffset && window.pageXOffset != 0) {
                dojo.style(dojo.byId("ibm-masthead"), "left", "-" + document.documentElement.scrollLeft + "px");
            } else {
                dojo.style(dojo.byId("ibm-masthead"), "left", "-" + window.pageXOffset + "px");
            }
        },
        isTypeAheadResultDisplay: function() {
            var _3ff = false;
            if (dojo.query(".typeahead-results").some(function(node) {
                    return node.style.display != "none";
                })) {
                _3ff = true;
            }
            return _3ff;
        },
        isScopePopupDisplay: function() {
            var _400 = dojo.query("#ibm-scope-button_dropdown.dijitPopup");
            if (_400 && _400.length > 0 && _400[0].style.display != "none" && _400[0].style.visibility != "hidden") {
                return true;
            }
            return false;
        },
        _minimizeMenu: function(_401) {
            if (this.isTypeAheadResultDisplay() || this.isScopePopupDisplay()) {
                return;
            }
            _401 = _401 || 150;
            this._slideUp();
            if ((ibmweb.info.isIE && ibmweb.info.ieVersion <= 6) || ibmweb.info.iDevice) {
                return false;
            }
            var _402 = (ibmweb.config.config == "www" ? 30 : 0),
                _403 = (ibmweb.config.config == "www" ? 4 : 31);
            if (dojo.byId("ibm-universal-nav").style.height != (_402 + "px")) {
                dojo.animateProperty({
                    node: "ibm-universal-nav",
                    properties: {
                        height: _402
                    },
                    beforeBegin: dojo.hitch(this, function() {
                        this._beingAnimated = true;
                    }),
                    duration: _401
                }).play();
            }
            if (dojo.byId("ibm-mast-options").style.height != (_403 + "px")) {
                dojo.animateProperty({
                    node: "ibm-mast-options",
                    properties: {
                        height: _403
                    },
                    beforeBegin: dojo.hitch(this, function() {
                        if (ibmweb.config.config == "w3" && this._w3SwapDesign.profileLinks !== null) {
                            dojo.style(this._w3SwapDesign.profileLinks, "display", "none");
                        }
                    }),
                    duration: _401
                }).play();
            }
            dojo.animateProperty({
                node: "ibm-top",
                properties: {
                    marginTop: (!ibmweb.config.megamenu.noScroll) ? 33 : 0
                },
                duration: _401,
                onEnd: dojo.hitch(this, function() {
                    if (ibmweb.config.megamenu.icons != "none") {
                        dojo.query(".ibm-masthead-indicator").style("display", "block").removeClass("ibm-access");
                    }
                    dojo.publish("/ibm/dynnav/megamenu/minimized");
                    this._beingAnimated = false;
                    this._isExpanded = false;
                })
            }).play();
            if (ibmweb.config.config == "www") {
                dojo.query("#ibm-mast-options li, #ibm-mast-options ul").addClass("ibm-access");
            }
            if (ibmweb.config.config == "w3") {
                dojo.query("#ibm-mast-options li").addClass("ibm-access");
                dojo.query("#ibm-menu-links li").addClass("ibm-access");
            }
            if (ibmweb.config.config == "www") {
                dojo.query("#ibm-menu-links, #ibm-search-module,#ibm-arrow-logo").addClass("ibm-access");
            }
            if (ibmweb.config.config == "w3") {
                if (this._w3SwapDesign.secondSwitchEnabled) {
                    dojo.query("#ibm-menu-links, #ibm-search-module,#ibm-arrow-logo").addClass("ibm-access");
                } else {
                    dojo.query("#ibm-menu-links,#ibm-arrow-logo").addClass("ibm-access");
                    dojo.style(dojo.byId("ibm-search-module"), "display", "none");
                }
            }
            dojo.style("ibm-home", "display", "block");
            if (ibmweb.config.config == "w3") {
                dojo.query("#ibm-home").removeClass("ibm-access");
            }
            dojo.addClass("ibm-home", "ibm-sm-logo");
        },
        _expandMenu: function() {
            if ((ibmweb.info.isIE && ibmweb.info.ieVersion <= 6) || ibmweb.info.iDevice) {
                return false;
            }
            var _404 = (ibmweb.config.config == "www" ? 21 : 38);
            if (ibmweb.config.megamenu.icons != "none") {
                dojo.query(".ibm-masthead-indicator").style("display", "none").addClass("ibm-access");
            }
            dojo.animateProperty({
                node: "ibm-universal-nav",
                properties: {
                    height: this._dimensions.basicUniversalHeight
                },
                beforeBegin: dojo.hitch(this, function() {
                    this._beingAnimated = true;
                }),
                duration: 150
            }).play();
            dojo.animateProperty({
                node: "ibm-mast-options",
                properties: {
                    height: _404
                },
                duration: 150,
                onEnd: dojo.hitch(this, function() {
                    dojo.query("#ibm-mast-options li, #ibm-mast-options ul").removeClass("ibm-access");
                    dojo.query("#ibm-menu-links li").removeClass("ibm-access");
                    if (ibmweb.config.config == "www") {
                        dojo.query("#ibm-menu-links, #ibm-search-module").removeClass("ibm-access");
                    }
                    if (ibmweb.config.config == "w3") {
                        if (this._w3SwapDesign.secondSwitchEnabled) {
                            dojo.query("#ibm-menu-links,#ibm-search-module").removeClass("ibm-access");
                        } else {
                            dojo.query("#ibm-menu-links").removeClass("ibm-access");
                            dojo.style(dojo.byId("ibm-search-module"), "display", "block");
                        }
                        dojo.query("#ibm-menu-links li").removeClass("ibm-access");
                        if (this._w3SwapDesign.profileLinks !== null) {
                            dojo.style(this._w3SwapDesign.profileLinks, "display", "block");
                        }
                    }
                    dojo.removeClass("ibm-home", "ibm-sm-logo");
                    dojo.publish("/ibm/dynnav/megamenu/expanded");
                })
            }).play();
            dojo.animateProperty({
                node: "ibm-top",
                properties: {
                    marginTop: (!ibmweb.config.megamenu.noScroll) ? this._dimensions.basicMarginTop : 0
                },
                duration: 150,
                onEnd: dojo.hitch(this, function() {
                    this._beingAnimated = false;
                    this._isExpanded = true;
                })
            }).play();
        },
        onMouseEnter: function(_405) {
            clearTimeout(this._slideUpTimer);
            this._expandTimer = setTimeout(dojo.hitch(this, function() {
                this._mouseleaveHandlerEnabled = true;
                this._mouseover = true;
                if (dojo.byId("ibm-menu-links").className == "ibm-access") {
                    this._expandMenu();
                }
            }), 350);
        },
        onMouseLeave: function(_406) {
            if (this._delayedExpandTimer) {
                clearTimeout(this._delayedExpandTimer);
            }
            if (this._expandTimer) {
                clearTimeout(this._expandTimer);
                this._expandTimer = null;
            }
            if (!this._mouseleaveHandlerEnabled) {
                return;
            }
            this._slideUpTimer = setTimeout(dojo.hitch(this, function() {
                if (this._currentMenu !== null) {
                    ibmweb.util.statsHelper({
                        "ibmEV": ibmweb.config.config + " Megamenu",
                        "ibmEvAction": "Mouse away",
                        "ibmEvName": "Close"
                    });
                }
                this._mouseover = false;
                this._isMinimizingOnMouseLeaveSemaphore = true;
                this._slideUp(_406);
                this._isMinimizingOnMouseLeaveSemaphore = false;
                (!ibmweb.config.megamenu.noScroll) ? this.onVScrollCallback(_406): null;
            }), this._slideUpDuration);
        },
        setKeepExpanded: function(_407) {
            this._keepexpanded = !!_407;
        },
        onError: function() {}
    });
}
if (!dojo._hasResource["ibmweb.dynnav.app-megamenu"]) {
    dojo._hasResource["ibmweb.dynnav.app-megamenu"] = true;
    dojo.provide("ibmweb.dynnav.app-megamenu");
    dojo.declare("ibmweb.dynnav.app-megamenu", ibmweb.dynnav._module, {
        internal: {
            _status: false,
            _isAnimated: false,
            _i: 0,
            _leaveInterval: null,
            _firstClick: true,
            _actionInterval: null,
            _actionBuffer: null,
            _isMoving: false,
            _isMovingInterval: null
        },
        init: function() {
            return ibmweb.config.appmast.enabled;
        },
        onLoad: function() {
            var _408 = this;
            var _409 = dojo.query("div.ibm-menu-subtabs");
            var _40a = dojo.query("div.ibm-menu-subtabs a");
            var menu = dojo.byId("ibm-common-menu");
            var _40b = dojo.query("#ibm-common-menu div.ibm-mm-close span");
            var _40c = dojo.byId("ibm-masthead");
            var _40d = dojo.query("#ibm-common-menu div.ibm-container-body > div.ibm-columns");
            if (_409.length == 1 && _40d.length == _40a.length && menu && _40b.length == 1) {
                dojo.query("li:first-child", _409[0]).addClass("ibm-active");
                var _40e = function(node, i, _40f) {
                    if (_408.internal._isAnimated) {
                        return false;
                    }
                    if (!_408.internal._status) {
                        _408.internal._status = true;
                        _408.internal._isAnimated = true;
                        _408.internal._i = i;
                        dojo.addClass(node.parentNode, "ibm-active");
                        dojo.addClass(_409[0], "ibm-active");
                        dojo.style(menu, {
                            display: "block"
                        });
                        _40d.forEach(function(_410, _411) {
                            dojo.style(_410, "display", _411 == i ? "block" : "none");
                        });
                        _412 = dojo.animateProperty({
                            node: menu,
                            duration: 600,
                            properties: {
                                height: {
                                    start: 1,
                                    end: 292
                                }
                            },
                            onEnd: function() {
                                _408.internal._isAnimated = false;
                            }
                        }).play();
                    } else {
                        if (dojo.hasClass(node.parentNode, "ibm-active")) {
                            if (!_40f) {
                                dojo.publish("/ibm/app-megamenu/slideUp");
                            }
                            return false;
                        }
                        _408.internal._isAnimated = true;
                        dojo.query("#ibm-masthead div.ibm-menu-subtabs li.ibm-active").removeClass("ibm-active");
                        dojo.addClass(node.parentNode, "ibm-active");
                        var _412 = dojo.animateProperty({
                            node: _40d[_408.internal._i],
                            duration: 400,
                            properties: {
                                opacity: {
                                    start: 1,
                                    end: 0
                                }
                            },
                            onEnd: function() {
                                dojo.style(_40d[_408.internal._i], {
                                    opacity: "1",
                                    display: "none"
                                });
                                dojo.style(_40d[i], {
                                    display: "block",
                                    opacity: "0"
                                });
                                _412 = dojo.animateProperty({
                                    node: _40d[i],
                                    duration: 300,
                                    properties: {
                                        opacity: {
                                            start: 0,
                                            end: 1
                                        }
                                    },
                                    onEnd: function() {
                                        _408.internal._i = i;
                                        _408.internal._isAnimated = false;
                                        if (_408.internal._actionBuffer instanceof Array && _408.internal._actionBuffer[0] !== node) {
                                            _40e(_408.internal._actionBuffer[0], _408.internal._actionBuffer[1], true);
                                            _408.internal._actionBuffer = null;
                                        }
                                    }
                                }).play();
                            }
                        });
                        _412.play();
                    }
                };
                _40a.forEach(function(node, i) {
                    node.onclick = dojo.hitch(this, function(e) {
                        dojo.stopEvent(e);
                        _40e(node, i, false);
                    });
                    node.onmouseenter = dojo.hitch(this, function(e) {
                        dojo.stopEvent(e);
                        if (_408.internal._status) {
                            _408.internal._actionBuffer = [node, i];
                            window.clearInterval(_408.internal._actionInterval);
                            _408.internal._actionInterval = setTimeout(function() {
                                if (!_408.internal._isMoving && !_408.internal._isAnimated) {
                                    _40e(_408.internal._actionBuffer[0], _408.internal._actionBuffer[1], true);
                                    _408.internal._actionBuffer = null;
                                }
                            }, 250);
                        } else {
                            if (_408.internal._firstClick) {
                                if (i > 0) {
                                    dojo.query("li:first-child", _409[0]).removeClass("ibm-active");
                                }
                                _408.internal._firstClick = false;
                            }
                            dojo.addClass(node.parentNode, "ibm-active");
                        }
                    });
                    node.onmouseleave = dojo.hitch(this, function(e) {
                        dojo.stopEvent(e);
                        if (!_408.internal._status) {
                            dojo.removeClass(node.parentNode, "ibm-active");
                        }
                    });
                });
                dojo.connect(dojo.doc.documentElement, "onmousemove", function(e) {
                    window.clearInterval(_408.internal._isMovingInterval);
                    _408.internal._isMoving = true;
                    _408.internal._isMovingInterval = setTimeout(function() {
                        window.clearInterval(_408.internal._isMovingInterval);
                        _408.internal._isMoving = false;
                    }, 50);
                });
                dojo.connect(_40b[0], "onclick", function(e) {
                    dojo.stopEvent(e);
                    dojo.publish("/ibm/app-megamenu/slideUp");
                });
                dojo.subscribe("/ibm/app-megamenu/slideUp", function() {
                    _408.internal._isAnimated = true;
                    animation = dojo.animateProperty({
                        node: menu,
                        duration: 600,
                        properties: {
                            height: {
                                start: 292,
                                end: 1
                            }
                        },
                        onEnd: function() {
                            _408.internal._isAnimated = false;
                            dojo.query("#ibm-masthead div.ibm-menu-subtabs li.ibm-active").removeClass("ibm-active");
                            dojo.removeClass(_409[0], "ibm-active");
                            _40d.forEach(function(_413, _414) {
                                dojo.style(_413, "display", "none");
                            });
                            dojo.style(menu, "display", "none");
                            _408.internal._status = false;
                        }
                    }).play();
                });
                dojo.connect(_40c, "onmouseleave", function(e) {
                    if (_408.internal._status) {
                        _408.internal._leaveInterval = setTimeout(function() {
                            dojo.publish("/ibm/app-megamenu/slideUp");
                        }, 800);
                    }
                });
                dojo.connect(_40c, "onmouseenter", function(e) {
                    window.clearInterval(_408.internal._leaveInterval);
                });
                this.applyAria();
            }
        },
        onClick: function(e) {},
        onData: function(data) {
            var temp = dojo.byId("ibm-home");
            if (temp) {
                var ul = dojo.create("ul", {
                    className: "ibm-logo-subnav"
                }, temp);
                for (var i = 0, j = data.menuData.length; i < j; i += 1) {
                    dojo.create("li", {
                        innerHTML: "<a href=\"" + data.menuData[i].url + "\">" + data.menuData[i].title + "</a>",
                        className: i == 0 ? "ibm-first" : (i + 1 == j ? "ibm-last" : "")
                    }, ul);
                }
                dojo.connect(ul, "onmouseenter", function(e) {
                    dojo.addClass(temp, "ibm-active");
                });
                dojo.connect(ul, "onmouseleave", function(e) {
                    dojo.removeClass(temp, "ibm-active");
                });
                dojo.connect(temp, "onmouseenter", function(e) {
                    dojo.addClass(temp, "ibm-active");
                });
                dojo.connect(temp, "onmouseleave", function(e) {
                    dojo.removeClass(temp, "ibm-active");
                });
            }
        },
        applyAria: function() {
            var _415 = dojo.query("#ibm-common-menu div.ibm-mm-close span");
            dojo.attr(_415[0], {
                "tabindex": "0",
                "aria-label": "Close",
                "role": "button"
            });
        },
        onError: function() {}
    });
}
if (!dojo._hasResource["ibmweb.dynnav.greeting"]) {
    dojo._hasResource["ibmweb.dynnav.greeting"] = true;
    dojo.provide("ibmweb.dynnav.greeting");
    dojo.declare("ibmweb.dynnav.greeting", [dijit._Widget, dijit._Templated, ibmweb.dynnav._module], {
        welcomeMessage: "",
        _signinWidget: null,
        _registerWidget: null,
        templateString: dojo.cache("ibmweb.dynnav", "templates/Greeting.html", "<span dojoAttachPoint=\"containerNode\">\n\t<p dojoAttachPoint=\"welcomeMessageNode\"></p>\n\t<span dojoAttachPoint=\"bNode\" style=\"display: none\"> <span class=\"ibm-greeting-hasp\">[</span> <span dojoAttachPoint=\"linksNode\"></span> <span class=\"ibm-greeting-hasp\">]</span> </span>\n</span>\n"),
        attributeMap: {
            welcomeMessage: {
                node: "welcomeMessageNode",
                type: "innerHTML"
            },
            welcomeMessageId: {
                node: "welcomeMessageNode",
                type: "attribute",
                attribute: "id"
            }
        },
        disabledCountries: [],
        registerLink: "#",
        userstate: 0,
        init: function() {
            if (ibmweb.meta.source != null) {
                if (ibmweb.dynnav.isServiceEnabled("greeting")) {
                    this._loadGreeting();
                }
                if (ibmweb.dynnav.isServiceEnabled("signin")) {
                    this._loadSSO();
                }
                return true;
            }
            return false;
        },
        onLoad: function() {
            if (!dojo.byId("ibm-sso")) {
                dojo.create("li", {
                    id: "ibm-sso"
                }, dojo.query("#ibm-mast-options ul li#ibm-geo")[0], "after");
            }
            this.placeAt("ibm-sso");
            this.startup();
        },
        _loadGreeting: function() {
            ibmweb.dynnav.addBundleCallback(100, this, "showGreetingCallback");
        },
        _loadSSO: function() {
            ibmweb.dynnav.addBundleCallback(109, this, "showSSOCallback");
        },
        clear: function() {
            this._tempCount = null;
            dojo.style(this.bNode, "display", "none");
            dojo.empty(this.linksNode);
            dojo.empty(this.welcomeMessageNode);
        },
        showGreetingCallback: function(_416) {
            if (!_416 || _416.results.result == "novalue") {
                return;
            }
            var _417 = _416.results.message1;
            this.attr("welcomeMessage", _417 + " ");
            this.attr("welcomeMessageId", "ibm-welcome-msg");
            dojo.publish("/ibmweb/dynnav/greeting/welcome/finished", [_417]);
        },
        showSSOCallback: function(data) {
            if (!data) {
                return;
            }
            var _418 = data.results[0].fPathName;
            var _419 = data.results[0].regLinkName;
            var _41a = data.results[0].regLinkVal;
            _41a = _41a.replace(/\/profile\/&/, "/profile/" + ibmweb.meta.cc + "/&");
            ibmweb.dynnav.greeting.userstate = data.results[0].userstate;
            var _41b = ibmweb.dynnav.greeting.userstate;
            if (_41b != 4 && _418) {
                var link = this.addLink({
                    innerHTML: _418,
                    href: "#",
                    tabIndex: -1,
                    onclick: dojo.hitch(this, this._signinClicked),
                    className: "ibm-sso-signin"
                });
                dijit.setWaiRole(link, "button");
                dijit.setWaiState(link, "label", _418);
                dijit.setWaiState(link, "describedby", "ibm-welcome-msg");
                dojo.connect(link, "onkeypress", dojo.hitch(this, function(_41c) {
                    if (_41c.keyCode == dojo.keys.ENTER || _41c.keyCode == 0 || _41c.charOrCode == " ") {
                        this._signinClicked(_41c);
                    }
                }));
            }
            if (_41b == 1 || _41b == 2 || _41b == 4) {
                var link = this.addLink({
                    innerHTML: _419,
                    href: "#",
                    tabIndex: -1,
                    className: "ibm-sso-register"
                });
                dijit.setWaiRole(link, "button");
                dijit.setWaiState(link, "label", _419);
                dijit.setWaiState(link, "describedby", "ibm-welcome-msg");
                if (_41b == 4) {
                    dojo.attr(link, "href", ibmweb.config.dynNavBaseUrl + _41a);
                    dojo.connect(link, "onclick", dojo.hitch(this, this._signoutClicked));
                    dojo.connect(link, "onkeypress", dojo.hitch(this, function(_41d) {
                        if (_41d.keyCode == dojo.keys.ENTER || _41d.keyCode == 0 || _41d.charOrCode == " ") {
                            this._signoutClicked(_41d);
                        }
                    }));
                    dijit.setWaiState(link, "describedby", "ibm-welcome-msg");
                }
                if (_41b == 1 || _41b == 2) {
                    dojo.attr(link, "href", "#");
                    dojo.connect(link, "onclick", dojo.hitch(this, this._registerClicked));
                    dojo.connect(link, "onkeypress", dojo.hitch(this, function(_41e) {
                        if (_41e.keyCode == dojo.keys.ENTER || _41e.keyCode == 0 || _41e.charOrCode == " ") {
                            this._registerClicked(_41e);
                        }
                    }));
                    this.registerLink = _41a;
                }
            }
            dojo.publish("/ibmweb/dynnav/greeting/sso/finished");
        },
        _notyouClicked: function(_41f) {
            dojo.stopEvent(_41f);
            dojo.cookie("IBMISP", null, {
                expires: -1,
                domain: ".ibm.com",
                path: "/"
            });
            this.clear();
            this.init();
            ibmweb.dynnav.executeBundleCall();
        },
        _signoutClicked: function(_420) {
            dojo.stopEvent(_420);
            window.location.href = dojo.string.substitute(ibmweb.config.signin.signoutUrl, ibmweb.meta);
            return false;
        },
        _signinClicked: function(_421) {
            if (!!_421) {
                dojo.stopEvent(_421);
            }
            if (!ibmweb.config.signin.overlay) {
                location.href = ibmweb.config.signin.formAction.replace("${page}", ibmweb.util.getUrl());
                return;
            }
            if (dojo.indexOf(this.disabledCountries, ibmweb.meta.cpi) != -1 || !ibmweb.config.signin.overlay) {
                location.href = ibmweb.config.signin.formAction;
                return;
            }
            var _422 = this;
            var _423 = function() {
                ibmweb.external.signinInit({
                    register: dojo.hitch(this, function() {
                        _422._registerClicked();
                    }),
                    reload: dojo.hitch(this, function() {
                        _422.clear();
                        _422.init();
                        ibmweb.dynnav.executeBundleCall();
                    })
                });
            };
            if (!ibmweb.external.signinInit) {
                var _424 = dojo.io.script.get({
                    url: dojo.string.substitute(ibmweb.config.signin.codeRepository, {
                        "NAME": "signin_full"
                    })
                });
                _424.then(function() {
                    _423();
                });
                return;
            }
            _423();
        },
        _registerClicked: function(_425) {
            if (!!_425) {
                dojo.stopEvent(_425);
            }
            if (dojo.indexOf(this.disabledCountries, ibmweb.meta.cpi) != -1 || !ibmweb.config.signin.overlay) {
                location.href = this.registerLink;
                return;
            }
            var _426 = this;
            var _427 = function() {
                ibmweb.external.registerInit({
                    reload: dojo.hitch(this, function() {
                        _426.clear();
                        _426.init();
                        ibmweb.dynnav.executeBundleCall();
                    })
                });
            };
            if (!ibmweb.external.registerInit) {
                var _428 = dojo.io.script.get({
                    url: dojo.string.substitute(ibmweb.config.signin.codeRepository, {
                        "NAME": "register_full"
                    })
                });
                _428.then(function() {
                    _427();
                });
                return;
            }
            _427();
            return false;
        },
        _tempCount: 0,
        addLink: function(data, _429) {
            if (!this._tempCount) {
                dojo.style(this.bNode, "display", "inline");
            }
            var span = dojo.create("span", {
                className: "ibm-sso-link"
            });
            if (this._tempCount) {
                dojo.query(span).addContent(" / ");
            }
            var link = dojo.create("a", data, span);
            dojo.connect(link, "onfocus", this, function(e) {
                e.target.tabIndex = 0;
                if (dojo.byId("ibm-menu-links").className == "ibm-access") {
                    dojo.publish("/ibm/dynnav/megamenu/expandMenu");
                }
            });
            dojo.place(span, this.linksNode);
            this._tempCount++;
            if (ibmweb.config.appmast.enabled) {
                dojo.addOnLoad(function() {
                    dojo.forEach(dojo.query(".ibm-greeting-hasp"), function(item, idx) {
                        item.innerHTML = (idx == 0) ? "&nbsp;|&nbsp;" : "";
                    });
                });
            }
            return link;
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.myinterests"]) {
    dojo._hasResource["ibmweb.dynnav.myinterests"] = true;
    dojo.provide("ibmweb.dynnav.myinterests");
    dojo.declare("ibmweb.dynnav.myinterests", [dijit._Widget, ibmweb.dynnav._module], {
        init: function() {
            return ibmweb.dynnav.isServiceEnabled("myinterests");
        },
        onData: function() {
            ibmweb.dynnav.addBundleCallback(104, this, "callback");
        },
        callback: function(_42a) {
            if (_42a.results && _42a.results.length > 0) {
                var _42b = dojo.query("#ibm-common-menu ul.ibm-myinterest");
                if (_42b) {
                    for (var i = 0; i < _42a.results.length; i += 1) {
                        if (i > ibmweb.config.megamenu.maxRows - 1) {
                            break;
                        }
                        var li = dojo.create("li", {
                            "role": "presentation"
                        }, _42b[0], "last");
                        var lnk = dojo.create("a", {
                            "href": _42a.results[i].href,
                            innerHTML: _42a.results[i].sname.htmlspecialchars()
                        }, li);
                    }
                }
            }
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.easyaccess"]) {
    dojo._hasResource["ibmweb.dynnav.easyaccess"] = true;
    dojo.provide("ibmweb.dynnav.easyaccess");
    dojo.declare("ibmweb.dynnav.easyaccess", [ibmweb.dynnav._module], {
        _debugging: false,
        init: function() {
            if (ibmweb.dynnav.isServiceEnabled("easyaccess")) {
                if (!ibmweb.config.easyaccess.companyName) {
                    this._setPublicUrl();
                    if (ibmweb.storage.getItem("eaCompanyName") == null || ibmweb.storage.getItem("eaCompanyName") == "" || ibmweb.storage.getItem("eaCompanyName") == "--noCompany--") {
                        this._getAccountData();
                    } else {
                        dojo.addOnLoad(dojo.hitch(this, function() {
                            this.createEAConatiner();
                            this._showEasyAccessUrl();
                        }));
                    }
                }
                return true;
            }
            return false;
        },
        onLoad: function() {},
        onData: function() {
            if (ibmweb.config.easyaccess.companyName) {
                this.createEAConatiner();
                this._showPublicUrl();
            }
        },
        _getAccountData: function() {
            var data = {
                sid: 103
            };
            if (location.search) {
                var _42c = dojo.queryToObject(location.search.indexOf("?") == 0 ? location.search.substr(1) : location.search);
                if (_42c["remote_domain"]) {
                    _42c["debugQstrIpcInfoCookie"] = _42c["remote_domain"];
                }
                if (_42c["debugQstrIpcInfoCookie"] || _42c["debugQStrIpreqheader"]) {
                    data = dojo.mixin({
                        debugQStrIpreqheader: _42c["debugQStrIpreqheader"],
                        debugQstrIpcInfoCookie: _42c["debugQstrIpcInfoCookie"]
                    }, data);
                    this._debugging = true;
                }
            }
            ibmweb.dynnav.addBundleCallback(103, this, "showAccountCallback", data);
        },
        showAccountCallback: function(_42d) {
            var _42e = this._debugging ? 10 : ibmweb.config.easyaccess.lifetime;
            if (!_42d.results.companyName) {
                ibmweb.storage.setItem("eaCompanyName", "--noCompany--", _42e);
                return;
            }
            ibmweb.storage.setItem("eaCompanyName", _42d.results.companyName.htmlspecialchars(), _42e);
            ibmweb.storage.setItem("eaSiteUrl", _42d.results.siteURL, _42e);
            this.createEAConatiner();
            this._showEasyAccessUrl();
        },
        _showEasyAccessUrl: function() {
            var _42f = ibmweb.storage.getItem("eaCompanyName");
            var url = ibmweb.storage.getItem("eaSiteUrl");
            if (_42f == "--noCompany--") {
                return;
            }
            if (_42f.indexOf("amp;") > -1) {
                _42f = _42f.replace(/amp;/ig, "");
            }
            if (_42f.indexOf("IBM") == -1) {
                var div = dojo.create("div", {
                    id: "ibm-site-name"
                });
                var p = dojo.create("p", {}, div);
                var span = dojo.create("span", {
                    id: "ibm-site-name-back-link"
                }, p);
                dojo.query(span).addContent(" [ ");
                var a = dojo.create("a", {
                    href: url + "?cm_sp=" + ibmweb.meta.dc_type + "-_-" + ibmweb.meta.dc_subject + "-_-EAMH",
                    innerHTML: _42f,
                    tabIndex: -1,
                    onfocus: dojo.hitch(this, function(_430) {
                        _430.target.tabIndex = 0;
                        if (dojo.byId("ibm-menu-links").className == "ibm-access") {
                            dojo.publish("/ibm/dynnav/megamenu/expandMenu");
                        }
                    })
                }, span);
                dojo.query(span).addContent(" ] ");
                dojo.place(div, this._ezaccessNode, "last");
            }
            if (ibmweb.meta.ibm_pageattributes.indexOf("flashlead") != -1) {
                var el = dojo.byId("ibm-esite-link");
                if (el) {
                    var link = dojo.create("a", {
                        title: _42f,
                        href: url,
                        onfocus: "return false;",
                        innerHTML: _42f
                    }, el);
                }
            }
            var el = dojo.byId("ibm-related-links");
            if (!!el) {
                var li = dojo.create("li", {}, el);
                var link = dojo.create("a", {
                    href: url,
                    innerHTML: _42f
                }, li);
            }
        },
        _showPublicUrl: function() {
            var div = dojo.create("div", {
                id: "ibm-site-name"
            });
            var p = dojo.create("p", {
                id: "ibm-site-nm-id"
            }, div, "first");
            p.appendChild(document.createTextNode("Easy Access: "));
            p.appendChild(document.createTextNode(ibmweb.config.easyaccess.companyName));
            var _431 = dojo.cookie("pSite");
            if (_431) {
                var span = dojo.create("span", {
                    id: "ibm-site-name-back-link"
                }, div, "last");
                var a = dojo.create("a", {
                    href: _431,
                    innerHTML: PMM.publicLinkNameData,
                    tabIndex: -1,
                    onfocus: dojo.hitch(this, function(_432) {
                        _432.target.tabIndex = 0;
                        if (dojo.byId("ibm-menu-links").className == "ibm-access") {
                            dojo.publish("/ibm/dynnav/megamenu/expandMenu");
                        }
                    }),
                    "aria-describedby": "ibm-site-nm-id"
                }, span);
                span.appendChild(document.createTextNode(" [ "));
                span.appendChild(a);
                span.appendChild(document.createTextNode(" ] "));
                dojo.place(div, this._ezaccessNode, "last");
            }
            dojo.place(div, this._ezaccessNode, "last");
        },
        _setPublicUrl: function() {
            dojo.cookie("pSite", ibmweb.util.getUrl(), {
                domain: ".ibm.com",
                path: "/"
            });
        },
        createEAConatiner: function() {
            if (!dojo.byId("ibm-alert")) {
                dojo.create("li", {
                    id: "ibm-alert"
                }, dojo.query("#ibm-mast-options ul")[0]);
            }
            this.placeAt("ibm-alert");
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.footer"]) {
    dojo._hasResource["ibmweb.dynnav.footer"] = true;
    dojo.provide("ibmweb.dynnav.footer");
    dojo.declare("ibmweb.dynnav.footer", ibmweb.dynnav._module, {
        init: function() {
            return ibmweb.dynnav.isServiceEnabled("footer");
        },
        onData: function(data) {
            var ul = dojo.query("#ibm-footer ul");
            if (ul.length == 0) {
                return;
            }
            ul = ul[0];
            dojo.empty(ul);
            dojo.forEach(data.footerLinkData, function(item) {
                if (ibmweb.config.config == "w3" && item.link == "http://w3.ibm.com/feedback/" && ibmweb.config.footer.feedbackLink != "") {
                    item.link = ibmweb.config.footer.feedbackLink;
                }
                dojo.place("<li><a href=\"" + item.link + "\">" + item.name + "</li>", ul);
            });
            dojo.publish("/ibmweb/dynnav/footer/finished");
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.footermenu"]) {
    dojo._hasResource["ibmweb.dynnav.footermenu"] = true;
    dojo.provide("ibmweb.dynnav.footermenu");
    dojo.declare("ibmweb.dynnav.footermenu", ibmweb.dynnav._module, {
        init: function() {
            return ibmweb.dynnav.isServiceEnabled("footermenu") && !ibmweb.config.appmast.enabled;
        },
        onLoad: function() {
            dojo.empty("ibm-footer-module");
            var div = dojo.create("div", {}, "ibm-footer-module");
            dojo.style(div, {
                textAlign: "center"
            });
            dojo.create("img", {
                src: ibmweb.config.imageUrl + "t/loadingAnimation.gif"
            }, div);
            dojo.style("ibm-footer-module", "minHeight", "0px");
        },
        onData: function(_433) {
            var data = _433.footerMenuData;
            if (!data || data.length == 0 || data[0].title == null) {
                this.onError();
                return;
            }
            if (!!ibmweb.dynnav.PMM.accessibilityData) {
                var h2 = dojo.create("h2", {
                    id: "ibm-footer-res",
                    className: "ibm-access",
                    innerHTML: _433.accessibilityData.resources
                });
            }
            var div = dojo.create("div", {
                className: "ibm-columns"
            });
            var _434 = ibmweb.dynnav.PMM.accessibilityData.resources;
            for (var i = 0, j = data.length; i < j; i++) {
                if (data[i].title === null || data[i].child === null) {
                    continue;
                }
                var col = dojo.create("div", {
                    className: "ibm-col-6-1"
                }, div);
                var ul, h3;
                if (data[i].title.htmlspecialchars().trim() == "") {
                    _434 = _434;
                    h3 = dojo.create("h3", {
                        className: "ibm-access",
                        innerHTML: _434,
                        style: {
                            display: "none"
                        }
                    }, col);
                    ul = dojo.create("ul", {
                        style: {
                            marginTop: (ibmweb.config.config == "www") ? "39px" : "41px"
                        }
                    }, col);
                } else {
                    _434 = data[i].title.htmlspecialchars();
                    h3 = dojo.create("h3", {
                        innerHTML: _434
                    }, col);
                    ul = dojo.create("ul", {}, col);
                }
                dijit.setWaiState(col, "label", h3.innerHTML);
                for (var k = 0, l = data[i].child.length; k < l; k++) {
                    var _435 = data[i].child[k];
                    var li = dojo.create("li", {}, ul);
                    var a = dojo.create("a", {
                        innerHTML: _435.title.htmlspecialchars(),
                        href: _435.url,
                        tabIndex: "0"
                    }, li);
                    dojo.connect(a, "onfocus", this, function(_436) {
                        dojo.addClass(_436.target, "ibm-active");
                        dojo.addClass(_436.target.parentNode, "ibm-active");
                    });
                    dojo.connect(a, "onblur", this, function(_437) {
                        dojo.removeClass(_437.target, "ibm-active");
                        dojo.removeClass(_437.target.parentNode, "ibm-active");
                    });
                }
                ul.firstChild.firstChild.tabIndex = 0;
            }
            dojo.empty("ibm-footer-module");
            dojo.style("ibm-footer-module", "minHeight", "150px");
            dojo.addClass("ibm-footer-module", "ibm-active");
            if (h2) {
                dojo.place(h2, "ibm-footer-module", "first");
                dijit.setWaiState(dojo.byId("ibm-footer-module"), "labelledby", h2.id);
            }
            dojo.place(div, "ibm-footer-module", "last");
            dojo.publish("/ibmweb/dynnav/footermenu/finished");
        },
        onError: function() {
            dojo.empty("ibm-footer-module");
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.emailthispage"]) {
    dojo._hasResource["ibmweb.dynnav.emailthispage"] = true;
    dojo.provide("ibmweb.dynnav.emailthispage");
    dojo.declare("ibmweb.dynnav.emailthispage", [ibmweb.dynnav._module], {
        init: function() {
            return true;
        },
        onData: function(data) {
            var _438 = dojo.cookie("etpConf");
            if (!_438) {
                return false;
            }
            dojo["require"]("dijit.Dialog");
            dojo["require"]("ibmweb.dynnav.emailthispagewidget");
            dojo.addOnLoad(function() {
                var _439 = new dijit.Dialog();
                var etp = new ibmweb.dynnav.emailthispagewidget({
                    confirmation: true,
                    dialog_id: _439.id,
                    etpConf: dojo.cookie("etpConf")
                });
                _439.attr("content", etp.domNode);
                _439.show();
            });
        },
        showForm: function() {
            if (dojo.exists("ibmweb.dynnav.emailthispagewidget") && dijit.byId("emailthispagew")) {
                var _43a = dijit.byId("emailthispagew");
                _43a.destroy();
            }
            dojo["require"]("dijit.Dialog");
            dojo["require"]("ibmweb.dynnav.emailthispagewidget");
            dojo.addOnLoad(function() {
                var _43b = new dijit.Dialog();
                var etp = new ibmweb.dynnav.emailthispagewidget({
                    dialog_id: _43b.id
                });
                _43b.attr("content", etp.domNode);
                etp.startup();
                _43b.show();
            });
            return false;
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.sbs"]) {
    dojo._hasResource["ibmweb.dynnav.sbs"] = true;
    dojo.provide("ibmweb.dynnav.sbs");
    dojo.declare("ibmweb.dynnav.sbs", ibmweb.dynnav._module, {
        init: function() {
            return ibmweb.dynnav.isServiceEnabled("sbs");
        },
        onData: function(_43c) {
            if (ibmweb.dynnav.PMM.footerToolData.length == 0) {
                return false;
            }
            dojo.create("div", {
                id: "ibm-social-tools"
            }, "ibm-masthead", "last");
            ibmweb.sbs.register(dojo.byId("ibm-social-tools"));
            var ul = dojo.query("#ibm-social-tools ul");
            if (ul.length > 0) {
                ul = dojo.query("#ibm-social-tools ul")[0];
            }
            dojo.connect(ul.firstChild.firstChild, "onfocus", this, function(_43d) {
                ul.className = "ibm-active";
            });
            dojo.query("#ibm-social-tools a").forEach(function(item) {
                dijit.setWaiRole(item, "button");
                item.tabIndex = -1;
                dojo.connect(item, "onfocus", this, function(_43e) {
                    item.tabIndex = 0;
                });
            });
            ul.firstChild.firstChild.tabIndex = 0;
            dojo.connect(dojo.byId("ibm-social-tools"), "onkeypress", this, function(_43f) {
                if (_43f.shiftKey && _43f.charOrCode == dojo.keys.TAB) {
                    ul.className = "";
                    if (_43f.target != ul.firstChild.firstChild) {
                        ul.firstChild.firstChild.focus();
                        ul.firstChild.firstChild.tabIndex = -1;
                    }
                }
                if (!_43f.shiftKey && _43f.charOrCode == dojo.keys.TAB) {
                    ul.className = "";
                }
                if (_43f.keyCode == dojo.keys.DOWN_ARROW || _43f.keyCode == dojo.keys.RIGHT_ARROW) {
                    dojo.stopEvent(_43f);
                    var next = _43f.target.parentNode.nextSibling;
                    if (next && next.firstChild && next.firstChild.nodeName == "A") {
                        next.firstChild.focus();
                        _43f.target.tabIndex = -1;
                    } else {
                        next = _43f.target.parentNode.parentNode.firstChild;
                        if (next && next.firstChild && next.firstChild.nodeName == "A") {
                            next.firstChild.focus();
                            _43f.target.tabIndex = -1;
                        }
                    }
                }
                if (_43f.keyCode == dojo.keys.UP_ARROW || _43f.keyCode == dojo.keys.LEFT_ARROW) {
                    dojo.stopEvent(_43f);
                    var prev = _43f.target.parentNode.previousSibling;
                    if (prev && prev.firstChild && prev.firstChild.nodeName == "A") {
                        prev.firstChild.focus();
                        _43f.target.tabIndex = -1;
                    } else {
                        prev = _43f.target.parentNode.parentNode.lastChild;
                        if (prev && prev.firstChild && prev.firstChild.nodeName == "A") {
                            prev.firstChild.focus();
                            _43f.target.tabIndex = -1;
                        }
                    }
                }
                return false;
            });
            dojo.query("#ibm-social-tools").onmouseover(function(e) {
                dojo.stopEvent(e);
            });
            dojo.publish("/ibmweb/dynnav/sbs/finished");
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.language"]) {
    dojo._hasResource["ibmweb.dynnav.language"] = true;
    dojo.provide("ibmweb.dynnav.language");
    dojo.addOnLoad(function() {
        if (!dojo.byId("ibm-language")) {
            return;
        }
        if (!ibmweb.config.language) {
            return;
        }
        dojo.query("#ibm-language a").forEach(function(link) {
            var val = link.lang || link.rel;
            if (!val) {
                return;
            }
            link.href = ibmweb.config.language[val] ? ibmweb.config.language[val] : link.href;
        });
    });
}
if (!dojo._hasResource["ibmweb.dynnav.search"]) {
    dojo._hasResource["ibmweb.dynnav.search"] = true;
    dojo.provide("ibmweb.dynnav.search");
    dojo.declare("ibmweb.dynnav.search", [ibmweb.dynnav._module], {
        _original_search_text: "",
        q: null,
        hasFocus: false,
        valueBackup: "",
        hoverTrick: false,
        init: function() {
            if (dojo.byId("ibm-search-module")) {
                return true;
            }
            return false;
        },
        onLoad: function() {
            this.q = dojo.byId("q");
            if (this.q && ibmweb.config.config == "www") {
                this.q.value = dojo.query("label[for=q] span")[0].innerHTML;
                this._original_search_text = this.q.value;
                dojo.connect(this.q, "onfocus", dojo.hitch(this, function() {
                    this.hasFocus = true;
                    if (this.q.value == this._original_search_text) {
                        this.q.value = "";
                    }
                    dojo.removeAttr(this.q, "title");
                    dojo.style(this.q, "fontStyle", "normal");
                }));
                dojo.connect(this.q, "onblur", dojo.hitch(this, function() {
                    this.hasFocus = false;
                    this.q.value = this.q.value.trim() || this.valueBackup;
                    dojo.style(this.q, "fontStyle", (this.q.value == this._original_search_text) ? "italic" : "normal");
                }));
                dojo.connect(this.q, "onmouseover", dojo.hitch(this, function() {
                    if (this.hasFocus) {
                        return;
                    }
                    if (this.q.value !== this._original_search_text) {
                        return;
                    }
                    this.hoverTrick = true;
                    this.valueBackup = this.q.value;
                    dojo.attr(this.q, "title", this.valueBackup);
                    this.q.value = "";
                }));
                dojo.connect(this.q, "onmouseout", dojo.hitch(this, function() {
                    if (this.hasFocus || !this.hoverTrick) {
                        return;
                    }
                    this.hoverTrick = false;
                    dojo.removeAttr(this.q, "title");
                    if (this.q.value == "") {
                        this.q.value = this.valueBackup;
                    }
                }));
            }
            if (ibmweb.config.config == "www") {
                this._initScopedSearch();
            }
        },
        onData: function(data) {
            if (ibmweb.config.config == "w3" && ibmweb.dynnav.isServiceEnabled("facestypeahead")) {
                dojo.attr(this.q, "autocomplete", "off");
                ibmweb.queue.push(function() {
                    return !!window.ibmweb.w3.SearchBar;
                }, function() {
                    new window.ibmweb.w3.SearchBar({
                        form: "ibm-search-form"
                    }, "q");
                });
            }
        },
        _initScopedSearch: function() {
            var sn = dojo.byId("sn");
            if (!sn) {
                return;
            }
            var _440 = null;
            var key = null;
            var _441 = dojo.byId("ibm-search");
            dojo.addClass("ibm-search", "ibm-with-scoped-search");
            dojo.addClass(sn, "ibm-access");
            dojo.attr(sn, "tabIndex", "-1");
            var ul = dojo.create("ul", {
                id: "ibm-scoped-search",
                onmouseover: function() {
                    if (_440) {
                        clearTimeout(_440);
                    }
                },
                onmouseout: function() {
                    clearTimeout(_440);
                    _440 = setTimeout(function() {
                        dojo.style(ul, "display", "none");
                    }, 500);
                }
            }, sn.parentNode);
            dojo.style(ul, "display", "none");
            dijit.setWaiRole(ul, "menu");
            var _442 = dojo.query("#sn > option");
            for (var i = 0, j = _442.length; i < j; i++) {
                var li = dojo.create("li", {}, ul);
                var a = dojo.create("a", {
                    className: _442[i].selected ? "ibm-selected" : "",
                    rel: _442[i].value,
                    innerHTML: _442[i].innerHTML,
                    href: "#"
                }, li);
                dijit.setWaiRole(a, "menuitem");
                _442[i].selected ? dijit.setWaiState(a, "checked", "true") : dijit.setWaiState(a, "checked", "false");
                dojo.connect(a, "onclick", dojo.hitch(this, function(_443) {
                    dojo.stopEvent(_443);
                    var link = _443.target;
                    sn.value = link.rel;
                    dojo.query(".ibm-selected", ul).forEach(function(item) {
                        dijit.setWaiState(item, "checked", "false");
                    });
                    dojo.query(".ibm-selected", ul).removeClass("ibm-selected");
                    dojo.query(".ibm-active", ul).removeClass("ibm-active");
                    dojo.addClass(link, "ibm-selected");
                    dijit.setWaiState(link, "checked", "true");
                    if (this.q.value == this._original_search_text) {
                        this.q.value = link.innerHTML;
                    }
                    this._original_search_text = link.innerHTML;
                    dojo.style(ul, "display", "none");
                    _441.focus();
                }));
                dojo.connect(a, "onblur", dojo.hitch(this, function(_444) {
                    _440 = setTimeout(function() {
                        dojo.removeClass(_444.target, "ibm-active");
                        dojo.style(ul, "display", "none");
                    }, 500);
                }));
                dojo.connect(a, "onfocus", dojo.hitch(this, function(_445) {
                    clearTimeout(_440);
                    dojo.addClass(_445.target, "ibm-active");
                    dojo.style(ul, "display", "block");
                }));
                dojo.connect(a, "onmouseover", dojo.hitch(this, function(_446) {
                    dojo.query("a.ibm-active", ul).removeClass("ibm-active");
                    dojo.addClass(_446.target, "ibm-active");
                }));
                dojo.connect(a, "onmouseout", dojo.hitch(this, function(_447) {
                    dojo.removeClass(_447.target, "ibm-active");
                    _440 = setTimeout(function() {}, 100);
                }));
                if (_442[i].selected) {
                    this.q.value = this._original_search_text = _442[i].innerHTML;
                }
            }
            dojo.connect(_441, "onmouseover", dojo.hitch(this, function() {
                dojo.style(ul, "display", "block");
                if (_440) {
                    clearTimeout(_440);
                }
            }));
            dojo.connect(_441, "onmouseout", dojo.hitch(this, function() {
                _440 = setTimeout(function() {
                    dojo.style(ul, "display", "none");
                }, 500);
            }));
            dojo.connect(_441, "onfocus", dojo.hitch(this, function(_448) {
                if (key != "EE") {
                    if (_440) {
                        clearTimeout(_440);
                    }
                    dojo.style(ul, "display", "block");
                    if (dojo.query(".ibm-selected", ul)[0]) {
                        dojo.query(".ibm-selected", ul)[0].focus();
                    }
                }
                key = null;
            }));
            dojo.connect(_441, "onblur", dojo.hitch(this, function(_449) {
                _440 = setTimeout(function() {
                    dojo.style(ul, "display", "none");
                }, 500);
            }));
            var _442 = dojo.query("a", ul);
            dojo.connect(ul, "onkeypress", dojo.hitch(this, function(_44a) {
                if ((_44a.keyCode == 0 || _44a.charOrCode == " ") && _44a.target.nodeName == "A") {
                    dojo.stopEvent(_44a);
                    var link = _44a.target;
                    sn.value = link.rel;
                    dojo.query(".ibm-selected", ul).forEach(function(item) {
                        dijit.setWaiState(item, "checked", "false");
                    });
                    dojo.query(".ibm-selected", ul).removeClass("ibm-selected");
                    dojo.query(".ibm-active", ul).removeClass("ibm-active");
                    dojo.addClass(link, "ibm-selected");
                    dijit.setWaiState(link, "checked", "true");
                    if (this.q.value == this._original_search_text) {
                        this.q.value = link.innerHTML;
                    }
                    this._original_search_text = link.innerHTML;
                    dojo.style(ul, "display", "none");
                    _441.focus();
                }
                if (_44a.keyCode == dojo.keys.ENTER || _44a.keyCode == dojo.keys.ESCAPE || _44a.keyCode == dojo.keys.TAB) {
                    dojo.stopEvent(_44a);
                    key = "EE";
                    _441.focus();
                    dojo.style(ul, "display", "none");
                    if (_44a.keyCode == dojo.keys.ENTER) {
                        this.q.value = _44a.target.innerHTML;
                        dojo.query(".ibm-selected", ul).forEach(function(item) {
                            dijit.setWaiState(item, "checked", "false");
                        });
                        dojo.query(".ibm-selected", ul).removeClass("ibm-selected");
                        _44a.target.className = "ibm-selected";
                        dijit.setWaiState(_44a.target, "checked", "true");
                    }
                }
                if (_44a.keyCode == dojo.keys.DOWN_ARROW) {
                    dojo.stopEvent(_44a);
                    var curr = _44a.target;
                    for (i = 0; i < _442.length; i++) {
                        if (curr == _442[i] && i < (_442.length - 1)) {
                            dojo.removeClass(curr, "ibm-active");
                            dojo.addClass(_442[i + 1], "ibm-active");
                            sn.value = _442[i + 1].rel;
                            _442[i + 1].focus();
                        }
                    }
                }
                if (_44a.keyCode == dojo.keys.UP_ARROW) {
                    dojo.stopEvent(_44a);
                    var curr = _44a.target;
                    for (i = 0; i < _442.length; i++) {
                        if (curr == _442[i] && i > 0) {
                            dojo.removeClass(curr, "ibm-active");
                            dojo.addClass(_442[i - 1], "ibm-active");
                            sn.value = _442[i - 1].rel;
                            _442[i - 1].focus();
                        }
                    }
                }
            }));
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.contactmodule"]) {
    dojo._hasResource["ibmweb.dynnav.contactmodule"] = true;
    dojo.provide("ibmweb.dynnav.contactmodule");
    dojo.declare("ibmweb.dynnav.contactmodule", [ibmweb.dynnav._module], {
        init: function() {
            if (ibmweb.meta.ibm_dynamiccm == "Y") {
                ibmweb.dynnav.addBundleCallback("206", this, "__contactboxcallback", {
                    v: 17,
                    wtmcategory: ibmweb.meta.ibm_wtmcategory
                });
                return true;
            }
            return false;
        },
        __contactboxcallback: function(data) {
            if (data.results["templateString"].length != 0) {
                var temp = dojo.byId("ibm-contact-module");
                if (temp) {
                    temp.innerHTML = data.results.templateString;
                    (function() {
                        var _44b = dojo.query("#ibm-contact-module").parents("#ibm-content-sidebar");
                        if (_44b[0] && _44b.style("display") != "none") {
                            dijit.setWaiRole(_44b[0], "complementary");
                        }
                    })();
                }
            }
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.merchandising"]) {
    dojo._hasResource["ibmweb.dynnav.merchandising"] = true;
    dojo.provide("ibmweb.dynnav.merchandising");
    dojo.declare("ibmweb.dynnav.merchandising", [ibmweb.dynnav._module], {
        init: function() {
            dojo.ready(function() {
                if (dojo.byId("ibm-merchandising-module")) {
                    ibmweb.dynnav.merchandising.mteDeclaredInHtml = true;
                }
            });
            if (ibmweb.dynnav.isServiceEnabled("merchandising")) {
                ibmweb.dynnav.addBundleCallback("102", this, "_renderData", {
                    industry: ibmweb.meta.ibm_industry,
                    customersize: ibmweb.meta.ibm_customersize,
                    specialpurpose: ibmweb.meta.ibm_specialpurpose,
                    dc_subject: ibmweb.meta.dc_subject,
                    currenturl: ibmweb.util.getUrl().replace(/^https?:/, ""),
                    ctype: ibmweb.meta.dc_type,
                    ww: ibmweb.meta.wwCase
                });
                return true;
            } else {
                this.createRibbonFromRelativeContentColumns();
            }
            return false;
        },
        _renderData: function(_44c) {
            if (!dojo.byId("ibm-merchandising-module")) {
                return;
            }
            if (_44c.results.length == 0 || (_44c.results.length != 0 && _44c.results[0].result == "novalue")) {
                this.createRibbonFromRelativeContentColumns();
                return;
            }
            var _44d = "";
            var _44e = 3;
            if (dojo.query("#ibm-merchandising-module").parents("#ibm-related-content").length == 1) {
                _44e = 6;
            }
            var _44f = 1;
            if (dojo.query("#ibm-content-body #ibm-content-sidebar > #ibm-merchandising-module, #ibm-content-body div.ibm-columns div.ibm-col-5-1 #ibm-merchandising-module").length == 1) {
                _44f = 1;
            } else {
                if (dojo.query("#ibm-content-body div.ibm-columns div.ibm-col-6-1 #ibm-merchandising-module").length == 1) {
                    _44f = 2;
                } else {
                    if (dojo.query("#ibm-content-body div.ibm-columns div.ibm-col-6-2 #ibm-merchandising-module").length == 1) {
                        _44f = 3;
                    } else {
                        if (dojo.query("#ibm-merchandising-module").parents("#ibm-related-content").length == 1) {
                            _44f = 4;
                        } else {}
                    }
                }
            }
            dojo.forEach(_44c.results, function(item, i) {
                var crop = "";
                if (item.imgw == "168") {
                    crop = " ibm-mte-crop";
                }
                if (i >= _44e) {
                    return;
                }
                var _450 = "ibm-forward-link";
                if (item.externalUrl == 1 || item.externalUrl == 2) {
                    _450 = "ibm-external-link";
                }
                var _451 = "";
                var _452 = "";
                if (!!item.fileExtension) {
                    switch (item.fileExtension) {
                        case "PDF":
                            _450 = "ibm-pdf-link";
                            break;
                        case "RAM":
                        case "MOV":
                        case "WMV":
                        case "SWF":
                            _450 = "ibm-video-link";
                            break;
                        case "DOC":
                        case "ODF":
                            _450 = "ibm-document-link";
                            break;
                        case "PPT":
                            _450 = "ibm-symp-presentation";
                            break;
                        case "XLS":
                            _450 = "ibm-symp-spreadsheet";
                            break;
                        default:
                            _450 = "ibm-forward-em-link";
                            break;
                    }
                    if (!!item.popUpDownloadLink && !!item.popUpDownloadText && ibmweb.meta.encoding == "utf8") {
                        var icon = item.fileExtension == "ODF" ? "ibm-forward-em-link" : "ibm-external-link";
                        _451 = "<p class=\"ibm-ind-link\"><a class=\"" + icon + "\"  href=\"" + item.popUpDownloadLink + "\">" + item.popUpDownloadText + "</a></p>";
                    }
                    if (!!item.fileSize) {
                        _452 = "<span class=\"ibm-item-note\">&nbsp(" + (item.fileExtension == "" ? "" : item.fileExtension + ", ") + item.fileSize + ")</span>";
                    }
                }
                var _453 = "";
                if (item.externalUrl == 2) {
                    _450 += " ibm-merchandising-module-leaving-ibm";
                    _453 = "http://www.ibm.com/links/?prompt=1&cc=" + ibmweb.meta.cc + "&lc=" + ibmweb.meta.lc + "&url=";
                }
                var _454 = "<input type=\"hidden\" class=\"ibm-mm-spot-id\" value=\"" + item.spotid + "\" />" + "<input type=\"hidden\" class=\"ibm-mm-weight\" value=\"" + item.weight + "\" />";
                if (_44f == 1) {
                    if (item.tid == 1) {
                        _44d += "<div class=\"ibm-container\">" + "<div class=\"ibm-container-body\">" + "<div class=\"ibm-module-image\"><img border=\"0\" src=\"" + item.imgsrc + "\" alt=\"" + item.imgalt + "\" /></div>" + "<h2>" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + "</a></p></div>" + "<ul class=\"ibm-link-list\">" + "<li><a class=\"" + _450 + "\" href=\"" + _453 + item.linkurl + "\">" + item.linktext + _452 + "</a></li>" + (_451 == "" ? "" : "<li>" + _451 + "</li>") + "</ul></div>" + _454 + "</div>";
                    } else {
                        if (item.tid == 3) {
                            _44d += "<div class=\"ibm-container\">" + "<div class=\"ibm-container-body\">" + "<div class=\"ibm-module-image\"><img border=\"0\" src=\"" + item.imgsrc + "\" alt=\"" + item.imgalt + "\" /></div>" + "<h2>" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + _452 + "</a></p></div>" + "</div>" + _454 + "</div>";
                        } else {
                            if (item.tid == 2) {
                                _44d += "<div class=\"ibm-container alternate\">" + "<div class=\"ibm-container-body\">" + "<div class=\"ibm-module-image\"><img border=\"0\" src=\"" + item.imgsrc + "\" alt=\"" + item.imgalt + "\" /></div>" + "<h2>" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + "</a></p></div>" + "<ul class=\"ibm-link-list\">" + "<li><a class=\"" + _450 + "\" href=\"" + _453 + item.linkurl + "\">" + item.linktext + _452 + "</a></li>" + (_451 == "" ? "" : "<li>" + _451 + "</li>") + "</ul></div>" + _454 + "</div>";
                            } else {
                                if (item.tid == 4) {
                                    _44d += "<div class=\"ibm-container alternate\">" + "<div class=\"ibm-container-body\">" + "<h2>" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + "</a></p></div>" + "<ul class=\"ibm-link-list\">" + "<li><a class=\"" + _450 + "\" href=\"" + _453 + item.linkurl + "\">" + item.linktext + _452 + "</a></li>" + (_451 == "" ? "" : "<li>" + _451 + "</li>") + "</ul></div>" + _454 + "</div>";
                                }
                            }
                        }
                    }
                } else {
                    if (_44f == 2) {
                        if (item.tid == 1) {
                            _44d += "<div class=\"ibm-container\">" + "<div class=\"ibm-container-body\">" + "<div class=\"ibm-module-image" + crop + "\"><img border=\"0\" src=\"" + item.imgsrc + "\" alt=\"" + item.imgalt + "\" /></div>" + "<h2>" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + "</a></p></div>" + "<ul class=\"ibm-link-list\">" + "<li><a class=\"" + _450 + "\" href=\"" + _453 + item.linkurl + "\">" + item.linktext + _452 + "</a></li>" + (_451 == "" ? "" : "<li>" + _451 + "</li>") + "</ul></div>" + _454 + "</div>";
                        } else {
                            if (item.tid == 3) {
                                _44d += "<div class=\"ibm-container\">" + "<div class=\"ibm-container-body\">" + "<div class=\"ibm-module-image" + crop + "\"><img border=\"0\" src=\"" + item.imgsrc + "\" alt=\"" + item.imgalt + "\" /></div>" + "<h2>" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + _452 + "</a></p></div>" + "</div>" + _454 + "</div>";
                            } else {
                                if (item.tid == 2 || item.tid == 4) {
                                    _44d += "<div class=\"ibm-container alternate\">" + "<div class=\"ibm-container-body\">" + "<h2>" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + "</a></p></div>" + "<ul class=\"ibm-link-list\">" + "<li><a class=\"" + _450 + "\" href=\"" + _453 + item.linkurl + "\">" + item.linktext + _452 + "</a></li>" + (_451 == "" ? "" : "<li>" + _451 + "</li>") + "</ul></div>" + _454 + "</div>";
                                }
                            }
                        }
                    } else {
                        if (_44f == 3) {
                            if (item.tid == 2) {
                                _44d += "<div class=\"ibm-container alternate ibm-portrait-module\">" + "<div class=\"ibm-container-body\">" + "<div class=\"ibm-module-image\"><img border=\"0\" src=\"" + item.imgsrc + "\" alt=\"" + item.imgalt + "\" /></div>" + "<div class=\"ibm-module-text\"><h2>" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + "</a></p>" + "<ul class=\"ibm-link-list\">" + "<li><a class=\"" + _450 + "\" href=\"" + _453 + item.linkurl + "\">" + item.linktext + _452 + "</a></li>" + (_451 == "" ? "" : "<li>" + _451 + "</li>") + "</ul></div></div></div>" + _454 + "</div>";
                            } else {
                                if (item.tid == 3) {
                                    _44d += "<div class=\"ibm-container alternate\">" + "<div class=\"ibm-container-body\">" + "<h2>" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + _452 + "</a></p>" + "</div></div>" + _454 + "</div>";
                                } else {
                                    _44d += "<div class=\"ibm-container alternate\">" + "<div class=\"ibm-container-body\">" + "<h2>" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + "</a></p></div>" + "<ul class=\"ibm-link-list\">" + "<li><a class=\"" + _450 + "\" href=\"" + _453 + item.linkurl + "\">" + item.linktext + _452 + "</a></li>" + (_451 == "" ? "" : "<li>" + _451 + "</li>") + "</ul></div>" + _454 + "</div>";
                                }
                            }
                        } else {
                            if (_44f == 4) {
                                if (item.tid == 1) {
                                    _44d += "<div class=\"ibm-container\">" + "<div class=\"ibm-container-body\">" + "<div class=\"ibm-module-image" + crop + "\"><img border=\"0\" src=\"" + item.imgsrc + "\" alt=\"" + item.imgalt + "\" /></div>" + "<h2 class=\"ibm-third\">" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + "</a></p>" + "<p class=\"ibm-ind-link\">" + "<a class=\"" + _450 + "\" href=\"" + _453 + item.linkurl + "\" >" + item.linktext + _452 + "</a></p>" + _451 + "</div>" + _454 + "</div>";
                                } else {
                                    if (item.tid == 3) {
                                        _44d += "<div class=\"ibm-container\">" + "<div class=\"ibm-container-body\">" + "<div class=\"ibm-module-image" + crop + "\"><img border=\"0\" src=\"" + item.imgsrc + "\" alt=\"" + item.imgalt + "\" /></div>" + "<h2 class=\"ibm-third\">" + item.title + "</h2>" + "<p><a href=\"" + _453 + item.linkurl + "\">" + item.description + _452 + "</a></p>" + "</div>" + _454 + "</div>";
                                    } else {}
                                }
                            } else {}
                        }
                    }
                }
            });
            dojo.byId("ibm-merchandising-module").innerHTML = _44d;
            (function() {
                var $mm = dojo.query("#ibm-merchandising-module"),
                    _455 = null;
                if ($mm.parents("#ibm-content-sidebar")[0]) {
                    _455 = $mm.parents("#ibm-content-sidebar");
                } else {
                    if ($mm.parents("#ibm-related-content")[0]) {
                        _455 = $mm.parents("#ibm-related-content");
                    }
                }
                if (_455[0] && _455.style("display") != "none") {
                    dijit.setWaiRole(_455[0], "complementary");
                }
            })();
            if (dojo.query("#ibm-related-content div#ibm-merchandising-module").length == 1) {
                var _456 = "ibm-col-6-1";
                var _457 = 140;
                var _458 = 64;
                var temp = dojo.query("#ibm-related-content div.ibm-columns > div[class^=\"ibm-col-\"]");
                if (temp.length > 0) {
                    if (dojo.hasClass(temp[0], "ibm-col-5-1")) {
                        _456 = "ibm-col-5-1";
                        var _457 = 168;
                    } else {
                        if (dojo.hasClass(temp[0], "ibm-col-6-2")) {
                            _456 = "ibm-col-6-2";
                            var _457 = 300;
                            var _458 = null;
                        }
                    }
                }
                var re = /ibm-col-(\d*)-(\d*)/.exec(_456);
                var _459 = re[1] / re[2];
                var _45a = dojo.byId("ibm-merchandising-module");
                dojo.query("div.ibm-container", _45a).forEach(function(i) {
                    dojo.addClass(i, _456);
                    dojo.removeClass(i, "ibm-container");
                });
                var div = dojo.create("div", {
                    className: "ibm-container",
                    id: "ibm-former-merchandising"
                }, "ibm-related-content");
                var body = dojo.create("div", {
                    className: "ibm-container-body"
                }, div);
                var _45b = dojo.create("div", {
                    className: "ibm-columns"
                }, body);
                dojo.query("#ibm-related-content div[class^=\"ibm-col-\"]").forEach(function(i) {
                    dojo.place(i, _45b);
                });
                dojo.query("#ibm-related-content div.ibm-columns").forEach(function(i) {
                    var _45c = dojo.query("> *", i).length;
                    if (_45c == 0) {
                        dojo.query(i).orphan();
                    }
                });
                dojo.query(_45a).orphan();
                var _45d = dojo.query("#ibm-related-content div.ibm-columns > div");
                if (_45d.length > _459) {
                    var _45e = Math.ceil(_45d.length / _459);
                    for (var i = 1; i < _45e; i += 1) {
                        var _45b = dojo.create("div", {
                            className: "ibm-columns"
                        }, body);
                        var len = _459;
                        if (i + 1 == _45e) {
                            len = _45d.length - _459;
                        }
                        for (var j = 0; j < len; j += 1) {
                            if (_45d[j + _459 * i]) {
                                dojo.place(_45d[j + _459 * i], _45b);
                            }
                        }
                    }
                    var _45f = new ibmweb.ribbon({
                        srcNodeRef: div
                    });
                    _45f.startup();
                    dojo.style(_45f.ribbonContainer, {
                        width: "980px",
                        margin: "0 auto",
                        position: "relative"
                    });
                }
            }
            var temp = dojo.query("a.ibm-merchandising-module-leaving-ibm");
            if (temp.length > 0) {
                dojo["require"]("ibmweb.leaving");
                dojo.addOnLoad(function() {
                    dojo.query("a.ibm-merchandising-module-leaving-ibm").onclick(ibmweb.leaving.clickHandler);
                });
            }
        },
        createRibbonFromRelativeContentColumns: function() {
            if (dojo.query("#ibm-related-content #ibm-merchandising-module").length == 0) {
                return;
            }
            dojo.query("#ibm-related-content #ibm-merchandising-module").orphan();
            var _460 = "ibm-col-6-1",
                temp = dojo.query("#ibm-related-content div.ibm-columns > div[class^=\"ibm-col-\"]"),
                _461 = temp.closest(".ibm-columns");
            if (temp.length == 0) {
                return;
            }
            if (dojo.hasClass(temp[0], "ibm-col-5-1")) {
                _460 = "ibm-col-5-1";
            } else {
                if (dojo.hasClass(temp[0], "ibm-col-6-2")) {
                    _460 = "ibm-col-6-2";
                }
            }
            var re = /ibm-col-(\d*)-(\d*)/.exec(_460),
                _462 = re[1] / re[2],
                i = 0;
            if (temp.length <= _462) {
                return;
            }
            var _463 = dojo.create("div", {
                    className: "ibm-container-body",
                    id: "ibm-former-merchandising"
                }, "ibm-related-content"),
                _464;
            dojo.forEach(temp, function(item) {
                if (i == 0) {
                    _464 = dojo.create("div", {
                        className: "ibm-columns"
                    }, _463, "last");
                }
                dojo.place(item, _464);
                i++;
                if (i == _462) {
                    i = 0;
                }
            });
            _461.orphan();
            dojo["require"]("ibmweb.ribbon");
            var s = new ibmweb.ribbon({
                srcNodeRef: _463,
                style: {
                    width: "980px",
                    margin: "0pt auto",
                    position: "relative"
                }
            });
            s.startup();
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.intercountry"]) {
    dojo._hasResource["ibmweb.dynnav.intercountry"] = true;
    dojo.provide("ibmweb.dynnav.intercountry");
    dojo.declare("ibmweb.dynnav.intercountry", ibmweb.dynnav._module, {
        init: function() {
            if (ibmweb.dynnav.isServiceEnabled("intercountry")) {
                ibmweb.dynnav.addBundleCallback("106", this, "_compareCcLc", {});
            }
        },
        _compareCcLc: function(data) {
            if (!data || !data.results) {
                return;
            }
            if (data.results.cc != ibmweb.meta.cc || data.results.lc != ibmweb.meta.lc) {
                try {
                    var _465 = ibmweb.dynnav.PMM.countryData[data.results.cc + data.results.lc].name;
                    dojo.create("a", {
                        href: "http://www.ibm.com/" + data.results.cc + "/" + data.results.lc + "/?cm_re=masthead-_-backcountry-_-top_level",
                        innerHTML: _465,
                        className: "ibm-back-country"
                    }, dojo.byId("ibm-geo"));
                } catch (e) {}
            }
        }
    });
}
if (!dojo._hasResource["dojo.io.iframe"]) {
    dojo._hasResource["dojo.io.iframe"] = true;
    dojo.provide("dojo.io.iframe");
    dojo.getObject("io", true, dojo);
    dojo.io.iframe = {
        create: function(_466, _467, uri) {
            if (window[_466]) {
                return window[_466];
            }
            if (window.frames[_466]) {
                return window.frames[_466];
            }
            var _468 = null;
            var turi = uri;
            if (!turi) {
                if (dojo.config["useXDomain"] && !dojo.config["dojoBlankHtmlUrl"]) {}
                turi = (dojo.config["dojoBlankHtmlUrl"] || dojo.moduleUrl("dojo", "resources/blank.html"));
            }
            var _468 = dojo.place("<iframe id=\"" + _466 + "\" name=\"" + _466 + "\" src=\"" + turi + "\" onload=\"" + _467 + "\" style=\"position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden\">", dojo.body());
            window[_466] = _468;
            return _468;
        },
        setSrc: function(_469, src, _46a) {
            try {
                if (!_46a) {
                    if (dojo.isWebKit) {
                        _469.location = src;
                    } else {
                        frames[_469.name].location = src;
                    }
                } else {
                    var idoc;
                    if (dojo.isIE || dojo.isWebKit) {
                        idoc = _469.contentWindow.document;
                    } else {
                        idoc = _469.contentWindow;
                    }
                    if (!idoc) {
                        _469.location = src;
                        return;
                    } else {
                        idoc.location.replace(src);
                    }
                }
            } catch (e) {}
        },
        doc: function(_46b) {
            var doc = _46b.contentDocument || (((_46b.name) && (_46b.document) && (dojo.doc.getElementsByTagName("iframe")[_46b.name].contentWindow) && (dojo.doc.getElementsByTagName("iframe")[_46b.name].contentWindow.document))) || ((_46b.name) && (dojo.doc.frames[_46b.name]) && (dojo.doc.frames[_46b.name].document)) || null;
            return doc;
        },
        send: function(args) {
            if (!this["_frame"]) {
                this._frame = this.create(this._iframeName, dojo._scopeName + ".io.iframe._iframeOnload();");
            }
            var dfd = dojo._ioSetArgs(args, function(dfd) {
                dfd.canceled = true;
                dfd.ioArgs._callNext();
            }, function(dfd) {
                var _46c = null;
                try {
                    var _46d = dfd.ioArgs;
                    var dii = dojo.io.iframe;
                    var ifd = dii.doc(dii._frame);
                    var _46e = _46d.handleAs;
                    _46c = ifd;
                    if (_46e != "html") {
                        if (_46e == "xml") {
                            if (dojo.isIE < 9 || (dojo.isIE && dojo.isQuirks)) {
                                dojo.query("a", dii._frame.contentWindow.document.documentElement).orphan();
                                var _46f = (dii._frame.contentWindow.document).documentElement.innerText;
                                _46f = _46f.replace(/>\s+</g, "><");
                                _46f = dojo.trim(_46f);
                                var _470 = {
                                    responseText: _46f
                                };
                                _46c = dojo._contentHandlers["xml"](_470);
                            }
                        } else {
                            _46c = ifd.getElementsByTagName("textarea")[0].value;
                            if (_46e == "json") {
                                _46c = dojo.fromJson(_46c);
                            } else {
                                if (_46e == "javascript") {
                                    _46c = dojo.eval(_46c);
                                }
                            }
                        }
                    }
                } catch (e) {
                    _46c = e;
                } finally {
                    _46d._callNext();
                }
                return _46c;
            }, function(_471, dfd) {
                dfd.ioArgs._hasError = true;
                dfd.ioArgs._callNext();
                return _471;
            });
            dfd.ioArgs._callNext = function() {
                if (!this["_calledNext"]) {
                    this._calledNext = true;
                    dojo.io.iframe._currentDfd = null;
                    dojo.io.iframe._fireNextRequest();
                }
            };
            this._dfdQueue.push(dfd);
            this._fireNextRequest();
            dojo._ioWatch(dfd, function(dfd) {
                return !dfd.ioArgs["_hasError"];
            }, function(dfd) {
                return (!!dfd.ioArgs["_finished"]);
            }, function(dfd) {
                if (dfd.ioArgs._finished) {
                    dfd.callback(dfd);
                } else {
                    dfd.errback(new Error("Invalid dojo.io.iframe request state"));
                }
            });
            return dfd;
        },
        _currentDfd: null,
        _dfdQueue: [],
        _iframeName: dojo._scopeName + "IoIframe",
        _fireNextRequest: function() {
            try {
                if ((this._currentDfd) || (this._dfdQueue.length == 0)) {
                    return;
                }
                do {
                    var dfd = this._currentDfd = this._dfdQueue.shift();
                } while (dfd && dfd.canceled && this._dfdQueue.length);
                if (!dfd || dfd.canceled) {
                    this._currentDfd = null;
                    return;
                }
                var _472 = dfd.ioArgs;
                var args = _472.args;
                _472._contentToClean = [];
                var fn = dojo.byId(args["form"]);
                var _473 = args["content"] || {};
                if (fn) {
                    if (_473) {
                        var _474 = function(name, _475) {
                            dojo.create("input", {
                                type: "hidden",
                                name: name,
                                value: _475
                            }, fn);
                            _472._contentToClean.push(name);
                        };
                        for (var x in _473) {
                            var val = _473[x];
                            if (dojo.isArray(val) && val.length > 1) {
                                var i;
                                for (i = 0; i < val.length; i++) {
                                    _474(x, val[i]);
                                }
                            } else {
                                if (!fn[x]) {
                                    _474(x, val);
                                } else {
                                    fn[x].value = val;
                                }
                            }
                        }
                    }
                    var _476 = fn.getAttributeNode("action");
                    var _477 = fn.getAttributeNode("method");
                    var _478 = fn.getAttributeNode("target");
                    if (args["url"]) {
                        _472._originalAction = _476 ? _476.value : null;
                        if (_476) {
                            _476.value = args.url;
                        } else {
                            fn.setAttribute("action", args.url);
                        }
                    }
                    if (!_477 || !_477.value) {
                        if (_477) {
                            _477.value = (args["method"]) ? args["method"] : "post";
                        } else {
                            fn.setAttribute("method", (args["method"]) ? args["method"] : "post");
                        }
                    }
                    _472._originalTarget = _478 ? _478.value : null;
                    if (_478) {
                        _478.value = this._iframeName;
                    } else {
                        fn.setAttribute("target", this._iframeName);
                    }
                    fn.target = this._iframeName;
                    dojo._ioNotifyStart(dfd);
                    fn.submit();
                } else {
                    var _479 = args.url + (args.url.indexOf("?") > -1 ? "&" : "?") + _472.query;
                    dojo._ioNotifyStart(dfd);
                    this.setSrc(this._frame, _479, true);
                }
            } catch (e) {
                dfd.errback(e);
            }
        },
        _iframeOnload: function() {
            var dfd = this._currentDfd;
            if (!dfd) {
                this._fireNextRequest();
                return;
            }
            var _47a = dfd.ioArgs;
            var args = _47a.args;
            var _47b = dojo.byId(args.form);
            if (_47b) {
                var _47c = _47a._contentToClean;
                for (var i = 0; i < _47c.length; i++) {
                    var key = _47c[i];
                    for (var j = 0; j < _47b.childNodes.length; j++) {
                        var _47d = _47b.childNodes[j];
                        if (_47d.name == key) {
                            dojo.destroy(_47d);
                            break;
                        }
                    }
                }
                if (_47a["_originalAction"]) {
                    _47b.setAttribute("action", _47a._originalAction);
                }
                if (_47a["_originalTarget"]) {
                    _47b.setAttribute("target", _47a._originalTarget);
                    _47b.target = _47a._originalTarget;
                }
            }
            _47a._finished = true;
        }
    };
}
if (!dojo._hasResource["ibmweb.dynnav.ccfintercept"]) {
    dojo._hasResource["ibmweb.dynnav.ccfintercept"] = true;
    dojo.provide("ibmweb.dynnav.ccfintercept");
    ibmweb.dynnav.ccfintercept = (function() {
        var _47e;
        var _47f, _480, _481, end, _482 = false;
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === "[object Array]";
        };
        ibmweb.opinionlab = ibmweb.opinionlab || {};

        function _483() {
            if (window.location.host.indexOf(".ibm.com") < 0) {
                return false;
            }
            if (!_47e.intercept.survey) {
                return false;
            }
            if (!_47e.intercept.survey.type) {
                return false;
            }
            if (!_47e.intercept.survey.id) {
                return false;
            }
            if (!_47e.intercept.percent) {
                return false;
            }
            if (!_47e.intercept.invitation) {
                return false;
            }
            var _484 = _485("ccf-global-intercept");
            if (_484 !== null) {
                _484 = (new Function("return " + _484))();
                var _486 = new Date(_484.date),
                    _487 = new Date(_486.getTime() + (_47e.global_minimum_wait * 24 * 60 * 60 * 1000));
                return false;
            }
            var v17 = false,
                v16 = false;
            dojo.query("link[rel^=\"style\"]").forEach(function(node) {
                if (node.href.indexOf("/common/v17/") != -1 || node.href.indexOf("/common/v17e/") != -1) {
                    v17 = true;
                } else {
                    if (node.href.indexOf("/common/v16/css/screen") != -1) {
                        v16 = true;
                    }
                }
            });
            if (v16 && v17) {
                v17 = false;
            }
            if (!v17) {
                return false;
            }
            var _489 = _485(_47f) !== null;
            if (_489) {
                return false;
            }
            if (!_48a()) {
                return false;
            }
            if ((typeof(_47e.intercept.referrerURL) !== "undefined" && _47e.intercept.referrerURL.length > 0) && !_48b()) {
                return false;
            }
            if ((typeof(_47e.intercept.excludeURL) !== "undefined" && _47e.intercept.excludeURL.length > 0) && _48c()) {
                return false;
            }
            if (!_48d()) {
                return false;
            }
            var _48e = (Math.random() * 100);
            var _48f = (_48e < _47e.intercept.percent);
            if (!_48f) {
                return false;
            }
            if (!_490()) {
                return false;
            }
            if (_47e.intercept.survey.type == "customB") {
                if (_491() == false) {
                    return false;
                }
            }
            return true;
        };

        function _492() {
            var _493;
            if (_47e.intercept.percent > 25 && !_494()) {
                _493 = _47e.watermarkImage;
            } else {
                _493 = "";
            }
            return _493;
        };

        function _495() {
            var _496 = ibmweb.config.get("opinionlab").intercept;
            if (typeof _496 == "undefined") {
                return false;
            }
            var _497 = (ibmweb.info.www) ? "//www.ibm.com/common/scripts/ccf/ccf-intercept-whitelist.js" : "//w3.ibm.com/w3/js/ccf/ccf-intercept-whitelist.js";
            if (typeof ibmweb.config.get("opinionlab").user_whitelist_path !== "undefined") {
                _497 = ibmweb.config.get("opinionlab").user_whitelist_path;
            }
            _47e = dojo.mixin({
                percent_exception_flag: true,
                duration_exception_flag: false,
                whitelist_status: null,
                url_whitelist_path: _497,
                global_minimum_wait: 30,
                now: new Date(),
                content_limit: 400,
                OLcardObj: null,
                watermarkImage: "<div style=\"background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIkAAACJCAYAAAAYJBvJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAALB1JREFUeNrsfQdcU+f6/wFCJoEACXvJEBAVFHChIlqtAmJV8NYusXW23uttq/56q7VaO7S3w3pbR3Fr1ap1VUVRQBGRDYqAAmGGEbIHYZP/+4Sk/5QCQQwV9Lyfz5EkJx4O5/2+z/N95muQiWH7MHy8qEOJjnZ0KNDBRUcZOtjoqEGHBB0t/kqlkoA/Jxwg6OChoxwdJeioRocMHa0AEPgiDhIcIBoJUqqWIDKNBNF8GQfJiwuQRrUEKetJguAgwSUIT5cE0QzDofwXE3x86G0YZqDEJ78/AAGCWowODjqkPQFkSIOE8v77XpaxsYsVa9b4VmIYtbWffwshOJhpeuHCbD6LZYqWEkE5gPfb4uPDQDNkpBw8EqRaDZDWngAyZEFiYG1NNAoOHgavPTZsGNe4YsXY8n4ChfHDD7MoY8c62f/2W1ghk2mF7D5jfU8iaenSYabvvz/VaP36CYUYZirXUvN/gzTsSlLZWhxEI0E6ervAkAMJdcuW0VYZGdEkLy9bCZfbAp8Fb9o0onXFCr/+AKV4zZrbrQpFG8PFhT7+zJnpjwYAKPL0dBH8tJs+3anM3d25FsPISj1KwycgqRozl6P2g/QqQYYsSCjz5o2CnxsnTcrb+vLLjzKuXlVNQEg/gdKenMyLi46+19zQ0G7l5kadeOZMiDZQYCLNU1KiqlkshrSf6qg1P19Wk5BQBa/dFy92Rvdo0gDSxNOTqTrv6+uSi2EWEv0aEtoSpB77s6OsTxJkSIIE1AzB0pKmmlwGg2YjFPKKN25M15zvD1Act2zxmrlnjz+JRjOC99pAabCyopmsWjWR6OBgrvznPwNBVaAladTTvZkhbiOfPNlOjABGROCyrqxcYXzs2EyxtzeTvX17nkrqvfYas87S0pKPYcTSVasyU778Mi9m+fKyJgQQPUqSrhIE+EeRFkntkwTRDKMVGDZ3yNBztNoVfn5M2rBhjJFTptAEKSl1fs7OLVaRkR41bHYT3cKCYOvvbxF36pTQrLFRQcewNgMdoGN8993LLS0typ2vv15SzeG0u44eTWXY2BAtXnrJIfP0aa4kOZkjMDAgHfroI64ZhjXbowdPxrC/rEDTmJiplPHjXelz5rjmZGXJXZYtG0FksWgUFxdz2zff9FLa2VEbFYoOcwcHqsLIiFiblFRvh64lycwUMTCsCREsmQ36adw5wfomqewuHOSJfofBYI/dmHz7bQBp+nRPxBtaizdsSBUJBMrguLg5fxLniFMs8/Iq/DIhYbi9uzvpp+joIoeEhDx/DBMZdzOhmkFGq90MEcrHd++Kv168uNwFw8SBy5bZzt682RPO17PZitjIyJRmgaAFXcTADT1kdEJG6uaaYisrE5uzZ+eaIW4Dquv0kiXZzUqlke877wwLDA011/6usK6udfe4cXfRH1FljYDXjCQIXLO3e+0nSdW2YiT9AcigVzdgntKiosaCiqE4OjI89++fKTAzMzs+Y8ad8txcOXznQVKS7MRXX3FH+/sbsezsjJrQBBXk5LShJWOMxHdvggSTxMXVwU/PoCBG0IIFph5orikXL+bDZ41yeUdRYWF7sUBAdsCwhiCEGXfEQUk9TCShvr4pecGCWwAsUF1RR46M7VAqDeJXrcr5JiQkK+nUKT5cE75rYWNj7IEsHiT7qaqFgCSengHSb5I6pNQNmI3GkZHeaJUR9v/735V2I0eawMN1DQuze3TtWn3mN9+UnPv++/rqiorWNz/7zCHknXdsjIyNDU9s21ZblZoq9kELFk1uo1E34hvIqEIma5Pl5ysUrq6mDC8v8zGzZ5tjzs40nw8+8CaamZF/XreOc+7bb3nOCDje6ECqoYnYiyqASaYpFM25V67wQFWZWVuTRoaHW9VnZvIYeXnV3Bs3ahNOnRKQnZxM7Dw8KCQGg5h26hSoHAWtc3IHmqT2W40ZDhaJoe3QAoAwtm6dSZ861e1+fLz0UUKC+EhUVA6XzW6EVbrwyBF/+/Hj6eMwrG7NDz/Yogkh1qFzXy9ZUp585Eg9mlQBAoiC0GV1gvlsmZPzOvgsHGNjF9H+97+pBT/+yC64fh0eLDZywQJHmpOTWWFysiTzwgXRaHT9QLQqrZBKMNABaPObNyOsjx8PZhgYNCdERt7RSJR5hw8HEsePt0JSShokEJS3JiWVaP4fMoVpYhW+9EpSy7Q8qU8lQQaVJLG4ePEVoqsrS+7mZpF/8WK9iYmJgVlo6DBDY2MjKw8Pk4rUVJEjm11Vdfkyhzlzpj2sUvTXE/lxcTUNBw8WJF++LP7lu+9EjeXlMmQf88YikMDK15YiQFIt9uwJl9XXN6f99hvf1tOTxhw1ylJOpVLi1qx5mHrpklDa2mq078MPa+L37+chIimaiPT6cKRiyL2oAgC4xa5d4UglmpCdnc1NZ81yLP3110r26dNV1jNnAoBJw8LC7LNu3BA6GhoqRu/dO9mISiXeOH5cVJOeLkLgkSA7uGWwkNRBBxKVt9HAwJCTlsZT2NmZ52dltQTt2DHq/u7dZWVJSTzH0FAHsomJke/cucyyzEwxs7iYW3TlSl2lQkH89bPPuBZo9TgivkARChsQKOSgYkYi1eA4dSrd+saNKCGa3Pr0dAlMMm39+hGkMWMcLn//fa1QLDYY+/LLjPtJSXIjGo1o5+tLlZ87VypJSqqlikRSBAzRGAQ0pGoUugBivHixV4e5uUnc3r11jqNG0U0RKKxmzrQrPX26Eg4ASkFmZtPNo0dFLIVCRjA2bnlUVNRxfscOLiLCIi80mWCF6UHFlKo5SE1/zNxBad3AAzaPiQlv4vEU8fPmJQuVSvLiu3enEalUAr+0tOHSwoWpJu7uNBDXILbBYohbuvSeaWpqFRLRRDgAIMMAJOhhoadlAJID1AJt374gkzlzfOD33Pnii4cG+/Y9cFu71tn2ww+DxFxuCwNJldzYWEH8r79KPzx8eNiDa9f4SStWZCJrSGCKHq4KVDrMZ+A1oLbgdfLBg1W/bNlSP9zfn7T6+HFvMrpfUDc3IyOT4XyhQEAB83kCmky41zwMM29CCxRZShIgw8QnJ63dSRCNitGE+zv0NVfPjJO0KpWGCOgGVGS1TDh7NgTdiDIhOjoFwMB0daWFnz07UVZS0nAxOjoDPgOgWEZGDq9CGHBFD3YSejhIVMuRedAOk0lQAwRGxcqVGeXx8SBysSkbN44EB1vWDz/UKvj8RgAIWBkp1641hC9frjJNH967pxAhixjuAUS/iQ6AwJBlZQnbGhtb4fWwqVOtrC0sOlhZWaXXoqPTNN5b+zVrfDoEgiaEpJopiN+AjwVMXsRz+Og9SJKnBYh2LEY73N+hz7l6ZuqmsaKiqSA7W2I9Z44ziGhbJJZz9+4tZycl8d3DwlS63GHmTJu8vXtLQfWIlUrSwfXra1jo4bigh4tmt9WoF2uj7O5dIX3mTCequTkRTSKrSi43KD1/vspp+nQbUGGBc+aYMZ2cyEBSf/nkk1p0TQla2VJqHy0NRUVFc15WlswuNNTJHFldXjNnWgBnYhUX1xVkZUkFSDL+snFjLQJFwwh0bVu1dQT3DL8DDsKTO856SxjSq4oZFOoGIp9IkZI4Eya4zjp0aCJJLaJ/j4y8R9dSM5rPWtUOLSSepUiCyHqbTG1VAFKDYmKikpixn31W9PD8eZ7fu++6NXd0GN05eVIoQaoNrXApUgVcZBXJevNXAIeibNwYYOTiwhTeuVNd8N//lkjc3KzCDh8er7nXu1FRtyz4fAlIPDmyXHpzwOlBxZRgfcgHGbIg6StQsm/dkl9ZvToPqZdaxEEUoAp0rXYwc8EBt97PL7dRqTRe8b//OY1GZBbOXdm6tbjowIHyZiRFQb2gla5A6ksGPpW+Ak/b03shIuJOO4NBnX/kSADc/+0DB6qFW7emIa4kB8BppIYezVwNSS3uQlI7BmqenglIwF8B0VyYyPrExIq8r74qFJqZmUUcPjxOGyjGFhakvOJiIxDZoNPB2tDFFWC1Q/gdeMHGsDA2s7SUY29p2b4oOXm6Joh3dtmyHGJcHBs4AgM9YFofYjzMpKTXDSkU40P//ncpWEeLP/nE1s7NjXwfkd47iPRajx9vZh8V5XZ03TrOODR5QWi1w7X1GKzrKkGqBoKkDgriCo4n+ttvT9BEc61CQpxnxMXNbhYK235bsiRLQ/oc3nrLvaO4WIyWbvVEtHp0ObQ0oyk/Xy7IyKgFQKzeudPe1tKyY7hAwO1obGyBIGDS77/Lb8XFtaMnb4D4TXNfSCph0iQWAASceXHnzjWJExI4sStWZMG54ZMnW9RimAkxLa2mdN26VD+kthzVFpeeAdI1YWhASOozBwmIbMry5QEgpjdNm1bwQXBwMUwcnPNZt24EPz1dfCk6Oj3l9On6899/L4DPwQJwU1sxvUkP6jffBJL27p0iYLFMH23cmK36v35+tFeTk0PGV1a+QWEyKWkXLghj3nuv3AZdD63yFqM+EsdmgUAlEazd3CiB06eTPcGPIhZXw9/RJJe3C9GfBqplvNpq6S3Go4dYTJW+PKmDTt2AX8Ty2LEF8Bp8Ff8ODHzkhR6qo4cH4fX4eJWu/zYkJMuJza4EH0IDIn3D0cPw0GEmduUKMHEFhw4VleXmNvq+957nMD8/Ewj6Pbh9W7Zn1apKNMF8NJn1yJpp6LMlg+6HERv7irmPjyW8L75xo9be05NKdXIyO7Z5Myfz8OGacKQGRndOHqZnCaIdixlwkvpMJUnj7dtC4B/wGnwV7+3d6+hiadnqXlxcCRMLVkgBm60ik/4YJoQVCY4yXX4E6ltv+YP/Y+/SpY9Lc3MbjKlUQoerq7VEKFT+GhGRvmv+/Lx1kyY9+nnVqnIkkYTo2jx3HZKp64B7KHjrrducBw9ggjAPZK4DQBAQ5WkXL0qQepEykcDRM0C6i8VI/04J8scC/ztUTIe9vWlzXp44bcmSDPf9+8nes2ZZQ46FZ0DANKqJiREBTezdU6cEILJBTFuglWLQR+kE3EaIiC7FwcHEFamXtKtXxRa2tpTpn346PDY8PNkyK6sYEV9DmGikZhptOv0VvUqmFqXSULBzZzFEZ+GewJ9hzeOJ08LDb8a/9JKnoKODIheL2yuysyEcIBuB1I9l/+MvfYnF1DwLCfK3qBtIGIJ8EM37x+fPV9xcu7Yw+Oef/UfOns1SEU2kCq7s2VN/edcuHqiCEPRAXDofkm6vLZp8Vk7OayRLS1VeRk5srGDPypWVP1dWjgGVtjMwMBVdrxqZuA1qr2yHQR8sI3id8dVX95v37MmHewGgwMxAljuaNRqaMSqY0OiXtiELSaExzQ30B5Aei7efhatiQD2u9B07QqT19c2lDx82sZycyExvb4bJiBGmcStW3Kd7e5taubvTCESioVAoxKquXKkGh5Z6UpS9maOU9et92v38LIWpqWIxgWDAmjzZTuVlffy4LWzVKkuGjQ0p8cQJQUFSkgwSiWzVEeHeJpE4f74dceVKX0NEfA2NjQ3tp0yxYTc0GMmysiCe0wb/H6QcSAxIOwSvL/AasLooOsD3FGZu9bNSMQMOEpAg5PXrA0mOjuZntmypOvH557xGsbh5ZEgIg4WAAQC5joBi6u1NB6A4DR9OYjg4GEvj4lTpfD2BBPwrkJNKHjfOmTZxohNp/ny3ksuXa+t5vA77MWMYjug6ZDqdkHr+vABc7cM6E4YkpjqirCBBLI4fX9hOo1GSDh6sVZLJRKSyjMGd3xUohmqOok43VBrqV8Vw1Y6y0i5m7jMtUtQ7SIAnmG3aNN2YyTSB9ywPD2rZ77/XUO7dKxMic9E1OJgFwBBKpR05n31WAJKFbmNDObJ1K7e9tlYO4rsnUsnYty8Uqae2Ux9/XGHt4UGBQKCUQKBk7tlTkXT4MLesrKzth2XLqopu3BC6dYb7+U6dyUe9PmTSe+95QRrB3ZMn689s384vPHWqymP6dHOQSN0BRY+P65nEYp4pSLRTDuMOHuR5TpxoChnsEPyquXy5yig5mcNpaDDgy+WE09u21SGuIJH9/nvZnevXZfz8fDla+VLQ7935GIBQkqdMcc26fFkolEgMgxYutIT8VqWxsbHL+PF0zpEjbGVuLnhlpYhICkchkKBrNVL64K8A1QWSyczOjnI3JqYGmch1DGdnI1ZgoBWcB6BkFxS0tLPZEsj9MNQvQAY0YWhQEVdNyiG8vnPwIOfEli3crvkVSZGRt6kCgbwc0RUk/w1HoskE1zgf/XfwRYAHFI7uVj7U0ULKIRBduB7kgxz66KOaH+7fH1Vx/77s17lz08H/oSl50JVYDBIPc3U1lV25Uieur+8Ynp0dRWUyKUB46+Liyh2Dg63rOJx2rlBImBQebgrm9c2IiNuQEM18ekumu+JtkCC1Wo6yDmyQDL35SaToYTdUVqqcSQGLFtl5+/sTzbOyyq9q5VfQ33prBDjK0GTypqLVCn4QiG+ARxWtfimYp9oAATIJua+GX389QcJg0CsTEjhkdfyFLxIZvrt7tyO8zr55UyZGQAMfC70Pmeeq8spjxxZYbt36kkNS0quSSZMc0jdtyoH7BB+O15tvDodc10wk4a59+22lStoolQZoqZuJVJRE7xJEu+xhUAFEL5IEJtIwKMih+uDBMnZ9vTHU0wIgYMUDQGhpaZym8ePtWVFRHhD8mogeBiQM6SKTQFIhxqPxop6cOzeVIBQ2BB89OsF+1Cgzzfeyrl4V7l61qhJJJR4yd2vBktF1z1C2aWBhQYeSB03W2/klSzL5bHaT93vvDReIxQbleXlNYyZPJo+ZMYMO3Gf32rWVlefPc8IwrHy4yhrWm5n7p7qYAPSdQaJl9AMSk337gmjqNEGYSKiprS8ubgk7e3YiAAUe/rXo6FRyWlp1PYaR++pqhwHhfnBqnfr881qxWIwJExJqQkNDMQMGg5TP5ZoYOziYpl+6JOkQiSDPVRqI1IAXsga0rwvmMuSgtCMVokr2AV4TFTUKyja/CgnJ5QiFxI3nzrlCNBfu9eySJVmy9HSB6bhxlnN37/alW1mR4DpxMTF1Z7dtq/VFEzsNScB+qpuuEuQv4f4A9b0PNpD0W90ABwGACMvK5LVoBYI7/KVDhybRkOUCYX5NSQFIEAAIZGf11dUO6gA8qSWZmQ13zp2TyxISqsJfe404ae/eyQ6zZtmK4+OrRUeO5I8SiSrQpFWBA65rrigAxPzChQjGuXPzylksSygAN1m9egIARKU+zMxoDiJR3fXIyLuae408csSf7uFBc5RK+ZVnzxazU1KEH02b9ggAgq4vHI0Os6dPWu7Wkxrw9AHBwQcSk7VrJ8LPra+8UqbBvabOxG3hQtuLkZGptw4cqAYVAxIEkcl2WIG6EnsarayovLg4VR3M6NmzmSP8/Y3BWjHLzeWovsRkmsL1kPgSIXDUoZvgD+smWGfo6WlmiFSKoq2NIJ83z4fDZJrnLF2a2IIkHpz/8PhxNzNLS0N3gYCbEhWVCECBBKfc4mJj2aNHDfXbtz+MffXVdNPS0lqkHqs1+SzG/c9JbdQiqX8q3g7Qr1n9bExgcI4R333XV0IkGkmQJQFOJOMFC1wlUinW2NSkBHP0+ObNVfbe3jQweV2QySjk8ZoLvvuuGKkCGWR+9eYk0wAEormPsrMl3JQUKcnX18x02DCzoFdfZRk6O9Ps33jDjcRi0S799BOvNjdXFS+xVxNdg268svKCAkXezZu8UpGIOOfTT4ebz5rlkPXTTxWPk5KE7mFhdpDn6jhzpnXB5ctcB4FAWIiId9KZM2JLNJlwv+qk5UZEqsFrq7r/p8hJ7dHM7Q4gW7ZsGTqSBEgpMzf3NYi/0MaOdbT7+OOg8gkT3BDjIhWuXZu6f9q0tIg1a6xUuZ2HD9fLudxGyA+5fuKE5EJMDORsNEOZgqeOnFTVjQQEqFzrDV5eDpAfWrZ9e15NXp7KWvJesMDJ1NubBUnLiYcPC5AV1GDWQ9aXqlQDqRnIKwFJQS4oUOV9mA8bZhJ89mywtKREocnAt3Fzo8BntUjK2PL5ollIdYHEgFRGsJKgwAtem/YvLtNdwlCxNkCsKyuHRLs3Qm8xErMdO2YZkslEqEuBlL2K/PwmDhLHs8PCnIzS07kB8AARuUMHtjkx0ccWEcBTn35aEXfokBjKGqHUUi1BOnrjNhCoa5BIOsBFS7CxofORYPF49Ih7LywsvsLNzWnEa685xv/yi0RcWqoAVztIEfMeQGI0bZq9sb29hfe1a3NpLBa59MKFst/eeisLclCBTM9FpBo4EwAFVCP70aPWLD7fFAFEAoFAXTGefkqQCqxLG8yhApBerRvI9KIvWjQGnFb/XbmyzsvNrX3BRx/Z+Lz8ssoL2cjnNz785JMMs6Ag6+FvvKFq1XDr1CnBqQ0bKhBAhAhAPKdeXOzaKkb7M8gr4Tx4IDEsK+O2FRTwORkZcjSRHdDkBQqcdCUtN02ZYmMXExMKRBre/xQdXSxFxNd53DgTqCF+2hzaJwRIfZdYjKSrBHF0cvrrBYaKCWz83/+Ot/jHP3xLcnIU0traprGhoRZdvwM9y3YHBibT3NzoPKWSyi0tbYEaWqhU81Bni/cqxjZv9pOyWEwjFxcWy82Npil90B5QZIUIZxpU3wPx1ZW03Ozjw3CKjV2kec8pKWn+NSoqw1MgqFNOmGCjycqHrHb21q056JpNmsju35HVjgDyp2cypEGiiIhwGfbjj7O0PxPV1bX+tGEDl1tR0fK/27dd4bP/8/PL8RYKq2lq8Q8qBjynuh44cIeq27flhRhmhuSwGVIx1B2Fhf7gUT24fbvIa+RIoxa5vPW3DRtK/dADR8Dj9cU/gb5gKHj99ZElRKJN2Pr1TgA8SGC+Exl5awJ6n5WY2GQxY4bz8Q0bKsdhWC1c17KPSU79IKl/qovpTsUMBZD0yElaLl2qvs7j3TZduNAbo9FIiadPSx4mJsrRA22Y/vLLf/QNqxMKCehhtwQiFWOI6U7soWg5tGgCgUK+cWMO/erVWvBxyMvL3ck+PhYcZJlk7d5dC22inDvJo858VOA2YJYbUCikaiQhqg8dKvrl4UPhm0eP+kICc2ROjqo7UpVAUBS3YUM+MqGb0fTI6U+fLNSTimF3kSBDtidxj9YNZFox792rLFm3LjV+9eqcMW5uTR/v3Elfsno1MXT7di/4zu/79vFJ6HtQPkBUB9V0ZX4BB2knk8l5167xyJaW1Ml79wYxV60ajiarta20VJUh7z16tBECh2Qa0uPT0YMe3oeKPQguKtF1BTU1rTeuXcNGz5lDt8vIYF9Rx440que3AwcakURqDFTnuuo5qx0AUq5l5kq6UzFDbRB6OaEEtQFV9hMjIijumzcP10hI+KcAmaOnvviCi1akmNnHmhjSv/41Gn4eWb++0sTRkTpq9mwM2j+0u7nZKubMaRTk50vFJBI3Ydeu6jGdK12hq8AJrDBIhpaUl8v2vf8+Z9ry5baf5OaOg3Oyigrp5SlTEo9Onny7zc/PPiU+vtUeSSWQIH1RiU8Ri6kZamZuv0CiAQr4CJovXarIMzVNoYaHeyna2oyvHjggLExMhLYJYsg+t+lDUA1GB41Ghp+z1q51gKRlsJw4aJWFr1zJSqitleUcOcJW7N4NwDMc1gffitoDSwYXvkF7e/OG8+e9/7BykPSgOzubSgMCnCwyM8uJ8fGiUPQnAVF10U/xVE+NdIekmfvUbnnwHSiOHy+Nf/XV1FNvvHFfnphYiQhf9TS1KuiryOZ8+eUD+AkAgQ6Ev+7YwfMYOVLVDqowN7edJxBgUBA+Sd3Eri9tGVry8+USZCqbqoNxRdnZjf+ZN68859YtVaS2XCikQO4KAp4E3TMfUhJM9Zu03LVHmUwtQTqw52T0OQoMDi/oWCxV9/gCjyccT+Kqhn5ohrt2hbi+8sow7c+hfuXziIgSiJFMRg8drquL24DqQqrGtPrAgceFv/8u4QcGDpPQ6YygRYssgDz7I5M94+pV8YFVq0oRr6mEGA9RP0G0JzZzextD2gQeiKHsXHK06lmzRngtWeImk0qVKWfOCB8nJIih/cMUZJKCC7834GlnwP0hoVJTeYmrV+eOQ7zJc/58Z/gs++pV4dH//KfaUiQSgMQDv83fYOY+MUl9YUECZJL02muukA8i1CpywjqfrhF6opRCDGNUYRgdsslsEUeAPBNndf1Kb9eGTDXYVWJbSMiD4JUr7aa++ioT+svXJSRUtyckVBADAlic1lbT7Ph4BbqubCyaTFAxJv0L8feFpHbrScVB0suAjDLa4sX+UIWv8soiq6N0x44s4pUr5Qy1eoK+JJDfAQeABD6HSewqQbqrpoN+7WDSXtqzhxe1bp1NJgIItNaaGBZmtsvJKQ76jTSpe4+AY8+ps09q2wDUxRT1V8UMNZDovRYYAAJlD8fff78YeqtCG23CvHk+ZZ6eDmL1zg8ABvByQkDNRW3mdqdiCMHBw5gffDCZevjwTNvHj5dwg4KcahMSKlUdlxFAQKUA53D18lIBUmhhYY6sljboDYL4DR9ItYn+Saqmy2Gtlpn73JBUvYME8kzkVlY0zW5QsPJBgjxISJAq6XQKhOKh7KGDSqW4rls3Gj1ZuvwJ6o8b6+oaVKtt+nSHto4Ow4yWFqvEL78s05x3HjvWdMOlS57Wbm5UyHXlClVOX5UjsDvJpAcz9y+NdJ8XM3fAQEIJDx9lfe5ceOt//hPY9q9/jaq4fl0In/uFhTGhlTf4QQ7885/lvlOnmtBsbCiPEQ8RPEG2uSwlhfsHYUXSgzBihDW/qKj5xsqVaSClLG1sCGY2NqTrMTFcIKlQvK2nwm1dZu4LIUH65EzDdJihIDVMnJzMhq9ePRoSexJ/+SWRdvNmjetLL6kSiLore2h5AmA2X7tWzV+8WFgrEBiPmjqVvmTbNvtrxsbyxgsXShJWrkyXOTpap8XHQ7eiZsQ/ZFDHA469vyEW0/IiSJCnJq5APglHjsyyDglRmZwQF9kbGZnnYWAgnnn0aKDdU5Y9qBxlCFAFyKDJwDCrsH37Ro2ZM0fVRAaSr02trckn5s5NVRQXyxAioYNiI7SsoKj7uuqZpGpnlOk1FvNcWzfwZ8DecfbvvRegaVgHqYuxkZF3iQJBQ8dLL7kZOjiYpV68KO2t7KE7Pwg47sSHDlVAiSZCkyEPOjQiw8knJiZohDrpCRxwByIicqEk0xfDxCT9Osr0aua+kCCBiTTw8WHV3b8vT7x6tZUREeH66tatKomiKk8wMmoXsdnSk0uXPgZrw7bTFG3QFVTTtMxq4vMbL44dex3KMKzUHYSAHMP2ZgbLlvk2UKn0G8eOSWxEovrpaALBAadHFdPVk6odi9E7BxnS+SS9WTSaxjRmixZhhtOm1V18552HsUZGzXM2bx4OeaRwjltTo6rAh1oVTRxGV56JcWioKg0y4dgxHlIzFtBhQAMSAJc3kkZl+/dnV6BfPQoBXJPVPkCe1K6xmBd2j+onAglkzwNARIgTlBYWtkB8xGPmTJvQmBjDpOXLs449eCAJ2rRpRC2H03F448Z6NIkG4MjSpQrAQwsbImoccPdu3VL9n66RWgDKcHWYX6l+T9FvuF+7ePu5SBj6201gYmSkKtno+NattSQ6naDZLgx4wpSYGH8jNlt0NSLiTuy77953FolqYWuRvpikHVxuy8O3347XFE6t/PZbe4alpYEBSN4u3zVWdxvSFHoNAEnV3nn7hTFznxok4GonffPNOGFVVTPUwtAYDKORU6aY3vz555qbJ06o9uWFLHqvjRtHoglsRjyBMxMdPn2ImagccEuXusnu3hXGLlmiyiJzcHcnRZ09G1jBZDIHYsfvHkjqXxrpvugSpM8gATIJ1f2MRYv8bp07p4gJC8sNWbRIZd7ePnpUwLKwaIeeHr98/TVvzwcf1EPcxKYzsafXZnPaW51Zbd06Y2x29nyWqytJ0xUavKhBZ85MezQwW8Pr3HkbB0gfQaLaXfvnn1VloFB0lZGerkQmjMycwVA9wG9yc319Z89mFt6+LUr48UfocihE5+VdeYIqKowsIrBQwLzVAE9JoZBST5/mAsigY7P/5s1jKtLT5WfVQIHCqUw+3xQ2KRggCaLtSX1hYjF6BQlktWvIpNLERLX7E2zNUbVtWwbsZacimVeuSE588QUUbYs19TbaZi4Agnnnzmv0jz6aloNh5rCztvHcuaqko3M7dlTvWbeufnNgYC74PcDf4rZ0qWtTejrv/Lx5yedWry6A30nUX8W9tgThY3/eeRuXIP0BycN5826AdxNeL16/3sopIEDVLM/w7l3uxYCA65/4+WUeWr26FBJ7IG/DpZu2EtT33w+AUtGUkye5WFSUl4jJpMNeM3DO1N6eYodANw1NkjA2VrXLpcv48Qy0nInWRUW1szozyvq8+UA/JUgNLkGewgSm83jyOwsX3p545kwI+D/ePHZsdGx0dCM1LY3ti2Eia6GwETgIuMOBh3RnjrYpO7tY+oSGWlu8/bYDJzWVVZWYyIFOv3NWrLCiEwjNxnFxCs9XXrGH7539+ut6dD0jyNK36UP/1X4CpLQbKwaXIP3xuCo7ZbAxkEcNUFQJP/PmJXkUFVVBEzxNy8qeJrJ+xAgrz3Pnwonq2tzvo6NL5QkJlcuuXvWzHTmSof3d8v+f68qZiv4r/emzyXoycwcsFvM8elx7VTcw8ZCU7MXn19/TavSSXlRE5qnJpAHW+17v5kymgQYgMKI2bbInWloSr4eGJt89eLAKao2L0XFl3z7epxERZZDr6qZOFhoAM7e0G0cZrmKeRpJ0J1HA2gAyCVzBrQ/Jxc0AxB9/DLmXlUWIWL/eUVObGx8ZecdIIFBUIK2G5H/nBkmI00C431M/IOkai2EPRoA8VwE+DVDAHAVyCmSyL8VTkFIAGfIPMMzCOCDA+i3EazTtH25HRt5mCgQStUiD9pqt4En9OzY1HCwc5LnKcdWoHjBxnXX0HenCjJUQhIOmel6ZmYXQjVHT19VqzZrRUMcDVpFXZ7CuaQBqc9ndcBCcpA4ESLT5h84964KDme1WVmRwnGkCcVadDWganJBlBDuFwxZqJ7du5QqeMFvtCSVIOdalkS7OQQZQ3fRlaNo/ECwsTNobG1uLdu26r/jpp0LtlliabV7zMYwxgPvm/i0JQ7i6eVK0WVsTobKutaPDKOPMmTrIbvf+v/8LIGzbFoTkPa1Z/btA/YBUGeBNDbW3RcU9qYMFJOTVq1VpBL998QXncV5eK5BTcNnLyGQ6YeXKUWg5U1q1gAJF27r6uvaTg2i3f3juireHNEiaxGKVyRr+0UfOb3z2mSNsdVaUmiqf/I9/sDBbW2h5RZfof8+/rtFc7VgMTlIHA0hAxRjPn28P0V3uzp1s2FUTdnmAZKRL+/aJ/IKCVA43TkVFB7dz3zrDAQBIVwmCJwwNFuKqXfNbeekSu2TNmgyz11938f/qqwna34Miqo9DQorGYlhtSP+b9/eFpP5pU8OhIkGey0RoGJDrCvkgDTxeU/GtW9KkQ4cUMz7/PKAhJaX20IwZd0d9+OEIKOK+ERPD42RnQ99VaL0tNRuYWEw59px2GBoykkS9e6Zvzbp1uRDlVe3be+9eZBuJRDn5+ee1wdHR1rDdu+b7pyIj02rT06VSdTkntJWA7kVQ3U/Xb/sH7XB/9VCTIM+VJLG4cCGCYG9vQWUyWYXR0SnQjN+CTCZRLC0pb+/cqerlCv3JOEVFze5jxlBZs2c7SdPTc/wwTAD75vbUVkJPJBXPah8MxLXu5MnHKsRPn+7guH9/MBRIPf722/tSdWba3cuXZetDQysep6erOgBk3bnTDFuNQEdGl17aSujRzMVJ6rNWN7Ww49XKlWODNm4cCe8Lrl+vz16+PFWM1EkxEjRrL13yodLphtBmAlIQv4iIKBmPJm8qIpS62mv2EyClQ5WkDlV1Y9gdBzE9cSJEbGVlAr1EoMZFuW/fg8TPPy+A81BjMyYmZgICQMuKd981gk6KABBo/7BzyRJVPojLwOSDaEgqG8NzUp+tJLFEpBQ4CLSxSl6w4JY7n88Hr2gFsnpbV6zwC9m0aQR8796hQ5X1n36agWaPUGJhYVsnFBoigMhGIS4C5Zj0QdqjDJckepAkGg4CbawCz5yZAYlG4CxTbS3288+5D8+dg3gI5jlnjm0+UjdmsMmxUFgxG63yGWgCkU6S6DlhCI/FDDaQ8HftKr77xRcP4TXkfEBuqzZQjLKyKtSzaID4iglEd8dimCiws+ZGoefSSzwWMxhBwuzCQTRAKfX0tIddvl1Xr1Zt8ZqTkCBTqlNL+ppn0g8O8pdNDXEJMkisG4jWIoZI5b/8sufsnTv9NLt6awbkqG5asKDSSSSC2hiOS+ek6hsg2irmua3NHbL5JKBCYOKtr19/BLuEQxmm5lzqlSsSBJAqM5FIBEnLmv4heiapePH2UPGTQBZZHYaRcxFBlfn7O2dlZYGvvQ3MXD9EX6Cpv64+8P2UIHpppItLkr/JmQZAgSa90LMMHGjkznzVJpAgA9RpuUTbzB3sGysPxBhysRtwqQOZBe8pEFVoLEPQz8R1F4v5024PLyJABuMgPMEXlZj+Jq2nrPY/YjE4QIYgSPQpTTEdxdv+ysEmcHGQPCuAaMdi/iic8sfx8UKDROemhjhAXmyQ9NSjrAaXIDhIejJz2bgEwUHSE0DYXQCCS5AXHCS6GukCQPBo7gsMkt4ShnAVg4NE987bOEBebJDo3O0BB8iLDRKdsRgcIC82SHAzFwfJE5NUHCA4SHqUIBU4ScVB0hNA6nGSioNEF0ktw0kqDhKcpOIg6beK6brzNi5BXnCQ9CVhCI/FvMAgwROGcJA8EUktx81cHCR9Jam4mYuDBI/F4KN3kPRGUmU4ScVB0lvCEK5icJD0GIvBVQwOkr8ApF7LiqnFzVwcJN2RVDwWg48/gaQnkoo7yvDxB0h6i8XgAMGHCiR48TY+dIIEj8XgQydIynEzFx+6QKLtScUlCD7+MqCxnhWmbsWNu9rx0RNISLgEwYcukBjgAMFHryDB8YEPXeP/CTAAf3oHi2QB+X0AAAAASUVORK5CYII=) no-repeat scroll 0px 0px transparent; height: 136px; width: 135px; z-index: 9999; position: absolute;\">&nbsp;</div>",
                defaults: {
                    customVariables: {},
                    emailInfoLoaded: false
                },
                intercept: dojo.mixin({
                    interceptDisp: "pageLoad",
                    surveyDisp: "immediate",
                    anon: "true",
                    anonData: {
                        userName: "",
                        userEmail: "",
                        emailInfoLoaded: true
                    },
                    percent: 26,
                    start: "Jan 01 2014",
                    stop: "Dec 31 2099",
                    presentDelay: 3,
                    invitation: {
                        title: "Tell IBM what you think",
                        content: "Would you please take 1 minute to take this survey?",
                        yes_label: "Yes",
                        no_label: "No thanks"
                    },
                    survey: {
                        type: "asm",
                        id: "11320",
                        width: 533,
                        height: 417,
                        metaData: ""
                    }
                }, _496)
            });
            _47f = "ccf-" + _47e.intercept.survey.type + ":" + _47e.intercept.survey.id;
            dojo.io.script.get({
                url: _47e.url_whitelist_path
            });
            setTimeout(function() {
                _47e.whitelist_status = true;
            }, 4000);
            var _498 = _47e.intercept.invitation,
                _499 = "entry",
                _49a = null;
            var _49b = "<p style=\"padding-bottom: 3px;padding-top: 8px;\">Your feedback is anonymous</p>";
            if (_47e.intercept.anon == "auto") {
                _47e.intercept.anonData.emailInfoLoaded = false;
                _4cd();
            }
            var _49c, _49d;
            ibmweb.queue.push(function() {
                if (!_47e.whitelist_status || !_47e.intercept.anonData.emailInfoLoaded) {
                    return false;
                } else {
                    return true;
                }
            }, function() {
                if (!_483()) {
                    return false;
                } else {
                    _47e.intercept.survey.url = _4c3();
                    if (_47e.intercept.interceptDisp != "pageLoad") {
                        _499 = "exit";
                    }
                    _480 = "{\"date\": " + new Date().getTime() + ",\"type\": \"" + _47e.intercept.survey.type + "\",\"id\": \"" + _47e.intercept.survey.id + "\"}";
                    ibmweb.queue.push(function() {
                        if (typeof dijit.byId("dialog_sp-intercept-overlay-invitation") != "undefined" && !dijit.byId("dialog_sp-intercept-overlay-invitation").open) {
                            return true;
                        } else {
                            return false;
                        }
                    }, function() {
                        ibmStats.event({
                            "ibmEV": "ol survey",
                            "ibmEvGroup": _47e.intercept.survey.type,
                            "ibmEvModule": _47e.intercept.survey.id,
                            "ibmEvAction": "intercept shown"
                        });
                        _485("ccf-global-intercept", _480, new Date((new Date()).getTime() + (_47e.global_minimum_wait * 24 * 60 * 60 * 1000)));
                        _485(_47f, _480, end);
                    });
                    if (_47e.intercept.anon == "auto") {
                        var _49e = _4d8();
                        if (_49e != "") {
                            _49b = _49e;
                        }
                    }
                    var html = "";
                    if (_47e.intercept.survey.type == "comment_card") {
                        var _49f = "<div class=\"ibm-common-overlay\" id=\"sp-intercept-overlay-invitation\">\n\t<div class=\"ibm-head\">\n\t\t<p><a class=\"ibm-common-overlay-close\" href=\"#close\">Close [x]</a></p>\n\t</div>\n\t<div class=\"ibm-body\">\n\t\t\n\t\t{{watermark}}\n\t\t<div class=\"ibm-main\">\n\t\t\t<a class=\"ibm-access\"><!-- Accessibility anchor --></a>\n\t\t\t\n\t\t\t<div class=\"overlay-content-slide active\" data-slide=\"main\">\n\t\t\t\t<div class=\"ibm-container ibm-alternate\" style=\"\">\n\t\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\t{{content}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"overlay-content-slide\" style=\"display: none;\" data-slide=\"about\">\n\t\t\t\t<div class=\"ibm-title\">\n\t\t\t\t\t<h2>Ongoing Web Feedback at IBM</h2>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-container ibm-alternate\" style=\"\">\n\t\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tIBM collects opt-in feedback from IBM web users on a broad and continual basis throughout its web sites.\n\t\t\t\t\t\t\tAll feedback submitted are reviewed only by IBM employees or IBM affiliates and no feedback is shared outside\n\t\t\t\t\t\t\tof IBM for any reason. See IBM's <a href=\"http://www.ibm.com/privacy/us/en/?lnk=flg-priv-usen\" target=\"_ibm_privacy_policy\" data-action=\"close-overlay\">privacy policy</a> and <a href=\"http://www.ibm.com/legal/us/en/?lnk=flg-tous-usen\" data-action=\"close-overlay\" target=\"_ibm_tou\">terms of use</a> for further detail.\n\t\t\t\t\t\t</p>\n\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tIBM may use a third party to collect or process feedback. Any such party is also bound by the IBM policy.\n\t\t\t\t\t\t\tCurrently we use opinionlab for feedback processing.\n\t\t\t\t\t\t\t<br />\n\t\t\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-external-link\" data-action=\"change-slide\" data-slide-target=\"leaving\">opinionlab</a>\n\t\t\t\t\t\t</p>\n\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tYour input is very valuable to us and although we read every comment that is sent to IBM in an effort to continuously\n\t\t\t\t\t\t\timprove our web sites for you, we generally do not reply to comments from this system unless otherwise stated.\n\t\t\t\t\t\t\tThank you for participating in the IBM web feedback program.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-buttons-row\">\n\t\t\t\t\t<div class=\"ibm-rule\"><hr /></div>\n\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-btn-sec\" data-action=\"change-slide\" data-slide-target=\"main\">Back to Feedback</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\n\t\t\t<div class=\"overlay-content-slide\" style=\"display: none;\" data-slide=\"leaving\">\n\t\t\t\t<div class=\"ibm-title\">\n\t\t\t\t\t<h2>Leaving the IBM Web Site</h2>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-container ibm-alternate ibm-buttons-last\" style=\"\">\n\t\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tYou are now leaving the IBM Web site. IBM makes no representations or warranties about any other Web site which\n\t\t\t\t\t\t\tyou may access through this one. When you access non-IBM Web sites, even though they might contain the IBM logo\n\t\t\t\t\t\t\tand content regarding IBM's products and services, such Web sites are independent of IBM and IBM has no control\n\t\t\t\t\t\t\tover the operation of non-IBM Web sites. In addition, a link to a non-IBM Web site does not mean that IBM endorses\n\t\t\t\t\t\t\tthat Web site or has any responsibility for the use of such Web site.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-buttons-row\">\n\t\t\t\t\t<div class=\"ibm-rule\"><hr /></div>\n\t\t\t\t\t<a href=\"//secure.opinionlab.com/about_this_system.html\" target=\"_about_opinion_lab\" class=\"ibm-btn-pri\" data-action=\"change-slide\" data-slide-target=\"main\" style=\"float: right; display: inline;\">Continue</a>\n\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-btn-sec\" data-action=\"change-slide\" data-slide-target=\"main\">Cancel</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"ibm-footer\"></div>\n</div>\n\n\n<div class=\"ibm-common-overlay\" id=\"sp-intercept-overlay-survey\" style=\"width: {{survey_width}}px;\">\n\t<div class=\"ibm-head\">\n\t\t<p><a class=\"ibm-common-overlay-close\" href=\"#close\">Close [x]</a></p>\n\t</div>\n\t<div class=\"ibm-body\">\n\t\t<div class=\"ibm-main\" style=\"padding: 0;\">\n\t\t\t<a class=\"ibm-access\"><!-- Accessibility anchor --></a>\n\t\t\t<div class=\"ibm-title\" style=\"display: none;\">\n\t\t\t\t<h2>Survey!!!</h2>\n\t\t\t</div>\n\t\t\t<div class=\"ibm-container ibm-alternate\" style=\"padding: 0;\">\n\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"ibm-footer\"></div>\n</div>",
                            html = _49f.split("{{content}}").join("<div id=\"commentCardContent\"></div>").split("{{anonymity}}").join(_49b).split("{{watermark}}").join(_492());
                        var _4a0 = dojo.mixin({
                            container: "commentCardContent",
                            ccid: 444,
                            type: {
                                display: "inline",
                                form: "inline"
                            },
                            heading: _498.title,
                            description: _4ed(_498.content, _47e.content_limit)
                        }, _47e.intercept.survey.commentCard);
                    } else {
                        if (_47e.intercept.survey.type == "OLcard") {
                            var _49f = "<div class=\"ibm-common-overlay\" id=\"sp-intercept-overlay-invitation\">\n\t<div class=\"ibm-head\">\n\t\t<p><a class=\"ibm-common-overlay-close\" href=\"#close\">Close [x]</a></p>\n\t</div>\n\t<div class=\"ibm-body\">\n\t\t\n\t\t{{watermark}}\n\t\t<div class=\"ibm-main\">\n\t\t\t<a class=\"ibm-access\"><!-- Accessibility anchor --></a>\n\t\t\t\n\t\t\t<div class=\"overlay-content-slide active\" data-slide=\"main\">\n\t\t\t\t<div class=\"ibm-title\">\n\t\t\t\t\t<h2>{{title}}</h2>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-container ibm-alternate\" style=\"\">\n\t\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\t<p>{{content}}</p>\n\t\t\t\t\t\n\t\t\t\t\t\t{{anonymity}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-buttons-row\" style=\"text-align: right;\">\n\t\t\t\t\t<div class=\"ibm-rule\"><hr /></div>\n\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-btn-pri\" data-action=\"opt-in\">{{yes_label}}</a>\n\t\t\t\t\t&nbsp;&nbsp;\n\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-btn-sec\" data-action=\"opt-out\">{{no_label}}</a>\n\t\t\t\t\t&nbsp;&nbsp;\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t\t<a href=\"javascript:;\" data-action=\"change-slide\" data-slide-target=\"about\">About feedback at IBM</a>\n\t\t\t\t\n\t\t\t</div>\n\n\t\t\t<div class=\"overlay-content-slide\" style=\"display: none;\" data-slide=\"about\">\n\t\t\t\t<div class=\"ibm-title\">\n\t\t\t\t\t<h2>Ongoing Web Feedback at IBM</h2>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-container ibm-alternate\" style=\"\">\n\t\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tIBM collects opt-in feedback from IBM web users on a broad and continual basis throughout it's web sites.\n\t\t\t\t\t\t\tAll feedback submitted are reviewed only by IBM employees or IBM affiliates and no feedback is shared outside\n\t\t\t\t\t\t\tof IBM for any reason. See IBM's <a href=\"http://www.ibm.com/privacy/us/en/?lnk=flg-priv-usen\" target=\"_ibm_privacy_policy\" data-action=\"close-overlay\">privacy policy</a> and <a href=\"http://www.ibm.com/legal/us/en/?lnk=flg-tous-usen\" data-action=\"close-overlay\" target=\"_ibm_tou\">terms of use</a> for further detail.\n\t\t\t\t\t\t</p>\n\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tIBM may use a third party to collect or process feedback. Any such party is also bound by the IBM policy.\n\t\t\t\t\t\t\tCurrently we use opinionlab for feedback processing.\n\t\t\t\t\t\t\t<br />\n\t\t\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-external-link\" data-action=\"change-slide\" data-slide-target=\"leaving\">opinionlab</a>\n\t\t\t\t\t\t</p>\n\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tYour input is very valuable to us and although we read every comment that is sent to IBM in an effort to continuously\n\t\t\t\t\t\t\timprove our web sites for you, we generally do not reply to comments from this system unless otherwise stated.\n\t\t\t\t\t\t\tThank you for participating in the IBM web feedback program.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-buttons-row\">\n\t\t\t\t\t<div class=\"ibm-rule\"><hr /></div>\n\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-btn-sec\" data-action=\"change-slide\" data-slide-target=\"main\">Back to Feedback</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\n\t\t\t<div class=\"overlay-content-slide\" style=\"display: none;\" data-slide=\"leaving\">\n\t\t\t\t<div class=\"ibm-title\">\n\t\t\t\t\t<h2>Leaving the IBM Web Site</h2>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-container ibm-alternate ibm-buttons-last\" style=\"\">\n\t\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tYou are now leaving the IBM Web site. IBM makes no representations or warranties about any other Web site which\n\t\t\t\t\t\t\tyou may access through this one. When you access non-IBM Web sites, even though they might contain the IBM logo\n\t\t\t\t\t\t\tand content regarding IBM's products and services, such Web sites are independent of IBM and IBM has no control\n\t\t\t\t\t\t\tover the operation of non-IBM Web sites. In addition, a link to a non-IBM Web site does not mean that IBM endorses\n\t\t\t\t\t\t\tthat Web site or has any responsibility for the use of such Web site.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-buttons-row\">\n\t\t\t\t\t<div class=\"ibm-rule\"><hr /></div>\n\t\t\t\t\t<a href=\"//secure.opinionlab.com/about_this_system.html\" target=\"_about_opinion_lab\" class=\"ibm-btn-pri\" data-action=\"change-slide\" data-slide-target=\"main\" style=\"float: right; display: inline;\">Continue</a>\n\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-btn-sec\" data-action=\"change-slide\" data-slide-target=\"main\">Cancel</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"ibm-footer\"></div>\n</div>\n\n\n<div class=\"ibm-common-overlay\" id=\"sp-intercept-overlay-survey\" style=\"width: {{survey_width}}px;\">\n\t<div class=\"ibm-head\">\n\t\t<p><a class=\"ibm-common-overlay-close\" href=\"#close\">Close [x]</a></p>\n\t</div>\n\t<div class=\"ibm-body\">\n\t\t<div class=\"ibm-main\" style=\"padding: 0;\">\n\t\t\t<a class=\"ibm-access\"><!-- Accessibility anchor --></a>\n\t\t\t<div class=\"ibm-title\" style=\"display: none;\">\n\t\t\t\t<h2>Survey!!!</h2>\n\t\t\t</div>\n\t\t\t<div class=\"ibm-container ibm-alternate\" style=\"padding: 0;\">\n\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"ibm-footer\"></div>\n</div>",
                                html = _49f.split("{{title}}").join(_498.title).split("{{content}}").join(_4ed(_498.content, _47e.content_limit)).split("{{yes_label}}").join(_498.yes_label).split("{{no_label}}").join(_498.no_label).split("{{anonymity}}").join(_49b).split("{{watermark}}").join(_492());
                        } else {
                            var _49f = "<div class=\"ibm-common-overlay\" id=\"sp-intercept-overlay-invitation\">\n\t<div class=\"ibm-head\">\n\t\t<p><a class=\"ibm-common-overlay-close\" href=\"#close\">Close [x]</a></p>\n\t</div>\n\t<div class=\"ibm-body\">\n\t\t\n\t\t{{watermark}}\n\t\t<div class=\"ibm-main\">\n\t\t\t<a class=\"ibm-access\"><!-- Accessibility anchor --></a>\n\t\t\t\n\t\t\t<div class=\"overlay-content-slide active\" data-slide=\"main\">\n\t\t\t\t<div class=\"ibm-title\">\n\t\t\t\t\t<h2>{{title}}</h2>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-container ibm-alternate\" style=\"\">\n\t\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\t<p>{{content}}</p>\n\t\t\t\t\t\n\t\t\t\t\t\t{{anonymity}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-buttons-row\" style=\"text-align: right;\">\n\t\t\t\t\t<div class=\"ibm-rule\"><hr /></div>\n\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-btn-pri\" data-action=\"opt-in\">{{yes_label}}</a>\n\t\t\t\t\t&nbsp;&nbsp;\n\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-btn-sec\" data-action=\"opt-out\">{{no_label}}</a>\n\t\t\t\t\t&nbsp;&nbsp;\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t\t<a href=\"javascript:;\" data-action=\"change-slide\" data-slide-target=\"about\">About feedback at IBM</a>\n\t\t\t\t\n\t\t\t</div>\n\n\t\t\t<div class=\"overlay-content-slide\" style=\"display: none;\" data-slide=\"about\">\n\t\t\t\t<div class=\"ibm-title\">\n\t\t\t\t\t<h2>Ongoing Web Feedback at IBM</h2>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-container ibm-alternate\" style=\"\">\n\t\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tIBM collects opt-in feedback from IBM web users on a broad and continual basis throughout it's web sites.\n\t\t\t\t\t\t\tAll feedback submitted are reviewed only by IBM employees or IBM affiliates and no feedback is shared outside\n\t\t\t\t\t\t\tof IBM for any reason. See IBM's <a href=\"http://www.ibm.com/privacy/us/en/?lnk=flg-priv-usen\" target=\"_ibm_privacy_policy\" data-action=\"close-overlay\">privacy policy</a> and <a href=\"http://www.ibm.com/legal/us/en/?lnk=flg-tous-usen\" data-action=\"close-overlay\" target=\"_ibm_tou\">terms of use</a> for further detail.\n\t\t\t\t\t\t</p>\n\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tIBM may use a third party to collect or process feedback. Any such party is also bound by the IBM policy.\n\t\t\t\t\t\t\tCurrently we use opinionlab for feedback processing.\n\t\t\t\t\t\t\t<br />\n\t\t\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-external-link\" data-action=\"change-slide\" data-slide-target=\"leaving\">opinionlab</a>\n\t\t\t\t\t\t</p>\n\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tYour input is very valuable to us and although we read every comment that is sent to IBM in an effort to continuously\n\t\t\t\t\t\t\timprove our web sites for you, we generally do not reply to comments from this system unless otherwise stated.\n\t\t\t\t\t\t\tThank you for participating in the IBM web feedback program.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-buttons-row\">\n\t\t\t\t\t<div class=\"ibm-rule\"><hr /></div>\n\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-btn-sec\" data-action=\"change-slide\" data-slide-target=\"main\">Back to Feedback</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\n\t\t\t<div class=\"overlay-content-slide\" style=\"display: none;\" data-slide=\"leaving\">\n\t\t\t\t<div class=\"ibm-title\">\n\t\t\t\t\t<h2>Leaving the IBM Web Site</h2>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-container ibm-alternate ibm-buttons-last\" style=\"\">\n\t\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tYou are now leaving the IBM Web site. IBM makes no representations or warranties about any other Web site which\n\t\t\t\t\t\t\tyou may access through this one. When you access non-IBM Web sites, even though they might contain the IBM logo\n\t\t\t\t\t\t\tand content regarding IBM's products and services, such Web sites are independent of IBM and IBM has no control\n\t\t\t\t\t\t\tover the operation of non-IBM Web sites. In addition, a link to a non-IBM Web site does not mean that IBM endorses\n\t\t\t\t\t\t\tthat Web site or has any responsibility for the use of such Web site.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ibm-buttons-row\">\n\t\t\t\t\t<div class=\"ibm-rule\"><hr /></div>\n\t\t\t\t\t<a href=\"//secure.opinionlab.com/about_this_system.html\" target=\"_about_opinion_lab\" class=\"ibm-btn-pri\" data-action=\"change-slide\" data-slide-target=\"main\" style=\"float: right; display: inline;\">Continue</a>\n\t\t\t\t\t<a href=\"javascript:;\" class=\"ibm-btn-sec\" data-action=\"change-slide\" data-slide-target=\"main\">Cancel</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"ibm-footer\"></div>\n</div>\n\n\n<div class=\"ibm-common-overlay\" id=\"sp-intercept-overlay-survey\" style=\"width: {{survey_width}}px;\">\n\t<div class=\"ibm-head\">\n\t\t<p><a class=\"ibm-common-overlay-close\" href=\"#close\">Close [x]</a></p>\n\t</div>\n\t<div class=\"ibm-body\">\n\t\t<div class=\"ibm-main\" style=\"padding: 0;\">\n\t\t\t<a class=\"ibm-access\"><!-- Accessibility anchor --></a>\n\t\t\t<div class=\"ibm-title\" style=\"display: none;\">\n\t\t\t\t<h2>Survey!!!</h2>\n\t\t\t</div>\n\t\t\t<div class=\"ibm-container ibm-alternate\" style=\"padding: 0;\">\n\t\t\t\t<div class=\"ibm-container-body\">\n\t\t\t\t\t<iframe src=\"{{survey_url}}\" width=\"{{survey_width}}\" height=\"{{survey_height}}\" frameborder=\"0\"></iframe>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"ibm-footer\"></div>\n</div>",
                                html = _49f.split("{{title}}").join(_498.title).split("{{content}}").join(_4ed(_498.content, _47e.content_limit)).split("{{yes_label}}").join(_498.yes_label).split("{{no_label}}").join(_498.no_label).split("{{survey_url}}").join(_47e.intercept.survey.url).split("{{survey_width}}").join(_47e.intercept.survey.width).split("{{survey_height}}").join(_47e.intercept.survey.height).split("{{anonymity}}").join(_49b).split("{{watermark}}").join(_492());
                        }
                    }
                    html += "<style type=\"text/javascript\">div.ibm-common-overlay div.overlay-content-slide { display: none; } div.ibm-common-overlay div.overlay-content-slide.active { display: block; }</script>";
                    try {
                        var _4a1 = html.match(/class="ibm-common-overlay" id="[^"]*"/g);
                        _49d = _4a1[0].substring(31, _4a1[0].length - 1);
                        _49c = _4a1[1].substring(31, _4a1[1].length - 1);
                        dojo.place(html, dojo.query("body")[0], "last");
                        dojo.query("[data-action]", dojo.byId(_49d)).connect("click", function() {
                            actions = dojo.attr(this, "data-action").split(/,[\s]*/g);
                            var _4a2 = dojo.attr(this, "data-slide-target");
                            dojo.forEach(actions, function(_4a3) {
                                switch (_4a3) {
                                    case "change-slide":
                                        dojo.query("div.overlay-content-slide", dojo.byId(_49d)).style("display", "none");
                                        dojo.query("div.overlay-content-slide[data-slide='" + _4a2 + "']", dojo.byId(_49d)).style("display", "block");
                                        var top = Math.max(0, Math.floor((dojo.window.getBox().h - dojo.marginBox(dojo.byId("dialog_" + _49d)).h) / 2));
                                        dojo.query("#dialog_" + _49d).style("top", top + "px");
                                        break;
                                    case "opt-in":
                                        ibmStats.event({
                                            "ibmEV": "ol survey",
                                            "ibmEvGroup": _47e.intercept.survey.type,
                                            "ibmEvModule": _47e.intercept.survey.id,
                                            "ibmEvAction": "intercept yes clicked"
                                        });
                                        if (_47e.intercept.survey.type == "OLcard") {
                                            _47e.OLcardObj.show();
                                            ibmweb.queue.push(function() {
                                                if (typeof _47e.OLcardObj.onPageCardVisible == "undefined") {
                                                    return false;
                                                } else {
                                                    return true;
                                                }
                                            }, function() {
                                                _47e.OLcardObj.show();
                                                ibmweb.overlay.hide(_49d);
                                            });
                                        } else {
                                            var _4a4 = dojo.query("input[name='anonymity']:checked", dojo.byId("anonimityForm"))[0];
                                            if (ibmweb.config.get("opinionlab").requirePrompt && typeof _4a4 === "undefined") {
                                                alert("Please select a anonymity data.");
                                                return;
                                            }
                                            if (_47e.intercept.survey.type == "userzoom") {
                                                ibmweb.overlay.hide(_49d);
                                                window.open(_47e.intercept.survey.url, "_blank");
                                                return;
                                            }
                                            if (typeof _4a4 !== "undefined" && _4a4.value == "yes") {
                                                var _4a5 = _4e2();
                                                var _4a6 = dojo.query("iframe", dojo.byId(_49c))[0];
                                                if (_4a5 != "") {
                                                    var src = dojo.attr(_4a6, "src") + "&" + _4a5;
                                                    dojo.attr(_4a6, "src", src);
                                                }
                                            }
                                            if (_47e.intercept.surveyDisp == "siteExit" || _47e.intercept.surveyDisp == "pageExit") {
                                                ibmweb.overlay.hide(_49d);
                                                _482 = true;
                                                _4a7(_49c, "exit");
                                            } else {
                                                ibmweb.overlay.hide(_49d);
                                                ibmweb.overlay.show(_49c);
                                            }
                                        }
                                        break;
                                    case "opt-out":
                                        ibmweb.overlay.hide(_49d);
                                        break;
                                }
                            });
                        });
                        if (_47e.intercept.survey.type == "comment_card") {
                            ibmweb.queue.push(function() {
                                if (dojo.byId("commentCardContent") == null) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }, function() {
                                var cu = new ibmweb.opinionlab.customSurvey(_4a0);
                                cu.initSurvey();
                                _4a7(_49d, _499);
                            });
                        } else {
                            _4a7(_49d, _499);
                        }
                    } catch (er) {}
                }
            });
        };

        function _48d() {
            if (_47e.intercept.interceptDisp == "pageExit" && _47e.intercept.surveyDisp != "immediate") {
                _47e.intercept.surveyDisp = "immediate";
            }
            if (_47e.intercept.interceptDisp == "siteExit" && _47e.intercept.surveyDisp != "immediate") {
                _47e.intercept.surveyDisp = "immediate";
            }
            if (_47e.intercept.interceptDisp == "siteExit" || _47e.intercept.surveyDisp == "siteExit") {
                if (typeof(_47e.intercept.exitURL) == "undefined" || _47e.intercept.exitURL.length <= 0) {
                    return false;
                } else {
                    if (!_4a8()) {
                        return false;
                    }
                }
            }
            return true;
        };

        function _4a7(_4a9, _4aa) {
            var _4ab = _47e.intercept.invitation,
                _4ac = _47e.intercept.survey,
                _4ad = _47e.intercept.presentDelay * 1000;
            if (_4aa == "entry") {
                setTimeout(function() {
                    ibmweb.overlay.show(_4a9);
                }, _4ad);
            } else {
                if (_4aa == "exit") {
                    _4ae(_4a9);
                }
            }
        };
        var _4ae = function(_4af) {
            var _4b0 = "#ibm-masthead a";
            var _4b1 = "#ibm-footer-module a";
            var _4b2 = "a.ibm-intercept-exit-survey";
            var _4b3 = false;
            var _4af = _4af;
            var _4b4 = {
                url: ""
            };
            Array.prototype.diff = function(a) {
                return this.filter(function(i) {
                    return a.indexOf(i) < 0;
                });
            };

            function _4b5() {
                dojo.query(_4b0).onclick(function(evt) {
                    var _4b6 = evt.currentTarget.parentElement.parentElement;
                    if (evt.currentTarget.href != "" && evt.currentTarget.href.substr(0, 1) != "#" && _4b6.id != "ibm-menu-links") {
                        evt.preventDefault();
                        _4b4.target = evt.currentTarget.target;
                        _4b4.url = evt.currentTarget.href;
                        _4b7();
                    }
                });
                dojo.query(_4b1).onclick(function(evt) {
                    if (evt.currentTarget.href != "" && evt.currentTarget.href.substr(0, 1) != "#") {
                        evt.preventDefault();
                        _4b4.target = evt.currentTarget.target;
                        _4b4.url = evt.currentTarget.href;
                        _4b7();
                    }
                });
                dojo.query(_4b2).onclick(function(evt) {
                    if (evt.currentTarget.href != "" && evt.currentTarget.href.substr(0, 1) != "#") {
                        evt.preventDefault();
                        _4b4.url = evt.currentTarget.href;
                        _4b4.target = evt.currentTarget.target;
                        _4b7();
                    }
                });
                ibmweb.queue.push(function() {
                    if (dojo.query("[data-action='opt-out']", dojo.byId("sp-intercept-overlay-invitation")).length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }, function() {
                    dojo.query("[data-action='opt-out']", dojo.byId("sp-intercept-overlay-invitation")).onclick(function() {
                        _4b9();
                    });
                    dojo.query("[data-action='opt-in']", dojo.byId("sp-intercept-overlay-invitation")).onclick(function() {
                        _4b3 = true;
                    });
                });
            };

            function _4b7() {
                var _4b8 = _483();
                if (_4b8 == false && !_482) {
                    _4b3 = false;
                    _4b9();
                } else {
                    ibmweb.overlay.show(_4af);
                    _4ba();
                    ibmweb.queue.push(function() {
                        if (typeof dijit.byId("dialog_sp-intercept-overlay-survey") != "undefined" && !dijit.byId("dialog_sp-intercept-overlay-survey").open) {
                            return true;
                        } else {
                            return false;
                        }
                    }, function() {
                        _4b3 = false;
                        _4b9();
                    });
                    ibmweb.queue.push(function() {
                        if (typeof dijit.byId("dialog_sp-intercept-overlay-invitation") != "undefined" && !dijit.byId("dialog_sp-intercept-overlay-invitation").open) {
                            return true;
                        } else {
                            return false;
                        }
                    }, function() {
                        if (_482) {
                            _4b3 = true;
                        }
                        _4b9();
                    });
                    _482 = false;
                }
            };

            function _4b9() {
                if (!_4b3) {
                    _4b3 = true;
                    _4bb();
                    if (_4b4.target == "") {
                        window.location.href = _4b4.url;
                    } else {
                        window.open(_4b4.url, _4b4.target);
                    }
                }
            };

            function _4bb() {
                window.onbeforeunload = null;
            };

            function _4ba() {
                setTimeout(function() {
                    window.onbeforeunload = function(e) {
                        return false;
                    };
                }, 500);
            };
            dojo.ready(function() {
                setTimeout(_4b5, 2000);
            });
            return {
                status: "loaded"
            };
        };

        function _48a() {
            if (typeof _47e.intercept.preventCount !== "undefined") {
                if (!(!isNaN(parseFloat(_47e.intercept.preventCount)) && isFinite(_47e.intercept.preventCount))) {
                    return false;
                }
                var _4bc = _47e.intercept.preventCount;
                var _4bd = "ccf-prevent-intercept-" + _47e.intercept.survey.type + ":" + _47e.intercept.survey.id;
                if (_485(_4bd) == null) {
                    _485(_4bd, 1, end);
                }
                var _4be = _485(_4bd);
                if (_4be < _4bc) {
                    _4be++;
                    _485(_4bd, _4be, end);
                    return false;
                }
            }
            return true;
        };

        function _490() {
            _481 = new Date(_47e.intercept.start);
            end = new Date(_47e.intercept.stop);
            var _4bf = (end - _481) / (1000 * 60 * 60 * 24),
                _4c0 = 10,
                _4c1 = 60;
            if (isNaN(_481.getTime())) {
                return false;
            }
            if (isNaN(end.getTime())) {
                return false;
            }
            if (_4bf < _4c0) {
                end = new Date(_481.getTime() + (_4c0 * 24 * 60 * 60 * 1000));
            }
            if (_4bf > _4c1) {
                end = new Date(_481.getTime() + (_4c1 * 24 * 60 * 60 * 1000));
            }
            if (_47e.now < _481) {
                return false;
            }
            if (_47e.now > end) {
                if (!_4c2()) {
                    return false;
                } else {
                    return true;
                }
            }
            return true;
        };

        function _4c3() {
            var url = "";
            switch (_47e.intercept.survey.type) {
                case "asm":
                    var _4c4 = _4c5();
                    _4c4 = _4c4.length > 0 ? "&" + _4c4 : _4c4;
                    url = "//survey.opinionlab.com/survey/s?s=" + _47e.intercept.survey.id + _4c4;
                    break;
                case "efm":
                    url = "//ucdsurvey1.torolab.ibm.com/ss2/wsb.dll/s/" + _47e.intercept.survey.id;
                    break;
                case "spss":
                    url = "//survey.opinionlab.com/survey/s?s=" + _47e.intercept.survey.id;
                    break;
                case "OLcard":
                    ibmweb.dynnav.opinionlab().onLoad();
                    ibmweb.queue.push(function() {
                        return typeof(OOo) == "object" && OOo !== null;
                    }, function() {
                        var obj = {
                            referrerRewrite: {
                                replacePattern: _47e.intercept.survey.id + "?lang=" + _47e.intercept.survey.id
                            },
                            onPageCard: {
                                closeWithOverlay: {}
                            }
                        };
                        _47e.OLcardObj = new OOo.Ocode(obj);
                    });
                    break;
                case "userzoom":
                    url = "https://s.userzoom.com/m/" + _47e.intercept.survey.id;
                    break;
                case "sg":
                    url = "http://www.surveygizmo.com/" + _47e.intercept.survey.id;
                    break;
                case "comment_card":
                    url = "commentCard";
                    break;
                case "customB":
                    url = _47e.intercept.survey.url;
                    break;
            }
            if (url === null) {}
            return url;
        };

        function _4c5() {
            var _4c6 = "";
            var _4c7 = _47e.intercept.survey.metaData;
            if (_4c7 != "" && typeof _4c7 != "undefined") {
                var _4c8 = _4c7.split("&");
                for (var m = 0; m < _4c8.length; m++) {
                    var _4c9 = _4c8[m].split("=");
                    _4c6 += "opdata_" + _4c9[0] + "=" + _4c9[1] + "&";
                }
            }
            _4c6 = _4c6.length > 0 ? _4c6.slice(0, -1) : _4c6;
            return _4c6;
        };

        function _4ca(data) {
            var name = (data.User.NickName.length === 0) ? data.User.CommonName : data.User.NickName;
            _47e.intercept.anonData.userName = name;
            var _4cb = data.User.Email;
            _47e.intercept.anonData.userEmail = _4cb;
            var _4cc = dojo.cookie("w3ibmProfile"),
                hkey = _4cc.split("|")[0];
            ibmweb.storage.setItem("w3UserName_" + hkey, name);
            ibmweb.storage.setItem("w3UserEmail_" + hkey, _4cb);
            _47e.intercept.anonData.emailInfoLoaded = true;
        };

        function _4cd() {
            var _4ce = dojo.cookie("w3ibmProfile");
            if (_4ce) {
                var hkey = _4ce.split("|")[0],
                    name = ibmweb.storage.getItem("w3UserName_" + hkey),
                    _4cf = ibmweb.storage.getItem("w3UserEmail_" + hkey);
                if (name && _4cf) {
                    _47e.intercept.anonData.userName = name;
                    _47e.intercept.anonData.userEmail = _4cf;
                    _47e.intercept.anonData.emailInfoLoaded = true;
                } else {
                    var _4d0 = "//w3.ibm.com/w3restsvc/user/1.0.0/$appid/json/hkey/$hkey/callback/$callback",
                        _4d1 = "6127839ee7627460c4189e36fc6b1b01",
                        _4d2 = _4d0.replace("$appid", _4d1).replace("$hkey", hkey).replace("$callback", "ibmweb.dynnav.ccfintercept.setUserData");
                    dojo.io.script.get({
                        url: _4d2
                    });
                }
                setTimeout(function() {
                    _47e.intercept.anonData.emailInfoLoaded = true;
                }, 4000);
            } else {
                _47e.intercept.anonData.emailInfoLoaded = true;
            }
        };

        function _4d3() {
            var _4d4 = "";
            var _4d5 = _47e.intercept.anonData.userName;
            var name = _47e.intercept.anonData.userEmail;
            _4d4 = "<form class=\"ibm-row-form\" id=\"anonimityForm\"><p style=\"padding-bottom: 3px;padding-top: 15px;font-size: 11px;\">";
            var _4d6 = true;
            if (ibmweb.config.get("opinionlab").requirePrompt === true) {
                _4d4 += "<label for=\"intercept-anonymity\"><span class=\"ibm-required\">*</span>May we contact you regarding your comments ?</label>";
                _4d6 = false;
            } else {
                _4d4 += "<label for=\"intercept-anonymity\">May we contact you regarding your comments ?</label>";
            }
            _4d4 += "<span class=\"ibm-input-group\"><input type=\"radio\" value=\"yes\" name=\"anonymity\" id=\"intercept-anonymity-yes\"><label for=\"intercept-anonymity-yes\">Yes</label>";
            _4d4 += "<input type=\"radio\" value=\"no\" " + (_4d6 ? "checked=\"checked\"" : "") + " name=\"anonymity\" id=\"intercept-anonymity-no\"><label for=\"intercept-anonymity-no\">No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If no, then your feedback will be anonymous</label></span>";
            if (_4d5 != "" && name != "") {
                var _4d7 = "<div>Name: " + name + "</div><div style=\"margin-top: 5px;\">Email: " + _4d5 + "</div>";
            } else {
                var _4d7 = "";
            }
            if (ibmweb.config.get("opinionlab").getUserInfo && ibmweb.config.get("opinionlab").promptUserInfo) {
                _4d4 += "<div id='intercept-anonytext-content'>" + _4d7 + "</div>";
            } else {
                _4d4 += "<div id='intercept-anonytext-content'>Your feedback is anonymous</p>";
            }
            _4d4 += "</form>";
            return _4d4;
        };

        function _4d8() {
            var _4d9 = "";
            var _4da = _47e.intercept.anonData.userName;
            var name = _47e.intercept.anonData.userEmail;
            if (ibmweb.config.get("opinionlab").getUserInfo && ibmweb.config.get("opinionlab").promptUserInfo && _47e.intercept.anonData.emailInfoLoaded && _4da != "" && name != "") {
                _4d9 = _4d3();
                ibmweb.queue.push(function() {
                    if (dojo.query("[name=\"anonymity\"]").length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }, function() {
                    dojo.forEach(dojo.query("[name=\"anonymity\"]"), function(node, _4db) {
                        dojo.connect(node, "click", function(e) {
                            if (_4da != "" && name != "") {
                                var _4dc = "<div>Name: " + name + "</div><div style=\"margin-top: 5px;\">Email: " + _4da + "</div>";
                            } else {
                                var _4dc = "";
                            }
                            if (node.value == "yes" && node.checked) {
                                dojo.byId("intercept-anonytext-content").innerHTML = _4dc;
                                dojo.query("label[for=\"intercept-anonymity-no\"]")[0].innerHTML = "No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If no, then your feedback will be anonymous";
                            } else {
                                dojo.byId("intercept-anonytext-content").innerHTML = "Your feedback is anonymous";
                                dojo.query("label[for=\"intercept-anonymity-no\"]")[0].innerHTML = "No";
                            }
                        });
                    });
                });
            } else {
                if (ibmweb.config.get("opinionlab").getUserInfo && ibmweb.config.get("opinionlab").promptUserInfo && (ibmweb.config.get("opinionlab").requirePrompt === true || ibmweb.config.get("opinionlab").requirePrompt === false) && (_4da == "" || name == "")) {
                    _4d9 = _4d3();
                    ibmweb.queue.push(function() {
                        if (dojo.query("[name=\"anonymity\"]").length > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }, function() {
                        dojo.forEach(dojo.query("[name=\"anonymity\"]"), function(node, _4dd) {
                            dojo.connect(node, "click", function(e) {
                                if (node.value == "yes" && node.checked) {
                                    dojo.byId("intercept-anonytext-content").innerHTML = "";
                                    var _4de = "<div class=\"ibm-common-overlay\" id=\"intercept-anonytext-data-overlay\"> <div class=\"ibm-head\"> <p><a class=\"ibm-common-overlay-close\" href=\"#close\">Close [x]</a></p> </div> <div class=\"ibm-body\"> <div class=\"ibm-main\"> <div class=\"ibm-title ibm-subtitle\"> <h2>Feedback Information</h2> </div> <div class=\"ibm-container ibm-alternate ibm-buttons-last\"> <div class=\"ibm-container-body\"> <form action=\"#\" class=\"ibm-row-form\" enctype=\"multipart/form-data\" method=\"post\"> <p><label for=\"name\">Name:<span class=\"ibm-required\">*</span></label><span><input name=\"intercept-anonytext-data-name\" size=\"25\" value=\"\" style=\"width: 200px;\" class=\"required\" type=\"text\" /></span></p> <p><label for=\"email\">Email:<span class=\"ibm-required\">*</span></label><span><input name=\"intercept-anonytext-data-email\" size=\"25\" value=\"\" style=\"width: 200px;\" class=\"required\" type=\"text\" /></span></p><div class=\"ibm-overlay-rule\"><hr /> </div> <p class=\"ibm-first\"><input class=\"ibm-btn-arrow-sec\" name=\"intercept-anonytext-data-submit\" value=\"Save\" type=\"button\" /></p> </form> </div> </div> </div> </div> </div>";
                                    dojo.place(_4de, dojo.query("body")[0], "last");
                                    ibmweb.overlay.show("intercept-anonytext-data-overlay");
                                    ibmweb.queue.push(function() {
                                        return typeof dijit.byId("dialog_intercept-anonytext-data-overlay") !== "undefined";
                                    }, function() {
                                        dojo.connect(dojo.query("[name=\"intercept-anonytext-data-submit\"]")[0], "click", function() {
                                            if (dojo.query(".ibm-error-link", dojo.query("[name=\"intercept-anonytext-data-name\"]")[0].parentElement).length > 0) {
                                                dojo.query(".ibm-error-link", dojo.query("[name=\"intercept-anonytext-data-name\"]")[0].parentElement).forEach(function(node, _4df) {
                                                    dojo.destroy(node, dojo.query("[name=\"intercept-anonytext-data-name\"]")[0].parentElement);
                                                });
                                            }
                                            if (dojo.query(".ibm-error-link", dojo.query("[name=\"intercept-anonytext-data-email\"]")[0].parentElement).length > 0) {
                                                dojo.query(".ibm-error-link", dojo.query("[name=\"intercept-anonytext-data-email\"]")[0].parentElement).forEach(function(node, _4e0) {
                                                    dojo.destroy(node, dojo.query("[name=\"intercept-anonytext-data-email\"]")[0].parentElement);
                                                });
                                            }
                                            if (dojo.query("[name=\"intercept-anonytext-data-name\"]")[0].value === "") {
                                                dojo.place("<a title=\"Error link\" href=\"#\" class=\"ibm-error-link\">Error</a>", dojo.query("[name=\"intercept-anonytext-data-name\"]")[0].parentElement, "last");
                                                return;
                                            } else {
                                                _47e.intercept.anonData.userName = dojo.query("[name=\"intercept-anonytext-data-name\"]")[0].value;
                                            }
                                            if (dojo.query("[name=\"intercept-anonytext-data-email\"]")[0].value === "") {
                                                dojo.place("<a title=\"Error link\" href=\"#\" class=\"ibm-error-link\">Error</a>", dojo.query("[name=\"intercept-anonytext-data-email\"]")[0].parentElement, "last");
                                                return;
                                            } else {
                                                _47e.intercept.anonData.userEmail = dojo.query("[name=\"intercept-anonytext-data-email\"]")[0].value;
                                            }
                                            ibmweb.overlay.hide("intercept-anonytext-data-overlay");
                                        });
                                        dojo.connect(dijit.byId("dialog_intercept-anonytext-data-overlay"), "onHide", function() {
                                            if ((_47e.intercept.anonData.userEmail == "" || _47e.intercept.anonData.userName == "")) {
                                                dojo.attr(dojo.query("[value=\"no\"]")[0], "checked", true);
                                                dojo.byId("intercept-anonytext-content").innerHTML = "Your feedback is anonymous";
                                                dojo.query("label[for=\"intercept-anonymity-no\"]")[0].innerHTML = "No";
                                            } else {
                                                var _4e1 = "<div>Name: " + _47e.intercept.anonData.userName + "</div><div style=\"margin-top: 5px;\">Email: " + _47e.intercept.anonData.userEmail + "</div>";
                                                dojo.byId("intercept-anonytext-content").innerHTML = _4e1;
                                                dojo.query("label[for=\"intercept-anonymity-no\"]")[0].innerHTML = "No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If no, then your feedback will be anonymous";
                                            }
                                        });
                                    });
                                } else {
                                    dojo.byId("intercept-anonytext-content").innerHTML = "Your feedback is anonymous";
                                    dojo.query("label[for=\"intercept-anonymity-no\"]")[0].innerHTML = "No";
                                }
                            });
                        });
                    });
                }
            }
            return _4d9;
        };

        function _4e2() {
            var _4e3 = "";
            if (_47e.intercept.anon == "auto" && _47e.intercept.anonData.userName != "" && _47e.intercept.anonData.userEmail != "") {
                if (_47e.intercept.survey.type == "asm") {
                    _4e3 = "opdata_name=" + _47e.intercept.anonData.userName + "&opdata_email=" + _47e.intercept.anonData.userEmail;
                }
            }
            return _4e3;
        };

        function _48b() {
            var _4e4 = false;
            var urls = _47e.intercept.referrerURL;
            len = urls.length, i = -1, href = document.referrer;
            while (++i < len && !_4e4) {
                if (_4e5(urls[i], href)) {
                    _4e4 = true;
                }
            }
            return _4e4;
        };

        function _48c() {
            var _4e6 = false;
            var urls = _47e.intercept.excludeURL;
            len = urls.length, i = -1, href = document.referrer;
            while (++i < len && !_4e6) {
                if (_4e5(urls[i], href)) {
                    _4e6 = true;
                }
            }
            return _4e6;
        };

        function _4a8() {
            var _4e7 = false;
            var urls = _47e.intercept.exitURL;
            len = urls.length, i = -1, href = document.location.href;
            while (++i < len && !_4e7) {
                if (_4e5(urls[i], href)) {
                    _4e7 = true;
                }
            }
            return _4e7;
        };

        function _4e8() {
            _485(_47f, null);
            return true;
        };

        function _485(name, val, _4e9) {
            var _4ea = 0,
                _4eb = null;
            if (typeof(_4e9) != "undefined") {
                var now = new Date();
                switch (typeof(_4e9)) {
                    case "string":
                        _4eb = new Date(_4e9);
                        _4ea = Math.floor((_4eb - now) / 60000);
                        break;
                    case "number":
                        _4eb = new Date(new Date().getTime() + (_4e9 * 60000));
                        _4ea = _4e9 * 60;
                        break;
                    case "object":
                        _4eb = _4e9;
                        _4ea = Math.floor((_4eb - now) / 60000);
                        break;
                }
            }
            if (ibmweb.storage.isSupported()) {
                if (typeof(val) == "undefined") {
                    return sessionStorage.getItem(name) || ibmweb.storage.getItem(name);
                } else {
                    if (_4ea !== 0) {
                        sessionStorage.removeItem(name);
                        if (val === null) {
                            return localStorage.removeItem(name);
                        } else {
                            localStorage.setItem(name + "_expire", _4eb.getTime());
                            return localStorage.setItem(name, val);
                        }
                    } else {
                        localStorage.removeItem(name);
                        localStorage.removeItem(name + "_expire");
                        if (val === null) {
                            return sessionStorage.removeItem(name);
                        } else {
                            return sessionStorage.setItem(name, val);
                        }
                    }
                }
            } else {
                if (typeof(val) == "undefined") {
                    return dojo.cookie(name) || null;
                } else {
                    if (_4e9) {
                        return dojo.cookie(name, val, {
                            expires: _4eb,
                            path: "/"
                        });
                    } else {
                        return dojo.cookie(name, val, {
                            path: "/"
                        });
                    }
                }
            }
        };

        function _488(_4ec) {
            if (_4ec === null) {
                return null;
            }
            var ret = "",
                then = new Date(_4ec),
                now = new Date();
            if (!(now.getFullYear() == then.getFullYear() && now.getMonth() == then.getMonth() && now.getDate() == then.getDate())) {
                var y = then.getFullYear();
                var m = then.getMonth() + 1;
                var mm = (m < 10 ? "0" : "") + m;
                var d = then.getDate();
                var dd = (d < 10 ? "0" : "") + d;
                ret += mm + "/" + dd + "/" + y;
                ret += " ";
            }
            var h = then.getHours();
            var m = then.getMinutes();
            var mm = (m < 10 ? "0" : "") + m;
            var a = (h > 12) ? "pm" : "am";
            h = ((h + 11) % 12) + 1;
            ret += h + ":" + mm + a;
            return ret;
        };

        function _4ed(s, n) {
            var m, r = /<([^>\s]*)[^>]*>/g,
                _4ee = [],
                _4ef = 0,
                _4f0 = "";
            while ((m = r.exec(s)) && n) {
                var temp = s.substring(_4ef, m.index).substr(0, n);
                _4f0 += temp;
                n -= temp.length;
                _4ef = r.lastIndex;
                if (n) {
                    _4f0 += m[0];
                    if (m[1].indexOf("/") === 0) {
                        _4ee.pop();
                    } else {
                        if (m[1].lastIndexOf("/") !== m[1].length - 1) {
                            _4ee.push(m[1]);
                        }
                    }
                }
            }
            _4f0 += s.substr(_4ef, n);
            while (_4ee.length) {
                _4f0 += "</" + _4ee.pop() + ">";
            }
            if (_4f0.length > 400) {
                _4f0 = _4f0.substring(0, _4f0.lastIndexOf(" ")) + "...";
            }
            return _4f0;
        };

        function _4e5(_4f1, url) {
            var _4f2 = false;
            var _4f3 = RegExp("^" + _4f1 + "$", "i");
            match = url.match(_4f3);
            if (match && match.index === 0) {
                _4f2 = true;
            }
            return _4f2;
        };

        function _4f4(_4f5, href) {
            var _4f6 = false;
            if (_4f5.type == "URL") {
                if (typeof _4f5.value === "string" && _4e5(_4f5.value, href)) {
                    _4f6 = true;
                    exception_for = _4f5["for"];
                } else {
                    for (var k = 0; k < _4f5.value.length; k++) {
                        if (_4e5(_4f5.value[k], href)) {
                            _4f6 = true;
                            exception_for = _4f5["for"];
                            break;
                        }
                    }
                }
            } else {
                if (_4f5.type == "ID") {
                    if (typeof _4f5.value === "string" && _4e5(_4f5.value, href)) {
                        _4f6 = (_47e.intercept.survey.id == _4f5.value);
                        exception_for = _4f5["for"];
                    } else {
                        for (var k = 0; k < _4f5.value.length; k++) {
                            if (_4e5(_4f5.value[k], href)) {
                                _4f6 = (_47e.intercept.survey.id == _4f5.value[k]);
                                exception_for = _4f5["for"];
                                break;
                            }
                        }
                    }
                }
            }
            return _4f6;
        };

        function _494() {
            var _4f7 = false,
                href = window.location.href;
            for (var i = 0; i < _47e.exception.data.length; i++) {
                var _4f8 = _47e.exception.data[i];
                if (_4f8["for"] == "percentage") {
                    if (typeof _4f8.limit !== "undefined" && _4f8.limit >= _47e.intercept.percent) {
                        _4f7 = _4f4(_4f8, href);
                        if (_4f7) {
                            break;
                        }
                    }
                }
            }
            return _4f7;
        };

        function _4c2() {
            var _4f9 = false,
                href = window.location.href;
            for (var i = 0; i < _47e.exception.data.length; i++) {
                var _4fa = _47e.exception.data[i];
                if (_4fa["for"] == "duration") {
                    _4f9 = _4f4(_4fa, href);
                    if (_4f9) {
                        break;
                    }
                }
            }
            return _4f9;
        };

        function _491() {
            var _4fb = false,
                href = _47e.intercept.survey.url;
            for (var i = 0; i < _47e.exception.data.length; i++) {
                var _4fc = _47e.exception.data[i];
                if (_4fc["for"] == "customB") {
                    _4fb = _4f4(_4fc, href);
                    if (_4fb) {
                        break;
                    }
                }
            }
            return _4fb;
        };

        function _4fd(urls) {
            var _4fe = false,
                len = urls.length,
                i = -1,
                href = window.location.href,
                _4ff = "percentage";
            _47e.exception = {};
            _47e.exception.data = urls;
            _47e.whitelist_status = true;
        };
        return {
            callback_whitelist: _4fd,
            initIntercept: _495,
            setUserData: _4ca,
            clear: _4e8
        };
    })();
    dojo.ready(function() {
        new ibmweb.dynnav.ccfintercept.initIntercept();
    });
}
if (!dojo._hasResource["ibmweb.dynnav.opinionlab"]) {
    dojo._hasResource["ibmweb.dynnav.opinionlab"] = true;
    dojo.provide("ibmweb.dynnav.opinionlab");
    dojo.declare("ibmweb.dynnav.opinionlab", [ibmweb.dynnav._module], {
        init: function() {
            return ibmweb.config.opinionlab.footer.enabled || ibmweb.config.opinionlab.floating.enabled;
        },
        onLoad: function() {
            var _500 = _500;
            if (typeof ibmweb.config.opinionlab.floating.verticalFloating === "undefined") {
                ibmweb.config.opinionlab.floating.verticalFloating = true;
            }
            var url = ibmweb.moduleDomain.get() + "common/";
            if (dojo.query("link[href$=\"/common/v17/css/external/opinionlab.css\"]").length === 0) {
                dojo.create("link", {
                    type: "text/css",
                    rel: "stylesheet",
                    title: ibmweb.info.w3 ? "w3" : "www",
                    href: url + "v17/css/external/opinionlab.css"
                }, dojo.query("head")[0]);
            }
            if (typeof(OOo) != "object" || OOo === null) {
                dojo.create("script", {
                    src: url + "js/dojo/1.6/ibmweb/external/opinionlab.js",
                    type: "text/javascript"
                }, dojo.query("head")[0]);
            }
            var _500 = this;
            ibmweb.opinionlab = ibmweb.opinionlab || {};
            ibmweb.opinionlab.defaults = {
                customVariables: {},
                emailInfoLoaded: false
            };
            ibmweb.opinionlab.setUserData = function(data) {
                var name = (data.User.NickName.length === 0) ? data.User.CommonName : data.User.NickName;
                ibmweb.opinionlab.defaults.customVariables.userName = name;
                var _501 = data.User.Email;
                ibmweb.opinionlab.defaults.customVariables.userEmail = _501;
                var _502 = dojo.cookie("w3ibmProfile"),
                    hkey = _502.split("|")[0];
                ibmweb.storage.setItem("w3UserName_" + hkey, name);
                ibmweb.storage.setItem("w3UserEmail_" + hkey, _501);
                ibmweb.opinionlab.defaults.emailInfoLoaded = true;
            };
            var _503 = dojo.cookie("w3ibmProfile");
            if (_503 && ibmweb.config.get("opinionlab").getUserInfo === true) {
                var hkey = _503.split("|")[0],
                    name = ibmweb.storage.getItem("w3UserName_" + hkey),
                    _504 = ibmweb.storage.getItem("w3UserEmail_" + hkey);
                if (name && _504) {
                    ibmweb.opinionlab.defaults.customVariables.userName = name;
                    ibmweb.opinionlab.defaults.customVariables.userEmail = _504;
                    ibmweb.opinionlab.defaults.emailInfoLoaded = true;
                } else {
                    var _505 = "//w3.ibm.com/w3restsvc/user/1.0.0/$appid/json/hkey/$hkey/callback/$callback",
                        _506 = "6127839ee7627460c4189e36fc6b1b01",
                        _507 = _505.replace("$appid", _506).replace("$hkey", hkey).replace("$callback", "ibmweb.opinionlab.setUserData");
                    dojo.io.script.get({
                        url: _507
                    });
                }
                setTimeout(function() {
                    ibmweb.opinionlab.defaults.emailInfoLoaded = true;
                }, 4000);
            } else {
                ibmweb.opinionlab.defaults.emailInfoLoaded = true;
            }
            var _508 = this.getLanguage();
            ibmweb.queue.push(function() {
                return typeof(OOo) == "object" && OOo !== null;
            }, function() {
                if (_508 == "") {
                    replaceURLPattern = window.location.href;
                } else {
                    replaceURLPattern = window.location.href + "?lang=" + _508;
                }
                if (ibmweb.config.opinionlab.footer.enabled) {
                    var _509 = dojo.query("#ibm-footer ul");
                    if (_509.length == 1) {
                        dojo.subscribe("/ibmweb/dynnav/footer/finished", function() {
                            _500.createFooterLink();
                        });
                        _500.createFooterLink();
                        _500.oo_feedback = new OOo.Ocode({
                            onPageCard: {
                                closeWithOverlay: {}
                            },
                            referrerRewrite: {
                                replacePattern: replaceURLPattern
                            }
                        });
                    }
                }
                if (ibmweb.config.opinionlab.floating.enabled) {
                    var obj = {
                        floating: {},
                        referrerRewrite: {
                            replacePattern: replaceURLPattern
                        }
                    };
                    if (ibmweb.config.opinionlab.floating.type == "overlay") {
                        obj.onPageCard = {
                            closeWithOverlay: {}
                        };
                    }
                    if (ibmweb.config.opinionlab.floating.hide) {
                        ibmweb.config.opinionlab.floating.hide = ibmweb.config.opinionlab.floating.hide * 1000;
                        obj.disappearOnClick = true;
                    }
                    ibmweb.queue.push(function() {
                        return ibmweb.opinionlab.defaults.emailInfoLoaded && ((typeof ibmweb.config.get("opinionlab").customVariablesLoaded !== "undefined") ? ibmweb.config.get("opinionlab").customVariablesLoaded : false);
                    }, function() {
                        obj.customVariables = dojo.mixin({}, ibmweb.opinionlab.defaults.customVariables, ibmweb.config.get("opinionlab").customVariables);
                        _500.oo_floating = new OOo.Ocode(obj);
                        if (ibmweb.config.opinionlab.floating.verticalFloating) {
                            _500.verticalFeedback();
                        }
                    });
                    if (ibmweb.config.get("opinionlab").getUserInfo) {
                        setTimeout(function() {
                            ibmweb.config.get("opinionlab").customVariablesLoaded = true;
                        }, 4000);
                    } else {
                        ibmweb.config.get("opinionlab").customVariablesLoaded = true;
                    }
                    dojo.query("body").connect("onclick", function(e) {
                        if (dojo.hasClass(e.target, "oo_feedback_float")) {
                            _500.disableGrayAreaAction();
                        }
                    });
                    var olUp = dojo.query("div.olUp");
                    var _50a = dojo.query("div.oo_feedback_float");
                    if (ibmweb.config.opinionlab.floating.verticalFloating) {
                        if (olUp.length == 1 && _50a.length == 1) {
                            _500.verticalFeedback();
                        }
                    } else {
                        if (olUp.length == 1 && _50a.length == 1) {
                            var _50b = null;
                            var _50c = null;
                            var _50d = function(_50e) {
                                if (_50b) {
                                    _50b.stop();
                                }
                                dojo.style(olUp[0], {
                                    display: "block",
                                    opacity: 1
                                });
                                _50b = dojo.animateProperty({
                                    node: olUp[0],
                                    duration: _50e ? _50e : 3000,
                                    properties: {
                                        opacity: {
                                            start: 1,
                                            end: 0
                                        }
                                    },
                                    onEnd: function() {
                                        olUp[0].style.display = "none";
                                    }
                                }).play();
                            };
                            var _50f = function(_510) {
                                if (_50b) {
                                    _50b.stop();
                                }
                                dojo.style(olUp[0], {
                                    display: "block",
                                    opacity: 0
                                });
                                _50b = dojo.animateProperty({
                                    node: olUp[0],
                                    duration: _510 ? _510 : 3000,
                                    properties: {
                                        opacity: {
                                            start: 0,
                                            end: 1
                                        }
                                    }
                                }).play();
                            };
                            dojo.connect(_50a[0], "onmouseover", function(e) {
                                if ((e.target && dojo.hasClass(e.target, "olUp")) || (e.originalTarget && dojo.hasClass(e.originalTarget, "olUp"))) {
                                    return false;
                                }
                                window.clearTimeout(_50c);
                                _50f(600);
                            });
                            dojo.connect(_50a[0], "onmouseout", function(e) {
                                if ((e.target && dojo.hasClass(e.target, "olUp")) || (e.originalTarget && dojo.hasClass(e.originalTarget, "olUp"))) {
                                    return false;
                                }
                                _50d(600);
                            });
                            dojo.style(olUp[0], {
                                display: "block"
                            });
                            _50c = window.setTimeout(function() {
                                _50d();
                            }, 3000);
                        }
                    }
                }
            });
        },
        createFooterLink: function() {
            var url = ibmweb.moduleDomain.get() + "common/",
                _511 = dojo.query("#ibm-footer ul");
            var li = dojo.create("li", {}, _511[0]);
            var _512 = dojo.create("img", {
                title: "Feedback",
                src: ibmweb.config.imageUrl + "opinionlab/oo_icon.gif"
            }, li);
            var _513 = dojo.create("a", {
                innerHTML: "&nbsp;Feedback",
                href: "#"
            }, li);
            dojo.connect(_513, "onclick", dojo.hitch(this, function(e) {
                dojo.stopEvent(e);
                this.oo_feedback.show();
                this.disableGrayAreaAction();
            }));
        },
        disableGrayAreaAction: function() {
            dojo.query(".oo_cc_wrapper > span").forEach(function(item) {
                if (item.innerHTML === "") {
                    dojo.query(item).replaceWith("<span></span>");
                }
            });
            dojo.query(".oo_cc_wrapper").style({
                top: 0,
                paddingTop: "25px",
                height: "100%"
            });
        },
        getBrowserLanguage: function() {
            var _514;
            var _515 = window.navigator.userLanguage || window.navigator.language;
            var _516 = _515.split("-");
            if (typeof _516[1] !== "undefined") {
                _514 = _516[1].toLowerCase() + "/";
            }
            _514 += _516[0].toLowerCase();
            return _514;
        },
        getLanguage: function() {
            var page = "";
            var _517 = "";
            dojo.query("link").forEach(function(node, _518) {
                if (node.href.indexOf("w3.css") > 0) {
                    page = "w3";
                } else {
                    if (node.href.indexOf("www.css") > 0) {
                        page = "www";
                    }
                }
            });
            if (page == "w3") {
                _517 = this.getBrowserLanguage();
            } else {
                var _519 = ["bg/bg", "cn/zh", "tw/zh", "hr/hr", "cz/cs", "dk/da", "be/nl", "nl/nl", "eg/en", "zw/en", "af/en", "ai/en", "ag/en", "aw/en", "au/en", "bs/en", "bh/en", "bd/en", "bb/en", "be/en", "bm/en", "bw/en", "vg/en", "bn/en", "cm/en", "ca/en", "ky/en", "cw/en", "cy/en", "dm/en", "et/en", "gh/en", "gd/en", "gy/en", "hk/en", "in/en", "id/en", "iq/en", "ie/en", "jm/en", "jo/en", "ke/en", "kw/en", "lb/en", "ly/en", "mw/en", "my/en", "mu/en", "ms/en", "na/en", "np/en", "nz/en", "ng/en", "om/en", "pk/en", "ph/en", "qa/en", "kn/en", "lc/en", "vc/en", "sa/en", "sc/en", "sl/en", "sg/en", "za/en", "lk/en", "sr/en", "tz/en", "th/en", "tt/en", "tc/en", "ug/en", "ae/en", "uk/en", "us/en", "vn/en", "ye/en", "zm/en", "ee/et", "fi/fi", "be/fr", "bf/fr", "cm/fr", "ca/fr", "td/fr", "cg/fr", "cd/fr", "fr/fr", "ga/fr", "ci/fr", "mg/fr", "mu/fr", "ma/fr", "ne/fr", "sn/fr", "sc/fr", "ch/fr", "tn/fr", "at/de", "de/de", "ch/de", "gr/el", "il/he", "hu/hu", "it/it", "jp/ja", "kz/kk", "kr/ko", "lv/lv", "lt/lt", "no/no", "pl/pl", "dz/fr", "br/pt", "mz/pt", "pt/pt", "ro/ro", "ru/ru", "rs/sr", "sk/sk", "si/sl", "ec/es", "ar/es", "bo/es", "cl/es", "co/es", "cr/es", "mx/es", "py/es", "pe/es", "es/es", "uy/es", "ve/es", "se/sv", "tr/tr", "ua/uk", "uz/uz", "vn/vi"];
                var _51a = false,
                    _517 = "";
                for (var i = 0; i < _519.length; i++) {
                    if (window.location.href.indexOf(_519[i]) > 0) {
                        _51a = true;
                        break;
                    }
                }
                if (!_51a) {
                    var _51b;
                    if (typeof dojo.query("meta[name='DC.Language']")[0] !== "undefined") {
                        _51b = dojo.query("meta[name='DC.Language']")[0];
                        var _51c = dojo.attr(_51b, "content").split("-"),
                            _51d = false;
                        if (_51c.length < 2) {
                            if (typeof dojo.query("meta[name='IBM.Country']")[0] !== "undefined") {
                                _51b = dojo.query("meta[name='IBM.Country']")[0];
                                var _51e = dojo.attr(_51b, "content").split(",");
                                if (_51e.length > 0) {
                                    for (var u = 0; u < _51e.length; u++) {
                                        _517 = _51e[u].toLowerCase().trim() + "/" + _51c[0].toLowerCase();
                                        for (var h = 0; h < _519.length; h++) {
                                            if (_519[h] == _517) {
                                                _51d = true;
                                                break;
                                            }
                                        }
                                    }
                                } else {
                                    _517 = _51e[0].toLowerCase() + "/" + _51c[0].toLowerCase();
                                    for (var h = 0; h < _519.length; h++) {
                                        if (_519[h] == _517) {
                                            _51d = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            _517 = _51c[1].toLowerCase() + "/" + _51c[0].toLowerCase();
                            for (var h = 0; h < _519.length; h++) {
                                if (_519[h] == _517) {
                                    _51d = true;
                                    break;
                                }
                            }
                        }
                        if (!_51d) {
                            _517 = "us/en";
                        }
                    } else {
                        if (dojo.attr(dojo.query("html")[0], "lang") !== null) {
                            var _51c = dojo.attr(dojo.query("html")[0], "lang").split("-");
                            _517 = _51c[1].toLowerCase() + "/" + _51c[0].toLowerCase();
                        } else {
                            if (window.navigator.language || window.navigator.userLanguage) {
                                _517 = this.getBrowserLanguage();
                            } else {
                                _517 = "us/en";
                            }
                        }
                    }
                }
            }
            return _517;
        },
        floatHeight: 100,
        wasRecreate: false,
        sbsCorection: false,
        upSbs: false,
        verticalFeedbackAnim: false,
        olFloatPos: function() {
            var wh = window.innerHeight || document.documentElement.clientHeight,
                y = (wh - this.floatHeight) / 2,
                _51f = dojo.query("div.oo_feedback_float");
            if (this.sbsCorection) {
                var _520 = dojo.position(dojo.byId("ibm-social-tools"), true),
                    _521 = 6,
                    b = _520.y + _520.h + 20;
                if (y <= b) {
                    y = b;
                }
            }
            y = parseInt(y);
            if (isNaN(y)) {
                return;
            }
            if (dojo.isIE < 8) {
                _51f[0].style.cssText = "background-image: none; bottom: auto !important; height: 100px; right: 0px !important; text-indent: 0; top: " + y + "px; width: 27px;";
            } else {
                dojo.style(_51f[0], {
                    "top": y + "px",
                    "bottom": "auto",
                    "backgroundImage": "none",
                    "height": "100px",
                    "width": "27px",
                    "textIndent": "0"
                });
            }
        },
        verticalFeedback: function() {
            if (dojo.query("div.oo_feedback_float").length > 1) {
                dojo.query("div.oo_feedback_float").forEach(function(elm, i) {
                    if (i == 0) {
                        return;
                    }
                    dojo.destroy(elm);
                });
            }
            if (this.wasRecreate) {
                return;
            }
            this.wasRecreate = true;
            window.ol_vertical_feedback = true;
            var _522 = this,
                _523 = null,
                _524 = true,
                _525 = dojo.query("div.oo_feedback_float"),
                olUp = dojo.query("div.olUp"),
                _526 = function(_527) {
                    if (_523) {
                        return;
                    }
                    dojo.style(_528, {
                        height: "100px"
                    });
                    var nP = dojo.position(_525[0], true);
                    _523 = dojo.animateProperty({
                        node: _525[0],
                        duration: _527 ? _527 : 3000,
                        properties: {
                            height: {
                                start: _522.floatHeight,
                                end: 100
                            },
                            top: {
                                start: nP.y,
                                end: (_522.upSbs) ? nP.y - 73 : nP.y
                            }
                        },
                        onEnd: function() {
                            dojo.style(_529, {
                                display: "block"
                            });
                            _523 = null;
                            if (_524) {
                                _52a(400);
                            }
                        }
                    }).play();
                },
                _52a = function(_52b) {
                    if (_523) {
                        return;
                    }
                    dojo.style(_529, {
                        display: "none"
                    });
                    var nP = dojo.position(_525[0], true);
                    _523 = dojo.animateProperty({
                        node: _525[0],
                        duration: _52b ? _52b : 3000,
                        properties: {
                            height: {
                                start: 100,
                                end: _522.floatHeight
                            },
                            top: {
                                start: nP.y,
                                end: (_522.upSbs) ? nP.y + 73 : nP.y
                            }
                        },
                        onEnd: function() {
                            dojo.style(_528, {
                                height: _522.floatHeight + "px"
                            });
                            _523 = null;
                        }
                    }).play();
                };
            dojo.style(olUp[0], {
                display: "none"
            });
            dojo.style(_525[0], {
                "width": "27px",
                "backgroundImage": "none",
                "textIndent": 0
            });
            if (dojo.isIE < 8) {
                _525[0].style.cssText = "right:0px !important";
            }
            var _529 = dojo.create("div", {
                "class": "wrappedText",
                style: {
                    position: "absolute",
                    display: "none",
                    zIndex: 50000,
                    width: "80px",
                    height: "auto",
                    padding: "0px 0px 0px 0px",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textIndent: 0
                },
                innerHTML: "Feedback"
            }, _525[0]);
            if (typeof dojo.isIE === "undefined" || dojo.isIE >= 9) {
                dojo.style(_529, {
                    lineHeight: "27px",
                    webkitTransform: "rotate(270deg)",
                    MozTransform: "rotate(270deg)",
                    msTransform: "rotate(270deg)",
                    OTransform: "rotate(270deg)",
                    transform: "rotate(270deg)"
                });
            }
            if (dojo.isIE < 9) {
                _529.innerHTML = "";
                dojo.style(_529, {
                    backgroundImage: "url(\"" + ibmweb.config.imageUrl + "opinionlab/ol_feedback_rot_text.gif\")",
                    left: "0px",
                    height: "80px",
                    width: "27px"
                });
            } else {
                dojo.style(_529, {
                    top: "27px",
                    left: "-27px"
                });
            }
            var _52c = dojo.create("div", {
                "class": "wrappedIcon",
                style: {
                    position: "absolute",
                    zIndex: 50000,
                    width: "27px",
                    height: "27px",
                    bottom: 0,
                    backgroundImage: "url(\"" + ibmweb.config.imageUrl + "opinionlab/ol_tab_icon_white.gif\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                }
            }, _525[0]);
            if (typeof dojo.isIE === "undefined" || dojo.isIE >= 9) {
                dojo.style(_52c, {
                    webkitTransform: "rotate(270deg)",
                    MozTransform: "rotate(270deg)",
                    msTransform: "rotate(270deg)",
                    OTransform: "rotate(270deg)",
                    transform: "rotate(270deg)",
                    transformOrigin: "50% 50%",
                    webkitTransformOrigin: "50% 50%",
                    MozTransformOrigin: "50% 50%"
                });
            }
            if (dojo.isIE < 9) {
                dojo.style(_52c, {
                    left: "0px"
                });
            }
            if (dojo.isIE < 8) {
                var _52d = dojo.create("a", {
                    "class": "ie678maskAnchor",
                    style: {
                        position: "absolute",
                        zIndex: 50001,
                        top: "-1px",
                        left: "-1px"
                    }
                }, _525[0]);
                var _528 = dojo.create("div", {
                    "class": "wrappedMask",
                    style: {
                        width: "27px",
                        height: "27px",
                        backgroundColor: "black"
                    }
                }, _52d);
            } else {
                var _528 = dojo.create("div", {
                    "class": "wrappedMask",
                    style: {
                        position: "absolute",
                        zIndex: 50001,
                        width: "27px",
                        height: "27px",
                        top: "-1px",
                        left: "-1px",
                        backgroundColor: "black",
                        opacity: 0.01
                    }
                }, _525[0]);
            }
            if (dojo.isIE < 9) {
                dojo.style(_528, {
                    filter: "alpha(opacity=1)"
                });
            }
            dojo.connect(window, "onresize", function(e) {
                _522.olFloatPos();
            });
            if (_522.verticalFeedbackAnim) {
                dojo.connect(_528, "onmouseover", function(e) {
                    if (!_524) {
                        return false;
                    }
                    dojo.stopEvent(e);
                    _524 = false;
                    _526(400);
                });
                dojo.connect(_528, "onmouseout", function(e) {
                    dojo.stopEvent(e);
                    _524 = true;
                    _52a(400);
                });
            } else {
                dojo.style(_528, {
                    height: "100px"
                });
                dojo.style(_529, {
                    display: "block"
                });
                this.floatHeight = dojo.marginBox(_525[0]).h;
                this.floatHeight += 73;
            }
            this.olFloatPos();
            dojo.subscribe("/ibmweb/dynnav/sbs/finished", function() {
                _522.sbsCorection = true;
                _522.olFloatPos();
            });
            if (!_522.sbsCorection && ibmweb.config.sbs.enabled && dojo.query("#ibm-social-tools").length == 1) {
                this.sbsCorection = true;
                _522.olFloatPos();
            }
            if (typeof _52d !== "undefined") {
                dojo.connect(_52d, "onclick", dojo.hitch(this, function(e) {
                    dojo.stopEvent(e);
                    if (ibmweb.config.opinionlab.customSurvey && ibmweb.config.opinionlab.customSurvey.surveys && ibmweb.config.opinionlab.customSurvey.surveys[0].type && ibmweb.config.opinionlab.customSurvey.surveys[0].type.url && ibmweb.config.opinionlab.customSurvey.surveys[0].type.content === "IBM") {
                        if (!_522.messageInitStatus) {
                            window.attachEvent("message", function(e) {
                                _522.receiveMessage(e, _522);
                            }, false);
                            _522.messageInitStatus = true;
                        }
                        _522.openOwnUrl(ibmweb.config.opinionlab.customSurvey.surveys[0].type.url);
                    } else {
                        _522.oo_floating.options.disappearOnClick = false;
                        _522.oo_floating.show();
                        _522.disableGrayAreaAction();
                    }
                }));
            } else {
                dojo.connect(_528, "onclick", dojo.hitch(this, function(e) {
                    dojo.stopEvent(e);
                    if (ibmweb.config.opinionlab.customSurvey && ibmweb.config.opinionlab.customSurvey.surveys && ibmweb.config.opinionlab.customSurvey.surveys[0].type && ibmweb.config.opinionlab.customSurvey.surveys[0].type.url && ibmweb.config.opinionlab.customSurvey.surveys[0].type.content === "IBM") {
                        if (!_522.messageInitStatus) {
                            if (dojo.isIE == 8) {
                                window.attachEvent("message", function(e) {
                                    _522.receiveMessage(e, _522);
                                }, false);
                            } else {
                                window.addEventListener("message", function(e) {
                                    _522.receiveMessage(e, _522);
                                }, false);
                            }
                            _522.messageInitStatus = true;
                        }
                        _522.openOwnUrl(ibmweb.config.opinionlab.customSurvey.surveys[0].type.url);
                    } else {
                        _522.oo_floating.options.disappearOnClick = false;
                        _522.oo_floating.show();
                        _522.disableGrayAreaAction();
                    }
                }));
            }
        },
        openOwnUrl: function(url) {
            var _52e = (ibmweb.config.opinionlab.customSurvey.surveys[0].type.content && ibmweb.config.opinionlab.customSurvey.surveys[0].type.content.length > 0) ? ibmweb.config.opinionlab.customSurvey.surveys[0].type.content : "";
            var ID = (ibmweb.config.opinionlab.customSurvey.surveys[0].type.ID && ibmweb.config.opinionlab.customSurvey.surveys[0].type.ID.length > 0) ? ibmweb.config.opinionlab.customSurvey.surveys[0].type.ID : "";
            var _52f = this;
            var _530 = dojo.create("div", {
                    "class": "ibm-common-overlay",
                    id: "ol_overlay_box",
                    "role": "alert",
                    "aria-describedby": "comment_card_description",
                    style: {
                        position: "relative"
                    }
                }, dojo.body()),
                _531 = dojo.create("div", {
                    "id": "ol_overlay_loading",
                    style: {
                        display: "block",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: "0px",
                        backgroundImage: "url(" + ibmweb.moduleDomain.get() + "i/v17/opinionlab/oo_loading.gif)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundColor: "#000000",
                        opacity: ".6",
                        filter: "alpha(opacity=50)"
                    }
                }, _530),
                _532 = encodeURIComponent(window.location.href),
                _533 = function() {
                    setTimeout(function() {
                        var _534 = dijit.byId("dialog_ol_overlay_box");
                        if (typeof _534 !== "undefined") {
                            _534._position();
                        }
                        dojo.style(_531, {
                            display: "none"
                        });
                    }, 50);
                    _52f.hideFeedbackDetect();
                    try {
                        this.contentWindow.postMessage("message", window.location.protocol + "//" + ibmweb.config.opinionlab.customSurvey.surveys[0].type.url.split("/")[2]);
                    } catch (e) {}
                },
                _535 = function() {
                    var _536 = window.location.search.substr(1),
                        data = _536.split("&"),
                        _537 = {};
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i].split("=");
                        _537[item[0]] = item[1];
                    }
                    return _537;
                },
                _538 = _535(),
                urlQ = "";
            for (var d in _538) {
                if (_538.hasOwnProperty(d) && typeof _538[d] !== "undefined") {
                    urlQ += "&" + d + "=" + encodeURIComponent(_538[d]);
                }
            }
            if (dojo.isIE < 9) {
                dojo.style(_531, {
                    filter: "alpha(opacity=50)"
                });
            }
            if (ibmweb.config.opinionlab.customSurvey && ibmweb.config.opinionlab.customSurvey.surveys && ibmweb.config.opinionlab.customSurvey.surveys[0].fake && ibmweb.config.opinionlab.customSurvey.surveys[0].fakeURL) {
                _532 = encodeURIComponent(ibmweb.config.opinionlab.customSurvey.surveys[0].fakeURL);
            }
            this.iframe = dojo.create("iframe", {
                src: url + ((url.search(/\?/) > -1) ? "&" : "?") + "cc=" + ibmweb.meta.cc + "&lc=" + ibmweb.meta.lc + "&content=" + _52e + "&ID=" + ID + urlQ + "&pageURL=" + encodeURIComponent(window.location.href) + "&url=" + _532,
                id: "OnlineOpinionIframeOwnUrl",
                name: "OnlineOpinion1",
                title: "Comment Card",
                style: {
                    height: "460px"
                }
            }, _530);
            if (ibmweb.config.opinionlab.customSurvey.surveys[0].type.height && ibmweb.config.opinionlab.customSurvey.surveys[0].type.height.length > 0) {
                dojo.style(this.iframe, "height", ibmweb.config.opinionlab.customSurvey.surveys[0].type.height + "px");
            }
            if (ibmweb.config.opinionlab.customSurvey.surveys[0].type.width && ibmweb.config.opinionlab.customSurvey.surveys[0].type.width.length > 0) {
                dojo.style(_530, "width", ibmweb.config.opinionlab.customSurvey.surveys[0].type.width + "px");
                dojo.style(this.iframe, "width", ibmweb.config.opinionlab.customSurvey.surveys[0].type.width + "px");
            }
            if (this.iframe.attachEvent) {
                this.iframe.attachEvent("onload", _533);
            } else {
                this.iframe.onload = _533;
            }
            ibmweb.overlay.show("ol_overlay_box", this);
            if (typeof dijit.byId("dialog_ol_overlay_box") !== "undefined") {
                dojo.connect(dijit.byId("dialog_ol_overlay_box"), "onHide", function() {
                    _52f.iframe = null;
                    if (dojo.query(".dijitDialogUnderlayWrapper").length == 1) {
                        dojo.query(".dijitDialogUnderlayWrapper")[0].style.zIndex = "949";
                    }
                    if (dojo.query(dijit.byId("dialog_ol_overlay_box").domNode).length == 1) {
                        dijit.byId("dialog_ol_overlay_box").domNode.style.zIndex = "950";
                    }
                });
                if (dojo.query(".dijitDialogUnderlayWrapper").length == 1) {
                    dojo.query(".dijitDialogUnderlayWrapper")[0].style.zIndex = "999998";
                }
                if (dojo.query(dijit.byId("dialog_ol_overlay_box").domNode).length == 1) {
                    dijit.byId("dialog_ol_overlay_box").domNode.style.zIndex = "999999";
                }
            }
        },
        messageInitStatus: false,
        messageOLFS: false,
        receiveMessage: function(_539, _53a) {
            if (_539.data == "olfs_true") {
                _53a.messageOLFS = true;
            }
        },
        hideFeedbackDetect: function() {
            var t = 3600000,
                _53b = this;
            if (ibmweb.config.opinionlab.floating.hide) {
                t = parseFloat(ibmweb.config.opinionlab.floating.hide);
            }
            ibmweb.opinionlab.fbPolice = setInterval(function() {
                if (_53b.iframe === null) {
                    _53b.hideFeedback(t);
                }
            }, 50);
        },
        hideFeedback: function(t) {
            var _53c = this;
            clearInterval(ibmweb.opinionlab.fbPolice);
            setTimeout(function() {
                if (typeof dijit.byId("dialog_ol_overlay_box") !== "undefined") {
                    dijit.byId("dialog_ol_overlay_box").destroy();
                }
            }, 50);
            if (this.messageOLFS) {
                if (_53c.oo_cc_wraper) {
                    dojo.destroy(_53c.oo_cc_wraper);
                }
                dojo.style(_53c.oo_floating.floatingLogo, "display", "none");
                setTimeout(function() {
                    dojo.style(_53c.oo_floating.floatingLogo, "display", "block");
                }, t);
                this.messageOLFS = false;
            }
        }
    });
    ibmweb.opinionlab = ibmweb.opinionlab || {};
    (function() {
        ibmweb.opinionlab.CommentCard = _53d;

        function _53d(_53e) {
            _53e = _53e || {};
            var _53f = true;
            var me = this,
                _540 = {},
                _541 = {},
                _542 = {};
            this.init = init;

            function init(_543) {
                _540 = {
                    "ccid": "",
                    "time1": new Date().getTime(),
                    "time2": "",
                    "prev": "",
                    "referer": window.location.href,
                    "url": window.location.href,
                    "width": screen.width,
                    "height": screen.height,
                    "comment_card": "1",
                    "thank_you": "1",
                    "ip_address_optout": "",
                    "custom_var": "null|undefined/undefined/undefined|iframe ",
                    "preview_id": "",
                    "currentURL": window.location.href,
                    "ocodeVersion": "5.6.5",
                    "ocodePatch": "",
                    "customVars": _544(_542)
                };
                data(_543);
            };
            this.data = data;

            function data(_545) {
                if (typeof(_545) != "undefined") {
                    dojo.mixin(_540, _545);
                    return me;
                } else {
                    return _540;
                }
            };
            this.prepQuestion = _546;

            function _546(_547, id) {
                _547 = parseInt(_547, 10);
                _541[id] = _547;
                var _548 = {};
                _548["question" + _547] = id;
                data(_548);
            };
            this.prepQuestions = _549;

            function _549(ids) {
                var _54a = null;
                dojo.forEach(ids, function(id) {
                    _54a = _54b(_541) + 1;
                    _546(_54a, id);
                });

                function _54b(obj) {
                    var _54c = 0;
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            _54c++;
                        }
                    }
                    return _54c;
                };
            };
            this.setAnswer = _54d;

            function _54d(id, _54e) {
                var _54f = {};
                _54f["answer_" + id] = _54e;
                data(_54f);
            };
            this.setOverallRating = _550;

            function _550(val) {
                data({
                    "overall": val
                });
            };
            this.setComment = _551;

            function _551(val) {
                data({
                    "comments": val
                });
            };
            this.setCustomVars = _552;

            function _552(_553) {
                dojo.mixin(_542, _553);
                var cvs = _544(_542);
                data({
                    customVars: cvs
                });
                return me;
            };
            this.ol_stringify = _544;

            function _544(obj) {
                var cvs = "";
                cvs += "";
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        cvs += ",";
                        cvs += key;
                        cvs += ":";
                        switch (typeof(obj[key])) {
                            case "string":
                                cvs += "'" + obj[key] + "'";
                                break;
                            case "number":
                                cvs += obj[key];
                                break;
                            case "function":
                                cvs += "'function'";
                                break;
                            case "object":
                                if (obj[key] === null) {
                                    cvs += "null";
                                } else {
                                    if (dojo.isArray(obj[key])) {
                                        cvs += "'[Array of " + obj[key].length + " items]'";
                                    } else {
                                        if (typeof(obj[key].toString) != "undefined") {
                                            cvs += "'" + obj[key].toString() + "'";
                                        } else {
                                            cvs += "'Unknown Object'";
                                        }
                                    }
                                }
                                break;
                        }
                    }
                }
                cvs = "{" + cvs.substring(1);
                cvs += "}";
                return cvs;
            };
            this.getCustomVars = _554;

            function _554() {
                return _542;
            };
            this.setCustomVar = _555;

            function _555(key, val) {
                var obj = {};
                obj[key] = val;
                return _552(obj);
            };
            this.clearCustomVars = _556;

            function _556() {
                _542 = {};
                data({
                    customVars: _544(_542)
                });
                return me;
            };
            this.deleteCustomVar = _557;

            function _557(key) {
                var val = _542[key];
                delete _542[key];
                data({
                    customVars: _544(_542)
                });
                return val;
            };
            this.send = send;

            function send() {
                data({
                    time2: new Date().getTime()
                });
                var url = "https://secure.opinionlab.com/rate40.asp";
                dojo.io.iframe.send({
                    url: url,
                    method: "POST",
                    content: _540
                });
                return me;
            };
            if (_53f) {
                init(_53e);
            }
        };
    })();
    ibmweb.opinionlab = ibmweb.opinionlab || {};
    ibmweb.opinionlab.customSurvey = function(_558) {
        var _559 = {
                config: dojo.mixin({}, {
                    aboutFeedbackText: "About feedback at IBM",
                    aboutFeedbackOverlayId: "oplabsurvey-about-feedback-overlay",
                    aboutFeedbackOverlayTitle: "Ongoing Web Feedback at IBM",
                    aboutFeedbackOverlayContent: "<p>IBM collects opt-in feedback from IBM web users on a broad and continual basis throughout it's web sites. All feedback submitted are reviewed only by IBM employees or IBM affiliates and no feedback is shared outside of IBM for any reason. See IBM's <a target=\"_blank\" href=\"http://www.ibm.com/privacy/us/en/\">privacy policy</a> and <a target=\"_blank\" href=\"http://www.ibm.com/legal/us/en/\">terms of use</a> for further detail.</p><p> IBM may use a third party to collect or process feedback. Any such party is also bound by the IBM policy. Currently we use opinionlab for feedback processing.</p><p class=\"ibm-ind-link\"><a class=\"ibm-external-link\" href=\"http://www.opinionlab.com\" target=\"_blank\">OpinionLab</a></p><p>Your input is very valuable to us and although we read every comment that is sent to IBM in an effort to continuouslyimprove our web sites for you, we generally do not reply to comments from this system unless otherwise stated. Thank you for participating in the IBM web feedback program. </p>",
                    ccid: 0,
                    comments: {
                        enabled: true,
                        placeholder: "Help us improve your IBM online experience by providing your comments here."
                    },
                    container: false,
                    customQuestions: [],
                    customQuestionsIds: [],
                    customVariables: {},
                    description: "",
                    feedbackText: "Feedback",
                    feedbackAnonymousText: "Your feedback is anonymous.",
                    heading: "Rate this page",
                    rating: {
                        enabled: true,
                        type: "stars"
                    },
                    ratingLabels: {
                        label5: "Yes",
                        label1: "No"
                    },
                    submitInterval: 60,
                    submitText: "Submit",
                    thankyouMsg: "Thank you for your feedback",
                    trayDisplayTime: 3,
                    trayShowOnLoad: 0,
                    type: {
                        display: "inline",
                        form: "inline"
                    },
                    serviceLink: {
                        enabled: false,
                        linkUrl: "",
                        fullText: "",
                        textPartOfLink: ""
                    },
                    fake: false,
                    fakeURL: ""
                }, _558),
                elements: {},
                $form: {}
            },
            _55a = {
                "ccid": _559.config.ccid,
                "comment_card": "1t",
                "currentURL": window.location.href,
                "customVariables": {},
                "custom_var": "null|undefined/undefined/undefined|iframe ",
                "height": screen.height,
                "ip_address_optout": "",
                "ocodePatch": "",
                "ocodeVersion": "5.6.5",
                "prev": document.referrer,
                "preview_id": "",
                "referer": window.location.href,
                "thank_you": "1",
                "time1": new Date().getTime(),
                "time2": "",
                "url": "",
                "width": screen.width
            },
            _55b = {
                surveyKey: "s-" + _559.config.ccid + window.location.href,
                setFlag: function() {
                    ibmweb.storage.setItem(_55b.surveyKey, new Date().getTime());
                }
            },
            _55c, _55d = (parseInt(ibmweb.storage.getItem("opltrn")) > 0 ? parseInt(ibmweb.storage.getItem("opltrn")) : 0);
        _559.config.formId = "oplabsurvey-" + _559.config.ccid + "-form";
        _559.config.overlayLinkTrigger = "<div class=\"oplabsurvey-overlay-trigger\"><span class=\"ibm-access\">Screen reader users: Please switch to forms mode for this link.</span><a class=\"oplabsurvey-tray-tab\" href=\"#\">" + _559.config.feedbackText + "</a></div>";
        _559.config.submitIntervalMs = _559.config.submitInterval * 60 * 1000;
        _559.config.surveyOverlayId = "oplabsurvey-" + _559.config.ccid + "-overlay";
        _559.config.trayDisplayTimeMs = _559.config.trayDisplayTime * 1000;
        _559.config.trayShowOnLoadMs = _559.config.trayShowOnLoad * 1000;
        var url = ibmweb.moduleDomain.get() + "common/";
        if (dojo.query("link[href$=\"/common/v17/css/external/oplabcustomsurvey.css\"]").length === 0) {
            dojo.create("link", {
                type: "text/css",
                rel: "stylesheet",
                href: url + "v17/css/external/oplabcustomsurvey.css"
            }, dojo.query("head")[0]);
        }
        var _55e = new ibmweb.opinionlab.CommentCard({
            ccid: _55a.ccid
        });

        function _55f() {
            var _560 = dojo.cookie("w3ibmProfile");
            if (_560) {
                var hkey = _560.split("|")[0],
                    name = ibmweb.storage.getItem("w3UserName_" + hkey),
                    _561 = ibmweb.storage.getItem("w3UserEmail_" + hkey);
                if (name && _561) {
                    ibmweb.opinionlab.defaults.customVariables.userName = name;
                    ibmweb.opinionlab.defaults.customVariables.userEmail = _561;
                    ibmweb.opinionlab.defaults.emailInfoLoaded = true;
                } else {
                    var _562 = "//w3.ibm.com/w3restsvc/user/1.0.0/$appid/json/hkey/$hkey/callback/$callback",
                        _563 = "6127839ee7627460c4189e36fc6b1b01",
                        _564 = _562.replace("$appid", _563).replace("$hkey", hkey).replace("$callback", "ibmweb.opinionlab.setUserData");
                    dojo.io.script.get({
                        url: _564
                    });
                }
            }
        };

        function _565() {
            var _566 = dojo.window.getBox().h,
                _567 = dojo.query("#oplabsurvey-tray"),
                _568 = dojo.position(_567[0]).h,
                _569 = dojo.query(".oplabsurvey-tray-tab", _567[0]),
                dump = _567.style("minHeight", dojo.position(_569[0]).h + "px"),
                _56a = dojo.position(_569[0]),
                _56b = (_56a.h > _56a.w) ? _56a.h : _56a.w,
                $sbs = dojo.query("#ibm-social-tools"),
                _56c = 20,
                _56d, _56e, _56f;
            _56e = Math.round((_566 - _56b) / 2);
            if ($sbs[0]) {
                _56f = dojo.position($sbs[0]).y + dojo.position($sbs[0]).h + _56c;
                if (_56e < _56f) {
                    _56e = _56f;
                }
            }
            _56d = _56e - (_568 - _56b);
            if (_56d < 10) {
                _56d = 10;
            }
            _567.style("top", Math.round(_56d) + "px");
        };

        function _570() {
            dojo.query(".oplabsurvey-charcount").forEach(function(_571) {
                var _572 = dojo.query("#" + dojo.query(_571).attr("data-field")[0]),
                    _573 = 0,
                    _574 = dojo.query("span", _571);
                if (_572.attr("data-maxlength")[0] == null || _572.attr("data-maxlength")[0] == 0) {
                    return;
                }
                _573 = _572.attr("data-maxlength")[0];
                _572.onkeyup(function() {
                    _574.html(_573 - this.value.length);
                    if (_573 - this.value.length < 1) {
                        _574.addClass("ibm-error");
                    } else {
                        _574.removeClass("ibm-error");
                    }
                }).onkeypress(function() {
                    _574.html(_573 - this.value.length);
                    if (_573 - this.value.length < 1) {
                        _574.addClass("ibm-error");
                    } else {
                        _574.removeClass("ibm-error");
                    }
                });
            });
        };

        function _575() {
            dojo.query(_559.$form).onsubmit(function(evt) {
                if (dojo.query("input[name='keepanony']:checked", _559.$form[0]).length > 0 && dojo.query("input[name='keepanony']:checked", _559.$form[0])[0].value == "yes") {
                    var _576 = false;
                } else {
                    var _576 = true;
                }
                if (dojo.query("input[name='overall']:checked", _559.$form[0]).length == 0) {
                    dojo.stopEvent(evt);
                    alert("Please select a rating.");
                    return;
                }
                if (ibmweb.config.get("opinionlab").getUserInfo === true && ibmweb.config.get("opinionlab").promptUserInfo === true && ibmweb.config.get("opinionlab").requirePrompt === true && (typeof ibmweb.opinionlab.defaults != "undefined" && typeof ibmweb.opinionlab.defaults.customVariables != "undefined" && ibmweb.opinionlab.defaults.customVariables.userEmail != "") && dojo.query("input[name='keepanony']:checked", _559.$form[0]).length === 0) {
                    dojo.stopEvent(evt);
                    alert("Please select a anonymity data.");
                    return;
                }
                dojo.stopEvent(evt);
                _55e.setOverallRating(dojo.query("input[name='overall']:checked", _559.$form[0]).val());
                _55e.setComment(dojo.query("textarea[name='comments']", _559.$form[0]).val());
                if (_559.config.topicSelector) {
                    if (_559.config.topicSelector.required && dojo.query("[name=\"" + _559.config.topicSelector.name + "\"]")[0].value == "") {
                        dojo.stopEvent(evt);
                        alert("Please select a topic");
                        return;
                    }
                    var _577 = dojo.query("[name=\"" + _559.config.topicSelector.name + "\"]")[0].value;
                    _55e.setAnswer(_559.config.topicSelector.name, _577);
                }
                if (typeof _559.config.url != "undefined" && _559.config.url != "") {
                    _55e.data({
                        url: _559.config.url
                    });
                }
                _5b0();
                if (ibmweb.opinionlab.defaults && ibmweb.opinionlab.defaults.customVariables) {
                    dojo.mixin(_55a.customVariables, ibmweb.opinionlab.defaults.customVariables);
                }
                if (ibmweb.opinionlab.customVariables) {
                    dojo.mixin(_55a.customVariables, ibmweb.opinionlab.customVariables);
                }
                dojo.mixin(_55a.customVariables, _559.config.customVariables);
                if (_576) {
                    delete _55a.customVariables.userName;
                    delete _55a.customVariables.userEmail;
                }
                if (_559.config.fake) {
                    _55e.data({
                        url: _559.config.fakeURL
                    });
                }
                _55e.clearCustomVars().setCustomVars(_55a.customVariables).send();
                _55b.setFlag();
                dojo.query(_559.$form).addClass("submitted");
                if (_559.config.type.form === "overlay") {
                    _578(true);
                }
                if (_559.config.type.form === "inline") {
                    _579(true);
                }
                if (_559.config.type.form === "tray" || _559.config.type.display === "tray") {
                    _57a(true);
                }
                if (dojo.query("#" + _559.config.surveyOverlayId).length == 1) {
                    ibmweb.overlay.hide(_559.config.surveyOverlayId, this);
                }
                if (dojo.query("#oplabsurvey-tray").length == 1 && !dojo.hasClass("oplabsurvey-tray", "minimized")) {
                    setTimeout(_5c3, 2000);
                }
                setTimeout(function() {
                    _578(false);
                    _579(false);
                    _57a(false);
                    dojo.query(_559.$form).removeClass("submitted");
                }, _559.config.submitIntervalMs);
            });
        };

        function _57b(_57c, _57d) {
            if (_559.config.rating.enabled !== true) {
                return;
            }
            if (_559.config.rating.type == "stars") {
                dojo.query("ul li", _57c).onmouseover(function() {
                    dojo.query(this).addClass("highlighted").prevAll().addClass("highlighted");
                    dojo.query(this).nextAll().removeClass("highlighted");
                }).onclick(function(evt) {
                    dojo.stopEvent(evt);
                    var ipt = dojo.query(this).siblings().children("input");
                    if (ibmweb.info.isIE) {
                        ipt[0].checked = false;
                        ipt.removeAttr("checked");
                    } else {
                        ipt.removeAttr("checked");
                    }
                    var _57e = dojo.query("input", this);
                    if (ibmweb.info.isIE) {
                        _57e[0].checked = true;
                        _57e.attr("checked", "checked");
                    } else {
                        _57e.attr("checked", "checked");
                    }
                    if (_57d == true) {
                        _57f(dojo.query("input", this).val());
                    }
                });
                dojo.query("ul", _57c).onmouseout(function() {
                    _580(dojo.query("ul", _57c)[0]);
                });
            } else {
                if (_559.config.rating.type == "yes-no") {
                    dojo.addClass("oplabsurvey-tray", "yes-no");
                    dojo.query("input", _57c).onclick(function(evt) {
                        if (_57d == true) {
                            _57f(dojo.query(this).val());
                        }
                    });
                }
            }
        };

        function _580(_581) {
            if (dojo.query("input:checked", _581).length == 0) {
                dojo.query("li", _581).removeClass("highlighted");
            } else {
                dojo.query("input:checked", _581).parent().addClass("highlighted").prevAll().addClass("highlighted");
                dojo.query("input:checked", _581).parent().nextAll().removeClass("highlighted");
            }
        };

        function _582() {
            var _583 = true;
            label = " May we contact you regarding your comments ?";
            var _584 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If no, then your feedback will be anonymous";
            if (ibmweb.opinionlab.defaults && ibmweb.opinionlab.defaults.customVariables && ibmweb.opinionlab.defaults.customVariables.userEmail != "") {
                var _585 = "<div>Name: " + ibmweb.opinionlab.defaults.customVariables.userName + "</div><div style=\"margin-top: 5px;\">Email: " + ibmweb.opinionlab.defaults.customVariables.userEmail + "</div>";
            } else {
                var _585 = "";
            }
            if (ibmweb.config.get("opinionlab").requirePrompt === true) {
                label = "<span class=\"ibm-required\">*</span>" + label;
                _583 = false;
            }
            showText = _586({
                omitParWrapper: false,
                label: label,
                type: "radio",
                name: "keepanony",
                value: [{
                    label: "yes&nbsp;&nbsp;",
                    value: "yes",
                    checked: false
                }, {
                    label: "no" + _584,
                    value: "no",
                    checked: _583
                }]
            });
            if (ibmweb.config.get("opinionlab").getUserInfo && ibmweb.config.get("opinionlab").promptUserInfo) {
                showText += "<div id=\"oplabsurvey-anonytext-content\">" + _585 + "</div>";
            } else {
                showText += "<div id=\"oplabsurvey-anonytext-content\">" + _559.config.feedbackAnonymousText + "</div>";
            }
            return showText;
        };

        function _587() {
            var _588 = "<p>" + _559.config.feedbackAnonymousText + "</p>";
            if (ibmweb.config.get("opinionlab").getUserInfo === true && ibmweb.config.get("opinionlab").promptUserInfo === true && ibmweb.opinionlab.defaults && ibmweb.opinionlab.defaults.customVariables && ibmweb.opinionlab.defaults.customVariables.userEmail != "") {
                _588 = _582();
                ibmweb.queue.push(function() {
                    if (dojo.query("[name=\"keepanony\"]").length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }, function() {
                    dojo.forEach(dojo.query("[name=\"keepanony\"]"), function(node, _589) {
                        dojo.connect(node, "click", function(e) {
                            if (ibmweb.opinionlab.defaults && ibmweb.opinionlab.defaults.customVariables && ibmweb.opinionlab.defaults.customVariables.userEmail != "") {
                                var _58a = "<div>Name: " + ibmweb.opinionlab.defaults.customVariables.userName + "</div><div style=\"margin-top: 5px;\">Email: " + ibmweb.opinionlab.defaults.customVariables.userEmail + "</div>";
                            } else {
                                var _58a = "";
                            }
                            if (node.value == "yes" && node.checked) {
                                dojo.byId("oplabsurvey-anonytext-content").innerHTML = _58a;
                                dojo.query("label[for=\"" + dojo.query("[value=\"no\"]")[0].id + "\"]")[0].innerHTML = "no&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If no, then your feedback will be anonymous";
                            } else {
                                dojo.byId("oplabsurvey-anonytext-content").innerHTML = _559.config.feedbackAnonymousText;
                                dojo.query("label[for=\"" + dojo.query("[value=\"no\"]")[0].id + "\"]")[0].innerHTML = "no";
                            }
                        });
                    });
                });
            } else {
                if (ibmweb.config.get("opinionlab").getUserInfo === true && ibmweb.config.get("opinionlab").promptUserInfo === true && (ibmweb.config.get("opinionlab").requirePrompt === true || ibmweb.config.get("opinionlab").requirePrompt === false) && (typeof ibmweb.opinionlab.defaults == "undefined" || typeof ibmweb.opinionlab.defaults.customVariables == "undefined" || typeof ibmweb.opinionlab.defaults.customVariables.userEmail == "undefined")) {
                    _588 = _582();
                    ibmweb.queue.push(function() {
                        if (dojo.query("[name=\"keepanony\"]").length > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }, function() {
                        dojo.forEach(dojo.query("[name=\"keepanony\"]"), function(node, _58b) {
                            dojo.connect(node, "click", function(e) {
                                if (node.value == "yes" && node.checked) {
                                    dojo.byId("oplabsurvey-anonytext-content").innerHTML = "";
                                    var _58c = "<div class=\"ibm-common-overlay\" id=\"oplabsurvey-anonytext-data-overlay\"> <div class=\"ibm-head\"> <p><a class=\"ibm-common-overlay-close\" href=\"#close\">Close [x]</a></p> </div> <div class=\"ibm-body\"> <div class=\"ibm-main\"> <div class=\"ibm-title ibm-subtitle\"> <h2>Feedback Information</h2> </div> <div class=\"ibm-container ibm-alternate ibm-buttons-last\"> <div class=\"ibm-container-body\"> <form action=\"#\" class=\"ibm-row-form\" enctype=\"multipart/form-data\" method=\"post\"> <p><label for=\"name\">Name:<span class=\"ibm-required\">*</span></label><span><input name=\"oplabsurvey-anonytext-data-name\" size=\"25\" value=\"\" style=\"width: 200px;\" class=\"required\" type=\"text\" /></span></p> <p><label for=\"email\">Email:<span class=\"ibm-required\">*</span></label><span><input name=\"oplabsurvey-anonytext-data-email\" size=\"25\" value=\"\" style=\"width: 200px;\" class=\"required\" type=\"text\" /></span></p><div class=\"ibm-overlay-rule\"><hr /> </div> <p class=\"ibm-first\"><input class=\"ibm-btn-arrow-sec\" name=\"oplabsurvey-anonytext-data-submit\" value=\"Save\" type=\"button\" /></p> </form> </div> </div> </div> </div> </div>";
                                    dojo.place(_58c, dojo.query("body")[0], "last");
                                    ibmweb.overlay.show("oplabsurvey-anonytext-data-overlay");
                                    ibmweb.queue.push(function() {
                                        return typeof dijit.byId("dialog_oplabsurvey-anonytext-data-overlay") !== "undefined";
                                    }, function() {
                                        var _58d = dijit.byId("dialog_oplabsurvey-anonytext-data-overlay").domNode;
                                        dojo.connect(dojo.query("[name=\"oplabsurvey-anonytext-data-submit\"]", _58d)[0], "click", function() {
                                            if (dojo.query(".ibm-error-link", dojo.query("[name=\"oplabsurvey-anonytext-data-name\"]", _58d)[0].parentElement).length > 0) {
                                                dojo.query(".ibm-error-link", dojo.query("[name=\"oplabsurvey-anonytext-data-name\"]", _58d)[0].parentElement).forEach(function(node, _58e) {
                                                    dojo.destroy(node, dojo.query("[name=\"oplabsurvey-anonytext-data-name\"]", _58d)[0].parentElement);
                                                });
                                            }
                                            if (dojo.query(".ibm-error-link", dojo.query("[name=\"oplabsurvey-anonytext-data-email\"]", _58d)[0].parentElement).length > 0) {
                                                dojo.query(".ibm-error-link", dojo.query("[name=\"oplabsurvey-anonytext-data-email\"]", _58d)[0].parentElement).forEach(function(node, _58f) {
                                                    dojo.destroy(node, dojo.query("[name=\"oplabsurvey-anonytext-data-email\"]", _58d)[0].parentElement);
                                                });
                                            }
                                            if (dojo.query("[name=\"oplabsurvey-anonytext-data-name\"]", _58d)[0].value === "") {
                                                dojo.place("<a title=\"Error link\" href=\"#\" class=\"ibm-error-link\">Error</a>", dojo.query("[name=\"oplabsurvey-anonytext-data-name\"]", _58d)[0].parentElement, "last");
                                                return;
                                            } else {
                                                ibmweb.opinionlab.defaults.customVariables.userName = dojo.query("[name=\"oplabsurvey-anonytext-data-name\"]", _58d)[0].value;
                                            }
                                            if (dojo.query("[name=\"oplabsurvey-anonytext-data-email\"]", _58d)[0].value === "") {
                                                dojo.place("<a title=\"Error link\" href=\"#\" class=\"ibm-error-link\">Error</a>", dojo.query("[name=\"oplabsurvey-anonytext-data-email\"]", _58d)[0].parentElement, "last");
                                                return;
                                            } else {
                                                ibmweb.opinionlab.defaults.customVariables.userEmail = dojo.query("[name=\"oplabsurvey-anonytext-data-email\"]", _58d)[0].value;
                                            }
                                            ibmweb.overlay.hide("oplabsurvey-anonytext-data-overlay");
                                        });
                                        dojo.connect(dijit.byId("dialog_oplabsurvey-anonytext-data-overlay"), "onHide", function() {
                                            if ((typeof ibmweb.opinionlab.defaults == "undefined" || typeof ibmweb.opinionlab.defaults.customVariables == "undefined" || typeof ibmweb.opinionlab.defaults.customVariables.userEmail == "undefined")) {
                                                dojo.attr(dojo.query("[value=\"no\"]")[0], "checked", true);
                                                dojo.byId("oplabsurvey-anonytext-content").innerHTML = _559.config.feedbackAnonymousText;
                                                dojo.query("label[for=\"" + dojo.query("[value=\"no\"]")[0].id + "\"]")[0].innerHTML = "no";
                                            } else {
                                                var _590 = "<div>Name: " + ibmweb.opinionlab.defaults.customVariables.userName + "</div><div style=\"margin-top: 5px;\">Email: " + ibmweb.opinionlab.defaults.customVariables.userEmail + "</div>";
                                                dojo.byId("oplabsurvey-anonytext-content").innerHTML = _590;
                                                dojo.query("label[for=\"" + dojo.query("[value=\"no\"]")[0].id + "\"]")[0].innerHTML = "no&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If no, then your feedback will be anonymous";
                                            }
                                        });
                                    });
                                } else {
                                    dojo.byId("oplabsurvey-anonytext-content").innerHTML = _559.config.feedbackAnonymousText;
                                    dojo.query("label[for=\"" + dojo.query("[value=\"no\"]")[0].id + "\"]")[0].innerHTML = "no";
                                }
                            });
                        });
                    });
                }
            }
            return _588;
        };

        function _591() {
            var html = "";
            if (_559.config.customQuestions) {
                dojo.forEach(_559.config.customQuestions, function(_592) {
                    html += _586(_592);
                    _559.config.customQuestionsIds.push(_592.name);
                });
                _55e.prepQuestions(_559.config.customQuestionsIds);
            }
            return html;
        };

        function _593() {
            var html = "";
            var _594 = {};
            if (_559.config.topicSelector) {
                _559.config.topicSelector.type = "selectlist";
                html += _586(_559.config.topicSelector);
                _55e.data({
                    "topic_selection": _559.config.topicSelector.name
                });
                html = html.replace("Select one", "Choose a topic for your comments");
                if (_559.config.topicSelector.required) {
                    html = html.replace(/<select/g, "<span class=\"ibm-required\">*</span><select");
                }
            }
            return html;
        };

        function _586(_595) {
            var _596 = {
                    hideLabel: false,
                    label: "",
                    maxlength: 0,
                    name: "",
                    placeholder: "",
                    showCharCounter: false,
                    type: "",
                    value: ""
                },
                html = "",
                _597 = "",
                _598 = _595.type == "textarea" && _595.name == "comments" ? "<div class=\"oplabsurvey-anonytext\">" + _587() + "</div>" : "",
                _599 = "",
                _59a = "<p><label for=\"$id\">$label</label><input id=\"$id\" name=\"$name\" type=\"text\" placeholder=\"$placeholder\" value=\"$value\" maxlength=\"$maxlength\" data-maxlength=\"$maxlength\" /></p>",
                _59b = "<p><label for=\"$id\"$hideLabel>$label</label><textarea id=\"$id\" name=\"$name\" placeholder=\"$placeholder\" cols=\"$cols\" rows=\"$rows\" maxlength=\"$maxlength\" data-maxlength=\"$maxlength\">$value</textarea></p>",
                _59c = "<input id=\"$id\" name=\"$name\" value=\"$value\" type=\"radio\" $checked /><label for=\"$id\">$label</label>",
                _59d = "<input name=\"$name\" id=\"$id\" value=\"$value\" type=\"checkbox\" $checked/> <label for=\"$id\">$label</label>",
                _59e = "<option value=\"$value\">$label</option>";
            dojo.mixin(_596, _595);
            switch (_596.type) {
                case "text":
                    html = _59a.replace(/\$id/g, _596.name + _559.config.ccid).replace(/\$name/, _596.name).replace(/\$value/, _596.value).replace(/\$label/, _596.label).replace(/\$placeholder/, _596.placeholder);
                    if (_596.maxlength > 0) {
                        html = html.replace(/\$maxlength/g, _596.maxlength);
                    }
                    break;
                case "textarea":
                    html = _59b.replace(/\$id/g, _596.name + _559.config.ccid).replace(/\$name/, _596.name).replace(/\$value/, _596.value).replace(/\$label/, _596.label).replace(/\$placeholder/, _596.placeholder);
                    if (_596.cols != undefined && _596.cols > 0) {
                        html = html.replace(/\$cols/, _596.cols);
                    } else {
                        html = html.replace(/\$cols/, "");
                    }
                    if (_596.rows != undefined && _596.rows > 0) {
                        html = html.replace(/\$rows/, _596.rows);
                    } else {
                        html = html.replace(/\$rows/, "");
                    }
                    if (_596.hideLabel === true) {
                        html = html.replace(/\$hideLabel/, " class=\"ibm-access\"");
                    }
                    if (_596.showCharCounter === true) {
                        _597 = "<div class=\"oplabsurvey-charcount oplabsurvey-align-right\" data-field=\"" + _596.name + _559.config.ccid + "\"><p>Chars left: <span>" + _596.maxlength + "</span></p></div>";
                    }
                    if (_598 != "" || _597 != "") {
                        html += "<div class=\"oplabsurvey-comment-ta-notes\">" + _598 + _597 + "</div><br />";
                    }
                    if (_596.maxlength > 0) {
                        html = html.replace(/\$maxlength/g, _596.maxlength);
                    }
                    break;
                case "radio":
                    dojo.forEach(_596.value, function(item, i) {
                        var _59f = item.checked ? " checked=\"checked\"" : "";
                        _599 += _59c.replace(/\$id/g, _596.name + _559.config.ccid + i).replace(/\$name/, _596.name).replace(/\$value/, item.value).replace(/\$label/, item.label).replace(/\$checked/, _59f);
                    });
                    html = "<label id=\"" + _596.name + _559.config.ccid + "-group\">" + _596.label + "</label><span class=\"ibm-input-group ibm-radio-group\">" + _599 + "</span>";
                    if (_596.omitParWrapper == true) {
                        return html;
                    } else {
                        return "<p class=\"ibm-form-elem-grp\">" + html + "</p>";
                    }
                    break;
                case "checkbox":
                    dojo.forEach(_596.value, function(item, i) {
                        var _5a0 = item.checked ? " checked=\"checked\"" : "";
                        _599 += _59d.replace(/\$id/g, _596.name + _559.config.ccid + i).replace(/\$name/, _596.name).replace(/\$value/, item.value).replace(/\$label/, item.label).replace(/\$checked/, _5a0);
                    });
                    html = "<label id=\"" + _596.name + _559.config.ccid + "-group\">" + _596.label + "</label><span class=\"ibm-input-group\">" + _599 + "</span>";
                    if (_596.omitParWrapper == true) {
                        return html;
                    } else {
                        return "<p class=\"ibm-form-elem-grp\">" + html + "</p>";
                    }
                    break;
                case "selectlist":
                    dojo.forEach(_596.value, function(item) {
                        _599 += _59e.replace(/\$value/, item.value).replace(/\$label/, item.label);
                    });
                    html = "<p><label for=\"" + _596.name + "\">" + _596.label + "</label><select id=\"" + _596.name + _559.config.ccid + "\" name=\"" + _596.name + "\"><option value=\"\">Select one</option>" + _599 + "</select></p>";
                    break;
                default:
            }
            return html;
        };

        function _5a1() {
            if (_559.config.comments.enabled === false && _559.config.customQuestions.length == 0) {
                _559.elements.submitButton = "";
            }
            var html = "<form class=\"oplabsurvey-form\" id=\"oplabsurvey-" + _559.config.ccid + "-form\" action=\"https://secure.opinionlab.com/rate40.asp\" method=\"post\">" + _559.elements.surveyHeading + _559.elements.surveySubhead + _559.elements.ratingField + _559.elements.customerServiceLink + _559.elements.topicSelector + _559.elements.commentField + _559.elements.customFields + _559.elements.aboutFeedbackLink + _559.elements.submitButton + "</form>";
            return "<div class=\"oplabsurvey-maincontent\">" + html + "</div>";
        };

        function _5a2(v, _5a3) {
            return _5a3 ? "<h2 class=\"ibm-rule\">" + v + "</h2>" : "<h2>" + v + "</h2>";
        };

        function _5a4(o) {
            var html = "<div class=\"ibm-common-overlay\" id=\"" + o.id + "\"><div class=\"ibm-head\"><p><a class=\"ibm-common-overlay-close\" href=\"#close\">Close [x]</a></p></div><div class=\"ibm-body\"><div class=\"ibm-main\"><a class=\"ibm-access\" href=\"javascript:;\"><!-- Accessibility anchor --></a><div class=\"ibm-title\"><h2>" + o.heading + "</h2></div><div class=\"ibm-container ibm-alternate\"><div class=\"ibm-container-body\">" + o.content + "</div></div></div></div></div>";
            return html;
        };

        function _5a5() {
            var _5a6 = "",
                i = 0;
            if (_559.config.rating.type == "stars") {
                for (i = 1; i < 6; i++) {
                    _5a6 += "<li><input type=\"radio\" class=\"ibm-access\" value=\"" + i + "\" name=\"overall\" id=\"rating-" + _559.config.ccid + "-stars-" + i + "\"><label title=\"Rate this " + i + " stars\" for=\"rating-" + _559.config.ccid + "-stars-" + i + "\"></label></li>";
                }
                return "<div class=\"oplabsurvey-rating-field\" data-type=\"stars\"><ul class=\"oplabsurvey-rating-stars\">" + _5a6 + "</ul></div>";
            } else {
                if (_559.config.rating.type == "yes-no") {
                    _5a6 = "<input type=\"radio\" value=\"5\" name=\"overall\" id=\"rating-" + _559.config.ccid + "-yesno-5\"><label title=\"Rate this yes\" for=\"rating-" + _559.config.ccid + "-yesno-5\">" + _559.config.ratingLabels.label5 + "</label> <input type=\"radio\" value=\"1\" name=\"overall\" id=\"rating-" + _559.config.ccid + "-yesno-1\"><label title=\"Rate this no\" for=\"rating-" + _559.config.ccid + "-yesno-1\">" + _559.config.ratingLabels.label1 + "</label>";
                    return "<div class=\"oplabsurvey-rating-field\"><p>" + _5a6 + "</p></div>";
                }
            }
            return "";
        };

        function _5a7() {
            var html = _559.elements.surveyHeading + _559.elements.ratingField + _559.elements.aboutFeedbackLink;
            return "<div class=\"oplabsurvey-maincontent\">" + html + "</div>";
        };

        function _5a8(v) {
            return "<div class=\"oplabsurvey-thankyoucontent\">" + v + "</div>";
        };

        function _5a9(_5aa) {
            var html = "<div id=\"oplabsurvey-tray\" class=\"minimized\"><span class=\"oplabsurvey-tray-close\"><a class=\"ibm-cancel-link\" href=\"javascript:;\" alt=\"X\"></a></span><span class=\"ibm-access\">Screen reader users: Please switch to forms mode for this link.</span><a class=\"oplabsurvey-tray-tab\" href=\"#\">" + _559.config.feedbackText + "</a><div class=\"ibm-columns\"><div class=\"ibm-col-";
            var _5ab = dojo.query(".ibm-liquid");
            if (_5ab.length == 1) {
                html += "4-1";
            } else {
                html += "4-1";
            }
            html += "\">" + _5aa + "</div></div></div>";
            return html;
        };

        function _5ac() {
            var _5ad = document.getElementById(_559.config.formId);
            _5ad.reset();
            _5ae(dojo.query(".oplabsurvey-rating-field", _5ad)[0]);
        };

        function _5ae(_5af) {
            if (ibmweb.info.isIE) {
                dojo.forEach(dojo.query("input", _5af), function(i) {
                    i.checked = false;
                    dojo.query(i).removeAttr("checked");
                });
            } else {
                dojo.query("input", _5af).removeAttr("checked");
            }
            if (_559.config.rating.type == "stars") {
                _580(dojo.query("ul", _5af)[0]);
            }
        };

        function _5b0() {
            dojo.forEach(_559.config.customQuestionsIds, function(id) {
                var _5b1 = dojo.query("[name='" + id + "']", _559.$form[0]).attr("type")[0],
                    _5b2 = "";
                switch (_5b1) {
                    case "radio":
                        _5b2 = dojo.query("[name='" + id + "']:checked", _559.$form[0]).val();
                        break;
                    case "checkbox":
                        dojo.query("[name='" + id + "']:checked", _559.$form[0]).forEach(function(item) {
                            _5b2 += ", " + dojo.query(item).val();
                        });
                        _5b2 = _5b2.substr(2);
                        break;
                    default:
                        _5b2 = dojo.query("[name='" + id + "']", _559.$form[0]).val();
                        break;
                }
                _55e.setAnswer(id, _5b2);
            });
        };

        function _57f(_5b3) {
            if (_5b3) {
                if (_559.config.rating.type == "stars") {
                    dojo.query(".oplabsurvey-rating-stars li input[value='" + _5b3 + "']", _559.$form[0]).attr("checked", "checked");
                    _580(dojo.query(".oplabsurvey-rating-stars", _559.$form[0])[0]);
                } else {
                    if (_559.config.rating.type == "yes-no") {
                        dojo.query(".oplabsurvey-rating-field input[value='" + _5b3 + "']", _559.$form[0]).attr("checked", "checked");
                    }
                }
            }
            ibmweb.overlay.show(_559.config.surveyOverlayId, this);
            _579(true);
            _57a(true);
            setTimeout(function() {
                dojo.query("#dialog_" + _559.config.surveyOverlayId + " .dijitDialogCloseIcon").onclick(function() {
                    if (!dojo.hasClass(dojo.query(_559.$form)[0], "submitted")) {
                        dojo.query("#dialog_" + _559.config.surveyOverlayId + " form input[type='submit']")[0].click();
                    }
                });
            }, 1500);
        };

        function _579(show) {
            if (_559.config.container.length == 0 || dojo.query(".oplabsurvey-maincontent", _559.config.container[0]).length == 0) {
                return;
            }
            if (show) {
                _559.config.container.addClass("oplabsurvey-thankyou");
                if (_559.config.type.form == "inline") {
                    _5ac();
                } else {
                    _5ae(dojo.query(".oplabsurvey-rating-field", _559.config.container[0])[0]);
                }
            } else {
                _559.config.container.removeClass("oplabsurvey-thankyou");
            }
        };

        function _578(show) {
            if (dojo.query("#" + _559.config.surveyOverlayId).length == 0) {
                return;
            }
            if (show) {
                dojo.query("#" + _559.config.surveyOverlayId + " .ibm-container-body").addClass("oplabsurvey-thankyou");
                _5ac();
            } else {
                dojo.query("#" + _559.config.surveyOverlayId + " .ibm-container-body").removeClass("oplabsurvey-thankyou");
            }
        };

        function _57a(show) {
            if (dojo.query("#oplabsurvey-tray").length == 0) {
                return;
            }
            if (show) {
                dojo.query("#oplabsurvey-tray").addClass("oplabsurvey-thankyou");
                if (_559.config.type.form == "inline") {
                    _5ac();
                } else {
                    _5ae(dojo.query(".oplabsurvey-rating-field", document.getElementById("oplabsurvey-tray"))[0]);
                }
            } else {
                dojo.query("#oplabsurvey-tray").removeClass("oplabsurvey-thankyou");
            }
            _565();
        };

        function _5b4() {
            dojo.ready(function() {
                if (!dojo.byId(_559.config.aboutFeedbackOverlayId)) {
                    _559.elements.surveyAboutFeedbackOverlay = _5a4({
                        id: _559.config.aboutFeedbackOverlayId,
                        heading: _559.config.aboutFeedbackOverlayTitle,
                        content: _559.config.aboutFeedbackOverlayContent
                    });
                    dojo.place(_559.elements.surveyAboutFeedbackOverlay, "ibm-content-main", "last");
                }
            });
        };

        function _5b5() {
            if (_559.config.container.length == 1) {
                _559.$form = dojo.query("form", _559.config.container.html(_559.elements.surveyFormHtml + _5a8(_5a2(_559.config.thankyouMsg, true)))[0]);
                _57b(dojo.query(".oplabsurvey-rating-field", _559.$form[0])[0]);
                _570();
                _575();
            }
        };

        function _5b6() {
            _5b7();
            _559.config.container.html(_5a7() + _5a8(_5a2(_559.config.thankyouMsg, true)));
            _57b(dojo.query(".oplabsurvey-rating-field", _559.config.container[0])[0], true);
            _57b(dojo.query(".oplabsurvey-rating-field", _559.$form[0])[0], false);
        };

        function _5b7() {
            var _5b8 = _5a4({
                id: _559.config.surveyOverlayId,
                heading: _559.config.thankyouMsg,
                content: _559.elements.surveyFormHtml + _5a8("<p>" + _559.config.thankyouMsg + "</p>")
            });
            _559.$form = dojo.query("form", dojo.place(_5b8, "ibm-content-main", "last"));
            if (_559.config.type.display == "link") {
                _57b(dojo.query(".oplabsurvey-rating-field", _559.$form[0])[0]);
            }
            _570();
            _575();
        };

        function _5b9() {
            var tray = dojo.place(_5a9(_559.elements.surveyFormHtml + _5a8(_5a2(_559.config.thankyouMsg))), "ibm-content-main", "last"),
                _55c;
            _559.$form = dojo.query("form", tray);
            dojo.query(tray).addClass("inline");
            dojo.connect(dojo.query(".oplabsurvey-tray-close")[0], "onclick", function(e) {
                e.preventDefault();
                _5ac();
                _5c3();
            });
            _57b(dojo.query(".oplabsurvey-rating-field", _559.$form[0])[0]);
            _570();
            _575();
            if (_559.config.trayShowOnLoad == 0) {
                if (_55d < 2) {
                    _5c3();
                    _55c = setTimeout(function() {
                        _5c3();
                    }, _559.config.trayDisplayTimeMs);
                }
            } else {
                setTimeout(function() {
                    if (_55d < 2) {
                        _5c3();
                        _55c = setTimeout(function() {
                            _5c3();
                        }, _559.config.trayDisplayTimeMs);
                    }
                }, _559.config.trayShowOnLoad);
            }
            dojo.query(tray).onmouseover(function() {
                clearTimeout(_55c);
            });
            dojo.query("a.oplabsurvey-tray-tab", tray).onclick(function(evt) {
                dojo.stopEvent(evt);
                _5ac();
                _5c3();
            });
            (function() {
                var _5ba = setInterval(function() {
                    _565();
                }, 25);
                setTimeout(function() {
                    clearInterval(_5ba);
                }, 5000);
            })();
            dojo.subscribe("/ibmweb/dynnav/sbs/finished", function() {
                _565();
            });
        };

        function _5bb() {
            _5b7();
            var tray = dojo.place(_5a9(_5a7() + _5a8(_5a2(_559.config.thankyouMsg))), "ibm-content-main", "last"),
                _55c;
            dojo.connect(dojo.query(".oplabsurvey-tray-close")[0], "onclick", function(e) {
                e.preventDefault();
                _5ac();
                _5c3();
            });
            _57b(dojo.query(".oplabsurvey-rating-field", tray)[0], true);
            _57b(dojo.query(".oplabsurvey-rating-field", _559.$form[0])[0], false);
            if (_55d < 2) {
                _5c3();
                _55c = setTimeout(function() {
                    _5c3();
                }, _559.config.trayDisplayTimeMs);
                dojo.query(tray).onmouseover(function() {
                    clearTimeout(_55c);
                });
            }
            dojo.query("a.oplabsurvey-tray-tab", tray).onclick(function(evt) {
                dojo.stopEvent(evt);
                _5c3();
            });
            (function() {
                var _5bc = setInterval(function() {
                    _565();
                }, 25);
                setTimeout(function() {
                    clearInterval(_5bc);
                }, 5000);
            })();
            dojo.subscribe("/ibmweb/dynnav/sbs/finished", function() {
                _565();
            });
        };

        function _5bd() {
            _5b7();
            var trig = dojo.place(_559.config.overlayLinkTrigger, "ibm-content-main", "last"),
                _5be = dojo.query("a.oplabsurvey-tray-tab", trig);
            _5bf(_5be);
            _5be.onclick(function(evt) {
                dojo.stopEvent(evt);
                _57f();
            });
        };

        function _5bf(_5c0) {
            var wh = window.innerHeight || document.documentElement.clientHeight,
                y = (wh - dojo.style(_5c0[0], "height")) / 2;
            if (ibmweb.config.sbs.enabled) {
                dojo.subscribe("/ibmweb/dynnav/sbs/finished", function() {
                    var _5c1 = dojo.position(dojo.byId("ibm-social-tools"), true),
                        _5c2 = 6,
                        b = _5c1.y + _5c1.h + 20;
                    y = parseInt(y) + parseInt(dojo.style(_5c0[0], "width")) + 20;
                    if (y <= b) {
                        y = b;
                    }
                    y = parseInt(y);
                    if (isNaN(y)) {
                        return;
                    }
                    if (dojo.isIE < 8) {
                        _5c0.style.cssText = "position: absolute;";
                    } else {
                        dojo.style(_5c0[0], {
                            "position": "absolute",
                            "right": (-Math.abs(dojo.style(_5c0[0], "height") + dojo.style(_5c0[0], "width") + 1)) + "px",
                            "top": y + "px"
                        });
                    }
                });
            } else {
                setTimeout(function() {
                    y = parseInt(y);
                    if (isNaN(y)) {
                        return;
                    }
                    if (dojo.isIE < 8) {
                        _5c0.style.cssText = "position: absolute;";
                    } else {
                        dojo.style(_5c0[0], {
                            "position": "absolute",
                            "right": (-Math.abs(dojo.style(_5c0[0], "height") + dojo.style(_5c0[0], "width") + 1)) + "px",
                            "top": y + "px"
                        });
                    }
                }, 300);
            }
        };

        function _5c3() {
            if (dojo.query("#oplabsurvey-tray").length == 0) {
                return;
            }
            clearTimeout(_55c);
            dojo.toggleClass("oplabsurvey-tray", "minimized");
        };

        function _5c4() {
            var _5c5 = ibmweb.storage.getItem(_55b.surveyKey),
                _5c6 = false;
            if (_5c5 !== null) {
                if ((parseInt(_5c5) + parseInt(_559.config.submitIntervalMs)) > new Date().getTime()) {
                    _5c6 = true;
                } else {
                    ibmweb.storage.removeItem(_55b.surveyKey);
                }
            }
            return _5c6;
        };

        function _5c7() {
            ibmweb.queue.push(function() {
                return ibmweb.opinionlab.defaults && ibmweb.opinionlab.defaults.emailInfoLoaded == true;
            }, function() {
                var _5c8 = _587();
                dojo.query(".oplabsurvey-anonytext").html(_5c8);
            });
        };

        function _5c9() {
            if (_5c4() == true) {
                dojo.query(_559.$form).addClass("submitted");
                _578(true);
                _579(true);
                _57a(true);
            } else {
                _578(false);
                _579(false);
                _57a(false);
            }
        };

        function _5ca() {
            var _5cb = _587(),
                _5cc = ibmweb.opinionlab.defaults ? ibmweb.opinionlab.defaults.emailInfoLoaded : false,
                _5cd = function() {
                    var _5ce = "<p class=\"oplabsurvey-servicelink\">",
                        _5cf = (typeof _559.config.serviceLink.textPartOfLink !== "undefined") ? _559.config.serviceLink.textPartOfLink : "",
                        _5d0 = (typeof _559.config.serviceLink.fullText !== "undefined") ? _559.config.serviceLink.fullText : "",
                        link = (typeof _559.config.serviceLink.linkUrl !== "undefined") ? _559.config.serviceLink.linkUrl : "";
                    if (_5cf !== "" && link !== "") {
                        var _5d1 = _5d0.search(_5cf);
                        if (_5d1 >= 0) {
                            _5d0 = _5d0.replace(_5cf, "<a href=\"" + link + "\" target=\"_blank\">" + _5cf + "</a>");
                        }
                        _5ce += _5d0;
                    } else {
                        if (link !== "") {
                            _5ce += "<a href=\"" + link + "\" target=\"_blank\">" + _5d0 + "</a>";
                        } else {
                            _5ce += _5d0;
                        }
                    }
                    _5ce += "</p>";
                    return _5ce;
                };
            if (typeof _559.config.container == "string") {
                _559.config.container = dojo.query("#" + _559.config.container);
            } else {
                _559.config.container = dojo.query("#tempTestDiv");
            }
            _559.elements = {
                surveyHeading: _559.config.type.display == "tray" ? "<h2>" + _559.config.heading + "</h2>" : "<h2 class=\"ibm-rule\">" + _559.config.heading + "</h2>",
                surveySubhead: _559.config.description != "" ? "<p>" + _559.config.description + "</p>" : "",
                ratingField: _559.config.rating.enabled === true ? _5a5() : "",
                commentField: _559.config.comments.enabled === true ? _586({
                    type: "textarea",
                    name: "comments",
                    label: "Comments",
                    hideLabel: true,
                    placeholder: _559.config.comments.placeholder,
                    showCharCounter: true,
                    maxlength: 1000,
                    cols: 10,
                    rows: 10
                }) : "",
                customFields: _591(),
                topicSelector: _593(),
                feedbackAnonyItem: "<span class=\"oplabsurvey-anonytext\">" + _5cb + "</span>",
                aboutFeedbackLink: "<ul class=\"ibm-link-list oplabsurvey-about-feedback-link\"><li><a onclick=\"ibmweb.overlay.show('" + _559.config.aboutFeedbackOverlayId + "',this);return false;\" class=\"ibm-popup-link\" href=\"#\">" + _559.config.aboutFeedbackText + "</a></li></ul>",
                submitButton: "<div class=\"oplabsurvey-align-right ibm-buttons-row\"><input type=\"submit\" value=\"" + _559.config.submitText + "\" name=\"Submit\" class=\"ibm-btn-arrow-pri\"></div>",
                customerServiceLink: (_559.config.serviceLink.enabled === true) ? _5cd() : ""
            };
            _559.elements.surveyFormHtml = _5a1();
            _5b4();
            dojo.ready(function() {
                if (typeof ibmweb.opinionlab.defaults === "undefined") {
                    ibmweb.opinionlab.defaults = {
                        customVariables: {},
                        emailInfoLoaded: false
                    };
                }
                ibmweb.opinionlab.setUserData = function(data) {
                    var name = (data.User.NickName.length === 0) ? data.User.CommonName : data.User.NickName;
                    ibmweb.opinionlab.defaults.customVariables.userName = name;
                    var _5d2 = data.User.Email;
                    ibmweb.opinionlab.defaults.customVariables.userEmail = _5d2;
                    var _5d3 = dojo.cookie("w3ibmProfile"),
                        hkey = _5d3.split("|")[0];
                    ibmweb.storage.setItem("w3UserName_" + hkey, name);
                    ibmweb.storage.setItem("w3UserEmail_" + hkey, _5d2);
                    ibmweb.opinionlab.defaults.emailInfoLoaded = true;
                };
                if (ibmweb.config.get("opinionlab").getUserInfo === true) {
                    _55f();
                } else {
                    ibmweb.opinionlab.defaults.emailInfoLoaded = true;
                }
                switch (_559.config.type.display) {
                    case "inline":
                        if (_559.config.type.form == "inline") {
                            _5b5();
                        } else {
                            if (_559.config.type.form == "overlay") {
                                _5b6();
                            }
                        }
                        break;
                    case "tray":
                        if (ibmweb.config.config === "www") {
                            dojo.subscribe("ibm/signin/success", function() {
                                _55f();
                            });
                        }
                        if (_559.config.type.form == "overlay") {
                            if (_559.config.trayShowOnLoadMs == 0) {
                                _5bb();
                            } else {
                                setTimeout(_5bb, _559.config.trayShowOnLoadMs);
                            }
                        } else {
                            if (_559.config.type.form == "inline") {
                                if (_559.config.trayShowOnLoadMs == 0) {
                                    _5b9();
                                } else {
                                    setTimeout(_5b9, _559.config.trayShowOnLoadMs);
                                }
                            }
                        }
                        ibmweb.storage.setItem("opltrn", (_55d + 1));
                        break;
                    case "link":
                        _5bd();
                        break;
                    default:
                        break;
                }
                _5c9();
                if (!_5cc) {
                    _5c7();
                }
            });
        };
        return {
            initSurvey: _5ca
        };
    };
    dojo.addOnLoad(function() {
        if (ibmweb.config.opinionlab.customSurvey && ibmweb.config.opinionlab.customSurvey.enabled === true && ibmweb.config.opinionlab.customSurvey.surveys && ibmweb.config.opinionlab.customSurvey.surveys.length > 0) {
            dojo.forEach(ibmweb.config.opinionlab.customSurvey.surveys, function(_5d4) {
                var _5d5 = new ibmweb.opinionlab.customSurvey(_5d4);
                _5d5.initSurvey();
            });
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.aria"]) {
    dojo._hasResource["ibmweb.dynnav.aria"] = true;
    dojo.provide("ibmweb.dynnav.aria");
    dojo.declare("ibmweb.dynnav.aria", [ibmweb.dynnav._module], {
        enabled: true,
        _lock: false,
        init: function() {
            return true;
        },
        onLoad: function() {
            dojo.attr(dojo.body(), "aria-busy", "true");
            if (!dojo.byId("ibm-com")) {
                dojo.body().id = "ibm-com";
            }!(dojo.query("*[role=\"main\"]").length > 0) ? dojo.query("#ibm-top > #ibm-leadspace-head, #ibm-top > #ibm-content-nav, #ibm-top > #ibm-pcon").wrapAll("<div id=\"ibm-access-cntr\"></div>"): null;
            if (dojo.byId("ibm-com").className.indexOf("dijit_a11y") != -1) {
                if (ibmweb.config.config == "www" && ibmweb.info.v17 && !document.getElementById("ibm-hcontrast-head") && !!dojo.byId("ibm-masthead")) {
                    dojo.place("<img src=\"//www.ibm.com/i/v17/_hcontrast_head.png\" width=\"100%\" height=\"100%\" id=\"ibm-hcontrast-head\">", dojo.byId("ibm-masthead"), "first");
                }
                if (ibmweb.info.v17 && !document.getElementById("ibm-hcontrast-home") && !!dojo.byId("ibm-home")) {
                    if (ibmweb.config.config == "www") {
                        dojo.place("<img src=\"//www.ibm.com/i/v17/t/ibm-logo.png\" id=\"ibm-hcontrast-home\">", dojo.query("#ibm-home a")[0], "first");
                    } else {
                        dojo.place("<img src=\"//www.ibm.com/i/v17/w3/w3_logos_sprite.png\" id=\"ibm-hcontrast-home\">", dojo.query("#ibm-home a")[0], "first");
                    }
                }
            }
            dojo.query("a[onclick*=\"ibmweb.overlay.show\"]").forEach(function(elem) {
                dojo.attr(elem, "role", "button");
            });
            return true;
        },
        onData: function(_5d6) {
            if (!_5d6) {
                return;
            }
            var _5d7 = _5d6.accessibilityData;
            if (dojo.byId("ibm-masthead")) {
                !(dojo.query("*[role=\"banner\"]").length > 0) ? dijit.setWaiRole("ibm-masthead", "banner"): null;
            }
            var _5d8 = dojo.query("#ibm-geo a");
            _5d8 = _5d8.length > 0 ? dojo.query("#ibm-geo a")[0] : null;
            if (!!_5d8) {
                dojo.query("#ibm-geo span.ibm-access").forEach(dojo.destroy);
                dijit.setWaiRole(_5d8, "button");
                dijit.setWaiState(_5d8, "label", ibmweb.dynnav.PMM.accessibilityData.locselector + " " + _5d8.innerHTML + " " + ibmweb.dynnav.PMM.accessibilityData.linkseld);
            }
            if (!ibmweb.config.appmast.enabled) {
                var _5d9 = dojo.query("#ibm-masthead #ibm-geo a, #ibm-masthead #ibm-home a, #ibm-masthead #ibm-search-module a, #ibm-masthead #ibm-search-module input");
                _5d9.forEach(function(item) {
                    dojo.connect(item, "onfocus", this, function(_5da) {
                        if (dojo.byId("ibm-menu-links").className == "ibm-access") {
                            dojo.publish("/ibm/dynnav/megamenu/expandMenu");
                        }
                    });
                });
            }
            var home = dojo.query("#ibm-home a");
            if (home.length > 0) {
                var _5db = home.innerHTML.toString();
                _5db = _5db.replace(/^\s+|\s+$/g, "");
                if (_5db == "" && _5db.length == 0) {
                    home.innerHTML = "IBM&reg;";
                }
                home[0].tabIndex = 0;
            }
            if (dojo.byId("ibm-mast-options")) {
                if (ibmweb.config.config == "w3") {
                    var _5dc = dojo.byId("ibm-mast-options");
                    dijit.setWaiRole(_5dc, "toolbar");
                    dojo.attr("ibm-mast-options", "aria-label", "Masthead Navigation");
                    var _5dd = dojo.query("#ibm-mast-options ul");
                    _5dd.forEach(function(item) {
                        dijit.setWaiRole(item, "presentation");
                    });
                } else {
                    var _5dd = dojo.query("#ibm-mast-options ul");
                    if (_5dd.length > 0) {
                        _5dd = _5dd[0];
                        dijit.setWaiRole(_5dd, "toolbar");
                        dojo.attr(_5dd, "aria-label", "Masthead Navigation");
                    }
                }
                var _5de = dojo.query("#ibm-mast-options ul li");
                _5de.forEach(function(item) {
                    dijit.setWaiRole(item, "presentation");
                });
                var optA = dojo.query("#ibm-mast-options a");
                var home = dojo.query("#ibm-home a");
                optA.forEach(function(item) {
                    dijit.setWaiRole(item, "button");
                    item.tabIndex = -1;
                    if (ibmweb.config.config == "w3") {
                        if (home.length > 0 && item != home[0]) {
                            dojo.attr(item, "aria-label", item.innerHTML);
                            (item.className != "ibm-sso-signin") ? dojo.attr(item, "aria-describedby", "ibm-user-name"): null;
                        }
                    }
                });
                if (optA.length > 0) {
                    optA[0].tabIndex = 0;
                }
                dojo.connect(dojo.byId("ibm-mast-options"), "onkeypress", this, function(_5df) {
                    var _5e0 = dojo.query("#ibm-mast-options a");
                    if (!this._lock && (_5df.keyCode == dojo.keys.RIGHT_ARROW || _5df.keyCode == dojo.keys.DOWN_ARROW || _5df.keyCode == dojo.keys.LEFT_ARROW || _5df.keyCode == dojo.keys.UP_ARROW)) {
                        if (_5e0.length > 0) {
                            _5e0.forEach(function(item) {
                                item.tabIndex = -1;
                                dojo.connect(item, "onfocus", this, function(_5e1) {
                                    _5e0.forEach(function(i) {
                                        i.tabIndex = -1;
                                    });
                                    item.tabIndex = 0;
                                });
                            });
                        }
                        this._lock = true;
                    }
                    if (_5df.keyCode == dojo.keys.RIGHT_ARROW || _5df.keyCode == dojo.keys.DOWN_ARROW) {
                        dojo.stopEvent(_5df);
                        var curr = _5df.target;
                        if (_5e0.length > 0) {
                            for (var i = 0; i < _5e0.length; i++) {
                                if ((curr == _5e0[i]) && (i < (_5e0.length - 1))) {
                                    _5e0[i + 1].focus();
                                    _5df.target.tabIndex = -1;
                                    break;
                                } else {
                                    if ((curr == _5e0[i]) && (i == (_5e0.length - 1))) {
                                        _5e0[0].focus();
                                        _5df.target.tabIndex = -1;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (_5df.keyCode == dojo.keys.LEFT_ARROW || _5df.keyCode == dojo.keys.UP_ARROW) {
                        dojo.stopEvent(_5df);
                        var curr = _5df.target;
                        if (_5e0.length > 0) {
                            for (var i = 0; i < _5e0.length; i++) {
                                if ((curr == _5e0[i]) && (i > 0)) {
                                    _5e0[i - 1].focus();
                                    _5df.target.tabIndex = -1;
                                    break;
                                } else {
                                    if ((curr == _5e0[i]) && (i == 0)) {
                                        _5e0[_5e0.length - 1].focus();
                                        _5df.target.tabIndex = -1;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    return false;
                });
            }
            if (dojo.byId("ibm-universal-nav")) {
                dijit.setWaiRole("ibm-universal-nav", "navigation");
                dojo.attr("ibm-universal-nav", "aria-label", _5d7.sitemap || "Site map");
            }
            if (dojo.byId("ibm-menu-links")) {
                dojo.attr("ibm-menu-links", "aria-label", _5d7.sitemap || "Site map");
            }
            if (dojo.byId("ibm-search-module")) {
                dijit.setWaiRole("ibm-search-module", "search");
                dojo.attr("ibm-search-module", "aria-label", _5d7.ibm_search || "IBM Search");
                var _5e2 = dojo.query("#ibm-search-module a, #ibm-search-module input");
                _5e2.forEach(function(item) {
                    dojo.connect(item, "onfocus", this, function(_5e3) {
                        dojo.addClass(dojo.query("#ibm-search-module input#q")[0], "ibm-active");
                    });
                    dojo.connect(item, "onblur", this, function(_5e4) {
                        dojo.removeClass(dojo.query("#ibm-search-module input#q")[0], "ibm-active");
                    });
                });
                if (ibmweb.config.config == "w3") {
                    var _5e5 = dojo.query("#ibm-search-module .scopeButton");
                    if (_5e5.length > 0) {
                        dojo.connect(_5e5[0], "onkeypress", this, function(_5e6) {
                            if (_5e6.shiftKey && _5e6.charOrCode == dojo.keys.TAB) {
                                dojo.stopEvent(_5e6);
                                var _5e7 = dojo.query("#ibm-menu-links a");
                                if (_5e7.length > 0) {
                                    _5e7.forEach(function(item) {
                                        if (item.tabIndex == 0) {
                                            item.focus();
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
            if (dojo.byId("ibm-social-tools") && dojo.style(dojo.byId("ibm-social-tools"), "display") != "none") {
                dijit.setWaiRole(dojo.byId("ibm-social-tools"), "navigation");
                dojo.attr(dojo.byId("ibm-social-tools"), "aria-label", _5d7.tools || "Social tools");
                var _5e8 = dojo.query("#ibm-social-tools ul");
                if (_5e8.length > 0) {
                    dijit.setWaiRole(_5e8[0], "toolbar");
                }
                dojo.attr(_5e8[0], "aria-label", "Social tool list");
            }
            if (dojo.byId("ibm-navigation-trail") && dojo.style(dojo.byId("ibm-navigation-trail"), "display") != "none") {
                dijit.setWaiRole(dojo.byId("ibm-navigation-trail"), "navigation");
                dojo.attr(dojo.byId("ibm-navigation-trail"), "aria-label", _5d7.bcrumb || "Bread Crumbs");
            }
            if (dojo.byId("ibm-content-nav") && dojo.style(dojo.byId("ibm-content-nav"), "display") != "none") {
                (dojo.query("divibm-content-nav #ibm-primary-tabs.ibm-dyntabs").length > 0) ? dijit.setWaiRole(dojo.byId("ibm-content-nav"), "navigation"): null;
                var _5e9 = dojo.query("div#ibm-content-nav #ibm-primary-tabs");
                if (_5e9.length > 0) {
                    if (dojo.style(_5e9[0], "display") != "none" && !(dojo.query("div#ibm-content-nav #ibm-primary-tabs.ibm-dyntabs").length > 0)) {
                        dijit.setWaiRole(dojo.byId("ibm-primary-tabs"), "navigation");
                    }
                    var _5ea = dojo.query("div#ibm-content-nav #ibm-secondary-tabs");
                    if (_5ea.length > 0) {
                        if (dojo.style(_5ea[0], "display") != "none") {
                            if (dojo.query("div#ibm-content-nav #ibm-secondary-tabs.ibm-dyntabs").length > 0) {
                                var _5eb = dojo.query("div#ibm-content-nav #ibm-primary-tabs.ibm-dyntabs .ibm-tabs li.ibm-active a");
                                if (_5eb.length > 0) {
                                    dojo.attr(_5ea[0], "aria-label", _5eb[0].innerHTML);
                                }
                            } else {
                                dijit.setWaiRole(_5ea[0], "navigation");
                                var _5eb = dojo.query("div#ibm-content-nav #ibm-primary-tabs .ibm-tabs li.ibm-active a");
                                if (_5eb.length > 0) {
                                    dojo.attr(_5ea[0], "aria-label", _5eb[0].innerHTML);
                                    if (dojo.query("ul.ibm-tabs", _5ea[0])[0] && _5eb.length > 0) {
                                        dojo.attr(dojo.query("ul.ibm-tabs", _5ea[0])[0], "aria-label", _5eb[0].innerHTML);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var _5ec = [];
            var dtl = dojo.query(".ibm-dyntabs .ibm-tabs");
            var tl = dojo.query(".ibm-tabs");
            if (dtl.length > 0) {
                tl.forEach(function(tle) {
                    var flag = false;
                    for (var i = 0; i < dtl.length; i++) {
                        if (dtl[i] == tle) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        _5ec.push(tle);
                    }
                });
            } else {
                _5ec = tl;
            }
            if (_5ec.length > 0) {
                for (var i = 0; i < _5ec.length; i++) {
                    dijit.setWaiRole(_5ec[i], "tablist");
                    if (ibmweb.config.config != "w3") {
                        dojo.attr(_5ec[i].parentNode, "aria-label", dojo.attr(_5ec[i].parentNode, "aria-label") || "Tab Navigation");
                        dijit.setWaiRole(_5ec[i].parentNode, dijit.getWaiRole(_5ec[i].parentNode) || "navigation");
                    }
                    dojo.query("li", _5ec[i]).forEach(function(item) {
                        dijit.setWaiRole(item, "presentation");
                    });
                    var _5ed = dojo.query("li span.ibm-access", _5ec[i])[0];
                    if (typeof(_5ed) != "undefined") {
                        _5ed.parentNode.removeChild(_5ed);
                    }
                    var _5ee = dojo.query("a", _5ec[i]);
                    _5ee.forEach(function(item) {
                        dijit.setWaiRole(item, "tab");
                        dojo.attr(item, "aria-selected", "false");
                        dojo.attr(item, "tabindex", "-1");
                        dojo.attr(item, "aria-label", item.innerHTML);
                    });
                    dojo.query(".ibm-tabs li.ibm-active a, .ibm-tabs li.ibm-highlight-tab a ").forEach(function(item) {
                        dojo.attr(item, "aria-selected", "true");
                        dojo.attr(item, "tabindex", "0");
                    });
                }
            }
            var _5ef = dojo.query(".ibm-tab-section h2.ibm-access")[0];
            if (typeof _5ef !== "undefined") {
                _5ef.parentNode.removeChild(_5ef);
            }
            if (dojo.byId("ibm-navigation") && dojo.style(dojo.byId("ibm-navigation"), "display") != "none") {
                dijit.setWaiRole("ibm-navigation", "navigation");
                dojo.attr("ibm-navigation", "aria-label", "Primary");
                dojo.query("#ibm-navigation h2.ibm-access").style("display", "none");
            }
            if (dojo.byId("ibm-secondary-navigation") && dojo.style(dojo.byId("ibm-secondary-navigation"), "display") != "none") {
                dijit.setWaiRole("ibm-secondary-navigation", "navigation");
                dojo.attr("ibm-secondary-navigation", "aria-label", "Secondary");
            }(function() {
                if (dojo.byId("ibm-content-sidebar") && dojo.style(dojo.byId("ibm-content-sidebar"), "display") != "none") {
                    var n = 0;
                    (dojo.query("#ibm-content-sidebar #ibm-contact-module")[0]) ? n++ : null;
                    (dojo.query("#ibm-content-sidebar #ibm-merchandising-module")[0]) ? n++ : null;
                    if (dojo.query("#ibm-content-sidebar *").length > n) {
                        dijit.setWaiRole("ibm-content-sidebar", "complementary");
                    }
                    dojo.attr("ibm-content-sidebar", "aria-label", _5d7.sbmain || "Content sidebar");
                }
            })();
            (function() {
                if (dojo.byId("ibm-related-content") && dojo.style(dojo.byId("ibm-related-content"), "display") != "none") {
                    var n = 0;
                    (dojo.query("#ibm-related-content #ibm-merchandising-module")[0]) ? n++ : null;
                    if (dojo.query("#ibm-related-content *").length > n) {
                        dijit.setWaiRole("ibm-related-content", "complementary");
                    }
                    dojo.attr("ibm-related-content", "aria-label", _5d7.relcnt || "Related Content");
                }
            })();
            if (dojo.isOpera) {
                dojo.query("#ibm-top a").forEach(function(i) {
                    if (dojo.attr(i, "tabindex") == null) {
                        i.tabIndex = 0;
                    }
                });
            }
            if (dojo.byId("ibm-footer-module")) {
                dijit.setWaiRole("ibm-footer-module", "complementary");
            }
            if (dojo.byId("ibm-footer")) {
                !(dojo.query("*[role=\"contentinfo\"]").length > 0) ? dijit.setWaiRole("ibm-footer", "contentinfo"): null;
                dojo.attr("ibm-footer", "aria-label", _5d7.footer || "Footer");
            }
            if (!(dojo.query("*[role=\"main\"]").length > 0)) {
                (dojo.query("#ibm-access-cntr").length > 0) ? dijit.setWaiRole("ibm-access-cntr", "main"): null;
            }
            var _5f0 = dojo.query(".ibm-form-elem-grp");
            var _5f1 = 0;
            if (_5f0.length > 0) {
                _5f0.forEach(function(_5f2) {
                    var lbl = dojo.query(".ibm-form-grp-lbl", _5f2);
                    dojo.query(".ibm-input-group", _5f2).forEach(function(_5f3, i) {
                        if (dojo.hasClass(_5f3, "ibm-radio-group")) {
                            dijit.setWaiRole(_5f3, "radiogroup");
                        } else {
                            dijit.setWaiRole(_5f3, "group");
                        }
                        if (lbl.length > i) {
                            if (!!lbl[i].id || lbl[i].id != "") {
                                dojo.attr(_5f3, "aria-labelledby", lbl[i].id);
                            } else {
                                lbl[i].id = "ibm-grp-lbl_" + (_5f1++);
                                dojo.attr(_5f3, "aria-labelledby", lbl[i].id);
                            }
                        }
                    });
                });
            }
            dojo.attr(dojo.byId("ibm-com"), "aria-busy", "false");
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav.maxymiser"]) {
    dojo._hasResource["ibmweb.dynnav.maxymiser"] = true;
    dojo.provide("ibmweb.dynnav.maxymiser");
    dojo.declare("ibmweb.dynnav.maxymiser", [ibmweb.dynnav._module], {
        init: function() {
            var _5f4 = document.location.href.indexOf(".ibm.com/support/") == -1;
            return ibmweb.meta.cc == "us" && ibmweb.meta.lc == "en" && _5f4;
        },
        onLoad: function() {
            dojo.create("script", {
                type: "text/javascript",
                src: "//service.maxymiser.net/cdn/ibm/js/mmcore.js"
            }, dojo.query("head")[0]);
        }
    });
}
if (!dojo._hasResource["ibmweb.dynnav._base-v17"]) {
    dojo._hasResource["ibmweb.dynnav._base-v17"] = true;
    dojo.provide("ibmweb.dynnav._base-v17");
}
if (!dojo._hasResource["ibmweb.controller"]) {
    dojo._hasResource["ibmweb.controller"] = true;
    dojo.provide("ibmweb.controller");
    (function() {
        var _5f5 = (function() {
            var self = "ibm_user_info";
            var data = null,
                _5f6 = false,
                _5f7 = [],
                _5f8 = typeof(ibmweb) !== "undefined" && typeof(ibmweb.config) !== "undefined" && typeof(ibmweb.config.w3UserServiceUrl) !== "undefined";

            function _5f9(_5fa, _5fb) {
                _5f7.push({
                    success: _5fa,
                    fail: _5fb
                });
                if (!_5f6) {
                    _5f6 = true;
                    var _5fc = dojo.cookie("w3ibmProfile");
                    if (_5fc) {
                        var hkey = _5fc.split("|")[0];
                        dojo.io.script.get({
                            url: ibmweb.config.w3UserServiceUrl + hkey + "/callback/" + self + ".setData",
                            timeout: ibmweb.config.w3UserServiceTimeout,
                            error: function(er1, er2) {
                                _5f8 = false;
                                if (console && console.warn) {}
                                dojo.forEach(_5f7, function(q) {
                                    q.fail();
                                });
                            }
                        });
                    } else {
                        _5f8 = false;
                        dojo.forEach(_5f7, function(q) {
                            q.fail();
                        });
                    }
                }
            };
            var ret = function(_5fd, _5fe) {
                if (_5f8 && _5fd) {
                    if (data === null) {
                        _5f9(_5fd, _5fe);
                    } else {
                        _5fd(data);
                    }
                } else {
                    _5fe();
                }
                return _5f8;
            };
            ret.setData = function(_5ff) {
                data = _5ff;
                dojo.forEach(_5f7, function(q) {
                    q.success(data);
                });
            };
            return ret;
        })();
        if (ibmweb.meta.isLoaded) {
            ibmweb.dynnav.init();
        } else {
            dojo.connect(ibmweb.meta, "_init", function() {
                ibmweb.dynnav.init();
            });
        }
    })();
    dojo.addOnLoad(function() {
        var _600 = dojo.query(".v17, .nihilo, .soria, .tundra, .claro, .oneui, .lotusui, .ram"),
            node = dojo.body();
        if (!dojo.hasClass(node, "ibm-custom-theme")) {
            if (node.id && node.id == "ibm-com") {
                if (_600.length > 0) {
                    var _601 = node.className.toString().match(/v17|nihilo|soria|tundra|claro|oneui|lotusui|ram/g),
                        _602 = _600[0].className.toString().match(/v17|nihilo|soria|tundra|claro|oneui|lotusui|ram/g)[0];
                    if (_601 == null) {
                        dojo.addClass(node, _602);
                    }
                    if (_602 == "nihilo" || _602 == "soria" || _602 == "tundra" || _602 == "claro" || _602 == "oneui") {
                        dojo.create("link", {
                            rel: "stylesheet",
                            type: "text/css",
                            href: "//1.www.s81c.com/common/js/dojo/themes/" + _602 + ".css"
                        }, dojo.query("head")[0], "last");
                    }
                } else {
                    dojo.addClass(node, "v17");
                }
            } else {
                if (node.id && node.id == "w3-ibm-com") {
                    if (_600.length > 0) {
                        var _601 = node.className.toString().match(/v17|nihilo|soria|tundra|claro|oneui|lotusui|ram/g),
                            _602 = _600[0].className.toString().match(/v17|nihilo|soria|tundra|claro|oneui|lotusui|ram/g)[0];
                        if (_601) {
                            dojo.addClass(node, _602);
                        }
                        if (_602 == "nihilo" || _602 == "soria" || _602 == "tundra" || _602 == "claro" || _602 == "oneui") {
                            dojo.query("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"//1.www.s81c.com/common/js/dojo/themes/" + _602 + ".css\">");
                        }
                    } else {
                        dojo.addClass(node, "v8");
                    }
                }
            }
        }
    });
    dojo.addOnLoad(function() {
        if (!ibmweb.info.v17) {
            return;
        }
        if (dojo.query("table.ibm-alternating").length != 0 || dojo.query("table.ibm-alternating-col").length != 0 || dojo.query("table.ibm-sortable-table").length != 0) {
            dojo["require"]("ibmweb.table");
        }
        if (dojo.query("table.ibm-table-scroll")[0]) {
            dojo["require"]("ibmweb.table-scroll");
        }
    });
    dojo.addOnLoad(function() {
        if (!ibmweb.info.v17) {
            return;
        }
        if (dojo.query("div.ibm-common-overlay").length > 0) {
            dojo["require"]("ibmweb.overlay");
            dojo.addOnLoad(function() {
                ibmweb.overlay.init();
            });
        }
    });
    dojo.addOnLoad(function() {
        if (!ibmweb.info.v17) {
            return;
        }
        if (dojo.query(".ibm-leaving-prompt").length > 0) {
            dojo["require"]("ibmweb.leaving");
            dojo.addOnLoad(function() {
                ibmweb.leaving.init();
            });
        }
    });
    dojo.addOnLoad(function() {
        if (!ibmweb.info.v17) {
            return;
        }
        if (dojo.query(".ibm-tooltip, .ibm-tooltip-html").length > 0) {
            dojo["require"]("ibmweb.tooltip");
            dojo.addOnLoad(function() {
                ibmweb.tooltip.init();
            });
        }
    });
    dojo.addOnLoad(function() {
        var _603 = dojo.query(".ibm-ribbon .ibm-container-body");
        if (_603.length > 0) {
            dojo["require"]("ibmweb.ribbon");
            dojo.addOnLoad(function() {
                dojo.forEach(_603, function(item) {
                    dojo.query(item).parent().removeClass("ibm-ribbon-hidden");
                    if (dojo.hasAttr(item, "id") && item.id == "ibm-leadspace-body") {
                        ibmweb.ribbonLeadspace.init();
                    } else {
                        var s = new ibmweb.ribbon({
                            id: dojo.hasAttr(item, "id") ? item.id : null,
                            autoscroll: dojo.hasClass(item, "ibm-autoscroll") ? true : false,
                            srcNodeRef: item
                        });
                        s.startup();
                    }
                });
            });
        }
    });
    dojo.addOnLoad(function() {
        var _604 = dojo.query(".ibm-scroll");
        if (_604.length > 0) {
            dojo["require"]("ibmweb.scroll");
            dojo.addOnLoad(function() {
                dojo.forEach(_604, function(item) {
                    new ibmweb.scroll({
                        element: item
                    });
                });
            });
        }
    });
    dojo.addOnLoad(function() {
        var _605 = dojo.query("#ibm-primary-tabs"),
            _606 = dojo.query("#ibm-secondary-tabs");
        if (_605.length == 1 && _606.length == 1) {
            dojo["require"]("ibmweb.subtabs");
            dojo.addOnLoad(function() {
                ibmweb.subtabs.init();
            });
        }
    });
    dojo.addOnLoad(function() {
        var tabs = dojo.query("div.ibm-dyntabs");
        if (tabs.length > 0) {
            dojo["require"]("ibmweb.dyntabs");
            dojo.addOnLoad(function() {
                ibmweb.dyntabs.init();
            });
        }
    });
    dojo.addOnLoad(function() {});
    dojo.addOnLoad(function() {
        dojo.query("p.ibm-back-to-top a").onclick(function(e) {
            if (dojo.attr(this, "href") != "#ibm-content") {
                return true;
            }
            dojo.stopEvent(e);
            window.scrollTo(0, 1);
        });
        dojo.query(".ibm-tab-section.ibm-text a.ibm-anchor-down-em-link").onclick(function(e) {
            var hash = e.target.href.split("#");
            if (hash.length != 2) {
                return;
            }
            hash = hash[1];
            var elem = dojo.byId(hash);
            if (!elem) {
                return;
            }
            window.scrollTo(0, dojo.marginBox(elem).t - dojo.position(dojo.byId("ibm-masthead")).h);
            dojo.stopEvent(e);
        });
        if (dojo.version.major <= 1 && dojo.version.minor > 3) {
            var _607 = dojo.query("a[name]");
            _607.forEach(function(a) {
                if (a.className === "" && a.href === "") {
                    var ap = dojo.create("div", {
                        className: "ibm-anchor-pointer"
                    }, a, "before");
                    if (dojo.isIE < 8) {
                        dojo.create("a", {
                            id: a.name
                        }, ap);
                    } else {
                        dojo.create("a", {
                            name: a.name
                        }, ap);
                    }
                    dojo.query(a).orphan();
                }
            });
            if (window.location.hash !== "") {
                window.location.hash += "";
            }
        }
    });
    dojo.addOnLoad(function() {
        dojo.query("ul.ibm-portrait-module-list li h3 a, ul.ibm-portrait-module-list li h2 a").forEach(function(item) {
            var _608 = dojo.query(dojo.query(item).parents(".ibm-portrait-module-list")).at(0);
            if (!dojo.hasClass(_608[0], "ibm-no-link")) {
                var _609 = dojo.query(item).parents("li").at(0).children("img").at(0);
                if (dojo.hasClass(_608[0], "ibm-new-window")) {
                    _609.onclick(function(e) {
                        dojo.stopEvent(e);
                        window.open(item.href);
                    });
                    _609.style("cursor", "pointer");
                } else {
                    if (_609.parent("a")[0]) {
                        return;
                    }
                    var _60a = dojo.query(dojo.clone(item)).attr({
                            tabindex: "-1",
                            role: "presentation"
                        }),
                        _60b = dojo.hasClass(_60a[0], "ibm-media"),
                        _60c = dojo.hasClass(_60a[0], "ibm-leaving-prompt");
                    _60a[0].innerHTML = "";
                    _60a[0].className = "";
                    if (_60b) {
                        _60a.addClass("ibm-media");
                    }
                    if (_60c) {
                        _60a.addClass("ibm-leaving-prompt");
                    }
                    _609.wrap(_60a[0]);
                }
            }
        });
    });
    dojo.addOnLoad(function() {
        var tmp = dojo.query(".ibm-twitter-module");
        if (tmp.length > 0) {
            dojo["require"]("ibmweb.twitter");
            dojo.addOnLoad(function() {
                dojo.forEach(tmp, function(item) {
                    var w = new ibmweb.twitter.Widget({
                        targetNode: item
                    });
                    w.placeAt(item);
                    w.startup();
                });
            });
        }
    });
    dojo.addOnLoad(function() {
        var tmp = dojo.query(".ibm-rss-module");
        if (tmp.length > 0) {
            dojo["require"]("ibmweb.rssmodule");
            dojo.addOnLoad(function() {
                dojo.forEach(tmp, function(item) {
                    var w = new ibmweb.rssmodule.Widget({
                        targetNode: item
                    });
                    w.placeAt(item);
                    w.startup();
                });
            });
        }
    });
    dojo.addOnLoad(function() {
        var _60d = dojo.query(".ibm-img-contactbox");
        if (_60d.length > 0) {
            dojo["require"]("ibmweb.www.contactmodule");
            dojo.addOnLoad(function() {
                _60d.forEach(function(box) {
                    ibmweb.www.contactmodule.init(box);
                });
            });
        }
    });
    dojo.addOnLoad(function() {
        if (dojo.query("#ibm-top").attr("class") == "ibm-popup") {
            dojo.query("html,body").style("background", "none");
        }
    });
    dojo.addOnLoad(function() {
        if (ibmweb.config.backtocountry.enabled) {
            dojo["require"]("ibmweb.backtocountry");
            dojo.addOnLoad(function() {
                ibmweb.backtocountry.init();
            });
        }
    });
    dojo.addOnLoad(function() {
        ibmweb.stepindicator.init();
    });
    dojo.addOnLoad(function() {
        var _60e = dojo.query("[class*='ibm-play-button-']");
        if (_60e.length > 0) {
            dojo.forEach(_60e, function(item) {
                var elm = dojo.query(item),
                    con = elm.closest(".ibm-video-container"),
                    col = elm.closest("[class*='ibm-col-']"),
                    _60f = elm.closest(".ibm-ribbon"),
                    rQ = dojo.query(_60f),
                    _610 = (_60f.length == 1),
                    _611 = elm.closest(".ibm-video"),
                    fB = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"/i/v17/video-play-button-medium.png\",sizingMethod=\"crop\")",
                    fBh = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"/i/v17/video-play-button-medium-hover.png\",sizingMethod=\"crop\")",
                    fBd = 90,
                    _612 = true;
                if (col.length == 0) {
                    return false;
                }
                if (dojo.hasClass(col[0], "ibm-col-6-1") || dojo.hasClass(col[0], "ibm-col-5-1")) {
                    fB = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"/i/v17/video-play-button-small.png\",sizingMethod=\"crop\")";
                    fBh = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"/i/v17/video-play-button-small-hover.png\",sizingMethod=\"crop\")";
                    fBd = 50;
                }
                if (_610) {
                    dojo.style(con[0], {
                        marginTop: "0px"
                    });
                    dojo.style(col[0], {
                        overflow: "hidden"
                    });
                    if (!dojo.hasClass(rQ[0], "ibm-alternate")) {
                        dojo.addOnLoad(function() {
                            var cols = dojo.query(".ibm-columns", rQ[0]);
                            cols.forEach(function(c) {
                                dojo.style(c, "margin", "0px");
                            });
                        });
                    }
                }
                var i, i_n = elm.next("img"),
                    i_p = elm.prev("img");
                if (i_n.length == 1) {
                    i = i_n;
                } else {
                    if (i_p.length == 1) {
                        i = i_p;
                    } else {
                        _612 = false;
                    }
                }
                if (dojo.isIE == 6) {
                    if (_612) {
                        dojo.removeAttr(i[0], "alt");
                        dojo.style(item, {
                            height: i[0].height + "px",
                            top: (i[0].height - fBd) / 2 + "px",
                            left: (i[0].width - fBd) / 2 + "px",
                            backgroundImage: "none",
                            cursor: "pointer",
                            filter: fB
                        });
                    } else {
                        if (con.length == 1) {
                            dojo.style(item, {
                                height: con[0].height + "px",
                                top: (con[0].height - fBd) / 2 + "px",
                                left: (con[0].width - fBd) / 2 + "px",
                                backgroundImage: "none",
                                cursor: "pointer"
                            });
                        }
                    }
                    if (_611.length == 1) {
                        dojo.connect(_611[0], "onmouseover", function() {
                            dojo.style(item, {
                                filter: fBh
                            });
                        });
                        dojo.connect(_611[0], "onmouseout", function() {
                            dojo.style(item, {
                                filter: fB
                            });
                        });
                    }
                } else {
                    dojo.addOnLoad(function() {
                        var h = (_612) ? i[0].height : 0;
                        if (h > 0) {
                            con.style("height", h + "px");
                        }
                    });
                }
            });
        }
    });
    dojo.addOnLoad(function() {
        var _613 = dojo.query("ul.ibm-tabs")[0];
        var _614 = dojo.query("ul.ibm-tabs li a");
        if (_613) {
            dojo.connect(_613, "onfocus", this, function(e) {});
            dojo.connect(_613, "onkeypress", this, function(e) {
                if (e.keyCode == dojo.keys.RIGHT_ARROW) {
                    dojo.stopEvent(e);
                    var curr = e.target;
                    for (var i = 0; i < _614.length; i++) {
                        if ((curr == _614[i]) && (i < (_614.length - 1))) {
                            _614[i + 1].focus();
                            break;
                        } else {
                            if ((curr == _614[i]) && (i == (_614.length - 1))) {
                                _614[0].focus();
                                break;
                            }
                        }
                    }
                }
                if (e.keyCode == dojo.keys.LEFT_ARROW) {
                    dojo.stopEvent(e);
                    var curr = e.target;
                    for (var i = 0; i < _614.length; i++) {
                        if ((curr == _614[i]) && (i > 0)) {
                            _614[i - 1].focus();
                            break;
                        } else {
                            if ((curr == _614[i]) && (i == 0)) {
                                _614[_614.length - 1].focus();
                                break;
                            }
                        }
                    }
                }
                if (e.keyCode == 32) {
                    dojo.stopEvent(e);
                    window.location.href = dojo.attr(e.target, "href");
                }
            });
        }
    });
}
if (!dojo._hasResource["ibmweb.comusr"]) {
    dojo._hasResource["ibmweb.comusr"] = true;
    dojo.provide("ibmweb.comusr");
    ibmweb.comusr = (function() {
        var _615 = ["annual_sales", "company_name", "country", "employee_count", "industry", "information_level", "primary_sic", "sub_industry"],
            _616 = {
                cryptKey: "yxsdpqmouenictjarzvkbfhwlg",
                decode: function(_617) {
                    var _618 = _617,
                        i, _619 = "",
                        re = /[a-z]/;
                    for (i = 0; i < _618.length; i++) {
                        if (re.test(_618.charAt(i))) {
                            _619 += String.fromCharCode(_616.cryptKey.indexOf(_618.charAt(i)) + 97);
                        } else {
                            _619 += _618.charAt(i);
                        }
                    }
                    return decodeURIComponent(_619);
                },
                encode: function(str) {
                    var _61a = str.toLowerCase(),
                        _61b = "",
                        i, re = /[a-z]/;
                    for (i = 0; i < _61a.length; i++) {
                        if (re.test(_61a.charAt(i))) {
                            _61b += _616.cryptKey.charAt(_61a.charCodeAt(i) - 97);
                        } else {
                            _61b += _61a.charAt(i);
                        }
                    }
                    return encodeURIComponent(_61b);
                }
            },
            _61c = function() {
                ibmweb.util.statsHelper({
                    ibmEV: "common user tag",
                    ibmEvAction: user.company_name,
                    ibmEvGroup: user.employee_count,
                    ibmEvLinkTitle: user.industry,
                    ibmEvModule: user.sub_industry,
                    ibmEvName: user.primary_sic,
                    ibmEvFileSize: user.annual_sales,
                    ibmEvSection: "n/a",
                    ibmEvTarget: "n/a"
                });
            },
            _61d = _61e("ip"),
            _61f = false,
            _620 = {
                expireDaysBasic: 7,
                expireDaysDetailed: 7,
                key: "comusrtag",
                isSupported: function() {
                    try {
                        return window.localStorage && typeof window.localStorage === "object" && typeof JSON !== "undefined";
                    } catch (e) {
                        return false;
                    }
                },
                getItem: function(key) {
                    var _621 = null,
                        _622 = 0,
                        _623 = new Date().getTime();
                    if (!_620.isSupported()) {
                        return null;
                    }
                    if (localStorage.getItem(key) !== null) {
                        _622 = JSON.parse(localStorage.getItem(key)).expires;
                        if (_622 !== 0 && _622 < _623) {
                            _620.removeItem(key);
                        } else {
                            _621 = JSON.parse(localStorage.getItem(key)).value;
                        }
                    }
                    return _621;
                },
                removeItem: function(key) {
                    if (!_620.isSupported()) {
                        return false;
                    }
                    localStorage.removeItem(key);
                },
                setItem: function(key, _624, _625) {
                    var _626 = 0,
                        _627 = {},
                        _628 = new Date().getTime();
                    if (!_620.isSupported()) {
                        return false;
                    }
                    _620.removeItem(key);
                    if (_625) {
                        _626 = _625 * 1000;
                        _626 += _628;
                    }
                    _627 = {
                        "value": _624,
                        "expires": _626
                    };
                    localStorage.setItem(key, JSON.stringify(_627));
                    return true;
                }
            },
            user = {
                nodata: true
            };

        function _629() {
            dojo.io.script.get({
                url: "//www.ibm.com/webmaster/dbip/ip/" + (_61d !== "" ? "?query=" + _61d : ""),
                callbackParamName: "callback",
                load: function(data) {
                    user = {};
                    _633(data);
                    _635();
                    _61f = true;
                    dojo.ready(function() {
                        _61c();
                    });
                },
                error: function() {}
            });
        };

        function _62a() {
            return user;
        };

        function _62b() {
            var key, _62c = {},
                _62d = _620.getItem(_620.key);
            if (typeof _62d === "object") {
                for (key in _62d) {
                    if (_62d.hasOwnProperty(key)) {
                        _62c[(_616.decode(key))] = _616.decode(_62d[key]);
                    }
                }
            }
            return _62c;
        };

        function _61e(name, str) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            str = str !== undefined ? str : window.location.href;
            var _62e = "[\\?&]" + name + "=([^&#]*)",
                _62f = new RegExp(_62e, "i"),
                _630 = _62f.exec(str),
                _631 = "";
            if (_630 !== null) {
                _631 = _630[1];
            }
            return _631;
        };

        function _632() {
            return _61f;
        };

        function _633(data) {
            var _634;
            dojo.forEach(_615, function(key) {
                _634 = !data[key] ? "n/a" : data[key].toString();
                user[key] = _634.toLowerCase();
            });
            user.information_level = data.information_level.toLowerCase();
        };

        function _635() {
            var key, _636 = {};
            for (key in user) {
                if (user.hasOwnProperty(key)) {
                    _636[(_616.encode(key))] = _616.encode(user[key]);
                }
            }
            _620.setItem(_620.key, _636, 3600 * 24 * (user.information_level === "basic" ? _620.expireDaysBasic : _620.expireDaysDetailed));
        };
        user = _62b();
        if (_61d !== "" || !user || !user.information_level) {
            _629();
        } else {
            _61f = true;
            dojo.ready(function() {
                _61c();
            });
        }
        return {
            isLoaded: _632,
            getInfo: _62a
        };
    })();
}
if (!dojo._hasResource["ibmweb.www.controller"]) {
    dojo._hasResource["ibmweb.www.controller"] = true;
    dojo.provide("ibmweb.www.controller");
    dojo.ready(function() {
        if (!String.prototype.trim) {
            String.prototype.trim = function() {
                return this.replace(/^[\s\xA0]+|[\s\xA0]+$/g, "");
            };
        }
        dojo.io.script.get({
            url: ibmweb.config.idm.profiling.profilingjs
        });
    });
}