const path = require('path');
const _rimraf = require('rimraf');
const _webpack = require('webpack');
const { promisify } = require('util');

const log = require('../utils/log');

const rimraf = promisify(_rimraf);

const webpack = (config) =>
  new Promise((resolve, reject) =>
    _webpack(config, (error, stats) => {
      const err = error || stats.hasErrors();

      if (err) {
        reject(
          `SchemeBuildError: WebpackError: \n${
            error || stats.compilation.errors
          }`
        );
      }

      resolve(config);
    })
  );

const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    presets: [require.resolve('@babel/preset-env')],
  },
};

const schemeLoader = path.resolve(__dirname, '../utils/scheme-loader.js');

const makeConfig = (entry, dir, filename) => () =>
  new Promise((resolve) =>
    resolve({
      entry,
      mode: 'production',
      module: {
        rules: [
          {
            use: [babelLoader, schemeLoader],
          },
        ],
      },
      output: {
        filename,
        libraryTarget: 'umd',
        globalObject: 'this',
        path: dir,
      },
    })
  );

const getRelativePath = (filepath) => path.relative(process.cwd(), filepath);

const logBuildDetails = ({ entry, output }) => {
  const srcFile = getRelativePath(entry);
  const outputDir = getRelativePath(output.path);
  const outputFile = getRelativePath(output.filename);

  log.info(
    `SchemeBuild: "${srcFile}" is converted and written to "${outputDir}/${outputFile}."`
  );
};

const build = (entry, outputDir, outputFile) => () =>
  new Promise((resolve, reject) => {
    rimraf(outputDir)
      .then(makeConfig(entry, outputDir, outputFile))
      .then(webpack)
      .then(logBuildDetails)
      .then(resolve)
      .catch(reject);
  });

module.exports = build;