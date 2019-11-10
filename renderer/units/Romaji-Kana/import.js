//
const unit = document.getElementById ('romaji-kana-unit');
//
const romajiHiraganaSelect = unit.querySelector ('.romaji-hiragana-select');
const romajiKatakanaSelect = unit.querySelector ('.romaji-katakana-select');
const romajiInput = unit.querySelector ('.romaji-input');
const kanaOutput = unit.querySelector ('.kana-output');
//
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
        romajiHiraganaSelect: "kun-yomi",
        romajiKatakanaSelect: "gairaigo",
        romajiInput: "",
        kanaInput: "",
        examples: false,
        references: false
    };
    let prefs = context.getPrefs (defaultPrefs);
    //
    const { romajiToKana, kanaToRomaji } = require ('simple-romaji-kana');
    //
    // Rōmaji to Kana
    //
    function updateKanaOutput (romajiValue)
    {
        let options = { hiragana: romajiHiraganaSelect.value, katakana: romajiKatakanaSelect.value };
        kanaOutput.value = romajiToKana (romajiValue, options);
    }
    //
    romajiHiraganaSelect.value = prefs.romajiHiraganaSelect;
    if (romajiHiraganaSelect.selectedIndex < 0) // -1: no element is selected
    {
        romajiHiraganaSelect.selectedIndex = 0;
    }
    romajiHiraganaSelect.addEventListener ('input', (event) => { updateKanaOutput (romajiInput.value); });
    //
    romajiKatakanaSelect.value = prefs.romajiKatakanaSelect;
    if (romajiKatakanaSelect.selectedIndex < 0) // -1: no element is selected
    {
        romajiKatakanaSelect.selectedIndex = 0;
    }
    romajiKatakanaSelect.addEventListener ('input', (event) => { updateKanaOutput (romajiInput.value); });
    //
    updateKanaOutput (romajiInput.value = prefs.romajiInput);
    romajiInput.addEventListener
    (
        'input',
        (event) =>
        {
            updateKanaOutput (event.currentTarget.value);
        }
    );
    //
    // Kana to Rōmaji
    //
    function updateRomajiOutput (kanaValue)
    {
        romajiOutput.value = kanaToRomaji (kanaValue);
    }
    //
    updateRomajiOutput (kanaInput.value = prefs.kanaInput);
    kanaInput.addEventListener
    (
        'input',
        (event) =>
        {
            updateRomajiOutput (event.currentTarget.value);
        }
    );
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
        romajiHiraganaSelect: romajiHiraganaSelect.value,
        romajiKatakanaSelect: romajiKatakanaSelect.value,
        romajiInput: romajiInput.value,
        kanaInput: kanaInput.value,
        examples: examples.open,
        references: references.open
    };
    context.setPrefs (prefs);
};
//
