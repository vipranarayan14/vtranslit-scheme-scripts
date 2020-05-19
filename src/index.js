#!/usr/bin/env node

import path from 'path';

import log from './utils/log';

import { build } from './commands/build';
import { validate } from './commands/validate';

const command = process.argv[2];

const USAGE = `
Usage: vtranslit-scheme <command>

where, <command> is one of:
  build     Bu vtranslit schemes written in YAML as a library.
  validate  Validate vtranslit scheme structure. 
`;

const invalidCommand = (cmd) =>
  `\nError: "${cmd}" a not valid command. \n${USAGE}`;

const srcFile = path.join(process.cwd(), './src/scheme.yml');
const outputDir = path.join(process.cwd(), './dist');
const outputFile = 'scheme.js';

if (!command) {
  log.info(USAGE);
} else {
  if (command === 'build') {
    validate(srcFile)
      .then(build(srcFile, outputDir, outputFile))
      .catch(log.error);
  } else if (command === 'validate') {
    validate(srcFile).catch(log.error);
  } else {
    log.info(invalidCommand(command));
  }
}
