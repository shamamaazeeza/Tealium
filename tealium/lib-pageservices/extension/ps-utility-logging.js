/*
 * Id            : tm-v1.0/tealium/lib-pageservices/extension/ps-utility-logging.js
 * Extension Name: Utility - Logging Object for tags activities
 * Scope         : Pre Loader
 * Execution     : N/A
 * 
 * =====|| NOTE: DO NOT MODIFY THIS SCRIPT IN TEALIUM, UPDATE GITHUB VERSION IN ECLIPSE
 */
//Used for logging all the tealium log messages
//Purpose of creating this object is not to log messages to console
try {
    window.TealiumLog = window.TealiumLog || {
        logs: [],
        errors: [],
        log: function(message) {
            this.logs.push(message);
        },
        error: function(message) {
            this.errors.push(message);
        }
    }
} catch (error) {
    console.log('error while creating TealiumLog object. Error: ' + error);
}
