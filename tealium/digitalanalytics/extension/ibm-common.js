/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/ibm-common.js
 * Extension Name: ibm-common.js
 * Scope         : All Tags
 * Execution     : N/A
 * Version       : 2017.03.02.1156
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
      datalayer.util.readCookies();
      datalayer.log('+++DBDM-LOG > ibm-common.js: Reading first-party cookies');
   }
   /* Refresh the search terms and results */
   if (typeof(digitalData.page.pageInfo.onsiteSearchTerm) !== "undefined") {
      datalayer.util.setSearchTerms();
   }
   /*--------------------Get Mobile OS for User Agent--------------------*/
   digitalData.page.attribute.agentMobileOS = datalayer.util.getMobileOperatingSystem();   
}
catch (error) {
   datalayer.log('+++DBDM-ERROR > ibm-common.js: ' + error);
}