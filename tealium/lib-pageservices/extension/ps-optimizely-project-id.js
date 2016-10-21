/*
 * Id            : tm-v1.0/tealium/lib-pageservices/extension/ps-ps-optimizely-project-id.js
 * Extension Name: Optimizely (Async) Dynamic Project ID
 * Scope         : Optimizely (Async) Dynamic Project ID
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
//Used for logging all the tealium log messages
//Purpose of creating this object is not to log messages to console

try {
    var start = new Date().getTime();
    var OptimizelyConfig = {
        TAG_NAME: 'Optimizely',
        TAG_ENABLED_PATH: 'digitalData.page.pageInfo.optimizely.enabled',
        TAG_RAN_PATH: 'digitalData.page.pageInfo.optimizely.ran',
        VENDOR_TAG_RAN_OBJECT_PATH: 'optly',
        ENABLED : 'TRUE',
        RAN: 'TRUE'
    };
    
    var tagStatus = window.checkTagActivation(OptimizelyConfig);
    if (tagStatus === window.CHECK_TAG_ACTIVATION_STATUS.ENABLED) {
        //Optimizely tag is enabled, activate the tag
        //Override the project ID
        if (digitalData.page.pageInfo.optimizely.projectID.trim() !== '') {
	   u.data.projectId = digitalData.page.pageInfo.optimizely.projectID.trim();
	   return true;
        } else {
	   digitalData.page.pageInfo.optimizely.ran = 'FALSE';
	   window.TealiumLog.log('Optimizely projectID is not available. Tag is suppressed.');
	   return false;
	}
    } else if (tagStatus === window.CHECK_TAG_ACTIVATION_STATUS.RAN) {
        //Optimizely tag ran already
        u.initialized = true;
        return false;
    } else {
        //Optimizely tag is disabled
        return false;
    }
} catch(error) {
    window.TealiumLog.error('Error while running Optimizely extension tag. Error is: ' + error);
    return false;
} finally {
    var end = new Date().getTime();
    window.TealiumLog.log('Optimizely extension took ' + (end - start) + ' milli seconds to run'); 
}
