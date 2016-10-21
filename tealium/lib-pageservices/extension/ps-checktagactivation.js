/*
 * Id            : tm-v1.0/tealium/lib-pageservices/extension/ps-checktagactivation.js
 * Extension Name: Check Tag Activation
 * Scope         : Pre Loader
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
 try {
  var CHECK_TAG_ACTIVATION_STATUS = {
    DISABLED: 'DISABLED',
    ENABLED: 'ENABLED',
    RAN: 'RAN'
  };
} catch (error) {
  window.TealiumLog.error('Error while defining CHECK_TAG_ACTIVATION_STATUS object. Error is: ' + error);
}
//Utility code to get object value using object deep path like digitalData.page.pageInfo.convertro.enabled
window.getDeepObjectValue =  window.getDeepObjectValue || function (obj, path) {
  try {
    if ('undefined' !== typeof obj && 'undefined' !== typeof path) {
      for (var i = 0, path = path.split('.'), len = path.length; i < len; i++){
	obj = obj[path[i]];
      }
      return obj;
    }
  } catch (error) {
  	window.TealiumLog.error('Error while getting deep object value. Error is: ' + error)
  }
  return undefined;
}; 

window.checkTagActivation =  window.checkTagActivation || function (config) {
    try { 
        //window.TealiumLog.log('checkTagActivation start @: ' + new Date().toLocaleString());
        //Validate config object for required attributes
        //if ('undefined' === typeof config || 'undefined' === typeof config.TAG_ENABLED_PATH || 'undefined' === typeof config.TAG_RAN_PATH || 'undefined' === typeof config.VENDOR_TAG_RAN_OBJECT_PATH
        //    || config.TAG_ENABLED_PATH.toString().trim() === '' || config.TAG_RAN_PATH.toString().trim() === '' || config.VENDOR_TAG_RAN_OBJECT_PATH.toString().trim() === '') {
        //    window.TealiumLog.log('One of the required parameter config.TAG_ENABLED_PATH (OR) config.TAG_RAN_PATH (OR) config.VENDOR_TAG_RAN_OBJECT_PATH is missing. Tag cannot be checked for activation.');
        //    return window.CHECK_TAG_ACTIVATION_STATUS.DISABLED;
        //}

        //If ENABLED and RUN are not available, set them to TRUE
        //if ('undefined' === typeof config.ENABLED || config.ENABLED.trim() === '') {
        //    config.ENABLED = 'TRUE';
        //}

        //if ('undefined' === typeof config.RAN || config.RAN.trim() === '') {
        //    config.RAN = 'TRUE';
        //}

        //Get the values for the Objects path passed in config object attributes
        var tagEnabled = window.getDeepObjectValue(window, config.TAG_ENABLED_PATH);
        var tagRan = window.getDeepObjectValue(window, config.TAG_RAN_PATH);
        var vendorTagObject = window.getDeepObjectValue(window, config.VENDOR_TAG_RAN_OBJECT_PATH);

        //Make sure that IBM Global Data copy to DDO extension is ran before this extension

        // Check for TAG_ENABLED_PATH object. If undefined (OR) not equals to true then suppress tag
        if ('undefined' === typeof tagEnabled || tagEnabled.toString().toLowerCase().trim() !== config.ENABLED.toString().toLowerCase().trim()) {
            window.TealiumLog.log(config.TAG_NAME + ' is disabled');
            return window.CHECK_TAG_ACTIVATION_STATUS.DISABLED; // <--- Suppresses tag container!
        }

        /* START: CHECK FOR TAG_NAME ON PAGE */

        // Check TAG_NAME code --- whether TAG_NAME has been fired or not. TAG_NAME will create VENDOR_TAG_RAN_OBJECT_PATH object
        if ('undefined' === typeof vendorTagObject ) {
            // Check DDO whether TAG_NAME has already ran
            if ('undefined' === typeof tagRan || tagRan.toString().toLowerCase().trim() !== config.RAN.toString().toLowerCase().trim())  {
                window.TealiumLog.log(config.TAG_NAME + ' has not been fired.  Activating ' + config.TAG_NAME + ' tag.');
                window.copyIBMGlobalDataToDDO(window, config.TAG_RAN_PATH, config.RAN);  
                return window.CHECK_TAG_ACTIVATION_STATUS.ENABLED;
            } else {
                window.TealiumLog.log(config.TAG_NAME + ' has been fired already. ' + config.TAG_RAN_PATH + '  was set to true');
                return window.CHECK_TAG_ACTIVATION_STATUS.RAN; // <--- Suppresses tag container!
            }
        } else {
            window.TealiumLog.log(config.TAG_NAME + ' has been fired already. ' + config.VENDOR_TAG_RAN_OBJECT_PATH +' object is initialized.');
            return window.CHECK_TAG_ACTIVATION_STATUS.RAN; // <--- Suppresses tag container!
        }
        /* END: CHECK FOR TAG_NAME ON PAGE */

    } catch (error) {
        window.TealiumLog.error('Error while checking Tag Activation. Error is: ' + error);
        return window.CHECK_TAG_ACTIVATION_STATUS.DISABLED;
    //} finally {
    //    window.TealiumLog.log('checkTagActivation end @: '+ new Date().toLocaleString());   
    }
};
