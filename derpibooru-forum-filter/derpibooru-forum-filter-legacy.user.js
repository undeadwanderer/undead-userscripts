// ==UserScript==
// @name         Derpibooru Thread Filter legacy
// @author       Undead_Wanderer
// @description  An attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use.
// @version      1.1 / 2024-05-22
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      Creative Commons BY-NC-SA 4.0
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/.*$/
// @include      https://ronxgr5zb4dkwdpt.onion/*
// @inject-into  content
// @grant        none
// ==/UserScript==

"use strict";

const markerWords = ["NSFW", "NFSW", "Not safe for work"]; // filter words
const escapeWords = ['No NSFW'] // exclusion words

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

