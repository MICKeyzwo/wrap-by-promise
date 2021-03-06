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
