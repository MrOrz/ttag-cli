"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var child_process_1 = require("child_process");
var poPath = path.resolve(__dirname, "../fixtures/checkTest/check.po");
var checkPass = path.resolve(__dirname, "../fixtures/checkTest/check-trans-exist.js");
var checkNotPass = path.resolve(__dirname, "../fixtures/checkTest/check-trans-not-exist.js");
var checkInvalidFormat = path.resolve(__dirname, "../fixtures/checkTest/check-trans-invalid-format.js");
var checkInvalidFormatDiscover = path.resolve(__dirname, "../fixtures/checkTest/check-invalid-format-discover.js");
test("check when all string are translated", function () {
    var result = child_process_1.execSync("ts-node src/index.ts check " + poPath + " " + checkPass);
    expect(result.toString()).toMatchSnapshot();
});
test("check when some translation is missing", function () {
    try {
        child_process_1.execSync("ts-node src/index.ts check " + poPath + " " + checkNotPass);
        expect(false).toBe(true); // must fail anyway
    }
    catch (err) {
        expect(err.status).toBe(1);
        expect(err.stderr.toString()).toContain("Translation 'test not test' is not found");
        expect(err.stderr.toString()).toContain("[ttag] has found 1 untranslated string(s)");
    }
});
test("validation for translations fromat", function () {
    try {
        child_process_1.execSync("ts-node src/index.ts check " + poPath + " " + checkInvalidFormat);
        expect(false).toBe(true); // must fail anyway
    }
    catch (err) {
        expect(err.status).toBe(1);
        expect(err.stderr.toString()).toContain("Can not translate '${name}'");
    }
});
test("plugin settings override test", function () {
    try {
        child_process_1.execSync("ts-node src/index.ts check --discover=_ " + poPath + " " + checkInvalidFormatDiscover);
        expect(false).toBe(true); // must fail anyway
    }
    catch (err) {
        expect(err.status).toBe(1);
        console.log(err.stderr.toString());
        expect(err.stderr.toString()).toContain("You can not use Identifier 'name' as an argument to gettext");
    }
});
