/**
 * @module utils.decorators
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';

/**
 * Class Decorator Strategy
 * @param Type
 * @param target
 */
const decorateClass = (Type, target) => {
	extend(false, target, { [`${Type.name}`.toLowerCase()]: Type.new() });
};

/**
 * Field/Method Decorator Strategy
 * @param Type
 * @param target
 * @param key
 * @param descriptor
 */
const decorate = (Type, target, key, descriptor) => {
	console.log(key, descriptor);
};

/**
 * Inject Decorator
 * @scope ClassMethod
 * @param {FunctionConstructor} Type
 * @returns Function
 */
export const Inject = (Type) => {
	return (target, key, descriptor) => {
		(typeof key === 'undefined') ?
			decorateClass(Type, target) :
			decorate(Type, target, key, descriptor);
	};
};

/**
 * Injector Decorator
 * @scope Class
 * @param {Array<FunctionConstructor>} Types
 * @returns Function
 */
export const Injector = (...Types) => {
	return (target) =>
		Types.forEach((Type) => Inject(Type)(target));
};
