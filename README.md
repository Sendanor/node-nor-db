node-nor-db
===========

Generic (MySQL) Database Library for Node.js.

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

### `db.MySQL`

The MySQL connection object constructor.

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
