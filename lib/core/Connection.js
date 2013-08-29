/* Generic Node.js Database Library */
"use strict";

var Q = require('q');
//var query = require('./query.js');
var extend = require('nor-extend');

/** Base class `Connection` constructor */
function Connection(conn) {
	if(!(this instanceof Connection)) {
		return new Connection(conn);
	}
	var self = this;
	if(!conn) { throw new TypeError("no connection set"); }
	self._connection = conn;
}

// Exports
module.exports = Connection;

/* EOF */
