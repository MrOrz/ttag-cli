"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = require("@babel/generator");
var pluralNumRegex = /^nplurals ?= ?(\d);/;
function getPluralFormsNumber(pluralFormsHeader) {
    var match = pluralNumRegex.exec(pluralFormsHeader);
    if (match === null) {
        throw new Error("Failed to parse plural-form header " + pluralFormsHeader);
    }
    var pluralFnCount = match[1];
    if (pluralFnCount[pluralFnCount.length - 1] === ";") {
        pluralFnCount = pluralFnCount.slice(0, -1);
    }
    return parseInt(pluralFnCount, 10);
}
exports.getPluralFormsNumber = getPluralFormsNumber;
/* Iterate translations from all contexts in a serial run */
function iterateTranslations(translations) {
    var _a, _b, ctxtId, ctxt, _c, _d, msgid, e_1_1, e_2_1;
    var e_2, _e, e_1, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 11, 12, 13]);
                _a = __values(Object.keys(translations)), _b = _a.next();
                _g.label = 1;
            case 1:
                if (!!_b.done) return [3 /*break*/, 10];
                ctxtId = _b.value;
                ctxt = translations[ctxtId];
                _g.label = 2;
            case 2:
                _g.trys.push([2, 7, 8, 9]);
                _c = (e_1 = void 0, __values(Object.keys(ctxt))), _d = _c.next();
                _g.label = 3;
            case 3:
                if (!!_d.done) return [3 /*break*/, 6];
                msgid = _d.value;
                return [4 /*yield*/, ctxt[msgid]];
            case 4:
                _g.sent();
                _g.label = 5;
            case 5:
                _d = _c.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _g.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9:
                _b = _a.next();
                return [3 /*break*/, 1];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_2_1 = _g.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}
exports.iterateTranslations = iterateTranslations;
function ast2Str(ast) {
    return generator_1.default(ast).code;
}
exports.ast2Str = ast2Str;
function convert2Compact(poData) {
    var compactPo = {
        headers: {
            "plural-forms": "",
            language: "en"
        },
        contexts: {
            "": {}
        }
    };
    compactPo.headers["plural-forms"] = poData.headers["plural-forms"];
    compactPo.headers.language = poData.headers.language;
    Object.entries(poData.translations).forEach(function (_a) {
        var _b = __read(_a, 2), context = _b[0], ctxtTranslations = _b[1];
        Object.entries(ctxtTranslations).forEach(function (_a) {
            var _b = __read(_a, 2), msgid = _b[0], msgidData = _b[1];
            if (msgidData.comments && msgidData.comments.flag == "fuzzy") {
                return;
            }
            if (!msgidData.msgstr.length) {
                return;
            }
            if (!compactPo.contexts[context]) {
                compactPo.contexts[context] = {};
            }
            compactPo.contexts[context][msgid] = msgidData.msgstr;
        });
    });
    delete compactPo.contexts[""][""];
    return compactPo;
}
exports.convert2Compact = convert2Compact;
