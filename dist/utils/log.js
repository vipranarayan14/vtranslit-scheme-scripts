"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _console=console,info=_console.info,error=_console.error;var handleArray=function handleArray(log){return function(msg){return Array.isArray(msg)?msg.forEach(function(_msg){return log("\n".concat(_msg))}):log("\n".concat(msg))}};var _default={info:handleArray(info),error:handleArray(error)};exports["default"]=_default;