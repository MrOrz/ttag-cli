"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_1 = require("../../src/lib/merge");
test("mergePo. Should merge with default config", function () {
    var poData1 = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {
                test: {
                    msgid: "test",
                    comments: {},
                    msgstr: ["test trans"]
                }
            }
        }
    };
    var poData2 = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {
                test2: {
                    msgid: "test2",
                    comments: {},
                    msgstr: ["test2 trans"]
                }
            }
        }
    };
    var resultPo = merge_1.mergePo(poData1, poData2);
    expect(resultPo.translations[""]).toHaveProperty("test");
    expect(resultPo.translations[""]).toHaveProperty("test2");
});
