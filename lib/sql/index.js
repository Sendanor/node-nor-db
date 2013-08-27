// Include all files except index.js
"use strict";
var mod = module.exports = {};
fs.readdirSync(__dirname).filter(function(f) { return f !== 'index.js'; }).forEach(function(f) { mod[f.replace(/\.js/i, "")] = require('./'+f); });
