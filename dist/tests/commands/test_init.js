"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var child_process_1 = require("child_process");
var poPath = path.resolve(__dirname, "../../dist/uk.po");
function cleanup() {
    fs.unlinkSync(poPath);
}
test("should init uk locale", function () {
    child_process_1.execSync("ts-node src/index.ts init uk " + poPath);
    var result = fs.readFileSync(poPath).toString();
    expect(result).toMatchSnapshot();
    cleanup();
});
test("should init en locale", function () {
    child_process_1.execSync("ts-node src/index.ts init en " + poPath);
    var result = fs.readFileSync(poPath).toString();
    expect(result).toMatchSnapshot();
    cleanup();
});
test("should handle unknown lang code properly", function () {
    try {
        child_process_1.execSync("ts-node src/index.ts init enn " + poPath);
    }
    catch (err) {
        expect(err.status).toBe(1);
        expect(err.stderr.toString()).toContain("Unknown lang code");
    }
});
