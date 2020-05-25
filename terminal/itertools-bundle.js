(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const itertools = require('itertools');

},{"itertools":5}],2:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":9}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = all;
exports.any = any;
exports.contains = contains;
exports.enumerate = enumerate;
exports.filter = filter;
exports.iter = iter;
exports.map = map;
exports.max = max;
exports.min = min;
exports.range = range;
exports.reduce = reduce;
exports.reduce_ = reduce_;
exports.sorted = sorted;
exports.sum = sum;
exports.zip = zip;
exports.zip3 = zip3;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _custom = require("./custom");

var _itertools = require("./itertools");

window.itertools = _itertools;

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(enumerate);

/**
 * Returns true when all of the items in iterable are truthy.  An optional key
 * function can be used to define what truthiness means for this specific
 * collection.
 *
 * Examples:
 *
 *     all([])                           // => true
 *     all([0])                          // => false
 *     all([0, 1, 2])                    // => false
 *     all([1, 2, 3])                    // => true
 *
 * Examples with using a key function:
 *
 *     all([2, 4, 6], n => n % 2 === 0)  // => true
 *     all([2, 4, 5], n => n % 2 === 0)  // => false
 *
 */
function all(iterable) {
  var keyFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.identityPredicate;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = iterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (!keyFn(item)) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
}
/**
 * Returns true when any of the items in iterable are truthy.  An optional key
 * function can be used to define what truthiness means for this specific
 * collection.
 *
 * Examples:
 *
 *     any([])                           // => false
 *     any([0])                          // => false
 *     any([0, 1, null, undefined])      // => true
 *
 * Examples with using a key function:
 *
 *     any([1, 4, 5], n => n % 2 === 0)  // => true
 *     any([{name: 'Bob'}, {name: 'Alice'}], person => person.name.startsWith('C'))  // => false
 *
 */


function any(iterable) {
  var keyFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.identityPredicate;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = iterable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      if (keyFn(item)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
}
/**
 * Returns true when any of the items in the iterable are equal to the target object.
 *
 * Examples:
 *
 *     contains([], 'whatever')         // => false
 *     contains([3], 42)                // => false
 *     contains([3], 3)                 // => true
 *     contains([0, 1, 2], 2)           // => true
 *
 */


function contains(haystack, needle) {
  return any(haystack, function (x) {
    return x === needle;
  });
}
/**
 * Returns an iterable of enumeration pairs.  Iterable must be a sequence, an
 * iterator, or some other object which supports iteration.  The elements
 * produced by returns a tuple containing a counter value (starting from 0 by
 * default) and the values obtained from iterating over given iterable.
 *
 * Example:
 *
 *     import { enumerate } from 'itertools';
 *
 *     console.log([...enumerate(['hello', 'world'])]);
 *     // [0, 'hello'], [1, 'world']]
 */


function enumerate(iterable) {
  var start,
      index,
      _iteratorNormalCompletion3,
      _didIteratorError3,
      _iteratorError3,
      _iterator3,
      _step3,
      value,
      _args = arguments;

  return _regenerator["default"].wrap(function enumerate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          start = _args.length > 1 && _args[1] !== undefined ? _args[1] : 0;
          index = start;
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context.prev = 5;
          _iterator3 = iterable[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context.next = 14;
            break;
          }

          value = _step3.value;
          _context.next = 11;
          return [index++, value];

        case 11:
          _iteratorNormalCompletion3 = true;
          _context.next = 7;
          break;

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](5);
          _didIteratorError3 = true;
          _iteratorError3 = _context.t0;

        case 20:
          _context.prev = 20;
          _context.prev = 21;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 23:
          _context.prev = 23;

          if (!_didIteratorError3) {
            _context.next = 26;
            break;
          }

          throw _iteratorError3;

        case 26:
          return _context.finish(23);

        case 27:
          return _context.finish(20);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[5, 16, 20, 28], [21,, 23, 27]]);
}
/**
 * Non-lazy version of ifilter().
 */


function filter(iterable, predicate) {
  return Array.from((0, _itertools.ifilter)(iterable, predicate));
}
/**
 * Returns an iterator object for the given iterable.  This can be used to
 * manually get an iterator for any iterable datastructure.  The purpose and
 * main use case of this function is to get a single iterator (a thing with
 * state, think of it as a "cursor") which can only be consumed once.
 */


function iter(iterable) {
  // TODO: Not sure why Flow choked on this expression below, but at least we lock down the
  // type transformation in the function signature this way.
  // $FlowFixMe
  return iterable[Symbol.iterator]();
}
/**
 * Non-lazy version of imap().
 */


function map(iterable, mapper) {
  return Array.from((0, _itertools.imap)(iterable, mapper));
}
/**
 * Return the largest item in an iterable.  Only works for numbers, as ordering
 * is pretty poorly defined on any other data type in JS.  The optional `keyFn`
 * argument specifies a one-argument ordering function like that used for
 * sorted().
 *
 * If the iterable is empty, `undefined` is returned.
 *
 * If multiple items are maximal, the function returns either one of them, but
 * which one is not defined.
 */


function max(iterable) {
  var keyFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.numberIdentity;
  return reduce_(iterable, function (x, y) {
    return keyFn(x) > keyFn(y) ? x : y;
  });
}
/**
 * Return the smallest item in an iterable.  Only works for numbers, as
 * ordering is pretty poorly defined on any other data type in JS.  The
 * optional `keyFn` argument specifies a one-argument ordering function like
 * that used for sorted().
 *
 * If the iterable is empty, `undefined` is returned.
 *
 * If multiple items are minimal, the function returns either one of them, but
 * which one is not defined.
 */


function min(iterable) {
  var keyFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.numberIdentity;
  return reduce_(iterable, function (x, y) {
    return keyFn(x) < keyFn(y) ? x : y;
  });
}
/**
 * Internal helper for the range function
 */


function _range(start, stop, step) {
  var counter = (0, _itertools.count)(start, step);
  var pred = step >= 0 ? function (n) {
    return n < stop;
  } : function (n) {
    return n > stop;
  };
  return (0, _itertools.takewhile)(counter, pred);
}
/**
 * Returns an iterator producing all the numbers in the given range one by one,
 * starting from `start` (default 0), as long as `i < stop`, in increments of
 * `step` (default 1).
 *
 * `range(a)` is a convenient shorthand for `range(0, a)`.
 *
 * Various valid invocations:
 *
 *     range(5)           // [0, 1, 2, 3, 4]
 *     range(2, 5)        // [2, 3, 4]
 *     range(0, 5, 2)     // [0, 2, 4]
 *     range(5, 0, -1)    // [5, 4, 3, 2, 1]
 *     range(-3)          // []
 *
 * For a positive `step`, the iterator will keep producing values `n` as long
 * as the stop condition `n < stop` is satisfied.
 *
 * For a negative `step`, the iterator will keep producing values `n` as long
 * as the stop condition `n > stop` is satisfied.
 *
 * The produced range will be empty if the first value to produce already does
 * not meet the value constraint.
 */


function range(a) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  var args = [a].concat(rest); // "a" was only used by Flow to make at least one value mandatory

  switch (args.length) {
    case 1:
      return _range(0, args[0], 1);

    case 2:
      return _range(args[0], args[1], 1);

    case 3:
      return _range(args[0], args[1], args[2]);

    /* istanbul ignore next */

    default:
      throw new Error('invalid number of arguments');
  }
}
/**
 * Apply function of two arguments cumulatively to the items of sequence, from
 * left to right, so as to reduce the sequence to a single value.  For example:
 *
 *     reduce([1, 2, 3, 4, 5], (x, y) => x + y, 0)
 *
 * calculates
 *
 *     (((((0+1)+2)+3)+4)+5)
 *
 * The left argument, `x`, is the accumulated value and the right argument,
 * `y`, is the update value from the sequence.
 *
 * **Difference between `reduce()` and `reduce\_()`**:  `reduce()` requires an
 * explicit initializer, whereas `reduce_()` will automatically use the first
 * item in the given iterable as the initializer.  When using `reduce()`, the
 * initializer value is placed before the items of the sequence in the
 * calculation, and serves as a default when the sequence is empty.  When using
 * `reduce_()`, and the given iterable is empty, then no default value can be
 * derived and `undefined` will be returned.
 */


