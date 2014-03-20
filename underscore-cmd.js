var shelljs = require('shelljs'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

var engineSettings = {
    underscore: {
        ext: '.us',
        compile: function (template) {
            return _.template(template).source;
        }
    }
};

module.exports = {

    process: function (target, output, fullPath, separator, engine) {

        // set defaults
        separator === undefined && (separator = '-');
        engine = 'underscore';
        fullPath = fullPath || false;
        output = output || 'templates.js';

        var result = 'var templates = {};';

        shelljs.find(target).filter(function (file) {
            return file.match(new RegExp(engineSettings[engine].ext + '$'));
        }).forEach(function (file) {
            file = path.relative(target, file);
            var source = engineSettings[engine].compile(fs.readFileSync(path.join(target, file), 'utf8'));
            var templateName = fullPath ? file.split('.')[0].replace(/\//g, separator) : path.basename(file);
            result += 'templates["' + templateName + '"] = ' + source + ";\r\n\r\n";
        });

        fs.writeFileSync(output, result, 'utf8', function (error) {
            error && console.log(error);
        });
    },

    help: function () {
        console.log('Search *.us files and try to compile it as underscore templates. Save result into a file.');
        console.log("\r\nUsage:");
        console.log('underscore-cmd [target] [-options] [--file=<path>] [--sep=<char>]');
        console.log('[target] - is root dir where template files will be searched');
        console.log('[-options] - boolean options. It contain:');
        console.log('  -f If flag passed template name will be represented as path to file which contain template sourse. Otherwise template name will be equal to file name without extension');
        console.log('[--file] - output file path');
        console.log('[--sep] - use only if -f flag passed. Directory separator will be replaced to the --sep.');
        console.log("\r\nExample: \r\n underscore-cmd ./modules -f --file=templates.js --sep=-");
    }

}