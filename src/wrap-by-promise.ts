"use strict";

import { typeMatch } from "./type-matcher.js";

const patNameToObject = (names: Array<string>, values: Array<string>): Object => names.reduce((res, name, idx) => {res[name] = values[idx]; return res;}, {});

export const wrapByPromise = (func, cbpos, errpos, names) => {
    typeMatch([func, cbpos, errpos, names], {
        "Function": _ => { cbpos = func.length - 1; errpos = 0; },
        "Function, Number": _ => { errpos = 0; },
        "Function, Array": _ => { names = cbpos; cbpos = func.length - 1; errpos = 0; },
        "Function, Number, Number": null,
        "Function, Number, Array": _ => { names = errpos; errpos = 0; },
        "Function, Number, Number, Array": null,
        "other": _ => { throw new TypeError("invalid argumens."); }
    });
    return (...args) => new Promise((res, rej) => 
        func(...[...args.slice(0, cbpos), 
            (err, ...a) => errpos >= 0 ? 
                (err ? 
                    rej(err) : 
                    res(Array.isArray(names) ? 
                        patNameToObject(names, a) : 
                        a.length > 1 ? a : a[0]
                    )
                ) :
                res(Array.isArray(names) ? 
                    patNameToObject(names, [err, ...a]) : 
                    a.length > 0 ? [err, ...a] : err
                ), 
            ...args.slice(cbpos, args.length)
        ])
    );
};
