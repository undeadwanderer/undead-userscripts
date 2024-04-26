// ==UserScript==
// @name         Derpibooru Thread Filter Derpi4U legacy
// @author       Undead_Wanderer
// @description  An attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use. May get false positives ("No NSFW"-type titles, etc.).
// @version      1.00% / 2024-04-26
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      Creative Commons BY-NC-SA 4.0
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/.*$/
// @include      https://ronxgr5zb4dkwdpt.onion/*
// @require      https://raw.githubusercontent.com/marktaiwan/Derpibooru-Unified-Userscript-Ui/master/derpi-four-u.js
// @inject-into  content
// @grant        none
// ==/UserScript==

// Derpi4U stuff goes here
var config = ConfigManager(
    'Derpibooru Thread Filter',
    'thread_filter_legacy',
    'Spoiler NSFW thread titles and/or any other words you don’t want to see in there.'
);
config.registerSetting({
    title: 'Filter words',
    key: 'marker0',
    description: 'The words or phrases you wish to filter. Case-insensitive. Separate with commas.',
    type: 'text',
    defaultValue: 'nsfw, nfsw, not safe for work'
});

// Main code
var markerWords = config.getEntry('marker0').replace(/(\s*,\s*)/g,',').split(/,/); // Derpi4U-reliant variable for filter words list.

let x = document.querySelectorAll("a[href*='/forums/']");
markerWords.forEach(function(item, index, arr){
    for (let i of x) {
        if (i.innerHTML.toLowerCase().includes(arr[index].toLowerCase()) === true) {
            i.innerHTML = '<span class="spoiler">' + i.innerHTML + '</span>';
        }
    }
});
