/*
 * Id            : tm-v1.0/tealium/lib-pageservices/extension/ps-convertro.js
 * Extension Name: convertro for tags activities
 * Scope         : Convertro
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
//Used for logging all the tealium log messages
//Purpose of creating this object is not to log messages to console

try {
    var start = new Date().getTime();
    var ConvertroConfig = {
        TAG_NAME: 'Convertro',
        TAG_ENABLED_PATH: 'digitalData.page.pageInfo.convertro.enabled',
        TAG_RAN_PATH: 'digitalData.page.pageInfo.convertro.ran',
        VENDOR_TAG_RAN_OBJECT_PATH: '__cvo',
        ENABLED : 'TRUE',
        RAN: 'TRUE'
    };
    
    var tagStatus = window.checkTagActivation(ConvertroConfig);
    if (tagStatus === window.CHECK_TAG_ACTIVATION_STATUS.ENABLED) {
        if (window.IBMDependencyRegistry) window.IBMDependencyRegistry.on(['tealium.convertro.loaded'], tagLoadedCallback);
        //Convertro tag is enabled, activate the tag
        return true;
    } else if (tagStatus === window.CHECK_TAG_ACTIVATION_STATUS.RAN) {
        //Convertro tag ran already
        u.initialized = true;
        return false;
    } else {
        //Convertro tag is disabled
        return false;
    }
} catch(error) {
    window.TealiumLog.error('Error while running Convertro extension. Error is: ' + error);
    return false;
} finally {    
    var end = new Date().getTime();
    window.TealiumLog.log('Convertro extension took ' + (end - start) + ' milli seconds to run'); 
}

function tagLoadedCallback() {
    try {
        var retroactive = true;
        if (window.CONTACT_LIVECHAT_ACCEPTED){ 
            window.IBMSimpleEventRouter.addListener(window.CONTACT_LIVECHAT_ACCEPTED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.LIVECHAT_ACCEPTED){ 
            window.IBMSimpleEventRouter.addListener(window.LIVECHAT_ACCEPTED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.CONTACT_SCHEDULING_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.CONTACT_SCHEDULING_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.DEMO_REGISTRATION_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.DEMO_REGISTRATION_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.DOWNLOAD_REGISTRATION_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.DOWNLOAD_REGISTRATION_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.EVENT_REGISTRATION_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.EVENT_REGISTRATION_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.EXTERNAL_LINK){ 
            window.IBMSimpleEventRouter.addListener(window.EXTERNAL_LINK.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.EXTERNAL_LINK_V2){ 
            window.IBMSimpleEventRouter.addListener(window.EXTERNAL_LINK_V2.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.FORM_REGISTRATION_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.FORM_REGISTRATION_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.SIGNUP_REGISTRATION_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.SIGNUP_REGISTRATION_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.TRIAL_REGISTRATION_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.TRIAL_REGISTRATION_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
    } catch(error) {
        window.TealiumLog.error('Error in tagLoadedCallback function. Error is: ' + error); 
    }
}

function tagLoadEventsCallback(event) {
    try{
        var prefix = getPrefixName(event) || '';

        window.$CVO = window.$CVO || [];
        window.TealiumLog.log('Running Convertro trackEvent');
        $CVO.push([ 'trackEvent', {
            type: 'Conversion',
            id: prefix + '-' + digitalData.page.session.uSessionID + '-' + digitalData.page.session.pageloadEpoch,
            amount: '1'
        }]);
        window.TealiumLog.log('Running Convertro trackUser');
        $CVO.push([ 'trackUser', {
            id: ''+digitalData.user.profile.uuid
        }]);
        
    } catch(error){
        window.TealiumLog.error('Convertro track event/user error: ' + error);
    }
}

function getPrefixName(event) {
    try {
        var prefix = '';
        if (!event || !event.name) return prefix;
        switch (event.name) {
            case window.CONTACT_LIVECHAT_ACCEPTED.name:
                prefix = 'LC';
                break;
            case window.LIVECHAT_ACCEPTED.name:
                prefix = 'LC';
                break;        
            case window.CONTACT_SCHEDULING_COMPLETED.name:
                prefix = 'SCD';
                break;   
            case window.DEMO_REGISTRATION_COMPLETED.name:
                prefix = 'IBMID';
                break;   
            case window.DOWNLOAD_REGISTRATION_COMPLETED.name:
                prefix = 'IBMID';
                break;
            case window.EVENT_REGISTRATION_COMPLETED.name:
                prefix = 'IBMID';
                break;    
            case window.EXTERNAL_LINK.name:
                prefix = 'EXTL';
                break;
            case window.EXTERNAL_LINK_V2.name:
                prefix = 'EXTL';
                break;
            case window.FORM_REGISTRATION_COMPLETED.name:
                prefix = 'MRS';
                break;
            case window.SIGNUP_REGISTRATION_COMPLETED.name:
                prefix = 'IBMID';
                break;
            case window.TRIAL_REGISTRATION_COMPLETED.name:
                prefix = 'IBMID';
                break;
        }
        return prefix;
    } catch(error){
        window.TealiumLog.error('Convertro prefix computation error: ' + error);
        return '';
    }
}
