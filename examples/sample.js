/* Sample usage for node-nor-db */

var db = new require('../lib/index.js').MySQL({'database':'test'});

db.connect().query('INSERT INTO user SET created=NOW(), updated=NOW(), ?', {'name':'bob'}).then(function(res) {
	var ret = db.query('SELECT * FROM user LIMIT 1').shift().then(function(user) {
		console.log(JSON.stringify(user));
	});
	return ret;
}).end().fail(function(err) {
	console.error('ERROR: ' + err);
	console.error(err.stack);
}).done();

/* EOF */
