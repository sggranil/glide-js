const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode || 'production';

  const buildId = Date.now();

  return {
    mode: mode,
    entry: {
      main: './src/script.ts',
    },
    output: {
      filename: `[name]-${buildId}.js`,
      path: path.resolve(__dirname, 'dist/app'),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.scss'],
      alias: {
        '@glide-js': path.resolve(__dirname, 'glide-js/lib')
      },
    },
    stats: {
      all: false,
      errors: true,
      warnings: true,
      modules: false,
      entrypoints: false,
      children: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: `index.html`,
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: `style-${buildId}.css`,
      }),
      {
        apply: (compiler) => {
          compiler.hooks.done.tap('glideJSPlugin', (stats) => {
            if (stats.hasErrors()) {
              console.error('\n✖ Build failed with the following errors:\n');
              stats.toJson().errors.forEach((error) => {
                console.error(`  - ${error}`);
              });
              console.log('\nPlease fix the errors and try again.');
            } else {
              console.log('\n✔ Build completed successfully!');
              console.log('Edited files:\n');

              const editedFiles = stats.toJson().modules
                .filter(module => module.reasons.length > 0)
                .map(module => module.name)
                .filter((value, index, self) => self.indexOf(value) === index)
                .filter(file => !file.includes('node_modules'));

              if (editedFiles.length > 0) {
                editedFiles.forEach(file => {
                  console.log(`  - ${file}`);
                });
              } else {
                console.log('  - No edited files detected.\n');
              }

              console.log('\nYou can now view your project!\n\nLive Development: http://localhost:9000\nBuild Files: dist/app/\n');
            }
          });
        },
      },
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist/app'),
      },
      compress: true,
      port: 9000,
      client: {
        overlay: false,
        progress: false,
        logging: 'none',
      },
      watchFiles: ['src/**/*'],
      historyApiFallback: true
    },
  };
};
