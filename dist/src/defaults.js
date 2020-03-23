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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
// presets
var presetEnv = require("@babel/preset-env");
var presetReact = require("@babel/preset-react");
var presetTS = require("@babel/preset-typescript");
var presetFlow = require("@babel/preset-flow");
// plugins
var classPropPlugin = require("@babel/plugin-proposal-class-properties");
var restSpreadPlugin = require("@babel/plugin-proposal-object-rest-spread");
var exportDefaultFromPlugin = require("@babel/plugin-proposal-export-default-from");
var babelTtagPlugin = require("babel-plugin-ttag");
var babelDynamicImportPlugin = require("@babel/plugin-syntax-dynamic-import");
var babelPluginDecorators = require("@babel/plugin-proposal-decorators");
var optionalChaningPlugin = require("@babel/plugin-proposal-optional-chaining");
var nullishCoalescingOperatorPlugin = require("@babel/plugin-proposal-nullish-coalescing-operator");
exports.defaultPlugins = [
    [babelPluginDecorators, { legacy: true }],
    [classPropPlugin, { loose: true }],
    restSpreadPlugin,
    exportDefaultFromPlugin,
    babelDynamicImportPlugin,
    optionalChaningPlugin,
    nullishCoalescingOperatorPlugin
];
exports.defaultPresets = [
    presetTS,
    presetFlow,
    presetEnv,
    presetReact
];
function makeBabelConf(ttagOpts) {
    return {
        presets: __spread(exports.defaultPresets),
        plugins: __spread(exports.defaultPlugins, [[babelTtagPlugin, ttagOpts]])
    };
}
exports.makeBabelConf = makeBabelConf;
