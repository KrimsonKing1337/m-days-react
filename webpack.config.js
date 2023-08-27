const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const root = path.join(__dirname);
const publicFolder = path.join(__dirname, '../m-days-public/');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = (env = {}, argv) => {
  const webpackMode = argv.mode;
  const { analyze, mobile, sb } = env;
  const isProd = webpackMode === 'production';
  const processEnv = dotenv.parsed;

  const plugins = [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(processEnv),
      'isSbMode': JSON.stringify(sb),
    }),
    new HtmlWebpackPlugin({
      template: `${publicFolder}/index.ejs`,
      filename: 'index.html',
      scriptLoading: 'blocking', // removes defer
      isMobile: !!mobile,
      isProd,
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: `${publicFolder}/`,
        to: `${root}/dist/`,
      }],
    }),
  ];

  if (analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  const rules = [
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.(tsx?|jsx?)$/,
      use: [
        'babel-loader',
        'astroturf/loader', {
          loader: 'ifdef-loader',
          options: {
            env: env,
          },
        }],
      exclude: /node_modules/,
    },
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]__[hash:base64:5]',
              auto: (resourcePath) => !resourcePath.includes('react-toastify'),
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer', {
                  flexbox: true,
                }),
              ],
            },
          },
        },
        { loader: 'sass-loader' },
      ],
    },
    {
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /sprite/,
          use: [
            {
              loader: 'url-loader',
              options: {
                esModule: false,
              },
            },
          ],
        },
        {
          use: ['@svgr/webpack'],
        },
      ],
    },
    {
      test: /\.(jpeg|jpg|png|docx)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            esModule: false,
          },
        },
      ],
    },
    { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader?limit=100000'] },
  ];

  if (mobile) {
    rules.push({
      test: /\.(tsx?|jsx?|json)$/,
      loader: 'string-replace-loader',
      options: {
        search: '/assets',
        replace: 'file:///android_asset/www/assets',
        flags: 'g',
      },
    });
  }

  const buildDir = path.join(__dirname, (mobile ? 'cordova/www' : 'dist'));

  return {
    entry: ['core-js/stable', './src/index.tsx'],
    mode: webpackMode,
    devtool: !isProd ? 'eval-source-map' : false,
    devServer: {
      contentBase: buildDir,
      port: 3001, // todo
      hot: true,
      liveReload: false,
      historyApiFallback: true,
    },
    output: {
      // пустой publicPath нужен для кордовы. она не может найти bundle.min.js, если его путь начинается с '/'
      publicPath: mobile ? '' : '/',
      path: buildDir,
      filename: '[name].[contenthash].js',
    },
    target: !isProd ? 'web' : ['web', 'es5'],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      modules: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, './node_modules'),
        path.resolve(__dirname, './assets'),
        path.resolve(publicFolder),
      ],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, './assets'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
      fallback: {
        crypto: false,
      },
    },
    module: {
      rules: rules,
    },
    plugins: plugins,
    optimization: {
      minimizer: [new TerserPlugin({ extractComments: false })],
    },
  };
};
