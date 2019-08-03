//
const unit = document.getElementById ('system-information-unit');
//
const infoContainer = unit.querySelector ('.info-container');
//
const references = unit.querySelector ('.references');
const links = unit.querySelector ('.links');
//
module.exports.start = function (context)
{
    const defaultPrefs =
    {
        references: false
    };
    let prefs = context.getPrefs (defaultPrefs);
    //
    const infos = require ('./infos.json');
    //
    let variables = process.env;
    //
    let env_variables = [ ];
    let npm_variables = [ ];
    //
    for (let variable in variables)
    {
        if (variables.hasOwnProperty (variable))
        {
            if (variable.startsWith ("npm_"))
            {
                npm_variables.push (variable);
            }
            else
            {
                env_variables.push (variable);
            }
        }
    }
    env_variables.sort ();
    npm_variables.sort ();
    //
    function environmentInfo (variables, category)
    {
        let info = { };
        info["category"] = category;
        let items = [ ];
        for (let variable of variables)
        {
            items.push ({ "name": variable, "value": `process.env["${variable}"]` });
        }
        info["items"] = items;
        return info;
    }
    //
    if (env_variables.length > 0)
    {
        infos.push (environmentInfo (env_variables, "Environment"));
    }
    if (npm_variables.length > 0)
    {
        infos.push (environmentInfo (npm_variables, "NPM Environment"));
    }
    //
    function evaluate (expression)
    {
        let func = new Function ('return (' + expression + ')');
        return func ();
    }
    //
    function updateCellValue (cell, value, disabled)
    {
        if (disabled)
        {
            cell.classList.add ('disabled');
        }
        else
        {
            cell.classList.remove ('disabled');
        }
        cell.textContent = (typeof value === 'object') ? JSON.stringify (value) : value;
    }
    //
    for (let info of infos)
    {
        let div = document.createElement ('div');
        div.className = 'plain-panel';
        let h2 = document.createElement ('h2');
        h2.textContent = info["category"];
        div.appendChild (h2);
        let table = document.createElement ('table');
        let items = info["items"];
        for (let item of items)
        {
            let tr = document.createElement ('tr');
            let th = document.createElement ('th');
            let td = document.createElement ('td');
            th.className = 'name';
            th.textContent = item["name"];
            let value = undefined;
            try
            {
                value = evaluate (item["value"]);
            }
            catch (e)
            {
            }
            td.className = 'value';
            if (typeof value === 'undefined')
            {
                updateCellValue (td, "<undefined>", true);
            }
            else if (value instanceof Promise)
            {
                updateCellValue (td, "<pending>", true);
                value.then
                (
                    value => updateCellValue (td, value), // resolve
                    error => updateCellValue (td, "<error>", true) // reject
                );
            }
            else
            {
                updateCellValue (td, value);
            }
            td.title = item["value"];
            tr.appendChild (th);
            tr.appendChild (td);
            table.appendChild (tr);
        }
        div.appendChild (table);
        infoContainer.appendChild (div);
    }
    //
    references.open = prefs.references;
    //
    const refLinks = require ('./ref-links.json');
    const linksList = require ('../../lib/links-list.js');
    //
    linksList (links, refLinks);
}
//
module.exports.stop = function (context)
{
    let prefs =
    {
        references: references.open
    };
    context.setPrefs (prefs);
};
//