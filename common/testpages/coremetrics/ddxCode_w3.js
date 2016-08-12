/*  Date        	 Coder             Description
---------------------------------------------------------------------------------------------------------
    June 11 2014     Sudeshna Pal      Merged the Global Code & Generate Marketing Attribute snippet
    June 26 2014     Sudeshna Pal      Rename the function "buildPageView"
    July 1  2014     Sudeshna Pal      Add NIODID cookie value
    July 9  2014     Matej Zorkoci     Switch vendor and placement, remove vendor translation
    July 14 2014     Sudeshna Pal      Update DDO Structure 
    July 23 2014     Sudeshna Pal      Update Marketing attributes
    Oct  29 2014     Sudeshna Pal      Add HKEY attribute 
    Nov  28 2014     Sudeshna Pal      Add page start time attribute
    Jan  19 2015     Sudeshna Pal      Add custom attributes for contact360
    Mar  10 2015     Sudeshna Pal      Add custom attributes for W3 SSI
    Mar  11 2015    Sudeshna Pal      Add custom attributes for W3 Search
    Apr  15 2015     Sudeshna Pal      Add custom attributes for wwprt
	May  4  2015     Sudeshna Pal      Add custom attributes for Human Resource
	May  20  2015    Sudeshna Pal      Add custom attributes for Practitioner Portal
	May  25  2015    Sudeshna Pal      Set site id to HR for some HR pages
Nov 11 2015 Matej Zorkoci Added the sales one oid parameter
*/
//instanciate here for proper scoping
window.pageViewAttributes = new String();
window.IBMPageCategory = new String();
window.attribs = new Array();
function generatePageAndMarketingView() {
        	//initialize window.digitalDataobjects if needed 
        	if (typeof (window.digitalData) == "undefined") {
        		window.digitalData = new Object();
        	}
			//initialize window.digitalData.page if needed 
        	if (typeof (window.digitalData.page) == "undefined") {
        		window.digitalData.page = new Object();
        	}
        	//initialize window.digitalData.page.category if needed 
        	if (typeof (window.digitalData.page.category) == "undefined") {
                window.digitalData.page.category = new Object();
            }
            //initialize window.digitalData.page.pageInfo if needed 
            if (typeof (window.digitalData.page.pageInfo) == "undefined") {
                window.digitalData.page.pageInfo = new Object();
            }
            //initialize window.digitalData.page.pageInfo.ibm if needed 
            if (typeof (window.digitalData.page.pageInfo.ibm) == "undefined") {
                window.digitalData.page.pageInfo.ibm = new Object();
            }
            //initialize window.digitalData.page.onsiteSearchTerm if needed 
            if (typeof (window.digitalData.page.pageInfo.onsiteSearchTerm) == "undefined") {
                //window.digitalData.page.onsiteSearchTerm= null;
                if (findMeta("IBM.SearchTerm")) {
                    window.digitalData.page.pageInfo.onsiteSearchTerm = findMeta("IBM.SearchTerm") + "";
                } else if (window.ibmSrchTerm != "undefined") {
                    window.digitalData.page.pageInfo.onsiteSearchTerm = window.ibmSrchTerm;
                }
            }
            //initialize window.digitalData.page.onsiteSearchResult if needed 
            if (typeof (window.digitalData.page.pageInfo.onsiteSearchResult) == "undefined") {
                //window.digitalData.page.onsiteSearchResult= null;
                if (window.ibmSrchRslts != "undefined") {
                    window.digitalData.page.pageInfo.onsiteSearchResult = window.ibmSrchRslts;
                }
            }
            //set page id
            if (typeof(window.digitalData.page.pageID)=="undefined" && typeof (window.digitalData.page.pageInfo.pageID) == "undefined") {
                var pathName = location.pathname;
                //remove some specified html versions from path name
                var lastpart = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
                var omittedHTMLVersions = ["index.php","index.phtml", "index.shtml", "index.wss", "index.jsp", "index.jspa", "index.htm", "index.html", "index"];
                for (var i = 0; i < omittedHTMLVersions.length; i++) {
                    if (omittedHTMLVersions[i] == lastpart.toLowerCase()) {
                        pathName = pathName.replace(lastpart, "");
                    }
                }
                //remove trailing slash, question mark, or hash(if any)
                pathName = pathName.replace(/[(\/)(?)(#)]+$/, "");
                if(window.digitalData.page.pageInfo){
                	window.digitalData.page.pageInfo.pageID = location.host + pathName;
                }
            }
            //build page category
            if (digitalData.page.category.primaryCategory) {
                window.IBMPageCategory = digitalData.page.category.primaryCategory;
            } else if (digitalData.page.category.categoryID){//for old DDO structure
            	window.IBMPageCategory = digitalData.page.category.categoryID;
            }else {
                window.IBMPageCategory = findMeta("IBM.WTMCategory") + "";
            };
            //make a home for the Explore attribute values
            if (readCookie("w3ibmProfile")) {//HKEY value
            	  attribs[0] = readCookie("w3ibmProfile").split("|")[0];
            } else if(typeof(window.gppWebMetrics) !== "undefined" && typeof(window.gppWebMetrics._hkey_value) !== "undefined") {//for Practitioner Portal mobile pages
            	attribs[0] = window.gppWebMetrics._hkey_value;
            }
            //look for attributes in digitalData.page.attributes and load in to the attribs array if present, if not, look in meta tags for value
            if (digitalData.page.pageInfo.ibm.country) {
                attribs[1] = digitalData.page.pageInfo.ibm.country;
            } else {
                digitalData.page.pageInfo.ibm.country = attribs[1] = findMeta("IBM.Country") + "";
            } 
			if (digitalData.page.pageInfo.language) {
                attribs[2] = digitalData.page.pageInfo.language;
            } else {
                digitalData.page.pageInfo.language = attribs[2] = findMeta("DC.Language") + "";
            }
			if (digitalData.page.pageInfo.effectiveDate) {
                attribs[3] = digitalData.page.pageInfo.effectiveDate;
            } else {
                digitalData.page.pageInfo.effectiveDate = attribs[3] = findMeta("IBM.Effective") + "";
            }
			if (digitalData.page.pageInfo.ibm.subject) {
                attribs[4] = digitalData.page.pageInfo.ibm.subject;
            } else {
                digitalData.page.pageInfo.ibm.subject = attribs[4] = findMeta("DC.Subject") + "";
            }
			if (digitalData.page.pageInfo.ibm.type) {
                attribs[5] = digitalData.page.pageInfo.ibm.type;
            } else {
                digitalData.page.pageInfo.ibm.type = attribs[5] = findMeta("DC.Type") + "";
            }
			if (digitalData.page.pageInfo.version) {
                attribs[6] = digitalData.page.pageInfo.version;
            } else {
                digitalData.page.pageInfo.version = attribs[6] = findMeta("Source") + "";
            }
            if (digitalData.page.pageInfo.ibm.owner) {
                attribs[7] = digitalData.page.pageInfo.ibm.owner;
            } else {
                digitalData.page.pageInfo.ibm.owner = attribs[7] = findMeta("Owner") + "";
            }
			if (digitalData.page.pageInfo.ibm.description) {
                attribs[8] = digitalData.page.pageInfo.ibm.description;
            } else {
                digitalData.page.pageInfo.ibm.description = attribs[8] = findMeta("Description") + "";
            }
			if (digitalData.page.pageInfo.pageName) {
                attribs[9] = digitalData.page.pageInfo.pageName;
            } else {
                digitalData.page.pageInfo.pageName = attribs[9] = document.title;
            }
			if (digitalData.page.pageInfo.ibm.industry) {
                attribs[10] = digitalData.page.pageInfo.ibm.industry;
            } else {
                digitalData.page.pageInfo.ibm.industry = attribs[10] = findMeta("IBM.Industry") + "";
            }
			if (digitalData.page.pageInfo.ibm.specialPurpose) {
                attribs[11] = digitalData.page.pageInfo.ibm.specialPurpose;
            } else {
                digitalData.page.pageInfo.ibm.specialPurpose = attribs[11] = findMeta("IBM.SpecialPurpose") + "";
            }; 
			if (digitalData.page.pageInfo.ibm.keywords) {
                attribs[12] = digitalData.page.pageInfo.ibm.keywords;
            } else {
                digitalData.page.pageInfo.ibm.keywords = attribs[12] = findMeta("Keywords") + "";
            }; 
			if (digitalData.page.pageInfo.publishDate) {
                attribs[13] = digitalData.page.pageInfo.publishDate;
            } else {
                digitalData.page.pageInfo.publishDate = attribs[13] = findMeta("DC.Date") + "";
            }; 
			if (digitalData.page.pageInfo.expiryDate) {
                attribs[14] = digitalData.page.pageInfo.expiryDate;
            } else {
                digitalData.page.pageInfo.expiryDate = attribs[14] = findMeta("IBM.Expires") + "";
            };
            if (readCookie("IBMISP")) {
                attribs[15] = readCookie("IBMISP");
            };
           /* if (readCookie("UnicaNIODID")) {
                attribs[16] = readCookie("UnicaNIODID");
            }*/
            if (typeof (window.unicaParams) == "undefined") window.unicaParams = {};
            fetchQuerystring(unicaParams);
            if(typeof (unicaParams['lnk']) != "undefined") attribs[16] = unicaParams['lnk'];
            var currentdate = new Date();
			   attribs[17] = (typeof (window.loadingTime) != "undefined") ? window.loadingTime : currentdate.getTime();
			//newly added attributes starts
			if (digitalData.page.pageInfo.publisher) {
                attribs[18] = digitalData.page.pageInfo.publisher;
            } else {
                digitalData.page.pageInfo.publisher = attribs[18] = findMeta("DC.Publisher") + "";
            }; 
            if(typeof (document.getElementsByTagName("h1")[0]) != 'undefined'){
				attribs[19] = document.getElementsByTagName("h1")[0].innerHTML;
            }
			   /*if (digitalData.page.pageInfo.ibm.contentProducer) {
                attribs[19] = digitalData.page.pageInfo.ibm.contentProducer;
            }
            if (digitalData.page.pageInfo.ibm.contentDelivery) {
                attribs[20] = digitalData.page.pageInfo.ibm.contentDelivery;
            }*/
            //set site id to "HR" for some Human Resource pages
            var urlList=['dlapp03.atlanta.ibm.com/qpg/university.nsf/',
                         'events.atlanta.ibm.com/ems/global/events.nsf/',
                         'ilx.atlanta.ibm.com/i_dir/ilxdashboard.nsf/',
                         'learn.atlanta.ibm.com/mdc/',
                         'learn.atlanta.ibm.com/toolbar/',
                         'lt.be.ibm.com/services/weblectures/',
                         'mentoring.atlanta.ibm.com',
                         'succeeding.atlanta.ibm.com',
                         'think.atlanta.ibm.com',
                         'tle.atlanta.ibm.com/events/',
                         'university.atlanta.ibm.com/',
                         'w3-01.sso.ibm.com/hr/',
                         'w3-03.sso.ibm.com/services/competencies',
                         'w3-151.ibm.com/learning/lms/saba/'
                      ]
              for(var i=0;i<urlList.length;i++){
            	  if(window.location.href.indexOf(urlList[i]) !== -1){
            		  window.cm_ClientID = window.cm_ClientID.replace(window.cm_ClientID.substring(window.cm_ClientID.indexOf("|") + 1),"HR");   
            		  break;
                  }    		  
            }
            var siteId = '',
            	customAttribute = false;
            if (typeof (window.cm_ClientID) != "undefined") siteId = window.cm_ClientID.substring(window.cm_ClientID.indexOf("|") + 1);
            includeCustomAttributes(siteId);
            //optional attributes
            if(customAttribute == false){
	            if (typeof (attribs[20]) == "undefined" && digitalData.page.pageInfo.version) {
		        	attribs[20] = digitalData.page.pageInfo.version;
		    	}
	            if (typeof (attribs[21]) == "undefined" && digitalData.page.pageInfo.ibm.contentProducer) {
		        	attribs[21] = digitalData.page.pageInfo.ibm.contentProducer;
		    	}
		    	if (typeof (attribs[22]) == "undefined" && digitalData.page.pageInfo.ibm.contentDelivery) {
		        	attribs[22] = digitalData.page.pageInfo.ibm.contentDelivery;
		    	}
		    	if(typeof (unicaParams['lm']) != "undefined") attribs[23] = unicaParams['lm'];
            	if(typeof (unicaParams['lsr']) != "undefined") attribs[24] = unicaParams['lsr'];
            	if(typeof (unicaParams['lot']) != "undefined") attribs[25] = unicaParams['lot'];
            	if(typeof (unicaParams['lsot']) != "undefined") attribs[26] = unicaParams['lsot'];
            	if(typeof (unicaParams['lpg']) != "undefined") attribs[27] = unicaParams['lpg'];
            }
            //json now is as complete as possible
            //pageId and page category are now set.  now look in json to build explore attributes for page view
            //build an array of attributes
            //now find the ones to use in the pageview
			   for (i = 0; i < attribs.length; i++) {
                pageViewAttributes += attribs[i] + "-_-";
            }
            //So, for the pageview, we have built out window.digitalData.page.pageID, IBMPageCategory and pageViewAttributes. When DDX understands object literals we will get everything from  digitalData
            //return pageViewAttributes,IBMPageCategory;
            //for generating marketing attributes
            if (typeof (window.digitalData) != "undefined") {
                if (typeof (window.params) == "undefined") window.params = {};
                var queryString = window.location.href.substring(window.location.href.indexOf("?") + 1),
                    queries, temp, i, l, queries = queryString.split("&");
                for (i = 0, l = queries.length; i < l; i++) {
                    temp = queries[i].split('=');
                    window.params[temp[0].toLowerCase()] = temp[1];
                }
                var marketingAttributes = "",
                    vendor = "NA",
                    category = "NA",
                    placement = "NA",
                    item = "NA",
                    ddoPageId = (typeof (digitalData.page.pageInfo.pageID) != "undefined") ? digitalData.page.pageInfo.pageID : digitalData.page.pageID;
                //-----------remove unfriendly URL issue for ODW starts--------------------------------------------------
                if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "odw" || siteId.toLowerCase() == "w3odw")){
                	if(ddoPageId.indexOf('!ut') !== -1) ddoPageId = ddoPageId.substring(0,ddoPageId.indexOf("!ut"));
                	ddoPageId = ddoPageId.replace(/[(\/)(?)(#)]+$/, "");
                }
                //-----------remove unfriendly URL issue for ODW ends--------------------------------------------------
                //look for attributes in params object and load in to the marketing attribs array if present
                var marketingAttrArray = ['i_cmp','i_ct','i_cr','','i_csr','i_co','i_ck','i_ckid','i_cs','i_ccy',
                                          'i_cot','i_csot','i_cd','i_cpg','i_cpb','i_cn','i_csz','i_ce'];
                var marketingAttributes = "";
                for(var i = 1; i <= marketingAttrArray.length; i++){
                	if(i == 4){
                		//Create translation for ITEM values based on CM values
                           if (typeof window.params.cm_mmca4 == "undefined" && typeof(window.params.i_cm)!="undefined"){
          					 var param_cm=window.params.i_cm;
        					 if(window.params.i_cm.toLowerCase() == "k") 
        						 param_cm = "Paid Search";
        					 else if (window.params.i_cm.toLowerCase() == "h")
        						 param_cm = "Social";
        					 else if (window.params.i_cm.toLowerCase() == "l")
        						 param_cm = "Paid Social";
        					 else if (window.params.i_cm.toLowerCase() == "m")
        						 param_cm = "Email";
        					  else if (window.params.i_cm.toLowerCase() == "b")
        						 param_cm = "Banner Ads";
        					  marketingAttributes=marketingAttributes+"cm_mmca4="+param_cm+"&";
        					  item=param_cm;
        				}
                	}else{
	                	var m = "cm_mmca"+i,
	                		x = loadMarketingAttribute(i,m,marketingAttrArray[i-1]);
	                	if(x !== null) marketingAttributes = marketingAttributes + "cm_mmca"+i+"=" + x + "&";
	                	if(x !== null && i == 1) placement = x;
	                	if(x !== null && i == 2) category = x;
	                	if(x !== null && i == 3) vendor = x;
                	}
                }
                if (typeof (window.params.cm_mmc) != "undefined") {
                    marketingAttributes = "&" + marketingAttributes;
                } else if (marketingAttributes.length > 0) {
                    marketingAttributes = "&cm_mmc=" + vendor + "-_-" + category + "-_-" + placement + "-_-" + item + "&" + marketingAttributes;
                }
                if (marketingAttributes.lastIndexOf("&") == marketingAttributes.length - 1) {
                    marketingAttributes = marketingAttributes.substring(0, marketingAttributes.length - 1);
                }
                window.pageViewAttributes = window.pageViewAttributes.replace(/%/g,"Percent");
                window.pageViewAttributes = decodeURIComponent(window.pageViewAttributes);
                if (typeof (digitalData.page.pageInfo.onsiteSearchTerm) == "undefined" || typeof (digitalData.page.pageInfo.onsiteSearchResult) == "undefined") {
                    cmCreateManualPageviewTag(ddoPageId, window.IBMPageCategory, document.URL + marketingAttributes, document.referrer, window.pageViewAttributes);
                } else {
                    cmCreateManualPageviewTag(ddoPageId, window.IBMPageCategory, document.URL + marketingAttributes, document.referrer, window.pageViewAttributes, digitalData.page.pageInfo.onsiteSearchTerm, digitalData.page.pageInfo.onsiteSearchResult);
                }
            }
}
function readCookie(n) {
	return (n = new RegExp('(?:^|;\\s*)' + ('' + n).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && n[1];
}
function includeCustomAttributes(siteId){
	customAttribute = true;
	//for test environment
	if(siteId.substring(0,4).toLowerCase() == "test" && siteId.substring(siteId.length-4,siteId.length).toLowerCase() == "test") siteId = siteId.substring(4,siteId.length-4);
	else if(siteId.substring(0,4).toLowerCase() == "test") siteId = siteId.substring(4,siteId.length);
	else if (siteId.substring(siteId.length-4,siteId.length).toLowerCase() == "test") siteId = siteId.substring(0,siteId.length-4);
	//----------add page view attributes for Contact 360 starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "contact360")){
    	if (typeof (window.contact360Params) == "undefined") window.contact360Params = {};
    	fetchQuerystring(contact360Params);
    	if (digitalData.page.pageInfo.ibm.seqId){
    		attribs[20] = digitalData.page.pageInfo.ibm.seqId;
    	}else{
    		addAttributes(contact360Params,20,'param.seq_id');
    	}
    	if (digitalData.page.pageInfo.ibm.individualId){
    		attribs[21] = digitalData.page.pageInfo.ibm.individualId;
    	}else{
    		addAttributes(contact360Params,21,'param.individual_id');
    	}
    	if (digitalData.page.pageInfo.ibm.offerCode){
    		attribs[22] = digitalData.page.pageInfo.ibm.offerCode;
    	}else{
    		addAttributes(contact360Params,22,'param.offerCode');
    	}
    	if (digitalData.page.pageInfo.ibm.transactionId){
    		attribs[23] = digitalData.page.pageInfo.ibm.transactionId;
    	}else{
    		addAttributes(contact360Params,23,'param.transactionId');
    	}
    	if (digitalData.page.pageInfo.ibm.campaign){
    		attribs[24] = digitalData.page.pageInfo.ibm.campaign;
    	}
    	if (digitalData.page.pageInfo.ibm.program){
    		attribs[25] = digitalData.page.pageInfo.ibm.program;
    	}	
    }
    //----------add page view attributes for Contact 360 ends--------------------------------------------
    //----------add page view attributes for w3 search starts-------------------------------------------- 
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "p023")){
    	var evSrchTerm = "";
    	if (typeof (window.w3searchParams) == "undefined") window.w3searchParams = {};
    	getNTPTVariable(w3searchParams);
    	addAttributes(w3searchParams,20,'ibmSrchName');
    	//addAttributes(w3searchParams,21,'ibmSrchTerm');
    	addAttributes(w3searchParams,22,'ibmSrchRslts');
    	addAttributes(w3searchParams,23,'ibmSrchDYM');
    	addAttributes(w3searchParams,24,'ibmSrchDYMTerm');
    	addAttributes(w3searchParams,25,'ibmSrchHpp');
    	addAttributes(w3searchParams,26,'ibmSrchScope');
    	addAttributes(w3searchParams,27,'ibmSrchLang');
    	addAttributes(w3searchParams,28,'ibmSrchCountry');
    	addAttributes(w3searchParams,29,'ibmSrchContent');
    	addAttributes(w3searchParams,30,'ibmSrchDate');
    	if(window.location.hash !== ""){
			 var x = window.location.hash.split("&");
			 for(var i=0;i<x.length;i++){
				 if(x[i].indexOf("query") !== -1) evSrchTerm = x[i].substring(7,x[i].length);
			 }
		}
		var w3Query = (document.querySelector('input#ibm-w3search-keyword') !== null) ? (document.querySelector('input#ibm-w3search-keyword').value) : "";
		if(evSrchTerm !== w3Query) evSrchTerm = w3Query;
    	window.digitalData.page.pageInfo.onsiteSearchTerm = attribs[21] = evSrchTerm;
        window.digitalData.page.pageInfo.onsiteSearchResult = (typeof (window.w3searchParams.ibmSrchRslts) != "undefined") ? window.w3searchParams.ibmSrchRslts : '';
    }
    //----------add page view attributes for w3 search ends--------------------------------------------
    //----------add page view attributes for w3 SSI starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "e065" || siteId.toLowerCase() == "e020" || siteId.toLowerCase() == "e021")){
    	if (typeof (window.w3SSIParams) == "undefined") window.w3SSIParams = {};
    	fetchQuerystring(w3SSIParams);
    	var ssiContentInfo = (findMeta("ContentInfo") != null) ? findMeta("ContentInfo") : '';
    	attribs[20] = ssiContentInfo;
    	addAttributes(w3SSIParams,21,'htmlfid');
    	if(typeof (attribs[21]) == "undefined" && typeof (window.w3SSIParams['supplier']) != "undefined" && typeof (window.w3SSIParams['letternum']) != "undefined"){
        	attribs[21] = window.w3SSIParams['supplier'] + "/" + window.w3SSIParams['letternum'];
        }
    	addAttributes(w3SSIParams,22,'appname');
    	addAttributes(w3SSIParams,23,'Infotype');
    	addAttributes(w3SSIParams,24,'InfosubType');
    	if(ssiContentInfo !== '' && ssiContentInfo.indexOf('~') !== -1){
    		var ssiContentArray = ssiContentInfo.split('~');
    		for (var i=0; i<ssiContentArray.length; i++){
    			if(ssiContentArray[i].split(':')[0] == 'HTMLFID' && typeof (attribs[21]) == "undefined") window.w3SSIParams.htmlfid = attribs[21] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'Infotype' && typeof (attribs[23]) == "undefined") window.w3SSIParams.Infotype = attribs[23] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'InfosubType' && typeof (attribs[24]) == "undefined") window.w3SSIParams.InfosubType = attribs[24] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'PubDate') attribs[26] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'Assettype') attribs[28] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'Doctype') attribs[29] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'CGCode') attribs[30] = ssiContentArray[i].split(':')[1];
    		}
    	}
    	attribs[25] = document.URL;
    	attribs[27] = (findMeta("title") != null) ? findMeta("title") : '';
    	addAttributes(w3SSIParams,31,'ftext');
    	addAttributes(w3SSIParams,32,'node');
    	addAttributes(w3SSIParams,33,'l');
    }
  	//----------add page view attributes for w3 SSI ends--------------------------------------------
    //----------add page view attributes for WWPRT starts-------------------------------------------------------
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "wwprt3")){
    	if (typeof (window.wwprtParams) == "undefined") window.wwprtParams = {};
    	getNTPTVariable(wwprtParams);
    	addAttributes(wwprtParams,20,'Duration');
    	addAttributes(wwprtParams,21,'ibmSrchName');
    	addAttributes(wwprtParams,22,'ibmEvGroup');
    	addAttributes(wwprtParams,23,'ibmEvName');
    }
    //----------add page view attributes for WWPRT ends--------------------------------------------
    //----------add page view attributes for Human Resource starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "hr")){
    	if (typeof (window.HRParams) == "undefined") window.HRParams = {};
    	getNTPTVariable(HRParams);
    	addAttributes(HRParams,20,'type');
    	addAttributes(HRParams,21,'wtm.c1');
    	addAttributes(HRParams,22,'wtm.c2');
    	addAttributes(HRParams,23,'wtm.c3');
    	addAttributes(HRParams,24,'wtm.c4');
    	addAttributes(HRParams,25,'wtm.c5');
    	addAttributes(HRParams,26,'lakey');
    	addAttributes(HRParams,27,'ns');
    	addAttributes(HRParams,28,'wc1');
    	addAttributes(HRParams,29,'wc2');
    	addAttributes(HRParams,30,'wc3');
    	addAttributes(HRParams,31,'wc4');
    	addAttributes(HRParams,32,'wc5');
    	addAttributes(HRParams,33,'e1');
    	addAttributes(HRParams,34,'e2');
    	addAttributes(HRParams,35,'e3');
    	addAttributes(HRParams,36,'ex1');
    	addAttributes(HRParams,37,'ex2');
    	addAttributes(HRParams,38,'opv');
    	addAttributes(HRParams,39,'osn');
    	addAttributes(HRParams,40,'fspv');
    	addAttributes(HRParams,41,'qt');
    	addAttributes(HRParams,42,'sortby');
    	addAttributes(HRParams,43,'pagenumber');
    	addAttributes(HRParams,44,'srt');
    	addAttributes(HRParams,45,'lcp');
    	addAttributes(HRParams,46,'lct');
    }
    //----------add page view attributes for Human Resource ends--------------------------------------------
    //----------add page view attributes for Practitioner Portal starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "pp")){
    	if(typeof window.gppWebMetrics != "undefined" && typeof (window.gppWebMetrics._ppEv) != "undefined") attribs[20] = window.gppWebMetrics._ppEv;
    	if(typeof window.gppWebMetrics != "undefined" && typeof (window.gppWebMetrics._ppEvAction) != "undefined") attribs[21] = window.gppWebMetrics._ppEvAction;
    }
    //----------add page view attributes for Practitioner Portal ends--------------------------------------------
    //----------add page view attributes for Sales One starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "w3.ibm.com" || siteId.toLowerCase() == "salesone")){
            if (typeof (window.salesoneParams) == "undefined") window.salesoneParams = {};
            fetchQuerystring(salesoneParams);
            addAttributes(salesoneParams,20,'oid');
           if(typeof (attribs[20]) == "undefined" && window.location.href.indexOf("#/ok") !== -1){
        	   var x = window.location.href.split('/');
        	   for(var j=0;j<x.length;j++){
        		   if(x[j].toLowerCase() == "ok") {attribs[20] = x[j+1]; break;}
        	   }
           }
    }
    //----------add page view attributes for Sales One ends--------------------------------------------
}
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
function fetchQuerystring(clientName){
	var queryString = window.location.href.substring(window.location.href.indexOf("?") + 1),
 	queries, temp, i, l,
 	queries = queryString.split("&");
	for (i = 0, l = queries.length; i < l; i++) {
         temp = queries[i].split('=');
         var x = temp[0].toLowerCase();
         if(x == "lnk" || x == "lm" || x == "lsr" || x == "lot" || x == "lsot" || x == "lpg") clientName[x] = temp[1];
         else clientName[temp[0]] = temp[1];
     }
}
function addAttributes(clientArray,n,data){
	if(data == "oid" && typeof (clientArray["oid"]) != "undefined" && clientArray["oid"].indexOf("#") !== -1){
		clientArray["oid"] = clientArray["oid"].substring(0,(clientArray["oid"].indexOf("#")-1));
	}
	if(typeof (clientArray[data]) != "undefined"){
		attribs[n] = clientArray[data];
	}
}
//Find meta tag and return content
function findMeta(tagName) {
    //get meta tags
    var metas = document.getElementsByTagName('meta');
    //search for meta tags and return conten if found else return NullValue for a value so we know there was no jso value and no meta tag for the attribute 
    for (i = 0; i < metas.length; i++) {
        var myMeta = metas[i].getAttribute("name") + "";
        if (metas[i].getAttribute("name") != null) {
            if (tagName.toUpperCase() == myMeta.toUpperCase()) {
                return metas[i].getAttribute("content") + "";
            }
        }
    }
    return null;
}
function loadMarketingAttribute(i,m,attr){
	var mvalue = null;
	if (typeof window.params[m] == "undefined" && typeof window.params[attr] !== "undefined") mvalue = window.params[attr];
	return mvalue;
}
generatePageAndMarketingView();
window.checkCustomAttribute=function(){
	if (typeof (window.cm_ClientID) != "undefined") var siteId = window.cm_ClientID.substring(window.cm_ClientID.indexOf("|") + 1);
	includeCustomAttributes(siteId);
	pageViewAttributes = "";
	for (i = 0; i < attribs.length; i++) {
         pageViewAttributes += attribs[i] + "-_-";
    }
}