/* Generic Node.js Database Library */
"use strict";

var extend = require('nor-extend');
var util = require('util');
var is = require('nor-is');

/** `db.MySQL.Query` constructor */
function Query() {
	this._data = {};
}

// Export `Raw` as `Query.Raw`
Query.Raw = require('./Raw.js');

/** Returns a copy of the internal plain data object */
Query.prototype.valueOf = function() {
	// FIXME: This type of cloning is probably quite slow...
	return extend.copy(this._data);
};

/** Returns the compiled instance of `Query.Raw` */
Query.prototype.raw = function() {
	return /* fixme */;
};

// Exports
module.exports = Query;

/* EOF */
