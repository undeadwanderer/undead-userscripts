// ==UserScript==
// @name         Derpibooru Thread Filter Derpi4U legacy
// @author       Undead_Wanderer
// @description  An attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use. May get false positives ("No NSFW"-type titles, etc.).
// @version      1.1 / 2024-05-22
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      Creative Commons BY-NC-SA 4.0
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/.*$/
// @include      https://ronxgr5zb4dkwdpt.onion/*
// @require      https://raw.githubusercontent.com/marktaiwan/Derpibooru-Unified-Userscript-Ui/master/derpi-four-u.js
// @inject-into  content
// @grant        none
// ==/UserScript==

"use strict";

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
config.registerSetting({
    title: 'Escape words',
    key: 'escape0',
    description: 'The words or phrases you wish to exclude from the filter. Case-insensitive. Separate with commas.',
    type: 'text',
    defaultValue: 'no nsfw'
});

// Main code
const markerWords = config.getEntry('marker0').replace(/(\s*,\s*)/g,',').split(/,/); // Derpi4U-reliant variable for filter words list.
const escapeWords = config.getEntry('escape0').replace(/(\s*,\s*)/g,',').split(/,/); // Derpi4U-reliant variable for filter words list.

let x = document.querySelectorAll("a[href*='/forums/']");

markerWords.forEach(function(item, index, arr) {
    for (let i of x) {
        if (i.innerHTML.toLowerCase().includes(arr[index].toLowerCase()) === true) {
            escapeWords.forEach(function(item1, index1, arr1) {
                if (i.innerHTML.toLowerCase().includes(arr1[index1].toLowerCase()) === true) {
                     spoiler = false;
                }
            });
			if (spoiler === true) {
				i.innerHTML = '<span class="spoiler">' + i.innerHTML + '</span>';
			} else {
                spoiler = true;
            }
        }
    }
});

