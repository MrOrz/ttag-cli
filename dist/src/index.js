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
var yargs = require("yargs");
var extract_1 = require("./commands/extract");
var check_1 = require("./commands/check");
var merge_1 = require("./commands/merge");
var init_1 = require("./commands/init");
var update_1 = require("./commands/update");
var translate_1 = require("./commands/translate");
var filter_1 = require("./commands/filter");
var stats_1 = require("./commands/stats");
var replace_1 = require("./commands/replace");
var color_1 = require("./commands/color");
var pseudo_1 = require("./commands/pseudo");
var spell_1 = require("./commands/spell");
var validate_1 = require("./commands/validate");
var web_1 = require("./commands/web");
var po2json_1 = require("./commands/po2json");
var ttagPluginOverride_1 = require("./lib/ttagPluginOverride");
require("./declarations");
yargs.usage("$0 <cmd> [args]");
/* Monkey patch example func of usage to store examples locally */
/* TODO: contribute a patch to make examples available through usage instance */
var usage = yargs.getUsageInstance();
var exampleMap = new Map();
var originalExampleFunc = usage.example;
usage.example = function (cmd, desc) {
    originalExampleFunc(cmd, desc);
    exampleMap.set(cmd, desc);
};
yargs
    .command("extract [output|lang] <src...>", "will extract translations to .pot file", __assign({ output: {
        alias: "o",
        default: "translations.pot",
        description: "result file with translations (.pot)"
    }, lang: {
        alias: "l",
        default: "en",
        description: "sets default lang (ISO format)"
    } }, ttagPluginOverride_1.getTtagOptsForYargs()), function (argv) {
    extract_1.default(argv.output, argv.src, argv.lang, ttagPluginOverride_1.parseTtagPluginOpts(argv));
})
    .command("check [lang] <pofile> <src...>", "will check if all translations are present in .po file", __assign({ lang: {
        alias: "l",
        default: "en",
        description: "sets default lang (ISO format)"
    } }, ttagPluginOverride_1.getTtagOptsForYargs()), function (argv) {
    check_1.default(argv.pofile, argv.src, argv.lang, ttagPluginOverride_1.parseTtagPluginOpts(argv));
})
    .command("merge <path...>", "will merge two or more po(t) files together using first non-empty msgstr and header from left-most file", {}, function (argv) {
    merge_1.default(argv.path);
})
    .command("translate <path> [args]", "will open interactive prompt to translate all msgids with empty msgstr in cli", {
    output: {
        alias: "o",
        default: "translated.po",
        description: "result file with translations (.po)"
    }
}, function (argv) {
    translate_1.default(argv.path, argv.output);
})
    .command("stats <path>", "will display various pofile statistics(encoding, plurals, translated, fuzzyness)", {}, function (argv) {
    stats_1.default(argv.path);
})
    .command("filter <path> [args]", "will filter pofile by entry attributes(fuzzy, obsolete, (un)translated)", {
    fuzzy: {
        alias: "f",
        description: "result file with fuzzy messages (.po)",
        boolean: true,
        default: false
    },
    "no-fuzzy": {
        alias: "nf",
        description: "result file without fuzzy messages (.po)",
        boolean: true,
        default: false
    },
    translated: {
        alias: "t",
        description: "result file with translations (.po)",
        boolean: true,
        default: false
    },
    "not-translated": {
        alias: "nt",
        description: "result file without translations (.po)",
        boolean: true,
        default: false
    },
    reference: {
        alias: "r",
        description: "a regexp to match references against",
        default: ""
    }
}, function (argv) {
    filter_1.default(argv.path, argv.fuzzy, argv["no-fuzzy"], argv.translated, argv["not-translated"], argv.reference);
})
    .command("init <lang> <filename>", "will create an empty .po file with all necessary headers for the locale", {
    lang: {
        description: "sets default locale (ISO format)",
        default: "en"
    },
    filename: {
        description: "path to the .po file"
    }
}, function (argv) {
    init_1.default(argv.lang, argv.filename);
})
    .command("update [opts] <pofile> <src..>", "will update existing po file. Add/remove new translations", __assign({ lang: {
        description: "sets default locale (ISO format)",
        default: "en"
    }, pofile: {
        description: "path to .po file with translations"
    }, src: {
        description: "path to source files/directories"
    } }, ttagPluginOverride_1.getTtagOptsForYargs()), function (argv) {
    update_1.default(argv.pofile, argv.src, argv.lang, ttagPluginOverride_1.parseTtagPluginOpts(argv));
})
    .command("replace [options] <pofile> <out> <path>", "will replace all strings with translations from the .po file", __assign({}, ttagPluginOverride_1.getTtagOptsForYargs()), function (argv) {
    replace_1.default(argv.pofile, argv.out, argv.path, ttagPluginOverride_1.parseTtagPluginOpts(argv));
})
    .command("color <pofile>", "will output po(t)file with pretty colors on, combine with | less -r", {}, function (argv) {
    color_1.default(argv.pofile);
})
    .command("pseudo <path> [args]", "will output a pseudo-localised translation", {
    output: {
        alias: "o",
        default: "pseudo.po",
        description: "result file with pseudo translations (.po)"
    }
}, function (argv) {
    pseudo_1.default(argv.path, argv.output);
})
    .command("spell <pofile> [locale]", "will spellcheck po file messages with given locale, locale can be autodetected from pofile", {}, function (argv) {
    spell_1.default(argv.pofile, argv.locale);
})
    .command("validate <pofile>", "will validate js template strings (`${x}`) in messages and translations and against each other", {}, function (argv) {
    validate_1.default(argv.pofile);
})
    .command("web <pofile>", "will open pofile in web editor", {}, function (argv) {
    web_1.default(argv.pofile);
})
    .command("po2json <pofile> [args]", "will parse and output po file as loadable JSON", {
    pretty: {
        alias: "p",
        description: "pretty print js",
        boolean: true,
        default: false
    },
    nostrip: {
        alias: "n",
        description: "do not strip comments/headers",
        boolean: true,
        default: false
    },
    format: {
        description: "sets the output JSON format (compact is much smaller)",
        choices: ["compact", "verbose"],
        default: "verbose"
    }
}, function (argv) {
    po2json_1.default(argv.pofile, argv.pretty, argv.nostrip, argv.format);
})
    .command("doc", false, {}, function (_) {
    var e_1, _a;
    var isIgnored = function (c) {
        return c == "doc" || c == "completion" || c == "$0";
    };
    var printOption = function (name, option) {
        return ("\t-" + name +
            (option.alias ? "  --" + option.alias : "") +
            ("   " + option.description + "  ") +
            (option.default !== undefined
                ? "(default: " + option.default + ")"
                : "") +
            "\n");
    };
    var _loop_1 = function (commandName) {
        if (isIgnored(commandName)) {
            return "continue";
        }
        var command = exports.handlers[commandName];
        var options = exports.handlers[commandName].builder;
        var optionNames = Object.keys(options);
        process.stdout.write("### `" + command.original + "`" +
            "\n" +
            ("" + command.description) +
            "\n" +
            (optionNames.length > 0
                ? "#### Arguments:\n" +
                    optionNames.reduce(function (body, optname) {
                        return body + printOption(optname, options[optname]);
                    }, "")
                : "") +
            (exampleMap.has(commandName)
                ? "#### Example:\n" + exampleMap.get(commandName)
                : "") +
            "\n\n");
    };
    try {
        for (var _b = __values(Object.keys(exports.handlers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var commandName = _c.value;
            _loop_1(commandName);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
})
    .command("*", "", {}, function (argv) {
    var possibleCommand = commands.find(function (s) { return s.startsWith(argv._[0]); });
    if (possibleCommand) {
        process.stdout.write("Did you mean " + possibleCommand + "? \n");
    }
    else {
        process.stdout.write("command \"" + argv._[0] + "\" is not found.\n");
    }
    process.stdout.write("Use 'ttag --help' to see available commands? \n");
})
    .completion("completion", function (current, argv, done) {
    if (commands.indexOf(argv._[0]) != -1) {
        // argv._[0] is a current first argument, if it is a command
        // we should return empty to allow filesystem autocompletion
        done([]);
    }
    else if (argv._.length == 0) {
        // Return full commands list when user did not input anything
        done(commands);
    }
    else {
        // Suggest command which starts with user input
        done(commands.filter(function (c) { return c.indexOf(current) == 0; }));
    }
})
    .example("filter", "\t ttag filter -nt small.po\n\n" + '\t msgid "test"\n' + '\t msgstr ""');
var commandInstance = yargs.getCommandInstance();
exports.handlers = commandInstance.getCommandHandlers();
var commands = commandInstance
    .getCommands()
    .filter(function (c) { return c != "$0" && c != "completion"; });
yargs.help().argv;
