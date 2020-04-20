/**
 * Decorator Helpers
 * @module utils.decorators
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import * as _ from 'underscore';
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

/** Descriptor Builders **/

const buildPrototypeField = (key, value) => {
	return { ...field(value), key };
};

const buildPrototypeMethod = (key, value) => {
	return { ...method(value), key };
};

const buildStaticField = (key, value) => {
	return { ...field(value), placement: 'static', key };
};

const buildStaticMethod = (key, value) => {
	return { ...method(value), placement: 'static', key };
};

/**
 * Default strategy that adds new elements to the given descriptor
 * @param descriptor
 * @param data
 * @param strategy
 * @returns {object}
 */
export const decorateDescriptorElements = (descriptor, data, strategy) => {
	const { elements } = descriptor;
	const keys = Object.keys(data);
	return { ...descriptor, elements: elements.concat(keys.map((key) => strategy(key, data[key]))) };
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
 * Decorates Class with prototype properties
 * @example
 * TODO
 * @scope Class
 * @mixin
 * @param {object} [data = {}]
 * @param {object} [exclude = []]
 * @returns {Function}
 */
export const PrototypeProperties = (data = {}, exclude = []) => {
	const filtered = _.omit(data, ...exclude);
	return (descriptor) => decorateDescriptorElements(descriptor, filtered, buildPrototypeField);
};

/**
 * Decorates Class with prototype methods
 * @example
 * TODO
 * @scope Class
 * @mixin
 * @param {object} [data = {}]
 * @param {object} [exclude = []]
 * @returns {Function}
 */
export const PrototypeMethods = (data = {}, exclude = []) => {
	const filtered = _.omit(data, ...exclude);
	return (descriptor) => decorateDescriptorElements(descriptor, filtered, buildPrototypeMethod);
};

/**
 * Chains a list of functions to be executed before the method from a descriptor
 * @param {object} descriptor
 * @param {Function[]} functions
 * @returns {object}
 */
const chainBefore = (descriptor, functions) => {
	descriptor.value = _.compose(...[descriptor.value].concat(functions.reverse()));
	return descriptor;
};

/**
 * Chains a list of functions to be executed before the method from a descriptor
 * @param {object} descriptor
 * @param {Function[]} functions
 * @returns {object}
 */
const chainAfter = (descriptor, functions) => {
	descriptor.value = _.compose(...functions.reverse().concat([descriptor.value]));
	return descriptor;
};

/**
 * Decorates a method with a before hook function
 * @example
 * TODO
 * @see {@link https://github.com/tc39/proposal-decorators} Similar to wrap()
 * @scope Function
 * @mixin
 * @param {...Function} functions
 * @returns {Function}
 */
export const before = (...functions) => {
	return (methodDescriptor) => {
		const { kind, descriptor } = methodDescriptor;
		return { ...methodDescriptor, descriptor: kind === 'method' ? chainBefore(descriptor, functions) : descriptor };
	};
};

/**
 * Decorates a method with an after hook function
 * @example
 * TODO
 * @see {@link https://github.com/tc39/proposal-decorators} Similar to wrap()
 * @scope Prototype
 * @mixin
 * @param {...Function} functions
 * @returns {Function}
 */
export const after = (...functions) => {
	return (methodDescriptor) => {
		const { kind, descriptor } = methodDescriptor;
		return { ...methodDescriptor, descriptor: kind === 'method' ? chainAfter(descriptor, functions) : descriptor };
	};
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
