/*!
 * Copyright (c) 2009 IBM Corporation
 * Owner: Corporate Webmaster (NUS_N_NIWWW)
 */

// UNICA IMPLEMENTATION
/* Unica Page Tagging Script v7.4.0
 * Copyright 2004-2006 Unica Corporation.  All rights reserved.
 * Visit http://www.unica.com for more information.
 */
var NTPT_NOINITIALTAG = true;
var NTPT_IMGSRC = '//pt200204.unica.com/ntpagetag.gif';

var NTPT_FLDS = new Object();
NTPT_FLDS.lc = true; // Document location
NTPT_FLDS.rf = true; // Document referrer
NTPT_FLDS.rs = true; // User's screen resolution
NTPT_FLDS.cd = true; // User's color depth
NTPT_FLDS.ln = true; // Browser language
NTPT_FLDS.tz = true; // User's timezone
NTPT_FLDS.jv = true; // Browser's Java support
NTPT_FLDS.ck = true; // Cookies

var NTPT_MAXTAGWAIT = 1.0; // Max delay (secs) on link-tags and submit-tags

// Optional variables:
var NTPT_HTTPSIMGSRC = '//pt200204.unica.com/ntpagetag.gif';
var NTPT_GLBLREFTOP = false;
var NTPT_SET_IDCOOKIE = true;
var NTPT_IDCOOKIE_NAME = 'UnicaNIODID';
//var NTPT_IDCOOKIE_DOMAIN = document.domain;
var NTPT_IDCOOKIE_DOMAIN = '.ibm.com';
var NTPT_DOWNLOADTYPES="bqy,doc,dot,exe,flv,jpg,mov,mp3,pdf,pps,ppt,rss,sh,swf,tar,txt,wmv,xls,xml,zip,avi,eps,gif,lwp,mas,mp4,pot,prz,rtf,wav,wma,123,odt,ott,sxw,stw,docx,odp,otp,sxi,sti,pptx,ods,ots,sxc,stc,xlsx";
var NTPT_DOMAINLIST=".ibm.com,.lotus.com,.lotuslive.com,.cognos.com,.webdialogs.com,.jazz.net,.servicemanagementcenter.com";
// Variables that will need to be modified on a per-site basis
var NTPT_GLBLEXTRA = '';
// NTPT_GLBLCOOKIES can be used to pass other cookie values to NetInsight through the page tag
//var NTPT_GLBLCOOKIES = [ ];
var NTPT_GLBLCOOKIES = ["IBMISP","iwm1p","ck_login_id_20"];
/*** END OF USER-CONFIGURABLE VARIABLES ***/

function OOOO000(OO0O00,O0O0O,O000OOO,OO0O00O){var O00O0="";O00O0=OO0O00+"\x3d"+escape(O0O0O)+"\x3b";if(OO0O00O)O00O0+="\x20\x64\x6f\x6d\x61\x69\x6e\x3d"+OO0O00O+"\x3b";if(O000OOO>(0x1d65+435-0x1f18)){var OOO00O=new Date();OOO00O.setTime(OOO00O.getTime()+(O000OOO*(0x9a6+2102-0xdf4)));O00O0+="\x20\x65\x78\x70\x69\x72\x65\x73\x3d"+OOO00O.toGMTString()+"\x3b";}O00O0+="\x20\x70\x61\x74\x68\x3d\x2f";document.cookie=O00O0;};function OOOO00(OO0O00){var O0O0O0O=OO0O00+"\x3d";if(document.cookie.length>(0x162f+0-0x162f)){var OO0000;OO0000=document.cookie.indexOf(O0O0O0O);if(OO0000!=-(0x106+5772-0x1791)){var OOO000;OO0000+=O0O0O0O.length;OOO000=document.cookie.indexOf("\x3b",OO0000);if(OOO000==-(0x129c+4910-0x25c9))OOO000=document.cookie.length;return unescape(document.cookie.substring(OO0000,OOO000));}else{return null;};}};function O00000O(O0OO0){var OO000O="";for(OO00O in O0OO0){if((typeof(O0OO0[OO00O])=="\x73\x74\x72\x69\x6e\x67")&&(O0OO0[OO00O]!="")){if(OO000O!="")OO000O+="\x3b";OO000O+=OO00O+"\x3d"+O0OO0[OO00O];};}return OO000O;};var O00OOO=["\x41","\x42","\x43","\x44","\x45","\x46","\x47","\x48","\x49","\x4a","\x4b","\x4c","\x4d","\x4e","\x4f","\x50","\x51","\x52","\x53","\x54","\x55","\x56","\x57","\x58","\x59","\x5a","\x61","\x62","\x63","\x64","\x65","\x66","\x67","\x68","\x69","\x6a","\x6b","\x6c","\x6d","\x6e","\x6f","\x70","\x71","\x72","\x73","\x74","\x75","\x76","\x77","\x78","\x79","\x7a","\x30","\x31","\x32","\x33","\x34","\x35","\x36","\x37","\x38","\x39"];

