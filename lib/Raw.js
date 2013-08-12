/* Generic Node.js Database Library */
"use strict";

var is = require('./is.js');

/* */
function Raw(raw, params) {
	if(!(this instanceof Raw)) {
		return new Raw(raw, params);
	}
	var self = this;
	self._raw = ''+raw;
	self._params = is.array(params) ? params : [];
}

/* */
Raw.prototype.valueOf = function() {
	var self = this;
	return JSON.stringify({'raw':self._raw, 'params':self.params});
};

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
