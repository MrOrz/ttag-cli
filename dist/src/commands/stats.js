"use strict";
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
var chalk_1 = require("chalk");
var parser_1 = require("../lib/parser");
function nonEmpty(el) {
    return !!el;
}
function isTranslated(msg) {
    return msg.msgstr.filter(nonEmpty).length == msg.msgstr.length;
}
function isFuzzy(msg) {
    return msg.comments != undefined && msg.comments.flag == "fuzzy";
}
function statsCalculator(translations) {
    var e_1, _a, e_2, _b;
    var _c = __read([0, 0, 0, 0], 4), total = _c[0], translated = _c[1], fuzzy = _c[2], contexts = _c[3];
    try {
        for (var _d = __values(Object.keys(translations)), _e = _d.next(); !_e.done; _e = _d.next()) {
            var contextKey = _e.value;
            contexts += 1;
            var context = translations[contextKey];
            try {
                for (var _f = (e_2 = void 0, __values(Object.keys(context))), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var msgid = _g.value;
                    var msg = context[msgid];
                    total += 1;
                    translated += isTranslated(msg) ? 1 : 0;
                    fuzzy += isFuzzy(msg) ? 1 : 0;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        total: total,
        translated: translated,
        fuzzy: fuzzy,
        contexts: contexts
    };
}
function stats(path) {
    var poData = parser_1.parse(fs.readFileSync(path).toString());
    var poStats = statsCalculator(poData.translations);
    console.log(chalk_1.default.green("TOTAL:") + " " + poStats.total);
    console.log(chalk_1.default.green("CONTEXTS:") + " " + poStats.contexts);
    console.log(chalk_1.default.green("TRANSLATED:") + " " + poStats.translated);
    console.log(chalk_1.default.green("FUZZY:") + " " + poStats.fuzzy);
    var indicators = [];
    var maxLength = 50;
    var filledGreen = Math.round((poStats.translated - poStats.fuzzy) / poStats.total * maxLength);
    var filledYellow = Math.round(poStats.fuzzy / poStats.total * maxLength);
    var fillledRed = maxLength - filledGreen - filledYellow;
    for (var i = 0; i < filledGreen; i++) {
        indicators.push(chalk_1.default.green("#"));
    }
    for (var i = 0; i < filledYellow; i++) {
        indicators.push(chalk_1.default.yellow("#"));
    }
    for (var i = 0; i < fillledRed; i++) {
        indicators.push(chalk_1.default.gray("·"));
    }
    var translatedPercent = poStats.translated / poStats.total;
    console.log("[" + indicators.join("") + "] " + Math.round(translatedPercent * 100) + "% " +
        (poStats.translated - poStats.fuzzy + "/" + (poStats.total -
            poStats.translated) + "/" + poStats.total));
}
exports.default = stats;
