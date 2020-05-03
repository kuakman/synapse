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
	static properties = [];

	/**
	 * @constructor
	 * @param {Partial<Core>} [attributes = {}]
	 */
	constructor(attributes = {}) {
		super();
		this.parse(attributes).attachEvents();
	}

	/**
	 * @property defaults
	 * @returns {Partial<Core>}
	 */
	get defaults() {
		return {};
	}

	/**
	 * AttachEvents
	 * @returns {Core}
	 */
	attachEvents() {
		return this;
	}

	/**
	 * Default Parsing Strategy
	 * @param {Partial<Core>} [attributes = {}]
	 * @return {Core}
	 */
	parse(attributes = {}) {
		return extend(true, this, accept(attributes, this.constructor.properties, this.defaults));
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
