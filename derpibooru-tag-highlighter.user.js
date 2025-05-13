// ==UserScript==
// @name         Derpibooru tag highlighter beta
// @author       undead_wanderer
// @description  Adds a spoilered-images-like tag field over posts with tags of your choice.
// @version      0.0.1
// @namespace    https://derpibooru.org/profiles/Pink%2BAmena
// @license      CC BY-NC-SA 4.0
// @match        https://derpibooru.org/*
// @match        https://trixiebooru.org/*
// @match        https://ronxgr5zb4dkwdpt.onion/*
// @require      https://raw.githubusercontent.com/undeadwanderer/Derpibooru-Unified-Userscript-Ui/master/derpi-four-u.js?v1.2.5
// @inject-into  content
// @grant        none
// ==/UserScript==


/* Derpi4U config setup */

const SCRIPT_ID = 'tags_highlight';
let config = ConfigManager (
    'Tag highlighter',
    SCRIPT_ID,
    'When filtering or watching just isn\'t enough.'
);
config.registerSetting ({
    title: 'Green tags',
    key: 'tagsGreen',
    description: 'Tags to be highlighted green. Make sure you fill in the actual tag name and not an alias. Separate with commas.',
    type: 'text',
    defaultValue: ''
});
config.registerSetting ({
    title: 'Yellow tags',
    key: 'tagsYellow',
    description: 'Tags to be highlighted yellow.',
    type: 'text',
    defaultValue: ''
});
config.registerSetting ({
    title: 'Red tags',
    key: 'tagsRed',
    description: 'Tags to be highlighted red.',
    type: 'text',
    defaultValue: ''
});



/* Declare variables */

const greenTags = config.getEntry('tagsGreen').replace(/(\s*,\s*)/g,',').split(',');
const yellowTags = config.getEntry('tagsYellow').replace(/(\s*,\s*)/g,',').split(',');
const redTags = config.getEntry('tagsRed').replace(/(\s*,\s*)/g,',').split(',');
let x = '';
let y = '';
let z = '';

/* Set styles */

/* const CSS = `
 	js-spoiler-info-overlay-green{
 		background:rgb(0, 0, 255)!important;
     }
 	js-spoiler-info-overlay-yellow{
 		background:rgb(0, 255, 255)!important;
     }
 	js-spoiler-info-overlay-red{
 		background:rgb(255, 0, 0)!important;
     }

 `*/
const CSS = `
    .media-box__overlay__green {
        display:block;
        position:absolute;
        z-index:4;
        width:100%;
        text-align:left;
        font-weight:700;
        word-wrap:break-word;
        color:rgb(0,0,0);
        background:rgb(31, 160, 31);
        pointer-events:none
    }
    .media-box__overlay__yellow {
        display:block;
        position:absolute;
        z-index:4;
        width:100%;
        text-align:left;
        font-weight:700;
        word-wrap:break-word;
        color:rgb(0,0,0);
        background:rgb(223, 208, 0);
        pointer-events:none
    }
    .media-box__overlay__red {
        display:block;
        position:absolute;
        z-index:4;
        width:100%;
        text-align:left;
        font-weight:700;
        word-wrap:break-word;
        color:rgb(0,0,0);
        background:rgb(172, 0, 0);
        pointer-events:none
    }
`

function initCSS() {
    if (!document.getElementById(`${SCRIPT_ID}-style`)) {
      const styleElement = document.createElement('style');
      styleElement.setAttribute('type', 'text/css');
      styleElement.id = `${SCRIPT_ID}-style`;
      styleElement.innerHTML = CSS;
      document.body.insertAdjacentElement('afterend', styleElement);
    }
}

/* Main */

let imageList = document.querySelectorAll('.media-box');

