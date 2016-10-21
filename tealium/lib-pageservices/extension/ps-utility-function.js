/*
 * Id            : tm-v1.0/tealium/lib-pageservices/extension/ps-utility-function.js
 * Extension Name: Utility Function - Copy IBM Global Data to Digital Data
 * Scope         : Pre Loader
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
window.copyIBMGlobalDataToDDO = window.copyIBMGlobalDataToDDO || function(base, path, columnValue, overwrite) {
    try {
        path = path.trim();
        var names = path.split('.');
        var lastElement = names.pop();
        for (var i = 0; i < names.length; i++) {
            base = base[names[i]] = base[names[i]] || {};
        }
        var passedInColumnValue = "";
        if ("undefined" !== typeof columnValue) {
            passedInColumnValue = columnValue.trim();
        }
      
      if ("undefined" === typeof base[lastElement]) {
	base = base[lastElement] = passedInColumnValue;
      } 
      
      //If overwrite
      if ("undefined" === typeof overwrite || overwrite === true) {
	//If element is not already available (OR) value present from input
	if ("undefined" !== typeof columnValue && columnValue.trim() !== '') {
	  base = base[lastElement] = passedInColumnValue;
	}                    
      }
    } catch (error) {
        window.TealiumLog.error('Error while calling copyIBMGlobalDataToDDO method. Error is: ' + error);
    }
}
