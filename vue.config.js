// vue.config.js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin(),
    ],
    resolve: {
      fallback: {
        zlib: require.resolve('browserify-zlib'), // Polyfill for zlib
        // Add other polyfills if necessary
        // e.g. http: require.resolve('stream-http'),
        //      https: require.resolve('https-browserify'),
        //      stream: require.resolve('stream-browserify'),
      },
    },
  },
};
