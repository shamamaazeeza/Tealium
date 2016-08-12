/*
 * $Id: tealium_script.js 18640 2016-08-04 05:54:43Z jleon@us.ibm.com $
 * 
 * Extension Name: Digital Analytics Custom Code
 * Scope         : All Tags
 * Execution     : Before Load Rules
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE SVN VERSION IN ECLIPSE
 */

/*---------------------------------------------------Initialize all Digital Data Objects---------------------------------------------------------*/
//2016-07-14 - shazeeza,jleon: RTC Story# 958212
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

if (typeof (window.digitalData.page.pageInfo.version) !== "undefined") {
   utag.data["js_page.digitalData.page.pageInfo.version1"] = window.digitalData.page.pageInfo.version;
}
utag.data["dom.title"] = document.title;
utag.data.cookie_domain = document.domain.split('.').splice(-2, 2).join('.');
utag.data.test_domain = "dev.nwtw.ibm.com,testdata.coremetrics.com,localhost,wwwbeta-sso.toronto.ca.ibm.com";
if(get_meta_tag("IBM.WTMConfig") == null) utag.data["meta.IBM.WTMConfig"] = "null";

if (typeof (window.params) == "undefined") {
   window.params = {};
   fetchQuerystring(params);
}
/*---------------------------------------------------setting Site ID---------------------------------------------------------*/
utag.data.site_id = "";
//set siteID from meta IBM.WTMSite
utag.data.site_id = String(get_meta_tag("IBM.WTMSite"));
//set siteID from meta WTMSite
if(utag.data.site_id == "null") utag.data.site_id = String(get_meta_tag("WTMSite"));
//set siteID from meta IBM.WTMCategory
if (utag.data.site_id == "null"){
   var v16eluSiteID = String(get_meta_tag("IBM.WTMCategory"));
   if (v16eluSiteID != null && v16eluSiteID.substring(0, 5) == "SOFDC") {
      utag.data.site_id = "DEVWRKS";
   }else if (v16eluSiteID != null && v16eluSiteID.toLowerCase() == "cuf04") {
      utag.data.site_id = "CUF04";
   }
}
//set siteID from digitalData siteID or categoryID from new DDO
if (utag.data.site_id == "null" && typeof window.digitalData.page !== "undefined") {
   //for old DDO structure Site id
   if (typeof window.digitalData.page.site !== "undefined" && typeof window.digitalData.page.site.siteID !== "undefined") {
      utag.data.site_id = digitalData.page.site.siteID;
   }
   //for new DDO structure Site id
   if (utag.data.site_id == "null" && typeof window.digitalData.page.pageInfo !== "undefined" && typeof window.digitalData.page.pageInfo.ibm !== "undefined" && typeof window.digitalData.page.pageInfo.ibm.siteID !== "undefined") {
      utag.data.site_id = window.digitalData.page.pageInfo.ibm.siteID;
   }
   //for old DDO structure Category id
   if (utag.data.site_id == "null" && typeof window.digitalData.page.category !== "undefined" && typeof window.digitalData.page.category.categoryID !== "undefined") {
      if (window.digitalData.page.category.categoryID.substring(0, 5) == "SOFDC") {
         utag.data.site_id = "DEVWRKS";
      }else if(window.digitalData.page.category.categoryID.toLowerCase() == "cuf04"){//for OSOL pages
         utag.data.site_id = window.digitalData.page.category.categoryID;
      }
   }
   //for new DDO structure Category id
   if (utag.data.site_id == "null" && typeof window.digitalData.page.category !== "undefined" && typeof window.digitalData.page.category.primaryCategory !== "undefined") {
      if (window.digitalData.page.category.primaryCategory.substring(0, 5) == "SOFDC") {
         utag.data.site_id = "DEVWRKS";
      }else if(window.digitalData.page.category.primaryCategory.toLowerCase() == "cuf04"){//for OSOL pages
         utag.data.site_id = window.digitalData.page.category.primaryCategory;
      }
   }
}
//GBS site id change(for V18 & eluminate pages)
if (window.location.href.toLowerCase().indexOf("935.ibm.com/services/") !== -1){
   if ((window.location.pathname.toLowerCase().indexOf("/gbs/") !== -1) || (window.location.pathname.toLowerCase().indexOf("/business-consulting/") !== -1)){
      utag.data.site_id = "GBS";
   }
}else if ((window.location.href.toLowerCase().indexOf("935.ibm.com/industries/") !== -1) || (window.location.href.toLowerCase().indexOf("06.ibm.com/industries/jp/") !== -1)){
   utag.data.site_id = "INDUSTRIES";
} 
//set siteID value from page URL(requested for Watson pages)
if(typeof window.params.siteID !== "undefined") utag.data.site_id = window.params.siteID;
//set siteID on default value
if (utag.data.site_id == "null" || utag.data.site_id == "") {
   if(utag.data["dom.domain"].toLowerCase().indexOf('softlayer') !== -1) utag.data.site_id = "SOFTLAYER";
   else utag.data.site_id = "IBMTESTWWW";
}
if(utag.data.site_id.substring(0, 4).toLowerCase() == "test" || utag.data.site_id.substring(utag.data.site_id.length-4, utag.data.site_id.length).toLowerCase() == "test"){
   utag.data.concat_clientid = "80200000|" + utag.data.site_id;
}else if(utag.data.test_domain.indexOf(document.domain.toLowerCase()) !== -1){
   var x = utag.data.test_domain.split(',');
   for(var j=0; j<x.length; j++){
      if(document.domain.toLowerCase() == x[j]) utag.data.concat_clientid = "80200000|" + utag.data.site_id;
   }
}else{
   utag.data.concat_clientid = "50200000|" + utag.data.site_id;
}

