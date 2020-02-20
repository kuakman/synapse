/**
 * Collection Class
 * @module utils.adt
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import { accept, CollectionWithUnderscore, defined } from 'utils/utils';

/**
 * Class Collection
 * @mixes CollectionWithUnderscore
 */
@CollectionWithUnderscore
export default class Collection {
	static properties = ['elements', 'interface'];

	static events = {
		reset: 'utils:adt:collection:reset',
		add: 'utils:adt:collection:add',
		remove: 'utils:adt:collection:remove',
		sort: 'utils:adt:collection:remove'
	};

	constructor(options = {}) {
		extend(true, this, accept(options, this.constructor.properties, this.getDefaults())).initialize();
	}

	initialize() {
		return this;
	}

	/**
	 * Retrieves defaults
	 * @returns {object}
	 */
	getDefaults() {
		return { elements: [], interface: null };
	}

	_arguments() {
		return [];
	}

	/**
	 * Fires an event for the instance of this classes
	 * @param {string} name
	 * @param {object} [options = {}]
	 * @param {any} [argv = []]
	 * @returns {Collection}
	 */
	fireEvent(name, options = {}, ...argv) {
		if (!defined(name)) return this;
		return !options.silent ? this.trigger(name, ...argv) : this;
	}

	push(element, options) {
		// TODO
		return this.fireEvent(this.constructor.events.remove, options, ...this._arguments(this));
	}

	unshift(element, options) {
		// TODO
		return this.fireEvent(this.constructor.events.add, options, ...this._arguments(this));
	}

	insert(element, options) {
		// TODO
		return this.fireEvent(this.constructor.events.add, options, ...this._arguments(this));
	}

	remove(element, options) {
		// TODO
		return this.fireEvent(this.constructor.events.remove, options, ...this._arguments(this));
	}

	pop(options) {
		// TODO
		return this.fireEvent(this.constructor.events.remove, options, ...this._arguments(this));
	}

	shift(options) {
		// TODO
		return this.fireEvent(this.constructor.events.remove, options, ...this._arguments(this));
	}
}
