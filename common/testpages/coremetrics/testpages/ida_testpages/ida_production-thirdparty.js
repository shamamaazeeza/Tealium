/* $Id: ida_production-thirdparty.js 18638 2016-08-04 05:40:10Z jleon@us.ibm.com $
 *
 * Description: Script used to load Tag Management (Tealium) on IBM web pages
 * - ida_stats.js for v17+ pages
 * - ida_production.js for non-v17+ pages
 * - There are other versions of ida_stats.js for different projects, which should be listed at:
 *   http://ibm.biz/ida_stats-releasenotes
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

/*---------------------------------------------------Initialize all Digital Data Objects---------------------------------------------------------*/
function initDDO() {
   // 2016-07-14 - shazeeza,jleon: RTC Story# 958212
   if (typeof (window.digitalData) == "undefined") {
      window.digitalData = new Object();
   }
   if (typeof (window.digitalData.page) == "undefined") {
      window.digitalData.page = new Object();
   }
   if (typeof (window.digitalData.page.attributes) == "undefined") {
      window.digitalData.page.attributes = new Object();
   }
   if (typeof (window.digitalData.page.category) == "undefined") {
      window.digitalData.page.category = new Object();
   }
   if (typeof (window.digitalData.page.category.ibm) == "undefined") {
      window.digitalData.page.category.ibm = new Object();
   }
   if (typeof (window.digitalData.page.pageInfo) == "undefined") {
      window.digitalData.page.pageInfo = new Object();
   }
   if (typeof (window.digitalData.page.pageInfo.ibm) == "undefined") {
      window.digitalData.page.pageInfo.ibm = new Object();
   }
   if (typeof (window.digitalData.page.pageInfo.coremetrics) == "undefined") {
      window.digitalData.page.pageInfo.coremetrics = new Object();
   }
   if (typeof (window.digitalData.page.pageInfo.tealium) == "undefined") {
      window.digitalData.page.pageInfo.tealium = new Object();
   }
   if (typeof (window.digitalData.page.pageInfo.metrics) == "undefined") {
      window.digitalData.page.pageInfo.metrics = new Object();
   }
   if (typeof (window.digitalData.user) == "undefined") {
      window.digitalData.user = new Object();
   }
   if (typeof (window.digitalData.user.profile) == "undefined") {
      window.digitalData.user.profile = new Object();
   }
   if (typeof (window.digitalData.user.segment) == "undefined") {
      window.digitalData.user.segment = new Object();
   }
   window.digitalData = window.digitalData || {};
   window.digitalData.page = window.digitalData.page || {};
   window.digitalData.page.pageInfo = window.digitalData.page.pageInfo || {};
   window.digitalData.page.pageInfo.ibm = window.digitalData.page.pageInfo.ibm || {};
   window.digitalData.page.pageInfo.coremetrics = window.digitalData.page.pageInfo.coremetrics || {};
   window.digitalData.page.pageInfo.tealium = window.digitalData.page.pageInfo.tealium || {};
   window.digitalData.page.session = window.digitalData.page.session || {};
   window.digitalData.page.category = window.digitalData.page.category || {};
   window.digitalData.page.category.ibm = window.digitalData.page.category.ibm || {};
   window.digitalData.page.attributes = window.digitalData.page.attributes || {};
   window.digitalData.user = window.digitalData.user || {};
   window.digitalData.user.profile = window.digitalData.user.profile || {};
   window.digitalData.user.segment = window.digitalData.user.segment || {};

   /*---------------------------------------------------Add SHA1 and SHA256 Hash Functions---------------------------------------------------------*/
   // 2016-08-04 - jleon: RTC Story# 978510
   if (typeof (window.digitalData.sha1) == "undefined") {
      window.digitalData.sha1=function(d){var l=0,a=0,f=[],b,c,g,h,p,e,m=[b=1732584193,c=4023233417,~b,~c,3285377520],n=[],k=unescape(encodeURI(d));for(b=k.length;a<=b;)n[a>>2]|=(k.charCodeAt(a)||128)<<8*(3-a++%4);for(n[d=b+8>>2|15]=b<<3;l<=d;l+=16){b=m;for(a=0;80>a;b=[[(e=((k=b[0])<<5|k>>>27)+b[4]+(f[a]=16>a?~~n[l+a]:e<<1|e>>>31)+1518500249)+((c=b[1])&(g=b[2])|~c&(h=b[3])),p=e+(c^g^h)+341275144,e+(c&g|c&h|g&h)+882459459,p+1535694389][0|a++/20]|0,k,c<<30|c>>>2,g,h])e=f[a-3]^f[a-8]^f[a-14]^f[a-16];for(a=5;a;)m[--a]=m[a]+b[a]|0}for(d="";40>a;)d+=(m[a>>3]>>4*(7-a++%8)&15).toString(16);return d}; 
   }
   if (typeof (window.digitalData.sha256) == "undefined") {
      window.digitalData.sha256=function(){function e(a,b){return a>>>b|a<<32-b}for(var b=1,a,m=[],n=[];18>++b;)for(a=b*b;312>a;a+=b)m[a]=1;b=1;for(a=0;313>b;)m[++b]||(n[a]=Math.pow(b,.5)%1*4294967296|0,m[a++]=Math.pow(b,1/3)%1*4294967296|0);return function(g){for(var l=n.slice(b=0),c=unescape(encodeURI(g)),h=[],d=c.length,k=[],f,p;b<d;)k[b>>2]|=(c.charCodeAt(b)&255)<<8*(3-b++%4);d*=8;k[d>>5]|=128<<24-d%32;k[p=d+64>>5|15]=d;for(b=0;b<p;b+=16){for(c=l.slice(a=0,8);64>a;c[4]+=f)h[a]=16>a?k[a+b]:(e(f=h[a-2],17)^e(f,19)^f>>>10)+(h[a-7]|0)+(e(f=h[a-15],7)^e(f,18)^f>>>3)+(h[a-16]|0),c.unshift((f=(c.pop()+(e(g=c[4],6)^e(g,11)^e(g,25))+((g&c[5]^~g&c[6])+m[a])|0)+(h[a++]|0))+(e(d=c[0],2)^e(d,13)^e(d,22))+(d&c[1]^c[1]&c[2]^c[2]&d));for(a=8;a--;)l[a]=c[a]+l[a]}for(c="";63>a;)c+=(l[++a>>3]>>4*(7-a%8)&15).toString(16);return c}}(); 
   }

   /*---------------------------------------------------Add parseQueryString function---------------------------------------------------------*/
   // 2016-07-28 - jleon: RTC Story# 978510
   if (typeof (window.digitalData.parseQueryString) == "undefined") {
      window.digitalData.parseQueryString = function (fullURL) {
         var paramsObject = {},
         queryString = fullURL.substring(fullURL.indexOf("?") + 1),
         queries, temp, i, l,
         queries = queryString.split("&");
         for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            paramsObject[temp[0]] = temp[1];
            if(paramsObject == "iwm" && temp[0] == "source") {
               window.IWMSource = "?source="+temp[1];
            }
         }
         return(paramsObject);
      }
   }

   /*---------------------------------------------------Add calculateURLID function---------------------------------------------------------*/
   // 2016-07-28 - jleon: RTC Story# 978510 (previous RTC Story# 902576)
   if (typeof (window.digitalData.calculateURLID) == "undefined") {
      window.digitalData.calculateURLID = function (fullURL) {
         var parserURL = document.createElement('a');
         parserURL.href = fullURL;
         // IE 8 and 9 dont load the attributes "protocol" and "host" in case the source URL
         // is just a pathname, that is, "/example" and not "http://domain.com/example".
         parserURL.href = parserURL.href;
         var pathName = parserURL.pathname.toLowerCase();

         //--- START: Patch to define pageidQueryStrings for IWM and SSI pages. ##TODELETE## when standard is adopted
         if (pathName.indexOf("/marketing/iwm/") !== -1 && typeof (window.digitalData.page.attributes.pageidQueryStrings) == "undefined") {
            // Set PageID Query Strings for IWM Pages
            window.digitalData.page.attributes.pageidQueryStrings = ["source","S_PKG"];
         }
         //--- END: Patch to define pageidQueryStrings for IWM and SSI pages. ##TODELETE## when standard is adopted

         //remove some specified html versions from path name
         var lastpart = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
         // 2016-07-29 - jleon: RTC Story# XXXXXX - Updating list of omitted default pages
         var omittedHTMLVersions = ["index.php","index.phtml", "index.shtml", "index.wss", "index.jsp", "index.jspa", "index.jsa", "index.htm", "index.html"];
         for (var i = 0; i < omittedHTMLVersions.length; i++) {
            if (omittedHTMLVersions[i] == lastpart.toLowerCase()) {
               pathName = pathName.substring(0,pathName.lastIndexOf('/'));
            }
         }
         //add different Query string parameters
         if (window.digitalData.page.attributes.pageidQueryStrings) {
            var addQSValue = "";
            for (var k=0;k<window.digitalData.page.attributes.pageidQueryStrings.length;k++) {
               var q = window.digitalData.page.attributes.pageidQueryStrings[k];
               if (typeof window.params[q] !== "undefined") addQSValue += q + "=" + window.params[q] + "&";
            }
            addQSValue = addQSValue.replace(/&$/,"");
            pathName = (addQSValue !== "") ? (pathName + "?" + addQSValue) : pathName;
         }
         //remove trailing slash, question mark, or hash(if any)
         pathName = pathName.replace(/[(\/)(?)(#)(&)]+$/, "");
         return(parserURL.host + pathName);
      }
   }
}

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
   if(typeof utag !== "undefined" && linkIdentifier !== "ibmStatsEvent_product"){
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

function checkMarketingData(){
   var modify_siteId = window.utag.data.concat_clientid;
   var x = window.utag.data.concat_clientid.substring(0,window.utag.data.concat_clientid.indexOf('|'));
   if(typeof window.ibm_global_data !== "undefined" && typeof ibm_global_data["Site ID"] != "undefined"){
      if(utag.data['IBMER_value'] == "1"){
         modify_siteId = x + "|" + "New_IBMER";
      }else if (window.ibm_global_data["Site ID"] !== undefined){
         modify_siteId = x + "|" + window.ibm_global_data["Site ID"];
      }
   }
   return modify_siteId;
}
//----------------------ibmStats.event function for Tealium ended---------------------------------------------//

var v16elu = {

      NTPT_DOWNLOADTYPES : "bqy,doc,dot,exe,flv,jpg,png,mov,mp3,pdf,pps,ppt,rss,sh,swf,tar,txt,wmv,xls,xml,zip,avi,eps,gif,lwp,mas,mp4,pot,prz,rtf,wav,wma,123,odt,ott,sxw,stw,docx,odp,otp,sxi,sti,pptx,ods,ots,sxc,stc,xlsx",
      NTPT_DOMAINLIST : ".ibm.co,.ibm.com,.lotuslive.com,.cognos.com,.webdialogs.com,.servicemanagementcenter.com,.xtify.com,.ibmcloud.com,.ibmdw.net,.bluemix.net,.smartercitiescloud.com",
      evhndlr : true,
      domainBlacklist : ".ibm.com,.mitre.org,.learnquest.com",

      /*------------creates Coremetrics element tag(conversion of Unica event to Coremetrics)---------------------*/
      /*create_cmElement : function(obj){
		if(obj.ibmProductTag && obj.ibmProductTag == "true"){
			window.onload = function(){
				if (typeof (window.pageViewAttributes) != "undefined") var productAttr = window.pageViewAttributes.split("-_-", 21).join("-_-");
				if(typeof v16elu.siteID !== "undefined" && v16elu.siteID.toLowerCase() == "ecom" && typeof obj.serviceType != "undefined") productAttr += "-_--_--_--_--_--_--_--_--_--_-" + obj.serviceType;
				if (typeof cmCreateProductviewTag !== 'undefined') cmCreateProductviewTag(obj.proID,obj.proName,obj.proCategory,productAttr,obj.cm_vc);
			}
		}
	},*/

      //-----------------------------function call on completely loading page--------------------------------//
      onPageLoad : function(){
         if(window.utag && window.utag.sender) v16elu.storeTealiumPageviewData();
         if(typeof window.demandBase !== "undefined"){
            window.demandBase.event_name = "demandbaseElement";
            window.demandBase.ibmEV = "Demandbase";
            window.demandBase.ibmEvAction = "CompanyData";
            window.demandBase.ibmEvAttr = "Demandbase";
            window.demandBase.evPageLoadingTime = utag.data["page_loadingTime"];
            window.demandBase.evTriggerTime = utag.data["page_loadingTime"];
            window.demandBase.IbmerVal = utag.data["IBMER_value"];
            window.demandBase.evPageLocation = window.location.href.replace(/-_-/g,"---");
            utag.link(window.demandBase);
         }
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

         //cookie migration from IBM to non IBM pages
         if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') !== -1){
            window.cmTagQueue.push(['cmSetupCookieMigration', true, true, null, this.domainBlacklist]);
         }

         //cookie migration code for all non IBM pages
         if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') == -1){
            window.cmTagQueue.push(['cmSetupCookieMigration', true, true, this.NTPT_DOMAINLIST]);
         }
         //getting the value of IBMer for non ibm.com
         if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') == -1){
            requestServerCall = function (url) {
               var s = document.createElement('script');
               s.type = 'text/javascript';
               s.src = url;
               document.getElementsByTagName("head")[0].appendChild(s);
            },
            IBMISE_BOOTSTRAP = function (data) {
               if(data.IBMer)	window.NTPT_IBMer = data.IBMer;
               if(data.IBMIXS)	window.IBMIXS = data.IBMIXS;//IBMISP cookie value for non ibm.com
            }
            requestServerCall("//www.ibm.com/gateway/gp/getProfile/?cb=260:IBMISE_BOOTSTRAP&cc=us&lc=en");   
         }
         //----------------------------- TEALIUM IMPLEMENTATION - START --------------------------------//
         var fileref=document.createElement('script')
         fileref.setAttribute("type","text/javascript")
         fileref.setAttribute("src", "//tags.tiqcdn.com/utag/ibm/lib-thirdparty/dev/utag.sync.js");
         document.getElementsByTagName("head")[0].appendChild(fileref);

         (function(a,b,c,d) {
            a = '//tags.tiqcdn.com/utag/ibm/lib-thirdparty/dev/utag.js';
            b = document;
            c = 'script';
            d = b.createElement(c);
            d.src = a;
            d.type = 'text/java' + c;
            d.async = true;
            a = b.getElementsByTagName(c)[0];
            a.parentNode.insertBefore(d,a);
            d.onload = function (){
               if(typeof window.utag !== "undefined" && typeof window.utag.data !== "undefined"){
                  v16elu.siteID = window.utag.data["siteID_value"];
                  if(v16elu.siteID.toLowerCase() == "ecom"){
                     window.cmTagQueue.push(['cmSetupNormalization', 'krypto-_-krypto']);	
                  }

                  if(v16elu.siteID.toLowerCase() == "p4sc") {
                     window.cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true, "cm_FormPageID" : true}]);
                  } else {
                     window.cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true}]);
                  }
               }
            }
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

