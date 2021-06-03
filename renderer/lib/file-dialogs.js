//
const { dialog, getCurrentWindow } = require ('@electron/remote');
//
const fs = require ('fs');
//
module.exports.loadTextFile = function (prompt, filters, defaultPath, encoding, callback)
{
    dialog.showOpenDialog
    (
        getCurrentWindow (),
        {
            title: prompt,
            message: prompt,
            filters: filters,
            defaultPath: defaultPath
        }
    )
    .then
    (
        result =>
        {
            if (!result.canceled)
            {
                let filePath = result.filePaths[0];
                fs.readFile
                (
                    filePath,
                    encoding,
                    (err, data) =>
                    {
                        if (err)
                        {
                            alert ("An error occurred reading the file: " + err.message);
                        }
                        else
                        {
                            callback (data, filePath);
                        }
                    }
                );
            }
        }
    );
}
//
module.exports.saveTextFile = function (prompt, filters, defaultPath, callback)
{
    dialog.showSaveDialog
    (
        getCurrentWindow (),
        {
            title: prompt,
            message: prompt,
            filters: filters,
            defaultPath: defaultPath
        }
    )
    .then
    (
        result =>
        {
            if (!result.canceled)
            {
                let filePath = result.filePath;
                fs.writeFile
                (
                    filePath,
                    callback (filePath),
                    (err) =>
                    {
                        if (err)
                        {
                            alert ("An error occurred writing the file: " + err.message);
                        }
                    }
                );
            }
        }
    );
};
//
