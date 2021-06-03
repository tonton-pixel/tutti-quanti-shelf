//
const { Menu, MenuItem } = require ('@electron/remote');
//
module.exports.makeMenu = function (samples, callback)
{
    let menu = new Menu ();
    for (let sample of samples)
    {
        if (sample === null)
        {
            menu.append (new MenuItem ({ type: 'separator' }));
        }
        else if ("string" in sample)
        {
            let menuItem = new MenuItem
            (
                {
                    label: sample.label.replace (/&/g, "&&"),
                    click: () => { callback (sample); }
                }
            );
            menu.append (menuItem);
        }
        else if ("items" in sample)
        {
            let items = sample.items;
            let subMenus = [ ];
            for (let item of items)
            {
                subMenus.push
                (
                    new MenuItem
                    (
                        (item === null) ?
                        { type: 'separator' } :
                        {
                            label: item.label.replace (/&/g, "&&"),
                            click: () => { callback (item); }
                        }
                    )
                );
            }
            let menuItem = new MenuItem
            (
                {
                    label: sample.label.replace (/&/g, "&&"),
                    submenu: subMenus
                }
            );
            menu.append (menuItem);
        }
    }
    return menu;
}
//
