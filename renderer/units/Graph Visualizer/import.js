//
const unit = document.getElementById ('graph-visualizer-unit');
//
const clearButton = unit.querySelector ('.clear-button');
const samplesButton = unit.querySelector ('.samples-button');
const loadButton = unit.querySelector ('.load-button');
const saveButton = unit.querySelector ('.save-button');
const dotSource = unit.querySelector ('.dot-source');
const engineType = unit.querySelector ('.engine-type');
const saveSVGButton = unit.querySelector ('.save-svg-button');
const graphContainer = unit.querySelector ('.graph-container');
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
    //
    const d3 = require ('d3-graphviz');
    //
    const defaultPrefs =
    {
        dotSource: "",
        engineType: "dot",
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
            dotSource.value = "";
            dotSource.dispatchEvent (new Event ('input'));
            dotSource.focus ();
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
            dotSource.value = sample.string;
            dotSource.dispatchEvent (new Event ('input'));
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
    loadButton.addEventListener
    (
        'click',
        (event) =>
        {
            fileDialogs.loadTextFile
            (
                "Load DOT file:",
                [ { name: "DOT (*.dot)", extensions: [ 'dot' ] } ],
                defaultFolderPath,
                'utf8',
                (text, filePath) =>
                {
                    dotSource.value = text;
                    dotSource.dispatchEvent (new Event ('input'));
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
                "Save DOT file:",
                [ { name: "DOT (*.dot)", extensions: [ 'dot' ] } ],
                defaultFolderPath,
                (filePath) =>
                {
                    defaultFolderPath = path.dirname (filePath);
                    return dotSource.value;
                }
            );
        }
    );
    //
    function renderGraph ()
    {
        saveSVGButton.disabled = true;
        try
        {
            graphContainer.innerHTML = '';
            let trimmedString = dotSource.value.trim ();
            if (trimmedString)
            {
                let container = d3.graphviz ('.graph-container');
                container.engine (engineType.value).renderDot (trimmedString);
                saveSVGButton.disabled = false;
            }
        }
        catch (e)
        {
            let paragraph = document.createElement ('p');
            paragraph.className = 'rendering-error';
            paragraph.textContent = e;
            graphContainer.innerHTML = paragraph.outerHTML;
        }
    }
    //
    engineType.value = prefs.engineType;
    if (engineType.selectedIndex < 0) // -1: no element is selected
    {
        engineType.value = defaultPrefs.engineType;
    }
    engineType.addEventListener ('input', (event) => renderGraph ());
    //
    dotSource.addEventListener ('input', (event) => renderGraph ());
    dotSource.value = prefs.dotSource;
    dotSource.dispatchEvent (new Event ('input'));
    //
    saveSVGButton.addEventListener
    (
        'click',
        (event) =>
        {
            fileDialogs.saveTextFile
            (
                "Save SVG file:",
                [ { name: "SVG File (*.svg)", extensions: [ 'svg' ] } ],
                defaultFolderPath,
                (filePath) =>
                {
                    defaultFolderPath = path.dirname (filePath);
                    return graphContainer.innerHTML;
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
        dotSource: dotSource.value,
        engineType: engineType.value,
        defaultFolderPath: defaultFolderPath,
        references: references.open
    };
    context.setPrefs (prefs);
};
//
