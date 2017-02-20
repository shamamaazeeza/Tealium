/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/datalayer.js
 * Extension Name: datalayer.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * Version       : 2017.01.27.1533
 *
 * This script creates a utility object to manage the datalayer for the Tag Management 
 * solution in IBM.
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */

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
               datalayer.log('+++DBDM-ERROR > datalayer.js > calculateURLID: ' + error);
            }
         },

      },

      /*--------------------Init Function for DataLayer--------------------*/
      init : function () {
         try {
            /* Set up digitalData object */
            window.digitalData = window.digitalData || {};
         }
         catch (error) {
            datalayer.log('+++DBDM-ERROR > datalayer.js > init: ' + error);
         }
      },
};