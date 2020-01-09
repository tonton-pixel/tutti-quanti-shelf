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
    // https://github.com/mdaines/viz.js/wiki/Usage
    // https://github.com/mdaines/viz.js/wiki/Caveats
    //
    const Viz = require ('viz.js');
    const { Module, render } = require ('viz.js/full.render.js');
    //
    let viz = new Viz ({ Module, render });
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
    let svgResult;
    //
    function renderGraph ()
    {
        svgResult = "";
        saveSVGButton.disabled = true;
        graphContainer.innerHTML = '';
        let trimmedString = dotSource.value.trim ();
        if (trimmedString)
        {
            try
            {
                viz.renderString (trimmedString, { engine: engineType.value, format: 'svg' })
                .then (result =>
                {
                    svgResult = result;
                    graphContainer.innerHTML = svgResult;
                    saveSVGButton.disabled = false;
                })
                .catch (error =>
                {
                    viz = new Viz ({ Module, render });
                    let paragraph = document.createElement ('p');
                    paragraph.className = 'rendering-error';
                    paragraph.textContent = error;
                    graphContainer.innerHTML = paragraph.outerHTML;
                });
            }
            catch (e)
            {
            }
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
                    return svgResult;
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
