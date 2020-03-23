"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var translate_1 = require("../../src/commands/translate");
var serializer_1 = require("../../src/lib/serializer");
var poPath = path.resolve(__dirname, "../fixtures/translateTest/translate.po");
test("translate poFile", function () {
    var poData = translate_1.read(poPath);
    var stream = translate_1.untranslatedStream(poData.translations);
    // skip first message(empty msgid in header)
    stream.next();
    stream.next("");
    stream.next(["test"]);
    stream.next(["test1", "test2"]);
    var data = serializer_1.serialize(poData).toString();
    expect(data).toMatchSnapshot();
});
