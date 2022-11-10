// ==UserScript==
// @name         Derpibooru Thread Filter testing version
// @description  Attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use. May get false positives ("No NSFW"-type titles, etc.).
// @version      0.931
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/.*$/
// @include      https://ronxgr5zb4dkwdpt.onion/*
// @grant        none

//declare variables
var marker = /nsfw/i; //search string
var boardTitles = ["/art", "/writing", "/dis", "/generals", "/pony", "/rp", "/meta", "/tagging", "/uppers"]; //list of currently existing boards
var i = 0; //counter

// get blocks with thread topics:
if (window.location.pathname === "/forums") {        //checks if the current page is the board list
    var x = document.getElementsByClassName("table--communication-list__last-post");
//  get all blocks with thread links
    filter(1, 0); // 1st value is the number of the first block to be checked.
//  (may be unnecessary but early in testing the script didn't work if blocks w/o links were present).
//  2nd value is the number of what link in the block will be checked.
//  the 1st value here is '1' because the first matching block on the board list page doesn't contain links.
//  the 2nd value here is '0' because the thread title is in the first url in the block.

} else if (window.location.pathname === "/notifications") {        //checks if this is the notifications page
    var x = document.getElementsByClassName("flex__grow center--flex-v");
    filter(0, 1);
//  the 1st value here is '0' because all matching blocks contain links.
//  the 2nd value here is '1' because the thread title is in the second url in the block.
} else if (window.location.pathname === "/" && document.getElementById("activity-side") !== null) {        //checks if this is the main page and if the sidebar is available
    var x = document.querySelectorAll("div[class='block__content alternating-color']:not(.flex)");
//  too few unique selectors, this operation selects all blocks with class 'block__content alternating-color'
//  while excluding 'flex' class that non-forum post blocks have and forum blocks have not.
    filter(0, 2);
//  the 1st value here is '0' because all matching blocks contain links.
//  the 2nd value here is '2' because the thread title is in the third url in the block.
} else {
    for (i = 0; i < boardTitles.length; i++) {        //checks if the current page is the board page
        if (window.location.pathname === boardTitles[i] || window.location.pathname == "/forums" + boardTitles[i]) {
            var x = document.getElementsByClassName("table--communication-list__name");
            filter(1, 0);
//          the 1st value here is '1' because the first matching block on the board page doesn't contain links.
//          the 2nd value here is '0' because the thread title is in the first url in the block.
            break;
        }
    }
}

// search and spoiler thread titles:
function filter(j, k) {
    if (x.length > "0") { // failsafe
        for (i = j; i < x.length; i++) {	 // loop through thread links blocks.
            var links = x[i].getElementsByTagName("a");	 // get all links in the block
            if (/^(<div>)?("|<strong>)Background Pony #\w/.test(x[i].innerHTML) === true) {
                if (marker.test(links[k - 1].innerHTML) === true) { // get the 'k-1'-th link in the block
                    links[k - 1].innerHTML = '<span class="spoiler">' + links[k - 1].innerHTML + '</span>';
                }
            } else {
                if (marker.test(links[k].innerHTML) === true) { // get the k-th link in the block
                    links[k].innerHTML = '<span class="spoiler">' + links[k].innerHTML + '</span>';
                }
            }
        }
    }
}

// ==/UserScript==
