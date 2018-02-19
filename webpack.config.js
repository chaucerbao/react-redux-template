// Dependencies
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Paths
const src = path.resolve(__dirname, 'src')
const dest = path.resolve(__dirname, 'public')

const config = {
  context: __dirname,
  entry: {
    script: path.join(src, 'index.tsx')
  },
  output: {
    path: dest,
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: src,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: { workers: require('os').cpus().length - 1 }
          },
          { loader: 'ts-loader', options: { happyPackMode: true } }
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true, watch: src }),
    new HtmlWebpackPlugin({
      title: 'React/Redux Project',
      template: path.join(src, 'index.html'),
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    })
  ],
  resolve: {
    modules: [src, 'node_modules'],
    extensions: ['.js', '.ts', '.tsx']
  },
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
}

module.exports = config
