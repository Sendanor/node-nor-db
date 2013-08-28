// Include ./core and all plugin dirs
"use strict";
var mod = module.exports = require('./core');
mod.require.dir(__dirname, 'core', mod);
