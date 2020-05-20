import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import _webpack from 'webpack';

import log from '../utils/log';

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
      plugins: [new CleanWebpackPlugin()],
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

export const build = (entry, outputDir, outputFile) => () =>
  new Promise((resolve, reject) => {
    makeConfig(entry, outputDir, outputFile)
      .then(webpack)
      .then(logBuildDetails)
      .then(resolve)
      .catch(reject);
  });
