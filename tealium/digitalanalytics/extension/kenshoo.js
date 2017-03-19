/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/kenshoo.js
 * Extension Name: kenshoo.js
 * Scope         : All Tags
 * Execution     : N/A
 * Version       : 2017.02.15.0008
 *
 * This script creates a utility object to manage the datalayer for the Tag Management 
 * solution in IBM.
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
tmeid="kenshoo.js";

try {
    /* Only run this logic on utag.view events that are purchases (shop9) */
   if (b["ut.event"] === "link" && typeof(b["type"]) !== "undefined" && b["type"] === "purchase-tst" && b["eventAction"] === "9" 
      && (b["dom.url"].indexOf('ibm.com/marketplace/cloud/sec/OrderShippingBillingConfirmationMarketplaceView') > -1
       || b["dom.url"].indexOf('ibm.com/marketplace/cloud/OrderShippingBillingConfirmationMarketplaceView') > -1)) {
      /* set variables for Kenshoo Purchase */
      utag2.enableGlobalPixel(b, "ken_track_conv_id", "6219", "kenshoo.enabled");
      utag2.enableGlobalPixel(b, "ken_cid", "34a77bb6-1478-4709-976f-3d25260817f6");
      utag2.enableGlobalPixel(b, "ken_conv_type", "purchase");
      utag2.enableGlobalPixel(b, "product_id", b["productID"]);
      utag2.enableGlobalPixel(b, "ken_custom_parameter1", b["qp.storeId"]);
      utag2.enableGlobalPixel(b, "ken_custom_parameter2", b["productID"]);
      utag2.enableGlobalPixel(b, "ken_custom_parameter3", b["qp.langId"]);

      utag2.enableGlobalPixel(b, "ken_revenue", b["orderSubtotal"]);
   }
}
catch (error) {
    datalayer.log('+++DBDM-ERROR > convertro.js: ' + error);
}