/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/digitalanalytics-check_eluminate_duplicate-cust.js
 * Extension Name: digitalanalytics-core-pre.js
 * Scope         : Pre Loader
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE SVN VERSION IN ECLIPSE
 */
window.eluminate_loaded = false;
if (typeof(cmCreateElementTag) == "function" && typeof(cmCreateElementTag.isGhost) == "undefined" ) {
  window.eluminate_loaded=true;
}