function appendListItems(array){
  var imgList = document.getElementById("img-list");
  while (imgList.firstChild){
    imgList.removeChild(imgList.firstChild);
  }
  array.forEach(function (obj){
    var listItem = document.createElement('li');
    listItem.innerText = obj.title;
    listItem.dataset.url = obj.url;
    imgList.appendChild(listItem);
  });
}

function openThumb (e){
  var url = e.target.dataset.url;
}

function getUrls(){
  return function (){
    getAll('images', appendListItems);
  };
}












document.addEventListener('DOMContentLoaded', function () {

  openDb(getUrls());
});
