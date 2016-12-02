/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/pageclick-events.js
 * Extension Name: pageclick-events.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * Version       : 2016.11.29.2306
 *
 * This script is executed when an page click event is trapped in jQuery
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
var tmeid = "pageclick-events.js";
try {
   /* Set event to 'a' */
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
      /* Now, scan the parents until node 'A' is found */
      link_node = link_obj.nodeName.toLowerCase();
      if (link_node !== "a") {
         for (var d = 0; d < 5; d++) {
            if (typeof (link_obj) !== "undefined" && link_obj.parentNode) link_obj = link_obj.parentNode;
            link_node = (link_obj !== null && link_obj.nodeName) ? link_obj.nodeName.toLowerCase() : "";
            if (link_node === "a") break;
         }
      }
      /* Continue if node 'A' is found */
      if (link_node === "a") {
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
            /* get the text for the Element 'A' */
            link_text = link_obj.text ? link_obj.text : link_obj.innerText ? link_obj.innerText : '';
            /* if the text for the element 'A' remains empty, see if it is an image and get the alink_text text */
            if ((link_text == "" || /^\s+$/.test(link_text)) && typeof(link_obj.innerHTML) !== "undefined") {
               link_text = link_obj.innerHTML.toLowerCase();
               if (link_text.indexOf("<img ") > -1) {
                  var d = link_text.indexOf('alink_text="');
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
            /* Encode text for link to exclude tabs and Black Down Pointing Triangle and leading/trailing spaces */
            link_text = encodeURIComponent(link_text);
            link_text = decodeURIComponent(link_text.replace(/%09|%E2%96%BC/g, ""));
            link_text = link_text.trim();
            
            /* Get the Target URL for the element */
            if (typeof(link_obj.href) !== "undefined" && link_obj.href !== "" && !/^javascript:.+$|^IPT:.+$|^ipt:.+$/.test(link_obj.href)) {
               link_href = link_obj.href;
               link_hrefnq = (link_obj.href.split('?'))[0].toLowerCase();
               /* Get the domain from the target URL */
               var hrefObj = document.createElement('a');
               hrefObj.href = link_href;
               hrefObj.href = hrefObj.href; /* Get around issues with IE */
               link_hrefdomain = hrefObj.hostname.split('.').splice(-2, 2).join('.');
               /* Get rid of the protocol for the link_href value */
               link_href = hrefObj.hostname + (hrefObj.pathname[0]==='/' ? hrefObj.pathname : '/'+hrefObj.pathname) + hrefObj.hash + hrefObj.search
            }
			else if (/^javascript:.+$|^IPT:.+$|^ipt:.+$/.test(link_obj.href)) {
               link_href = link_obj.href;
               link_hrefnq = (link_obj.href.split('?'))[0].toLowerCase();
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
            ibmStats.event(eventInfo);
            datalayer.log('+++DBDM-LOG > pageclick-events.js: Event captured - eventInfo: \n' + JSON.stringify(eventInfo, null, 2));
            datalayer.log(event);

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
               ibmStats.event(eventInfoConv);
               datalayer.log('+++DBDM-LOG > pageclick-events.js: Triger Conversion event - eventInfoConv: \n' + JSON.stringify(eventInfoConv, null, 2));
               datalayer.log(event);
            }
         }
      }
   }
}
catch (error) {
   console.error('+++DBDM-ERROR > pageclick-events.js: ' + error);
}