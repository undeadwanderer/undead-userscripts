// ==UserScript==
// @name         Derpibooru Thread Filter Derpi4U legacy
// @author       Undead_Wanderer
// @description  An attempt to make the forums a little more worksafe by spoilering thread titles containing "NSFW". Made for personal use.
// @version      1.4.1
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      Creative Commons BY-NC-SA 4.0
// @include      *
// @require      https://raw.githubusercontent.com/MarkTaiwan/Derpibooru-Unified-Userscript-Ui/master/derpi-four-u.js
// @inject-into  content
// @grant        none

// ==/UserScript==

function mainFunction() {
    "use strict";

    // Derpi4U stuff goes here
    var config = ConfigManager(
        'Derpibooru Thread Filter',
        'thread_filter_legacy',
        'Spoiler NSFW thread titles and/or any other words you don\'t want to see in there.'
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
    config.registerSetting({
        title: 'Replace matched topics on the forums with: ',
        description: '(non-forum pages will use spoilers)',
        key: 'placeholder1',
        type: 'dropdown',
        defaultValue: 'p',
        selections: [
            {text: 'Title spoiler', value: 's'},
            {text: 'Placeholder', value: 'p'},
            {text: 'Hide completely',  value: 'h'}
        ]
    });
    config.registerSetting({
        title: 'Nuke thread updates on the main forums page:',
        description: '(regardless of the above setting)',
        key: 'hidemain0',
        type: 'checkbox',
        defaultValue: false
    });

    // Main code

    const markerWords = config.getEntry('marker0').replace(/(\s*,\s*)/g,',').split(/,/); // Derpi4U-reliant variable for filter words list.
    const escapeWords = config.getEntry('escape0').replace(/(\s*,\s*)/g,',').split(/,/); // Derpi4U-reliant variable for filter words list.    let mainHide = config.getEntry('hidemain0');
    let mainHide = config.getEntry('hidemain0');
    let hideMethod = config.getEntry('placeholder1');
    let spoiler = true;
    let x = document.querySelectorAll("a[href*='/forums/']"); // retreive all forum link titles.

    markerWords.forEach(function(item, index, arr) {
        for (let i of x) {
            if (i.innerHTML.toLowerCase().includes(arr[index].toLowerCase())) { // string test for marker words.
                escapeWords.forEach(function(item1, index1, arr1) {
                    if (i.innerHTML.toLowerCase().includes(arr1[index1].toLowerCase())) { // string test for escape words.
                        spoiler = false;
                    }
                });
                if (spoiler) { // decide if the current string should be spoilered, if spoiler var is false reset it to true.
                    if ((hideMethod === 'h' || hideMethod === 'p') && window.location.pathname === '/forums') { // check if the current location is the main forums page and if the main page collapse option is enabled.
                        let iParent = i.closest("td"); // parent table item for last post on forums main
                        if (mainHide === true || hideMethod === 'h') { // check if the main forum page is set to nuke
                            iParent.innerHTML = "";                   // drop the nuke
                        } else if (hideMethod === 'p'){               // else check if placeholder
                            const a = iParent.innerHTML;     // save the parent node for later use in placeholders
                            const c = '\<a class="show-hidden">(Show anyway?)</a>';     // buttons for revealing and closing placeholder-ed items
                            const e = '\<a class="unsee-hidden">(Oh shi go back)</a>';
                            let g = '\<strong>Thread filtered</strong><div>(<span class="spoiler">' + arr[index] + '\</span>)</div><div>' + c + '<\/div>';
                            // above var is placeholder text
                            iParent.innerHTML = g; // replace the original data with placeholder
                            iParent.querySelector('.show-hidden').addEventListener("click", function() {seeHidden0(iParent, a, e, g)}); // "show hidden" button
                        }
                    } else if ((hideMethod === 'h' || hideMethod === 'p') && window.location.pathname.match(/\/forums\/.+(?!\/topics)/i)) { // checks if location is threadlist
                        let iParent1 = i.closest("tr"); // parent table item for last post on threadlist
                        if (hideMethod === 'p') {      // check if placegholders are enabled
                            const b = iParent1.innerHTML; // save the parent node for later use in placeholders
                            const d = '\<a class="show-hidden">(Show anyway?)</a>';     // buttons for revealing and closing placeholder-ed items
                            const f = '\<a class="unsee-hidden">(Oh shi go back)</a>';
                            let h = '\<td class="table--communication-list__name"><div>Thread filtered (<span class="spoiler">' + arr[index] + '\</span>). </div><div class="small-text">' + d + '\</div</td><td class="table--communication-list__stats hide-mobile"></td><td class="table--communication-list__last-post"></td>';
                            // above var is placeholder text
                            iParent1.innerHTML = h; // enable placeholder
                            iParent1.querySelector('.show-hidden').addEventListener("click", function() {seeHidden1(iParent1, b, f, h)}); // add event listener for revealing hidden thread; "function() {seeHidden(iParent1, b, f, h)}" is so we can carry the variables into the function without the link autoclicking.

                        } else {
                            iParent1.innerHTML = ''; // just collapses the caught thread
                        }
                    } else if (hideMethod === 's' && mainHide === true && window.location.pathname === '/forums') { // set nuke when spoilers
                        let iParent2 = i.closest("td");            // prepare the nuke
                        iParent2.innerHTML = "";                   // drop the nuke
                    } else {                                       // all else
                        i.innerHTML = '\<span class="spoiler">' + i.innerHTML + '\</span>'; // in every other case spoiler the thread name.
                    }
                } else {
                    spoiler = true;
                }
            }
        }
    });

    function unseeHidden0 (iParent, a, e, g) { // command the 'oh shi go back' button to revert to placeholder
        iParent.innerHTML = g;
        iParent.querySelector('.show-hidden').addEventListener("click", function() {seeHidden0(iParent, a, e, g)});
    }

    function seeHidden0 (iParent, a, e, g) {    // conmmand the 'Show Anyway?' button to reveal the thread from variable 'b'
        let k = a.replace('\</time>', '\</time> ' + e);
        iParent.innerHTML = k;
        iParent.querySelector('.unsee-hidden').addEventListener("click", function() {unseeHidden0(iParent, a, e, g)});
    }

    function unseeHidden1 (iParent1, b, f, h) { // command the 'oh shi go back' button to revert to placeholder
            iParent1.innerHTML = h;
            iParent1.querySelector('.show-hidden').addEventListener("click", function() {seeHidden1(iParent1, b, f, h)});
    }

    function seeHidden1(iParent1, b, f, h) {    // conmmand the 'Show Anyway?' button to reveal the thread from variable 'b'
        let k = b.replace('\</strong> </div>', '\</strong> ' + f + ' \</div>');
        iParent1.innerHTML = k;
        iParent1.querySelector('.unsee-hidden').addEventListener("click", function() {unseeHidden1(iParent1, b, f, h)});
    }
}

if (document.head.querySelector('meta[content="philomena"]')) {
    mainFunction();
}