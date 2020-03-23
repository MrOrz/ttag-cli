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
var serializer_1 = require("../lib/serializer");
var utils_1 = require("../lib/utils");
var template_1 = require("@babel/template");
var UPPER_A = "A".codePointAt(0);
var UPPER_Z = "Z".codePointAt(0);
var LOWER_A = "a".codePointAt(0);
var LOWER_Z = "z".codePointAt(0);
var ZERO = "0".codePointAt(0);
var NINE = "9".codePointAt(0);
// Italic Math symbols are shorter than plain text
// const PSEUDO_UPPER_A = 0x1d608;
// const PSEUDO_LOWER_A = 0x1d622;
// const PSEUDO_ZERO = 0x1d7e2;
// Bold Cursive Math symbols are longer than plain text
var PSEUDO_UPPER_A = 0x1d4d0;
var PSEUDO_LOWER_A = 0x1d4ea;
var PSEUDO_ZERO = 0x1d7ce;
function pseudoChar(c) {
    var code = c.codePointAt(0);
    if (code >= UPPER_A && code <= UPPER_Z) {
        code = code - UPPER_A + PSEUDO_UPPER_A;
    }
    else if (code >= LOWER_A && code <= LOWER_Z) {
        code = code - LOWER_A + PSEUDO_LOWER_A;
    }
    else if (code >= ZERO && code <= NINE) {
        code = code - ZERO + PSEUDO_ZERO;
    }
    return String.fromCodePoint(code);
}
function pseudoString(str) {
    return Array.from(str)
        .map(pseudoChar)
        .join("");
}
function pseudoExpression(msgid) {
    var e_1, _a;
    var statement = template_1.default.ast("`" + msgid + "`");
    var expression = statement.expression;
    try {
        for (var _b = __values(expression.quasis), _c = _b.next(); !_c.done; _c = _b.next()) {
            var q = _c.value;
            if (q.value.raw) {
                q.value.raw = pseudoString(q.value.raw);
            }
            if (q.value.cooked) {
                q.value.cooked = pseudoString(q.value.cooked);
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
    // FIXME if content has backticks, they are escaped by ast; unescape them here.
    return utils_1.ast2Str(expression).replace(/^`|`$/g, "");
}
function pseudo(path, output) {
    var e_2, _a, e_3, _b;
    var poData = parser_1.parse(fs.readFileSync(path).toString());
    try {
        for (var _c = __values(Object.keys(poData.translations)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var key = _d.value;
            var ctx = poData.translations[key];
            var _loop_1 = function (msgid) {
                var msg = ctx[msgid];
                msg.msgstr = msg.msgstr.map(function () { return pseudoExpression(msgid); });
            };
            try {
                for (var _e = (e_3 = void 0, __values(Object.keys(ctx))), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var msgid = _f.value;
                    _loop_1(msgid);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_2) throw e_2.error; }
    }
    fs.writeFileSync(output, serializer_1.serialize(poData));
    console.log("Translations written to " + output);
}
exports.default = pseudo;
