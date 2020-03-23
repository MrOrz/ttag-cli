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
var parser_1 = require("../lib/parser");
var serializer_1 = require("../lib/serializer");
var fs = require("fs");
var RuleType;
(function (RuleType) {
    RuleType[RuleType["Must"] = 0] = "Must";
    RuleType[RuleType["MustNot"] = 1] = "MustNot";
})(RuleType || (RuleType = {}));
function FuzzyTest(msg) {
    if (msg.comments == undefined) {
        return false;
    }
    return msg.comments.flag == "fuzzy";
}
function TranslatedTest(msg) {
    return msg.msgstr.filter(function (s) { return s.length > 0; }).length == msg.msgstr.length;
}
function ReferenceReTest(msg, re) {
    return (msg.comments != undefined &&
        msg.comments.reference != undefined &&
        re.test(msg.comments.reference));
}
var PoFilter = /** @class */ (function () {
    function PoFilter(_a) {
        var fuzzy = _a.fuzzy, translated = _a.translated, referenceRe = _a.referenceRe;
        this.fuzzy = fuzzy;
        this.translated = translated;
        this.referenceRe = referenceRe;
    }
    /* set fuzzy flag */
    PoFilter.prototype.withFuzzy = function () {
        return new PoFilter(Object.assign({}, this, { fuzzy: true }));
    };
    /* set no fuzzy flag */
    PoFilter.prototype.withoutFuzzy = function () {
        return new PoFilter(Object.assign({}, this, { fuzzy: false }));
    };
    /* set translation flag */
    PoFilter.prototype.withTranslation = function () {
        return new PoFilter(Object.assign({}, this, { translated: true }));
    };
    /* set no translation flag */
    PoFilter.prototype.withoutTranslation = function () {
        return new PoFilter(Object.assign({}, this, { translated: false }));
    };
    PoFilter.prototype.withReferenceRe = function (referenceRe) {
        return new PoFilter(Object.assign({}, this, { referenceRe: referenceRe }));
    };
    /* build rule chain according to state and apply to translations */
    PoFilter.prototype.apply = function (translations) {
        var e_1, _a;
        var rules = [];
        if (this.fuzzy == true) {
            rules.push([FuzzyTest, RuleType.Must]);
        }
        if (this.fuzzy == false) {
            rules.push([FuzzyTest, RuleType.MustNot]);
        }
        if (this.translated == true) {
            rules.push([TranslatedTest, RuleType.Must]);
        }
        if (this.translated == false) {
            rules.push([TranslatedTest, RuleType.MustNot]);
        }
        var reg = this.referenceRe;
        if (reg !== undefined) {
            rules.push([
                function (m) { return ReferenceReTest(m, reg); },
                RuleType.Must
            ]);
        }
        var newTranslations = {};
        try {
            for (var _b = __values(filterTranslationsStream(translations, rules)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), ctxt = _d[0], messages = _d[1];
                newTranslations[ctxt] = messages;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return newTranslations;
    };
    return PoFilter;
}());
/* Test rule according to type */
function testRule(test, rule, msg) {
    switch (rule) {
        case RuleType.Must: {
            return test(msg);
        }
        case RuleType.MustNot: {
            return !test(msg);
        }
    }
}
/* Test each message with tester according to rule */
function filterMessagesStream(messages, rules) {
    var _a, _b, msgid, msg, allPassed, rules_1, rules_1_1, _c, test_1, rule, e_2_1;
    var e_2, _d, e_3, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 7, 8, 9]);
                _a = __values(Object.keys(messages)), _b = _a.next();
                _f.label = 1;
            case 1:
                if (!!_b.done) return [3 /*break*/, 6];
                msgid = _b.value;
                msg = messages[msgid];
                if (!(msgid == "")) return [3 /*break*/, 3];
                // skip empty message id
                return [4 /*yield*/, msg];
            case 2:
                // skip empty message id
                _f.sent();
                _f.label = 3;
            case 3:
                allPassed = true;
                try {
                    for (rules_1 = (e_3 = void 0, __values(rules)), rules_1_1 = rules_1.next(); !rules_1_1.done; rules_1_1 = rules_1.next()) {
                        _c = __read(rules_1_1.value, 2), test_1 = _c[0], rule = _c[1];
                        if (!testRule(test_1, rule, msg)) {
                            allPassed = false;
                            break;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (rules_1_1 && !rules_1_1.done && (_e = rules_1.return)) _e.call(rules_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                if (!allPassed) return [3 /*break*/, 5];
                return [4 /*yield*/, msg];
            case 4:
                _f.sent();
                _f.label = 5;
            case 5:
                _b = _a.next();
                return [3 /*break*/, 1];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_2_1 = _f.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
/* Run all messages by context through filter stream */
function filterTranslationsStream(translations, rules) {
    var _a, _b, contextKey, context, newContext, _c, _d, msg, e_4_1;
    var e_4, _e, e_5, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 5, 6, 7]);
                _a = __values(Object.keys(translations)), _b = _a.next();
                _g.label = 1;
            case 1:
                if (!!_b.done) return [3 /*break*/, 4];
                contextKey = _b.value;
                context = translations[contextKey];
                newContext = {};
                try {
                    for (_c = (e_5 = void 0, __values(filterMessagesStream(context, rules))), _d = _c.next(); !_d.done; _d = _c.next()) {
                        msg = _d.value;
                        newContext[msg.msgid] = msg;
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                if (!(Object.keys(newContext).length > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, [contextKey, newContext]];
            case 2:
                _g.sent();
                _g.label = 3;
            case 3:
                _b = _a.next();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                e_4_1 = _g.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 7];
            case 6:
                try {
                    if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}
function filter(path, fuzzy, noFuzzy, translated, notTranslated, referenceRe) {
    if (fuzzy && noFuzzy) {
        throw "Choose one of fuzzy or no-fuzzy args";
    }
    if (translated && notTranslated) {
        throw "Choose one of translated or not translated args";
    }
    if (referenceRe) {
        try {
            new RegExp(referenceRe);
        }
        catch (_a) {
            throw "Invalid regular expression for reference";
        }
    }
    var filter = new PoFilter({});
    if (fuzzy) {
        filter = filter.withFuzzy();
    }
    if (noFuzzy) {
        filter = filter.withoutFuzzy();
    }
    if (translated) {
        filter = filter.withTranslation();
    }
    if (notTranslated) {
        filter = filter.withoutTranslation();
    }
    if (referenceRe) {
        filter = filter.withReferenceRe(new RegExp(referenceRe));
    }
    var poData = parser_1.parse(fs.readFileSync(path).toString());
    var filteredPoData = {
        headers: poData.headers,
        translations: filter.apply(poData.translations)
    };
    process.stdout.write(serializer_1.serialize(filteredPoData));
}
exports.default = filter;
