"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var child_process_1 = require("child_process");
var poPaths = [
    path.resolve(__dirname, "../fixtures/mergeTest/mergeLeft.po"),
    path.resolve(__dirname, "../fixtures/mergeTest/mergeRight.po"),
    path.resolve(__dirname, "../fixtures/mergeTest/mergeRightRight.po")
].join(" ");
var poWithEncoding = path.resolve(__dirname, "../fixtures/mergeTest/merge-with-encoding.po");
test("merge two files together", function () {
    var result = child_process_1.execSync("ts-node src/index.ts merge " + poPaths);
    var expectStr = expect(result.toString());
    expectStr.toContain('msgstr "test translated"');
    expectStr.toMatchSnapshot();
});
test("merge with encoding (regression for the issue - https://github.com/ttag-org/ttag-cli/issues/56", function () {
    var result = child_process_1.execSync("ts-node src/index.ts merge " + poWithEncoding + " " + poWithEncoding);
    var resultStr = result.toString();
    expect(resultStr).toContain('msgstr "Ŭşḗř ${ match.params.id }"');
});