function OOOOOO0(O00000){if(O00000<(0x41+9084-0x237f)){return O00OOO[O00000];}else{return(OOOOOO0(Math.floor(O00000/(0x1163+644-0x13a9)))+O00OOO[O00000%(0x1c5c+1570-0x2240)]);}};function O0O000O(){var OO0OO0O="";var OOOOO00=new Date();for(OOO0O0O=(0x13b0+769-0x16b1);OOO0O0O<(0x26f+3070-0xe62);OOO0O0O++){OO0OO0O+=O00OOO[Math.round(Math.random()*(0xb62+1003-0xf10))];}return(OO0OO0O+"\x2d"+OOOOOO0(OOOOO00.getTime()));};function OO0OO(O0O0000,OOO0O00){return(eval("\x74\x79\x70\x65\x6f\x66\x20"+O0O0000+"\x20\x21\x3d\x20\x22\x75\x6e\x64\x65\x66\x69\x6e\x65\x64\x22")?eval(O0O0000):OOO0O00);};function OO0O000(O00OOO0,O0O000){return(O00OOO0+(((O00OOO0=='')||((O0O000=='')||(O0O000.substring((0x1dc9+2039-0x25c0),(0x1442+4474-0x25bb))=="\x26")))?'':"\x26")+O0O000);};function O000O00(){var O0O00O=new Date();return(O0O00O.getTime()+"\x2e"+Math.floor(Math.random()*(0xed9+1573-0x1116)));};function O00OO(OO0O00,OO0OO00){OOO00[OO0O00]=OO0OO00.toString();};function O0OO0O0(OO0O00){OOO00[OO0O00]='';};function OOO0000(O000O){var O0OO0O='',OO00O,O0O0O;OO00OO(OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x45\x58\x54\x52\x41",''));if(!LnkLck)OO00OO(OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x45\x58\x54\x52\x41",''));OO00OO(O000O);for(OO00O in OOO00){O0O0O=OOO00[OO00O];if(typeof(O0O0O)=="\x73\x74\x72\x69\x6e\x67"){if(O0O0O&&(O0O0O!=''))O0OO0O=OO0O000(O0OO0O,(OO00O+"\x3d"+(self.encodeURIComponent?encodeURIComponent(O0O0O):escape(O0O0O))));};}return O0OO0O;};function O000000(){

var OO00O;OOOOO0.OOO00=new Array();for(OO00O in OOO00)OOOOO0.OOO00[OO00O]=OOO00[OO00O];};function OOO00OO(){var OO00O;OOO00=new Array();for(OO00O in OOOOO0.OOO00)OOO00[OO00O]=OOOOO0.OOO00[OO00O];};function OO0O0OO(O00O00,O0OOOO0,O000OO){if(OOOO0[O00O00]!=null){var O000O0=new

Function(O0OOOO0);OOOO0[O00O00].onload=O000O0;OOOO0[O00O00].onerror=O000O0;OOOO0[O00O00].onabort=O000O0;}setTimeout(O0OOOO0,(O000OO*(0x5f3+3206-0xe91)));};function O0O00O0(O0OOOO,OO0O0O){if(O0OOOO=='')return;O0000=((O0000+(0x1312+1405-0x188e))%OOOO0.length);if(OOOO0[O0000]==null)OOOO0[O0000]=new Image((0x1005+4276-0x20b8),(0x1208+715-0x14d2));OOOO0[O0000].src=O0OOOO+"\x3f"+OO0O0O;};function OOOOO0O(O000O){var O0OOOO;var OO0O0O;if((O00O00O!='')&&(document.location.protocol=="\x68\x74\x74\x70\x73\x3a"))O0OOOO=O00O00O;else O0OOOO=O0000OO;OO0O0O=OOO0000(O000O);O0O00O0(O0OOOO,OO0O0O);OOO00OO();};function OO00OO(O000O){var OO00O0;var O00O0O;if(!O000O)return;O000O=O000O.toString();if(O000O=='')return;OO00O0=O000O.split("\x26");for(O00O0O=(0xdc+1230-0x5aa);O00O0O<OO00O0.length;O00O0O++){var OOO0O0=OO00O0[O00O0O].split("\x3d");if(OOO0O0.length==(0x83d+4370-0x194d))O00OO(OOO0O0[(0x1240+5137-0x2651)],(self.decodeURIComponent?decodeURIComponent(OOO0O0[(0xa7d+3816-0x1964)]):unescape(OOO0O0[(0xd8f+2979-0x1931)])));}};function O0O0OO(O000O){O00OO("\x65\x74\x73",O000O00());OOOOO0O(O000O);return true;};function O00OO0O(OOOOO,O000O,O000OO){var O0OOO;if(!OOOOO||!OOOOO.href)return true;if(LnkLck)return false;LnkLck=OOOOO;if(OO000.lc)O00OO("\x6c\x63",OOOOO.href);if(OO000.rf){if(!O0OO000||!top||!top.document)O00OO("\x72\x66",document.location);}O0O0OO(O000O);if(O000OO)O0OOO=O000OO;else O0OOO=NTPT_MAXTAGWAIT;

if(O0OOO>(0x659+6874-0x2133)){var OOOOOO;if(OOOOO.click){OOOOO.tmpclck=OOOOO.onclick;OOOOO.onclick=null;OOOOOO="\x69\x66\x20\x28\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x29\x20\x7b\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x63\x6c\x69\x63\x6b\x28\x29\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x6f\x6e\x63\x6c\x69\x63\x6b\x20\x3d\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x74\x6d\x70\x63\x6c\x63\x6b\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d";}else OOOOOO="\x69\x66\x20\x28\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x29\x20\x7b\x20\x77\x69\x6e\x64\x6f\x77\x2e\x6c\x6f\x63\x61\x74\x69\x6f\x6e\x2e\x68\x72\x65\x66\x20\x3d\x20\x22"+OOOOO.href+"\x22\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d";OO0O0OO(O0000,OOOOOO,O0OOO);return false;}LnkLck=null;return true;};function O000OO0(OO0OOO,O000O,O000OO){var O0OOO;if(!OO0OOO||!OO0OOO.submit)return true;if(FrmLck)return false;FrmLck=OO0OOO;O0O0OO(O000O);if(O000OO)O0OOO=O000OO;else O0OOO=NTPT_MAXTAGWAIT;if(O0OOO>(0x1497+4406-0x25cd)){OO0OOO.tmpsbmt=OO0OOO.onsubmit;OO0OOO.onsubmit=null;OO0O0OO(O0000,"\x69\x66\x20\x28\x20\x46\x72\x6d\x4c\x63\x6b\x20\x29\x20\x7b\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x73\x75\x62\x6d\x69\x74\x28\x29\x3b\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x6f\x6e\x73\x75\x62\x6d\x69\x74\x20\x3d\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x74\x6d\x70\x73\x62\x6d\x74\x3b\x20\x46\x72\x6d\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d",O0OOO);return false;}FrmLck=null;return true;};var O0000OO=NTPT_IMGSRC;var OO000=NTPT_FLDS;

