/**
 * General Utils
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import _ from 'underscore';
import extend from 'extend';
import { underscoreMethods } from 'utils/decorators/helpers';

/**
 * Returns true, if value is not undefined, nor null. False otherwise.
 * @param {*} value
 * @returns {boolean}
 */
export const defined = (value) => !_.isUndefined(value) && !_.isNull(value);

/**
 * Extracts only input properties filtered by a list of properties.
 * If defaults object is provided, it will be used to decorate the output.
 * @note: defaults are not filtered by the properties whitelist.
 * @param {object} [input = {}]
 * @param {string[]} [properties = []]
 * @param {object} [defaults = {}]
 * @returns {boolean}
 */
export const accept = (input = {}, properties = [], defaults = {}) => {
	return extend(true, defaults, _.pick(input, ...properties));
};

/**
 * Underscore Collection Methods
 * @type {object}
 */
export const _underscoreMethods = ['each', 'map', 'reduce', 'reduceRight', 'find', 'findIndex',
	'filter', 'some', 'every', 'reject', 'invoke', 'pluck', 'contains', 'size',
	'first', 'last', 'max', 'min', 'sortBy', 'groupBy', 'countBy',
	'shuffle', 'sample', 'partition', 'compact'].reduce((memo, name) => {
	memo[name] = function(...args) { return _[name](this.elements, ...args); };
	return memo;
}, {});

/**
 * Decorates Class with Underscore methods suitable for collection classes.
 * @param descriptor
 * @returns {object}
 */
export const CollectionWithUnderscore = (descriptor) => {
	return underscoreMethods(descriptor, _underscoreMethods);
};
