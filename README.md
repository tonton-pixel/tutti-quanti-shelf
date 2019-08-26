# <img src="icons/icon-256.png" width="64px" align="center" alt="Tutti Quanti Shelf icon"> TUTTI QUANTI SHELF

**Tutti Quanti Shelf** is a collection of miscellaneous developer-oriented utilities wrapped into one single app, built with [Electron](https://electronjs.org).

This app works on macOS, Linux and Windows operating systems.

## Utilities

The following utilities are currently available:

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
- **XML Converter**

## CIDR Calculator

Simple CIDR calculators:

* CIDR to IP Range
* IP Range to CIDR List

<img src="screenshots/cidr-calculator.png" width="1080px" alt="CIDR Calculator screenshot">

## CSS Cursors Demo

Display CSS cursors by category:

<img src="screenshots/css-cursors-demo.png" width="1080px" alt="CSS Cursors Demo screenshot">

## Digital Clock

Customizable clock, using language-sensitive text formatting for date and time:

<img src="screenshots/digital-clock.png" width="1080px" alt="Digital Clock screenshot">

## IETF Language Tags

References for IETF BCP 47 language tags and subtags:

<img src="screenshots/ietf-language-tags.png" width="1080px" alt="IETF Language Tags screenshot">

## JavaScript Parser

JavaScript code parser and tokenizer, based on Esprima:

<img src="screenshots/javascript-parser.png" width="1080px" alt="JavaScript Parser screenshot">

## JavaScript Runner

JavaScript code runner, useful for quick testing/prototyping or data processing:

<img src="screenshots/javascript-runner.png" width="1080px" alt="JavaScript Runner screenshot">

## JSON Formatter

JSON data formatter and validator:

<img src="screenshots/json-formatter.png" width="1080px" alt="JSON Formatter screenshot">

## LaTeX Math Renderer

LaTeX math expression renderer, using the KaTeX JavaScript library:

<img src="screenshots/latex-math-renderer.png" width="1080px" alt="LaTeX Math Renderer screenshot">

## Roman Numerals

Converters between roman and arabic numerals:

* Roman to Arabic Numeral
* Arabic to Roman Numeral

<img src="screenshots/roman-numerals.png" width="1080px" alt="Roman Numerals screenshot">

## System Information

Detailed list of system information, by category:

* Framework
* Main Process
* Renderer Process
* Application
* Navigator
* Operating System
* OS User Info
* Screen
* Window
* Environment

<img src="screenshots/system-information.png" width="1080px" alt="System Information screenshot">

## Text Converter

Encode and decode text according to several string formats:

* JSON String
* Hex String
* Base64 String

<img src="screenshots/text-converter-text-encoder.png" width="1080px" alt="Text Converter - Text Encoder screenshot">

<img src="screenshots/text-converter-text-decoder.png" width="1080px" alt="Text Converter - Text Decoder screenshot">

## XML Converter

Convert XML to JSON:

<img src="screenshots/xml-converter.png" width="1080px" alt="XML Converter screenshot">

## Building

You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.

```bash
git clone https://github.com/tonton-pixel/tutti-quanti-shelf
cd tutti-quanti-shelf
npm install
npm start
```

If you don't wish to clone, you can [download the source code](https://github.com/tonton-pixel/tutti-quanti-shelf/archive/master.zip).

Several scripts are also defined in the `package.json` file to build OS-specific bundles of the app, using the simple yet powerful [Electron Packager](https://github.com/electron-userland/electron-packager) Node module.\
For instance, running the following command will create a `Tutti Quanti Shelf.app` version for macOS:

```bash
npm run build-darwin
```

## Using

You can [download the latest release](https://github.com/tonton-pixel/tutti-quanti-shelf/releases) for macOS.

## License

The MIT License (MIT).

Copyright © 2019 Michel MARIANI.