var O00OO0=OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x43\x4f\x4f\x4b\x49\x45\x53",null);var OOOO0O=OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x43\x4f\x4f\x4b\x49\x45\x53",null);var OOO00O0=OO0OO("\x4e\x54\x50\x54\x5f\x53\x45\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45",false);var OO0OO0=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x4e\x41\x4d\x45","\x53\x61\x6e\x65\x49\x44");var OO00O00=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x44\x4f\x4d\x41\x49\x4e",null);var OO0OOOO=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x45\x58\x50\x49\x52\x45",155520000);var O00O00O=OO0OO("\x4e\x54\x50\x54\x5f\x48\x54\x54\x50\x53\x49\x4d\x47\x53\x52\x43",'');var O0OO000=OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x52\x45\x46\x54\x4f\x50",OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x52\x45\x46\x54\x4f\x50",false));var OO00000=OO0OO("\x4e\x54\x50\x54\x5f\x4e\x4f\x49\x4e\x49\x54\x49\x41\x4c\x54\x41\x47",false);var ntptAddPair=O00OO;var ntptDropPair=O0OO0O0;var ntptEventTag=O0O0OO;var ntptLinkTag=O00OO0O;var ntptSubmitTag=O000OO0;var OOO00=new Array();

var OOOOO0=new Object();var OOOO0=Array((0x317+3540-0x10e1));var O0000;for(O0000=(0x1584+3590-0x238a);O0000<OOOO0.length;O0000++)OOOO0[O0000]=null;var LnkLck=null;var FrmLck=null;O00OO("\x6a\x73","\x31");O00OO("\x74\x73",O000O00());if(OO000.lc)O00OO("\x6c\x63",document.location);if(OO000.rf){var OOO0OO;if(O0OO000&&top&&top.document)OOO0OO=top.document.referrer;else OOO0OO=document.referrer;O00OO("\x72\x66",OOO0OO);}if(self.screen){if(OO000.rs)O00OO("\x72\x73",self.screen.width+"\x78"+self.screen.height);if(OO000.cd)O00OO("\x63\x64",self.screen.colorDepth);}if(OO000.ln){var OOO0O;if(navigator.language)OOO0O=navigator.language;else if(navigator.userLanguage)OOO0O=navigator.userLanguage;else OOO0O='';if(OOO0O.length>(0x462+2203-0xcfb))OOO0O=OOO0O.substring((0xe45+3555-0x1c28),(0x186+8395-0x224f));OOO0O=OOO0O.toLowerCase();O00OO("\x6c\x6e",OOO0O);}if(OO000.tz){var OO0O0;var O0O00O=new Date();var O0O00=O0O00O.getTimezoneOffset();var O0OO00;OO0O0="\x47\x4d\x54";if(O0O00!=(0x1214+4348-0x2310)){if(O0O00>(0x773+6772-0x21e7))OO0O0+="\x20\x2d";else OO0O0+="\x20\x2b";O0O00=Math.abs(O0O00);O0OO00=Math.floor(O0O00/(0x878+3391-0x157b));

O0O00-=O0OO00*(0xc3b+4046-0x1bcd);if(O0OO00<(0x13e6+969-0x17a5))OO0O0+="\x30";OO0O0+=O0OO00+"\x3a";if(O0O00<(0xba1+208-0xc67))OO0O0+="\x30";OO0O0+=O0O00;}O00OO("\x74\x7a",OO0O0);}if(OO000.jv){var O0000O;if(navigator.javaEnabled())O0000O="\x31";else O0000O="\x30";O00OO("\x6a\x76",O0000O);}var O0OO0=new Array();var O00O0OO=false;if(OO000.ck){var O0O0O0;var O00O0,O0OOO0;if(O00OO0){for(O0O0O0=(0x87a+7306-0x2504);O0O0O0<O00OO0.length;O0O0O0++){O0OO0[O00OO0[O0O0O0]]="";};}if(OOOO0O){for(O0O0O0=(0x1b2a+931-0x1ecd);O0O0O0<OOOO0O.length;O0O0O0++){O0OO0[OOOO0O[O0O0O0]]="";};}for(OO00O in O0OO0){O00O0=OOOO00(OO00O);if(O00O0){O0OO0[OO00O]=O00O0;};}if(OOO00O0){O00O0=OOOO00(OO0OO0);if(O00O0){O0OO0[OO0OO0]=O00O0;O00O0OO=true;};}O0OOO0=O00000O(O0OO0);if(O0OOO0!="")O00OO("\x63\x6b",O0OOO0);}O000000();if(!OO00000)OOOOO0O('');if(OOO00O0&&!O00O0OO){var O00O0=OOOO00(OO0OO0);if(!O00O0){O00O0=O0O000O();OOOO000(OO0OO0,O00O0,OO0OOOO,OO00O00);if(OO000.ck&&OOOO00(OO0OO0)){O0OO0[OO0OO0]=O00O0;var O0OOO0=O00000O(O0OO0);if(O0OOO0!=""){O00OO("\x63\x6b",O0OOO0);O000000();};};};}

