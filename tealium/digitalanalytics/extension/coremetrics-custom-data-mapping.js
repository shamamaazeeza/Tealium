/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/coremetrics-custom-data-mappings.js
 * Extension Name: coremetrics-custom-data-mappings.js
 * Scope         : Coremetrics Global ID
 * Execution     : N/A
 * Version       : 2016.12.18.2044
 *
 * This script creates a calls the init function of the datalayer to initiate it
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
try {
   //DDO isn't populating keywords for some reason so going to set it based on the meta value
   if (typeof(b["ddo.p.pi.keywords"]) === 'undefined') {
      b["ddo.p.pi.keywords"] = b["meta.keywords"];
   }

   //Common Attributes Rule
   /*if(typeof b.customAttr === 'undefined' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
     b.cm_PageviewTag_pv_a21 = b["ddo.p.pi.templateVersion"];
     b.cm_PageviewTag_pv_a22 = b["ddo.p.pi.ibm.docid"];
     b.cm_PageviewTag_pv_a24 = b["qp.lm"];
     b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
     b.cm_PageviewTag_pv_a26 = b["qp.lot"];
     b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
     b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
     b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   }*/

   //Rule for Cloud Exchange
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase().indexOf('cloudexchange') > -1) {
      b.cm_PageviewTag_pv_a21 = b["ddo.p.a.cspClient"];
      b.cm_PageviewTag_pv_a22 = b["ddo.p.a.cspOffering"];
      b.cm_PageviewTag_pv_a23 = b["ddo.p.a.cspSAPSiteId"];
      b.cm_PageviewTag_pv_a24 = b["ddo.p.a.cspCustHubId"];
      b.cm_PageviewTag_pv_a25 = b["ddo.p.a.cspICN"];
      b.cm_PageviewTag_pv_a26 = b["ddo.p.a.cspCMClientId"];
      b.cm_CookieDomain = b["ddo.p.pi.destinationDomain"];
   }

   //Rule for Sales Portal
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase().indexOf('ins') === 0) {
      b.cm_PageviewTag_pv_a21 = b["ddo.p.pi.m.PageAttributes"] || b["meta.IBM.PageAttributes"];
      b.cm_PageviewTag_pv_a22 = b["ddo.p.pi.m.RepID"] || b["meta.RepID"] || b["customParam_RepID"];
      b.cm_PageviewTag_pv_a23 = b["ddo.p.pi.m.rep_group"] || b["meta.rep_group"] || b["customParam_rep_group"];
      b.cm_PageviewTag_pv_a24 = b["ddo.p.pi.m.DocID"] || b["customParam_DocID"];
      b.cm_PageviewTag_pv_a25 = b["ddo.p.pi.m.mode"] || b["customParam_mode"];
      b.cm_PageviewTag_pv_a26 = b["ddo.p.pi.m.PopID"] || b["meta.PopID"];
      b.cm_PageviewTag_pv_a27 = b["ddo.p.pi.m.NewContent"];
   }

   //Rule for Support - Problem reporting
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'estcht' || b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'estxsr') {
      b.cm_PageviewTag_pv_a21 = b["customParam_SR_DOMAIN"];
      b.cm_PageviewTag_pv_a22 = b["customParam_SR_EMAILADDRESS"];
      b.cm_PageviewTag_pv_a23 = b["customParam_SR_ICN"];
      b.cm_PageviewTag_pv_a24 = b["customParam_SR_PIDVRMCOMPREL"];
      b.cm_PageviewTag_pv_a25 = b["customParam_SR_PREFERREDCONTACTMETHOD"];
      b.cm_PageviewTag_pv_a26 = b["customParam_SR_PRIMIUMRESPONSESELECTED"];
      b.cm_PageviewTag_pv_a27 = b["customParam_SR_PRODID"];
      b.cm_PageviewTag_pv_a28 = b["customParam_SR_PRODSOURCE"];
      b.cm_PageviewTag_pv_a29 = b["customParam_SR_REQUESTTYPE"];
      b.cm_PageviewTag_pv_a30 = b["customParam_SR_SEVERITY"];
      b.cm_PageviewTag_pv_a31 = b["customParam_SR_SOURCEAPPL"];
      b.cm_PageviewTag_pv_a32 = b["customParam_SR_SUCCESS"];
      b.cm_PageviewTag_pv_a33 = b["customParam_SR_TYPE"];
      b.cm_PageviewTag_pv_a34 = b["customParam_SR_UNEXPECTEDERROR_CONTACTID"];
      b.cm_PageviewTag_pv_a35 = b["customParam_SR_UNEXPECTEDERROR_DOMAIN"];
      b.cm_PageviewTag_pv_a36 = b["customParam_SR_UNEXPECTEDERROR_USER"];
      b.cm_PageviewTag_pv_a37 = b["customParam_SR_UNEXPECTEDERROR_NODE"];
      b.cm_PageviewTag_pv_a38 = b["qp.srChannel"];
      b.cm_PageviewTag_pv_a39 = b["qp.srFromAction"];
      b.cm_PageviewTag_pv_a40 = b["customParam_SR_ECIIC"];
      b.cm_PageviewTag_pv_a41 = b["customParam_SR_MACHTYPEMOD"];
      b.cm_PageviewTag_pv_a42 = b["customParam_SR_COMPID"];
   }

   //Rule for Support - Content Navigation
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'estmob' || b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'estspa' 
   || b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'estspe') {
      b.cm_PageviewTag_pv_a21 = b["customParam_SP_CAMCO"];
      b.cm_PageviewTag_pv_a22 = b["customParam_SP_AVPCompanyName"];
      b.cm_PageviewTag_pv_a23 = b["customParam_SP_WICO"];
      b.cm_PageviewTag_pv_a24 = b["customParam_SP_WIDM"];
      b.cm_PageviewTag_pv_a25 = b["customParam_productID"];
      b.cm_PageviewTag_pv_a26 = b["customParam_productName"];
      b.cm_PageviewTag_pv_a27 = b["customParam_productCategory"];
   }

   //Rule for IBM Cloud
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'mktibmcloud' || b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'cloud') {
      b.cm_PageviewTag_pv_a28 = b["ddo.p.pi.ibm.UseCase"] || b["meta.IBM.UseCase"];
      b.cm_PageviewTag_pv_a29 = b["ddo.p.pi.ibm.Solution"] || b["meta.IBM.Solution"];
   }

   //Rule for SA_Message
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'cuf04') {
      b.cm_PageviewTag_pv_a24 = b["saMessage"];
   }

   //Rule for Think Leader
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'thinkleaders') {
      b.cm_PageviewTag_pv_a24 = b["customParam_ibmTMuser"];
   }

   //Rule for Partner World
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'partnerworld' || b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'contlisten' 
   || b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'pw') {
      b.cm_PageviewTag_pv_a21 = b["customParam_pw_bp_id"];
      b.cm_PageviewTag_pv_a22 = b["customParam_pw_ce_id"];
      b.cm_PageviewTag_pv_a23 = b["customParam_pw_locale"];
      b.cm_PageviewTag_pv_a24 = b["ddo.p.pi.ibm.PW_Service"] || b["customParam_PW_Service"];
      b.cm_PageviewTag_pv_a25 = b["ddo.p.pi.ibm.PW_Software"] || b["customParam_PW_Software"];
      b.cm_PageviewTag_pv_a26 = b["ddo.p.pi.ibm.PW_Hardware"] || b["customParam_PW_Hardware"];
      b.cm_PageviewTag_pv_a27 = b["ddo.p.pi.ibm.PW_Solution"] || b["customParam_PW_Solution"];
      b.cm_PageviewTag_pv_a28 = b["ddo.p.pi.ibm.PW_Sponsor"] || b["customParam_PW_Sponsor"];
      b.cm_PageviewTag_pv_a29 = b["ddo.p.pi.ibm.PW_ECMContentType"] || b["customParam_PW_ECMContentType"];
      b.cm_PageviewTag_pv_a30 = b["customParam_business_unit"];
      b.cm_PageviewTag_pv_a31 = b["customParam_content_id"];
      b.cm_PageviewTag_pv_a32 = b["customParam_resource_type"];
   }

   //Rule for Developer Works
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'devwrk' || b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'dwnext') {
      b.cm_PageviewTag_pv_a21 = b["qp.ca"];
      b.cm_PageviewTag_pv_a22 = b["customParam_ibmCmaId"];
      b.cm_PageviewTag_pv_a23 = b["customParam_ibmContentAreas"];
      b.cm_PageviewTag_pv_a24 = b["ddo.p.c.primaryCategory"] || b["ddo.p.c.categoryID"] || b["meta.IBM.WTMCategory"];
      b.cm_PageviewTag_pv_a25 = b["ddo.p.pi.ibm.topic"] || b["meta.dW.Topic"];
   }

   //Rule for SSI
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'e021') {
      b.cm_PageviewTag_pv_a21 = b["customParam_htmlfid"];
      b.cm_PageviewTag_pv_a22 = b["customParam_appname"];
      b.cm_PageviewTag_pv_a23 = b["customParam_infotype"];
      b.cm_PageviewTag_pv_a24 = b["customParam_subtype"];
      b.cm_PageviewTag_pv_a25 = b["customParam_ssiContentInfo"];
      b.cm_PageviewTag_pv_a26 = b["customParam_docURL"];
      b.cm_PageviewTag_pv_a27 = b["customParam_lang"];
      b.cm_PageviewTag_pv_a28 = b["customParam_request_locale"];
      b.cm_PageviewTag_pv_a29 = b["customParam_Assettype"];
      b.cm_PageviewTag_pv_a30 = b["customParam_Doctype"];
      b.cm_PageviewTag_pv_a31 = b["customParam_CGCode"];
      b.cm_PageviewTag_pv_a32 = b["customParam_ctype"];
      b.cm_PageviewTag_pv_a33 = b["customParam_ctry"];
   }

   //Rule for Support - Fix Delivery
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'estfix' || b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'estset') {
      b.cm_PageviewTag_pv_a20 = b["customParam_productID"];
      b.cm_PageviewTag_pv_a21 = b["customParam_productName"];
      b.cm_PageviewTag_pv_a22 = b["customParam_productCategory"];
   }

   //Rule for ECOM
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'ecom') {
      b.cm_PageviewTag_pv_a27 = b["meta.IBM.WTMEComStore"];
      b.cm_PageviewTag_pv_a29 = b["qp.sapQuoteNum"];
   }

   //Rule for Bluemix Demand Base tag
   if ((b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'bluemix' || b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'bluemixTest') 
      && b.event_name && b.event_name.toLowerCase() === 'demandbaseelement') {
      b.cm_ElementTag_e_a29 = b["DB_company_name"];
      b.cm_ElementTag_e_a30 = b["DB_annual_sales"];
      b.cm_ElementTag_e_a31 = b["DB_audience"];
      b.cm_ElementTag_e_a32 = b["DB_audience_segment"];
      b.cm_ElementTag_e_a33 = b["DB_b2b"];
      b.cm_ElementTag_e_a34 = b["DB_b2c"];
      b.cm_ElementTag_e_a35 = b["DB_employee_count"];
      b.cm_ElementTag_e_a36 = b["DB_country"];
      b.cm_ElementTag_e_a37 = b["DB_city"];
      b.cm_ElementTag_e_a38 = b["DB_forbes_2000"];
      b.cm_ElementTag_e_a39 = b["DB_forbes_1000"];
      b.cm_ElementTag_e_a40 = b["DB_industry"];
      b.cm_ElementTag_e_a41 = b["DB_sub_industry"];
      b.cm_ElementTag_e_a42 = b["DB_revenue_range"];
      b.cm_ElementTag_e_a43 = b["DB_employee_range"];
      b.cm_ElementTag_e_a44 = b["DB_demandbase_sid"];
      b.cm_ElementTag_e_a45 = b["DB_ip"];
      b.cm_ElementTag_e_a46 = b["DB_country_name"];
      b.cm_ElementTag_e_a47 = b["DB_primary_sic"];
      b.cm_ElementTag_e_a48 = b["DB_web_site"];
      b.cm_ElementTag_e_a49 = b["DB_state"];
      b.cm_ElementTag_e_a50 = b["DB_watch_list"];
   }
   //Rule for link tracking for developerWorks
   if (b["ddo.p.pi.ibm.iniSiteID"].toLowerCase() === 'dwnext' && b.eventName && b.eventName.toLowerCase() === 'pagelinks') {
      b.cm_ElementTag_e_a22 = b["evCustomCE_cspClient"] || b["evCustomSSI_htmlfid"] || b["evCustomSales_popid"] || b["evCustomIWM_docid"];
      b.cm_ElementTag_e_a23 = b["evCustomCE_cspOffering"];
      b.cm_ElementTag_e_a24 = b["evCustomCE_cspSAPSiteId"];
      b.cm_ElementTag_e_a25 = b["evCustomCE_cspCustHubId"];
      b.cm_ElementTag_e_a26 = b["evCustomCE_cspICN"];
      b.cm_ElementTag_e_a27 = b["evCustomCE_cspCMClientId"];
      b.cm_ElementTag_e_a28 = b["evCustomCE_cspAdvSrchOpt"];
   }

   //Rule for ibmStats.event tracking for element tags
   if (b.event_name && b.event_name.toLowerCase() === 'ibmstatsevent_element') {
      b.cm_ElementTag_e_a22 = b["formName"];
      b.cm_ElementTag_e_a23 = b["field1"];
      b.cm_ElementTag_e_a24 = b["field2"];
      b.cm_ElementTag_e_a25 = b["field3"];
      b.cm_ElementTag_e_a26 = b["field4"];
      b.cm_ElementTag_e_a27 = b["field5"];
      b.cm_ElementTag_e_a28 = b["field6"];
      b.cm_ElementTag_e_a29 = b["field7"];
      b.cm_ElementTag_e_a30 = b["field8"];
      b.cm_ElementTag_e_a31 = b["field9"];
      b.cm_ElementTag_e_a32 = b["field10"];
      b.cm_ElementTag_e_a33 = b["field11"];
      b.cm_ElementTag_e_a34 = b["field12"];
      b.cm_ElementTag_e_a35 = b["field13"];
      b.cm_ElementTag_e_a36 = b["field14"];
      b.cm_ElementTag_e_a37 = b["field15"];
   }

   //Rule for ibmStats.event tracking for conversion tag
   if (b.event_name && b.event_name.toLowerCase() === 'ibmstatsevent_conversion') {
      b.cm_ConversionEventTag_c_a22 = b["formName"];
      b.cm_ConversionEventTag_c_a23 = b["field1"];
      b.cm_ConversionEventTag_c_a24 = b["field2"];
      b.cm_ConversionEventTag_c_a25 = b["field3"];
      b.cm_ConversionEventTag_c_a26 = b["field4"];
      b.cm_ConversionEventTag_c_a27 = b["field5"];
      b.cm_ConversionEventTag_c_a28 = b["field6"];
      b.cm_ConversionEventTag_c_a29 = b["field7"];
      b.cm_ConversionEventTag_c_a30 = b["field8"];
      b.cm_ConversionEventTag_c_a31 = b["field9"];
      b.cm_ConversionEventTag_c_a32 = b["field10"];
      b.cm_ConversionEventTag_c_a33 = b["field11"];
      b.cm_ConversionEventTag_c_a34 = b["field12"];
      b.cm_ConversionEventTag_c_a35 = b["field13"];
      b.cm_ConversionEventTag_c_a36 = b["field14"];
      b.cm_ConversionEventTag_c_a37 = b["field15"];
   }

   //Rule for ibmStats.event tracking for product view tag
   if (b.eventName && b.eventName.toLowerCase() === 'product') {
      b.cm_ProductviewTag_pr_a31 = b["productTag_serviceType"];
   }

}
catch (error) {
   datalayer.log('+++DBDM-ERROR > coremetrics-custom-data-mappings.js: ' + error);
}