"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gettext_parser_1 = require("gettext-parser");
function serialize(poData) {
    return gettext_parser_1.po.compile(poData);
}
exports.serialize = serialize;
