// ==UserScript==
// @name        EQD Page Title Cleanup
// @description Moves the obstructive "Equestria Daily - MLP Stuff!:" from the beginning of the page title to its end.
// @author      undead_wanderer
// @namespace   https://derpibooru.org/profiles/Sullen
// @include     /https?:\/\/(www\.)?equestriadaily.com\/.*/
// @version     1.0.0
// @grant       none
// ==/UserScript==

var x = document.title;
if (x.includes("Equestria Daily - MLP Stuff!: ") === true) {
    document.title = x.replace("Equestria Daily - MLP Stuff!: ", "") + " – Equestria Daily";
}