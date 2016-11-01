/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/digitalanalytics-common.js
 * Extension Name: digitalanalytics-common.js
 * Scope         : All Tags
 * Execution     : Before Load Rules
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE SVN VERSION IN ECLIPSE
 */
var tmeid="digitalanalytics-common.js";
try {
   // Ensure that the digitalData Object has not been reset by the page
   if (typeof(window.digitalData.page.isDataLayerReady) === "undefined") {
      window.datalayer.update();
      utag.DB('+++TME > digitalanalytics-common.js: digitalData was reset, recreating datalayer');
   }
   // Ensure that we capture the CoreID6 cookie ID
   if (typeof(window.digitalData.page.pageInfo.coremetrics.visitorID) === "undefined") {
	   window.datalayer.util.readCookies();
	   utag.DB('+++TME > digitalanalytics-common.js: Reading first-party cookies');
   }
   if (typeof (window.digitalData.page.pageInfo.version) !== "undefined") {
      utag.data["js_page.digitalData.page.pageInfo.version1"] = window.digitalData.page.pageInfo.version;
   }
   utag.data["dom.title"] = document.title;

   // Just in case, make sure the category_id is properly set based on the ibm_global_data object
   if (typeof(window.ibm_global_data) !== "undefined" && typeof(window.ibm_global_data["Content Category (CDF)"]) !== "undefined" && utag.data.category_id !== window.ibm_global_data["Content Category (CDF)"]) {
	   utag.data.category_id = window.digitalData.page.category.primaryCategory = window.ibm_global_data["Content Category (CDF)"];
	   utag.DB('+++TME > digitalanalytics-common.js: Updating category ID from ibm_global_data');
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
         if (typeof window.digitalData.util.qp.cm_mmca4 == "undefined" && typeof(window.digitalData.util.qp.cm)!="undefined"){
            var param_cm=window.digitalData.util.qp.cm;
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
            marketingAttributes=marketingAttributes+"cm_mmca4=" + window.digitalData.util.qp.cm + "&";
         }
      }else{
         var m = "cm_mmca"+i,
         x = loadMarketingAttribute(i,m,marketingAttrArray[i-1]);
         if(x !== null) marketingAttributes = marketingAttributes + "cm_mmca"+i+"=" + x + "&";
         if(x !== null && i == 3) category = x;
         if(x !== null && i == 10) placement = x;
      }
   }
   vendor = (typeof (window.digitalData.util.qp.iio) !== "undefined" && window.digitalData.util.qp.iio !== "") ? (cmValue + "_" + window.digitalData.util.qp.iio) : cmValue; 
   if (typeof (window.digitalData.util.qp.cm_mmc) != "undefined") {
      marketingAttributes = "&" + marketingAttributes;
   } else if (marketingAttributes.length > 0) {
      marketingAttributes = "&cm_mmc=" + vendor + "-_-" + category + "-_-" + placement + "-_-" + item + "&" + marketingAttributes;
   }
   if (marketingAttributes.lastIndexOf("&") == marketingAttributes.length - 1) {
      marketingAttributes = marketingAttributes.substring(0, marketingAttributes.length - 1);
   }
   window.digitalData.page.pageInfo.destinationURL = document.URL + marketingAttributes;
   utag.data.destinationURL = window.digitalData.page.pageInfo.destinationURL;

   /*--------------------------------------------initialize window.digitalData.page.attribute.extraFields if needed------------------*/
   if (typeof (window.digitalData.page.attribute.extraFields) == "undefined") {
      if(typeof (window.CM_EXTRA) != "undefined" && window.CM_EXTRA != ""){
         window.digitalData.page.attribute.extraFields = "";
         var separators = ['&', '='],
         tokens = CM_EXTRA.split(new RegExp(separators.join('|'), 'g')),
         arr1 = CM_EXTRA.split('&'),
         j = 0;
         for(var i=0; i<arr1.length; i++){
            var ex = "extrafields"+(i+1);
            utag.data[ex] = arr1[i].split('=')[1];
            window.digitalData.page.attribute.extraFields += arr1[i].split('=')[1]+"-_-";
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
}
catch (error) {
   console.error('+++TME-ERROR > digitalanalytics-common.js: ' + error);
}

/*
 *>>>>>>>>>>FUNCTIONS
 */

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
      for (var len in window.digitalData.page.attribute) {
         if (window.digitalData.page.attribute.hasOwnProperty(len) && len.toLowerCase() == name) {
            return window.digitalData.page.attribute[len];
         }
      }
   }
   return null;
}

/*---------------------------------------------------load marketing attribute data---------------------------------------------------------*/
function checkWindowParam(paramsAttribute){
   var c ="";
   for(var i=0;i<paramsAttribute.length;i++){
      if(typeof (window.digitalData.util.qp[paramsAttribute[i]]) != "undefined") c+= window.digitalData.util.qp[paramsAttribute[i]]+"_";
      if(paramsAttribute[i] == "s_tact" && typeof (window.digitalData.util.qp[paramsAttribute[i]]) == "undefined"){
         if(typeof (window.digitalData.util.qp['ct']) != "undefined") c+= window.digitalData.util.qp['ct']+"_";  
      }
   }
   c=c.substring(0,c.length-1);
   return c;
}
function loadMarketingAttribute(i,m,attr){
   var mvalue = null;
   if (typeof window.digitalData.util.qp[m] == "undefined" && typeof window.digitalData.util.qp[attr] !== "undefined") mvalue = window.digitalData.util.qp[attr];
   else if (i == 10 && typeof window.digitalData.util.qp.cm_mmca10 == "undefined" && typeof window.digitalData.util.qp.ccy == "undefined" && typeof window.digitalData.util.qp.cc !== "undefined") mvalue = window.digitalData.util.qp.cc;
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