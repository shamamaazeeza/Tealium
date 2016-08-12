(function ibmCoreAuto(){

    function ibmCheckDigitaldataNested(nestedElems) {
        var elements = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < elements.length; i++) {
            if (!nestedElems || !nestedElems.hasOwnProperty(elements[i])) {
                return false;
            }
            nestedElems = nestedElems[elements[i]];
        }
      return true;
    }
    function addScript(arrSrc){
			var scriptNodeEventHandler = document.createElement('script');
			scriptNodeEventHandler.src = arrSrc;
			scriptNodeEventHandler.type = 'text/javascript';
			document.getElementsByTagName('head')[0].appendChild(scriptNodeEventHandler);
    }
    function isScriptAlreadyIncluded(src){
	    var scripts = document.getElementsByTagName("script");
	    for(var i = 0; i < scripts.length; i++) 
	       if(scripts[i].getAttribute('src') == src) return true;
	    return false;
	}
    function loadSiteID(){
    	var ibmURLVariable = window.location.search.substring(1);

        // Try to swith over into confirming if the top level directory can be used as the identifier
        var ibmURLPathname = window.location.pathname.split('/');
        var ibmTopLevelDirectory = ibmURLPathname[1];
    	 var ibmURLMatch = {
    		        "/url/testing1/" : 'IBMSEC-TEST1',
    		        "/url/testing2/" : 'IBMSEC-TEST2',
    		    	"/url/testing3/" : 'IBMSEC-TEST3',
    		        "/url/testing4/" : 'IBMSEC-TEST4'
    		    };

    		    for(var ibmSiteURL in ibmURLMatch) {

    		    	var ibmCoreTag = ibmURLMatch[ibmSiteURL];
    		    	if(ibmSiteURL === ibmURLVariable) {
    		    		//console.info("Key: "+ibmURLVariable+" value:"+ibmCoreTag);
    		    		digitalData = {
    		    				page: {
    		    					pageInfo: {
    		    						ibm: {
    		    							siteID: ibmCoreTag
    		    						}
    		    					},
    		    					category: {
    		    						primaryCategory: 'sec_home'
    		    					}
    		    				}
    		    			};
    		    	}
    		    }
    		    loadCoremetrics();
    }
    function loadCoremetrics(){
        var coremetricsURL = '//www.ibm.com/common/stats/ida_production.js';
        var jsLoaded = isScriptAlreadyIncluded(coremetricsURL);
        if(!jsLoaded) addScript(coremetricsURL);
    }
    loadSiteID();
}());
