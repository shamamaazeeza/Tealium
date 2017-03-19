/*
 * This part is starting very first
 * Use it for loading eluminate.js 
 */
/*creates Coremetrics element tag(conversion of Unica event to Coremetrics)*/
function create_cmElement(obj,objIbmEv,objIbmEvAction,cmElement){
	var pageid = "";
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
	//element tag for W3 SSI page
	var _siteID = ibmweb.config.w3_eluminate.siteID;
    if(typeof(obj.ibmConversion) == "undefined" && typeof(_siteID) !== "undefined" && (_siteID.toLowerCase() == "e065" || _siteID.toLowerCase() == "e020" || _siteID.toLowerCase() == "e021")){
    	//this.create_QueryString();
    	var htmlFid = (typeof(window.QueryString.htmlfid) !== "undefined") ? window.QueryString.htmlfid : "undefined";
    	if(htmlFid == "undefined"){
    		var ssiContentInfo = String(dojo.query("meta[name='ContentInfo']").attr("content"));
    		if(ssiContentInfo !== '' && ssiContentInfo.indexOf('~') !== -1){
        		var ssiContentArray = ssiContentInfo.split('~');
        		for (var i=0; i<ssiContentArray.length; i++){
        			if(ssiContentArray[i].split(':')[0] == 'HTMLFID') htmlFid = ssiContentArray[i].split(':')[1];
        		}
        	}
    	}
    	pageid = pageid + "-_-" + htmlFid;
	}
	if(obj.ibmConversion && obj.ibmConversion == "true"){
		//create conversion event tag
		if (!obj.point && obj.convtype && obj.convtype == "1") obj.point = '10';
		if (!obj.point && obj.convtype && obj.convtype == "2") obj.point = '20';
		var cmConversion = obj.ibmEV+"-_-"+obj.ibmEvAction+"-_-"+obj.ibmEvName+"-_-"+obj.ibmEvGroup+"-_-"+obj.ibmEvModule+"-_-"+obj.ibmEvSection+"-_-"+obj.ibmEvTarget+"-_-"+obj.ibmEvLinkTitle+"-_-"+obj.ibmEvFileSize+"-_-"+obj.ibmregoff+"-_-"+obj.ibmregmail;
		if (typeof cmCreateConversionEventTag !== 'undefined') cmCreateConversionEventTag(objIbmEvAction,obj.convtype,objIbmEv,obj.point,cmConversion + "-_-" + pageid);
    }
	else if(obj.ibmProductTag && obj.ibmProductTag == "true"){
		window.onload = function(){
			if (typeof (window.pageViewAttributes) != "undefined") var productAttr = window.pageViewAttributes.split("-_-", 21).join("-_-");
			if (typeof(window.ibmweb.config.eluminate.siteID) !== "undefined" && window.ibmweb.config.eluminate.siteID.toLowerCase()== "ecom" && typeof obj.serviceType != "undefined") productAttr += "-_--_--_--_--_--_--_--_--_--_-" + obj.serviceType;
			if (typeof cmCreateProductviewTag !== 'undefined') cmCreateProductviewTag(obj.proID,obj.proName,obj.proCategory,productAttr,obj.cm_vc);
		}
	}
	else{
    	//create element event tag
	    if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(objIbmEvAction, objIbmEv, cmElement + "-_--_--_-" + pageid);
    }
}

var ibmStats = ibmStats || {};
ibmStats.loaded = true;
ibmStats.event = function (obj) {
    if (!obj.ibmEV) obj.ibmEV = 'null';
    if (!obj.ibmEvAction) obj.ibmEvAction = 'null';
    if (!obj.ibmEvGroup) obj.ibmEvGroup = 'null';
    if (!obj.ibmEvName) obj.ibmEvName = 'null';
    if (!obj.ibmEvModule) obj.ibmEvModule = 'null';
    if (!obj.ibmEvSection) obj.ibmEvSection = 'null';
    if (!obj.ibmEvTarget) obj.ibmEvTarget = 'null';
    if (!obj.ibmEvFileSize) obj.ibmEvFileSize = 'null';
    if (!obj.ibmEvLinkTitle) obj.ibmEvLinkTitle = 'null';

    //creates Coremetrics element tag(conversion of Unica event to Coremetrics)
    var cmElement = obj.ibmEV+"-_-"+obj.ibmEvAction+"-_-"+obj.ibmEvName+"-_-"+obj.ibmEvGroup+"-_-"+obj.ibmEvModule+"-_-"+obj.ibmEvSection+"-_-"+obj.ibmEvTarget+"-_-"+obj.ibmEvLinkTitle+"-_-"+obj.ibmEvFileSize;
    create_cmElement(obj,obj.ibmEV,obj.ibmEvAction,cmElement);
};

