var searchTimeout;

function addLibraryListener(){
  var libraryLink = document.getElementById('library-link');
  libraryLink.addEventListener("click", function(e) {
    var libraryUrl = 'library.html';
    chrome.tabs.create({ url: libraryUrl });
  });
}


function addSearchListener(){
  var searchField = document.getElementById('search-field');
  searchField.addEventListener("keyup", searchOnIdle);
}

function searchOnIdle(){
  if (searchTimeout){
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(searchDb, 500);
}

function searchDb () {
  var searchField = document.getElementById('search-field');
  if (searchField.value){
    var regexp = new RegExp(searchField.value);
    getMatching("images", regexp, appendSearchItems);
  }else{
    clearResults();
    var resultsList = document.getElementById("results-list");
    var listItem = document.createElement('li');
    listItem.innerText = "Type to search library by title";
    listItem.classList.add('search-note');
    resultsList.appendChild(listItem);
  }
}

function clearResults(){
  var resultsList = document.getElementById("results-list");
  while (resultsList.firstChild){
    resultsList.removeChild(resultsList.firstChild);
  }
  var tip = document.getElementById("copy-tip");
  tip.classList.add("hidden");
}

function appendSearchItems(array){
  clearResults();
  var resultsList = document.getElementById("results-list");
  if (array[0]){
    array.forEach(function (obj){
      var listItem = document.createElement('li');
      var itemLink = document.createElement('a');
      itemLink.innerText = obj.title;
      itemLink.href = obj.url;
      listItem.appendChild(itemLink);
      resultsList.appendChild(listItem);
    });
    var tip = document.getElementById("copy-tip");
    tip.classList.remove("hidden");
  }else{
    var listItem = document.createElement('li');
    listItem.innerText = "No results";
    listItem.classList.add("search-note");
    resultsList.appendChild(listItem);
  }
}

document.addEventListener("DOMContentLoaded", function(e){
  addLibraryListener();
  addSearchListener();
  openDb();
});
