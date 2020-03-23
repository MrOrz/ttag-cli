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
var utils_1 = require("./utils");
var template_1 = require("@babel/template");
var isoCodes = "http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html";
function langValidationMsg(language) {
    return "Unknown lang code \"" + language + "\".\nSee all available lang codes here - " + isoCodes;
}
exports.langValidationMsg = langValidationMsg;
/* Parse template string with babel and return a Set of template identifiers and tagged expressions */
function parseTemplateString(str) {
    var e_1, _a;
    var templates = new Set();
    var expressionStmt = template_1.default.ast("`" + str + "`");
    // I cannot into types
    var expression = expressionStmt.expression;
    try {
        for (var _b = __values(expression.expressions), _c = _b.next(); !_c.done; _c = _b.next()) {
            var node = _c.value;
            if (node.type == "Identifier" ||
                node.type == "CallExpression" ||
                node.type == "TaggedTemplateExpression" ||
                node.type == "BinaryExpression" ||
                node.type == "MemberExpression") {
                templates.add(utils_1.ast2Str(node));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return templates;
}
exports.parseTemplateString = parseTemplateString;
/* Compare to sets of templates and return missing/redundant lists */
function checkFormat(msgid, msgstr) {
    var e_2, _a, e_3, _b;
    var result = {
        valid: true,
        missing: [],
        redundant: []
    };
    if (msgid.indexOf("${") == -1 && msgstr.indexOf("${") == -1) {
        return result;
    }
    var parsedId, parsedStr;
    try {
        parsedId = parseTemplateString(msgid);
        parsedStr = parseTemplateString(msgstr);
    }
    catch (e) {
        result.valid = false;
        return result;
    }
    try {
        for (var parsedId_1 = __values(parsedId), parsedId_1_1 = parsedId_1.next(); !parsedId_1_1.done; parsedId_1_1 = parsedId_1.next()) {
            var elem = parsedId_1_1.value;
            if (!parsedStr.has(elem)) {
                result.missing.push(elem);
                result.valid = false;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (parsedId_1_1 && !parsedId_1_1.done && (_a = parsedId_1.return)) _a.call(parsedId_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var parsedStr_1 = __values(parsedStr), parsedStr_1_1 = parsedStr_1.next(); !parsedStr_1_1.done; parsedStr_1_1 = parsedStr_1.next()) {
            var elem = parsedStr_1_1.value;
            if (!parsedId.has(elem)) {
                result.redundant.push(elem);
                result.valid = false;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (parsedStr_1_1 && !parsedStr_1_1.done && (_b = parsedStr_1.return)) _b.call(parsedStr_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return result;
}
exports.checkFormat = checkFormat;
