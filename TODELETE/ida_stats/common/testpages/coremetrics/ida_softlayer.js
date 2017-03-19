/*
 * Id         : /tm-v1.0/common/testpages/coremetrics/testpages/ida_testpages/ida_softlayer.js
 * Scope      : All IBM pages
 * Description: Script used to load Tag Management (Tealium) on IBM web pages
 * 
 */
(function() {
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
                         'cmDisplayShop5s'
                         ],
                         queue = [];

   (function init() {
      if (!isOriginSetLoaded()) {
         for (var i = 0; i < ghostFunctions.length; i++) {
            createGhostFunction(ghostFunctions[i]);
         }

         listenForOriginSet();
      }
   })();

   function isOriginSetLoaded() {
      for (var i = 0; i < ghostFunctions.length; i++) {
         if (typeof(window[ghostFunctions[i]]) !== 'function' || window[ghostFunctions[i]].isGhost) {
            return false;
         }
      }

      return true;
   }

   function createGhostFunction(ghostFunctionName) {
      window[ghostFunctionName] = function() {
         queue.push({
            functionName: ghostFunctionName,
            args: arguments
         });
      }

      window[ghostFunctionName].isGhost = true;
   }

   function listenForOriginSet() {
      setTimeout(function() {
         if (isOriginSetLoaded()) {
            delegateQueue();
         } else {
            listenForOriginSet();
         }
      }, 50);
   }

   function delegateQueue() {
      for (var i = 0; i < queue.length; i++) {
         window[queue[i].functionName].apply(this, queue[i].args);
      }
   }
})();

//----------------------Ensure that old browsers don't break when referencing the console-----------------------//
if (!window.console) { window.console = {log: function(){}, error:function(){} }; }

//----------------------ibmStats.event function for Tealium started---------------------------------------------//
function storeIBMStatsEvent(data,obj,linkIdentifier){
   var statsObjListString = JSON.stringify(obj).replace(/-_-/g,"---");
   var statsObjList = JSON.parse(statsObjListString);
   statsObjList.event_name = linkIdentifier;
   window.arrObjList.push(statsObjList,window.arrObjList.length);
   window.arrObjList.pop();
   window.onload = function(){
      if(typeof window.utag !== "undefined" && typeof window.utag.data !== "undefined"){
         modifySiteID = checkMarketingData();
         for(var i=0;i<window.arrObjList.length;i++){
            data = JSON.parse(JSON.stringify(window.arrObjList[i]));
            data.event_name = window.arrObjList[i].event_name;
            data.evPageLoadingTime = utag.data["page_loadingTime"];
            data.evTriggerTime = utag.data["page_loadingTime"];
            data.IbmerVal = utag.data["IBMER_value"];
            data.evPageLocation = window.location.href.replace(/-_-/g,"---");
            data.categoryVal = utag.data["category_id"];
            data.evClientID = modifySiteID;
            data.site_id = utag.data['site_id'];
            //for generating product view tag
            if(window.arrObjList[i].event_name == "ibmStatsEvent_product" && typeof window.pageViewAttributes !== "undefined"){
               var x = window.pageViewAttributes.split("-_-");
               for(var k=0; k<= x.length; k++){
                  var pr_y = "productTag_a"+k;
                  if(x[k] !== "undefined" || x[k] !== "")	data[pr_y] = x[k];
               }
               if(typeof window.arrObjList[i].serviceType !== "undefined") data["productTag_serviceType"] = window.arrObjList[i].serviceType;
            }
            utag.link(data);
         }
      }
   }
}

