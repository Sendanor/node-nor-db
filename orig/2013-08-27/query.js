/* Generic Node.js Database Library */
"use strict";

/* So, I had this file already implemented 90%... 
 * ...and then my PC crashed and everything was lost. 
 *
 * Kids, remember to push to github regularly.
 */

var is = require('nor-is');

var query = module.exports = {};

query.Raw = require('./Raw.js');


/** */
function build_parts(opts, parts, keys, separator, escape) {
	opts = opts || {};
	separator = separator || ' ';

	escape = escape || function(x) { return x; };

	// Build array of parts
	parts = (parts !== undefined) ? (is.array(parts) ? parts : [parts]) : [];

	if(keys) {
		keys.forEach(function(key) {
			parts.push( query[key](opts) );
		});
	}
	
	// Filter empty parts away
	parts = parts.filter(function(p) {
		return is.true( p && ((''+p).trim() !== '') );
	});

	// Merge params
	var params = [];
	params = params.concat.apply(params, 
		parts.filter(function(p) {
			return is.objOf(p, query.Raw);
		}).map(function(p) {
			return p.params();
		})
	);

	return query.Raw( parts.map(escape).join(separator), params );
}


/** DISTINCT */
query.distinct = function(opts) {
	opts = opts || {};
	if(opts.distinct) {
		return new query.Raw('DISTINCT');
	}
};

/** expr */
query.expr = function(opts) {
	opts = opts || {};
	var e = opts.expr || query.Raw('*');
	if(!is.array(e)) {
		e = [e];
	}
	return build_parts(opts, e, undefined, ', '); 
};


/** FROM */
query.from = function(opts) {
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
query.where = function(opts) {
	var tmp;
	var params;
	opts = opts || {};
	if(opts.where === undefined) return;
	var parts = opts.where;

	if(is.obj(parts) && (!is.objOf(parts, query.Raw)) ) {
		tmp = [];
		params = [];
		Object.keys(parts).forEach(function(key) {
			var value = parts[key];
			tmp.push( '`'+key+'` = ?' ); // FIXME: key should be escaped
			params.push(value);
		});
		parts = query.Raw(tmp.map(function(p) { return "(" + p + ")"}).join(' AND '), params);
	}

	if(!is.array(parts)) {
		parts = [parts];
	}
	
	tmp = build_parts(opts, parts, undefined, ' AND ');
	return build_parts(opts, ["WHERE", tmp], undefined, ' ');
};


/** GROUP */
query.group = function(opts) {
	opts = opts || {};
	
};


/** HAVING */
query.having = function(opts) {
	opts = opts || {};
	
};

/** ORDER */
query.order = function(opts) {
	opts = opts || {};
	
};


/** LIMIT */
query.limit = function(opts) {
	opts = opts || {};
	if(opts.limit && is.number(opts.limit)) {
		return new query.Raw('LIMIT ' + opts.limit);
	}
	if(opts.limit && is.array(opts.limit)) {
		return new query.Raw('LIMIT ' + opts.limit.join(', ') );
	}
	if(opts.limit && is.obj(opts.limit)) {
		return new query.Raw('LIMIT ' + opts.limit.offset + ', ' + opts.limit.count );
	}
};

/* Start transaction */
query.begin = function(opts) {
	return new query.Raw('START TRANSACTION');
};

/* Commit transaction */
query.commit = function() {
	return new query.Raw('COMMIT');
};

/* Rollback transaction */
query.rollback = function() {
	return new query.Raw('ROLLBACK');
};

/** SELECT */
query.select = function(opts) {
	opts = opts || {};
	return build_parts(opts, "SELECT", ["distinct", "expr", "from", "where", "group", "having", "order", "limit"], ' ');
};

/** UPDATE */
query.update = function(opts) {
	opts = opts || {};
	// FIXME: add support for multiple tables
	return build_parts(opts, "UPDATE", ["tableref", "set", "where", "order", "limit"], ' ');
};

/** INSERT */
query.insert = function(opts) {
	opts = opts || {};
	return build_parts(opts, "INSERT", ["into", "columns", "set"], ' ');	
};

/** DELETE */
query.delete = function(opts) {
	opts = opts || {};
	return build_parts(opts, "DELETE", ["from", "where"], ' ');
};

/* EOF */
