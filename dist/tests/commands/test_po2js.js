"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var child_process_1 = require("child_process");
var poPath = path.resolve(__dirname, "../fixtures/po2jsTest/po2js.po");
test("convert po to js", function () {
    var result = child_process_1.execSync("ts-node src/index.ts po2json " + poPath).toString();
    expect(result).toMatchSnapshot();
});
test("convert po to js pretty", function () {
    var result = child_process_1.execSync("ts-node src/index.ts po2json -p " + poPath).toString();
    expect(result).toMatchSnapshot();
});
test("convert po to js nostrip", function () {
    var result = child_process_1.execSync("ts-node src/index.ts po2json -n " + poPath).toString();
    expect(result).toMatchSnapshot();
});
test("should apply compact format", function () {
    var result = child_process_1.execSync("ts-node src/index.ts po2json --format=compact -n " + poPath).toString();
    var jsonResult = JSON.parse(result);
    expect(jsonResult).toHaveProperty("contexts");
    expect(result).toMatchSnapshot();
});
