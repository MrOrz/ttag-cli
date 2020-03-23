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
/* merge two context maps together */
function mergeTranslations(leftContext, rightContext) {
    var e_1, _a, e_2, _b;
    // Update messages known to the left side
    var merged = {};
    try {
        for (var _c = __values(Object.keys(leftContext)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var contextKey = _d.value;
            if (!rightContext[contextKey]) {
                merged[contextKey] = leftContext[contextKey];
            }
            else {
                merged[contextKey] = mergeMessages(leftContext[contextKey], rightContext[contextKey]);
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
        // Append messages from the right side
        for (var _e = __values(Object.keys(rightContext)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var contextKey = _f.value;
            if (!leftContext[contextKey]) {
                merged[contextKey] = rightContext[contextKey];
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
    return merged;
}
/* Merge two message maps together */
function mergeMessages(leftMessages, rightMessages) {
    var e_3, _a, e_4, _b;
    var merged = {};
    try {
        // Update messages from left and merge with right
        for (var _c = __values(Object.keys(leftMessages)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var msgid = _d.value;
            if (!rightMessages[msgid]) {
                merged[msgid] = leftMessages[msgid];
            }
            else {
                merged[msgid] = mergeMessage(leftMessages[msgid], rightMessages[msgid]);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_3) throw e_3.error; }
    }
    try {
        // Append messages from right
        for (var _e = __values(Object.keys(rightMessages)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var msgid = _f.value;
            if (!leftMessages[msgid]) {
                merged[msgid] = rightMessages[msgid];
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return merged;
}
/* Merge two po(t)files together */
function mergeMessage(leftMessage, rightMessage) {
    if (leftMessage.msgid == "") {
        //gettext-parser library bug: header appears to be in message with id''
        return leftMessage;
    }
    var msgstr = leftMessage.msgstr.filter(function (s) { return !!s; }).length > 0
        ? leftMessage.msgstr
        : rightMessage.msgstr;
    return {
        msgid: leftMessage.msgid,
        comments: mergeComments(leftMessage.comments, rightMessage.comments),
        msgstr: msgstr,
        msgid_plural: leftMessage.msgid_plural
    };
}
exports.mergeMessage = mergeMessage;
/* Merge comments from two messages */
function mergeComments(leftComment, rightComment) {
    if (!leftComment) {
        return rightComment;
    }
    if (!rightComment) {
        return undefined;
    }
    if (!leftComment.reference) {
        return {
            reference: rightComment.reference
        };
    }
    if (!rightComment.reference) {
        return {
            reference: rightComment.reference
        };
    }
    var uniqueComments = new Set(leftComment.reference
        .split("\n")
        .concat(rightComment.reference.split("\n")));
    var references = Array.from(uniqueComments.values()).sort();
    return {
        reference: references.join("\n")
    };
}
/* Merge two poData objects together */
function mergePo(left, right) {
    return {
        headers: left.headers,
        translations: mergeTranslations(left.translations, right.translations)
    };
}
exports.mergePo = mergePo;
