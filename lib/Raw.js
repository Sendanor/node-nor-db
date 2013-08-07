/* Generic Node.js Database Library */

var is = require('./is.js');

/* */
function Raw(str, params) {
	var self = this;
	self._raw = ''+raw;
	self._params = is.array(params) ? params : [];
}

/* */
Raw.prototype.toString = function() {
	return this._raw;
};

/* */
Raw.prototype.query = function() {
	return this._raw;
};

/* */
Raw.prototype.params = function() {
	return this._params;
};

// Exports
module.exports = Raw;

/* EOF */