/*---------------------------------------------------Initialize DDO and set URLID---------------------------------------------------------*/
//2016-07-28 - jleon: RTC Story# 978510
//Intialize Digital Data Object
initDDO();

//Parse Query String for current URL
window.params = window.digitalData.parseQueryString(window.location.href);

//Set URLID and PAGEID in DDO
window.digitalData.page.pageInfo.urlID = window.digitalData.calculateURLID(window.location.href);
if (typeof(window.digitalData.page.pageID) == "undefined" && typeof (window.digitalData.page.pageInfo.pageID) == "undefined") {
   window.digitalData.page.pageInfo.pageID = window.digitalData.page.pageInfo.urlID;
} 
else if (typeof(window.digitalData.page.pageID) !== "undefined") {
   window.digitalData.page.pageInfo.pageID = window.digitalData.page.pageID;
}

window.arrObjList = new Array();
ibmStats.event = function (obj) {


   //creates Coremetrics element tag(conversion of Unica event to Coremetrics)
   createUtagLinkObject(obj);
   //v16elu.create_cmElement(obj);//for product view tag
};

//---------------------------------- Ajax function to bind page view tag -----------------------------//
bindPageViewWithAnalytics = function(){
   var ref = document.referrer;
   utag.data.referralURL = this.ref;

   if(typeof window.utag !== "undefined") utag.view(utag.data);
}


if (navigator.platform.search('AIX') < 0) {
   if (typeof(window.ida_eluminate_enabled) !=='undefined' || typeof(window.tealium_enabled) !=='undefined') {
      // we search if this variable is set on false
      if (!window.ida_eluminate_enabled || !window.tealium_enabled) {/*do nothing*/}
      else v16elu.init();
   } else {
      // we are enebled for all pages
      v16elu.init();
   }
}