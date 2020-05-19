"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.validate=void 0;var _fs=require("fs");var _ajv=_interopRequireDefault(require("ajv"));var _jsYaml=_interopRequireDefault(require("js-yaml"));var _vtranslitSchemeSchema=_interopRequireDefault(require("../utils/vtranslit-scheme-schema.json"));var _log=_interopRequireDefault(require("../utils/log"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var loadScheme=function loadScheme(filepath){return _fs.promises.readFile(filepath,"utf-8")};var convertToJSON=function convertToJSON(schemeAsYAML){return new Promise(function(resolve){return resolve(_jsYaml["default"].safeLoad(schemeAsYAML))})};var ajv=new _ajv["default"]({allErrors:true});var validateJSON=ajv.compile(_vtranslitSchemeSchema["default"]);var validateScheme=function validateScheme(schemeAsJSON){return new Promise(function(resolve,reject){var valid=validateJSON(schemeAsJSON);if(!valid){reject(validateJSON.errors.map(function(_ref){var dataPath=_ref.dataPath,message=_ref.message,params=_ref.params;return"SchemeValidationError: \"".concat(dataPath,"\" in scheme ").concat(message,". Rule: ").concat(JSON.stringify(params))}))}resolve()})};var logNoProblems=function logNoProblems(){return _log["default"].info("\nSchemeValidation: No problems in the scheme.")};var validate=function validate(filepath){return loadScheme(filepath).then(convertToJSON).then(validateScheme).then(logNoProblems)};exports.validate=validate;