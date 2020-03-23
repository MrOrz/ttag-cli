"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var parser_1 = require("../lib/parser");
var ora = require("ora");
var chalk_1 = require("chalk");
var utils_1 = require("../lib/utils");
var spell_1 = require("../lib/spell");
var print_1 = require("../lib/print");
var cleanRe = new RegExp(/[;:,.?"'!\(\)«»]/g);
function spell(path, locale) {
    // Force color output even on tty, otherwise this command is useless
    chalk_1.default.enabled = true;
    chalk_1.default.level = 1;
    var data = fs.readFileSync(path).toString();
    var poData = parser_1.parse(data);
    locale = locale || poData.headers.language;
    if (!locale) {
        console.log("Cannot detect locale from pofile, please provide it");
        return;
    }
    var loadProgress = ora("Loading dict for " + locale + "...");
    loadProgress.start();
    spell_1.getChecker(locale).then(function (checker) {
        var e_1, _a, e_2, _b;
        loadProgress.succeed(locale + " dict loaded");
        var checkProgress = ora("Checking pofile " + path + "...\n\n");
        checkProgress.start();
        var messages = utils_1.iterateTranslations(poData.translations);
        messages.next(); // skip headers
        try {
            for (var messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                var msg = messages_1_1.value;
                var hasErrors = false;
                for (var i = 0; i < msg.msgstr.length; i++) {
                    try {
                        for (var _c = (e_2 = void 0, __values(msg.msgstr[i].split(" "))), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var word = _d.value;
                            var cleanWord = word.replace(cleanRe, "");
                            if (cleanWord && !checker.check(cleanWord)) {
                                msg.msgstr[i] = msg.msgstr[i].replace(cleanWord, chalk_1.default.underline.bgRed(cleanWord));
                                hasErrors = true;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (hasErrors) {
                    print_1.printMsg(msg);
                    console.log("\n");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        checkProgress.succeed(path + " checked");
    });
}
exports.default = spell;
