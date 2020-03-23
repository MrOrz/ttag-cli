"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var update_1 = require("../../src/lib/update");
test("updatePo. Should add new message", function () {
    var pot = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {
                test: {
                    msgid: "test",
                    comments: {},
                    msgstr: [""]
                }
            }
        }
    };
    var po = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {}
        }
    };
    var resultPo = update_1.updatePo(pot, po);
    expect(resultPo.translations[""]).toHaveProperty("test");
});
test("updatePo. Should update existing", function () {
    var pot = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {
                test: {
                    msgid: "test",
                    comments: {
                        reference: "path.js:2"
                    },
                    msgstr: [""]
                }
            }
        }
    };
    var po = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {
                test: {
                    msgid: "test",
                    comments: {
                        reference: "path.js:1"
                    },
                    msgstr: ["test trans"]
                }
            }
        }
    };
    var resultPo = update_1.updatePo(pot, po);
    expect(Object.keys(resultPo.translations[""]).length).toBe(1);
    expect(resultPo.translations[""]).toHaveProperty("test");
    expect(resultPo.translations[""]["test"].msgstr).toEqual(["test trans"]);
    expect(resultPo.translations[""]["test"].comments).toEqual({
        reference: "path.js:2"
    });
});
test("updatePo. Should remove obsolete messages", function () {
    var pot = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {
                test: {
                    msgid: "test",
                    comments: {
                        reference: "path.js:2"
                    },
                    msgstr: [""]
                }
            }
        }
    };
    var po = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {
                test: {
                    msgid: "test",
                    comments: {
                        reference: "path.js:1"
                    },
                    msgstr: ["test trans"]
                },
                old: {
                    msgid: "old",
                    comments: {
                        reference: "path.js:10"
                    },
                    msgstr: ["old trans"]
                }
            }
        }
    };
    var resultPo = update_1.updatePo(pot, po);
    expect(Object.keys(resultPo.translations[""]).length).toBe(1);
    expect(resultPo.translations[""]).toHaveProperty("test");
    expect(resultPo.translations[""]).not.toHaveProperty("old");
});
test("updatePo. Should not overwrite headers", function () {
    var pot = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {
                "": {
                    msgid: "",
                    msgstr: ["header_pot"]
                },
                test: {
                    msgid: "test",
                    comments: {
                        reference: "path.js:2"
                    },
                    msgstr: [""]
                }
            }
        }
    };
    var po = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {
                "": {
                    msgid: "",
                    msgstr: ["header_po"]
                },
                test: {
                    msgid: "test",
                    comments: {
                        reference: "path.js:1"
                    },
                    msgstr: ["test trans"]
                }
            }
        }
    };
    var resultPo = update_1.updatePo(pot, po);
    expect(resultPo.translations[""][""].msgstr).toEqual(["header_po"]);
});
test("updatePo. Should use appropriate number of plural forms", function () {
    var pot = {
        headers: {
            "plural-forms": "nplurals=2; plural=(n!=1);\n"
        },
        translations: {
            "": {
                banana: {
                    msgid: "banana",
                    msgid_plural: "bananas",
                    msgstr: ["", ""]
                }
            }
        }
    };
    var po = {
        headers: {
            "plural-forms": "nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : " +
                "n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);"
        },
        translations: {
            "": {}
        }
    };
    var resultPo = update_1.updatePo(pot, po);
    expect(resultPo.translations[""]["banana"].msgstr).toEqual(["", "", ""]);
});
