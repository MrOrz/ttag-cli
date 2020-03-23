"use strict";
/*
Compare designated pofile with pot file extracted from all files in all paths
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var ora = require("ora");
var fs = require("fs");
var extract_1 = require("../lib/extract");
var parser_1 = require("../lib/parser");
/*
Run any string in stream through warning first
*/
function warningPipe(pofile, progress, stream) {
    var stream_1, stream_1_1, str, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 7]);
                stream_1 = __values(stream), stream_1_1 = stream_1.next();
                _b.label = 1;
            case 1:
                if (!!stream_1_1.done) return [3 /*break*/, 4];
                str = stream_1_1.value;
                progress.warn("Translation '" + str + "' is not found in " + pofile);
                return [4 /*yield*/, str];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                stream_1_1 = stream_1.next();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 7];
            case 6:
                try {
                    if (stream_1_1 && !stream_1_1.done && (_a = stream_1.return)) _a.call(stream_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}
/*
Unpack pofile into contextKey/messageId pairs
*/
function unpackPoData(poData) {
    var _a, _b, contextKey, _c, _d, msgid, keyMsg, e_2_1, e_3_1;
    var e_3, _e, e_2, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 11, 12, 13]);
                _a = __values(Object.keys(poData.translations)), _b = _a.next();
                _g.label = 1;
            case 1:
                if (!!_b.done) return [3 /*break*/, 10];
                contextKey = _b.value;
                _g.label = 2;
            case 2:
                _g.trys.push([2, 7, 8, 9]);
                _c = (e_2 = void 0, __values(Object.keys(poData.translations[contextKey]))), _d = _c.next();
                _g.label = 3;
            case 3:
                if (!!_d.done) return [3 /*break*/, 6];
                msgid = _d.value;
                keyMsg = poData.translations[contextKey][msgid];
                return [4 /*yield*/, [contextKey, keyMsg.msgid]];
            case 4:
                _g.sent();
                _g.label = 5;
            case 5:
                _d = _c.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_2_1 = _g.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 9:
                _b = _a.next();
                return [3 /*break*/, 1];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_3_1 = _g.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}
/*
Find untranslated string by extracting from translations(pofile)
using key/context from keys(pot file).
*/
function getUntranslated(translations, keysOnly) {
    var _a, _b, _c, contextKey, msgid, context, msgstr, e_4_1;
    var e_4, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 7, 8, 9]);
                _a = __values(unpackPoData(keysOnly)), _b = _a.next();
                _e.label = 1;
            case 1:
                if (!!_b.done) return [3 /*break*/, 6];
                _c = __read(_b.value, 2), contextKey = _c[0], msgid = _c[1];
                context = translations.translations[contextKey];
                if (!(!context || !context[msgid])) return [3 /*break*/, 3];
                return [4 /*yield*/, msgid];
            case 2:
                _e.sent();
                return [3 /*break*/, 5];
            case 3:
                msgstr = context[msgid].msgstr;
                if (!(msgstr.filter(function (s) { return !!s; }).length == 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, msgid];
            case 4:
                _e.sent();
                _e.label = 5;
            case 5:
                _b = _a.next();
                return [3 /*break*/, 1];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_4_1 = _e.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
/*
Check all keys from pots(keys only files) are present in pofile(files with translations)
*/
function check(pofile, paths, lang, overrideOpts) {
    return __awaiter(this, void 0, void 0, function () {
        var progress, translations, keysOnly, _a, untranslatedStream, untranslated;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    progress = ora("[ttag] checking translations from " + paths + " ...");
                    translations = parser_1.parse(fs.readFileSync(pofile).toString());
                    _a = parser_1.parse;
                    return [4 /*yield*/, extract_1.extractAll(paths, lang, progress, overrideOpts)];
                case 1:
                    keysOnly = _a.apply(void 0, [_b.sent()]);
                    untranslatedStream = getUntranslated(translations, keysOnly);
                    untranslatedStream = warningPipe(pofile, progress, untranslatedStream);
                    untranslated = Array.from(untranslatedStream);
                    if (untranslated.length) {
                        progress.fail("[ttag] has found " + untranslated.length + " untranslated string(s)");
                        process.exit(1);
                    }
                    else {
                        // progress.succeed(`[ttag] checked`);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = check;
