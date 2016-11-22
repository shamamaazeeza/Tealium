/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/marketing-events.js
 * Extension Name: marketing-events.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * Version       : 2016.11.22.1038
 *
 * This script is executed when an page click event is trapped in jQuery
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
var tmeid="marketing-events.js.js";

/*--------------------Page Events Handling: ibmStats.event--------------------*/
function checkMarketingData() {
   try {
      var modify_siteId = null;
      if (typeof window.utag !== "undefined" && typeof window.utag.data !== "undefined") {
         modify_siteId = window.utag.data.concat_clientid;
         var x = window.utag.data.concat_clientid.substring(0,window.utag.data.concat_clientid.indexOf('|'));
         if (typeof window.ibm_global_data !== "undefined" && typeof ibm_global_data["Site ID"] != "undefined") {
            if (utag.data['IBMER_value'] == "1") {
               modify_siteId = x + "|" + window.ibm_global_data["Site ID"] + "_I";
            }
            else if (window.ibm_global_data["Site ID"] !== undefined) {
               modify_siteId = x + "|" + window.ibm_global_data["Site ID"];
            }
         }
      }
      return modify_siteId;
   } 
   catch (error) {
      console.error('+++DBDM-ERROR > marketing-events.js > checkMarketingData: ' + error);
   }
}

function setCookie(name, value){
   document.cookie=name + "=" + escape(value) + "; path=/";
}

function getCookie(name) {
   match = document.cookie.match(new RegExp(name + '=([^;]+)'));
   if (match) return match[1];
}

