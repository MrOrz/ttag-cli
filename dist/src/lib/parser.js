"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gettext_parser_1 = require("gettext-parser");
require("../declarations");
function parse(str) {
    return gettext_parser_1.po.parse(str);
}
exports.parse = parse;
