/* Generic Node.js Database Library */
"use strict";

var extend = require('nor-extend');
var util = require('util');
var is = require('nor-is');
var Store = require('./Store.js');

/** `db.MySQL.Query` constructor */
function Query() {
	this.store = new Store();
}

// Export `Raw` as `Query.Raw`
Query.Raw = require('./Raw.js');

// Export `Store` as `Query.Store`
Query.Store = Store;

/** Returns a copy of the internal plain data object */
Query.prototype.valueOf = function() {
	// FIXME: This type of cloning is probably quite slow...
	return this.store.valueOf();
};

/** Merges all stored `Query.Raw` objects into one single object */
Query.prototype.raw = function() {
	return this.store.raw();
};

/** */
/*
Query.prototype.build_parts = function build_parts(opts, parts, keys, separator, escape) {
	opts = opts || {};
	separator = separator || ' ';

	escape = escape || function(x) { return x; };

	// Build array of parts
	parts = (parts !== undefined) ? (is.array(parts) ? parts : [parts]) : [];

	if(keys) {
		keys.forEach(function(key) {
			parts.push( query[key](opts) );
		});
	}
	
	// Filter empty parts away
	parts = parts.filter(function(p) {
		return is.true( p && ((''+p).trim() !== '') );
	});

	// Merge params
	return query.Raw( parts.map(escape).join(separator),  );
};
*/

// Exports
module.exports = Query;

/* EOF */
