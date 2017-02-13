/**
 * Id            : tm-v1.0/tealium/digitalanalytics/extension/coremetrics-custom-data-mappings.js
 * Extension Name: coremetrics-custom-data-mappings.js
 * Scope         : Coremetrics Global ID
 * Execution     : N/A
 * Version       : 2017.02.09.1623
 *
 * This script creates a calls the init function of the datalayer to initiate it
 * 
 *  NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION
 *        https://github.ibm.com/tag-management/tm-v1.0.git
 *        
 */
var tmeid = "coremetrics-custom-data-mappings.js";
try {
   /* setting Client ID */
   if (b["ddo.p.pi.coremetrics.clientID"] !== digitalData.page.pageInfo.coremetrics.clientID || b["ddo.p.pi.ibm.siteID"] !== digitalData.page.pageInfo.ibm.siteID) {
      datalayer.util.setClientID();
      b["ddo.p.pi.coremetrics.clientID"] = digitalData.page.pageInfo.coremetrics.clientID;
   }
   
   /* DDO isn't populating keywords for some reason so going to set it based on the meta value */
   if (typeof(b["ddo.p.pi.keywords"]) === 'undefined') {
      b["ddo.p.pi.keywords"] = b["meta.keywords"];
   }
   
   /* Set siteID to accommodate TEST site IDs, "test" can be a prefix or suffix */
   var siteID = b["ddo.p.pi.ibm.iniSiteID"].toLowerCase().replace(/^test|test$/,"");

   /* Common Attributes Rule */
   b.cm_PageViewTag_pv_a21 = b["ddo.p.pi.templateVersion"] || "";
   b.cm_PageViewTag_pv_a22 = b["ddo.p.pi.ibm.docid"] || "";
   b.cm_PageViewTag_pv_a24 = b["qp.lm"]   || "";
   b.cm_PageViewTag_pv_a25 = b["qp.lsr"]  || "";
   b.cm_PageViewTag_pv_a26 = b["qp.lot"]  || "";
   b.cm_PageViewTag_pv_a27 = b["qp.lsot"] || "";
   b.cm_PageViewTag_pv_a28 = b["qp.lpg"]  || "";

   /* Rule for Cloud Exchange */
   if (siteID.indexOf('cloudexchange') > -1) {
      b.cm_PageViewTag_pv_a21 = b["ddo.p.a.cspClient"];
      b.cm_PageViewTag_pv_a22 = b["ddo.p.a.cspOffering"];
      b.cm_PageViewTag_pv_a23 = b["ddo.p.a.cspSAPSiteId"];
      b.cm_PageViewTag_pv_a24 = b["ddo.p.a.cspCustHubId"];
      b.cm_PageViewTag_pv_a25 = b["ddo.p.a.cspICN"];
      b.cm_PageViewTag_pv_a26 = b["ddo.p.a.cspCMClientId"];
   }

   /* Rule for Sales Portal */
   if (siteID.indexOf('ins') === 0) {
      if (typeof (window.saleParams) === "undefined") window.saleParams = {};
      getNTPTVariable(saleParams);
      
      b.cm_PageViewTag_pv_a21 = b["ddo.p.pi.m.PageAttributes"] || b["meta.IBM.PageAttributes"] || "";
      b.cm_PageViewTag_pv_a22 = saleParams["RepID"]            || b["meta.RepID"]              || "";
      b.cm_PageViewTag_pv_a23 = saleParams["rep_group"]        || b["meta.rep_group"]          || "";
      b.cm_PageViewTag_pv_a24 = saleParams["DocID"]            || "";
      b.cm_PageViewTag_pv_a25 = saleParams["mode"]             || "";
      b.cm_PageViewTag_pv_a26 = b["ddo.p.pi.m.PopID"]          || b["meta.PopID"]              || "";
      b.cm_PageViewTag_pv_a27 = b["ddo.p.pi.m.NewContent"]     || "";
   }

   /* Rule for Support - Problem reporting */
   if (siteID === 'estcht' || siteID === 'estxsr') {
      if (typeof(window.supportParams) === "undefined") window.supportParams = {};
      getNTPTVariable(supportParams);

      b.cm_PageViewTag_pv_a21 = supportParams["SR_DOMAIN"] || "";
      b.cm_PageViewTag_pv_a22 = supportParams["SR_EMAILADDRESS"] || "";
      b.cm_PageViewTag_pv_a23 = supportParams["SR_ICN"] || "";
      b.cm_PageViewTag_pv_a24 = supportParams["SR_PIDVRMCOMPREL"] || "";
      b.cm_PageViewTag_pv_a25 = supportParams["SR_PREFERREDCONTACTMETHOD"] || "";
      b.cm_PageViewTag_pv_a26 = supportParams["SR_PRIMIUMRESPONSESELECTED"] || "";
      b.cm_PageViewTag_pv_a27 = supportParams["SR_PRODID"] || "";
      b.cm_PageViewTag_pv_a28 = supportParams["SR_PRODSOURCE"] || "";
      b.cm_PageViewTag_pv_a29 = supportParams["SR_REQUESTTYPE"] || "";
      b.cm_PageViewTag_pv_a30 = supportParams["SR_SEVERITY"] || "";
      b.cm_PageViewTag_pv_a31 = supportParams["SR_SOURCEAPPL"] || "";
      b.cm_PageViewTag_pv_a32 = supportParams["SR_SUCCESS"] || "";
      b.cm_PageViewTag_pv_a33 = supportParams["SR_TYPE"] || "";
      b.cm_PageViewTag_pv_a34 = supportParams["SR_UNEXPECTEDERROR_CONTACTID"] || "";
      b.cm_PageViewTag_pv_a35 = supportParams["SR_UNEXPECTEDERROR_DOMAIN"] || "";
      b.cm_PageViewTag_pv_a36 = supportParams["SR_UNEXPECTEDERROR_USER"] || "";
      b.cm_PageViewTag_pv_a37 = supportParams["SR_UNEXPECTEDERROR_NODE"] || "";
      b.cm_PageViewTag_pv_a38 = b["qp.srChannel"];
      b.cm_PageViewTag_pv_a39 = b["qp.srFromAction"];
      b.cm_PageViewTag_pv_a40 = supportParams["SR_ECIIC"] || "";
      b.cm_PageViewTag_pv_a41 = supportParams["SR_MACHTYPEMOD"] || "";
      b.cm_PageViewTag_pv_a42 = supportParams["SR_COMPID"] || "";
   }

   /* Rule for Support - Content Navigation */
   if (siteID === 'estmob' || siteID === 'estspa' || siteID === 'estspe') {
      if (typeof(window.supportParams) === "undefined") window.supportParams = {};
      getNTPTVariable(supportParams);      
      getCmCreateProductView();
      
      b.cm_PageViewTag_pv_a21 = supportParams["SP.CAMCO"] || "";
      b.cm_PageViewTag_pv_a22 = supportParams["SP.AVPCompanyName"] || "";
      b.cm_PageViewTag_pv_a23 = supportParams["SP.WICO"] || "";
      b.cm_PageViewTag_pv_a24 = supportParams["SP.WIDM"] || "";
      b.cm_PageViewTag_pv_a25 = b["customParam_productID"]       || "";
      b.cm_PageViewTag_pv_a26 = b["customParam_productName"]     || "";
      b.cm_PageViewTag_pv_a27 = b["customParam_productCategory"] || "";
   }

   /* Rule for Support - Fix Delivery profile */
   if (siteID === 'estfix' || siteID === 'estset') {
      getCmCreateProductView();
      
      b.cm_PageViewTag_pv_a25 = b["customParam_productID"]       || "";
      b.cm_PageViewTag_pv_a26 = b["customParam_productName"]     || "";
      b.cm_PageViewTag_pv_a27 = b["customParam_productCategory"] || "";
   }
   
   /* Rule for IBM Cloud */
   if (siteID === 'mktibmcloud' || siteID === 'cloud') {
      b.cm_PageViewTag_pv_a28 = b["ddo.p.pi.ibm.UseCase"]  || b["meta.IBM.UseCase"]  || "";
      b.cm_PageViewTag_pv_a29 = b["ddo.p.pi.ibm.Solution"] || b["meta.IBM.Solution"] || "";
   }

   /* Rule for SA_Message */
   if (siteID === 'cuf04' || siteID === "osol") {
      b.cm_PageViewTag_pv_a24 = window.SA_Message || "";
   }

   /* Rule for Think Leader */
   if (siteID === 'thinkleaders') {
      if (typeof (window.thinkParams) == "undefined") window.thinkParams = {};
      getNTPTVariable(thinkParams);

      b.cm_PageViewTag_pv_a24 = thinkParams["ibmTMuser"]  || "";
   }

   /* Rule for Partner World */
   if (siteID === 'partnerworld' || siteID === 'contlisten' || siteID === 'pw') {
      if (typeof(window.pwParams) === "undefined") window.pwParams = {};
      getNTPTVariable(pwParams);      

      b.cm_PageViewTag_pv_a21 = pwParams["pw_bp_id"]  || "";
      b.cm_PageViewTag_pv_a22 = pwParams["pw_ce_id"]  || "";
      b.cm_PageViewTag_pv_a23 = pwParams["pw_locale"] || "";
      b.cm_PageViewTag_pv_a24 = b["ddo.p.pi.ibm.PW_Service"]        || pwParams["PW.Service"] || "";
      b.cm_PageViewTag_pv_a25 = b["ddo.p.pi.ibm.PW_Software"]       || pwParams["PW.Software"] || "";
      b.cm_PageViewTag_pv_a26 = b["ddo.p.pi.ibm.PW_Hardware"]       || pwParams["PW.Hardware"] || "";
      b.cm_PageViewTag_pv_a27 = b["ddo.p.pi.ibm.PW_Solution"]       || pwParams["PW.Solution"] || "";
      b.cm_PageViewTag_pv_a28 = b["ddo.p.pi.ibm.PW_Sponsor"]        || pwParams["PW.Sponsor"] || "";
      b.cm_PageViewTag_pv_a29 = b["ddo.p.pi.ibm.PW_ECMContentType"] || pwParams["PW.ECMContentType"] || "";;
      b.cm_PageViewTag_pv_a30 = pwParams["business_unit"] || "";
      b.cm_PageViewTag_pv_a31 = pwParams["content_id"]    || "";
      b.cm_PageViewTag_pv_a32 = pwParams["resource_type"] || "";

      /* initialize window.digitalData.page.attribute.extraFields if needed */
      if (typeof(window.digitalData.page.attribute.extraFields) === "undefined") {
         if (typeof(window.CM_EXTRA) !== "undefined" && window.CM_EXTRA !== "") {
            digitalData.page.attribute.extraFields = "";
            arr1 = CM_EXTRA.split('&'),
            j = 0;
            for (var i = 0; i < arr1.length; i++) {
               var ex = "cm_PageviewTag_pv" + (i + 1);
               b[ex] = arr1[i].split('=')[1];
               digitalData.page.attribute.extraFields += arr1[i].split('=')[1] + "-_-";
            }
         }
      }

   }
   
   /* Rule for Developer Works */
   if (siteID === 'devwrk' || siteID === 'devwrks' || siteID === 'dwnext') {
      if (typeof (window.devworkParams) == "undefined") window.devworkParams = {};
      getNTPTVariable(devworkParams);

      b.cm_PageViewTag_pv_a21 = b["qp.ca"];
      b.cm_PageViewTag_pv_a22 = devworkParams["ibmCmaId"] || "";
      b.cm_PageViewTag_pv_a23 = devworkParams["ibmContentAreas"] || "";
      /* 2017-02-03 - jleon: Setting to initial value for Page Category */
      b.cm_PageViewTag_pv_a24 = b["ddo.p.c.iniPrimaryCategory"] || b["ddo.p.c.categoryID"] || b["meta.IBM.WTMCategory"];
      b.cm_PageViewTag_pv_a25 = b["ddo.p.pi.ibm.topic"] || b["meta.dW.Topic"];
   }

   /* Rule for SSI */
   if (siteID === 'e021') {
      var ssiParams = {}, tokens, i, temp;

      if (typeof(digitalData.util.meta.contentinfo) !== "undefined" && digitalData.util.meta.contentinfo.indexOf('~') !== -1) {
         tokens = digitalData.util.meta.contentinfo.split('~');
         for (i=0, tl=tokens.length; i < tl; i++) {
            temp = tokens[i].split(':');
            ssiParams[temp[0].toUpperCase()] = window.decodeURIComponent(temp[1]);
         }
      }
      
      b.cm_PageViewTag_pv_a21 = digitalData.util.qp.htmlfid  || ssiParams.HTMLFID || ((typeof(digitalData.util.qp.supplier) !== "undefined" && typeof(digitalData.util.qp.letternum) !== "undefined") ? digitalData.util.qp.supplier + "/" + digitalData.util.qp.letternum : "");
      b.cm_PageViewTag_pv_a22 = digitalData.util.qp.appname  || ""; 
      b.cm_PageViewTag_pv_a23 = digitalData.util.qp.infotype || ssiParams.INFOTYPE || "";
      if (b.cm_PageViewTag_pv_a23 === "") {
         if (location.href.indexOf('/rep_ca/') !== -1) b.cm_PageViewTag_pv_a23 = 'AN';
         else if (location.href.indexOf('/rep_oc/') !== -1) b.cm_PageViewTag_pv_a23 = 'OC';
         else if (location.href.indexOf('/rep_sm/') !== -1 || location.href.indexOf('/rep_rp/') !== -1) b.cm_PageViewTag_pv_a23 = 'DD';
         
      }
      b.cm_PageViewTag_pv_a24 = digitalData.util.qp.subtype  || ssiParams.INFOSUBTYPE || ssiParams.SUBTYPE || "";
      if (b.cm_PageViewTag_pv_a24 === "") {
         if (location.href.indexOf('/rep_ca/') !== -1) b.cm_PageViewTag_pv_a24 = 'CA';
         else if (location.href.indexOf('/rep_oc/') !== -1) b.cm_PageViewTag_pv_a24 = 'NA';
         else if (location.href.indexOf('/rep_sm/') !== -1) b.cm_PageViewTag_pv_a24 = 'SM';
         else if (location.href.indexOf('/rep_rp/') !== -1) b.cm_PageViewTag_pv_a24 = 'RP';        
      }
      b.cm_PageViewTag_pv_a25 = digitalData.util.meta.contentinfo || "";
      b.cm_PageViewTag_pv_a26 = digitalData.util.qp.docURL   || "";
      b.cm_PageViewTag_pv_a27 = digitalData.util.qp.lang     || "";
      b.cm_PageViewTag_pv_a28 = digitalData.util.qp.request_locale || "";
      b.cm_PageViewTag_pv_a29 = ssiParams.ASSETTYPE || "";
      b.cm_PageViewTag_pv_a30 = ssiParams.DOCTYPE || "";
      b.cm_PageViewTag_pv_a31 = ssiParams.CGCODE || "";
      b.cm_PageViewTag_pv_a32 = digitalData.util.qp.ctype || ssiParams.CONTENT_TYPE || "";
      b.cm_PageViewTag_pv_a33 = digitalData.util.qp.ctry || "";
   }

   /* Rule for Support - Fix Delivery */
   if (siteID === 'estfix' || siteID === 'estset') {
      b.cm_PageViewTag_pv_a20 = b["customParam_productID"];
      b.cm_PageViewTag_pv_a21 = b["customParam_productName"];
      b.cm_PageViewTag_pv_a22 = b["customParam_productCategory"];
   }

   /* Rule for ECOM */
   if (siteID === 'ecom') {
      b.cm_PageViewTag_pv_a27 = b["meta.IBM.WTMEComStore"];
      b.cm_PageViewTag_pv_a29 = b["qp.sapQuoteNum"];
      if (typeof(marketplaceCheckoutCustomTags) === "function" && !window.executedCheckoutTag) {
         window.executedCheckoutTag = true;
         marketplaceCheckoutCustomTags();
      }
   }
   
   /* Rule for On Site Search */
   if (siteID === 'sitesearch') {
      if (typeof(window.searchParams) === "undefined") window.searchParams = {};
      getNTPTVariable(searchParams);

      b["ddo.p.pi.onsiteSearchTerm"] = searchParams["ibmSrchTerm"] || "";
      b["ddo.p.pi.onsiteSearchResult"] = searchParams["ibmSrchRslts"] || "";
      b.cm_PageViewTag_pv_a21 = searchParams["ibmSrchName"] || "";
      b.cm_PageViewTag_pv_a22 = searchParams["ibmSrchTerm"] || "";
      b.cm_PageViewTag_pv_a23 = searchParams["ibmSrchRslts"] || "";
      b.cm_PageViewTag_pv_a24 = searchParams["ibmSrchRsltsPg"] || "";
      b.cm_PageViewTag_pv_a25 = searchParams["ibmSrchLang"] || "";
      b.cm_PageViewTag_pv_a26 = searchParams["ibmSrchLo"] || "";
      b.cm_PageViewTag_pv_a27 = searchParams["ibmSrchHpp"] || "";
      b.cm_PageViewTag_pv_a28 = searchParams["ibm.WTMCategory"] || "";
      b.cm_PageViewTag_pv_a29 = searchParams["ibm.WTMSite"] || "";
   }

   /* Rule for Bluemix Demand Base tag */
   if ((siteID === 'bluemix' || siteID === 'bluemixTest') 
      && b.event_name && b.event_name.toLowerCase() === 'demandbaseelement') {
      demandBaseAPICall();
      b.cm_ElementTag_e_a29 = demandBase["DB_company_name"] || "";
      b.cm_ElementTag_e_a30 = demandBase["DB_annual_sales"] || "";
      b.cm_ElementTag_e_a31 = demandBase["DB_audience"] || "";
      b.cm_ElementTag_e_a32 = demandBase["DB_audience_segment"] || "";
      b.cm_ElementTag_e_a33 = demandBase["DB_b2b"] || "";
      b.cm_ElementTag_e_a34 = demandBase["DB_b2c"] || "";
      b.cm_ElementTag_e_a35 = demandBase["DB_employee_count"] || "";
      b.cm_ElementTag_e_a36 = demandBase["DB_country"] || "";
      b.cm_ElementTag_e_a37 = demandBase["DB_city"] || "";
      b.cm_ElementTag_e_a38 = demandBase["DB_forbes_2000"] || "";
      b.cm_ElementTag_e_a39 = demandBase["DB_forbes_1000"] || "";
      b.cm_ElementTag_e_a40 = demandBase["DB_industry"] || "";
      b.cm_ElementTag_e_a41 = demandBase["DB_sub_industry"] || "";
      b.cm_ElementTag_e_a42 = demandBase["DB_revenue_range"] || "";
      b.cm_ElementTag_e_a43 = demandBase["DB_employee_range"] || "";
      b.cm_ElementTag_e_a44 = demandBase["DB_demandbase_sid"] || "";
      b.cm_ElementTag_e_a45 = demandBase["DB_ip"] || "";
      b.cm_ElementTag_e_a46 = demandBase["DB_country_name"] || "";
      b.cm_ElementTag_e_a47 = demandBase["DB_primary_sic"] || "";
      b.cm_ElementTag_e_a48 = demandBase["DB_web_site"] || "";
      b.cm_ElementTag_e_a49 = demandBase["DB_state"] || "";
      b.cm_ElementTag_e_a50 = demandBase["DB_watch_list"] || "";
   }
   
   /* Rule for link tracking for developerWorks */
   if (siteID === 'dwnext' && b.eventName && b.eventName.toLowerCase() === 'pagelinks') {
      b.cm_ElementTag_e_a22 = b["evCustomCE_cspClient"] || b["evCustomSSI_htmlfid"] || b["evCustomSales_popid"] || b["evCustomIWM_docid"];
      b.cm_ElementTag_e_a23 = b["evCustomCE_cspOffering"];
      b.cm_ElementTag_e_a24 = b["evCustomCE_cspSAPSiteId"];
      b.cm_ElementTag_e_a25 = b["evCustomCE_cspCustHubId"];
      b.cm_ElementTag_e_a26 = b["evCustomCE_cspICN"];
      b.cm_ElementTag_e_a27 = b["evCustomCE_cspCMClientId"];
      b.cm_ElementTag_e_a28 = b["evCustomCE_cspAdvSrchOpt"];
   }

   /* Rule for ibmStats.event tracking for element tags */
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

   /* Rule for ibmStats.event tracking for conversion tag */
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

   /* Rule for ibmStats.event tracking for product view tag */
   if (b.eventName && b.eventName.toLowerCase() === 'product') {
      b.cm_ProductviewTag_pr_a31 = b["productTag_serviceType"];
   }

}
catch (error) {
   datalayer.log('+++DBDM-ERROR > coremetrics-custom-data-mappings.js: ' + error);
}

