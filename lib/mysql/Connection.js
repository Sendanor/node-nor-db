/* Generic Node.js Database Library */
"use strict";

var Q = require('q');
var query = require('../query.js');
var extend = require('nor-extend');

/** Create MySQL connection object */
function MySQL_Connection(conn) {
	if(!(this instanceof MySQL_Connection)) {
		return new MySQL_Connection(conn);
	}
	var self = this;
	if(!conn) { throw new TypeError("no connection set"); }
	self._connection = conn;
	self._connect    = Q.nfbind(self._connection.connect.bind(self._connection));
	self._query      = Q.nfbind(self._connection.query.bind(self._connection));
	self._end        = Q.nfbind(self._connection.end.bind(self._connection));
	self._changeUser = Q.nfbind(self._connection.changeUser.bind(self._connection));
}

/* Connect to the server */
MySQL_Connection.prototype.connect = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend.promise([MySQL_Connection, Array], self._connect.apply(self, args).then(function() { return self; }) );
};

/* Query */
MySQL_Connection.prototype.query = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	//console.error("DEBUG: MySQL_Connection.prototype.query(" + args.map(function(i) { return JSON.stringify(i); }).join(", ") + ")");
	var p = extend.promise(
		[Array, MySQL_Connection],
		self._query.apply(self, args).then(function(result) {
			return extend.object(self, result);
		})
	);
	return p;
};

/* End connection */
MySQL_Connection.prototype.end = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend.promise( [MySQL_Connection, Array], self._end.apply(self, args).then(function() { return self; }) );
};

/* Change user */
MySQL_Connection.prototype.changeUser = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend.promise( [MySQL_Connection, Array], self._changeUser.apply(self, args).then(function() { return self; }) );
};

/* Start transaction */
MySQL_Connection.prototype.begin = function() {
	var self = this;
	return self.query('START TRANSACTION');
};

/* Commit transaction */
MySQL_Connection.prototype.commit = function() {
	var self = this;
	return self.query('COMMIT');
};

/* Rollback transaction */
MySQL_Connection.prototype.rollback = function() {
	var self = this;
	return self.query('ROLLBACK');
};

/* Select query */
MySQL_Connection.prototype.select = function(opts) {
	var self = this;
	var q = query.select(opts);
	return self.query(q.query(), q.params());
};

/* Insert query */
MySQL_Connection.prototype.insert = function(opts) {
	var self = this;
	var q = query.insert(opts);
	return self.query(q.query(), q.params());
};

/* Update query */
MySQL_Connection.prototype.update = function(opts) {
	var self = this;
	var q = query.update(opts);
	return self.query(q.query(), q.params());
};

/* Delete query */
MySQL_Connection.prototype.delete = function(opts) {
	var self = this;
	var q = query.delete(opts);
	return self.query(q.query(), q.params());
};

// Exports
module.exports = MySQL_Connection;

/* EOF */