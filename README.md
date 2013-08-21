nor-db
======

Generic (MySQL) Database Library for Node.js.

**Please note:** This is an early development version. The code is probably going to change and break a lot. Most features are **not implemented yet**.

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

All these methods that usually would return promises or call callbacks are returning [Q promises](https://github.com/kriskowal/q) that are extended to support 
our own methods -- and *yes*, **everything is still asynchronous**. It's *just* advanced syntax sugar.

That means you can chain any method directly like `db.foo().bar().foo().then(...)`.

No need for code like this: 

	db.foo().then(function() {
		db.bar().then(function() {
			db.foo().then(...);
		});
	});


As a special case you can even call `Array`'s methods with `db.prototype.query()`:

	db.query('SELECT * FROM table LIMIT 1').shift().then(function(row) {
		console.log( "First row: " + row);
	});

### `db.MySQL(config)`

The MySQL connection object constructor.

The method takes same arguments as in [node-mysql](https://github.com/felixge/node-mysql#connection-options).

### `MySQL.prototype.connect()`

Connects to the database. Returns promise.

### `MySQL.prototype.query(sql[, values])`

Execute SQL query with optional named parameters.

* `sql` is the SQL query as a string
* `values` is parameters for the SQL query as an array

Returns promise with rows as an array.

### `MySQL.prototype.end()`

End SQL connection.

Returns promise.

### `MySQL.prototype.changeUser(options)` (not tested)

Change connection state.

`options` is an object with these optional properties:

* `options.charset`
* `options.user`
* `options.password`
* `options.database`

Returns promise.

### `MySQL.prototype.begin()` (not tested)

Starts a transaction.

Returns promise.

### `MySQL.prototype.commit()` (not tested)

Commit the transaction.

Returns promise.

### `MySQL.prototype.rollback()` (not tested)

Rollback the transaction.

Returns promise.

### `MySQL.prototype.select(opts)`

Perform SELECT SQL query.

* `opts` {object} Options for building the SELECT query

#### `opts.params` {array}

Optional params for internal `query`.

#### `opts.distinct` {boolean}

If set `true`, performs SELECT DISTINCT query instead of normal SELECT.

#### `opts.expr` {string|array}

Set expressions for SELECT query.

When it is an array like `["id", "name"]` the SQL query will be `SELECT id, name FROM ...`.

When it is a string like `"MAX(id) AS max, MIN(id) AS min, COUNT(id) AS id"` the select query will be like `SELECT MAX(id) AS max, MIN(id) AS min, COUNT(id) AS id FROM ...`.

Defaults to `SELECT * FROM ...`.

#### `opts.from` {string|array}

Table references.

When it is a string like `"test"` the SQL query will be `SELECT ... FROM test`.

When it is an array like `["a", "b"]` the SQL query will be `SELECT ... FROM a, b`.

When it is an array like `[{leftJoin:["a", "b"],on:"a.id=b.a_id"}]` the SQL query will be `SELECT ... FROM a LEFT JOIN b ON a.id=b.a_id`.

#### `opts.where` {object|array|string}

Where conditions.

When it is an object like `"{id:10}"` the SQL query will be `SELECT ... WHERE id = ?` with `params=[10]`.

When it is an array like `["date >= NOW()", "id=?"]` the SQL query will be `SELECT ... WHERE (date >= NOW()) AND (id = ?)`.

When it is a string like `"date >= NOW()"` the SQL query will be `SELECT ... WHERE date >= NOW()`.

#### `opts.group` {string|array}

Group by something.

When it is a string like `"id"` the SQL query will be `SELECT ... GROUP BY id`.

When it is an array like `["id", "name"]` the SQL query will be `SELECT ... GROUP BY id, name`.

#### `opts.having` {string|object|array}

Append HAVING part into the query. 

Same settings as in `opts.where`.

#### `opts.order` {string|array}

Order by something.

When it is a string like `"id"` the SQL query will be `SELECT ... ORDER BY id`.

When it is an array like `["id", "name"]` the SQL query will be `SELECT ... ORDER BY id, name`.

#### `opts.limit` {number}

Returns promise with rows as an array.

When it is a number like `10` the SQL query will be `SELECT ... LIMIT ?` with params set as `[10]`.

#### Examples

Select one row from table `test` which has `id=10`:

	db.select({
		"from": "test",
		"where": {"id": 10},
		"limit": 1
	}).then(function(rows) {
		console.log("SQL operation successful!");
	}).fail(function(err) {
		console.error("ERROR: " + err);
	}).done();


Select one row from table `test` which has `id > 10` and `id < 20`:

	db.select({
		"from": "test",
		"where": ["id > 10", "id < 20"]
		"limit": 1
	}).then(function(rows) {
		console.log("SQL operation successful!");
	}).fail(function(err) {
		console.error("ERROR: " + err);
	}).done();


Select one row from table `test` which has `date > NOW()` or `id < 100`:

	db.select({
		"from": "test",
		"where": "(date > NOW()) OR (id < 100)"
		"limit": 1
	}).then(function(rows) {
		console.log("SQL operation successful!");
	}).fail(function(err) {
		console.error("ERROR: " + err);
	}).done();


### `MySQL.prototype.update()` (not implemented)

Perform update SQL query.

Returns promise.

### `MySQL.prototype.insert` (not implemented)

Perform insert SQL query.

Returns promise.

### `MySQL.prototype.delete` (not implemented)

Perform delete SQL query.

Returns promise.

