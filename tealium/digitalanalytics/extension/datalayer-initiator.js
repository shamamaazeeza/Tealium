/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/datalayer-initiator.js
 * Extension Name: datalayer-initiator.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * Version       : 2016.11.28.2236
 *
 * This script creates a calls the init function of the datalayer to initiate it
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
var tmeid="datalayer-initiator.js";

/*---------------------------------------------------MAIN FUNCTION---------------------------------------------------------*/
try {
   /* Initialize Data Layer */
   window.datalayer.init();

   /* Set userInfo from DemandBase */
   if (typeof(IBMCore) !== "undefined") {
      /* v18+ */
      try {
         /* Subscribe to the user IP data ready event and call the callback when it happens, 
          * or if it already happened ".asap" one. */
         IBMCore.common.util.user.subscribe("userIpDataReady", "customjs", datalayer.util.setUserInfo).runAsap(datalayer.util.setUserInfo);
      }
      catch (error) {
         console.log('+++DBDM-LOG > datalayer-initiator.js > update > IBMCore not ready: ' + error);
      }
   }
   else if (typeof(ibmweb) !== "undefined") {
      /* v17 and older */

      /* Set a timeout to kill the listener if it takes too long.
       * Set this first in case the user info is already ready when you set the listener. */
      userInfoTimeout = setTimeout(function() {
         ibmweb.queue.remove(userInfoQueue);
         console.log('+++DBDM-LOG > datalayer-initiator.js > User Info took too long');
      }, 3000);

      /* Set a listener to wait till the user IP data has been loaded, then call your function when it's available. */
      var userInfoQueue = ibmweb.queue.push(function () {
         return ibmweb.comusr.isLoaded();
      }, function () {
         /* Clear timeout since it returned in time. */
         clearTimeout(userInfoTimeout);
         /* Get user info now that it's ready. */
         datalayer.util.setUserInfoV17(); });
   }
   else {
      console.log('+++DBDM-LOG > datalayer-initiator.js > User Info not available');
   }

   /* Set Data Layer Ready */
   window.digitalData.page.isDataLayerReady = true;

   if (typeof(jQuery) !== "undefined") {
      /* Trigger Event for digitalData Object Ready */
      jQuery(document).trigger('ddo_ready');
      jQuery(document).trigger('datalayer_ready');

      /* Create variables for jQuery version and support for .on() function */
      window.jQueryVersion = utag_data.jQueryVersion = jQuery.fn.jquery;
      window.isJQueryOnSupported = utag_data.isJQueryOnSupported = jQuery.fn.on?true:false;

      /* Set Listener for DLE Readiness */
      if (window.isJQueryOnSupported) jQuery(document).on('dle_ready', datalayer.util.finalizeDataLayer);
   }
   else {
      console.log('+++DBDM-LOG > datalayer-initiator.js > jQuery not present: ' + error);
   }
}
catch (error) {
   console.error('+++DBDM-ERROR > datalayer-initiator.js: ' + error);
}