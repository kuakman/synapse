/**
 * General Utils
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import _ from 'underscore';
import extend from 'extend';

/** Descriptor Constants **/

const Property = { configurable: true, enumerable: true, writable: true };
const PrototypeField = { kind: 'field', placement: 'prototype', descriptor: Property };
const PrototypeMethod = { kind: 'method', placement: 'prototype', descriptor: Property };
const InstanceField = { ...PrototypeField, placement: 'own' };
const InstanceMethod = { ...PrototypeMethod, placement: 'own' };
const makeStaticField = (key, value) => ({ ...PrototypeField, placement: 'static', key, initializer: () => value });
const makeStaticMethod = (key, value) => ({ ...PrototypeMethod, placement: 'static', key });

export const Descriptors = {
	Property,
	PrototypeField,
	PrototypeMethod,
	InstanceField,
	InstanceMethod,
	makeStaticField,
	makeStaticMethod
};

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
	return extend(true, _.pick(input, ...properties), defaults);
};

/**
 * Decorates class prototype with collection methods provided by underscore.
 * @scope Class
 * @mixin
 */
export const CollectionWithUnderscore = (descriptor) => {
	return descriptor;
};