//2016-07-14 - shazeeza: RTC Story# 958212
window.digitalData.page.pageInfo.ibm.siteID = utag.data.site_id;
window.digitalData.page.pageInfo.ibm.cmClientID = utag.data.concat_clientid;


/*-------------------------------------------------setting IBMER value--------------------------------------------------------*/
if(document.domain.indexOf("ibm.com") !== -1){//for ibm.com sites
   if (String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-|OSCw3Session|IBM_W3SSO_ACCESS)=/)) {
      if (typeof utag.data.IBMER_value == "undefined" || utag.data.IBMER_value == null) {
         utag.data.IBMER_value = 1
      }
   } else {
      if (typeof utag.data.IBMER_value == "undefined" || utag.data.IBMER_value == null) {
         utag.data.IBMER_value = 0
      }
   }
}else{//for non ibm.com sites
   window.utag.data.IBMER_value = (window.NTPT_IBMer == "true") ? 1 : 0;
   if(window.IBMIXS) utag.data.IBMIXS = window.IBMIXS;//IBMISP cookie value for non ibm.com
}
//2016-07-14 - shazeeza: RTC Story# 958212
window.digitalData.user.segment.isIBMer = utag.data.IBMER_value;

/*-------------------------------------------------setting IBM ID Profile ID--------------------------------------------------------*/
//2016-07-18 - jleon: RTC Story# 967611
if (typeof(window.utag.data["cp.IBMISP"]) !== "undefined") {
   // Second value of the IBMISP is the Profile ID
   window.digitalData.user.profile.uuid = utag.data["cp.IBMISP"].split('-')[1] || "";
}
else if (typeof(window.IBMIXS) !== "undefined") {
   window.digitalData.user.profile.uuid = window.IBMIXS.split('-')[1] || "";
}
else {
   window.digitalData.user.profile.uuid = "";
}
utag.data.profileID = window.digitalData.user.profile.uuid;

