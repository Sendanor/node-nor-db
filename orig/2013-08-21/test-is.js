"use strict";

var is = require('../lib/is.js');
var assert = require('assert');

/* */
describe('is', function(){
  describe('.true()', function(){
    it('should return true when the value is trueish', function(){
      assert.strictEqual(true, is.true(true));
      assert.strictEqual(true, is.true(1));
      assert.strictEqual(true, is.true(2));
      assert.strictEqual(true, is.true('foobar'));
      assert.strictEqual(true, is.true({'foo':'bar'}));
    });
    it('should return false when the value is not trueish', function(){
      assert.strictEqual(false, is.true(false));
      assert.strictEqual(false, is.true(0));
      assert.strictEqual(false, is.true(''));
      assert.strictEqual(false, is.true(null));
      assert.strictEqual(false, is.true(undefined));
    });
  });

  describe('.type()', function(){

    it('should return true when the value is of specified type', function(){
      assert.strictEqual(true, is.type(false, 'boolean'));
      assert.strictEqual(true, is.type(undefined, 'undefined'));
      assert.strictEqual(true, is.type(null, 'object'));
      assert.strictEqual(true, is.type(1, 'number'));
      assert.strictEqual(true, is.type('foo', 'string'));
      assert.strictEqual(true, is.type({'foo':'bar'}, 'object'));
      assert.strictEqual(true, is.type([1,2,3,4], 'object'));
      assert.strictEqual(true, is.type(function() { return 'foobar'; }, 'function'));
    });

	it('should return false when the value is not of specified type', function(){
		// FIXME: Add missing compinations
		assert.strictEqual(false, is.type(undefined, 'boolean'));
		assert.strictEqual(false, is.type(true, 'undefined'));
		assert.strictEqual(false, is.type(1, 'object'));
		assert.strictEqual(false, is.type({foo:'bar'}, 'number'));
		assert.strictEqual(false, is.type(123, 'string'));
		assert.strictEqual(false, is.type(678, 'object'));
		assert.strictEqual(false, is.type("hello", 'object'));
		assert.strictEqual(false, is.type(null, 'function'));
	});

  });

  describe('.obj()', function(){

    it('should return true when the value is an object', function(){
      assert.strictEqual(true, is.obj({'foo':'bar'}));
      assert.strictEqual(true, is.obj([1,2,3,4]));
    });

	it('should return false when the value is not an object', function(){
		// FIXME: Add missing compinations
		assert.strictEqual(false, is.obj(null));
		assert.strictEqual(false, is.obj(undefined));
		assert.strictEqual(false, is.obj(true));
		assert.strictEqual(false, is.obj(false));
		assert.strictEqual(false, is.obj(1));
		assert.strictEqual(false, is.obj(123));
		assert.strictEqual(false, is.obj("hello"));
	});

  });

  describe('.array()', function(){

	it('should return true when the value is an array', function(){
		assert.strictEqual(true, is.array([1,2,3,4]));
	});

	it('should return false when the value is not an array', function(){
		// FIXME: Add missing compinations
		assert.strictEqual(false, is.array({'foo':'bar'}));
		assert.strictEqual(false, is.array(null));
		assert.strictEqual(false, is.array(undefined));
		assert.strictEqual(false, is.array(true));
		assert.strictEqual(false, is.array(false));
		assert.strictEqual(false, is.array(1));
		assert.strictEqual(false, is.array(123));
		assert.strictEqual(false, is.array("hello"));
	});

  });

  describe('.string()', function(){

	it('should return true when the value is an string', function(){
		assert.strictEqual(true, is.string("hello"));
	});

	it('should return false when the value is not an string', function(){
		// FIXME: Add missing compinations
		assert.strictEqual(false, is.string({'foo':'bar'}));
		assert.strictEqual(false, is.string(null));
		assert.strictEqual(false, is.string(undefined));
		assert.strictEqual(false, is.string(true));
		assert.strictEqual(false, is.string(false));
		assert.strictEqual(false, is.string(1));
		assert.strictEqual(false, is.string(123));
		assert.strictEqual(false, is.string([1,2,3,4]));
	});

  });

  describe('.objOf()', function(){

    it('should return true when the value is of specified type', function(){
      assert.strictEqual(true, is.objOf(new Date(), Date));
      assert.strictEqual(true, is.objOf({'foo':'bar'}, Object));
      assert.strictEqual(true, is.objOf([1,2,3,4], Array));
    });

	it('should return false when the value is not of specified type', function(){
		// FIXME: Add missing compinations
		assert.strictEqual(false, is.objOf(undefined, Date));
		assert.strictEqual(false, is.objOf(true, Date));
		assert.strictEqual(false, is.objOf(1, Date));
		assert.strictEqual(false, is.objOf({foo:'bar'}, Date));
		assert.strictEqual(false, is.objOf(123, Date));
		assert.strictEqual(false, is.objOf(678, Date));
		assert.strictEqual(false, is.objOf("hello", Date));
		assert.strictEqual(false, is.objOf(null, Date));
	});

  });

});

/* EOF */
