/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/ibm-common-after-tags.js
 * Extension Name: ibm-common-after-tags.js
 * Scope         : All Tags
 * Execution     : N/A
 * Version       : 2017.02.09.1623
 *
 * This script updates data from UDO into DDO
 *
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *
 */
var tmeid = "ibm-common-after-tags.js";
try {
   /* Only run this logic after Tealium has fired the first page view */
  if(utag2.initialPageView && a === 'view') {
     /* Refresh DDO variabbles from UDO */
     datalayer.util.refreshFromUDO(b);
   }
}
catch (error) {
   datalayer.log('+++DBDM-ERROR > ibm-common-after-tags.js: ' + error);
}