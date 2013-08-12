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

});

/* EOF */
