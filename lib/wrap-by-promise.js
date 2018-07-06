"use strict";

const typeMatch = require("./type-matcher.js");

const patNameToObject = (names, values) => names.reduce((res, name, idx) => {res[name] = values[idx]; return res;}, {});

const wrapByPromise = (func, cbpos, erropt, names) => {
    typeMatch([func, cbpos, erropt, names], {
        "Function": _ => { cbpso = func.length - 1; },
        "Function, Number": null,
        "Function, Boolean": _ => { erropt = cbpos; cbpos = func.length - 1; },
        "Function, Array": _ => { names = cbpos; cbpos = func.length - 1; erropt = false },
        "Function, Number, Boolean": null,
        "Function, Number, Array": _ => { names = erropt; erropt = false; },
        "Function, Boolean, Array": _ => { names = erropt; erropt = cbpos; cbpos = func.length - 1; },
        "Function, Number, Boolean, Array": null,
        "other": _ => { throw new TypeError("invalid argumens."); }
    });
    return (...args) => new Promise((res, rej) => 
        func(...[...args.slice(0, cbpos), 
            (err, ...a) => erropt ? 
                (err ? 
                    rej(err) : 
                    res(Array.isArray(names) ? 
                        patNameToObject(names, a) : 
                        a
                    )
                ) :
                res(Array.isArray(names) ? 
                    patNameToObject(names, [err, ...a]) : 
                    [err, ...a]
                ), 
            ...args.slice(cbpos, args.length)
        ])
    );
};

module.exports = wrapByPromise;
