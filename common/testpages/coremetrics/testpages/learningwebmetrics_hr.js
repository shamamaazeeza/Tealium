/**
* COPYRIGHT 2009 International Business Machines Corporation
* All Rights Reserved
* Licensed Materials - Property of IBM
*
* HR metrics script wrapper
* Usage: https://w3.tap.ibm.com/w3ki/display/hrw3comms/Unica+Tagging+Instructions
* 
* Created by:  Ondrej Lehota, Mark Sawlor, and Michael Ticknor
* Last Updated 7/7/2011
**/

window.w3WebMetrics = {
	// default category array is based on url path
	category: location.pathname.replace(/\/[^/]*$/g,'').replace(/^\/+/g,'').split('/'),
	// test pages should set isTest to true
	isTest: false,
	// change to 'onload' if web metrics js should not be loaded until onload event
	loadMethod: "immediate",
	//toggle to turn off w3 profile tracking
	cookie: true,
	//the current users email address
	email: "",
	//used ONLY to get hkey if its missing
	getHkey: function(eml){

/*** for now, getHkey function call does nothing

		if(!w3WebMetrics.hkey){ 
			if(!window.odwProfile){
				window.odwProfile = function(str){
					if(str && str.User && !str.error && str.User.Hkey!= ""){
						w3WebMetrics.hkey =str.User.Hkey;
						w3WebMetrics._sessionCookie('set','lhkey', str.User.Hkey, (5*365*24*60*60*1000));
					}else{
						if(console && console.log){ 
							console.log("ERROR: odwProfile(str):learningwebmetrics.js did not set lhkey cookie", str);
						}
					}
				}
			}else{
				if(console && console.log){ 
					console.log("WARNING: odwProfile() exists already:learningwebmetrics.js did not set lhkey cookie");
				}
			}
			var hkeylib = document.createElement('script');
			hkeylib.setAttribute('type', 'text/javascript');
			eml = (w3WebMetrics.email!="") ? w3WebMetrics.email : eml;
			hkeylib.setAttribute('src', '//hrwebintegrat.bluehost.ibm.com/services/profiles/user/json/email/' + eml);
			//check for head availability
			if(typeof document.getElementsByTagName('head')[0]!= 'undefined'){
				document.getElementsByTagName('head')[0].appendChild(hkeylib);
			}else{
				if(console && console.log){ 
					console.log("WARNING: w3WebMetrics.getHkey() needs to be called after the DOM is available");
				}
			}
		}
****/

	},
	//hkey value for current w3 user
	hkeyInit: function(){
		w3WebMetrics.hkey = null;
		var hkey = document.cookie.match(/w3ibmProfile=([\d\-]+)(?=|)/);
		w3WebMetrics.hkey = (hkey && typeof hkey[1] != "undefined") ? hkey[1] : null;
		if(!w3WebMetrics.hkey){w3WebMetrics.hkey = w3WebMetrics._sessionCookie("get", "lhkey");}
	},
	// optional name/value pairs included in web metrics message
	parameters: {},
	// loads the web metrics js into the dom
	load: function(){
		if(w3WebMetrics._loaded) return;  //only load once
		w3WebMetrics._loaded = true;
		w3WebMetrics._ntptPgextra();
		var library = document.createElement('script');
		library.setAttribute('type', 'text/javascript');
		library.setAttribute('src', w3WebMetrics._js);
		document.getElementsByTagName('head')[0].appendChild(library);
	},
	// send a message of the specified type (e.g. download, feedback, page_hit)
	// category and parameters are both optional, default to w3WebMetrics.category and w3WebMetrics.parameters
	send: function(type, category, parameters,ev){
		if(!ntptEventTag) return;
		if(ev)ntptAddPair("ev", ev);
		var params = [];
		var pairs = w3WebMetrics._valuePairs(type, category, parameters);
		for(var i=0, l=pairs.length; i<l; i++){
			params[pairs[i][0]] = pairs[i][1];
		}
		ibmStats.event(params);
	},
	// send a link_click message for the specified <a href> dom node
	// category and parameters are both optional, default to w3WebMetrics.category and w3WebMetrics.parameters
	sendClick: function(node, category, parameters){
		if(!ntptLinkTag||!node) return;
		var params = {};
		var pairs = w3WebMetrics._valuePairs('link_click', category, parameters);
		if(!parameters||typeof parameters.ibmEV=='undefined'){pairs.push(['ibmEV', 'onsite link']);}
		if(!parameters||typeof parameters.ibmEvAction=='undefined'){pairs.push(['ibmEvAction', (typeof node.href !='undefined'? node.href:"-")]);}
		if(!parameters||typeof parameters.ibmEvGroup=='undefined'){pairs.push(['ibmEvGroup', (typeof w3WebMetrics.category[0]!='undefined'? w3WebMetrics.category[0]:"-")])};
		if(!parameters||typeof parameters.ibmEvName=='undefined'){pairs.push(['ibmEvName', 'link_click'])}
		if(!parameters||typeof parameters.ibmEvModule=='undefined'){pairs.push(['ibmEvModule',(typeof w3WebMetrics.category[1]!='undefined'? w3WebMetrics.category[1]:"-")])};
		if(!parameters||typeof parameters.ibmEvSection=='undefined'){pairs.push(['ibmEvSection', (typeof w3WebMetrics.category[2] !='undefined'? w3WebMetrics.category[2]:"-")]);}
		if(!parameters||typeof parameters.ibmEvLinkTitle=='undefined'){pairs.push(['ibmEvLinkTitle', (typeof node.alt !='undefined'? node.alt:"-")]);}
		pairs.push(['rf', document.location.href]);
		for(var i=0, l=pairs.length; i<l; i++){
			params[pairs[i][0]] = pairs[i][1];
		}
		ibmStats.event(params);
		return true;
	},
	// web metrics js url
	_js: "//w3.ibm.com/w3webmetrics/js/ntpagetag.js",
	// captures page-level w3WebMetrics object
	_pageW3WebMetrics: (window.w3WebMetrics ? w3WebMetrics : (window.hrWebMetrics ? hrWebMetrics : {})),
	// profile identifier
	_profile: "hr.lrn",
	// runs immediatly
	_initialize: function(){
		// page-level w3WebMetrics attributes replace default w3WebMetrics attributes
		for(var att in w3WebMetrics._pageW3WebMetrics){
			w3WebMetrics[att] = w3WebMetrics._pageW3WebMetrics[att];
		}
		//get the user hkey and set w3WebMetrics.hkey
		w3WebMetrics.hkeyInit();
		//Turn off the auto link tracking(download) tracking.
		window.evhndlr=false;
		// if loadMethod is 'immediate' web metrics js loaded via document.write
		if("immediate" == w3WebMetrics.loadMethod){
			w3WebMetrics._loaded = true;
			w3WebMetrics._ntptPgextra();
			document.write("<script type='text/javascript' src='" + w3WebMetrics._js + "'></script>");
		// if loadMethod is 'onload', web metrics js not loaded until the page onload event
		}else if("onload" == w3WebMetrics.loadMethod){
			if(window.attachEvent){
				window.attachEvent("onload", w3WebMetrics.load);
			}else if(window.addEventListener){
				window.addEventListener("load", w3WebMetrics.load, false);
			}
		}
		// otherwise w3WebMetrics.load() must be explicitly called on the page
		//adding WTMSite meta tag
		var meta = document.createElement('meta');
		meta.name = "IBM.WTMSite";
		meta.content = "HR";
		document.getElementsByTagName('head')[0].appendChild(meta);
	},
	// becomes set to true when web metrics js is requested
	_loaded: false,
	// calls ntptAddPair for each name/value pair
	_ntptAddPairs: function(type, category, parameters){
		var pairs = w3WebMetrics._valuePairs(type, category, parameters);
		for(var i=0, l=pairs.length; i<l; i++){
			ntptAddPair(pairs[i][0].toLowerCase(), pairs[i][1]);
		}
	},
	// build the NTPT_PGEXTRA string using test, category, and parameters properties
	_ntptPgextra: function(){
		var out = w3WebMetrics.out = [];
		var pairs = w3WebMetrics._valuePairs("page_hit");
		for(var i=0, l=pairs.length; i<l; i++){
			out.push(pairs[i][0].toLowerCase() + "=" + pairs[i][1]);
		}
		window.NTPT_PGEXTRA = out.join("&");
	},
	// returns an N x 2 array of name-value pairs to be logged
	_valuePairs: function(type, category, parameters){
		var pairs = [];
		pairs.push(["ibm.wtmsite", w3WebMetrics._profile + (w3WebMetrics.isTest ? ".test" : "")]);
		pairs.push(["type", type]);		
		if (w3WebMetrics.cookie && w3WebMetrics.hkey) pairs.push(["hkey", w3WebMetrics.hkey]);
		if(!category){category = w3WebMetrics.category;}
		for(var x=0, l=category.length; x<l; x++){
			pairs.push(["wtm.c" + (x+1), category[x]]);
		}
		for(var y =7;y> category.length;y--){
			if(!w3WebMetrics.category[(y-1)]){pairs.push(["wtm.c" + y, "-"]);}
		}
		var c2 = '-';
		if(w3WebMetrics.category[1]){c2=w3WebMetrics.category[1];}
		if(!parameters){parameters = w3WebMetrics.parameters;}
		//test for site entry on page_hits only
		if(typeof parameters != "undefined" && typeof parameters["type"] != "undefined"){
			type =parameters["type"];
		}
		if(type == "page_hit" && c2 != "-"){
			if(w3WebMetrics._sessionCookie('get','l_sn')==c2){
				pairs.push(["fspv", "0"]);	
			}else{
				pairs.push(["fspv", "1"]);		
			}
			w3WebMetrics._sessionCookie('set','l_sn', c2);
			
			// test for originating Learning site
			if(w3WebMetrics._sessionCookie('get','l_osn')==null){
				w3WebMetrics._sessionCookie('set','l_osn', c2);
				pairs.push(["opv", "1"]);
			}else{
				w3WebMetrics._sessionCookie('set','l_osn', w3WebMetrics._sessionCookie('get','l_osn'));
				pairs.push(["opv", "0"]);
			}
			pairs.push(["osn", w3WebMetrics._sessionCookie('get','l_osn')]);
		}
		for(var p in parameters){
			pairs.push([p, parameters[p]]);
		}
		return pairs;
	},	
	//sets a 120 min cookie or returns its value
	_sessionCookie: function(meth,name,val,exp){
		if(meth=="set"){
			var dt = new Date(); 
			var expiryTime = dt.setTime( dt.getTime() + 7200000 );
			if(exp){
				var expiryTime = dt.setTime( dt.getTime() + exp );
			}
			document.cookie = name+'=' + val + '; expires=' + dt.toGMTString()+"; path=/; domain=.ibm.com";
		}else if(meth=="get"){
			var ca=document.cookie.split(';');
			for(var i=0;i < ca.length;i++){
				var c=ca[i];
				while(c.charAt(0)==' '){c=c.substring(1,c.length)};
				if(c.indexOf(name+'=')==0){return c.substring((name.length+1),c.length)};
			}
			return null;
		}else{
			return null;
		}
	}	
}
w3WebMetrics._initialize();