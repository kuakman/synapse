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

/**
 * Returns true if the element descriptor is of field kinda and the key matches
 * the given key passed by parameter. False otherwise.
 * @param descriptor
 * @param key
 * @returns {boolean}
 */
const isFieldBy = (descriptor, key) => isFieldKind(descriptor) && descriptor.key === key;

/**
 * Returns true if the element descriptor is kind method and the key matches
 * the given key passed by parameter. False otherwise.
 * @param descriptor
 * @param key
 * @returns {boolean|boolean}
 */
const isMethodBy = (descriptor, key) => isMethodKind(descriptor) && descriptor.key === key;

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
 * Default strategy that updates existing elements with data to a given descriptor
 * @param descriptor
 * @param data
 * @param strategy
 * @returns {object}
 */
export const decorateExistingElements = (descriptor, data, strategy) => {
	const { elements } = descriptor;
	if (!defined(elements)) return descriptor;
	return { ...descriptor, elements: elements.map((element) => strategy(element, data, descriptor)) };
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

/**
 * Collection chain interface
 * @type {object}
 */
export const _chainInterface = {
	_chain: { kind: 'field', value: false },
	chain: {
		kind: 'method',
		value: () => {
			this._chain = true;
			return this;
		}
	},
	value: {
		kind: 'method',
		value: (returned) => {
			console.log('_chain', this._chain);
			if (!this._chain) return this;
			if (defined(returned)) this._chain = false;
			return defined(returned) && Array.isArray(returned) ? new this.constructor(returned).chain() : returned;
		}
	}
};

/**
 * Chainnable Strategy to resolve element descriptors
 * @param {string} key
 * @param {object} descriptor
 * @private {object}
 */
export const _chainnableStrategy = (key, descriptor) => {
	if (isFieldKind(descriptor)) {
		return buildPrototypeField(key, descriptor.value);
	} else if (isMethodKind(descriptor)) {
		return buildPrototypeMethod(key, descriptor.value);
	}
	return null;
};

export const _chainingMethodStrategy = (element, methods) => {
	if (!isMethodKind(element) || !methods.includes(element.key)) return element;
	return buildPrototypeMethod(element.key, chainAfter(element, [function(...args) {
		return this.value(...args);
	}]));
};

/**
 * Class decorator to make methods chainnable
 * @scope Class
 * @param {object} descriptor
 * @param {string[]} methods
 * @returns {object}
 */
export const Chainnable = (descriptor, methods) => {
	if (!isClassKind(descriptor)) return descriptor;
	descriptor = decorateDescriptorElements(descriptor, _chainInterface, _chainnableStrategy);
	descriptor = decorateExistingElements(descriptor, methods, _chainingMethodStrategy);
	return descriptor;
};

/**
 * Wrap underscore method
 * @param {UnderscoreStatic} _
 * @param {string[]} methods
 * @returns {object}
 */
export const wrapUnderscoreMethods = (_, methods) => {
	return methods.reduce((memo, name) => {
		memo[name] = function(...args) { return _[name](this.elements, ...args); };
		return memo;
	}, {});
};

/**
 * Decorates class prototype with collection methods provided by underscore.
 * This decorator will try to detect if the given class being decorated has a prototype field with the name
 * of 'elements' in order use underscore utilities over an existing operand
 * @scope Class
 * @mixin
 * @param {object} descriptor
 * @param {UnderscoreStatic} _
 * @param {string[]} underscoreMethods
 * @param {string[]} collectionMethods
 * @returns {object}
 */
export const underscoreMethods = (descriptor, _, underscoreMethods, collectionMethods) => {
	const field = descriptor.elements.find((desc) => isFieldBy(desc, 'elements'));
	if (!defined(field)) return descriptor;
	descriptor = decorateDescriptorElements(descriptor, wrapUnderscoreMethods(_, underscoreMethods), buildPrototypeMethod);
	return Chainnable(descriptor, underscoreMethods.concat(collectionMethods));
};
