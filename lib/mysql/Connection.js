/* Generic Node.js Database Library */
"use strict";

var util = require('util');
var Q = require('q');
var extend = require('nor-extend');
var db = require('../core');

/** Create MySQL connection object */
function Connection(conn) {
	if(!(this instanceof Connection)) {
		return new Connection(conn);
	}
	var self = this;
	if(!conn) { throw new TypeError("no connection set"); }
	self._connection = conn;
	self._connect    = Q.nfbind(self._connection.connect.bind(self._connection));
	self._query      = Q.nfbind(self._connection.query.bind(self._connection));
	self._end        = Q.nfbind(self._connection.end.bind(self._connection));
	self._release        = Q.nfbind(self._connection.release.bind(self._connection));
	self._changeUser = Q.nfbind(self._connection.changeUser.bind(self._connection));
	db.Connection.call(self, conn);
}

util.inherits(Connection, db.Connection);

/* Connect to the server */
Connection.prototype.connect = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend.promise([Connection, Array], self._connect.apply(self, args).then(function() { return self; }) );
};

/* Query */
Connection.prototype.query = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	//console.error("DEBUG: Connection.prototype.query(" + args.map(function(i) { return JSON.stringify(i); }).join(", ") + ")");
	var p = extend.promise(
		[Array, Connection],
		self._query.apply(self, args).then(function(result) {
			return extend.object(self, result);
		})
	);
	return p;
};

/* End connection */
Connection.prototype.end = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend.promise( [Connection, Array], self._end.apply(self, args).then(function() { return self; }) );
};

/* Release connection back to pool */
Connection.prototype.release = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend.promise( [Connection, Array], self._release.apply(self, args).then(function() { return self; }) );
};

/* Change user */
Connection.prototype.changeUser = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend.promise( [Connection, Array], self._changeUser.apply(self, args).then(function() { return self; }) );
};

/** Start transaction */
Connection.prototype.start = function() {
	var self = this;
	return self.query('START TRANSACTION').then(function() { return self; });
};

/** Commit transaction */
Connection.prototype.commit = function() {
	var self = this;
	return self.query('COMMIT').then(function() { return self; });
};

/** Rollback transaction */
Connection.prototype.rollback = function() {
	var self = this;
	return self.query('ROLLBACK').then(function() { return self; });
};

// Exports
module.exports = Connection;

/* EOF */
