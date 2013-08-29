/* Generic Node.js Database Library */
"use strict";

var util = require('util');
var is = require('nor-is');
var db = require('../core');

/** `db.MySQL.Query` constructor */
function Query() {
	db.Query.call(this);
}
util.inherits(Query, db.Query);

/** DISTINCT */
Query.prototype.distinct = function(opts) {
	return this.store('distinct', opts, opts ? new db.Query.Raw('DISTINCT') : null);
};

/** expr */
Query.prototype.expr = function(opts) {
	opts = opts || {};
	var e = opts.expr || db.Query.Raw('*');
	if(!is.array(e)) {
		e = [e];
	}
	return build_parts(opts, e, undefined, ', '); 
};

/** FROM */
Query.prototype.from = function(opts) {
	opts = opts || {};
	if(opts.from === undefined) return;
	var parts = opts.from || [];
	if(!is.array(parts)) {
		parts = [parts];
	}
	var tmp = build_parts(opts, parts, undefined, ', ', function(x) { return '`'+x+'`';});
	return build_parts(opts, ["FROM", tmp], undefined, ' ');
};

/** conditions for WHERE and HAVING */
function build_conditions(opts) {
}

/** WHERE */
Query.prototype.where = function(opts) {
	var tmp;
	var params;
	opts = opts || {};
	if(opts.where === undefined) return;
	var parts = opts.where;

	if(is.obj(parts) && (!is.objOf(parts, db.Query.Raw)) ) {
		tmp = [];
		params = [];
		Object.keys(parts).forEach(function(key) {
			var value = parts[key];
			tmp.push( '`'+key+'` = ?' ); // FIXME: key should be escaped
			params.push(value);
		});
		parts = db.Query.Raw(tmp.map(function(p) { return "(" + p + ")"}).join(' AND '), params);
	}

	if(!is.array(parts)) {
		parts = [parts];
	}
	
	tmp = build_parts(opts, parts, undefined, ' AND ');
	return build_parts(opts, ["WHERE", tmp], undefined, ' ');
};

/** GROUP */
Query.prototype.group = function(opts) {
	opts = opts || {};
	
};

/** HAVING */
Query.prototype.having = function(opts) {
	opts = opts || {};
	
};

/** ORDER */
Query.prototype.order = function(opts) {
	opts = opts || {};
	
};


/** LIMIT */
Query.prototype.limit = function(opts) {
	opts = opts || {};
	if(opts.limit && is.number(opts.limit)) {
		return new db.Query.Raw('LIMIT ' + opts.limit);
	}
	if(opts.limit && is.array(opts.limit)) {
		return new db.Query.Raw('LIMIT ' + opts.limit.join(', ') );
	}
	if(opts.limit && is.obj(opts.limit)) {
		return new db.Query.Raw('LIMIT ' + opts.limit.offset + ', ' + opts.limit.count );
	}
};

/* Start transaction */
Query.prototype.begin = function(opts) {
	return new db.Query.Raw('START TRANSACTION');
};

/* Commit transaction */
Query.prototype.commit = function() {
	return new db.Query.Raw('COMMIT');
};

/* Rollback transaction */
Query.prototype.rollback = function() {
	return new db.Query.Raw('ROLLBACK');
};

/** SELECT */
Query.prototype.select = function(opts) {
	opts = opts || {};
	return build_parts(opts, "SELECT", ["distinct", "expr", "from", "where", "group", "having", "order", "limit"], ' ');
};

/** UPDATE */
Query.prototype.update = function(opts) {
	opts = opts || {};
	// FIXME: add support for multiple tables
	return build_parts(opts, "UPDATE", ["tableref", "set", "where", "order", "limit"], ' ');
};

/** INSERT */
Query.prototype.insert = function(opts) {
	opts = opts || {};
	return build_parts(opts, "INSERT", ["into", "columns", "set"], ' ');	
};

/** DELETE */
Query.prototype.delete = function(opts) {
	opts = opts || {};
	return build_parts(opts, "DELETE", ["from", "where"], ' ');
};

// Export
module.exports = Query;

/* EOF */