var _0x80be=["\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x62\x6F\x64\x79","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x61\x74\x74\x61\x63\x68\x45\x76\x65\x6E\x74","\x6F\x6E","\x4D\x53\x49\x45","\x69\x6E\x64\x65\x78\x4F\x66","\x61\x70\x70\x56\x65\x72\x73\x69\x6F\x6E","\x63\x6C\x69\x63\x6B","\x6D\x6F\x75\x73\x65\x64\x6F\x77\x6E","\x70\x61\x72\x61\x6D\x73","\x6C\x65\x6E\x67\x74\x68","\x73\x65\x61\x72\x63\x68","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x20","\x72\x65\x70\x6C\x61\x63\x65","\x26","\x73\x70\x6C\x69\x74","\x3D","\x67\x65\x74","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x63\x6F\x6E\x74\x61\x69\x6E\x73","\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65","\x68\x6F\x73\x74\x6E\x61\x6D\x65","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x2C","","\x2E","\x6C\x61\x73\x74\x49\x6E\x64\x65\x78\x4F\x66","\x74\x61\x72\x67\x65\x74","\x73\x72\x63\x45\x6C\x65\x6D\x65\x6E\x74","\x70\x61\x72\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74","\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65","\x74\x61\x67\x4E\x61\x6D\x65","\x65\x76\x65\x6E\x74","\x77\x68\x69\x63\x68","\x6E\x75\x6D\x62\x65\x72","\x41","\x68\x72\x65\x66","\x3A","\x3F","\x61\x74\x74\x61\x63\x68\x6D\x65\x6E\x74","\x46\x49\x4C\x45","\x61\x74\x74\x61\x63\x68\x6D\x65\x6E\x74\x4E\x61\x6D\x65","\x6E\x6F\x6E\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2F","\x70\x72\x6F\x74\x6F\x63\x6F\x6C","\x61\x6C\x6C","\x69\x6E\x6E\x65\x72\x54\x65\x78\x74","\x74\x65\x78\x74","\x49\x4D\x47","\x61\x6C\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x66\x74\x70\x3A","\x73\x75\x62\x73\x74\x72","\x69\x62\x6D\x45\x76\x41\x63\x74\x69\x6F\x6E\x3D","\x26\x65\x76\x3D\x64\x6F\x77\x6E\x6C\x6F\x61\x64","\x68\x74\x74\x70","\x6D\x61\x69\x6C\x74\x6F","\x65\x76\x3D\x65\x78\x74\x65\x72\x6E\x61\x6C\x20\x6C\x69\x6E\x6B\x26\x69\x62\x6D\x45\x76\x41\x63\x74\x69\x6F\x6E\x3D","\x62\x75\x74\x74\x6F\x6E","\x53\x61\x66\x61\x72\x69","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64"];

var evhndlr=true;