function reduce(iterable, reducer, start) {
  var it = iter(iterable);
  var output = start;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = enumerate(it)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = _slicedToArray(_step4.value, 2),
          index = _step4$value[0],
          item = _step4$value[1];

      output = reducer(output, item, index);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return output;
}
/**
 * See reduce().
 */


function reduce_(iterable, reducer) {
  var it = iter(iterable);
  var start = (0, _custom.first)(it);

  if (start === undefined) {
    return undefined;
  } else {
    return reduce(it, reducer, start);
  }
}
/**
 * Return a new sorted list from the items in iterable.
 *
 * Has two optional arguments:
 *
 * * `keyFn` specifies a function of one argument providing a primitive
 *   identity for each element in the iterable.  that will be used to compare.
 *   The default value is to use a default identity function that is only
 *   defined for primitive types.
 *
 * * `reverse` is a boolean value.  If `true`, then the list elements are
 *   sorted as if each comparison were reversed.
 */


function sorted(iterable) {
  var keyFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.primitiveIdentity;
  var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var result = Array.from(iterable);
  result.sort((0, _utils.keyToCmp)(keyFn)); // sort in-place

  if (reverse) {
    result.reverse(); // reverse in-place
  }

  return result;
}
/**
 * Sums the items of an iterable from left to right and returns the total.  The
 * sum will defaults to 0 if the iterable is empty.
 */


function sum(iterable) {
  return reduce(iterable, function (x, y) {
    return x + y;
  }, 0);
}
/**
 * See izip.
 */


function zip(xs, ys) {
  return Array.from((0, _itertools.izip)(xs, ys));
}
/**
 * See izip3.
 */


function zip3(xs, ys, zs) {
  return Array.from((0, _itertools.izip3)(xs, ys, zs));
}
},{"./custom":4,"./itertools":6,"./utils":8,"@babel/runtime/regenerator":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.icompact = icompact;
exports.compact = compact;
exports.compactObject = compactObject;
exports.first = first;
exports.flatmap = flatmap;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _itertools = require("./itertools");

var _moreItertools = require("./more-itertools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(icompact);

function isDefined(x) {
  return x !== undefined;
}
/**
 * Returns an iterable, filtering out any `undefined` values from the input
 * iterable.  This function is useful to convert a list of `Maybe<T>`'s to
 * a list of `T`'s, discarding all the undefined values:
 *
 *     >>> compact([1, 2, undefined, 3])
 *     [1, 2, 3]
 */


function icompact(iterable) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return _regenerator["default"].wrap(function icompact$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 3;
          _iterator = iterable[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 13;
            break;
          }

          item = _step.value;

          if (!(typeof item !== 'undefined')) {
            _context.next = 10;
            break;
          }

          _context.next = 10;
          return item;

        case 10:
          _iteratorNormalCompletion = true;
          _context.next = 5;
          break;

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](3);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 19:
          _context.prev = 19;
          _context.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 22:
          _context.prev = 22;

          if (!_didIteratorError) {
            _context.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context.finish(22);

        case 26:
          return _context.finish(19);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[3, 15, 19, 27], [20,, 22, 26]]);
}
/**
 * See icompact().
 */


function compact(iterable) {
  return Array.from(icompact(iterable));
}
/**
 * Removes all undefined values from the given object.  Returns a new object.
 *
 *     >>> compactObject({ a: 1, b: undefined, c: 0 })
 *     { a: 1, c: 0 }
 *
 */


function compactObject(obj) {
  var result = {};

  for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        _key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (typeof value !== 'undefined') {
      result[_key] = value;
    }
  }

  return result;
}
/**
 * Returns the first item in the iterable for which the predicate holds, if
 * any.  If no such item exists, `undefined` is returned.  The default
 * predicate is any defined value.
 */


