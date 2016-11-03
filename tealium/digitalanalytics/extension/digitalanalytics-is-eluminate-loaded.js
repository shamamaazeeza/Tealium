/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/digitalanalytics-is_eluminate_loaded-cust.js
 * Extension Name: digitalanalytics-is_eluminate_loaded-cust.js
 * Scope         : All Coremetrics Tags
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE SVN VERSION IN ECLIPSE
 */
var tmeid="digitalanalytics-is_eluminate_loaded.js";
window.eluminate_loaded = false;
if (typeof(cmCreateElementTag) == "function" && typeof(cmCreateElementTag.isGhost) == "undefined" ) {
  window.eluminate_loaded=true;
  window.digitalData.page.pageInfo.coremetrics.isEluminateLoaded = true;
  utag.data["js_page.digitalData.page.pageInfo.coremetrics.isEluminateLoaded"] = window.digitalData.page.pageInfo.coremetrics.isEluminateLoaded.toString();
  utag.DB("+++TME > digitalanalytics-is_eluminate_loaded.js: Don't run eluminate.js twice.");
}