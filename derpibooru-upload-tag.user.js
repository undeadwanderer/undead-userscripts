// ==UserScript==
// @name         Derpibooru Default Rating Tag
// @description  Automatically adds the "safe" tag at the upload page. Made for personal use. ATM, if using fancy tags, the tag may require to be 'confirmed'.
// @version      0.5
// @namespace    https://derpibooru.org/profiles/Sullen
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/images/new$/
// @include      https://ronxgr5zb4dkwdpt.onion/images/new
// @grant        none

document.querySelector("textarea#image_tag_input").defaultValue = "safe, "; // normal editor
document.querySelector("input.js-taginput-input-tag_input").defaultValue = "safe"; // fancy editor
// TBD: figure out tag input 'confirmation' without emptying the tag field contents on page refresh, or launch the script on initial load only.

// Attempt to bypass 'confirmation'
// document.querySelector("div.js-taginput").innerHTML =
//  '<span class="tag">safe <a href="#" data-tag-name="safe">x</a></span>' 
// + document.querySelector("div.js-taginput").innerHTML;
// Overrides already entered tags in the local storage on page refresh.

// ==/UserScript==
