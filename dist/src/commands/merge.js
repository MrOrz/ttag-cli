"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var serializer_1 = require("../lib/serializer");
var merge_1 = require("../lib/merge");
var parser_1 = require("../lib/parser");
/* Read and parse file path into poData */
function read(path) {
    return parser_1.parse(fs.readFileSync(path).toString());
}
/* Entry point */
function merge(paths) {
    process.stdout.write(serializer_1.serialize(paths.map(read).reduce(merge_1.mergePo)));
}
exports.default = merge;
