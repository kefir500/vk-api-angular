module.exports = function (config) {

  config.set({
    frameworks: ['jasmine'],
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './src/**/*.js',
      './test/mocks.js',
      './test/spec/**/*.spec.js'
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      '**/src/**/*.js': ['coverage']
    },
    coverageReporter: {
      dir: './test/coverage',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'lcovonly', subdir: 'lcov'}
      ]
    },
    browsers: ['PhantomJS'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true
  });
};
