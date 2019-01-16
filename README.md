# wrap-by-promise
`wrap-by-promise` promisify function to receive callback.

It's works like `util.promisify` as default.

however, `wrap-by-promise` can promisify a function wich **NOT** apply to common error-first callback style!

## Installation
```bash
npm i wrap-by-promise
```

## Example

```js
// test/test.js
// require wrap-by-promise
const wrap = require("../build/wrap-by-promise").wrapByPromise;

// fs.readFile : function to receive callback...
const { readFile } = require("fs");
readFile("./test/hello.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log({ data });
});

// let's wrap above function!
// wrap-by-promise works like util.promisify as default.
const _readfile = wrap(readFile);

// and get promise!
_readfile("./test/hello.txt", "utf-8")
    .then(res => console.log({ res }))
    .catch(err => { throw err; });

// it's able to use in async function with await!
(async _ => {
    try {
        const data = await _readfile("./test/hello.txt", "utf-8");
        console.log({ data })
    } catch (e) {
        throw e;
    }
})();

// also, you can promisify a function which NOT apply to common error-first callback style!
const sleep = wrap(setTimeout, 0);
sleep(3000).then(_ => console.log("Hi!"));
```

## API

`wrapByPromise(func: Function, ?cbpos: number, ?errpos: number, ?names: Array<string>)`

- func : Function to receive callback. If callback function got only one argument, Promise's resolve function get one value as argument. Otherwise, resolve function get an array as argument. If `names` argument was set, resolve function get object data.
- cbpos (optional) : The position of a callback on above function's arguments. The default value is `func.length - 1`.
- erropt (optional) : The position of error data on callback function's arguments. The default value is `0`. If a callback function does not receive error data, you have to set this value to `-1`.
- names (optional) : The list of names of arguments which give to the callback. The default value is `undefined`.