imageList.forEach (function(item, index, arr) {
    let itemSpoiler = arr[index].querySelector('.media-box__overlay.js-spoiler-info-overlay');
    // const hiddenClass = '.hidden';
    // if (itemSpoiler.innerHTML === '') {
    //     itemSpoiler.class += hiddenClass;
    // }
	let imageContainer = arr[index].querySelector('div.image-container');
	let imageAltText = arr[index].querySelector('img').alt.toLowerCase();
	// let imageAltText = arr[index].querySelector('img').alt.toLowerCase();
	let imageAltTextTagsPosition = imageAltText.toLowerCase().indexOf('tagged: ') + 8;
	let imageAltTextSliced = imageAltText.slice(imageAltTextTagsPosition).toLowerCase().replace(/(\s*,\s*)/g,',').split(',');
    // console.log('current image tags: ' + imageAltTextSliced)
	if (greenTags) {
		greenTags.forEach (function(item1, index1, arr1) {
            // console.log('green array length = ' + arr1.length);
            imageAltTextSliced.forEach(function (item4, index4, arr4) {
                // if (item4.includes(arr1[index1].toLowerCase())) {
                if (arr4[index4] === arr1[index1].toLowerCase()) {
                    // console.log('green tag is ' + arr1[index1])
                    x += arr1[index1].toLowerCase() + ', ';
                    // if (index1 + 1 < arr1.length) {
                    // 	x += ', ';
                    // }
                }
            })
		})
		if (x !== '') {
			let xDiv = document.createElement('div');
            let xDivClass = document.createAttribute("class");
            xDivClass.value = 'media-box__overlay js-spoiler-info-overlay media-box__overlay__green';
			// const xDivClass = 'media-box__overlay js-spoiler-info-overlay js-spoiler-info-overlay-green';
			xDiv.setAttributeNode(xDivClass);

			// const xText = document.createTextNode(x);
            // let xEndFinal = x.lastIndexOf(', ');
			xDiv.innerHTML = x.slice(0,x.lastIndexOf(', '));
			itemSpoiler.insertAdjacentElement("afterend", xDiv);
			// itemSpoiler.insertAdjacentElement("beforebegin", xDiv);

		}
        x = '';
	}
	if (yellowTags) {
		yellowTags.forEach (function(item2, index2, arr2) {
            // console.log('yellow array length = ' + arr2.length);
			imageAltTextSliced.forEach(function (item5, index5, arr5) {
                // if (item4.includes(arr1[index1].toLowerCase())) {
                if (arr5[index5] === arr2[index2].toLowerCase()) {
                    // console.log('green tag is ' + arr2[index2])
                    y += arr2[index2].toLowerCase() + ', ';
                    // if (index1 + 1 < arr1.length) {
                    // 	x += ', ';
                    // }
                }
            })
		})
		if (y !== '') {
			let yDiv = document.createElement('div');
            let yDivClass = document.createAttribute("class");
            yDivClass.value = 'media-box__overlay js-spoiler-info-overlay media-box__overlay__yellow';
			// const yDivClass = 'media-box__overlay js-spoiler-info-overlay js-spoiler-info-overlay-yellow';
			yDiv.setAttributeNode(yDivClass);

			// const xText = document.createTextNode(x);
			yDiv.innerHTML = y.slice(0,y.lastIndexOf(', '));
			itemSpoiler.insertAdjacentElement("afterend", yDiv);
			// itemSpoiler.insertAdjacentElement("beforebegin", yDiv);
		}
        y = '';
	}
	if (redTags) {
		redTags.forEach (function(item3, index3, arr3) {
            // console.log('red array length = ' + arr3.length);
            imageAltTextSliced.forEach(function (item6, index6, arr6) {
                // if (item4.includes(arr1[index1].toLowerCase())) {
                if (arr6[index6] === arr3[index3].toLowerCase()) {
                    // console.log('green tag is ' + arr3[index3])
                    z += arr3[index3].toLowerCase() + ', ';
                    // if (index1 + 1 < arr1.length) {
                    // 	x += ', ';
                    // }
                }
            })
		})

		if (z !== '') {
			let zDiv = document.createElement('div');
            let zDivClass = document.createAttribute("class");
            zDivClass.value = 'media-box__overlay js-spoiler-info-overlay media-box__overlay__red';
			// const zDivClass = 'media-box__overlay js-spoiler-info-overlay js-spoiler-info-overlay-red';
			zDiv.setAttributeNode(zDivClass);

			// const xText = document.createTextNode(x);
			zDiv.innerHTML = z.slice(0,z.lastIndexOf(', '));
			itemSpoiler.insertAdjacentElement("afterend", zDiv);
			// itemSpoiler.insertAdjacentElement("beforebegin", zDiv);
		}
        z = '';
	}
    // const spoilerType = document.querySelector('optgroup[label="Spoilers"]').querySelector('option[selected=""]').value;
    // if (spoilerType !== "off" || spoilerType !== "" || spoilerType !== "static"|| spoilerType !== null) {
    //     spoilerType.replace('hover', 'mouseover');
    //     // imageContainer.removeEventListener(spoilerType, )
    //     imageContainer.addEventListener(spoilerType, s => {
    //         newEventListener(imageContainer) && s.preventDefault()
    //     }, true);
    // }
});


