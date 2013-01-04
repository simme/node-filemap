//
// # Filemap
//
// Takes an array of filepaths or an object with filenames as it's keys,
// loads all the files and returns an object with the filenames as keys and
// filedata as the value.
//
var exists   = require('fs').exists;
var readfile = require('fs').readFile;

module.exports = function (map, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding;
    encoding = null;
  }

  var i, len;
  if (Array.isArray(map)) {
    var tmp = {};
    for (i = 0, len = map.length; i < len; i++) {
      tmp[map[i]] = false;
    }
    map = tmp;
  }

  var properties = Object.getOwnPropertyNames(map);
  var result = {};
  function loadFile(path) {
    if (!path) {
      callback(result);
      return;
    }

    exists(path, function (exists) {
      if (!exists) {
        result[path] = false;
        loadFile(properties.shift());
      }
      else {
        readfile(path, encoding, function (err, data) {
          if (err) {
            result[path] = false;
          }
          else {
            result[path] = data;
          }
          loadFile(properties.shift());
        });
      }
    });
  }

  loadFile(properties.shift());
};

