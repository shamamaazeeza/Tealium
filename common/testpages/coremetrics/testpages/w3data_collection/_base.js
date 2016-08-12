/* $Id$ 
 * Main IBM layer entry point - contains all dependencies and a few
 * common functions. What's in here is shared between all builds!
 *
 * Please note that not everything should go in here - only the most
 * required stuff is to be placed in here, lesser used features should
 * be lazy loaded!
 */

dojo.provide('ibmweb._base');

// dojo code
dojo.require('ibmweb.dojoReadyForLegacyDojo');
dojo.require('ibmweb.dojodomain');
dojo.require('ibmweb.coremetrics.testpages.w3data_collection.w3_eluminate');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dijit._Container');
dojo.require('dijit._Contained');
dojo.require('dojo.NodeList-traverse');
dojo.require('dojo.NodeList-manipulate');
// IBM own code
dojo.require('ibmweb.string');
dojo.require('ibmweb.util');
dojo.require('ibmweb.meta');
dojo.require('ibmweb.info');
dojo.require('ibmweb.queue');
dojo.require('ibmweb.ibmcodesample');
dojo.require('ibmweb.callback');
dojo.require('ibmweb.data');
dojo.require('ibmweb.twisty');
dojo.require('ibmweb.overlay');	// TODO: not sure if this should be lazy loaded
dojo.require('ibmweb.storage');
dojo.require('ibmweb.form');
dojo.require('ibmweb.stepindicator');

dojo.require('ibmweb.dynnav');		// includes the whole dynamicnav namespace

dojo.require('ibmweb.legacy');
dojo.require('ibmweb.truste');

dojo.require('ibmweb.readmore');
dojo.require('ibmweb.filebrowse');
dojo.require('ibmweb.filesize'); // disabling - problem with freezing browser

// html5media not working - not ready for release
/*dojo.ready(function() {
	if (dojo.query('audio')[0]) {
		dojo.io.script.get({
			url: dojo.moduleUrl('ibmweb').toString() + 'external/html5media/html5media.min.js'
		});
	}
});*/

//dojo.require('ibmweb.opinionlab'); will be enabled when ready