/*---------------------------------------------------setting urlID and pageID ---------------------------------------------------------*/
//2016-07-14 - jleon: RTC Story# 902576
if (window.digitalData.page.pageInfo.urlID) {
   utag.data.urlID    = window.digitalData.page.pageInfo.urlID || "";
   utag.data.page_id  = window.digitalData.page.pageInfo.pageID || "";   
}
else {
   var pathName = window.location.pathname.toLowerCase();

   // --- START: Patch to define pageidQueryStrings for IWM and SSI pages. ##TODELETE## when standard is adopted
   if (pathName.indexOf("/marketing/iwm/") !== -1 && typeof (window.digitalData.page.attributes.pageidQueryStrings) == "undefined") {
      // Set PageID Query Strings for IWM Pages
      window.digitalData.page.attributes.pageidQueryStrings = ["source","S_PKG"];
   }
   // --- END: Patch to define pageidQueryStrings for IWM and SSI pages. ##TODELETE## when standard is adopted

   // remove some specified html versions from path name
   var lastpart = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
   var omittedHTMLVersions = ["index.php","index.phtml", "index.shtml", "index.wss", "index.jsp", "index.jspa", "index.htm", "index.html", "index"];
   for (var i = 0; i < omittedHTMLVersions.length; i++) {
      if (omittedHTMLVersions[i] == lastpart.toLowerCase()) {
         //pathName = pathName.replace(lastpart, "");
         pathName = pathName.substring(0,pathName.lastIndexOf('/'));
      }
   }
   // add different Query string parameters
   if (window.digitalData.page.attributes.pageidQueryStrings) {
      var addQSValue = "";
      for (var k=0;k<window.digitalData.page.attributes.pageidQueryStrings.length;k++) {
         var q = window.digitalData.page.attributes.pageidQueryStrings[k];
         if (typeof window.params[q] !== "undefined") addQSValue += q + "=" + window.params[q] + "&";
      }
      addQSValue = addQSValue.replace(/&$/,"");
      pathName = (addQSValue !== "") ? (pathName + "?" + addQSValue) : pathName;
   }
   // remove trailing slash, question mark, or hash(if any)
   pathName = pathName.replace(/[(\/)(?)(#)(&)]+$/, "");
   utag.data.urlID = window.location.host + pathName;
   window.digitalData.page.pageInfo.urlID = utag.data.urlID;

   if (typeof(window.digitalData.page.pageID) == "undefined" && typeof (window.digitalData.page.pageInfo.pageID) == "undefined") {
      utag.data.page_id = window.digitalData.page.pageInfo.urlID;
      window.digitalData.page.pageInfo.pageID = utag.data.page_id;
   } 
   else if (typeof(window.digitalData.page.pageID) !== "undefined") {
      utag.data.page_id = window.digitalData.page.pageID;
      window.digitalData.page.pageInfo.pageID = utag.data.page_id;
   } else if (typeof(window.digitalData.page.pageInfo.pageID) !== "undefined") {
      utag.data.page_id = window.digitalData.page.pageInfo.pageID;
   }
}
/*---------------------------------------------------setting onsite Search Term---------------------------------------------------------*/
if (typeof (window.digitalData.page.pageInfo.onsiteSearchTerm) == "undefined") {
   if (get_meta_tag("IBM.SearchTerm") !== null) {
      window.digitalData.page.pageInfo.onsiteSearchTerm = String(get_meta_tag("IBM.SearchTerm")) + "";
   } else if (typeof (window.ibmSrchTerm) !== "undefined") {
      window.digitalData.page.pageInfo.onsiteSearchTerm = window.ibmSrchTerm;
   } else if (document.getElementById('catalog_search_result_information') !== null){
      var str = (document.getElementById('catalog_search_result_information').innerHTML).replace(/[""''{}\s]+/g,'').split(',');
      for(var i=0; i<str.length; i++) {
         if(str[i].split(':')[0] == 'searchTerms') window.digitalData.page.pageInfo.onsiteSearchTerm = str[i].split(':')[1];
      }
   }
}
utag.data.onsite_search_term = window.digitalData.page.pageInfo.onsiteSearchTerm;

/*---------------------------------------------------setting onsite Search Result---------------------------------------------------------*/
if (typeof (window.digitalData.page.pageInfo.onsiteSearchResult) == "undefined") {
   //window.digitalData.page.onsiteSearchResult= null;
   if (typeof (window.ibmSrchRslts) !== "undefined") {
      window.digitalData.page.pageInfo.onsiteSearchResult = window.ibmSrchRslts;
   } else if (document.getElementById('catalog_search_result_information') !== null){
      var str = (document.getElementById('catalog_search_result_information').innerHTML).replace(/[""''{}\s]+/g,'').split(',');
      for(var i=0; i<str.length; i++) {
         if(str[i].split(':')[0] == 'totalResultCount') window.digitalData.page.pageInfo.onsiteSearchResult = str[i].split(':')[1];
      }
   }
}
utag.data.onsite_search_result = window.digitalData.page.pageInfo.onsiteSearchResult;

/*---------------------------------------------------setting header 1 attribute---------------------------------------------------------*/
if(typeof (document.getElementsByTagName("h1")[0]) != 'undefined'){
   utag.data.page_header = (document.getElementsByTagName("h1")[0].innerHTML);
   utag.data.page_header = utag.data.page_header.replace(/(<([^>]+)>)/ig,"");
}

/*---------------------------------------------------add Canonical URL value-------------------------------------------------------------*/
var docLinks = document.getElementsByTagName('link');
for (i = 0; i < docLinks.length; i++) {
   if (docLinks[i].getAttribute("rel") != null && docLinks[i].getAttribute("rel") == "canonical") 
      utag.data.canonicalURL = docLinks[i].getAttribute("href");
}

/*---------------------------------------------------setting page loading time---------------------------------------------------------*/
utag.data.page_loadingTime = (typeof (window.loadingTime) != "undefined") ? window.loadingTime : new Date().getTime();

//2016-07-14 - shazeeza: RTC Story# 958212
window.digitalData.page.session.pageloadEpoch = utag.data.page_loadingTime;


/*---------------------------------------------------setting page category---------------------------------------------------------*/
window.IBMPageCategory = new String();
if (typeof window.digitalData.page.category.primaryCategory !== "undefined") {
   window.IBMPageCategory = window.digitalData.page.category.primaryCategory;
} else if (typeof window.digitalData.page.category.categoryID !== "undefined"){//for old DDO structure
   window.IBMPageCategory = window.digitalData.page.category.categoryID;
}else {
   window.IBMPageCategory = String(get_meta_tag("IBM.WTMCategory"));
}
//set category ID value from page URL(requested for Watson pages)
if(typeof window.params.Category !== "undefined") window.IBMPageCategory = decodeURIComponent(window.params.Category);

if (document.domain.indexOf("ibm.com") !== -1 && String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-|OSCw3Session|IBM_W3SSO_ACCESS)=/)) {
   if(utag.data.site_id.substring(0,3) == "EST" || utag.data.site_id.toLowerCase() == "serveng" || utag.data.site_id.toLowerCase() == "extconnections" 
      || utag.data.site_id.toLowerCase() == "extconnectionstest"){
      window.IBMPageCategory += "IBMER";
   }else{
      window.IBMPageCategory = "IBMER";
   }
}else if(document.domain.indexOf("ibm.com") == -1 && window.NTPT_IBMer == "true"){//for non ibm.com
   window.IBMPageCategory += "IBMER";
}
if(typeof(utag.data.site_id) !== "undefined" && utag.data.site_id.toLowerCase() == "error") window.IBMPageCategory = "error";
if (utag.data.site_id.substring(0,4).toLowerCase() == "ecom") window.IBMPageCategory = utag.data.site_id + window.IBMPageCategory;
//adding DC.Language value category id for Support Content delivery pages
if((typeof utag.data.site_id !== "undefined") && (utag.data.site_id.toLowerCase() == "estdbl" || utag.data.site_id.toLowerCase() == "estkcs" || utag.data.site_id.toLowerCase() == "estqst")){
   if(get_meta_tag("DC.Language") !== null) window.IBMPageCategory += "-" + get_meta_tag("DC.Language");
   else if(window.digitalData.page.pageInfo.language) window.IBMPageCategory += "-" + window.digitalData.page.pageInfo.language;
}
utag.data.category_id = window.IBMPageCategory;

//2016-07-14 - shazeeza: RTC Story# 958212
window.digitalData.page.category.primaryCategory = utag.data.category_id;


/*---------------------------------------------------setting Pageprod attribute---------------------------------------------------------*/
//utag.data.pageProd = generatePageProd();
//2016-07-14 - jleon: RTC Story# 958212
utag.data.pageProd = window.digitalData.page.pageInfo.urlID;

/*---------------------------------------------------add Session ID value---------------------------------------------------------*/
//utag.data.cookie_visitorID = utag.data["cp.utag_main_v_id"];
utag.data.cookie_sessionID = utag.data["cp.utag_main_v_id"] + "-" + utag.data["cp.utag_main_ses_id"];
window.digitalData.page.session.uSessionID = utag.data.cookie_sessionID;
if (window.digitalData.sha256) {
   utag.data.uPageViewID = window.digitalData.sha256(window.digitalData.page.session.uSessionID + '-' + window.digitalData.page.session.pageloadEpoch);
}
else {
   utag.data.uPageViewID = window.digitalData.page.session.uSessionID + '-' + window.digitalData.page.session.pageloadEpoch;
}
window.digitalData.page.session.uPageViewID = utag.data.uPageViewID;

/*---------------------------------------------------setting Marketing attribute---------------------------------------------------------*/
var marketingAttributes = "",
vendor = "NA",
category = "NA",
placement = "NA",
item = "NA";
var marketingAttrArray = ['cmp','ct','cr','','csr','co','ck','mkwid','cs','ccy',
                          'cot','csot','cd','cpg','cpb','cn','csz','ce','pid','trid','jm','iio','tm','mamid',
                          'utm_medium','utm_source','utm_campaign','utm_term','utm_content','adgroup'];
var marketingAttributes = "";
for(var i = 1; i <= marketingAttrArray.length; i++){
   if(i == 4){
      var cmValue = "NA";
      //Create translation for ITEM values based on CM values
      if (typeof window.params.cm_mmca4 == "undefined" && typeof(window.params.cm)!="undefined"){
         var param_cm=window.params.cm;
         if(param_cm.toLowerCase() == "k") {
            att = ['s_tact','csr','ck','cs','mkwid','cot','csot','tm','jm'];
            item = checkWindowParam(att);
            cmValue = "paid search";
         } else if(param_cm.toLowerCase() == "h" || param_cm.toLowerCase() == "l") {
            att = ['s_tact','ce','cpg','cot','csot','jm'];
            item = checkWindowParam(att);
            cmValue = "social";
         } else if(param_cm.toLowerCase() == "m") {
            att = ['s_tact','csr','ce','cot','csot','jm'];
            item = checkWindowParam(att);
            cmValue = "email";
         } else if(param_cm.toLowerCase() == "b") {
            att = ['s_tact','csr','s_pkg','cn','csz','cot','csot','pid','trid','jm','tm'];
            item = checkWindowParam(att);
            cmValue = "banner";
         } 
         marketingAttributes=marketingAttributes+"cm_mmca4=" + window.params.cm + "&";
      }
   }else{
      var m = "cm_mmca"+i,
      x = loadMarketingAttribute(i,m,marketingAttrArray[i-1]);
      if(x !== null) marketingAttributes = marketingAttributes + "cm_mmca"+i+"=" + x + "&";
      if(x !== null && i == 3) category = x;
      if(x !== null && i == 10) placement = x;
   }
}
vendor = (typeof (window.params.iio) !== "undefined" && window.params.iio !== "") ? (cmValue + "_" + window.params.iio) : cmValue; 
if (typeof (window.params.cm_mmc) != "undefined") {
   marketingAttributes = "&" + marketingAttributes;
} else if (marketingAttributes.length > 0) {
   marketingAttributes = "&cm_mmc=" + vendor + "-_-" + category + "-_-" + placement + "-_-" + item + "&" + marketingAttributes;
}
if (marketingAttributes.lastIndexOf("&") == marketingAttributes.length - 1) {
   marketingAttributes = marketingAttributes.substring(0, marketingAttributes.length - 1);
}
utag.data.destinationURL = document.URL + marketingAttributes;

/*--------------------------------------------initialize window.digitalData.page.attributes.extraFields if needed------------------*/
if (typeof (window.digitalData.page.attributes.extraFields) == "undefined") {
   if(typeof (window.CM_EXTRA) != "undefined" && window.CM_EXTRA != ""){
      window.digitalData.page.attributes.extraFields = "";
      var separators = ['&', '='],
      tokens = CM_EXTRA.split(new RegExp(separators.join('|'), 'g')),
      arr1 = CM_EXTRA.split('&'),
      j = 0;
      for(var i=0; i<arr1.length; i++){
         var ex = "extrafields"+(i+1);
         utag.data[ex] = arr1[i].split('=')[1];
         window.digitalData.page.attributes.extraFields += arr1[i].split('=')[1]+"-_-";
      }
   }
}

/*--------------------------------------------For ignoring case in Meta tag attributes--------------------------------------------*/
var metatags = document.getElementsByTagName('meta');
for(var i = 0; i < metatags.length; i++) {
   if (metatags[i].getAttribute("name") != null) {
      var x = "meta_"+(metatags[i].getAttribute("name")).toLowerCase();
      utag.data[x] = metatags[i].getAttribute("content");
   }
}

/*---------------------------------------------------start custom attributes---------------------------------------------------------*/
includeCustomAttributes(utag.data.site_id);
function includeCustomAttributes(siteId){
   if(siteId.substring(0,4).toLowerCase() == "test" && siteId.substring(siteId.length-4,siteId.length).toLowerCase() == "test") siteId = siteId.substring(4,siteId.length-4);
   else if(siteId.substring(0,4).toLowerCase() == "test") siteId = siteId.substring(4,siteId.length);
   else if (siteId.substring(siteId.length-4,siteId.length).toLowerCase() == "test") siteId = siteId.substring(0,siteId.length-4);
   utag.data.siteID_value = siteId;

   //----------add page view attributes for CLOUD EXCHANGE--------------------------------------------
   if(typeof(siteId) !== "undefined" && siteId.substring(0, 13).toLowerCase() == "cloudexchange"){
      utag.data.customAttr = true;
   }

   //----------add page view attributes for SALES PORTAL--------------------------------------------
   if(typeof(siteId) !== "undefined" && siteId.substring(0, 3).toLowerCase() == "ins"){
      utag.data.customAttr = true;
      if (typeof (window.saleParams) == "undefined") window.saleParams = {};
      getNTPTVariable(saleParams);
      addAttributes(saleParams,'RepID');
      addAttributes(saleParams,'rep_group');
      addAttributes(saleParams,'DocID');
      addAttributes(saleParams,'mode');
   }

   //----------add page view attributes for SUPPORT PORTAL--------------------------------------------
   if(typeof(siteId) !== "undefined" && (siteId.substring(0, 3).toLowerCase() == "est")){
      if (typeof (window.supportParams) == "undefined") window.supportParams = {};
      getNTPTVariable(supportParams);
      if(siteId.toLowerCase() == "estcht" || siteId.toLowerCase() == "estxsr"){//attributes for Support - Problem reporting  profile
         utag.data.customAttr = true;
         //fetchQuerystring(supportParams);//for srChannel & srFromAction
         addAttributes(supportParams,'SR_DOMAIN');
         addAttributes(supportParams,'SR_EMAILADDRESS');
         addAttributes(supportParams,'SR_ICN');
         addAttributes(supportParams,'SR_PIDVRMCOMPREL');
         addAttributes(supportParams,'SR_PREFERREDCONTACTMETHOD');
         addAttributes(supportParams,'SR_PRIMIUMRESPONSESELECTED');
         addAttributes(supportParams,'SR_PRODID');
         addAttributes(supportParams,'SR_PRODSOURCE');
         addAttributes(supportParams,'SR_REQUESTTYPE');
         addAttributes(supportParams,'SR_SEVERITY');
         addAttributes(supportParams,'SR_SOURCEAPPL');
         addAttributes(supportParams,'SR_SUCCESS');
         addAttributes(supportParams,'SR_TYPE');
         addAttributes(supportParams,'SR_UNEXPECTEDERROR_CONTACTID');
         addAttributes(supportParams,'SR_UNEXPECTEDERROR_DOMAIN');
         addAttributes(supportParams,'SR_UNEXPECTEDERROR_USER');
         addAttributes(supportParams,'SR_UNEXPECTEDERROR_NODE');
         // addAttributes(supportParams,37,'srChannel');
         // addAttributes(supportParams,38,'srFromAction');
         addAttributes(supportParams,'SR_ECIIC');
         addAttributes(supportParams,'SR_MACHTYPEMOD');
         addAttributes(supportParams,'SR_COMPID');
      }else if(siteId.toLowerCase() == "estmob" || siteId.toLowerCase() == "estspa" || siteId.toLowerCase() == "estspe"){//attributes for Support - Content Navigation profile
         utag.data.customAttr = true;
         addAttributes(supportParams,'SP.CAMCO');
         addAttributes(supportParams,'SP.AVPCompanyName');
         addAttributes(supportParams,'SP.WICO');
         addAttributes(supportParams,'SP.WIDM');
         getCmCreateProductView();
      }else if(siteId.toLowerCase() == "estfix" || siteId.toLowerCase() == "estset"){//attributes for Support - Fix Delivery profile
         utag.data.customAttr = true;
         getCmCreateProductView();
      }
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var currentdate = new Date();
      var   datetime = currentdate.getDate() + "/" 
      + monthNames[currentdate.getMonth()] + "/" 
      + currentdate.getFullYear() + ":" 
      + currentdate.getHours() + ":" 
      + currentdate.getMinutes() + ":" 
      + currentdate.getSeconds();
      utag.data.customParam_date = datetime;
   }

   //----------add page view attributes for SSI starts-------------------------------------------- 
   if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "e021")){
      utag.data.customAttr = true;
      if (typeof (window.ssiParams) == "undefined") window.ssiParams = {};
      var queryString = window.location.href.substring(window.location.href.indexOf("?") + 1),
      queries, temp, i, l,
      queries = queryString.split(/&|#/);
      for (i = 0, l = queries.length; i < l; i++) {
         temp = queries[i].split('=');
         window.ssiParams[temp[0]] = temp[1];
      }
      addAttributes(ssiParams,'htmlfid');
      if(typeof utag.data.customParam_htmlfid == "undefined" && typeof (window.ssiParams['supplier']) != "undefined" && typeof (window.ssiParams['letternum']) != "undefined"){
         utag.data.customParam_htmlfid = window.ssiParams['supplier'] + "/" + window.ssiParams['letternum'];
      }
      addAttributes(ssiParams,'appname');
      var ssiContentInfo = ((get_meta_tag("ContentInfo")) != null) ? String(get_meta_tag("ContentInfo")) : '';
      utag.data.customParam_ssiContentInfo = ssiContentInfo;
      addAttributes(ssiParams,'docURL');
      addAttributes(ssiParams,'lang');
      addAttributes(ssiParams,'request_locale');
      if(ssiContentInfo !== '' && ssiContentInfo.indexOf('~') !== -1){
         var ssiContentArray = ssiContentInfo.split('~');
         for (var i=0; i<ssiContentArray.length; i++){
            if(ssiContentArray[i].split(':')[0] == 'HTMLFID' && typeof (utag.data.customParam_htmlfid) == "undefined") utag.data.customParam_htmlfid = ssiContentArray[i].split(':')[1];
            if(ssiContentArray[i].split(':')[0] == 'infotype') utag.data.customParam_infotype = ssiContentArray[i].split(':')[1];
            if(ssiContentArray[i].split(':')[0] == 'subType') utag.data.customParam_subtype = ssiContentArray[i].split(':')[1];
            if(ssiContentArray[i].split(':')[0] == 'Assettype') utag.data.customParam_Assettype = ssiContentArray[i].split(':')[1];
            if(ssiContentArray[i].split(':')[0] == 'Doctype') utag.data.customParam_Doctype = ssiContentArray[i].split(':')[1];
            if(ssiContentArray[i].split(':')[0] == 'CGCode') utag.data.customParam_CGCode = ssiContentArray[i].split(':')[1];
         }
      }
      if(typeof (utag.data.customParam_infotype) == "undefined") addAttributes(ssiParams,'infotype');
      if(typeof (utag.data.customParam_subtype) == "undefined") addAttributes(ssiParams,'subtype');
      addAttributes(ssiParams,'ctype');//for value #ctype
      addAttributes(ssiParams,'ctry');//for value #ctry
      if(typeof (utag.data.customParam_infotype) == "undefined"){
         if (window.location.href.indexOf('/rep_ca/') !== -1) utag.data.customParam_infotype = 'AN';
         else if (window.location.href.indexOf('/rep_oc/') !== -1) utag.data.customParam_infotype = 'OC';
         else if (window.location.href.indexOf('/rep_sm/') !== -1 || window.location.href.indexOf('/rep_rp/') !== -1) utag.data.customParam_infotype = 'DD';
      }
      if(typeof (utag.data.customParam_subtype) == "undefined"){
         if (window.location.href.indexOf('/rep_ca/') !== -1) utag.data.customParam_subtype = 'CA';
         else if (window.location.href.indexOf('/rep_oc/') !== -1) utag.data.customParam_subtype = 'NA';
         else if (window.location.href.indexOf('/rep_sm/') !== -1) utag.data.customParam_subtype = 'SM';
         else if (window.location.href.indexOf('/rep_rp/') !== -1) utag.data.customParam_subtype = 'RP';
      }
      if(typeof (utag.data.customParam_htmlfid) !== "undefined" && utag.data.customParam_htmlfid.indexOf('#') !== -1){
         utag.data.customParam_htmlfid = utag.data.customParam_htmlfid.substring(0,utag.data.customParam_htmlfid.indexOf('#'));
      }
      //add letternum parameter in Page ID value
      if(typeof (window.ssiParams['letternum']) != "undefined") utag.data.page_id += "?letternum=" + window.ssiParams['letternum'];
   }

   //----------add page view attributes for Partner world------------------------------------
   if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "partnerworld" || siteId.toLowerCase() == "contlisten" || siteId.toLowerCase() == "pw")){
      utag.data.customAttr = true;
      if (typeof (window.pwParams) == "undefined") window.pwParams = {};
      getNTPTVariable(pwParams);
      addAttributes(pwParams,'pw_bp_id');
      addAttributes(pwParams,'pw_ce_id');
      addAttributes(pwParams,'pw_locale');
      addAttributes(pwParams,'PW.Service');
      addAttributes(pwParams,'PW.Software');
      addAttributes(pwParams,'PW.Hardware');
      addAttributes(pwParams,'PW.Solution');
      addAttributes(pwParams,'PW.Sponsor');
      addAttributes(pwParams,'PW.ECMContentType');
      addAttributes(pwParams,'business_unit');
      addAttributes(pwParams,'content_id');
      addAttributes(pwParams,'resource_type');
      if(typeof window.pwParams.pw_locale == "undefined" && typeof window.digitalData.page.pageInfo.ibm.pw_locale !== "undefined"){
         utag.data["customParam_pw_locale"] = window.digitalData.page.pageInfo.ibm.pw_locale;
      }
   }

   //----------add page view attributes for Developer Works starts--------------------------------------------
   if(typeof(siteId) !== "undefined" && (siteId.toLowerCase().substring(0, 6) == "devwrk" || siteId.toLowerCase() == "dwnext")){
      utag.data.customAttr = true;
      if (typeof (window.devworkParams) == "undefined") window.devworkParams = {};
      getNTPTVariable(devworkParams);
      addAttributes(devworkParams,'ibmCmaId');
      addAttributes(devworkParams,'ibmContentAreas');
   }

   //----------add page view attributes for THINKLEADERS--------------------------------------------
   if(typeof(siteId) !== "undefined" && siteId.toLowerCase() == "thinkleaders"){
      utag.data.customAttr = true;
      if (typeof (window.thinkParams) == "undefined") window.thinkParams = {};
      getNTPTVariable(thinkParams);
      addAttributes(thinkParams,'ibmTMuser');
   }

   //----------add page view attributes SA_Message--------------------------------------------
   if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "cuf04" || siteId.toLowerCase() == "osol")){
      utag.data.customAttr = true;
      if (typeof (window.SA_Message) !== "undefined") utag.data.SA_Message = window.SA_Message;
   }

   //----------add page view attributes for IBM CLOUD--------------------------------------------
   if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "mktibmcloud" || siteId.toLowerCase() == "cloud")){
      utag.data.customAttr = true;
   }

   //----------add page view attributes for ECOM--------------------------------------------
   if (typeof(siteId) !== "undefined" && siteId.substring(0,4).toLowerCase() == "ecom") {
      utag.data.customAttr = true;
   }

   //----------add page view attributes for BLUEMIX--------------------------------------------
   if (typeof(siteId) !== "undefined" && siteId.toLowerCase() == "bluemix") {
      utag.data.customAttr = true;
      demandBaseAPICall();
   }
}
/*---------------------------------------------------set NTPT attributes---------------------------------------------------------*/
function getNTPTVariable(addParams){
   if(typeof (window.NTPT_PGEXTRA) != "undefined"){
      var separators = ['&', '='],
      tokens = NTPT_PGEXTRA.split(new RegExp(separators.join('|'), 'g')),
      arr1 = NTPT_PGEXTRA.split('&'),
      j = 0;
      for(var i=0; i<arr1.length; i++){
         var arr2=arr1[i].split('=');
         addParams[arr2[0]]=arr2[1];
      }
   }
}

