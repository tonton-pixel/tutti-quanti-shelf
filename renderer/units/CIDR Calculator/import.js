//
const unit = document.getElementById ('cidr-calculator-unit');
//
const cidrInput = unit.querySelector ('.cidr-input');
const ipRangeOutput = unit.querySelector ('.ip-range-output');
//
const ipRangeInput = unit.querySelector ('.ip-range-input');
const cidrListOutput = unit.querySelector ('.cidr-list-output');
//
const references = unit.querySelector ('.references');
const links = unit.querySelector ('.links');
//
module.exports.start = function (context)
{
    const defaultPrefs =
    {
        cidrInput: "",
        ipRangeInput: "",
        references: false
    };
    let prefs = context.getPrefs (defaultPrefs);
    //
    const cidr = require ('./cidr.js');
    //
    function getIpRange (string)
    {
        let ips = cidr.cidrToIps (string.trim ());
        ipRangeOutput.value = ips ? ips.join (" - ") : "";
    }
    getIpRange (cidrInput.value = prefs.cidrInput);
    cidrInput.addEventListener ('input', (event) => { getIpRange (event.currentTarget.value); });
    //
    function getCidrList (string)
    {
        let cidrs = cidr.ipRangeToCidrs (string.trim ());
        cidrListOutput.value = cidrs ? cidrs.join ("\n") : "";
        cidrListOutput.scrollTop = 0;
    }
    getCidrList (ipRangeInput.value = prefs.ipRangeInput);
    ipRangeInput.addEventListener ('input', (event) => { getCidrList (event.currentTarget.value) });
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
        cidrInput: cidrInput.value,
        ipRangeInput: ipRangeInput.value,
        references: references.open
    };
    context.setPrefs (prefs);
};
//
