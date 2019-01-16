"use strict";
exports.__esModule = true;
var type_matcher_js_1 = require("./type-matcher.js");
var patNameToObject = function (names, values) { return names.reduce(function (res, name, idx) { res[name] = values[idx]; return res; }, {}); };
exports.wrapByPromise = function (func, cbpos, errpos, names) {
    type_matcher_js_1.typeMatch([func, cbpos, errpos, names], {
        "Function": function (_) { cbpos = func.length - 1; errpos = 0; },
        "Function, Number": function (_) { errpos = 0; },
        "Function, Array": function (_) { names = cbpos; cbpos = func.length - 1; errpos = 0; },
        "Function, Number, Number": null,
        "Function, Number, Array": function (_) { names = errpos; errpos = 0; },
        "Function, Number, Number, Array": null,
        "other": function (_) { throw new TypeError("invalid argumens."); }
    });
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (res, rej) {
            return func.apply(void 0, args.slice(0, cbpos).concat([function (err) {
                    var a = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        a[_i - 1] = arguments[_i];
                    }
                    return errpos >= 0 ?
                        (err ?
                            rej(err) :
                            res(Array.isArray(names) ?
                                patNameToObject(names, a) :
                                a.length > 1 ? a : a[0])) :
                        res(Array.isArray(names) ?
                            patNameToObject(names, [err].concat(a)) :
                            a.length > 0 ? [err].concat(a) : err);
                }], args.slice(cbpos, args.length)));
        });
    };
};
