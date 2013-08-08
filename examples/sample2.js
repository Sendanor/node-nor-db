/* Sample usage for node-nor-db */

var db = new require('../lib/index.js').MySQL({'database':'test'});

db.connect().select({from:'user','where':{id:10}}).then(function(rows) {
	console.log("rows = " + JSON.stringify(rows) );
}).end().fail(function(err) {
	console.error('ERROR: ' + err);
	if(err.stack) console.error(err.stack);
}).done();

/* EOF */
