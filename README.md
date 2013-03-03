# ProcessWire Email Obfuscation (EMO)
Email Obfuscation module for plaintext emails and email links with 64 base crypting.

This module finds all plaintext emails and email links from the content and replaces them with span elements. All the 
addresses are stored in 64 base encoded srings to JavaScript array in souce code. Then on client side browser finds 
emo_email span elements, replaces and encodes them back to email addresses.

All emails inside form elements are left untouched. Same as anchor texts, unless it's email address. You can define 
default text string for replaced email address in module config.

Both emo touched span and anchor elements have 'emo_email' class name that you can use for css/js.

## Install
1. Create new folder into /site/modules/ and rename it as you wish. 'EmailObfuscation' or simply 'emo' are good choises.
2. Download the contents of this repository to your computer and upload it to newly created folder.
3. Login to processwire and go to Modules page and click 'Check for new modules'. Find emo and click install.
4. You can make optional configuration changes in module admin page.

## Thanks
This is ProcessWire module fork from MODX Evolution plugin emo E-Mail Obfuscation.
http://modx.com/extras/package/emoemailobfuscation

## License
GNU Public License (GPL) http://www.gnu.org/copyleft/gpl.html