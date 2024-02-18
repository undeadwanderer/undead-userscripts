// ==UserScript==
// @name         Derpibooru Thread Filter test
// @description  Attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use. May get false positives ("No NSFW"-type titles, etc.).
// @version      0.95b / 2024-02-18
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @include      /^https?://(www\.)?(derpi|trixie)booru\.org/.*$/
// @include      https://ronxgr5zb4dkwdpt.onion/*
// @require      https://raw.githubusercontent.com/marktaiwan/Derpibooru-Unified-Userscript-Ui/master/derpi-four-u.js
// @inject-into  content
// @grant        none
// ==/UserScript==

//declare variables
const boardTitles = ["/art", "/writing", "/dis", "/generals", "/pony", "/rp", "/meta", "/tagging", "/uppers"]; //list of currently existing forum boards
var i = 0; //counter
var l = 0; //var for various length values

var config = ConfigManager(
    'Derpibooru Thread Filter',
    'script_id',
    'Spoiler NSFW thread titles and/or any other words you don’t want to see in there.'
);
config.registerSetting({
        title: 'Filter word 1',
        key: 'marker1',
        type: 'text',
        defaultValue: 'nsfw'
    })
config.registerSetting({
        title: 'Filter word 2',
        key: 'marker2',
        type: 'text',
        defaultValue: 'nfsw'
    })
config.registerSetting({
        title: 'Filter word 3',
        key: 'marker3',
        type: 'text',
        defaultValue: 'not safe for work'
    })
config.registerSetting({
        title: 'Filter word 4',
        key: 'marker4',
        type: 'text',
        defaultValue: ''
    })
config.registerSetting({
        title: 'Filter word 5',
        key: 'marker5',
        description: 'The words you wish to filter. Case-insensitive.',
        type: 'text',
        defaultValue: ''
    })
var markerWords = [config.getEntry('marker1'), config.getEntry('marker2'), config.getEntry('marker3'), config.getEntry('marker4'), config.getEntry('marker5')];

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
    var x = document.getElementsByClassName("flex__grow");
    filter(0, 1);
//  the 1st value here is '0' because all matching blocks contain links.
//  the 2nd value here is '1' because the thread title is in the second url in the block.
} else if ((window.location.pathname === "/" || window.location.pathname === "/activity") && document.getElementById("activity-side") !== null) {        //checks if this is the main page and if the sidebar is available
    var x = document.querySelectorAll("div[class='block__content alternating-color']:not(.flex)");
//  too few unique selectors, this operation selects all blocks with class 'block__content alternating-color'
//  while excluding 'flex' class that non-forum post blocks have and forum blocks have not.
    filter(0, 2);
//  the 1st value here is '0' because all matching blocks contain links.
//  the 2nd value here is '2' because the thread title is in the third url in the block.
} else {
    l = boardTitles.length;
    for (i = 0; i < l; i++) {        //checks if the current page is a board page
        if (window.location.pathname === boardTitles[i] || window.location.pathname == "/forums" + boardTitles[i]) {
            var x = document.getElementsByClassName("table--communication-list__name");
            filter(1, 0);
//          the 1st value here is '1' because the first matching block on the board page doesn't contain links.
//          the 2nd value here is '0' because the thread title is in the first url in the block.
            break;
//        } else if (i === boardTitles.length - 1) {
        }
    }
}

// search and spoiler thread titles:
function filter(j, k) {
  l = x.length;
  if (l > "0") { // failsafe
    for (n = 0; n < markerWords.length; n++) { // loop through filter word array.
      if (markerWords[n].length != 0) { // check that the current filter world is not empty
        for (i = j; i < l; i++) {	 // loop through thread links blocks.
          if (x[i].innerHTML != ""){
            var links = x[i].getElementsByTagName("a");	 // get all links in the block
            if (/^(<div>)?("|<strong>)?Background Pony #\w/.test(x[i].innerHTML) === true) {
              if (links[k - 1].innerHTML.toLowerCase().includes(markerWords[n].toLowerCase()) === true) { // get the 'k-1'-th link in the block
                    links[k - 1].innerHTML = '<span class="spoiler">' + links[k - 1].innerHTML + '</span>';
                }
              } else {
              if (links[k].innerHTML.toLowerCase().includes(markerWords[n].toLowerCase()) === true) { // get the k-th link in the block
                  links[k].innerHTML = '<span class="spoiler">' + links[k].innerHTML + '</span>';
                }
             }
          }
        }
      }
    }
  }
}