/*function pause(ms){
  var date = new Date();
  var curDate = null;
   do {
      curDate = new Date();
      }
   while(curDate-date < ms);
}


function turn_eh_off(){

       evhndlr=false;
}

function bind_event(event,func){

       if ((typeof(func)=="function")&&document.body){

              if (document.body.addEventListener){

                     document.body.addEventListener(event, func, true);

              }

              else if(document.body.attachEvent){

                     document.body.attachEvent("on"+event, func);

              }

       }

}


function event_tracking(){

       var e=(navigator.appVersion.indexOf("Chrome")||navigator.appVersion.indexOf("MSIE")!=-1)?"click":"mousedown";

       bind_event(e,download_tracking);

       bind_event(e,offsite_tracking);

       e=(navigator.appVersion.indexOf("Chrome")||navigator.appVersion.indexOf("MSIE")!=-1)?"contextmenu":"mousedown";

       bind_event(e,right_click_tracking);

}




function Querystring(qs) {

       this.params = {};

       if (qs == null) qs = location.search.substring(1, location.search.length);

       if (qs.length == 0) return;

       qs = qs.replace(/\+/g, ' ');

       var args = qs.split('&'); // parse out name/value pairs separated via &

       for (var i = 0; i < args.length; i++) {

              var pair = args[i].split('=');

              var name = decodeURIComponent(pair[0]);

              var value = (pair.length==2)

                     ? decodeURIComponent(pair[1])

                     : name;

              this.params[name] = value;

       }

}



Querystring.prototype.get = function(key, default_) {

       var value = this.params[key];

       return (value != null) ? value : default_;

}



Querystring.prototype.contains = function(key) {

       var value = this.params[key];

       return (value != null);

}





function domtest(host){

       if (host.length>0){

              host=host.toLowerCase();

              if (host==window.location.hostname.toLowerCase()){

                     return true;

              }

              else{

                     var doms=varlist(NTPT_DOMAINLIST);

                     var len=doms.length;

                     for (var i=0;i<len;i++){

                                  if (host==doms[i]||host.search(doms[i])!=-1){

                                   return true;

                                  }

                     }

              }

       }

       return false;

}

function varlist(list){

       var items=list.toLowerCase().split(",");

       var len=items.length;

       for (var i=0;i<len;i++){*/

             // items[i]=items[i].replace(/^\s*/,"").replace(/\s*$/,"");

     /*  }

       return items;

}



function NTPT_DLT_match(pth, typelist){

       var type=pth.substring(pth.lastIndexOf(".")+1,pth.length);

       var types=varlist(typelist);

       var tlen=types.length;

       for (var i=0;i<tlen;i++){

              if (type==types[i]){

                     return true;

              }

       }

       return false;

}



function evt_element(evt,tag){

       var e=evt.target||evt.srcElement;

       while (e.tagName&&(e.tagName.toLowerCase()!=tag.toLowerCase())){
			var temp = e.parentElement || e.parentNode;
			if(!temp){
				return e;
			}

            e = temp;
       }

       return e;

}


function download_tracking(evt){

       evt=evt||(window.event||"");

       if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){

              var e=evt_element(evt,"A");

              if (e.href){

                     var hn=e.hostname?(e.hostname.split(":")[0]):"";

                     var fullurl=escape(e.href);

                     var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";

                     var qs1 = new Querystring(qry);

                     var v1 = qs1.get("attachment");

                     var v2 = qs1.get("FILE");

                     var v3 = qs1.get("attachmentName");

                     if (v1==null&&v2==null&&v3==null){

                           var vparam="none";

                     }

                     else if(v1==null&&v2==null){

                           var vparam=v3;

                     }

                     else if(v1==null){

                           var vparam=v2;

                     }

                     else{

                           var vparam=v1;

                     }

                     var download_param=vparam.toLowerCase();

                     var download_uri=e.pathname.toLowerCase();

                     if (domtest(hn)&&(NTPT_DLT_match(download_uri,NTPT_DOWNLOADTYPES)||NTPT_DLT_match(download_param,NTPT_DOWNLOADTYPES))){

                           var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";

                           var prtcl=e.protocol;

                           var ttl="";

                           var text=document.all?e.innerText:e.text;

                           var img=evt_element(evt,"IMG");

                           if (img.alt){

                                  ttl=img.alt;

                           }

                           else if (text){

                                  ttl=text;

                           }

                           else if (e.innerHTML){

                                  ttl=e.innerHTML;

                           }

                           if (e.protocol == "ftp:"){

                                 var evAction = fullurl.substr(8);}

                           else{

                                 var evAction = fullurl.substr(9);}

                            if(evhndlr!=false){

                                  if (vparam == "none"){

                                        ntptEventTag('ibmEvAction='+evAction.toLowerCase()+'&ev=download');pause(500);}

                                  else {

                                         ntptEventTag('ibmEvAction='+download_param+'&ev=download');pause(500);}

                           }

                     }

              }

       }

}



function offsite_tracking(evt){

       evt=evt||(window.event||"");

       if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){

              var e=evt_element(evt,"A");

              if (e.href){

                     var hn=e.hostname?(e.hostname.split(":")[0]):"";

                     var pr=e.protocol||"";

                     if ((hn.length>0)&&(pr.indexOf("http")==0||pr.indexOf("mailto")==0)&&(!domtest(hn))){

                                  var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";

                                  var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";

                                  var fullurl=escape(e.href);

                                  var evAction = fullurl.substr(9);

                            if(evhndlr!=false){

                                   ntptEventTag('ev=external link&ibmEvAction='+evAction);pause(500);

                            }

                     }

              }

       }

}



function right_click_tracking(evt){

       evt=evt||(window.event||"");

       if (evt){

              var btn=evt.which||evt.button;

              if ((btn!=1)||(navigator.userAgent.indexOf("Safari")!=-1)){

                     var e=evt_element(evt,"A");

                     if ((typeof(e.href)!="undefined")&&e.href){

                           if ((typeof(e.protocol)!="undefined")&&e.protocol){

                                  var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";

                                  var qs1 = new Querystring(qry);

                                  var v1 = qs1.get("attachment");

                                  var v2 = qs1.get("FILE");

                                  var v3 = qs1.get("attachmentName");

                                  if (v1==null&&v2==null&&v3==null){

                                         var vparam="none";

                                  }

                                  else if(v1==null&&v2==null){

                                         var vparam=v3;

                                  }

                                  else if(v1==null){

                                         var vparam=v2;

                                  }

                                  else{

                                         var vparam=v1;

                                  }

                                  var download_param=vparam.toLowerCase();

                                  var download_uri=e.pathname.toLowerCase();

                                  if ((typeof(e.pathname)!="undefined")&&(NTPT_DLT_match(download_uri,NTPT_DOWNLOADTYPES)||NTPT_DLT_match(download_param,NTPT_DOWNLOADTYPES))){

                                         var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";

                                         var hn=e.hostname?(e.hostname.split(":")[0]):"";

                                         var fullurl=escape(e.href);

                                         if (e.protocol == "ftp:"){

                                                var evAction = fullurl.substr(8);}

                                         else{

                                                var evAction = fullurl.substr(9);}

                                         if(evhndlr!=false){

                                                if (vparam == "none"){

                                                      ntptEventTag('ibmEvAction='+evAction.toLowerCase()+'&ev=download');

                                                      return;}

                                                else {

                                                       ntptEventTag('ibmEvAction='+download_param+'&ev=download');

                                                       return;}

                                         }

                                  }

                           }

              if (e.href){

                     var hn=e.hostname?(e.hostname.split(":")[0]):"";

                     var pr=e.protocol||"";

                     if ((hn.length>0)&&(pr.indexOf("http")==0||pr.indexOf("mailto")==0)&&(!domtest(hn))){

                                  var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";

                                  var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";

                                  var fullurl=escape(e.href);

                                  var evAction = fullurl.substr(9);

                            if(evhndlr!=false){

                                   ntptEventTag('ev=external link&ibmEvAction='+evAction);



                            }

                     }

              }

                     }

              }

       }

}*/
/*function to fetch the content of the meta tag*/
function get_meta_tag(name) {
    var metatags = document.getElementsByTagName('meta'),
    	metaValue = null;
    for (var i = 0; i < metatags.length; i++) {
        if (metatags[i].getAttribute("name") == name) {
            metaValue = metatags[i].getAttribute("content");
        }
    }
    return metaValue;
}

