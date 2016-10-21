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
        if (window.EVENT_FORM_REGISTRATION_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.EVENT_FORM_REGISTRATION_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.EVENT_REGISTRATION_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.EVENT_REGISTRATION_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.EVENT_LIVECHAT_ACCEPTED){ 
            window.IBMSimpleEventRouter.addListener(window.EVENT_LIVECHAT_ACCEPTED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.EVENT_EXTERNAL_LINK){ 
            window.IBMSimpleEventRouter.addListener(window.EVENT_EXTERNAL_LINK.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.EVENT_TRIAL_SIGNUP_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.EVENT_TRIAL_SIGNUP_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.EVENT_DEMO_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.EVENT_DEMO_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.EVENT_OTHER_FORMS_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.EVENT_OTHER_FORMS_COMPLETED.name, tagLoadEventsCallback, retroactive); 
        } 
        if (window.EVENT_DOWNLOAD_COMPLETED){ 
            window.IBMSimpleEventRouter.addListener(window.EVENT_DOWNLOAD_COMPLETED.name, tagLoadEventsCallback, retroactive); 
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
            case window.EVENT_FORM_REGISTRATION_COMPLETED.name:
                prefix = 'MRS';
                break;
            case window.EVENT_REGISTRATION_COMPLETED.name:
                prefix = 'EVT';
                break;        
            case window.EVENT_LIVECHAT_ACCEPTED.name:
                prefix = 'LC';
                break;   
            case window.EVENT_EXTERNAL_LINK.name:
                prefix = 'EXTL';
                break;   
            case window.EVENT_TRIAL_SIGNUP_COMPLETED.name:
                prefix = 'IBMID';
                break;
            case window.EVENT_DEMO_COMPLETED.name:
                prefix = 'IBMID';
                break;    
            case window.EVENT_OTHER_FORMS_COMPLETED.name:
                prefix = 'IBMID';
                break;
            case window.EVENT_DOWNLOAD_COMPLETED.name:
                prefix = 'IBMID';
                break;
        }
        return prefix;
    } catch(error){
        window.TealiumLog.error('Convertro prefix computation error: ' + error);
        return '';
    }
}
