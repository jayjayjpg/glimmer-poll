'use strict';

//const require('@glimmer/application-pipeline');

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
//const resolve = require('rollup-plugin-node-resolve');
//const commonjs = require('rollup-plugin-commonjs');
//const babel = require('rollup-plugin-babel');
//const builtins = require('rollup-plugin-node-builtins');


module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    // Add options here
  /*  rollup: {
      plugins: [
        /* babel({
          exclude: 'node_modules/**'
        }), */
      //  resolve({ jsnext: true, module: true, main: true }),
      //  commonjs(),
        // builtins()
    //  ],
      /* external: [
        'child_process',
        'crypto',
        'events',
        'fs',
        'http',
        'https',
        'net',
        'path',
        'stream',
        'tls',
        'tty',
        'url',
        'util',
        'zlib'
      ],
      globals: {
        crypto: 'crypto',
        child_process: 'child_process',
        events: 'events',
        fs: 'fs',
        http: 'http',
        https: 'https',
        net: 'net',
        path: 'path',
        stream: 'stream',
        tls: 'tls',
        tty: 'tty',
        url: 'url',
        util: 'util',
        zlib: 'zlib'
      }, */

  //  }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
