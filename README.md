node-nor-db
===========

Generic (MySQL) Database Library for Node.js.

Install
-------

You can install `nor-db` using NPM: `npm install nor-db`

Features
--------

* Uses extended Q-promises that support method chaining.

TODO
----

* `MySQL.prototype.select`, `MySQL.prototype.update`, `MySQL.prototype.insert`, `MySQL.prototype.delete`
* Unit tests
* Travis-CI
* PostgreSQL support

Example
-------

```javascript
var db = new require('nor-db').MySQL({'database':'test'});
db.connect().query('INSERT INTO user SET created=NOW(), updated=NOW(), ?', {'name':'bob'}).then(function(res) {
	var ret = db.query('SELECT * FROM user LIMIT 1').shift().then(function(user) {
		console.log(JSON.stringify(user));
	});
	return ret;
}).end().fail(function(err) {
	console.error('ERROR: ' + err);
	console.error(err.stack);
}).done();
```

Method reference
----------------

All of these methods -- that usually would return promises or use callbacks -- are returning [Q promises](https://github.com/kriskowal/q) that are extended to support 
our own methods.

That means you can chain any method directly like `db.foo().bar().foo().then(...)`.

No need for code like this: 

	db.foo.then(function() {
		db.bar().then(function() {
			db.foo(...);
		});
	});


As a special case you can even call `Array`'s methods with `db.prototype.query()`:

	db.query('SELECT * FROM table LIMIT 1').shift().fetch(function(row) {
		console.log( "First row: " + row);
	});

### `db.MySQL(config)`

The MySQL connection object constructor.

Options are same as in [node-mysql](https://github.com/felixge/node-mysql)'s `mysql.createConnection()`.

### `MySQL.prototype.connect`
### `MySQL.prototype.query`
### `MySQL.prototype.end`
### `MySQL.prototype.changeUser` (not tested)
### `MySQL.prototype.begin` (not tested)
### `MySQL.prototype.end` (not tested)
### `MySQL.prototype.commit` (not tested)
### `MySQL.prototype.rollback` (not tested)
### `MySQL.prototype.select` (not implemented)
### `MySQL.prototype.update` (not implemented)
### `MySQL.prototype.insert` (not implemented)
### `MySQL.prototype.delete` (not implemented)
