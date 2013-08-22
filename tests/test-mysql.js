"use strict";

var mysql = require('../lib/mysql/');
var assert = require('assert');

// FIXME: create the test database tables if missing

/* */
describe('mysql', function(){

	it('should have .Pool', function(){
		assert.strictEqual( typeof mysql.Pool, 'function' );
	});

	it('should have .Connection', function(){
		assert.strictEqual( typeof mysql.Connection, 'function' );
	});

	describe('.Pool', function(){

		it('should have .create', function(){
			assert.strictEqual( typeof mysql.Pool.create, 'function' );
		});

		it('should have .prototype.getConnection', function(){
			assert.strictEqual( typeof mysql.Pool.prototype.getConnection, 'function' );
		});

		it('.create().$getConnection().$query("SELECT * FROM user LIMIT 5").then(...).$end()', function(done){
			mysql.Pool.create({database:'test'}).$getConnection().$query("SELECT * FROM user LIMIT 5").then(function(result) {
				//console.log( "result = " + JSON.stringify(result, null, 2) );
				assert.ok(result);
				assert.strictEqual(result.length, 2);
				assert.ok(result[0]);
				assert.strictEqual(result[0].length, 5);
				return result;
			}).$end().then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		
		it('.create().$getConnection().$select({from:"user",limit:5}).then(...).$end()', function(done){
			mysql.Pool.create({database:'test'}).$getConnection().$select({from:"user",limit:5}).then(function(result) {
				//console.log( "result = " + JSON.stringify(result, null, 2) );
				assert.ok(result);
				assert.strictEqual(result.length, 2);
				assert.ok(result[0]);
				assert.strictEqual(result[0].length, 5);
				return result;
			}).$end().then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		

	});

});

/* EOF */
