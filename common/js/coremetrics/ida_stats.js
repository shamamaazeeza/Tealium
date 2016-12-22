/**
 * Id         : /tm-v1.0/common/js/coremetrics/ida_stats.js
 * Scope      : All v18+ IBM pages
 * Version    : 2016.12.22.1641
 *
 * Script used to load Tag Management (Tealium) on IBM web pages 
 *
 *  NOTE: FIND LATEST VERSION IN GITHUB:
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *
 */

/*----------------------Ensure that old browsers don't break when referencing the console-----------------------*/
if (!window.console) { window.console = {log: function(){}, error:function(){}, warn:function(){} }; }

/* Make sure all conditions are set to run */
if (window.isIdaStatsLoaded
      || (typeof(window.eluminate_enabled) !== 'undefined' && !window.eluminate_enabled)
      || (typeof(window.tealium_enabled) !== 'undefined' && !window.tealium_enabled)) {
   if (window.isIdaStatsLoaded) {
      /* ida_stats.js has been loaded already, stop loading */
      console.log('+++DBDM-LOG > ida_stats.js: ida_stats.js has already been loaded, exiting.');
   }
   else {
      console.log('+++DBDM-LOG > ida_stats.js: Conditions not met, exiting.');
   }
}
else {
   /* Set flag that code has been loaded */
   window.isIdaStatsLoaded = true;

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
         'ibmStats.event',
         'bindPageViewWithAnalytics'];
      window.ghostQueue = [];

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

   var v16elu = {

         NTPT_DOWNLOADTYPES : "bqy,doc,dot,exe,flv,jpg,png,mov,mp3,pdf,pps,ppt,rss,sh,swf,tar,txt,wmv,xls,xml,zip,avi,eps,gif,lwp,mas,mp4,pot,prz,rtf,wav,wma,123,odt,ott,sxw,stw,docx,odp,otp,sxi,sti,pptx,ods,ots,sxc,stc,xlsx",
         NTPT_DOMAINLIST : ".ibm.co,.ibm.com,.lotuslive.com,.cognos.com,.webdialogs.com,.servicemanagementcenter.com,.xtify.com,.ibmcloud.com,.ibmdw.net,.bluemix.net,.smartercitiescloud.com",
         evhndlr : true,
         domainBlacklist : ".ibm.com,.mitre.org,.learnquest.com",

         /* ------------------------------function call to store all page view attributes in Tealium------------- */
         storeTealiumPageviewData : function(){
            /* 
             * 2016-12-12 - jleon: THIS SHOULD BE DEPRECATED, no longer need to have the 
             * data from the pageview, instead use the settings in the Coremetrics tag 
             */
            var arr = new Array();
            window.pageViewAttributes = "";
            var x = JSON.stringify(window.utag.sender).split(/[}]/);
            for (var i=0;i<x.length;i++){
               var firstPart = x[i].split('{')[0],
               lastPart = x[i].split('{')[1];
               if (firstPart.indexOf("map") !== -1 && typeof lastPart !== "undefined") {
                  var arr1 = lastPart.split(',');
                  for (var j=0;j<arr1.length;j++){
                     if (typeof arr1[j].split(':')[1] !== "undefined" && arr1[j].split(':')[1].indexOf('PageviewTag_pv_a') !== -1){
                        var a = arr1[j].split(':')[0].replace(/[""]/g,''),
                        k = arr1[j].split(':')[1].substring(17,arr1[j].split(':')[1].length-1);
                        if (typeof utag.data[a] !== "undefined" && (arr[k] == "" || arr[k] == undefined)) arr[k] = utag.data[a];
                        else if (typeof utag.data[a] !== "undefined" && a.indexOf('meta.') !== -1) arr[k] = utag.data[a]; /* to prioritize the meta tag values over DDO */
                     }
                  }
               }
            }
            for(var i=1;i<=arr.length;i++){
               window.pageViewAttributes += arr[i] + "-_-";
            }
         },

         /* -----------------------------function call on completely loading page-------------------------------- */
         onPageLoad : function(){
            if(window.utag && window.utag.sender) v16elu.storeTealiumPageviewData();
         },

         utilstatsHelper: function(e) {
            ibmStats.event(e);
         },

         init : function () {
            var _this = this;
            window.loadingTime = new Date().getTime();

            /* set cmTagQueue */
            if (typeof(window.cmTagQueue) == 'undefined')
               window.cmTagQueue = [];

            /* cookie migration from IBM to non IBM pages */
            if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') !== -1){
               window.cmTagQueue.push(['cmSetupCookieMigration', true, true, null, this.domainBlacklist]);
            }

            /* cookie migration code for all non IBM pages */
            if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') == -1){
               window.cmTagQueue.push(['cmSetupCookieMigration', true, true, this.NTPT_DOMAINLIST]);
            }

            window.cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true}]);

            /* getting the value of IBMer for non ibm.com */
            if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') == -1){
               requestServerCall = function (url) {
                  var s = document.createElement('script');
                  s.type = 'text/javascript';
                  s.src = url;
                  document.getElementsByTagName("head")[0].appendChild(s);
               },
               IBMISE_BOOTSTRAP = function (data) {
                  /* IBMISP cookie value for non ibm.com */
                  if(data.IBMer) window.NTPT_IBMer = data.IBMer;
                  if(data.IBMIXS) window.IBMIXS = data.IBMIXS;
               }
               requestServerCall("//www.ibm.com/gateway/gp/getProfile/?cb=260:IBMISE_BOOTSTRAP&cc=us&lc=en");   
            }
            /* ----------------------------- IBMDependencyRegistry -------------------------------- */
            /**
             * Id      : IBMDependencyRegistry
             * Author  : devarajk@us.ibm.com
             * MemberOf: Tag Management Registry 
             * Date    : 2016-08-23
             * Description: 
             */
            /* >>>>> Start of IBMDependencyRegistry */
            try {
               (function() {
                  window.IBMDependencyRegistry = window.IBMDependencyRegistry || {
                     isLoaded : {},
                     listeners : [],
                     check : function(dependencies) {
                        for (var i = 0, l = dependencies.length; i < l; i++) {
                           if (!this.isLoaded[dependencies[i]])
                              return false;
                        }
                        return true;
                     },
                     on : function(dependencies, callback) {
                        if (typeof callback !== 'function')
                           return false;
                        if (typeof dependencies === 'string')
                           dependencies = [dependencies];
                        if (this.check(dependencies)) {
                           callback();
                        } else {
                           this.listeners.push({
                              dependencies : dependencies,
                              callback : callback
                           });
                        }
                     },
                     emit : function(name) {
                        this.isLoaded[name] = 1;
                        var toCall = [];
                        for (var i = this.listeners.length - 1; i > -1; i--) {
                           var listener = this.listeners[i];
                           if (this.check(listener.dependencies)) {
                              toCall.push(this.listeners.splice(i, 1)[0]);
                           }
                        }
                        for (i = 0; i < toCall.length; i++) {
                           toCall[i].callback();
                        }
                     }
                  };
               })();
            }
            catch (error) {
               console.log('+++DBDM-ERROR > ida_stats.js > IBMDependencyRegistry: ' + error);
            }
            /* >>>>> End of IBMDependencyRegistry */

            /* ----------------------------- TEALIUM IMPLEMENTATION - START -------------------------------- */
            (function(a,b,c,d) {
               a = '//tags.tiqcdn.com/utag/ibm/main/prod/utag.js';
               b = document;
               c = 'script';
               d = b.createElement(c);
               d.src = a;
               d.type = 'text/java' + c;
               d.async = true;
               a = b.getElementsByTagName(c)[0];
               a.parentNode.insertBefore(d,a);
               d.onload = function (){
                  if(typeof window.utag !== "undefined" && typeof window.utag.data !== "undefined") {
                     v16elu.siteID = window.utag.data["site_id"] || "";
                     if (v16elu.siteID.toLowerCase() == "ecom") {
                        window.cmTagQueue.push(['cmSetupNormalization', 'krypto-_-krypto']); 
                     }

                     if (v16elu.siteID.toLowerCase() == "p4sc") {
                        window.cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true, "cm_FormPageID" : true}]);
                     }
                     else {
                        window.cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true}]);
                     }
                  }
               }
            })();
            /* ----------------------------- TEALIUM IMPLEMENTATION - END -------------------------------- */

            if (window.addEventListener) {
               window.addEventListener('load', v16elu.onPageLoad, false);
            }
            else if (window.attachEvent) {
               /* Support for IE* and older versions */
               window.attachEvent('onload', v16elu.onPageLoad );
            }
         }
   };
   
   v16elu.init();
}