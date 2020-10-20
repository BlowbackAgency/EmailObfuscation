/*
 * Email Obfuscation (EMO)
 *
 * Email Obfuscation module for email addresses with 64 base crypting.
 *
 * https://github.com/BlowbackDesign/EmailObfuscation
 * Copyright (C) 2020 Blowback https://www.blowback.fi
 * MIT license http://opensource.org/licenses/MIT
 *
 * This ProcessWire module is originally a fork from a MODX Evolution plugin:
 * https://modx.com/extras/package/emoemailobfuscation
 *
 */

var emo = emo || {};

emo.init = function() {
  if(emo.debug === true) {
    console.log('EMO inited!\nUsing key: ' + emo.key);
  }
  emo.replace(document);
};

emo.cache = new Array();

emo.replace = function(element) {
  var el = element.querySelectorAll('[data-emo]');
  var decrypted = '';
  for(var i = 0; i < el.length; i++) {
    if(el[i]) {
      if(emo.debug === true) console.log(i + ': ' + el[i].outerHTML);
      if(el[i].firstChild) {
        el[i].removeChild(el[i].firstChild);
      }
      decrypted = emo.decrypt(el[i].getAttribute('data-emo'));
      if(emo.debug === true) console.log(i + ': ' + decrypted);
      el[i].outerHTML = decrypted;
    }
  }
};

emo.decrypt = function(id) {
  if(!emo.cache[id]) {
    emo.cache[id] = decodeURIComponent(escape(emo.decode(id)));
  }
  return emo.cache[id];
};

emo.decode = function(data) {
  var out = "", c1, c2, c3, e1, e2, e3, e4;
  for(var i = 0; i < data.length;) {
    e1 = emo.key.indexOf(data.charAt(i++));
    e2 = emo.key.indexOf(data.charAt(i++));
    e3 = emo.key.indexOf(data.charAt(i++));
    e4 = emo.key.indexOf(data.charAt(i++));
    c1 = (e1 << 2) + (e2 >> 4);
    c2 = ((e2 & 15) << 4) + (e3 >> 2);
    c3 = ((e3 & 3) << 6) + e4;
    out += String.fromCharCode(c1);
    if(e3 != 64) out += String.fromCharCode(c2);
    if(e4 != 64) out += String.fromCharCode(c3);
  }
  return out;
};

if(emo.key !== undefined) {
  emo.init();
} else {
  window.addEventListener('DOMContentLoaded', emo.init);
}
