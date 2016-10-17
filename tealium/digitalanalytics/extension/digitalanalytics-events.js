/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/digitalanalytics-events.js
 * Extension Name: digitalanalytics-events.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
var tmeid="digitalanalytics-events.js";

/*---------------------------------------------------Page Events Handling: ibmStats.event---------------------------------------------------------*/
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
		console.error('+++TME-ERROR > digitalanalytics-events.js > checkMarketingData: ' + error);
	}
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

function setCookie(name, value){
	document.cookie=name + "=" + escape(value) + "; path=/";
}

function getCookie(name) {
	match = document.cookie.match(new RegExp(name + '=([^;]+)'));
	if (match) return match[1];
}

function storeIBMStatsEvent(data,obj,linkIdentifier) {
   var statsObjListString = JSON.stringify(obj).replace(/-_-/g,"---");
   var statsObjList = JSON.parse(statsObjListString);
   statsObjList.event_name = linkIdentifier;
   window.arrObjList.push(statsObjList,window.arrObjList.length);
   window.arrObjList.pop();
   window.onload = function() {
      if(typeof window.utag !== "undefined" && typeof window.utag.data !== "undefined") {
         modifySiteID = checkMarketingData();
         for(var i=0;i<window.arrObjList.length;i++) {
            data = JSON.parse(JSON.stringify(window.arrObjList[i]));
            data.event_name        = window.arrObjList[i].event_name;
            data.evPageLoadingTime = window.digitalData.page.session.pageloadEpoch;
            data.IbmerVal          = window.digitalData.user.segment.isIBMer;
            data.evPageLocation    = window.location.href.replace(/-_-/g,"---");
            data.categoryVal       = window.digitalData.page.category.primaryCategory;
            data.evClientID        = modifySiteID;
            data.site_id           = window.digitalData.page.pageInfo.ibm.siteID;
            data.iniSiteID         = window.digitalData.page.pageInfo.ibm.iniSiteID;            
            //for generating product view tag
            if(window.arrObjList[i].event_name == "ibmStatsEvent_product" && typeof window.pageViewAttributes !== "undefined") {
               //For checking the Product Id from previous ECOM pages
               if(window.utag.data.old_site_id.toLowerCase() == "ecom" || modifySiteID.toLowerCase().indexOf("ecom") !== -1) {
                  var prevProdID = getCookie("prevProdID");
                  if(prevProdID !== null && typeof window.digitalData.product[0].productInfo.productID !== "undefined") {
                     if(window.digitalData.product[0].productInfo.productID == prevProdID)   data.event_name = "doNotFire";
                  }
                  setCookie("prevProdID", obj.proID);
               }
               var x = window.pageViewAttributes.split("-_-");
               for(var k=0; k<= x.length; k++) {
                  var pr_y = "productTag_a"+k;
                  if(x[k] !== "undefined" || x[k] !== "")   data[pr_y] = x[k];
               }
               if(typeof window.arrObjList[i].serviceType !== "undefined") data["productTag_serviceType"] = window.arrObjList[i].serviceType;
            }
            utag.link(data);
         }
      }
      else {
         console.log('+++TME-WARNING > digitalanalytics-events.js > storeIBMStatsEvent: Tealium is not ready.');
      }
   }
}

