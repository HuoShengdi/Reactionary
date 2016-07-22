const DB_NAME = 'reactionary-indexeddb-library';
const DB_VERSION = 1;

var db;

function openDb(){
  var req = indexedDB.open(DB_NAME, DB_VERSION);

  req.onsuccess = function(e){
    db = this.result;
    console.log("openDb completed");
  };

  req.onerror = function (e){
    console.error("openDb:", e.target.error);
  };

  req.onupgradeneeded = function(e){
    var idb = e.target.result;
    if (!idb.objectStoreNames.contains("images")){
      var store = idb.createObjectStore(
        "images", { keyPath: 'title', autoIncrement: true}
      );
      store.createIndex('url', 'url', {unique: true});
      store.createIndex('title', 'title', {unique: true});
    }
  };
}

function save(storeName, obj, success, error){
  var request = indexedDB.open(storeName);

  request.onsuccess = function(e){

    var store = getObjectStore(storeName, 'readwrite');

    var requestAdd = store.add(obj);

    requestAdd.onsuccess = function(evt){
      success();
    };

    requestAdd.onerror = function(evt){
      error(evt.target.error.name);
    };
  };
}

function getAll(storeName, callback){
  var tx = db.transaction(storeName, 'readonly');
  var store = tx.objectStore(storeName);
  var items = [];

  tx.oncomplete = function (e){
    callback(items);
  };

  var cursorRequest = store.openCursor();

  cursorRequest.onerror = function(error){
    console.log(error);
  };

  cursorRequest.onsuccess = function(e){
    var cursor = e.target.result;
    if (cursor) {
      items.push(cursor.value);
      cursor.continue();
    }
  };
}

function getObjectStore(storeName, mode) {
  var tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

function clearObjectStore(storeName) {
  var store = getObjectStore(storeName, 'readwrite');
  var req = store.clear();
  req.onsuccess = function(e){
    //Show store was cleared somehow
  };

  req.onerror = function(e){
    console.error("clearObjectStore:", e.target.errorCode);
  };
}