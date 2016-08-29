/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/digitalanalytics-datalayer.js
 * Extension Name: digitalanalytics-datalayer.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE SVN VERSION IN ECLIPSE
 */
var tmeid="digitalanalytics-datalayer.js";
try {
   /*---------------------------------------------------Initialize all Digital Data Objects---------------------------------------------------------*/
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

   /*---------------------------------------------------Add SHA256 Hash Functions---------------------------------------------------------*/
   // 2016-08-04 - jleon: RTC Story# 978510 - https://github.com/jbt/js-crypto
   if (typeof(window.digitalData.util.sha256) == "undefined") {
      window.digitalData.util.sha256=function(){function e(a,b){return a>>>b|a<<32-b}for(var b=1,a,m=[],n=[];18>++b;)for(a=b*b;312>a;a+=b)m[a]=1;b=1;for(a=0;313>b;)m[++b]||(n[a]=Math.pow(b,.5)%1*4294967296|0,m[a++]=Math.pow(b,1/3)%1*4294967296|0);return function(g){for(var l=n.slice(b=0),c=unescape(encodeURI(g)),h=[],d=c.length,k=[],f,p;b<d;)k[b>>2]|=(c.charCodeAt(b)&255)<<8*(3-b++%4);d*=8;k[d>>5]|=128<<24-d%32;k[p=d+64>>5|15]=d;for(b=0;b<p;b+=16){for(c=l.slice(a=0,8);64>a;c[4]+=f)h[a]=16>a?k[a+b]:(e(f=h[a-2],17)^e(f,19)^f>>>10)+(h[a-7]|0)+(e(f=h[a-15],7)^e(f,18)^f>>>3)+(h[a-16]|0),c.unshift((f=(c.pop()+(e(g=c[4],6)^e(g,11)^e(g,25))+((g&c[5]^~g&c[6])+m[a])|0)+(h[a++]|0))+(e(d=c[0],2)^e(d,13)^e(d,22))+(d&c[1]^c[1]&c[2]^c[2]&d));for(a=8;a--;)l[a]=c[a]+l[a]}for(c="";63>a;)c+=(l[++a>>3]>>4*(7-a%8)&15).toString(16);return c}}(); 
   }

   /*---------------------------------------------------Add parseQueryString function---------------------------------------------------------*/
   // 2016-07-28 - jleon: RTC Story# 978510
   if (typeof(window.digitalData.util.parseQueryString) == "undefined") {
      window.digitalData.util.parseQueryString = function (fullURL) {
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
   }

   /*---------------------------------------------------Add calculateURLID function---------------------------------------------------------*/
   // 2016-07-28 - jleon: RTC Story# 978510 (previous RTC Story# 902576)
   if (typeof(window.digitalData.util.calculateURLID) == "undefined") {
      window.digitalData.util.calculateURLID = function (fullURL) {
         try {
            var parserURL = document.createElement('a');
            // Get rid of 'm.ibm.com/http/' pattern for mobile, if exists
            parserURL.href = fullURL.replace(/m\.ibm\.com\/https?\//,'');
            // IE 8 and 9 dont load the attributes "protocol" and "host" in case the source URL
            // is just a pathname, that is, "/example" and not "http://domain.com/example".
            parserURL.href = parserURL.href;
            var pathName = parserURL.pathname.toLowerCase();

            //--- START: Patch to define pageidQueryStrings for IWM and SSI pages. ##TODELETE## when standard is adopted
            if (pathName.indexOf("/marketing/iwm/") !== -1 && typeof(window.digitalData.page.attributes.pageidQueryStrings) == "undefined") {
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
            var qs = window.digitalData.util.parseQueryString(parserURL.href);
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
            return(parserURL.hostname + pathName);
         }
         catch (error) {
            utag.DB('+++TME-ERROR - digitalanalytics-datalayer.js: ' + error);
         }
      }
   }

   /*---------------------------------------------------setting page loading time---------------------------------------------------------*/
   // window.loadingTime is set in init of ida_stats.js
   window.digitalData.page.session.pageloadEpoch = (typeof(window.loadingTime) != "undefined") ? window.loadingTime : new Date().getTime();

   /*---------------------------------------------------Set Cookies---------------------------------------------------------*/
   if (window.document.cookie !== "") {
      var cookies = window.document.cookie.split(";"),
      name, value, i, l;
      for (i = 0, l = cookies.length; i < l; i++) {
         name = cookies[i].substring(0,cookies[i].indexOf('=')).trim();
         value = cookies[i].substring(cookies[i].indexOf('=')+1);
         window.digitalData.util.cp[name] = window.decodeURIComponent(value)
      }
      // Now, itemize each element for the utag_main
      if (typeof(digitalData.util.cp.utag_main) !== "undefined") {
         var temp;
         cookies = digitalData.util.cp.utag_main.split("$");
         for (i = 0, l = cookies.length; i < l; i++) {
            temp = cookies[i].split(":");
            window.digitalData.util.cp["utag_main_" + temp[0]] = temp[1].split(";")[0];
         }
      }
   }

   /*---------------------------------------------------Set Metadata Elements---------------------------------------------------------*/
   var metatags = window.document.getElementsByTagName('meta');
   for (var i = 0; i < metatags.length; i++) {
      if (metatags[i].getAttribute("name") !== null) {
         // Set metadata element names in lower case
         window.digitalData.util.meta[metatags[i].getAttribute("name").toLowerCase()] = metatags[i].getAttribute("content");
      }
   }

   /*---------------------------------------------------Set Query String Elements---------------------------------------------------------*/
   if (window.location.search !== "") {
      var queryString = window.location.search.substring(window.location.search.indexOf("?")+1),
      queries = queryString.split("&"),
      temp, i, l;
      for (i = 0, l = queries.length; i < l; i++) {
         temp = queries[i].split('=');
         window.digitalData.util.qp[temp[0]] = window.decodeURIComponent(temp[1]);
      }
   }

   /*---------------------------------------------------Set referring URL---------------------------------------------------------*/
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

   /*---------------------------------------------------Set PAGEID/URLID in DDO---------------------------------------------------------------*/
   window.digitalData.page.pageInfo.urlID = window.digitalData.util.calculateURLID(window.location.href);
   if (typeof(window.digitalData.page.pageID) == "undefined" && typeof(window.digitalData.page.pageInfo.pageID) == "undefined") {
      window.digitalData.page.pageInfo.pageID = window.digitalData.page.pageInfo.urlID;
   } 
   else if (typeof(window.digitalData.page.pageID) !== "undefined") {
      window.digitalData.page.pageInfo.pageID = window.digitalData.page.pageID;
   }

   /*---------------------------------------------------Set referral URLID and referral domain in DDO---------------------------------------------------------------*/
   window.digitalData.page.pageInfo.referrer   = window.digitalData.util.referrer.href;
   window.digitalData.page.pageInfo.referrerID = window.digitalData.util.calculateURLID(window.digitalData.util.referrer.href);
   // Get the main domain from the referrer hostname
   window.digitalData.page.pageInfo.referrerDomain = window.digitalData.util.referrer.hostname.split('.').splice(-2,2).join('.');

   /*-------------------------------------------------setting IBMER value--------------------------------------------------------*/
   if (window.document.domain.indexOf("ibm.com") !== -1) {
      //for ibm.com sites
      if (String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-[^\=]*|OSCw3Session|IBM_W3SSO_ACCESS)=/)) {
         if (typeof(window.digitalData.user.segment.isIBMer) == "undefined" || window.digitalData.user.segment.isIBMer == null) {
            window.digitalData.user.segment.isIBMer = 1
         }
      } else {
         if (typeof(window.digitalData.user.segment.isIBMer) == "undefined" || window.digitalData.user.segment.isIBMer == null) {
            window.digitalData.user.segment.isIBMer = 0
         }
      }
   } else {
      // for non ibm.com sites, based on API service executed in ida_stats.js
      window.digitalData.user.segment.isIBMer = (window.NTPT_IBMer == "true") ? 1 : 0;
      // Get IBMISP cookie value for non ibm.com
      if (window.IBMIXS) window.digitalData.util.cp.IBMIXS = window.IBMIXS; 
   }

   /*-------------------------------------------------setting IBM ID Profile ID--------------------------------------------------------*/
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

   /*---------------------------------------------------add Session ID value---------------------------------------------------------*/
   // Session ID is based on the Tealium cookie ID and the Tealium session ID
   window.digitalData.page.session.uSessionID = window.digitalData.util.cp["utag_main_v_id"] + "-" + window.digitalData.util.cp["utag_main_ses_id"];
   // Unique Pageview ID is based on the unique session ID and the pageload epoch, the value is hashed
   if (window.digitalData.util.sha256) {
      window.digitalData.page.session.uPageViewID = window.digitalData.util.sha256(window.digitalData.page.session.uSessionID + '-' + window.digitalData.page.session.pageloadEpoch);
   }
   else {
      window.digitalData.page.session.uPageViewID = window.digitalData.page.session.uSessionID + '-' + window.digitalData.page.session.pageloadEpoch;
   }

   /*---------------------------------------------------setting Site ID---------------------------------------------------------*/
   if (typeof(window.digitalData.util.qp.siteID) !== "undefined") {
      // Set siteID from query string passed on URL
      window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.util.qp.siteID;
   }
   else if (typeof(window.digitalData.page.pageInfo.ibm.siteID) !== "undefined") {
      // set siteID from DDO value
      window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.page.pageInfo.ibm.siteID;
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
   else if (typeof(window.digitalData.page.site) !== "undefined" && typeof(window.digitalData.page.site.siteID) !== "undefined") {
      // set siteID from OLD DDO format value
      window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.page.site.siteID;
   }
   else if (typeof(window.digitalData.page.category.primaryCategory) !== "undefined" && window.digitalData.page.category.primaryCategory.substring(0, 5) == "SOFDC") {
      // Set siteID based on Category id for developerWorks
      window.digitalData.page.pageInfo.ibm.siteID = "DEVWRKS"
   }
   else if (typeof(window.digitalData.page.category.primaryCategory) !== "undefined" && window.digitalData.page.category.primaryCategory.toLowerCase() == "cuf04") {
      // Set siteID based on Category id for OSOL pages
      window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.page.category.primaryCategory
   }
   else if (typeof(window.digitalData.page.category) !== "undefined" && typeof(window.digitalData.page.category.categoryID) !== "undefined" && window.digitalData.page.category.categoryID.substring(0, 5) == "SOFDC") {
      // Set siteID based on OLD DDO format Category ID
      window.digitalData.page.pageInfo.ibm.siteID = "DEVWRKS";
   }
   else if (typeof(window.digitalData.page.category) !== "undefined" && typeof(window.digitalData.page.category.categoryID) !== "undefined" && window.digitalData.page.category.categoryID.toLowerCase() == "cuf04") {
      // Set siteID based on OLD DDO format Category ID for OSOL pages
      window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.page.category.primaryCategory;
   }
   else if (typeof(window.digitalData.util.meta["ibm.wtmsite"]) !== "undefined") {
      // set siteID based on metadata element IBM.WTMSite
      window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.util.meta["ibm.wtmsite"];
   }
   else if (typeof(window.digitalData.util.meta["wtmsite"]) !== "undefined") {
      // set siteID based on metadata element IBM.WTMSite
      window.digitalData.page.pageInfo.ibm.siteID = window.digitalData.util.meta["wtmsite"];
   }
   else {
      // Default: set siteID to IBMTESTWWW as last resort
      window.digitalData.page.pageInfo.ibm.siteID = "IBMTESTWWW";
   }

   /*---------------------------------------------------setting Client ID---------------------------------------------------------*/
   // If the list of test domains is not set, set it to default values
   if (typeof(window.digitalData.util.testDomains) === "undefined" || window.digitalData.util.testDomains === "") {
      window.digitalData.util.testDomains = ["dev.nwtw.ibm.com","testdata.coremetrics.com","localhost","wwwbeta-sso.toronto.ca.ibm.com"];
   }

   // If the siteID prefix or suffix is "test" or if the full domain of the hostname is in the testDomains array then set Client ID to 80200000 (test instance)
   if (window.digitalData.page.pageInfo.ibm.siteID.toLowerCase().match(/^test|test$/) || (window.digitalData.util.testDomains.indexOf(document.location.hostname.replace(/^[^\.]+./,"")) !== -1)) {
      window.digitalData.page.pageInfo.ibm.cmClientID = "80200000|" + window.digitalData.page.pageInfo.ibm.siteID;
   }
   else {
      window.digitalData.page.pageInfo.ibm.cmClientID = "50200000|" + window.digitalData.page.pageInfo.ibm.siteID;
   }

   /*---------------------------------------------------Set UDO Variables---------------------------------------------------------*/
   utag_data.concat_clientid  = window.digitalData.page.pageInfo.ibm.cmClientID;
   utag_data.site_id          = window.digitalData.page.pageInfo.ibm.siteID;
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
   console.error('+++TME-ERROR - digitalanalytics-datalayer.js: ' + error);
}