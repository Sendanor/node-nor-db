/* Generic Node.js Database Library */
"use strict";

/** Create MySQL connection pool object */
function Pool(config) {
	if(!(this instanceof Pool)) {
		return new Pool(config);
	}
	var self = this;
}

// Exports
module.exports = Pool;

/* EOF */
