thoughtpad-plugin-multilanguage
===============================

[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

A thoughtpad plugin that compiles multiple languages for the same page if they are available

## Usage

The plugin should be loaded using the [thoughtpad-plugin-manager](https://github.com/thoughtpad/thoughtpad-plugin-manager). Once this has been done then the plugin will respond to events. To use standalone:

```JavaScript
var man = require('thoughtpad-plugin-manager'),
    tags = require('thoughtpad-plugin-multilanguage');

yield thoughtpad.notify("html-precompile-all-request");
```

The plugin will emit a `html-compile-all-request` if additional languages are found in the config.

## Config File Setup

The multilanguage pages will be compiled depending on their configuration. Use the `additionalLanguages` array to identify them. The current language will be included in the `data` object when compiling pages.

```JavaScript
language: 'en',
additionalLanguages: ['fr'],
pages: {
    'a-page': {
        title: {
            en: 'Title',
            fr: 'Title'
        },
        additionalLanguages: ['fr']
    }
}
```

## Tests

Ensure you have globally installed mocha - `npm -g install mocha`. Then you can run:

`mocha --harmony-generators`

Alternatively if you are in a *NIX environment `npm test` will run the tests plus coverage data.

## License

The code is available under the [MIT license](http://deif.mit-license.org/).

[travis-image]: https://img.shields.io/travis/thoughtpad/thoughtpad-plugin-multilanguage/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/thoughtpad/thoughtpad-plugin-multilanguage
[coveralls-image]: https://img.shields.io/coveralls/thoughtpad/thoughtpad-plugin-multilanguage/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/thoughtpad/thoughtpad-plugin-multilanguage?branch=master