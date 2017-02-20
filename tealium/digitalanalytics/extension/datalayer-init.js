/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/datalayer-init.js
 * Extension Name: datalayer-init.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * Version       : 2017.02.20.1418
 *
 * This script creates a calls the init function of the datalayer to initiate it
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
var tmeid="datalayer-init.js";

/*---------------------------------------------------MAIN FUNCTION---------------------------------------------------------*/
try {
   /* Initialize Data Layer */
   datalayer.log('+++DBDM-LOG > datalayer-init.js > Initializing Data Layer.');
   datalayer.init();

   if (window.jQueryNativeVersion) {
      datalayer.log('+++DBDM-LOG > datalayer-init.js > Using native jQuery version: ' + window.jQueryNativeVersion);
      digitalData.page.attribute.jQueryNativeVersion = window.jQueryNativeVersion;
   }
   else {
      datalayer.log('+++DBDM-LOG > datalayer-init.js > Using embedded jQuery version: ' + jQuery2.fn.jquery);
   }

   /* Save the current URL for SPAs and don't run pageview twice */
   window.referrerSPA = digitalData.page.pageInfo.destinationURL;
   window.pageviewSPA = false;

   /* Get demandbase data from v18 */
   datalayer.util.getDemandbaseUserData ();

   /* Send jQuery event for ddo_ready */
   datalayer.util.sendDatalayerReadyEvent();
   
}
catch (error) {
   datalayer.log('+++DBDM-ERROR > datalayer-init.js: ' + error);
}