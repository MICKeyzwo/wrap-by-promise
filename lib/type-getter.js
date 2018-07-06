"use strict";

function getType (arg) {
    let str = Object.prototype.toString.call(arg).split(" ")[1];
    str = str.substr(0, str.length - 1);
    if(str != "Object") return str;
    str = arg.constructor.toString().split(" ")[1].split("(");
    return str[0];
}

module.exports = getType;
