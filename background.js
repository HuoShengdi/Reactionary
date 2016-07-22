
// create context menu item on images
function contextOnClick (info, tab) {
  if (info.menuItemId === "reactionary.save"){
    var url = 'save.html#' + info.srcUrl;
    chrome.windows.create({type:"popup", url: url, width: 300, height: 300});
  }
}

var menuItem = chrome.contextMenus.create({
  "title": "Save to Library",
  "id": "reactionary.save",
  "contexts": ["image"],
  "onclick": contextOnClick
});
// chrome.contextMenus.onClicked.addListener(contextOnClick)
