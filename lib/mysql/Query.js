/* Generic Node.js Database Library */
"use strict";

var util = require('util');
var is = require('nor-is');
var db = require('../core.js');
var sql = require('../sql/index.js');

/** `db.MySQL.Query` constructor */
function Query() {
	sql.Query.call(this);
}
util.inherits(Query, sql.Query);

/* EOF */
