'use strict';

module.exports = function(config) {
    config.set({

        basePath: '.',

        frameworks: ['jasmine'],

        files: [
            "test/bundle.spec.js"
        ],

        port: 9876,

        logLevel: config.LOG_INFO,

        colors: true,

        autoWatch: true,

        browsers: ['Chrome', 'PhantomJS'],

        reporters: ['mocha'],

        singleRun: true
    })

    if (process.env.CIRCLECI) {
        config.browsers = ['PhantomJS'];
    }
};
