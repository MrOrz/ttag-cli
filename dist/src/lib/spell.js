"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
require("../declarations");
var fs = require("fs");
var os = require("os");
var path = require("path");
var node_fetch_1 = require("node-fetch");
var serialize = require("serialize-javascript");
var Spellchecker = require("hunspell-spellchecker");
var HOMEDIR = os.homedir();
var C3PODIR = ".ttag";
var DICTDIR = "dicts";
/* Create necessary dirs */
function ensureDictDir() {
    if (!fs.existsSync(path.join(HOMEDIR, C3PODIR))) {
        fs.mkdirSync(path.join(HOMEDIR, C3PODIR));
    }
    if (!fs.existsSync(path.join(HOMEDIR, C3PODIR, DICTDIR))) {
        fs.mkdirSync(path.join(HOMEDIR, C3PODIR, DICTDIR));
    }
}
function getDictName(locale) {
    return path.join(HOMEDIR, C3PODIR, DICTDIR, locale + ".json");
}
/* Safely serialize dict with regexp rules and save it */
function saveDict(dictName, dict) {
    ensureDictDir();
    fs.writeFileSync(dictName, serialize(dict));
}
/* Load dict from file and eval it to create all objects */
function loadDict(dictName) {
    return eval("(" + fs.readFileSync(dictName).toString() + ")");
}
/* Load dict file either from web or from disc and save it */
function getChecker(locale) {
    return __awaiter(this, void 0, void 0, function () {
        var dictName, responseAff, aff, responseDic, dic, spellchecker, dict;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!LOCALEDICTMAP[locale]) {
                        throw "Incorrect or unsupported locale";
                    }
                    dictName = getDictName(locale);
                    if (fs.existsSync(dictName)) {
                        try {
                            return [2 /*return*/, new Spellchecker(loadDict(dictName))];
                        }
                        catch (err) {
                            console.error(err);
                        }
                    }
                    return [4 /*yield*/, node_fetch_1.default("" + BASEPATH + LOCALEDICTMAP[locale].aff)];
                case 1:
                    responseAff = _a.sent();
                    return [4 /*yield*/, responseAff.text()];
                case 2:
                    aff = _a.sent();
                    return [4 /*yield*/, node_fetch_1.default("" + BASEPATH + LOCALEDICTMAP[locale].dic)];
                case 3:
                    responseDic = _a.sent();
                    return [4 /*yield*/, responseDic.text()];
                case 4:
                    dic = _a.sent();
                    spellchecker = new Spellchecker();
                    dict = spellchecker.parse({ aff: aff, dic: dic });
                    try {
                        saveDict(dictName, dict);
                    }
                    catch (err) {
                        console.warn("Could not save dict to " + dictName + ": " + err);
                    }
                    spellchecker.use(dict);
                    return [2 /*return*/, spellchecker];
            }
        });
    });
}
exports.getChecker = getChecker;
var BASEPATH = "https://raw.githubusercontent.com/LibreOffice/dictionaries/master/";
var LOCALEDICTMAP = {
    uk: { aff: "uk_UA/uk_UA.aff", dic: "uk_UA/uk_UA.dic" },
    ru: { aff: "ru_RU/ru_RU.aff", dic: "ru_RU/ru_RU/dic" },
    en: { aff: "en/en_US.aff", dic: "en/en_US.dic" }
};
