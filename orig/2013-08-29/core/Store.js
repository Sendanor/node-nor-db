/* Generic Node.js Database Library */
"use strict";

var Raw = require('./Raw.js');
var extend = require('nor-extend');
var is = require('nor-is');

/* */
function Store() {
	if(!(this instanceof Store)) {
		return new Store(raw, params);
	}
	var self = this;
	self._data = {};
	self._raw_by_key = {};
	self._raw_list = [];
}

/* */
Store.prototype.valueOf = function() {
	var self = this;
	return extend.copy(self._data);
};

/* */
Store.prototype.toString = function() {
	return this._raw_list.map(function(r) { return r.toString(); }).join(' ');
};

/* Merge all stored data into single `Raw` object */
Store.prototype.toRaw = function() {
	var params = [];
	params = params.concat.apply(params, 
		parts.filter(function(p) {
			return is.objOf(p, Raw);
		}).map(function(p) {
			return p.params();
		})
	);
	return new Raw(this.toString(), params);
});

/** Returns true if part of the query exists
 * @params key {string} Keyword
 * @returns Instance of itself for chaining.
 */
Store.prototype.exists = function(key) {
	return this._data[key] !== undefined ? true : false;
};

/** Save part of the query
 * @params key {string} Keyword
 * @params opts {mixed} Original value of the option
 * @params raw {Raw} Compiled `Raw` object
 * @returns Instance of itself for chaining.
 */
Store.prototype.save = function(key, opts, raw) {
	if( is.string(key) && is.objOf(raw, Raw) ) { throw new TypeError("bad argument"); }
	var exists = this.exists(key);
	this._data[key] = opts;
	this._raw_by_key[key] = raw;
	if(exists) {
		this._raw_list.forEach(function(r) { if(r.key === key) { r.raw = raw; } });
	} else {
		this._raw_list.push( {'key': key, 'raw':raw} );
	}
	return this;
};

// Exports
module.exports = Store;

/* EOF */
