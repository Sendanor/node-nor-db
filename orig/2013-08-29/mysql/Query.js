/* Generic Node.js Database Library */
"use strict";

var util = require('util');
var is = require('nor-is');
var db = require('../core/');
var sql = require('../sql/');

/** `db.MySQL.Query` constructor */
function Query() {
	sql.Query.call(this);
}
util.inherits(Query, sql.Query);

// Exports
module.exports = Query;

/* EOF */
