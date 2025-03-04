// ==UserScript==
// @name         Derpibooru Thread Filter Derpi4U legacy
// @author       Undead_Wanderer
// @description  An attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use.
// @version      1.3
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      Creative Commons BY-NC-SA 4.0
// @include      *
// @require      https://raw.githubusercontent.com/undeadwanderer/Derpibooru-Unified-Userscript-Ui/master/derpi-four-u.js
// @inject-into  content
// @grant        none

// ==/UserScript==

if (document.head.querySelector('meta[content="philomena"]')) {
    "use strict";

    // Derpi4U stuff goes here
    var config = ConfigManager(
        'Derpibooru Thread Filter',
        'thread_filter_legacy',
        'Spoiler NSFW thread titles and/or any other words you don\'t want to see in there.'
    );
    config.registerSetting({
        title: 'Filter words',
        key: 'marker0',
        description: 'The words or phrases you wish to filter. Case-insensitive. Separate with commas.',
        type: 'text',
        defaultValue: 'nsfw, nfsw, not safe for work'
    });
    config.registerSetting({
        title: 'Escape words',
        key: 'escape0',
        description: 'The words or phrases you wish to exclude from the filter. Case-insensitive. Separate with commas.',
        type: 'text',
        defaultValue: 'no nsfw'
    });
    config.registerSetting({
        title: 'Hide topics on the main forums page completely: ',
        key: 'hidemain0',
        type: 'checkbox',
        defaultValue: false
    });

    // Main code
    const markerWords = config.getEntry('marker0').replace(/(\s*,\s*)/g,',').split(/,/); // Derpi4U-reliant variable for filter words list.
    const escapeWords = config.getEntry('escape0').replace(/(\s*,\s*)/g,',').split(/,/); // Derpi4U-reliant variable for filter words list.
    let mainHide = config.getEntry('hidemain0'); // Collapses topics on the main forums page completely when true.
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
