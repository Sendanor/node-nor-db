/* Generic Node.js Database Library */
"use strict";

var Q = require('q');
var is = require('./is.js');

/* Hash table for property names of various types */
function PropertyNames() {
	// FIXME: Enable caling PropertyNames without new!

	var self = this;

	self._propertyNames = {
		"Promise": Object.getOwnPropertyNames(Q.makePromise.prototype),
		"Array": Object.getOwnPropertyNames(Array.prototype)
	};
}

/** Saves property names from constructor function
 * @param name {string} Name of the constructor function
 * @param constructor {function} An constructor function which has .prototype property.
 */
PropertyNames.prototype.set = function(name, constructor) {
	var self = this;
	self._propertyNames[name] = Object.getOwnPropertyNames(constructor.prototype);
};

/** Get an array of property names for specified type(s)
 * @param types {String|Array} Single type of multiple types in an array
 * @returns {array} property names as string
 */
PropertyNames.prototype.getMembers = function(types) {
	var self = this;
	var members = [];
	if(!is.array(types)) {
		types = [types];
	}
	types.forEach(function(type) {
		members.push.apply(members, self._propertyNames[type]);
	});
	return members;
};

/** Extend objects with our members from other objects */
function extend_obj(self, type, obj) {
	var members = self._propertyNames[type];
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

// Exports
module.exports = PropertyNames;

/* EOF */
