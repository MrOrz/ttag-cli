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
var chalk_1 = require("chalk");
var print_1 = require("../lib/print");
var utils_1 = require("../lib/utils");
var validation_1 = require("../lib/validation");
function validate(path) {
    var e_1, _a;
    // Force color output even on tty, otherwise this command is useless
    chalk_1.default.enabled = true;
    chalk_1.default.level = 1;
    var hasErrors = false;
    var data = fs.readFileSync(path).toString();
    var poData = parser_1.parse(data);
    var messages = utils_1.iterateTranslations(poData.translations);
    messages.next(); // skip headers
    try {
        for (var messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
            var msg = messages_1_1.value;
            var invalid = false;
            for (var i = 0; i < msg.msgstr.length; i++) {
                if (!msg.msgstr[i]) {
                    continue;
                }
                var result = validation_1.checkFormat(msg.msgid, msg.msgstr[0]);
                if (!result.valid) {
                    invalid = true;
                    msg.msgstr[i] = chalk_1.default.underline.bgRed(msg.msgstr[i]);
                    var missing = result.missing.length
                        ? "missing " + result.missing.join(" and ")
                        : "";
                    var redundant = result.redundant.length
                        ? "redundant " + result.redundant.join(" and ")
                        : "";
                    var explanation = chalk_1.default.green([missing, redundant].filter(function (s) { return !!s; }).join(" but "));
                    msg.msgstr[i] += " <--- " + explanation + ";";
                }
                if (invalid) {
                    hasErrors = true;
                    print_1.printMsg(msg);
                    console.log("\n");
                }
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
    if (hasErrors) {
        throw new Error("Errors during validation");
    }
}
exports.default = validate;
