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
var chalk_1 = require("chalk");
var shared_1 = require("gettext-parser/lib/shared");
/* Print formatted header */
function printHeader(headers) {
    process.stdout.write(chalk_1.default.blue(shared_1.generateHeader(headers)));
}
exports.printHeader = printHeader;
/* Print formatted comments if exists */
function printComments(comments) {
    var e_1, _a;
    if (!comments) {
        return;
    }
    if (!comments.reference) {
        return;
    }
    try {
        for (var _b = __values(comments.reference.split("\n")), _c = _b.next(); !_c.done; _c = _b.next()) {
            var comment = _c.value;
            process.stdout.write(chalk_1.default.blue("#: " + comment + "\n"));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (comments.flag === "fuzzy") {
        process.stdout.write(chalk_1.default.blue("#, fuzzy\n"));
    }
}
exports.printComments = printComments;
/* Print formatted context if exists */
function printContext(ctxt) {
    if (ctxt != "") {
        process.stdout.write(chalk_1.default.yellow("msgctxt") + " \"" + ctxt + "\"\n");
    }
}
exports.printContext = printContext;
/* Print formatted msgid */
function printMsgid(msgid) {
    process.stdout.write(chalk_1.default.yellow("msgid") + " \"" + msgid + "\"\n");
}
exports.printMsgid = printMsgid;
/* Print formatted msgstr */
function printMsgstr(msgstr) {
    if (msgstr.length > 1) {
        for (var i = 0; i < msgstr.length; i++) {
            process.stdout.write(chalk_1.default.yellow("msgstr[" + i + "]") + " \"" + msgstr[i] + "\"\n");
        }
    }
    else {
        process.stdout.write(chalk_1.default.yellow("msgstr") + " \"" + msgstr[0] + "\"\n");
    }
}
exports.printMsgstr = printMsgstr;
/* Print formatted msgid plural*/
function printMsgidPlural(msgid_plural) {
    if (!msgid_plural) {
        return;
    }
    process.stdout.write(chalk_1.default.yellow("msgid_plural:") + " \"" + msgid_plural + "\"\n");
}
exports.printMsgidPlural = printMsgidPlural;
/* Print full message */
function printMsg(msg) {
    printComments(msg.comments);
    printContext(msg.msgctxt || "");
    printMsgid(msg.msgid);
    printMsgidPlural(msg.msgid_plural);
    printMsgstr(msg.msgstr);
}
exports.printMsg = printMsg;
