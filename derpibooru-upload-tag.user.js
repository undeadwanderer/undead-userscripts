// ==UserScript==
// @name         Derpibooru upload page customization
// @author       undead_wanderer
// @description  Automatically adds tags and description of your choosing on the image upload page. Made for personal use.
// @version      0.8.1 | 2024-05-27
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      CC BY-NC-SA 4.0
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/(images/new|settings/edit)/
// @include      /^https?://ronxgr5zb4dkwdpt\.onion/(images/new|settings/edit)/
// @require      https://raw.githubusercontent.com/undeadwanderer/Derpibooru-Unified-Userscript-Ui/master/derpi-four-u.js
// @inject-into  content
// @grant        none

// ==/UserScript==

// configuration things
let config = ConfigManager (
    'Derpibooru Default Upload Tags',
    'upload_tags',
    'Automatically add tags to the upload page.'
);
config.registerSetting ({
    title: 'Tags',
    key: 'defaultTags',
    description: 'Tags you want to see on the upload page by default. Separate with commas.',
    type: 'text',
    defaultValue: 'safe'
});
config.registerSetting ({
    title: 'Description',
    key: 'defaultDesc',
    description: 'Text you want to see in the description by default.',
    type: 'textarea',
    defaultValue: ''
});

if (window.location.pathname === '/images/new') {

    const Tags = config.getEntry('defaultTags');
    const Description = config.getEntry('defaultDesc');

    const switch1 = document.querySelector('.js-taginput-show');               // fancy editor button
    const switch2 = document.querySelector('.js-taginput-hide');               // plain editor button
    // let fancyTags = document.querySelector('.fancy-tag-upload');             // fancy tags div
    let normalTags = document.querySelector('textarea#image_tag_input'); // normal tags textarea
    // let tagInput = document.querySelector('input.js-taginput-fancy');        // tag input box
    let descInput = document.querySelector('textarea#image_description');     // description

    // if (fancyTags.innerHTML.search('<span>') === -1) {    //check that there are no tags on page load

    if (normalTags.value === "") {    //check that there are no tags on page load
        switch2.click();
        normalTags.value += Tags;
        switch1.click();
    }
    if (descInput.value === "") {
        descInput.value += Description;
    }
}
