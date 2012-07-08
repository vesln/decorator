/*!
 * Decorators. POW! Arrghhh!
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Decorator.
 *
 * @param {Object} an object to be decorated
 */
function Decorator(input) {
  this.denies = this.denies || [];
  this.allows = this.allows || [];
  this.object = input;

  for (var method in input) {
    if ('function' !== typeof input[method]) {
      continue;
    }

    if (this[method]) {
      continue;
    }

    if (~this.denies.indexOf(method) && !this.allows.length) {
      continue;
    }

    if (this.allows.length && !~this.allows.indexOf(method)) {
      continue;
    }

    delegate(method, input, this);
  }
};

/**
 * Delegate a method. Mutate the supplied
 * source.
 *
 * @param {String} method name
 * @param {Object} source
 * @param {Object} target
 */
var delegate = function(method, source, target) {
  target[method] = function() {
    return source[method].apply(source, arguments);
  }
};

/**
 * Expose `Decorator`.
 */
module.exports = Decorator;
