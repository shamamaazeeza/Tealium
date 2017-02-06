/**
 * Id         : /tm-v1.0/common/js/coremetrics/ida_production.js
 * Scope      : All non-vxx IBM pages
 * Version    : 2017.01.31.1242
 *
 * Script used to load Tag Management (Tealium) on IBM web pages 
 *
 *  NOTE: FIND LATEST VERSION IN GITHUB:
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *
 */

/*
 * 20170130 - jleon: Code to identify Chrome 56+ Browsers
 */
window.isChrome56 = window.isChrome56 || function() {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    raw = raw ? parseInt(raw[2], 10) : false;
    if (typeof window.chrome !== 'undefined' && raw >= 56) {
        return true;
    } else {
        return false;
    }
}

/*----------------------Ensure that old browsers don't break when referencing the console-----------------------*/
if (!window.console) { window.console = {log: function(){}, error:function(){}, warn:function(){} }; }

if (window.isIdaStatsLoaded) {
   /* ida_stats.js has been loaded already, stop loading */
   console.log('+++DBDM-LOG > ida_production.js > ida_stats.js has already been loaded, exiting.');
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
         'cmRetrieveUserID',
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

         NTPT_DOWNLOADTYPES : "123,avi,bqy,doc,docx,dot,eps,exe,flv,gif,jpg,lwp,mas,mov,mp3,mp4,odp,ods,odt,otp,ots,ott,pdf,png,pot,pps,ppt,pptx,prz,rss,rtf,sh,stc,sti,stw,swf,sxc,sxi,sxw,tar,txt,wav,wma,wmv,xls,xlsx,xml,zip",
         NTPT_DOMAINLIST : ".bluemix.net,.cognos.com,.ibm.biz,.ibm.co,.ibm.com,.ibmcloud.com,.ibmdw.net,.jazz.net,.lotuslive.com,.mybluemix.net,.securityintelligence.com,.servicemanagementcenter.com,.smartercitiescloud.com,.softlayer.com,.webdialogs.com,.xtify.com",
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
               console.log('+++DBDM-ERROR > ida_production.js > IBMDependencyRegistry: ' + error);
            }
            /* >>>>> End of IBMDependencyRegistry */

            /* ----------------------------- TEALIUM IMPLEMENTATION - START -------------------------------- */
            (function(a,b,c,d) {
               /* If site ID has 'test' value at the start or end, load utag.js from main/qa or web/qa and not from main/prod */
               var site_id = "";    
               if (typeof (digitalData) !== 'undefined' && typeof (digitalData.page) !== 'undefined' && typeof (digitalData.page.pageInfo) !== 'undefined' 
                  && typeof (digitalData.page.pageInfo.ibm) !== 'undefined' && typeof (digitalData.page.pageInfo.ibm.siteID) !== 'undefined'){
                  site_id = digitalData.page.pageInfo.ibm.siteID.toLowerCase();
               }
               else if(document.querySelector('meta[name="IBM.WTMSite"]') !== null) {
                  site_id = document.querySelector('meta[name="IBM.WTMSite"]').content.toLowerCase();
               }
               if ((site_id !== "") && ((site_id.indexOf('test') === 0) || (site_id.lastIndexOf('test') != -1 && (site_id.lastIndexOf('test') === site_id.length - 4)))) {
            	   /* 
            	    * 20170206 - shruti: Adding web profile if URL contains ustream.tv
            	    */
            	   if (window.location.hostname.indexOf('ustream.tv')!= -1){
                	   a = '//tags.tiqcdn.com/utag/ibm/web/qa/utag.js';
            	   }
            	   else{
            		   a = '//tags.tiqcdn.com/utag/ibm/main/qa/utag.js';
            	   }                
               }
               else {
            	   /*
                    * 20170131 - jleon: Introducing web profile for Chrome 56+ browsers
                    * 20170206 - shruti: Adding web profile if URL contains ustream.tv
                    */
            	   if ((window.isChrome56()) || (window.location.hostname.indexOf('ustream.tv')!= -1)){
            		   a = '//tags.tiqcdn.com/utag/ibm/web/prod/utag.js';
            	   }
            	   else{
            		   a = '//tags.tiqcdn.com/utag/ibm/main/prod/utag.js';
            	   }            	   
               }               
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

   /*---------------------------------------------------MAIN FUNCTION---------------------------------------------------------*/
    if (navigator.platform.search("AIX") < 0) {
        if (typeof (window.ida_eluminate_enabled) !== "undefined" || typeof (window.tealium_enabled) !== "undefined") {
            if (!window.ida_eluminate_enabled || !window.tealium_enabled) {} else {
                v16elu.init()
            }
        } else {
            v16elu.init()
        }
    }
}