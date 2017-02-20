/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/convertro.js
 * Extension Name: convertro.js
 * Scope         : All Tags
 * Execution     : N/A
 * Version       : 2017.02.07.0018
 *
 * This script creates a utility object to manage the datalayer for the Tag Management 
 * solution in IBM.
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
tmeid="convertro.js";

/* List of define prefix events in Convertro */
var PREFIXMAPPING = {
   "TRIAL-SIGNUP"     : "IBMID",
   "DEMO"             : "IBMID",
   "DOWNLOAD"         : "IBMID",
   "CONTACT-DL"       : "IBMID",
   "DEFAULT-SIGNUP"   : "IBMID",
   "SIGNUP"           : "IBMID",
   "SUBSCRIBE"        : "IBMID",
   "LVADVISOR:CHAT"   : "LC",
   "LVADVISOR:SCHDLR" : "SCD",
   "EXTERNAL-LINK"    : "EXTL",
};

try {
    /* Only run this logic on utag.view events that are completed conversions */
   if (b["ut.event"] === "link" && typeof(utag.data["ddo.p.pi.convertro.enabled"]) !== "undefined" && utag.data["ddo.p.pi.convertro.enabled"] === "true" 
      && typeof(b["type"]) !== "undefined" && b["type"] === "conversion" && b["eventAction"] === "2" && typeof(PREFIXMAPPING[b["primaryCategory"]]) !== "undefined"
      && b["eventName"] !== "ALL-CHAT-BUTTONS") {
      /* set variables for convertro */
      b["convertro_type"] = "Conversion";
      b["convertro_id"] = (b["primaryCategory"] || 'UNKNOWN') + '-' + (b["ddo.p.s.uSessionID"] || 'UNKNOWN') + '-' + (b["ddo.p.s.pageloadEpoch"] || 'UNKNOWN');
      b["convertro_value"] = "1";
      b["ddo.p.pi.convertro.enabled"] = "true";
      datalayer.log('+++DBDM-LOG > convertro.js > Captured conversion event: ' + b["convertro_id"]);
   }
}
catch (error) {
    datalayer.log('+++DBDM-ERROR > convertro.js: ' + error);
}