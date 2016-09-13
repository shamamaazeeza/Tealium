/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/digitalanalytics-is-eluminate-loaded.js
 * Extension Name: digitalanalytics-is-eluminate-loaded.js
 * Scope         : All Coremetrics Tags
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE SVN VERSION IN ECLIPSE
 */
var tmeid="digitalanalytics-is-eluminate-loaded.js";
window.eluminate_loaded = false;
if (typeof(cmCreateElementTag) == "function" && typeof(cmCreateElementTag.isGhost) == "undefined" ) {
  window.eluminate_loaded=true;
}