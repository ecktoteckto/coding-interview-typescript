const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // `mode` will be set to `production` and comes with included optimizations
  // when building to be run on AWS or similar.
  // https://webpack.js.org/configuration/mode/
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',

  // to determine what source maps to use per dev or prod
  // https://webpack.js.org/configuration/devtool/
  devtool: slsw.lib.webpack.isLocal ? 'source-map' : 'cheap-source-map',

  // the provided argument will be an object referencing functions as defined
  // in your `serverless.yml` .
  // https://webpack.js.org/concepts/entry-points/
  entry: slsw.lib.entries,

  target: 'node',

  resolve: {
    // What file extensions we want Webpack to care about, and in what order
    // https://webpack.js.org/configuration/resolve/#resolveextensions
    extensions: ['.js', '.ts'],
  },

  // Where the bundled files will be output. Not strictly necessary with
  // Serverless Webpack.
  // https://webpack.js.org/configuration/output/
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },

  // Anything that will be available to the bundled code in the runtime
  // environment and does not need to be included in any of the bundles.
  //
  // In AWS Lambda, the `aws-sdk` is available and we almost certainly want to
  // exclude it from our bundle(s). Similarly, because it's a Node lambda,
  // Node's native modules will also be available.
  externals: ['aws-sdk', nodeExternals()],
  module: {
    // Instruct Webpack to use the `ts-loader` for any TypeScript files, else it
    // won't know what to do with them.
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, '.webpack'),
            path.resolve(__dirname, 'node_modules'),
          ],
        ],
        // And here we have options for ts-loader
        // https://www.npmjs.com/package/ts-loader#options
        options: {
          // Disable type checking, this will lead to improved build times
          transpileOnly: false,
          // Enable file caching, can be quite useful when running offline
          experimentalFileCaching: true,
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