/*---------------------------------------------------add attributes---------------------------------------------------------*/
function addAttributes(clientArray,value){
   if(typeof (clientArray[value]) != "undefined"){
      utagVal = "customParam_"+value.replace(/\./g,"_");
      utag.data[utagVal] = clientArray[value];
   }
}

/*---------------------------------------------------set data for Support portal---------------------------------------------------------*/
function getCmCreateProductView(n){
   var scripts = document.getElementsByTagName("script"),
   tagArray = "";
   for (i=0; i <scripts.length; i++) {
      if(scripts[i].innerHTML.indexOf("cmCreateProductviewTag") !== -1){
         tagArray = (scripts[i].innerHTML).split(/[""''(,)]+/);
         break;
      }
   }
   if(tagArray.length > 0){
      utag.data.customParam_productID = tagArray[1];
      utag.data.customParam_productName = tagArray[2];
      utag.data.customParam_productCategory = tagArray[3];
   }
}

/*---------------------------------------------------set meta data---------------------------------------------------------*/
function get_meta_tag(name){
   var metatags = document.getElementsByTagName('meta'),
   metaValue = null;
   for (var i = 0; i < metatags.length; i++) {
      if (metatags[i].getAttribute("name") == name) {
         metaValue = metatags[i].getAttribute("content");
      }
   }
   if (metaValue == null) {
      metaValue = checkJSON(name);
   }
   return metaValue;
}

