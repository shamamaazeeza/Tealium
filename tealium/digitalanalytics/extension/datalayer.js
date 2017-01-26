/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/datalayer.js
 * Extension Name: datalayer.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * Version       : 2017.01.26.1027
 *
 * This script creates a utility object to manage the datalayer for the Tag Management 
 * solution in IBM.
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
var tmeid="datalayer.js";

/*--------------------Initialize all Digital Data Objects--------------------*/
var datalayer = {
      PAGEIDQUERYSTRINGSDEFAULT : [
         /* Registration Forms - IWM */
         {"pathNameSubstring": "/marketing/iwm/",               "qsParameter" : ["source","S_PKG"]},
         /* Registration Forms - IBMid */
         {"pathNameSubstring": "/account/us-en/signup",         "qsParameter" : ["a", "trial", "catalogName", "quantity", "partNumber", "source", "pkg"]},
         /* Enterprise Search */
         {"pathNameSubstring": "/search/",                      "qsParameter" : ["q","cc","lang","hpp","o"]},
         /* MAM */
         {"pathNameSubstring": "/common/ssi/",                  "qsParameter" : ["infotype","subtype","htmlfid","letternum","supplier","docURL","MPPEFSCH"]},
         /* eSupport */
         {"pathNameSubstring": "/support/docview.wss",          "qsParameter" : ["uid"]},
         {"pathNameSubstring": "/support/fixcentral/",          "qsParameter" : ["product"]},
         /* IBM ID - SSO */
         {"pathNameSubstring": "/account/profile",              "qsParameter" : ["page", "okURL"]},
         /* Event Registration */
         {"pathNameSubstring": "/events/wwe/grp",               "qsParameter" : ["OpenForm:cmd","OpenPage:cmd","seminar","locale"]},
         /* Case Studies */
         {"pathNameSubstring": "/software/businesscasestudies", "qsParameter" : ["synkey"]}, 
      ],
         
      DOWNLOADTYPES : "123,avi,bqy,doc,docx,dot,eps,exe,flv,gif,jpg,lwp,mas,mov,mp3,mp4,odp,ods,odt,otp,ots,ott,pdf,png,pot,pps,ppt,pptx,prz,rss,rtf,sh,stc,sti,stw,swf,sxc,sxi,sxw,tar,txt,wav,wma,wmv,xls,xlsx,xml,zip",
      
      DOMAINLIST    : "bluemix.net,cognos.com,ibm.biz,ibm.co,ibm.com,ibmcloud.com,ibmdw.net,jazz.net,lotuslive.com,mybluemix.net,securityintelligence.com,servicemanagementcenter.com,smartercitiescloud.com,softlayer.com,webdialogs.com,xtify.com",
      
      TESTDOMAINS   : "dev.nwtw.ibm.com,testdata.coremetrics.com,localhost,wwwbeta-sso.toronto.ca.ibm.com",
      
      UDOTODDOREFRESH : {
         /* List of variables from DLE that need to be updated in DDO */
         "ddo.p.pi.ibm.siteID"            : "digitalData.page.pageInfo.ibm.siteID",
         "ddo.p.c.primaryCategory"        : "digitalData.page.category.primaryCategory",
         "ddo.p.c.ibm.globalBrandTableL10": "digitalData.page.category.ibm.globalBrandTableL10",
         "ddo.p.c.ibm.globalBrandTableL17": "digitalData.page.category.ibm.globalBrandTableL17",
         "ddo.p.c.ibm.globalBrandTableL20": "digitalData.page.category.ibm.globalBrandTableL20",
         "ddo.p.c.ibm.globalBrandTableL30": "digitalData.page.category.ibm.globalBrandTableL30", 
      },
      
      /* To store all messages being sent by the solution */
      logFile       : [],
      
      /*--------------------Centralized log handling: Based on Tealium's --------------------*/
      log : function (a, b) {
         try {
            if (datalayer.isLogEnabled === false) {
               return;
            }
            else if (typeof(datalayer.isLogEnabled) === "undefined") {
               /* See if either of the dldb or utagdb cookies are set to true, if so enable logging - This is based on Tealium's */
               datalayer.isLogEnabled = ((document.cookie.indexOf('dldb=true') >= 0) ? true : ((document.cookie.indexOf('utagdb=true') >= 0) ? true : false));
            }
            if (datalayer.isLogEnabled) {
               b = {};
               if (typeof(a) === "object") {
                  for (c in a) {
                     if (typeof(a[c]) !== "function") {
                        /* Exclude functions */
                        if (a[c]instanceof Array) {
                           b[c] = a[c].slice(0)
                        } 
                        else {
                           b[c] = a[c]
                        }
                     }
                  }
               }
               else {
                  b = a
               }
               datalayer.logFile.push(b);
               try {
                  console.log(b)
               }
               catch (error) {}
            }
         }
         catch (error) {}
      },

      util : {
         /*--------------------Add SHA256 Hash Functions--------------------*/
         /* 2016-08-04 - jleon: RTC Story# 978510 - https://github.com/jbt/js-crypto */
         sha256 : function() {function e(a,b){return a>>>b|a<<32-b}for(var b=1,a,m=[],n=[];18>++b;)for(a=b*b;312>a;a+=b)m[a]=1;b=1;for(a=0;313>b;)m[++b]||(n[a]=Math.pow(b,.5)%1*4294967296|0,m[a++]=Math.pow(b,1/3)%1*4294967296|0);return function(g){for(var l=n.slice(b=0),c=unescape(encodeURI(g)),h=[],d=c.length,k=[],f,p;b<d;)k[b>>2]|=(c.charCodeAt(b)&255)<<8*(3-b++%4);d*=8;k[d>>5]|=128<<24-d%32;k[p=d+64>>5|15]=d;for(b=0;b<p;b+=16){for(c=l.slice(a=0,8);64>a;c[4]+=f)h[a]=16>a?k[a+b]:(e(f=h[a-2],17)^e(f,19)^f>>>10)+(h[a-7]|0)+(e(f=h[a-15],7)^e(f,18)^f>>>3)+(h[a-16]|0),c.unshift((f=(c.pop()+(e(g=c[4],6)^e(g,11)^e(g,25))+((g&c[5]^~g&c[6])+m[a])|0)+(h[a++]|0))+(e(d=c[0],2)^e(d,13)^e(d,22))+(d&c[1]^c[1]&c[2]^c[2]&d));for(a=8;a--;)l[a]=c[a]+l[a]}for(c="";63>a;)c+=(l[++a>>3]>>4*(7-a%8)&15).toString(16);return c}}(),

         /*--------------------Add Page Load Epoch Function--------------------*/
         setPageLoadEpoch : function (reset) {
            try {
               if (reset !== 1) {
                  digitalData.page.session.pageloadEpoch = (typeof(window.loadingTime) !== "undefined") ? window.loadingTime : new Date().getTime();
                  window.loadingTime = digitalData.page.session.pageloadEpoch;
               }
               else {
                  digitalData.page.session.pageloadEpoch = new Date().getTime();
                  window.loadingTime = digitalData.page.session.pageloadEpoch;                  
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setPageLoadEpoch: ' + error);
            }
         },

         /*--------------------Add parseQueryString function--------------------*/
         /* 2016-07-28 - jleon: RTC Story# 978510 */
         parseQueryString : function (fullURL) {
            try {
               var paramsObject = {},
               /* 2017-01-12 - jleon: added condition to detect and exclude anchor (hash) data */
               queryString = fullURL.substring(fullURL.indexOf("?")+1, (fullURL.lastIndexOf("#") !== -1)?fullURL.lastIndexOf("#"):fullURL.length),
               queries, temp, i, l,
               queries = queryString.split("&");
               for (i = 0, l = queries.length; i < l; i++) {
                  temp = queries[i].split('=');
                  paramsObject[temp[0]] = window.decodeURIComponent(temp[1]);
               }
               return(paramsObject);
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > parseQueryString: ' + error);
            }
         },

         /*--------------------Add calculateURLID function--------------------*/
         /* 2016-07-28 - jleon: RTC Story# 978510 (previous RTC Story# 902576) */
         calculateURLID : function (fullURL) {
            try {
               var returnValue = "";
               if (fullURL !== "") {
                  var parserURL = document.createElement('a');
                  /* Get rid of 'm.ibm.com/http/' pattern for mobile, if exists */
                  parserURL.href = fullURL.replace(/m\.ibm\.com\/https?\//,'').trim();
                  /* IE 8 and 9 don't load the attributes "protocol" and "host" in case the source URL
                   * is just a pathname, that is, "/example" and not "http://domain.com/example".
                   */
                  parserURL.href = parserURL.href;
                  var pathName = parserURL.pathname.toLowerCase();
                  if (pathName[0] !== "/") {
                     /* 2016-08-31 - jleon: TIE-163. Missing leading slash in address pathname method for IE */
                     pathName = "/" + pathName;
                  }

                  /* --- START: Patch to define pageidQueryStrings for IWM and Search pages. */
                  /* 2016-09-16 - shruti: Code optimization. Used JSON instead of if-else
                   * process each entry to look for matches based on the default value previously defined
                   */
                  for (var i = 0; i < datalayer.PAGEIDQUERYSTRINGSDEFAULT.length; i++) {
                     var t = datalayer.PAGEIDQUERYSTRINGSDEFAULT[i];               
                     if (pathName.indexOf(t.pathNameSubstring) === 0 && typeof(digitalData.page.attribute.pageidQueryStrings) == "undefined") {               
                        /* Set PageID Query Strings */ 
                        digitalData.page.attribute.pageidQueryStrings = t.qsParameter;
                        break;
                     }
                  }
                  /* --- END: Patch to define pageidQueryStrings for IWM and Search pages. */

                  /* Remove some specified index pages from path name */
                  var lastpart = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
                  /* 2016-07-29 - jleon: RTC Story# XXXXXX - Updating list of omitted default pages */
                  var omittedHTMLVersions = ["index.php","index.phtml", "index.shtml", "index.wss", "index.jsp", "index.jspa", "index.jsa", "index.htm", "index.html"];
                  for (var i = 0; i < omittedHTMLVersions.length; i++) {
                     if (omittedHTMLVersions[i] == lastpart.toLowerCase()) {
                        pathName = pathName.substring(0,pathName.lastIndexOf('/'));
                     }
                  }

                  /* Add different Query string parameters */
                  /* 2016-11-14 - jleon: Adding statement to lowercase query strings and values */
                  var qs = this.parseQueryString(parserURL.href.toLowerCase());
                  if (digitalData.page.attribute.pageidQueryStrings) {
                     var addQSValue = "";
                     for (var k=0; k < digitalData.page.attribute.pageidQueryStrings.length; k++) {
                        var q = digitalData.page.attribute.pageidQueryStrings[k].toLowerCase();
                        /* 2016-11-13 - jleon: Adding logic to identify query string that are commands to the web app. 
                         * This is to support the GRP events URLs
                         */
                        if (q.indexOf(":cmd") !== -1 && qs.hasOwnProperty(q.split(":")[0])) {
                           addQSValue += q.split(":")[0].toLowerCase() + "&";
                        }
                        else if (typeof(qs[q]) !== "undefined") {
                           addQSValue += q + "=" + qs[q] + "&";
                        }
                     }
                     addQSValue = addQSValue.replace(/&$/,"");
                     pathName = (addQSValue !== "") ? (pathName + "?" + addQSValue) : pathName;
                  }

                  /* remove trailing slash, question mark, hash, or spaces (if any) */
                  pathName = pathName.replace(/[/?#&]+$/, "").trim();
                  returnValue = parserURL.hostname + pathName;
               }
               return(returnValue);
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > calculateURLID: ' + error);
            }
         },

         /*--------------------Read Cookies function--------------------*/
         readCookies : function () {
            try {
               /* Ensure the parent objects is present, and initialize the cp object */
               digitalData.util    = digitalData.util || {};
               digitalData.util.cp = {};

               if (window.document.cookie !== "") {
                  var cookies = window.document.cookie.split(";"),
                  name, value;
                  for (var i = 0, len = cookies.length; i < len; i++) {
                     name = cookies[i].substring(0,cookies[i].indexOf('=')).trim();
                     value = cookies[i].substring(cookies[i].indexOf('=')+1);
                     digitalData.util.cp[name] = window.decodeURIComponent(value)
                  }
                  /* Now, itemize each element for the utag_main */
                  if (typeof(digitalData.util.cp.utag_main) !== "undefined") {
                     var temp;
                     cookies = digitalData.util.cp.utag_main.split("$");
                     for (var i = 0, len = cookies.length; i < len; i++) {
                        temp = cookies[i].split(":");
                        digitalData.util.cp["utag_main_" + temp[0]] = temp[1].split(";")[0];
                     }
                  }
                  /* Set value for Coremetrics Cookie ID to Digital Object */
                  if (typeof(digitalData.util.cp.CoreID6) !== "undefined") { 
                     digitalData.page.pageInfo.coremetrics.visitorID = digitalData.util.cp.CoreID6.split("&")[0];
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > readCookies: ' + error);
            }
         },

         /*--------------------Read Metadata Elements Functions--------------------*/
         readMetaData : function () {
            try {
               /* Ensure the parent objects is present, and initialize the meta object */
               digitalData.util    = digitalData.util || {};
               digitalData.util.meta = {};

               var metatags = window.document.getElementsByTagName('meta');
               for (var i = 0, len = metatags.length; i < len; i++) {
                  if (metatags[i].getAttribute("name") !== null) {
                     /* Set metadata element names in lower case */
                     digitalData.util.meta[metatags[i].getAttribute("name").toLowerCase()] = metatags[i].getAttribute("content");
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > readMetaData: ' + error);
            }
         },

         /*--------------------Set Query String Elements--------------------*/
         readQueryStrings : function () {
            try {
               /* Ensure the parent objects is present, and initialize the qp object */
               digitalData.util    = digitalData.util || {};
               digitalData.util.qp = {};

               if (window.location.search !== "") {
                  var queryString = window.location.search.substring(window.location.search.indexOf("?")+1),
                  queries = queryString.split("&"),
                  temp, i, l;
                  for (i = 0, l = queries.length; i < l; i++) {
                     temp = queries[i].split('=');
                     digitalData.util.qp[temp[0]] = window.decodeURIComponent(temp[1]);
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > readQueryStrings: ' + error);
            }
         },

         /*--------------------Get referring URL--------------------*/
         getReferringURL : function () {
            try {
               /* Ensure the parent objects is present, and initialize the referrer object */
               digitalData.util    = digitalData.util || {};
               digitalData.util.referrer = {};

               if (window.document.referrer !== "" ) {
                  /* 2016-09-16 - jleon: BMP-1480 - making sure that the referrer is set, otherwise createElement 
                   * will take by default the current URL
                   */
                  var referrerURL = document.createElement('a');
                  /* Get rid of 'm.ibm.com/http/' pattern for mobile, if exists */
                  referrerURL.href = window.document.referrer.replace(/m\.ibm\.com\/https?\//,'');
                  /* IE 8 and 9 dont load the attributes "protocol" and "host" in case the source URL
                   * is just a pathname, that is, "/example" and not "http://domain.com/example".
                   */
                  referrerURL.href = referrerURL.href;
                  digitalData.util.referrer.hash     = referrerURL.hash;
                  digitalData.util.referrer.host     = referrerURL.host;
                  digitalData.util.referrer.hostname = referrerURL.hostname;
                  digitalData.util.referrer.href     = referrerURL.href;
                  digitalData.util.referrer.origin   = referrerURL.origin;
                  digitalData.util.referrer.pathname = referrerURL.pathname;
                  digitalData.util.referrer.port     = referrerURL.port;
                  digitalData.util.referrer.protocol = referrerURL.protocol;
                  digitalData.util.referrer.search   = referrerURL.search;
               }
               else {
                  digitalData.util.referrer.hash     = "";
                  digitalData.util.referrer.host     = "";
                  digitalData.util.referrer.hostname = "";
                  digitalData.util.referrer.href     = "";
                  digitalData.util.referrer.origin   = "";
                  digitalData.util.referrer.pathname = "";
                  digitalData.util.referrer.port     = "";
                  digitalData.util.referrer.protocol = "";
                  digitalData.util.referrer.search   = "";
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > getReferringURL: ' + error);
            }
         },

         /*--------------------Add setCookie function--------------------*/
         setCookie : function (name, value) {
            try {
               document.cookie=name + "=" + escape(value) + "; path=/";
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setCookie: ' + error);
            }
         },        

         /*--------------------Add getCookie function--------------------*/
         getCookie : function (name) {
            try {
               match = document.cookie.match(new RegExp(name + '=([^;]+)'));
               if (match) return match[1];
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > getCookie: ' + error);
            }
         },        
         
         /*--------------------Set setUserInfo from DemandBase--------------------*/
         setUserInfo : function () {
            try {
               /* Ensure the parent objects is present, and initialize the referrer object */
               digitalData.user = digitalData.user || {};
               digitalData.user.userInfo = IBMCore.common.util.user.getInfo();
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setUserInfo > IBMCore not ready: ' + error);
            }
         },        

         /*--------------------Set setUserInfo from DemandBase for v17--------------------*/
         setUserInfoV17 : function () {
            try {
               /* Ensure the parent objects is present, and initialize the referrer object */
               digitalData.user = digitalData.user || {};
               digitalData.user.userInfo = ibmweb.comusr.getInfo();

               /* Make sure that we set the registry country to the regular country if it is not set */
               digitalData.user.userInfo.registry_country_code = digitalData.user.userInfo.registry_country_code || digitalData.user.userInfo.country;

            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setUserInfoV17 > ibmweb not ready: ' + error);
            }
         },        

         /*--------------------Set Whether Coremetrics should run--------------------*/
         setCoremetricsEnabled : function () {
            try {
               if (typeof(digitalData.page.pageInfo.coremetrics.enabled) === "boolean") {
                  /* boolean value, convert to String */
                  digitalData.page.pageInfo.coremetrics.enabled = digitalData.page.pageInfo.coremetrics.enabled.toString();
               }
               else if (typeof(digitalData.page.pageInfo.coremetrics.enabled) === "string") {
                  /* ensure value is lower case */
                  digitalData.page.pageInfo.coremetrics.enabled = digitalData.page.pageInfo.coremetrics.enabled.toLowerCase();
               }
               else {
                  /* Default value - Load Coremetrics */
                  digitalData.page.pageInfo.coremetrics.enabled = "true";
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setCoremetricsEnabled: ' + error);
            }
         },

         /*--------------------Set PAGEID/URLID in DDO--------------------*/
         setPageID : function () {
            try {
               if (typeof(digitalData.page.pageInfo.urlID) !== "undefined" && typeof(digitalData.page.pageInfo.pageID) !== "undefined" 
                  && digitalData.page.pageInfo.pageID === digitalData.page.pageInfo.urlID) {
                  /* urlID has been previously defined and assigned to pageID, need to undefine pageID to make
                   * sure that it is set properly
                   */
                  digitalData.page.pageInfo.pageID = undefined;
               }
               digitalData.page.pageInfo.urlID = this.calculateURLID(window.location.href);
               if (typeof(digitalData.page.pageID) == "undefined" && typeof(digitalData.page.pageInfo.pageID) == "undefined") {
                  /* If the pageID is not provided by the page, then set it to the calculated value in urlID */
                  digitalData.page.pageInfo.pageID = digitalData.page.pageInfo.urlID;
               } 
               else if (typeof(digitalData.page.pageID) !== "undefined") {
                  /* Support for old DDO definition of the pageID */
                  digitalData.page.pageInfo.pageID = digitalData.page.pageID;
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setPageID: ' + error);
            }
         },

         /*--------------------Set referral URLID and referral domain in DDO--------------------*/
         setReferringURL : function () {
            try {
               digitalData.page.pageInfo.referrer   = digitalData.util.referrer.href;
               digitalData.page.pageInfo.referrerID = this.calculateURLID(digitalData.page.pageInfo.referrer);
               /* Get the sub domain or root domain from the referrer hostname */
               var referrerParts = digitalData.util.referrer.hostname.split('.');
               if (referrerParts.length < 2) {
                  /* if the hostname has less than 2 parts, then it is valid (localhost) */
                  digitalData.page.pageInfo.referrerDomain = "";
               }
               else if (referrerParts.length > 2) {
                  /* if the hostname has three or more parts, then substract one to get the subdomain or root domain */
                  digitalData.page.pageInfo.referrerDomain = referrerParts.splice(-1 * (referrerParts.length - 1),referrerParts.length - 1).join('.');
               }
               else {
                  /* if the hostname has only two parts, assume it is the root domain of the site */
                  digitalData.page.pageInfo.referrerDomain = digitalData.util.referrer.hostname;
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setReferringURL: ' + error);
            }
         },

         /*--------------------setting IBMER value--------------------*/
         setIBMer : function () {
            try {
               if (window.document.domain.indexOf("ibm.com") !== -1) {
                  /* for ibm.com sites */
                  if (String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-[^\=]*|OSCw3Session|IBM_W3SSO_ACCESS)=/)) {
                     if (typeof(digitalData.user.segment.isIBMer) == "undefined" || digitalData.user.segment.isIBMer == null) {
                        digitalData.user.segment.isIBMer = 1
                     }
                  } 
                  else {
                     if (typeof(digitalData.user.segment.isIBMer) == "undefined" || digitalData.user.segment.isIBMer == null) {
                        digitalData.user.segment.isIBMer = 0
                     }
                  }
               }
               else {
                  /* for non ibm.com sites, based on API service executed in ida_stats.js */
                  digitalData.user.segment.isIBMer = (window.NTPT_IBMer == "true") ? 1 : 0;
                  /* Get IBMISP cookie value for non ibm.com */
                  if (window.IBMIXS) digitalData.util.cp.IBMIXS = window.IBMIXS; 
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setIBMer: ' + error);
            }
         },

         /*--------------------setting IBM ID Profile ID--------------------*/
         setProfileID : function () {
            try {
               /* 2016-07-18 - jleon: RTC Story# 967611 */
               if (typeof(digitalData.util.cp.IBMISP) !== "undefined") {
                  /* Second value of the IBMISP is the Profile ID */
                  digitalData.user.profile.uuid = digitalData.util.cp.IBMISP.split('-')[1] || "";
               }
               else if (typeof(digitalData.util.cp.IBMIXS) !== "undefined") {
                  digitalData.user.profile.uuid = digitalData.util.cp.IBMIXS.split('-')[1] || "";
               }
               else {
                  digitalData.user.profile.uuid = "";
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setProfileID: ' + error);
            }
         },

         /*--------------------Set Session ID value--------------------*/
         setSessionID : function () {
            try {
               /* Session ID is based on the Tealium cookie ID and the Tealium session ID */
               digitalData.page.session.uSessionID = digitalData.util.cp["utag_main_v_id"] + "-" + digitalData.util.cp["utag_main_ses_id"];
               /* Unique Pageview ID is based on the unique session ID and the pageload epoch, the value is hashed */
               digitalData.page.session.uPageViewID = this.sha256(digitalData.page.session.uSessionID + '-' + digitalData.page.session.pageloadEpoch);
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setSessionID: ' + error);
            }
         },

         /*--------------------Set Site ID--------------------*/
         setSiteID : function () {
            try {
               if (typeof(digitalData.util.qp.siteID) !== "undefined" && digitalData.util.qp.siteID !== "") {
                  /* Set siteID from query string passed on URL */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.util.qp.siteID;
               }
               else if (typeof(digitalData.page.pageInfo.ibm.siteID) !== "undefined" && digitalData.page.pageInfo.ibm.siteID !== "") {
                  /* set siteID from DDO value */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.page.pageInfo.ibm.siteID;
               }
               else if (typeof(digitalData.util.meta["ibm.wtmsite"]) !== "undefined" && digitalData.util.meta["ibm.wtmsite"] !== "") {
                  /* set siteID based on metadata element IBM.WTMSite */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.util.meta["ibm.wtmsite"];
               }
               else if (typeof(digitalData.util.meta["wtmsite"]) !== "undefined" && digitalData.util.meta["wtmsite"] !== "") {
                  /* set siteID based on metadata element WTMSite */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.util.meta["wtmsite"];
               }
               else if (typeof(digitalData.page.site) !== "undefined" && typeof(digitalData.page.site.siteID) !== "undefined" && digitalData.page.site.siteID !== "") {
                  /* set siteID from OLD DDO format value */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.page.site.siteID;
               }
               else if (window.location.href.toLowerCase().indexOf("www-935.ibm.com/services/") !== -1 && window.location.pathname.toLowerCase().match(/\/gbs\/|\/business-consulting\//)) {
                  /* GBS siteID based on URL patterns */
                  digitalData.page.pageInfo.ibm.siteID = "GBS";
               }
               else if (document.domain.toLowerCase().split('.').splice(-2, 2).join('.') === "softlayer.com") {
                  /* SOFTLAYER siteID based on current URL's domain */
                  digitalData.page.pageInfo.ibm.siteID = 'SOFTLAYER'; 
               }
               else if (window.location.href.toLowerCase().match(/www-935.ibm.com\/industries\/|www-06.ibm.com\/industries\/jp\//)) {
                  /* INDUSTRIES siteID based on URL patterns */
                  digitalData.page.pageInfo.ibm.siteID = "INDUSTRIES";
               }
               else if (typeof(digitalData.page.category.primaryCategory) !== "undefined" && digitalData.page.category.primaryCategory.toLowerCase() == "cuf04") {
                  /* Set siteID based on Category id for OSOL pages */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.page.category.primaryCategory
               }
               else if (typeof(digitalData.page.category.categoryID) !== "undefined" && digitalData.page.category.categoryID.toLowerCase() == "cuf04") {
                  /* Set siteID based on OLD DDO format Category ID for OSOL pages */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.page.category.primaryCategory;
               }
               else if (typeof(digitalData.util.meta["ibm.wtmcategory"]) !== "undefined" && digitalData.util.meta["ibm.wtmcategory"].toLowerCase() == "cuf04") {
                  /* Set siteID based on metadata Category ID for OSOL pages */
                  digitalData.page.pageInfo.ibm.siteID = digitalData.util.meta["ibm.wtmcategory"];
               }
               else if (typeof(digitalData.page.category.primaryCategory) !== "undefined" && digitalData.page.category.primaryCategory.substring(0, 5) == "SOFDC") {
                  /* Set siteID based on Category id for developerWorks */
                  digitalData.page.pageInfo.ibm.siteID = "DEVWRKS"
               }
               else if (typeof(digitalData.page.category.categoryID) !== "undefined" && digitalData.page.category.categoryID.substring(0, 5) == "SOFDC") {
                  /* Set siteID based on OLD DDO format Category ID */
                  digitalData.page.pageInfo.ibm.siteID = "DEVWRKS";
               }
               else if (typeof(digitalData.util.meta["ibm.wtmcategory"]) !== "undefined" && digitalData.util.meta["ibm.wtmcategory"].substring(0, 5) == "SOFDC") {
                  /* 2016-09-21 - matej: Set siteID based on Category metatag for developerWorks */
                  digitalData.page.pageInfo.ibm.siteID = "DEVWRKS";
               }
               else {
                  /* Default: set siteID to IBMTESTWWW as last resort */
                  digitalData.page.pageInfo.ibm.siteID = "IBMTESTWWW";
               }
               /* Saving initial siteID */
               digitalData.page.pageInfo.ibm.iniSiteID = digitalData.page.pageInfo.ibm.siteID;

            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setSiteID: ' + error);
            }
         },

         /*--------------------setting Client ID--------------------*/
         setClientID : function () {
            try {
               /* Check if we have the latest value for siteID */
               if (typeof(utag) !== "undefined" && typeof(utag.data) !== "undefined" && typeof(utag2) !== "undefined") {
                  digitalData.page.pageInfo.ibm.siteID = utag.data[utag2.getShortName("digitalData.page.pageInfo.ibm.siteID")] || digitalData.page.pageInfo.ibm.siteID || "IBMTESTWWW";
               }
               
               /* If the siteID prefix or suffix is "test" or if the full domain of the hostname is in 
                * the TESTDOMAINS array then set Client ID to 80200000 (test instance)
                */
               if (digitalData.page.pageInfo.ibm.siteID.toLowerCase().match(/^test|test$/) || (datalayer.TESTDOMAINS.split(",").indexOf(document.location.hostname.replace(/^[^\.]+./,"")) !== -1)) {
                  digitalData.page.pageInfo.coremetrics.clientID = "80200000|" + digitalData.page.pageInfo.ibm.siteID;
               }
               else {
                  digitalData.page.pageInfo.coremetrics.clientID = "50200000|" + digitalData.page.pageInfo.ibm.siteID;
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setClientID: ' + error);
            }
         },

         /*--------------------setting Category ID--------------------*/
         setCategoryID : function () {
            try {
               window.IBMPageCategory = new String();
               if (typeof(digitalData.page.category.primaryCategory) !== "undefined") {
                  IBMPageCategory = digitalData.page.category.primaryCategory;
               }
               else if (typeof(digitalData.page.category.categoryID) !== "undefined") {
                  /* for old DDO structure */
                  IBMPageCategory = digitalData.page.category.categoryID;
               }
               else {
                  IBMPageCategory = digitalData.util.meta["ibm.wtmcategory"] || "null";
               }
               /* set category ID value from page URL(requested for Watson pages) */
               if (typeof (digitalData.util.qp.Category) !== "undefined") {
                  IBMPageCategory = decodeURIComponent(digitalData.util.qp.Category);
               }

               if (document.domain.indexOf("ibm.com") !== -1 && digitalData.user.segment.isIBMer) {
                  if (digitalData.page.pageInfo.ibm.siteID.substring(0,3) == "EST" || digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "serveng" 
                     || digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "extconnections"  || digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "extconnectionstest") {
                     IBMPageCategory += "IBMER";
                  }
                  else {
                     IBMPageCategory = "IBMER";
                  }
               }
               else if (document.domain.indexOf("ibm.com") == -1 && digitalData.user.segment.isIBMer) {
                  /* for non ibm.com */
                  IBMPageCategory += "IBMER";
               }
               if (typeof(digitalData.page.pageInfo.ibm.siteID) !== "undefined" && digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "error") {
                  IBMPageCategory = "error";
               }
               if (digitalData.page.pageInfo.ibm.siteID.substring(0,4).toLowerCase() == "ecom") {
                  IBMPageCategory = digitalData.page.pageInfo.ibm.siteID + IBMPageCategory;
               }
               /* adding DC.Language value category id for Support Content delivery pages */
               if ((typeof digitalData.page.pageInfo.ibm.siteID !== "undefined") && (digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "estdbl" 
                  || digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "estkcs" || digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "estqst")) {
                  if (digitalData.util.meta["dc.language"] !== null) {
                     IBMPageCategory += "-" + digitalData.util.meta["dc.language"];
                  }
                  else if (digitalData.page.pageInfo.language) {
                     IBMPageCategory += "-" + digitalData.page.pageInfo.language;
                  }
               }
               /* 2016-07-14 - shazeeza: RTC Story# 958212 */
               digitalData.page.category.primaryCategory = IBMPageCategory;
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setCategoryID: ' + error);
            }
         },

         /*--------------------setting Search Terms from Enterprise Search--------------------*/
         setSearchTerms: function () {
            try {
               if (typeof(digitalData.util.meta["IBM.SearchTerm"]) !== "undefined") {
                  digitalData.page.pageInfo.onsiteSearchTerm = String(digitalData.util.meta["IBM.SearchTerm"]) + "";
               } else if (typeof(window.ibmSrchTerm) !== "undefined") {
                  digitalData.page.pageInfo.onsiteSearchTerm = window.ibmSrchTerm;
               } else if (document.getElementById('catalog_search_result_information') !== null) {
                  var str = (document.getElementById('catalog_search_result_information').innerHTML).replace(/[""''{}\s]+/g, '').split(',');
                  for (var i = 0; i < str.length; i++) {
                     if (str[i].split(':')[0] == 'searchTerms')
                        digitalData.page.pageInfo.onsiteSearchTerm = str[i].split(':')[1];
                  }
               }

               if (typeof(window.ibmSrchRslts) !== "undefined") {
                  digitalData.page.pageInfo.onsiteSearchResult = window.ibmSrchRslts;
               } else if (document.getElementById('catalog_search_result_information') !== null) {
                  var str = (document.getElementById('catalog_search_result_information').innerHTML).replace(/[""''{}\s]+/g, '').split(',');
                  for (var i = 0; i < str.length; i++) {
                     if (str[i].split(':')[0] == 'totalResultCount')
                        digitalData.page.pageInfo.onsiteSearchResult = str[i].split(':')[1];
                  }
               }
            } catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setSearchTerms: ' + error);
            }
         },
         
         /*--------------------setting Page Header--------------------*/
         setPageHeader: function () {
            try {
               if (typeof (document.getElementsByTagName("h1")[0]) != 'undefined') {
                  digitalData.page.pageInfo.pageHeader = (document.getElementsByTagName("h1")[0].innerHTML);
                  digitalData.page.pageInfo.pageHeader = digitalData.page.pageInfo.pageHeader.replace(/(<([^>]+)>)/ig,"");
               }

            } catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > setPageHeader: ' + error);
            }
         },

            /*--------------------Parse the event name  --------------------*/
         parseEventName : function (eventName, count) {
            /*
             * eventName contains two parameters separated by a colon: <product_name>:<tactic_code> This function will
             * ensure that the string is not greater than 50 characters, and ensuring that the second parameter is
             * complete
             */ 
            try {
               var size = count || 256;
               /* make sure eventName is a String */
               if (typeof(eventName) === "string") {
                  /* replace all consecutive spaces for a dash '-' */
                  eventName = eventName.replace(/\s+/g, '-').toUpperCase();
                  if (eventName.length > size) {
                     var eventNameParts = eventName.split(':');
                     if (eventNameParts.length === 1)
                        /* eventName only has one element */
                        eventName = eventName.substring(0,size);
                     else
                        eventName = eventName.substring(0,size - (eventNameParts[eventNameParts.length - 1].length - 1)) + ':' + eventNameParts[eventNameParts.length - 1];
                  }
               }
               return(eventName);
            }
            catch (error) {
               datalayer.log('+++TME-ERROR > digitalanalytics-datalayer.js > parseEventName: ' + error);
            }
         },

         /*--------------------Parse the event name  --------------------*/
         parseEventNameGen : function (eventName, count) {
            /*
             * Set eventName to 50 characters and return it uppercased
             */ 
            try {
               var size = count || 256;
               /* make sure eventName is a String */
               if (typeof(eventName) === "string") {
                  /* replace all consecutive spaces to one space */
                  eventName = eventName.replace(/\s+/g, ' ').toUpperCase();
                  /* if eventName is bigger than 50 characters then compress it */
                  if (eventName.length > size) {
                     var ovf = Math.round((eventName.length-size)/2);
                     eventName = eventName.substring(0,(Math.round(eventName.length/2)-ovf)-1) + ".." 
                     + eventName.substring(eventName.length - ((size-(Math.round(eventName.length/2)-ovf)-1)), eventName.length);
                  }
               }
               return(eventName);
            }
            catch (error) {
               datalayer.log('+++TME-ERROR > digitalanalytics-datalayer.js > parseEventNameGen: ' + error);
            }
         },

         /*--------------------Function to handle the ibmStats.event call --------------------*/
         pageClickEventHandler : function (event) {
            try {
               /* Handler for hyperlink and button events */
               var link_obj = {}, link_node = "", link_text = "", link_href = "", 
               link_hrefnq = "", link_hrefdomain = "", link_class = "", link_type = "", 
               eventName = "", eventCategoryGroup = "", link_id = "", nonWhiteSpaceLink = true;

               /* Set the target event to 'link_obj' */
               if (event.target)
                  link_obj = event.target;
               else if (event.srcElement) link_obj = event.srcElement;

               /* if the target node type is a TEXT_NODE then set 'b' to the parent Node of the target */
               if (link_obj.nodeType == 3) link_obj = link_obj.parentNode;

               /* Continue if 'link_obj' is defined */
               if (typeof (link_obj) !== 'undefined') {
                  /* Now, scan the parents until whether node 'A' or 'BUTTON' are found */
                  link_node = link_obj.nodeName.toLowerCase();
                  if (link_node !== "a" && link_node !== "button") {
                     for (var d = 0; d < 5; d++) {
                        if (typeof (link_obj) !== "undefined" && link_obj.parentNode) link_obj = link_obj.parentNode;
                        link_node = (link_obj !== null && link_obj.nodeName) ? link_obj.nodeName.toLowerCase() : "";
                        if (link_node === "a" || link_node === "button") break;
                     }
                  }
                  /* Continue only if node is wither 'A' or 'BUTTON' */
                  if (link_node === "a" || link_node === "button") {
                     /* Make sure that Masthead and Footer links are excluded */
                     var el = link_obj;
                     do {
                        if (el.id == "ibm-masthead" || el.id == "ibm-footer" || el.id == "ibm-footer-module" || el.className == "ibm-mobilemenu" 
                           || el.id == "ibm-common-menu" || el.id == "ibm-social-tools") {
                           nonWhiteSpaceLink = false;
                           break;
                        }
                        el = el.parentElement || el.parentNode;
                     } while ((el !== null) && (el.parentElement || el.parentNode));

                     /* Clicked on non-White-Space Link, continue. */
                     if (nonWhiteSpaceLink) {
                        if (link_node === "a") {
                           /* get the text for the Element 'A' */
                           link_text = link_obj.text ? link_obj.text : link_obj.innerText ? link_obj.innerText : '';
                           /* if the text for the element 'A' remains empty, see if it is an image and get the alink_text text */
                           if ((link_text == "" || /^\s+$/.test(link_text)) && typeof(link_obj.innerHTML) !== "undefined") {
                              link_text = link_obj.innerHTML.toLowerCase();
                              if (link_text.indexOf("<img ") > -1) {
                                 var d = link_text.indexOf('alt="');
                                 if (d > -1) {
                                    link_text = link_text.substring(d + 5, link_text.indexOf('"', d + 5));
                                 } 
                                 else {
                                    d = link_text.indexOf('src="');
                                    if (d > -1) {
                                       link_text = link_text.substring(d + 5, link_text.indexOf('"', d + 5));
                                    }
                                 }
                              }
                           }
                        }
                        else {
                           /* Get the textContent from the Button */
                           link_text = link_obj.textContent ? link_obj.textContent : link_obj.innerText ? link_obj.innerText : '';
                        }
                        /* Encode text for link to exclude tabs and Black Down Pointing Triangle and leading/trailing spaces */
                        link_text = encodeURIComponent(link_text);
                        link_text = decodeURIComponent(link_text.replace(/%09|%E2%96%BC/g, ""));
                        link_text = link_text.trim();

                        /* Get the Target URL for the element */
                        link_href = link_obj.href || link_obj.formAction || "" ; 
                        if (link_href !== "" && !/^javascript:.+$|^IPT:.+$|^ipt:.+$/.test(link_href)) {
                           link_hrefnq = (link_href.split('?'))[0].toLowerCase();
                           /* Get the domain from the target URL */
                           var hrefObj = document.createElement('a');
                           hrefObj.href = link_href;
                           hrefObj.href = hrefObj.href; /* Get around issues with IE */
                           link_hrefdomain = hrefObj.hostname.split('.').splice(-2, 2).join('.');
                           /* Get rid of the protocol for the link_href value */
                           link_href = hrefObj.hostname + (hrefObj.pathname[0]==='/' ? hrefObj.pathname : '/'+hrefObj.pathname) + hrefObj.hash + hrefObj.search
                        }
                        else if (/^javascript:.+$|^IPT:.+$|^ipt:.+$/.test(link_href)) {
                           link_hrefnq = (link_href.split('?'))[0].toLowerCase();
                        }
                        else {
                           link_href = "Blank HREF";
                        }
                        /* Ensure that "-_-" are not present in the URL, due to Coremetrics constrain */
                        if (link_href.indexOf("-_-") !== -1) link_href = link_href.replace(/-_-/g, "---");

                        /* Get the class name for the click */
                        link_class = link_obj.className || "";
                        link_class = link_class.trim();

                        /* Get the ID for the clicked upon element */
                        link_id = link_obj.id || "";

                        /* +++ DOWNLOAD LINK: Determine if the click was done to download a file */
                        var c = datalayer.DOWNLOADTYPES.split(",");
                        for (var d=0; d<c.length; d++) {
                           rexp = new RegExp(c[d].toLowerCase() + '$');
                           if (rexp.test(link_hrefnq)) {
                              /* parse Query Strings */
                              var link_hrefqs = datalayer.util.parseQueryString(link_href);
                              link_type = 'DOWNLOAD LINK';
                              /* For downloads eventName is set to the attachment name from the targetURL or current page */
                              eventName = link_hrefqs.attachment || link_hrefqs.FILE || link_hrefqs.attachmentName || link_hrefqs.htmlfid || digitalData.util.qp.attachment || digitalData.util.qp.FILE || digitalData.util.qp.attachmentName || digitalData.util.qp.htmlfid || link_href;
                              /* set category for LEGACY support of events */
                              eventCategoryGroup = link_text;
                              break;
                           }
                        }

                        /* +++ EXTERNAL LINK: Determine if the click was done on an non-IBM link */
                        if (link_type === "") {
                           if (datalayer.DOMAINLIST.split(",").indexOf(link_hrefdomain) == -1 && !/^javascript:.+$|^Blank HREF$|^IPT:.+$|^ipt:.+$/.test(link_href)) {
                              link_type = 'EXTERNAL LINK';
                              eventName = link_href;
                              /* set category for LEGACY support of events */
                              eventCategoryGroup = link_text;
                           }
                           else {
                              /* +++ PAGE CLICK: if this is not a download or an external link then set it to default */
                              link_type = 'PAGE CLICK';
                              eventName = link_href;
                              /* set category for LEGACY support of events */
                              eventCategoryGroup = link_text;
                           }
                        }

                        /* Trigger the 'pageclick' event as a element event in Coremetrics */            
                        var eventInfo = {
                              'type'               : 'pageclick',
                              'primaryCategory'    : link_type,
                              'eventName'          : eventName,
                              'eventCategoryGroup' : eventCategoryGroup,
                              'targetURL'          : link_href,
                              'targetTitle'        : link_text,
                              'targetClass'        : link_class,
                              'targetID'           : link_id
                        };
                        datalayer.log('+++DBDM-LOG > datalayer.js > pageClickEventHandler: Event captured - eventInfo: \n' + JSON.stringify(eventInfo, null, 2));
                        datalayer.log(event);
                        ibmStats.event(eventInfo);

                        /* Trigger the conversion event for EXTERNAL LINK and DOWNLOAD */
                        if (link_type === "DOWNLOAD LINK" || link_type === "EXTERNAL LINK") {
                           var eventInfoConv = {
                                 'type'               : 'conversion',
                                 'primaryCategory'    : link_type.replace(/\s/,'-'),
                                 'eventName'          : eventName,
                                 'eventCategoryGroup' : eventCategoryGroup,
                                 'targetURL'          : link_href,
                                 'targetTitle'        : link_text,
                                 'eventAction'        : '2',
                                 'targetClass'        : link_class,
                                 'targetID'           : link_id
                           };
                           datalayer.log('+++DBDM-LOG > datalayer.js > pageClickEventHandler: Triger Conversion event - eventInfoConv: \n' + JSON.stringify(eventInfoConv, null, 2));
                           datalayer.log(event);
                           ibmStats.event(eventInfoConv);
                        }
                     }
                     else {
                        datalayer.log('+++DBDM-LOG > datalayer.js > pageClickEventHandler: Event on Masthead or Footer detected, not triggering!');
                        datalayer.log(event);
                     }
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > pageClickEventHandler:: ' + error);
            }
         },
         
         /*--------------------Function to handle the ibmStats.event call --------------------*/
         ibmStatsEventHandler : function (obj) {
            try {
               var data = new Object();
               var modifySiteID = "";

               obj.eventTriggerTime = new Date().getTime();

               datalayer.log('+++DBDM-LOG > datalayer.js > ibmStatsEventHandler: Object received: ' + JSON.stringify(obj, null, 2));

               /* RTC: Story# 958230, Defect# 967620, and Defect# 967890. Adding code snippet in Support of Conversion Events. */
               if (!obj.type) {
                  /* OLD event object definition - set values to new object definition */
                  if (obj.convtype)          {obj.eventAction        = obj.convtype          || ""; delete obj.convtype;}
                  if (obj.ibmEV)             {obj.primaryCategory    = obj.ibmEV             || ""; delete obj.ibmEV;}
                  if (obj.ibmEvAction)       {obj.eventName          = obj.ibmEvAction.toString() || ""; delete obj.ibmEvAction;}
                  if (obj.ibmEvName)         {obj.eventCategoryGroup = obj.ibmEvName.toString()   || ""; delete obj.ibmEvName;}
                  if (obj.point)             {obj.eventPoints        = obj.point             || ""; delete obj.point;}
                  if (obj.ibmEvGroup)        {obj.executionPath      = obj.ibmEvGroup        || ""; delete obj.ibmEvGroup;}
                  if (obj.ibmEvModule)       {obj.eventCallBackCode  = obj.ibmEvModule       || ""; delete obj.ibmEvModule;}
                  if (obj.ibmEvSection)      {obj.execPathReturnCode = obj.ibmEvSection      || ""; delete obj.ibmEvSection;}
                  if (obj.ibmEvTarget)       {obj.targetURL          = obj.ibmEvTarget       || ""; delete obj.ibmEvTarget;}
                  if (obj.ibmEvLinkTitle)    {obj.targetTitle        = obj.ibmEvLinkTitle    || ""; delete obj.ibmEvLinkTitle;}
                  if (obj.ibmEvFileSize)     {obj.targetSize         = obj.ibmEvFileSize     || ""; delete obj.ibmEvFileSize;}
                  if (obj.ibmEvVidStatus)    {obj.eventVidStatus     = obj.ibmEvVidStatus    || ""; delete obj.ibmEvVidStatus;}
                  if (obj.ibmEvVidTimeStamp) {obj.eventVidTimeStamp  = obj.ibmEvVidTimeStamp.toString() || ""; delete obj.ibmEvVidTimeStamp;}
                  if (obj.ibmEvVidLength)    {obj.eventVidLength     = obj.ibmEvVidLength    || ""; delete obj.ibmEvVidLength;}
                  if (obj.proID)             {obj.productID          = obj.proID             || ""; delete obj.proID;}
                  if (obj.proName)           {obj.productName        = obj.proName           || ""; delete obj.proName;}
                  if (obj.cm_vc)             {obj.virtualCategory    = obj.cm_vc             || ""; delete obj.cm_vc;}
                  if (obj.serviceType)       {obj.productServiceType = obj.serviceType       || ""; delete obj.serviceType;}
                  if (obj.proCategory)       {obj.primaryCategory    = obj.proCategory       || ""; delete obj.proCategory;}

                  if (obj.ibmConversion && obj.ibmConversion == "true") {
                     if (!obj.eventPoints && obj.eventAction && obj.eventAction == "1") obj.eventPoints = '10';
                     if (!obj.eventPoints && obj.eventAction && obj.eventAction == "2") obj.eventPoints = '20';
                     obj.type = "conversion";
                  } 
                  else if (obj.ibmProductTag && obj.ibmProductTag == "true") {
                     obj.type = "product";
                  } 
                  else if (obj.primaryCategory.toLowerCase().indexOf("rich_media_service") !== -1 || obj.primaryCategory.toLowerCase().indexOf("video player") !== -1) {
                     obj.type = "video";
                     var ibmEvAction = obj.eventName || "";
                     obj.eventName = obj.eventCategoryGroup || "";
                     obj.eventCategoryGroup = ibmEvAction;
                     obj.eventVidTimeStamp = obj.eventVidTimeStamp || "";
                  } 
                  else {
                     obj.type = "element";
                  }
               }
               
               /* Set name and ID for event */
               if (obj.type === "conversion") {
                  obj.event_name = "ibmStatsEvent_conversion";
                  obj.cm_ConversionEventTag_cid = obj.eventName.toUpperCase();
               }
               else if (obj.type === "pageclick") {
                  obj.event_name = "ibmStatsEvent_element";
                  obj.cm_ElementTag_eid = datalayer.util.parseEventNameGen(obj.eventName,50);
               }
               else if (obj.type === "product") {
                  obj.event_name = "ibmStatsEvent_product";
               }
               else if (obj.type === "video" ) {
                  obj.event_name = "ibmStatsEvent_element";
                  obj.cm_ElementTag_eid = datalayer.util.parseEventNameGen(obj.eventName,50);
               }
               else {
                  obj.event_name = "ibmStatsEvent_element";
                  obj.cm_ElementTag_eid = datalayer.util.parseEventNameGen(obj.eventName,50);
               }
              
               /* Set EventType for Data Layer */
               obj.eventType = obj.type;
               obj.destinationURL = digitalData.page.pageInfo.destinationURL;

               /* Ensure to replace coremetrics attribute separator '-_-' with '---' to avoid shifting */
               var statsObjListString = JSON.stringify(obj).replace(/-_-/g,"---");
               data = JSON.parse(statsObjListString);
 
               if (data.type !== "product") {
                  if (data.type == "video") {
                     /* data.primaryCategory = "VIDEO - " + digitalData.page.pageInfo.ibm.siteID; */
                     if (data.eventVidTimeStamp.toLowerCase() == "start" || data.eventCategoryGroup.toLowerCase() == "start") {
                        var dataConversion = JSON.parse(JSON.stringify(data));
                        dataConversion.event_name="ibmStatsEvent_conversion";
                        dataConversion.type = dataConversion.eventType = "conversion"
                        dataConversion.cm_ConversionEventTag_cid = dataConversion.eventName.toUpperCase();
                        delete dataConversion.cm_ElementTag_eid;
                        dataConversion.eventAction = 1;
                        datalayer.log('+++DBDM-LOG > datalayer.js > ibmStatsEventHandler: Event captured - ' + dataConversion.type + ': \n' + JSON.stringify(dataConversion, null, 2));
                        utag.link(dataConversion);                        
                     }
                     else if (data.eventVidTimeStamp.toLowerCase() == "end" || data.eventCategoryGroup.toLowerCase() == "finish") {
                        var dataConversion = JSON.parse(JSON.stringify(data));
                        dataConversion.event_name="ibmStatsEvent_conversion";
                        dataConversion.type = dataConversion.eventType = "conversion"
                        dataConversion.cm_ConversionEventTag_cid = dataConversion.eventName.toUpperCase();
                        delete dataConversion.cm_ElementTag_eid;
                        dataConversion.eventAction = 2;
                        datalayer.log('+++DBDM-LOG > datalayer.js > ibmStatsEventHandler: Event captured - ' + dataConversion.type + ': \n' + JSON.stringify(dataConversion, null, 2));
                        utag.link(dataConversion);
                     }
                  }
                  datalayer.log('+++DBDM-LOG > datalayer.js > ibmStatsEventHandler: Event captured - ' + data.type + ': \n' + JSON.stringify(data, null, 2));
                  utag.link(data);
               }
               else {
                  /* For checking the Product Id from previous ECOM pages */
                  if (digitalData.page.pageInfo.ibm.iniSiteID.toLowerCase().indexOf("ecom") !== -1 || digitalData.page.pageInfo.ibm.siteID.toLowerCase().indexOf("ecom") !== -1) {
                     var prevProdID = datalayer.util.getCookie("prevProdID");
                     if (prevProdID !== null && typeof(digitalData.product) !== "undefined" && typeof(digitalData.product[0].productInfo.productID) !== "undefined") {
                        if (digitalData.product[0].productInfo.productID == prevProdID) data.event_name = "doNotFire";
                     }
                     datalayer.util.setCookie("prevProdID", obj.productID);
                  }
                  if (data.event_name !== "doNotFire") {
                     datalayer.log('+++DBDM-LOG > datalayer.js > ibmStatsEventHandler: Event captured - ' + data.type + ': \n' + JSON.stringify(data, null, 2));
                     utag.link(data);
                  }
               }
               /* print out the data layer available for the event */
               datalayer.log(data);
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > ibmStatsEventHandler: ' + error);
            }
         },

         /*--------------------Function to handle the ibmStats.event call --------------------*/
         ibmStatsEventInit : function () {
            try {
               window.ibmStats = window.ibmStats || {};

               if (typeof(ibmStats.event) === "undefined" || (typeof(ibmStats.event) === "function" && ibmStats.event.isGhost)) {
                  /*-------------------- ibmStats.event handler--------------------*/
                  ibmStats.event = function (obj) {
                     /* Ensure that the digitalData Object has not been reset by the page */
                     if (typeof(digitalData.page.isDataLayerReady) === "undefined") {
                        datalayer.update();
                        datalayer.log('+++DBDM-WARNING > marketing-events.js: digitalData was reset, recreating datalayer');
                     }
                     datalayer.util.ibmStatsEventHandler(obj);
                  };
               }
               if (typeof(bindPageViewWithAnalytics) === "undefined" || (typeof(bindPageViewWithAnalytics) === "function" && bindPageViewWithAnalytics.isGhost)) {
                  /*-------------------- Ajax function to bind page view tag -----------------------------*/
                  window.bindPageViewWithAnalytics = function() {
                     if(typeof utag !== "undefined") utag.view(utag.data);
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > ibmStatsEventInit: ' + error);
            }
         },

         /*--------------------Finalize Data Layer Call Back Function --------------------*/
         refreshFromUDO : function () {
            try {
               digitalData.page.pageInfo.ibm.siteID = utag.data[utag2.getShortName("digitalData.page.pageInfo.ibm.siteID")] || digitalData.page.pageInfo.ibm.siteID || "IBMTESTWWW";
               digitalData.page.category.primaryCategory = utag.data[utag2.getShortName("digitalData.page.category.primaryCategory")] || digitalData.page.category.primaryCategory || "";
               digitalData.page.category.ibm.globalBrandTableL10 = utag.data[utag2.getShortName("digitalData.page.category.ibm.globalBrandTableL10")] || digitalData.page.category.ibm.globalBrandTableL10 || "";
               digitalData.page.category.ibm.globalBrandTableL17 = utag.data[utag2.getShortName("digitalData.page.category.ibm.globalBrandTableL17")] || digitalData.page.category.ibm.globalBrandTableL17 || "";
               digitalData.page.category.ibm.globalBrandTableL20 = utag.data[utag2.getShortName("digitalData.page.category.ibm.globalBrandTableL20")] || digitalData.page.category.ibm.globalBrandTableL20 || "";
               digitalData.page.category.ibm.globalBrandTableL30 = utag.data[utag2.getShortName("digitalData.page.category.ibm.globalBrandTableL30")] || digitalData.page.category.ibm.globalBrandTableL30 || "";            
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > refreshFromUDO: ' + error);
            }
         },

         /*--------------------Finalize Data Layer Call Back Function --------------------*/
         finalizeDataLayer : function () {
            try {
               if (!digitalData.page.isDataLayerReady) {
                  /* Refresh DDO variabbles from UDO */
                  datalayer.util.refreshFromUDO();

                  /* setting Client ID */
                  datalayer.util.setClientID();

                  /* Set Data Layer Ready and trigger Event */
                  digitalData.page.isDataLayerReady = true;

                  /* Update Cookies */
                  datalayer.util.readCookies();

                  /* Initialize ibmStats.event */
                  datalayer.log('+++DBDM-LOG > datalayer.js > finalizeDataLayer > Defining ibmStats.event()');
                  datalayer.util.ibmStatsEventInit();

                  if (typeof(jQuery) !== "undefined") {
                     /* Trigger Event for Data Layer Ready */
                     datalayer.log('+++DBDM-LOG > datalayer.js > finalizeDataLayer > Triggering datalayer_ready event!');
                     jQuery(document).trigger('datalayer_ready');
                  }
                  else {
                     datalayer.log('+++DBDM-LOG > datalayer.js > datalayer_ready event was not triggered');
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > datalayer.js > finalizeDataLayer: ' + error);
            }
         },
      },

      /*--------------------Init Function for DataLayer--------------------*/
      update : function () {
         try {
            /* Set up digitalData object */
            window.digitalData = window.digitalData || {};

            digitalData.page = digitalData.page || {};
            digitalData.user = digitalData.user || {};
            digitalData.util = digitalData.util || {};

            digitalData.page.attribute  = digitalData.page.attribute || {};
            digitalData.page.category   = digitalData.page.category  || {};
            digitalData.page.pageInfo   = digitalData.page.pageInfo  || {};
            digitalData.page.session    = digitalData.page.session   || {};
            digitalData.user.profile    = digitalData.user.profile   || {};
            digitalData.user.segment    = digitalData.user.segment   || {};
            digitalData.user.userInfo   = digitalData.user.userInfo  || {};
            digitalData.util.cp         = digitalData.util.cp        || {};
            digitalData.util.meta       = digitalData.util.meta      || {};
            digitalData.util.qp         = digitalData.util.qp        || {};
            digitalData.util.referrer   = digitalData.util.referrer  || {};

            digitalData.page.category.ibm         = digitalData.page.pageInfo.ibm || {};
            digitalData.page.pageInfo.ibm         = digitalData.page.pageInfo.ibm || {};
            digitalData.page.pageInfo.coremetrics = digitalData.page.pageInfo.coremetrics || {};
            digitalData.page.pageInfo.tealium     = digitalData.page.pageInfo.tealium || {};
            digitalData.page.pageInfo.metrics     = digitalData.page.pageInfo.metrics || {};

            /*--------------------setting page loading time--------------------*/
            this.util.setPageLoadEpoch(0); 

            /*--------------------Set Cookies--------------------*/
            this.util.readCookies();

            /*--------------------Set Metadata Elements--------------------*/
            this.util.readMetaData();

            /*--------------------Set Query String Elements--------------------*/
            this.util.readQueryStrings();

            /*--------------------Get referring URL--------------------*/
            this.util.getReferringURL();

            /*--------------------Set PAGEID/URLID in DDO--------------------*/
            this.util.setPageID();

            /*--------------------Set referral URLID and referral domain in DDO--------------------*/
            this.util.setReferringURL();

            /*--------------------Set IBMER value--------------------*/
            this.util.setIBMer();

            /*--------------------Set IBM ID Profile ID--------------------*/
            this.util.setProfileID();

            /*--------------------Set Session ID value--------------------*/
            this.util.setSessionID();

            /*--------------------Set Site ID--------------------*/
            this.util.setSiteID();

            /*--------------------setting Client ID--------------------*/
            this.util.setClientID();

            /*--------------------setting Category ID--------------------*/
            this.util.setCategoryID();

            /*--------------------setting Search Terms from Enterprise Search--------------------*/
            this.util.setSearchTerms();

            /*--------------------setting Page Header--------------------*/
            this.util.setPageHeader()

            /*--------------------Set Destination URL--------------------*/
            digitalData.page.pageInfo.destinationURL = window.location.href || "";

            /*--------------------Set Destination URL Domain--------------------*/
            digitalData.page.pageInfo.destinationDomain = document.domain.split('.').splice(-2, 2).join('.') || "";

            /*--------------------Set Page Name--------------------*/
            digitalData.page.pageInfo.pageName = document.title || "";

            /*--------------------Set DLE ID for Page--------------------*/
            digitalData.page.pageInfo.dleID = this.util.sha256(digitalData.page.pageInfo.urlID);

            /*--------------------Load Coremetrics Tags by Default--------------------*/
            this.util.setCoremetricsEnabled();
            digitalData.page.pageInfo.coremetrics.isEluminateLoaded = digitalData.page.pageInfo.coremetrics.isEluminateLoaded || false;

            /*--------------------Set userInfo from DemandBase--------------------*/
            try {
               /* Subscribe to the user IP data ready event and call the callback when it happens, or if 
                * it already happened ".asap" one.
                */
               IBMCore.common.util.user.subscribe("userIpDataReady", "customjs", datalayer.util.setUserInfo).runAsap(datalayer.util.setUserInfo);
            }
            catch (error) {
               datalayer.log('+++DBDM-LOG > datalayer.js > update > IBMCore not ready: ' + error);
            }

            /*--------------------Set Data Layer Ready--------------------*/
            digitalData.page.isDataLayerReady = true;

            /*--------------------Set UDO Variables--------------------*/
            if (typeof(utag) !== "undefined" && typeof(utag.data) !== "undefined") {
               utag.data.category_id      = digitalData.page.category.primaryCategory;
               utag.data.concat_clientid  = digitalData.page.pageInfo.coremetrics.clientID;
               utag_data.cookie_domain    = digitalData.page.pageInfo.destinationDomain;
               utag.data.destinationURL   = digitalData.page.pageInfo.destinationURL;
               utag.data.site_id          = digitalData.page.pageInfo.ibm.siteID;
               utag.data.iniSiteID        = digitalData.page.pageInfo.ibm.iniSiteID;
               utag.data.page_id          = digitalData.page.pageInfo.pageID;   
               utag.data.referrer         = digitalData.page.pageInfo.referrer;
               utag.data.referrerID       = digitalData.page.pageInfo.referrerID;
               utag.data.referrerDomain   = digitalData.page.pageInfo.referrerDomain;
               utag.data.urlID            = digitalData.page.pageInfo.urlID;
               utag.data.pageProd         = digitalData.page.pageInfo.urlID;
               utag.data.page_loadingTime = digitalData.page.session.pageloadEpoch;
               utag.data.cookie_sessionID = digitalData.page.session.uSessionID;
               utag.data.uPageViewID      = digitalData.page.session.uPageViewID;
               utag.data.profileID        = digitalData.user.profile.uuid;
               utag.data.IBMER_value      = digitalData.user.segment.isIBMer;
            }
         }
         catch (error) {
            datalayer.log('+++DBDM-ERROR > datalayer.js > update: ' + error);
         }
      },

      /*--------------------Init Function for DataLayer--------------------*/
      init : function () {
         try {
            /* Set up digitalData object */
            window.digitalData = window.digitalData || {};

            digitalData.page = digitalData.page || {};
            digitalData.user = digitalData.user || {};
            digitalData.util = digitalData.util || {};

            digitalData.page.attribute  = digitalData.page.attribute || {};
            digitalData.page.category   = digitalData.page.category  || {};
            digitalData.page.pageInfo   = digitalData.page.pageInfo  || {};
            digitalData.page.session    = digitalData.page.session   || {};
            digitalData.user.profile    = digitalData.user.profile   || {};
            digitalData.user.segment    = digitalData.user.segment   || {};
            digitalData.user.userInfo   = digitalData.user.userInfo  || {};
            digitalData.util.cp         = digitalData.util.cp        || {};
            digitalData.util.meta       = digitalData.util.meta      || {};
            digitalData.util.qp         = digitalData.util.qp        || {};
            digitalData.util.referrer   = digitalData.util.referrer  || {};

            digitalData.page.category.ibm         = digitalData.page.pageInfo.ibm || {};
            digitalData.page.pageInfo.ibm         = digitalData.page.pageInfo.ibm || {};
            digitalData.page.pageInfo.coremetrics = digitalData.page.pageInfo.coremetrics || {};
            digitalData.page.pageInfo.tealium     = digitalData.page.pageInfo.tealium || {};
            digitalData.page.pageInfo.metrics     = digitalData.page.pageInfo.metrics || {};
            digitalData.page.isDataLayerReady     = false;

            /*--------------------setting page loading time--------------------*/
            this.util.setPageLoadEpoch(0); 

            /*--------------------Set Cookies--------------------*/
            this.util.readCookies();

            /*--------------------Set Metadata Elements--------------------*/
            this.util.readMetaData();

            /*--------------------Set Query String Elements--------------------*/
            this.util.readQueryStrings();

            /*--------------------Get referring URL--------------------*/
            this.util.getReferringURL();

            /*--------------------Set PAGEID/URLID in DDO--------------------*/
            this.util.setPageID();

            /*--------------------Set referral URLID and referral domain in DDO--------------------*/
            this.util.setReferringURL();

            /*--------------------Set IBMER value--------------------*/
            this.util.setIBMer();

            /*--------------------Set IBM ID Profile ID--------------------*/
            this.util.setProfileID();

            /*--------------------Set Session ID value--------------------*/
            this.util.setSessionID();

            /*--------------------Set Site ID--------------------*/
            this.util.setSiteID();

            /*--------------------setting Client ID--------------------*/
            this.util.setClientID();

            /*--------------------setting Category ID--------------------*/
            this.util.setCategoryID();
            
            /*--------------------setting Search Terms from Enterprise Search--------------------*/
            this.util.setSearchTerms();

            /*--------------------setting Page Header--------------------*/
            this.util.setPageHeader()

            /*--------------------Set Destination URL--------------------*/
            digitalData.page.pageInfo.destinationURL = window.location.href || "";

            /*--------------------Set Destination URL Domain--------------------*/
            digitalData.page.pageInfo.destinationDomain = document.domain.split('.').splice(-2, 2).join('.') || "";

            /*--------------------Set Page Name--------------------*/
            digitalData.page.pageInfo.pageName = document.title || "";

            /*--------------------Set DLE ID for Page--------------------*/
            digitalData.page.pageInfo.dleID = this.util.sha256(digitalData.page.pageInfo.urlID);

            /*--------------------Load Coremetrics Tags by Default--------------------*/
            this.util.setCoremetricsEnabled();
            digitalData.page.pageInfo.coremetrics.isEluminateLoaded = false;

            /*--------------------Set UDO Variables--------------------*/
            utag_data.category_id      = digitalData.page.category.primaryCategory;
            utag_data.concat_clientid  = digitalData.page.pageInfo.coremetrics.clientID;
            utag_data.cookie_domain    = digitalData.page.pageInfo.destinationDomain;
            utag_data.destinationURL   = digitalData.page.pageInfo.destinationURL;
            utag_data.site_id          = digitalData.page.pageInfo.ibm.siteID;
            utag_data.iniSiteID        = digitalData.page.pageInfo.ibm.iniSiteID;
            utag_data.page_id          = digitalData.page.pageInfo.pageID;   
            utag_data.referrer         = digitalData.page.pageInfo.referrer;
            utag_data.referrerID       = digitalData.page.pageInfo.referrerID;
            utag_data.referrerDomain   = digitalData.page.pageInfo.referrerDomain;
            utag_data.urlID            = digitalData.page.pageInfo.urlID;
            utag_data.pageProd         = digitalData.page.pageInfo.urlID;
            utag_data.page_loadingTime = digitalData.page.session.pageloadEpoch;
            utag_data.cookie_sessionID = digitalData.page.session.uSessionID;
            utag_data.uPageViewID      = digitalData.page.session.uPageViewID;
            utag_data.profileID        = digitalData.user.profile.uuid;
            utag_data.IBMER_value      = digitalData.user.segment.isIBMer;
         }
         catch (error) {
            datalayer.log('+++DBDM-ERROR > datalayer.js > init: ' + error);
         }
      },
};