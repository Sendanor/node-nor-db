/* MySQL proto test */

var DB = require('../../lib/index.js');
DB({'user':'jhh'}).begin().select({from:'foo', limit:1}).then(function(data) {
	return this.update('bar', {'set':data.shift()});
}).commit().fail(function(err) {
	console.error('Error: ' + err);
	this.rollback();
}).done();

/* EOF */
