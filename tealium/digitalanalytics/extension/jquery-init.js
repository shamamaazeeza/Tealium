/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/jquery-init.js
 * Extension Name: jquery-init.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * Version       : 2017.02.08.2016
 *
 * This script creates a calls the init function of the datalayer to initiate it
 *
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *
 */
var tmeid = "jquery-init.js";

window.utag_data = window.utag_data || {};
try {
   if (typeof(jQuery) !== "undefined" && typeof(jQuery.fn) !== "undefined" && typeof(jQuery.fn.on) !== "undefined") {
      /* Create variables for jQuery version and support for .on() function */
      window.jQueryVersion = utag_data.jQueryVersion = jQuery.fn.jquery;
      window.isJQueryOnSupported = utag_data.isJQueryOnSupported = jQuery.fn.on ? true : false;
   } 
   else {
      var jQFile = "//1.www.s81c.com/common/stats/jquery-2.2.4.min.js";
      console.log('+++DBDM-LOG > jquery-init.js > jQuery not present, loading: ' + jQFile);
      
      var jQFileRef = document.createElement("script");
      jQFileRef.setAttribute("type", "text/javascript");
      jQFileRef.setAttribute("src", jQFile);
      var node = document.getElementsByTagName("script")[0];
      node.parentNode.insertBefore(jQFileRef, node);
      
      /* Create variables for jQuery version and support for .on() function */
      window.jQueryVersion = utag_data.jQueryVersion = jQuery.fn.jquery;
      window.isJQueryOnSupported = utag_data.isJQueryOnSupported = jQuery.fn.on ? true : false;
   }
} 
catch (error) {
   console.error('+++DBDM-ERROR > jquery-init.js: ' + error);
}