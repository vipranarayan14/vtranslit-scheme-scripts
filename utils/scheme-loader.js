const yaml = require('js-yaml');

const schemeLoader = (schemeAsYaml) => {
  const scheme = yaml.safeLoad(schemeAsYaml);

  return `export const vTranslitScheme${scheme.code} = ${JSON.stringify(
    scheme
  )}`;
};

module.exports = schemeLoader;
