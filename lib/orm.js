/** nor-db -- ORM -- Object-relational Mapping */

var is = require('nor-is');
var extend = require('nor-extend');
var db = require('./index.js');
var orm = module.exports = {};

/** Builds a constructor function for a database table
 * @param table_name {string} The table name
 * @param options {object} Additional options.
 * @returns A function that can be used to create objects and implement additional features using its `.prototype`.
 */
orm.table = function() {
	var args = Array.prototype.slice.call(arguments);
	var options = {};
	args.forEach(function(arg) {
		if(is.string(arg)) {
			options.table = arg;
		}
		if(is.objOf(arg, )) {
			options.db = arg;
		}
	});

	// Enable `createConstructor(options)`
	if( is.undef(options) && is.obj(table_name) ) {
		options = table_name;
		table_name = undefined;
	}

	options = options || {};

	if(is.undef(table_name) && is.def(options.table)) {
		table_name = options.table;
	}

	if(is.def(table_name) && is.undef(options.table)) {
		options.table = table_name;
	}
	
	if(!is.obj(options)) { throw new TypeError("bad argument: value for options not an object"); }
	if(!is.string(table_name)) { throw new TypeError("bad argument: value for table_name not a string"); }
	
	if(is.undef(options.db)) { throw new TypeError("bad argument: options.db not set!"); }
	
	/** Create a new object that prepresents a data record in the database.
	 * This function does not handle the actual creation of that data in the database.
	 */
	var Table = function(opts) {
		if(!(this instanceof Table)) {
			return new Table(opts);
		}

		this._id = null;
		this._data = {};
	};

	/** Get the internal value of the object */
	Table.prototype.valueOf = function() {
		return this._data;
	};

	/** Get string presentation of the object */
	Table.prototype.toString = function() {
		return JSON.stringify(this._data);
	};

	/** Get or set the value of the primary key. Does not affect the database.
	 * @param id {number} The new value of the internal ID.
	 * @returns {number} The current value of internal ID.
	 */
	Table.prototype.id = function(id) {
		if(is.def(id)) { this._id = id; }
		return this._id;
	};

	/** Set the value of the primary key. Does not affect the database.
	 * @param id {number} The new value of the internal ID.
	 * @returns {Table} The reference to self for chaining calls.
	 */
	Table.prototype.setID = function(id) {
		if(is.undef(id)) { throw new TypeError("bad argument"); }
		this._id = id;
		return this;
	};

	/** Get or set the value of an internal data property. Does not affect the database.
	 * @param key {string} The keyword.
	 * @param value {mixed} The new value.
	 * @returns {mixed} The value of that keyword, otherwise undefined.
	 */
	Table.prototype.property = function(key, value) {
		if(is.undef(key)) { throw new TypeError("bad argument"); }
		if(is.def(value)) { this._data[key] = value; }
		return this._data[key];
	};

	/** Set the value of an internal data property. Does not affect the database.
	 * @param key {string} The keyword.
	 * @param value {mixed} The new value.
	 * @returns {Table} The reference to self for chaining calls.
	 */
	Table.prototype.setProperty = function(key, value) {
		if(is.undef(key)) { throw new TypeError("bad argument"); }
		if(is.undef(value)) { throw new TypeError("bad argument"); }
		this._data[key] = value;
		return this;
	};

	/** Set the values of the internal data property. Does not affect the database.
	 * @param data {object} The new values.
	 * @returns {Table} The reference to self for chaining calls.
	 */
	Table.prototype.setData = function(data) {
		if(!is.obj(data)) { throw new TypeError("bad argument"); }
		this._data = data;
		return this;
	};

	/** Get latest data from the database */
	Table.prototype.fetch = function() {
		var obj = this;
		var p = options.db.select(options.table, {'where':obj.id()}).then(function(result) {
			if(!result) { throw new TypeError("bad result"); }
			if(!result[0]) { throw new TypeError("bad result"); }
			if(!result[0][0]) { throw new TypeError("bad result"); }
			return obj.setData(result[0][0]);
		});
		return extend.promise( [Table], p);
	};

	/** Asynchronous creation of an object in the database.
	 * @param opts {object} Options for the new object.
	 * @returns {ChainablePromise} a chainable promise of a new object.
	 */
	Table.create = function(opts) {
		var obj = new Table(opts);
		var p = options.db.insert(options.table, {'data':obj.valueOf()}).then(function(id) {
			return obj.setID(id).fetch();
		});
		return extend.promise( [Table], p);
	};

	return Table;
};

/* EOF */
