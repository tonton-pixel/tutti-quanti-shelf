//
// Lightweight, albeit lossy, XML to JSON parser
//
const attributePrefix = "@";
const textPropertyName = "#text";
//
function parseElement (element, trimWhitespace)
{
    let json = { };
    if (element.hasAttributes ())
    {
        for (let attribute of element.attributes)
        {
            json[attributePrefix + attribute.name] = attribute.value;
        }
    }
    if (element.hasChildNodes ())
    {
        // Replace CDATA sections with equivalent text nodes
        for (let childNode of element.childNodes)
        {
            if (childNode.nodeType === Node.CDATA_SECTION_NODE)
            {
                childNode.replaceWith (childNode.nodeValue)
            }
        }
        element.normalize (); // Merge adjacent text nodes
        for (let childNode of element.childNodes)
        {
            if (childNode.nodeType === Node.ELEMENT_NODE)
            {
                let childElement = childNode;
                if (childElement.tagName in json)
                {
                    if (!Array.isArray (json[childElement.tagName]))
                    {
                        json[childElement.tagName] = [ json[childElement.tagName] ];
                    }
                    json[childElement.tagName].push (parseElement (childElement, trimWhitespace));
                }
                else
                {
                    json[childElement.tagName] = parseElement (childElement, trimWhitespace);
                }
            }
            else if (childNode.nodeType === Node.TEXT_NODE)
            {
                let childText = childNode.nodeValue;
                if (childText.match (/[^ \n\r\t]/)) // Ignore whitespace-only text nodes
                {
                    if (trimWhitespace)
                    {
                        childText = childText.replace (/^[ \n\r\t]+/, "").replace (/[ \n\r\t]+$/, "");
                    }
                    if (childText)
                    {
                        if (textPropertyName in json)
                        {
                            if (!Array.isArray (json[textPropertyName]))
                            {
                                json[textPropertyName] = [ json[textPropertyName] ];
                            }
                            json[textPropertyName].push (childText);
                        }
                        else 
                        {
                            json[textPropertyName] = childText;
                        }
                    }
                }
            }
        }
    }
    let jsonKeys = Object.keys (json);
    if (jsonKeys.length > 0)
    {
        if ((jsonKeys.length === 1) && (jsonKeys[0] === textPropertyName))
        {
            json = json[textPropertyName];
        }
    }
    else
    {
        json = null;
    }
    return json;
}
//
module.exports.parse = function (xml, trimWhitespace)
{
    let json = { };
    let parser = new DOMParser ();
    let doc = parser.parseFromString (xml, 'text/xml');
    let root = doc.firstElementChild;
    if (root)
    {
        let parserError = root.querySelector ('parsererror > div');
        if (parserError)
        {
            throw new SyntaxError (parserError.textContent);
        }
        else
        {
            json[root.tagName] = parseElement (root, trimWhitespace);
        }
    }
    return json;
}
//
