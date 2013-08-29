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

/* Connect to the server */
//Connection.prototype.connect = function() { };

/* Query */
//Connection.prototype.query = function() { };

/* End connection */
//Connection.prototype.end = function() { };

/* Change user */
//Connection.prototype.changeUser = function() { };

/* Start transaction */
Connection.prototype.start = function() {
	return this.query();
};

/* Commit transaction */
Connection.prototype.commit = function() {
	return this.query(query.commit().query());
};

/* Rollback transaction */
Connection.prototype.rollback = function() {
	return this.query(query.rollback().query());
};

/* Select query */
Connection.prototype.select = function(opts) {
	var self = this;
	var q = query.select(opts);
	return self.query(q.query(), q.params());
};

/* Insert query */
Connection.prototype.insert = function(opts) {
	var self = this;
	var q = query.insert(opts);
	return self.query(q.query(), q.params());
};

/* Update query */
Connection.prototype.update = function(opts) {
	var self = this;
	var q = query.update(opts);
	return self.query(q.query(), q.params());
};

/* Delete query */
Connection.prototype.delete = function(opts) {
	var self = this;
	var q = query.delete(opts);
	return self.query(q.query(), q.params());
};

// Exports
module.exports = Connection;

/* EOF */
