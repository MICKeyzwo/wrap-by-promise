"use strict";

import { getType } from "./type-getter";

export const typeMatch = (args: Array<string>, patterns, other?: Function) => {
    const pat = {};
    Object.keys(patterns).forEach(p => {
        let _p = p.replace(/\s/g, "");
        pat[_p] = patterns[p];
        if (_p == "other") other = patterns[p];
    });
    let argT = "";
    args.forEach((a, i) => {
        const type = getType(a);
        if (type != "Undefined") {
            i && (argT += ",");
            argT += type;
        }
    });
    if (argT in pat) {
        if (typeof pat[argT] == "function") pat[argT](...args);
        return;
    }
    if (typeof other == "function") other(...args);
}
