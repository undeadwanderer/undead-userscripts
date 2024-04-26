# Undead Usersctipts
Some userscripts I either made back in early 2018 [Basically baby's first userscripts] or forked recently. These weren't the only scripts I made at the time but these are confirmed to work presently and which I intend to continue supporting.

### License:
Everything except for **tabun-filters** is under **Creative Commons BY-NC-SA 4.0**, **tabun-filters** is under **WTFPL** as of how the original coder left it.

### Installation:
Open the script code and click "raw", your script manager should recognize it.

### Scripts in this repo:

- !NEW! **tabun-filters** — Post and comment filters for the MLP fansite tabun.everypony.ru. Fork of an abandoned userscript by CAHCET. See the script's folder for more information.

- **derpibooru-forum-filter** — Spoilers forum topics with "NSFW" (or any other words you don't wish to see) in the title on Derpibooru (still a wip project since I haven't implemented the support for all applicable page types yet). [Upd. 2024-02-18: Due to as of now using Mark Taiwan's gui library for the settings, __requires Violentmonkey__ if you're on Firefox. Said settings can be found in the "Userscripts" tab on the Settings page.]

- **derpibooru-upload-tag** — Automatically fills in tags of your choice on the image upload page on Derpibooru, as of now uses Mark Taiwan's library so the note on the script above applies.

  - Known issue for the two scripts above - due to now using a modified version of the library and said library using the CSS styles imposed by the version loaded first they need to be ordered to initialize first (idk if Tampermonkey supports load order customization but Violentmonkey does, you should use the latter anyway).

- **derpibooru-upload-tag-legacy** — Fills in a "safe" tag on the new image upload page on Derpibooru. An older version of the script above that doesn't rely on Mark Taiwan's library or needs Violentmonkey to use on Firefox at the exchange of customizability (you can still edit the values in the code itself though).

- **eqd-page-title-cleanup** — Retitles Equestria Daily's pages for convenience.
