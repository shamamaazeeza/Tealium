/*  Date        	 Coder             Description
---------------------------------------------------------------------------------------------------------
    June 11 2014     Sudeshna Pal      Merged the Global Code & Generate Marketing Attribute snippet
    June 26 2014     Sudeshna Pal      Rename the function "buildPageView"
    July 1  2014     Sudeshna Pal      Add NIODID cookie value
    July 9  2014     Matej Zorkoci     Switch vendor and placement, remove vendor translation
    July 14 2014     Sudeshna Pal      Update DDO Structure
    Aug  4  2014     Sudeshna Pal      Add Support portal attributes
    Aug  18 2014     Sudeshna Pal      Attach the IBMers tag to the end of the Category Id for support pages
    Aug  20 2014     Sudeshna Pal      Add Sales portal attributes
    Sep  13 2014     Sudeshna Pal	      Add Version Attribute for tracking std ibm.com template(optional attributes)
    Sep  26 2014     Sudeshna Pal      Add page view attributes for Cloud Exchange team
    Oct  9  2014     Sudeshna Pal	      Change attribute view time to page start time
    Oct  10  2014    Sudeshna Pal	      Add attribute view time for Support clients
    Oct  17  2014    Sudeshna Pal      Add changes in site id of Support clients
    Oct  21  2014    Sudeshna Pal	      Add new attributes for Support clients
    Oct  24  2014    Sudeshna Pal      Add condition for no page view tags (for Knowledge Center pages)
    Nov  10  2014    Sudeshna Pal      Add logic for search term and result for Cloud Marketplace
    Nov  12  2014    Sudeshna Pal      Add IIO marketing attribute
    Nov  20  2014    Sudeshna Pal      Add SSI, Partner World and Developers Work attributes
	Nov  24  2014    Sudeshna Pal      Add Source parameter in IWM page id
	Dec  11  2014    Sudeshna Pal      Add condition before optional attributes(for inside sales issue)
	Jan  02  2015    Sudeshna Pal      Add extra field parameters for PartnerWorld
	Feb  20  2015    Sudeshna Pal      Add ibmTmUser custom attribute
	Apr  06 2015    Sudeshna Pal       Add BLUISS cookie value for Bluemix pages
	Apr  13 2015    Sudeshna Pal       Add VCPI test cases
 Nov  11 2015     Matej Zorkoci     Adding new DDO for Inside sales site
*/
//instanciate here for proper scoping
window.pageViewAttributes = new String();
window.IBMPageCategory = new String();
window.IWMSource = new String();
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
        	//initialize window.digitalData.page.attributes if needed 
        	if (typeof (window.digitalData.page.attributes) == "undefined") {
        		window.digitalData.page.attributes = new Object();
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
            //initialize window.digitalData.page.pageInfo.metrics if needed 
            if (typeof (window.digitalData.page.pageInfo.metrics) == "undefined") {
                window.digitalData.page.pageInfo.metrics = new Object();
            }
            //initialize window.digitalData.page.onsiteSearchTerm if needed 
            if (typeof (window.digitalData.page.pageInfo.onsiteSearchTerm) == "undefined") {
            	//window.digitalData.page.onsiteSearchTerm= null;
                if (findMeta("IBM.SearchTerm")) {
                    window.digitalData.page.pageInfo.onsiteSearchTerm = findMeta("IBM.SearchTerm") + "";
                } else if (typeof (window.ibmSrchTerm) !== "undefined") {
                    window.digitalData.page.pageInfo.onsiteSearchTerm = window.ibmSrchTerm;
                } else if (document.getElementById('catalog_search_result_information') !== null){
                		var str = (document.getElementById('catalog_search_result_information').innerHTML).replace(/[""''{}\s]+/g,'').split(',');
      			  		for(var i=0; i<str.length; i++) {
      				  		if(str[i].split(':')[0] == 'searchTerms') window.digitalData.page.pageInfo.onsiteSearchTerm = str[i].split(':')[1];
      					}
                }
            }
            //initialize window.digitalData.page.onsiteSearchResult if needed 
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
            //initialize window.digitalData.page.attributes.extraFields if needed
            if (typeof (window.digitalData.page.attributes.extraFields) == "undefined") {
            	if(typeof (window.CM_EXTRA) != "undefined" && window.CM_EXTRA != ""){
            		window.digitalData.page.attributes.extraFields = "";
            		var separators = ['&', '='],
            			tokens = CM_EXTRA.split(new RegExp(separators.join('|'), 'g')),
            			arr1 = CM_EXTRA.split('&'),
            			j = 0;
	            	for(var i=0; i<arr1.length; i++){
	        			window.digitalData.page.attributes.extraFields += arr1[i].split('=')[1]+"-_-";
	        		}
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
                //add source parameter for IWM
                if(pathName.indexOf("iwm") !== -1){
                	fetchQuerystring("iwm");
                	pathName = (window.IWMSource !== "") ? (pathName+window.IWMSource) : pathName;
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
           // var attribs = new Array();
            if(document.domain.indexOf("ibm.com") !== -1){//for ibm.com sites
	            if (String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-|OSCw3Session|IBM_W3SSO_ACCESS)=/)) {
	                if (typeof NTPT_IBMer == "undefined" || NTPT_IBMer == null) {
	                    NTPT_IBMer = 1
	                }
	            } else {
	                if (typeof NTPT_IBMer == "undefined" || NTPT_IBMer == null) {
	                    NTPT_IBMer = 0
	                }
	            }
            }else{//for non ibm.com sites
            	window.NTPT_IBMer = (window.NTPT_IBMer == "true") ? 1 : 0;
            }
            if (typeof (window.digitalData.page.pageInfo.ibm.employee) == "undefined") {
                window.digitalData.page.pageInfo.ibm.employee = attribs[0] = window.NTPT_IBMer + "";
            } else {
                attribs[0] = window.digitalData.page.pageInfo.ibm.employee + "";
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
            }else{
            	digitalData.page.pageInfo.version = attribs[6] = findMeta("Source") + "";
            }
            if (digitalData.page.pageInfo.ibm.owner) {
                attribs[7] = digitalData.page.pageInfo.ibm.owner;
            } else {
                digitalData.page.pageInfo.ibm.owner = attribs[7] = findMeta("Owner") + "";
            }
			if (digitalData.page.pageInfo.description) {
                attribs[8] = digitalData.page.pageInfo.description;
            } else {
                digitalData.page.pageInfo.description = attribs[8] = findMeta("Description") + "";
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
			/*if (digitalData.page.pageInfo.ibm.specialPurpose) {
                attribs[11] = digitalData.page.pageInfo.ibm.specialPurpose;
            } else {
                digitalData.page.pageInfo.ibm.specialPurpose = attribs[11] = findMeta("IBM.SpecialPurpose") + "";
            }; */
			attribs[11] = generatePageProd();
			if (digitalData.page.pageInfo.keywords) {
                attribs[12] = digitalData.page.pageInfo.keywords;
            } else {
                digitalData.page.pageInfo.keywords = attribs[12] = findMeta("Keywords") + "";
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
            /*if (readCookie("UnicaNIODID")) {
            	attribs[16] = readCookie("UnicaNIODID");
            }*/
        	if (typeof (window.unicaParams) == "undefined") window.unicaParams = {};
        	fetchQuerystring(unicaParams);
        	if(typeof (unicaParams['lnk']) != "undefined") attribs[16] = unicaParams['lnk'];
            //fetch current time of hitting a page
            var currentdate = new Date();
			attribs[17] = (typeof (window.loadingTime) != "undefined") ? window.loadingTime : currentdate.getTime();
			//------------------------------newly added attributes starts-----------------------------
			if (digitalData.page.pageInfo.publisher) {
                attribs[18] = digitalData.page.pageInfo.publisher;
            } else {
                digitalData.page.pageInfo.publisher = attribs[18] = findMeta("DC.Publisher") + "";
            }; 
            if(typeof (document.getElementsByTagName("h1")[0]) != 'undefined'){
				attribs[19] = document.getElementsByTagName("h1")[0].innerHTML;
            }
            //newly added attributes ends
			//set site id
			var siteId = '',
				customAttribute = false;
			if (typeof (window.cm_ClientID) != "undefined") siteId = window.cm_ClientID.substring(window.cm_ClientID.indexOf("|") + 1);
			//set the category ID value to IBMER
	        if (document.domain.indexOf("ibm.com") !== -1 && String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-|OSCw3Session|IBM_W3SSO_ACCESS)=/)) {
	            if(siteId.substring(0,3) == "EST" || siteId.toLowerCase() == "serveng" || siteId.toLowerCase() == "extconnections" || siteId.toLowerCase() == "extconnectionstest"){
	               window.IBMPageCategory += "IBMER";
	            }else{
	               window.IBMPageCategory = "IBMER";
	            }
	        }else if(document.domain.indexOf("ibm.com") == -1 && window.NTPT_IBMer == 1){//for non ibm.com
	        	window.IBMPageCategory += "IBMER";
	        }
	        if(typeof(siteId) !== "undefined" && siteId.toLowerCase() == "error") window.IBMPageCategory = "error";
			//attribute for ECOM pages
            if (siteId.substring(0,4).toLowerCase() == "ecom") {
            	customAttribute = true;
            	if (findMeta("IBM.WTMEComStore") != null) {
                    attribs[26] = findMeta("IBM.WTMEComStore");
                }
            	window.IBMPageCategory = siteId + window.IBMPageCategory;
            }
            includeCustomAttributes(siteId);
            //optional attributes
            if(customAttribute == false){
		    	if(typeof (unicaParams['lm']) != "undefined") attribs[23] = unicaParams['lm'];
            	if(typeof (unicaParams['lsr']) != "undefined") attribs[24] = unicaParams['lsr'];
            	if(typeof (unicaParams['lot']) != "undefined") attribs[25] = unicaParams['lot'];
            	if(typeof (unicaParams['lsot']) != "undefined") attribs[26] = unicaParams['lsot'];
            	if(typeof (unicaParams['lpg']) != "undefined") attribs[27] = unicaParams['lpg'];
            }
            if (typeof (attribs[43]) == "undefined" && digitalData.page.pageInfo.version) {
	        	attribs[43] = digitalData.page.pageInfo.version;
	    	}
            if (typeof (attribs[44]) == "undefined" && digitalData.page.pageInfo.ibm.contentProducer) {
	        	attribs[44] = digitalData.page.pageInfo.ibm.contentProducer;
	    	}
	    	if (typeof (attribs[45]) == "undefined" && digitalData.page.pageInfo.ibm.contentDelivery) {
	        	attribs[45] = digitalData.page.pageInfo.ibm.contentDelivery;
	    	}
	    	//add Canonical URL value 
	    	var docLinks = document.getElementsByTagName('link');
	    	for (i = 0; i < docLinks.length; i++) {
	    		if (docLinks[i].getAttribute("rel") != null && docLinks[i].getAttribute("rel") == "canonical") 
	    			attribs[46] = docLinks[i].getAttribute("href");
	    	}
            if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "bluemix" || siteId.toLowerCase() == "bluemixtest")){
            	if(readCookie("BLUISS")) attribs[15] = readCookie("BLUISS");
            }
            //json now is as complete as possible.pageId and page category are now set.
            //now look in json to build explore attributes for page view.build an array of attributes.now find the ones to use in the pageview
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
                //look for attributes in params object and load in to the marketing attribs array if present
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
                window.pageViewAttributes = window.pageViewAttributes.replace(/%/g,"Percent");
                window.pageViewAttributes = decodeURIComponent(window.pageViewAttributes);
                if(findMeta("IBM.WTMConfig") !== "no-page-view"){
	                if (typeof (digitalData.page.pageInfo.onsiteSearchTerm) == "undefined" || typeof (digitalData.page.pageInfo.onsiteSearchResult) == "undefined") {
	                	if(typeof (digitalData.page.attributes.extraFields) == "undefined")
	                		cmCreateManualPageviewTag(ddoPageId, window.IBMPageCategory, document.URL + marketingAttributes, document.referrer, window.pageViewAttributes);
	                	else
	                		cmCreateManualPageviewTag(ddoPageId, window.IBMPageCategory, document.URL + marketingAttributes, document.referrer, window.pageViewAttributes,null,null,digitalData.page.attributes.extraFields);
	                } else {
	                	if(typeof (digitalData.page.attributes.extraFields) == "undefined")
	                		cmCreateManualPageviewTag(ddoPageId, window.IBMPageCategory, document.URL + marketingAttributes, document.referrer, window.pageViewAttributes, digitalData.page.pageInfo.onsiteSearchTerm, digitalData.page.pageInfo.onsiteSearchResult);
	                	else
	                		cmCreateManualPageviewTag(ddoPageId, window.IBMPageCategory, document.URL + marketingAttributes, document.referrer, window.pageViewAttributes, digitalData.page.pageInfo.onsiteSearchTerm, digitalData.page.pageInfo.onsiteSearchResult, digitalData.page.attributes.extraFields);
	                }
                }
            }
}
function readCookie(n) {
	return (n = new RegExp('(?:^|;\\s*)' + ('' + n).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && n[1];
}
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
function includeCustomAttributes(siteId){
	customAttribute = true;
	//for test environment
	if(siteId.substring(0,4).toLowerCase() == "test" && siteId.substring(siteId.length-4,siteId.length).toLowerCase() == "test") siteId = siteId.substring(4,siteId.length-4);
	else if(siteId.substring(0,4).toLowerCase() == "test") siteId = siteId.substring(4,siteId.length);
	else if (siteId.substring(siteId.length-4,siteId.length).toLowerCase() == "test") siteId = siteId.substring(0,siteId.length-4);
	//add custom attributes for Cloud Exchange portal starts------------------------------------------------
    if(typeof(siteId) !== "undefined" && siteId.substring(0, 13).toLowerCase() == "cloudexchange"){
    	if (digitalData.page.attributes.cspClient) {
            attribs[20] = digitalData.page.attributes.cspClient;
    	}
    	if (digitalData.page.attributes.cspOffering) {
            attribs[21] = digitalData.page.attributes.cspOffering;
    	}
    	if (digitalData.page.attributes.cspSAPSiteId) {
            attribs[22] = digitalData.page.attributes.cspSAPSiteId;
    	}
    	if (digitalData.page.attributes.cspCustHubId) {
            attribs[23] = digitalData.page.attributes.cspCustHubId;
    	}
    	if (digitalData.page.attributes.cspICN) {
            attribs[24] = digitalData.page.attributes.cspICN;
    	}
    	if (digitalData.page.attributes.cspCMClientId) {
            attribs[25] = digitalData.page.attributes.cspCMClientId;
    	}
    }
    //add custom attributes for Cloud Exchange portal ends--------------------------------------------------
    //----------add page view attributes for Sales portal starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && siteId.substring(0, 3).toLowerCase() == "ins"){
    	if (typeof (window.saleParams) == "undefined") window.saleParams = {};
    	getNTPTVariable(saleParams);
    	if(findMeta("IBM.PageAttributes") !== null){
    		attribs[20] = findMeta("IBM.PageAttributes");
    	} else if(digitalData.page.pageInfo.metrics.PageAttributes){
         attribs[20] = digitalData.page.pageInfo.metrics.PageAttributes;
        }
    	if(findMeta("RepID") !== null){
    		attribs[21] = findMeta("RepID");
    	}else if (digitalData.page.pageInfo.metrics.RepID){
         attribs[21] = digitalData.page.pageInfo.metrics.RepID;
    	}else  {
    		addAttributes(saleParams,21,'RepID');
        }
    	if(findMeta("rep_group") !== null){
    		attribs[22] = findMeta("rep_group");
    	}else if (digitalData.page.pageInfo.metrics.rep_group){
         attribs[22] = digitalData.page.pageInfo.metrics.rep_group;
    	}else  {
    		addAttributes(saleParams,22,'rep_group');
        }
    	addAttributes(saleParams,23,'DocID');
    	if(typeof attribs[23] == "undefined" && typeof digitalData.page.pageInfo.metrics.DocID !== "undefined"){
    		attribs[23] = digitalData.page.pageInfo.metrics.DocID;
    	}
    	addAttributes(saleParams,24,'mode'); 
    	if(typeof attribs[24] == "undefined" && typeof digitalData.page.pageInfo.metrics.mode !== "undefined"){
    		attribs[24] = digitalData.page.pageInfo.metrics.mode;
    	}
    	if(findMeta("PopID") !== null){
    		attribs[25] = findMeta("PopID");
    	} else if(digitalData.page.pageInfo.metrics.PopID){
         attribs[25] = digitalData.page.pageInfo.metrics.PopID;
        }
	    if (digitalData.page.pageInfo.metrics.NewContent) {
           attribs[26] = digitalData.page.pageInfo.metrics.NewContent;
        }
    }
    //----------add page view attributes for Sales portal ends--------------------------------------------
  //----------add page view attributes for Support portal starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && (siteId.substring(0, 3).toLowerCase() == "est")){
    	if (typeof (window.supportParams) == "undefined") window.supportParams = {};
    	getNTPTVariable(supportParams);
    	if(siteId.toLowerCase() == "estcht" || siteId.toLowerCase() == "estxsr"){//attributes for Support - Problem reporting  profile
    		 fetchQuerystring(supportParams);//for srChannel & srFromAction
    		 addAttributes(supportParams,20,'SR_DOMAIN');
    		 addAttributes(supportParams,21,'SR_EMAILADDRESS');
    		 addAttributes(supportParams,22,'SR_ICN');
             addAttributes(supportParams,23,'SR_PIDVRMCOMPREL');
             addAttributes(supportParams,24,'SR_PREFERREDCONTACTMETHOD');
             addAttributes(supportParams,25,'SR_PRIMIUMRESPONSESELECTED');
             addAttributes(supportParams,26,'SR_PRODID');
             addAttributes(supportParams,27,'SR_PRODSOURCE');
             addAttributes(supportParams,28,'SR_REQUESTTYPE');
             addAttributes(supportParams,29,'SR_SEVERITY');
             addAttributes(supportParams,30,'SR_SOURCEAPPL');
             addAttributes(supportParams,31,'SR_SUCCESS');
             addAttributes(supportParams,32,'SR_TYPE');
             addAttributes(supportParams,33,'SR_UNEXPECTEDERROR_CONTACTID');
             addAttributes(supportParams,34,'SR_UNEXPECTEDERROR_DOMAIN');
             addAttributes(supportParams,35,'SR_UNEXPECTEDERROR_USER');
             addAttributes(supportParams,36,'SR_UNEXPECTEDERROR_NODE');
             addAttributes(supportParams,37,'srChannel');
             addAttributes(supportParams,38,'srFromAction');
             addAttributes(supportParams,39,'SR_ECIIC');
             addAttributes(supportParams,40,'SR_MACHTYPEMOD');
             addAttributes(supportParams,41,'SR_COMPID');
    	}else if(siteId.toLowerCase() == "estmob" || siteId.toLowerCase() == "estspa" || siteId.toLowerCase() == "estspe"){//attributes for Support - Content Navigation profile
    		addAttributes(supportParams,20,'SP.CAMCO');
    		addAttributes(supportParams,21,'SP.AVPCompanyName');
    		addAttributes(supportParams,22,'SP.WICO');
    		addAttributes(supportParams,23,'SP.WIDM');
    		getCmCreateProductView(23);
    	}else if(siteId.toLowerCase() == "estfix" || siteId.toLowerCase() == "estset"){//attributes for Support - Fix Delivery profile
    		getCmCreateProductView(19);
    	}
    	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    	var currentdate = new Date();
    	var	datetime = currentdate.getDate() + "/" 
						   + monthNames[currentdate.getMonth()] + "/" 
						   + currentdate.getFullYear() + ":" 
				           + currentdate.getHours() + ":" 
				           + currentdate.getMinutes() + ":" 
				           + currentdate.getSeconds();
    	attribs[49] = datetime;
    }
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
    		attribs[n++] = tagArray[1];
    		attribs[n++] = tagArray[2];
    		attribs[n++] = tagArray[3];
    	}
    }
    //----------add page view attributes for Support portal ends--------------------------------------------	
    //----------add page view attributes for SSI starts--------------------------------------------	
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "e021")){
    	if (typeof (window.ssiParams) == "undefined") window.ssiParams = {};
    	//fetchQuerystring(ssiParams);
    	var queryString = window.location.href.substring(window.location.href.indexOf("?") + 1),
     		queries, temp, i, l,
     		queries = queryString.split(/&|#/);
    	for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            window.ssiParams[temp[0]] = temp[1];
        }
    	var ssiContentInfo = (findMeta("ContentInfo") != null) ? findMeta("ContentInfo") : '';
    	addAttributes(ssiParams,20,'htmlfid');
    	if(typeof (attribs[20]) == "undefined" && typeof (window.ssiParams['supplier']) != "undefined" && typeof (window.ssiParams['letternum']) != "undefined"){
        	attribs[20] = window.ssiParams['supplier'] + "/" + window.ssiParams['letternum'];
        }
    	addAttributes(ssiParams,21,'appname');
    	attribs[24] = ssiContentInfo;
    	addAttributes(ssiParams,25,'docURL');
    	addAttributes(ssiParams,26,'lang');
    	addAttributes(ssiParams,27,'request_locale');
    	if(ssiContentInfo !== '' && ssiContentInfo.indexOf('~') !== -1){
    		var ssiContentArray = ssiContentInfo.split('~');
    		for (var i=0; i<ssiContentArray.length; i++){
    			if(ssiContentArray[i].split(':')[0] == 'HTMLFID' && typeof (attribs[20]) == "undefined") attribs[20] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'Infotype') attribs[22] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'InfosubType') attribs[23] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'Assettype') attribs[28] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'Doctype') attribs[29] = ssiContentArray[i].split(':')[1];
    			if(ssiContentArray[i].split(':')[0] == 'CGCode') attribs[30] = ssiContentArray[i].split(':')[1];
    		}
    	}
    	if(typeof (attribs[22]) == "undefined") addAttributes(ssiParams,22,'Infotype');
    	if(typeof (attribs[23]) == "undefined") addAttributes(ssiParams,23,'InfosubType');
    	addAttributes(ssiParams,31,'ctype');//for value #ctype
    	addAttributes(ssiParams,32,'ctry');//for value #ctry
    	if(typeof (attribs[20]) !== "undefined" && attribs[20].indexOf('#') !== -1){
    		attribs[20] = attribs[20].substring(0,attribs[20].indexOf('#'));
    	}
    }
    //----------add page view attributes for SSI ends--------------------------------------------	
    //----------add page view attributes for Partner world starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "partnerworld" || siteId.toLowerCase() == "contlisten" || siteId.toLowerCase() == "pw")){
    	if (typeof (window.pwParams) == "undefined") window.pwParams = {};
    	getNTPTVariable(pwParams);
    	addAttributes(pwParams,20,'pw_bp_id');
    	addAttributes(pwParams,21,'pw_ce_id');
    	addAttributes(pwParams,22,'pw_locale');
    	addAttributes(pwParams,23,'PW.Service');
    	addAttributes(pwParams,24,'PW.Software');
    	addAttributes(pwParams,25,'PW.Hardware');
    	addAttributes(pwParams,26,'PW.Solution');
    	addAttributes(pwParams,27,'PW.Sponsor');
    	addAttributes(pwParams,28,'PW.ECMContentType');
    	addAttributes(pwParams,29,'business_unit');
    	addAttributes(pwParams,30,'content_id');
    	addAttributes(pwParams,31,'resource_type');
    	if(typeof (attribs[23]) == "undefined" && digitalData.page.pageInfo.ibm.PW_Service) attribs[23] = digitalData.page.pageInfo.ibm.PW_Service;
    	if(typeof (attribs[24]) == "undefined" && digitalData.page.pageInfo.ibm.PW_Software) attribs[24] = digitalData.page.pageInfo.ibm.PW_Software;
    	if(typeof (attribs[25]) == "undefined" && digitalData.page.pageInfo.ibm.PW_Hardware) attribs[25] = digitalData.page.pageInfo.ibm.PW_Hardware;
    	if(typeof (attribs[26]) == "undefined" && digitalData.page.pageInfo.ibm.PW_Solution) attribs[26] = digitalData.page.pageInfo.ibm.PW_Solution;
    	if(typeof (attribs[27]) == "undefined" && digitalData.page.pageInfo.ibm.PW_Sponsor) attribs[27] = digitalData.page.pageInfo.ibm.PW_Sponsor;
    	if(typeof (attribs[28]) == "undefined" && digitalData.page.pageInfo.ibm.PW_ECMContentType) attribs[28] = digitalData.page.pageInfo.ibm.PW_ECMContentType;
    }
    //----------add page view attributes for Partner world ends--------------------------------------------
    //----------add page view attributes for Developer Works starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase().substring(0, 6) == "devwrk" || siteId.toLowerCase() == "dwnext")){
    	if (typeof (window.devworkParams) == "undefined") window.devworkParams = {};
    	fetchQuerystring(devworkParams);
    	addAttributes(devworkParams,20,'ca');
    	getNTPTVariable(devworkParams);
    	addAttributes(devworkParams,21,'ibmCmaId');
    	addAttributes(devworkParams,22,'ibmContentAreas');
    	attribs[24] = (findMeta("dW.Topic") != null) ? findMeta("dW.Topic") : '';
    	if(findMeta("IBM.WTMCategory") != null) attribs[23] = findMeta("IBM.WTMCategory");
    	else if(typeof (attribs[23]) == "undefined" && typeof digitalData.page.category !== "undefined" && typeof digitalData.page.category.categoryID !== "undefined") 
    			attribs[23] = digitalData.page.category.categoryID;
    	else if(typeof (attribs[23]) == "undefined" && typeof digitalData.page.category !== "undefined" && typeof digitalData.page.category.primaryCategory !== "undefined") 
    			attribs[23] = digitalData.page.category.primaryCategory;
    }
    //----------add page view attributes for Developer Works ends--------------------------------------------
    //----------add page view attributes for THINKLEADERS starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && siteId.toLowerCase() == "thinkleaders"){
    	if (typeof (window.thinkParams) == "undefined") window.thinkParams = {};
        getNTPTVariable(thinkParams);
        addAttributes(thinkParams,23,'ibmTMuser');
    }
    //----------add page view attributes for THINKLEADERS ends--------------------------------------------
    if(typeof(siteId) !== "undefined" && siteId.toLowerCase() == "cuf04"){
    	if (typeof (window.SA_Message) !== "undefined") attribs[23] = window.SA_Message;
    }
    //----------add page view attributes for IBM CLOUD starts--------------------------------------------
    if(typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "mktibmcloud" || siteId.toLowerCase() == "cloud")){
    	if (digitalData.page.pageInfo.ibm.Solution) {
            attribs[27] = digitalData.page.pageInfo.ibm.Solution;
        } else if(findMeta("IBM.Solution")){
        	digitalData.page.pageInfo.ibm.Solution = attribs[27] = findMeta("IBM.Solution") + "";
        } else if(digitalData.page.pageInfo.ibm.UseCase){
        	attribs[27] = digitalData.page.pageInfo.ibm.UseCase;
        } else if(findMeta("IBM.UseCase")){
        	digitalData.page.pageInfo.ibm.UseCase = attribs[27] = findMeta("IBM.UseCase") + "";
        }
    }
    //----------add page view attributes for IBM CLOUD ends--------------------------------------------
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
         if(clientName == "supportParams" && (temp[0] == "srChannel" || temp[0] == "srFromAction")){
        	 window.supportParams[temp[0]] = temp[1];
         }else if (x == "lnk" || x == "lm" || x == "lsr" || x == "lot" || x == "lsot" || x == "lpg"){
        	 clientName[x] = temp[1];
         }else{
        	 clientName[temp[0]] = temp[1];
         }
         if(clientName == "iwm" && temp[0] == "source"){
        	 window.IWMSource = "?source="+temp[1];
         }
     }
}
function addAttributes(clientArray,n,data){
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
function generatePageProd(){
	var pathName = location.pathname,
		addAttr = true;
	//condition 1
	var ignoreAttributeList = ["graceland.rchland","-stage.ibm","wwwpreview","wwwstage","dev.ibm.com","etl.ibm.com","bld.dst",
	                           "pok.ibm","doubleclick.","sagamino.ibm","anonymouse","boulder","portsmouth.","cwtapp01-wireless.webmaster",
	                           "dsc-dev.ibm","file://","localhost","preprod.","preview.ibm","raleigh.ibm","sby.ibm",
	                           "stage.watson","test.ibm.","tle.atlanta.ibm.","toronto.","yandex.","w3",/*"webmaster.",*/
	                           "preview30","stage.","stage.ogilvy","stage.dst","test-stage."];
	 for(var i=0;i<ignoreAttributeList.length;i++){
		 if(window.location.href.toLowerCase().indexOf(ignoreAttributeList[i]) !== -1){
			 addAttr = null;
			 return addAttr;
		 }
	 }
	 //remove some specified html versions from path name
     var lastpart = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
     var omittedHTMLVersions = ["index.php","index.phtml", "index.shtml", "index.wss", "index.jsp", "index.jspa", "index.htm", "index.html", "index"];
     for (var i = 0; i < omittedHTMLVersions.length; i++) {
         if (omittedHTMLVersions[i] == lastpart.toLowerCase()) {
             pathName = pathName.replace(lastpart, "");
         }
     }
     //add source parameter for IWM
     if(pathName.indexOf("iwm") !== -1){
     	fetchQuerystring("iwm");
     	pathName = (window.IWMSource !== "") ? (pathName+window.IWMSource) : pathName;
     }
     //remove trailing slash, question mark, or hash(if any)
     pathName = pathName.replace(/[(\/)(?)(#)]+$/, "");
     addAttr = location.host + pathName;
     return addAttr;
}
function loadMarketingAttribute(i,m,attr){
	var mvalue = null;
	if (typeof window.params[m] == "undefined" && typeof window.params[attr] !== "undefined") mvalue = window.params[attr];
	else if (i == 10 && typeof window.params.cm_mmca10 == "undefined" && typeof window.params.ccy == "undefined" && typeof window.params.cc !== "undefined") mvalue = window.params.cc;
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