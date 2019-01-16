/*
 *  Written by: Florian Wobbe
 *  Contact: www.eprofs.de
 *  Created: 2008-01-12 - v1.1
 *  Modified: 2008-01-17 - v1.2 - Email encoding
 *  Modified: 2008-01-19 - v1.3 - Custom Base64 encoding
 *  Modified: 2013-02-27 - v1.4 - Unicode characters fix
 *  Modified: 2018-06-10 - v1.5 - Remove onload event init
 *  Modified: 2018-12-31 - v1.6 - Convert to object literal + auto init onload
 *  Name: EMO Email Obfuscation
 *  Description: These javascript functions replace html placeholder
 *    span elements with decrypted email addresses.
 *  License: GPL
 */


var emo = {

  init: function() {
    if(typeof(emo_addr) === 'undefined') return;
    emo.replace();
  },

  replace: function() {
    for(var i = 1; i < emo_addr.length; i++) {
      var id = 'emo_email_' + i;
      var elem = document.getElementById(id);
      if(elem) {
        if(elem.firstChild) {
          elem.removeChild(elem.firstChild);
        }
        elem.outerHTML = emo.decrypt(i);
      }
    }
  },

  decrypt: function(n) {
    if(emo.cache[n]) return emo.cache[n];
    if(emo_addr[n]) var crypted = emo_addr[n];
    if(!crypted.length) return "Emo decrypt error, not a valid index.";
    emo.cache[n] = decodeURIComponent(escape(emo.decode(crypted)));
    return emo.cache[n];
  },

  decode: function(data) {
    var tab = emo_addr[0];
    var out = "", c1, c2, c3, e1, e2, e3, e4;
    for(var i = 0; i < data.length;) {
      e1 = tab.indexOf(data.charAt(i++));
      e2 = tab.indexOf(data.charAt(i++));
      e3 = tab.indexOf(data.charAt(i++));
      e4 = tab.indexOf(data.charAt(i++));
      c1 = (e1 << 2) + (e2 >> 4);
      c2 = ((e2 & 15) << 4) + (e3 >> 2);
      c3 = ((e3 & 3) << 6) + e4;
      out += String.fromCharCode(c1);
      if(e3 != 64) out += String.fromCharCode(c2);
      if(e4 != 64) out += String.fromCharCode(c3);
    }
    return out;
  },

  cache: new Array(),

};

window.addEventListener('load', function() {
  emo.init();
});
