"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ora = require("ora");
var fs = require("fs");
var plural_forms_1 = require("plural-forms");
var validation_1 = require("../lib/validation");
function generatePoFile(language) {
    var pluralFormsHeader = plural_forms_1.getPluralFormsHeader(language);
    return "msgid \"\"\nmsgstr \"\"\n\"Content-Type: text/plain; charset=UTF-8\\n\"\n\"Plural-Forms: " + pluralFormsHeader + ";\\n\"\n\"Language: " + language + "\\n\"\n\"MIME-Version: 1.0\\n\"\n\"Content-Transfer-Encoding: 8bit\\n\"\n";
}
function init(language, pofile) {
    var progress = ora();
    if (!plural_forms_1.hasLang(language)) {
        progress.fail(validation_1.langValidationMsg(language));
        process.exit(1);
        return;
    }
    progress.start();
    var poContent = generatePoFile(language);
    fs.writeFileSync(pofile, poContent);
    progress.succeed("[ttag] " + pofile + " is created");
}
exports.default = init;