function createUtagLinkObject(obj) {
	var pageLocation = window.location.href.replace(/-_-/g,"---"),
	linkIdentifier = "ibmStatsEvent_element",
	data = new Object();

	obj.eventTriggerTime = new Date().getTime();

	// RTC: Story# 958230, Defect# 967620, and Defect# 967890. Adding code snippet in Support of Conversion Events.
	if (obj.type) {
		obj.event_type = obj.type;

		if (!obj.executionPath && obj.eventCategoryGroup && obj.eventCategoryGroup === "LVADVISOR") {
			/* ibmEvGroup is set based on either executionPath or eventCategory Group for LVADVISOR*/
			obj.executionPath = obj.eventCategoryGroup;
		}
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

	if(obj.ibmConversion && obj.ibmConversion == "true") {
		if (!obj.point && obj.convtype && obj.convtype == "1") obj.point = '10';
		if (!obj.point && obj.convtype && obj.convtype == "2") obj.point = '20';
		linkIdentifier = "ibmStatsEvent_conversion";
	} 
	else if(obj.ibmProductTag && obj.ibmProductTag == "true") {
		linkIdentifier = "ibmStatsEvent_product";
	}

	if(!obj.ibmConversion && !obj.ibmProductTag) {
		obj.ibmEvActionAttribute = obj.ibmEvAction;
		if(obj.ibmEvAction && typeof obj.ibmEvAction !== "undefined" && obj.ibmEvAction.length > 50) {
			obj.ibmEvAction = obj.ibmEvAction.substring(0,22) + "..." + obj.ibmEvAction.substring(obj.ibmEvAction.length - 25, obj.ibmEvAction.length);
		}
	}
	if(typeof window.utag !== "undefined" && typeof window.utag.data !== "undefined" && linkIdentifier !== "ibmStatsEvent_product") {
		modifySiteID = checkMarketingData();
		if(typeof window.ibm_global_data !== "undefined" && typeof ibm_global_data["Site ID"] != "undefined" && 
				typeof obj.ibmEV !== "undefined" && (obj.ibmEV.toLowerCase().indexOf("rich_media_service") !== -1 || obj.ibmEV.toLowerCase().indexOf("video player") !== -1)) {
			obj.ibmEV = "VIDEO - " + modifySiteID.substring(modifySiteID.indexOf('|')+1,modifySiteID.length);
			if(obj.ibmEvAction.toLowerCase() == "start" || obj.ibmEvAction.toLowerCase() == "played") {
				obj.ibmEvName = obj.ibmEvName + " - Play";
				obj.convtype = 1;
				trackingConversionEvent(linkIdentifier,obj);
			}
			else if (obj.ibmEvAction.toLowerCase() == "finish" || obj.ibmEvAction.toLowerCase() == "ended") {
				obj.ibmEvName = obj.ibmEvName + " - End";
				obj.convtype = 2;
				trackingConversionEvent(linkIdentifier,obj);
			}
		}
		var statsObjListString = JSON.stringify(obj).replace(/-_-/g,"---");
		data = JSON.parse(statsObjListString);
		data.event_name        = linkIdentifier;
		data.evPageLoadingTime = window.digitalData.page.session.pageloadEpoch;
		data.IbmerVal          = window.digitalData.user.segment.isIBMer;
		data.evPageLocation    = pageLocation;
		data.uPageViewID       = window.digitalData.page.session.uPageViewID;
		data.categoryVal       = window.digitalData.page.category.primaryCategory;
		data.evClientID        = modifySiteID;
		data.site_id           = window.digitalData.page.pageInfo.ibm.siteID;
		data.iniSiteID         = window.digitalData.page.pageInfo.ibm.iniSiteID;
		utag.link(data);
	}
	else if (data.event_name === "ibmStatsEvent_product") {
		storeIBMStatsEvent(data,obj,linkIdentifier);
	}
	else {
		console.log('+++TME-WARNING > digitalanalytics-events.js > createUtagLinkObject: Tealium is not ready.');
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
		console.log('+++TME-WARNING > digitalanalytics-events.js > IBMDependencyRegistry: ' + error);
	}
	//>>>>> End of Call IBMDependencyRegistry
}

/*---------------------------------------------------MAIN FUNCTION---------------------------------------------------------*/
try {
   var modifySiteID = "";
   window.arrObjList = new Array();
   window.ibmStats = ibmStats || {};

   //---------------------------------- ibmStats.event handler-----------------------------//
   window.ibmStats.event = function (obj) {
	   createUtagLinkObject(obj);
	};

	//---------------------------------- Ajax function to bind page view tag -----------------------------//
	window.bindPageViewWithAnalytics = function() {
	   if(typeof window.utag !== "undefined") utag.view(utag.data);
	}
}
catch (error) {
   console.error('+++TME-ERROR > digitalanalytics-events.js: ' + error);
}