function first(iterable, keyFn) {
  var fn = keyFn || isDefined;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = iterable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var value = _step2.value;

      if (fn(value)) {
        return value;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return undefined;
}
/**
 * Returns 0 or more values for every value in the given iterable.
 * Technically, it's just calling map(), followed by flatten(), but it's a very
 * useful operation if you want to map over a structure, but not have a 1:1
 * input-output mapping.  Instead, if you want to potentially return 0 or more
 * values per input element, use flatmap():
 *
 * For example, to return all numbers `n` in the input iterable `n` times:
 *
 *     >>> const repeatN = n => repeat(n, n);
 *     >>> [...flatmap([0, 1, 2, 3, 4], repeatN)]
 *     [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]  // note: no 0
 *
 */


function flatmap(iterable, mapper) {
  return (0, _moreItertools.flatten)((0, _itertools.imap)(iterable, mapper));
}
},{"./itertools":6,"./more-itertools":7,"@babel/runtime/regenerator":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "all", {
  enumerable: true,
  get: function get() {
    return _builtins.all;
  }
});
Object.defineProperty(exports, "any", {
  enumerable: true,
  get: function get() {
    return _builtins.any;
  }
});
Object.defineProperty(exports, "contains", {
  enumerable: true,
  get: function get() {
    return _builtins.contains;
  }
});
Object.defineProperty(exports, "enumerate", {
  enumerable: true,
  get: function get() {
    return _builtins.enumerate;
  }
});
Object.defineProperty(exports, "filter", {
  enumerable: true,
  get: function get() {
    return _builtins.filter;
  }
});
Object.defineProperty(exports, "iter", {
  enumerable: true,
  get: function get() {
    return _builtins.iter;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function get() {
    return _builtins.map;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function get() {
    return _builtins.max;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function get() {
    return _builtins.min;
  }
});
Object.defineProperty(exports, "range", {
  enumerable: true,
  get: function get() {
    return _builtins.range;
  }
});
Object.defineProperty(exports, "reduce", {
  enumerable: true,
  get: function get() {
    return _builtins.reduce;
  }
});
Object.defineProperty(exports, "sorted", {
  enumerable: true,
  get: function get() {
    return _builtins.sorted;
  }
});
Object.defineProperty(exports, "sum", {
  enumerable: true,
  get: function get() {
    return _builtins.sum;
  }
});
Object.defineProperty(exports, "zip", {
  enumerable: true,
  get: function get() {
    return _builtins.zip;
  }
});
Object.defineProperty(exports, "zip3", {
  enumerable: true,
  get: function get() {
    return _builtins.zip3;
  }
});
Object.defineProperty(exports, "chain", {
  enumerable: true,
  get: function get() {
    return _itertools.chain;
  }
});
Object.defineProperty(exports, "compress", {
  enumerable: true,
  get: function get() {
    return _itertools.compress;
  }
});
Object.defineProperty(exports, "count", {
  enumerable: true,
  get: function get() {
    return _itertools.count;
  }
});
Object.defineProperty(exports, "cycle", {
  enumerable: true,
  get: function get() {
    return _itertools.cycle;
  }
});
Object.defineProperty(exports, "dropwhile", {
  enumerable: true,
  get: function get() {
    return _itertools.dropwhile;
  }
});
Object.defineProperty(exports, "groupby", {
  enumerable: true,
  get: function get() {
    return _itertools.groupby;
  }
});
Object.defineProperty(exports, "icompress", {
  enumerable: true,
  get: function get() {
    return _itertools.icompress;
  }
});
Object.defineProperty(exports, "ifilter", {
  enumerable: true,
  get: function get() {
    return _itertools.ifilter;
  }
});
Object.defineProperty(exports, "imap", {
  enumerable: true,
  get: function get() {
    return _itertools.imap;
  }
});
Object.defineProperty(exports, "izip", {
  enumerable: true,
  get: function get() {
    return _itertools.izip;
  }
});
Object.defineProperty(exports, "izip2", {
  enumerable: true,
  get: function get() {
    return _itertools.izip2;
  }
});
Object.defineProperty(exports, "izip3", {
  enumerable: true,
  get: function get() {
    return _itertools.izip3;
  }
});
Object.defineProperty(exports, "izipMany", {
  enumerable: true,
  get: function get() {
    return _itertools.izipMany;
  }
});
Object.defineProperty(exports, "izipLongest", {
  enumerable: true,
  get: function get() {
    return _itertools.izipLongest;
  }
});
Object.defineProperty(exports, "permutations", {
  enumerable: true,
  get: function get() {
    return _itertools.permutations;
  }
});
Object.defineProperty(exports, "takewhile", {
  enumerable: true,
  get: function get() {
    return _itertools.takewhile;
  }
});
Object.defineProperty(exports, "zipLongest", {
  enumerable: true,
  get: function get() {
    return _itertools.zipLongest;
  }
});
Object.defineProperty(exports, "zipMany", {
  enumerable: true,
  get: function get() {
    return _itertools.zipMany;
  }
});
Object.defineProperty(exports, "chunked", {
  enumerable: true,
  get: function get() {
    return _moreItertools.chunked;
  }
});
Object.defineProperty(exports, "flatten", {
  enumerable: true,
  get: function get() {
    return _moreItertools.flatten;
  }
});
Object.defineProperty(exports, "heads", {
  enumerable: true,
  get: function get() {
    return _moreItertools.heads;
  }
});
Object.defineProperty(exports, "itake", {
  enumerable: true,
  get: function get() {
    return _moreItertools.itake;
  }
});
Object.defineProperty(exports, "pairwise", {
  enumerable: true,
  get: function get() {
    return _moreItertools.pairwise;
  }
});
Object.defineProperty(exports, "partition", {
  enumerable: true,
  get: function get() {
    return _moreItertools.partition;
  }
});
Object.defineProperty(exports, "roundrobin", {
  enumerable: true,
  get: function get() {
    return _moreItertools.roundrobin;
  }
});
Object.defineProperty(exports, "take", {
  enumerable: true,
  get: function get() {
    return _moreItertools.take;
  }
});
Object.defineProperty(exports, "uniqueEverseen", {
  enumerable: true,
  get: function get() {
    return _moreItertools.uniqueEverseen;
  }
});
Object.defineProperty(exports, "uniqueJustseen", {
  enumerable: true,
  get: function get() {
    return _moreItertools.uniqueJustseen;
  }
});
Object.defineProperty(exports, "compact", {
  enumerable: true,
  get: function get() {
    return _custom.compact;
  }
});
Object.defineProperty(exports, "compactObject", {
  enumerable: true,
  get: function get() {
    return _custom.compactObject;
  }
});
Object.defineProperty(exports, "first", {
  enumerable: true,
  get: function get() {
    return _custom.first;
  }
});
Object.defineProperty(exports, "flatmap", {
  enumerable: true,
  get: function get() {
    return _custom.flatmap;
  }
});
Object.defineProperty(exports, "icompact", {
  enumerable: true,
  get: function get() {
    return _custom.icompact;
  }
});

var _builtins = require("./builtins");

var _itertools = require("./itertools");

var _moreItertools = require("./more-itertools");

var _custom = require("./custom");
},{"./builtins":3,"./custom":4,"./itertools":6,"./more-itertools":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chain = chain;
exports.count = count;
exports.compress = compress;
exports.cycle = cycle;
exports.dropwhile = dropwhile;
exports.groupby = groupby;
exports.icompress = icompress;
exports.ifilter = ifilter;
exports.imap = imap;
exports.islice = islice;
exports.izip2 = izip2;
exports.izip3 = izip3;
exports.izipLongest2 = izipLongest2;
exports.izipLongest3 = izipLongest3;
exports.izipMany = izipMany;
exports.permutations = permutations;
exports.repeat = repeat;
exports.takewhile = takewhile;
exports.zipLongest2 = zipLongest2;
exports.zipLongest3 = zipLongest3;
exports.zipMany = zipMany;
exports.zipLongest = exports.izipLongest = exports.izip = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _builtins = require("./builtins");

var _moreItertools = require("./more-itertools");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(count),
    _marked2 =
/*#__PURE__*/
_regenerator["default"].mark(cycle),
    _marked3 =
/*#__PURE__*/
_regenerator["default"].mark(dropwhile),
    _marked4 =
/*#__PURE__*/
_regenerator["default"].mark(groupby),
    _marked5 =
/*#__PURE__*/
_regenerator["default"].mark(icompress),
    _marked6 =
/*#__PURE__*/
_regenerator["default"].mark(ifilter),
    _marked7 =
/*#__PURE__*/
_regenerator["default"].mark(imap),
    _marked8 =
/*#__PURE__*/
_regenerator["default"].mark(islice),
    _marked9 =
/*#__PURE__*/
_regenerator["default"].mark(izip2),
    _marked10 =
/*#__PURE__*/
_regenerator["default"].mark(izip3),
    _marked11 =
/*#__PURE__*/
_regenerator["default"].mark(izipLongest2),
    _marked12 =
/*#__PURE__*/
_regenerator["default"].mark(izipLongest3),
    _marked13 =
/*#__PURE__*/
_regenerator["default"].mark(izipMany),
    _marked14 =
/*#__PURE__*/
_regenerator["default"].mark(permutations),
    _marked15 =
/*#__PURE__*/
_regenerator["default"].mark(repeat),
    _marked16 =
/*#__PURE__*/
_regenerator["default"].mark(takewhile);

var SENTINEL = Symbol();

function composeAnd(f1, f2) {
  return function (n) {
    return f1(n) && f2(n);
  };
}

function slicePredicate(start, stop, step) {
  // If stop is not provided (= undefined), then interpret the start value as the stop value
  var _start = start,
      _stop = stop,
      _step = step;

  if (_stop === undefined) {
    var _ref = [0, _start];
    _start = _ref[0];
    _stop = _ref[1];
  }

  var pred = function pred(n) {
    return n >= _start;
  };

  if (_stop !== null) {
    var stopNotNull = _stop;
    pred = composeAnd(pred, function (n) {
      return n < stopNotNull;
    });
  }

  if (_step > 1) {
    pred = composeAnd(pred, function (n) {
      return (n - _start) % _step === 0;
    });
  }

  return pred;
}
/**
 * Returns an iterator that returns elements from the first iterable until it
 * is exhausted, then proceeds to the next iterable, until all of the iterables
 * are exhausted.  Used for treating consecutive sequences as a single
 * sequence.
 */


function chain() {
  for (var _len = arguments.length, iterables = new Array(_len), _key = 0; _key < _len; _key++) {
    iterables[_key] = arguments[_key];
  }

  return (0, _moreItertools.flatten)(iterables);
}
/**
 * Returns an iterator that counts up values starting with number `start`
 * (default 0), incrementing by `step`.  To decrement, use a negative step
 * number.
 */


function count() {
  var start,
      step,
      n,
      _args = arguments;
  return _regenerator["default"].wrap(function count$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          start = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
          step = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
          n = start;

        case 3:
          _context.next = 5;
          return n;

        case 5:
          n += step;

        case 6:
          _context.next = 3;
          break;

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Non-lazy version of icompress().
 */


function compress(data, selectors) {
  return Array.from(icompress(data, selectors));
}
/**
 * Returns an iterator producing elements from the iterable and saving a copy
 * of each.  When the iterable is exhausted, return elements from the saved
 * copy.  Repeats indefinitely.
 */


function cycle(iterable) {
  var saved, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step2, _element, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step3, element;

  return _regenerator["default"].wrap(function cycle$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          saved = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 4;
          _iterator = iterable[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step2 = _iterator.next()).done) {
            _context2.next = 14;
            break;
          }

          _element = _step2.value;
          _context2.next = 10;
          return _element;

        case 10:
          saved.push(_element);

        case 11:
          _iteratorNormalCompletion = true;
          _context2.next = 6;
          break;

        case 14:
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 20:
          _context2.prev = 20;
          _context2.prev = 21;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 23:
          _context2.prev = 23;

          if (!_didIteratorError) {
            _context2.next = 26;
            break;
          }

          throw _iteratorError;

        case 26:
          return _context2.finish(23);

        case 27:
          return _context2.finish(20);

        case 28:
          if (!(saved.length > 0)) {
            _context2.next = 57;
            break;
          }

          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 32;
          _iterator2 = saved[Symbol.iterator]();

        case 34:
          if (_iteratorNormalCompletion2 = (_step3 = _iterator2.next()).done) {
            _context2.next = 41;
            break;
          }

          element = _step3.value;
          _context2.next = 38;
          return element;

        case 38:
          _iteratorNormalCompletion2 = true;
          _context2.next = 34;
          break;

        case 41:
          _context2.next = 47;
          break;

        case 43:
          _context2.prev = 43;
          _context2.t1 = _context2["catch"](32);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t1;

        case 47:
          _context2.prev = 47;
          _context2.prev = 48;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 50:
          _context2.prev = 50;

          if (!_didIteratorError2) {
            _context2.next = 53;
            break;
          }

          throw _iteratorError2;

        case 53:
          return _context2.finish(50);

        case 54:
          return _context2.finish(47);

        case 55:
          _context2.next = 28;
          break;

        case 57:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[4, 16, 20, 28], [21,, 23, 27], [32, 43, 47, 55], [48,, 50, 54]]);
}
/**
 * Returns an iterator that drops elements from the iterable as long as the
 * predicate is true; afterwards, returns every remaining element.  Note, the
 * iterator does not produce any output until the predicate first becomes
 * false.
 */


function dropwhile(iterable, predicate) {
  var it, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step4, value, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step5, _value;

  return _regenerator["default"].wrap(function dropwhile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          it = (0, _builtins.iter)(iterable);
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context3.prev = 4;
          _iterator3 = it[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion3 = (_step4 = _iterator3.next()).done) {
            _context3.next = 15;
            break;
          }

          value = _step4.value;

          if (predicate(value)) {
            _context3.next = 12;
            break;
          }

          _context3.next = 11;
          return value;

        case 11:
          return _context3.abrupt("break", 15);

        case 12:
          _iteratorNormalCompletion3 = true;
          _context3.next = 6;
          break;

        case 15:
          _context3.next = 21;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](4);
          _didIteratorError3 = true;
          _iteratorError3 = _context3.t0;

        case 21:
          _context3.prev = 21;
          _context3.prev = 22;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 24:
          _context3.prev = 24;

          if (!_didIteratorError3) {
            _context3.next = 27;
            break;
          }

          throw _iteratorError3;

        case 27:
          return _context3.finish(24);

        case 28:
          return _context3.finish(21);

        case 29:
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context3.prev = 32;
          _iterator4 = it[Symbol.iterator]();

        case 34:
          if (_iteratorNormalCompletion4 = (_step5 = _iterator4.next()).done) {
            _context3.next = 41;
            break;
          }

          _value = _step5.value;
          _context3.next = 38;
          return _value;

        case 38:
          _iteratorNormalCompletion4 = true;
          _context3.next = 34;
          break;

        case 41:
          _context3.next = 47;
          break;

        case 43:
          _context3.prev = 43;
          _context3.t1 = _context3["catch"](32);
          _didIteratorError4 = true;
          _iteratorError4 = _context3.t1;

        case 47:
          _context3.prev = 47;
          _context3.prev = 48;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 50:
          _context3.prev = 50;

          if (!_didIteratorError4) {
            _context3.next = 53;
            break;
          }

          throw _iteratorError4;

        case 53:
          return _context3.finish(50);

        case 54:
          return _context3.finish(47);

        case 55:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[4, 17, 21, 29], [22,, 24, 28], [32, 43, 47, 55], [48,, 50, 54]]);
}

function groupby(iterable) {
  var keyFn,
      it,
      currentValue,
      currentKey,
      targetKey,
      grouper,
      nextVal,
      _args5 = arguments;
  return _regenerator["default"].wrap(function groupby$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          keyFn = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : _utils.primitiveIdentity;
          it = (0, _builtins.iter)(iterable);
          // $FlowFixMe - deliberate use of the SENTINEL symbol
          currentKey = SENTINEL;
          targetKey = currentKey;
          grouper =
          /*#__PURE__*/
          _regenerator["default"].mark(function grouper(tgtKey) {
            var nextVal;
            return _regenerator["default"].wrap(function grouper$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!(currentKey === tgtKey)) {
                      _context4.next = 10;
                      break;
                    }

                    _context4.next = 3;
                    return currentValue;

                  case 3:
                    nextVal = it.next();

                    if (!nextVal.done) {
                      _context4.next = 6;
                      break;
                    }

                    return _context4.abrupt("return");

                  case 6:
                    currentValue = nextVal.value; // eslint-disable-line require-atomic-updates

                    currentKey = keyFn(currentValue); // eslint-disable-line require-atomic-updates

                    _context4.next = 0;
                    break;

                  case 10:
                  case "end":
                    return _context4.stop();
                }
              }
            }, grouper);
          });

        case 5:
          if (!(currentKey === targetKey)) {
            _context5.next = 14;
            break;
          }

          nextVal = it.next();

          if (!nextVal.done) {
            _context5.next = 10;
            break;
          }

          // $FlowFixMe - deliberate use of the SENTINEL symbol
          currentKey = SENTINEL;
          return _context5.abrupt("return");

        case 10:
          currentValue = nextVal.value;
          currentKey = keyFn(currentValue);
          _context5.next = 5;
          break;

        case 14:
          targetKey = currentKey;
          _context5.next = 17;
          return [currentKey, grouper(targetKey)];

        case 17:
          _context5.next = 5;
          break;

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked4);
}
/**
 * Returns an iterator that filters elements from data returning only those
 * that have a corresponding element in selectors that evaluates to `true`.
 * Stops when either the data or selectors iterables has been exhausted.
 */


