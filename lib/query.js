/* Generic Node.js Database Library */

var is = require('./is.js');
var query = module.exports = {};
var RawQuery = require('./RawQuery.js');

/* */
function RawQuery(str, params) {
	var self = this;
	self._str = str;
	self._params = params;
}

/* EOF */
