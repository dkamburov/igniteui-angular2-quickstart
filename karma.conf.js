module.exports = function(config) {

  var appBase    = 'src/';       // transpiled app JS and map files
  var appSrcBase = appBase;      // app source TS files

  // Testing helpers (optional) are conventionally in a folder called `testing`
  var testingBase    = 'testing/'; // transpiled test JS and map files
  var testingSrcBase = 'testing/'; // test source TS files

  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter')
    ],

    client: {
      builtPaths: [appBase, testingBase], // add more spec base paths as needed
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    customLaunchers: {
      // From the CLI. Not used here but interesting
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    files: [
		"http://code.jquery.com/jquery-1.12.4.js",
        "http://code.jquery.com/ui/1.11.4/jquery-ui.min.js",
        "http://cdn-na.infragistics.com/igniteui/latest/js/infragistics.core.js",
        "http://cdn-na.infragistics.com/igniteui/latest/js/infragistics.lob.js",
        "http://cdn-na.infragistics.com/igniteui/latest/js/infragistics.dv.js",
        "https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js",

        // css files
        "http://cdn-na.infragistics.com/igniteui/latest/css/themes/infragistics/infragistics.theme.css",
        "http://cdn-na.infragistics.com/igniteui/latest/css/structure/infragistics.css",
            
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',

      // zone.js
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',
      

      // RxJs
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // Paths loaded via module imports:
      // Angular itself
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

      { pattern: appBase + '/systemjs.config.js', included: false, watched: false },
      { pattern: appBase + '/systemjs.config.extras.js', included: false, watched: false },
      { pattern: 'node_modules/igniteui-angular2/**/*.js', included: false, watched: false },
      'karma-test-shim.js', // optionally extend SystemJS mapping e.g., with barrels

      // transpiled application & spec code paths loaded via module imports
       { pattern: appBase + '**/*.js', included: false, watched: true },
      { pattern: testingBase + '**/*.js', included: false, watched: true },


      // Asset (HTML & CSS) paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      { pattern: appBase + '**/*.html', included: false, watched: true },
      { pattern: appBase + '**/*.css', included: false, watched: true },

      // Paths for debugging with source maps in dev tools
      { pattern: appBase + '**/*.ts', included: false, watched: false },
      { pattern: appBase + '**/*.js.map', included: false, watched: false },
      { pattern: testingSrcBase + '**/*.ts', included: false, watched: false },
      { pattern: testingBase + '**/*.js.map', included: false, watched: false}
    ],

    // Proxied base paths for loading assets
    proxies: {
      // required for modules fetched by SystemJS
      '/base/src/node_modules/': '/base/node_modules/'
    },

    exclude: [],
    preprocessors: {},
    // disabled HtmlReporter; suddenly crashing w/ strange socket error
    reporters: ['progress', 'kjhtml'],//'html'],

    // HtmlReporter configuration
    htmlReporter: {
      // Open this file to see results in browser
      outputFile: '_test-output/tests.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: __dirname
    },
    customLaunchers: {
      // From the CLI. Not used here but interesting
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--web-security=false']
      },
      PhantomJS_noSecurity: {
        base: 'PhantomJS',
        flags: [
          '--ignore-ssl-errors=true'
        ]
      }
    },
    port: 9876,
    colors: true,
    //logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}
