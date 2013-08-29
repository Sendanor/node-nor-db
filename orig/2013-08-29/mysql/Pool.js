/* Generic Node.js Database Library */
"use strict";

var util = require('util');
var Q = require('q');
var extend = require('nor-extend');
var db = require('../core/');
var Connection = require('./Connection.js');

/** Create MySQL connection pool object */
function Pool(config) {
	if(!(this instanceof Pool)) {
		return new Pool(config);
	}
	var self = this;
	if(!config) { throw new TypeError("config not set"); }
	self._pool = require('mysql').createPool(config);
	self._get_connection = Q.nfbind(self._pool.getConnection.bind(self._pool));
	db.Pool.call(this);
}

util.inherits(Pool, db.Pool);

/** Async version of Pool creation (not yet really async but could be in the future!)
 * @returns a promise of pool
 */
Pool.create = function(config) {
	var p = Q.fcall(function() {
		return new Pool(config);
	});
	return extend.promise([Pool, Connection], p);
};

/** Fetch connection from pool
 * @returns Promise for connection
 */
Pool.prototype.getConnection = function() {
	var self = this;
	var p = self._get_connection().then(function(conn) {
		return new Connection(conn);
	});
	return extend.promise(Connection, p);
};

// Exports
module.exports = Pool;

/* EOF */
