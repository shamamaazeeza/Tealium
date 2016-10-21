/*
 * Id            : tm-v1.0/tealium/lib-pageservices/extension/ps-hotjar.js
 * Extension Name: hotjar for tags activities
 * Scope         : HotJar
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
//Used for logging all the tealium log messages
//Purpose of creating this object is not to log messages to console

try {
    var start = new Date().getTime();
    var HotJarConfig = {
        TAG_NAME: 'HotJar',
        TAG_ENABLED_PATH: 'digitalData.page.pageInfo.hotjar.enabled',
        TAG_RAN_PATH: 'digitalData.page.pageInfo.hotjar.ran',
        VENDOR_TAG_RAN_OBJECT_PATH: 'hjSiteSettings',
        ENABLED : 'TRUE',
        RAN: 'TRUE'
    };
  var tagStatus = window.checkTagActivation(HotJarConfig);
  if (tagStatus === window.CHECK_TAG_ACTIVATION_STATUS.ENABLED) {
    //HotJar tag is enabled, activate the tag
    return true;
  } else if (tagStatus === window.CHECK_TAG_ACTIVATION_STATUS.RAN) {
    //HotJar tag ran already
    u.initialized = true;
    return false;
  } else {
    //HotJar tag is disabled
    return false;
  }
} catch(error) {
  window.TealiumLog.error('Error while running HotJar extension. Error is: ' + error);
  return false;
} finally {
  var end = new Date().getTime();
  window.TealiumLog.log('HotJar extension took ' + (end - start) + ' milli seconds to run'); 
}
