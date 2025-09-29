# Undead Userscripts
Some attempts at JS code for various MLP fansites (mainly Derpibooru but also EQD and Tabun) I either made back in early 2018 (Basically baby's first scripts) or resumed making recently.

### License:
Everything except for `tabun-filters` is under **Creative Commons BY-NC-SA 4.0**, `tabun-filters` is under **WTFPL** in respect to how the original coder left it.

### Installation/updating:
Open the script code and click "raw", your script manager should recognize it. I have yet to add autoupdate links into the code so you'll have to update the scripts manually for now. [upd.: Looks like Violentmonkey might fill in an update url when installing a script from the webpage so you might want to turn autoupdate of such a script off in case you need to edit the variables.]

### Scripts in this repo:

- `tabun-filters` — Post and comment filters for the Russian MLP "blog platform" tabun.everypony.ru. Fork of an abandoned userscript by CAHCET. See the script's folder for more information.

- `eqd-page-title-cleanup` — A simple Equestria Daily pages retitle for more convenient browsing and bookmarking.

- `derpibooru-search-reverse` — An experimental script for Derpibooru that adds a button that reverses the sort order of the current image list while saving the current page's relative position in the list. Works with the main image list, tags, activity page, search results and galleries. Basically dusted off one of my beginner studies and made a bunch of fixes and improvements to get it working with the current version of the site.

- `derpibooru-forum-filter` — Spoilers forum topics with "NSFW" (by default, you can customize with other words you don't wish to see) in the title on Derpibooru and/or other Philomena-powered image boorus. Refer to the script's folder for more information. [Upd. 2024-02-18: Due to as of now using Mark Taiwan's gui library for the settings, `might probably need Violentmonkey to run properly if you're on Firefox`. Said settings can be found in the "Userscripts" tab on the Settings page.]

  - `〃-derpi4u-legacy` — A version of the script above that uses the original D4U library instead of my fork.
  - `〃-legacy` — A version of the scripts above that doesn't require any libraries, the filter words array is editable in the code.

- `derpibooru-upload-tag` — Automatically fills in tags and description of your choice on the image upload page on Derpibooru, as of now uses Mark Taiwan's library so the note on the script above applies.

  - `〃-legacy` — Fills in a "safe" tag on the new image upload page on Derpibooru. An older version of the script above that doesn't rely on Derpi4U or needs Violentmonkey to use on Firefox at the exchange of customizability (you can still edit the values in the code itself though).

- `derpibooru-compact-image-names` — Edits image "View" and "Download" links on Derpibooru to use only certain tag types from the image (ratings, artist/origin and characters by default).
  
  - `〃_derpi4u` — Uses Derpi4U (my fork) for configuration.
  - `〃_legacy` — Legacy version where enabled tag types are to be edited in the code.

### Known issues:
- ~~A known issue for the non-legacy versions of the three scripts above - due to now using a modified version of the library and said library using the CSS styles imposed by the version loaded first at least one of the scripts needs to be ordered to initialize first (I'm not sure whether Tampermonkey supports load order customization or not but Violentmonkey does, you should use the latter anyway).~~ Patched the library fork to solve the conflict, have yet to fix the global import and export buttons to appear when a script using the unmodified library is loaded first).

### Configuration:
- Versions of Derpibooru scripts stated to use Mark Taiwan's Derpibooru Unified Userscript UI Utility (Derpi4U) are configured by navigating to Derpibooru's user settings (/settings/edit) then to the "Userscript" tab, and saved by pressing the "save my settings" button. Refer to the [library's documentation](https://github.com/undeadwanderer/Derpibooru-Unified-Userscript-Ui/blob/master/README.md) for more information.
- Non-Derpi4U legacy versions are configured by editing the variables in the code, don't forget to back up your changes before updating the scripts.

Example config tab:
![Example screenshot of the userscripts settings tab](https://github.com/undeadwanderer/undead-userscripts/assets/51511863/5d2b0d27-4772-4eb5-a778-11398236384a)


### Credits/Thanks:

- [Mark Taiwan a.k.a Marker](https://github.com/marktaiwan) for the `Derpibooru Unified Userscript UI Utility` library.
- [Rene_Z](https://github.com/ReneZeidler) and [stsyn](https://github.com/stsyn) for the `Tag Suggestions` userscript (I referenced the code while making the current version of `derpibooru-upload-tag`).
- [CAHCET](https://tabun.everypony.ru/profile/CAHCET) for the original version of `Tabun Filters`.
- Stack Overflow for all the general advice.
