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
var merge_1 = require("./merge");
var utils_1 = require("./utils");
function updateMessages(potMessages, poMessages, pluralsNum) {
    var e_1, _a, e_2, _b;
    var updated = {};
    try {
        for (var _c = __values(Object.keys(poMessages)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var msgid = _d.value;
            if (potMessages[msgid] !== undefined) {
                updated[msgid] = poMessages[msgid];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var _e = __values(Object.keys(potMessages)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var msgid = _f.value;
            if (!poMessages[msgid]) {
                updated[msgid] = potMessages[msgid];
                updated[msgid].msgstr = new Array(pluralsNum).fill("");
            }
            else {
                updated[msgid] = merge_1.mergeMessage(poMessages[msgid], potMessages[msgid]);
                updated[msgid].comments = potMessages[msgid].comments;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return updated;
}
function updateTranslations(pot, po, pluralsNum) {
    var e_3, _a;
    var updated = {};
    try {
        for (var _b = __values(Object.keys(pot)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var ctx = _c.value;
            updated[ctx] = updateMessages(pot[ctx] || {}, po[ctx] || {}, pluralsNum);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return updated;
}
function updatePo(pot, po) {
    var pluralsNum = utils_1.getPluralFormsNumber(po.headers["plural-forms"]);
    return {
        headers: po.headers,
        translations: updateTranslations(pot.translations, po.translations, pluralsNum),
        charset: po.charset
    };
}
exports.updatePo = updatePo;
