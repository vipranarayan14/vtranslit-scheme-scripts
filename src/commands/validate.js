import { promises as fs } from 'fs';

import Ajv from 'ajv';
import yaml from 'js-yaml';

import vTranslitSchemeSchema from '../utils/vtranslit-scheme-schema.json';

import log from '../utils/log';

const loadScheme = (filepath) => fs.readFile(filepath, 'utf-8');

const convertToJSON = (schemeAsYAML) =>
  new Promise((resolve) => resolve(yaml.safeLoad(schemeAsYAML)));

const ajv = new Ajv({ allErrors: true });
const validateJSON = ajv.compile(vTranslitSchemeSchema);

const validateScheme = (schemeAsJSON) =>
  new Promise((resolve, reject) => {
    const valid = validateJSON(schemeAsJSON);
    if (!valid) {
      reject(
        validateJSON.errors.map(
          ({ dataPath, message, params }) =>
            `SchemeValidationError: "${dataPath}" in scheme ${message}. Rule: ${JSON.stringify(
              params
            )}`
        )
      );
    }
    resolve();
  });

const logNoProblems = () =>
  log.info('\nSchemeValidation: No problems in the scheme.');

export const validate = (filepath) =>
  loadScheme(filepath)
    .then(convertToJSON)
    .then(validateScheme)
    .then(logNoProblems);
