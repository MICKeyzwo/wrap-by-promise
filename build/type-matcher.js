"use strict";
exports.__esModule = true;
var type_getter_1 = require("./type-getter");
exports.typeMatch = function (args, patterns, other) {
    var pat = {};
    Object.keys(patterns).forEach(function (p) {
        var _p = p.replace(/\s/g, "");
        pat[_p] = patterns[p];
        if (_p == "other")
            other = patterns[p];
    });
    var argT = "";
    args.forEach(function (a, i) {
        var type = type_getter_1.getType(a);
        if (type != "Undefined") {
            i && (argT += ",");
            argT += type;
        }
    });
    if (argT in pat) {
        if (typeof pat[argT] == "function")
            pat[argT].apply(pat, args);
        return;
    }
    if (typeof other == "function")
        other.apply(void 0, args);
};
