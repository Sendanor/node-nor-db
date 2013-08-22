"use strict";

var query = require('../lib/query.js');
var assert = require('assert');

/* */
describe('query', function(){

	// DISTINCT
	describe('.distinct()', function(){
		it('should return new query.Raw("DISTINCT")', function(){
			assert.strictEqual((new query.Raw('DISTINCT')).valueOf(), query.distinct({'distinct':true}).valueOf() );
		});
		it('should return undefined', function(){
			assert.strictEqual(undefined, query.distinct({}) );
		});
	});

	// [Field] Expressions
	describe('.expr()', function(){
		it('should return new query.Raw("*")', function(){
			assert.strictEqual((new query.Raw('*')).valueOf(), query.expr({}).valueOf() );
		});
		it('should return new query.Raw("a, b")', function(){
			assert.strictEqual((new query.Raw('a, b')).valueOf(), query.expr({expr:['a', 'b']}).valueOf() );
		});
		it('should return new query.Raw("a")', function(){
			assert.strictEqual((new query.Raw('a')).valueOf(), query.expr({expr:['a']}).valueOf() );
			assert.strictEqual((new query.Raw('a')).valueOf(), query.expr({expr:'a'}).valueOf() );
		});
	});

	// FROM
	describe('.from()', function(){
		it('should return undefined', function(){
			assert.strictEqual(undefined, query.from({}) );
		});
		it('should return new query.Raw("FROM `a`, `b`")', function(){
			assert.strictEqual((new query.Raw('FROM `a`, `b`')).valueOf(), query.from({from:['a', 'b']}).valueOf() );
		});
		it('should return new query.Raw("FROM `a`")', function(){
			assert.strictEqual((new query.Raw('FROM `a`')).valueOf(), query.from({from:['a']}).valueOf() );
			assert.strictEqual((new query.Raw('FROM `a`')).valueOf(), query.from({from:'a'}).valueOf() );
		});
	});

	// WHERE
	describe('.where()', function(){
		it('should return undefined', function(){
			assert.strictEqual(undefined, query.where({}) );
		});
		it('should return new query.Raw("WHERE a=10")', function(){
			assert.strictEqual((new query.Raw('WHERE (`a` = ?)', [10])).valueOf(), query.where({where:{'a':10}}).valueOf() );
		});

		// FIXME: Implement these... when we hava decided what they should return
		it.skip('should return new query.Raw("WHERE a, b")', function(){
			assert.strictEqual((new query.Raw('WHERE `a`, `b`')).valueOf(), query.where({where:['a', 'b']}).valueOf() );
		});
		it.skip('should return new query.Raw("WHERE a")', function(){
			assert.strictEqual((new query.Raw('WHERE `a`')).valueOf(), query.where({where:['a']}).valueOf() );
			assert.strictEqual((new query.Raw('WHERE `a`')).valueOf(), query.where({where:'a'}).valueOf() );
		});

	});

	// GROUP
	describe('.group()', function(){
		it('should return undefined', function(){
			assert.strictEqual(undefined, query.group({}) );
		});

		// FIXME: Implement these!
		it.skip('should return new query.Raw("GROUP (`a`)")', function(){
			assert.strictEqual((new query.Raw('GROUP (`a`)')).valueOf(), query.group({group:'a'}).valueOf() );
		});
		it.skip('should return new query.Raw("GROUP (`a`, `b`)")', function(){
			assert.strictEqual((new query.Raw('GROUP (`a`, `b`)')).valueOf(), query.group({group:['a','b']}).valueOf() );
		});

	});


	// HAVING
	describe('.having()', function(){
		it('should return undefined', function(){
			assert.strictEqual(undefined, query.having({}) );
		});

		// FIXME: Implement this
		it.skip('should return new query.Raw("HAVING a=10")', function(){
			assert.strictEqual((new query.Raw('HAVING (`a` = ?)', [10])).valueOf(), query.having({having:{'a':10}}).valueOf() );
		});

		// FIXME: Implement these... when we hava decided what they should return
		it.skip('should return new query.Raw("HAVING a, b")', function(){
			assert.strictEqual((new query.Raw('HAVING `a`, `b`')).valueOf(), query.having({having:['a', 'b']}).valueOf() );
		});
		it.skip('should return new query.Raw("HAVING a")', function(){
			assert.strictEqual((new query.Raw('HAVING `a`')).valueOf(), query.having({having:['a']}).valueOf() );
			assert.strictEqual((new query.Raw('HAVING `a`')).valueOf(), query.having({having:'a'}).valueOf() );
		});

	});

	// ORDER
	describe('.order()', function(){
		it('should return undefined', function(){
			assert.strictEqual(undefined, query.order({}) );
		});

		// FIXME: Implement these!
		it.skip('should return new query.Raw("ORDER (`a`)")', function(){
			assert.strictEqual((new query.Raw('ORDER (`a`)')).valueOf(), query.order({order:'a'}).valueOf() );
		});
		it.skip('should return new query.Raw("ORDER (`a`, `b`)")', function(){
			assert.strictEqual((new query.Raw('ORDER (`a`, `b`)')).valueOf(), query.order({order:['a','b']}).valueOf() );
		});

	});

	// LIMIT
	describe('.limit()', function(){
		it('should return undefined', function(){
			assert.strictEqual(undefined, query.limit({}) );
		});

		// FIXME: Implement these!
		it('should return new query.Raw("LIMIT 1")', function(){
			assert.strictEqual((new query.Raw('LIMIT 1')).valueOf(), query.limit({limit:1}).valueOf() );
		});
		it('should return new query.Raw("LIMIT 2, 4")', function(){
			assert.strictEqual((new query.Raw('LIMIT 2, 4')).valueOf(), query.limit({limit:{offset:2, count:4}}).valueOf() );
			assert.strictEqual((new query.Raw('LIMIT 2, 4')).valueOf(), query.limit({limit:[2, 4]}).valueOf() );
		});

	});

	// SELECT
	describe('.select()', function(){
		it('should return SELECT *', function(){
			assert.strictEqual((new query.Raw('SELECT *')).valueOf(), query.select({}).valueOf() );
		});

		it('should return SELECT * FROM `foo`', function(){
			assert.strictEqual(
				query.select({from:'foo'}).valueOf(),
				(new query.Raw('SELECT * FROM `foo`')).valueOf()
			);
		});

		it('should return SELECT DISTINCT * FROM `foo`', function(){
			assert.strictEqual(
				query.select({distinct:true, from:'foo'}).valueOf(),
				(new query.Raw('SELECT DISTINCT * FROM `foo`')).valueOf()
			);
		});

		it('should return SELECT * FROM `foo` WHERE (`id` = ?) with [10]', function(){
			assert.strictEqual(
				query.select({from:'foo',where:{id:10}}).valueOf(),
				(new query.Raw('SELECT * FROM `foo` WHERE (`id` = ?)', [10])).valueOf()
			);
		});

		it('should return SELECT * FROM `foo` WHERE (`id` = ?) AND (`user_id` = ?) with [10, 20]', function(){
			assert.strictEqual(
				query.select({from:'foo',where:{id:10,user_id:20}}).valueOf(),
				(new query.Raw('SELECT * FROM `foo` WHERE (`id` = ?) AND (`user_id` = ?)', [10, 20])).valueOf()
			);
		});

	});


});

/* EOF */
