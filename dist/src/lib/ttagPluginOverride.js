"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ttagDoc = "https://ttag.js.org/docs/plugin-api.html";
function doc(fragment) {
    return "" + ttagDoc + fragment;
}
var discoverDescription = "string overrides babel-plugi-ttag setting - " + doc("#configdiscover") + ". Can be used to discover ttag functions without explicit import.    Only known ttag functions can be used as params (t, jt, ngettext, gettext, _)";
var numberedExpressionsDescr = "boolean overrides babel-plugin-ttag setting -  " + doc("#confignumberedexpressions") + ". Refer to the doc for the details.";
var extractLocationDescr = "string - 'full' | 'file' | 'never' - " + doc("#configextractlocation") + ". Is used to format location comments in the .po file. ";
var sortByMsgidDescr = "boolean - The resulting output will be sorted alphabetically. " + doc("#configsortbymsgid");
var OPTS = {
    discover: { description: discoverDescription },
    numberedExpressions: { description: numberedExpressionsDescr },
    extractLocation: { description: extractLocationDescr },
    sortByMsgid: { description: sortByMsgidDescr, boolean: true }
};
function hasOverrides(argv) {
    var pluginOpts = Object.keys(OPTS);
    var keySet = new Set(Object.keys(argv));
    return Boolean(pluginOpts.find(function (p) { return keySet.has(p); }));
}
function parseDiscover(opt) {
    return Array.isArray(opt) ? opt : [opt];
}
function parseTtagPluginOpts(argv) {
    if (!hasOverrides(argv))
        return undefined;
    var pluginOpts = Object.keys(OPTS);
    var extendedOpts = {};
    pluginOpts.forEach(function (opt) {
        if (!argv[opt])
            return;
        if (opt === "discover") {
            extendedOpts[opt] = parseDiscover(argv[opt]);
        }
        else if (opt === "numberedExpressions") {
            extendedOpts[opt] = Boolean(argv[opt]);
        }
        else if (opt === "extractLocation") {
            extendedOpts["extract"] = { location: argv[opt] };
        }
        else if (opt === "sortByMsgid") {
            extendedOpts.sortByMsgid = true;
        }
        else {
            extendedOpts[opt] = argv[opt];
        }
    });
    return extendedOpts;
}
exports.parseTtagPluginOpts = parseTtagPluginOpts;
/*
Will override opts1 with opts2
*/
function mergeOpts(opts1, opts2) {
    var newOpts = __assign({}, opts1);
    if (opts2.hasOwnProperty("discover")) {
        newOpts.discover = opts2.discover;
    }
    if (opts2.hasOwnProperty("numberedExpressions")) {
        newOpts.numberedExpressions = opts2.numberedExpressions;
    }
    if (opts2.extract && opts2.extract.location) {
        if (newOpts.extract) {
            newOpts.extract.location = opts2.extract.location;
        }
        else {
            newOpts.extract = opts2.extract;
        }
    }
    return newOpts;
}
exports.mergeOpts = mergeOpts;
function getTtagOptsForYargs() {
    return OPTS;
}
exports.getTtagOptsForYargs = getTtagOptsForYargs;
