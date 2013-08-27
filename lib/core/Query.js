/* Generic Node.js Database Library */
"use strict";

var util = require('util');
var is = require('nor-is');

/** `db.MySQL.Query` constructor */
function Query() {
}

// Export `Raw` as `Query.Raw`
Query.Raw = require('./Raw.js');

// Exports
module.exports = Query;

/* EOF */
