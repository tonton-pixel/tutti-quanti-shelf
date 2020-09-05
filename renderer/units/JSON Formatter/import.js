//
const unit = document.getElementById ('json-formatter-unit');
//
const clearButton = unit.querySelector ('.clear-button');
const samplesButton = unit.querySelector ('.samples-button');
const loadButton = unit.querySelector ('.load-button');
const saveButton = unit.querySelector ('.save-button');
const inputString = unit.querySelector ('.input-string');
const spaceType = unit.querySelector ('.space-type');
const balancedSpacing = unit.querySelector ('.balanced-spacing');
const finalLineBreak = unit.querySelector ('.final-line-break');
const outputString = unit.querySelector ('.output-string');
//
const references = unit.querySelector ('.references');
const links = unit.querySelector ('.links');
//
let defaultFolderPath;
//
module.exports.start = function (context)
{
    const path = require ('path');
    //
    const fileDialogs = require ('../../lib/file-dialogs.js');
    const pullDownMenus = require ('../../lib/pull-down-menus.js');
    const sampleMenus = require ('../../lib/sample-menus');
    const json = require ('../../lib/json2.js');
    //
    const defaultPrefs =
    {
        inputString: "",
        spaceType: "",
        balancedSpacing: false,
        finalLineBreak: false,
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
    const samples = require ('./samples.json');
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
    function reformat (input)
    {
        let error = false;
        let output = "";
        let string = input.trim ();
        if (string)
        {
            try
            {
                let space = undefined;
                if (spaceType.value === 'spaces')
                {
                    space = 4;
                }
                else if (spaceType.value === 'tabs')
                {
                    space = '\t';
                }
                output = (balancedSpacing.checked ? json : JSON).stringify (JSON.parse (string), null, space);
                if (finalLineBreak.checked)
                {
                    output += "\n";
                }
            }
            catch (e)
            {
                output = e.message;
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
    inputString.addEventListener ('input', (event) => reformat (event.currentTarget.value));
    inputString.value = prefs.inputString;
    inputString.dispatchEvent (new Event ('input'));
    //
    loadButton.addEventListener
    (
        'click',
        (event) =>
        {
            fileDialogs.loadTextFile
            (
                "Load JSON file:",
                [ { name: "JSON File (*.json)", extensions: [ 'json' ] } ],
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
    saveButton.addEventListener
    (
        'click',
        (event) =>
        {
            fileDialogs.saveTextFile
            (
                "Save JSON file:",
                [ { name: "JSON File (*.json)", extensions: [ 'json' ] } ],
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
    function changeSpaceType (value)
    {
        reformat (inputString.value);
    }
    //
    spaceType.value = prefs.spaceType;
    if (spaceType.selectedIndex < 0) // -1: no element is selected
    {
        spaceType.selectedIndex = 0;
    }
    changeSpaceType (spaceType.value);
    spaceType.addEventListener ('input', (event) => { changeSpaceType (event.currentTarget.value); });
    //
    function changeBalancedSpacing (checked)
    {
        reformat (inputString.value);
    }
    //
    changeBalancedSpacing (balancedSpacing.checked = prefs.balancedSpacing);
    balancedSpacing.addEventListener ('click', (event) => { changeBalancedSpacing (event.currentTarget.checked); });
    //
    function changeFinalLineBreak (checked)
    {
        reformat (inputString.value);
    }
    //
    changeFinalLineBreak (finalLineBreak.checked = prefs.finalLineBreak);
    finalLineBreak.addEventListener ('click', (event) => { changeFinalLineBreak (event.currentTarget.checked); });
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
        spaceType: spaceType.value,
        balancedSpacing: balancedSpacing.checked,
        finalLineBreak: finalLineBreak.checked,
        defaultFolderPath: defaultFolderPath,
        references: references.open
    };
    context.setPrefs (prefs);
};
//
