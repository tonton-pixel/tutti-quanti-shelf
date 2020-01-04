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
const correlationTables = unit.querySelector ('.correlation-tables');
const hepburnTables = unit.querySelector ('.correlation-tables .hepburn-tables');
//
const examples = unit.querySelector ('.examples');
const examplesTable = unit.querySelector ('.examples .examples-table');
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
        correlationTables: false,
        examples: false,
        references: false
    };
    let prefs = context.getPrefs (defaultPrefs);
    //
    const { romajiToKana, kanaToRomaji, hepburnToKanaTable } = require ('simple-romaji-kana');
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
    correlationTables.open = prefs.correlationTables;
    //
    let table = document.createElement ('table');
    //
    let headerRow = document.createElement ('tr');
    let smallHeader = document.createElement ('th');
    smallHeader.textContent = "hiragana";
    headerRow.appendChild (smallHeader);
    let hiraganaHeader = document.createElement ('th');
    hiraganaHeader.textContent = "ひらがな";
    headerRow.appendChild (hiraganaHeader);
    let emptyHeader = document.createElement ('th');
    emptyHeader.className = 'empty';
    headerRow.appendChild (emptyHeader);
    let capitalHeader = document.createElement ('th');
    capitalHeader.textContent = "KATAKANA";
    headerRow.appendChild (capitalHeader);
    let katakanaHeader = document.createElement ('th');
    katakanaHeader.textContent = "カタカナ";
    headerRow.appendChild (katakanaHeader);
    table.appendChild (headerRow);
    for (let hepburn in hepburnToKanaTable)
    {
        if (/^[a-z]+$/.test (hepburn))
        {
            let kana = hepburnToKanaTable[hepburn];
            if (!(Array.isArray (kana) && (typeof kana[0] === 'number')))
            {
                let dataRow = document.createElement ('tr');
                let smallData = document.createElement ('td');
                smallData.textContent = hepburn;
                dataRow.appendChild (smallData);
                let hiraganaData = document.createElement ('td');
                hiraganaData.lang = 'ja';
                if ((typeof kana === 'object') && ("kun-yomi" in kana))
                {
                    hiraganaData.textContent = `${kana["kun-yomi"]}［訓］／\xA0${kana["gairaigo"]}［外］`
                }
                else
                {
                    hiraganaData.textContent = Array.isArray (kana) ? `${kana[0]}（${kana[1]}）` : kana;
                }
                dataRow.appendChild (hiraganaData);
                let emptyData = document.createElement ('td');
                emptyData.className = 'empty';
                dataRow.appendChild (emptyData);
                let capitalHepburn = hepburn.toUpperCase ();
                let capitalData = document.createElement ('td');
                capitalData.textContent = capitalHepburn;
                dataRow.appendChild (capitalData);
                let capitalKana = hepburnToKanaTable[capitalHepburn];
                let katakanaData = document.createElement ('td');
                katakanaData.lang = 'ja';
                if ((typeof capitalKana === 'object') && ("on-yomi" in capitalKana))
                {
                    katakanaData.textContent = `${capitalKana["gairaigo"]}［外］／\xA0${capitalKana["on-yomi"]}［音］`
                }
                else
                {
                    katakanaData.textContent = Array.isArray (capitalKana) ? `${capitalKana[0]}（${capitalKana[1]}）` : capitalKana;
                }
                dataRow.appendChild (katakanaData);
                table.appendChild (dataRow);
            }
        }
    }
    hepburnTables.appendChild (table);
    //
    const samples = require ('./samples.json');
    //
    examples.open = prefs.examples;
    //
    table = document.createElement ('table');
    //
    headerRow = document.createElement ('tr');
    let romajiHeader = document.createElement ('th');
    romajiHeader.textContent = "Rōmaji";
    headerRow.appendChild (romajiHeader);
    let kanaHeader = document.createElement ('th');
    kanaHeader.textContent = "Kana";
    headerRow.appendChild (kanaHeader);
    table.appendChild (headerRow);
    for (let sample of samples)
    {
        let dataRow = document.createElement ('tr');
        let romajiData = document.createElement ('td');
        romajiData.textContent = sample.romaji;
        dataRow.appendChild (romajiData);
        let kanaData = document.createElement ('td');
        kanaData.lang = 'ja';
        kanaData.textContent = romajiToKana (sample.romaji); // sample.kana
        dataRow.appendChild (kanaData);
        table.appendChild (dataRow);
    }
    //
    examplesTable.appendChild (table);
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
        correlationTables: correlationTables.open,
        examples: examples.open,
        references: references.open
    };
    context.setPrefs (prefs);
};
//
