//
const unit = document.getElementById ('speech-to-text-unit');
//
const loadButton = unit.querySelector ('.load-button');
const saveButton = unit.querySelector ('.save-button');
const clearButton = unit.querySelector ('.clear-button');
const textString = unit.querySelector ('.text-string');
const voicesSelect = unit.querySelector ('.voices-select');
const rateSelect = unit.querySelector ('.rate-select');
const pitchSelect = unit.querySelector ('.pitch-select');
const volumeSelect = unit.querySelector ('.volume-select');
const playStopButton = unit.querySelector ('.play-stop-button');
//
const references = unit.querySelector ('.references');
const links = unit.querySelector ('.links');
//
let currentVoiceLang;
let currentVoiceName;
//
let defaultFolderPath;
//
module.exports.start = function (context)
{
    const path = require ('path');
    //
    const fileDialogs = require ('../../lib/file-dialogs.js');
    //
    const defaultPrefs =
    {
        textString: "",
        voiceLang: "",
        voiceName: "",
        rateSelect: 1,
        pitchSelect: 1,
        volumeSelect: 1,
        references: false,
        defaultFolderPath: context.defaultFolderPath
    };
    let prefs = context.getPrefs (defaultPrefs);
    //
    clearButton.addEventListener
    (
        'click',
        (event) =>
        {
            textString.value = "";
            textString.focus ();
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
                "Load text file:",
                [ { name: "Text (*.txt)", extensions: [ 'txt' ] } ],
                defaultFolderPath,
                'utf8',
                (text, filePath) =>
                {
                    textString.value = text;
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
                "Save text file:",
                [ { name: "Text (*.txt)", extensions: [ 'txt' ] } ],
                defaultFolderPath,
                (filePath) =>
                {
                    defaultFolderPath = path.dirname (filePath);
                    return textString.value;
                }
            );
        }
    );
    //
    textString.value = prefs.textString;
    //
    textString.addEventListener
    (
        'keydown',
        (event) =>
        {
            if ((event.key === 'Enter') && ((process.platform === 'darwin') ? event.metaKey : event.ctrlKey))
            {
                event.preventDefault ();
                playStopButton.click ();
            }
        }
    );
    //
    currentVoiceLang = prefs.voiceLang;
    currentVoiceName = prefs.voiceName;
    //
    let voices;
    //
    function updateVoicesMenu ()
    {
        while (voicesSelect.firstChild)
        {
            voicesSelect.firstChild.remove ();
        }
        voices = window.speechSynthesis.getVoices ().filter ((voice) => voice.localService);
        if (voices.length > 0)
        {
            let defaultVoiceIndex = -1;
            let voicesByLanguage = { };
            voices.forEach
            (
                (voice, index) =>
                {
                    if (!(voice.lang in voicesByLanguage))
                    {
                        voicesByLanguage[voice.lang] = [ ];
                    }
                    voicesByLanguage[voice.lang].push (index);
                    if (voice.default)
                    {
                        defaultVoiceIndex = index;
                    }
                }
            );
            let selectedIndex = -1;
            let languageTags = Object.keys (voicesByLanguage).sort ();
            for (let languageTag of languageTags)
            {
                let optionGroup = document.createElement ('optgroup');
                optionGroup.label = `◎\xA0${languageTag}`;
                let indices = voicesByLanguage[languageTag];
                indices.sort ((a, b) => voices[a].name.localeCompare (voices[b].name));
                for (let index of indices)
                {
                    let option = document.createElement ('option');
                    option.value = index;
                    option.textContent = voices[index].name;
                    if ((currentVoiceLang === voices[index].lang) && (currentVoiceName === voices[index].name))
                    {
                        selectedIndex = index;
                    }
                    optionGroup.appendChild (option);
                }
                voicesSelect.disabled = false;
                voicesSelect.appendChild (optionGroup);
            }
            if (selectedIndex < 0)
            {
                voicesSelect.value = defaultVoiceIndex;
                currentVoiceLang = voices[defaultVoiceIndex].lang;
                currentVoiceName = voices[defaultVoiceIndex].name;
            }
            else
            {
                voicesSelect.value = selectedIndex;
            }
        }
        else
        {
            let option = document.createElement ('option');
            option.value = '';
            option.textContent = "<None>";
            voicesSelect.appendChild (option);
            voicesSelect.value = '';
            voicesSelect.disabled = true;
        }
    }
    //
    updateVoicesMenu ();
    window.speechSynthesis.addEventListener ('voiceschanged', (event) => updateVoicesMenu ());
    //
    voicesSelect.addEventListener
    (
        'input',
        (event) =>
        {
            let voice = voices[event.currentTarget.value];
            currentVoiceLang = voice.lang;
            currentVoiceName = voice.name;
        }
    );
    //
    const minRate = 0.5;
    const maxRate = 2.0;
    for (let rate = minRate * 10; rate <= maxRate * 10; rate++)
    {
        let option = document.createElement ('option');
        option.textContent = (rate / 10).toFixed (1);
        rateSelect.appendChild (option);
    }
    rateSelect.value = prefs.rateSelect.toFixed (1);
    //
    const minPitch = 0.0;
    const maxPitch = 2.0;
    for (let pitch = minPitch * 10; pitch <= maxPitch * 10; pitch++)
    {
        let option = document.createElement ('option');
        option.textContent = (pitch / 10).toFixed (1);
        pitchSelect.appendChild (option);
    }
    pitchSelect.value = prefs.pitchSelect.toFixed (1);
    //
    const minVolume = 0.0;
    const maxVolume = 1.0;
    for (let volume = minVolume * 10; volume <= maxVolume * 10; volume++)
    {
        let option = document.createElement ('option');
        option.textContent = (volume / 10).toFixed (1);
        volumeSelect.appendChild (option);
    }
    volumeSelect.value = prefs.volumeSelect.toFixed (1);
    //
    let utterance = new SpeechSynthesisUtterance ();
    //
    utterance.addEventListener ('start', (event) => playStopButton.textContent = "Stop");
    utterance.addEventListener ('end', (event) => playStopButton.textContent = "Play");
    utterance.addEventListener ('error', (event) => playStopButton.textContent = "Play");
    //
    playStopButton.addEventListener
    (
        'click',
        (event) =>
        {
            if (window.speechSynthesis.speaking)
            {
                window.speechSynthesis.cancel ();
            }
            else
            {
                let text = (textString.value.substring (textString.selectionStart, textString.selectionEnd) || textString.value).trim ();
                if (text)
                {
                    utterance.voice = voices[voicesSelect.value];
                    utterance.rate = parseFloat (rateSelect.value);
                    utterance.pitch = parseFloat (pitchSelect.value);
                    utterance.volume = parseFloat (volumeSelect.value);
                    utterance.text = text;
                    window.speechSynthesis.speak (utterance);
                }
            }
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
        textString: textString.value,
        voiceLang: currentVoiceLang,
        voiceName: currentVoiceName,
        rateSelect: parseFloat (rateSelect.value),
        pitchSelect: parseFloat (pitchSelect.value),
        volumeSelect: parseFloat (volumeSelect.value),
        references: references.open,
        defaultFolderPath: defaultFolderPath
    };
    context.setPrefs (prefs);
};
//
