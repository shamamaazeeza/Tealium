/*
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/coremetrics-custom-data-mappings.js
 * Extension Name: coremetrics-custom-data-mappings.js
 * Scope         : Coremetrics Global ID
 * Execution     : N/A
 * Version       : 2016.12.18.1626
 *
 * This script creates a calls the init function of the datalayer to initiate it
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
//DDO isn't populating keywords for some reason so going to set it based on the meta value
if(typeof b["ddo.p.pi.keywords"] === 'undefined'){
   b["ddo.p.pi.keywords"] = b["meta.keywords"];
}

//Common Attributes Rule
if(typeof b.customAttr === 'undefined' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a21 = b["ddo.p.pi.templateVersion"];
   b.cm_PageviewTag_pv_a22 = b["ddo.p.pi.ibm.docid"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
}

//Rule for Cloud Exchange
if(b.siteID_value && b.siteID_value.toLowerCase().indexOf('cloudexchange') > -1 && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a21 = b["ddo.p.a.cspClient"];
   b.cm_PageviewTag_pv_a22 = b["ddo.p.a.cspOffering"];
   b.cm_PageviewTag_pv_a23 = b["ddo.p.a.cspSAPSiteId"];
   b.cm_PageviewTag_pv_a24 = b["ddo.p.a.cspCustHubId"];
   b.cm_PageviewTag_pv_a25 = b["ddo.p.a.cspICN"];
   b.cm_PageviewTag_pv_a26 = b["ddo.p.a.cspCMClientId"];
   b.cm_CookieDomain = b["cookiedomain"];
}

//Rule for Sales Portal
if(b.siteID_value && b.siteID_value.toLowerCase().indexOf('ins') === 0 && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a21 = b["ddo.p.pi.m.PageAttributes"];
   b.cm_PageviewTag_pv_a21 = b["meta.IBM.PageAttributes"];
   b.cm_PageviewTag_pv_a22 = b["customParam_RepID"];
   b.cm_PageviewTag_pv_a22 = b["ddo.p.pi.m.RepID"];
   b.cm_PageviewTag_pv_a22 = b["meta.RepID"];
   b.cm_PageviewTag_pv_a23 = b["customParam_rep_group"];
   b.cm_PageviewTag_pv_a23 = b["ddo.p.pi.m.rep_group"];
   b.cm_PageviewTag_pv_a23 = b["meta.rep_group"];
   b.cm_PageviewTag_pv_a24 = b["ddo.p.pi.m.DocID"];
   b.cm_PageviewTag_pv_a24 = b["customParam_DocID"];
   b.cm_PageviewTag_pv_a25 = b["ddo.p.pi.m.mode"];
   b.cm_PageviewTag_pv_a25 = b["customParam_mode"];
   b.cm_PageviewTag_pv_a26 = b["ddo.p.pi.m.PopID"];
   b.cm_PageviewTag_pv_a26 = b["meta.PopID"];
   b.cm_PageviewTag_pv_a27 = b["ddo.p.pi.m.NewContent"];
}

//Rule for Support - Problem reporting
if(b.siteID_value && (b.siteID_value.toLowerCase() === 'estcht' || b.siteID_value.toLowerCase() === 'estxsr') && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
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
if(b.siteID_value && (b.siteID_value.toLowerCase() === 'estmob' || b.siteID_value.toLowerCase() === 'estspa' || b.siteID_value.toLowerCase() === 'estspe') && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a21 = b["customParam_SP_CAMCO"];
   b.cm_PageviewTag_pv_a22 = b["customParam_SP_AVPCompanyName"];
   b.cm_PageviewTag_pv_a23 = b["customParam_SP_WICO"];
   b.cm_PageviewTag_pv_a24 = b["customParam_SP_WIDM"];
   b.cm_PageviewTag_pv_a25 = b["customParam_productID"];
   b.cm_PageviewTag_pv_a26 = b["customParam_productName"];
   b.cm_PageviewTag_pv_a27 = b["customParam_productCategory"];
}

//Rule for IBM Cloud
if(b.siteID_value && (b.siteID_value.toLowerCase() === 'mktibmcloud' || b.siteID_value.toLowerCase() === 'cloud') && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a28 = b["meta.IBM.UseCase"];
   b.cm_PageviewTag_pv_a28 = b["ddo.p.pi.ibm.UseCase"];
   b.cm_PageviewTag_pv_a28 = b["meta.IBM.Solution"];
   b.cm_PageviewTag_pv_a28 = b["ddo.p.pi.ibm.Solution"];
}

//Rule for SA_Message
if(b.siteID_value && b.siteID_value.toLowerCase() === 'cuf04' && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a24 = b["saMessage"];
}

//Rule for Think Leader
if(b.siteID_value && b.siteID_value.toLowerCase() === 'thinkleaders' && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a24 = b["customParam_ibmTMuser"];
}

//Rule for Partner World
if(b.siteID_value && (b.siteID_value.toLowerCase() === 'partnerworld' || b.siteID_value.toLowerCase() === 'contlisten' || b.siteID_value.toLowerCase() === 'pw') && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a21 = b["customParam_pw_bp_id"];
   b.cm_PageviewTag_pv_a22 = b["customParam_pw_ce_id"];
   b.cm_PageviewTag_pv_a23 = b["customParam_pw_locale"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a24 = b["ddo.p.pi.ibm.PW_Service"];
   b.cm_PageviewTag_pv_a24 = b["customParam_PW_Service"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a25 = b["ddo.p.pi.ibm.PW_Software"];
   b.cm_PageviewTag_pv_a25 = b["customParam_PW_Software"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a26 = b["ddo.p.pi.ibm.PW_Hardware"];
   b.cm_PageviewTag_pv_a26 = b["customParam_PW_Hardware"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a27 = b["ddo.p.pi.ibm.PW_Solution"];
   b.cm_PageviewTag_pv_a27 = b["customParam_PW_Solution"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a28 = b["ddo.p.pi.ibm.PW_Sponsor"];
   b.cm_PageviewTag_pv_a28 = b["customParam_PW_Sponsor"];
   b.cm_PageviewTag_pv_a29 = b["ddo.p.pi.ibm.PW_ECMContentType"];
   b.cm_PageviewTag_pv_a29 = b["customParam_PW_ECMContentType"];
   b.cm_PageviewTag_pv_a30 = b["customParam_business_unit"];
   b.cm_PageviewTag_pv_a31 = b["customParam_content_id"];
   b.cm_PageviewTag_pv_a32 = b["customParam_resource_type"];
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
}

//Rule for Developer Works
if(b.siteID_value && (b.siteID_value.toLowerCase() === 'devwrk' || b.siteID_value.toLowerCase() === 'dwnext') && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a21 = b["qp.ca"];
   b.cm_PageviewTag_pv_a22 = b["customParam_ibmCmaId"];
   b.cm_PageviewTag_pv_a23 = b["customParam_ibmContentAreas"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a24 = b["js_page.digitalData.page.category.primaryCategory"];
   b.cm_PageviewTag_pv_a24 = b["js_page.digitalData.page.category.categoryID"];
   b.cm_PageviewTag_pv_a24 = b["meta.IBM.WTMCategory"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a25 = b["ddo.p.pi.ibm.topic"];
   b.cm_PageviewTag_pv_a25 = b["meta.dW.Topic"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
}

//Rule for SSI
if(b.siteID_value && b.siteID_value.toLowerCase() === 'e021' && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
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
if(b.siteID_value && (b.siteID_value.toLowerCase() === 'estfix' || b.siteID_value.toLowerCase() === 'estset') && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a20 = b["customParam_productID"];
   b.cm_PageviewTag_pv_a21 = b["customParam_productName"];
   b.cm_PageviewTag_pv_a22 = b["customParam_productCategory"];
}

//Rule for ECOM
if(b.siteID_value && b.siteID_value.toLowerCase() === 'ecom' && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a27 = b["meta.IBM.WTMEComStore"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
   b.cm_PageviewTag_pv_a29 = b["qp.sapQuoteNum"];
}

//Rule for Bluemix
if(b.siteID_value && (b.siteID_value.toLowerCase() === 'bluemix' || b.siteID_value.toLowerCase() === 'bluemixTest') && b.customAttr && b.customAttr.toLowerCase() === 'true' && b["meta.IBM.WTMConfig"] && b["meta.IBM.WTMConfig"].toLowerCase() !== 'no-page-view' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_PageviewTag_pv_a47 = b["page_view_47"];
   b.cm_PageviewTag_pv_a24 = b["qp.lm"];
   b.cm_PageviewTag_pv_a25 = b["qp.lsr"];
   b.cm_PageviewTag_pv_a26 = b["qp.lot"];
   b.cm_PageviewTag_pv_a27 = b["qp.lsot"];
   b.cm_PageviewTag_pv_a28 = b["qp.lpg"];
}

//Rule for link tracking
if(b.siteID_value && b.siteID_value.toLowerCase() !== 'dwnext' && b.ibmEV && b.ibmEvAction && b.event_name && b.event_name.toLowerCase() === 'pagelinks' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_ElementTag_e_a22 = b["evCustomCE_cspClient"];
   b.cm_ElementTag_e_a23 = b["evCustomCE_cspOffering"];
   b.cm_ElementTag_e_a24 = b["evCustomCE_cspSAPSiteId"];
   b.cm_ElementTag_e_a25 = b["evCustomCE_cspCustHubId"];
   b.cm_ElementTag_e_a26 = b["evCustomCE_cspICN"];
   b.cm_ElementTag_e_a27 = b["evCustomCE_cspCMClientId"];
   b.cm_ElementTag_e_a28 = b["evCustomCE_cspAdvSrchOpt"];
   b.cm_ElementTag_e_a22 = b["evCustomSSI_htmlfid"];
   b.cm_ElementTag_e_a22 = b["evCustomSales_popid"];
   b.cm_ElementTag_e_a22 = b["evCustomIWM_docid"];
}

//Rule for ibmStats.event tracking for element tags
if(b.ibmEV && b.ibmEvAction && b.event_name && b.event_name.toLowerCase() === 'ibmstatsevent_element' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
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
   b.cm_ElementTag_e_a22 = b["customParam_htmlfid"];
}

//Rule for ibmStats.event tracking for conversion tag
if(b.ibmEV && b.ibmEvAction && b.event_name && b.event_name.toLowerCase() === 'ibmstatsevent_conversion' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_ConversionEventTag_c_a13 = b["category_id"];
   b.cm_ConversionEventTag_c_a14 = b["iniSiteID"];
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

//Rule for Conversion event on click
if(b.ibmEV && b.ibmEvAction && b.event_name && b.event_name.toLowerCase() === 'conversioneventlinks' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_ConversionEventTag_c_a14 = b["site_id"];
}

//Rule for ibmStats.event tracking for product view tag
if(b.event_name && b.event_name.toLowerCase() === 'ibmstatsevent_product' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
   b.cm_ProductviewTag_pr = b["proID"];
   b.cm_ProductviewTag_pm = b["proName"];
   b.cm_ProductviewTag_cg = b["proCategory"];
   b.cm_ProductviewTag_cm_vc = b["cm_vc"];
   b.cm_ProductviewTag_pr_a1 = b["productTag_a0"];
   b.cm_ProductviewTag_pr_a2 = b["productTag_a1"];
   b.cm_ProductviewTag_pr_a3 = b["productTag_a2"];
   b.cm_ProductviewTag_pr_a4 = b["productTag_a3"];
   b.cm_ProductviewTag_pr_a5 = b["productTag_a4"];
   b.cm_ProductviewTag_pr_a6 = b["productTag_a5"];
   b.cm_ProductviewTag_pr_a7 = b["productTag_a6"];
   b.cm_ProductviewTag_pr_a8 = b["productTag_a7"];
   b.cm_ProductviewTag_pr_a9 = b["productTag_a8"];
   b.cm_ProductviewTag_pr_a10 = b["productTag_a9"];
   b.cm_ProductviewTag_pr_a11 = b["productTag_a10"];
   b.cm_ProductviewTag_pr_a12 = b["productTag_a11"];
   b.cm_ProductviewTag_pr_a13 = b["productTag_a12"];
   b.cm_ProductviewTag_pr_a14 = b["productTag_a13"];
   b.cm_ProductviewTag_pr_a15 = b["productTag_a14"];
   b.cm_ProductviewTag_pr_a16 = b["productTag_a15"];
   b.cm_ProductviewTag_pr_a17 = b["productTag_a16"];
   b.cm_ProductviewTag_pr_a18 = b["productTag_a17"];
   b.cm_ProductviewTag_pr_a19 = b["productTag_a18"];
   b.cm_ProductviewTag_pr_a20 = b["productTag_a19"];
   b.cm_ProductviewTag_pr_a31 = b["productTag_serviceType"];
}

//Rule for Demand Base tag
if(b.siteID_value && b.siteID_value.toLowerCase() === 'bluemix' && b.ibmEV && b.ibmEvAction && b.event_name && b.event_name.toLowerCase() === 'demandbaseelement' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){
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

//Rule for Optimizely tag
if(b.ibmEV && b.ibmEvAction && b.event_name && b.event_name.toLowerCase() === 'optimizeevent' && digitalData.page.pageInfo.coremetrics.enabled === 'true'){

}