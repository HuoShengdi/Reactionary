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
    titleSpan.classList.add = "url-title";
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
    editBtn.innerText = "Rename";
    editBtn.id = 'url-edit';
    listItem.appendChild(editBtn);

    imgList.appendChild(listItem);
  });
}

function getClicked(e){
  if (e.target.id === 'url-delete') {
    handleDelete(e);
  }else if (e.target.id === 'url-edit') {
    openEditForm(e);
  }
}

function handleDelete (e){
  var url = e.currentTarget.dataset.url;
  var title = e.currentTarget.dataset.title;
  var imageObj =  {title: title, url: url};
  deleteUrl(imageObj, getUrls());
}

function openEditForm(e){
  var listItem = e.currentTarget;

  var editForm = document.createElement('form');
  editForm.onsubmit = handleSubmit;

  var titleInput = document.createElement('input');
  titleInput.type = "text";
  titleInput.value = listItem.dataset.title;
  titleInput.classList.add("url-title");
  editForm.appendChild(titleInput);

  var urlInput = document.createElement('input');
  urlInput.type = "text";
  urlInput.value = listItem.dataset.url;
  urlInput.disabled = true;
  urlInput.classList.add("url-url");
  editForm.appendChild(urlInput);

  var submitBtn = document.createElement('input');
  submitBtn.type = "submit";
  submitBtn.classList.add("submit");
  editForm.appendChild(submitBtn);

  listItem.innerHTML = "";
  listItem.appendChild(editForm);
}

function handleSubmit(e){
  e.preventDefault();
  var form = e.target;
  var title = form[0].value;
  var url = form[1].value;
  var imageObj = {title: title, url: url};

  editUrl(imageObj, getUrls());
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
