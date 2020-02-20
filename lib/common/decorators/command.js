/**
 * Command Decorator
 * @module common.decorators
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { Descriptors } from 'utils/utils';

/**
 * Decorates Command Class with static properties
 * @scope Class
 * @mixin
 * @param {object} [data = {}]
 * @returns {Function}
 */
export const StaticProperties = (data = {}) => {
	return (descriptor) => {
		const { elements } = descriptor;
		const keys = Object.keys(data);
		const modified = keys.map((key) => Descriptors.makeStaticField(key, data[key]));
		return { ...descriptor, elements: elements.concat(modified) };
	};
};

/**
 * Decorates Command Method with a before and after hook (Functions)
 * @scope Method
 * @mixin
 * @param {Function} [before]
 * @param {Function} [after]
 * @returns {Function}
 */
export const MethodHook = (before, after) => {
	return (target, key, descriptor) => {
		// TODO
		return descriptor;
	};
};
