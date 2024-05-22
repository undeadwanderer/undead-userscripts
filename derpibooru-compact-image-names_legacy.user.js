// ==UserScript==
// @name        Derpi compact image names legacy
// @author      undead_wanderer
// @namespace   https://derpibooru.org/profiles/Pink%2BAmena
// @description New image links with less tags.
// @version     1.1.2 | 2024-05-22
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
    let tagRatings = '';
    let tagOrigin = '';
    let tagCharacters = '';
    let tagSpecies = '';
    let tagMediaOfficial = '';
    let tagMediaFanmade = '';
    let tagSpoilers = '';
    let tagError = '';
    let tagRest = '';
    const tagRatingsEnabled = true;        // Enables rating tags
    const tagOriginEnabled = true;         // Enables artist/origin tags
    const tagCharactersEnabled = true;     // Enables character and oc tags
    const tagSpeciesEnabled = false;       // Enables species and body type (semi-anthro, anthro) tags
    const tagSpoilersEnabled = false;      // Enables spoiler tags
    const tagMediaOfficialEnabled = false; // Enables official content tags
    const tagMediaFanmadeEnabled = false;  // Enables fanmade content tags
    const tagErrorEnabled = false;         // Enables error tags
    const tagRestEnabled = false;          // Enables the remaining tags
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