/*creates Coremetrics element tag(conversion of Unica event to Coremetrics)*/
function create_cmElement(obj,objIbmEv,objIbmEvAction,cmElement){
	var pageid = "";
	if (typeof (window.cm_ClientID) != "undefined") var siteId = window.cm_ClientID.substring(window.cm_ClientID.indexOf("|") + 1);
	if (typeof (window.digitalData) != "undefined" && typeof (window.digitalData.page) != "undefined") {
	 	if(typeof (window.digitalData.page.pageInfo) != "undefined" && typeof (window.digitalData.page.pageInfo.pageID) != "undefined"){//for new DDO structure
	 		pageid = window.digitalData.page.pageInfo.pageID;
	 	}else if(typeof (window.digitalData.page.pageID) != "undefined"){
	 		pageid = window.digitalData.page.pageID;
	 	}
	}
	if (pageid === "") {
		var pathName = document.location.pathname;
		//remove some specified html versions from path name
        var lastpart = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
        var omittedHTMLVersions = ["index.php","index.phtml", "index.shtml", "index.wss", "index.jsp", "index.jspa", "index.htm", "index.html", "index"];
        for (var i = 0; i < omittedHTMLVersions.length; i++) {
            if (omittedHTMLVersions[i] == lastpart.toLowerCase()) {
                pathName = pathName.replace(lastpart, "");
            }
        }
        //add source parameter for IWM
        if(pathName.indexOf("iwm") !== -1){
        	var queryString = document.location.href.substring(document.location.href.indexOf("?") + 1),
         	queries, temp, i, l,
         	queries = queryString.split("&");
            for (i = 0, l = queries.length; i < l; i++) {
                 temp = queries[i].split('=');
                 if(temp[0] == "source"){
                	 pathName += "?source="+temp[1];
                 }
             }
        }
        //remove trailing slash, question mark, or hash(if any)
        pathName = pathName.replace(/[(\/)(?)(#)]+$/, "");
        pageid = document.location.host + pathName;
	}
	objIbmEv = decodeURIComponent(objIbmEv);
	objIbmEvAction = decodeURIComponent(objIbmEvAction);
	if (objIbmEv.length > 50) objIbmEv = objIbmEv.substring(0,22) + "..." + objIbmEv.substring(objIbmEv.length - 25, objIbmEv.length);
	if (objIbmEvAction.length > 50) objIbmEvAction = objIbmEvAction.substring(0,22) + "..." + objIbmEvAction.substring(objIbmEvAction.length - 25, objIbmEvAction.length);
	var currentdate = new Date(),
		pageLocation = window.location.href.replace(/-_-/g,"---"),
		spaces = (obj.ibmConversion && obj.ibmConversion == "true") ? "-_--_--_--_--_--_-" : ("-_-"+obj.ibmEvVidStatus + "-_-" + obj.ibmEvVidTimeStamp + "-_-" + obj.ibmEvVidLength + "-_--_--_-");
	if (typeof (window.pageViewAttributes) != "undefined") {
		pageid = pageid + spaces + window.pageViewAttributes.split('-_-')[17] + "-_-" + pageLocation + "-_-" +  currentdate.getTime() + "-_-" + window.pageViewAttributes.split('-_-')[0];
	}else{
		window.NTPT_IBMer = (String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-|OSCw3Session|IBM_W3SSO_ACCESS)=/)) ? 1 : 0;
		pageid = pageid + spaces + window.loadingTime + "-_-" + pageLocation + "-_-" +  window.loadingTime + "-_-" + window.NTPT_IBMer;
	}
	if(typeof(obj.ibmConversion) == "undefined" && typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "odw" || siteId.toLowerCase() == "w3odw")){
		if(String(get_meta_tag("IBM.WTMCategory")) !== "null") {
			pageid = pageid + "-_-" + String(get_meta_tag("IBM.WTMCategory"));
		}else if(typeof(window.digitalData.page.category) !== "undefined" && typeof(window.digitalData.page.category.primaryCategory) !== "undefined"){
			pageid = pageid + "-_-" + window.digitalData.page.category.primaryCategory;
		}	
	}
	//element tag for W3 SSI page
    if(typeof(obj.ibmConversion) == "undefined" && typeof(siteId) !== "undefined" && (siteId.toLowerCase() == "e065" || siteId.toLowerCase() == "e020" || siteId.toLowerCase() == "e021")){
    	//this.create_QueryString();
    	var htmlFid = (typeof(window.QueryString.htmlfid) !== "undefined") ? window.QueryString.htmlfid : "undefined";
    	if(htmlFid == "undefined"){
    		var ssiContentInfo = String(get_meta_tag("ContentInfo"));
    		if(ssiContentInfo !== '' && ssiContentInfo.indexOf('~') !== -1){
        		var ssiContentArray = ssiContentInfo.split('~');
        		for (var i=0; i<ssiContentArray.length; i++){
        			if(ssiContentArray[i].split(':')[0] == 'HTMLFID') htmlFid = ssiContentArray[i].split(':')[1];
        		}
        	}
    	}
    	pageid = pageid + "-_-" + htmlFid;
	}
	if(typeof(obj.ibmConversion) == "undefined" && typeof(siteId) !== "undefined" && siteId.toLowerCase() == "hr"){
		var hrWidgetAttrArray =  ["type","wtm_c1","wtm_c2","wtm_c3","wtm_c4","wtm_c5",
		                         	"lakey","ns","wc1","wc2","wc3","wc4","wc5","e1","e2","e3","ex1","ex2",
		                         	"opv","osn","fspv","qt","sortby","pagenumber","srt","lcp","lct"];
		for(var i=0; i<hrWidgetAttrArray.length; i++){
			if(typeof(obj[hrWidgetAttrArray[i]]) == "undefined") obj[hrWidgetAttrArray[i]] = "null";
			pageid += "-_-" + obj[hrWidgetAttrArray[i]];
		}
		pageid += "-_-" + document.title;
	}
	
	if(obj.ibmConversion && obj.ibmConversion == "true"){
		//create conversion event tag
		if (!obj.point && obj.convtype && obj.convtype == "1") obj.point = '10';
		if (!obj.point && obj.convtype && obj.convtype == "2") obj.point = '20';
		var cmConversion = obj.ibmEV+"-_-"+obj.ibmEvAction+"-_-"+obj.ibmEvName+"-_-"+obj.ibmEvGroup+"-_-"+obj.ibmEvModule+"-_-"+obj.ibmEvSection+"-_-"+obj.ibmEvTarget+"-_-"+obj.ibmEvLinkTitle+"-_-"+obj.ibmEvFileSize+"-_-"+obj.ibmregoff+"-_-"+obj.ibmregmail;
		if (typeof cmCreateConversionEventTag !== 'undefined') cmCreateConversionEventTag(objIbmEvAction,obj.convtype,objIbmEv,obj.point,cmConversion + "-_-" + pageid);
    }
	else if(obj.ibmProductTag && obj.ibmProductTag == "true"){
		window.onload = function(){
			if (typeof (window.pageViewAttributes) != "undefined") var productAttr = window.pageViewAttributes.split("-_-", 21).join("-_-");
			if(typeof siteId !== "undefined" && siteId.toLowerCase() == "ecom" && typeof obj.serviceType != "undefined") productAttr += "-_--_--_--_--_--_--_--_--_--_-" + obj.serviceType;
			if (typeof cmCreateProductviewTag !== 'undefined') cmCreateProductviewTag(obj.proID,obj.proName,obj.proCategory,productAttr,obj.cm_vc);
		}
	}
	else{
    	//create element event tag
    	if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(objIbmEvAction, objIbmEv, cmElement + "-_--_--_-" + pageid);
    }
}
//event_tracking();