function icompress(data, selectors) {
  var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step6, _step6$value, d, s;

  return _regenerator["default"].wrap(function icompress$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _iteratorNormalCompletion5 = true;
          _didIteratorError5 = false;
          _iteratorError5 = undefined;
          _context6.prev = 3;
          _iterator5 = izip(data, selectors)[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion5 = (_step6 = _iterator5.next()).done) {
            _context6.next = 13;
            break;
          }

          _step6$value = _slicedToArray(_step6.value, 2), d = _step6$value[0], s = _step6$value[1];

          if (!s) {
            _context6.next = 10;
            break;
          }

          _context6.next = 10;
          return d;

        case 10:
          _iteratorNormalCompletion5 = true;
          _context6.next = 5;
          break;

        case 13:
          _context6.next = 19;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](3);
          _didIteratorError5 = true;
          _iteratorError5 = _context6.t0;

        case 19:
          _context6.prev = 19;
          _context6.prev = 20;

          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }

        case 22:
          _context6.prev = 22;

          if (!_didIteratorError5) {
            _context6.next = 25;
            break;
          }

          throw _iteratorError5;

        case 25:
          return _context6.finish(22);

        case 26:
          return _context6.finish(19);

        case 27:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked5, null, [[3, 15, 19, 27], [20,, 22, 26]]);
}
/**
 * Returns an iterator that filters elements from iterable returning only those
 * for which the predicate is true.
 */


function ifilter(iterable, predicate) {
  var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step7, value;

  return _regenerator["default"].wrap(function ifilter$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _iteratorNormalCompletion6 = true;
          _didIteratorError6 = false;
          _iteratorError6 = undefined;
          _context7.prev = 3;
          _iterator6 = iterable[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion6 = (_step7 = _iterator6.next()).done) {
            _context7.next = 13;
            break;
          }

          value = _step7.value;

          if (!predicate(value)) {
            _context7.next = 10;
            break;
          }

          _context7.next = 10;
          return value;

        case 10:
          _iteratorNormalCompletion6 = true;
          _context7.next = 5;
          break;

        case 13:
          _context7.next = 19;
          break;

        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](3);
          _didIteratorError6 = true;
          _iteratorError6 = _context7.t0;

        case 19:
          _context7.prev = 19;
          _context7.prev = 20;

          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }

        case 22:
          _context7.prev = 22;

          if (!_didIteratorError6) {
            _context7.next = 25;
            break;
          }

          throw _iteratorError6;

        case 25:
          return _context7.finish(22);

        case 26:
          return _context7.finish(19);

        case 27:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked6, null, [[3, 15, 19, 27], [20,, 22, 26]]);
}
/**
 * Returns an iterator that computes the given mapper function using arguments
 * from each of the iterables.
 */


