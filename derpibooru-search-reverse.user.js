// ==UserScript==
// @name         Derpibooru Search Order Reverse Button
// @author       undead_wanderer
// @homepageURL  https://github.com/undeadwanderer/undead-userscripts
// @description  Adds a button to show the current image list in an opposite order.
// @version      1.0.0
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @include      /https?://(www\.)?((derpi|trixie)booru\.org|ronxgr5zb4dkwdpt\.onion)/((?!.)|search?.*q=(?!&|\&)|activity|images(?!(/new|/\d))|galleries\/\d)/
// @grant        none
// ==/UserScript==

if (document.querySelector("div#imagelist-container") !== null) {  // failsafe to prevent execution on unsupported pages
    var showHidden = 0;
    var url = document.baseURI;                            // get page url
    var x = document.getElementsByClassName("pagination"); // get pagination blocks
    if (x[0] !== undefined) {                              // failsafe to prevent errors on supported pages with only one page
        var y = x[0].querySelectorAll("a");            // get the list of page links from the pagination block
        var z = "";
        y.forEach(function(item, index){                  // check that the "Last" link actually exists
            if (item.innerHTML.includes("Last")){
                z = item.getAttribute("href");      // get the link to the last page
                return;
            }
        });
        if (z === "") {
            var z = url;      // get the link to the last page
        }
    }
    function1();
} else {
    console.log("Derpibooru search reverse button debug: unsupported page."); // debug message
}

function function1() { // main part of the script that makes a new url
    z = Number(z.match(/(?<=[?&])page=\d+/i)[0].replace('page=',''));     // trim search parameters from the last page link

    if (url.includes("hidden=1&")) {           // workaround to get ?hidden=1 out of the url until the end of the function
        showHidden = 1;
        url = url.replace("hidden=1&", "");
    } else if (url.includes("?hidden=1")) {
        showHidden = 2;
        url = url.replace("?hidden=1", "");
    } else if (url.includes("hidden=0&")) {
        showHidden = 0;
        url = url.replace("hidden=0&", "");
    } else if (url.includes("?hidden=0"))  {
        showHidden = 0;
        url = url.replace("?hidden=0", "");
    }

    if (url.includes("/search")) {                // when the current location is a search page
        if (x[0] !== undefined) {                         // failsafe to prevent execution on pages without pagination
            if (url.includes("page=")) {          // check if there's information about the current page. if there isn't, consider it to be the first page
                // let a = Number(url.substring(url.indexOf("page=") + 5, url.indexOf("&q="))); // get the current page number
                let a = Number(url.match(/page=\d+/i)[0].replace('page=',''));
                if (a !== 1) {                     // if this is not the first page of the search, replace its index
                    // let b = Number(z.substring(z.indexOf("page=") + 5, z.indexOf("&q=")));
                    //            a = b - a + 1;                 // get the last page number; get the page number for the reverse order
                    url = url.replace("page=" + a, "page=" + String(z - a + 1)); // set the current page number for the reverse order
                } else {
                    url = url.replace("?page=1", "?page=" + z + "&");
                }
            } else {
                    url = url.replace("?", "?page=" + z + "&");
            }
        } else {

        }

        if (url.includes("&sd=asc") || url.includes("?sd=asc")) {         // if sorting by ascending is detected, change it to descending
            url = url.replace("sd=asc", "sd=desc");
        } else if (url.includes("&sd=desc") || url.includes("?sd=desc")) { // if sorting by descending is detected, change it to ascending
            url = url.replace("sd=desc", "sd=asc");
        } else {                             // if no sorting is found, add sorting by date by ascending
            url = url += "&sf=first_seen_at&sd=asc";
        }
    } else if (url.includes("/galleries/")) {                                              // gallery page support
        let galleryId = Number(url.match(/galleries\/\d+/i)[0].replace("galleries/","")); // get the gallery id
        if (galleryId !== null) {                                                        // failsafe
            if (url.match(/\/page=\/\d+\/?/,'') === null) {                             // first page of the gallery check
                url = "https://" + window.location.hostname + "/search?page=" + z + "&sd=asc&sf=gallery_id:" + galleryId + "&q=gallery_id:" + galleryId; // make a search for everything ordered by ascending and with page number swapped for a corresponding one for the reverse irder
            } else {
                let a = Number(url.match(/page=\d+/i)[0].replace('page=',''));
                // z = z.replace(/\?(^!page).*$/ig, "");                            // trim search parameters from the last page link
                // a = Number(z.replace('page=','')) - a + 1;                      // get the last page numberl; get the page number for the reverse order
                a = z - a + 1;                      // get the last page numberl; get the page number for the reverse order
                url = "https://" + window.location.hostname + "/search?page=" + a + "&sd=asc&sf=gallery_id:" + galleryId + "&q=gallery_id:" + galleryId; // make a search for everything ordered by ascending and with page number swapped for a corresponding one for the reverse irder
            }
        }
    } else if (url.includes("images") || window.location.pathname === "/" || window.location.pathname === "/activity") { // when the current location is a page in the image list or the main page or the acrivity page
        if (url.includes("page=")) {
            var a = Number(url.match(/page=\d+/i)[0].replace('page=',''));
        } else {
            var a = 1;
        }
        if (a === 1) {                       // if this is the first page of the image list, just make a search for everything ordered by ascending date
            url = "https://" + window.location.hostname + "/search?page=" + z + "&sf=first_seen_at&sd=asc&q=*";
        } else {
            a = z - a + 1;                      // get the last page numberl; get the page number for the reverse order
            url = "https://" + window.location.hostname + "/search?page=" + a + "&sf=irst_seen_at&sd=asc&q=*"; // make a search for everything ordered by ascending and with page number swapped for a corresponding one for the reverse irder
        }
    } else {
        console.log("Derpibooru search reverse button debug: This was not supposed to happen.");
    }

    if (showHidden !== 0) {              // if "hidden=1" was found and removed, reinsert it into the url
        url = url.replace("?", "?hidden=1&");
    }

    // create the link
    document.querySelector("div.flex__right").innerHTML = '<a href="' + url +'" title="Reverse Sorting"><i class="fa-solid fa-arrows-rotate"></i> <span class="hide-mobile hide-limited-desktop">Reverse Sorting</span></a>' + document.querySelector("div.flex__right").innerHTML;

}
