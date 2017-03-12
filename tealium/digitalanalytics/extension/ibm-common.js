/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/ibm-common.js
 * Extension Name: ibm-common.js
 * Scope         : All Tags
 * Execution     : N/A
 * Version       : 2017.03.11.1724
 *
 * This script creates a calls the init function of the datalayer to initiate it
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
var tmeid = "ibm-common.js";
try {
   /* Ensure that the digitalData Object has not been reset by the page */
   if (typeof(window.digitalData.page.isDataLayerReady) === "undefined") {
      datalayer.init(0);
      datalayer.log('+++DBDM-LOG > ibm-common.js: digitalData was reset, recreating datalayer');
   }
   /* Ensure that we capture the CoreID6 cookie ID */
   if (typeof(window.digitalData.page.pageInfo.coremetrics.visitorID) === "undefined") {
      datalayer.fn.readCookies();
      datalayer.log('+++DBDM-LOG > ibm-common.js: Reading first-party cookies');
   }
   /* Ensure that we capture the anonymous ID from the cookie */
   if (typeof(window.digitalData.user.profile.auid) === "undefined") {
      digitalData.user.profile.auid = datalayer.fn.getCookie('BMAID');
   }
   /* Refresh the search terms and results */
   if (typeof(digitalData.page.pageInfo.onsiteSearchTerm) !== "undefined") {
      datalayer.util.setSearchTerms();
   }
}
catch (error) {
   datalayer.log('+++DBDM-ERROR > ibm-common.js: ' + error);
}