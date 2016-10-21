/*
 * Id            : tm-v1.0/tealium/lib-pageservices/extension/ps-ddo-update.js
 * Extension Name: Update DDO from IBM Global data 
 * Scope         : Pre Loader
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
// Copy IBM Global Data to DDO

try {  
  //window.TealiumLog.log('inside Update DDO from IBM Global data ');
  if (ibm_global_data && !window.copiedIBMGlobalDataToDDO) {
    //Override DDO values from ibm_global_data for SiteId, Content Category, GBT (override = true or not defined)
    //For other attributes (overwrite = false), override if the value is present, Ignore if the DDO attribute exists
    copyIBMGlobalDataToDDO(window, "digitalData.page.pageInfo.ibm.siteID", window.ibm_global_data["Site ID"]);
    copyIBMGlobalDataToDDO(window, "digitalData.page.category.primaryCategory", window.ibm_global_data["Content Category (CDF)"]);
    copyIBMGlobalDataToDDO(window, "digitalData.page.category.ibm.globalBrandTableL10", window.ibm_global_data["Page View Attribute 43"]);
    copyIBMGlobalDataToDDO(window, "digitalData.page.category.ibm.globalBrandTableL17", window.ibm_global_data["Page View Attribute 44"]);
    copyIBMGlobalDataToDDO(window, "digitalData.page.category.ibm.globalBrandTableL20", window.ibm_global_data["Page View Attribute 45"]);
    copyIBMGlobalDataToDDO(window, "digitalData.page.category.ibm.globalBrandTableL30", window.ibm_global_data["Page View Attribute 46"]);
    copyIBMGlobalDataToDDO(window, "digitalData.page.pageInfo.convertro.enabled", window.ibm_global_data["Convertro"], false);
    copyIBMGlobalDataToDDO(window, "digitalData.page.pageInfo.hotjar.enabled", window.ibm_global_data["HotJar"], false);
    copyIBMGlobalDataToDDO(window, "digitalData.page.pageInfo.medallia.enabled", window.ibm_global_data["Medallia"], false);
    copyIBMGlobalDataToDDO(window, "digitalData.page.pageInfo.medallia.responder", window.ibm_global_data["Medallia Contact"], false);
    copyIBMGlobalDataToDDO(window, "digitalData.page.pageInfo.optimizely.enabled", window.ibm_global_data["Optimizely"], false);
    copyIBMGlobalDataToDDO(window, "digitalData.page.pageInfo.optimizely.projectID", window.ibm_global_data["Optimizely Project ID"], false);
    window.copiedIBMGlobalDataToDDO = true;
    if (window.IBMDependencyRegistry) window.IBMDependencyRegistry.emit('tealium.ddo.loaded');
  }
} catch (error) {
  window.TealiumLog.error('Error while updating DDO from ibm_global_data. Error is: ' + error);
}
