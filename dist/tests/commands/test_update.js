"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var child_process_1 = require("child_process");
var tmp = require("tmp");
var originalPo = "msgid \"\"\nmsgstr \"\"\n\"Content-Type: text/plain; charset=utf-8\n\"\n\"Plural-Forms: nplurals=2; plural=(n!=1);\n\"\n\n\nmsgid \"old\"\nmsgstr \"old trans\"\n\nmsgid \"obsolete\"\nmsgstr \"obsolete trans\"\n";
var srcPath = path.resolve(__dirname, "../fixtures/updateTest/test.js");
test("test update po", function () {
    var tmpFile = tmp.fileSync();
    fs.writeFileSync(tmpFile.name, originalPo);
    child_process_1.execSync("ts-node src/index.ts update " + tmpFile.name + " " + srcPath);
    var result = fs.readFileSync(tmpFile.name).toString();
    expect(result).toMatchSnapshot();
    tmpFile.removeCallback();
});
test("test for plugin override", function () {
    var tmpFile = tmp.fileSync();
    fs.writeFileSync(tmpFile.name, originalPo);
    child_process_1.execSync("ts-node src/index.ts update --discover=_  " + tmpFile.name + " " + srcPath);
    var result = fs.readFileSync(tmpFile.name).toString();
    expect(result).toContain('msgid "discover _ test"');
    tmpFile.removeCallback();
});
test("test update with multiple discover po (plugins settings override test)", function () {
    var tmpFile = tmp.fileSync();
    fs.writeFileSync(tmpFile.name, originalPo);
    child_process_1.execSync("ts-node src/index.ts update --discover=_ --discover=gettext " + tmpFile.name + " " + srcPath);
    var result = fs.readFileSync(tmpFile.name).toString();
    expect(result).toContain('msgid "discover _ test"');
    tmpFile.removeCallback();
});
test("should sort the output alphabetically (apply sortByMsgid option)", function () {
    var tmpFile = tmp.fileSync();
    fs.writeFileSync(tmpFile.name, originalPo);
    child_process_1.execSync("ts-node src/index.ts update --sortByMsgid " + tmpFile.name + " " + srcPath);
    var result = fs.readFileSync(tmpFile.name).toString();
    expect(result).toMatchSnapshot();
    tmpFile.removeCallback();
});
var commentsTest = path.resolve(__dirname, "../fixtures/updateTest/comments.jsx");
test("should extract comments by default", function () {
    var tmpFile = tmp.fileSync();
    fs.writeFileSync(tmpFile.name, originalPo);
    child_process_1.execSync("ts-node src/index.ts update " + tmpFile.name + " " + commentsTest);
    var result = fs.readFileSync(tmpFile.name).toString();
    expect(result).toContain("#. translator: test comment");
    expect(result).toContain("#. translator: jsx test comment");
    tmpFile.removeCallback();
});
var contextTest = path.resolve(__dirname, "../fixtures/updateTest/context.jsx");
test("should extract from context", function () {
    var tmpFile = tmp.fileSync();
    fs.writeFileSync(tmpFile.name, originalPo);
    child_process_1.execSync("ts-node src/index.ts update " + tmpFile.name + " " + contextTest);
    var result = fs.readFileSync(tmpFile.name).toString();
    expect(result).toContain('msgctxt "email"');
    expect(result).toContain('msgid "context translation"');
    tmpFile.removeCallback();
});
