/**
 * Decorator Helpers
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */

import { defined } from 'utils/utils';

/** Decorator Constants **/

const property = { configurable: true, enumerable: true, writable: true };
const field = (value) => ({ kind: 'field', placement: 'prototype', descriptor: property, initializer: () => value });
const method = (value) => ({ kind: 'method', placement: 'prototype', descriptor: { ...property, value } });

/** Decorator Utilities **/

/**
 * Returns true if the element descriptor is of kinda field, own property scope and the key matches
 * the given key passed by parameter. False otherwise.
 * @param descriptor
 * @param key
 * @returns {boolean}
 */
const isFieldOwnBy = (descriptor, key) =>
	(descriptor.kind === 'field' && descriptor.placement === 'own' && descriptor.key === key);

/**
 * Default strategy that adds new elements to the given descriptor
 * @param descriptor
 * @param data
 * @param strategy
 * @returns {object}
 */
const decorateDescriptorElements = (descriptor, data, strategy) => {
	const { elements } = descriptor;
	const keys = Object.keys(data);
	return { ...descriptor, elements: elements.concat(keys.map((key) => strategy(key, data[key]))) };
};

/** Descriptor Builders **/

export const buildPrototypeMethod = (key, value) => {
	return { ...method(value), key };
};

export const buildStaticField = (key, value) => {
	return { ...field(value), placement: 'static', key };
};

export const buildStaticMethod = (key, value) => {
	return { ...method(value), placement: 'static', key };
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
	return (descriptor) => decorateDescriptorElements(descriptor, data, buildStaticField);
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
	return (descriptor) => decorateDescriptorElements(descriptor, data, buildStaticMethod);
};

/**
 * Decorates Class with prototype methods
 * @example
 * TODO
 * @scope Class
 * @mixin
 * @param {object} [data = {}]
 * @returns {Function}
 */
export const PrototypeMethods = (data = {}) => {
	return (descriptor) => decorateDescriptorElements(descriptor, data, buildPrototypeMethod);
};

/**
 * Decorates class prototype with collection methods provided by underscore.
 * This decorator will try to detect if the given class being decorated has a prototype field with the name
 * of 'elements' in order use underscore utilities over an existing operand
 * @scope Class
 * @mixin
 * @param {object} descriptor
 * @param {object} data
 * @returns {object}
 */
export const underscoreMethods = (descriptor, data) => {
	const field = descriptor.elements.find((desc) => isFieldOwnBy(desc, 'elements'));
	return defined(field) ? decorateDescriptorElements(descriptor, data, buildPrototypeMethod) : descriptor;
};
