# wrap-by-promise
wrap function to receive callback by promise

## Example

```js
//require wrap-by-promise
const wrapByPromise = require("../lib/wrap-by-promise");

//fs.readFile : function to receive callback...
const { readFile } = require("fs");
readFile("./hello.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
});

//let's wrap above function!
const _readfile = wrapByPromise(readFile, 2, true);

//and exec promise!
_readfile("./hello.txt", "utf-8")
.then(res => console.log(res))
.catch(err => { throw err; });

//also, it's able to use in asyn function!
(async _ => {
    try {
        const data = await _readfile("./hello.txt", "utf-8");
        console.log(data)
    } catch (e) {
        throw e;
    }
})();
```

## API

`wrapByPromise(func: Function, ?cbpos: Number, ?erropt: Boolean, ?names: Array<String>)`

- func : Function to receive callback. If callback function got only one argument, Promise's resolve function get one value as argument. Otherwise, resolve function get an array as argument. If `names` argument was set, resolve function get object data.
- cbpos (optional) : The position of callback on above function's arguments. The default value is `func.length - 1`.
- erropt (optional) : If callback function received error data at the top of arguments, this flag should be true. The defaule value is `false`.
- names (optional) : The list of names of arguments which give to the callback. The default value is `undefined`.
