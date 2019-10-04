//
const unit = document.getElementById ('romaji-kana-unit');
//
const romajiInput = unit.querySelector ('.romaji-input');
const kanaOutput = unit.querySelector ('.kana-output');
const kanaInput = unit.querySelector ('.kana-input');
const romajiOutput = unit.querySelector ('.romaji-output');
//
const examples = unit.querySelector ('.examples');
//
const references = unit.querySelector ('.references');
const links = unit.querySelector ('.links');
//
module.exports.start = function (context)
{
    const defaultPrefs =
    {
        romajiInput: "",
        kanaInput: "",
        examples: true,
        references: false
    };
    let prefs = context.getPrefs (defaultPrefs);
    //
    const { romajiToKana, kanaToRomaji } = require ('simple-romaji-kana');
    //
    kanaOutput.value = romajiToKana (romajiInput.value = prefs.romajiInput);
    romajiInput.addEventListener ('input', (event) => { kanaOutput.value = romajiToKana (event.currentTarget.value); });
    //
    romajiOutput.value = kanaToRomaji (kanaInput.value = prefs.kanaInput);
    kanaInput.addEventListener ('input', (event) => { romajiOutput.value = kanaToRomaji (event.currentTarget.value); });
    //
    examples.open = prefs.examples;
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
        romajiInput: romajiInput.value,
        kanaInput: kanaInput.value,
        examples: examples.open,
        references: references.open
    };
    context.setPrefs (prefs);
};
//
