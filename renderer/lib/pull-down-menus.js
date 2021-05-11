//
const { webFrame } = require ('electron');
//
module.exports.popup = function (button, menu, positioningItem)
{
    let buttonRect = button.getBoundingClientRect ();
    let factor = webFrame.getZoomFactor ();
    let adjustX = (process.platform === 'darwin') ? -1 : 0; // !!
    let adjustY = (process.platform === 'darwin') ? 4 : 2;  // !!
    let x = ((buttonRect.left - window.visualViewport.offsetLeft) * factor * window.visualViewport.scale) + adjustX;
    let y = ((buttonRect.bottom - window.visualViewport.offsetTop) * factor * window.visualViewport.scale) + adjustY;
    button.classList.add ('open');
    menu.popup ({ x: Math.round (x), y: Math.round (y), positioningItem, callback: () => { button.classList.remove ('open'); } });
}
//
