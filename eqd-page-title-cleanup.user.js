// ==UserScript==
// @name        EQD Page Title Cleanup
// @description Retitles Equestria Daily pages for better browsing and bookmarking
// @author      undead_wanderer
// @namespace   https://github.com/undeadwanderer/
// @match       https://www.equestriadaily.com/*
// @match       https://equestriadaily.com/*
// @version     1.0.1
// @license     Creative Commons BY-NC-SA 4.0
// @grant       none
// ==/UserScript==

var x = document.title;
if (x.includes("Equestria Daily - MLP Stuff!: ") === true) {
    document.title = x.replace("Equestria Daily - MLP Stuff!: ", "") + " – Equestria Daily";
}
