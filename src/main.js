var init = function (thoughtpad) {
    thoughtpad.subscribe("html-postcompile-all-request", compileLanguages);
    thoughtpad.subscribe('html-precompile-all-request', changeFolder);
},

changeFolder = function *(obj) {
    var config = obj.thoughtpad.config;

    if (!config.language) {
        config.language = 'en';
    }

    config.startFolder = '/' + config.language + '/';
},

compileLanguages = function *(obj) {
    var config = obj.thoughtpad.config,
        i,
        len,
        page,
        previousLanguage = config.language,
        splits;

    if (config.additionalLanguages) {
        i = 0;
        len = config.additionalLanguages.length;

        // For each additional language, change the url to update the new name of the file to compile and recompile site
        for (i; i < len; i++) {
            config.language = config.additionalLanguages[i];
            config.startFolder = '/' + config.language + '/';

            for (page in config.pages) {
                if (config.pages[page].additionalLanguages && config.pages[page].additionalLanguages.indexOf(config.language) !== -1) {
                    splits = config.pages[page].url.split('.');
                    config.pages[page].url = splits.shift().replace('-' + previousLanguage, '') + '-' + config.language + '.' + splits.join('.');
                }
                // Reset the fullUrl and contents so the page recompiles
                config.pages[page].fullUrl = null;
                config.pages[page].content = null;
            }

            yield obj.thoughtpad.notify('html-compile-all-request');
            previousLanguage = config.language;
        }
    }

};

module.exports = {
    init: init
};
