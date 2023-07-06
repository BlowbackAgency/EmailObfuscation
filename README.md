# ProcessWire Email Obfuscation (EMO)

**Email Obfuscation module for email addresses with 64 base crypting**

This module finds all plaintext emails and email links from the document and
replaces them with noscript elements with configurable replace text. All the
addresses are encoded to 64 base strings and stored in noscript data attributes.
Then on client side we decode these strings back to their original state.

## Install

### ProcessWire installation

Install this module using standard [install procedure in ProcessWire][1].

### Using Composer

```console
composer require blowback/emailobfuscation
```

## Options

After install you can find some configurable options on module admin page.

### Replace text string

Transliterable text string used as a replace to obfuscated email address.

### Obfuscation mode

There is three modes available for this module to handle obfuscation.

1. Obfuscate manually by using `$sanitizer->emo($str)` method.
2. Obfuscate automatically at selected templates/pages.
3. Obfuscate automatically but exclude selected templates/pages (default).

### JavaScript loading method

1. Load file manually.
2. Load file to `$config->scripts` array.
3. Append automatically to page as external script (default).
4. Append automatically to page as inline script.

### Force mailto

By enabling force mailto option all email addresses are rendered as mailto
links regardless of their original state.

### Fixed encrypt key

When enabled encryption key is locked and does not change. By default encryption
key updates on every session. Fixed key is required when you cache obfuscated
AJAX output for more than session lifetime.

### Debug

Appends debug data to HTML and console output.

### Selected Templates / Pages

List of selected templates/pages that are used to include or exclude at
automatic obfuscation.

## Thanks

This ProcessWire module originates from MODX Evolution plugin.

## License

[MIT License](https://opensource.org/license/mit/)

[1]: https://modules.processwire.com/install-uninstall/