function imap(iterable, mapper) {
  var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step8, value;

  return _regenerator["default"].wrap(function imap$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _iteratorNormalCompletion7 = true;
          _didIteratorError7 = false;
          _iteratorError7 = undefined;
          _context8.prev = 3;
          _iterator7 = iterable[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion7 = (_step8 = _iterator7.next()).done) {
            _context8.next = 12;
            break;
          }

          value = _step8.value;
          _context8.next = 9;
          return mapper(value);

        case 9:
          _iteratorNormalCompletion7 = true;
          _context8.next = 5;
          break;

        case 12:
          _context8.next = 18;
          break;

        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](3);
          _didIteratorError7 = true;
          _iteratorError7 = _context8.t0;

        case 18:
          _context8.prev = 18;
          _context8.prev = 19;

          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }

        case 21:
          _context8.prev = 21;

          if (!_didIteratorError7) {
            _context8.next = 24;
            break;
          }

          throw _iteratorError7;

        case 24:
          return _context8.finish(21);

        case 25:
          return _context8.finish(18);

        case 26:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked7, null, [[3, 14, 18, 26], [19,, 21, 25]]);
}
/**
 * Returns an iterator that returns selected elements from the iterable.  If
 * `start` is non-zero, then elements from the iterable are skipped until start
 * is reached.  Then, elements are returned by making steps of `step` (defaults
 * to 1).  If set to higher than 1, items will be skipped.  If `stop` is
 * provided, then iteration continues until the iterator reached that index,
 * otherwise, the iterable will be fully exhausted.  `islice()` does not
 * support negative values for `start`, `stop`, or `step`.
 */


function islice(iterable, start, stop) {
  var step,
      pred,
      _iteratorNormalCompletion8,
      _didIteratorError8,
      _iteratorError8,
      _iterator8,
      _step9,
      _step9$value,
      i,
      value,
      _args9 = arguments;

  return _regenerator["default"].wrap(function islice$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          step = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : 1;

          if (!(start < 0)) {
            _context9.next = 3;
            break;
          }

          throw new Error('start cannot be negative');

        case 3:
          if (!(typeof stop === 'number' && stop < 0)) {
            _context9.next = 5;
            break;
          }

          throw new Error('stop cannot be negative');

        case 5:
          if (!(step < 0)) {
            _context9.next = 7;
            break;
          }

          throw new Error('step cannot be negative');

        case 7:
          pred = slicePredicate(start, stop, step);
          _iteratorNormalCompletion8 = true;
          _didIteratorError8 = false;
          _iteratorError8 = undefined;
          _context9.prev = 11;
          _iterator8 = (0, _builtins.enumerate)(iterable)[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion8 = (_step9 = _iterator8.next()).done) {
            _context9.next = 21;
            break;
          }

          _step9$value = _slicedToArray(_step9.value, 2), i = _step9$value[0], value = _step9$value[1];

          if (!pred(i)) {
            _context9.next = 18;
            break;
          }

          _context9.next = 18;
          return value;

        case 18:
          _iteratorNormalCompletion8 = true;
          _context9.next = 13;
          break;

        case 21:
          _context9.next = 27;
          break;

        case 23:
          _context9.prev = 23;
          _context9.t0 = _context9["catch"](11);
          _didIteratorError8 = true;
          _iteratorError8 = _context9.t0;

        case 27:
          _context9.prev = 27;
          _context9.prev = 28;

          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }

        case 30:
          _context9.prev = 30;

          if (!_didIteratorError8) {
            _context9.next = 33;
            break;
          }

          throw _iteratorError8;

        case 33:
          return _context9.finish(30);

        case 34:
          return _context9.finish(27);

        case 35:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked8, null, [[11, 23, 27, 35], [28,, 30, 34]]);
}
/**
 * Returns an iterator that aggregates elements from each of the iterables.
 * Used for lock-step iteration over several iterables at a time.  When
 * iterating over two iterables, use `izip2`.  When iterating over three
 * iterables, use `izip3`, etc.  `izip` is an alias for `izip2`.
 */


function izip2(xs, ys) {
  var ixs, iys, x, y;
  return _regenerator["default"].wrap(function izip2$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          ixs = (0, _builtins.iter)(xs);
          iys = (0, _builtins.iter)(ys);

        case 2:
          x = ixs.next();
          y = iys.next();

          if (!(!x.done && !y.done)) {
            _context10.next = 9;
            break;
          }

          _context10.next = 7;
          return [x.value, y.value];

        case 7:
          _context10.next = 10;
          break;

        case 9:
          return _context10.abrupt("return");

        case 10:
          _context10.next = 2;
          break;

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked9);
}
/**
 * Like izip2, but for three input iterables.
 */


function izip3(xs, ys, zs) {
  var ixs, iys, izs, x, y, z;
  return _regenerator["default"].wrap(function izip3$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          ixs = (0, _builtins.iter)(xs);
          iys = (0, _builtins.iter)(ys);
          izs = (0, _builtins.iter)(zs);

        case 3:
          x = ixs.next();
          y = iys.next();
          z = izs.next();

          if (!(!x.done && !y.done && !z.done)) {
            _context11.next = 11;
            break;
          }

          _context11.next = 9;
          return [x.value, y.value, z.value];

        case 9:
          _context11.next = 12;
          break;

        case 11:
          return _context11.abrupt("return");

        case 12:
          _context11.next = 3;
          break;

        case 14:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked10);
}

var izip = izip2;
/**
 * Returns an iterator that aggregates elements from each of the iterables.  If
 * the iterables are of uneven length, missing values are filled-in with
 * fillvalue.  Iteration continues until the longest iterable is exhausted.
 */

exports.izip = izip;

function izipLongest2(xs, ys) {
  var filler,
      ixs,
      iys,
      x,
      y,
      _args12 = arguments;
  return _regenerator["default"].wrap(function izipLongest2$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          filler = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : undefined;
          ixs = (0, _builtins.iter)(xs);
          iys = (0, _builtins.iter)(ys);

        case 3:
          x = ixs.next();
          y = iys.next();

          if (!(x.done && y.done)) {
            _context12.next = 9;
            break;
          }

          return _context12.abrupt("return");

        case 9:
          _context12.next = 11;
          return [!x.done ? x.value : filler, !y.done ? y.value : filler];

        case 11:
          _context12.next = 3;
          break;

        case 13:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked11);
}
/**
 * See izipLongest2, but for three.
 */


function izipLongest3(xs, ys, zs) {
  var filler,
      ixs,
      iys,
      izs,
      x,
      y,
      z,
      _args13 = arguments;
  return _regenerator["default"].wrap(function izipLongest3$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          filler = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : undefined;
          ixs = (0, _builtins.iter)(xs);
          iys = (0, _builtins.iter)(ys);
          izs = (0, _builtins.iter)(zs);

        case 4:
          x = ixs.next();
          y = iys.next();
          z = izs.next();

          if (!(x.done && y.done && z.done)) {
            _context13.next = 11;
            break;
          }

          return _context13.abrupt("return");

        case 11:
          _context13.next = 13;
          return [!x.done ? x.value : filler, !y.done ? y.value : filler, !z.done ? z.value : filler];

        case 13:
          _context13.next = 4;
          break;

        case 15:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked12);
}
/**
 * Like the other izips (`izip`, `izip3`, etc), but generalized to take an
 * unlimited amount of input iterables.  Think `izip(*iterables)` in Python.
 *
 * **Note:** Due to Flow type system limitations, you can only "generially" zip
 * iterables with homogeneous types, so you cannot mix types like <A, B> like
 * you can with izip2().
 */


