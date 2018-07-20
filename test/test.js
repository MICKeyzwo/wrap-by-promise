//require wrap-by-promise
const wrapByPromise = require("../lib/wrap-by-promise");

//fs.readFile : function to receive callback...
const { readFile } = require("fs");
readFile("./hello.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log({ data });
});

//let's wrap above function!
const _readfile = wrapByPromise(readFile, 2, true);

//and exec promise!
_readfile("./hello.txt", "utf-8")
.then(res => console.log({ res }))
.catch(err => { throw err; });

//also, it's able to use in asyn function!
(async _ => {
    try {
        const data = await _readfile("./hello.txt", "utf-8");
        console.log({ data })
    } catch (e) {
        throw e;
    }
})();
