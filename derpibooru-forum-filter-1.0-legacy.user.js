// ==UserScript==
// @name         Derpibooru Thread Filter legacy
// @author       Undead_Wanderer
// @description  An attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use. May get false positives ("No NSFW"-type titles, etc.).
// @version      1.00* / 2024-04-26
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      Creative Commons BY-NC-SA 4.0
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/.*$/
// @include      https://ronxgr5zb4dkwdpt.onion/*
// @inject-into  content
// @grant        none
// ==/UserScript==

const markerWords = ["NSFW", "NFSW", "Not safe for work"]; //filter words

let  x = document.querySelectorAll("a[href*='/forums/']");

markerWords.forEach(function(item, index, arr){
    for (let i of x) {
        if (i.innerHTML.toLowerCase().includes(arr[index].toLowerCase()) === true) {
            i.innerHTML = '<span class="spoiler">' + i.innerHTML + '</span>';
        }
    }
});

