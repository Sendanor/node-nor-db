/* Generic Node.js Database Library */
"use strict";

var Q = require('q');

/** Create MySQL connection object */
function MySQL_Connection(conn) {
	if(!(this instanceof arguments.callee)) {
		return new (arguments.callee)(config);
	}
	var self = this;
	if(!conn) { throw new TypeError("conn not set"); }
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
	return extend_promise(self, "MySQL_Connection", self._connect.apply(self, args).then(function() { return self; }) );
};

/* Query */
MySQL_Connection.prototype.query = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	console.error("DEBUG: MySQL_Connection.prototype.query(" + args.map(function(i) { return JSON.stringify(i); }).join(", ") + ")");
	var p = extend_promise(self,
		["Array", "MySQL_Connection"],
		self._query.apply(self, args).then(function(result) {
			return extend_obj(self, "MySQL_Connection", result);
		})
	);
	return p;
};

/* End connection */
MySQL_Connection.prototype.end = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend_promise(self, "MySQL_Connection", self._end.apply(self, args).then(function() { return self; }) );
};

/* Change user */
MySQL_Connection.prototype.changeUser = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend_promise(self, "MySQL_Connection", self._changeUser.apply(self, args).then(function() { return self; }) );
};

/* Start transaction */
MySQL_Connection.prototype.begin = function() {
	var self = this;
	return self.query('START TRANSACTION').then(function() { return self; });
};

/* Commit transaction */
MySQL_Connection.prototype.commit = function() {
	var self = this;
	return self.query('COMMIT').then(function() { return self; });;
};

/* Rollback transaction */
MySQL_Connection.prototype.rollback = function() {
	var self = this;
	return self.query('ROLLBACK').then(function() { return self; });;
};

/* Select query */
MySQL_Connection.prototype.select = function(opts) {
	var self = this;
	var q = query.select(opts);
	return self.query(q.query(), q.params());
};

_propertyNames.MySQL_Connection = Object.getOwnPropertyNames(MySQL_Connection.prototype);

module.exports = MySQL_Connection;

/* EOF */
