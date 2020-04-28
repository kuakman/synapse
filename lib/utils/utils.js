/**
 * General Utils
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import * as _ from 'underscore';
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
 * Equality operator between 2 objects
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
export const isEqual = (a, b) => {
	return _.isEqual(a, b);
};

/**
 * Underscore Collection Methods
 * @type {string[]}
 */
export const _underscoreMethods = ['each', 'map', 'reduce', 'reduceRight', 'find', 'findIndex',
	'filter', 'some', 'every', 'reject', 'invoke', 'pluck', 'contains', 'size',
	'first', 'last', 'max', 'min', 'sortBy', 'groupBy', 'countBy',
	'shuffle', 'sample', 'partition', 'compact'];

/**
 * Collection Methods
 * @type {string[]}
 */
export const _collectionMethods = ['reset', 'at', 'push', 'unshift', 'insert',
	'remove', 'pop', 'shift', 'eachOn', 'mapOn', 'reduceOn', 'pluckAll'];

/**
 * Decorates Class with Underscore methods suitable for collection classes.
 * @param {object} descriptor
 * @returns {object}
 */
export const CollectionWithUnderscore = (descriptor) => {
	return underscoreMethods(descriptor, _, _underscoreMethods, _collectionMethods);
};
