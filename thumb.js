
function renderThumbnail(url) {
  var canvas = document.getElementById('thumbnail');
  var context = canvas.getContext('2d');

  canvas.width = 200;
  canvas.height = 200;

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