ibmweb.w3_eluminate = {

	downloadTypes: ['bqy','doc','dot','exe','flv','jpg','png','mov','mp3','pdf','pps','ppt','rss','sh','swf','tar','txt','wmv','xls','xml','zip','avi','eps','gif','lwp','mas','mp4','pot','prz','rtf','wav','wma','123','odt','ott','sxw','stw','docx','odp','otp','sxi','sti','pptx','ods','ots','sxc','stc','xlsx'],
	domainList: ['.ibm.com', '.lotuslive.com', '.cognos.com', '.webdialogs.com', '.servicemanagementcenter.com','.xtify.com','.ibmcloud.com','.ibmdw.net','.bluemix.net','.smartercitiescloud.com'],

	// creating QueryString variable
	create_QueryString: function() {
		var query = window.location.search.substring(1);
		
		try {
			window.QueryString = dojo.queryToObject(query);
		} catch (e) {
			window.QueryString = {};
		}
	},

	domainTest: function(host) {
		if (host.length > 0) {
			host = host.toLowerCase();

			if (host == window.location.hostname.toLowerCase() || dojo.indexOf(this.domainList, host) !== -1) return true;

			for (var i = 0; i < this.domainList.length; i++) {
				if (host.search(this.domainList[i]) != -1) return true;
			}
		}
		return false;
	},

	match: function(pth) {
		var result = false,
			type = pth.substring(pth.lastIndexOf(".") + 1, pth.length);

		if (dojo.indexOf(this.downloadTypes, type) !== -1) result = true;

		return result;
	},

	pause: function(ms) {
		var date = new Date(),
			curDate = null;

		do curDate = new Date(); while(curDate - date < ms);
	},

	findElm: function(e, tag) {
		var elm = dojo.query(e.target || e.srcElement);

		if (typeof elm[0] === 'undefined') return null;

		elmNode = elm[0];

		var result = elmNode;
		
		while (typeof elmNode.parentNode !== 'undefined') {
			elmNode = elmNode.parentNode;
			if (elmNode == null) break;
			if (typeof elmNode.tagName !== 'undefined' && elmNode.tagName.toLowerCase() === tag) {result = elmNode; break}
		}

		return result;
	},

	download_and_offset_tracking: function(e) {

		if (typeof e == "undefined") return;

		var elm = this.findElm(e, 'a');

		if (typeof elm === 'undefined' || elm == null) return;

		//var pageid = (typeof(window.digitalData) !== "undefined" && typeof(window.digitalData.page) !== "undefined" && typeof(window.digitalData.page.pageID) !== "undefined")? window.digitalData.page.pageID : "";

		if ((typeof elm.tagName !== 'undefined' && elm.tagName.toLowerCase() == 'a') && !!elm.href) this.tracking_core(e, elm, 'normalClick');
	},
	
	right_click_tracking: function(e) {

		if (typeof e == "undefined") return;
		
		var btn = e.which || e.button;

		if ((btn !== 1 ) || (navigator.userAgent.indexOf("Safari") !== -1)) {

			var elm = this.findElm(e, 'a');

			if (typeof elm === 'undefined' || elm == null) return;

			//var pageid = (typeof(window.digitalData) !== "undefined" && typeof(window.digitalData.page) !== "undefined" && typeof(window.digitalData.page.pageID) !== "undefined")? window.digitalData.page.pageID : "";

			if ((typeof elm.tagName !== 'undefined' && elm.tagName.toLowerCase() == 'a') && !!elm.href) this.tracking_core(e, elm, 'rightClick');
		}
	},

	tracking_core: function(e, elm, type) { // for both click type

		var hostName = elm.hostname? (elm.hostname.split(":")[0]) : "",
			fullURL = escape(elm.href),
			qry = elm.search? elm.search.substring(elm.search.indexOf("?") + 1, elm.search.length) : "",
			p = dojo.queryToObject(qry),
			vparam = 'none',
			prtcl = elm.protocol || "",
			evAction = (elm.protocol == "ftp:")?  fullURL.substr(8) : ((elm.protocol == "https:") ? fullURL.substr(10) : fullURL.substr(9)),
			evid = (elm.protocol == "ftp:")?  elm.href.substr(6) : ((elm.protocol == "https:") ? elm.href.substr(8) : elm.href.substr(7)),
			evLinkTitle = (navigator.appVersion.indexOf("MSIE") != -1) ? elm.innerText : elm.textContent,
			pageid = "";
			
			//replace -_- from evAction if exists 
            if(evAction.indexOf('-_-') != -1){
            	evAction = evAction.replace(/-_-/g,"---");;
            }

        if (typeof (window.digitalData) != "undefined" && typeof (window.digitalData.page) != "undefined" && typeof (window.pageViewAttributes) != "undefined") {
        	if(typeof (window.digitalData.page.pageInfo) != "undefined" && typeof (window.digitalData.page.pageInfo.pageID) != "undefined"){//for new DDO structure
        		pageid = window.digitalData.page.pageInfo.pageID;
        	}else if(typeof (window.digitalData.page.pageID) != "undefined"){
        		pageid = window.digitalData.page.pageID;
        	}
        	var currentdate = new Date(),
    	    	pageLocation = window.location.href.replace(/-_-/g,"---");
        	pageid = pageid + "-_--_--_--_--_--_-" + window.pageViewAttributes.split('-_-')[17] + "-_-" + pageLocation + "-_-" +  currentdate.getTime() + "-_-" + window.pageViewAttributes.split('-_-')[0];      
        }
        //element tag for W3 SSI page
        var _siteID = ibmweb.config.w3_eluminate.siteID;
        if (typeof _siteID !== "undefined" && (_siteID.toLowerCase() == "e065" || _siteID.toLowerCase() == "e020" || _siteID.toLowerCase() == "e021"))  {
        	var htmlFid = (typeof(window.w3SSIParams.htmlfid) !== "undefined") ? window.w3SSIParams.htmlfid : "undefined";
        	pageid = pageid + "-_-" + htmlFid;
        }
		if (typeof p.attachment !== 'undefined') vparam = p.attachment;
		if (typeof p.FILE !== 'undefined') vparam = p.FILE;
		if (typeof p.attachmentName !== 'undefined') vparam = p.attachmentName;

		var download_param = vparam.toLowerCase(),
			download_uri = elm.pathname.toLowerCase();

		if (evid.length > 50) evid = evid.substring(0,22) + "..." + evid.substring(evid.length - 25, evid.length);
		var optionalAttribute = evLinkTitle + '-_-null-_-null-_-null-_-' + evAction.toLowerCase() + '-_-' + evLinkTitle + '-_-null-_--_--_-' + pageid;
		//console.log(evid)

		// download_tracking and page_click
		if (this.domainTest(hostName)) {

			if (this.match(download_uri) || this.match(download_param)) {
				var ttl = "",
					text = document.all? elm.innerText : elm.text,
					img = this.findElm(e, 'img'),
					coremetricsParam = '';

				if (img.alt) ttl = img.alt;
				else if (text) ttl = text;
				else if (elm.innerHTML) ttl = elm.innerHTML;

				if (vparam == "none") {
					
					coremetricsParam = evAction.toLowerCase() + '-_-' + optionalAttribute;
					
					if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(evid.toLowerCase(), 'download', 'download'+ '-_-' + coremetricsParam);

					//this.pause(200);

				} else {

					coremetricsParam = download_param + '-_-' + optionalAttribute;
					
					if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(download_param, 'download', 'download'+ '-_-' + coremetricsParam);

					//this.pause(200);
				}

			} else {

				var pageClickParams = 'page click' + '-_-' + evAction + '-_-' + evLinkTitle + '-_-null-_-null-_-null-_-' + evAction.toLowerCase() + '-_-' + evLinkTitle + '-_-null-_-';

				/*pageClickParams += (typeof p.lnk !== 'undefined')? p.lnk + '-_-' : '-_-';
				pageClickParams += (typeof p.lm !== 'undefined')? p.lm + '-_-' : '-_-';
				pageClickParams += (typeof p.lot !== 'undefined')? p.lot + '-_-' : '-_-';
				pageClickParams += (typeof p.lsot !== 'undefined')? p.lsot + '-_-' : '-_-';

				if (typeof p.lpg !== 'undefined') pageClickParams += p.lpg;*/
				
				pageClickParams += '-_--_-' + pageid;

				if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(evid.toLowerCase(), 'page click', pageClickParams);

				//this.pause(200);
			}
		}

		// offsite_tracking
		if ((hostName.length > 0) && (prtcl.indexOf("http") == 0 || prtcl.indexOf("mailto") == 0) && (!this.domainTest(hostName))) {

			if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(evid.toLowerCase(), 'external link', 'external link' + '-_-' + evAction + '-_-' + optionalAttribute);

			//this.pause(200);
		}
	},

	utilstatsHelper: function(e) {
		// check if builder has specified page title already
		if(!e.ibmEvLinkTitle && !e.ibmEvLinktitle){
			// no, so let's get it and add
			// get title of this page
			var h1Element = dojo.query('h1:first');
			if(h1Element.length > 0 && h1Element[0].innerHTML){
				// mixin with object provided by builder
				dojo.mixin(e, { 'ibmEvLinkTitle': h1Element[0].innerHTML });
			}
		}
		
		if (!e.ibmEvGroup) e.ibmEvGroup = 'null';
		if (!e.ibmEvName) e.ibmEvName = 'null';
		if (!e.ibmEvModule) e.ibmEvModule = 'null';
		if (!e.ibmEvSection) e.ibmEvSection = 'null';
		if (!e.ibmEvTarget) e.ibmEvTarget = 'null';
		if (!e.ibmEvFileSize) e.ibmEvFileSize = 'null';
		if (!e.ibmEvLinkTitle) e.ibmEvLinkTitle = 'null';

		// and now just call ibmStats.event()
		ibmStats.event(e);
	},

	init: function() {
		//if (window.location.href.indexOf('.ibm.com/support/servicerequest') >= 0) return;

		var _this = this,
			_conf = ibmweb.config.w3_eluminate;
		
		_conf.enabled = true;
		
		// set QueryString
		this.create_QueryString();

		// set WebAnalitics
		if (typeof(window.WebAnalytics) == 'undefined') window.WebAnalytics = {Page: {PageIdentifier: window.location.href}};

		// set digitalData
		if (typeof(window.digitalData) == 'undefined') window.digitalData = {};

		// set siteID from meta IBM.WTMSite
		if (typeof _conf.siteID === "undefined") {_conf.siteID = String(dojo.query("meta[name='IBM.WTMSite']").attr("content"));}

		// set siteID from meta WTMSite
		if(_conf.siteID.length == 0) {_conf.siteID = String(dojo.query("meta[name='WTMSite']").attr("content"));}
		
		//set siteID from meta IBM.WTMCategory
       /* if (_conf.siteID.length == 0 && String(dojo.query("meta[name='IBM.WTMCategory']").attr("content")) != null ){
        	_conf.siteID = String(dojo.query("meta[name='IBM.WTMCategory']").attr("content"));
        }*/
        
		// set siteID from digitalData siteID or categoryID
		if(_conf.siteID.length == 0 && typeof digitalData.page !== "undefined") {
			//for old DDO structure
			if (typeof digitalData.page.site !== "undefined" && typeof digitalData.page.site.siteID !== "undefined") {_conf.siteID = digitalData.page.site.siteID;}
			//for new DDO structure
			if (_conf.siteID.length == 0 && typeof digitalData.page.pageInfo !== "undefined" && typeof digitalData.page.pageInfo.ibm !== "undefined" && typeof digitalData.page.pageInfo.ibm.siteID !== "undefined") {
				_conf.siteID = digitalData.page.pageInfo.ibm.siteID;
	        }
			
			//for old DDO structure
			/*if (_conf.siteID.length == 0 && typeof digitalData.page.category !== "undefined" && typeof digitalData.page.category.categoryID !== "undefined") {
				_conf.siteID = digitalData.page.category.categoryID;
			}
			//for new DDO structure
			if (_conf.siteID.length == 0 && typeof digitalData.page.category !== "undefined" && typeof digitalData.page.category.primaryCategory !== "undefined") {
				_conf.siteID = digitalData.page.category.primaryCategory;
			}*/
		}

		// set siteID on default value
		if(_conf.siteID.length == 0) {_conf.siteID = "IBMTESTW3";}
		
		_conf.cmSetClientID.id = _conf.CID + "|" + _conf.siteID;
		
		// set cmTagQueue
		if (typeof(window.cmTagQueue) == 'undefined')  window.cmTagQueue = [];
		
		//if the site id starts or ends with "test" set the client as 802
		if(_conf.siteID.substring(0, 4).toLowerCase() == "test" || _conf.siteID.substring(_conf.siteID.length-4, _conf.siteID.length).toLowerCase() == "test"){
			window.cmTagQueue.push(['cmSetClientID', '81040000|'+_conf.siteID, false, 'testdata.coremetrics.com', _conf.cmSetClientID.cookieDomain]);
		}else{
			window.cmTagQueue.push(['cmSetClientID', _conf.cmSetClientID.id, _conf.cmSetClientID.managedFirstParty, _conf.cmSetClientID.dataCollectionDomain, _conf.cmSetClientID.cookieDomain]);
		}
		window.cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true}]);
		
		// loading w3_eluminate
		(function() {
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', '//libs.coremetrics.com/eluminate.js');
			document.getElementsByTagName('head')[0].appendChild(script);
			
			window.loadingTime = new Date().getTime();
			window.eluminateLoaded = true;
		})();
		
		// coremetrics event functions
		dojo.addOnLoad(function(){
			// for download and offset tracking
			//dojo.connect(dojo.body(),"onclick",ibmweb.w3_eluminate,ibmweb.w3_eluminate.download_and_offset_tracking);
			dojo.connect(dojo.body(), "onclick", function(e) {
				var ev = (e.target)? e.target : ((e.srcElement)? e.srcElement : e.delegateTarget); //added to prevent duplicate element tag while ibmStats.event presents
					
				if (typeof ev !== 'undefined' || ev != null) {
					if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
					{ 
						var switcher = false;
						for (var att in ev.attributes)
						{	
							if (ev.attributes[att].name == 'onclick' && ev.attributes[att].value.indexOf('ibmStats.event') > -1 )
							{
								switcher = true;
								break;
							}
						}
						if (switcher != true) 
						{
							_this.download_and_offset_tracking(e);
						}
					}
					else
					{
						var statsEvent = (ev.getAttribute("onclick") !== null) ? (ev.getAttribute("onclick").indexOf("ibmStats.event")) : -1;
						if(statsEvent === -1) 
						{
							_this.download_and_offset_tracking(e);
						}

					}
				}
			});
			
			// for right click tracking
			dojo.connect(dojo.body(), "onmousedown", function(e) {
				if ((typeof(e.which) !== 'undefined' && e.which == 3) || (typeof(e.button) !== 'undefined' && e.button == 2)) _this.right_click_tracking(e);
			});

			// for middle click tracking
			dojo.connect(dojo.body(), "onmouseup", function(e) {
				if ((typeof(e.which) !== 'undefined' && e.which == 2) || (typeof(e.button) !== 'undefined' && e.button == 4)) _this.download_and_offset_tracking(e);
			});
		});
	}
};

//if (ibmweb.config.config == 'w3' && navigator.userAgent.toLowerCase().indexOf('msie') == -1) {
if (ibmweb.config.config == 'w3') {

	if (navigator.platform.search('AIX') < 0) { // we disabling coremetrics for AIX server

		cmSetClientID = function(){};
		if (typeof(window.w3_eluminate_enabled) !=='undefined') {
			// we search if this variable is set on false
			if (!window.w3_eluminate_enabled) {/*do nothing*/}
			else ibmweb.w3_eluminate.init();
		} else {
			// we are enebled for all pages
			ibmweb.w3_eluminate.init();
		}
	}
}