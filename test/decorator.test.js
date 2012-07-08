/*!
 * Decorators. POW! Arrghhh!
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Support.
 */
var should = require('chai').should();
var inherits = require('util').inherits;

/**
 * Subject.
 */
var Decorator = require('../');

/**
 * Base Decorator. Used as a fixture.
 */
function BaseDecorator() {
  BaseDecorator.super_.apply(this, arguments);
};

/**
 * Inherit from `Decorator`.
 */
inherits(BaseDecorator, Decorator);

/**
 * Return the full name of the user.
 *
 * @returns {String}
 * @api public
 */
BaseDecorator.prototype.fullName = function() {
  return this.firstName() + ' ' + this.lastName();
};

/**
 * Return an age.
 *
 * @returns {String}
 * @api public
 */
BaseDecorator.prototype.age = function() {
  return 'decorator age';
};

/**
 * Blacklist Decorator. Test method blacklisting.
 */
function BlacklistDecorator() {
  BlacklistDecorator.super_.apply(this, arguments);
};

/**
 * Inherit from `BaseDecorator`.
 */
inherits(BlacklistDecorator, BaseDecorator);

/**
 * Denied methods.
 *
 * @type {Array}
 */
BlacklistDecorator.prototype.denies = ['weight'];

/**
 * Whitelist Decorator. Test method whitelisting.
 */
function WhitelistDecorator() {
  WhitelistDecorator.super_.apply(this, arguments);
};

/**
 * Inherit from `BaseDecorator`.
 */
inherits(WhitelistDecorator, BaseDecorator);

/**
 * Allowed methods.
 *
 * @type {Array}
 */
WhitelistDecorator.prototype.allows = ['age'];


/**
 * Whitelist Decorator. Test method whitelisting
 * and blacklisting at the same time.
 */
function MixedDecorator() {
  MixedDecorator.super_.apply(this, arguments);
};

/**
 * Inherit from `BaseDecorator`.
 */
inherits(MixedDecorator, BaseDecorator);

/**
 * Allowed methods.
 *
 * @type {Array}
 */
MixedDecorator.prototype.allows = ['age'];

/**
 * Blacklisted methods.
 *
 * @type {Array}
 */
MixedDecorator.prototype.denies = ['age'];

/**
 * The decorated object.
 *
 * @param {String} first name
 * @param {String} last name
 */
function User(first, last) {
  this.first = first;
  this.last = last;
};

/**
 * Return the first name of the user.
 *
 * @returns {String}
 * @api public
 */
User.prototype.firstName = function() {
  return this.first;
};

/**
 * Return the last name of the user.
 *
 * @returns {String}
 * @api public
 */
User.prototype.lastName = function() {
  return this.last;
};

/**
 * Return an age.
 *
 * @returns {String}
 * @api public
 */
User.prototype.age = function() {
  return 'user age';
};

/**
 * Return the user weight.
 *
 * @returns {String}
 * @api public
 */
User.prototype.weight = function() {
  return 68;
};

describe('Decorator', function() {
  var subject = null;

  beforeEach(function() {
    subject = new BaseDecorator(new User('First', 'Last'));
  });

  it('delegates method calls to the decorated object', function() {
    subject.firstName().should.eql('First');
  });

  it('ignores everything but methods', function() {
    should.not.exist(subject.first);
  });

  it('ignores methods that are already defined', function() {
    subject.age().should.eq('decorator age');
  });

  it('denies blacklisted methods', function() {
    subject = new BlacklistDecorator(new User('First', 'Last'));
    should.not.exist(subject.weight);
  });

  it('allows whitelisted methods', function() {
    subject = new WhitelistDecorator(new User('First', 'Last'));

    should.not.exist(subject.weight);
    should.exist(subject.age);
  });

  it('ignores blacklisted methods when a whitelist is provied', function() {
    subject = new MixedDecorator(new User('First', 'Last'));

    should.not.exist(subject.weight);
    should.exist(subject.age);
  });
});