/*---------------------------------------------------set JSON data---------------------------------------------------------*/
function checkJSON(name){
   name = name.toLowerCase().replace('.', '_');
   if (window.digitalData.page) {
      for (var len in window.digitalData.page.attributes) {
         if (window.digitalData.page.attributes.hasOwnProperty(len) && len.toLowerCase() == name) {
            return window.digitalData.page.attributes[len];
         }
      }
   }
   return null;
}

/*---------------------------------------------------check query string data---------------------------------------------------------*/
function fetchQuerystring(clientName){
   var queryString = window.location.href.substring(window.location.href.indexOf("?") + 1),
   queries, temp, i, l,
   queries = queryString.split("&");
   for (i = 0, l = queries.length; i < l; i++) {
      temp = queries[i].split('=');
      var x = temp[0].toLowerCase();
      clientName[temp[0]] = temp[1];
      if(clientName == "iwm" && temp[0] == "source"){
         window.IWMSource = "?source="+temp[1];
      }
   }
}

/*---------------------------------------------------load marketing attribute data---------------------------------------------------------*/
function checkWindowParam(paramsAttribute){
   var c ="";
   for(var i=0;i<paramsAttribute.length;i++){
      if(typeof (window.params[paramsAttribute[i]]) != "undefined") c+= window.params[paramsAttribute[i]]+"_";
      if(paramsAttribute[i] == "s_tact" && typeof (window.params[paramsAttribute[i]]) == "undefined"){
         if(typeof (window.params['ct']) != "undefined") c+= window.params['ct']+"_";  
      }
   }
   c=c.substring(0,c.length-1);
   return c;
}
function loadMarketingAttribute(i,m,attr){
   var mvalue = null;
   if (typeof window.params[m] == "undefined" && typeof window.params[attr] !== "undefined") mvalue = window.params[attr];
   else if (i == 10 && typeof window.params.cm_mmca10 == "undefined" && typeof window.params.ccy == "undefined" && typeof window.params.cc !== "undefined") mvalue = window.params.cc;
   return mvalue;
}

/*---------------------------------------------------read cookie values---------------------------------------------------------*/
function readCookie(n){
   return (n = new RegExp('(?:^|;\\s*)' + ('' + n).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && n[1];
}

/*--------------------------------------------------Demand Base API call-------------------------------------------------------*/
function demandBaseAPICall(){
   requestServerCall = function (url) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = url;
      document.getElementsByTagName("head")[0].appendChild(s);
   },
   Demandbase_IP_callback = function (data) {
      if(typeof data !== "undefined"){
         if(typeof window.demandBase == "undefined") window.demandBase = new Object();
         for(var key in data) {
            var x = "DB_"+key;
            if(typeof window.demandBase[x] == "undefined" && Object.prototype.hasOwnProperty.call(data, key)) window.demandBase[x] = data[key];
         }
      }
   }
   requestServerCall("https://api.demandbase.com/api/v2/ip.json?referrer=&page=https%3A%2F%2Fconsole.ng.bluemix.net%2F&page_title=IBM%20Bluemix%20-%20Next-Generation%20Cloud%20App%20Development%20Platform&key=7d901296060be8d862db19aeed6659e6&callback=Demandbase_IP_callback&query=");  
}