function createUtagLinkObject(obj){
   var pageLocation = window.location.href.replace(/-_-/g,"---"),
   eventTriggerTime = new Date().getTime(),
   linkIdentifier = "ibmStatsEvent_element",
   data = new Object();

   // RTC: Story# 958230, Defect# 967620, and Defect# 967890. Adding code snippet in Support of Conversion Events.
   if (obj.type) {
      if (!obj.executionPath && obj.eventCategoryGroup) {
         /* ibmEvGroup is set based on either executionPath or eventCategory Group */
         obj.executionPath = obj.eventCategoryGroup;
      }

      if (obj.type == "conversion" ) {
         obj.ibmConversion = "true";
      }

      obj.convtype      = obj.eventAction;
      obj.ibmEV         = obj.primaryCategory;
      obj.ibmEvAction   = obj.eventName;
      obj.ibmEvGroup    = obj.executionPath;
      obj.ibmEvModule   = obj.eventCallBackCode;
      obj.ibmEvSection  = obj.execPathReturnCode;
   }

   if(obj.ibmConversion && obj.ibmConversion == "true"){
      if (!obj.point && obj.convtype && obj.convtype == "1") obj.point = '10';
      if (!obj.point && obj.convtype && obj.convtype == "2") obj.point = '20';
      linkIdentifier = "ibmStatsEvent_conversion";
   }else if(obj.ibmProductTag && obj.ibmProductTag == "true"){
      linkIdentifier = "ibmStatsEvent_product";
   }
   if(!obj.ibmConversion && !obj.ibmProductTag) {
      obj.ibmEvActionAttribute = obj.ibmEvAction;
      if(obj.ibmEvAction && typeof obj.ibmEvAction !== "undefined" && obj.ibmEvAction.length > 50){
         obj.ibmEvAction = obj.ibmEvAction.substring(0,22) + "..." + obj.ibmEvAction.substring(obj.ibmEvAction.length - 25, obj.ibmEvAction.length);
      }
   }
   if(typeof window.utag !== "undefined" && typeof window.utag.data !== "undefined" && linkIdentifier !== "ibmStatsEvent_product"){
      modifySiteID = checkMarketingData();
      if(typeof window.ibm_global_data !== "undefined" && typeof ibm_global_data["Site ID"] != "undefined" && 
            typeof obj.ibmEV !== "undefined" && (obj.ibmEV.toLowerCase().indexOf("rich_media_service") !== -1 || obj.ibmEV.toLowerCase().indexOf("video player") !== -1)){
         obj.ibmEV = "VIDEO - " + modifySiteID.substring(modifySiteID.indexOf('|')+1,modifySiteID.length);
         if(obj.ibmEvAction.toLowerCase() == "start" || obj.ibmEvAction.toLowerCase() == "played"){
            obj.ibmEvName = obj.ibmEvName + " - Play";
            obj.convtype = 1;
            trackingConversionEvent(linkIdentifier,obj);
         }else if (obj.ibmEvAction.toLowerCase() == "finish" || obj.ibmEvAction.toLowerCase() == "ended"){
            obj.ibmEvName = obj.ibmEvName + " - End";
            obj.convtype = 2;
            trackingConversionEvent(linkIdentifier,obj);
         }
      }
      var statsObjListString = JSON.stringify(obj).replace(/-_-/g,"---");
      data = JSON.parse(statsObjListString);
      data.event_name = linkIdentifier;
      data.evPageLoadingTime = utag.data["page_loadingTime"];
      data.IbmerVal = utag.data["IBMER_value"];
      data.evPageLocation = pageLocation;
      data.evTriggerTime = eventTriggerTime;
      data.categoryVal = utag.data["category_id"];
      data.evClientID = modifySiteID;
      data.site_id = utag.data['site_id'];
      utag.link(data);
   }else{
      storeIBMStatsEvent(data,obj,linkIdentifier);
   }
   //--------------------------------------------Call Event IBMDependencyRegistry---------------------------------------------//
   /**
    * Id      : IBMDependencyRegistry
    * Author  : devarajk@us.ibm.com
    * MemberOf: Tag Management Registry 
    * Date    : 2016-08-23
    * Description: 
    */
   //>>>>> Start of Call IBMDependencyRegistry
   try {
      if (window.IBMDependencyRegistry) {
         window.IBMDependencyRegistry.on('tealium.IBMSimpleEventRouter.loaded',
               function() {
                  window.IBMSimpleEventRouter.idaEvent(obj);
               });
      }
   } 
   catch (error) {
      console.log('Error occurred in IBMDependencyRegistry event registration. Error is: ' + error);
   }
   //>>>>> End of Call IBMDependencyRegistry
}

function trackingConversionEvent(utagLinkIdentifier,obj){
   utagLinkIdentifier = "ibmStatsEvent_conversion";
   utag.link({
      event_name : utagLinkIdentifier,
      ibmEV : obj.ibmEV,
      ibmEvAction : obj.ibmEvName,
      convtype : obj.convtype,
      evClientID : modifySiteID
   });
}

function checkMarketingData() {
   try {
      var modify_siteId = window.utag.data.concat_clientid;
      var x = window.utag.data.concat_clientid.substring(0,window.utag.data.concat_clientid.indexOf('|'));
      if (typeof window.ibm_global_data !== "undefined" && typeof ibm_global_data["Site ID"] != "undefined") {
         if (utag.data['IBMER_value'] == "1") {
            modify_siteId = x + "|" + "New_IBMER";
         } 
         else if (window.ibm_global_data["Site ID"] !== undefined) {
            modify_siteId = x + "|" + window.ibm_global_data["Site ID"];
         }
      }
      return modify_siteId;
   } 
   catch (error) {
      console.error('+++TME-ERROR - ida_production.js: ' + error);
   }
}
//----------------------ibmStats.event function for Tealium ended---------------------------------------------//

