/* Generic Node.js Database Library */

var is = require('./is.js');

/* */
function Raw(raw, params) {
	if(!(this instanceof arguments.callee)) {
		return new (arguments.callee)(raw, params);
	}
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
