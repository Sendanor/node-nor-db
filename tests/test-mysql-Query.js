"use strict";

var Query = require('../lib').mysql.Query;
var assert = require('assert');

/* */
describe('Query', function(){

	var query = new Query();

	// DISTINCT
	describe('.distinct()', function(){
		it('should return new Query.Raw("DISTINCT")', function(){
			assert.strictEqual((new Query.Raw('DISTINCT')).valueOf(), query.distinct({'distinct':true}).raw().valueOf() );
		});
		it('should return undefined', function(){
			assert.strictEqual((new Query.Raw('')).valueOf(), query.distinct({}).raw() );
		});
	});

	// [Field] Expressions
	describe('.expr()', function(){
		it('should return new Query.Raw("*")', function(){
			assert.strictEqual((new Query.Raw('*')).valueOf(), query.expr({}).raw().valueOf() );
		});
		it('should return new Query.Raw("a, b")', function(){
			assert.strictEqual((new Query.Raw('a, b')).valueOf(), query.expr({expr:['a', 'b']}).raw().valueOf() );
		});
		it('should return new Query.Raw("a")', function(){
			assert.strictEqual((new Query.Raw('a')).valueOf(), query.expr({expr:['a']}).raw().valueOf() );
			assert.strictEqual((new Query.Raw('a')).valueOf(), query.expr({expr:'a'}).raw().valueOf() );
		});
	});

	// FROM
	describe('.from()', function(){
		it('should return undefined', function(){
			assert.strictEqual( (new Query.Raw('')).valueOf(), query.from({}).raw().valueOf() );
		});
		it('should return new Query.Raw("FROM `a`, `b`")', function(){
			assert.strictEqual((new Query.Raw('FROM `a`, `b`')).valueOf(), query.from({from:['a', 'b']}).raw().valueOf() );
		});
		it('should return new Query.Raw("FROM `a`")', function(){
			assert.strictEqual((new Query.Raw('FROM `a`')).valueOf(), query.from({from:['a']}).raw().valueOf() );
			assert.strictEqual((new Query.Raw('FROM `a`')).valueOf(), query.from({from:'a'}).raw().valueOf() );
		});
	});

	// WHERE
	describe('.where()', function(){
		it('should return undefined', function(){
			assert.strictEqual((new Query.Raw('')).valueOf(), query.where({}).raw().valueOf() );
		});
		it('should return new Query.Raw("WHERE a=10")', function(){
			assert.strictEqual((new Query.Raw('WHERE (`a` = ?)', [10])).valueOf(), query.where({where:{'a':10}}).raw().valueOf() );
		});

		// FIXME: Implement these... when we hava decided what they should return
		it.skip('should return new Query.Raw("WHERE a, b")', function(){
			assert.strictEqual((new Query.Raw('WHERE `a`, `b`')).valueOf(), query.where({where:['a', 'b']}).raw().valueOf() );
		});
		it.skip('should return new Query.Raw("WHERE a")', function(){
			assert.strictEqual((new Query.Raw('WHERE `a`')).valueOf(), query.where({where:['a']}).raw().valueOf() );
			assert.strictEqual((new Query.Raw('WHERE `a`')).valueOf(), query.where({where:'a'}).raw().valueOf() );
		});

	});

	// GROUP
	describe('.group()', function(){
		it('should return undefined', function(){
			assert.strictEqual( (new Query.Raw('')).valueOf(), query.group({}).raw().valueOf() );
		});

		// FIXME: Implement these!
		it.skip('should return new Query.Raw("GROUP (`a`)")', function(){
			assert.strictEqual((new Query.Raw('GROUP (`a`)')).valueOf(), query.group({group:'a'}).raw().valueOf() );
		});
		it.skip('should return new Query.Raw("GROUP (`a`, `b`)")', function(){
			assert.strictEqual((new Query.Raw('GROUP (`a`, `b`)')).valueOf(), query.group({group:['a','b']}).raw().valueOf() );
		});

	});


	// HAVING
	describe('.having()', function(){
		it('should return undefined', function(){
			assert.strictEqual( (new Query.Raw('GROUP (`a`)')).valueOf(), query.having({}).raw().valueOf() );
		});

		// FIXME: Implement this
		it.skip('should return new Query.Raw("HAVING a=10")', function(){
			assert.strictEqual((new Query.Raw('HAVING (`a` = ?)', [10])).valueOf(), query.having({having:{'a':10}}).raw().valueOf() );
		});

		// FIXME: Implement these... when we hava decided what they should return
		it.skip('should return new Query.Raw("HAVING a, b")', function(){
			assert.strictEqual((new Query.Raw('HAVING `a`, `b`')).valueOf(), query.having({having:['a', 'b']}).raw().valueOf() );
		});
		it.skip('should return new Query.Raw("HAVING a")', function(){
			assert.strictEqual((new Query.Raw('HAVING `a`')).valueOf(), query.having({having:['a']}).raw().valueOf() );
			assert.strictEqual((new Query.Raw('HAVING `a`')).valueOf(), query.having({having:'a'}).raw().valueOf() );
		});

	});

	// ORDER
	describe('.order()', function(){
		it('should return undefined', function(){
			assert.strictEqual(undefined, query.order({}) );
		});

		// FIXME: Implement these!
		it.skip('should return new Query.Raw("ORDER (`a`)")', function(){
			assert.strictEqual((new Query.Raw('ORDER (`a`)')).valueOf(), query.order({order:'a'}).raw().valueOf() );
		});
		it.skip('should return new Query.Raw("ORDER (`a`, `b`)")', function(){
			assert.strictEqual((new Query.Raw('ORDER (`a`, `b`)')).valueOf(), query.order({order:['a','b']}).raw().valueOf() );
		});

	});

	// LIMIT
	describe('.limit()', function(){
		it('should return undefined', function(){
			assert.strictEqual(undefined, query.limit({}) );
		});

		// FIXME: Implement these!

		it('should return new Query.Raw("LIMIT 1")', function(){
			assert.strictEqual((new Query.Raw('LIMIT 1')).valueOf(), query.limit({limit:1}).raw().valueOf() );
		});

		it('should return new Query.Raw("LIMIT 2, 4")', function(){
			assert.strictEqual((new Query.Raw('LIMIT 2, 4')).valueOf(), query.limit({limit:{offset:2, count:4}}).raw().valueOf() );
			assert.strictEqual((new Query.Raw('LIMIT 2, 4')).valueOf(), query.limit({limit:[2, 4]}).raw().valueOf() );
		});

	});

	// SELECT
	describe('.select()', function(){
		it('should return SELECT *', function(){
			assert.strictEqual((new Query.Raw('SELECT *')).valueOf(), query.select({}).raw().valueOf() );
		});

		it('should return SELECT * FROM `foo`', function(){
			assert.strictEqual(
				query.select({from:'foo'}).raw().valueOf(),
				(new Query.Raw('SELECT * FROM `foo`')).valueOf()
			);
		});

		it('should return SELECT DISTINCT * FROM `foo`', function(){
			assert.strictEqual(
				query.select({distinct:true, from:'foo'}).raw().valueOf(),
				(new Query.Raw('SELECT DISTINCT * FROM `foo`')).valueOf()
			);
		});

		it('should return SELECT * FROM `foo` WHERE (`id` = ?) with [10]', function(){
			assert.strictEqual(
				query.select({from:'foo',where:{id:10}}).raw().valueOf(),
				(new Query.Raw('SELECT * FROM `foo` WHERE (`id` = ?)', [10])).valueOf()
			);
		});

		it('should return SELECT * FROM `foo` WHERE (`id` = ?) AND (`user_id` = ?) with [10, 20]', function(){
			assert.strictEqual(
				query.select({from:'foo',where:{id:10,user_id:20}}).raw().valueOf(),
				(new Query.Raw('SELECT * FROM `foo` WHERE (`id` = ?) AND (`user_id` = ?)', [10, 20])).valueOf()
			);
		});

	});


});

/* EOF */
