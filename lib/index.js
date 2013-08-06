/* Generic Node.js Database Library */

var Q = require('q');

/** Extend promises with our members */
function extend_promise(self, p) {
	var members = Object.keys(self.prototype);
	members.forEach(function(key) {
		p[key] = function() {
			var args = Array.prototype.slice.call(arguments);
			var ret = p.then(function(obj) {
				if(obj && obj[key] && (typeof obj[key] === 'function')) {
					return obj[key].apply(obj, args);
				} else {
					return obj[key];
				}
			});
			return ret;
		};
	});
	return p;
}

/** Create MySQL connection object */
function MySQL(config) {
	if(!(this instanceof arguments.callee)) {
		return new (arguments.callee)(config);
	}
	var self = this;
	if(!config) { throw new TypeError("config not set"); }
	self._connection = require('mysql').createConnection(config);
}

/* Connect to the server */
MySQL.prototype.connect = function() {
	var self = this;
	var p = extend_promise( self, Q.nfbind(self._connection.connect.bind(self._connection)).then(function() { return self; }) );
	return p;
};

/* Query */
MySQL.prototype.query = function() {
	var self = this;
	return extend_promise( [], Q.nfbind(self._connection.query.bind(self._connection)) );
};

/* End connection */
MySQL.prototype.end = function() {
	var self = this;
	return extend_promise( self, Q.nfbind(self._connection.end.bind(self._connection)).then(function() { return self; }) );
};

/* Change user */
MySQL.prototype.changeUser = function() {
	var self = this;
	return extend_promise( self, Q.nfbind(self._connection.changeUser.bind(self._connection)).then(function() { return self; }) );
};

/* Start transaction */
MySQL.prototype.begin = function() {
	var self = this;
	// FIXME: Check specs if BEGIN might return something that could be an error state?
	return self.query('BEGIN').then(function() { return self; });
};

/* Commit transaction */
MySQL.prototype.commit = function() {
	var self = this;
	// FIXME: Check specs if COMMIT might return something that could be an error state?
	return self.query('COMMIT').then(function() { return self; });;
};

/* Rollback transaction */
MySQL.prototype.rollback = function() {
	var self = this;
	// FIXME: Check specs if ROLLBACK might return something that could be an error state?
	return self.query('ROLLBACK').then(function() { return self; });;
};

module.exports = MySQL;

/* EOF */
