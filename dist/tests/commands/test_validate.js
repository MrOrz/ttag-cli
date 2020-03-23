"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var validation_1 = require("../../src/lib/validation");
var child_process_1 = require("child_process");
var poPath = path.resolve(__dirname, "../fixtures/validateTest/validate.po");
test("parse template string", function () {
    var identifiers = validation_1.parseTemplateString("${x} and ${y}");
    expect(Array.from(identifiers.values()).join("|")).toBe("x|y");
    var callexpressions = validation_1.parseTemplateString("${x()} and ${y()}");
    expect(Array.from(callexpressions.values()).join("|")).toBe("x()|y()");
    var taggedexpression = validation_1.parseTemplateString("${x + z} and ${y()*5}");
    expect(Array.from(taggedexpression.values()).join("|")).toBe("x + z|y() * 5");
    // should work with upper case characters as variables (regression)
    var uppercaseVariables = validation_1.parseTemplateString("${X} and ${Y}");
    expect(Array.from(uppercaseVariables.values()).join("|")).toBe("X|Y");
});
test("invalid format checks", function () {
    var result = validation_1.checkFormat("${x}", "${y}");
    expect(result.valid).toBe(false);
    expect(result.missing.join("")).toBe("x");
    expect(result.redundant.join("")).toBe("y");
});
test("command integrity test", function () {
    try {
        child_process_1.execSync("ts-node src/index.ts validate " + poPath);
    }
    catch (err) {
        expect(err.status).toBe(1);
    }
});