function izipMany() {
  var _len2,
      iters,
      _key2,
      iterables,
      heads,
      _args14 = arguments;

  return _regenerator["default"].wrap(function izipMany$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          for (_len2 = _args14.length, iters = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            iters[_key2] = _args14[_key2];
          }

          // Make them all iterables
          iterables = iters.map(_builtins.iter);

        case 2:
          heads = iterables.map(function (xs) {
            return xs.next();
          });

          if (!(0, _builtins.all)(heads, function (h) {
            return !h.done;
          })) {
            _context14.next = 8;
            break;
          }

          _context14.next = 6;
          return heads.map(function (h) {
            return h.value;
          });

        case 6:
          _context14.next = 9;
          break;

        case 8:
          return _context14.abrupt("return");

        case 9:
          _context14.next = 2;
          break;

        case 11:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked13);
}
/**
 * Return successive `r`-length permutations of elements in the iterable.
 *
 * If `r` is not specified, then `r` defaults to the length of the iterable and
 * all possible full-length permutations are generated.
 *
 * Permutations are emitted in lexicographic sort order.  So, if the input
 * iterable is sorted, the permutation tuples will be produced in sorted order.
 *
 * Elements are treated as unique based on their position, not on their value.
 * So if the input elements are unique, there will be no repeat values in each
 * permutation.
 */


function permutations(iterable, r) {
  var pool, n, x, indices, cycles, poolgetter, cleanExit, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step10, i, j, _ref2, p, q;

  return _regenerator["default"].wrap(function permutations$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          pool = Array.from(iterable);
          n = pool.length;
          x = r === undefined ? n : r;

          if (!(x > n)) {
            _context15.next = 5;
            break;
          }

          return _context15.abrupt("return");

        case 5:
          indices = Array.from((0, _builtins.range)(n));
          cycles = Array.from((0, _builtins.range)(n, n - x, -1));

          poolgetter = function poolgetter(i) {
            return pool[i];
          };

          _context15.next = 10;
          return indices.slice(0, x).map(poolgetter);

        case 10:
          if (!(n > 0)) {
            _context15.next = 54;
            break;
          }

          cleanExit = true;
          _iteratorNormalCompletion9 = true;
          _didIteratorError9 = false;
          _iteratorError9 = undefined;
          _context15.prev = 15;
          _iterator9 = (0, _builtins.range)(x - 1, -1, -1)[Symbol.iterator]();

        case 17:
          if (_iteratorNormalCompletion9 = (_step10 = _iterator9.next()).done) {
            _context15.next = 36;
            break;
          }

          i = _step10.value;
          cycles[i] -= 1;

          if (!(cycles[i] === 0)) {
            _context15.next = 25;
            break;
          }

          indices = indices.slice(0, i).concat(indices.slice(i + 1)).concat(indices.slice(i, i + 1));
          cycles[i] = n - i;
          _context15.next = 33;
          break;

        case 25:
          j = cycles[i];
          _ref2 = [indices[indices.length - j], indices[i]], p = _ref2[0], q = _ref2[1];
          indices[i] = p;
          indices[indices.length - j] = q;
          _context15.next = 31;
          return indices.slice(0, x).map(poolgetter);

        case 31:
          cleanExit = false;
          return _context15.abrupt("break", 36);

        case 33:
          _iteratorNormalCompletion9 = true;
          _context15.next = 17;
          break;

        case 36:
          _context15.next = 42;
          break;

        case 38:
          _context15.prev = 38;
          _context15.t0 = _context15["catch"](15);
          _didIteratorError9 = true;
          _iteratorError9 = _context15.t0;

        case 42:
          _context15.prev = 42;
          _context15.prev = 43;

          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }

        case 45:
          _context15.prev = 45;

          if (!_didIteratorError9) {
            _context15.next = 48;
            break;
          }

          throw _iteratorError9;

        case 48:
          return _context15.finish(45);

        case 49:
          return _context15.finish(42);

        case 50:
          if (!cleanExit) {
            _context15.next = 52;
            break;
          }

          return _context15.abrupt("return");

        case 52:
          _context15.next = 10;
          break;

        case 54:
        case "end":
          return _context15.stop();
      }
    }
  }, _marked14, null, [[15, 38, 42, 50], [43,, 45, 49]]);
}
/**
 * Returns an iterator that produces values over and over again.  Runs
 * indefinitely unless the times argument is specified.
 */


function repeat(thing, times) {
  var _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step11, i;

  return _regenerator["default"].wrap(function repeat$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          if (!(times === undefined)) {
            _context16.next = 7;
            break;
          }

        case 1:
          _context16.next = 3;
          return thing;

        case 3:
          _context16.next = 1;
          break;

        case 5:
          _context16.next = 33;
          break;

        case 7:
          // eslint-disable-next-line no-unused-vars
          _iteratorNormalCompletion10 = true;
          _didIteratorError10 = false;
          _iteratorError10 = undefined;
          _context16.prev = 10;
          _iterator10 = (0, _builtins.range)(times)[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion10 = (_step11 = _iterator10.next()).done) {
            _context16.next = 19;
            break;
          }

          i = _step11.value;
          _context16.next = 16;
          return thing;

        case 16:
          _iteratorNormalCompletion10 = true;
          _context16.next = 12;
          break;

        case 19:
          _context16.next = 25;
          break;

        case 21:
          _context16.prev = 21;
          _context16.t0 = _context16["catch"](10);
          _didIteratorError10 = true;
          _iteratorError10 = _context16.t0;

        case 25:
          _context16.prev = 25;
          _context16.prev = 26;

          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }

        case 28:
          _context16.prev = 28;

          if (!_didIteratorError10) {
            _context16.next = 31;
            break;
          }

          throw _iteratorError10;

        case 31:
          return _context16.finish(28);

        case 32:
          return _context16.finish(25);

        case 33:
        case "end":
          return _context16.stop();
      }
    }
  }, _marked15, null, [[10, 21, 25, 33], [26,, 28, 32]]);
}
/**
 * Returns an iterator that produces elements from the iterable as long as the
 * predicate is true.
 */


function takewhile(iterable, predicate) {
  var _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step12, value;

  return _regenerator["default"].wrap(function takewhile$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _iteratorNormalCompletion11 = true;
          _didIteratorError11 = false;
          _iteratorError11 = undefined;
          _context17.prev = 3;
          _iterator11 = iterable[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion11 = (_step12 = _iterator11.next()).done) {
            _context17.next = 14;
            break;
          }

          value = _step12.value;

          if (predicate(value)) {
            _context17.next = 9;
            break;
          }

          return _context17.abrupt("return");

        case 9:
          _context17.next = 11;
          return value;

        case 11:
          _iteratorNormalCompletion11 = true;
          _context17.next = 5;
          break;

        case 14:
          _context17.next = 20;
          break;

        case 16:
          _context17.prev = 16;
          _context17.t0 = _context17["catch"](3);
          _didIteratorError11 = true;
          _iteratorError11 = _context17.t0;

        case 20:
          _context17.prev = 20;
          _context17.prev = 21;

          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }

        case 23:
          _context17.prev = 23;

          if (!_didIteratorError11) {
            _context17.next = 26;
            break;
          }

          throw _iteratorError11;

        case 26:
          return _context17.finish(23);

        case 27:
          return _context17.finish(20);

        case 28:
        case "end":
          return _context17.stop();
      }
    }
  }, _marked16, null, [[3, 16, 20, 28], [21,, 23, 27]]);
}

function zipLongest2(xs, ys) {
  var filler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return Array.from(izipLongest2(xs, ys, filler));
}

function zipLongest3(xs, ys, zs) {
  var filler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  return Array.from(izipLongest3(xs, ys, zs, filler));
}

var izipLongest = izipLongest2;
exports.izipLongest = izipLongest;
var zipLongest = zipLongest2;
exports.zipLongest = zipLongest;

function zipMany() {
  return Array.from(izipMany.apply(void 0, arguments));
}
},{"./builtins":3,"./more-itertools":7,"./utils":8,"@babel/runtime/regenerator":2}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chunked = chunked;
exports.flatten = flatten;
exports.intersperse = intersperse;
exports.itake = itake;
exports.pairwise = pairwise;
exports.partition = partition;
exports.roundrobin = roundrobin;
exports.heads = heads;
exports.take = take;
exports.uniqueEverseen = uniqueEverseen;
exports.uniqueJustseen = uniqueJustseen;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _builtins = require("./builtins");

