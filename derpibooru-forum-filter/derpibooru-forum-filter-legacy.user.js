// ==UserScript==
// @name         Derpibooru Thread Filter legacy
// @author       Undead_Wanderer
// @description  An attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use.
// @version      1.2
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      Creative Commons BY-NC-SA 4.0
// @include      *
// @grant        none

// ==/UserScript==

if (document.head.querySelector('meta[content="philomena"]')) {
    "use strict";

    const markerWords = ["NSFW", "NFSW", "Not safe for work"]; // filter words
    const escapeWords = ['No NSFW'] // exclusion words
    let spoiler = true;
    let x = document.querySelectorAll("a[href*='/forums/']"); // retrieve all forum link titles.

    markerWords.forEach(function(item, index, arr) {
        for (let i of x) {
            if (i.innerHTML.toLowerCase().includes(arr[index].toLowerCase())) { // string test for marker words.
                escapeWords.forEach(function(item1, index1, arr1) {
                    if (i.innerHTML.toLowerCase().includes(arr1[index1].toLowerCase())) { // string test for escape words.
                        spoiler = false;
                    }
                });
                if (spoiler) { // decide if the current string should be spoilered, if spoiler var is false reset it to true.
                    i.innerHTML = '<span class="spoiler">' + i.innerHTML + '</span>';
                } else {
                    spoiler = true;
                }
            }
        }
    });
}
