var ibmStats = ibmStats || {};
ibmStats.event = function (obj) {
	//creates Coremetrics element tag(conversion of Unica event to Coremetrics)
	if (!obj.ibmEvGroup) obj.ibmEvGroup = 'null';
    if (!obj.ibmEvName) obj.ibmEvName = 'null';
    if (!obj.ibmEvModule) obj.ibmEvModule = 'null';
    if (!obj.ibmEvSection) obj.ibmEvSection = 'null';
    if (!obj.ibmEvTarget) obj.ibmEvTarget = 'null';
    if (!obj.ibmEvFileSize) obj.ibmEvFileSize = 'null';
    if (!obj.ibmEvLinkTitle) obj.ibmEvLinkTitle = 'null';
    
  //creating Unica events
    if (typeof ntptEventTag !== 'undefined'){
	    var ibmStatInfo = "";
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            ibmStatInfo += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) + "&";
	        }
	        ibmStatInfo = ibmStatInfo.replace("ibmEV", "ev");
	    }
	    ibmStats.loaded = true; // indicates that the stats.js is loaded
	    ntptEventTag(ibmStatInfo);
    }
    
    var pageid = "",
		objIbmEvAction = obj.ibmEvAction,
		objIbmEv = obj.ibmEV;
	if (typeof (window.digitalData) != "undefined" && typeof (window.digitalData.page) != "undefined") {
		if(typeof (window.digitalData.page.pageInfo) != "undefined" && typeof (window.digitalData.page.pageInfo.pageID) != "undefined"){//for new DDO structure
			pageid = window.digitalData.page.pageInfo.pageID;
		}else if(typeof (window.digitalData.page.pageID) != "undefined"){
			pageid = window.digitalData.page.pageID;
		}
	}
	if (pageid === "") {
		var pathName = document.location.pathname;
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
        	var queryString = document.location.href.substring(document.location.href.indexOf("?") + 1),
         	queries, temp, i, l,
         	queries = queryString.split("&");
            for (i = 0, l = queries.length; i < l; i++) {
                 temp = queries[i].split('=');
                 if(temp[0] == "source"){
                	 pathName += "?source="+temp[1];
                 }
             }
        }
        //remove trailing slash, question mark, or hash(if any)
        pathName = pathName.replace(/[(\/)(?)(#)]+$/, "");
        pageid = document.location.host + pathName;
	}
	
	if (objIbmEvAction.length > 50) objIbmEvAction = objIbmEvAction.substring(0,22) + "..." + objIbmEvAction.substring(objIbmEvAction.length - 25, objIbmEvAction.length);
	var currentdate = new Date(),
		pageLocation = window.location.href.replace(/-_-/g,"---"),
		spaces = (obj.ibmConversion && obj.ibmConversion == "true") ? "-_--_--_--_--_--_-" : ("-_-"+obj.ibmEvVidStatus + "-_-" + obj.ibmEvVidTimeStamp + "-_-" + obj.ibmEvVidLength + "-_--_--_-");
		if (typeof (window.pageViewAttributes) != "undefined") {
			pageid = pageid + spaces + window.pageViewAttributes.split('-_-')[17] + "-_-" + pageLocation + "-_-" +  currentdate.getTime() + "-_-" + window.pageViewAttributes.split('-_-')[0];
		}else{
			window.NTPT_IBMer = (String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-|OSCw3Session|IBM_W3SSO_ACCESS)=/)) ? 1 : 0;
			pageid = pageid + spaces + window.loadingTime + "-_-" + pageLocation + "-_-" +  window.loadingTime + "-_-" + window.NTPT_IBMer;
		}
	
	if (typeof (window.cm_ClientID) != "undefined") var siteId = window.cm_ClientID.substring(window.cm_ClientID.indexOf("|") + 1);
	if(typeof(siteId) == "undefined") siteId = findSiteId();
	var cmElement = obj.ibmEV+"-_-"+obj.ibmEvAction+"-_-"+obj.ibmEvName+"-_-"+obj.ibmEvGroup+"-_-"+obj.ibmEvModule+"-_-"+obj.ibmEvSection+"-_-"+obj.ibmEvTarget+"-_-"+obj.ibmEvLinkTitle+"-_-"+obj.ibmEvFileSize;
	//adding custom element attribute for Human Resource page
	if(typeof(obj.ibmConversion) == "undefined" && typeof(siteId) !== "undefined" && siteId.toLowerCase() == "hr"){
		var hrWidgetAttrArray =  ["type","wtm_c1","wtm_c2","wtm_c3","wtm_c4","wtm_c5",
		                         	"lakey","ns","wc1","wc2","wc3","wc4","wc5","e1","e2","e3","ex1","ex2",
		                         	"opv","osn","fspv","qt","sortby","pagenumber","srt","lcp","lct"];
		for(var i=0; i<hrWidgetAttrArray.length; i++){
			if(typeof(obj[hrWidgetAttrArray[i]]) == "undefined") obj[hrWidgetAttrArray[i]] = "null";
			pageid += "-_-" + obj[hrWidgetAttrArray[i]];
		}
		pageid += "-_-" + document.title;
	}
	if(obj.ibmConversion && obj.ibmConversion == "true"){
		//create conversion event tag
		if (!obj.point && obj.convtype && obj.convtype == "1") obj.point = '10';
		if (!obj.point && obj.convtype && obj.convtype == "2") obj.point = '20';
		var cmConversion = obj.ibmEV+"-_-"+obj.ibmEvAction+"-_-"+obj.ibmEvName+"-_-"+obj.ibmEvGroup+"-_-"+obj.ibmEvModule+"-_-"+obj.ibmEvSection+"-_-"+obj.ibmEvTarget+"-_-"+obj.ibmEvLinkTitle+"-_-"+obj.ibmEvFileSize+"-_-"+obj.ibmregoff+"-_-"+obj.ibmregmail;
		if (typeof cmCreateConversionEventTag !== 'undefined') cmCreateConversionEventTag(objIbmEvAction,obj.convtype,objIbmEv,obj.point,cmConversion + "-_-" + pageid);
    }else{
    	//create element event tag
	    if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(objIbmEvAction, objIbmEv, cmElement + "-_--_--_-" + pageid);
    }
}
function findSiteId(){
	if (typeof (window.digitalData) == "undefined") window.digitalData = new Object();
	if (typeof (window.digitalData.page) == "undefined") window.digitalData.page = new Object();
	
	var siteId = (findMeta("IBM.WTMSite")) ? (findMeta("IBM.WTMSite")) : "";
	if(siteId == "") siteId = (findMeta("WTMSite")) ? (findMeta("WTMSite")) : "";
	if(siteId == "") siteId = (findMeta("IBM.WTMCategory")) ? (findMeta("IBM.WTMCategory")) : "";
	if (siteId == "" && typeof digitalData.page.site !== "undefined" && typeof digitalData.page.site.siteID !== "undefined") siteId = digitalData.page.site.siteID;
	if (siteId == "" && typeof digitalData.page.pageInfo !== "undefined" && typeof digitalData.page.pageInfo.ibm !== "undefined" && typeof digitalData.page.pageInfo.ibm.siteID !== "undefined") {
		siteId = digitalData.page.pageInfo.ibm.siteID;
    }
	if (siteId == "" && typeof digitalData.page.category !== "undefined" && typeof digitalData.page.category.categoryID !== "undefined") {
		siteId = digitalData.page.category.categoryID;
	}
	if (siteId == "" && typeof digitalData.page.category !== "undefined" && typeof digitalData.page.category.primaryCategory !== "undefined") {
		siteId = digitalData.page.category.primaryCategory;
	}
	return siteId;
}
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