/**
 * Decorator Helpers
 * @module utils.decorators
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import * as _ from 'underscore';

/** Decorator Constants **/

const property = { configurable: true, enumerable: true, writable: true };
const field = (value) => ({ kind: 'field', placement: 'prototype', descriptor: property, initializer: () => value });
const method = (value) => ({ kind: 'method', placement: 'prototype', descriptor: { ...property, value } });

/** Decorator Utilities **/

export const buildPrototypeField = (key, value) => {
	return { ...field(value), key };
};

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
 * Returns true if kind is field for a given descriptor, false otherwise.
 * @param {object} descriptor
 * @returns {boolean}
 */
export const isFieldKind = (descriptor) => {
	return descriptor.kind === 'field';
};

/**
 * Returns true if kind is method for a given descriptor, false otherwise.
 * @param {object} descriptor
 * @returns {boolean}
 */
export const isMethodKind = (descriptor) => {
	return descriptor.kind === 'method';
};

/**
 * Returns true if kind is class for a given descriptor, false otherwise
 * @param {object} descriptor
 * @returns {boolean}
 */
export const isClassKind = (descriptor) => {
	return descriptor.kind === 'class';
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
	const newElements = keys.map((key) => strategy(key, data[key]));
	return { ...descriptor, elements: elements.concat(newElements.filter(Boolean)) };
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
	return (descriptor) => isClassKind(descriptor) ?
		decorateDescriptorElements(descriptor, data, buildStaticField) : descriptor;
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
	return (descriptor) => isClassKind(descriptor) ?
		decorateDescriptorElements(descriptor, data, buildStaticMethod) : descriptor;
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
	return (descriptor) => isClassKind(descriptor) ?
		decorateDescriptorElements(descriptor, filtered, buildPrototypeField) : descriptor;
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
	return (descriptor) => isClassKind(descriptor) ?
		decorateDescriptorElements(descriptor, filtered, buildPrototypeMethod) : descriptor;
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
	return (desc) => {
		return { ...desc, descriptor: isMethodKind(desc) ? chainBefore(desc.descriptor, functions) : desc.descriptor };
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
	return (desc) => {
		return { ...desc, descriptor: isMethodKind(desc) ? chainAfter(desc.descriptor, functions) : desc.descriptor };
	};
};
