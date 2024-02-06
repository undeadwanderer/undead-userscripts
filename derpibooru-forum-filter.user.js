// ==UserScript==
// @name         Derpibooru Thread Filter
// @description  Attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use. May get false positives ("No NSFW"-type titles, etc.).
// @version      0.94a / 2024-02-06
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/.*$/
// @include      https://ronxgr5zb4dkwdpt.onion/*
// @grant        none
// ==/UserScript==

//declare variables
var marker = /nsfw/i; //filter word
var boardTitles = ["/art", "/writing", "/dis", "/generals", "/pony", "/rp", "/meta", "/tagging", "/uppers"]; //list of currently existing boards
var i = 0; //counter
var l = 0; //var for various length values
// get blocks with thread topics:
if (window.location.pathname === "/forums") {        //checks if the current page is the board list
//   console.log("Thread filter debug: Forums page detected!");     //debug message
    var x = document.getElementsByClassName("table--communication-list__last-post");
//  get all blocks with thread links
//    console.log("Thread filter debug: Thread titles: " + (x.length - 1));     //debug message
//    console.log("Thread filter debug: innerHTML of x[1] is " + x[1].innerHTML);     //debug message
    filter(1, 0); // 1st value is the number of the first block to be checked.
//  (may be unnecessary but early in testing the script didn't work if blocks w/o links were present).
//  2nd value is the number of what link in the block will be checked.
//  the 1st value here is '1' because the first matching block on the board list page doesn't contain links.
//  the 2nd value here is '0' because the thread title is in the first url in the block.

} else if (window.location.pathname === "/notifications") {        //checks if this is the notifications page
//    console.log("Thread filter debug: Notifications page detected!");     //debug message
    var x = document.getElementsByClassName("flex__grow");
    filter(0, 1);
//  the 1st value here is '0' because all matching blocks contain links.
//  the 2nd value here is '1' because the thread title is in the second url in the block.

} else if ((window.location.pathname === "/" || window.location.pathname === "/activity") && document.getElementById("activity-side") !== null) {        //checks if this is the main page and if the sidebar is available

//    console.log("Thread filter debug: Main page with active sidebar detected!");     //debug message
    var x = document.querySelectorAll("div[class='block__content alternating-color']:not(.flex)");
//  too few unique selectors, this operation selects all blocks with class 'block__content alternating-color'
//  while excluding 'flex' class that non-forum post blocks have and forum blocks have not.
//    console.log("Thread filter debug: Thread titles: " + x.length);     //debug message
//    console.log("Thread filter debug: 0th block is: " + x[0].innerHTML);     //debug message
    filter(0, 2);
//  the 1st value here is '0' because all matching blocks contain links.
//  the 2nd value here is '2' because the thread title is in the third url in the block.

} else {
    l = boardTitles.length;
    for (i = 0; i < l; i++) {        //checks if the current page is a board page
        if (window.location.pathname === boardTitles[i] || window.location.pathname == "/forums" + boardTitles[i]) {
//            console.log("Thread filter debug: Board page detected!");     //debug message
            var x = document.getElementsByClassName("table--communication-list__name");
//            console.log("Thread filter debug: Thread titles: " + x.length);     //debug message
//            console.log("Thread filter debug: x type is " + typeof x);     //debug message
            filter(1, 0);
//          the 1st value here is '1' because the first matching block on the board page doesn't contain links.
//          the 2nd value here is '0' because the thread title is in the first url in the block.
            break;
//        } else if (i === boardTitles.length - 1) {
//            console.log("Thread filter debug: Page not supported.");     //debug message
        }
    }
}

// search and spoiler thread titles:
function filter(j, k) {
//    console.log("Thread Filter debug: Function initialized.");     //debug message
    l = x.length;
    if (l > "0") { // failsafe
        for (i = j; i < l; i++) {	 // loop through thread links blocks.
//            console.log("Thread filter debug: ith block is: " + x[i].innerHTML);     //debug message
            if (x[i].innerHTML!=""){
                var links = x[i].getElementsByTagName("a");	 // get all links in the block
                if (/^(<div>)?("|<strong>)?Background Pony #\w/.test(x[i].innerHTML) === true) {
//                  console.log("Thread filter debug: BP check passed.");     //debug message
                    if (marker.test(links[k - 1].innerHTML) === true) { // get the 'k-1'-th link in the block
//                      console.log("Thread filter debug: Match found!");     //debug message
                        links[k - 1].innerHTML = '<span class="spoiler">' + links[k - 1].innerHTML + '</span>';
//                      console.log("Thread filter debug: Output:" + links[k-1].innerHTML);     //debug message
                    }
                } else {
                    if (marker.test(links[k].innerHTML) === true) { // get the k-th link in the block
//                      console.log("Thread filter debug: Match found!");     //debug message
                        links[k].innerHTML = '<span class="spoiler">' + links[k].innerHTML + '</span>';
//                      console.log("Thread filter debug: Output:" + links[k].innerHTML);     //debug message
                      }
                 }
            }

        }
    }
}
