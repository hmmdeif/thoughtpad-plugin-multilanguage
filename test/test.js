var should = require('should'),
    app = require('./../src/main'),
    co = require('co'),
    man = require('thoughtpad-plugin-manager'),
    config = require('./example-config'),
    path = require('path'),
    incorrectconfig = require('./incorrect-config'),
    thoughtpad;

describe("multilanguage plugin", function () {
    it("should change the start location for compiling pages", function (done) {
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = config;

        co(function *() {
            yield thoughtpad.notify("html-precompile-all-request");
            thoughtpad.config.startFolder.should.eql('/en/');
            done();
        })();
    });

    it("should change the start location for compiling pages even if language is missing", function (done) {
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = incorrectconfig;

        co(function *() {
            yield thoughtpad.notify("html-precompile-all-request");
            thoughtpad.config.startFolder.should.eql('/en/');
            done();
        })();
    });

    it("should not do anything if there are no additional languages", function (done) {
        var res = false;
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = incorrectconfig;

        thoughtpad.subscribe('html-compile-all-request', function *(res) {
            res = true;
        });

        co(function *() {
            yield thoughtpad.notify("html-postcompile-all-request");
            res.should.be.false;
            done();
        })();
    });

    it("should call compile command for each additional language", function (done) {
        var res = 0;
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = config;

        thoughtpad.subscribe('html-compile-all-request', function *() {
            res++;
        });

        co(function *() {
            yield thoughtpad.notify("html-postcompile-all-request");
            res.should.equal(2);
            thoughtpad.unsubscribe('html-compile-all-request');
            done();
        })();
    });

    it("should change the url of the page correctly", function (done) {
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = config;

        co(function *() {
            yield thoughtpad.notify("html-postcompile-all-request");
            thoughtpad.config.pages.home.url.should.eql('home-es.html');
            done();
        })();
    });

    it("should reset the full url", function (done) {
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = config;

        co(function *() {
            yield thoughtpad.notify("html-postcompile-all-request");
            (null === thoughtpad.config.pages.home.fullUrl).should.be.true;
            done();
        })();
    });

    it("should change the start location for additional languages", function (done) {
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = config;

        co(function *() {
            yield thoughtpad.notify("html-postcompile-all-request");
            thoughtpad.config.startFolder.should.eql('/es/');
            done();
        })();
    });
    
});