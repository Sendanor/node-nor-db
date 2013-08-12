/* Generic Node.js Database Library */
"use strict";

var is = module.exports = {};

/* Returns true if x is trueish */
is.true = function(x) {
	return x ? true : false;
};

/* Returns true if of specified type */
is.type = function(obj, type) {
	return is.true( typeof obj === type );
};

/* Returns true if obj */
is.obj = function(obj) {
	return is.true( (obj && is.type(obj, 'object')) );
};

/* Returns true if `obj` instance of `what` */
is.objOf = function(obj, what) {
	return is.true( is.obj(obj) && (obj instanceof what) );
};

/* Returns true if array */
is.array = function(obj) {
	return is.objOf(obj, Array);
};

/* Returns true if string */
is.string = function(obj) {
	return is.type(obj, 'string') || is.objOf(obj, String);
};

/* EOF */