initCSS();


// function newEventListener(e) {
//     console.log("We are alive?");
//     const t = e.dataset.size,
//     n = e.dataset.uris;
//     if (!t || !n) return !1;
//     const s = JSON.parse(n),
//     i = s[t].replace(/webm$/, 'gif'),
//     o = e.querySelector('picture');
//     if (!o) return Es(e, t, s);
//     const r = o.querySelector('img');
//     if (!r || r.src.indexOf(i) !== - 1) {return !1};
//     if (localStorage.getItem('serve_hidpi') && !i.endsWith('.gif')) {
//     const c = t === 'medium' ? s.large : s.medium;
//     r.srcset = ''.concat(i, ' 1x, ').concat(c, ' 2x')
//     }
//     r.src = i;
//     const a = e.querySelectorAll('.js-spoiler-info-overlay');
//     a.forEach(function(item5, index5, arr5){
//         return item5 ? (
//             // s[t].indexOf('.webm') !== - 1 ? (item5.classList.remove('hidden'), item5.innerHTML = 'WebM') : item5.classList.add('hidden'),
//             s[t].indexOf('.webm') !== - 1 ? (arr5[index5].classList.remove('hidden'), arr5[index5].innerHTML = 'WebM') : arr5[index5].classList.add('hidden'),
//             !0
//         ) : !1
//     });
// }










/* ================ Resources ============================*/



/* Derpi WebM highlight module (Same selector as spoilered tags.) */

// <div class="media-box__overlay js-spoiler-info-overlay">WebM</div>

// <div class="media-box__overlay js-spoiler-info-overlay"></div>


/* Derpi "safe" tag inner HTML */

// <span class="tag dropdown" data-tag-category="rating" data-tag-id="40482" data-tag-name="safe" data-tag-slug="safe">  <span><span class="tag__state" title="Unwatched">+</span><span class="tag__state hidden" title="Watched">-</span><span class="tag__state hidden" title="Spoilered">S</span><span class="tag__state hidden" title="Hidden">H</span> <a class="tag__name" href="/tags/safe" title="Safe for work and children.">safe</a></span><div class="dropdown__content"><a class="tag__dropdown__link hidden" data-method="delete" data-remote="true" data-tag-action="unwatch" href="/tags/safe/watch">Unwatch</a><a class="tag__dropdown__link" data-method="post" data-remote="true" data-tag-action="watch" href="/tags/safe/watch">Watch</a><a class="tag__dropdown__link hidden" data-method="delete" data-remote="true" data-tag-action="unspoiler" href="/filters/spoiler?tag=safe">Unspoiler</a><a class="tag__dropdown__link" data-method="post" data-remote="true" data-tag-action="spoiler" href="/filters/spoiler?tag=safe">Spoiler</a><a class="tag__dropdown__link hidden" data-method="delete" data-remote="true" data-tag-action="unhide" href="/filters/hide?tag=safe">Unhide</a><a class="tag__dropdown__link" data-method="post" data-remote="true" data-tag-action="hide" href="/filters/hide?tag=safe">Hide</a><a class="tag__dropdown__link hidden" href="/sessions/new">Sign in to Watch</a><a class="tag__dropdown__link hidden" href="/filters">Filter</a></div><span class="tag__count">2301575</span></span>

/* Show spoilered item function (locks in on a single .js-spoiler-info-overlay item, need to make a version for multiple tag fields) */

// function Le(e) {
//   const t = e.dataset.size,
//   n = e.dataset.uris;
//   if (!t || !n) return !1;
//   const s = JSON.parse(n),
//   i = s[t].replace(/webm$/, 'gif'),
//   o = e.querySelector('picture');
//   if (!o) return Es(e, t, s);
//   const r = o.querySelector('img');
//   if (!r || r.src.indexOf(i) !== - 1) return !1;
//   if (E.get('serve_hidpi') && !i.endsWith('.gif')) {
//     const c = t === 'medium' ? s.large : s.medium;
//     r.srcset = ''.concat(i, ' 1x, ').concat(c, ' 2x')
//   }
//   r.src = i;
//   const a = e.querySelector('.js-spoiler-info-overlay');
//   return a ? (
//     s[t].indexOf('.webm') !== - 1 ? (a.classList.remove('hidden'), a.innerHTML = 'WebM') : a.classList.add('hidden'),
//     !0
//   ) : !1
// }
