/*
 * Id            : tm-v1.0/tealium/lib-pageservices/extension/ps-simple-event-router.js
 * Extension Name: Utility - Logging Object for tags activities
 * Scope         : Pre Loader
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
 try {   
    //MRS 
    var EVENT_FORM_REGISTRATION_COMPLETED = {
        name: 'EVENT_FORM_REGISTRATION_COMPLETED',
        ibmEV: ['iwmcompletion','IWM', 'iwmstart', 'Social Login'],
        convtype: '2'
    };   

    //LiveChat
    var EVENT_LIVECHAT_ACCEPTED = {
        name: 'EVENT_LIVECHAT_ACCEPTED',
        type: 'conversion',
        primaryCategory: 'LVADVISOR:CHAT',
        eventAction: '2'
    };

    //ExternalLink
    var EVENT_EXTERNAL_LINK = {
        name: 'EVENT_EXTERNAL_LINK',
        ibmEV: 'EXT-LNK',
        convtype: '2'
    };

    //GRP and AST
    var EVENT_REGISTRATION_COMPLETED = {
        name: 'EVENT_REGISTRATION_COMPLETED',
        ibmEV: 'Event Registration',
        convtype: '2'
    };

    //IBM ID Trial Registration
    var EVENT_TRIAL_SIGNUP_COMPLETED = {
        name: 'EVENT_TRIAL_SIGNUP_COMPLETED',
        type: 'conversion',
        primaryCategory: 'TRIAL-SIGNUP',
        eventAction: '2'
    };

    //IBM ID Demo Completed
    var EVENT_DEMO_COMPLETED = {
        name: 'EVENT_DEMO_COMPLETED',
        type: 'conversion',
        primaryCategory: 'DEMO',
        eventAction: '2'
    };

    //IBM ID Other forms completed
    var EVENT_OTHER_FORMS_COMPLETED = {
        name: 'EVENT_OTHER_FORMS_COMPLETED',
        type: 'conversion',
        primaryCategory: 'DEFAULT-SIGNUP',
        eventAction: '2'
    };

    //IBM ID Download Completed
    var EVENT_DOWNLOAD_COMPLETED = {
        name: 'EVENT_DOWNLOAD_COMPLETED',
        type: 'conversion',
        primaryCategory: 'DOWNLOAD',
        eventAction: '2'
    };    

    var CONVERSION_EVENTS = [];
    CONVERSION_EVENTS.push(EVENT_FORM_REGISTRATION_COMPLETED);
    CONVERSION_EVENTS.push(EVENT_LIVECHAT_ACCEPTED);
    CONVERSION_EVENTS.push(EVENT_EXTERNAL_LINK);
    CONVERSION_EVENTS.push(EVENT_REGISTRATION_COMPLETED);
    CONVERSION_EVENTS.push(EVENT_TRIAL_SIGNUP_COMPLETED);
    CONVERSION_EVENTS.push(EVENT_DEMO_COMPLETED);
    CONVERSION_EVENTS.push(EVENT_OTHER_FORMS_COMPLETED);
    CONVERSION_EVENTS.push(EVENT_DOWNLOAD_COMPLETED);

    (function() {
        window.IBMSimpleEventRouter = window.IBMSimpleEventRouter || {

            events: [],
            listeners: [],

            error: function(err) {
                window.TealiumLog.error(err);
                return false;
            },

            addListener: function(event, callback, retroactive) {
                try {
                    if(typeof event === 'string') {
                        for(var i = 0, l = window.CONVERSION_EVENTS.length; i < l; i ++) {
                            var e = window.CONVERSION_EVENTS[i];
                            if (e.name === event) {
                                event = e;
                                break;
                            }
                        }                        
                    }
                    if(typeof callback !== 'function') return this.error('Missing required callback', event);
                    this.listeners.push({ event: event, callback: callback });
                    if(retroactive && retroactive === true) {
                        this.events.forEach(function(e){
                            if (e.name === event.name) {
                                try { 
                                    callback(event); 
                                } catch(err) { 
                                    this.error('Callback error', err, e); 
                                }
                            }
                        });
                    } 
                } catch(error) {
                    this.error('addListener error', error, event); 
                }
            },

            eventHappened: function(event) {
                try {
                    this.events.push(event);
                    for(var i = 0, l = this.listeners.length; i < l; i ++) {
                        var e = this.listeners[i];
                        if (event.name === e.event.name) {
                            try { 
                                e.callback(event); 
                            } catch(err) { 
                                this.error('Callback error', err, e); 
                            }
                        }
                    }
                } catch(error) {
                    this.error('Event execution error', error, event); 
                }
            },

            idaEvent: function(idaEvent) {
                try {                    
                    for(var i = 0, l = window.CONVERSION_EVENTS.length; i < l; i ++) {
                        var event = window.CONVERSION_EVENTS[i];
                        if (this.isValidConvEvent(event, idaEvent)) {
                            this.eventHappened(event);
                            break;
                        }
                    }
                } catch(error) {
                    this.error('idaEvent error', error, e); 
                }
            },

            isValidConvEvent: function(convEvent, event) {
                var eventMatch = true;
                for (var prop in convEvent) {
                    if (prop === 'name') continue;
                    if (convEvent.hasOwnProperty(prop)) {
                        if (!event[prop]) {
                            eventMatch = false;
                            break;
                        }
                        if (Array.isArray(convEvent[prop])) {
                            var valMatch = false;
                            convEvent[prop].forEach(function(val) {
                                if (event[prop] === val) valMatch = true;
                            });
                            if (!valMatch) {
                                eventMatch = false;
                                break;
                            }
                        } else if (event[prop] !== convEvent[prop]){
                            eventMatch = false;
                            break;
                        }
                    }
                }
                return eventMatch;
            }
        };

        if (IBMDependencyRegistry) IBMDependencyRegistry.emit('tealium.IBMSimpleEventRouter.loaded');
    })();
} catch (error) {
    window.TealiumLog.error('Error in IBMSimpleEventRouter. Error is: ' + error);
}