/*---------------set NTPT attributes---------------*/
function getNTPTVariable(addParams) {
   if (typeof(window.NTPT_PGEXTRA) !== "undefined") {
      var arr1 = NTPT_PGEXTRA.split('&'),
      j = 0;
      for (var i = 0; i < arr1.length; i++) {
         var arr2 = arr1[i].split('=');
         addParams[arr2[0]] = arr2[1];
      }
   }
}

/*---------------------------------------------------add attributes---------------------------------------------------------*/
function addAttributes(clientArray,value){
   if(typeof (clientArray[value]) != "undefined"){
      utagVal = "customParam_"+value.replace(/\./g,"_");
      b[utagVal] = clientArray[value];
   }
}

/*---------------set data for Support portal---------------*/
function getCmCreateProductView(n){
   var scripts = document.getElementsByTagName("script"),
   tagArray = "";
   for (i=0; i <scripts.length; i++) {
      if(scripts[i].innerHTML.indexOf("cmCreateProductviewTag") !== -1){
         tagArray = (scripts[i].innerHTML).split(/[""''(,)]+/);
         break;
      }
   }
   if(tagArray.length > 0){
      b["customParam_productID"] = tagArray[1];
      b["customParam_productName"] = tagArray[2];
      b["customParam_productCategory"] = tagArray[3];
   }
};