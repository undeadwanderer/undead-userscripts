// ==UserScript==
// @name        Derpi compact image names
// @author      undead_wanderer
// @namespace   https://derpibooru.org/profiles/Pink%2BAmena
// @description New image links with less tags.
// @version     1.1.3 / 2024-05-27
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

const tagTypesEnabled = {
    Ratings: config.getEntry('tags_rating'),               // Enables rating tags
    Origin: config.getEntry('tags_origin'),                // Enables artist/origin tags
    Characters: config.getEntry('tags_characters'),        // Enables character and oc tags
    Species: config.getEntry('tags_species'),              // Enables species and body type (semi-anthro, anthro) tags
    Spoilers: config.getEntry('tags_spoilers'),            // Enables spoiler tags
    MediaOfficial: config.getEntry('tags_media_official'), // Enables official content tags
    MediaFanmade: config.getEntry('tags_media_fanmade'),   // Enables fanwork tags
    Error: config.getEntry('tags_error'),                  // Enables error tags
    Rest: config.getEntry('tags_rest')                     // Enables the remaining tags
};


if (window.location.pathname.match(/(\/images)?\/\d+/i) !== null) {
    const hostName = window.location.origin;
    const imageId = window.location.pathname.replace(/(\/images)?\//i, '');
    const imageFormat = document.querySelector('.image-size').innerHTML.match(/gif|jpg|jpeg|png|svg|webm/i)[0].toLowerCase();
    let tags = {
        Ratings: '',
        Origin: '',
        Characters: '',
        Species: '',
        MediaOfficial: '',
        MediaFanmade: '',
        Spoilers: '',
        Error: '',
        Rest: ''
    };
    const uploadDate = document.querySelector('time[datetime]').getAttribute('datetime').match(/\d\d\d\d-\d\d-\d\d/)[0].split(/-0?/);
    const tagList = document.querySelectorAll('span[class="tag dropdown"]');

    for (let x of tagList) {
    const tagId = x.dataset.tagSlug;
        if (tagTypesEnabled.Origin === true && x.dataset.tagCategory === 'origin') {
          tags.Origin += '_' + tagId;
        } else if (tagTypesEnabled.Ratings === true && x.dataset.tagCategory === 'rating') {
          tags.Ratings += '_' + tagId;
        } else if (tagTypesEnabled.Characters === true && (x.dataset.tagCategory === 'character' || x.dataset.tagCategory === 'oc')) {
          tags.Characters += '_' + tagId;
        } else if (tagTypesEnabled.Species === true && (x.dataset.tagCategory === 'species' || x.dataset.tagCategory === 'body-type')) {
          tags.Species += '_' + tagId;
        } else if (tagTypesEnabled.Spoilers === true && x.dataset.tagCategory === 'spoiler') {
          tags.Spoilers += '_' + tagId;
        } else if (tagTypesEnabled.MediaOfficial === true && x.dataset.tagCategory === 'content-official') {
          tags.MediaOfficial += '_' + tagId;
        } else if (tagTypesEnabled.MediaFanmade === true && x.dataset.tagCategory === 'content-fanmade') {
          tags.MediaFanmade += '_' + tagId;
        } else if (tagTypesEnabled.Error === true && x.dataset.tagCategory === 'error') {
          tags.Error += '_' + tagId;
        } else if (tagTypesEnabled.Rest === true && x.dataset.tagCategory === '') {
          tags.Rest += '_' + tagId;
        }
    }

    let imageName = imageId + '_' + tags.Error + tags.Ratings + tags.Origin + tags.Characters + tags.Species + tags.MediaOfficial + tags.MediaFanmade + tags.Spoilers + tags.Rest;
    imageName = imageName.slice(0, 150) + '.' + imageFormat;
    let viewLink = document.querySelector('a[title="View (tags in filename)"]');
    let downloadLink = document.querySelector('a[title="Download (tags in filename)"]');
    viewLink.href = 'https://derpicdn.net/img/view/' + uploadDate[0] + '/' + uploadDate[1] + '/' + uploadDate[2] + '/' + imageName;
    downloadLink.href = 'https://derpicdn.net/img/download/' + uploadDate[0] + '/' + uploadDate[1] + '/' + uploadDate[2] + '/' + imageName;
}
