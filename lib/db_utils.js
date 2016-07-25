const DB_NAME = 'reactionary-indexeddb-library';
const DB_VERSION = 1;

var db;

function openDb(callback){
  var req = indexedDB.open(DB_NAME, DB_VERSION);

  req.onsuccess = function(e){
    db = this.result;
    if (callback){
      callback();
    }
  };

  req.onerror = function (e){
    console.error("openDb:", e.target.error);
  };

  req.onupgradeneeded = function(e){
    var idb = e.target.result;
    if (!idb.objectStoreNames.contains("images")){
      var store = idb.createObjectStore(
        "images", { keyPath: 'url', autoIncrement: true}
      );
      store.createIndex('url', 'url', {unique: true});
      store.createIndex('title', 'title', {unique: true});
    }
  };
}

function save(obj, success, error){
  var request = indexedDB.open(DB_NAME);

  request.onsuccess = function(e){
    var store = getObjectStore("images", 'readwrite');
    var requestAdd = store.add(obj);

    requestAdd.onsuccess = function(evt){
      success();
    };

    requestAdd.onerror = function(evt){
      error(evt.target.error.name);
    };
  };
}

function editUrl(obj, success, error){
  var request = indexedDB.open(DB_NAME);
  request.onsuccess = function (e) {
    var store = getObjectStore("images", "readwrite");
    var requestEdit = store.get(obj.url);

    requestEdit.onsuccess = function (evt){
      var data = evt.target.result;
      data.title = obj.title;

      var requestUpdate = store.put(data);

      requestUpdate.onsuccess = function (event){
        success();
      };

      requestUpdate.onerror = function(event){
        console.log(event.target.error.name);
      };
    };

    requestEdit.onerror = function(evt){
      console.log(evt.target.error.name);
    };
  };
}

function deleteUrl(obj, success, error){
  var request = indexedDB.open(DB_NAME);
  request.onsuccess = function(e){
    var store = getObjectStore("images", 'readwrite');
    var requestDel = store.delete(obj.title);

    requestDel.onsuccess = function(evt){
      success();
    };

    requestDel.onerror = function(evt){
      console.log(evt.target.error.name);
    };
  };
}

function getMatching(regexp, callback){
  var tx = db.transaction("images", 'readonly');
  var store = tx.objectStore("images");
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
      if (cursor.value.title.match(regexp) && items.length < 10){
        items.push(cursor.value);
        cursor.continue();
      }else{
        cursor.continue();
      }
    }
  };
}

function getAllUrls(callback){
  var tx = db.transaction("images", 'readonly');
  var store = tx.objectStore("images");
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
