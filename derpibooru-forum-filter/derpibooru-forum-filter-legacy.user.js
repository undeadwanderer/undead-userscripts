// ==UserScript==
// @name         Derpibooru Thread Filter legacy
// @author       Undead_Wanderer
// @description  An attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use.
// @version      1.3
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      Creative Commons BY-NC-SA 4.0
// @include      *
// @grant        none

// ==/UserScript==

if (document.head.querySelector('meta[content="philomena"]')) {
    "use strict";

    const markerWords = ["NSFW", "NFSW", "Not safe for work"]; // filter words
    const escapeWords = ['No NSFW'] // exclusion words
    let mainHide = false; // Collapse topics on the main forums page completely when true.
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
                    if (mainHide === true && window.location.pathname === "/forums") { // check if the current location is the main forums page and if the main page collapse option is enabled.
                        let iParent = i.closest("td");
                        iParent.innerHTML = "";
                    } else {
                        i.innerHTML = '<span class="spoiler">' + i.innerHTML + '</span>'; // If not, spoiler the thread name.
                    }
                } else {
                    spoiler = true;
                }
            }
        }
    });
}
