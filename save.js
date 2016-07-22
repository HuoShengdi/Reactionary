
function setFormListener(url){
  var form = document.getElementById("title-form");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    form.disabled = true;
    var title =  document.getElementById('img-title').value;
    saveUrl(url, title);
  });
}


function saveUrl(url, title){
  console.log("save button clicked");
  var imageObj = {title: title, url: url};
  save("images", imageObj, saveSuccess, saveError);
}

function saveSuccess(){
  console.log("saved successfully");
  setTimeout(window.close, 1500);
  var message = document.createElement('span');
  message.innerText = "Saved successfully!";
  document.getElementById('info').appendChild(message);
}

function saveError(error){
  var message = document.createElement('span');
  if (error === "ConstraintError"){
    message.innerText = "Title or URL already exists";
    document.getElementById('info').appendChild(message);
  }else {
    message.innerText = "Save failed";
    document.getElementById('info').appendChild(message);
  }
  setTimeout(window.close, 1500);
}

function renderUrl(url) {
  var divurl = document.getElementById('url');
  var urltext = (url.length < 45) ? url : url.substr(0, 42) + '...';
  var anchor = document.createElement('a');
  anchor.href = url;
  anchor.innerText = urltext;
  divurl.appendChild(anchor);
}

function renderThumbnail(url) {
  var canvas = document.getElementById('thumbnail');
  var context = canvas.getContext('2d');

  canvas.width = 100;
  canvas.height = 100;

  var image = new Image();
  image.addEventListener('load', function() {
    var srcW = image.width;
    var srcH = image.height;
    var newW = canvas.width;
    var newH = canvas.height;
    var ratio = srcW / srcH;
    if (srcW > srcH) {
      newH /= ratio;
    } else {
      newW *= ratio;
    }
    canvas.width = newW;
    canvas.height = newH;
    context.drawImage(image, 0, 0, srcW, srcH, 0, 0, newW, newH);
  });
  image.src = url;
}

function resizeWindow() {
  window.setTimeout(function() {
    chrome.tabs.getCurrent(function (tab) {
      var newHeight = Math.min(document.body.offsetHeight + 50, 300);
      chrome.windows.update(tab.windowId, {
        height: newHeight,
        width: 300
      });
    });
  }, 150);
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  var loader = document.getElementById('loading');
  loader.classList.add("hidden");
  var imageUrl = window.location.hash.substring(1);
  if (imageUrl) {
    renderUrl(imageUrl);
    renderThumbnail(imageUrl);
    setFormListener(imageUrl);
    resizeWindow();
    openDb();
  }
});
