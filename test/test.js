"use strict";

const wrapByPromise = require("../lib/wrap-by-promise.js");
const fs = require("fs");

const readfile = wrapByPromise(fs.readFile, 2, true, ["data"]);

(async _ => {
    const { data } = await readfile("./test/hello.txt", "utf-8");
    console.log(data);
})();