function createUtagLinkObject(obj) {
   try {
      var data = new Object();
      obj.event_name = "ibmStatsEvent_element";

      obj.evTriggerTime = new Date().getTime();

      // RTC: Story# 958230, Defect# 967620, and Defect# 967890. Adding code snippet in Support of Conversion Events.
      if (obj.type) {
         // set type of conversion for old code
         if (obj.type == "conversion" ) {
            obj.ibmConversion = "true";
         }
         else if (obj.type == "element" ) {
            obj.ibmElementTag = "true";
         }
         else if (obj.type == "product" ) {
            obj.ibmProductTag = "true";
         }
         // set value to old elements of object
         obj.convtype       = obj.eventAction        || "";
         obj.ibmEV          = obj.primaryCategory    || "";
         obj.ibmEvAction    = obj.eventName          || "";
         obj.ibmEvName      = obj.eventCategoryGroup || "";
         obj.ibmEvGroup     = obj.executionPath      || "";
         obj.ibmEvModule    = obj.eventCallBackCode  || "";
         obj.ibmEvSection   = obj.execPathReturnCode || "";
         obj.ibmEvTarget    = obj.targetURL          || "";
         obj.ibmEvLinkTitle = obj.targetTitle        || "";
         obj.ibmEvFileSize  = obj.targetSize         || "";

         if (typeof(obj.eventPoints) !== "undefined") {
            obj.point = obj.eventPoints;
         }
      }
      else {
         // OLD event object definition - set values to new object definition
         obj.eventAction        = obj.convtype       || "";
         obj.primaryCategory    = obj.ibmEV          || "";
         obj.eventName          = obj.ibmEvAction    || "";
         obj.eventCategoryGroup = obj.ibmEvName      || "";
         obj.executionPath      = obj.ibmEvGroup     || "";
         obj.eventCallBackCode  = obj.ibmEvModule    || "";
         obj.execPathReturnCode = obj.ibmEvSection   || "";
         obj.targetURL          = obj.ibmEvTarget    || "";
         obj.targetTitle        = obj.ibmEvLinkTitle || "";
         obj.targetSize         = obj.ibmEvFileSize  || "";
         // set default for type
         obj.type = "element"
      }

      if(obj.ibmConversion && obj.ibmConversion == "true") {
         if (!obj.point && obj.convtype && obj.convtype == "1") obj.point = '10';
         if (!obj.point && obj.convtype && obj.convtype == "2") obj.point = '20';
         obj.event_name = "ibmStatsEvent_conversion";
         obj.type = "conversion"
      } 
      else if(obj.ibmProductTag && obj.ibmProductTag == "true") {
         obj.event_name = "ibmStatsEvent_product";
         obj.type = "product"
      }

      // Make sure that the eventName is truncated if needed to 50 characters
      if(obj.type === "element") {
         obj.ibmEvActionAttribute = obj.ibmEvAction;
         obj.eventName = obj.ibmEvAction = window.datalayer.util.parseEventNameGen(obj.ibmEvAction,50)
      }

      var statsObjListString = JSON.stringify(obj).replace(/-_-/g,"---");
      data = JSON.parse(statsObjListString);
      data.page_loadingTime  = window.digitalData.page.session.pageloadEpoch;
      data.IBMER_value       = window.digitalData.user.segment.isIBMer;
      data.destinationURL    = window.digitalData.page.pageInfo.destinationURL.replace(/-_-/g,"---");
      data.uPageViewID       = window.digitalData.page.session.uPageViewID;
      data.category_id       = window.digitalData.page.category.primaryCategory;
      data.concat_clientid   = modifySiteID;
      data.site_id           = window.digitalData.page.pageInfo.ibm.siteID;
      data.iniSiteID         = window.digitalData.page.pageInfo.ibm.iniSiteID;
      data.urlID             = window.digitalData.page.pageInfo.urlID;

      if (data.event_name !== "ibmStatsEvent_product") {
         modifySiteID = checkMarketingData();
         if (typeof window.ibm_global_data !== "undefined" && typeof ibm_global_data["Site ID"] != "undefined" && 
               typeof data.ibmEV !== "undefined" && (data.ibmEV.toLowerCase().indexOf("rich_media_service") !== -1 || data.ibmEV.toLowerCase().indexOf("video player") !== -1)) {
            data.primaryCategory = data.ibmEV = "VIDEO - " + modifySiteID.substring(modifySiteID.indexOf('|')+1,modifySiteID.length);
            if(data.ibmEvAction.toLowerCase() == "start" || data.ibmEvAction.toLowerCase() == "played") {
               var dataConversion = data;
               dataConversion.event_name="ibmStatsEvent_conversion";
               dataConversion.eventCategoryGroup = dataConversion.ibmEvName = dataConversion.ibmEvName + " - Play";
               dataConversion.eventAction = dataConversion.convtype = 1;
               utag.link(dataConversion);
            }
            else if (obj.ibmEvAction.toLowerCase() == "finish" || obj.ibmEvAction.toLowerCase() == "ended") {
               var dataConversion = data;
               dataConversion.event_name="ibmStatsEvent_conversion";
               dataConversion.eventCategoryGroup = dataConversion.ibmEvName = dataConversion.ibmEvName + " - End";
               dataConversion.eventAction = dataConversion.convtype = 2;
               utag.link(dataConversion);
            }
         }
         utag.link(data);
      }
      else {
         //for generating product view tag
         if (typeof(window.pageViewAttributes) !== "undefined") {
            //For checking the Product Id from previous ECOM pages
            if (data.iniSiteID.toLowerCase().indexOf("ecom") !== -1 || data.concat_clientid.toLowerCase().indexOf("ecom") !== -1) {
               var prevProdID = getCookie("prevProdID");
               if (prevProdID !== null && typeof(window.digitalData.product[0].productInfo.productID) !== "undefined") {
                  if (window.digitalData.product[0].productInfo.productID == prevProdID) data.event_name = "doNotFire";
               }
               setCookie("prevProdID", obj.proID);
            }
            var x = window.pageViewAttributes.split("-_-");
            for (var k=0; k<= x.length; k++) {
               var pr_y = "productTag_a"+k;
               if (x[k] !== "undefined" || x[k] !== "")   data[pr_y] = x[k];
            }
            if (typeof data.serviceType !== "undefined") data["productTag_serviceType"] = data.serviceType;
         }
         if (data.event_name !== "doNotFire") utag.link(data);
      }
   }
   catch (error) {
      console.log('+++DBDM-WARNING > marketing-events.js > createUtagLinkObject: ' + error);
   }
   //--------------------Call Event IBMDependencyRegistry--------------------//
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
      console.log('+++DBDM-WARNING > marketing-events.js > IBMDependencyRegistry: ' + error);
   }
   //>>>>> End of Call IBMDependencyRegistry
}

/*--------------------MAIN FUNCTION--------------------*/
try {
   var modifySiteID = "";
   window.arrObjList = new Array();
   window.ibmStats = ibmStats || {};

   //-------------------- ibmStats.event handler--------------------//
   window.ibmStats.event = function (obj) {
      // Ensure that the digitalData Object has not been reset by the page
      if (typeof(window.digitalData.page.isDataLayerReady) === "undefined") {
         window.datalayer.update();
         console.log('+++DBDM-WARNING > marketing-events.js: digitalData was reset, recreating datalayer');
      }
      createUtagLinkObject(obj);
   };

   //-------------------- Ajax function to bind page view tag -----------------------------//
   window.bindPageViewWithAnalytics = function() {
      if(typeof window.utag !== "undefined") utag.view(utag.data);
   }
}
catch (error) {
   console.error('+++DBDM-ERROR > marketing-events.js: ' + error);
}