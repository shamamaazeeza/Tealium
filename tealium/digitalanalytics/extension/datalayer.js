/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/datalayer.js
 * Extension Name: datalayer.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * Version       : 2017.02.20.1418
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
         {"pathNameSubstring": "/marketing/iwm/",               "qsParameter" : ["S_PKG","source"]},
         /* Registration Forms - IBMid */
         {"pathNameSubstring": "/account/us-en/signup",         "qsParameter" : ["a","catalogName","partNumber","pkg","quantity","source","trial"]},
         /* Enterprise Search */
         {"pathNameSubstring": "/search/",                      "qsParameter" : ["cc","hpp","lang","o","q"]},
         /* MAM */
         {"pathNameSubstring": "/common/ssi/",                  "qsParameter" : ["docURL","htmlfid","infotype","letternum","MPPEFSCH","subtype","supplier"]},
         /* eSupport */
         {"pathNameSubstring": "/support/docview.wss",          "qsParameter" : ["uid"]},
         {"pathNameSubstring": "/support/fixcentral/",          "qsParameter" : ["product"]},
         /* IBM ID - SSO */
         {"pathNameSubstring": "/account/profile",              "qsParameter" : ["okURL","page"]},
         /* Event Registration */
         {"pathNameSubstring": "/events/wwe/grp",               "qsParameter" : ["OpenForm:cmd","OpenPage:cmd","locale","seminar"]},
         /* Case Studies */
         {"pathNameSubstring": "/software/businesscasestudies", "qsParameter" : ["synkey"]}, 
      ],
         
      DOWNLOADTYPES : "123,avi,bqy,doc,docx,dot,eps,exe,flv,gif,jpg,lwp,mas,mov,mp3,mp4,odp,ods,odt,otp,ots,ott,pdf,png,pot,pps,ppt,pptx,prz,rss,rtf,sh,stc,sti,stw,swf,sxc,sxi,sxw,tar,txt,wav,wma,wmv,xls,xlsx,xml,zip",
      
      DOMAINLIST    : "bluemix.net,cognos.com,ibm.biz,ibm.co,ibm.com,ibmcloud.com,ibmdw.net,jazz.net,lotuslive.com,mybluemix.net,securityintelligence.com,servicemanagementcenter.com,smartercitiescloud.com,softlayer.com,webdialogs.com,xtify.com",
      
      TESTDOMAINS   : "dev.nwtw.ibm.com,testdata.coremetrics.com,localhost,wwwbeta-sso.toronto.ca.ibm.com",
      
      WAITTIME      : 3000,
      
      TOPANCESTORLEVEL : 10,
      
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
            if (typeof(datalayer.isLogEnabled) === "undefined") {
               /* See if either of the dldb or utagdb cookies are set to true, if so enable logging - This is based on Tealium's */
               datalayer.isLogEnabled = ((document.cookie.indexOf('dldb=true') >= 0) ? true : ((document.cookie.indexOf('utagdb=true') >= 0) ? true : false));
            }
            b = {};
            if (typeof(a) === "object" && datalayer.isLogEnabled) {
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
               datalayer.logFile.push(b);
            }
            else {
               b = a
               if (typeof(a) !== "object") {
                  datalayer.logFile.push(b);
               }
            }
            if (datalayer.isLogEnabled) {
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
               datalayer.log('+++DBDM-ERROR > setPageLoadEpoch: ' + error);
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
               datalayer.log('+++DBDM-ERROR > parseQueryString: ' + error);
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
                  parserURL.href = fullURL.replace(/m\.ibm\.com\/https?\//,'').trim().replace(/[/?#&]+$/, "");
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
               datalayer.log('+++DBDM-ERROR > calculateURLID: ' + error);
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
               datalayer.log('+++DBDM-ERROR > readCookies: ' + error);
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
               datalayer.log('+++DBDM-ERROR > readMetaData: ' + error);
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
               datalayer.log('+++DBDM-ERROR > readQueryStrings: ' + error);
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
               datalayer.log('+++DBDM-ERROR > getReferringURL: ' + error);
            }
         },

         /*--------------------Coremetrics Cookie Migration [workaround]--------------------*/
         coremetricsCookieWorkaround: function () {
            try {
               /* This function checks for if the "cmTagQueue" array exists, makes a copy, then re-initializes it.
                * This is to prevent the queue from executing before the cmSetClientID gets called from the tag template.
                * Note: This required a tag template as well.
                */
               if (window.cmTagQueue) {
                  /* Check if "cmTagQueue" exists, if so make a copy */
                  window.cmTagQueue_copy = window.cmTagQueue;
                  /* Re-initialize to an empty array */
                  window.cmTagQueue = [];
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > coremetricsCookieWorkaround: ' + error);
            }
         },

         /*--------------------Add setCookie function--------------------*/
         setCookie : function (name, value) {
            try {
               document.cookie=name + "=" + escape(value) + "; path=/";
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > setCookie: ' + error);
            }
         },        

         /*--------------------Add getCookie function--------------------*/
         getCookie : function (name) {
            try {
               match = document.cookie.match(new RegExp(name + '=([^;]+)'));
               if (match) return match[1];
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > getCookie: ' + error);
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
               datalayer.log('+++DBDM-ERROR > setUserInfo > IBMCore not ready: ' + error);
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
               datalayer.log('+++DBDM-ERROR > setUserInfoV17 > ibmweb not ready: ' + error);
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
               datalayer.log('+++DBDM-ERROR > setCoremetricsEnabled: ' + error);
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
               datalayer.log('+++DBDM-ERROR > setPageID: ' + error);
            }
         },

         /*--------------------Set referral URLID and referral domain in DDO--------------------*/
         setReferringURL : function (rf) {
            try {
               digitalData.page.pageInfo.referrer = rf || digitalData.util.referrer.href;
               if (typeof(digitalData.page.pageInfo.referrer) !== "undefined" && digitalData.page.pageInfo.referrer !== "") {
                  digitalData.page.pageInfo.referrerID = this.calculateURLID(digitalData.page.pageInfo.referrer);
                  /* Get the sub domain or root domain from the referrer hostname */
                  var referrerParts = digitalData.util.referrer.hostname.split('.');
                  if (referrerParts.length < 2) {
                     /* if the hostname has less than 2 parts, then it is valid (localhost) */
                     digitalData.page.pageInfo.referrerDomain = "";
                  }
                  else if (referrerParts.length > 2) {
                     /* if the hostname has three or more parts, then substract one to get the subdomain or root domain */
                     digitalData.page.pageInfo.referrerDomain = referrerParts.splice(-1 * (referrerParts.length - 1), referrerParts.length - 1).join('.');
                  }
                  else {
                     /* if the hostname has only two parts, assume it is the root domain of the site */
                     digitalData.page.pageInfo.referrerDomain = digitalData.util.referrer.hostname;
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > setReferringURL: ' + error);
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
                  /* 
                   * 2017.01.27 - jleon: ASSUME for non-ibm.com domains that all are non-IBMers 
                   * as the cross-domain API is no longer working 
                   */
                  digitalData.user.segment.isIBMer = 0;
                  /* for non ibm.com sites, based on API service executed in ida_stats.js */
                  // digitalData.user.segment.isIBMer = (window.NTPT_IBMer == "true") ? 1 : 0;
                  /* Get IBMISP cookie value for non ibm.com */
                  // if (window.IBMIXS) digitalData.util.cp.IBMIXS = window.IBMIXS; 
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > setIBMer: ' + error);
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
               datalayer.log('+++DBDM-ERROR > setProfileID: ' + error);
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
               datalayer.log('+++DBDM-ERROR > setSessionID: ' + error);
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
               datalayer.log('+++DBDM-ERROR > setSiteID: ' + error);
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
               datalayer.log('+++DBDM-ERROR > setClientID: ' + error);
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

               /* for Marketplace pages add the SiteID to the category */
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

               /* 2017-02-03 - jleon: Saving initial value for Page Category */
               digitalData.page.category.iniPrimaryCategory = IBMPageCategory;

               /* IBMers from ibm.com and non-ibm.com */
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

               /* Set category to error if the siteID is set to error */
               if (typeof(digitalData.page.pageInfo.ibm.siteID) !== "undefined" && digitalData.page.pageInfo.ibm.siteID.toLowerCase() == "error") {
                  IBMPageCategory = "error";
               }

               /* 2016-07-14 - shazeeza: RTC Story# 958212 */
               digitalData.page.category.primaryCategory = IBMPageCategory;
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > setCategoryID: ' + error);
            }
         },

         /*--------------------setting Search Terms from Enterprise Search--------------------*/
         setSearchTerms: function () {
            try {
               if (typeof(digitalData.util.meta["IBM.SearchTerm"]) !== "undefined") {
                  digitalData.page.pageInfo.onsiteSearchTerm = String(digitalData.util.meta["IBM.SearchTerm"]) + "";
               }
               else if (typeof(window.ibmSrchTerm) !== "undefined") {
                  digitalData.page.pageInfo.onsiteSearchTerm = window.ibmSrchTerm;
               }
               else if (document.getElementById('catalog_search_result_information') !== null) {
                  var str = (document.getElementById('catalog_search_result_information').innerHTML).replace(/[""''{}\s]+/g, '').split(',');
                  for (var i = 0; i < str.length; i++) {
                     if (str[i].split(':')[0] == 'searchTerms')
                        digitalData.page.pageInfo.onsiteSearchTerm = str[i].split(':')[1];
                  }
               }

               if (typeof(window.ibmSrchRslts) !== "undefined") {
                  digitalData.page.pageInfo.onsiteSearchResult = window.ibmSrchRslts;
               }
               else if (document.getElementById('catalog_search_result_information') !== null) {
                  var str = (document.getElementById('catalog_search_result_information').innerHTML).replace(/[""''{}\s]+/g, '').split(',');
                  for (var i = 0; i < str.length; i++) {
                     if (str[i].split(':')[0] == 'totalResultCount')
                        digitalData.page.pageInfo.onsiteSearchResult = str[i].split(':')[1];
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > setSearchTerms: ' + error);
            }
         },
         
         /*--------------------setting Page Header--------------------*/
         setPageHeader: function () {
            try {
               if (typeof (document.getElementsByTagName("h1")[0]) != 'undefined') {
                  digitalData.page.pageInfo.pageHeader = (document.getElementsByTagName("h1")[0].innerHTML);
                  digitalData.page.pageInfo.pageHeader = digitalData.page.pageInfo.pageHeader.replace(/(<([^>]+)>)/ig,"");
               }

            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > setPageHeader: ' + error);
            }
         },
         
         /*--------------------Set DDO from Metadata Valuesr--------------------*/
         setDDOFromMetadata: function () {
            try {
               digitalData.page.pageInfo.description   = digitalData.page.pageInfo.description   || digitalData.util.meta["description"];
               digitalData.page.pageInfo.effectiveDate = digitalData.page.pageInfo.effectiveDate || digitalData.util.meta["ibm.effective"];
               digitalData.page.pageInfo.expiryDate    = digitalData.page.pageInfo.expiryDate    || digitalData.util.meta["ibm.expires"];
               digitalData.page.pageInfo.keywords      = digitalData.page.pageInfo.keywords      || digitalData.util.meta["keywords"];
               digitalData.page.pageInfo.language      = digitalData.page.pageInfo.language      || digitalData.util.meta["dc.language"];
               digitalData.page.pageInfo.publishDate   = digitalData.page.pageInfo.publishDate   || digitalData.util.meta["dc.date"];
               digitalData.page.pageInfo.publisher     = digitalData.page.pageInfo.publisher     || digitalData.util.meta["dc.publisher"];
               digitalData.page.pageInfo.rights        = digitalData.page.pageInfo.rights        || digitalData.util.meta["dc.rights"];
               digitalData.page.pageInfo.version       = digitalData.page.pageInfo.version       || digitalData.util.meta["source"];
               digitalData.page.pageInfo.ibm.country   = digitalData.page.pageInfo.ibm.country   || digitalData.util.meta["ibm.country"];
               digitalData.page.pageInfo.ibm.industry  = digitalData.page.pageInfo.ibm.industry  || digitalData.util.meta["ibm.industry"];
               digitalData.page.pageInfo.ibm.owner     = digitalData.page.pageInfo.ibm.owner     || digitalData.util.meta["owner"];
               digitalData.page.pageInfo.ibm.subject   = digitalData.page.pageInfo.ibm.subject   || digitalData.util.meta["dc.subject"];
               digitalData.page.pageInfo.ibm.type      = digitalData.page.pageInfo.ibm.type      || digitalData.util.meta["dc.type"];
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > setDDOFromMetadata: ' + error);
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
               size -= encodeURIComponent(eventName) - eventName.length;
               /* make sure eventName is a String */
               if (typeof(eventName) === "string") {
                  /* replace all consecutive spaces for a dash '-' */
                  eventName = eventName.replace(/\s+/g, '-').toUpperCase();
                  size -= (encodeURIComponent(eventName).length - eventName.length);
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
               datalayer.log('+++DBDM-ERROR > parseEventName: ' + error);
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
                  eventName = eventName.replace(/\s+/g, '-').toUpperCase();
                  size -= (encodeURIComponent(eventName).length - eventName.length);
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
               datalayer.log('+++DBDM-ERROR > parseEventNameGen: ' + error);
            }
         },

         /*--------------------Function to get Demandbase User data from v18--------------------*/
         getDemandbaseUserData: function (wt) {
            try {
               waittime = wt || datalayer.WAITTIME;
               /* Set userInfo from DemandBase */
               if (typeof(IBMCore) !== "undefined") {
                  /* v18+ */
                  try {
                     /* Subscribe to the user IP data ready event and call the callback when it happens,
                      * or if it already happened ".asap" one. */
                     IBMCore.common.util.user.subscribe("userIpDataReady", "customjs", datalayer.util.setUserInfo).runAsap(datalayer.util.setUserInfo);
                  }
                  catch (error) {
                     datalayer.log('+++DBDM-LOG > getDemandbaseUserData > IBMCore not ready: ' + error);
                  }
               }
               else if (typeof(ibmweb) !== "undefined") {
                  /* v17 and older */

                  if (typeof(ibmweb.comusr) !== "undefined" && typeof(ibmweb.comusr.isLoaded) !== "undefined") {
                     /* Set a timeout to kill the listener if it takes too long.
                      * Set this first in case the user info is already ready when you set the listener. */
                     userInfoTimeout = setTimeout(function () {
                           ibmweb.queue.remove(userInfoQueue);
                           datalayer.log('+++DBDM-LOG > getDemandbaseUserData > User Info took too long');
                        }, waittime);

                     /* Set a listener to wait till the user IP data has been loaded, then call your function when it's available. */
                     var userInfoQueue = ibmweb.queue.push(function () {
                           return ibmweb.comusr.isLoaded();
                        }, function () {
                           /* Clear timeout since it returned in time. */
                           clearTimeout(userInfoTimeout);
                           /* Get user info now that it's ready. */
                           datalayer.util.setUserInfoV17();
                        });
                  }
               }
               else {
                  datalayer.log('+++DBDM-LOG > getDemandbaseUserData > User Info not available');
               }

            } 
            catch (error) {
               datalayer.log('+++DBDM-ERROR > getDemandbaseUserData: ' + error);
            }
         },
         /*--------------------Function to send datalayer_ready event ---------------------*/
         sendDatalayerReadyEvent: function (wt) {
            try {
               waittime = wt || datalayer.WAITTIME;

               /* Trigger Event for digitalData Object Ready */
               datalayer.log('+++DBDM-LOG > sendDatalayerReadyEvent > Triggering ddo_ready event!');
               jQuery2(document).trigger('ddo_ready');

               if (typeof(utag2) !== "undefined" && utag2.dleReady) {
                  /* Continue finishing setting up data layer */
                  datalayer.log('+++DBDM-LOG > sendDatalayerReadyEvent > dle_ready event was already triggered!');
                  datalayer.util.finalizeDataLayer();
               }
               else {
                  /* Set a 3s timeout to wait for the dle_ready event */
                  dleTimeout = setTimeout(function () {
                     /* Stop listening for the dle_ready event */
                     if (window.isJQueryOnSupported) {
                        jQuery2(document).off('dle_ready');
                     }
                     /* Continue finishing setting up data layer */
                     datalayer.log('+++DBDM-LOG > sendDatalayerReadyEvent > Timed out waiting for dle_ready event!');
                     datalayer.util.finalizeDataLayer();
                  }, waittime);

                  /* Set Listener for DLE Readiness */
                  if (window.isJQueryOnSupported)
                     jQuery2(document).on('dle_ready', function () {
                        /* Clear timeout since it returned in time. */
                        clearTimeout(dleTimeout);
                        /* Continue finishing setting up data layer */
                        datalayer.log('+++DBDM-LOG > sendDatalayerReadyEvent > dle_ready event captured!');
                        if (typeof(utag2.full_dle_id) !== "undefined") {
                           digitalData.page.pageInfo.dleURL = "https://tags.tiqcdn.com/dle/ibm/web/" + utag2.full_dle_id + ".js";
                           datalayer.log('+++DBDM-LOG > sendDatalayerReadyEvent > DLE File: ' + digitalData.page.pageInfo.dleURL);
                        }
                        datalayer.util.finalizeDataLayer();
                     });
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > sendDatalayerReadyEvent > sendtDatalayerReadyEvent: ' + error);
            }
         },

         /*--------------------Function to wrap Purchase Events  --------------------*/
         maskPurchaseEvent: function (eventAction, args) {
            try {
               if (eventAction === "5" || eventAction === "9") {
                  argsArray = Array.prototype.slice.call(args);
                  if (eventAction === "5") {
                     window["cmCreateShopAction5Tag2"].apply(this, args);
                     var eventInfo = {
                        'type'           : 'purchase-tst',
                        'eventAction'    : eventAction,
                        'productID'      : argsArray[0] || "NOTSET",
                        'productName'    : argsArray[1] || "",
                        'productQuantity': argsArray[2] || "",
                        'productPrice'   : argsArray[3] || "",
                        'productCategory': argsArray[4] || "",
                     }
                     if (typeof(argsArray[5]) !== "undefined") {
                        var attrs = argsArray[5].split("-_-");
                        for (var d = 0; d < attrs.length; d++) {
                           if (attrs[d] !== "") {
                              eventInfo["cm_ShopAction5Tag_s_a" + (d + 1).toString()] = attrs[d];
                           }
                        }
                     }
                  }
                  else {
                     window["cmCreateShopAction9Tag2"].apply(this, args);
                     var eventInfo = {
                        'type'           : 'purchase-tst',
                        'eventAction'    : eventAction,
                        'productID'      : argsArray[0] || "",
                        'productName'    : argsArray[1] || "",
                        'productQuantity': argsArray[2] || "",
                        'productPrice'   : argsArray[3] || "",
                        'registrationID' : argsArray[4] || "",
                        'orderID'        : argsArray[5] || "",
                        'orderSubtotal'  : argsArray[6] || "",
                        'productCategory': argsArray[7] || "",
                     }
                     if (typeof(argsArray[8]) !== "undefined") {
                        var attrs = argsArray[8].split("-_-");
                        for (var d = 0; d < attrs.length; d++) {
                           if (attrs[d] !== "") {
                              eventInfo["cm_ShopAction9Tag_s_a" + (d + 1).toString()] = attrs[d];
                           }
                        }
                     }
                  }
                  datalayer.log('+++DBDM-LOG > maskPurchaseEvent: Purchase event captured - [' + eventAction + ']: \n' + JSON.stringify(eventInfo, null, 2));
                  datalayer.log(args);
                  ibmStats.event(eventInfo);
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > maskPurchaseEvent: ' + error);
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
                  
                  /* Try to grab the text, class and ID of the object clicked upon, if no values, then try from the "A" node */
                  link_text = link_obj.text ? link_obj.text : link_obj.innerText ? link_obj.innerText : '';
                  link_text = encodeURIComponent(link_text);
                  link_text = decodeURIComponent(link_text.replace(/%09|%E2%96%BC/g, ""));
                  link_text = link_text.trim();
                  /* Get the class name for the click */
                  link_class = link_obj.className || "";
                  link_class = link_class.trim();
                  /* Get the ID for the clicked upon element */
                  link_id = link_obj.id || "";
                  
                  /* Now, scan the parents until whether node 'A' or 'BUTTON' are found */
                  link_node = link_obj.nodeName.toLowerCase();
                  if (link_node !== "a" && link_node !== "button") {
                     for (var d = 0; d < datalayer.TOPANCESTORLEVEL; d++) {
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
                           link_text = link_text || (link_obj.text ? link_obj.text : link_obj.innerText ? link_obj.innerText : '') || "";
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
                        link_class = link_class || link_obj.className || "";
                        link_class = link_class.trim();

                        /* Get the ID for the clicked upon element */
                        link_id = link_id || link_obj.id || "";

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
                        datalayer.log('+++DBDM-LOG > pageClickEventHandler: Event captured - eventInfo: \n' + JSON.stringify(eventInfo, null, 2));
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
                           datalayer.log('+++DBDM-LOG > pageClickEventHandler: Triger Conversion event - eventInfoConv: \n' + JSON.stringify(eventInfoConv, null, 2));
                           datalayer.log(event);
                           ibmStats.event(eventInfoConv);
                        }
                     }
                     else {
                        datalayer.log('+++DBDM-LOG > pageClickEventHandler: Event on Masthead or Footer detected, not triggering!');
                        datalayer.log(event);
                     }
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > pageClickEventHandler:: ' + error);
            }
         },
         
         /*--------------------Function to handle the ibmStats.event call --------------------*/
         ibmStatsEventHandler : function (obj) {
            try {
               var data = new Object();
               var modifySiteID = "";

               obj.eventTriggerTime = new Date().getTime();

               datalayer.log('+++DBDM-LOG > ibmStatsEventHandler: Object received: ' + JSON.stringify(obj, null, 2));

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
                  obj.cm_ConversionEventTag_cid = datalayer.util.parseEventNameGen(obj.eventName,256);
               }
               else if (obj.type === "pageclick") {
                  obj.event_name = "ibmStatsEvent_element";
                  obj.cm_ElementTag_eid = datalayer.util.parseEventNameGen(obj.eventName,50);
               }
               else if (obj.type === "product") {
                  obj.event_name = "ibmStatsEvent_product";
               }
               else if (obj.type === "purchase") {
                  obj.event_name = "ibmStatsEvent_purchase";
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
                        dataConversion.cm_ConversionEventTag_cid = datalayer.util.parseEventNameGen(obj.eventName,256);
                        delete dataConversion.cm_ElementTag_eid;
                        dataConversion.eventAction = 1;
                        datalayer.log('+++DBDM-LOG > ibmStatsEventHandler: Event captured - ' + dataConversion.type + ': \n' + JSON.stringify(dataConversion, null, 2));
                        utag.link(dataConversion);                        
                     }
                     else if (data.eventVidTimeStamp.toLowerCase() == "end" || data.eventCategoryGroup.toLowerCase() == "finish") {
                        var dataConversion = JSON.parse(JSON.stringify(data));
                        dataConversion.event_name="ibmStatsEvent_conversion";
                        dataConversion.type = dataConversion.eventType = "conversion"
                        dataConversion.cm_ConversionEventTag_cid = datalayer.util.parseEventNameGen(obj.eventName,256);
                        delete dataConversion.cm_ElementTag_eid;
                        dataConversion.eventAction = 2;
                        datalayer.log('+++DBDM-LOG > ibmStatsEventHandler: Event captured - ' + dataConversion.type + ': \n' + JSON.stringify(dataConversion, null, 2));
                        utag.link(dataConversion);
                     }
                  }
                  datalayer.log('+++DBDM-LOG > ibmStatsEventHandler: Event captured - ' + data.type + ': \n' + JSON.stringify(data, null, 2));
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
                     datalayer.log('+++DBDM-LOG > ibmStatsEventHandler: Event captured - ' + data.type + ': \n' + JSON.stringify(data, null, 2));
                     utag.link(data);
                  }
               }
               /* print out the data layer available for the event */
               datalayer.log(data);
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > ibmStatsEventHandler: ' + error);
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
                     if (typeof(utag) !== "undefined" && window.pageviewSPA) {
                        /* Stop listening for the dle_ready event */
                        jQuery2(document).off('dle_ready');
                        /* Initialize Data Layer */
                        datalayer.log('+++DBDM-LOG > bindPageViewWithAnalytics > Initializing Data Layer.');
                        datalayer.init();
                        /* Set referring URL to current page */
                        datalayer.util.setReferringURL(window.referrerSPA);
                        /* Save the current URL for SPAs */
                        window.referrerSPA = digitalData.page.pageInfo.destinationURL;
                        /* Send jQuery event for ddo_ready */ 
                        datalayer.util.sendDatalayerReadyEvent();
                     }
                     else {
                        /* Do not run pageview twice for SPAs */
                        window.pageviewSPA = true;
                     }
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > ibmStatsEventInit: ' + error);
            }
         },

         /*--------------------Finalize Data Layer Call Back Function --------------------*/
         refreshFromUDO : function (b) {
            try {
               if (typeof(b) !== "undefined" && typeof(utag2) !== "undefined") {
                  /* Site ID values */
                  digitalData.page.pageInfo.ibm.siteID = b["ddo.p.pi.ibm.siteID"] || digitalData.page.pageInfo.ibm.siteID || "IBMTESTWWW";
                  digitalData.page.category.primaryCategory = b["ddo.p.c.primaryCategory"] || digitalData.page.category.primaryCategory || "";
                  /* Global Brand Table values */
                  digitalData.page.category.ibm = digitalData.page.category.ibm || {};
                  digitalData.page.category.ibm.globalBrandTableL10 = b["ddo.p.c.ibm.globalBrandTableL10"] || digitalData.page.category.ibm.globalBrandTableL10 || "";
                  digitalData.page.category.ibm.globalBrandTableL17 = b["ddo.p.c.ibm.globalBrandTableL17"] || digitalData.page.category.ibm.globalBrandTableL17 || "";
                  digitalData.page.category.ibm.globalBrandTableL20 = b["ddo.p.c.ibm.globalBrandTableL20"] || digitalData.page.category.ibm.globalBrandTableL20 || "";
                  digitalData.page.category.ibm.globalBrandTableL30 = b["ddo.p.c.ibm.globalBrandTableL30"] || digitalData.page.category.ibm.globalBrandTableL30 || "";
                  /* Page Services values */
                  digitalData.page.pageInfo.convertro.enabled = b["ddo.p.pi.convertro.enabled"] || digitalData.page.pageInfo.convertro.enabled || "false";
                  digitalData.page.pageInfo.hotjar.enabled = b["ddo.p.pi.hotjar.enabled"] || digitalData.page.pageInfo.hotjar.enabled || "false";
                  digitalData.page.pageInfo.optimizely.enabled = b["ddo.p.pi.optimizely.enabled"] || digitalData.page.pageInfo.optimizely.enabled || "false";
                  digitalData.page.pageInfo.optimizely.projectID = b["ddo.p.pi.optimizely.projectID"] || digitalData.page.pageInfo.optimizely.projectID || "";

               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > refreshFromUDO: ' + error);
            }
         },
         
         /*--------------------Finalize Data Layer Call Back Function --------------------*/
         finalizeDataLayer : function () {
            try {
               if (typeof(utag) !== "undefined" && typeof(utag.data) !== "undefined") {
                  datalayer.log("+++DBDM-LOG > finalizeDataLayer > Tealium Version: [" + utag.data["ut.version"] + "] - Environment: [" + utag.data["ut.env"] + "]");
               }
               if (!digitalData.page.isDataLayerReady) {
                  /* setting Client ID */
                  datalayer.util.setClientID();

                  /* Update Cookies */
                  datalayer.util.readCookies();

                  /* Initialize ibmStats.event */
                  datalayer.log('+++DBDM-LOG > finalizeDataLayer > Defining ibmStats.event()');
                  datalayer.util.ibmStatsEventInit();

                  /* Set Data Layer Ready and trigger Event */
                  digitalData.page.isDataLayerReady = true;

                  if (typeof(jQuery2) !== "undefined") {
                     /* Trigger Event for Data Layer Ready */
                     datalayer.log('+++DBDM-LOG > finalizeDataLayer > Triggering datalayer_ready event!');
                     jQuery2(document).trigger('datalayer_ready');
                  }
                  else {
                     datalayer.log('+++DBDM-LOG > datalayer_ready event was not triggered');
                  }
               }
            }
            catch (error) {
               datalayer.log('+++DBDM-ERROR > finalizeDataLayer: ' + error);
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

            digitalData.page.category.ibm         = digitalData.page.category.ibm || {};
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

            /*--------------------Set DDO from Metadata Valuesr--------------------*/
            this.util.setDDOFromMetadata();

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
               datalayer.log('+++DBDM-LOG > update > IBMCore not ready: ' + error);
            }

            /*--------------------Set Data Layer Ready--------------------*/
            digitalData.page.isDataLayerReady = true;
         }
         catch (error) {
            datalayer.log('+++DBDM-ERROR > update: ' + error);
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

            digitalData.page.category.ibm         = digitalData.page.category.ibm || {};
            digitalData.page.pageInfo.ibm         = digitalData.page.pageInfo.ibm || {};
            digitalData.page.pageInfo.coremetrics = digitalData.page.pageInfo.coremetrics || {};
            digitalData.page.pageInfo.tealium     = digitalData.page.pageInfo.tealium || {};
            digitalData.page.pageInfo.metrics     = digitalData.page.pageInfo.metrics || {};
            digitalData.page.pageInfo.optimizely  = digitalData.page.pageInfo.optimizely || {};
            digitalData.page.pageInfo.hotjar      = digitalData.page.pageInfo.hotjar || {};
            digitalData.page.pageInfo.convertro   = digitalData.page.pageInfo.convertro || {};
            digitalData.page.isDataLayerReady     = false;
            
            /*--------------------setting page loading time--------------------*/
            this.util.setPageLoadEpoch(0); 

            /*--------------------Coremetics Cookie Migration [workaround]--------------------*/
            this.util.coremetricsCookieWorkaround();

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

            /*--------------------Set DDO from Metadata Valuesr--------------------*/
            this.util.setDDOFromMetadata();

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
         }
         catch (error) {
            datalayer.log('+++DBDM-ERROR > init: ' + error);
         }
      },
};