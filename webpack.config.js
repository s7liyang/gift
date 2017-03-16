const webpack = require('webpack');
const path = require('path');
const entryJs = require('./src/entry');

// const nodeModules = path.join(__dirname, 'node_modules');
const env = process.env.NODE_ENV;
// const model = process.argv[2].replace('--', '');

const entry = entryJs;
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    }
  })
];
let [publicPath, loaders, devtool] = ['', '', ''];
if (env !== 'production') {
  loaders = [
    'babel?presets[]=es2015'
  ];
  devtool = 'eval-source-map';
  plugins.push(new webpack.NoErrorsPlugin());
} else {
  publicPath = '';
  loaders = ['babel?presets[]=es2015'];
  devtool = 'hidden-source-map';
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

const config = {
  entry,
  resolve: {
    // alias,
    extensions: ['', '.web.jsx', '.web.js', '.js', '.jsx', '.web.tsx', '.tsx', '.web.ts', '.ts']
  },
  output: {
    publicPath,
    path: path.resolve(__dirname, './output/assert/js'),
    filename: '[name].js'
  },
  devtool,
  // devServer: {
  //   historyApiFallback: true,
  //   hot: true,
  //   progress: true
  // },
  plugins,
  module: {
    // noParse: [
    //   path.resolve(nodeModules, 'react/dist/react.js')
    // ],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/tsp-util')],
      loaders
    }]
  }
};

module.exports = config;
