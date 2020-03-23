"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var child_process_1 = require("child_process");
var poPath = path.resolve(__dirname, "../fixtures/statsTest/stats.po");
test("display basic file stats", function () {
    var result = child_process_1.execSync("ts-node src/index.ts stats " + poPath).toString();
    expect(result).toMatchSnapshot();
});
