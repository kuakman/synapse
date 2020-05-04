/**
 * General Utils
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import * as _ from 'underscore';
import extend from 'extend';

/**
 * Returns true, if value is not undefined, nor null. False otherwise.
 * @param {*} value
 * @returns {boolean}
 */
export const defined = (value) => !_.isUndefined(value) && !_.isNull(value);

/**
 * Transforms properties keys to _[propName] for a given object
 * @param {object} [input = {}]
 * @returns {object}
 */
export const toPrivate = (input = {}) => {
	return Object.keys(input).reduce((memo, key) => {
		memo[`_${key}`] = input[key];
		return memo;
	}, {});
};

/**
 * Extracts only input properties filtered by a list of properties.
 * If defaults object is provided, it will be used to decorate the output.
 * @note: defaults are not filtered by the properties whitelist.
 * @param {object} [input = {}]
 * @param {string[]} [keys = []]
 * @param {object} [defaults = {}]
 * @param {object} [options = {}]
 * @returns {boolean}
 */
export const accept = (input = {}, keys = [], defaults = {}, options = {}) => {
	const out = extend(true, defaults, _.pick(input, keys));
	return options.private ? toPrivate(out) : out;
};
