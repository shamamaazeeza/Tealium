utag.ut.isChrome53 = utag.ut.isChrome53 || function() {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    raw = raw ? parseInt(raw[2], 10) : false;
    if (typeof window.chrome !== 'undefined' && raw === 53) {
        return true;
    } else {
        return false;
    }
}
if (typeof utag.linkHandler == 'undefined') {
    utag.linkHandler = function(a, b, c, d, e) {
        if (!a) a = window.event;
        if (a.target) b = a.target;
        else if (a.srcElement) b = a.srcElement;
        if (b.nodeType == 3) b = b.parentNode;
        if (typeof b == 'undefined' || typeof b.tagName == 'undefined') return;
        c = b.tagName.toLowerCase();
        if (c == 'body') return;
        if (c != 'a') {
            for (d = 0; d < 5; d++) {
                if (typeof b != 'undefined' && b.parentNode) b = b.parentNode;
                c = (b != null && b.tagName) ? b.tagName.toLowerCase() : '';
                if (c == 'a') break;
                else if (c == 'body') return;
            }
        }
        if (c != 'a') return;
        var lt = b.text ? b.text : b.innerText ? b.innerText : '';
        if ((lt == '' || /^\s+$/.test(lt)) && typeof b.innerHTML != 'undefined') {
            lt = b.innerHTML.toLowerCase();
            if (lt.indexOf('<img ') > -1) {
                d = lt.indexOf('alt="');
                if (d > -1) {
                    e = lt.indexOf('"', d + 5);
                    lt = lt.substring(d + 5, e);
                } else {
                    d = lt.indexOf('src="');
                    if (d > -1) {
                        e = lt.indexOf('"', d + 5);
                        lt = lt.substring(d + 5, e);
                    }
                }
            }
        }
        var hr = b.href,
            hrnq = (b.href.split('?'))[0];
        var obj = {
            link_obj: b,
            link_text: lt,
            link_url: hr,
            link_type: 'exit link',
            event_name: 'link'
        };
        c = [location.hostname].concat(('.ibm.co,.ibm.com,.lotuslive.com,.cognos.com,.webdialogs.com,.servicemanagementcenter.com,.xtify.com,.ibmcloud.com,.ibmdw.net,.bluemix.net,.smartercitiescloud.com').split(','));
        for (d = 0; d < c.length; d++) {
            if (hrnq.indexOf(c[d]) > -1) {
                obj.link_type = 'link';
                break;
            }
        };
        c = ('bqy,doc,dot,exe,flv,jpg,png,mov,mp3,pdf,pps,ppt,rss,sh,swf,tar,txt,wmv,xls,xml,zip,avi,eps,gif,lwp,mas,mp4,pot,prz,rtf,wav,wma,123,odt,ott,sxw,stw,docx,odp,otp,sxi,sti,pptx,ods,ots,sxc,stc,xlsx,BQY,DOC,DOT,EXE,FLV,JPG,PNG,MOV,MP3,PDF,PPS,PPT,RSS,SH,SWF,TAR,TXT,WMV,XLS,XML,ZIP,AVI,EPS,GIF,LWP,MAS,MP4,POT,PRZ,RTF,WAV,WMA,123,ODT,OTT,SXW,STW,DOCX,ODP,OTP,SXI,STI,PPTX,ODS,OTS,SXC,STC,XLSX,Bqy,Doc,Dot,Exe,Flv,Jpg,Png,Mov,Mp3,Pdf,Pps,Ppt,Rss,Sh,Swf,Tar,Txt,Wmv,Xls,Xml,Zip,Avi,Eps,Gif,Lwp,Mas,Mp4,Pot,Prz,Rtf,Wav,Wma,123,Odt,Ott,Sxw,Stw,Docx,Odp,Otp,Sxi,Sti,Pptx,Ods,Ots,Sxc,Stc,Xlsx').split(',');
        for (d = 0; d < c.length; d++) {
            e = new RegExp(c[d] + '$');
            if (e.test(hrnq)) {
                obj.link_type = 'download link';
                break;
            }
        };
        try {
            var link = b;
            var tealiumEvTracking = {
                clickType: "left",
                modify_siteId: utag.data["concat_clientid"],
                downloadType: "bqy,doc,dot,exe,flv,jpg,png,mov,mp3,pdf,pps,ppt,rss,sh,swf,tar,txt,wmv,xls,xml,zip,avi,eps,gif,lwp,mas,mp4,pot,prz,rtf,wav,wma,123,odt,ott,sxw,stw,docx,odp,otp,sxi,sti,pptx,ods,ots,sxc,stc,xlsx",
                eventListObj: new Object(),
                optionalAttribute: "",
                varlist: function(list) {
                    var items = list.toLowerCase().split(","),
                        len = items.length;
                    for (var i = 0; i < len; i++) {
                        items[i] = items[i].replace(/^\s*/, "").replace(/\s*$/, "");
                    }
                    return items;
                },
                match: function(pth, typelist) {
                    var type = pth.substring(pth.lastIndexOf(".") + 1, pth.length),
                        types = tealiumEvTracking.varlist(typelist),
                        tlen = types.length;
                    for (var i = 0; i < tlen; i++) {
                        if (type == types[i]) {
                            return true;
                        }
                    }
                    return false;
                },
                check_megamenu_element: function(el) {
                    if (typeof(el) !== 'undefined') {
                        do {
                            if (el.id == "ibm-menu-links" || el.id == "ibm-common-menu" || el.id == "ibm-social-tools") {
                                return true;
                            }
                            el = el.parentElement || el.parentNode;
                        } while ((el !== null) && (el.parentElement || el.parentNode))
                    }
                    return false;
                },
                trackingEvent: function() {
                    if (a.which) {
                        if (a.which == 2) tealiumEvTracking.clickType = 'middle';
                        if (a.which == 3) tealiumEvTracking.clickType = 'right';
                    } else if (a.button) {
                        if (a.button == 1) tealiumEvTracking.clickType = 'middle';
                        if (a.button == 3) tealiumEvTracking.clickType = 'right';
                    }
                    if (typeof window.ibm_global_data !== "undefined" && typeof ibm_global_data["Site ID"] != "undefined") {
                        var x = window.utag.data.concat_clientid.substring(0, window.utag.data.concat_clientid.indexOf('|'));
                        if (utag.data['IBMER_value'] == "1") {
                            tealiumEvTracking.modify_siteId = x + "|" + "New_IBMER";
                        } else {
                            tealiumEvTracking.modify_siteId = x + "|" + window.ibm_global_data["Site ID"];
                        }
                    }
                    var eventAction = "",
                        utagLinkIdentifier = "pageLinks",
                        megamenuElement = tealiumEvTracking.check_megamenu_element(obj.link_obj),
                        pageLocation = window.location.href.replace(/-_-/g, "---"),
                        eventTriggerTime = new Date().getTime(),
                        evActionAttribute = (obj.link_url.indexOf("ftp:") !== -1) ? obj.link_url.substr(6) : ((obj.link_url.indexOf("https:") !== -1) ? obj.link_url.substr(8) : obj.link_url.substr(7)),
                        eventID = (obj.link_url.indexOf("ftp:") !== -1) ? obj.link_url.substr(6) : ((obj.link_url.indexOf("https:") !== -1) ? obj.link_url.substr(8) : obj.link_url.substr(7)),
                        trunEventID = eventID,
                        encodedObj_link_text = encodeURIComponent(obj.link_text);
                    obj.link_text = decodeURIComponent(encodedObj_link_text.replace(/%09|%E2%96%BC/g, ""));
                    obj.link_text = obj.link_text.trim();
                    if (evActionAttribute.indexOf('-_-') != -1) evActionAttribute = evActionAttribute.replace(/-_-/g, "---");
                    var v1 = tealiumEvTracking.fetchQuerystring(obj.link_url, "attachment"),
                        v2 = tealiumEvTracking.fetchQuerystring(obj.link_url, "FILE"),
                        v3 = tealiumEvTracking.fetchQuerystring(obj.link_url, "attachmentName"),
                        vparam = "none";
                    if (v1 != null) {
                        vparam = v1;
                    } else if (v2 != null) {
                        vparam = v2;
                    } else if (v3 != null) {
                        vparam = v3;
                    }
                    if (obj.link_url == "") {
                        evActionAttribute = eventID = trunEventID = "Blank HREF";
                    }
                    if (eventID.length > 50) trunEventID = (eventID.substring(0, 22) + "..." + eventID.substring(eventID.length - 25, eventID.length)).toLowerCase();
                    tealiumEvTracking.optionalAttribute = evActionAttribute + '-_-' + obj.link_text + '-_-null-_-null-_-null-_-' + evActionAttribute + '-_-' + obj.link_text + '-_-null-_-' + utag.data["cookie_sessionID"];
                    tealiumEvTracking.optionalAttribute += '-_--_-' + utag.data["pageID"] + '-_--_--_--_--_--_-' + utag.data["page_loadingTime"] + '-_-' + pageLocation + '-_-' + eventTriggerTime + '-_-' + utag.data["IBMER_value"];
                    if (obj.link_type == "download link" || (tealiumEvTracking.match(vparam.toLowerCase(), tealiumEvTracking.downloadType) == true)) {
                        if (vparam !== "none") trunEventID = vparam.toLowerCase();
                        eventAction = "download";
                        if (typeof window.ibm_global_data !== "undefined" && typeof ibm_global_data["Site ID"] != "undefined") tealiumEvTracking.trackingConversionEvent(utagLinkIdentifier, eventID, evActionAttribute, eventAction);
                    } else if (obj.link_type == "exit link") {
                        eventAction = "external link";
                        if (typeof window.ibm_global_data !== "undefined" && typeof ibm_global_data["Site ID"] != "undefined") tealiumEvTracking.trackingConversionEvent(utagLinkIdentifier, eventID, evActionAttribute, eventAction);
                    } else if (obj.link_type == "link") {
                        eventAction = "page click";
                    }
                    if (tealiumEvTracking.clickType == "left" && obj.link_obj.onclick && obj.link_obj.attributes[0].nodeValue.indexOf("ibmStats.event") !== -1) {
                        utagLinkIdentifier = "doNotFire";
                    } else if (eventAction == "" || eventID == "") {
                        utagLinkIdentifier = "doNotFire";
                    }
                    if (megamenuElement == false) {
                        tealiumEvTracking.eventListObj = {
                            event_name: utagLinkIdentifier,
                            ibmEV: trunEventID,
                            ibmEvAttr: eventID,
                            ibmEvAction: eventAction,
                            ibmEvName: obj.link_text,
                            ibmEvGroup: "null",
                            ibmEvModule: "null",
                            ibmEvSection: "null",
                            ibmEvTarget: evActionAttribute,
                            ibmEvLinkTitle: obj.link_text,
                            ibmEvFileSize: "null",
                            evSessionID: utag.data["cookie_sessionID"],
                            evPageLoadingTime: utag.data["page_loadingTime"],
                            evPageLocation: pageLocation,
                            evTriggerTime: eventTriggerTime,
                            IbmerVal: utag.data["IBMER_value"],
                            evClientID: tealiumEvTracking.modify_siteId
                        }
                        tealiumEvTracking.eventListObj = tealiumEvTracking.addCustomElement(tealiumEvTracking.eventListObj);
                        var data = JSON.parse(JSON.stringify(tealiumEvTracking.eventListObj));
                        if (tealiumEvTracking.clickType == "left") {
                            if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(trunEventID, eventAction, eventAction + "-_-" + tealiumEvTracking.optionalAttribute);
                        } else {
                            utag.link(data);
                            return false;
                        }
                    }
                },
                trackingConversionEvent: function(utagLinkIdentifier, eventID, evActionAttribute, eventAction) {
                    var x = tealiumEvTracking.modify_siteId.substring(tealiumEvTracking.modify_siteId.indexOf('|') + 1, tealiumEvTracking.modify_siteId.length);
                    utagLinkIdentifier = "conversionEventLinks";
                    var encodedObj_link_text = encodeURIComponent(obj.link_text);
                    obj.link_text = decodeURIComponent(encodedObj_link_text.replace(/%09|%E2%96%BC/g, ""));
                    if (eventAction == "external link") {
                        eventAction = "EXTERNAL LINK - " + x;
                        eventID = obj.link_text.trim() + " - " + obj.link_url;
                    } else {
                        eventAction = "DOWNLOADS - " + x;
                        eventID = obj.link_text.trim();
                    }
                    if (tealiumEvTracking.clickType == "left") {
                        if (typeof cmCreateConversionEventTag !== 'undefined') cmCreateConversionEventTag(eventID, 1, eventAction);
                    } else {
                        utag.link({
                            event_name: utagLinkIdentifier,
                            ibmEV: eventID,
                            ibmEvAction: eventAction,
                            convtype: "1",
                            evClientID: tealiumEvTracking.modify_siteId
                        });
                        return false;
                    }
                },
                fetchQuerystring: function(fullurl, param) {
                    var queryString = fullurl.substring(fullurl.indexOf("?") + 1),
                        queries, temp, i, l, queries = queryString.split("&");
                    for (i = 0, l = queries.length; i < l; i++) {
                        temp = queries[i].split('=');
                        var x = temp[0].toLowerCase();
                        if (x == param.toLowerCase()) return temp[1];
                    }
                    return null;
                },
                addCustomElement: function(obj) {
                    if (typeof(utag.data.siteID_value) !== "undefined" && (utag.data.siteID_value.toLowerCase() == "e021")) {
                        if (typeof utag.data["customParam_htmlfid"] !== "undefined") {
                            obj.evCustomSSI_htmlfid = utag.data["customParam_htmlfid"];
                            tealiumEvTracking.optionalAttribute += "-_-" + obj.evCustomSSI_htmlfid;
                        }
                    }
                    if (typeof(utag.data.siteID_value) !== "undefined" && (utag.data.siteID_value.substring(0, 13).toLowerCase() == "cloudexchange")) {
                        if (typeof window.digitalData.page.attributes.cspClient !== "undefined") obj.evCustomCE_cspClient = window.digitalData.page.attributes.cspClient;
                        tealiumEvTracking.optionalAttribute += "-_-" + obj.evCustomCE_cspClient;
                        if (typeof window.digitalData.page.attributes.cspOffering !== "undefined") obj.evCustomCE_cspOffering = window.digitalData.page.attributes.cspOffering;
                        tealiumEvTracking.optionalAttribute += "-_-" + obj.evCustomCE_cspOffering;
                        if (typeof window.digitalData.page.attributes.cspSAPSiteId !== "undefined") obj.evCustomCE_cspSAPSiteId = window.digitalData.page.attributes.cspSAPSiteId;
                        tealiumEvTracking.optionalAttribute += "-_-" + obj.evCustomCE_cspSAPSiteId;
                        if (typeof window.digitalData.page.attributes.cspCustHubId !== "undefined") obj.evCustomCE_cspCustHubId = window.digitalData.page.attributes.cspCustHubId;
                        tealiumEvTracking.optionalAttribute += "-_-" + obj.evCustomCE_cspCustHubId;
                        if (typeof window.digitalData.page.attributes.cspICN !== "undefined") obj.evCustomCE_cspICN = window.digitalData.page.attributes.cspICN;
                        tealiumEvTracking.optionalAttribute += "-_-" + obj.evCustomCE_cspICN;
                        if (typeof window.digitalData.page.attributes.cspCMClientId !== "undefined") obj.evCustomCE_cspCMClientId = window.digitalData.page.attributes.cspCMClientId;
                        tealiumEvTracking.optionalAttribute += "-_-" + obj.evCustomCE_cspCMClientId;
                        if (typeof window.digitalData.page.attributes.cspAdvSrchOpt !== "undefined") obj.evCustomCE_cspAdvSrchOpt = window.digitalData.page.attributes.cspAdvSrchOpt;
                        tealiumEvTracking.optionalAttribute += "-_-" + obj.evCustomCE_cspAdvSrchOpt;
                    }
                    if (typeof(utag.data.siteID_value) !== "undefined" && (utag.data.siteID_value.substring(0, 3).toLowerCase() == "ins")) {
                        if (typeof utag.data["meta.PopID"] !== "undefined") {
                            obj.evCustomSales_popid = utag.data["meta.PopID"];
                            tealiumEvTracking.optionalAttribute += "-_-" + obj.evCustomSales_popid;
                        }
                    }
                    if (typeof window.digitalData.page.pageInfo.ibm.docid !== "undefined") obj.evCustomIWM_docid = window.digitalData.page.pageInfo.ibm.docid;
                    tealiumEvTracking.optionalAttribute += "-_-" + obj.evCustomIWM_docid;
                    return obj;
                }
            }
            tealiumEvTracking.trackingEvent();
        } catch (e) {};
        // if (utag.ut.isChrome53()) {
        //     utag.DB('Is Chrome 53, skipping utag.link in extension Digital Analytics event tracking code V2');
        // } else {
            utag.link(obj);
        // }
    }
    utag.loader.EV(document, 'mousedown', utag.linkHandler);
}