# Release Notes

This project adheres to [Semantic Versioning](https://semver.org/).

## 2.6.1

- Updated `Electron` to version `12.0.2`.

## 2.6.0

- Updated `KaTeX` to version `0.13.0`.
- Improved styling of `<code>` and `<kbd>` tags.
- Updated `Electron` to version `12.0.1`.

## 2.5.0

- Added optional confirm quit dialog.
- Updated `Electron` to version `12.0.0`.

## 2.4.2

- Updated `Electron` to version `11.2.3`.

## 2.4.1

- Updated font stacks: improved display on Windows.
- Updated `Electron` to version `11.2.1`.

## 2.4.0

- Used common CSS variables for font stacks.
- Updated and expanded font stacks.
- Updated `Electron` to version `11.1.1`.

## 2.3.0

- Updated `Electron` to version `11.1.0`.
- Updated `Electron Packager` to version `15.2.0`.

## 2.2.1

- Updated `KaTeX` to version `0.12.0`.
- Updated `Electron` to version `11.0.3`: fixed `screen` methods not being accessible via `remote.screen` in the **System Information** utility.

## 2.2.0

- Added new **Text to Speech** utility.
- Updated `Application` section of the **System Information** utility.
- Updated `Electron` to version `11.0.1`.

## 2.1.1

- Added context menu to external reference links, allowing copy of URL to clipboard.
- Updated `Electron` to version `10.1.5`.

## 2.1.0

- Added `Country Code` to the `Application` section of the **System Information** utility. 
- Forced proper Latin font `Segoe UI` as a substitute to `system-ui` on Windows.

## 2.0.1

- Restricted display of modal dialogs over main window only.
- Updated `Electron` to version `10.1.3`.

## 2.0.0

- Updated global hot key.
- Fixed resetting multiline fields scroll to left as well as top.
- Updated `Electron` to version `10.1.1`.
- Updated `Electron Packager` to version `15.1.0`.

## 1.16.1

- Updated `Electron` to version `9.1.2`.

## 1.16.0

- Updated `Electron` to version `9.1.0`.

## 1.15.0

- Added `Load...` and `Save...` buttons to the `JSON Formatter` utility.
- Fixed resetting multiline fields scroll to top.
- Updated `Electron Packager` to version `15.0.0`.

## 1.14.0

- Added display of `System Info` dialog from the `Help` menu.
- Updated `Electron` to version `9.0.5`.

## 1.13.1

- Fixed error when attempting to open user data or temporary directories from the Developer menu.

## 1.13.0

- Defined platform-independent focus outline color for text areas.
- Updated app building instructions.
- Updated `Electron` to version `9.0.3`.

## 1.12.0

- Improved security.
- Updated `Electron` to version `8.3.0`.

## 1.11.2

- Improved display of monospaced fonts on Linux by adding "DejaVu Sans Mono" to the font stack.
- Updated Help menu.
- Updated documentation.
- Updated `Electron` to version `8.2.4`.

## 1.11.1

- Added keyboard shortcut (`CommandOrControl+Enter`) to parse script (or tokenize it if `Alt` or `Shift` key is held down too) while focus is in the code text area in the **JavaScript Parser** utility.
- Added keyboard shortcut (`CommandOrControl+Enter`) to run script while focus is in the code text area in the **JavaScript Runner** utility.
- Updated `Electron` to version `8.2.3`.

## 1.11.0

- Added three parser option checkboxes to the **JavaScript Parser** utility: `Range`, `Loc`, `Comment`.
- Added reference links to `Esprima` documentation in the **JavaScript Parser** utility.
- Added trimming of input string to avoid cryptic error messages in the **JSON Formatter** utility.

## 1.10.1

- Fixed 1 low severity vulnerability.
- Updated `Electron` to version `8.2.1`.

## 1.10.0

- Updated `Electron` to version `8.2.0`.

## 1.9.5

- Cleaned up some code.
- Fixed 1 moderate severity vulnerability on GitHub.

## 1.9.4

- Updated `Electron` to version `8.1.1`.

## 1.9.3

- Used text cursor for all user-selectable text.
- Updated `Electron` to version `8.0.2`.

## 1.9.2

- Improved user selection of code examples and table cells.
- Reorganized CSS code architecture.
- Updated all screenshots.
- Updated `Electron` to version `8.0.1`.

## 1.9.1

- Updated `KaTeX` to version `0.11.1`.
- Updated `Electron Packager` to version `14.2.1`.

## 1.9.0

- Revamped the zoom level actions (`Actual Size`, `Zoom In`, `Zoom Out`) of the `View` menu.
- Updated `Electron` to version `8.0.0`.

## 1.8.6

- Updated `simple-romaji-kana` module to version `2.4.2`.
- Updated obsolete reference link and examples of the **Romaji-Kana** utility.
- Updated release notes (CHANGES.md).

## 1.8.5

- Added release notes (CHANGES.md).
- Updated `Electron` to version `7.1.10`.

## 1.8.4

- Used only one common default folder for both XML and JSON in the **XML Converter** utility.
- Added new Unihan variant samples to the **Graph Visualizer** utility.

## 1.8.3

- Updated `Electron` to version `7.1.9`.
- Updated `Electron Packager` to version `14.2.0`.

## 1.8.2

- Enabled opening of external links in graphs, added new samples and reference links in the **Graph Visualizer** utility.

## 1.8.1

- Used `viz.js` module directly, instead of `d3-graphviz`.
- Fixed saving of potentially invalid SVG, and updated samples and reference links in the **Graph Visualizer** utility.
- Updated screenshot accordingly.
- Fixed opening of invalid anchors.
- Updated `Electron` to version `7.1.8`.

## 1.8.0

- Added a new **Graph Visualizer** utility.

## 1.7.1

- Improved legibility of correlation tables and updated examples of the **Romaji-Kana** utility.

## 1.7.0

- Updated `simple-romaji-kana` module to version `2.4.1`.
- Added correlation tables to the **Romaji-Kana** utility, and generated examples dynamically.
- Updated screenshot accordingly.
- Fixed app timestamp date.
- Updated copyright years.
- Updated handling of default smart zoom setting.
- Updated `Electron` to version `7.1.7`.

## 1.6.2

- Fixed removal of menu bar in license window on Linux.
- Updated `Electron` to version `7.1.5`.

## 1.6.1

- Updated `Electron` to version `7.1.4`.

## 1.6.0

- Replaced deprecated HTML Imports with explicit reading of HTML files and dynamic templates.
- Updated `Electron` to version `7.1.3`.

## 1.5.3

- Renamed license HTML file to prevent licensing ambiguity on GitHub.
- Updated `simple-romaji-kana` module to version `2.4.0`.
- Updated `Electron Packager` to version `14.1.1`.

## 1.5.2

- Updated `simple-romaji-kana` module to version `2.3.0`.
- Updated `Electron` to version `7.1.2`.

## 1.5.1

- Updated `simple-romaji-kana` module to version `2.2.0`.

## 1.5.0

- Updated reference links.
- Updated `simple-romaji-kana` module to version `2.1.0`.
- Bumped app version to `1.5.0` (last release should already have been a minor change, not fix).

## 1.4.4

- Improved layout of checkboxes.
- Improved the **Romaji-Kana** utility.
- Updated `simple-romaji-kana` module to version `2.0.0`.
- Updated `Electron` to version `7.1.1`.
- Updated `Electron Packager` to version `14.1.0`.

## 1.4.3

- Replaced deprecated `get` functions with equivalent properties.
- Displayed custom menu bar as early as possible.
- Improved styling of disabled drop-down menus.
- Updated `simple-romaji-kana` module to version `1.1.4`.
- Updated `Electron` to version `7.0.0`.

## 1.4.2

- Updated `simple-romaji-kana` module: fixed conversion of decomposed kana in the **Romaji-Kana** utility.

## 1.4.1

- Added Japanese language tag to kana fields in the **Romaji-Kana** utility.
- Used distinct background color for user text selection.

## 1.4.0

- Added  **Romaji-Kana** utility.
- Updated `KaTeX` and `Esprima` libraries.
- Updated `Electron` to version `6.0.11`.
- Updated `Electron Packager` to version `14.0.6`.

## 1.3.9

- Updated minimum size of main window to more consistent values for width and height.
- Added System Version to the system information copied to clipboard.
- Fixed incorrect build date in About dialog.
- Added Fourier samples to the **LaTeX Math Renderer** utility.
- Used promise-based versions of open/save file dialog functions.
- Fixed syntax of `--asar` option of `electron-packager` in `package.json`.
- Updated `Electron` to version `6.0.7`.
- Updated `Electron Packager` to version `14.0.5`.

## 1.3.8

- Improved layout of the **CSS Cursors Demo** utility.
- Updated screenshot accordingly.
- Updated `Electron` to version `6.0.4`.

## 1.3.7

- Added Electron module path info to the **System Information** utility.
- Updated screenshot.
- Updated `Electron` to version `6.0.2`.

## 1.3.6

- Added transitory highlight feedback to modified field values after clicking `Refresh` button in the **System Information** utility.
- Grouped highlighted fields together in the **System Information** utility.
- Updated `Electron` to version `6.0.1`.

## 1.3.5

- Added `Refresh` button to each information group of the **System Information** utility.
- Added new fields to the `Window` information group of the **System Information** utility.
- Updated all screenshots.

## 1.3.0

- Added hovering visual clue to the **CSS Cursors Demo** utility.
- Added new fields and handled promises in the **System Information** utility.

## 1.2.0

 Added `KaTeX` CSS style sheet dynamically.
- Fixed issue when launching second instance of app on macOS.
- Updated **XML Converter** utility.
- Updated XML to JSON library.
- Updated `Electron` to version `6.0.0`.
- Added missing `--asar` option for `electron-packager`.

## 1.1.0

- Added **XML Converter** utility to convert XML to JSON, making use of a custom lightweight parser.
- Allowed more tolerant quoted string format for Hex and Base64 strings in the **Text Decoder** feature of the **Text Convertor** utility.
- Added Unicode and ICU versions to the **System Information** utility.
- Added Unicode and ICU versions to the system information copied to clipboard.
- Fixed window icon in Linux.
- Updated screenshots.
- Updated `Electron` to version `4.2.4`.

## 1.0.1

- Updated app icons.
- Updated `Electron` to version `4.2.3`.

## 1.0.0

- Created a new Electron app from the following utilities previously part of the [Vade Mecum Shelf](https://github.com/tonton-pixel/vade-mecum-shelf) app:

    - **CIDR Calculator**
    - **CSS Cursors Demo**
    - **Digital Clock**
    - **IETF Language Tags**
    - **JavaScript Parser**
    - **JavaScript Runner**
    - **JSON Formatter**
    - **LaTeX Math Renderer**
    - **Roman Numerals**
    - **System Information**
    - **Text Converter**
