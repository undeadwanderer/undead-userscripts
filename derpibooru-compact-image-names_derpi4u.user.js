// ==UserScript==
// @name        Derpi compact image names
// @author      undead_wanderer
// @namespace   https://derpibooru.org/profiles/Pink%2BAmena
// @description New image links with less tags.
// @version     1.1.2 / 2024-05-22
// @license     Creative Commons BY-NC-SA 4.0
// @include     /^https?://(www\.)?(derpi|trixie)booru\.org/.*$/
// @include     https://ronxgr5zb4dkwdpt.onion/*
// @require     https://raw.githubusercontent.com/undeadwanderer/Derpibooru-Unified-Userscript-Ui/master/derpi-four-u.js
// @inject-into content
// @grant       none
// ==/UserScript==

"use strict";

// Derpi4U stuff

let config = ConfigManager(
    'Derpibooru Customizable Image Names',
    'derpi_compact_image_url',
    'Customize full file names for viewed and downloaded images.'
);
let tagConfig = config.addFieldset(
    'Tags to be used in the image names:',
    'fieldset1',
);
tagConfig.registerSetting({
    title: 'Ratings',
    key: 'tags_rating',
    // description: '',
    type: 'checkbox',
    defaultValue: true
});
tagConfig.registerSetting({
    title: 'Artist(s) and origin',
    key: 'tags_origin',
    // description: '',
    type: 'checkbox',
    defaultValue: true
});
tagConfig.registerSetting({
    title: 'Characters',
    key: 'tags_characters',
    // description: '',
    type: 'checkbox',
    defaultValue: true
});
tagConfig.registerSetting({
    title: 'Species and body type',
    key: 'tags_species',
    // description: '',
    type: 'checkbox',
    defaultValue: false
});
tagConfig.registerSetting({
    title: 'Official media',
    key: 'tags_media_official',
    // description: '',
    type: 'checkbox',
    defaultValue: false
});
tagConfig.registerSetting({
    title: 'Fanworks',
    key: 'tags_media_fanmade',
    // description: '',
    type: 'checkbox',
    defaultValue: false
});
tagConfig.registerSetting({
    title: 'Spoilers',
    key: 'tags_spoilers',
    // description: '',
    type: 'checkbox',
    defaultValue: false
});
tagConfig.registerSetting({
    title: 'Errors',
    key: 'tags_error',
    // description: '',
    type: 'checkbox',
    defaultValue: false
});
tagConfig.registerSetting({
    title: 'Other tags',
    key: 'tags_rest',
    // description: '',
    type: 'checkbox',
    defaultValue: false
});

// Main code

const tagRatingsEnabled = config.getEntry('tags_rating');               // Enables rating tags
const tagOriginEnabled = config.getEntry('tags_origin');                // Enables artist/origin tags
const tagCharactersEnabled = config.getEntry('tags_characters');        // Enables character and oc tags
const tagSpeciesEnabled = config.getEntry('tags_species');              // Enables species and body type (semi-anthro, anthro) tags
const tagSpoilersEnabled = config.getEntry('tags_spoilers');            // Enables spoiler tags
const tagMediaOfficialEnabled = config.getEntry('tags_media_official'); // Enables official content tags
const tagMediaFanmadeEnabled = config.getEntry('tags_media_fanmade');   // Enables fanwork tags
const tagErrorEnabled = config.getEntry('tags_error');                  // Enables error tags
const tagRestEnabled = config.getEntry('tags_rest');                    // Enables the remaining tags

if (window.location.pathname.match(/(\/images)?\/\d+/i) !== null) {
    const hostName = window.location.origin;
    const imageId = window.location.pathname.replace(/(\/images)?\//i, '');
    const imageFormat = document.querySelector('.image-size').innerHTML.match(/gif|jpg|jpeg|png|svg|webm/i)[0].toLowerCase();
    let tagRatings = '';
    let tagOrigin = '';
    let tagCharacters = '';
    let tagSpecies = '';
    let tagMediaOfficial = '';
    let tagMediaFanmade = '';
    let tagSpoilers = '';
    let tagError = '';
    let tagRest = '';
    const uploadDate = document.querySelector('time[datetime]').getAttribute('datetime').match(/\d\d\d\d-\d\d-\d\d/)[0].split(/-0?/);
    const tagList = document.querySelectorAll('span[class="tag dropdown"]');

    for (let x of tagList) {
    const tagId = x.dataset.tagSlug;
        if (tagOriginEnabled === true && x.dataset.tagCategory === 'origin') {
          tagOrigin += '_' + tagId;
        } else if (tagRatingsEnabled === true && x.dataset.tagCategory === 'rating') {
          tagRatings += '_' + tagId;
        } else if (tagCharactersEnabled === true && (x.dataset.tagCategory === 'character' || x.dataset.tagCategory === 'oc')) {
          tagCharacters += '_' + tagId;
        } else if (tagSpeciesEnabled === true && (x.dataset.tagCategory === 'species' || x.dataset.tagCategory === 'body-type')) {
          tagSpecies += '_' + tagId;
        } else if (tagSpoilersEnabled === true && x.dataset.tagCategory === 'spoiler') {
          tagSpoilers += '_' + tagId;
        } else if (tagMediaOfficialEnabled === true && x.dataset.tagCategory === 'content-official') {
          tagMediaOfficial += '_' + tagId;
        } else if (tagMediaFanmadeEnabled === true && x.dataset.tagCategory === 'content-fanmade') {
          tagMediaFanmade += '_' + tagId;
        } else if (tagErrorEnabled === true && x.dataset.tagCategory === 'error') {
          tagError += '_' + tagId;
        } else if (tagRestEnabled === true && x.dataset.tagCategory === '') {
          tagRest += '_' + tagId;
        }
    }

    let imageName = imageId + '_' + tagError + tagRatings + tagOrigin + tagCharacters + tagSpecies + tagMediaOfficial + tagMediaFanmade + tagSpoilers + tagRest;
    imageName = imageName.slice(0, 150) + '.' + imageFormat;
    let viewLink = document.querySelector('a[title="View (tags in filename)"]');
    let downloadLink = document.querySelector('a[title="Download (tags in filename)"]');
    viewLink.href = 'https://derpicdn.net/img/view/' + uploadDate[0] + '/' + uploadDate[1] + '/' + uploadDate[2] + '/' + imageName;
    downloadLink.href = 'https://derpicdn.net/img/download/' + uploadDate[0] + '/' + uploadDate[1] + '/' + uploadDate[2] + '/' + imageName;
}