var _itertools = require("./itertools");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(chunked),
    _marked2 =
/*#__PURE__*/
_regenerator["default"].mark(flatten),
    _marked3 =
/*#__PURE__*/
_regenerator["default"].mark(itake),
    _marked4 =
/*#__PURE__*/
_regenerator["default"].mark(pairwise),
    _marked5 =
/*#__PURE__*/
_regenerator["default"].mark(roundrobin),
    _marked6 =
/*#__PURE__*/
_regenerator["default"].mark(heads),
    _marked7 =
/*#__PURE__*/
_regenerator["default"].mark(uniqueEverseen),
    _marked8 =
/*#__PURE__*/
_regenerator["default"].mark(uniqueJustseen);

/**
 * Break iterable into lists of length `size`:
 *
 *     [...chunked([1, 2, 3, 4, 5, 6], 3)]
 *     // [[1, 2, 3], [4, 5, 6]]
 *
 * If the length of iterable is not evenly divisible by `size`, the last returned
 * list will be shorter:
 *
 *     [...chunked([1, 2, 3, 4, 5, 6, 7, 8], 3)]
 *     // [[1, 2, 3], [4, 5, 6], [7, 8]]
 */
function chunked(iterable, size) {
  var it, r1, chunk, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return _regenerator["default"].wrap(function chunked$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          it = (0, _builtins.iter)(iterable);
          r1 = it.next();

          if (!r1.done) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return");

        case 4:
          chunk = [r1.value];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 8;
          _iterator = it[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 20;
            break;
          }

          item = _step.value;
          chunk.push(item);

          if (!(chunk.length === size)) {
            _context.next = 17;
            break;
          }

          _context.next = 16;
          return chunk;

        case 16:
          chunk = [];

        case 17:
          _iteratorNormalCompletion = true;
          _context.next = 10;
          break;

        case 20:
          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 26:
          _context.prev = 26;
          _context.prev = 27;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 29:
          _context.prev = 29;

          if (!_didIteratorError) {
            _context.next = 32;
            break;
          }

          throw _iteratorError;

        case 32:
          return _context.finish(29);

        case 33:
          return _context.finish(26);

        case 34:
          if (!(chunk.length > 0)) {
            _context.next = 37;
            break;
          }

          _context.next = 37;
          return chunk;

        case 37:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[8, 22, 26, 34], [27,, 29, 33]]);
}
/**
 * Return an iterator flattening one level of nesting in a list of lists:
 *
 *     [...flatten([[0, 1], [2, 3]])]
 *     // [0, 1, 2, 3]
 *
 */


function flatten(iterableOfIterables) {
  var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, iterable, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item;

  return _regenerator["default"].wrap(function flatten$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 3;
          _iterator2 = iterableOfIterables[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context2.next = 36;
            break;
          }

          iterable = _step2.value;
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context2.prev = 10;
          _iterator3 = iterable[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context2.next = 19;
            break;
          }

          item = _step3.value;
          _context2.next = 16;
          return item;

        case 16:
          _iteratorNormalCompletion3 = true;
          _context2.next = 12;
          break;

        case 19:
          _context2.next = 25;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](10);
          _didIteratorError3 = true;
          _iteratorError3 = _context2.t0;

        case 25:
          _context2.prev = 25;
          _context2.prev = 26;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 28:
          _context2.prev = 28;

          if (!_didIteratorError3) {
            _context2.next = 31;
            break;
          }

          throw _iteratorError3;

        case 31:
          return _context2.finish(28);

        case 32:
          return _context2.finish(25);

        case 33:
          _iteratorNormalCompletion2 = true;
          _context2.next = 5;
          break;

        case 36:
          _context2.next = 42;
          break;

        case 38:
          _context2.prev = 38;
          _context2.t1 = _context2["catch"](3);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t1;

        case 42:
          _context2.prev = 42;
          _context2.prev = 43;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 45:
          _context2.prev = 45;

          if (!_didIteratorError2) {
            _context2.next = 48;
            break;
          }

          throw _iteratorError2;

        case 48:
          return _context2.finish(45);

        case 49:
          return _context2.finish(42);

        case 50:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[3, 38, 42, 50], [10, 21, 25, 33], [26,, 28, 32], [43,, 45, 49]]);
}
/**
 * Intersperse filler element `value` among the items in `iterable`.
 *
 *     >>> [...intersperse(-1, range(1, 5))]
 *     [1, -1, 2, -1, 3, -1, 4]
 *
 */


function intersperse(value, iterable) {
  var stream = flatten((0, _itertools.izip)((0, _itertools.repeat)(value), iterable));
  take(1, stream); // eat away and discard the first value from the output

  return stream;
}
/**
 * Returns an iterable containing only the first `n` elements of the given
 * iterable.
 */


function itake(n, iterable) {
  var it, count, s;
  return _regenerator["default"].wrap(function itake$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          it = (0, _builtins.iter)(iterable);
          count = n;

        case 2:
          if (!(count-- > 0)) {
            _context3.next = 12;
            break;
          }

          s = it.next();

          if (s.done) {
            _context3.next = 9;
            break;
          }

          _context3.next = 7;
          return s.value;

        case 7:
          _context3.next = 10;
          break;

        case 9:
          return _context3.abrupt("return");

        case 10:
          _context3.next = 2;
          break;

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
/**
 * Returns an iterator of paired items, overlapping, from the original.  When
 * the input iterable has a finite number of items `n`, the outputted iterable
 * will have `n - 1` items.
 *
 *     >>> pairwise([8, 2, 0, 7])
 *     [(8, 2), (2, 0), (0, 7)]
 *
 */


function pairwise(iterable) {
  var it, r1, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, r2;

  return _regenerator["default"].wrap(function pairwise$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          it = (0, _builtins.iter)(iterable);
          r1 = it.next();

          if (!r1.done) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return");

        case 4:
          r1 = r1.value;
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context4.prev = 8;
          _iterator4 = it[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
            _context4.next = 18;
            break;
          }

          r2 = _step4.value;
          _context4.next = 14;
          return [r1, r2];

        case 14:
          r1 = r2;

        case 15:
          _iteratorNormalCompletion4 = true;
          _context4.next = 10;
          break;

        case 18:
          _context4.next = 24;
          break;

        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](8);
          _didIteratorError4 = true;
          _iteratorError4 = _context4.t0;

        case 24:
          _context4.prev = 24;
          _context4.prev = 25;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 27:
          _context4.prev = 27;

          if (!_didIteratorError4) {
            _context4.next = 30;
            break;
          }

          throw _iteratorError4;

        case 30:
          return _context4.finish(27);

        case 31:
          return _context4.finish(24);

        case 32:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[8, 20, 24, 32], [25,, 27, 31]]);
}
/**
 * Returns a 2-tuple of arrays.  Splits the elements in the input iterable into
 * either of the two arrays.  Will fully exhaust the input iterable.  The first
 * array contains all items that match the predicate, the second the rest:
 *
 *     >>> const isOdd = x => x % 2 !== 0;
 *     >>> const iterable = range(10);
 *     >>> const [odds, evens] = partition(iterable, isOdd);
 *     >>> odds
 *     [1, 3, 5, 7, 9]
 *     >>> evens
 *     [0, 2, 4, 6, 8]
 *
 */


