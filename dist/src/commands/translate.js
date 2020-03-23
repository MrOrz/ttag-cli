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
var fs = require("fs");
var readlineSync = require("readline-sync");
var chalk_1 = require("chalk");
var parser_1 = require("../lib/parser");
var serializer_1 = require("../lib/serializer");
var print_1 = require("../lib/print");
/* Generate untranslated messages along with context */
function untranslatedStream(translations) {
    var _a, _b, contextKey, context, _c, _d, msgid, msg, _e, e_1_1, e_2_1;
    var e_2, _f, e_1, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 11, 12, 13]);
                _a = __values(Object.keys(translations)), _b = _a.next();
                _h.label = 1;
            case 1:
                if (!!_b.done) return [3 /*break*/, 10];
                contextKey = _b.value;
                context = translations[contextKey];
                _h.label = 2;
            case 2:
                _h.trys.push([2, 7, 8, 9]);
                _c = (e_1 = void 0, __values(Object.keys(context))), _d = _c.next();
                _h.label = 3;
            case 3:
                if (!!_d.done) return [3 /*break*/, 6];
                msgid = _d.value;
                msg = context[msgid];
                _e = msg;
                return [4 /*yield*/, [contextKey, msg]];
            case 4:
                _e.msgstr = _h.sent();
                _h.label = 5;
            case 5:
                _d = _c.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _h.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_d && !_d.done && (_g = _c.return)) _g.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9:
                _b = _a.next();
                return [3 /*break*/, 1];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_2_1 = _h.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}
exports.untranslatedStream = untranslatedStream;
/* Read file and parse it shorthand */
function read(path) {
    return parser_1.parse(fs.readFileSync(path).toString());
}
exports.read = read;
/* Stream translations for each form if many(plural) */
function translationStream(msgstr) {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(msgstr.length > 1)) return [3 /*break*/, 5];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < msgstr.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, readlineSync.question(chalk_1.default.yellow("msgstr[" + i + "]: "))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, readlineSync.question(chalk_1.default.yellow("msgstr: "))];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}
function translate(path, output) {
    var _a;
    var poData = read(path);
    var stream = untranslatedStream(poData.translations);
    // skip first message(empty msgid in header)
    stream.next();
    var _b = stream.next(""), value = _b.value, done = _b.done;
    while (!done) {
        var _c = __read(value, 2), ctxt = _c[0], msg = _c[1];
        print_1.printComments(msg.comments);
        print_1.printContext(ctxt);
        print_1.printMsgid(msg.msgid);
        print_1.printMsgidPlural(msg.msgid_plural);
        var translation = Array.from(translationStream(msg.msgstr));
        var data = stream.next(translation);
        _a = __read([data.value, data.done], 2), value = _a[0], done = _a[1];
        console.log();
    }
    fs.writeFileSync(output, serializer_1.serialize(poData));
    console.log("Translations written to " + output);
}
exports.default = translate;
