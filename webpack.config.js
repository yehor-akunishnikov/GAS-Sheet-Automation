const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = () => {
  return {
    mode: 'production',
    entry: {
        index: './index.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'src'),
    },
    target: ['web', 'es5'],
    plugins: [],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  };
}
