# Forum filters for Philomena-based imageboorus

### Description:
This userscript spoilers forum topics which contain certain filter words or phrases (the default ones being "NSFW" and its variations to make the board more worksafe).

### Variants:

- **derpibooru-forum-filter.user.js** — Main version, uses a modified version of Mark Taiwan's "Derpi4U" library to edit and store settings, the filter words are separated with new line.
- **derpibooru-forum-filter-derpi4u-legacy.user.js** — A legacy version which uses the original Derpi4U script, the filter words are separated with commas.
- **derpibooru-forum-filter-legacy.user.js** — A legacy version which doesn't use any libraries and is set up by editing the `markerWords` variable in the code itself, the filter words are separated with commas.

### Requirements:
- Violentmonkey if you're on Firefox and use any Derpi4U variant of the script.
- The script might not work on outdated browser versions since I've got no way to check.

### Installation:

- Open the file of the version of the script you'd prefer to use and click "raw", your userscript manager should recognize it.

### Known issues:

- `The main version of the script uses my fork of Derpi4U that adds export and import buttons, as of yet in order to have the global export/import buttons show up a script using the modified library should be set before other Derpi5U scripts in the manager; my current attepts at a workaround didn't go well but I'll get back to it someday.`

### Change Log:
```
1.4.4.1 / 2025-03-06: • Some text tweaks
1.4.1   / 2025-03-05: • Small tweak: Put the main code into a function that gets called by "is this Philomena?" check.
1.4 / 2025-03-05:     • !NEW! You can now choose how to filter the forums:
                              with title spoilers, replaced by stubs or hidden completely.
                              An independent option to hide all filtered topics on the main page is still available.
                      • Bugfix - At some point derpi4u-legacy version got my fork linked in @require instead of Marker's original.
1.3 / 2025-03-04:     Implemented an option to collapse filtered thread topics completely when on the main forums page.
1.2 / 2024-07-05:     The script now runs on any Philomena-powered booru (that identifies as such in the html code);
                      Also did some code clean-up and added more comments. [Upd. 2024-11-22 Might roll back this one
                      [sometime later] because I need to figure out how to avoid Derpi4U loading non-Philomena websites.]
1.1 / 2024-05-22:     Added a setting for words or phrases to exclude from filtering
                      ("Escape words" setting in Derpi4U or escapeWords variable in the legacy script).
1.00 / 2024-04-26:    A complete code rewrite - the script is now much more optimized and
                      parses all forum links on any page of Derpibooru.
1.00% / 〃:           Legacy version of 1.0 + uses the original Derpi4U library.
1.00* / 〃:           Legacy version of 1.0 + doesn't require Derpi4U, the filter words are to be edited in code.
0.95f / 2024-04-22:   Typo fix in Derpi4U config id declaration.
                      Note that it means that the settings have been reset because of this, back them up before updating.
0.95e / 2024-04-21:   Fixed the script sharing config id with my other scripts.
0.95d / 2024-04-20:   Replaced Derpi4U library with a fork that supports multiline text areas;
                      Split the filter words with newline;
                      Resetting the settings to default first things first is highly recommended.
0.95c / 2024-02-19:   Figured out how to use a single textbox for all the filter words.
0.95b / 2024-02-18:   Added Marker's Derpi4U script/library for the settings userface.
                      The downside is that it doesn't allow array options so I've had to set a limited number of fields (5).
                      Inform me if more filter words are needed and I'll adjust the script.
0.95a / 2024-02-18:   Filter words list no longer requires regex values.
0.95 / 2024-02-18:    Added support for multiple filter words
                      [currently only accessible by modifying the variable directly].
0.94a / 2024-02-06:   Bugfix (script was not working on /forums page if any last post boxes are empty
                      (i.e. a post has been deleted)).
0.94:               Added /activity; Small code rewrites; Updated class selector for Notifications.
0.93a:              Bugfix (Anon posts in the sidebar still didn't work as intended in Firefox
                    (plaintext code is enclosed in quotes in Opera but turned out not to be in FF)).
0.93:               Bugfix for the sidebar and Notifications
                    (the script didn't filter a thread if the last poster was anonymous).
0.92:               Added Main page sidebar support [might be redundant because 'nsfw' seems to be filtered by default
                    in the sidebar,might be useful for future keyword additions though].
0.91:               Reworked the replacement function to remove redundant lines from the 'notifications page' part of the code.
0.9:                Added Notifications page support.
0.82:               Testing Notifications page support.
0.81:               Code cleanup.
0.8:                First fully working version; only board list and thread list pages are supported.
```

### Considered future features:
- Some customization of how the stubs are presented (spoiler filter word, do not spoiler filter word, hide filter word), maybe some other options.
- ~~An option to hide filtered threads completely or with a placeholder (possibly as a separate script).~~ Implemented as of 1.4.
- ~~Word escapes so you can make filter exceptions ("No NSFW" topics etc.).~~ Implemented as of version 1.1.
- ~~Expand compatibility to other Philomena boards (I don't use any of them so I can't guarantee anything).~~ Implemented as of version 1.2.
- ~~Profile pages support~~ - done as of 1.0.
- ~~Support for multiple filter words~~ - implemented as of 0.95 but may need improvement.
- ~~GUI and local storage for filters~~ - implemented as of 0.95b but uses the library's local storage.
- ~~Forum search and user's forum history pages support~~ - ~~unlikely to be implemented in this script because they show posts instead of threads.~~ Version 1.0 parses all forum urls (the posts themselves are still visible however).
- ~~JSON fetching of the current board list - maybe? (if possible?)~~ - not needed as of 1.0.

Credits:
- Mark Taiwan for the **Derpibooru Unified Userscript UI Utility** library.
