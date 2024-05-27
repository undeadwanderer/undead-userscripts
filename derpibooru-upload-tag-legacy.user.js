// ==UserScript==
// @name         Derpibooru Default Rating Tag Legacy Version
// @author       undead_wanderer
// @description  Automatically adds the "safe" tag at the upload page. Made for personal use.
// @version      0.6.1 | 2024-05-27
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      CC BY-NC-SA 4.0
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/images/new$/
// @include      https://ronxgr5zb4dkwdpt.onion/images/new
// @require      https://cdnjs.cloudflare.com/ajax/libs/zepto/1.1.6/zepto.min.js
// @grant        none

// ==/UserScript==

// fancy editor

var $fancyTags = $('.fancy-tag-upload');             // fancy tags div
var $normalTags = $('textarea.tagsinput');
var $tagInput = $('input.js-taginput-fancy');        // tag input box
var $switch1 = $('.js-taginput-show');               // fancy editor button
var $switch2 = $('.js-taginput-hide');               // plain editor button

if ($normalTags.value === "") {    //check that there are no tags on page load
  $switch2[0].click();
  $normalTags[0].value += 'safe, ';
  $switch1[0].click();
}
