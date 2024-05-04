// ==UserScript==
// @name        Derpi compact image names
// @author      undead_wanderer
// @namespace   https://derpibooru.org/profiles/Pink%2BAmena
// @include     /^https?://(www\.)?(derpi|trixie)booru\.org/.*$/
// @include     https://ronxgr5zb4dkwdpt.onion/*
// @grant       none
// @version     1.0.1
// @license     CC BY-NC-SA 4.0
// @description New image links with less tags.
// ==/UserScript==

if (window.location.pathname.match(/(\/images)?\/\d+/i) !== null) {
  const hostName = window.location.origin;
  const imageId = window.location.pathname.replace(/(\/images)?\//i, '');
  const imageFormat = document.querySelector('.image-size').innerHTML.match(/gif|jpg|jpeg|png|svg|webm/i)[0].toLowerCase();
  let tagRatings = '';
  let tagOrigin = '';
  let tagCharacters = '';
  const uploadDate = document.querySelector('time[datetime]').getAttribute('datetime').match(/\d\d\d\d-\d\d-\d\d/)[0].split(/-0?/);
  const tagList = document.querySelectorAll('span[class="tag dropdown"]');

  for (x of tagList) {
    const tagId = x.dataset.tagSlug;
    if (x.dataset.tagCategory === 'origin') {
      tagOrigin += '_' + tagId;
    } else if (x.dataset.tagCategory === 'rating') {
      tagRatings += '_' + tagId;
    } else if (x.dataset.tagCategory === 'character' || x.dataset.tagCategory === 'oc') {
      tagCharacters += '_' + tagId;
    }
  }

  let imageName = imageId + '_' + tagRatings + tagOrigin + tagCharacters;
  imageName = imageName.slice(0, 150) + '.' + imageFormat;
  let viewLink = document.querySelector('a[title="View (tags in filename)"]');
  let downloadLink = document.querySelector('a[title="Download (tags in filename)"]');
  viewLink.href = 'https://derpicdn.net/img/view/' + uploadDate[0] + '/' + uploadDate[1] + '/' + uploadDate[2] + '/' + imageName;
  downloadLink.href = 'https://derpicdn.net/img/download/' + uploadDate[0] + '/' + uploadDate[1] + '/' + uploadDate[2] + '/' + imageName;
}
