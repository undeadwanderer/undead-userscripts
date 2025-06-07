// ==UserScript==
// @name         Derpibooru Thread Filter legacy
// @author       Undead_Wanderer
// @description  An attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use.
// @version      1.4.2.2
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      Creative Commons BY-NC-SA 4.0
// @include      *
// @grant        none

// ==/UserScript==

function mainFunction () {
    "use strict";

    const markerWords = ["NSFW", "NFSW", "Not safe for work"]; // filter words
    const escapeWords = ['No NSFW'] // exclusion words
    let mainHide = false; // Collapse topics on the main forums page completely when true.
    let hideMethod = 1; // 0 - spoilered titles only, 1 - stubs (clickable!), 3 - hide completely.
    let spoiler = true;
    let linkCount = document.querySelectorAll("a[href*='/forums/']"); // retreive all forum link titles.

    markerWords.forEach(function(item, index, arr) {
        for (let i of linkCount) {
            if (i.innerHTML.toLowerCase().includes(arr[index].toLowerCase())) { // string test for marker words.
                escapeWords.forEach(function(item1, index1, arr1) {
                    if (i.innerHTML.toLowerCase().includes(arr1[index1].toLowerCase())) { // string test for escape words.
                        spoiler = false;
                    }
                });
                if (spoiler) { // decide if the current string should be spoilered, if spoiler var is false reset it to true.
                    if ((hideMethod === 2 || hideMethod === 1) && (window.location.pathname === '/forums')) { // check if the current location is the main forums page and if the main page collapse option is enabled.
                        let iParent = i.closest("td"); // parent table item for last post on forums main
                        if (mainHide === true || hideMethod === 2) { // check if the main forum page is set to nuke
                            iParent.innerHTML = "";                   // drop the nuke
                        } else if (hideMethod === 1){               // else check if stub
                            const a = iParent.innerHTML;     // save the parent node for later use in stubs
                            const c = '\<a class="show-hidden">(Show anyway?)</a>';     // buttons for revealing and closing placeholder-ed items
                            const e = '• <a class="unsee-hidden">(Hide)</a>';
                            let g = '\<strong>Thread filtered</strong><div>(<span class="spoiler">' + arr[index] + '\</span>)</div><div>' + c + '<\/div>';
                            // above var is stub text
                            iParent.innerHTML = g; // replace the original data with the stub
                            iParent.querySelector('.show-hidden').addEventListener("click", function() {seeHidden0(iParent, a, e, g)}); // "show hidden" button
                        }
                    } else if ((hideMethod === 2 || hideMethod === 1) && window.location.pathname.match(/\/forums\/.+(?!\/topics)/i)) { // checks if location is threadlist
                        let iParent1 = i.closest("tr"); // parent table item for last post on threadlist
                        if (hideMethod === 1) {      // check if placegholders are enabled
                            const b = iParent1.innerHTML; // save the parent node for later use in stubs
                            const d = '\<a class="show-hidden">(Show anyway?)</a>';     // buttons for revealing and closing stub-ed items
                            const f = '• <a class="unsee-hidden">(Hide)</a>';
                            let h = '\<td class="table--communication-list__name"><div>Thread filtered (<span class="spoiler">' + arr[index] + '\</span>). </div><div class="small-text">' + d + '\</div</td><td class="table--communication-list__stats hide-mobile"></td><td class="table--communication-list__last-post"></td>';
                            // above var is stub text
                            iParent1.innerHTML = h; // enable stub
                            iParent1.querySelector('.show-hidden').addEventListener("click", function() {seeHidden1(iParent1, b, f, h)});
                            // add event listener for revealing hidden thread; "function() {seeHidden(iParent1, b, f, h)}" is so we can carry the variables into the function without the link autoclicking.

                        } else {
                            iParent1.innerHTML = ''; // just collapses the caught thread
                        }
                    } else if ((hideMethod === 2 || hideMethod === 1) && ((window.location.pathname === "/" || window.location.pathname === "/activity") && document.getElementById("activity-side"))) {
                        let iParent2 = i.closest('div.block__content.alternating-color');
                        if (mainHide === true || hideMethod === 2) { // check if the main forum page is set to nuke
                            iParent2.classList.add("hidden");                   // drop the nuke
                        } else if (hideMethod === 1) {      // check if placegholders are enabled
                            const j = iParent2.innerHTML; // save the parent node for later use in stubs
                            const l = '\<a class="show-hidden">(Show anyway?)</a>';     // buttons for revealing and closing stub-ed items
                            const n = '• <a class="unsee-hidden small-text">(Hide)</a>';
                            let p = 'Thread filtered (<span class="spoiler">' + arr[index] + '\</span>). <span class="small-text">' + l + '\</span>';
                            // above var is stub text
                            iParent2.innerHTML = p; // enable stub
                            iParent2.querySelector('.show-hidden').addEventListener("click", function() {seeHidden2(iParent2, j, n, p)});
                            // add event listener for revealing hidden thread; "function() {seeHidden(iParent1, b, f, h)}" is so we can carry the variables into the function without the link autoclicking.
                        } else {
                            iParent2.innerHTML = ''; // just collapses the caught thread
                        }

                    } else if (hideMethod === 1 && mainHide === true && window.location.pathname === '/forums') { // set nuke when spoilers
                        let iParent3 = i.closest("td");            // prepare the nuke
                        iParent3.innerHTML = "";                   // drop the nuke
                    } else if (hideMethod === 1 && mainHide === true && ((window.location.pathname === "/" || window.location.pathname === "/activity") && document.getElementById("activity-side"))) { // set nuke when spoilers
                        let iParent3 = i.closest('div.block__content.alternating-color');            // prepare the nuke
                        iParent3.classList.add("hidden");                   // drop the nuke
                    } else {                                       // all else
                        i.innerHTML = '\<span class="spoiler">' + i.innerHTML + '\</span>'; // in every other case spoiler the thread name.
                    }
                } else {
                    spoiler = true;
                }
            }
        }
    });

    function unseeHidden0 (iParent, a, e, g) { // command the 'Hide' button to revert to stub
        iParent.innerHTML = g;
        iParent.querySelector('.show-hidden').addEventListener("click", function() {seeHidden0(iParent, a, e, g)});
    }

    function seeHidden0 (iParent, a, e, g) {    // conmmand the 'Show Anyway?' button to reveal the thread from variable 'b'
        const x = a.replace('\</time>', '\</time> ' + e);
        iParent.innerHTML = x;
        iParent.querySelector('.unsee-hidden').addEventListener("click", function() {unseeHidden0(iParent, a, e, g)});
    }

    function unseeHidden1 (iParent1, b, f, h) { // command the 'Hide' button to revert to stub
            iParent1.innerHTML = h;
            iParent1.querySelector('.show-hidden').addEventListener("click", function() {seeHidden1(iParent1, b, f, h)});
    }

    function seeHidden1(iParent1, b, f, h) {    // conmmand the 'Show Anyway?' button to reveal the thread from variable 'b'
        const x = b.replace('\</strong> </div>', '\</strong> ' + f + ' \</div>');
        iParent1.innerHTML = x;
        iParent1.querySelector('.unsee-hidden').addEventListener("click", function() {unseeHidden1(iParent1, b, f, h)});
    }

    function unseeHidden2 (iParent2, j, n, p) { // command the 'Hide' button to revert to stub
        iParent2.innerHTML = p;
        iParent2.querySelector('.show-hidden').addEventListener("click", function() {seeHidden2(iParent2, j, n, p)});
    }

    function seeHidden2 (iParent2, j, n, p) {    // conmmand the 'Show Anyway?' button to reveal the thread from variable 'b'
        const x = j + ' ' + n;
        iParent2.innerHTML = x;
        iParent2.querySelector('.unsee-hidden').addEventListener("click", function() {unseeHidden2(iParent2, j, n, p)});
    }
}
if (document.querySelector('div#serving_info')) {
    if (document.querySelector('div#serving_info').innerHTML.toLowerCase().match('philomena')) {
        mainFunction();
    }
}