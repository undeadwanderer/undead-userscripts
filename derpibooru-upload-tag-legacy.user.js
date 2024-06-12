// ==UserScript==
// @name         Derpibooru upload page customization legacy
// @author       undead_wanderer
// @description  Automatically adds tags and description of your choosing on the image upload page. Made for personal use.
// @version      0.8.2 | 2024-06-12
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      CC BY-NC-SA 4.0
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/(images/new|settings/edit)/
// @include      /^https?://ronxgr5zb4dkwdpt\.onion/(images/new|settings/edit)/
// @grant        none

// ==/UserScript==

"use strict";

// main code
function main(){
    // user variables
    const Tags = 'safe';                                                      // tags you wish to see on the upload page by default. Separate with commas.
    const Description = '';                                                   // text you wish to see in the description field on the upload page by default. "\n" for new line.

    // window element variables
    const switch1 = document.querySelector('button.js-taginput-show');        // switch to fancy editor button
    let normalTags = document.querySelector('textarea#image_tag_input');      // plaintext tags area
    let descInput = document.querySelector('textarea#image_description');     // description field

    if (normalTags.value === "") {                                            // check that there are no tags on page load
        normalTags.value += Tags + ", ";
        if (switch1.classList.contains('hidden') === true) {                  // check if fancy tags are enabled by default
            switch1.click();                                                  // click the fancy editor buttton to apply the tags into the fancy view
        }
    }
    if (descInput.value === "") {                                             // check that there is no description on page load
        descInput.value += Description;
    }
};

if (window.location.pathname === '/images/new') {
    main();
}
