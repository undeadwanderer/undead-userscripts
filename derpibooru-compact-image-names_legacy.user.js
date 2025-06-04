// ==UserScript==
// @name        Derpi compact image names legacy
// @author      undead_wanderer
// @namespace   https://derpibooru.org/profiles/Pink%2BAmena
// @description New image links with less tags.
// @version     1.1.4
// @license     Creative Commons BY-NC-SA 4.0
// @include     /^https?://(www\.)?(derpi|trixie)booru\.org/.*$/
// @include     https://ronxgr5zb4dkwdpt.onion/*
// @grant       none
// ==/UserScript==

"use strict";

if (window.location.pathname.match(/(\/images)?\/\d+/i) !== null) {
    const hostName = window.location.origin;
    const imageId = window.location.pathname.replace(/(\/images)?\//i, '');
    const imageFormat = document.querySelector('.image-size').innerHTML.match(/gif|jpg|jpeg|png|svg|webm/i)[0].toLowerCase();
    const tagTypesEnabled = {
        Ratings: true,                  // Enables rating tags
        Origin: true,                   // Enables artist/origin tags
        Characters: true,               // Enables character and oc tags
        Species: false,                 // Enables species and body type (semi-anthro, anthro) tags
        Spoilers: false,                // Enables spoiler tags
        MediaOfficial: false,           // Enables official content tags
        MediaFanmade: false,            // Enables fanwork tags
        Error: false,                   // Enables error tags
        Rest: false                     // Enables the remaining tags
    };
    const uploadDate = document.querySelector('time[datetime]').getAttribute('datetime').match(/\d\d\d\d-\d\d-\d\d/)[0].split(/-0?/);
    const tagList = document.querySelectorAll('.tag.dropdown"]');

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
