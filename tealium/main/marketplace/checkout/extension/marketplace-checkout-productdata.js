/*
 * Id            : marketplace-checkout-productdata.js
 * Extension Name: Marketplace Thank You Page - Product Finder
 * Scope         : DOM Ready
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
if (utag.data['dom.url'].indexOf('ibm.com/marketplace/cloud/sec/OrderShippingBillingConfirmationMarketplaceView')>-1 || utag.data['dom.url'].indexOf('ibm.com/marketplace/cloud/OrderShippingBillingConfirmationMarketplaceView')>-1){
   var docCompleteTimer = setInterval(function(){
      if(document.readyState == 'complete'){
         //Now that the document is complete, stop checking
         clearInterval(docCompleteTimer);
         //Call utag.view for only the tag(s) that require waiting until document is complete
         console.log("SPSSS - Product id= " + PRODUCTID);
         if (typeof PRODUCTID != "string" || PRODUCTID == "") {PRODUCTID="NOTSET";}
         utag.data.product_id = PRODUCTID;
         utag.data.spss_td_ct = "0:" + utag.data['qp.storeId'] + "xy" + utag.data.product_id + "xy" + utag.data['qp.langId'];
         utag.view(utag.data, null, [2059,2060,373644,1175]);
         //console.log("fired");
      }
   },100);
}