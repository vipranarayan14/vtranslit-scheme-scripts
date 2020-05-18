const fs = require('fs').promises;

const Ajv = require('ajv');
const yaml = require('js-yaml');

const vTranslitSchemeSchema = require('../utils/vtranslit-scheme-schema.json');

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
  console.log('\nSchemeValidation: No problems in the scheme.');

const validate = (filepath) =>
  loadScheme(filepath)
    .then(convertToJSON)
    .then(validateScheme)
    .then(logNoProblems);

module.exports = validate;
