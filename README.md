# lpat

List pattern finder. 

This javascript module can be used to find possible patterns from list of strings. At the moment lpat can find 
groups of items that follow a naming convention containing a numerical sequence index.

## Install

```
$ npm install --save lpat
```

## Usage

```js
const lpat = require('lpat');

const pattern = lpat(['IMG_0001.JPG', 'IMG_0002.JPG', 'IMG_0003.JPG']); 
// "IMG_000[1..3].JPG"

```

## License

MIT © [jacdebug](https://deepakjacob.com)
