/* Generic Node.js Database Library */

var Q = require('q');

var query = require('./query.js');

var _propertyNames = {
	"Promise": Object.getOwnPropertyNames(Q.makePromise.prototype),
	"Array": Object.getOwnPropertyNames(Array.prototype)
};

/** */
function get_members(types) {
	var members = [];
	if( !(types && (typeof types === 'object') && (types instanceof Array) ) ) {
		types = [types];
	}
	types.forEach(function(type) {
		members.push.apply(members, _propertyNames[type]);
	});
	return members;
}

/** Extend objects with our members from other objects */
function extend_obj(self, type, obj) {
	var members = _propertyNames[type];
	members.forEach(function(key) {
		if(obj[key] !== undefined) {
			return;
		}
		obj[key] = self[key].bind(self);
	});
	return obj;
}

/** Extend promises with our members */
function extend_promise(self, types, p) {
	var p2 = {};
	get_members("Promise").forEach(function(key) {
		if(p2[key] !== undefined) {
			return;
		}
		p2[key] = function() {
			var args = Array.prototype.slice.call(arguments);
			console.error("DEBUG: key = " + key);
			var r = p[key].apply(p, args);
			if(r && r.then) {
				return extend_promise(self, types, r.then(function() { return self; }) );
			}
			return r;
		};
	});
	get_members(types).forEach(function(key) {
		if(p2[key] !== undefined) {
			return;
		}
		p2[key] = function() {
			var args = Array.prototype.slice.call(arguments);
			var ret = p.then(function(obj) {
				if(obj && obj[key] && (typeof obj[key] === 'function')) {
					return obj[key].apply(obj, args);
				} else {
					return obj[key];
				}
			});
			return extend_promise(self, types, ret);
		};
	});
	return p2;
}

/** Create MySQL connection object */
function MySQL(config) {
	if(!(this instanceof arguments.callee)) {
		return new (arguments.callee)(config);
	}
	var self = this;
	if(!config) { throw new TypeError("config not set"); }
	self._connection = require('mysql').createConnection(config);

	self._connect    = Q.nfbind(self._connection.connect.bind(self._connection));
	self._query      = Q.nfbind(self._connection.query.bind(self._connection));
	self._end        = Q.nfbind(self._connection.end.bind(self._connection));
	self._changeUser = Q.nfbind(self._connection.changeUser.bind(self._connection));
}

/* Connect to the server */
MySQL.prototype.connect = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend_promise(self, "MySQL", self._connect.apply(self, args).then(function() { return self; }) );
};

/* Query */
MySQL.prototype.query = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	var p = extend_promise(self,
		["Array", "MySQL"],
		self._query.apply(self, args).then(function(result) {
			return extend_obj(self, "MySQL", result);
		})
	);
	return p;
};

/* End connection */
MySQL.prototype.end = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend_promise(self, "MySQL", self._end.apply(self, args).then(function() { return self; }) );
};

/* Change user */
MySQL.prototype.changeUser = function() {
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return extend_promise(self, "MySQL", self._changeUser.apply(self, args).then(function() { return self; }) );
};

/* Start transaction */
MySQL.prototype.begin = function() {
	var self = this;
	return self.query('START TRANSACTION').then(function() { return self; });
};

/* Commit transaction */
MySQL.prototype.commit = function() {
	var self = this;
	return self.query('COMMIT').then(function() { return self; });;
};

/* Rollback transaction */
MySQL.prototype.rollback = function() {
	var self = this;
	return self.query('ROLLBACK').then(function() { return self; });;
};

/* Select query */
MySQL.prototype.select = function(opts) {
	var self = this;
	var q = query.select(opts);
	return self.query(q.query(), q.params());
};

_propertyNames.MySQL = Object.getOwnPropertyNames(MySQL.prototype);

module.exports = MySQL;

/* EOF */
