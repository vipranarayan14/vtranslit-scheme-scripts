#!/usr/bin/env node

const path = require('path');

const build = require('../commands/build');
const validate = require('../commands/validate');

const command = process.argv[2];

const { log } = console;

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
  log(USAGE);
} else {
  if (command === 'build') {
    validate(srcFile)
      .then(build(srcFile, outputDir, outputFile))
      .catch(console.error);
  } else if (command === 'validate') {
    validate(srcFile).catch(console.error);
  } else {
    log(invalidCommand(command));
  }
}
