/**
 * @module common.core
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import EventEmitter from 'events';
import * as _ from 'underscore';
import extend from 'extend';

import { accept, defined } from 'utils/utils';

/**
 * Class Core
 * @class Core
 * @mixes EventEmitter
 */
class Core extends EventEmitter {
	/**
	 * Properties
	 * @type {string[]}
	 */
	static properties = ['parent'];

	/**
	 * @private
	 * @type {Core}
	 */
	_parent;

	/**
	 * @constructor
	 * @param {Partial<Core>} [attributes = {}]
	 */
	constructor(attributes = {}) {
		super();
		this.parse(attributes).attachEvents();
	}

	/**
	 * @property parent
	 * @returns {Core}
	 */
	get parent() {
		return this._parent;
	}

	/**
	 * @property defaults
	 * @returns {Partial<Core>}
	 */
	get defaults() {
		return {};
	}

	/**
	 * Default chain of responsibility strategy to walk to his successor
	 * @private
	 * @param {string} actionName
	 * @param {any} args...
	 * @returns {any}
	 */
	_next(actionName, ...args) {
		return defined(this.parent) ? this.parent.execute(actionName, ...args) : null;
	}

	/**
	 * Determines how to consume results for a given action.
	 * if the action is a function, will execute passing the optional arguments and return the result.
	 * If the action is a property, the property will be returned as-is.
	 * @private
	 * @param {Function|any} action
	 * @param {any} args...
	 * @returns {any}
	 */
	_result(action, ...args) {
		return _.isFunction(action) ? action.apply(this, ...args) : action;
	}

	/**
	 * AttachEvents
	 * @returns {Core}
	 */
	attachEvents() {
		return this;
	}

	/**
	 * Executes request of a given method/property with optional parameters along the successor's chain
	 * until the request gets satisfied. If the method/prop is not found anywhere, the execution will return null.
	 * Design Pattern: Chain of Responsibility
	 * @param {string} actionName
	 * @param {any} args...
	 * @returns {any}
	 */
	execute(actionName, ...args) {
		if (actionName === '' || actionName === 'execute' || actionName === '_next') return null;
		if (defined(this[actionName])) return this._result(this[actionName], ...args);
		return this._next(actionName, ...args);
	}

	/**
	 * Default Parsing Strategy
	 * @param {Partial<Core>} [attributes = {}]
	 * @return {Core}
	 */
	parse(attributes = {}) {
		return extend(true, this, accept(attributes, this.constructor.properties, this.defaults, { private: true }));
	}

	/**
	 * Serializes to plain json object
	 * @param {any} instance
	 * @param {string} omit...
	 * @returns {Partial<Core>}
	 */
	serialize(instance, ...omit) {
		return _.omit(defined(instance) ? instance : this, ...omit);
	}
}

export default Core;
