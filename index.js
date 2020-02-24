const babel = require('@babel/core');
const optionalChainingPlugin = require('@babel/plugin-syntax-optional-chaining');

global.babel = babel;
global.optionalChainingPlugin = optionalChainingPlugin;


process.stdin.resume();
