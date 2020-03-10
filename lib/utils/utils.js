/**
 * General Utils
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import _ from 'underscore';
import extend from 'extend';

/** Underscore Methods **/

const _methods = ['each', 'map', 'reduce', 'reduceRight', 'find', 'findIndex',
	'filter', 'some', 'every', 'reject', 'invoke', 'pluck', 'contains', 'size',
	'first', 'last', 'max', 'min', 'sortBy', 'groupBy', 'countBy',
	'shuffle', 'sample', 'partition', 'compact'];

/** Descriptor Constants **/

const Property = { configurable: true, enumerable: true, writable: true };
const PrototypeField = (value) => ({ kind: 'field', placement: 'prototype', descriptor: Property, initializer: () => value });
const PrototypeMethod = (value) => ({ kind: 'method', placement: 'prototype', descriptor: { ...Property, value } });

/** Descriptor Builders **/

const buildPrototypeMethod = (key, value) => {
	return { ...PrototypeMethod(value), key };
};

const buildStaticField = (key, value) => {
	return { ...PrototypeField(value), placement: 'static', key };
};

const buildStaticMethod = (key, value) => {
	return { ...PrototypeMethod(value), placement: 'static', key };
};

/** Descriptor Helpers **/

const isFieldOwnBy = (descriptor, key) =>
	(descriptor.kind === 'field' && descriptor.placement === 'own' && descriptor.key === key);

/** Exports **/

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
 * Decorates Class with static properties
 * @example
 * TODO
 * @scope Class
 * @mixin
 * @param {object} [data = {}]
 * @returns {Function}
 */
export const ClassProperties = (data = {}) => {
	return (descriptor) => {
		const { elements } = descriptor;
		const keys = Object.keys(data);
		const modified = keys.map((key) => buildStaticField(key, data[key]));
		return { ...descriptor, elements: elements.concat(modified) };
	};
};

/**
 * Decorates Class with static methods
 * @example
 * TODO
 * @scope Class
 * @mixin
 * @param {object} [data = {}]
 * @returns {Function}
 */
export const ClassMethods = (data = {}) => {
	return (descriptor) => {
		const { elements } = descriptor;
		const keys = Object.keys(data);
		const modified = keys.map((key) => buildStaticMethod(key, data[key]));
		return { ...descriptor, elements: elements.concat(modified) };
	};
};

/**
 * Decorates Class with prototype methods
 * @example
 * TODO
 * @scope Class
 * @mixin
 * @param {object} [data = {}]
 * @param {any[]} args
 * @returns {Function}
 */
export const PrototypeMethods = (data = {}, ...args) => {
	return (descriptor) => {
		const { elements } = descriptor;
		const keys = Object.keys(data);
		const modified = keys.map((key) => buildPrototypeMethod(key, data[key]));
		return { ...descriptor, elements: elements.concat(modified) };
	};
};

/**
 * Decorates class prototype with collection methods provided by underscore.
 * This decorator will try to detect if the given class being decorated has a prototype field with the name
 * of 'elements' in order use underscore utilities over an existing operand.
 * @scope Class
 * @mixin
 * @param {object} descriptor
 */
export const CollectionWithUnderscore = (descriptor) => {
	const field = descriptor.elements.find((desc) => isFieldOwnBy(desc, 'elements'));
	return defined(field) ? PrototypeMethods()(descriptor) : descriptor;
};
