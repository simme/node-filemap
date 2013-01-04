Filemap
-------

Quickly load a collection of filepaths.

Produces an object where the filepaths are the keys and the content is the
value.

# Installation

`npm install filemap`

# API

`filemap(filepaths, [encoding], callback);`

# Usage

Load an array of files as raw buffers:

```js
var filemap = require('filemap');
filemap(['foo/fuu.txt', 'omg.lol'], function (files) {
  console.log(files);
});
```

Would output something like:
```
{ 'foo/fuu.txt': < 08 23 23 23 42 >,
  'omg.lol': < 34 24 25 64 45 >
}
```

Load an object of files with utf-8 encoding:

```js
var filemap = require('filemap');
filemap({'foo/fuu.txt': false, 'lol.bbq': false}, 'utf-8', function (files) {
  console.log(files);
});
```

Would output something like:
```
{ 'foo/fuu.txt': 'you sir, are awesome!',
  'omg.lol': false // If this file didn't exist
}
```

# License
ISC

