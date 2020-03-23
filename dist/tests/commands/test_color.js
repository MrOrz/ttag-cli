"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var child_process_1 = require("child_process");
var poPath = path.resolve(__dirname, "../fixtures/colorTest/color.po");
test("colorize test file", function () {
    var result = child_process_1.execSync("ts-node src/index.ts color " + poPath).toString();
    expect(result).toMatchSnapshot();
});
