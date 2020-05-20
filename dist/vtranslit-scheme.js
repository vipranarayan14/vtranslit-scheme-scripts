#!/usr/bin/env node
!function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=10)}([function(e,n){e.exports=require("path")},function(e,n){e.exports=require("webpack")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("ajv")},function(e,n){e.exports=require("js-yaml")},function(e){e.exports=JSON.parse('{"type":"object","properties":{"code":{"type":"string","maxLength":4,"minLength":4},"name":{"type":"string"},"type":{"type":"string","enum":["brahmic","roman"]},"unicodeBlock":{"type":"string"},"map":{"properties":{"ayogavaha":{"type":"object","additionalProperties":{"type":"string"}},"consonants":{"type":"object","additionalProperties":{"type":"string"}},"symbols":{"type":"object","additionalProperties":{"type":"string"}},"vowelMarks":{"type":"object","additionalProperties":{"type":"string"}},"vowels":{"type":"object","additionalProperties":{"type":"string"}}},"required":["ayogavaha","consonants","symbols","vowelMarks","vowels"]}},"required":["code","name","type","unicodeBlock"]}')},function(e,n){e.exports=require("rimraf")},function(e,n){e.exports=require("resolve")},function(e,n){e.exports=require("babel-loader")},function(e,n){e.exports=require("clean-webpack-plugin")},function(e,n,r){"use strict";r.r(n);var t,o,i,a=r(0),c=r.n(a),u=console,s=u.info,l=u.error,p=function(e){return function(n){return Array.isArray(n)?n.forEach((function(n){return e("\n".concat(n))})):e("\n".concat(n))}},f={info:p(s),error:p(l)},d=(r(6),r(1)),m=r.n(d),y=(r(7),r(8),r(9).CleanWebpackPlugin),b=function(e){return new Promise((function(n,r){return m()(e,(function(t,o){(t||o.hasErrors())&&r("SchemeBuildError: WebpackError: \n".concat(t||o.compilation.errors)),n(e)}))}))},h={loader:"babel-loader",options:{presets:["@babel/preset-env"]}},v=function(e){return c.a.relative(process.cwd(),e)},g=function(e){var n=e.entry,r=e.output,t=v(n),o=v(r.path),i=v(r.filename);f.info('SchemeBuild: "'.concat(t,'" is converted and written to "').concat(o,"/").concat(i,'."'))},w=r(2),j=r(3),P=r.n(j),x=r(4),q=r.n(x),S=r(5),O=function(e){return new Promise((function(n){return n(q.a.safeLoad(e))}))},k=new P.a({allErrors:!0}).compile(S),E=function(e){return new Promise((function(n,r){k(e)||r(k.errors.map((function(e){var n=e.dataPath,r=e.message,t=e.params;return'SchemeValidationError: "'.concat(n,'" in scheme ').concat(r,". Rule: ").concat(JSON.stringify(t))}))),n()}))},M=function(){return f.info("\nSchemeValidation: No problems in the scheme.")},_=function(e){return function(e){return w.promises.readFile(e,"utf-8")}(e).then(O).then(E).then(M)},B=process.argv[2],L="\nUsage: vtranslit-scheme <command>\n\nwhere, <command> is one of:\n  build     Bu vtranslit schemes written in YAML as a library.\n  validate  Validate vtranslit scheme structure. \n",A=c.a.join(process.cwd(),"./src/scheme.yml"),N=c.a.join(process.cwd(),"./dist");B?"build"===B?_(A).then((t=A,o=N,i="scheme.js",function(){return new Promise((function(e,n){(function(e,n,r){return new Promise((function(t){return t({entry:e,mode:"production",module:{rules:[{use:[h,"vtranslit-scheme-loader"]}]},plugins:[new y],output:{filename:r,libraryTarget:"umd",globalObject:"this",path:n}})}))})(t,o,i).then(b).then(g).then(e).catch(n)}))})).catch(f.error):"validate"===B?_(A).catch(f.error):f.info('\nError: "'.concat(B,'" a not valid command. \n').concat(L)):f.info(L)}]);