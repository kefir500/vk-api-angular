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
    preprocessors: {
      '**/src/**/*.js': ['coverage']
    },
    coverageReporter: {
      type : 'html',
      dir : './test/coverage/'
    },
    reporters: ['progress', 'coverage'],
    browsers: ['Chrome'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity
  });
};
