/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/pageClickEventHandler-init.js
 * Extension Name: jquery-init.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * Version       : 2017.02.10.1219
 *
 * This script sets listerners for pagecliks
 *
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *
 */
var tmeid = "pageClickEventHandler-init.js";

try {
   /* Set listener for clicks on hyperlinks and buttons */
   jQuery2('body').on('click', 'a,button', function (e) {
      datalayer.util.pageClickEventHandler(event);
   });
} 
catch (error) {
   datalayer.log('+++DBDM-ERROR > pageClickEventHandler-init.js: ' + error);
}