// ==UserScript==
// @name         Derpibooru Default Upload Tags
// @author       undead_wanderer
// @description  Automatically adds the "safe" tag at the upload page. Made for personal use.
// @version      0.7.1 | 2024-04-13
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      CC BY-NC-SA 4.0
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/(images/new|settings/edit)/
// @include      /^https?://ronxgr5zb4dkwdpt\.onion/(images/new|settings/edit)/
// @require      https://cdnjs.cloudflare.com/ajax/libs/zepto/1.1.6/zepto.min.js
// @require      https://raw.githubusercontent.com/marktaiwan/Derpibooru-Unified-Userscript-Ui/master/derpi-four-u.js
// @inject-into  content
// @grant        none

// ==/UserScript==

// configuration things
var config = ConfigManager (
  'Derpibooru Default Upload Tags',
  'script_id',
  'Automatically add tags to the upload page.'
);
config.registerSetting ({
  title: 'Tags',
  key: 'defaultTags',
  description: 'Tags you want to see on the upload page by default. Separate with commas.',
  type: 'text',
  defaultValue: 'safe, pony'
});

if (window.location.pathname === '/images/new') {
  // fancy editor
  var Tags = config.getEntry('defaultTags');

  var $fancyTags = $('.fancy-tag-upload');             // fancy tags div
  var $tagInput = $('input.js-taginput-fancy');        // tag input box
  var $switch1 = $('.js-taginput-show');               // fancy editor button
  var $switch2 = $('.js-taginput-hide');               // plain editor button

  if ($fancyTags.html().search('<span>') === -1) {    //check that there are no tags on page load

    $switch2[0].click();
    var $normalTags = $('textarea.tagsinput');
    $normalTags[0].value += Tags;
    $switch1[0].click();
  }
}
