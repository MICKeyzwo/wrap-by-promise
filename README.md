# wrap-by-promise
wrap function to receive callback by promise

## Example

```js
//require wrap-by-promise
const wrapByPromise = require("wrap-by-promise");

//fs.readFile : function to receive callback...
require("fs").readFile("./hello.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
});

//let's wrap above function!
const readfile = wrapByPromise(require("fs").readFile, 2, true, ["data"]);

//and exec promise!
readfile("./hello.txt", "utf-8")
.then(res => console.log(res.data))
.catch(err => { throw err; });
```

## API

`wrapByPromise(func: Function, ?cbpos: Number, ?erropt: Boolean, ?names: Array<String>)`

- func : Function to receive callback.
- cbpos : The position of callback on above function's arguments. (optional)
- erropt : If callback function received error data at the top of arguments, this flag should be true. (optional)
- names : The list of names of arguments which give to the callback. (optional)
