/* Generic Node.js Database Library */
"use strict";

var Q = require('q');
var is = require('./is.js');

/* Hash table for property names of various types */
function PropertyNames() {
	// FIXME: Enable caling PropertyNames without new!

	var self = this;

	self._propertyNames = {
//		"Promise": Object.getOwnPropertyNames(Q.makePromise.prototype),
//		"Array": Object.getOwnPropertyNames(Array.prototype)
	};
}

// (new PropertyNames()).set("Promise", Q.makePromise).set("Array", Array);

/** Saves property names from constructor function
 * @param name {string} Name of the constructor function
 * @param constructor {function} An constructor function which has .prototype property.
 */
PropertyNames.prototype.set = function(name, constructor) {
	var self = this;
	self._propertyNames[name] = Object.getOwnPropertyNames(constructor.prototype);
	return self;
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

/** Extend object with our members from other objects
 * @param self2 {} Original object
 * @param methods {} Extend only these methods
 * @param obj {} Object that we extend with methods of self2
 * @returns {object} extended object
 */
mod.extendObject = function(self2, methods, obj) { // original extend_obj()
	methods.forEach(function(key) {
		if(obj[key] !== undefined) { return; }
		obj[key] = self2[key].bind(self2);
	});
	return obj;
};

/** Extend promises with our methods
 * @param self2 {} 
 * @param methods {} 
 * @param p {} 
 * @returns {} 
 */
mod.extendPromise = function(self2, methods, p) { // original extend_promise
	var p2 = {};
	(new PropertyNames()).set("Promise", Q.makePromise).getMembers("Promise").forEach(function(key) {
		if(p2[key] !== undefined) { return; }
		p2[key] = function() {
			var args = Array.prototype.slice.call(arguments);
			var r = p[key].apply(p, args);
			if(r && r.then) {
				return mod.extendPromise(self2, methods, r.then(function() { return self2; }) );
			}
			return r;
		};
	});
	methods.forEach(function(key) {
		if(p2[key] !== undefined) { return; }
		p2[key] = function() {
			var args = Array.prototype.slice.call(arguments);
			var ret = p.then(function(obj) {
				if(obj && obj[key] && (typeof obj[key] === 'function')) {
					return obj[key].apply(obj, args);
				} else {
					return obj[key];
				}
			});
			return mod.extendPromise(self2, methods, ret);
		};
	});
	return p2;
};

// Exports
module.exports = PropertyNames;

/* EOF */