//IBM code
(function () {
	// load and parse all meta tags
	var metatags = {};

	var m = document.getElementsByTagName("meta");
	for(var i=0, j=m.length; i<j; i++)
	{
		if(!!m[i].name)
		{
			metatags[m[i].name.toLowerCase()] = m[i].content;
		}
	}
	// all meta tags are now in the metatags array
	var getMT = function(name) {
		name = name.toLowerCase();
		if(!!metatags[name]) return metatags[name];
		return null;
	};


	/*var checkAndAdd = function(name) {
		var c = getMT(name);
		if (name == 'IBM.Country') { NTPT_GLBLEXTRA = 'ibm.inputcountry=' + c;}
		if(!!c) ntptAddPair(name, c);
	};

	ntptAddPair("site", "ibmcom");
	checkAndAdd("DC.Language");
	checkAndAdd("DC.Type");
	checkAndAdd("DC.Subject");
	checkAndAdd("DC.Date");
	checkAndAdd("IBM.Industry");
	checkAndAdd("IBM.Country");
	checkAndAdd("IBM.WTMCategory");
	checkAndAdd("IBM.SpecialPurpose");
	checkAndAdd("Owner");
	checkAndAdd("Description");
	/** BEGIN
		Added by Jayant for Randy Juan Leon's Request
	**/
	//checkAndAdd("IBM.Effective");
	//checkAndAdd("Source");
	/** END
		Added by Jayant for Randy Juan Leon's Request
	**/

/*	if(!!document.title) ntptAddPair("Title", document.title);
	if(typeof(SA_Message)!='undefined'&&!!SA_Message) ntptAddPair("SA_Message", SA_Message);
	if(typeof(cm_ClientID)!='undefined'&&!!cm_ClientID) ntptAddPair("cm_ClientID", cm_ClientID);
	if(typeof(cm_groupID)!='undefined'&&!!cm_groupID) ntptAddPair("cm_groupID", cm_groupID);

	if(typeof(ibmWTMSite)!='undefined'&&!!ibmWTMSite) {
		ntptAddPair("IBM.WTMSite", ibmWTMSite);
	} else if (typeof(ibmwtmsite)!='undefined'&&!!ibmwtmsite) {
		ntptAddPair("IBM.wtmsite", ibmwtmsite);
	} else {
		checkAndAdd("IBM.WTMSite");
	}

	if(!!window.ibmCommonErrorpagesStatus){ntptAddPair("sc",window.ibmCommonErrorpagesStatus)}*/

/** BEGIN
Replacing unicaCookie value with Klaus' code suggestion to capture IBMer and nonIBMer information
**/
/*var i = new Image();
i.onload=function() {
    ntptAddPair("IBMer", "1");
    ntptEventTag(this);
}
i.onerror=function() {
    ntptAddPair("IBMer", "0");
    ntptEventTag(this);
}

if (String(document.cookie).match(/(^| )(w3ibmProfile|w3_sauid|PD-W3-SSO-|OSCw3Session|IBM_W3SSO_ACCESS)=/)) {
    ntptAddPair("IBMer", "1");
    ntptEventTag(this);
}
else {
   ntptAddPair("IBMer", "0");
   ntptEventTag(this);

}*/ 
/** END
Replacing unicaCookie value with Klaus' code suggestion to capture IBMer and nonIBMer information
**/

/** BEGIN
Added by Jayant for Randy : Coremetrics Data Collection
**/

// Coremetrics tracking for SWG when IBM.WTMCategory equals SSMPXR
if ('ssmpxr' === String(getMT("IBM.WTMCategory")).toLowerCase()) {

/**
 * scriptloader loads a script and executes the callback upon load competion (onreadystatechange to loaded/complete or onload event)
 * @param {src} URL address to load
 * @param {callback} function object to be executed
 * @private
 */
	function scriptloader(src, callback) {
		var script;
		script = document.createElement("script");
		script.src = src;
		script.type = "text/javascript";
		script.async = true;
		script.onload =
			function () {
				if (!script.onloadDone) {
					script.onloadDone = true;
					callback();
				}
			};
		script.onreadystatechange =
			function () {
				if (("loaded" === script.readyState || "complete" === script.readyState) && !script.onloadDone) {
					script.onloadDone = true;
					callback();
				}
			};
		script.onloadDone = false;
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(script, s);
	}

/**
 * Loading sequence as per William Bird/Austin/IBM@IBMUS
 * 1. Load eluminate.js with modification to not load client specific config script
 * 2. Execute cmSetClientID
 * 3. Load client specific config script
 * 4. Execute cmCreatePageviewTag
 */
	scriptloader("//1.www.s81c.com/common/stats/eluminate.js",
		function () {
			cmSetClientID("90383199", true, "data.coremetrics.com", "ibm.com");
			scriptloader("//libs.coremetrics.com/configs/90383199.js",
				function () {
					cmCreatePageviewTag(document.title, window.location);
				}
			);
		}
	);
}

/** END
Added by Jayant for Randy : Coremetrics Data Collection
**/

}) ();

