//
const unit = document.getElementById ('xml-converter-unit');
//
const clearButton = unit.querySelector ('.clear-button');
const samplesButton = unit.querySelector ('.samples-button');
const loadButton = unit.querySelector ('.load-button');
const saveButton = unit.querySelector ('.save-button');
const inputString = unit.querySelector ('.input-string');
const trimWhitespace = unit.querySelector ('.trim-whitespace');
const outputSaveButton = unit.querySelector ('.output-save-button');
const outputString = unit.querySelector ('.output-string');
//
const references = unit.querySelector ('.references');
const links = unit.querySelector ('.links');
//
let defaultFolderPath;
//
module.exports.start = function (context)
{
    const fs = require ('fs');
    const path = require ('path');
    //
    const fileDialogs = require ('../../lib/file-dialogs.js');
    const pullDownMenus = require ('../../lib/pull-down-menus.js');
    const sampleMenus = require ('../../lib/sample-menus');
    const xmlToJson = require ('../../lib/xml-to-json.js');
    const json = require ('../../lib/json2.js');
    //
    const defaultPrefs =
    {
        inputString: "",
        trimWhitespace: false,
        defaultFolderPath: context.defaultFolderPath,
        references: false
    };
    let prefs = context.getPrefs (defaultPrefs);
    //
    clearButton.addEventListener
    (
        'click',
        (event) =>
        {
            inputString.value = "";
            inputString.dispatchEvent (new Event ('input'));
            inputString.focus ();
        }
    );
    //
    let samplesDirname = path.join (__dirname, 'samples');
    let samplesFilenames = fs.readdirSync (samplesDirname);
    samplesFilenames.sort ((a, b) => a.localeCompare (b));
    let samples = [ ];
    for (let samplesFilename of samplesFilenames)
    {
        let filename = path.join (samplesDirname, samplesFilename);
        if (fs.statSync (filename).isDirectory ())
        {
            let dirname = filename;
            let itemsFilenames = fs.readdirSync (dirname);
            itemsFilenames.sort ((a, b) => a.localeCompare (b));
            let items = [ ];
            for (let itemsFilename of itemsFilenames)
            {
                let filename = path.join (dirname, itemsFilename);
                if (fs.statSync (filename).isFile ())
                {
                    let jsFilename = itemsFilename.match (/(.*)\.(xml|opml)$/i);
                    if (jsFilename)
                    {
                        items.push ({ label: jsFilename[1], string: fs.readFileSync (filename, 'utf8') });
                    }
                }
            }
            samples.push ({ label: samplesFilename, items: items });
        }
        else if (fs.statSync (filename).isFile ())
        {
            let jsFilename = samplesFilename.match (/(.*)\.(xml|opml)$/i);
            if (jsFilename)
            {
                samples.push ({ label: jsFilename[1], string: fs.readFileSync (filename, 'utf8') });
            }
        }
    }
    //
    let samplesMenu = sampleMenus.makeMenu
    (
        samples,
        (sample) =>
        {
            inputString.value = sample.string;
            inputString.scrollTop = 0;
            inputString.scrollLeft = 0;
            inputString.dispatchEvent (new Event ('input'));
        }
    );
    //
    samplesButton.addEventListener
    (
        'click',
        (event) =>
        {
            pullDownMenus.popup (event.currentTarget, samplesMenu);
        }
    );
    //
    defaultFolderPath = prefs.defaultFolderPath;
    //
    trimWhitespace.checked = prefs.trimWhitespace;
    trimWhitespace.addEventListener ('click', (event) => { inputString.dispatchEvent (new Event ('input')); });
    //
    function encode (xml)
    {
        let error = false;
        let output = "";
        if (xml)
        {
            try
            {
                output = json.stringify (xmlToJson.parse (xml, { trimWhitespace: trimWhitespace.checked }), null, 4);
            }
            catch (e)
            {
                output = "[XML Parser] " + e.message;
                error = true;
            }
        }
        outputString.value = output;
        outputString.scrollTop = 0;
        outputString.scrollLeft = 0;
        if (error)
        {
            outputString.classList.add ('output-error');
        }
        else
        {
            outputString.classList.remove ('output-error');
        }
    }
    //
    inputString.addEventListener ('input', event => { encode (event.currentTarget.value) });
    inputString.value = prefs.inputString;
    inputString.dispatchEvent (new Event ('input'));
    //
    const loadXmlFileFilters =
    [
        { name: "XML File (*.xml,*.opml)", extensions: [ 'xml', 'opml' ] }
    ];
    //
    loadButton.addEventListener
    (
        'click',
        (event) =>
        {
            fileDialogs.loadTextFile
            (
                "Load XML file:",
                loadXmlFileFilters,
                defaultFolderPath,
                'utf8',
                (text, filePath) =>
                {
                    inputString.value = text;
                    inputString.scrollTop = 0;
                    inputString.scrollLeft = 0;
                    inputString.dispatchEvent (new Event ('input'));
                    defaultFolderPath = path.dirname (filePath);
                }
            );
        }
    );
    //
    const saveXmlFileFilters =
    [
        { name: "XML File (*.xml)", extensions: [ 'xml' ] },
        { name: "OPML File (*.opml)", extensions: [ 'opml' ] }
    ];
    //
    saveButton.addEventListener
    (
        'click',
        (event) =>
        {
            fileDialogs.saveTextFile
            (
                "Save XML file:",
                saveXmlFileFilters,
                defaultFolderPath,
                (filePath) =>
                {
                    defaultFolderPath = path.dirname (filePath);
                    return inputString.value;
                }
            );
        }
    );
    //
    const jsonFileFilters =
    [
        { name: "JSON File (*.json)", extensions: [ 'json' ] }
    ];
    //
    outputSaveButton.addEventListener
    (
        'click',
        (event) =>
        {
            fileDialogs.saveTextFile
            (
                "Save JSON file:",
                jsonFileFilters,
                defaultFolderPath,
                (filePath) =>
                {
                    defaultFolderPath = path.dirname (filePath);
                    return outputString.value;
                }
            );
        }
    );
    //
    references.open = prefs.references;
    //
    const refLinks = require ('./ref-links.json');
    const linksList = require ('../../lib/links-list.js');
    //
    linksList (links, refLinks);
};
//
module.exports.stop = function (context)
{
    let prefs =
    {
        inputString: inputString.value,
        trimWhitespace: trimWhitespace.checked,
        defaultFolderPath: defaultFolderPath,
        references: references.open
    };
    context.setPrefs (prefs);
};
//
