// Include all files except index.js
"use strict";
module.exports = {
	'dir': function(dirname, index, mod) {
		index = index || 'index.js';
		mod = mod || {};
		require('fs').readdirSync(dirname).filter(function(f) { return f !== index; }).forEach(function(f) { mod[f.replace(/\.js/i, "")] = require(dirname+'/'+f); });
		return mod;
	}
};
