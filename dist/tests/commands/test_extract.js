"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import '../fixtures/declarations';
var path = require("path");
var fs = require("fs");
var child_process_1 = require("child_process");
var potPath = path.resolve(__dirname, "../../dist/translation.pot");
var baseTestPath = path.resolve(__dirname, "../fixtures/baseTest");
var sortByMsgidPath = path.resolve(__dirname, "../fixtures/sortByMsgidTest");
var ukTestPath = path.resolve(__dirname, "../fixtures/ukLocaleTest");
var jsxPath = path.resolve(__dirname, "../fixtures/testJSXParse.jsx");
var vuePath = path.resolve(__dirname, "../fixtures/testVueParse.vue");
var sveltePath = path.resolve(__dirname, "../fixtures/testSvelteParse.svelte");
var globalFn = path.resolve(__dirname, "../fixtures/globalFunc.js");
var tsPath = path.resolve(__dirname, "../fixtures/tSParse.ts");
var tsChaning = path.resolve(__dirname, "../fixtures/tsOptionalChaning.ts");
var tsCoalescing = path.resolve(__dirname, "../fixtures/tsNullishCoalescing.ts");
var tsxPath = path.resolve(__dirname, "../fixtures/tSXParse.tsx");
function cleanup() {
    fs.unlinkSync(potPath);
}
afterEach(function () {
    cleanup();
});
test("extract base case", function () {
    child_process_1.execSync("ts-node src/index.ts extract -o " + potPath + " " + baseTestPath);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toMatchSnapshot();
});
test("extract from jsx", function () {
    child_process_1.execSync("ts-node src/index.ts extract -o " + potPath + " " + jsxPath);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toMatchSnapshot();
});
test("extract from vue", function () {
    child_process_1.execSync("ts-node src/index.ts extract -o " + potPath + " " + vuePath);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toMatchSnapshot();
});
test.only("extract from svelte", function () {
    child_process_1.execSync("ts-node src/index.ts extract -o " + potPath + " " + sveltePath);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toMatchSnapshot();
});
test("extract from ts", function () {
    child_process_1.execSync("ts-node src/index.ts extract -o " + potPath + " " + tsPath);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toMatchSnapshot();
});
test("extract from tsx", function () {
    child_process_1.execSync("ts-node src/index.ts extract -o " + potPath + " " + tsxPath);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toMatchSnapshot();
});
test("extract from js with another default locale", function () {
    child_process_1.execSync("ts-node src/index.ts extract -l uk -o " + potPath + " " + ukTestPath);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toMatchSnapshot();
});
test("should override babel plugin settings", function () {
    child_process_1.execSync("ts-node src/index.ts extract --discover=_ -o " + potPath + " " + globalFn);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toContain('msgid "test _"');
});
test("should extract with numberedExpressions", function () {
    child_process_1.execSync("ts-node src/index.ts extract --numberedExpressions -o " + potPath + " " + baseTestPath);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toContain("test translation 2 ${ 0 }");
});
test("should extract with extract.location", function () {
    child_process_1.execSync("ts-node src/index.ts extract --extractLocation=never -o " + potPath + " " + baseTestPath);
    var result = fs.readFileSync(potPath).toString();
    expect(result).not.toContain("#: tests/fixtures/baseTest");
});
test("should extract in the alphabetical order (sortByMsgid)", function () {
    child_process_1.execSync("ts-node src/index.ts extract --sortByMsgid -o " + potPath + " " + sortByMsgidPath);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toMatchSnapshot();
});
test("extract from ts", function () {
    child_process_1.execSync("ts-node src/index.ts extract -o " + potPath + " " + tsChaning);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toMatchSnapshot();
});
test("extract from ts", function () {
    child_process_1.execSync("ts-node src/index.ts extract -o " + potPath + " " + tsCoalescing);
    var result = fs.readFileSync(potPath).toString();
    expect(result).toMatchSnapshot();
});
