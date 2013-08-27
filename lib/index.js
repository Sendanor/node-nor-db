// Include ./core and all plugin dirs
"use strict";
var mod = module.exports = require('./core');
fs.readdirSync(__dirname).filter(function(f) { return f !== 'core'; }).forEach(function(f) { mod[f] = require('./'+f); });
