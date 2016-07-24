var pageNumber = 1;

function appendListItems(array){
  var imgList = document.getElementById("image-list");
  while (imgList.firstChild){
    imgList.removeChild(imgList.firstChild);
  }
  array.forEach(function (obj){
    var listItem = document.createElement('li');
    listItem.dataset.url = obj.url;
    listItem.dataset.title = obj.title;
    listItem.classList.add("library-list-item");
    listItem.addEventListener("click", getClicked);

    var titleSpan = document.createElement('span');
    titleSpan.innerText = obj.title;
    listItem.appendChild(titleSpan);

    var urltext = (obj.url.length < 45) ? obj.url : obj.url.substr(0, 42) + '...';
    var urlTag = document.createElement('a');
    urlTag.innerText = urltext;
    urlTag.href = obj.url;
    listItem.appendChild(urlTag);

    var delBtn = document.createElement('button');
    delBtn.innerText = "Delete";
    delBtn.id = 'url-delete';
    listItem.appendChild(delBtn);

    var editBtn = document.createElement('button');
    editBtn.innerText = "Edit";
    editBtn.id = 'url-edit';
    listItem.appendChild(editBtn);

    imgList.appendChild(listItem);
  });
}

function getClicked(e){
  if (e.target.id === 'url-delete') {
    handleDelete(e);
  }else if (e.target.id === 'url-edit') {
    handleEdit(e);
  }
}

function handleDelete (e){
  var url = e.currentTarget.dataset.url;
  var title = e.currentTarget.dataset.title;
  var imageObj = {title: title, url: url};
  deleteUrl(imageObj, getUrls());
}

function handleEdit(e){

}

function openThumb (e){
  var url = e.target.dataset.url;
}

function getUrls(page){
  return function (){
    getAllUrls(appendListItems);
  };
}







document.addEventListener('DOMContentLoaded', function () {

  openDb(getUrls());
});