var v16elu = {

      NTPT_DOWNLOADTYPES : "bqy,doc,dot,exe,flv,jpg,png,mov,mp3,pdf,pps,ppt,rss,sh,swf,tar,txt,wmv,xls,xml,zip,avi,eps,gif,lwp,mas,mp4,pot,prz,rtf,wav,wma,123,odt,ott,sxw,stw,docx,odp,otp,sxi,sti,pptx,ods,ots,sxc,stc,xlsx",
      NTPT_DOMAINLIST : ".ibm.co,.ibm.com,.lotuslive.com,.cognos.com,.webdialogs.com,.servicemanagementcenter.com,.xtify.com,.ibmcloud.com,.ibmdw.net,.bluemix.net,.smartercitiescloud.com",
      evhndlr : true,
      domainBlacklist : ".ibm.com,.mitre.org,.learnquest.com",

      //-----------------------------function call on completely loading page--------------------------------//
      onPageLoad : function(){
         if(window.utag && window.utag.sender) v16elu.storeTealiumPageviewData();
      },

      //------------------------------function call to store all page view attributes in Tealium-------------//
      storeTealiumPageviewData : function(){
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
                     else if (typeof utag.data[a] !== "undefined" && a.indexOf('meta.') !== -1) arr[k] = utag.data[a];//to prioritize the meta tag values over DDO
                  }
               }
            }
         }
         for(var i=1;i<=arr.length;i++){
            window.pageViewAttributes += arr[i] + "-_-";
         }
      },

      init : function () {
         var _this = this;
         window.loadingTime = new Date().getTime();

         //set cmTagQueue
         if (typeof(window.cmTagQueue) == 'undefined')
            window.cmTagQueue = [];

         window.cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true}]);
         //cookie migration from IBM to non IBM pages
         if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') !== -1){
            window.cmTagQueue.push(['cmSetupCookieMigration', true, true, null, this.domainBlacklist]);
         }

         //cookie migration code for all non IBM pages
         if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') == -1){
            window.cmTagQueue.push(['cmSetupCookieMigration', true, true, this.NTPT_DOMAINLIST]);
         }
         /* This is not in the PROD version of the script
          * window.cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true}]);
          */
         //getting the value of IBMer for non ibm.com
         if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') == -1){
            requestServerCall = function (url) {
               var s = document.createElement('script');
               s.type = 'text/javascript';
               s.src = url;
               document.getElementsByTagName("head")[0].appendChild(s);
            },
            IBMISE_BOOTSTRAP = function (data) {
               //IBMISP cookie value for non ibm.com
               if(data.IBMer)	window.NTPT_IBMer = data.IBMer;
               if(data.IBMIXS)	window.IBMIXS = data.IBMIXS;
            }
            requestServerCall("//www.ibm.com/gateway/gp/getProfile/?cb=260:IBMISE_BOOTSTRAP&cc=us&lc=en");   
         }
         //----------------------------- IBMDependencyRegistry --------------------------------//
         /**
          * Id      : IBMDependencyRegistry
          * Author  : devarajk@us.ibm.com
          * MemberOf: Tag Management Registry 
          * Date    : 2016-08-23
          * Description: 
          */
         //>>>>> Start of IBMDependencyRegistry
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
            console.log('Error in IBMDependencyRegistry. Error is: ' + error);
         }
         //>>>>> End of IBMDependencyRegistry
         //----------------------------- TEALIUM IMPLEMENTATION - START --------------------------------//
         var fileref=document.createElement('script')
         fileref.setAttribute("type","text/javascript")
         fileref.setAttribute("src", "//tags.tiqcdn.com/utag/ibm/dev-sandbox/dev/utag.sync.js");
         document.getElementsByTagName("head")[0].appendChild(fileref);
         (function(a,b,c,d) {
            a = '//tags.tiqcdn.com/utag/ibm/dev-sandbox/dev/utag.js';
            b = document;
            c = 'script';
            d = b.createElement(c);
            d.src = a;
            d.type = 'text/java' + c;
            d.async = true;
            a = b.getElementsByTagName(c)[0];
            a.parentNode.insertBefore(d,a);
         })();
         //----------------------------- TEALIUM IMPLEMENTATION - END --------------------------------//

         if (window.addEventListener) {
            window.addEventListener('load', v16elu.onPageLoad, false);
         }
         else if (window.attachEvent) {
            window.attachEvent('onload', v16elu.onPageLoad );
         }
      }
};

/*---------------------------------------------------MAIN FUNCTION---------------------------------------------------------*/
var ibmStats = ibmStats || {};
var modifySiteID = "";
window.arrObjList = new Array();
ibmStats.event = function (obj) {
   //creates Coremetrics element tag(conversion of Unica event to Coremetrics)
   createUtagLinkObject(obj);
   //v16elu.create_cmElement(obj);//for product view tag
};

//---------------------------------- Ajax function to bind page view tag -----------------------------//
bindPageViewWithAnalytics = function(){
   if(typeof window.utag !== "undefined") utag.view(utag.data);
}

/*---------------------------------------------------Get System Initialized---------------------------------------------------------*/
if (typeof(window.ida_eluminate_enabled) !=='undefined' || typeof(window.tealium_enabled) !=='undefined') {
   // we search if this variable is set on false
   if (!window.ida_eluminate_enabled || !window.tealium_enabled) {/*do nothing*/}
   else v16elu.init();
} else {
   // we are enebled for all pages
   v16elu.init();
}