function partition(iterable, predicate) {
  var good = [];
  var bad = [];
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = iterable[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var item = _step5.value;

      if (predicate(item)) {
        good.push(item);
      } else {
        bad.push(item);
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return [good, bad];
}
/**
 * Yields the next item from each iterable in turn, alternating between them.
 * Continues until all items are exhausted.
 *
 *     >>> [...roundrobin([1, 2, 3], [4], [5, 6, 7, 8])]
 *     [1, 4, 5, 2, 6, 3, 7, 8]
 */


function roundrobin() {
  var _len,
      iters,
      _key,
      iterables,
      index,
      it,
      result,
      _args5 = arguments;

  return _regenerator["default"].wrap(function roundrobin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          for (_len = _args5.length, iters = new Array(_len), _key = 0; _key < _len; _key++) {
            iters[_key] = _args5[_key];
          }

          // We'll only keep lazy versions of the input iterables in here that we'll
          // slowly going to exhaust.  Once an iterable is exhausted, it will be
          // removed from this list.  Once the entire list is empty, this algorithm
          // ends.
          iterables = (0, _builtins.map)(iters, _builtins.iter);

        case 2:
          if (!(iterables.length > 0)) {
            _context5.next = 18;
            break;
          }

          index = 0;

        case 4:
          if (!(index < iterables.length)) {
            _context5.next = 16;
            break;
          }

          it = iterables[index];
          result = it.next();

          if (result.done) {
            _context5.next = 13;
            break;
          }

          _context5.next = 10;
          return result.value;

        case 10:
          index++;
          _context5.next = 14;
          break;

        case 13:
          // This iterable is exhausted, make sure to remove it from the
          // list of iterables.  We'll splice the array from under our
          // feet, and NOT advancing the index counter.
          iterables.splice(index, 1); // intentional side-effect!

        case 14:
          _context5.next = 4;
          break;

        case 16:
          _context5.next = 2;
          break;

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}
/**
 * Yields the heads of all of the given iterables.  This is almost like
 * `roundrobin()`, except that the yielded outputs are grouped in to the
 * "rounds":
 *
 *     >>> [...heads([1, 2, 3], [4], [5, 6, 7, 8])]
 *     [[1, 4, 5], [2, 6], [3, 7], [8]]
 *
 * This is also different from `zipLongest()`, since the number of items in
 * each round can decrease over time, rather than being filled with a filler.
 */


function heads() {
  var _len2,
      iters,
      _key2,
      iterables,
      index,
      round,
      it,
      result,
      _args6 = arguments;

  return _regenerator["default"].wrap(function heads$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          for (_len2 = _args6.length, iters = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            iters[_key2] = _args6[_key2];
          }

          // We'll only keep lazy versions of the input iterables in here that we'll
          // slowly going to exhaust.  Once an iterable is exhausted, it will be
          // removed from this list.  Once the entire list is empty, this algorithm
          // ends.
          iterables = (0, _builtins.map)(iters, _builtins.iter);

        case 2:
          if (!(iterables.length > 0)) {
            _context6.next = 11;
            break;
          }

          index = 0;
          round = [];

          while (index < iterables.length) {
            it = iterables[index];
            result = it.next();

            if (!result.done) {
              round.push(result.value);
              index++;
            } else {
              // This iterable is exhausted, make sure to remove it from the
              // list of iterables.  We'll splice the array from under our
              // feet, and NOT advancing the index counter.
              iterables.splice(index, 1); // intentional side-effect!
            }
          }

          if (!(round.length > 0)) {
            _context6.next = 9;
            break;
          }

          _context6.next = 9;
          return round;

        case 9:
          _context6.next = 2;
          break;

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}
/**
 * Non-lazy version of itake().
 */


function take(n, iterable) {
  return Array.from(itake(n, iterable));
}
/**
 * Yield unique elements, preserving order.
 *
 *     >>> [...uniqueEverseen('AAAABBBCCDAABBB')]
 *     ['A', 'B', 'C', 'D']
 *     >>> [...uniqueEverseen('AbBCcAB', s => s.toLowerCase())]
 *     ['A', 'b', 'C']
 *
 */


function uniqueEverseen(iterable) {
  var keyFn,
      seen,
      _iteratorNormalCompletion6,
      _didIteratorError6,
      _iteratorError6,
      _iterator6,
      _step6,
      item,
      key,
      _args7 = arguments;

  return _regenerator["default"].wrap(function uniqueEverseen$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          keyFn = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : _utils.primitiveIdentity;
          seen = new Set();
          _iteratorNormalCompletion6 = true;
          _didIteratorError6 = false;
          _iteratorError6 = undefined;
          _context7.prev = 5;
          _iterator6 = iterable[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
            _context7.next = 17;
            break;
          }

          item = _step6.value;
          key = keyFn(item);

          if (seen.has(key)) {
            _context7.next = 14;
            break;
          }

          seen.add(key);
          _context7.next = 14;
          return item;

        case 14:
          _iteratorNormalCompletion6 = true;
          _context7.next = 7;
          break;

        case 17:
          _context7.next = 23;
          break;

        case 19:
          _context7.prev = 19;
          _context7.t0 = _context7["catch"](5);
          _didIteratorError6 = true;
          _iteratorError6 = _context7.t0;

        case 23:
          _context7.prev = 23;
          _context7.prev = 24;

          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }

        case 26:
          _context7.prev = 26;

          if (!_didIteratorError6) {
            _context7.next = 29;
            break;
          }

          throw _iteratorError6;

        case 29:
          return _context7.finish(26);

        case 30:
          return _context7.finish(23);

        case 31:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, null, [[5, 19, 23, 31], [24,, 26, 30]]);
}
/**
 * Yields elements in order, ignoring serial duplicates.
 *
 *     >>> [...uniqueJustseen('AAAABBBCCDAABBB')]
 *     ['A', 'B', 'C', 'D', 'A', 'B']
 *     >>> [...uniqueJustseen('AbBCcAB', s => s.toLowerCase())]
 *     ['A', 'b', 'C', 'A', 'B']
 *
 */


function uniqueJustseen(iterable) {
  var keyFn,
      last,
      _iteratorNormalCompletion7,
      _didIteratorError7,
      _iteratorError7,
      _iterator7,
      _step7,
      item,
      key,
      _args8 = arguments;

  return _regenerator["default"].wrap(function uniqueJustseen$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          keyFn = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : _utils.primitiveIdentity;
          last = undefined;
          _iteratorNormalCompletion7 = true;
          _didIteratorError7 = false;
          _iteratorError7 = undefined;
          _context8.prev = 5;
          _iterator7 = iterable[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
            _context8.next = 17;
            break;
          }

          item = _step7.value;
          key = keyFn(item);

          if (!(key !== last)) {
            _context8.next = 14;
            break;
          }

          _context8.next = 13;
          return item;

        case 13:
          last = key;

        case 14:
          _iteratorNormalCompletion7 = true;
          _context8.next = 7;
          break;

        case 17:
          _context8.next = 23;
          break;

        case 19:
          _context8.prev = 19;
          _context8.t0 = _context8["catch"](5);
          _didIteratorError7 = true;
          _iteratorError7 = _context8.t0;

        case 23:
          _context8.prev = 23;
          _context8.prev = 24;

          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }

        case 26:
          _context8.prev = 26;

          if (!_didIteratorError7) {
            _context8.next = 29;
            break;
          }

          throw _iteratorError7;

        case 29:
          return _context8.finish(26);

        case 30:
          return _context8.finish(23);

        case 31:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8, null, [[5, 19, 23, 31], [24,, 26, 30]]);
}
},{"./builtins":3,"./itertools":6,"./utils":8,"@babel/runtime/regenerator":2}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyToCmp = keyToCmp;
exports.identityPredicate = identityPredicate;
exports.numberIdentity = numberIdentity;
exports.primitiveIdentity = primitiveIdentity;

function keyToCmp(keyFn) {
  return function (a, b) {
    var ka = keyFn(a);
    var kb = keyFn(b); // istanbul ignore else

    if (typeof ka === 'boolean' && typeof kb === 'boolean') {
      return ka === kb ? 0 : !ka && kb ? -1 : 1;
    } else if (typeof ka === 'number' && typeof kb === 'number') {
      return ka - kb;
    } else if (typeof ka === 'string' && typeof kb === 'string') {
      return ka === kb ? 0 : ka < kb ? -1 : 1;
    } else {
      return -1;
    }
  };
}

function identityPredicate(x) {
  return !!x;
}

function numberIdentity(x) {
  /* istanbul ignore if */
  if (typeof x !== 'number') {
    throw new Error('Inputs must be numbers');
  }

  return x;
}

function primitiveIdentity(x) {
  /* istanbul ignore if */
  if (typeof x !== 'string' && typeof x !== 'number' && typeof x !== 'boolean') {
    throw new Error('Please provide a key function that can establish object identity');
  }

  return x;
}
},{}],9:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}]},{},[1]);