/*IBMCreateShop5Tag = cmCreateShop5Tag =
IBMDisplayShop5s = cmDisplayShop5s =
IBMCreateShop9Tag = cmCreateShop9Tag =
IBMDisplayShop9s = cmDisplayShop9s =
IBMCreateOrderTag = cmCreateOrderTag =
IBMCreateRegistrationTag = cmCreateRegistrationTag =
IBMCreatePageViewTag = cmCreatePageViewTag = cmCreateConversionEventTag = ibmCreateFlashPageviewTag = sa_onclick = function () { return true; };
*/
var ibmStats = ibmStats || {};

ibmStats.event =  function (obj) {
	if (!obj.ibmEV) obj.ibmEV = 'null';
    if (!obj.ibmEvAction) obj.ibmEvAction = 'null';
    if (!obj.ibmEvGroup) obj.ibmEvGroup = 'null';
    if (!obj.ibmEvName) obj.ibmEvName = 'null';
    if (!obj.ibmEvModule) obj.ibmEvModule = 'null';
    if (!obj.ibmEvSection) obj.ibmEvSection = 'null';
    if (!obj.ibmEvTarget) obj.ibmEvTarget = 'null';
    if (!obj.ibmEvFileSize) obj.ibmEvFileSize = 'null';
    if (!obj.ibmEvLinkTitle) obj.ibmEvLinkTitle = 'null';
    if (!obj.ibmEvVidStatus) obj.ibmEvVidStatus = 'null';
    if (!obj.ibmEvVidTimeStamp) obj.ibmEvVidTimeStamp = 'null';
    if (!obj.ibmEvVidLength) obj.ibmEvVidLength = 'null';

    //creates Coremetrics element tag(conversion of Unica event to Coremetrics)
    var cmElement = obj.ibmEV+"-_-"+obj.ibmEvAction+"-_-"+obj.ibmEvName+"-_-"+obj.ibmEvGroup+"-_-"+obj.ibmEvModule+"-_-"+obj.ibmEvSection+"-_-"+obj.ibmEvTarget+"-_-"+obj.ibmEvLinkTitle+"-_-"+obj.ibmEvFileSize;
    create_cmElement(obj,obj.ibmEV,obj.ibmEvAction,cmElement);
};

/** BEGIN
Added by Jayant for Randy on Joe's Request
**/
var NETINSIGHT_OVERLAY_NORMALIZE_URL_JS = "http://www.ibm.com/common/stats/normalize_url.js";

/** END
Added by Jayant for Randy on Joe's Request
**/



//if(!!console) console.log("Running test version of stats.js");
