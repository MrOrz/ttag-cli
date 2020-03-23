"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var child_process_1 = require("child_process");
var tmp = require("tmp");
var replaceDirPath = path.resolve(__dirname, "../fixtures/replaceTest");
var poPath = path.join(replaceDirPath, "translations.po");
test("replace translations", function () {
    var tmpFolder = tmp.dirSync();
    child_process_1.execSync("ts-node src/index.ts replace " + poPath + " " + tmpFolder.name + " " + replaceDirPath);
    var testFile = fs
        .readFileSync(path.join(tmpFolder.name, "test.js"))
        .toString();
    var nestedFile = fs
        .readFileSync(path.join(tmpFolder.name, "nested/test2.js"))
        .toString();
    expect(testFile).toMatchSnapshot();
    expect(nestedFile).toMatchSnapshot();
});
test("override babel defaults", function () {
    var tmpFolder = tmp.dirSync();
    child_process_1.execSync("ts-node src/index.ts replace --discover=_ " + poPath + " " + tmpFolder.name + " " + replaceDirPath);
    var globalFile = fs
        .readFileSync(path.join(tmpFolder.name, "nested/global.js"))
        .toString();
    expect(globalFile).toContain("check _ translation");
});
