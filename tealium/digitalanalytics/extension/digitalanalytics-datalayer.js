/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/digitalanalytics-datalayer.js
 * Extension Name: digitalanalytics-datalayer.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
var tmeid="digitalanalytics-datalayer.js";

function isChrome53() {
   var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
   raw = raw ? parseInt(raw[2], 10) : false;
   if (typeof window.chrome !== 'undefined' && raw === 53) {
       return true;
   } 
   else {
       return false;
   }
};


/*---------------------------------------------------Initialize all Digital Data Objects---------------------------------------------------------*/
var datalayer = {
      pageidQueryStringsDefault : [{"pathNameSubstring": "/marketing/iwm/",       
                                    "qsParameter"      : ["source","S_PKG"]},
                                   {"pathNameSubstring": "/search/",       
                                    "qsParameter"      : ["q","cc","lang","hpp","o"]},
			           {"pathNameSubstring": "/common/ssi/",       
                                    "qsParameter"      : ["letternum","supplier","htmlfid","docURL","MPPEFSCH"]},
				   {"pathNameSubstring": "/support/docview.wss",       
                                    "qsParameter"      : ["uid"]},
				   {"pathNameSubstring": "/support/fixcentral/",       
                                    "qsParameter"      : ["product"]}],
     
      testDomains : ["dev.nwtw.ibm.com","testdata.coremetrics.com","localhost","wwwbeta-sso.toronto.ca.ibm.com"],
      
      util : {
         /*---------------------------------------------------Function for any overrides to the data layer---------------------------------------------------*/
         override : function () {
            // Disable coremetrics if the browser is Chrome 53 - Code initially provided by Tealium
            if (window.isChrome53()) {
               window.digitalData.page.pageInfo.coremetrics.enabled = "false"; 
            }
         },

         /*---------------------------------------------------Add SHA256 Hash Functions---------------------------------------------------------*/
         // 2016-08-04 - jleon: RTC Story# 978510 - https://github.com/jbt/js-crypto
         sha256 : function() {function e(a,b){return a>>>b|a<<32-b}for(var b=1,a,m=[],n=[];18>++b;)for(a=b*b;312>a;a+=b)m[a]=1;b=1;for(a=0;313>b;)m[++b]||(n[a]=Math.pow(b,.5)%1*4294967296|0,m[a++]=Math.pow(b,1/3)%1*4294967296|0);return function(g){for(var l=n.slice(b=0),c=unescape(encodeURI(g)),h=[],d=c.length,k=[],f,p;b<d;)k[b>>2]|=(c.charCodeAt(b)&255)<<8*(3-b++%4);d*=8;k[d>>5]|=128<<24-d%32;k[p=d+64>>5|15]=d;for(b=0;b<p;b+=16){for(c=l.slice(a=0,8);64>a;c[4]+=f)h[a]=16>a?k[a+b]:(e(f=h[a-2],17)^e(f,19)^f>>>10)+(h[a-7]|0)+(e(f=h[a-15],7)^e(f,18)^f>>>3)+(h[a-16]|0),c.unshift((f=(c.pop()+(e(g=c[4],6)^e(g,11)^e(g,25))+((g&c[5]^~g&c[6])+m[a])|0)+(h[a++]|0))+(e(d=c[0],2)^e(d,13)^e(d,22))+(d&c[1]^c[1]&c[2]^c[2]&d));for(a=8;a--;)l[a]=c[a]+l[a]}for(c="";63>a;)c+=(l[++a>>3]>>4*(7-a%8)&15).toString(16);return c}}(),

         /*---------------------------------------------------Add Page Load Epoch Function---------------------------------------------------------*/
         setPageLoadEpoch : function (reset) {
            try {
               if (reset !== 1) {
                  window.digitalData.page.session.pageloadEpoch = (typeof(window.loadingTime) !== "undefined") ? window.loadingTime : new Date().getTime();
                  window.loadingTime = window.digitalData.page.session.pageloadEpoch;
               }
               else {
                  window.digitalData.page.session.pageloadEpoch = new Date().getTime();
                  window.loadingTime = window.digitalData.page.session.pageloadEpoch;                  
               }
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > setPageLoadEpoch: ' + error);
            }
         },

         /*---------------------------------------------------Add parseQueryString function---------------------------------------------------------*/
         // 2016-07-28 - jleon: RTC Story# 978510
         parseQueryString : function (fullURL) {
            try {
               var paramsObject = {},
               queryString = fullURL.substring(fullURL.indexOf("?") + 1),
               queries, temp, i, l,
               queries = queryString.split("&");
               for (i = 0, l = queries.length; i < l; i++) {
                  temp = queries[i].split('=');
                  paramsObject[temp[0]] = temp[1];
               }
               return(paramsObject);
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > parseQueryString: ' + error);
            }
         },

         /*---------------------------------------------------Add calculateURLID function---------------------------------------------------------*/
         // 2016-07-28 - jleon: RTC Story# 978510 (previous RTC Story# 902576)
         calculateURLID : function (fullURL) {
            try {
               var returnValue = "";
               if (fullURL !== "") {
                  var parserURL = document.createElement('a');
                  // Get rid of 'm.ibm.com/http/' pattern for mobile, if exists
                  parserURL.href = fullURL.replace(/m\.ibm\.com\/https?\//,'');
                  // IE 8 and 9 dont load the attributes "protocol" and "host" in case the source URL
                  // is just a pathname, that is, "/example" and not "http://domain.com/example".
                  parserURL.href = parserURL.href;
                  var pathName = parserURL.pathname.toLowerCase();
                  if (pathName[0] !== "/") {
                     // 2016-08-31 - jleon: TIE-163. Missing leading slash in address pathname method for IE
                     pathName = "/" + pathName;
                  }

                  //--- START: Patch to define pageidQueryStrings for IWM and Search pages.
                  // 2016-09-16 - shruti: Code optimization. Used JSON instead of if-else
                  // process each entry to look for matches
                  for (var i = 0; i < datalayer.pageidQueryStringsDefault.length; i++) {
                     var t = datalayer.pageidQueryStringsDefault[i];               
                     if (pathName.indexOf(t.pathNameSubstring) === 0 && typeof(window.digitalData.page.attributes.pageidQueryStrings) == "undefined") {               
                        // Set PageID Query Strings 
                        window.digitalData.page.attributes.pageidQueryStrings = t.qsParameter;
                        break;
                     }
                  }              
                  //--- END: Patch to define pageidQueryStrings for IWM and Search pages. ##TODELETE## when standard is adopted

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
                  var qs = this.parseQueryString(parserURL.href);
                  if (window.digitalData.page.attributes.pageidQueryStrings) {
                     var addQSValue = "";
                     for (var k=0;k<window.digitalData.page.attributes.pageidQueryStrings.length;k++) {
                        var q = window.digitalData.page.attributes.pageidQueryStrings[k];
                        if (typeof(qs[q]) !== "undefined") addQSValue += q + "=" + qs[q] + "&";
                     }
                     addQSValue = addQSValue.replace(/&$/,"");
                     pathName = (addQSValue !== "") ? (pathName + "?" + addQSValue) : pathName;
                  }
                  //remove trailing slash, question mark, or hash(if any)
                  pathName = pathName.replace(/[(\/)(?)(#)(&)]+$/, "");
                  returnValue = parserURL.hostname + pathName;
               }
               return(returnValue);
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > calculateURLID: ' + error);
            }
         },

         /*---------------------------------------------------Add parseEventName function---------------------------------------------------------*/   
         parseEventName : function(eventName) {
            /*
             * eventName contains two parameters separated by a colon: <product_name>:<tactic_code>
             * This function will ensure that the string is not greater than 256 characters, and ensuring that the second parameter is complete
             */ 
            try {
               if (eventName.length <= 256) {
                  eventName = eventName.replace(/\s+/g, '-').toUpperCase();
               }
               else {
                  var eventNameParts = eventName.split(':');
                  if (eventNameParts.length === 1) {
                     eventName = eventNameParts[0].substring(0,256).replace(/\s+/g, '-').toUpperCase();
                  }
                  else {
                     eventName = eventNameParts[0].substring(0,256-eventNameParts[1].length-1).replace(/\s+/g, '-').toUpperCase() + ':' + eventNameParts[1].replace(/\s+/g, '-').toUpperCase();
                  }
               }
               return(eventName);
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > parseEventName: ' + error);
            }
         },
         
         /*---------------------------------------------------Read Cookies function---------------------------------------------------------*/
         readCookies : function () {
            try {
               // Ensure the parent objects is present, and initialize the cp object
               window.digitalData.util    = window.digitalData.util || {};
               window.digitalData.util.cp = {};
               
               if (window.document.cookie !== "") {
                  var cookies = window.document.cookie.split(";"),
                  name, value;
                  for (var i = 0, len = cookies.length; i < len; i++) {
                     name = cookies[i].substring(0,cookies[i].indexOf('=')).trim();
                     value = cookies[i].substring(cookies[i].indexOf('=')+1);
                     window.digitalData.util.cp[name] = window.decodeURIComponent(value)
                  }
                  // Now, itemize each element for the utag_main
                  if (typeof(digitalData.util.cp.utag_main) !== "undefined") {
                     var temp;
                     cookies = digitalData.util.cp.utag_main.split("$");
                     for (var i = 0, len = cookies.length; i < len; i++) {
                        temp = cookies[i].split(":");
                        window.digitalData.util.cp["utag_main_" + temp[0]] = temp[1].split(";")[0];
                     }
                  }
               }
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > readCookies: ' + error);
            }
         },
         
         /*---------------------------------------------------Read Metadata Elements Functions---------------------------------------------------------*/
         readMetaData : function () {
            try {
               // Ensure the parent objects is present, and initialize the meta object
               window.digitalData.util    = window.digitalData.util || {};
               window.digitalData.util.meta = {};

               var metatags = window.document.getElementsByTagName('meta');
               for (var i = 0, len = metatags.length; i < len; i++) {
                  if (metatags[i].getAttribute("name") !== null) {
                     // Set metadata element names in lower case
                     window.digitalData.util.meta[metatags[i].getAttribute("name").toLowerCase()] = metatags[i].getAttribute("content");
                  }
               }
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > readMetaData: ' + error);
            }
         },

         /*---------------------------------------------------Set Query String Elements---------------------------------------------------------*/
         readQueryStrings : function () {
            try {
               // Ensure the parent objects is present, and initialize the qp object
               window.digitalData.util    = window.digitalData.util || {};
               window.digitalData.util.qp = {};

               if (window.location.search !== "") {
                  var queryString = window.location.search.substring(window.location.search.indexOf("?")+1),
                  queries = queryString.split("&"),
                  temp, i, l;
                  for (i = 0, l = queries.length; i < l; i++) {
                     temp = queries[i].split('=');
                     window.digitalData.util.qp[temp[0]] = window.decodeURIComponent(temp[1]);
                  }
               }
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > readQueryStrings: ' + error);
            }
         },
         
         /*---------------------------------------------------Get referring URL---------------------------------------------------------*/
         getReferringURL : function () {
            try {
               // Ensure the parent objects is present, and initialize the referrer object
               window.digitalData.util    = window.digitalData.util || {};
               window.digitalData.util.referrer = {};

               if (window.document.referrer !== "" ) {
                  // 2016-09-16 - jleon: BMP-1480 - making sure that the referrer is set, otherwise createElement will take by default the current URL
                  var referrerURL = document.createElement('a');
                  // Get rid of 'm.ibm.com/http/' pattern for mobile, if exists
                  referrerURL.href = window.document.referrer.replace(/m\.ibm\.com\/https?\//,'');
                  // IE 8 and 9 dont load the attributes "protocol" and "host" in case the source URL
                  // is just a pathname, that is, "/example" and not "http://domain.com/example".
                  referrerURL.href = referrerURL.href;
                  window.digitalData.util.referrer.hash     = referrerURL.hash;
                  window.digitalData.util.referrer.host     = referrerURL.host;
                  window.digitalData.util.referrer.hostname = referrerURL.hostname;
                  window.digitalData.util.referrer.href     = referrerURL.href;
                  window.digitalData.util.referrer.origin   = referrerURL.origin;
                  window.digitalData.util.referrer.pathname = referrerURL.pathname;
                  window.digitalData.util.referrer.port     = referrerURL.port;
                  window.digitalData.util.referrer.protocol = referrerURL.protocol;
                  window.digitalData.util.referrer.search   = referrerURL.search;
               }
               else {
                  window.digitalData.util.referrer.hash     = "";
                  window.digitalData.util.referrer.host     = "";
                  window.digitalData.util.referrer.hostname = "";
                  window.digitalData.util.referrer.href     = "";
                  window.digitalData.util.referrer.origin   = "";
                  window.digitalData.util.referrer.pathname = "";
                  window.digitalData.util.referrer.port     = "";
                  window.digitalData.util.referrer.protocol = "";
                  window.digitalData.util.referrer.search   = "";
               }
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > getReferringURL: ' + error);
            }
         },
         
         /*---------------------------------------------------Set PAGEID/URLID in DDO---------------------------------------------------------------*/
         setPageID : function () {
            try {
               if (typeof(window.digitalData.page.pageInfo.urlID) !== "undefined" && typeof(window.digitalData.page.pageInfo.pageID) !== "undefined" 
                  && window.digitalData.page.pageInfo.pageID === window.digitalData.page.pageInfo.urlID) {
                  // urlID has been previously defined and assigned to pageID, need to undefine pageID to make sure that it is set properly
                  window.digitalData.page.pageInfo.pageID = undefined;
               }
               window.digitalData.page.pageInfo.urlID = this.calculateURLID(window.location.href);
               if (typeof(window.digitalData.page.pageID) == "undefined" && typeof(window.digitalData.page.pageInfo.pageID) == "undefined") {
                  // If the pageID is not provided by the page, then set it to the calculated value in urlID
                  window.digitalData.page.pageInfo.pageID = window.digitalData.page.pageInfo.urlID;
               } 
               else if (typeof(window.digitalData.page.pageID) !== "undefined") {
                  // Support for old DDO definition of the pageID
                  window.digitalData.page.pageInfo.pageID = window.digitalData.page.pageID;
               }
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > setPageID: ' + error);
            }
         },

         /*---------------------------------------------------Set referral URLID and referral domain in DDO---------------------------------------------------------------*/
         setReferringURL : function () {
            try {
               window.digitalData.page.pageInfo.referrer   = window.digitalData.util.referrer.href;
               window.digitalData.page.pageInfo.referrerID = this.calculateURLID(window.digitalData.page.pageInfo.referrer);
               // Get the sub domain or root domain from the referrer hostname
               var referrerParts = window.digitalData.util.referrer.hostname.split('.');
               if (referrerParts.length < 2) {
                  // if the hostname has less than 2 parts, then it is valid (localhost)
                  window.digitalData.page.pageInfo.referrerDomain = "";
               }
               else if (referrerParts.length > 2) {
                  // if the hostname has three or more parts, then substract one to get the subdomain or root domain
                  window.digitalData.page.pageInfo.referrerDomain = referrerParts.splice(-1 * (referrerParts.length - 1),referrerParts.length - 1).join('.');
               }
               else {
                  // if the hostname has only two parts, assume it is the root domain of the site
                  window.digitalData.page.pageInfo.referrerDomain = window.digitalData.util.referrer.hostname;
               }
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > setReferringURL: ' + error);
            }
         },

         /*-------------------------------------------------setting IBMER value--------------------------------------------------------*/
         setIBMer : function () {
            try {
               if (window.document.domain.indexOf("ibm.com") !== -1) {
                  //for ibm.com sites
                  if (String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-[^\=]*|OSCw3Session|IBM_W3SSO_ACCESS)=/)) {
                     if (typeof(window.digitalData.user.segment.isIBMer) == "undefined" || window.digitalData.user.segment.isIBMer == null) {
                        window.digitalData.user.segment.isIBMer = 1
                     }
                  } 
                  else {
                     if (typeof(window.digitalData.user.segment.isIBMer) == "undefined" || window.digitalData.user.segment.isIBMer == null) {
                        window.digitalData.user.segment.isIBMer = 0
                     }
                  }
               }
               else {
                  // for non ibm.com sites, based on API service executed in ida_stats.js
                  window.digitalData.user.segment.isIBMer = (window.NTPT_IBMer == "true") ? 1 : 0;
                  // Get IBMISP cookie value for non ibm.com
                  if (window.IBMIXS) window.digitalData.util.cp.IBMIXS = window.IBMIXS; 
               }
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > setIBMer: ' + error);
            }
         },
         
         /*-------------------------------------------------setting IBM ID Profile ID--------------------------------------------------------*/
         setProfileID : function () {
            try {
               // 2016-07-18 - jleon: RTC Story# 967611
               if (typeof(window.digitalData.util.cp.IBMISP) !== "undefined") {
                  // Second value of the IBMISP is the Profile ID
                  window.digitalData.user.profile.uuid = window.digitalData.util.cp.IBMISP.split('-')[1] || "";
               }
               else if (typeof(window.digitalData.util.cp.IBMIXS) !== "undefined") {
                  window.digitalData.user.profile.uuid = window.digitalData.util.cp.IBMIXS.split('-')[1] || "";
               }
               else {
                  window.digitalData.user.profile.uuid = "";
               }
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > setProfileID: ' + error);
            }
         },

         /*---------------------------------------------------Set Session ID value---------------------------------------------------------*/
         setSessionID : function () {
            try {
               // Session ID is based on the Tealium cookie ID and the Tealium session ID
               window.digitalData.page.session.uSessionID = window.digitalData.util.cp["utag_main_v_id"] + "-" + window.digitalData.util.cp["utag_main_ses_id"];
               // Unique Pageview ID is based on the unique session ID and the pageload epoch, the value is hashed
               window.digitalData.page.session.uPageViewID = this.sha256(window.digitalData.page.session.uSessionID + '-' + window.digitalData.page.session.pageloadEpoch);
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > setSessionID: ' + error);
            }
         },
         
         /*---------------------------------------------------Set Site ID---------------------------------------------------------*/
         setSiteID : function () {
            try {
               if (typeof(window.digitalData.util.qp.siteID) !== "undefined") {
                  // Set siteID from query string passed on URL
                  window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.util.qp.siteID;
               }
               else if (typeof(window.digitalData.page.pageInfo.ibm.siteID) !== "undefined") {
                  // set siteID from DDO value
                  window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.page.pageInfo.ibm.siteID;
               }
               else if (typeof(window.digitalData.util.meta["ibm.wtmsite"]) !== "undefined") {
                  // set siteID based on metadata element IBM.WTMSite
                  window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.util.meta["ibm.wtmsite"];
               }
               else if (typeof(window.digitalData.util.meta["wtmsite"]) !== "undefined") {
                  // set siteID based on metadata element WTMSite
                  window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.util.meta["wtmsite"];
               }
               else if (typeof(window.digitalData.page.site) !== "undefined" && typeof(window.digitalData.page.site.siteID) !== "undefined") {
                  // set siteID from OLD DDO format value
                  window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.page.site.siteID;
               }
               else if (window.location.href.toLowerCase().indexOf("www-935.ibm.com/services/") !== -1 && window.location.pathname.toLowerCase().match(/\/gbs\/|\/business-consulting\//)) {
                  // GBS siteID based on URL patterns
                  window.digitalData.page.pageInfo.ibm.siteID = "GBS";
               }
               else if (document.domain.toLowerCase().split('.').splice(-2, 2).join('.') === "softlayer.com") {
                  // SOFTLAYER siteID based on current URL's domain
                  window.digitalData.page.pageInfo.ibm.siteID = 'SOFTLAYER'; 
               }
               else if (window.location.href.toLowerCase().match(/www-935.ibm.com\/industries\/|www-06.ibm.com\/industries\/jp\//)) {
                  // INDUSTRIES siteID based on URL patterns
                  window.digitalData.page.pageInfo.ibm.siteID = "INDUSTRIES";
               }
               else if (typeof(window.digitalData.page.category.primaryCategory) !== "undefined" && window.digitalData.page.category.primaryCategory.toLowerCase() == "cuf04") {
                  // Set siteID based on Category id for OSOL pages
                  window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.page.category.primaryCategory
               }
               else if (typeof(window.digitalData.page.category.categoryID) !== "undefined" && window.digitalData.page.category.categoryID.toLowerCase() == "cuf04") {
                  // Set siteID based on OLD DDO format Category ID for OSOL pages
                  window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.page.category.primaryCategory;
               }
               else if (typeof(window.digitalData.page.category.primaryCategory) !== "undefined" && window.digitalData.page.category.primaryCategory.substring(0, 5) == "SOFDC") {
                  // Set siteID based on Category id for developerWorks
                  window.digitalData.page.pageInfo.ibm.siteID = "DEVWRKS"
               }
               else if (typeof(window.digitalData.page.category.categoryID) !== "undefined" && window.digitalData.page.category.categoryID.substring(0, 5) == "SOFDC") {
                  // Set siteID based on OLD DDO format Category ID
                  window.digitalData.page.pageInfo.ibm.siteID = "DEVWRKS";
               }
               else if (typeof(window.digitalData.util.meta["ibm.wtmcategory"]) !== "undefined" && window.digitalData.util.meta["ibm.wtmcategory"].substring(0, 5) == "SOFDC") {
                  // 2016-09-21 - matej: Set siteID based on Category metatag for developerWorks
                  window.digitalData.page.pageInfo.ibm.siteID = "DEVWRKS";
               }
               else {
                  // Default: set siteID to IBMTESTWWW as last resort
                  window.digitalData.page.pageInfo.ibm.siteID = "IBMTESTWWW";
               }
               // Saving initial siteID
               window.digitalData.page.pageInfo.ibm.iniSiteID = window.digitalData.page.pageInfo.ibm.siteID;
               
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > setSiteID: ' + error);
            }
         },

         /*---------------------------------------------------setting Client ID---------------------------------------------------------*/
         setClientID : function () {
            try {
               // If the siteID prefix or suffix is "test" or if the full domain of the hostname is in the testDomains array then set Client ID to 80200000 (test instance)
               if (window.digitalData.page.pageInfo.ibm.siteID.toLowerCase().match(/^test|test$/) || (datalayer.testDomains.indexOf(document.location.hostname.replace(/^[^\.]+./,"")) !== -1)) {
                  window.digitalData.page.pageInfo.ibm.cmClientID = "80200000|" + window.digitalData.page.pageInfo.ibm.siteID;
               }
               else {
                  window.digitalData.page.pageInfo.ibm.cmClientID = "50200000|" + window.digitalData.page.pageInfo.ibm.siteID;
               }
            }
            catch (error) {
               console.error('+++TME-ERROR > digitalanalytics-datalayer.js > setClientID: ' + error);
            }
         },
      },

      /*---------------------------------------------------Init Function for DataLayer---------------------------------------------------------*/
      update : function () {
         try {
            // Initialize digitalData Object
            window.digitalData                 = window.digitalData || {};
            window.digitalData.page            = window.digitalData.page || {};
            window.digitalData.user            = window.digitalData.user || {};
            window.digitalData.util            = window.digitalData.util || {};
            window.digitalData.page.attributes = window.digitalData.page.attributes || {};
            window.digitalData.page.category   = window.digitalData.page.category || {};
            window.digitalData.page.pageInfo   = window.digitalData.page.pageInfo || {};
            window.digitalData.page.session    = window.digitalData.page.session || {};
            window.digitalData.user.profile    = window.digitalData.user.profile || {};
            window.digitalData.user.segment    = window.digitalData.user.segment || {};
            window.digitalData.util.cp         = window.digitalData.util.cp || {};
            window.digitalData.util.meta       = window.digitalData.util.meta || {};
            window.digitalData.util.qp         = window.digitalData.util.qp || {};
            window.digitalData.util.referrer   = window.digitalData.util.referrer || {};
            window.digitalData.page.category.ibm         = window.digitalData.page.pageInfo.ibm || {};
            window.digitalData.page.pageInfo.ibm         = window.digitalData.page.pageInfo.ibm || {};
            window.digitalData.page.pageInfo.coremetrics = window.digitalData.page.pageInfo.coremetrics || {};
            window.digitalData.page.pageInfo.tealium     = window.digitalData.page.pageInfo.tealium || {};
            window.digitalData.page.pageInfo.metrics     = window.digitalData.page.pageInfo.metrics || {};

            /*---------------------------------------------------setting page loading time---------------------------------------------------------*/
            this.util.setPageLoadEpoch(0); 
            
            /*---------------------------------------------------Set Cookies---------------------------------------------------------*/
            this.util.readCookies();
            
            /*---------------------------------------------------Set Metadata Elements---------------------------------------------------------*/
            this.util.readMetaData();
            
            /*---------------------------------------------------Set Query String Elements---------------------------------------------------------*/
            this.util.readQueryStrings();

            /*---------------------------------------------------Get referring URL---------------------------------------------------------*/
            this.util.getReferringURL();
            
            /*---------------------------------------------------Set PAGEID/URLID in DDO---------------------------------------------------------------*/
            this.util.setPageID();
                        
            /*---------------------------------------------------Set referral URLID and referral domain in DDO---------------------------------------------------------------*/
            this.util.setReferringURL();
            
            /*---------------------------------------------------Set IBMER value--------------------------------------------------------*/
            this.util.setIBMer();
            
            /*---------------------------------------------------Set IBM ID Profile ID--------------------------------------------------------*/
            this.util.setProfileID();
            
            /*---------------------------------------------------Set Session ID value---------------------------------------------------------*/
            this.util.setSessionID();

            /*---------------------------------------------------Set Site ID---------------------------------------------------------*/
            this.util.setSiteID();
            if (window.digitalData.user.segment.isIBMer) {
               window.digitalData.page.pageInfo.ibm.iniSiteID = window.digitalData.page.pageInfo.ibm.iniSiteID + "_I"
            }

            /*---------------------------------------------------setting Client ID---------------------------------------------------------*/
            this.util.setClientID();

            /*---------------------------------------------------Set Data Layer Ready---------------------------------------------------------*/
            window.digitalData.page.isDataLayerReady = true;

            /*---------------------------------------------------Load Coremetrics Tags by Default---------------------------------------------------------*/
            window.digitalData.page.pageInfo.coremetrics.enabled = "true";

            /*---------------------------------------------------Override---------------------------------------------------------*/
            this.util.override();
            
           /*---------------------------------------------------Set UDO Variables---------------------------------------------------------*/
            if (typeof(window.utag) !== "undefined" && typeof(window.utag.data) !== "undefined") {
               utag.data.concat_clientid  = window.digitalData.page.pageInfo.ibm.cmClientID;
               utag.data.site_id          = window.digitalData.page.pageInfo.ibm.siteID;
               utag.data.iniSiteID        = window.digitalData.page.pageInfo.ibm.iniSiteID;
               utag.data.page_id          = window.digitalData.page.pageInfo.pageID;   
               utag.data.urlID            = window.digitalData.page.pageInfo.urlID;
               utag.data.pageProd         = window.digitalData.page.pageInfo.urlID;
               utag.data.page_loadingTime = window.digitalData.page.session.pageloadEpoch;
               utag.data.cookie_sessionID = window.digitalData.page.session.uSessionID;
               utag.data.uPageViewID      = window.digitalData.page.session.uPageViewID;
               utag.data.profileID        = window.digitalData.user.profile.uuid;
               utag.data.IBMER_value      = window.digitalData.user.segment.isIBMer;
               utag.data.referrer         = window.digitalData.page.pageInfo.referrer;
               utag.data.referrerID       = window.digitalData.page.pageInfo.referrerID;
               utag.data.referrerDomain   = window.digitalData.page.pageInfo.referrerDomain;
            }
         }
         catch (error) {
            console.error('+++TME-ERROR > digitalanalytics-datalayer.js > update: ' + error);
         }
      },

      /*---------------------------------------------------Init Function for DataLayer---------------------------------------------------------*/
      init : function () {
         try {
            // Tealium UDO
            if (typeof(window.utag_data) == "undefined") {
               window.utag_data = new Object();
            }
            
            window.utag_data = window.utag_data || {};
            // Main digitalData object
            if (typeof(window.digitalData) == "undefined") {
               window.digitalData = new Object();
            }
            window.digitalData = window.digitalData || {};

            // digitalData level 1
            if (typeof(window.digitalData.page) == "undefined") {
               window.digitalData.page = new Object();
            }
            if (typeof(window.digitalData.user) == "undefined") {
               window.digitalData.user = new Object();
            }
            if (typeof(window.digitalData.util) == "undefined") {
               window.digitalData.util = new Object();
            }
            window.digitalData.page = window.digitalData.page || {};
            window.digitalData.user = window.digitalData.user || {};
            window.digitalData.util = window.digitalData.util || {};

            // digitalData level 2
            if (typeof(window.digitalData.page.attributes) == "undefined") {
               window.digitalData.page.attributes = new Object();
            }
            if (typeof(window.digitalData.page.category) == "undefined") {
               window.digitalData.page.category = new Object();
            }
            if (typeof(window.digitalData.page.pageInfo) == "undefined") {
               window.digitalData.page.pageInfo = new Object();
            }
            if (typeof(window.digitalData.page.session) == "undefined") {
               window.digitalData.page.session = new Object();
            }
            if (typeof(window.digitalData.user.profile) == "undefined") {
               window.digitalData.user.profile = new Object();
            }
            if (typeof(window.digitalData.user.segment) == "undefined") {
               window.digitalData.user.segment = new Object();
            }
            if (typeof(window.digitalData.util.cp) == "undefined") {
               window.digitalData.util.cp = new Object();
            }
            if (typeof(window.digitalData.util.meta) == "undefined") {
               window.digitalData.util.meta = new Object();
            }
            if (typeof(window.digitalData.util.qp) == "undefined") {
               window.digitalData.util.qp = new Object();
            }
            if (typeof(window.digitalData.util.referrer) == "undefined") {
               window.digitalData.util.referrer = new Object();
            }
            window.digitalData.page.attributes = window.digitalData.page.attributes || {};
            window.digitalData.page.category   = window.digitalData.page.category || {};
            window.digitalData.page.pageInfo   = window.digitalData.page.pageInfo || {};
            window.digitalData.page.session    = window.digitalData.page.session || {};
            window.digitalData.user.profile    = window.digitalData.user.profile || {};
            window.digitalData.user.segment    = window.digitalData.user.segment || {};
            window.digitalData.util.cp         = window.digitalData.util.cp || {};
            window.digitalData.util.meta       = window.digitalData.util.meta || {};
            window.digitalData.util.qp         = window.digitalData.util.qp || {};
            window.digitalData.util.referrer   = window.digitalData.util.referrer || {};

            // digitalData level 3
            if (typeof(window.digitalData.page.category.ibm) == "undefined") {
               window.digitalData.page.category.ibm = new Object();
            }
            if (typeof(window.digitalData.page.pageInfo.ibm) == "undefined") {
               window.digitalData.page.pageInfo.ibm = new Object();
            }
            if (typeof(window.digitalData.page.pageInfo.coremetrics) == "undefined") {
               window.digitalData.page.pageInfo.coremetrics = new Object();
            }
            if (typeof(window.digitalData.page.pageInfo.tealium) == "undefined") {
               window.digitalData.page.pageInfo.tealium = new Object();
            }
            if (typeof(window.digitalData.page.pageInfo.metrics) == "undefined") {
               window.digitalData.page.pageInfo.metrics = new Object();
            }
            window.digitalData.page.category.ibm         = window.digitalData.page.pageInfo.ibm || {};
            window.digitalData.page.pageInfo.ibm         = window.digitalData.page.pageInfo.ibm || {};
            window.digitalData.page.pageInfo.coremetrics = window.digitalData.page.pageInfo.coremetrics || {};
            window.digitalData.page.pageInfo.tealium     = window.digitalData.page.pageInfo.tealium || {};
            window.digitalData.page.pageInfo.metrics     = window.digitalData.page.pageInfo.metrics || {};

            /*---------------------------------------------------setting page loading time---------------------------------------------------------*/
            this.util.setPageLoadEpoch(0); 
            
            /*---------------------------------------------------Set Cookies---------------------------------------------------------*/
            this.util.readCookies();
            
            /*---------------------------------------------------Set Metadata Elements---------------------------------------------------------*/
            this.util.readMetaData();
            
            /*---------------------------------------------------Set Query String Elements---------------------------------------------------------*/
            this.util.readQueryStrings();

            /*---------------------------------------------------Get referring URL---------------------------------------------------------*/
            this.util.getReferringURL();
            
            /*---------------------------------------------------Set PAGEID/URLID in DDO---------------------------------------------------------------*/
            this.util.setPageID();
                        
            /*---------------------------------------------------Set referral URLID and referral domain in DDO---------------------------------------------------------------*/
            this.util.setReferringURL();
            
            /*---------------------------------------------------Set IBMER value--------------------------------------------------------*/
            this.util.setIBMer();
            
            /*---------------------------------------------------Set IBM ID Profile ID--------------------------------------------------------*/
            this.util.setProfileID();
            
            /*---------------------------------------------------Set Session ID value---------------------------------------------------------*/
            this.util.setSessionID();

            /*---------------------------------------------------Set Site ID---------------------------------------------------------*/
            this.util.setSiteID();
            if (window.digitalData.user.segment.isIBMer) {
               window.digitalData.page.pageInfo.ibm.iniSiteID = window.digitalData.page.pageInfo.ibm.iniSiteID + "_I"
            }

            /*---------------------------------------------------setting Client ID---------------------------------------------------------*/
            this.util.setClientID();

            /*---------------------------------------------------Set Data Layer Ready---------------------------------------------------------*/
            window.digitalData.page.isDataLayerReady = true;

            /*---------------------------------------------------Load Coremetrics Tags by Default---------------------------------------------------------*/
            window.digitalData.page.pageInfo.coremetrics.enabled = "true";

            /*---------------------------------------------------Override---------------------------------------------------------*/
            this.util.override();
            
            /*---------------------------------------------------Set UDO Variables---------------------------------------------------------*/
            utag_data.concat_clientid  = window.digitalData.page.pageInfo.ibm.cmClientID;
            utag_data.site_id          = window.digitalData.page.pageInfo.ibm.siteID;
            utag_data.iniSiteID        = window.digitalData.page.pageInfo.ibm.iniSiteID;
            utag_data.page_id          = window.digitalData.page.pageInfo.pageID;   
            utag_data.urlID            = window.digitalData.page.pageInfo.urlID;
            utag_data.pageProd         = window.digitalData.page.pageInfo.urlID;
            utag_data.page_loadingTime = window.digitalData.page.session.pageloadEpoch;
            utag_data.cookie_sessionID = window.digitalData.page.session.uSessionID;
            utag_data.uPageViewID      = window.digitalData.page.session.uPageViewID;
            utag_data.profileID        = window.digitalData.user.profile.uuid;
            utag_data.IBMER_value      = window.digitalData.user.segment.isIBMer;
            utag_data.referrer         = window.digitalData.page.pageInfo.referrer;
            utag_data.referrerID       = window.digitalData.page.pageInfo.referrerID;
            utag_data.referrerDomain   = window.digitalData.page.pageInfo.referrerDomain;
         }
         catch (error) {
            console.error('+++TME-ERROR > digitalanalytics-datalayer.js > init: ' + error);
         }
      },
};

try {
   window.datalayer.init();
}
catch (error) {
   console.error('+++TME-ERROR > digitalanalytics-datalayer.js: ' + error);
}
