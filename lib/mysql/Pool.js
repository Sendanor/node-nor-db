/* Generic Node.js Database Library */
"use strict";

var Q = require('q');
var extend = require('nor-extend');
var MySQL_Connection = require('./Connection.js');

/** Create MySQL connection pool object */
function MySQL_Pool(config) {
	if(!(this instanceof arguments.callee)) {
		return new (arguments.callee)(config);
	}
	var self = this;
	if(!config) { throw new TypeError("config not set"); }
	self._pool = require('mysql').createPool(config);
	self._get_connection = Q.nfbind(self._pool.getConnection.bind(self._pool));
}

/** Fetch connection from pool
 * @returns Promise for connection
 */
MySQL_Pool.prototype.getConnection = function() {
	var self = this;
	var p = self._get_connection().then(function(conn) {
		return new MySQL_Connection(conn);
	});
	return extend.promise(MySQL_Connection, p);
};

// Exports
module.exports = MySQL_Pool;

/* EOF */
