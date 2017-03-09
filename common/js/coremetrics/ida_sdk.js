/**
 * Id         : /tm-v1.0/common/js/coremetrics/ida_sdk.js
 * Scope      : All v18+ IBM pages
 * Version    : 2017.03.08.2023
 *
 * Script used to load the Coremetrics SDK on IBM web pages 
 *
 *  NOTE: FIND LATEST VERSION IN GITHUB:
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *
 */

try {
   var scriptStartTime = window.performance.now();

   /*----------------------Ensure that old browsers don't break when referencing the console-----------------------*/
   if (!window.console) { window.console = {log: function(){}, error:function(){}, warn:function(){}, time:function(){}, timeEnd:function(){} }; }

   window.ibmStats = window.ibmStats || {};
   window.datalayer = window.datalayer || {};
   window.dl = window.datalayer;

   /* To store all messages being sent by the solution */
   dl.logFile = dl.logFile || [];

   /*--------------------Centralized log manager --------------------*/
   dl.log = dl.log || function (a, b) {
      try {
         /* See if either of the dldb or utagdb cookies are set to true, if so enable logging */
         dl.isLogEnabled = ((document.cookie.indexOf('dldb=true') >= 0) ? true : ((document.cookie.indexOf('utagdb=true') >= 0) ? true : false));
         b = {};
         if (typeof(a) === "object" && datalayer.isLogEnabled) {
            for (c in a) {
               if (typeof(a[c]) !== "function") {
                  /* Exclude functions */
                  if (a[c]instanceof Array) {
                     b[c] = a[c].slice(0)
                  }
                  else {
                     b[c] = a[c]
                  }
               }
            }
            dl.logFile.push(b);
         }
         else {
            b = a
            if (typeof(a) !== "object") {
               dl.logFile.push(b);
            }
         }
         if (dl.isLogEnabled) {
            try {
               console.log(b)
            }
            catch (error) {}
         }
      }
      catch (error) {}
   };

   dl.log('+++DBDM-LOG > ida_sdk.js: START MAIN BLOCK');

   if (window.isIdaStatsLoaded) {
      /* ida_stats.js has been loaded already, stop loading */
      throw new Error('Another version of the SDK has been loaded.');
   }
   window.isIdaStatsLoaded = true;

   /**
    * 
    ************************************************MODULE: GHOSTFUNCTIONS *******************************************
    *
    */

   (function() {
      /*
       * List of ghost functions that may not be defined at point of execution
       * Create a shell function that will push into a queue each call made before the real function is created.
       * Once the functions are defined, then execute each the functions from the queue.
       */
      var ghostFunctions = [
         'cmCreatePageviewTag',
         'cmCreateProductviewTag',
         'cmCreateShopAction5Tag',
         'cmDisplayShops',
         'cmCreateShopAction9Tag',
         'cmCreateOrderTag',
         'cmCreateRegistrationTag',
         'cmCreateElementTag',
         'cmCreateConversionEventTag',
         'cmCreateManualPageviewTag',
         'cmCreateManualLinkClickTag',
         'cmCreateManualImpressionTag',
         'cmCreateCustomTag',
         'cmSetupOther',
         'cmSetCurrencyCode',
         'cmDisplayShop9s',
         'cmDisplayShop5s',
         'cmRetrieveUserID',
         'ibmStats.event',
         'createPageviewTagForSPA'];
      window.ghostQueue = [];

      dl.log('+++DBDM-LOG: Initializing ghost functions.');

      /* This gets executed right on code load. Sets the ghost functions and wait for the real ones */
      (function init() {
         if (!isOriginSetLoaded()) {
            for (var i = 0; i < ghostFunctions.length; i++) {
               createGhostFunction(ghostFunctions[i]);
            }
            listenForOriginSet();
         }
      })();

      /* Checks that ALL functions are properly defined, and no longer ghost functions */
      function isOriginSetLoaded() {
         for (var i = 0; i < ghostFunctions.length; i++) {
            if (ghostFunctions[i].indexOf('.') === -1) {
               /* window level function */
               if (typeof(window[ghostFunctions[i]]) !== 'function' || window[ghostFunctions[i]].isGhost) {
                  return false;
               }
            }
            else {
               /* Second level function or object method. ONLY FIRST LEVEL METHOD IS SUPPORTED */
               if (typeof(window[ghostFunctions[i].split('.')[0]]) !== "undefined") {
                  if (typeof(window[ghostFunctions[i].split('.')[0]][ghostFunctions[i].split('.')[1]]) !== 'function' 
                     || window[ghostFunctions[i].split('.')[0]][ghostFunctions[i].split('.')[1]].isGhost) {
                     return false;
                  }
               }
               else {
                  return false;
               }
            }
         }
         return true;
      }

      /* 
       * Creates each of the ghost functions. Every time the function is called, 
       * it will push the call into the queue for later execution
       */
      function createGhostFunction(ghostFunctionName) {
         if (ghostFunctionName.indexOf('.') === -1) {
            /* window level function */
            window[ghostFunctionName] = function() {
               window.ghostQueue.push({
                  functionName: ghostFunctionName,
                  args: arguments
               });
            }
            window[ghostFunctionName].isGhost = true;
         }
         else {
            /* Second level function or object method. ONLY FIRST LEVEL METHOD IS SUPPORTED */
            /* Make sure that the window level object is defined */
            window[ghostFunctionName.split('.')[0]] = window[ghostFunctionName.split('.')[0]] || {};
            /* Assign the ghost function */
            window[ghostFunctionName.split('.')[0]][ghostFunctionName.split('.')[1]] = function() {
               window.ghostQueue.push({
                  functionName: ghostFunctionName,
                  args: arguments
               });
            }
            window[ghostFunctionName.split('.')[0]][ghostFunctionName.split('.')[1]].isGhost = true;
         }
      }

      /* 
       * This is the timeout loop, it will wait for 50ms before asking whether ALL the functions remain ghost
       * Otherwise, it will execute each of the calls in the ghostQueue
       */
      function listenForOriginSet() {
         setTimeout(function() {
            if (isOriginSetLoaded()) {
               delegateQueue();
            }
            else {
               listenForOriginSet();
            }
         }, 50);
      }

      /* Function that executes each called ghost function in the ghostQueue */
      function delegateQueue() {
         for (var i = 0; i < window.ghostQueue.length; i++) {
            if (window.ghostQueue[i].functionName.indexOf('.') === -1) {
               /* window level function */
               window[window.ghostQueue[i].functionName].apply(this, window.ghostQueue[i].args);
            }
            else {
               /* Second level function or object method. ONLY FIRST LEVEL METHOD IS SUPPORTED */
               window[window.ghostQueue[i].functionName.split('.')[0]][window.ghostQueue[i].functionName.split('.')[1]].apply(this, window.ghostQueue[i].args);
            }
         }
      }
   })();

   /**
    * 
    ************************************************MODULE: JQUERY-INIT ************************************************
    *
    */
   if (typeof(jQuery) !== "undefined" && typeof(jQuery.fn) !== "undefined" && typeof(jQuery.fn.on) !== "undefined") {
      /* Create variables for jQuery version and support for .on() function */
      window.jQueryNativeVersion = jQuery.fn.jquery;
      window.isJQueryOnSupported = jQuery.fn.on ? true : false;
      /* Change scope of jQuery to jQuery2 */
      window.jQuery2 = jQuery;
      dl.log('+++DBDM-LOG: Using native jQuery version: ' + window.jQueryNativeVersion);
   }

   if (!window.isJQueryOnSupported) {
      /*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
      !function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
      }catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ca(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Fa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ba.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Oa(a,b,c||(g?"border":"content"),d,f)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),
      void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b)}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});
      /* Change scope of jQuery to jQuery2 */
      window.jQuery2 = jQuery.noConflict(true);
      window.isJQueryOnSupported = jQuery2.fn.on ? true : false;
      dl.log('+++DBDM-LOG: Using embedded jQuery version: ' + jQuery2.fn.jquery);
   }

   /**
    * 
    ************************************************MODULE: DATALAYER ************************************************
    *
    */
   dl.PAGEIDQUERYSTRINGSDEFAULT = [
      /* Registration Forms - IWM */
      {"pathNameSubstring": "/marketing/iwm/",               "qsParameter" : ["S_PKG","source"]},
      /* Registration Forms - IBMid */
      {"pathNameSubstring": "/account/us-en/signup",         "qsParameter" : ["a","catalogName","partNumber","pkg","quantity","source","trial"]},
      /* Enterprise Search */
      {"pathNameSubstring": "/search/",                      "qsParameter" : ["cc","hpp","lang","o","q"]},
      /* MAM */
      {"pathNameSubstring": "/common/ssi/",                  "qsParameter" : ["docURL","htmlfid","infotype","letternum","MPPEFSCH","subtype","supplier"]},
      /* eSupport */
      {"pathNameSubstring": "/support/docview.wss",          "qsParameter" : ["uid"]},
      {"pathNameSubstring": "/support/fixcentral/",          "qsParameter" : ["product"]},
      /* IBM ID - SSO */
      {"pathNameSubstring": "/account/profile",              "qsParameter" : ["okURL","page"]},
      /* Event Registration */
      {"pathNameSubstring": "/events/wwe/grp",               "qsParameter" : ["OpenForm:cmd","OpenPage:cmd","locale","seminar"]},
      /* Case Studies */
      {"pathNameSubstring": "/software/businesscasestudies", "qsParameter" : ["synkey"]}, 
      ];
   dl.DOWNLOADTYPES = "123,avi,bqy,doc,docx,dot,eps,exe,flv,gif,jpg,lwp,mas,mov,mp3,mp4,odp,ods,odt,otp,ots,ott,pdf,png,pot,pps,ppt,pptx,prz,rss,rtf,sh,stc,sti,stw,swf,sxc,sxi,sxw,tar,txt,wav,wma,wmv,xls,xlsx,xml,zip";
   dl.DOMAINLIST    = "bluemix.net,cognos.com,ibm.biz,ibm.co,ibm.com,ibmcloud.com,ibm-bluemix.github.io,ibmdw.net,jazz.net,lotuslive.com,mybluemix.net,securityintelligence.com,servicemanagementcenter.com,smartercitiescloud.com,softlayer.com,watsonanalytics.com,webdialogs.com,xtify.com";
   dl.TESTDOMAINS   = "dev.nwtw.ibm.com,testdata.coremetrics.com,localhost,wwwbeta-sso.toronto.ca.ibm.com";
   dl.WAITTIME      = 3000;
   dl.TOPANCESTORLEVEL = 10;
   dl.fn = {
         /*--------------------Add SHA256 Hash Functions--------------------*/
         /* 2016-08-04 - jleon: RTC Story# 978510 - https://github.com/jbt/js-crypto */
         sha256 : function() {function e(a,b){return a>>>b|a<<32-b}for(var b=1,a,m=[],n=[];18>++b;)for(a=b*b;312>a;a+=b)m[a]=1;b=1;for(a=0;313>b;)m[++b]||(n[a]=Math.pow(b,.5)%1*4294967296|0,m[a++]=Math.pow(b,1/3)%1*4294967296|0);return function(g){for(var l=n.slice(b=0),c=unescape(encodeURI(g)),h=[],d=c.length,k=[],f,p;b<d;)k[b>>2]|=(c.charCodeAt(b)&255)<<8*(3-b++%4);d*=8;k[d>>5]|=128<<24-d%32;k[p=d+64>>5|15]=d;for(b=0;b<p;b+=16){for(c=l.slice(a=0,8);64>a;c[4]+=f)h[a]=16>a?k[a+b]:(e(f=h[a-2],17)^e(f,19)^f>>>10)+(h[a-7]|0)+(e(f=h[a-15],7)^e(f,18)^f>>>3)+(h[a-16]|0),c.unshift((f=(c.pop()+(e(g=c[4],6)^e(g,11)^e(g,25))+((g&c[5]^~g&c[6])+m[a])|0)+(h[a++]|0))+(e(d=c[0],2)^e(d,13)^e(d,22))+(d&c[1]^c[1]&c[2]^c[2]&d));for(a=8;a--;)l[a]=c[a]+l[a]}for(c="";63>a;)c+=(l[++a>>3]>>4*(7-a%8)&15).toString(16);return c}}(),

         /*--------------------Add Page Load Epoch Function--------------------*/
         setPageLoadEpoch : function (reset) {
            try {
               if (reset !== 1) {
                  digitalData.page.session.pageloadEpoch = (typeof(window.loadingTime) !== "undefined") ? window.loadingTime : new Date().getTime();
                  window.loadingTime = digitalData.page.session.pageloadEpoch;
               }
               else {
                  digitalData.page.session.pageloadEpoch = new Date().getTime();
                  window.loadingTime = digitalData.page.session.pageloadEpoch;                  
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setPageLoadEpoch: ' + error);
            }
         },

         /*--------------------Add parseQueryString function--------------------*/
         /* 2016-07-28 - jleon: RTC Story# 978510 */
         parseQueryString : function (fullURL) {
            try {
               var paramsObject = {},
               /* 2017-01-12 - jleon: added condition to detect and exclude anchor (hash) data */
               queryString = fullURL.substring(fullURL.indexOf("?")+1, (fullURL.lastIndexOf("#") !== -1)?fullURL.lastIndexOf("#"):fullURL.length),
               queries, temp, i, l,
               queries = queryString.split("&");
               for (i = 0, l = queries.length; i < l; i++) {
                  temp = queries[i].split('=');
                  paramsObject[temp[0]] = window.decodeURIComponent(temp[1]);
               }
               return(paramsObject);
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > parseQueryString: ' + error);
            }
         },

         /*--------------------Add calculateURLID function--------------------*/
         /* 2016-07-28 - jleon: RTC Story# 978510 (previous RTC Story# 902576) */
         calculateURLID : function (fullURL) {
            try {
               var returnValue = "";
               if (fullURL !== "") {
                  var parserURL = document.createElement('a');
                  /* Get rid of 'm.ibm.com/http/' pattern for mobile, if exists */
                  parserURL.href = fullURL.replace(/m\.ibm\.com\/https?\//,'').trim().replace(/[/?#&]+$/, "");
                  /* IE 8 and 9 don't load the attributes "protocol" and "host" in case the source URL
                   * is just a pathname, that is, "/example" and not "http://domain.com/example".
                   */
                  parserURL.href = parserURL.href;
                  var pathName = parserURL.pathname.toLowerCase();
                  if (pathName[0] !== "/") {
                     /* 2016-08-31 - jleon: TIE-163. Missing leading slash in address pathname method for IE */
                     pathName = "/" + pathName;
                  }

                  /* --- START: Patch to define pageidQueryStrings for IWM and Search pages. */
                  /* 2016-09-16 - shruti: Code optimization. Used JSON instead of if-else
                   * process each entry to look for matches based on the default value previously defined
                   */
                  for (var i = 0; i < dl.PAGEIDQUERYSTRINGSDEFAULT.length; i++) {
                     var t = dl.PAGEIDQUERYSTRINGSDEFAULT[i];               
                     if (pathName.indexOf(t.pathNameSubstring) === 0 && typeof(digitalData.page.attribute.pageidQueryStrings) == "undefined") {               
                        /* Set PageID Query Strings */ 
                        digitalData.page.attribute.pageidQueryStrings = t.qsParameter;
                        break;
                     }
                  }
                  /* --- END: Patch to define pageidQueryStrings for IWM and Search pages. */

                  /* Remove some specified index pages from path name */
                  var lastpart = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
                  /* 2016-07-29 - jleon: RTC Story# XXXXXX - Updating list of omitted default pages */
                  var omittedHTMLVersions = ["index.php","index.phtml", "index.shtml", "index.wss", "index.jsp", "index.jspa", "index.jsa", "index.htm", "index.html"];
                  for (var i = 0; i < omittedHTMLVersions.length; i++) {
                     if (omittedHTMLVersions[i] == lastpart.toLowerCase()) {
                        pathName = pathName.substring(0,pathName.lastIndexOf('/'));
                     }
                  }

                  /* Add different Query string parameters */
                  /* 2016-11-14 - jleon: Adding statement to lowercase query strings and values */
                  var qs = this.parseQueryString(parserURL.href.toLowerCase());
                  if (digitalData.page.attribute.pageidQueryStrings) {
                     var addQSValue = "";
                     for (var k=0; k < digitalData.page.attribute.pageidQueryStrings.length; k++) {
                        var q = digitalData.page.attribute.pageidQueryStrings[k].toLowerCase();
                        /* 2016-11-13 - jleon: Adding logic to identify query string that are commands to the web app. 
                         * This is to support the GRP events URLs
                         */
                        if (q.indexOf(":cmd") !== -1 && qs.hasOwnProperty(q.split(":")[0])) {
                           addQSValue += q.split(":")[0].toLowerCase() + "&";
                        }
                        else if (typeof(qs[q]) !== "undefined") {
                           addQSValue += q + "=" + qs[q] + "&";
                        }
                     }
                     addQSValue = addQSValue.replace(/&$/,"");
                     pathName = (addQSValue !== "") ? (pathName + "?" + addQSValue) : pathName;
                  }

                  /* remove trailing slash, question mark, hash, or spaces (if any) */
                  pathName = pathName.replace(/[/?#&]+$/, "").trim();
                  returnValue = parserURL.hostname + pathName;
               }
               return(returnValue);
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > calculateURLID: ' + error);
            }
         },

         /*--------------------Read Cookies function--------------------*/
         readCookies : function () {
            try {
               /* Ensure the parent objects is present, and initialize the cp object */
               digitalData.util    = digitalData.util || {};
               digitalData.util.cp = {};

               if (window.document.cookie !== "") {
                  var cookies = window.document.cookie.split(";"),
                  name, value;
                  for (var i = 0, len = cookies.length; i < len; i++) {
                     name = cookies[i].substring(0,cookies[i].indexOf('=')).trim();
                     value = cookies[i].substring(cookies[i].indexOf('=')+1);
                     digitalData.util.cp[name] = window.decodeURIComponent(value)
                  }
                  /* Now, itemize each element for the utag_main */
                  if (typeof(digitalData.util.cp.utag_main) !== "undefined") {
                     var temp;
                     cookies = digitalData.util.cp.utag_main.split("$");
                     for (var i = 0, len = cookies.length; i < len; i++) {
                        temp = cookies[i].split(":");
                        digitalData.util.cp["utag_main_" + temp[0]] = temp[1].split(";")[0];
                     }
                  }
                  /* Set value for Coremetrics Cookie ID to Digital Object */
                  if (typeof(digitalData.util.cp.CoreID6) !== "undefined") { 
                     digitalData.page.pageInfo.coremetrics.visitorID = digitalData.util.cp.CoreID6.split("&")[0];
                  }
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > readCookies: ' + error);
            }
         },

         /*--------------------Read Metadata Elements Functions--------------------*/
         readMetaData : function () {
            try {
               /* Ensure the parent objects is present, and initialize the meta object */
               digitalData.util    = digitalData.util || {};
               digitalData.util.meta = {};

               var metatags = window.document.getElementsByTagName('meta');
               for (var i = 0, len = metatags.length; i < len; i++) {
                  if (metatags[i].getAttribute("name") !== null) {
                     /* Set metadata element names in lower case */
                     digitalData.util.meta[metatags[i].getAttribute("name").toLowerCase()] = metatags[i].getAttribute("content");
                  }
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > readMetaData: ' + error);
            }
         },

         /*--------------------Set Query String Elements--------------------*/
         readQueryStrings : function () {
            try {
               /* Ensure the parent objects is present, and initialize the qp object */
               digitalData.util    = digitalData.util || {};
               digitalData.util.qp = {};

               if (window.location.search !== "") {
                  var queryString = window.location.search.substring(window.location.search.indexOf("?")+1),
                  queries = queryString.split("&"),
                  temp, i, l;
                  for (i = 0, l = queries.length; i < l; i++) {
                     temp = queries[i].split('=');
                     digitalData.util.qp[temp[0]] = window.decodeURIComponent(temp[1]);
                  }
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > readQueryStrings: ' + error);
            }
         },

         /*--------------------Get referring URL--------------------*/
         getReferringURL : function () {
            try {
               /* Ensure the parent objects is present, and initialize the referrer object */
               digitalData.util    = digitalData.util || {};
               digitalData.util.referrer = {};

               if (window.document.referrer !== "" ) {
                  /* 2016-09-16 - jleon: BMP-1480 - making sure that the referrer is set, otherwise createElement 
                   * will take by default the current URL
                   */
                  var referrerURL = document.createElement('a');
                  /* Get rid of 'm.ibm.com/http/' pattern for mobile, if exists */
                  referrerURL.href = window.document.referrer.replace(/m\.ibm\.com\/https?\//,'');
                  /* IE 8 and 9 dont load the attributes "protocol" and "host" in case the source URL
                   * is just a pathname, that is, "/example" and not "http://domain.com/example".
                   */
                  referrerURL.href = referrerURL.href;
                  digitalData.util.referrer.hash     = referrerURL.hash;
                  digitalData.util.referrer.host     = referrerURL.host;
                  digitalData.util.referrer.hostname = referrerURL.hostname;
                  digitalData.util.referrer.href     = referrerURL.href;
                  digitalData.util.referrer.origin   = referrerURL.origin;
                  digitalData.util.referrer.pathname = referrerURL.pathname;
                  digitalData.util.referrer.port     = referrerURL.port;
                  digitalData.util.referrer.protocol = referrerURL.protocol;
                  digitalData.util.referrer.search   = referrerURL.search;
               }
               else {
                  digitalData.util.referrer.hash     = "";
                  digitalData.util.referrer.host     = "";
                  digitalData.util.referrer.hostname = "";
                  digitalData.util.referrer.href     = "";
                  digitalData.util.referrer.origin   = "";
                  digitalData.util.referrer.pathname = "";
                  digitalData.util.referrer.port     = "";
                  digitalData.util.referrer.protocol = "";
                  digitalData.util.referrer.search   = "";
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > getReferringURL: ' + error);
            }
         },

         /*--------------------Coremetrics Cookie Migration [workaround]--------------------*/
         coremetricsCookieWorkaround: function () {
            try {
               /**
                *  This function checks for if the "cmTagQueue" array exists, makes a copy, then re-initializes it.
                * This is to prevent the queue from executing before the cmSetClientID gets called from the tag template.
                * Note: This required a tag template as well.
                */
               if (window.cmTagQueue) {
                  /* Check if "cmTagQueue" exists, if so make a copy */
                  window.cmTagQueue_copy = window.cmTagQueue;
                  /* Re-initialize to an empty array */
                  window.cmTagQueue = [];
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > coremetricsCookieWorkaround: ' + error);
            }
         },

         /*--------------------Add setCookie function--------------------*/
         setCookie: function (name, value, days) {
            try {
               var expires = "";
               if (days) {
                  var date = new Date();
                  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                  expires = "; expires=" + date.toUTCString();
               }
               document.cookie = name + "=" + value + expires + "; path=/";
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setCookie: ' + error);
            }
         },

         /*--------------------Add getCookie function--------------------*/
         getCookie : function (name) {
            try {
               var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
               if (match) return match[1];
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > getCookie: ' + error);
            }
         },        

         /*--------------------Add deleteCookie function--------------------*/
         deleteCookie : function (name) {
            try {
               document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > deleteCookie: ' + error);
            }
         },        

         /*--------------------Add getMobileOperatingSystem function--------------------*/
         getMobileOperatingSystem : function (name) {
            /**
             * Determine the mobile operating system based on the User Agent.
             * This function returns one of 'ios', 'android', 'windows-phone', or 'unknown'.
             *
             * @returns {String}
             */
            try {
               var os, userAgent = navigator.userAgent || navigator.vendor || window.opera;

               /* Windows Phone must come first because its UA also contains "Android" */
               if (/windows phone/i.test(userAgent)) {
                  os = "windows-phone";
               }
               else if (/android/i.test(userAgent)) {
                  os = "android";
               }
               else if (/ipad|iphone|ipod/i.test(userAgent) && !window.MSStream) {
                  /* iOS detection from: http://stackoverflow.com/a/9039885/177710 */
                  os = "ios";
               }
               else {
                  os = "unknown";
               }
               return os;            }
            catch (error) {
               dl.log('+++DBDM-ERROR > getMobileOperatingSystem: ' + error);
            }
         },

         /*--------------------Set setUserInfo from DemandBase--------------------*/
         setUserInfo : function () {
            try {
               /* Ensure the parent objects is present, and initialize the referrer object */
               digitalData.user = digitalData.user || {};
               digitalData.user.userInfo = IBMCore.common.util.user.getInfo();
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setUserInfo > IBMCore not ready: ' + error);
            }
         },        

         /*--------------------Set setUserInfo from DemandBase for v17--------------------*/
         setUserInfoV17 : function () {
            try {
               /* Ensure the parent objects is present, and initialize the referrer object */
               digitalData.user = digitalData.user || {};
               digitalData.user.userInfo = ibmweb.comusr.getInfo();

               /* Make sure that we set the registry country to the regular country if it is not set */
               digitalData.user.userInfo.registry_country_code = digitalData.user.userInfo.registry_country_code || digitalData.user.userInfo.country;

            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setUserInfoV17 > ibmweb not ready: ' + error);
            }
         },        

         /*--------------------Set Whether Coremetrics should run--------------------*/
         setCoremetricsEnabled : function () {
            try {
               if (typeof(digitalData.page.pageInfo.coremetrics.enabled) === "boolean") {
                  /* boolean value, convert to String */
                  digitalData.page.pageInfo.coremetrics.enabled = digitalData.page.pageInfo.coremetrics.enabled.toString();
               }
               else if (typeof(digitalData.page.pageInfo.coremetrics.enabled) === "string") {
                  /* ensure value is lower case */
                  digitalData.page.pageInfo.coremetrics.enabled = digitalData.page.pageInfo.coremetrics.enabled.toLowerCase();
               }
               else {
                  /* Default value - Load Coremetrics */
                  digitalData.page.pageInfo.coremetrics.enabled = "true";
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setCoremetricsEnabled: ' + error);
            }
         },

         /*--------------------Set PAGEID/URLID in DDO--------------------*/
         setPageID : function () {
            try {
               if (typeof(digitalData.page.pageInfo.urlID) !== "undefined" && typeof(digitalData.page.pageInfo.pageID) !== "undefined" 
                  && digitalData.page.pageInfo.pageID === digitalData.page.pageInfo.urlID) {
                  /* urlID has been previously defined and assigned to pageID, need to undefine pageID to make
                   * sure that it is set properly
                   */
                  digitalData.page.pageInfo.pageID = undefined;
               }
               digitalData.page.pageInfo.urlID = this.calculateURLID(window.location.href);
               if (typeof(digitalData.page.pageID) == "undefined" && typeof(digitalData.page.pageInfo.pageID) == "undefined") {
                  /* If the pageID is not provided by the page, then set it to the calculated value in urlID */
                  digitalData.page.pageInfo.pageID = digitalData.page.pageInfo.urlID;
               }
               else if (typeof(digitalData.page.pageID) !== "undefined") {
                  /* Support for old DDO definition of the pageID */
                  digitalData.page.pageInfo.pageID = digitalData.page.pageID;
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setPageID: ' + error);
            }
         },

         /*--------------------Set referral URLID and referral domain in DDO--------------------*/
         setReferringURL : function (rf) {
            try {
               digitalData.page.pageInfo.referrer = rf || digitalData.util.referrer.href;
               if (typeof(digitalData.page.pageInfo.referrer) !== "undefined" && digitalData.page.pageInfo.referrer !== "") {
                  digitalData.page.pageInfo.referrerID = this.calculateURLID(digitalData.page.pageInfo.referrer);
                  /* Get the sub domain or root domain from the referrer hostname */
                  var referrerParts = digitalData.util.referrer.hostname.split('.');
                  if (referrerParts.length < 2) {
                     /* if the hostname has less than 2 parts, then it is valid (localhost) */
                     digitalData.page.pageInfo.referrerDomain = "";
                  }
                  else if (referrerParts.length > 2) {
                     /* if the hostname has three or more parts, then substract one to get the subdomain or root domain */
                     digitalData.page.pageInfo.referrerDomain = referrerParts.splice(-1 * (referrerParts.length - 1), referrerParts.length - 1).join('.');
                  }
                  else {
                     /* if the hostname has only two parts, assume it is the root domain of the site */
                     digitalData.page.pageInfo.referrerDomain = digitalData.util.referrer.hostname;
                  }
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setReferringURL: ' + error);
            }
         },

         /*--------------------setting IBMER value--------------------*/
         setIBMer : function () {
            try {
               if (window.document.domain.indexOf("ibm.com") !== -1) {
                  /* for ibm.com sites */
                  if (String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-[^\=]*|OSCw3Session|IBM_W3SSO_ACCESS)=/)) {
                     if (typeof(digitalData.user.segment.isIBMer) == "undefined" || digitalData.user.segment.isIBMer == null) {
                        digitalData.user.segment.isIBMer = 1
                     }
                  }
                  else {
                     if (typeof(digitalData.user.segment.isIBMer) == "undefined" || digitalData.user.segment.isIBMer == null) {
                        digitalData.user.segment.isIBMer = 0
                     }
                  }
               }
               else {
                  /* 
                   * 2017.01.27 - jleon: ASSUME for non-ibm.com domains that all are non-IBMers 
                   * as the cross-domain API is no longer working 
                   */
                  digitalData.user.segment.isIBMer = 0;
                  /* for non ibm.com sites, based on API service executed in ida_stats.js */
                  // digitalData.user.segment.isIBMer = (window.NTPT_IBMer == "true") ? 1 : 0;
                  /* Get IBMISP cookie value for non ibm.com */
                  // if (window.IBMIXS) digitalData.util.cp.IBMIXS = window.IBMIXS; 
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setIBMer: ' + error);
            }
         },

         /*--------------------setting IBM ID Profile ID--------------------*/
         setProfileID : function () {
            try {
               /* 2016-07-18 - jleon: RTC Story# 967611 */
               if (typeof(digitalData.util.cp.IBMISP) !== "undefined") {
                  /* Second value of the IBMISP is the Profile ID */
                  digitalData.user.profile.uuid = digitalData.util.cp.IBMISP.split('-')[1] || "";
               }
               else if (typeof(digitalData.util.cp.IBMIXS) !== "undefined") {
                  digitalData.user.profile.uuid = digitalData.util.cp.IBMIXS.split('-')[1] || "";
               }
               else {
                  digitalData.user.profile.uuid = "";
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setProfileID: ' + error);
            }
         },

         /*--------------------Set Session ID value--------------------*/
         setSessionID : function () {
            try {
               /* Session ID is based on the Coremetrics cookie ID and the client session ID */
               if (typeof(digitalData.util.cp["50200000_clogin"]) !== "undefined") {
                  digitalData.page.session.uSessionID = digitalData.page.pageInfo.coremetrics.visitorID + "-" + (digitalData.util.cp["50200000_clogin"].split("&")[1].split("=")[1] || 'NOSESSIONID');
                  /* Unique Pageview ID is based on the unique session ID and the pageload epoch, the value is hashed */
                  digitalData.page.session.uPageViewID = this.sha256(digitalData.page.session.uSessionID + '-' + digitalData.page.session.pageloadEpoch);
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setSessionID: ' + error);
            }
         },

         /*--------------------Set Site ID--------------------*/
         setSiteID : function () {
            try {
               if (typeof(digitalData.util.qp.siteID) !== "undefined" && digitalData.util.qp.siteID !== "") {
                  /* Set siteID from query string passed on URL */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.util.qp.siteID;
               }
               else if (typeof(digitalData.page.pageInfo.ibm.siteID) !== "undefined" && digitalData.page.pageInfo.ibm.siteID !== "") {
                  /* set siteID from DDO value */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.page.pageInfo.ibm.siteID;
               }
               else if (typeof(digitalData.util.meta["ibm.wtmsite"]) !== "undefined" && digitalData.util.meta["ibm.wtmsite"] !== "") {
                  /* set siteID based on metadata element IBM.WTMSite */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.util.meta["ibm.wtmsite"];
               }
               else if (typeof(digitalData.util.meta["wtmsite"]) !== "undefined" && digitalData.util.meta["wtmsite"] !== "") {
                  /* set siteID based on metadata element WTMSite */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.util.meta["wtmsite"];
               }
               else if (typeof(digitalData.page.site) !== "undefined" && typeof(digitalData.page.site.siteID) !== "undefined" && digitalData.page.site.siteID !== "") {
                  /* set siteID from OLD DDO format value */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.page.site.siteID;
               }
               else if (window.location.href.toLowerCase().indexOf("www-935.ibm.com/services/") !== -1 && window.location.pathname.toLowerCase().match(/\/gbs\/|\/business-consulting\//)) {
                  /* GBS siteID based on URL patterns */
                  digitalData.page.pageInfo.ibm.siteID = "GBS";
               }
               else if (document.domain.toLowerCase().split('.').splice(-2, 2).join('.') === "softlayer.com") {
                  /* SOFTLAYER siteID based on current URL's domain */
                  digitalData.page.pageInfo.ibm.siteID = 'SOFTLAYER'; 
               }
               else if (window.location.href.toLowerCase().match(/www-935.ibm.com\/industries\/|www-06.ibm.com\/industries\/jp\//)) {
                  /* INDUSTRIES siteID based on URL patterns */
                  digitalData.page.pageInfo.ibm.siteID = "INDUSTRIES";
               }
               else if (typeof(digitalData.page.category.primaryCategory) !== "undefined" && digitalData.page.category.primaryCategory.toLowerCase() == "cuf04") {
                  /* Set siteID based on Category id for OSOL pages */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.page.category.primaryCategory
               }
               else if (typeof(digitalData.page.category.categoryID) !== "undefined" && digitalData.page.category.categoryID.toLowerCase() == "cuf04") {
                  /* Set siteID based on OLD DDO format Category ID for OSOL pages */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.page.category.primaryCategory;
               }
               else if (typeof(digitalData.util.meta["ibm.wtmcategory"]) !== "undefined" && digitalData.util.meta["ibm.wtmcategory"].toLowerCase() == "cuf04") {
                  /* Set siteID based on metadata Category ID for OSOL pages */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.util.meta["ibm.wtmcategory"];
               }
               else if (typeof(digitalData.page.category.primaryCategory) !== "undefined" && digitalData.page.category.primaryCategory.substring(0, 5) == "SOFDC") {
                  /* Set siteID based on Category id for developerWorks */
                  digitalData.page.pageInfo.ibm.siteID = "DEVWRKS"
               }
               else if (typeof(digitalData.page.category.categoryID) !== "undefined" && digitalData.page.category.categoryID.substring(0, 5) == "SOFDC") {
                  /* Set siteID based on OLD DDO format Category ID */
                  digitalData.page.pageInfo.ibm.siteID = "DEVWRKS";
               }
               else if (typeof(digitalData.util.meta["ibm.wtmcategory"]) !== "undefined" && digitalData.util.meta["ibm.wtmcategory"].substring(0, 5) == "SOFDC") {
                  /* 2016-09-21 - matej: Set siteID based on Category metatag for developerWorks */
                  digitalData.page.pageInfo.ibm.siteID = "DEVWRKS";
               }
               else {
                  /* Default: set siteID to IBMTESTWWW as last resort */
                  digitalData.page.pageInfo.ibm.siteID = "IBMTESTWWW";
               }
               /* Saving initial siteID */
               digitalData.page.pageInfo.ibm.iniSiteID = digitalData.page.pageInfo.ibm.siteID;

            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setSiteID: ' + error);
            }
         },

         /*--------------------setting Client ID--------------------*/
         setClientID : function () {
            try {
               /* Check if we have the latest value for siteID */
               digitalData.page.pageInfo.ibm.siteID = digitalData.page.pageInfo.ibm.siteID || "IBMTESTWWW";

               /* If the siteID prefix or suffix is "test" or if the full domain of the hostname is in 
                * the TESTDOMAINS array then set Client ID to 80200000 (test instance)
                */
               if (digitalData.page.pageInfo.ibm.siteID.toLowerCase().match(/^test|test$/) || (dl.TESTDOMAINS.split(",").indexOf(document.location.hostname.replace(/^[^\.]+./,"")) !== -1)) {
                  digitalData.page.pageInfo.coremetrics.clientID = "80200000|" + digitalData.page.pageInfo.ibm.siteID;
               }
               else {
                  digitalData.page.pageInfo.coremetrics.clientID = "50200000|" + digitalData.page.pageInfo.ibm.siteID;
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setClientID: ' + error);
            }
         },

         /*--------------------setting Category ID--------------------*/
         setCategoryID : function () {
            try {
               window.IBMPageCategory = new String();
               if (typeof(digitalData.page.category.primaryCategory) !== "undefined") {
                  IBMPageCategory = digitalData.page.category.primaryCategory;
               }
               else if (typeof(digitalData.page.category.categoryID) !== "undefined") {
                  /* for old DDO structure */
                  IBMPageCategory = digitalData.page.category.categoryID;
               }
               else {
                  IBMPageCategory = digitalData.util.meta["ibm.wtmcategory"] || "null";
               }
               /* set category ID value from page URL(requested for Watson pages) */
               if (typeof (digitalData.util.qp.Category) !== "undefined") {
                  IBMPageCategory = decodeURIComponent(digitalData.util.qp.Category);
               }

               /* for Marketplace pages add the SiteID to the category */
               if (digitalData.page.pageInfo.ibm.siteID.substring(0,4).toLowerCase() == "ecom") {
                  IBMPageCategory = digitalData.page.pageInfo.ibm.siteID + IBMPageCategory;
               }

               /* adding DC.Language value category id for Support Content delivery pages */
               if ((typeof digitalData.page.pageInfo.ibm.siteID !== "undefined") && (digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "estdbl" 
                  || digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "estkcs" || digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "estqst")) {
                  if (digitalData.util.meta["dc.language"] !== null) {
                     IBMPageCategory += "-" + digitalData.util.meta["dc.language"];
                  }
                  else if (digitalData.page.pageInfo.language) {
                     IBMPageCategory += "-" + digitalData.page.pageInfo.language;
                  }
               }

               /* 2017-02-03 - jleon: Saving initial value for Page Category */
               digitalData.page.category.iniPrimaryCategory = IBMPageCategory;

               /* IBMers from ibm.com and non-ibm.com */
               if (document.domain.indexOf("ibm.com") !== -1 && digitalData.user.segment.isIBMer) {
                  if (digitalData.page.pageInfo.ibm.siteID.substring(0,3) == "EST" || digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "serveng" 
                     || digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "extconnections"  || digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "extconnectionstest") {
                     IBMPageCategory += "IBMER";
                  }
                  else {
                     IBMPageCategory = "IBMER";
                  }
               }
               else if (document.domain.indexOf("ibm.com") == -1 && digitalData.user.segment.isIBMer) {
                  /* for non ibm.com */
                  IBMPageCategory += "IBMER";
               }

               /* Set category to error if the siteID is set to error */
               if (typeof(digitalData.page.pageInfo.ibm.siteID) !== "undefined" && digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "error") {
                  IBMPageCategory = "error";
               }

               /* 2016-07-14 - shazeeza: RTC Story# 958212 */
               digitalData.page.category.primaryCategory = IBMPageCategory;
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setCategoryID: ' + error);
            }
         },

         /*--------------------setting Search Terms from Enterprise Search--------------------*/
         setSearchTerms: function () {
            try {
               if (typeof(digitalData.util.meta["IBM.SearchTerm"]) !== "undefined") {
                  digitalData.page.pageInfo.onsiteSearchTerm = String(digitalData.util.meta["IBM.SearchTerm"]) + "";
               }
               else if (typeof(window.ibmSrchTerm) !== "undefined") {
                  digitalData.page.pageInfo.onsiteSearchTerm = window.ibmSrchTerm;
               }
               else if (document.getElementById('catalog_search_result_information') !== null) {
                  var str = (document.getElementById('catalog_search_result_information').innerHTML).replace(/[""''{}\s]+/g, '').split(',');
                  for (var i = 0; i < str.length; i++) {
                     if (str[i].split(':')[0] == 'searchTerms')
                        digitalData.page.pageInfo.onsiteSearchTerm = str[i].split(':')[1];
                  }
               }
               /* 2017-02-24 - jleon: Ensure that we decode the value for the search term - per developerWorks issue  */
               if (typeof(digitalData.page.pageInfo.onsiteSearchTerm) !== "undefined") {
                  digitalData.page.pageInfo.onsiteSearchTerm = decodeURIComponent(digitalData.page.pageInfo.onsiteSearchTerm);
               }

               if (typeof(window.ibmSrchRslts) !== "undefined") {
                  digitalData.page.pageInfo.onsiteSearchResult = window.ibmSrchRslts;
               }
               else if (document.getElementById('catalog_search_result_information') !== null) {
                  var str = (document.getElementById('catalog_search_result_information').innerHTML).replace(/[""''{}\s]+/g, '').split(',');
                  for (var i = 0; i < str.length; i++) {
                     if (str[i].split(':')[0] == 'totalResultCount')
                        digitalData.page.pageInfo.onsiteSearchResult = str[i].split(':')[1];
                  }
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setSearchTerms: ' + error);
            }
         },

         /*--------------------setting Page Header--------------------*/
         setPageHeader: function () {
            try {
               if (typeof (document.getElementsByTagName("h1")[0]) != 'undefined') {
                  digitalData.page.pageInfo.pageHeader = (document.getElementsByTagName("h1")[0].innerHTML);
                  digitalData.page.pageInfo.pageHeader = digitalData.page.pageInfo.pageHeader.replace(/(<([^>]+)>)/ig,"");
               }

            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setPageHeader: ' + error);
            }
         },

         /*--------------------Set DDO from Metadata Values--------------------*/
         setDDOFromMetadata: function () {
            try {
               digitalData.page.pageInfo.description   = digitalData.page.pageInfo.description   || digitalData.util.meta["description"] || "";
               digitalData.page.pageInfo.effectiveDate = digitalData.page.pageInfo.effectiveDate || digitalData.util.meta["ibm.effective"] || "";
               digitalData.page.pageInfo.expiryDate    = digitalData.page.pageInfo.expiryDate    || digitalData.util.meta["ibm.expires"] || "";
               digitalData.page.pageInfo.keywords      = digitalData.page.pageInfo.keywords      || digitalData.util.meta["keywords"] || "";
               digitalData.page.pageInfo.language      = digitalData.page.pageInfo.language      || digitalData.util.meta["dc.language"] || "";
               digitalData.page.pageInfo.publishDate   = digitalData.page.pageInfo.publishDate   || digitalData.util.meta["dc.date"] || "";
               digitalData.page.pageInfo.publisher     = digitalData.page.pageInfo.publisher     || digitalData.util.meta["dc.publisher"] || "";
               digitalData.page.pageInfo.rights        = digitalData.page.pageInfo.rights        || digitalData.util.meta["dc.rights"] || "";
               digitalData.page.pageInfo.version       = digitalData.page.pageInfo.version       || digitalData.util.meta["source"] || "";
               digitalData.page.pageInfo.ibm.country   = digitalData.page.pageInfo.ibm.country   || digitalData.util.meta["ibm.country"] || "";
               digitalData.page.pageInfo.ibm.industry  = digitalData.page.pageInfo.ibm.industry  || digitalData.util.meta["ibm.industry"] || "";
               digitalData.page.pageInfo.ibm.owner     = digitalData.page.pageInfo.ibm.owner     || digitalData.util.meta["owner"] || "";
               digitalData.page.pageInfo.ibm.subject   = digitalData.page.pageInfo.ibm.subject   || digitalData.util.meta["dc.subject"] || "";
               digitalData.page.pageInfo.ibm.type      = digitalData.page.pageInfo.ibm.type      || digitalData.util.meta["dc.type"] || "";
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > setDDOFromMetadata: ' + error);
            }
         },

         /*--------------------Parse the event name  --------------------*/
         parseEventName : function (eventName, count) {
            /*
             * eventName contains two parameters separated by a colon: <product_name>:<tactic_code> This function will
             * ensure that the string is not greater than 50 characters, and ensuring that the second parameter is
             * complete
             */ 
            try {
               var size = count || 256;
               size -= encodeURIComponent(eventName) - eventName.length;
               /* make sure eventName is a String */
               if (typeof(eventName) === "string") {
                  /* replace all consecutive spaces for a dash '-' */
                  eventName = eventName.replace(/\s+/g, '-').toUpperCase();
                  size -= (encodeURIComponent(eventName).length - eventName.length);
                  if (eventName.length > size) {
                     var eventNameParts = eventName.split(':');
                     if (eventNameParts.length === 1)
                        /* eventName only has one element */
                        eventName = eventName.substring(0,size);
                     else
                        eventName = eventName.substring(0,size - (eventNameParts[eventNameParts.length - 1].length - 1)) + ':' + eventNameParts[eventNameParts.length - 1];
                  }
               }
               return(eventName);
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > parseEventName: ' + error);
            }
         },

         /*--------------------Parse the event name  --------------------*/
         parseEventNameGen : function (eventName, count) {
            /*
             * Set eventName to 50 characters and return it uppercased
             */ 
            try {
               var size = count || 256;
               /* make sure eventName is a String */
               if (typeof(eventName) === "string") {
                  /* replace all consecutive spaces to one space */
                  eventName = eventName.replace(/\s+/g, '-').toUpperCase();
                  size -= (encodeURIComponent(eventName).length - eventName.length);
                  /* if eventName is bigger than 50 characters then compress it */
                  if (eventName.length > size) {
                     var ovf = Math.round((eventName.length-size)/2);
                     eventName = eventName.substring(0,(Math.round(eventName.length/2)-ovf)-1) + ".." 
                     + eventName.substring(eventName.length - ((size-(Math.round(eventName.length/2)-ovf)-1)), eventName.length);
                  }
               }
               return(eventName);
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > parseEventNameGen: ' + error);
            }
         },

         /*--------------------Function to get Demandbase User data from v18--------------------*/
         getDemandbaseUserData: function (wt) {
            try {
               var waittime = wt || dl.WAITTIME;
               /* Set userInfo from DemandBase */
               if (typeof(IBMCore) !== "undefined") {
                  /* v18+ */
                  try {
                     /* Subscribe to the user IP data ready event and call the callback when it happens,
                      * or if it already happened ".asap" one. */
                     IBMCore.common.util.user.subscribe("userIpDataReady", "customjs", dl.fn.setUserInfo).runAsap(dl.fn.setUserInfo);
                  }
                  catch (error) {
                     dl.log('+++DBDM-LOG > getDemandbaseUserData > IBMCore not ready: ' + error);
                  }
               }
               else if (typeof(ibmweb) !== "undefined") {
                  /* v17 and older */

                  if (typeof(ibmweb.comusr) !== "undefined" && typeof(ibmweb.comusr.isLoaded) !== "undefined") {
                     /* Set a timeout to kill the listener if it takes too long.
                      * Set this first in case the user info is already ready when you set the listener. */
                     var userInfoTimeout = setTimeout(function () {
                        ibmweb.queue.remove(userInfoQueue);
                        dl.log('+++DBDM-LOG > getDemandbaseUserData > User Info took too long');
                     }, waittime);

                     /* Set a listener to wait till the user IP data has been loaded, then call your function when it's available. */
                     var userInfoQueue = ibmweb.queue.push(function () {
                        return ibmweb.comusr.isLoaded();
                     }, function () {
                        /* Clear timeout since it returned in time. */
                        clearTimeout(userInfoTimeout);
                        /* Get user info now that it's ready. */
                        dl.fn.setUserInfoV17();
                     });
                  }
               }
               else {
                  dl.log('+++DBDM-LOG > getDemandbaseUserData > User Info not available');
               }
            } 
            catch (error) {
               dl.log('+++DBDM-ERROR > getDemandbaseUserData: ' + error);
            }
         },

         /*--------------------Getting the Bluemix Anonynous ID--------------------*/
         getAnonymousID: function (wt) {
            try {
               var waittime = wt || dl.WAITTIME;
               var fnStartTime = window.performance.now();

               /* See if the Anonymous ID is already in the Cookie */
               digitalData.user.profile.auid = dl.fn.getCookie('BMAID');
               if (digitalData.user.profile.auid) {
                  /* Get execution time in milliseconds */
                  var fnEndTime = window.performance.now();
                  dl.log('+++DBDM-LOG > getAnonymousID > Execution time: ' + Math.round(fnEndTime - fnStartTime) + 'ms');
               }
               else {
                  dl.log('+++DBDM-LOG > getAnonymousID > Getting anonymous ID from Bluemix (timeout set to ' + waittime + 'ms)');
                  jQuery2.ajax({
                     url: "https://console.ng.bluemix.net/analytics/bmaid",
                     method: "GET",
                     timeout: waittime,
                     success: function (response) {
                        if (response.BMAID) {
                           /* If the BMAID is set then set it to DDO and to cookie */
                           dl.fn.setCookie('BMAID', response.BMAID, 7300);
                           digitalData.user.profile.auid = response.BMAID;
                           dl.log('+++DBDM-LOG > getAnonymousID > Fetched anonymous ID from Bluemix');
                           /* Get execution time in milliseconds */
                           var fnEndTime = window.performance.now();
                           dl.log('+++DBDM-LOG > getAnonymousID > Execution time: ' + Math.round(fnEndTime - fnStartTime) + 'ms');
                        }
                     },
                     error: function (xhr, ajaxOptions, error) {
                        var fnEndTime = window.performance.now();
                        dl.log('+++DBDM-ERROR > getAnonymousID > Ajax call error: ' + error);
                        dl.log('+++DBDM-LOG > getAnonymousID > Execution time: ' + Math.round(fnEndTime - fnStartTime) + 'ms');
                     }
                  });
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > getAnonymousID: ' + error);
            }
         },

         /*--------------------Function to wrap Purchase Events  --------------------*/
         maskPurchaseEvent: function (eventAction, args) {
            try {
               if (eventAction === "5" || eventAction === "9") {
                  argsArray = Array.prototype.slice.call(args);
                  if (eventAction === "5") {
                     window["cmCreateShopAction5Tag2"].apply(this, args);
                     var eventInfo = {
                           'type'           : 'purchase-tst',
                           'eventAction'    : eventAction,
                           'productID'      : argsArray[0] || "NOTSET",
                           'productName'    : argsArray[1] || "",
                           'productQuantity': argsArray[2] || "",
                           'productPrice'   : argsArray[3] || "",
                           'productCategory': argsArray[4] || "",
                     }
                     if (typeof(argsArray[5]) !== "undefined") {
                        var attrs = argsArray[5].split("-_-");
                        for (var d = 0; d < attrs.length; d++) {
                           if (attrs[d] !== "") {
                              eventInfo["cm_ShopAction5Tag_s_a" + (d + 1).toString()] = attrs[d];
                           }
                        }
                     }
                  }
                  else {
                     window["cmCreateShopAction9Tag2"].apply(this, args);
                     var eventInfo = {
                           'type'           : 'purchase-tst',
                           'eventAction'    : eventAction,
                           'productID'      : argsArray[0] || "",
                           'productName'    : argsArray[1] || "",
                           'productQuantity': argsArray[2] || "",
                           'productPrice'   : argsArray[3] || "",
                           'registrationID' : argsArray[4] || "",
                           'orderID'        : argsArray[5] || "",
                           'orderSubtotal'  : argsArray[6] || "",
                           'productCategory': argsArray[7] || "",
                     }
                     if (typeof(argsArray[8]) !== "undefined") {
                        var attrs = argsArray[8].split("-_-");
                        for (var d = 0; d < attrs.length; d++) {
                           if (attrs[d] !== "") {
                              eventInfo["cm_ShopAction9Tag_s_a" + (d + 1).toString()] = attrs[d];
                           }
                        }
                     }
                  }
                  dl.log('+++DBDM-LOG > maskPurchaseEvent: Purchase event captured - [' + eventAction + ']: \n' + JSON.stringify(eventInfo, null, 2));
                  dl.log(args);
                  ibmStats.event(eventInfo);
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > maskPurchaseEvent: ' + error);
            }
         },
         /*--------------------Function to handle the ibmStats.event call --------------------*/
         pageClickEventHandler : function (event) {
            try {
               /* Handler for hyperlink and button events */
               var link_obj = {}, link_node = "", link_text = "", link_href = "", 
               link_hrefnq = "", link_hrefdomain = "", link_class = "", link_type = "", 
               eventName = "", eventCategoryGroup = "", link_id = "", nonWhiteSpaceLink = true;

               /* Set the target event to 'link_obj' */
               if (event.target)
                  link_obj = event.target;
               else if (event.srcElement) link_obj = event.srcElement;

               /* if the target node type is a TEXT_NODE then set 'b' to the parent Node of the target */
               if (link_obj.nodeType == 3) link_obj = link_obj.parentNode;

               /* Continue if 'link_obj' is defined */
               if (typeof (link_obj) !== 'undefined') {

                  /* Try to grab the text, class and ID of the object clicked upon, if no values, then try from the "A" node */
                  link_text = link_obj.text ? link_obj.text : link_obj.innerText ? link_obj.innerText : '';
                  link_text = encodeURIComponent(link_text);
                  link_text = decodeURIComponent(link_text.replace(/%09|%E2%96%BC/g, ""));
                  link_text = link_text.trim();
                  /* Get the class name for the click */
                  link_class = link_obj.className || "";
                  link_class = link_class.trim();
                  /* Get the ID for the clicked upon element */
                  link_id = link_obj.id || "";

                  /* Now, scan the parents until whether node 'A' or 'BUTTON' are found */
                  link_node = link_obj.nodeName.toLowerCase();
                  if (link_node !== "a" && link_node !== "button") {
                     for (var d = 0; d < dl.TOPANCESTORLEVEL; d++) {
                        if (typeof (link_obj) !== "undefined" && link_obj.parentNode) link_obj = link_obj.parentNode;
                        link_node = (link_obj !== null && link_obj.nodeName) ? link_obj.nodeName.toLowerCase() : "";
                        if (link_node === "a" || link_node === "button") break;
                     }
                  }
                  /* Continue only if node is wither 'A' or 'BUTTON' */
                  if (link_node === "a" || link_node === "button") {
                     /* Make sure that Masthead and Footer links are excluded */
                     var el = link_obj;
                     do {
                        if (el.id == "ibm-masthead" || el.id == "ibm-footer" || el.id == "ibm-footer-module" || el.className == "ibm-mobilemenu" 
                           || el.id == "ibm-common-menu" || el.id == "ibm-social-tools") {
                           nonWhiteSpaceLink = false;
                           break;
                        }
                        el = el.parentElement || el.parentNode;
                     } while ((el !== null) && (el.parentElement || el.parentNode));

                     /* Clicked on non-White-Space Link, continue. */
                     if (nonWhiteSpaceLink) {
                        if (link_node === "a") {
                           /* get the text for the Element 'A' */
                           link_text = link_text || (link_obj.text ? link_obj.text : link_obj.innerText ? link_obj.innerText : '') || "";
                           /* if the text for the element 'A' remains empty, see if it is an image and get the alink_text text */
                           if ((link_text == "" || /^\s+$/.test(link_text)) && typeof(link_obj.innerHTML) !== "undefined") {
                              link_text = link_obj.innerHTML.toLowerCase();
                              if (link_text.indexOf("<img ") > -1) {
                                 var d = link_text.indexOf('alt="');
                                 if (d > -1) {
                                    link_text = link_text.substring(d + 5, link_text.indexOf('"', d + 5));
                                 }
                                 else {
                                    d = link_text.indexOf('src="');
                                    if (d > -1) {
                                       link_text = link_text.substring(d + 5, link_text.indexOf('"', d + 5));
                                    }
                                 }
                              }
                           }
                        }
                        else {
                           /* Get the textContent from the Button */
                           link_text = link_obj.textContent ? link_obj.textContent : link_obj.innerText ? link_obj.innerText : '';
                        }
                        /* Encode text for link to exclude tabs and Black Down Pointing Triangle and leading/trailing spaces */
                        link_text = encodeURIComponent(link_text);
                        link_text = decodeURIComponent(link_text.replace(/%09|%E2%96%BC/g, ""));
                        link_text = link_text.trim();

                        /* Get the Target URL for the element */
                        link_href = link_obj.href || link_obj.formAction || "" ; 
                        if (link_href !== "" && !/^javascript:.+$|^IPT:.+$|^ipt:.+$/.test(link_href)) {
                           link_hrefnq = (link_href.split('?'))[0].toLowerCase();
                           /* Get the domain from the target URL */
                           var hrefObj = document.createElement('a');
                           hrefObj.href = link_href;
                           hrefObj.href = hrefObj.href; /* Get around issues with IE */
                           link_hrefdomain = hrefObj.hostname.split('.').splice(-2, 2).join('.');
                           /* Get rid of the protocol for the link_href value */
                           /* 20170227 - jleon: Leaving prootocol to href
                            * link_href = hrefObj.hostname + (hrefObj.pathname[0]==='/' ? hrefObj.pathname : '/'+hrefObj.pathname) + hrefObj.hash + hrefObj.search
                            */
                        }
                        else if (/^javascript:.+$|^IPT:.+$|^ipt:.+$/.test(link_href)) {
                           link_hrefnq = (link_href.split('?'))[0].toLowerCase();
                        }
                        else {
                           link_href = "Blank HREF";
                        }
                        /* Ensure that "-_-" are not present in the URL, due to Coremetrics constrain */
                        if (link_href.indexOf("-_-") !== -1) link_href = link_href.replace(/-_-/g, "---");

                        /* Get the class name for the click */
                        link_class = link_class || link_obj.className || "";
                        link_class = link_class.trim();

                        /* Get the ID for the clicked upon element */
                        link_id = link_id || link_obj.id || "";

                        /* +++ DOWNLOAD LINK: Determine if the click was done to download a file */
                        var c = dl.DOWNLOADTYPES.split(",");
                        for (var d=0; d<c.length; d++) {
                           rexp = new RegExp(c[d].toLowerCase() + '$');
                           if (rexp.test(link_hrefnq)) {
                              /* parse Query Strings */
                              var link_hrefqs = dl.fn.parseQueryString(link_href);
                              link_type = 'DOWNLOAD LINK';
                              /* For downloads eventName is set to the attachment name from the targetURL or current page */
                              eventName = link_hrefqs.attachment || link_hrefqs.FILE || link_hrefqs.attachmentName || link_hrefqs.htmlfid || digitalData.util.qp.attachment || digitalData.util.qp.FILE || digitalData.util.qp.attachmentName || digitalData.util.qp.htmlfid || link_href;
                              /* set category for LEGACY support of events */
                              eventCategoryGroup = link_text;
                              break;
                           }
                        }

                        /* +++ EXTERNAL LINK: Determine if the click was done on an non-IBM link */
                        if (link_type === "") {
                           if (dl.DOMAINLIST.split(",").indexOf(link_hrefdomain) == -1 && !/^javascript:.+$|^Blank HREF$|^IPT:.+$|^ipt:.+$/.test(link_href)) {
                              link_type = 'EXTERNAL LINK';
                              eventName = link_href;
                              /* set category for LEGACY support of events */
                              eventCategoryGroup = link_text;
                           }
                           else {
                              /* +++ PAGE CLICK: if this is not a download or an external link then set it to default */
                              link_type = 'PAGE CLICK';
                              eventName = link_href;
                              /* set category for LEGACY support of events */
                              eventCategoryGroup = link_text;
                           }
                        }

                        /* Trigger the 'pageclick' event as a element event in Coremetrics */            
                        var eventInfo = {
                              'type'               : 'pageclick',
                              'primaryCategory'    : link_type,
                              'eventName'          : eventName,
                              'eventCategoryGroup' : eventCategoryGroup,
                              'targetURL'          : link_href,
                              'targetTitle'        : link_text,
                              'targetClass'        : link_class,
                              'targetID'           : link_id
                        };
                        dl.log('+++DBDM-LOG > pageClickEventHandler: Event captured - eventInfo: \n' + JSON.stringify(eventInfo, null, 2));
                        dl.log(event);
                        ibmStats.event(eventInfo);

                        /* Trigger the conversion event for EXTERNAL LINK and DOWNLOAD */
                        if (link_type === "DOWNLOAD LINK" || link_type === "EXTERNAL LINK") {
                           var eventInfoConv = {
                                 'type'               : 'conversion',
                                 'primaryCategory'    : link_type.replace(/\s/,'-'),
                                 'eventName'          : eventName,
                                 'eventCategoryGroup' : eventCategoryGroup,
                                 'targetURL'          : link_href,
                                 'targetTitle'        : link_text,
                                 'eventAction'        : '2',
                                 'targetClass'        : link_class,
                                 'targetID'           : link_id
                           };
                           dl.log('+++DBDM-LOG > pageClickEventHandler: Triger Conversion event - eventInfoConv: \n' + JSON.stringify(eventInfoConv, null, 2));
                           dl.log(event);
                           ibmStats.event(eventInfoConv);
                        }
                     }
                     else {
                        dl.log('+++DBDM-LOG > pageClickEventHandler: Event on Masthead or Footer detected, not triggering!');
                        dl.log(event);
                     }
                  }
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > pageClickEventHandler:: ' + error);
            }
         },

         /*--------------------Function to handle the ibmStats.event call --------------------*/
         ibmStatsEventHandler : function (obj) {
            try {
               var data = new Object();
               var modifySiteID = "";

               obj.eventTriggerTime = new Date().getTime();

               dl.log('+++DBDM-LOG > ibmStatsEventHandler: Object received: ' + JSON.stringify(obj, null, 2));

               /* RTC: Story# 958230, Defect# 967620, and Defect# 967890. Adding code snippet in Support of Conversion Events. */
               if (!obj.type) {
                  /* OLD event object definition - set values to new object definition */
                  if (obj.convtype)          {obj.eventAction        = obj.convtype          || ""; delete obj.convtype;}
                  if (obj.ibmEV)             {obj.primaryCategory    = obj.ibmEV             || ""; delete obj.ibmEV;}
                  if (obj.ibmEvAction)       {obj.eventName          = obj.ibmEvAction.toString() || ""; delete obj.ibmEvAction;}
                  if (obj.ibmEvName)         {obj.eventCategoryGroup = obj.ibmEvName.toString()   || ""; delete obj.ibmEvName;}
                  if (obj.point)             {obj.eventPoints        = obj.point             || ""; delete obj.point;}
                  if (obj.ibmEvGroup)        {obj.executionPath      = obj.ibmEvGroup        || ""; delete obj.ibmEvGroup;}
                  if (obj.ibmEvModule)       {obj.eventCallBackCode  = obj.ibmEvModule       || ""; delete obj.ibmEvModule;}
                  if (obj.ibmEvSection)      {obj.execPathReturnCode = obj.ibmEvSection      || ""; delete obj.ibmEvSection;}
                  if (obj.ibmEvTarget)       {obj.targetURL          = obj.ibmEvTarget       || ""; delete obj.ibmEvTarget;}
                  if (obj.ibmEvLinkTitle)    {obj.targetTitle        = obj.ibmEvLinkTitle    || ""; delete obj.ibmEvLinkTitle;}
                  if (obj.ibmEvFileSize)     {obj.targetSize         = obj.ibmEvFileSize     || ""; delete obj.ibmEvFileSize;}
                  if (obj.ibmEvVidStatus)    {obj.eventVidStatus     = obj.ibmEvVidStatus    || ""; delete obj.ibmEvVidStatus;}
                  if (obj.ibmEvVidTimeStamp) {obj.eventVidTimeStamp  = obj.ibmEvVidTimeStamp.toString() || ""; delete obj.ibmEvVidTimeStamp;}
                  if (obj.ibmEvVidLength)    {obj.eventVidLength     = obj.ibmEvVidLength    || ""; delete obj.ibmEvVidLength;}
                  if (obj.proID)             {obj.productID          = obj.proID             || ""; delete obj.proID;}
                  if (obj.proName)           {obj.productName        = obj.proName           || ""; delete obj.proName;}
                  if (obj.cm_vc)             {obj.virtualCategory    = obj.cm_vc             || ""; delete obj.cm_vc;}
                  if (obj.serviceType)       {obj.productServiceType = obj.serviceType       || ""; delete obj.serviceType;}
                  if (obj.proCategory)       {obj.primaryCategory    = obj.proCategory       || ""; delete obj.proCategory;}

                  if (obj.ibmConversion && obj.ibmConversion == "true") {
                     if (!obj.eventPoints && obj.eventAction && obj.eventAction == "1") obj.eventPoints = '10';
                     if (!obj.eventPoints && obj.eventAction && obj.eventAction == "2") obj.eventPoints = '20';
                     obj.type = "conversion";
                  }
                  else if (obj.ibmProductTag && obj.ibmProductTag == "true") {
                     obj.type = "product";
                  }
                  else if (obj.primaryCategory.toLowerCase().indexOf("rich_media_service") !== -1 || obj.primaryCategory.toLowerCase().indexOf("video player") !== -1) {
                     obj.type = "video";
                     var ibmEvAction = obj.eventName || "";
                     obj.eventName = obj.eventCategoryGroup || "";
                     obj.eventCategoryGroup = ibmEvAction;
                     obj.eventVidTimeStamp = obj.eventVidTimeStamp || "";
                  }
                  else {
                     obj.type = "element";
                  }
               }

               /* Set name and ID for event */
               if (obj.type === "conversion") {
                  obj.event_name = "ibmStatsEvent_conversion";
                  obj.cm_ConversionEventTag_cid = dl.fn.parseEventNameGen(obj.eventName,256);
               }
               else if (obj.type === "pageclick") {
                  obj.event_name = "ibmStatsEvent_element";
                  obj.cm_ElementTag_eid = dl.fn.parseEventNameGen(obj.eventName,50);
               }
               else if (obj.type === "product") {
                  obj.event_name = "ibmStatsEvent_product";
               }
               else if (obj.type === "purchase") {
                  obj.event_name = "ibmStatsEvent_purchase";
               }
               else if (obj.type === "video" ) {
                  obj.event_name = "ibmStatsEvent_element";
                  obj.cm_ElementTag_eid = dl.fn.parseEventNameGen(obj.eventName,50);
               }
               else {
                  obj.event_name = "ibmStatsEvent_element";
                  obj.cm_ElementTag_eid = dl.fn.parseEventNameGen(obj.eventName,50);
               }

               /* Set EventType for Data Layer */
               obj.eventType = obj.type;
               obj.destinationURL = digitalData.page.pageInfo.destinationURL;

               /* Ensure to replace coremetrics attribute separator '-_-' with '---' to avoid shifting */
               var statsObjListString = JSON.stringify(obj).replace(/-_-/g,"---");
               data = JSON.parse(statsObjListString);

               if (data.type !== "product") {
                  if (data.type == "video") {
                     /* data.primaryCategory = "VIDEO - " + digitalData.page.pageInfo.ibm.siteID; */
                     if (data.eventVidTimeStamp.toLowerCase() == "start" || data.eventCategoryGroup.toLowerCase() == "start") {
                        var dataConversion = JSON.parse(JSON.stringify(data));
                        dataConversion.event_name="ibmStatsEvent_conversion";
                        dataConversion.type = dataConversion.eventType = "conversion"
                           dataConversion.cm_ConversionEventTag_cid = dl.fn.parseEventNameGen(obj.eventName,256);
                        delete dataConversion.cm_ElementTag_eid;
                        dataConversion.eventAction = 1;
                        dl.log('+++DBDM-LOG > ibmStatsEventHandler: Event captured - ' + dataConversion.type + ': \n' + JSON.stringify(dataConversion, null, 2));
                        dl.fn.event("link", dataConversion);
                     }
                     else if (data.eventVidTimeStamp.toLowerCase() == "end" || data.eventCategoryGroup.toLowerCase() == "finish") {
                        var dataConversion = JSON.parse(JSON.stringify(data));
                        dataConversion.event_name="ibmStatsEvent_conversion";
                        dataConversion.type = dataConversion.eventType = "conversion"
                           dataConversion.cm_ConversionEventTag_cid = dl.fn.parseEventNameGen(obj.eventName,256);
                        delete dataConversion.cm_ElementTag_eid;
                        dataConversion.eventAction = 2;
                        dl.log('+++DBDM-LOG > ibmStatsEventHandler: Event captured - ' + dataConversion.type + ': \n' + JSON.stringify(dataConversion, null, 2));
                        dl.fn.event("link", dataConversion);
                     }
                  }
                  dl.log('+++DBDM-LOG > ibmStatsEventHandler: Event captured - ' + data.type + ': \n' + JSON.stringify(data, null, 2));
                  dl.fn.event("link", data);
               }
               else {
                  /* For checking the Product Id from previous ECOM pages */
                  if (digitalData.page.pageInfo.ibm.iniSiteID.toLowerCase().indexOf("ecom") !== -1 || digitalData.page.pageInfo.ibm.siteID.toLowerCase().indexOf("ecom") !== -1) {
                     var prevProdID = dl.fn.getCookie("prevProdID");
                     if (prevProdID !== null && typeof(digitalData.product) !== "undefined" && typeof(digitalData.product[0].productInfo.productID) !== "undefined") {
                        if (digitalData.product[0].productInfo.productID == prevProdID) data.event_name = "doNotFire";
                     }
                     dl.fn.setCookie("prevProdID", obj.productID);
                  }
                  if (data.event_name !== "doNotFire") {
                     dl.log('+++DBDM-LOG > ibmStatsEventHandler: Event captured - ' + data.type + ': \n' + JSON.stringify(data, null, 2));
                     dl.fn.event("link", data); 
                  }
               }
               /* print out the data layer available for the event */
               dl.log(data);
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > ibmStatsEventHandler: ' + error);
            }
         },

         /*--------------------Function to handle the ibmStats.event call --------------------*/
         ibmStatsEventInit : function () {
            try {
               window.ibmStats = window.ibmStats || {};

               if (typeof(ibmStats.event) === "undefined" || (typeof(ibmStats.event) === "function" && ibmStats.event.isGhost)) {
                  /*-------------------- ibmStats.event handler--------------------*/
                  ibmStats.event = function (obj) {
                     /* Ensure that the digitalData Object has not been reset by the page */
                     if (typeof(digitalData.page.isDataLayerReady) === "undefined") {
                        dl.init(0);
                        dl.log('+++DBDM-WARNING > marketing-events.js: digitalData was reset, recreating datalayer');
                     }
                     dl.fn.ibmStatsEventHandler(obj);
                  };
               }
               if (typeof(createPageviewTagForSPA) === "undefined" || (typeof(createPageviewTagForSPA) === "function" && createPageviewTagForSPA.isGhost)) {
                  /*-------------------- Ajax function to bind page view tag -----------------------------*/
                  window.createPageviewTagForSPA = function() {
                     if (window.pageviewSPA) {
                        /* Initialize Data Layer */
                        dl.log('+++DBDM-LOG > bindPageViewWithAnalytics > Initializing Data Layer.');
                        dl.init(1);
                        /* Set referring URL to current page */
                        dl.fn.setReferringURL(window.referrerSPA);
                        /* Save the current URL for SPAs */
                        window.referrerSPA = digitalData.page.pageInfo.destinationURL;
                        /************************* SEND PAGEVIEW **********************************/
                        dl.log('+++DBDM-LOG: Sending pageview tag to Coremetrics');
                        /* flatten the DDO into dl.data */
                        data = {};
                        dl.fn.event("view", data);
                     }
                     else {
                        /* Do not run pageview twice for SPAs */
                        window.pageviewSPA = true;
                     }
                  }
                  /* Support legacy calls to bindPageViewWithAnalytics */
                  window.bindPageViewWithAnalytics = createPageviewTagForSPA;
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > ibmStatsEventInit: ' + error);
            }
         },

         /*--------------------Function to load remote scripts --------------------*/
         loadScript : function (script,callback) {
            try {
               var a = script,
               b = document,
               c = 'script',
               d = b.createElement(c);
               d.src = a;
               d.type = 'text/java' + c;
               d.async = true;
               a = b.getElementsByTagName(c)[0];
               a.parentNode.insertBefore(d,a);
               d.onload = callback || function () {
                  dl.log('+++DBDM-LOG > Script loaded: ' + d.src);
               }
            }
            catch (error) {
               dl.log('+++DBDM-ERROR > loadScript: ' + error);
            }
         },

         /*--------------------Function to handle event calls --------------------*/
         event : function (a,b) {
            try {

               /************************* PRE-EVENT **********************************/
               /* Ensure that the digitalData Object has not been reset by the page */
               if (typeof(window.digitalData.page.isDataLayerReady) === "undefined") {
                  datalayer.init(0);
                  datalayer.log('+++DBDM-LOG > ibm-common.js: digitalData was reset, recreating datalayer');
               }
               /* Ensure that we capture the CoreID6 cookie ID */
               if (typeof(window.digitalData.page.pageInfo.coremetrics.visitorID) === "undefined") {
                  datalayer.fn.readCookies();
                  datalayer.log('+++DBDM-LOG > ibm-common.js: Reading first-party cookies');
               }
               /* Ensure that we capture the anonymous ID from the cookie */
               if (typeof(window.digitalData.user.profile.auid) === "undefined") {
                  digitalData.user.profile.auid = datalayer.fn.getCookie('BMAID');
               }
               /* Refresh the search terms and results */
               if (typeof(digitalData.page.pageInfo.onsiteSearchTerm) !== "undefined") {
                  datalayer.util.setSearchTerms();
               }

               /************************* SEND COREMETRICS EVENT **********************************/
               dl.log('+++DBDM-LOG > event: Execute ' + a + ' event');
               /* flatten the DDO into object */
               dl.fn.processDataObject(digitalData, b);
               cm.exec(a, b);

               /************************* POST-EVENT **********************************/

            }
            catch (error) {
               dl.log('+++DBDM-ERROR > event: ' + error);
            }
         },
   };

   /*--------------------Init Function for DataLayer--------------------*/
   dl.init = function (r) {
      try {
         var reset = r || 0;

         /* Set up digitalData object */
         window.digitalData = window.digitalData || {};

         digitalData.page = digitalData.page || {};
         digitalData.user = digitalData.user || {};
         digitalData.util = digitalData.util || {};

         digitalData.page.attribute  = digitalData.page.attribute || {};
         digitalData.page.category   = digitalData.page.category  || {};
         digitalData.page.pageInfo   = digitalData.page.pageInfo  || {};
         digitalData.page.session    = digitalData.page.session   || {};
         digitalData.user.profile    = digitalData.user.profile   || {};
         digitalData.user.segment    = digitalData.user.segment   || {};
         digitalData.user.userInfo   = digitalData.user.userInfo  || {};
         digitalData.util.cp         = digitalData.util.cp        || {};
         digitalData.util.meta       = digitalData.util.meta      || {};
         digitalData.util.qp         = digitalData.util.qp        || {};
         digitalData.util.referrer   = digitalData.util.referrer  || {};

         digitalData.page.category.ibm         = digitalData.page.category.ibm || {};
         digitalData.page.pageInfo.ibm         = digitalData.page.pageInfo.ibm || {};
         digitalData.page.pageInfo.coremetrics = digitalData.page.pageInfo.coremetrics || {};
         digitalData.page.pageInfo.tealium     = digitalData.page.pageInfo.tealium || {};
         digitalData.page.pageInfo.metrics     = digitalData.page.pageInfo.metrics || {};
         digitalData.page.pageInfo.optimizely  = digitalData.page.pageInfo.optimizely || {};
         digitalData.page.pageInfo.hotjar      = digitalData.page.pageInfo.hotjar || {};
         digitalData.page.pageInfo.convertro   = digitalData.page.pageInfo.convertro || {};
         digitalData.page.isDataLayerReady     = false;

         /*--------------------setting page loading time--------------------*/
         dl.fn.setPageLoadEpoch(reset); 

         /*--------------------Coremetics Cookie Migration [workaround]--------------------*/
         dl.fn.coremetricsCookieWorkaround();

         /*--------------------Get Mobile OS for User Agent--------------------*/
         digitalData.page.attribute.agentMobileOS = dl.fn.getMobileOperatingSystem();

         /*--------------------Set Cookies--------------------*/
         dl.fn.readCookies();

         /*--------------------Set Metadata Elements--------------------*/
         dl.fn.readMetaData();

         /*--------------------Set Query String Elements--------------------*/
         dl.fn.readQueryStrings();

         /*--------------------Get referring URL--------------------*/
         dl.fn.getReferringURL();

         /*--------------------Set PAGEID/URLID in DDO--------------------*/
         dl.fn.setPageID();

         /*--------------------Set referral URLID and referral domain in DDO--------------------*/
         dl.fn.setReferringURL();

         /*--------------------Set IBMER value--------------------*/
         dl.fn.setIBMer();

         /*--------------------Set IBM ID Profile ID--------------------*/
         dl.fn.setProfileID();

         /*--------------------Set Session ID value--------------------*/
         dl.fn.setSessionID();

         /*--------------------Set Site ID--------------------*/
         dl.fn.setSiteID();

         /*--------------------setting Client ID--------------------*/
         dl.fn.setClientID();

         /*--------------------setting Category ID--------------------*/
         dl.fn.setCategoryID();

         /*--------------------demandBase User Data--------------------*/
         //dl.fn.getDemandbaseUserData();

         /*--------------------get anonymous ID from Bluemix--------------------*/
         dl.fn.getAnonymousID(2000);

         /*--------------------setting Search Terms from Enterprise Search--------------------*/
         dl.fn.setSearchTerms();

         /*--------------------setting Page Header--------------------*/
         dl.fn.setPageHeader()

         /*--------------------Set DDO from Metadata Valuesr--------------------*/
         dl.fn.setDDOFromMetadata();

         /*--------------------Set Destination URL--------------------*/
         digitalData.page.pageInfo.destinationURL = window.location.href || "";

         /*--------------------Set Destination URL Domain--------------------*/
         digitalData.page.pageInfo.destinationDomain = document.domain.split('.').splice(-2, 2).join('.') || "";
         if ( digitalData.page.pageInfo.destinationDomain === "github.io") {
            /* 2017-03-02 - jleon: Domain name for github.io needs another level up - ibm-bluemix.github.io */
            digitalData.page.pageInfo.destinationDomain = document.domain.split('.').splice(-3, 3).join('.');
         }

         /*--------------------Set Page Name--------------------*/
         digitalData.page.pageInfo.pageName = document.title || "";

         /*--------------------Set DLE ID for Page--------------------*/
         digitalData.page.pageInfo.dleID = dl.fn.sha256(digitalData.page.pageInfo.urlID);

         /*--------------------Load Coremetrics Tags by Default--------------------*/
         dl.fn.setCoremetricsEnabled();
         digitalData.page.pageInfo.coremetrics.isEluminateLoaded = false;
      }
      catch (error) {
         dl.log('+++DBDM-ERROR > init: ' + error);
      }
   };

   /**
    *
    ************************************************MODULE: BORROWED CODE FROM TEALIUM TO SHORTEN DDO*******************
    *
    */
   dl.ddo_to_shortname_map = {
         "digitalData.": "ddo.",
         "digitalData.page.": "ddo.p.",
         "digitalData.page.attribute.": "ddo.p.a.",
         "digitalData.page.category.": "ddo.p.c.",
         "digitalData.page.pageInfo.": "ddo.p.pi.",
         "digitalData.page.pageInfo.metrics.": "ddo.p.pi.m.",
         "digitalData.page.session.": "ddo.p.s.",
         "digitalData.user.": "ddo.u.",
         "digitalData.user.profile.": "ddo.u.p.",
         "digitalData.user.segment.": "ddo.u.s.",
         "digitalData.user.userInfo.": "ddo.u.ui.",
         "digitalData.product.": "ddo.pr.",
         "digitalData.product.productInfo.": "ddo.pr.pri.",
         "digitalData.util.cp.": "cp.",
         "digitalData.util.meta.": "meta.",
         "digitalData.util.qp.": "qp."
   }

   //Build shortname_to_ddo_map
   dl.shortname_to_ddo_map = {};
   Object.keys(dl.ddo_to_shortname_map).forEach(function (key) {
      dl.shortname_to_ddo_map[dl.ddo_to_shortname_map[key]] = key;
   });

   dl.fn.getShortName = function (name) {
      var nameParts = name.split(".");
      for (var i = nameParts.length; i > 0; i--) {
         var testName = nameParts.slice(0, (i)).join('.') + '.';
         if (dl.ddo_to_shortname_map[testName]) {
            return dl.ddo_to_shortname_map[testName] + nameParts.slice(i, nameParts.length).join('.');
         }
      }
      return name;
   }

   dl.fn.getLongName = function (name) {
      var nameParts = name.split(".");
      for (var i = nameParts.length; i > 0; i--) {
         var testName = nameParts.slice(0, (i)).join('.') + '.';
         if (dl.shortname_to_ddo_map[testName]) {
            return dl.shortname_to_ddo_map[testName] + nameParts.slice(i, nameParts.length).join('.');
         }
      }
      return name;
   };

   dl.fn.typeOf = function(e){return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();}

   //Ignore keys in the data layer that start with the following text.
   //Expecting an object of strings
   dl.ignore_keys = {
         //"util": 1
   };

   //Specify a prefix for data layer elements being sent to the utag_data object.
   //Instead of utag_data.productID, it could be utag_data.dl_productID
   dl.prefix = "digitalData.";

   //In cases of a nested object, what should join the parent key and child key
   dl.nested_delimiter = ".";

   dl.fn.ignoreKey = function (key) {
      var should_ignore_key = 0;
      //Loop through the ignore_keys array to see if we should ignore this key
      Object.keys(dl.ignore_keys).forEach(function (name) {
         var re = new RegExp("^" + name);
         // console.log(re);
         if (key.match(re)) {
            should_ignore_key = 1;
            // try{
            // console.log('Ignoring key: '+key);
            // }catch(e){
            // }
         }
      });
      return should_ignore_key;
   };

   dl.fn.processDataObject = function (obj, new_obj, parent_key, create_array) {
      if (typeof parent_key === "undefined") {
         //This object isn't nested in another object
         parent_key = "";
      }
      else {
         //Add the nested_delimiter to the parent key
         parent_key += "" + dl.nested_delimiter;
      }
      Object.keys(obj).forEach(function (key) {
         var nested_key_name = parent_key + key;
         //Format the new key name and take out any whitespace
         var new_key_name = (dl.prefix + parent_key + key).replace(/\s/g, '');
         if (typeof obj[key] !== 'undefined' && obj[key] != null) {
            if ((typeof obj[key]).match(/boolean|string|number/) && !dl.fn.ignoreKey(key)) {
               //Update new_key_name to the shortened version of the name
               var temp_parent_key = parent_key.indexOf(dl.prefix) < 0 ? (dl.prefix + parent_key).replace(/\s/g, '') : parent_key.replace(/\s/g, '');
               new_key_name = dl.fn.getShortName(temp_parent_key) + key.replace(/\s/g, '');
               // if(dl.ddo_to_shortname_map[temp_parent_key]){
               //   new_key_name = dl.ddo_to_shortname_map[temp_parent_key]+key.replace(/\s/g, '');
               // }
               if (create_array) {
                  //First check to see if this key exists
                  if (dl.fn.typeOf(new_obj[new_key_name]) !== "array") {
                     //Make the key an array
                     new_obj[new_key_name] = [];
                  }
                  new_obj[new_key_name].push("" + obj[key]); //Force value to be a string
               }
               else {
                  //If the value of the key is a boolean or a string or a number and
                  //the key shouldn't be ignored add to the data layer
                  new_obj[new_key_name] = "" + obj[key]; //Force value to be a string
               }
            }
            else if (dl.fn.typeOf(obj[key]) === 'object' && !dl.fn.ignoreKey(key)) {
               //Process this piece of the data layer and merge it
               dl.fn.processDataObject(obj[key], new_obj, nested_key_name, create_array);
            }
            else if (dl.fn.typeOf(obj[key]) === 'array') {
               dl.fn.processDataArray(obj[key], new_obj, nested_key_name);
            }
         }
      });
   };

   dl.fn.processDataArray = function (obj, new_obj, parent_key) {
      if (typeof parent_key === "undefined") {
         //This object isn't nested in another object
         parent_key = "";
      }
      else {
         //Add the nested_delimiter to the parent key
         parent_key += "" + dl.nested_delimiter;
      }
      //Format the new key name and take out any whitespace
      var new_key_name = (dl.prefix + parent_key).replace(/\s/g, '');
      for (var n = 0; n < obj.length; n++) {
         if ((typeof obj[n]).match(/boolean|string|number/)) {
            //Update new_key_name to the shortened version of the name
            new_key_name = dl.fn.getShortName(new_key_name);
            // if(dl.ddo_to_shortname_map[new_key_name]){
            //   new_key_name = dl.ddo_to_shortname_map[new_key_name];
            // }
            //First check to see if this key exists
            if (dl.fn.typeOf(new_obj[new_key_name]) !== "array") {
               //Make the key an array
               new_obj[new_key_name] = [];
            }
            //If the value of the key is a boolean or a string or a number and
            //the key shouldn't be ignored add to the data layer
            new_obj[new_key_name].push("" + obj[n]);
         }
         else if (dl.fn.typeOf(obj[n]) === 'object') {
            Object.keys(obj[n]).forEach(function (array_key) {
               var temp_obj = obj[n];
               //Format the new key name and take out any whitespace
               array_key_name = (new_key_name + array_key).replace(/\s/g, '');
               if (typeof temp_obj[array_key] !== 'undefined' && temp_obj[array_key] != null) {
                  if ((typeof temp_obj[array_key]).match(/boolean|string|number/) && !dl.fn.ignoreKey(array_key)) {
                     //Update new_key_name to the shortened version of the name
                     array_key_name = dl.fn.getShortName(new_key_name) + array_key.replace(/\s/g, '');
                     // if(dl.ddo_to_shortname_map[new_key_name]){
                     //   array_key_name = dl.ddo_to_shortname_map[new_key_name]+array_key.replace(/\s/g, '');
                     // }
                     //First check to see if this key exists
                     if (typeof new_obj[array_key_name] === "undefined") {
                        //Make the key an array
                        new_obj[array_key_name] = [];
                     }
                     //If the value of the key is a boolean or a string or a number and
                     //the key shouldn't be ignored add to the data layer
                     new_obj[array_key_name].push("" + temp_obj[array_key]); //Force value to be a string
                  }
                  else if (dl.fn.typeOf(temp_obj[array_key]) === 'object') {
                     dl.fn.processDataObject(temp_obj[array_key], new_obj, array_key_name, 1);
                  }
                  else if (dl.fn.typeOf(temp_obj[array_key]) === 'array') {
                     dl.fn.processDataArray(temp_obj[array_key], new_obj, array_key_name);
                  }
               }
            });
         }
      }
   };

   /**
    * 
    ************************************************MODULE: COREMETRICS ************************************************
    *
    */
   var coremetrics = {};
   window.cm = coremetrics;
   cm.initialized = false;
   cm.scriptloaded = false;
   cm.queue = [];
   cm.event_lookup = {
         "pageview"    : "1",
         "registration": "2",
         "order"       : "3",
         "purchase"    : "3",
         "shopaction9" : "3",
         "cart"        : "4",
         "shopaction5" : "4",
         "productview" : "5",
         "prodview"    : "5",
         "conversionevent": "14",
         "conversion"  : "14",
         "element"     : "15"
   };
   cm.map = {
         /* Global settings */
         "ddo.p.pi.coremetrics.clientID": "ClientID",
         "cm_TestClientID": "TestClientID",
         "cm_TestDataCollectionMethod": "TestDataCollectionMethod",
         "cm_TestDataCollectionDomain": "TestDataCollectionDomain",
         "cm_cmSetupOther": "cmSetupOther",
         "ddo.p.pi.destinationURL": "ManualPageviewTag_ul",
         "ddo.p.pi.destinationDomain": "CookieDomain",
         "ddo.p.pi.referrer": "ManualPageviewTag_rf",
         /* Pageview tag */
         "ddo.p.pi.pageID": "PageviewTag_pi",
         "ddo.p.c.primaryCategory": "PageviewTag_cg,ConversionEventTag_c_a11,ElementTag_e_a11,ProductviewTag_pr_a11",
         "ddo.p.pi.onsiteSearchTerm": "PageviewTag_se",
         "ddo.p.pi.onsiteSearchResult": "PageviewTag_sr",
         "ddo.u.s.isIBMer": "PageviewTag_pv_a1,ConversionEventTag_c_a21,ElementTag_e_a21",
         "ddo.p.pi.ibm.country": "PageviewTag_pv_a2",
         "ddo.p.pi.language": "PageviewTag_pv_a3",
         "ddo.p.pi.effectiveDate": "PageviewTag_pv_a4",
         "ddo.p.pi.ibm.subject": "PageviewTag_pv_a5",
         "ddo.p.pi.ibm.type": "PageviewTag_pv_a6",
         "ddo.p.pi.version": "PageviewTag_pv_a7",
         "ddo.p.pi.ibm.owner": "PageviewTag_pv_a8",
         "ddo.p.pi.description": "PageviewTag_pv_a9",
         "ddo.p.pi.pageName": "PageviewTag_pv_a10",
         "ddo.p.pi.ibm.industry": "PageviewTag_pv_a11",
         "ddo.p.pi.urlID": "PageviewTag_pv_a12,ConversionEventTag_c_a12,ElementTag_e_a12,ProductviewTag_pr_a12",
         "ddo.p.pi.referrerID": "PageviewTag_pv_a13",
         "ddo.p.pi.referrerDomain": "PageviewTag_pv_a14",
         "ddo.p.pi.expiryDate": "PageviewTag_pv_a15",
         "ddo.u.p.uuid": "PageviewTag_pv_a16",
         "ddo.u.p.auid": "PageviewTag_pv_a17",
         "ddo.p.s.pageloadEpoch": "PageviewTag_pv_a18,ConversionEventTag_c_a18,ElementTag_e_a18,ProductviewTag_pr_a18",
         "ddo.p.s.uPageViewID": "PageviewTag_pv_a19,ConversionEventTag_c_a19,ElementTag_e_a19,ProductviewTag_pr_a19",
         "ddo.p.pi.pageHeader": "PageviewTag_pv_a20",
         "cm_PageViewTag_pv_a21": "PageviewTag_pv_a21",
         "cm_PageViewTag_pv_a22": "PageviewTag_pv_a22",
         "cm_PageViewTag_pv_a23": "PageviewTag_pv_a23",
         "cm_PageViewTag_pv_a24": "PageviewTag_pv_a24",
         "cm_PageViewTag_pv_a25": "PageviewTag_pv_a25",
         "cm_PageViewTag_pv_a26": "PageviewTag_pv_a26",
         "cm_PageViewTag_pv_a27": "PageviewTag_pv_a27",
         "cm_PageViewTag_pv_a28": "PageviewTag_pv_a28",
         "cm_PageViewTag_pv_a29": "PageviewTag_pv_a29",
         "cm_PageViewTag_pv_a30": "PageviewTag_pv_a30",
         "cm_PageViewTag_pv_a31": "PageviewTag_pv_a31",
         "cm_PageViewTag_pv_a32": "PageviewTag_pv_a32",
         "cm_PageViewTag_pv_a33": "PageviewTag_pv_a33",
         "cm_PageViewTag_pv_a34": "PageviewTag_pv_a34",
         "cm_PageViewTag_pv_a35": "PageviewTag_pv_a35",
         "cm_PageViewTag_pv_a36": "PageviewTag_pv_a36",
         "cm_PageViewTag_pv_a37": "PageviewTag_pv_a37",
         "cm_PageViewTag_pv_a38": "PageviewTag_pv_a38",
         "cm_PageViewTag_pv_a39": "PageviewTag_pv_a39",
         "cm_PageViewTag_pv_a40": "PageviewTag_pv_a40",
         "cm_PageViewTag_pv_a41": "PageviewTag_pv_a41",
         "cm_PageViewTag_pv_a42": "PageviewTag_pv_a42",
         "ddo.p.c.ibm.globalBrandTableL10": "PageviewTag_pv_a43",
         "ddo.p.c.ibm.globalBrandTableL17": "PageviewTag_pv_a44",
         "ddo.p.c.ibm.globalBrandTableL20": "PageviewTag_pv_a45",
         "ddo.p.c.ibm.globalBrandTableL30": "PageviewTag_pv_a46",
         "cm_PageViewTag_pv_a47": "PageviewTag_pv_a47",
         "ddo.p.pi.publisher": "PageviewTag_pv_a48",
         "ddo.p.pi.publishDate": "PageviewTag_pv_a49",
         "ddo.p.pi.keywords": "PageviewTag_pv_a50",
         /* Product tag */
         "productID": "ProductviewTag_pr",
         "productName": "ProductviewTag_pm",
         "virtualCategory": "ProductviewTag_cm_vc",
         "cm_ProductviewTag_pr_a1": "ProductviewTag_pr_a1",
         "cm_ProductviewTag_pr_a2": "ProductviewTag_pr_a2",
         "cm_ProductviewTag_pr_a3": "ProductviewTag_pr_a3",
         "cm_ProductviewTag_pr_a4": "ProductviewTag_pr_a4",
         "cm_ProductviewTag_pr_a5": "ProductviewTag_pr_a5",
         "cm_ProductviewTag_pr_a6": "ProductviewTag_pr_a6",
         "cm_ProductviewTag_pr_a7": "ProductviewTag_pr_a7",
         "cm_ProductviewTag_pr_a8": "ProductviewTag_pr_a8",
         "cm_ProductviewTag_pr_a9": "ProductviewTag_pr_a9",
         /* Shop5 tag */
         "cm_ShopAction5Tag_pr": "ShopAction5Tag_pr",
         "cm_ShopAction5Tag_pm": "ShopAction5Tag_pm",
         "cm_ShopAction5Tag_qt": "ShopAction5Tag_qt",
         "cm_ShopAction5Tag_bp": "ShopAction5Tag_bp",
         "cm_ShopAction5Tag_cg": "ShopAction5Tag_cg",
         "cm_ShopAction5Tag_s_a1": "ShopAction5Tag_s_a1",
         "cm_ShopAction5Tag_s_a2": "ShopAction5Tag_s_a2",
         "cm_ShopAction5Tag_s_a3": "ShopAction5Tag_s_a3",
         "cm_ShopAction5Tag_s_a4": "ShopAction5Tag_s_a4",
         "cm_ShopAction5Tag_s_a5": "ShopAction5Tag_s_a5",
         "cm_ShopAction5Tag_s_a6": "ShopAction5Tag_s_a6",
         "cm_ShopAction5Tag_s_a7": "ShopAction5Tag_s_a7",
         "cm_ShopAction5Tag_s_a8": "ShopAction5Tag_s_a8",
         "cm_ShopAction5Tag_s_a9": "ShopAction5Tag_s_a9",
         "cm_ShopAction5Tag_s_a10": "ShopAction5Tag_s_a10",
         "cm_ShopAction5Tag_sx1": "ShopAction5Tag_sx1",
         "cm_ShopAction5Tag_sx2": "ShopAction5Tag_sx2",
         "cm_ShopAction5Tag_sx3": "ShopAction5Tag_sx3",
         "cm_ShopAction5Tag_sx4": "ShopAction5Tag_sx4",
         "cm_ShopAction5Tag_sx5": "ShopAction5Tag_sx5",
         "cm_ShopAction5Tag_sx6": "ShopAction5Tag_sx6",
         "cm_ShopAction5Tag_sx7": "ShopAction5Tag_sx7",
         "cm_ShopAction5Tag_sx8": "ShopAction5Tag_sx8",
         "cm_ShopAction5Tag_sx9": "ShopAction5Tag_sx9",
         "cm_ShopAction5Tag_sx10": "ShopAction5Tag_sx10",
         /* Shop9 tag */
         "cm_ShopAction9Tag_cd": "ShopAction9Tag_cd",
         "cm_ShopAction9Tag_on": "ShopAction9Tag_on",
         "cm_ShopAction9Tag_tr": "ShopAction9Tag_tr",
         "cm_ShopAction9Tag_pr": "ShopAction9Tag_pr",
         "cm_ShopAction9Tag_pm": "ShopAction9Tag_pm",
         "cm_ShopAction9Tag_qt": "ShopAction9Tag_qt",
         "cm_ShopAction9Tag_bp": "ShopAction9Tag_bp",
         "cm_ShopAction9Tag_cg": "ShopAction9Tag_cg",
         "cm_ShopAction9Tag_s_a1": "ShopAction9Tag_s_a1",
         "cm_ShopAction9Tag_s_a2": "ShopAction9Tag_s_a2",
         "cm_ShopAction9Tag_s_a3": "ShopAction9Tag_s_a3",
         "cm_ShopAction9Tag_s_a4": "ShopAction9Tag_s_a4",
         "cm_ShopAction9Tag_s_a5": "ShopAction9Tag_s_a5",
         "cm_ShopAction9Tag_s_a6": "ShopAction9Tag_s_a6",
         "cm_ShopAction9Tag_s_a7": "ShopAction9Tag_s_a7",
         "cm_ShopAction9Tag_s_a8": "ShopAction9Tag_s_a8",
         "cm_ShopAction9Tag_s_a9": "ShopAction9Tag_s_a9",
         "cm_ShopAction9Tag_s_a10": "ShopAction9Tag_s_a10",
         "cm_ShopAction9Tag_sx1": "ShopAction9Tag_sx1",
         "cm_ShopAction9Tag_sx2": "ShopAction9Tag_sx2",
         "cm_ShopAction9Tag_sx3": "ShopAction9Tag_sx3",
         "cm_ShopAction9Tag_sx4": "ShopAction9Tag_sx4",
         "cm_ShopAction9Tag_sx5": "ShopAction9Tag_sx5",
         "cm_ShopAction9Tag_sx6": "ShopAction9Tag_sx6",
         "cm_ShopAction9Tag_sx7": "ShopAction9Tag_sx7",
         "cm_ShopAction9Tag_sx8": "ShopAction9Tag_sx8",
         "cm_ShopAction9Tag_sx9": "ShopAction9Tag_sx9",
         "cm_ShopAction9Tag_sx10": "ShopAction9Tag_sx10",
         /* Order tag */
         "cm_OrderTag_on": "OrderTag_on",
         "cm_OrderTag_tr": "OrderTag_tr",
         "cm_OrderTag_sg": "OrderTag_sg",
         "cm_OrderTag_cd": "OrderTag_cd",
         "cm_OrderTag_ct": "OrderTag_ct",
         "cm_OrderTag_sa": "OrderTag_sa",
         "cm_OrderTag_zp": "OrderTag_zp",
         "cm_OrderTag_o_a1": "OrderTag_o_a1",
         "cm_OrderTag_o_a2": "OrderTag_o_a2",
         "cm_OrderTag_o_a3": "OrderTag_o_a3",
         "cm_OrderTag_o_a4": "OrderTag_o_a4",
         "cm_OrderTag_o_a5": "OrderTag_o_a5",
         "cm_OrderTag_o_a6": "OrderTag_o_a6",
         "cm_OrderTag_o_a7": "OrderTag_o_a7",
         "cm_OrderTag_o_a8": "OrderTag_o_a8",
         "cm_OrderTag_o_a9": "OrderTag_o_a9",
         "cm_OrderTag_o_a10": "OrderTag_o_a10",
         "cm_OrderTag_or1": "OrderTag_or1",
         "cm_OrderTag_or2": "OrderTag_or2",
         "cm_OrderTag_or3": "OrderTag_or3",
         "cm_OrderTag_or4": "OrderTag_or4",
         "cm_OrderTag_or5": "OrderTag_or5",
         "cm_OrderTag_or6": "OrderTag_or6",
         "cm_OrderTag_or7": "OrderTag_or7",
         "cm_OrderTag_or8": "OrderTag_or8",
         "cm_OrderTag_or9": "OrderTag_or9",
         "cm_OrderTag_or10": "OrderTag_or10",
         /* Registration tag */
         "cm_RegistrationTag_cd": "RegistrationTag_cd",
         "cm_RegistrationTag_em": "RegistrationTag_em",
         "cm_RegistrationTag_ct": "RegistrationTag_ct",
         "cm_RegistrationTag_sa": "RegistrationTag_sa",
         "cm_RegistrationTag_zp": "RegistrationTag_zp",
         "cm_RegistrationTag_cy": "RegistrationTag_cy",
         "cm_RegistrationTag_rg1": "RegistrationTag_rg1",
         "cm_RegistrationTag_rg2": "RegistrationTag_rg2",
         "cm_RegistrationTag_rg3": "RegistrationTag_rg3",
         "cm_RegistrationTag_rg4": "RegistrationTag_rg4",
         "cm_RegistrationTag_rg5": "RegistrationTag_rg5",
         "cm_RegistrationTag_rg6": "RegistrationTag_rg6",
         "cm_RegistrationTag_rg7": "RegistrationTag_rg7",
         "cm_RegistrationTag_rg8": "RegistrationTag_rg8",
         "cm_RegistrationTag_rg9": "RegistrationTag_rg9",
         "cm_RegistrationTag_rg10": "RegistrationTag_rg10",
         /* Conversion and Element tags */
         "eventAction": "ConversionEventTag_cat",
         "primaryCategory": "ConversionEventTag_ccid,ConversionEventTag_c_a1,ElementTag_ecat,ElementTag_e_a1,ProductviewTag_cg",
         "eventPoints": "ConversionEventTag_cpt",
         "eventName": "ConversionEventTag_c_a2,ElementTag_e_a2",
         "eventCategoryGroup": "ConversionEventTag_c_a3,ElementTag_e_a3",
         "executionPath": "ConversionEventTag_c_a4,ElementTag_e_a4",
         "eventCallBackCode": "ConversionEventTag_c_a5,ElementTag_e_a5",
         "execPathReturnCode": "ConversionEventTag_c_a6,ElementTag_e_a6",
         "targetURL": "ConversionEventTag_c_a7,ElementTag_e_a7",
         "targetTitle": "ConversionEventTag_c_a8,ElementTag_e_a8",
         "targetSize": "ConversionEventTag_c_a9,ElementTag_e_a9",
         "ddo.p.pi.ibm.iniSiteID": "ConversionEventTag_c_a10,ElementTag_e_a10,ProductviewTag_pr_a10",
         "eventVidStatus": "ElementTag_e_a13",
         "eventVidTimeStamp": "ElementTag_e_a14",
         "eventVidLength": "ElementTag_e_a15",
         "destinationURL": "ConversionEventTag_c_a17,ElementTag_e_a17,ProductviewTag_pr_a17",
         "eventTriggerTime": "ConversionEventTag_c_a20,ElementTag_e_a20",
         "cm_ElementTag_eid": "ElementTag_eid",
         "cm_ConversionEventTag_cid": "ConversionEventTag_cid",
         /* event types */
         "event_name:ibmStatsEvent_element": "Element",
         "event_name:ibmStatsEvent_conversion": "Conversion",
         "event_name:ibmStatsEvent_product": "Productview",
         "event_name:ibmStatsEvent_purchase": "Purchase"
   };

   /*--------------------Initialize Coremetrics --------------------*/
   cm.extension = function (b) {
      try {

         /* Set siteID to accommodate TEST site IDs, "test" can be a prefix or suffix */
         var siteID = b["ddo.p.pi.ibm.iniSiteID"].toLowerCase().replace(/^test|test$/,"");

         /* Common Attributes Rule */
         b.cm_PageViewTag_pv_a21 = b["ddo.p.pi.templateVersion"] || "";
         b.cm_PageViewTag_pv_a22 = b["ddo.p.pi.ibm.docid"] || "";
         b.cm_PageViewTag_pv_a24 = b["qp.lm"]   || "";
         b.cm_PageViewTag_pv_a25 = b["qp.lsr"]  || "";
         b.cm_PageViewTag_pv_a26 = b["qp.lot"]  || "";
         b.cm_PageViewTag_pv_a27 = b["qp.lsot"] || "";
         b.cm_PageViewTag_pv_a28 = b["qp.lpg"]  || "";

         /* Rule for Cloud Exchange */
         if (siteID.indexOf('cloudexchange') > -1 || siteID.indexOf('cloud_mw') > -1) {
            b.cm_PageViewTag_pv_a21 = b["ddo.p.a.cspClient"]; // client ID
            b.cm_PageViewTag_pv_a22 = b["ddo.p.a.cspOffering"];
            b.cm_PageViewTag_pv_a23 = b["ddo.p.a.cspSAPSiteId"];
            b.cm_PageViewTag_pv_a24 = b["ddo.p.a.cspCustHubId"];
            b.cm_PageViewTag_pv_a25 = b["ddo.p.a.cspICN"];
            b.cm_PageViewTag_pv_a26 = b["ddo.p.a.cspCMClientId"];
         }

         /* Rule for Sales Portal */
         if (siteID.indexOf('ins') === 0) {
            if (typeof (window.saleParams) === "undefined") window.saleParams = {};
            cm.getNTPTVariable(saleParams);

            b.cm_PageViewTag_pv_a21 = b["ddo.p.pi.m.PageAttributes"] || b["meta.IBM.PageAttributes"] || "";
            b.cm_PageViewTag_pv_a22 = saleParams["RepID"]            || b["meta.RepID"]              || "";
            b.cm_PageViewTag_pv_a23 = saleParams["rep_group"]        || b["meta.rep_group"]          || "";
            b.cm_PageViewTag_pv_a24 = saleParams["DocID"]            || "";
            b.cm_PageViewTag_pv_a25 = saleParams["mode"]             || "";
            b.cm_PageViewTag_pv_a26 = b["ddo.p.pi.m.PopID"]          || b["meta.PopID"]              || "";
            b.cm_PageViewTag_pv_a27 = b["ddo.p.pi.m.NewContent"]     || "";
         }

         /* Rule for Support - Problem reporting */
         if (siteID === 'estcht' || siteID === 'estxsr') {
            if (typeof(window.supportParams) === "undefined") window.supportParams = {};
            cm.getNTPTVariable(supportParams);

            b.cm_PageViewTag_pv_a21 = supportParams["SR_DOMAIN"] || "";
            b.cm_PageViewTag_pv_a22 = supportParams["SR_EMAILADDRESS"] || "";
            b.cm_PageViewTag_pv_a23 = supportParams["SR_ICN"] || "";
            b.cm_PageViewTag_pv_a24 = supportParams["SR_PIDVRMCOMPREL"] || "";
            b.cm_PageViewTag_pv_a25 = supportParams["SR_PREFERREDCONTACTMETHOD"] || "";
            b.cm_PageViewTag_pv_a26 = supportParams["SR_PRIMIUMRESPONSESELECTED"] || "";
            b.cm_PageViewTag_pv_a27 = supportParams["SR_PRODID"] || "";
            b.cm_PageViewTag_pv_a28 = supportParams["SR_PRODSOURCE"] || "";
            b.cm_PageViewTag_pv_a29 = supportParams["SR_REQUESTTYPE"] || "";
            b.cm_PageViewTag_pv_a30 = supportParams["SR_SEVERITY"] || "";
            b.cm_PageViewTag_pv_a31 = supportParams["SR_SOURCEAPPL"] || "";
            b.cm_PageViewTag_pv_a32 = supportParams["SR_SUCCESS"] || "";
            b.cm_PageViewTag_pv_a33 = supportParams["SR_TYPE"] || "";
            b.cm_PageViewTag_pv_a34 = supportParams["SR_UNEXPECTEDERROR_CONTACTID"] || "";
            b.cm_PageViewTag_pv_a35 = supportParams["SR_UNEXPECTEDERROR_DOMAIN"] || "";
            b.cm_PageViewTag_pv_a36 = supportParams["SR_UNEXPECTEDERROR_USER"] || "";
            b.cm_PageViewTag_pv_a37 = supportParams["SR_UNEXPECTEDERROR_NODE"] || "";
            b.cm_PageViewTag_pv_a38 = b["qp.srChannel"];
            b.cm_PageViewTag_pv_a39 = b["qp.srFromAction"];
            b.cm_PageViewTag_pv_a40 = supportParams["SR_ECIIC"] || "";
            b.cm_PageViewTag_pv_a41 = supportParams["SR_MACHTYPEMOD"] || "";
            b.cm_PageViewTag_pv_a42 = supportParams["SR_COMPID"] || "";
         }

         /* Rule for Support - Content Navigation */
         if (siteID === 'estmob' || siteID === 'estspa' || siteID === 'estspe') {
            if (typeof(window.supportParams) === "undefined") window.supportParams = {};
            cm.getNTPTVariable(supportParams);      
            cm.getCmCreateProductView();

            b.cm_PageViewTag_pv_a21 = supportParams["SP.CAMCO"] || "";
            b.cm_PageViewTag_pv_a22 = supportParams["SP.AVPCompanyName"] || "";
            b.cm_PageViewTag_pv_a23 = supportParams["SP.WICO"] || "";
            b.cm_PageViewTag_pv_a24 = supportParams["SP.WIDM"] || "";
            b.cm_PageViewTag_pv_a25 = b["customParam_productID"]       || "";
            b.cm_PageViewTag_pv_a26 = b["customParam_productName"]     || "";
            b.cm_PageViewTag_pv_a27 = b["customParam_productCategory"] || "";
         }

         /* Rule for Support - Fix Delivery profile */
         if (siteID === 'estfix' || siteID === 'estset') {
            cm.getCmCreateProductView();

            b.cm_PageViewTag_pv_a25 = b["customParam_productID"]       || "";
            b.cm_PageViewTag_pv_a26 = b["customParam_productName"]     || "";
            b.cm_PageViewTag_pv_a27 = b["customParam_productCategory"] || "";
         }

         /* Rule for IBM Cloud */
         if (siteID === 'mktibmcloud' || siteID === 'cloud') {
            b.cm_PageViewTag_pv_a28 = b["ddo.p.pi.ibm.UseCase"]  || b["meta.IBM.UseCase"]  || "";
            b.cm_PageViewTag_pv_a29 = b["ddo.p.pi.ibm.Solution"] || b["meta.IBM.Solution"] || "";
         }

         /* Rule for SA_Message */
         if (siteID === 'cuf04' || siteID === "osol") {
            b.cm_PageViewTag_pv_a24 = window.SA_Message || "";
         }

         /* Rule for Think Leader */
         if (siteID === 'thinkleaders') {
            if (typeof (window.thinkParams) == "undefined") window.thinkParams = {};
            cm.getNTPTVariable(thinkParams);

            b.cm_PageViewTag_pv_a24 = thinkParams["ibmTMuser"]  || "";
         }

         /* Rule for Partner World */
         if (siteID === 'partnerworld' || siteID === 'contlisten' || siteID === 'pw') {
            if (typeof(window.pwParams) === "undefined") window.pwParams = {};
            cm.getNTPTVariable(pwParams);      

            b.cm_PageViewTag_pv_a21 = pwParams["pw_bp_id"]  || "";
            b.cm_PageViewTag_pv_a22 = pwParams["pw_ce_id"]  || "";
            b.cm_PageViewTag_pv_a23 = pwParams["pw_locale"] || "";
            b.cm_PageViewTag_pv_a24 = b["ddo.p.pi.ibm.PW_Service"]        || pwParams["PW.Service"] || "";
            b.cm_PageViewTag_pv_a25 = b["ddo.p.pi.ibm.PW_Software"]       || pwParams["PW.Software"] || "";
            b.cm_PageViewTag_pv_a26 = b["ddo.p.pi.ibm.PW_Hardware"]       || pwParams["PW.Hardware"] || "";
            b.cm_PageViewTag_pv_a27 = b["ddo.p.pi.ibm.PW_Solution"]       || pwParams["PW.Solution"] || "";
            b.cm_PageViewTag_pv_a28 = b["ddo.p.pi.ibm.PW_Sponsor"]        || pwParams["PW.Sponsor"] || "";
            b.cm_PageViewTag_pv_a29 = b["ddo.p.pi.ibm.PW_ECMContentType"] || pwParams["PW.ECMContentType"] || "";;
            b.cm_PageViewTag_pv_a30 = pwParams["business_unit"] || "";
            b.cm_PageViewTag_pv_a31 = pwParams["content_id"]    || "";
            b.cm_PageViewTag_pv_a32 = pwParams["resource_type"] || "";

            /* initialize window.digitalData.page.attribute.extraFields if needed */
            if (typeof(window.digitalData.page.attribute.extraFields) === "undefined") {
               if (typeof(window.CM_EXTRA) !== "undefined" && window.CM_EXTRA !== "") {
                  digitalData.page.attribute.extraFields = "";
                  arr1 = CM_EXTRA.split('&'),
                  j = 0;
                  for (var i = 0; i < arr1.length; i++) {
                     var ex = "cm_PageviewTag_pv" + (i + 1);
                     b[ex] = arr1[i].split('=')[1];
                     digitalData.page.attribute.extraFields += arr1[i].split('=')[1] + "-_-";
                  }
               }
            }

         }

         /* Rule for Developer Works */
         if (siteID === 'devwrk' || siteID === 'devwrks' || siteID === 'dwnext' || siteID === "devwrkscon") {
            if (typeof (window.devworkParams) == "undefined") window.devworkParams = {};
            cm.getNTPTVariable(devworkParams);

            if (typeof(b["qp.ca"]) !== "undefined") {
               b.cm_PageViewTag_pv_a21 = b["qp.ca"].replace(/-_-/g, "---") || "";
            }
            b.cm_PageViewTag_pv_a22 = devworkParams["ibmCmaId"] || "";
            b.cm_PageViewTag_pv_a23 = devworkParams["ibmContentAreas"] || "";
            /* 2017-02-03 - jleon: Setting to initial value for Page Category */
            b.cm_PageViewTag_pv_a24 = b["ddo.p.c.iniPrimaryCategory"] || b["ddo.p.c.categoryID"] || b["meta.IBM.WTMCategory"];
            b.cm_PageViewTag_pv_a25 = b["ddo.p.pi.ibm.topic"] || b["meta.dW.Topic"];
         }

         /* Rule for SSI */
         if (siteID === 'e021') {
            var ssiParams = {}, tokens, i, temp;

            if (typeof(digitalData.util.meta.contentinfo) !== "undefined" && digitalData.util.meta.contentinfo.indexOf('~') !== -1) {
               tokens = digitalData.util.meta.contentinfo.split('~');
               for (i=0, tl=tokens.length; i < tl; i++) {
                  temp = tokens[i].split(':');
                  ssiParams[temp[0].toUpperCase()] = window.decodeURIComponent(temp[1]);
               }
            }

            b.cm_PageViewTag_pv_a21 = digitalData.util.qp.htmlfid  || ssiParams.HTMLFID || ((typeof(digitalData.util.qp.supplier) !== "undefined" && typeof(digitalData.util.qp.letternum) !== "undefined") ? digitalData.util.qp.supplier + "/" + digitalData.util.qp.letternum : "");
            b.cm_PageViewTag_pv_a22 = digitalData.util.qp.appname  || ""; 
            b.cm_PageViewTag_pv_a23 = digitalData.util.qp.infotype || ssiParams.INFOTYPE || "";
            if (b.cm_PageViewTag_pv_a23 === "") {
               if (location.href.indexOf('/rep_ca/') !== -1) b.cm_PageViewTag_pv_a23 = 'AN';
               else if (location.href.indexOf('/rep_oc/') !== -1) b.cm_PageViewTag_pv_a23 = 'OC';
               else if (location.href.indexOf('/rep_sm/') !== -1 || location.href.indexOf('/rep_rp/') !== -1) b.cm_PageViewTag_pv_a23 = 'DD';

            }
            b.cm_PageViewTag_pv_a24 = digitalData.util.qp.subtype  || ssiParams.INFOSUBTYPE || ssiParams.SUBTYPE || "";
            if (b.cm_PageViewTag_pv_a24 === "") {
               if (location.href.indexOf('/rep_ca/') !== -1) b.cm_PageViewTag_pv_a24 = 'CA';
               else if (location.href.indexOf('/rep_oc/') !== -1) b.cm_PageViewTag_pv_a24 = 'NA';
               else if (location.href.indexOf('/rep_sm/') !== -1) b.cm_PageViewTag_pv_a24 = 'SM';
               else if (location.href.indexOf('/rep_rp/') !== -1) b.cm_PageViewTag_pv_a24 = 'RP';        
            }
            b.cm_PageViewTag_pv_a25 = digitalData.util.meta.contentinfo || "";
            b.cm_PageViewTag_pv_a26 = digitalData.util.qp.docURL   || "";
            b.cm_PageViewTag_pv_a27 = digitalData.util.qp.lang     || "";
            b.cm_PageViewTag_pv_a28 = digitalData.util.qp.request_locale || "";
            b.cm_PageViewTag_pv_a29 = ssiParams.ASSETTYPE || "";
            b.cm_PageViewTag_pv_a30 = ssiParams.DOCTYPE || "";
            b.cm_PageViewTag_pv_a31 = ssiParams.CGCODE || "";
            b.cm_PageViewTag_pv_a32 = digitalData.util.qp.ctype || ssiParams.CONTENT_TYPE || "";
            b.cm_PageViewTag_pv_a33 = digitalData.util.qp.ctry || "";
         }

         /* Rule for Support - Fix Delivery */
         if (siteID === 'estfix' || siteID === 'estset') {
            b.cm_PageViewTag_pv_a20 = b["customParam_productID"];
            b.cm_PageViewTag_pv_a21 = b["customParam_productName"];
            b.cm_PageViewTag_pv_a22 = b["customParam_productCategory"];
         }

         /* Rule for ECOM */
         if (siteID === 'ecom') {
            b.cm_PageViewTag_pv_a27 = b["meta.IBM.WTMEComStore"];
            b.cm_PageViewTag_pv_a29 = b["qp.sapQuoteNum"];
            if (typeof(marketplaceCheckoutCustomTags) === "function" && !window.executedCheckoutTag) {
               window.executedCheckoutTag = true;
               marketplaceCheckoutCustomTags();
            }
         }

         /* Rule for On Site Search */
         if (siteID === 'sitesearch') {
            if (typeof(window.searchParams) === "undefined") window.searchParams = {};
            cm.getNTPTVariable(searchParams);

            b["ddo.p.pi.onsiteSearchTerm"] = searchParams["ibmSrchTerm"] || "";
            b["ddo.p.pi.onsiteSearchResult"] = searchParams["ibmSrchRslts"] || "";
            b.cm_PageViewTag_pv_a21 = searchParams["ibmSrchName"] || "";
            b.cm_PageViewTag_pv_a22 = searchParams["ibmSrchTerm"] || "";
            b.cm_PageViewTag_pv_a23 = searchParams["ibmSrchRslts"] || "";
            b.cm_PageViewTag_pv_a24 = searchParams["ibmSrchRsltsPg"] || "";
            b.cm_PageViewTag_pv_a25 = searchParams["ibmSrchLang"] || "";
            b.cm_PageViewTag_pv_a26 = searchParams["ibmSrchLo"] || "";
            b.cm_PageViewTag_pv_a27 = searchParams["ibmSrchHpp"] || "";
            b.cm_PageViewTag_pv_a28 = searchParams["ibm.WTMCategory"] || "";
            b.cm_PageViewTag_pv_a29 = searchParams["ibm.WTMSite"] || "";
         }

         /* Rule for Bluemix Demand Base tag */
         if ((siteID === 'bluemix' || siteID === 'bluemixTest') 
               && b.event_name && b.event_name.toLowerCase() === 'demandbaseelement') {
            b.cm_ElementTag_e_a29 = demandBase["DB_company_name"] || "";
            b.cm_ElementTag_e_a30 = demandBase["DB_annual_sales"] || "";
            b.cm_ElementTag_e_a31 = demandBase["DB_audience"] || "";
            b.cm_ElementTag_e_a32 = demandBase["DB_audience_segment"] || "";
            b.cm_ElementTag_e_a33 = demandBase["DB_b2b"] || "";
            b.cm_ElementTag_e_a34 = demandBase["DB_b2c"] || "";
            b.cm_ElementTag_e_a35 = demandBase["DB_employee_count"] || "";
            b.cm_ElementTag_e_a36 = demandBase["DB_country"] || "";
            b.cm_ElementTag_e_a37 = demandBase["DB_city"] || "";
            b.cm_ElementTag_e_a38 = demandBase["DB_forbes_2000"] || "";
            b.cm_ElementTag_e_a39 = demandBase["DB_forbes_1000"] || "";
            b.cm_ElementTag_e_a40 = demandBase["DB_industry"] || "";
            b.cm_ElementTag_e_a41 = demandBase["DB_sub_industry"] || "";
            b.cm_ElementTag_e_a42 = demandBase["DB_revenue_range"] || "";
            b.cm_ElementTag_e_a43 = demandBase["DB_employee_range"] || "";
            b.cm_ElementTag_e_a44 = demandBase["DB_demandbase_sid"] || "";
            b.cm_ElementTag_e_a45 = demandBase["DB_ip"] || "";
            b.cm_ElementTag_e_a46 = demandBase["DB_country_name"] || "";
            b.cm_ElementTag_e_a47 = demandBase["DB_primary_sic"] || "";
            b.cm_ElementTag_e_a48 = demandBase["DB_web_site"] || "";
            b.cm_ElementTag_e_a49 = demandBase["DB_state"] || "";
            b.cm_ElementTag_e_a50 = demandBase["DB_watch_list"] || "";
         }

         /* Rule for link tracking for developerWorks */
         if (siteID === 'dwnext' && b.eventName && b.eventName.toLowerCase() === 'pagelinks') {
            b.cm_ElementTag_e_a22 = b["evCustomCE_cspClient"] || b["evCustomSSI_htmlfid"] || b["evCustomSales_popid"] || b["evCustomIWM_docid"];
            b.cm_ElementTag_e_a23 = b["evCustomCE_cspOffering"];
            b.cm_ElementTag_e_a24 = b["evCustomCE_cspSAPSiteId"];
            b.cm_ElementTag_e_a25 = b["evCustomCE_cspCustHubId"];
            b.cm_ElementTag_e_a26 = b["evCustomCE_cspICN"];
            b.cm_ElementTag_e_a27 = b["evCustomCE_cspCMClientId"];
            b.cm_ElementTag_e_a28 = b["evCustomCE_cspAdvSrchOpt"];
         }

         /* Rule for ibmStats.event tracking for element tags */
         if (b.event_name && b.event_name.toLowerCase() === 'ibmstatsevent_element') {
            b.cm_ElementTag_e_a22 = b["formName"];
            b.cm_ElementTag_e_a23 = b["field1"];
            b.cm_ElementTag_e_a24 = b["field2"];
            b.cm_ElementTag_e_a25 = b["field3"];
            b.cm_ElementTag_e_a26 = b["field4"];
            b.cm_ElementTag_e_a27 = b["field5"];
            b.cm_ElementTag_e_a28 = b["field6"];
            b.cm_ElementTag_e_a29 = b["field7"];
            b.cm_ElementTag_e_a30 = b["field8"];
            b.cm_ElementTag_e_a31 = b["field9"];
            b.cm_ElementTag_e_a32 = b["field10"];
            b.cm_ElementTag_e_a33 = b["field11"];
            b.cm_ElementTag_e_a34 = b["field12"];
            b.cm_ElementTag_e_a35 = b["field13"];
            b.cm_ElementTag_e_a36 = b["field14"];
            b.cm_ElementTag_e_a37 = b["field15"];
         }

         /* Rule for ibmStats.event tracking for conversion tag */
         if (b.event_name && b.event_name.toLowerCase() === 'ibmstatsevent_conversion') {
            b.cm_ConversionEventTag_c_a22 = b["formName"];
            b.cm_ConversionEventTag_c_a23 = b["field1"];
            b.cm_ConversionEventTag_c_a24 = b["field2"];
            b.cm_ConversionEventTag_c_a25 = b["field3"];
            b.cm_ConversionEventTag_c_a26 = b["field4"];
            b.cm_ConversionEventTag_c_a27 = b["field5"];
            b.cm_ConversionEventTag_c_a28 = b["field6"];
            b.cm_ConversionEventTag_c_a29 = b["field7"];
            b.cm_ConversionEventTag_c_a30 = b["field8"];
            b.cm_ConversionEventTag_c_a31 = b["field9"];
            b.cm_ConversionEventTag_c_a32 = b["field10"];
            b.cm_ConversionEventTag_c_a33 = b["field11"];
            b.cm_ConversionEventTag_c_a34 = b["field12"];
            b.cm_ConversionEventTag_c_a35 = b["field13"];
            b.cm_ConversionEventTag_c_a36 = b["field14"];
            b.cm_ConversionEventTag_c_a37 = b["field15"];
         }

         /* Rule for ibmStats.event tracking for product view tag */
         if (b.eventName && b.eventName.toLowerCase() === 'product') {
            b.cm_ProductviewTag_pr_a31 = b["productTag_serviceType"];
         }
      }
      catch (error) {
         dl.log('+++DBDM-ERROR > coremetrics > extension: ' + error);
      }
   };

   /*--------------------Set NTPT attributes --------------------*/
   cm.getNTPTVariable = function (addParams) {   
      if (typeof(window.NTPT_PGEXTRA) !== "undefined") {
         var arr1 = NTPT_PGEXTRA.split('&'),
         j = 0;
         for (var i = 0; i < arr1.length; i++) {
            var arr2 = arr1[i].split('=');
            addParams[arr2[0]] = arr2[1];
         }
      }
   }

   /*--------------------Add attributes --------------------*/
   cm.addAttributes = function (clientArray,value) {   
      if(typeof (clientArray[value]) != "undefined"){
         utagVal = "customParam_"+value.replace(/\./g,"_");
         b[utagVal] = clientArray[value];
      }
   }

   /*--------------------Set data for Support portal --------------------*/
   cm.getCmCreateProductView = function (n) {
      var scripts = document.getElementsByTagName("script"),
      tagArray = "";
      for (i=0; i <scripts.length; i++) {
         if(scripts[i].innerHTML.indexOf("cmCreateProductviewTag") !== -1){
            tagArray = (scripts[i].innerHTML).split(/[""''(,)]+/);
            break;
         }
      }
      if(tagArray.length > 0){
         b["customParam_productID"] = tagArray[1];
         b["customParam_productName"] = tagArray[2];
         b["customParam_productCategory"] = tagArray[3];
      }
   };

   /*--------------------Initialize Coremetrics --------------------*/
   cm.initClient = function () {
      try {
         /* set cmTagQueue */
         if (typeof(window.cmTagQueue) == 'undefined')
            window.cmTagQueue = [];

         /* cookie migration from IBM to non IBM pages */
         if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') !== -1) {
            cmTagQueue.push(['cmSetupCookieMigration', true, true, null, v16elu.domainBlacklist]);
         }

         /* cookie migration code for all non IBM pages */
         if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') == -1){
            cmTagQueue.push(['cmSetupCookieMigration', true, true, v16elu.NTPT_DOMAINLIST]);
         }
         cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true}]);

         /* Set Coremetrics behavior for cookies and encryption */
         if (typeof(digitalData.page.pageInfo.ibm.iniSiteID) !== "undefined" && digitalData.page.pageInfo.ibm.iniSiteID.toLowerCase() === "ecom") {
            cmTagQueue.push(['cmSetupNormalization', 'krypto-_-krypto']); 
         }
         if (typeof(digitalData.page.pageInfo.ibm.iniSiteID) !== "undefined" && digitalData.page.pageInfo.ibm.iniSiteID.toLowerCase() == "p4sc") {
            cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true, "cm_FormPageID" : true}]);
         }
         else {
            cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true}]);
         }
      }
      catch (error) {
         dl.log('+++DBDM-ERROR > coremetrics > init: ' + error);
      }
   };

   /*--------------------Map Coremetrics Attributes--------------------*/
   cm.mapAttributes = function (b) {
      try {
         var c, d, e, f, g;
         for (d in cm.map) {
            /* for each attribute in the map table, see if there is a value on the incoming data object */
            if (typeof(b[d]) !== "undefined" && b[d] !== "") {
               e = cm.map[d].split(",");
               for (f = 0; f < e.length; f++) {
                  /* Assign to the coremetrics data object the value from the incoming object */
                  cm.data[e[f]] = b[d];                  
               }
            }
            else {
               /* Get the event_name for this call */
               c = d.split(":");
               if (c.length === 2 && b[c[0]] === c[1]) {
                  g = "" + cm.event_lookup[cm.map[d].toLowerCase().replace("_", "")];
                  if (g !== "") {
                     cm.data.tid[g] = true;
                  }
               }
            }
         }
      }
      catch (error) {
         dl.log('+++DBDM-ERROR > coremetrics > map: ' + error);
      }
   };

   /*--------------------Concatenate Attributes for Coremetrics call--------------------*/
   cm.prepareAttr = function (prefix, tag, numAttrs, index, cindex, attrStr) {
      attrStr = "";
      for (cindex = 1; cindex <= numAttrs; cindex++) {
         if (typeof index != "undefined" && cm.data[tagLabel + prefix + cindex + ""]instanceof Array) {
            attrStr += ((typeof cm.data[tag + prefix + cindex + ""][index] != "undefined") ? cm.data[tag + prefix + cindex + ""][index] : "") + "-_-";
         } else {
            attrStr += ((typeof cm.data[tag + prefix + cindex + ""] != "undefined") ? cm.data[tag + prefix + cindex + ""] : "") + "-_-";
         }
      }
      return attrStr;
   };

   /*--------------------Prepare the tag and send it to Coremetrics--------------------*/
   cm.prepareAndSend = function (b) {
      try {
         cm.initialized = true;
         /* See if the visit is to a test web server */
         if (cm.data.test_domains.indexOf("," + location.hostname + ',') > -1) {
            cm.data.test = true;
         }
         if (cm.data.test) {
            cm.data.ClientID = cm.data.TestClientID;
            cm.data.DataCollectionMethod = cm.data.TestDataCollectionMethod || false;
            cm.data.DataCollectionDomain = cm.data.TestDataCollectionDomain || "testdata.coremetrics.com";
         }
         /* Set the global client ID for Coremetrics */
         if (cm.data.ClientID) {
            cmSetClientID(cm.data.ClientID, cm.data.DataCollectionMethod, cm.data.DataCollectionDomain, cm.data.CookieDomain);
         }
         /*
          * 2017-01-25 - jleon: Cross-domain first party cookie migration
          * Added here to account for the use of the cmTagQueue array
          */
         if (window.cmTagQueue_copy) {
            window.cmTagQueue = window.cmTagQueue_copy;
            cmExecuteTagQueue();
         }
         /* Coremetrics Settings execution */
         if (cm.data.cmSetupOther && window.cmSetupOther) {
            window.cmSetupOther(cm.data.cmSetupOther);
         }
         else if (cm.data.cmSetupOther && !window.cmSetupOther) {
            dl.log('+++DBDM-LOG > cmSetupOther is not defined. This probably means the coremetrics library has not initialized correctly.');
         }
         if (cm.data.a === "view") {
            /* Execute the Pageview Tag */
            e = "PageviewTag_";
            /* Prepare attributes */
            cm.data.pv_a = cm.prepareAttr("pv_a", e, 50);
            cm.data.pv = cm.prepareAttr("pv", e, 15);
            /* Execute pageview tag */
            if (cm.data["ManualPageviewTag_ul"]) {
               f = "ManualPageviewTag_";
               cmCreateManualPageviewTag(cm.data[e + "pi"], cm.data[e + "cg"], cm.data[f + "ul"], cm.data[f + "rf"], cm.data.pv_a, cm.data[e + "se"], cm.data[e + "sr"], cm.data.pv);
            }
            else {
               cmCreatePageviewTag(cm.data[e + "pi"], cm.data[e + "cg"], cm.data[e + "se"], cm.data[e + "sr"], cm.data.pv_a, cm.data.pv);
            }
            /* 2017-01-25 - jleon: Read CoreID6 cookie after pageview */
            datalayer.util.readCookies();

         }
         else if (cm.data.a == "link" && cm.data["ManualLinkClickTag_hr"]) {
            e = "ManualLinkClickTag_";
            cmCreateManualLinkClickTag(cm.data[e + "hr"], cm.data[e + "nm"], cm.data[e + "pi"]);
            cm.data[e + "hr"] = "";
            return;
         }
         if (cm.data["ManualImpressionTag_pi"] && (cm.data["ManualImpressionTag_cm_sp"] || cm.data["ManualImpressionTag_cm_re"])) {
            e = "ManualImpressionTag_";
            cmStartTagSet();
            if (typeof cm.data[e + "cm_re"] === "string") {
               cm.data[e + "cm_re"] = cm.data[e + "cm_re"].split(',');
            }
            if (typeof cm.data[e + "cm_sp"] === "string") {
               cm.data[e + "cm_sp"] = cm.data[e + "cm_sp"].split(',');
            }
            if (cm.data[e + "cm_re"]instanceof Array && cm.data[e + "cm_re"].length > 0) {
               for (f = 0; f < cm.data[e + "cm_re"].length; f++) {
                  var cmnew = new _cm("tid", "9");
                  cmnew.cm_re = cm.data[e + "cm_re"][f];
                  cmnew.pi = cm.data[e + "pi"] || c1(cm.ci);
                  cmnew.st = cm_ClientTS;
                  cmnew.write(1);
               }
            }
            if (cm.data[e + "cm_sp"]instanceof Array && cm.data[e + "cm_sp"].length > 0) {
               for (f = 0; f < cm.data[e + "cm_sp"].length; f++) {
                  var cmnew = new _cm("tid", "9");
                  cmnew.cm_sp = cm.data[e + "cm_sp"][f];
                  cmnew.pi = cm.data[e + "pi"] || c1(cm.ci);
                  cmnew.st = cm_ClientTS;
                  cmnew.write(1);
               }
            }
            cmSendTagSet();
            cm.data[e + "pi"] = "";
         }
         if (cm.data.order_id || cm.data["ShopAction9Tag_on"]) {
            b._cevent = "purchase";
         }
         if (b._cevent === "purchase") {
            if (cm.data.order_currency)
               cmSetupOther({
                  "cm_currencyCode": cm.data.order_currency
               });
            e = "ShopAction9Tag_";
            cm.data[e + "on"] = cm.data[e + "on"] || cm.data.order_id;
            cm.data[e + "tr"] = cm.data[e + "tr"] || cm.data.order_subtotal;
            cm.data[e + "cd"] = cm.data[e + "cd"] || cm.data.customer_id || b["ddo.p.pi.coremetrics.visitorID"] || "";
            cm.data[e + "pr"] = cm.data[e + "pr"] || cm.data.product_id;
            cm.data[e + "pm"] = cm.data[e + "pm"] || cm.data.product_name;
            cm.data[e + "qt"] = cm.data[e + "qt"] || cm.data.product_quantity;
            cm.data[e + "bp"] = cm.data[e + "bp"] || cm.data.product_unit_price;
            cm.data[e + "cg"] = cm.data[e + "cg"] || cm.data.product_category;
            for (f = 0; f < cm.data[e + "pr"].length; f++) {
               cm.data.s_a = cm.prepareAttr("s_a", e, 50, f);
               cm.data.sx = cm.prepareAttr("sx", e, 15, f);
               /* 2017-02-14 - jleon: START - Call alias instead of real method */
               // cmCreateShopAction9Tag(u.data[e + "pr"][f], u.data[e + "pm"][f], u.data[e + "qt"][f], u.data[e + "bp"][f], u.data[e + "cd"], u.data[e + "on"], u.data[e + "tr"], u.data[e + "cg"][f], u.data.s_a, u.data.sx);
               cmCreateShopAction9Tag2(cm.data[e + "pr"][f], cm.data[e + "pm"][f], cm.data[e + "qt"][f], cm.data[e + "bp"][f], cm.data[e + "cd"], cm.data[e + "on"], cm.data[e + "tr"], cm.data[e + "cg"][f], cm.data.s_a, cm.data.sx);
            }
            cmDisplayShops();
         }
         if (cm.data.tid["3"] || b._cevent === "purchase") {
            e = "OrderTag_";
            cm.data[e + "on"] = cm.data["ShopAction9Tag_on"] || cm.data[e + "on"];
            cm.data[e + "tr"] = cm.data["ShopAction9Tag_tr"] || cm.data[e + "tr"];
            cm.data[e + "cd"] = cm.data["ShopAction9Tag_cd"] || cm.data[e + "cd"];
            cm.data[e + "sg"] = cm.data[e + "sg"] || cm.data.order_shipping;
            cm.data[e + "ct"] = cm.data[e + "ct"] || cm.data.customer_city;
            cm.data[e + "sa"] = cm.data[e + "sa"] || cm.data.customer_state;
            cm.data[e + "zp"] = cm.data[e + "zp"] || cm.data.customer_zip;
            cm.data.o_a = cm.prepareAttr("o_a", e, 50);
            cm.data.or = cm.prepareAttr("or", e, 15);
            cmCreateOrderTag(cm.data[e + "on"], cm.data[e + "tr"], cm.data[e + "sg"], cm.data[e + "cd"], cm.data[e + "ct"], cm.data[e + "sa"], cm.data[e + "zp"], cm.data.o_a, cm.data.or);
         }
         if (cm.data.tid["2"] || b._cevent === "register" || (cm.data["RegistrationTag_em"] && b._cevent === "purchase")) {
            e = "RegistrationTag_";
            cm.data[e + "cd"] = cm.data["ShopAction9Tag_cd"] || cm.data[e + "cd"] || cm.data.customer_id || b["ddo.p.pi.coremetrics.visitorID"] || "";
            cm.data[e + "ct"] = cm.data[e + "ct"] || cm.data.customer_city;
            cm.data[e + "sa"] = cm.data[e + "sa"] || cm.data.customer_state;
            cm.data[e + "zp"] = cm.data[e + "zp"] || cm.data.customer_zip;
            cm.data[e + "cy"] = cm.data[e + "cy"] || cm.data.customer_country;
            cm.data.rg = cm.prepareAttr("rg", e, 50);
            cmCreateRegistrationTag(cm.data[e + "cd"], cm.data[e + "em"], cm.data[e + "ct"], cm.data[e + "sa"], cm.data[e + "zp"], cm.data[e + "cy"], cm.data.rg);
         }
         if ((cm.data.tid["4"] && b._cevent != "purchase") || b._cevent === "cartview") {
            if (cm.data.order_currency)
               cmSetupOther({
                  "cm_currencyCode": cm.data.order_currency
               });
            e = "ShopAction5Tag_";
            cm.data[e + "pr"] = cm.data[e + "pr"] || cm.data.product_id;
            cm.data[e + "pm"] = cm.data[e + "pm"] || cm.data.product_name;
            cm.data[e + "qt"] = cm.data[e + "qt"] || cm.data.product_quantity;
            cm.data[e + "bp"] = cm.data[e + "bp"] || cm.data.product_unit_price;
            cm.data[e + "cg"] = cm.data[e + "cg"] || cm.data.product_category;
            for (f = 0; f < cm.data[e + "pr"].length; f++) {
               cm.data.s_a = cm.prepareAttr("s_a", e, 50, f);
               cm.data.sx = cm.prepareAttr("sx", e, 15, f);
               /* 2017-02-14 - jleon: START - Call alias instead of real method */
               // cmCreateShopAction5Tag(u.data[e + "pr"][f], u.data[e + "pm"][f], u.data[e + "qt"][f], u.data[e + "bp"][f], u.data[e + "cg"][f], u.data.s_a, u.data.sx);
               cmCreateShopAction5Tag2(cm.data[e + "pr"][f], cm.data[e + "pm"][f], cm.data[e + "qt"][f], cm.data[e + "bp"][f], cm.data[e + "cg"][f], cm.data.s_a, cm.data.sx);
            }
            cmDisplayShops();
         }
         if ((cm.data.tid["5"] && b._cevent != "purchase") || b._cevent === "prodview") {
            e = "ProductviewTag_";
            cm.data[e + "pr"] = cm.data[e + "pr"] || cm.data.product_id;
            cm.data[e + "pm"] = cm.data[e + "pm"] || cm.data.product_name;
            cm.data[e + "cg"] = cm.data[e + "cg"] || cm.data.product_category;
            cm.data.pr_a = cm.prepareAttr("pr_a", e, 50);
            if (cm.data[e + "pr"]instanceof Array && cm.data[e + "pr"].length > 1) {
               for (f = 0; f < cm.data[e + "pr"].length; f++) {
                  cm.data.pr_a = cm.prepareAttr("pr_a", e, 50, f);
                  cmCreateProductviewTag(cm.data[e + "pr"][f], cm.data[e + "pm"][f], cm.data[e + "cg"][f], cm.data.pr_a);
               }
            }
            else {
               cmCreateProductviewTag(cm.data[e + "pr"] + '', cm.data[e + "pm"] + '', cm.data[e + "cg"] + '', cm.data.pr_a, cm.data[e + "cm_vc"]);
            }
         }
         if (cm.data.tid["14"] || cm.data["ConversionEventTag_cid"] || b._cevent === "conversion") {
            e = "ConversionEventTag_";
            cm.data[e + "cid"] = cm.data[e + "cid"] || "conversion";
            cm.data[e + "cat"] = cm.data[e + "cat"] || "2";
            cm.data.c_a = cm.prepareAttr("c_a", e, 50);
            cm.data.cx = cm.prepareAttr("cx", e, 5);
            cmCreateConversionEventTag(cm.data[e + "cid"], cm.data[e + "cat"], cm.data[e + "ccid"], cm.data[e + "cpt"], cm.data.c_a, cm.data.cx);
            cm.data[e + "cid"] = "";
         }
         if (cm.data.tid["15"] || cm.data["ElementTag_eid"]) {
            e = "ElementTag_";
            cm.data.e_a = cm.prepareAttr("e_a", e, 50);
            cmCreateElementTag(cm.data[e + "eid"], cm.data[e + "ecat"], cm.data.e_a);
            cm.data[e + "eid"] = "";
         }
      }
      catch (error) {
         dl.log('+++DBDM-ERROR > coremetrics > prepareAndSend: ' + error);
      }
   };

   /*--------------------Callback function for eluminate.js--------------------*/
   cm.callBack = function () {
      try {
         /* 2017-02-14 - jleon: Mask original functions for shop5/shop9 events */
         if (!window.purchaseMasked) {
            window.purchaseMasked = true;
            window.cmCreateShopAction5Tag2 = window.cmCreateShopAction5Tag;
            window.cmCreateShopAction9Tag2 = window.cmCreateShopAction9Tag;
            window.cmCreateShopAction5Tag = function () {
               datalayer.util.maskPurchaseEvent("5", arguments);
            }
            window.cmCreateShopAction9Tag = function () {
               datalayer.util.maskPurchaseEvent("9", arguments);
            }
         }
         /* eluminte just loaded, check the queue and send tags to coremetrics */
         var data = {};
         while (data = cm.queue.shift()) {
            cm.data = data.data;
            cm.prepareAndSend(data.b);
         }
      }
      catch (error) {
         dl.log('+++DBDM-ERROR > coremetrics > callBack: ' + error);
      }
   }

   /*--------------------Main Coremetrics Function: Execute Coremetrics Tag--------------------*/
   cm.exec = function (a, b) {
      try {
         cm.data = {
               qsp_delim: "&",
               kvp_delim: "=",
               a: a,
               base_url: '//libs.coremetrics.com/eluminate.js',
               ClientID: '50200000',
               TestClientID: '80200000',
               DataCollectionMethod: true,
               DataCollectionDomain: 'data.coremetrics.com',
               CookieDomain: 'ibm.com',
               test_domains: ',dev.nwtw.ibm.com,testdata.coremetrics.com,',
               tid: {},
               test: false,
               pv_a: "",
               pv: "",
               s_a: "",
               sx: "",
               o_a: "",
               or: "",
               rg: "",
               pr_a: "",
               c_a: "",
               cx: "",
               e_a: "",
               product_id: [],
               product_name: [],
               product_category: [],
               product_quantity: [],
               product_unit_price: []
         };

         /* Call extension to set variables based on siteID */
         cm.extension(b);

         /* Map all attributes for Tag */
         cm.mapAttributes(b);

         if (cm.initialized) {
            /* Prepare and send the tag to Coremetrics */
            cm.prepareAndSend(b);
         }
         else {
            /* not initialized, and eluminate is not yet loaded, queue call, save attrs and incoming object */
            cm.queue.push({
               "data": cm.data,
               "b": b
            });
            if (!cm.scriptLoaded) {
               /* eluminate not loaded */
               dl.log('+++DBDM-LOG > coremetrics > exec: Initializing global client');
               cm.initClient();
               dl.log('+++DBDM-LOG > coremetrics > exec: Loading: ' + cm.data.base_url);
               cm.scriptLoaded = true;
               dl.fn.loadScript(cm.data.base_url, cm.callBack);
            }
         }
      }
      catch (error) {
         dl.log('+++DBDM-ERROR > coremetrics > exec: ' + error);
      }
   };

   /**
    * 
    ************************************************MODULE: V16ELU Object for Legacy Support ****************************
    *
    */
   var v16elu = {

         NTPT_DOWNLOADTYPES : "123,avi,bqy,doc,docx,dot,eps,exe,flv,gif,jpg,lwp,mas,mov,mp3,mp4,odp,ods,odt,otp,ots,ott,pdf,png,pot,pps,ppt,pptx,prz,rss,rtf,sh,stc,sti,stw,swf,sxc,sxi,sxw,tar,txt,wav,wma,wmv,xls,xlsx,xml,zip",
         NTPT_DOMAINLIST : ".bluemix.net,.cognos.com,.ibm.biz,.ibm.co,.ibm.com,.ibmcloud.com,.ibmdw.net,.jazz.net,.lotuslive.com,.mybluemix.net,.securityintelligence.com,.servicemanagementcenter.com,.smartercitiescloud.com,.softlayer.com,.webdialogs.com,.xtify.com",
         evhndlr : true,
         domainBlacklist : ".ibm.com,.mitre.org,.learnquest.com",
         utilstatsHelper: function(e) {
            ibmStats.event(e);
         },
   };

   /**
    * 
    ************************************************MODULE: MAIN-FUNCTION ************************************************
    *
    */
   (function () {
      /* create aliases to datalayer functions */
      datalayer.util = datalayer.fn;

      try {
         /* Set Environment for Coremetrics and SDK */
         window.loadingTime = new Date().getTime();

         /* Initialize Data Layer */
         dl.log('+++DBDM-LOG: Initializing Data Layer.');
         dl.init();

         /* Save the current URL for SPAs and don't run pageview twice */
         window.referrerSPA = digitalData.page.pageInfo.destinationURL;
         window.pageviewSPA = false;

         /* Set listener for clicks on hyperlinks and buttons on DOM ready */
         jQuery2(document).ready(function() {
            jQuery2('body').on('click', 'a,button', function (e) {
               datalayer.util.pageClickEventHandler(e);
            });
         });

         /************************* SEND PAGEVIEW **********************************/
         dl.log('+++DBDM-LOG: Sending pageview tag to Coremetrics');
         /* flatten the DDO into dl.data */
         data = {};
         dl.fn.event("view", data);

         /* Initialize ibmStats.event */
         dl.log('+++DBDM-LOG: Defining ibmStats.event()');
         dl.fn.ibmStatsEventInit();

         /* Set Data Layer Ready and trigger Event */
         digitalData.page.isDataLayerReady = true;

         /* Trigger Event for Data Layer Ready */
         dl.log('+++DBDM-LOG: Triggering datalayer_ready event!');
         jQuery2(document).trigger('datalayer_ready');
         /* Get execution time in milliseconds */
         var scriptEndTime = window.performance.now();
         dl.log('+++DBDM-LOG > ida_sdk.js: END MAIN BLOCK. Execution time: ' + Math.round(scriptEndTime - scriptStartTime) + 'ms. Now, accepting events...');
      }
      catch (error) {
         dl.log('+++DBDM-ERROR > ida_sdk.js: ' + error);
      }
   })();
}
catch (error) {
   /* Get execution time in milliseconds */ 
   var scriptEndTime = window.performance.now();   
   dl.log('+++DBDM-ERROR > ida_sdk.js: ' + error);
   dl.log('+++DBDM-LOG > ida_sdk.js: END MAIN BLOCK. Execution time: ' + Math.round(scriptEndTime - scriptStartTime) + 'ms');
}