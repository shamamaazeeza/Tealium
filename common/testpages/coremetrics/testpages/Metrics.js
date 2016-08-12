/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["w3search.es.Metrics"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["w3search.es.Metrics"] = true;
dojo.provide("w3search.es.Metrics");

dojo.declare("w3search.es.Metrics", null, {
	
	ibmSrchName: "w3SearchR1",
	ibmSrchTerm: "",
	ibmSrchTermRewrite: "",
	ibmSrchTermSyntax: "",
	ibmSrchFilters: "",
	ibmScrhSocTag: "",
	ibmSrchRslts: "",
	ibmSrchRsltsSM: "",
	ibmSrchDYM: "",
	ibmSrchDYMTerm: "",
	ibmSrchRsltsPg: "",
	ibmSrchHpp: "",
	ibmSrchRsltsOrdr: "",
	ibmSrchScope: "w3",
	ibmSrchLang: "all",
	ibmSrchCountry: "all",
	ibmSrchContent: "all",
	ibmSrchDate: "any",
	ibmSrchCDate: "",
	ibmSrchAlert: "",
	ibmWTMCategory: "SEARCH:W3R1:queries",
	ibmWTMSite: "P023",
	hkey: "",
	referrer: "",
	
	addScript : function(arrSrc){
		dojo.forEach(arrSrc, function(src, i){
			scriptNodeEventHandler = document.createElement('script');
			scriptNodeEventHandler.src = src;
			scriptNodeEventHandler.type = 'text/javascript';
			document.getElementsByTagName('head')[0].appendChild(scriptNodeEventHandler);
		});
	},
	
	isScriptAlreadyIncluded : function(src){
	    var scripts = document.getElementsByTagName("script");
	    for(var i = 0; i < scripts.length; i++) 
	       if(scripts[i].getAttribute('src') == src) return true;
	    return false;
	},
	
	updateQueryParams: function(params) {
	
		this.setIBMSrchTerm(encodeURIComponent(params.getQuery())); 
		this.setIBMSrchRslts(params.getTotalResults());
		this.setIBMSrchTermRewrite(encodeURIComponent(params.getCorrectedQuery()));
		this.setIBMSrchTermSyntax(encodeURIComponent(params.getCorrectedQuery()));
		this.setIBMSrchFilters(params.getFilter());
		this.setIBMScrhSocTag(params.getTags());
		//this.setIBMSrchRsltsSM("1");
		//this.setIBMSrchRsltsPg("1");
		this.setIBMSrchHpp(params.getNumResults()); 
		this.setIBMSrchRsltsOrdr(params.getSortby());
		this.setIBMSrchScope(params.getRScope());
		
		if ((params.getLangArr() != null) && (params.getLangArr().length != 0)){
			this.setIBMSrchLang(params.getLangArr());
		}
		else {
			this.setIBMSrchLang("all");
		}
		
		if ((params.getCtryArr() != null) && (params.getCtryArr().length != 0)){
			this.setIBMSrchCountry(params.getCtryArr());
		}
		else {
			this.setIBMSrchCountry("all");
		}
		
		if ((params.getCtArr() != null) && (params.getCtArr().length != 0)){
			this.setIBMSrchContent(params.getCtArr());
		}
		else {
			this.setIBMSrchContent("all");
		}
		
		if ((params.getSelectedDateFilter() != null) && (params.getSelectedDateFilter() != "")){
			this.setIBMSrchDate(params.getSelectedDateFilter());
		}
		else {
			this.setIBMSrchDate("any");
		}
		
		if ((params.getDateRange() != null) && (params.getDateRange() != "")){
			this.setIBMSrchCDate(params.getDateRange());
		}
		
		//this.setIBMSrchAlert("999");	
	},
	
	// Summary: creates pageview tags to capture metrics on each page refresh
	createPageViewTag: function() {
		window.NTPT_PGEXTRA = new String();
		
		console.info("--- Begin Unica Pageview Tag ---");
		
		// Update query params
		this.updateQueryParams(dijit.byId(w3search.es.properties.searchBoxNodeId).getParams());
		
		NTPT_PGEXTRA = "ibmSrchName="+this.getIBMSrchName()
			+"&ibmSrchTerm="+this.getIBMSrchTerm()
			+"&ibmSrchTermRewrite="+this.getIBMSrchTermRewrite()
			+"&ibmSrchTermSyntax="+this.getIBMSrchTermSyntax()
			+"&ibmSrchFilters="+this.getIBMSrchFilters()
			+"&ibmScrhSocTag="+this.getIBMScrhSocTag()
			+"&ibmSrchRslts="+this.getIBMSrchRslts()
			+"&ibmSrchRsltsSM="+this.getIBMSrchRsltsSM()
			+"&ibmSrchDYM="+this.getIBMSrchDYM()
			+"&ibmSrchDYMTerm="+this.getIBMSrchDYMTerm()
			+"&ibmSrchRsltsPg="+this.getIBMSrchRsltsPg()
			+"&ibmSrchHpp="+this.getIBMSrchHpp()
			+"&ibmSrchRsltsOrdr="+this.getIBMSrchRsltsOrdr()
			+"&ibmSrchScope="+this.getIBMSrchScope()
			+"&ibmSrchLang="+this.getIBMSrchLang()
			+"&ibmSrchCountry="+this.getIBMSrchCountry()
			+"&ibmSrchContent="+this.getIBMSrchContent()
			+"&ibmSrchDate="+this.getIBMSrchDate()
			+"&ibmSrchCDate="+this.getIBMSrchCDate()
			+"&ibmSrchAlert="+this.getIBMSrchAlert()	
			+"&hkey="+this.getHkey()
			+"&ibm.WTMCategory="+this.getIBMWTMCategory()
			+"&ibm.WTMSite="+this.getIBMWTMSite();
		
		console.info("NTPT_PGEXTRA = " + NTPT_PGEXTRA);
		
		var nonEluminateURL = 'http://www.ibm.com/common/stats/w3_nondojo_eluminate.js';
		if(location.hostname == 'localhost.ibm.com' || location.hostname == 'w3search1.boulder.ibm.com'){
			nonEluminateURL = 'http://webdev.webmaster.ibm.com/coremetrics/w3data_collection/w3_nondojo_eluminate.js';
		}
		
		var jsLoaded = this.isScriptAlreadyIncluded(nonEluminateURL);
		if(this.getIBMWTMSite().toLowerCase() === "p023" && (!jsLoaded)){
			this.addScript([nonEluminateURL]);
		}
		// --- End Search specific variables ---
	
		
		/* Unica Page Tagging Script v7.4.0
		 * Copyright 2004-2006 Unica Corporation.  All rights reserved.
		 * Visit http://www.unica.com for more information.
		 */

		var NTPT_NOINITIALTAG = true;
		var NTPT_IMGSRC = '//pt200204.unica.com/ntpagetag.gif';

		var NTPT_FLDS = new Object();
		NTPT_FLDS.lc = true; // Document location
		NTPT_FLDS.rf = true; // Document referrer
		NTPT_FLDS.rs = true; // User's screen resolution
		NTPT_FLDS.cd = true; // User's color depth
		NTPT_FLDS.ln = true; // Browser language
		NTPT_FLDS.tz = true; // User's timezone
		NTPT_FLDS.jv = true; // Browser's Java support
		NTPT_FLDS.ck = true; // Cookies

		var NTPT_MAXTAGWAIT = 1.0; // Max delay (secs) on link-tags and submit-tags

		// Optional variables:
		var NTPT_HTTPSIMGSRC = '//pt200204.unica.com/ntpagetag.gif';
		var NTPT_GLBLREFTOP = false;
		var NTPT_SET_IDCOOKIE = true;
		var NTPT_IDCOOKIE_NAME = 'UnicaNIODID';
		var NTPT_IDCOOKIE_DOMAIN = ".ibm.com";
		var NTPT_DOWNLOADTYPES="doc,dot,exe,flv,jpg,mov,mp3,pdf,pps,ppt,rss,sh,swf,tar,txt,wmv,xls,xml,zip ,avi,eps,gif,lwp,mas,mp4,pot,prz,rtf,wav,wma,123,odt,ott,sxw,stw,docx,odp,otp,sxi,sti,pptx,ods,ots,sxc,stc,xlsx";
		var NTPT_DOMAINLIST=".ibm.com,.lotus.com,.lotuslive.com,.webdialogs.com";
		var NTPT_GLBLCOOKIES = [ ];

		// Needed because of the initial redirect on the html template
		var myReferrer = document.referrer;
		if (this.getReferrer() != "") {
			myReferrer = this.getReferrer();
		}
		
		// Filter out the hash from the document location url
		var myLocation = document.location.href;
		myLocation = myLocation.replace(/search\?\#/g, 'search?');
		myLocation = myLocation.replace(/search\#/g, 'search?');
		
		/*** END OF USER-CONFIGURABLE VARIABLES ***/
		function OOOO000(OO0O00,O0O0O,O000OOO,OO0O00O){var O00O0="";O00O0=OO0O00+"\x3d"+escape(O0O0O)+"\x3b";if(OO0O00O)O00O0+="\x20\x64\x6f\x6d\x61\x69\x6e\x3d"+OO0O00O+"\x3b";if(O000OOO>(0x1d65+435-0x1f18)){var OOO00O=new Date();OOO00O.setTime(OOO00O.getTime()+(O000OOO*(0x9a6+2102-0xdf4)));O00O0+="\x20\x65\x78\x70\x69\x72\x65\x73\x3d"+OOO00O.toGMTString()+"\x3b";}O00O0+="\x20\x70\x61\x74\x68\x3d\x2f";document.cookie=O00O0;};function OOOO00(OO0O00){var O0O0O0O=OO0O00+"\x3d";if(document.cookie.length>(0x162f+0-0x162f)){var OO0000;OO0000=document.cookie.indexOf(O0O0O0O);if(OO0000!=-(0x106+5772-0x1791)){var OOO000;OO0000+=O0O0O0O.length;OOO000=document.cookie.indexOf("\x3b",OO0000);if(OOO000==-(0x129c+4910-0x25c9))OOO000=document.cookie.length;return unescape(document.cookie.substring(OO0000,OOO000));}else{return null;};}};function O00000O(O0OO0){var OO000O="";for(OO00O in O0OO0){if((typeof(O0OO0[OO00O])=="\x73\x74\x72\x69\x6e\x67")&&(O0OO0[OO00O]!="")){if(OO000O!="")OO000O+="\x3b";OO000O+=OO00O+"\x3d"+O0OO0[OO00O];};}return OO000O;};var O00OOO=["\x41","\x42","\x43","\x44","\x45","\x46","\x47","\x48","\x49","\x4a","\x4b","\x4c","\x4d","\x4e","\x4f","\x50","\x51","\x52","\x53","\x54","\x55","\x56","\x57","\x58","\x59","\x5a","\x61","\x62","\x63","\x64","\x65","\x66","\x67","\x68","\x69","\x6a","\x6b","\x6c","\x6d","\x6e","\x6f","\x70","\x71","\x72","\x73","\x74","\x75","\x76","\x77","\x78","\x79","\x7a","\x30","\x31","\x32","\x33","\x34","\x35","\x36","\x37","\x38","\x39"];
		function OOOOOO0(O00000){if(O00000<(0x41+9084-0x237f)){return O00OOO[O00000];}else{return(OOOOOO0(Math.floor(O00000/(0x1163+644-0x13a9)))+O00OOO[O00000%(0x1c5c+1570-0x2240)]);}};function O0O000O(){var OO0OO0O="";var OOOOO00=new Date();for(OOO0O0O=(0x13b0+769-0x16b1);OOO0O0O<(0x26f+3070-0xe62);OOO0O0O++){OO0OO0O+=O00OOO[Math.round(Math.random()*(0xb62+1003-0xf10))];}return(OO0OO0O+"\x2d"+OOOOOO0(OOOOO00.getTime()));};function OO0OO(O0O0000,OOO0O00){return(eval("\x74\x79\x70\x65\x6f\x66\x20"+O0O0000+"\x20\x21\x3d\x20\x22\x75\x6e\x64\x65\x66\x69\x6e\x65\x64\x22")?eval(O0O0000):OOO0O00);};function OO0O000(O00OOO0,O0O000){return(O00OOO0+(((O00OOO0=='')||((O0O000=='')||(O0O000.substring((0x1dc9+2039-0x25c0),(0x1442+4474-0x25bb))=="\x26")))?'':"\x26")+O0O000);};function O000O00(){var O0O00O=new Date();return(O0O00O.getTime()+"\x2e"+Math.floor(Math.random()*(0xed9+1573-0x1116)));};function O00OO(OO0O00,OO0OO00){OOO00[OO0O00]=OO0OO00.toString();};function O0OO0O0(OO0O00){OOO00[OO0O00]='';};function OOO0000(O000O){var O0OO0O='',OO00O,O0O0O;OO00OO(OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x45\x58\x54\x52\x41",''));if(!LnkLck)OO00OO(OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x45\x58\x54\x52\x41",''));OO00OO(O000O);for(OO00O in OOO00){O0O0O=OOO00[OO00O];if(typeof(O0O0O)=="\x73\x74\x72\x69\x6e\x67"){if(O0O0O&&(O0O0O!=''))O0OO0O=OO0O000(O0OO0O,(OO00O+"\x3d"+(self.encodeURIComponent?encodeURIComponent(O0O0O):escape(O0O0O))));};}return O0OO0O;};function O000000(){
		var OO00O;OOOOO0.OOO00=new Array();for(OO00O in OOO00)OOOOO0.OOO00[OO00O]=OOO00[OO00O];};function OOO00OO(){var OO00O;OOO00=new Array();for(OO00O in OOOOO0.OOO00)OOO00[OO00O]=OOOOO0.OOO00[OO00O];};function OO0O0OO(O00O00,O0OOOO0,O000OO){if(OOOO0[O00O00]!=null){var O000O0=new
		Function(O0OOOO0);OOOO0[O00O00].onload=O000O0;OOOO0[O00O00].onerror=O000O0;OOOO0[O00O00].onabort=O000O0;}setTimeout(O0OOOO0,(O000OO*(0x5f3+3206-0xe91)));};function O0O00O0(O0OOOO,OO0O0O){if(O0OOOO=='')return;O0000=((O0000+(0x1312+1405-0x188e))%OOOO0.length);if(OOOO0[O0000]==null)OOOO0[O0000]=new Image((0x1005+4276-0x20b8),(0x1208+715-0x14d2));OOOO0[O0000].src=O0OOOO+"\x3f"+OO0O0O;};function OOOOO0O(O000O){var O0OOOO;var OO0O0O;if((O00O00O!='')&&(document.location.protocol=="\x68\x74\x74\x70\x73\x3a"))O0OOOO=O00O00O;else O0OOOO=O0000OO;OO0O0O=OOO0000(O000O);O0O00O0(O0OOOO,OO0O0O);OOO00OO();};function OO00OO(O000O){var OO00O0;var O00O0O;if(!O000O)return;O000O=O000O.toString();if(O000O=='')return;OO00O0=O000O.split("\x26");for(O00O0O=(0xdc+1230-0x5aa);O00O0O<OO00O0.length;O00O0O++){var OOO0O0=OO00O0[O00O0O].split("\x3d");if(OOO0O0.length==(0x83d+4370-0x194d))O00OO(OOO0O0[(0x1240+5137-0x2651)],(self.decodeURIComponent?decodeURIComponent(OOO0O0[(0xa7d+3816-0x1964)]):unescape(OOO0O0[(0xd8f+2979-0x1931)])));}};function O0O0OO(O000O){O00OO("\x65\x74\x73",O000O00());OOOOO0O(O000O);return true;};function O00OO0O(OOOOO,O000O,O000OO){var O0OOO;if(!OOOOO||!OOOOO.href)return true;if(LnkLck)return false;LnkLck=OOOOO;if(OO000.lc)O00OO("\x6c\x63",OOOOO.href);if(OO000.rf){if(!O0OO000||!top||!top.document)O00OO("\x72\x66",myLocation);}O0O0OO(O000O);if(O000OO)O0OOO=O000OO;else O0OOO=NTPT_MAXTAGWAIT;
		if(O0OOO>(0x659+6874-0x2133)){var OOOOOO;if(OOOOO.click){OOOOO.tmpclck=OOOOO.onclick;OOOOO.onclick=null;OOOOOO="\x69\x66\x20\x28\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x29\x20\x7b\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x63\x6c\x69\x63\x6b\x28\x29\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x6f\x6e\x63\x6c\x69\x63\x6b\x20\x3d\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x74\x6d\x70\x63\x6c\x63\x6b\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d";}else OOOOOO="\x69\x66\x20\x28\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x29\x20\x7b\x20\x77\x69\x6e\x64\x6f\x77\x2e\x6c\x6f\x63\x61\x74\x69\x6f\x6e\x2e\x68\x72\x65\x66\x20\x3d\x20\x22"+OOOOO.href+"\x22\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d";OO0O0OO(O0000,OOOOOO,O0OOO);return false;}LnkLck=null;return true;};function O000OO0(OO0OOO,O000O,O000OO){var O0OOO;if(!OO0OOO||!OO0OOO.submit)return true;if(FrmLck)return false;FrmLck=OO0OOO;O0O0OO(O000O);if(O000OO)O0OOO=O000OO;else O0OOO=NTPT_MAXTAGWAIT;if(O0OOO>(0x1497+4406-0x25cd)){OO0OOO.tmpsbmt=OO0OOO.onsubmit;OO0OOO.onsubmit=null;OO0O0OO(O0000,"\x69\x66\x20\x28\x20\x46\x72\x6d\x4c\x63\x6b\x20\x29\x20\x7b\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x73\x75\x62\x6d\x69\x74\x28\x29\x3b\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x6f\x6e\x73\x75\x62\x6d\x69\x74\x20\x3d\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x74\x6d\x70\x73\x62\x6d\x74\x3b\x20\x46\x72\x6d\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d",O0OOO);return false;}FrmLck=null;return true;};var O0000OO=NTPT_IMGSRC;var OO000=NTPT_FLDS;
		var O00OO0=OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x43\x4f\x4f\x4b\x49\x45\x53",null);var OOOO0O=OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x43\x4f\x4f\x4b\x49\x45\x53",null);var OOO00O0=OO0OO("\x4e\x54\x50\x54\x5f\x53\x45\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45",false);var OO0OO0=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x4e\x41\x4d\x45","\x53\x61\x6e\x65\x49\x44");var OO00O00=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x44\x4f\x4d\x41\x49\x4e",null);var OO0OOOO=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x45\x58\x50\x49\x52\x45",155520000);var O00O00O=OO0OO("\x4e\x54\x50\x54\x5f\x48\x54\x54\x50\x53\x49\x4d\x47\x53\x52\x43",'');var O0OO000=OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x52\x45\x46\x54\x4f\x50",OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x52\x45\x46\x54\x4f\x50",false));var OO00000=OO0OO("\x4e\x54\x50\x54\x5f\x4e\x4f\x49\x4e\x49\x54\x49\x41\x4c\x54\x41\x47",false);var ntptAddPair=O00OO;var ntptDropPair=O0OO0O0;var ntptEventTag=O0O0OO;var ntptLinkTag=O00OO0O;var ntptSubmitTag=O000OO0;var OOO00=new Array();
		var OOOOO0=new Object();var OOOO0=Array((0x317+3540-0x10e1));var O0000;for(O0000=(0x1584+3590-0x238a);O0000<OOOO0.length;O0000++)OOOO0[O0000]=null;var LnkLck=null;var FrmLck=null;O00OO("\x6a\x73","\x31");O00OO("\x74\x73",O000O00());if(OO000.lc)O00OO("\x6c\x63",myLocation);if(OO000.rf){var OOO0OO;if(O0OO000&&top&&top.document)OOO0OO=myReferrer;else OOO0OO=myReferrer;O00OO("\x72\x66",OOO0OO);}if(self.screen){if(OO000.rs)O00OO("\x72\x73",self.screen.width+"\x78"+self.screen.height);if(OO000.cd)O00OO("\x63\x64",self.screen.colorDepth);}if(OO000.ln){var OOO0O;if(navigator.language)OOO0O=navigator.language;else if(navigator.userLanguage)OOO0O=navigator.userLanguage;else OOO0O='';if(OOO0O.length>(0x462+2203-0xcfb))OOO0O=OOO0O.substring((0xe45+3555-0x1c28),(0x186+8395-0x224f));OOO0O=OOO0O.toLowerCase();O00OO("\x6c\x6e",OOO0O);}if(OO000.tz){var OO0O0;var O0O00O=new Date();var O0O00=O0O00O.getTimezoneOffset();var O0OO00;OO0O0="\x47\x4d\x54";if(O0O00!=(0x1214+4348-0x2310)){if(O0O00>(0x773+6772-0x21e7))OO0O0+="\x20\x2d";else OO0O0+="\x20\x2b";O0O00=Math.abs(O0O00);O0OO00=Math.floor(O0O00/(0x878+3391-0x157b));
		O0O00-=O0OO00*(0xc3b+4046-0x1bcd);if(O0OO00<(0x13e6+969-0x17a5))OO0O0+="\x30";OO0O0+=O0OO00+"\x3a";if(O0O00<(0xba1+208-0xc67))OO0O0+="\x30";OO0O0+=O0O00;}O00OO("\x74\x7a",OO0O0);}if(OO000.jv){var O0000O;if(navigator.javaEnabled())O0000O="\x31";else O0000O="\x30";O00OO("\x6a\x76",O0000O);}var O0OO0=new Array();var O00O0OO=false;if(OO000.ck){var O0O0O0;var O00O0,O0OOO0;if(O00OO0){for(O0O0O0=(0x87a+7306-0x2504);O0O0O0<O00OO0.length;O0O0O0++){O0OO0[O00OO0[O0O0O0]]="";};}if(OOOO0O){for(O0O0O0=(0x1b2a+931-0x1ecd);O0O0O0<OOOO0O.length;O0O0O0++){O0OO0[OOOO0O[O0O0O0]]="";};}for(OO00O in O0OO0){O00O0=OOOO00(OO00O);if(O00O0){O0OO0[OO00O]=O00O0;};}if(OOO00O0){O00O0=OOOO00(OO0OO0);if(O00O0){O0OO0[OO0OO0]=O00O0;O00O0OO=true;};}O0OOO0=O00000O(O0OO0);if(O0OOO0!="")O00OO("\x63\x6b",O0OOO0);}O000000();if(!OO00000)OOOOO0O('');if(OOO00O0&&!O00O0OO){var O00O0=OOOO00(OO0OO0);if(!O00O0){O00O0=O0O000O();OOOO000(OO0OO0,O00O0,OO0OOOO,OO00O00);if(OO000.ck&&OOOO00(OO0OO0)){O0OO0[OO0OO0]=O00O0;var O0OOO0=O00000O(O0OO0);if(O0OOO0!=""){O00OO("\x63\x6b",O0OOO0);O000000();};};};}
		var _0x7ae1=["\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x62\x6F\x64\x79","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x61\x74\x74\x61\x63\x68\x45\x76\x65\x6E\x74","\x6F\x6E","\x4D\x53\x49\x45","\x69\x6E\x64\x65\x78\x4F\x66","\x61\x70\x70\x56\x65\x72\x73\x69\x6F\x6E","\x63\x6C\x69\x63\x6B","\x6D\x6F\x75\x73\x65\x64\x6F\x77\x6E","\x70\x61\x72\x61\x6D\x73","\x6C\x65\x6E\x67\x74\x68","\x73\x65\x61\x72\x63\x68","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x20","\x72\x65\x70\x6C\x61\x63\x65","\x26","\x73\x70\x6C\x69\x74","\x3D","\x67\x65\x74","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x63\x6F\x6E\x74\x61\x69\x6E\x73","\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65","\x68\x6F\x73\x74\x6E\x61\x6D\x65","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x2C","","\x2E","\x6C\x61\x73\x74\x49\x6E\x64\x65\x78\x4F\x66","\x74\x61\x72\x67\x65\x74","\x73\x72\x63\x45\x6C\x65\x6D\x65\x6E\x74","\x70\x61\x72\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74","\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65","\x74\x61\x67\x4E\x61\x6D\x65","\x65\x76\x65\x6E\x74","\x77\x68\x69\x63\x68","\x6E\x75\x6D\x62\x65\x72","\x41","\x68\x72\x65\x66","\x3A","\x3F","\x61\x74\x74\x61\x63\x68\x6D\x65\x6E\x74","\x6E\x6F\x6E\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2F","\x70\x72\x6F\x74\x6F\x63\x6F\x6C","\x61\x6C\x6C","\x69\x6E\x6E\x65\x72\x54\x65\x78\x74","\x74\x65\x78\x74","\x49\x4D\x47","\x61\x6C\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x66\x74\x70\x3A","\x73\x75\x62\x73\x74\x72","\x69\x62\x6D\x45\x76\x41\x63\x74\x69\x6F\x6E\x3D","\x26\x65\x76\x3D\x64\x6F\x77\x6E\x6C\x6F\x61\x64","\x68\x74\x74\x70","\x6D\x61\x69\x6C\x74\x6F","\x65\x76\x3D\x65\x78\x74\x65\x72\x6E\x61\x6C\x20\x6C\x69\x6E\x6B\x26\x69\x62\x6D\x45\x76\x41\x63\x74\x69\x6F\x6E\x3D","\x62\x75\x74\x74\x6F\x6E","\x53\x61\x66\x61\x72\x69","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64"];
		var evhndlr=true;function turn_eh_off(){evhndlr=false;} ;function bind_event(_0x3e30x4,_0x3e30x5){if(( typeof (_0x3e30x5)==_0x7ae1[0])&&document[_0x7ae1[1]]){if(document[_0x7ae1[1]][_0x7ae1[2]]){document[_0x7ae1[1]][_0x7ae1[2]](_0x3e30x4,_0x3e30x5,true);} else {if(document[_0x7ae1[1]][_0x7ae1[3]]){document[_0x7ae1[1]][_0x7ae1[3]](_0x7ae1[4]+_0x3e30x4,_0x3e30x5);} ;} ;} ;} ;function event_tracking(){var _0x3e30x7=(navigator[_0x7ae1[7]][_0x7ae1[6]](_0x7ae1[5])!=-1)?_0x7ae1[8]:_0x7ae1[9];bind_event(_0x3e30x7,download_tracking);bind_event(_0x3e30x7,offsite_tracking);bind_event(_0x3e30x7,right_click_tracking);} ;function Querystring(_0x3e30x9){this[_0x7ae1[10]]={};
		if(_0x3e30x9==null){_0x3e30x9=location[_0x7ae1[12]][_0x7ae1[13]](1,location[_0x7ae1[12]][_0x7ae1[11]]);} ;if(_0x3e30x9[_0x7ae1[11]]==0){return ;} ;_0x3e30x9=_0x3e30x9[_0x7ae1[15]](/\+/g,_0x7ae1[14]);var _0x3e30xa=_0x3e30x9[_0x7ae1[17]](_0x7ae1[16]);for(var _0x3e30xb=0;_0x3e30xb<_0x3e30xa[_0x7ae1[11]];_0x3e30xb++){var _0x3e30xc=_0x3e30xa[_0x3e30xb][_0x7ae1[17]](_0x7ae1[18]);var _0x3e30xd=decodeURIComponent(_0x3e30xc[0]);var _0x3e30xe=(_0x3e30xc[_0x7ae1[11]]==2)?decodeURIComponent(_0x3e30xc[1]):_0x3e30xd;this[_0x7ae1[10]][_0x3e30xd]=_0x3e30xe;} ;} ;Querystring[_0x7ae1[20]][_0x7ae1[19]]=function (_0x3e30xf,_0x3e30x10){var _0x3e30xe=this[_0x7ae1[10]][_0x3e30xf];return (_0x3e30xe!=null)?_0x3e30xe:_0x3e30x10;} ;Querystring[_0x7ae1[20]][_0x7ae1[21]]=function (_0x3e30xf){var _0x3e30xe=this[_0x7ae1[10]][_0x3e30xf];return (_0x3e30xe!=null);} ;function is_onsite(_0x3e30x12){if(_0x3e30x12[_0x7ae1[11]]>0){_0x3e30x12=_0x3e30x12[_0x7ae1[22]]();if(_0x3e30x12==window[_0x7ae1[24]][_0x7ae1[23]][_0x7ae1[22]]()){return true;} else {var _0x3e30x13=split_list(NTPT_DOMAINLIST);
		var _0x3e30x14=_0x3e30x13[_0x7ae1[11]];for(var _0x3e30xb=0;_0x3e30xb<_0x3e30x14;_0x3e30xb++){if(_0x3e30x12==_0x3e30x13[_0x3e30xb]||_0x3e30x12[_0x7ae1[12]](_0x3e30x13[_0x3e30xb])!=-1){return true;} ;} ;} ;} ;return false;} ;function split_list(_0x3e30x16){var _0x3e30x17=_0x3e30x16[_0x7ae1[22]]()[_0x7ae1[17]](_0x7ae1[25]);var _0x3e30x14=_0x3e30x17[_0x7ae1[11]];for(var _0x3e30xb=0;_0x3e30xb<_0x3e30x14;_0x3e30xb++){_0x3e30x17[_0x3e30xb]=_0x3e30x17[_0x3e30xb][_0x7ae1[15]](/^\s*/,_0x7ae1[26])[_0x7ae1[15]](/\s*$/,_0x7ae1[26]);} ;return _0x3e30x17;} ;function type_match(_0x3e30x19,_0x3e30x1a){var _0x3e30x1b=_0x3e30x19[_0x7ae1[13]](_0x3e30x19[_0x7ae1[28]](_0x7ae1[27])+1,_0x3e30x19[_0x7ae1[11]]);var _0x3e30x1c=split_list(_0x3e30x1a);var _0x3e30x1d=_0x3e30x1c[_0x7ae1[11]];for(var _0x3e30xb=0;_0x3e30xb<_0x3e30x1d;_0x3e30xb++){if(_0x3e30x1b==_0x3e30x1c[_0x3e30xb]){return true;} ;} ;return false;} ;function evt_element(_0x3e30x1f,_0x3e30x20){var _0x3e30x7=_0x3e30x1f[_0x7ae1[29]]||_0x3e30x1f[_0x7ae1[30]];while(_0x3e30x7[_0x7ae1[33]]&&(_0x3e30x7[_0x7ae1[33]][_0x7ae1[22]]()!=_0x3e30x20[_0x7ae1[22]]())){_0x3e30x7=_0x3e30x7[_0x7ae1[31]]||_0x3e30x7[_0x7ae1[32]];} ;return _0x3e30x7;} ;
		function download_tracking(_0x3e30x1f){_0x3e30x1f=_0x3e30x1f||(window[_0x7ae1[34]]||_0x7ae1[26]);if(_0x3e30x1f&&(( typeof (_0x3e30x1f[_0x7ae1[35]])!=_0x7ae1[36])||(_0x3e30x1f[_0x7ae1[35]]==1))){var _0x3e30x7=evt_element(_0x3e30x1f,_0x7ae1[37]);if(_0x3e30x7[_0x7ae1[38]]){var _0x3e30x22=_0x3e30x7[_0x7ae1[23]]?(_0x3e30x7[_0x7ae1[23]][_0x7ae1[17]](_0x7ae1[39])[0]):_0x7ae1[26];var _0x3e30x23=escape(_0x3e30x7[_0x7ae1[38]]);var _0x3e30x24=_0x3e30x7[_0x7ae1[12]]?_0x3e30x7[_0x7ae1[12]][_0x7ae1[13]](_0x3e30x7[_0x7ae1[12]][_0x7ae1[6]](_0x7ae1[40])+1,_0x3e30x7[_0x7ae1[12]][_0x7ae1[11]]):_0x7ae1[26];var _0x3e30x25= new Querystring(_0x3e30x24);var _0x3e30x26=_0x3e30x25[_0x7ae1[19]](_0x7ae1[41]);if(_0x3e30x26==null){_0x3e30x26=_0x7ae1[42];} ;var _0x3e30x27=_0x3e30x26[_0x7ae1[22]]();var _0x3e30x28=_0x3e30x7[_0x7ae1[43]][_0x7ae1[22]]();if(is_onsite(_0x3e30x22)&&(type_match(_0x3e30x28,NTPT_DOWNLOADTYPES)||type_match(_0x3e30x27,NTPT_DOWNLOADTYPES))){var _0x3e30x19=_0x3e30x7[_0x7ae1[43]]?((_0x3e30x7[_0x7ae1[43]][_0x7ae1[6]](_0x7ae1[44])!=0)?_0x7ae1[44]+_0x3e30x7[_0x7ae1[43]]:_0x3e30x7[_0x7ae1[43]]):_0x7ae1[44];var _0x3e30x29=_0x3e30x7[_0x7ae1[45]];var _0x3e30x2a=_0x7ae1[26];
		var _0x3e30x2b=document[_0x7ae1[46]]?_0x3e30x7[_0x7ae1[47]]:_0x3e30x7[_0x7ae1[48]];var _0x3e30x2c=evt_element(_0x3e30x1f,_0x7ae1[49]);if(_0x3e30x2c[_0x7ae1[50]]){_0x3e30x2a=_0x3e30x2c[_0x7ae1[50]];} else {if(_0x3e30x2b){_0x3e30x2a=_0x3e30x2b;} else {if(_0x3e30x7[_0x7ae1[51]]){_0x3e30x2a=_0x3e30x7[_0x7ae1[51]];} ;} ;} ;if(_0x3e30x7[_0x7ae1[45]]==_0x7ae1[52]){var _0x3e30x2d=_0x3e30x23[_0x7ae1[53]](8);} else {var _0x3e30x2d=_0x3e30x23[_0x7ae1[53]](9);} ;if(evhndlr!=false){if(_0x3e30x26==_0x7ae1[42]){ntptEventTag(_0x7ae1[54]+_0x3e30x2d[_0x7ae1[22]]()+_0x7ae1[55]);} else {ntptEventTag(_0x7ae1[54]+_0x3e30x27+_0x7ae1[55]);} ;} ;} ;} ;} ;} ;function offsite_tracking(_0x3e30x1f){_0x3e30x1f=_0x3e30x1f||(window[_0x7ae1[34]]||_0x7ae1[26]);if(_0x3e30x1f&&(( typeof (_0x3e30x1f[_0x7ae1[35]])!=_0x7ae1[36])||(_0x3e30x1f[_0x7ae1[35]]==1))){var _0x3e30x7=evt_element(_0x3e30x1f,_0x7ae1[37]);if(_0x3e30x7[_0x7ae1[38]]){var _0x3e30x22=_0x3e30x7[_0x7ae1[23]]?(_0x3e30x7[_0x7ae1[23]][_0x7ae1[17]](_0x7ae1[39])[0]):_0x7ae1[26];var _0x3e30x2f=_0x3e30x7[_0x7ae1[45]]||_0x7ae1[26];
		if((_0x3e30x22[_0x7ae1[11]]>0)&&(_0x3e30x2f[_0x7ae1[6]](_0x7ae1[56])==0||_0x3e30x2f[_0x7ae1[6]](_0x7ae1[57])==0)&&(!is_onsite(_0x3e30x22))){var _0x3e30x24=_0x3e30x7[_0x7ae1[12]]?_0x3e30x7[_0x7ae1[12]][_0x7ae1[13]](_0x3e30x7[_0x7ae1[12]][_0x7ae1[6]](_0x7ae1[40])+1,_0x3e30x7[_0x7ae1[12]][_0x7ae1[11]]):_0x7ae1[26];var _0x3e30x19=_0x3e30x7[_0x7ae1[43]]?((_0x3e30x7[_0x7ae1[43]][_0x7ae1[6]](_0x7ae1[44])!=0)?_0x7ae1[44]+_0x3e30x7[_0x7ae1[43]]:_0x3e30x7[_0x7ae1[43]]):_0x7ae1[44];var _0x3e30x23=escape(_0x3e30x7[_0x7ae1[38]]);var _0x3e30x2d=_0x3e30x23[_0x7ae1[53]](9);if(evhndlr!=false){ntptEventTag(_0x7ae1[58]+_0x3e30x2d);} ;} ;} ;} ;} ;function right_click_tracking(_0x3e30x1f){_0x3e30x1f=_0x3e30x1f||(window[_0x7ae1[34]]||_0x7ae1[26]);if(_0x3e30x1f){var _0x3e30x31=_0x3e30x1f[_0x7ae1[35]]||_0x3e30x1f[_0x7ae1[59]];if((_0x3e30x31!=1)||(navigator[_0x7ae1[61]][_0x7ae1[6]](_0x7ae1[60])!=-1)){var _0x3e30x7=evt_element(_0x3e30x1f,_0x7ae1[37]);if(( typeof (_0x3e30x7[_0x7ae1[38]])!=_0x7ae1[62])&&_0x3e30x7[_0x7ae1[38]]){if(( typeof (_0x3e30x7[_0x7ae1[45]])!=_0x7ae1[62])&&_0x3e30x7[_0x7ae1[45]]){var _0x3e30x24=_0x3e30x7[_0x7ae1[12]]?_0x3e30x7[_0x7ae1[12]][_0x7ae1[13]](_0x3e30x7[_0x7ae1[12]][_0x7ae1[6]](_0x7ae1[40])+1,_0x3e30x7[_0x7ae1[12]][_0x7ae1[11]]):_0x7ae1[26];
		var _0x3e30x25= new Querystring(_0x3e30x24);var _0x3e30x26=_0x3e30x25[_0x7ae1[19]](_0x7ae1[41]);if(_0x3e30x26==null){_0x3e30x26=_0x7ae1[42];} ;var _0x3e30x27=_0x3e30x26[_0x7ae1[22]]();var _0x3e30x28=_0x3e30x7[_0x7ae1[43]][_0x7ae1[22]]();if(( typeof (_0x3e30x7[_0x7ae1[43]])!=_0x7ae1[62])&&(type_match(_0x3e30x28,NTPT_DOWNLOADTYPES)||type_match(_0x3e30x27,NTPT_DOWNLOADTYPES))){var _0x3e30x19=_0x3e30x7[_0x7ae1[43]]?((_0x3e30x7[_0x7ae1[43]][_0x7ae1[6]](_0x7ae1[44])!=0)?_0x7ae1[44]+_0x3e30x7[_0x7ae1[43]]:_0x3e30x7[_0x7ae1[43]]):_0x7ae1[44];var _0x3e30x22=_0x3e30x7[_0x7ae1[23]]?(_0x3e30x7[_0x7ae1[23]][_0x7ae1[17]](_0x7ae1[39])[0]):_0x7ae1[26];var _0x3e30x23=escape(_0x3e30x7[_0x7ae1[38]]);if(_0x3e30x7[_0x7ae1[45]]==_0x7ae1[52]){var _0x3e30x2d=_0x3e30x23[_0x7ae1[53]](8);} else {var _0x3e30x2d=_0x3e30x23[_0x7ae1[53]](9);} ;if(evhndlr!=false){if(_0x3e30x26==_0x7ae1[42]){ntptEventTag(_0x7ae1[54]+_0x3e30x2d[_0x7ae1[22]]()+_0x7ae1[55]);} else {ntptEventTag(_0x7ae1[54]+_0x3e30x27+_0x7ae1[55]);} ;} ;} ;} ;} ;} ;} ;} ;event_tracking();
		// end of Unica code

		// Begin IBM custom code

		(function () {
			// load and parse all meta tags
			var metatags = {};
			var m = document.getElementsByTagName("meta");

			for(var i=0, j=m.length; i<j; i++) {
				if(!!m[i].name) {
					metatags[m[i].name.toLowerCase()] = m[i].content;
				}
			}

			// all meta tags are now in the metatags array
			var getMT = function(name) {
				name = name.toLowerCase();
				if(!!metatags[name]) return metatags[name];
				return null;
			};

			var checkAndAdd = function(name) {
				var c = getMT(name);
				if(!!c) ntptAddPair(name, c);
			};

			ntptAddPair("site", "w3ibmcom");
			checkAndAdd("DC.Language");
			checkAndAdd("DC.Type");
			checkAndAdd("DC.Subject");
			checkAndAdd("DC.Date");
			checkAndAdd("IBM.Industry");
			checkAndAdd("IBM.Country");
			checkAndAdd("IBM.WTMCategory");
			checkAndAdd("Owner");
			checkAndAdd("Description");
			if(!!document.title) ntptAddPair("Title", document.title);
			if(typeof(SA_ID)!='undefined'&&!!SA_ID) ntptAddPair("SA_ID", SA_ID);
			if(typeof(cm_ClientID)!='undefined'&&!!cm_ClientID) ntptAddPair("cm_ClientID", cm_ClientID);
			if(typeof(cm_groupID)!='undefined'&&!!cm_groupID) ntptAddPair("cm_groupID", cm_groupID);
			if(typeof(ibmWTMSite)!='undefined'&&!!ibmWTMSite) {
				ntptAddPair("IBM.WTMSite", ibmWTMSite);
			} else if (typeof(ibmwtmsite)!='undefined'&&!!ibmwtmsite) {
				ntptAddPair("IBM.wtmsite", ibmwtmsite);
			} else {
				checkAndAdd("IBM.WTMSite");
			}
			console.info("- Call ntptEventTag function (UNICA) -");
			ntptEventTag(this);

		}) ();
		// End IBM custom code
		
		var pageid = "";
		if (typeof (window.digitalData) != "undefined" && typeof (window.digitalData.page) != "undefined") {
	    	if(typeof (window.digitalData.page.pageInfo) != "undefined" && typeof (window.digitalData.page.pageInfo.pageID) != "undefined"){//for new DDO structure
	    		pageid = window.digitalData.page.pageInfo.pageID;
	    	}else if(typeof (window.digitalData.page.pageID) != "undefined"){
	    		pageid = window.digitalData.page.pageID;
	    	}
	    }
		if (pageid === "") {
			pageid = document.location;
			pageid = pageid.toString().substring(7,pageid.length);
		}

		window.digitalData.page.pageInfo.pageID = pageid;
        window.digitalData.page.pageInfo.onsiteSearchTerm = this.getIBMSrchTerm();
        window.digitalData.page.pageInfo.onsiteSearchResult = this.getIBMSrchRslts();
        window.checkCustomAttribute && window.checkCustomAttribute();
        
        console.info("- Call bindPageViewWithAnalytics function -");
        bindPageViewWithAnalytics();
		
		console.info("--- End Unica Pageview Tag ---");
	},
	
	// Summary: creates event tags to capture metrics on link clicks
	createEventTag: function(obj) {
		
		console.info("--- Begin Unica Event Tag ---");
		
		// Update query params
		this.updateQueryParams(dijit.byId(w3search.es.properties.searchBoxNodeId).getParams());
		
		var NTPT_PGEXTRA = "ibmSrchName="+this.getIBMSrchName()
			+"&ibmSrchTerm="+this.getIBMSrchTerm()
			+"&ibmSrchTermRewrite="+this.getIBMSrchTermRewrite()
			+"&ibmSrchTermSyntax="+this.getIBMSrchTermSyntax()
			+"&ibmSrchFilters="+this.getIBMSrchFilters()
			+"&ibmScrhSocTag="+this.getIBMScrhSocTag()
			+"&ibmSrchRslts="+this.getIBMSrchRslts()
			+"&ibmSrchRsltsSM="+this.getIBMSrchRsltsSM()
			+"&ibmSrchDYM="+this.getIBMSrchDYM()
			+"&ibmSrchDYMTerm="+this.getIBMSrchDYMTerm()
			+"&ibmSrchRsltsPg="+this.getIBMSrchRsltsPg()
			+"&ibmSrchHpp="+this.getIBMSrchHpp()
			+"&ibmSrchRsltsOrdr="+this.getIBMSrchRsltsOrdr()
			+"&ibmSrchScope="+this.getIBMSrchScope()
			+"&ibmSrchLang="+this.getIBMSrchLang()
			+"&ibmSrchCountry="+this.getIBMSrchCountry()
			+"&ibmSrchContent="+this.getIBMSrchContent()
			+"&ibmSrchDate="+this.getIBMSrchDate()
			+"&ibmSrchCDate="+this.getIBMSrchCDate()
			+"&ibmSrchAlert="+this.getIBMSrchAlert()		
			+"&ibm.WTMCategory="+this.getIBMWTMCategory()
			+"&ibm.WTMSite="+this.getIBMWTMSite();
		
		console.info("NTPT_PGEXTRA = " + NTPT_PGEXTRA);
		
		// --- End Search specific variables ---
	
		
		/* Unica Page Tagging Script v7.4.0
		 * Copyright 2004-2006 Unica Corporation.  All rights reserved.
		 * Visit http://www.unica.com for more information.
		 */

		var NTPT_NOINITIALTAG = true;
		var NTPT_IMGSRC = '//pt200204.unica.com/ntpagetag.gif';

		var NTPT_FLDS = new Object();
		NTPT_FLDS.lc = true; // Document location
		NTPT_FLDS.rf = true; // Document referrer
		NTPT_FLDS.rs = true; // User's screen resolution
		NTPT_FLDS.cd = true; // User's color depth
		NTPT_FLDS.ln = true; // Browser language
		NTPT_FLDS.tz = true; // User's timezone
		NTPT_FLDS.jv = true; // Browser's Java support
		NTPT_FLDS.ck = true; // Cookies

		var NTPT_MAXTAGWAIT = 1.0; // Max delay (secs) on link-tags and submit-tags

		// Optional variables:
		var NTPT_HTTPSIMGSRC = '//pt200204.unica.com/ntpagetag.gif';
		var NTPT_GLBLREFTOP = false;
		var NTPT_SET_IDCOOKIE = true;
		var NTPT_IDCOOKIE_NAME = 'UnicaNIODID';
		var NTPT_IDCOOKIE_DOMAIN = ".ibm.com";
		var NTPT_DOWNLOADTYPES="doc,dot,exe,flv,jpg,mov,mp3,pdf,pps,ppt,rss,sh,swf,tar,txt,wmv,xls,xml,zip ,avi,eps,gif,lwp,mas,mp4,pot,prz,rtf,wav,wma,123,odt,ott,sxw,stw,docx,odp,otp,sxi,sti,pptx,ods,ots,sxc,stc,xlsx";
		var NTPT_DOMAINLIST=".ibm.com,.lotus.com,.lotuslive.com,.webdialogs.com";
		var NTPT_GLBLCOOKIES = [ ];
		
		// Needed because of the initial redirect on the html template
		var myReferrer = document.referrer;
		if (this.getReferrer() != "") {
			myReferrer = this.getReferrer();
		}
		
		// Filter out the hash from the document location url
		var myLocation = document.location.href;
		myLocation = myLocation.replace(/search\?\#/g, 'search?');
		myLocation = myLocation.replace(/search\#/g, 'search?');

		/*** END OF USER-CONFIGURABLE VARIABLES ***/
		function OOOO000(OO0O00,O0O0O,O000OOO,OO0O00O){var O00O0="";O00O0=OO0O00+"\x3d"+escape(O0O0O)+"\x3b";if(OO0O00O)O00O0+="\x20\x64\x6f\x6d\x61\x69\x6e\x3d"+OO0O00O+"\x3b";if(O000OOO>(0x1d65+435-0x1f18)){var OOO00O=new Date();OOO00O.setTime(OOO00O.getTime()+(O000OOO*(0x9a6+2102-0xdf4)));O00O0+="\x20\x65\x78\x70\x69\x72\x65\x73\x3d"+OOO00O.toGMTString()+"\x3b";}O00O0+="\x20\x70\x61\x74\x68\x3d\x2f";document.cookie=O00O0;};function OOOO00(OO0O00){var O0O0O0O=OO0O00+"\x3d";if(document.cookie.length>(0x162f+0-0x162f)){var OO0000;OO0000=document.cookie.indexOf(O0O0O0O);if(OO0000!=-(0x106+5772-0x1791)){var OOO000;OO0000+=O0O0O0O.length;OOO000=document.cookie.indexOf("\x3b",OO0000);if(OOO000==-(0x129c+4910-0x25c9))OOO000=document.cookie.length;return unescape(document.cookie.substring(OO0000,OOO000));}else{return null;};}};function O00000O(O0OO0){var OO000O="";for(OO00O in O0OO0){if((typeof(O0OO0[OO00O])=="\x73\x74\x72\x69\x6e\x67")&&(O0OO0[OO00O]!="")){if(OO000O!="")OO000O+="\x3b";OO000O+=OO00O+"\x3d"+O0OO0[OO00O];};}return OO000O;};var O00OOO=["\x41","\x42","\x43","\x44","\x45","\x46","\x47","\x48","\x49","\x4a","\x4b","\x4c","\x4d","\x4e","\x4f","\x50","\x51","\x52","\x53","\x54","\x55","\x56","\x57","\x58","\x59","\x5a","\x61","\x62","\x63","\x64","\x65","\x66","\x67","\x68","\x69","\x6a","\x6b","\x6c","\x6d","\x6e","\x6f","\x70","\x71","\x72","\x73","\x74","\x75","\x76","\x77","\x78","\x79","\x7a","\x30","\x31","\x32","\x33","\x34","\x35","\x36","\x37","\x38","\x39"];
		function OOOOOO0(O00000){if(O00000<(0x41+9084-0x237f)){return O00OOO[O00000];}else{return(OOOOOO0(Math.floor(O00000/(0x1163+644-0x13a9)))+O00OOO[O00000%(0x1c5c+1570-0x2240)]);}};function O0O000O(){var OO0OO0O="";var OOOOO00=new Date();for(OOO0O0O=(0x13b0+769-0x16b1);OOO0O0O<(0x26f+3070-0xe62);OOO0O0O++){OO0OO0O+=O00OOO[Math.round(Math.random()*(0xb62+1003-0xf10))];}return(OO0OO0O+"\x2d"+OOOOOO0(OOOOO00.getTime()));};function OO0OO(O0O0000,OOO0O00){return(eval("\x74\x79\x70\x65\x6f\x66\x20"+O0O0000+"\x20\x21\x3d\x20\x22\x75\x6e\x64\x65\x66\x69\x6e\x65\x64\x22")?eval(O0O0000):OOO0O00);};function OO0O000(O00OOO0,O0O000){return(O00OOO0+(((O00OOO0=='')||((O0O000=='')||(O0O000.substring((0x1dc9+2039-0x25c0),(0x1442+4474-0x25bb))=="\x26")))?'':"\x26")+O0O000);};function O000O00(){var O0O00O=new Date();return(O0O00O.getTime()+"\x2e"+Math.floor(Math.random()*(0xed9+1573-0x1116)));};function O00OO(OO0O00,OO0OO00){OOO00[OO0O00]=OO0OO00.toString();};function O0OO0O0(OO0O00){OOO00[OO0O00]='';};function OOO0000(O000O){var O0OO0O='',OO00O,O0O0O;OO00OO(OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x45\x58\x54\x52\x41",''));if(!LnkLck)OO00OO(OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x45\x58\x54\x52\x41",''));OO00OO(O000O);for(OO00O in OOO00){O0O0O=OOO00[OO00O];if(typeof(O0O0O)=="\x73\x74\x72\x69\x6e\x67"){if(O0O0O&&(O0O0O!=''))O0OO0O=OO0O000(O0OO0O,(OO00O+"\x3d"+(self.encodeURIComponent?encodeURIComponent(O0O0O):escape(O0O0O))));};}return O0OO0O;};function O000000(){
		var OO00O;OOOOO0.OOO00=new Array();for(OO00O in OOO00)OOOOO0.OOO00[OO00O]=OOO00[OO00O];};function OOO00OO(){var OO00O;OOO00=new Array();for(OO00O in OOOOO0.OOO00)OOO00[OO00O]=OOOOO0.OOO00[OO00O];};function OO0O0OO(O00O00,O0OOOO0,O000OO){if(OOOO0[O00O00]!=null){var O000O0=new
		Function(O0OOOO0);OOOO0[O00O00].onload=O000O0;OOOO0[O00O00].onerror=O000O0;OOOO0[O00O00].onabort=O000O0;}setTimeout(O0OOOO0,(O000OO*(0x5f3+3206-0xe91)));};function O0O00O0(O0OOOO,OO0O0O){if(O0OOOO=='')return;O0000=((O0000+(0x1312+1405-0x188e))%OOOO0.length);if(OOOO0[O0000]==null)OOOO0[O0000]=new Image((0x1005+4276-0x20b8),(0x1208+715-0x14d2));OOOO0[O0000].src=O0OOOO+"\x3f"+OO0O0O;};function OOOOO0O(O000O){var O0OOOO;var OO0O0O;if((O00O00O!='')&&(document.location.protocol=="\x68\x74\x74\x70\x73\x3a"))O0OOOO=O00O00O;else O0OOOO=O0000OO;OO0O0O=OOO0000(O000O);O0O00O0(O0OOOO,OO0O0O);OOO00OO();};function OO00OO(O000O){var OO00O0;var O00O0O;if(!O000O)return;O000O=O000O.toString();if(O000O=='')return;OO00O0=O000O.split("\x26");for(O00O0O=(0xdc+1230-0x5aa);O00O0O<OO00O0.length;O00O0O++){var OOO0O0=OO00O0[O00O0O].split("\x3d");if(OOO0O0.length==(0x83d+4370-0x194d))O00OO(OOO0O0[(0x1240+5137-0x2651)],(self.decodeURIComponent?decodeURIComponent(OOO0O0[(0xa7d+3816-0x1964)]):unescape(OOO0O0[(0xd8f+2979-0x1931)])));}};function O0O0OO(O000O){O00OO("\x65\x74\x73",O000O00());OOOOO0O(O000O);return true;};function O00OO0O(OOOOO,O000O,O000OO){var O0OOO;if(!OOOOO||!OOOOO.href)return true;if(LnkLck)return false;LnkLck=OOOOO;if(OO000.lc)O00OO("\x6c\x63",OOOOO.href);if(OO000.rf){if(!O0OO000||!top||!top.document)O00OO("\x72\x66",myLocation);}O0O0OO(O000O);if(O000OO)O0OOO=O000OO;else O0OOO=NTPT_MAXTAGWAIT;
		if(O0OOO>(0x659+6874-0x2133)){var OOOOOO;if(OOOOO.click){OOOOO.tmpclck=OOOOO.onclick;OOOOO.onclick=null;OOOOOO="\x69\x66\x20\x28\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x29\x20\x7b\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x63\x6c\x69\x63\x6b\x28\x29\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x6f\x6e\x63\x6c\x69\x63\x6b\x20\x3d\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x74\x6d\x70\x63\x6c\x63\x6b\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d";}else OOOOOO="\x69\x66\x20\x28\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x29\x20\x7b\x20\x77\x69\x6e\x64\x6f\x77\x2e\x6c\x6f\x63\x61\x74\x69\x6f\x6e\x2e\x68\x72\x65\x66\x20\x3d\x20\x22"+OOOOO.href+"\x22\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d";OO0O0OO(O0000,OOOOOO,O0OOO);return false;}LnkLck=null;return true;};function O000OO0(OO0OOO,O000O,O000OO){var O0OOO;if(!OO0OOO||!OO0OOO.submit)return true;if(FrmLck)return false;FrmLck=OO0OOO;O0O0OO(O000O);if(O000OO)O0OOO=O000OO;else O0OOO=NTPT_MAXTAGWAIT;if(O0OOO>(0x1497+4406-0x25cd)){OO0OOO.tmpsbmt=OO0OOO.onsubmit;OO0OOO.onsubmit=null;OO0O0OO(O0000,"\x69\x66\x20\x28\x20\x46\x72\x6d\x4c\x63\x6b\x20\x29\x20\x7b\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x73\x75\x62\x6d\x69\x74\x28\x29\x3b\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x6f\x6e\x73\x75\x62\x6d\x69\x74\x20\x3d\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x74\x6d\x70\x73\x62\x6d\x74\x3b\x20\x46\x72\x6d\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d",O0OOO);return false;}FrmLck=null;return true;};var O0000OO=NTPT_IMGSRC;var OO000=NTPT_FLDS;
		var O00OO0=OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x43\x4f\x4f\x4b\x49\x45\x53",null);var OOOO0O=OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x43\x4f\x4f\x4b\x49\x45\x53",null);var OOO00O0=OO0OO("\x4e\x54\x50\x54\x5f\x53\x45\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45",false);var OO0OO0=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x4e\x41\x4d\x45","\x53\x61\x6e\x65\x49\x44");var OO00O00=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x44\x4f\x4d\x41\x49\x4e",null);var OO0OOOO=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x45\x58\x50\x49\x52\x45",155520000);var O00O00O=OO0OO("\x4e\x54\x50\x54\x5f\x48\x54\x54\x50\x53\x49\x4d\x47\x53\x52\x43",'');var O0OO000=OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x52\x45\x46\x54\x4f\x50",OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x52\x45\x46\x54\x4f\x50",false));var OO00000=OO0OO("\x4e\x54\x50\x54\x5f\x4e\x4f\x49\x4e\x49\x54\x49\x41\x4c\x54\x41\x47",false);var ntptAddPair=O00OO;var ntptDropPair=O0OO0O0;var ntptEventTag=O0O0OO;var ntptLinkTag=O00OO0O;var ntptSubmitTag=O000OO0;var OOO00=new Array();
		var OOOOO0=new Object();var OOOO0=Array((0x317+3540-0x10e1));var O0000;for(O0000=(0x1584+3590-0x238a);O0000<OOOO0.length;O0000++)OOOO0[O0000]=null;var LnkLck=null;var FrmLck=null;O00OO("\x6a\x73","\x31");O00OO("\x74\x73",O000O00());if(OO000.lc)O00OO("\x6c\x63",myLocation);if(OO000.rf){var OOO0OO;if(O0OO000&&top&&top.document)OOO0OO=myReferrer;else OOO0OO=myReferrer;O00OO("\x72\x66",OOO0OO);}if(self.screen){if(OO000.rs)O00OO("\x72\x73",self.screen.width+"\x78"+self.screen.height);if(OO000.cd)O00OO("\x63\x64",self.screen.colorDepth);}if(OO000.ln){var OOO0O;if(navigator.language)OOO0O=navigator.language;else if(navigator.userLanguage)OOO0O=navigator.userLanguage;else OOO0O='';if(OOO0O.length>(0x462+2203-0xcfb))OOO0O=OOO0O.substring((0xe45+3555-0x1c28),(0x186+8395-0x224f));OOO0O=OOO0O.toLowerCase();O00OO("\x6c\x6e",OOO0O);}if(OO000.tz){var OO0O0;var O0O00O=new Date();var O0O00=O0O00O.getTimezoneOffset();var O0OO00;OO0O0="\x47\x4d\x54";if(O0O00!=(0x1214+4348-0x2310)){if(O0O00>(0x773+6772-0x21e7))OO0O0+="\x20\x2d";else OO0O0+="\x20\x2b";O0O00=Math.abs(O0O00);O0OO00=Math.floor(O0O00/(0x878+3391-0x157b));
		O0O00-=O0OO00*(0xc3b+4046-0x1bcd);if(O0OO00<(0x13e6+969-0x17a5))OO0O0+="\x30";OO0O0+=O0OO00+"\x3a";if(O0O00<(0xba1+208-0xc67))OO0O0+="\x30";OO0O0+=O0O00;}O00OO("\x74\x7a",OO0O0);}if(OO000.jv){var O0000O;if(navigator.javaEnabled())O0000O="\x31";else O0000O="\x30";O00OO("\x6a\x76",O0000O);}var O0OO0=new Array();var O00O0OO=false;if(OO000.ck){var O0O0O0;var O00O0,O0OOO0;if(O00OO0){for(O0O0O0=(0x87a+7306-0x2504);O0O0O0<O00OO0.length;O0O0O0++){O0OO0[O00OO0[O0O0O0]]="";};}if(OOOO0O){for(O0O0O0=(0x1b2a+931-0x1ecd);O0O0O0<OOOO0O.length;O0O0O0++){O0OO0[OOOO0O[O0O0O0]]="";};}for(OO00O in O0OO0){O00O0=OOOO00(OO00O);if(O00O0){O0OO0[OO00O]=O00O0;};}if(OOO00O0){O00O0=OOOO00(OO0OO0);if(O00O0){O0OO0[OO0OO0]=O00O0;O00O0OO=true;};}O0OOO0=O00000O(O0OO0);if(O0OOO0!="")O00OO("\x63\x6b",O0OOO0);}O000000();if(!OO00000)OOOOO0O('');if(OOO00O0&&!O00O0OO){var O00O0=OOOO00(OO0OO0);if(!O00O0){O00O0=O0O000O();OOOO000(OO0OO0,O00O0,OO0OOOO,OO00O00);if(OO000.ck&&OOOO00(OO0OO0)){O0OO0[OO0OO0]=O00O0;var O0OOO0=O00000O(O0OO0);if(O0OOO0!=""){O00OO("\x63\x6b",O0OOO0);O000000();};};};}
		var _0x7ae1=["\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x62\x6F\x64\x79","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x61\x74\x74\x61\x63\x68\x45\x76\x65\x6E\x74","\x6F\x6E","\x4D\x53\x49\x45","\x69\x6E\x64\x65\x78\x4F\x66","\x61\x70\x70\x56\x65\x72\x73\x69\x6F\x6E","\x63\x6C\x69\x63\x6B","\x6D\x6F\x75\x73\x65\x64\x6F\x77\x6E","\x70\x61\x72\x61\x6D\x73","\x6C\x65\x6E\x67\x74\x68","\x73\x65\x61\x72\x63\x68","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x20","\x72\x65\x70\x6C\x61\x63\x65","\x26","\x73\x70\x6C\x69\x74","\x3D","\x67\x65\x74","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x63\x6F\x6E\x74\x61\x69\x6E\x73","\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65","\x68\x6F\x73\x74\x6E\x61\x6D\x65","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x2C","","\x2E","\x6C\x61\x73\x74\x49\x6E\x64\x65\x78\x4F\x66","\x74\x61\x72\x67\x65\x74","\x73\x72\x63\x45\x6C\x65\x6D\x65\x6E\x74","\x70\x61\x72\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74","\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65","\x74\x61\x67\x4E\x61\x6D\x65","\x65\x76\x65\x6E\x74","\x77\x68\x69\x63\x68","\x6E\x75\x6D\x62\x65\x72","\x41","\x68\x72\x65\x66","\x3A","\x3F","\x61\x74\x74\x61\x63\x68\x6D\x65\x6E\x74","\x6E\x6F\x6E\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2F","\x70\x72\x6F\x74\x6F\x63\x6F\x6C","\x61\x6C\x6C","\x69\x6E\x6E\x65\x72\x54\x65\x78\x74","\x74\x65\x78\x74","\x49\x4D\x47","\x61\x6C\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x66\x74\x70\x3A","\x73\x75\x62\x73\x74\x72","\x69\x62\x6D\x45\x76\x41\x63\x74\x69\x6F\x6E\x3D","\x26\x65\x76\x3D\x64\x6F\x77\x6E\x6C\x6F\x61\x64","\x68\x74\x74\x70","\x6D\x61\x69\x6C\x74\x6F","\x65\x76\x3D\x65\x78\x74\x65\x72\x6E\x61\x6C\x20\x6C\x69\x6E\x6B\x26\x69\x62\x6D\x45\x76\x41\x63\x74\x69\x6F\x6E\x3D","\x62\x75\x74\x74\x6F\x6E","\x53\x61\x66\x61\x72\x69","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64"];
		var evhndlr=true;function turn_eh_off(){evhndlr=false;} ;function bind_event(_0x3e30x4,_0x3e30x5){if(( typeof (_0x3e30x5)==_0x7ae1[0])&&document[_0x7ae1[1]]){if(document[_0x7ae1[1]][_0x7ae1[2]]){document[_0x7ae1[1]][_0x7ae1[2]](_0x3e30x4,_0x3e30x5,true);} else {if(document[_0x7ae1[1]][_0x7ae1[3]]){document[_0x7ae1[1]][_0x7ae1[3]](_0x7ae1[4]+_0x3e30x4,_0x3e30x5);} ;} ;} ;} ;function event_tracking(){var _0x3e30x7=(navigator[_0x7ae1[7]][_0x7ae1[6]](_0x7ae1[5])!=-1)?_0x7ae1[8]:_0x7ae1[9];bind_event(_0x3e30x7,download_tracking);bind_event(_0x3e30x7,offsite_tracking);bind_event(_0x3e30x7,right_click_tracking);} ;function Querystring(_0x3e30x9){this[_0x7ae1[10]]={};
		if(_0x3e30x9==null){_0x3e30x9=location[_0x7ae1[12]][_0x7ae1[13]](1,location[_0x7ae1[12]][_0x7ae1[11]]);} ;if(_0x3e30x9[_0x7ae1[11]]==0){return ;} ;_0x3e30x9=_0x3e30x9[_0x7ae1[15]](/\+/g,_0x7ae1[14]);var _0x3e30xa=_0x3e30x9[_0x7ae1[17]](_0x7ae1[16]);for(var _0x3e30xb=0;_0x3e30xb<_0x3e30xa[_0x7ae1[11]];_0x3e30xb++){var _0x3e30xc=_0x3e30xa[_0x3e30xb][_0x7ae1[17]](_0x7ae1[18]);var _0x3e30xd=decodeURIComponent(_0x3e30xc[0]);var _0x3e30xe=(_0x3e30xc[_0x7ae1[11]]==2)?decodeURIComponent(_0x3e30xc[1]):_0x3e30xd;this[_0x7ae1[10]][_0x3e30xd]=_0x3e30xe;} ;} ;Querystring[_0x7ae1[20]][_0x7ae1[19]]=function (_0x3e30xf,_0x3e30x10){var _0x3e30xe=this[_0x7ae1[10]][_0x3e30xf];return (_0x3e30xe!=null)?_0x3e30xe:_0x3e30x10;} ;Querystring[_0x7ae1[20]][_0x7ae1[21]]=function (_0x3e30xf){var _0x3e30xe=this[_0x7ae1[10]][_0x3e30xf];return (_0x3e30xe!=null);} ;function is_onsite(_0x3e30x12){if(_0x3e30x12[_0x7ae1[11]]>0){_0x3e30x12=_0x3e30x12[_0x7ae1[22]]();if(_0x3e30x12==window[_0x7ae1[24]][_0x7ae1[23]][_0x7ae1[22]]()){return true;} else {var _0x3e30x13=split_list(NTPT_DOMAINLIST);
		var _0x3e30x14=_0x3e30x13[_0x7ae1[11]];for(var _0x3e30xb=0;_0x3e30xb<_0x3e30x14;_0x3e30xb++){if(_0x3e30x12==_0x3e30x13[_0x3e30xb]||_0x3e30x12[_0x7ae1[12]](_0x3e30x13[_0x3e30xb])!=-1){return true;} ;} ;} ;} ;return false;} ;function split_list(_0x3e30x16){var _0x3e30x17=_0x3e30x16[_0x7ae1[22]]()[_0x7ae1[17]](_0x7ae1[25]);var _0x3e30x14=_0x3e30x17[_0x7ae1[11]];for(var _0x3e30xb=0;_0x3e30xb<_0x3e30x14;_0x3e30xb++){_0x3e30x17[_0x3e30xb]=_0x3e30x17[_0x3e30xb][_0x7ae1[15]](/^\s*/,_0x7ae1[26])[_0x7ae1[15]](/\s*$/,_0x7ae1[26]);} ;return _0x3e30x17;} ;function type_match(_0x3e30x19,_0x3e30x1a){var _0x3e30x1b=_0x3e30x19[_0x7ae1[13]](_0x3e30x19[_0x7ae1[28]](_0x7ae1[27])+1,_0x3e30x19[_0x7ae1[11]]);var _0x3e30x1c=split_list(_0x3e30x1a);var _0x3e30x1d=_0x3e30x1c[_0x7ae1[11]];for(var _0x3e30xb=0;_0x3e30xb<_0x3e30x1d;_0x3e30xb++){if(_0x3e30x1b==_0x3e30x1c[_0x3e30xb]){return true;} ;} ;return false;} ;function evt_element(_0x3e30x1f,_0x3e30x20){var _0x3e30x7=_0x3e30x1f[_0x7ae1[29]]||_0x3e30x1f[_0x7ae1[30]];while(_0x3e30x7[_0x7ae1[33]]&&(_0x3e30x7[_0x7ae1[33]][_0x7ae1[22]]()!=_0x3e30x20[_0x7ae1[22]]())){_0x3e30x7=_0x3e30x7[_0x7ae1[31]]||_0x3e30x7[_0x7ae1[32]];} ;return _0x3e30x7;} ;
		function download_tracking(_0x3e30x1f){_0x3e30x1f=_0x3e30x1f||(window[_0x7ae1[34]]||_0x7ae1[26]);if(_0x3e30x1f&&(( typeof (_0x3e30x1f[_0x7ae1[35]])!=_0x7ae1[36])||(_0x3e30x1f[_0x7ae1[35]]==1))){var _0x3e30x7=evt_element(_0x3e30x1f,_0x7ae1[37]);if(_0x3e30x7[_0x7ae1[38]]){var _0x3e30x22=_0x3e30x7[_0x7ae1[23]]?(_0x3e30x7[_0x7ae1[23]][_0x7ae1[17]](_0x7ae1[39])[0]):_0x7ae1[26];var _0x3e30x23=escape(_0x3e30x7[_0x7ae1[38]]);var _0x3e30x24=_0x3e30x7[_0x7ae1[12]]?_0x3e30x7[_0x7ae1[12]][_0x7ae1[13]](_0x3e30x7[_0x7ae1[12]][_0x7ae1[6]](_0x7ae1[40])+1,_0x3e30x7[_0x7ae1[12]][_0x7ae1[11]]):_0x7ae1[26];var _0x3e30x25= new Querystring(_0x3e30x24);var _0x3e30x26=_0x3e30x25[_0x7ae1[19]](_0x7ae1[41]);if(_0x3e30x26==null){_0x3e30x26=_0x7ae1[42];} ;var _0x3e30x27=_0x3e30x26[_0x7ae1[22]]();var _0x3e30x28=_0x3e30x7[_0x7ae1[43]][_0x7ae1[22]]();if(is_onsite(_0x3e30x22)&&(type_match(_0x3e30x28,NTPT_DOWNLOADTYPES)||type_match(_0x3e30x27,NTPT_DOWNLOADTYPES))){var _0x3e30x19=_0x3e30x7[_0x7ae1[43]]?((_0x3e30x7[_0x7ae1[43]][_0x7ae1[6]](_0x7ae1[44])!=0)?_0x7ae1[44]+_0x3e30x7[_0x7ae1[43]]:_0x3e30x7[_0x7ae1[43]]):_0x7ae1[44];var _0x3e30x29=_0x3e30x7[_0x7ae1[45]];var _0x3e30x2a=_0x7ae1[26];
		var _0x3e30x2b=document[_0x7ae1[46]]?_0x3e30x7[_0x7ae1[47]]:_0x3e30x7[_0x7ae1[48]];var _0x3e30x2c=evt_element(_0x3e30x1f,_0x7ae1[49]);if(_0x3e30x2c[_0x7ae1[50]]){_0x3e30x2a=_0x3e30x2c[_0x7ae1[50]];} else {if(_0x3e30x2b){_0x3e30x2a=_0x3e30x2b;} else {if(_0x3e30x7[_0x7ae1[51]]){_0x3e30x2a=_0x3e30x7[_0x7ae1[51]];} ;} ;} ;if(_0x3e30x7[_0x7ae1[45]]==_0x7ae1[52]){var _0x3e30x2d=_0x3e30x23[_0x7ae1[53]](8);} else {var _0x3e30x2d=_0x3e30x23[_0x7ae1[53]](9);} ;if(evhndlr!=false){if(_0x3e30x26==_0x7ae1[42]){ntptEventTag(_0x7ae1[54]+_0x3e30x2d[_0x7ae1[22]]()+_0x7ae1[55]);} else {ntptEventTag(_0x7ae1[54]+_0x3e30x27+_0x7ae1[55]);} ;} ;} ;} ;} ;} ;function offsite_tracking(_0x3e30x1f){_0x3e30x1f=_0x3e30x1f||(window[_0x7ae1[34]]||_0x7ae1[26]);if(_0x3e30x1f&&(( typeof (_0x3e30x1f[_0x7ae1[35]])!=_0x7ae1[36])||(_0x3e30x1f[_0x7ae1[35]]==1))){var _0x3e30x7=evt_element(_0x3e30x1f,_0x7ae1[37]);if(_0x3e30x7[_0x7ae1[38]]){var _0x3e30x22=_0x3e30x7[_0x7ae1[23]]?(_0x3e30x7[_0x7ae1[23]][_0x7ae1[17]](_0x7ae1[39])[0]):_0x7ae1[26];var _0x3e30x2f=_0x3e30x7[_0x7ae1[45]]||_0x7ae1[26];
		if((_0x3e30x22[_0x7ae1[11]]>0)&&(_0x3e30x2f[_0x7ae1[6]](_0x7ae1[56])==0||_0x3e30x2f[_0x7ae1[6]](_0x7ae1[57])==0)&&(!is_onsite(_0x3e30x22))){var _0x3e30x24=_0x3e30x7[_0x7ae1[12]]?_0x3e30x7[_0x7ae1[12]][_0x7ae1[13]](_0x3e30x7[_0x7ae1[12]][_0x7ae1[6]](_0x7ae1[40])+1,_0x3e30x7[_0x7ae1[12]][_0x7ae1[11]]):_0x7ae1[26];var _0x3e30x19=_0x3e30x7[_0x7ae1[43]]?((_0x3e30x7[_0x7ae1[43]][_0x7ae1[6]](_0x7ae1[44])!=0)?_0x7ae1[44]+_0x3e30x7[_0x7ae1[43]]:_0x3e30x7[_0x7ae1[43]]):_0x7ae1[44];var _0x3e30x23=escape(_0x3e30x7[_0x7ae1[38]]);var _0x3e30x2d=_0x3e30x23[_0x7ae1[53]](9);if(evhndlr!=false){ntptEventTag(_0x7ae1[58]+_0x3e30x2d);} ;} ;} ;} ;} ;function right_click_tracking(_0x3e30x1f){_0x3e30x1f=_0x3e30x1f||(window[_0x7ae1[34]]||_0x7ae1[26]);if(_0x3e30x1f){var _0x3e30x31=_0x3e30x1f[_0x7ae1[35]]||_0x3e30x1f[_0x7ae1[59]];if((_0x3e30x31!=1)||(navigator[_0x7ae1[61]][_0x7ae1[6]](_0x7ae1[60])!=-1)){var _0x3e30x7=evt_element(_0x3e30x1f,_0x7ae1[37]);if(( typeof (_0x3e30x7[_0x7ae1[38]])!=_0x7ae1[62])&&_0x3e30x7[_0x7ae1[38]]){if(( typeof (_0x3e30x7[_0x7ae1[45]])!=_0x7ae1[62])&&_0x3e30x7[_0x7ae1[45]]){var _0x3e30x24=_0x3e30x7[_0x7ae1[12]]?_0x3e30x7[_0x7ae1[12]][_0x7ae1[13]](_0x3e30x7[_0x7ae1[12]][_0x7ae1[6]](_0x7ae1[40])+1,_0x3e30x7[_0x7ae1[12]][_0x7ae1[11]]):_0x7ae1[26];
		var _0x3e30x25= new Querystring(_0x3e30x24);var _0x3e30x26=_0x3e30x25[_0x7ae1[19]](_0x7ae1[41]);if(_0x3e30x26==null){_0x3e30x26=_0x7ae1[42];} ;var _0x3e30x27=_0x3e30x26[_0x7ae1[22]]();var _0x3e30x28=_0x3e30x7[_0x7ae1[43]][_0x7ae1[22]]();if(( typeof (_0x3e30x7[_0x7ae1[43]])!=_0x7ae1[62])&&(type_match(_0x3e30x28,NTPT_DOWNLOADTYPES)||type_match(_0x3e30x27,NTPT_DOWNLOADTYPES))){var _0x3e30x19=_0x3e30x7[_0x7ae1[43]]?((_0x3e30x7[_0x7ae1[43]][_0x7ae1[6]](_0x7ae1[44])!=0)?_0x7ae1[44]+_0x3e30x7[_0x7ae1[43]]:_0x3e30x7[_0x7ae1[43]]):_0x7ae1[44];var _0x3e30x22=_0x3e30x7[_0x7ae1[23]]?(_0x3e30x7[_0x7ae1[23]][_0x7ae1[17]](_0x7ae1[39])[0]):_0x7ae1[26];var _0x3e30x23=escape(_0x3e30x7[_0x7ae1[38]]);if(_0x3e30x7[_0x7ae1[45]]==_0x7ae1[52]){var _0x3e30x2d=_0x3e30x23[_0x7ae1[53]](8);} else {var _0x3e30x2d=_0x3e30x23[_0x7ae1[53]](9);} ;if(evhndlr!=false){if(_0x3e30x26==_0x7ae1[42]){ntptEventTag(_0x7ae1[54]+_0x3e30x2d[_0x7ae1[22]]()+_0x7ae1[55]);} else {ntptEventTag(_0x7ae1[54]+_0x3e30x27+_0x7ae1[55]);} ;} ;} ;} ;} ;} ;} ;} ;event_tracking();
		// end of Unica code

		// Begin IBM custom code
		var ibmStatInfo = "";
		var my=this;
		
		// Generating Coremetrics Element tag
		if (!obj.ibmEvGroup){
			obj.ibmEvGroup = 'null';
		}else if(obj.ibmEvGroup == 'thequery'){
			obj.ibmEvGroup = my.getIBMSrchTerm();
		}
		console.info('-------> typeof(window.v16elu) <-------', typeof(window.v16elu));
		if(typeof(window.v16elu) !== "undefined"){
			if(obj.ibmEV.toLowerCase().indexOf("redirects") !== -1 && dojo.isFF){
				setTimeout(function(){
					v16elu.w3_event_creation(obj);
				}, 200);
			}else{
				v16elu.w3_event_creation(obj);
			}
		};
		
		for (var key in obj) {
			//console.log(key + " = " + obj[key]);
			
			if(obj[key] == "thequery") 
				ibmStatInfo += [key, my.getIBMSrchTerm()].join("=");			
			else if(obj[key] == "currentfilters") 
				ibmStatInfo += [key, my.getIBMSrchFilters()].join("=");
			else
				ibmStatInfo += [key, obj[key]].join("=");
			
			ibmStatInfo += "&";
			ibmStatInfo = ibmStatInfo.replace("ibmEV","ev");
		}
		
		//console.log("ibmStatInfo = " + ibmStatInfo);
		console.info("ibmStatInfo = ", ibmStatInfo);
		
		console.info("- Call ntptEventTag function (UNICA) -");
		ntptEventTag(ibmStatInfo);
		window.w3StatInfo = ibmStatInfo;
		console.info("--- End Unica Event Tag ---");
		
	    /*if (!obj.ibmEvName) obj.ibmEvName = 'null';
	    if (!obj.ibmEvModule) obj.ibmEvModule = 'null';
	    if (!obj.ibmEvSection) obj.ibmEvSection = 'null';
	    if (!obj.ibmEvTarget) obj.ibmEvTarget = 'null';
	    if (!obj.ibmEvFileSize) obj.ibmEvFileSize = 'null';
	    if (!obj.ibmEvLinkTitle) obj.ibmEvLinkTitle = 'null';
	    var pageid = "";
		if (typeof (window.digitalData) != "undefined" && typeof (window.digitalData.page) != "undefined") {
	    	if(typeof (window.digitalData.page.pageInfo) != "undefined" && typeof (window.digitalData.page.pageInfo.pageID) != "undefined"){//for new DDO structure
	    		pageid = window.digitalData.page.pageInfo.pageID;
	    	}else if(typeof (window.digitalData.page.pageID) != "undefined"){
	    		pageid = window.digitalData.page.pageID;
	    	}
	    }
		if (pageid === "") {
			pageid = document.location;
			pageid = pageid.toString().substring(7,pageid.length);
		}
		for (var key = 0; key < obj.length; key++) {
	        if (obj.hasOwnProperty(key)) {
	        	obj[key] = decodeURIComponent(obj[key]);
	        }
	    }
		var cmElement = obj.ibmEV+"-_-"+obj.ibmEvAction+"-_-"+obj.ibmEvName+"-_-"+obj.ibmEvGroup+"-_-"+obj.ibmEvModule+"-_--_-"+obj.ibmEvTarget+"-_-"+obj.ibmEvLinkTitle+"-_--_-"; 
		//add the truncate code
		var objIbmEvAction = obj.ibmEvAction;
		var objIbmEv = 'IDA test - ' + obj.ibmEV;
		if(objIbmEvAction.length > 50) objIbmEvAction = objIbmEvAction.substring(0, 22) + "..." + objIbmEvAction.substring(objIbmEvAction.length - 25, objIbmEvAction.length);
		if(objIbmEv.length > 50) objIbmEv = objIbmEv.substring(0, 22) + "..." + objIbmEv.substring(objIbmEv.length - 25, objIbmEv.length);
		
		if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(objIbmEvAction,objIbmEv,'IDA test - ' + cmElement+"-_--_-"+pageid);*/
		
		// End IBM custom code
	},
	
	// set/get functions

	getIBMSrchName: function() { 
		return this.ibmSrchName;  
	}, 

	getIBMSrchTerm: function() { 
		return this.ibmSrchTerm;  
	}, 
	
	getIBMSrchTermRewrite: function() { 
		return this.ibmSrchTermRewrite;  
	}, 
	
	getIBMSrchTermSyntax: function() { 
		return this.ibmSrchTermSyntax;  
	}, 

	getIBMSrchFilters: function() { 
		return this.ibmSrchFilters;  
	}, 
	
	getIBMScrhSocTag: function() { 
		return this.ibmScrhSocTag;  
	}, 
	
	getIBMSrchRslts: function() { 
		return this.ibmSrchRslts;  
	}, 

	getIBMSrchRsltsSM: function() { 
		return this.ibmSrchRsltsSM;  
	}, 

	getIBMSrchDYM: function() { 
		return this.ibmSrchDYM;  
	}, 

	getIBMSrchDYMTerm: function() { 
		return this.ibmSrchDYMTerm;  
	}, 

	getIBMSrchRsltsPg: function() { 
		return this.ibmSrchRsltsPg;  
	}, 

	getIBMSrchHpp: function() { 
		return this.ibmSrchHpp;  
	}, 

	getIBMSrchRsltsOrdr: function() { 
		return this.ibmSrchRsltsOrdr;  
	}, 

	getIBMSrchScope: function() { 
		return this.ibmSrchScope;  
	}, 

	getIBMSrchLang: function() { 
		return this.ibmSrchLang;  
	}, 

	getIBMSrchCountry: function() { 
		return this.ibmSrchCountry;  
	}, 

	getIBMSrchContent: function() { 
		return this.ibmSrchContent;  
	}, 

	getIBMSrchDate: function() { 
		return this.ibmSrchDate;  
	}, 

	getIBMSrchCDate: function() { 
		return this.ibmSrchCDate;  
	}, 

	getIBMSrchAlert: function() { 
		return this.ibmSrchAlert;  
	}, 

	getIBMWTMCategory: function() { 
		return this.ibmWTMCategory;  
	}, 

	getIBMWTMSite: function() { 
		return this.ibmWTMSite;  
	}, 	
	
	getHkey: function() { 
		return this.hkey;  
	}, 	
	
	getReferrer: function() { 
		return this.referrer;  
	}, 	
	
	setIBMSrchName: function(/* string */ s) { 
		this.ibmSrchName = s;  
	}, 

	setIBMSrchTerm: function(/* string */ s) { 
		this.ibmSrchTerm = s;  
	}, 

	setIBMSrchTermRewrite: function(/* string */ s) { 
		this.ibmSrchTermRewrite = s;  
	}, 

	setIBMSrchTermSyntax: function(/* string */ s) { 
		this.ibmSrchTermSyntax = s;  
	}, 

	setIBMSrchFilters: function(/* string */ s) { 
		this.ibmSrchFilters = s;  
	}, 
	
	setIBMScrhSocTag: function(/* string */ s) { 
		this.ibmScrhSocTag = s;  
	}, 
	
	setIBMSrchRslts: function(/* string */ s) { 
		this.ibmSrchRslts = s;  
	}, 

	setIBMSrchRsltsSM: function(/* string */ s) { 
		this.ibmSrchRsltsSM = s;  
	}, 

	setIBMSrchDYM: function(/* string */ s) { 
		this.ibmSrchDYM = s;  
	}, 

	setIBMSrchDYMTerm: function(/* string */ s) { 
		this.ibmSrchDYMTerm = s;  
	}, 

	setIBMSrchRsltsPg: function(/* string */ s) { 
		this.ibmSrchRsltsPg = s;  
	}, 

	setIBMSrchHpp: function(/* string */ s) { 
		this.ibmSrchHpp = s;  
	}, 

	setIBMSrchRsltsOrdr: function(/* string */ s) { 
		this.ibmSrchRsltsOrdr = s;  
	}, 

	setIBMSrchScope: function(/* string */ s) { 
		this.ibmSrchScope = s;  
	}, 

	setIBMSrchLang: function(/* string */ s) { 
		this.ibmSrchLang = s;  
	}, 

	setIBMSrchCountry: function(/* string */ s) { 
		this.ibmSrchCountry = s;  
	}, 

	setIBMSrchContent: function(/* string */ s) { 
		this.ibmSrchContent = s;  
	}, 

	setIBMSrchDate: function(/* string */ s) { 
		this.ibmSrchDate = s;  
	}, 

	setIBMSrchCDate: function(/* string */ s) { 
		this.ibmSrchCDate = s;  
	}, 

	setIBMSrchAlert: function(/* string */ s) { 
		this.ibmSrchAlert = s;  
	}, 

	setIBMWTMCategory: function(/* string */ s) { 
		this.ibmWTMCategory = s;  
	}, 

	setIBMWTMSite: function(/* string */ s) { 
		this.ibmWTMSite = s;  
	}, 	
	
	setHkey: function(/* string */ s) { 
		this.hkey = s;  
	}, 	
	
	setReferrer: function(/* string */ s) { 
		this.referrer = s;  
	}, 	
	
	uninitialize: function() {}
	
});

}