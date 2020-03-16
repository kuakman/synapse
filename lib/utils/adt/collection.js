/**
 * Collection Class
 * @module utils.adt
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import _ from 'underscore';
import extend from 'extend';
import EventEmitter from 'events';
import { accept, CollectionWithUnderscore, defined } from 'utils/utils';

/**
 * Class Collection
 * @mixes CollectionWithUnderscore
 * @extends EventEmitter
 */
@CollectionWithUnderscore
export default class Collection extends EventEmitter {
	/**
	 * Constructor properties
	 * @type {string[]}
	 */
	static properties = ['interface', 'parent'];

	/**
	 * Events
	 * @static
	 * @type {object}
	 */
	static events = {
		reset: 'utils:adt:collection:reset',
		add: 'utils:adt:collection:add',
		remove: 'utils:adt:collection:remove',
		sort: 'utils:adt:collection:remove',
		shuffle: 'utils:adt:collection:shuffle'
	};

	/**
	 * Elements
	 * @type {*[]}
	 */
	elements = [];

	/**
	 * Interface
	 * @type {FunctionConstructor}
	 */
	interface = null;

	/**
	 * Parent Reference
	 * @type {*}
	 */
	parent = null;

	/**
	 * Constructor for this class
	 * @constructor
	 * @param {*|*[]} [initial]
	 * @param {object} [options = {}]
	 */
	constructor(initial = [], options = {}) {
		super();
		extend(true, this, accept(options, this.constructor.properties, this.getDefaults()));
		this.reset({ silent: true }, initial);
	}

	/**
	 * Retrieves defaults
	 * @returns {object}
	 */
	getDefaults() {
		return {};
	}

	/**
	 * Resolves element/s to be parsed
	 * @private
	 * @param {*|*[]} [element]
	 * @returns {*[]}
	 */
	_resolveElements(element) {
		if (!defined(element)) return [];
		return _.isArray(element) ? element : [element];
	}

	/**
	 * Resolves instantiating method of a given element.
	 * @private
	 * @param {*} element
	 * @returns {*}
	 */
	_resolveInstance(element) {
		return defined(this.interface) ? new this.interface(element) : element;
	}

	/**
	 * Resolves arguments to be passed to the event being dispatched
	 * @private
	 * @param {*} args
	 * @returns {*[]}
	 */
	_resolveArgs(...args) {
		return [this].concat(args);
	}

	/**
	 * Serializes a given element into json format if his interface has a 'toJSON' method.
	 * If not, the element will be return verbatim.
	 * @param {*} element
	 * @returns {object}
	 */
	_json(element) {
		return defined(element.toJSON) ? element.toJSON() : element;
	}

	/**
	 * Iterates over elements to be added/remove into/from this collection with a given predicate
	 * @param {*[]} elements
	 * @param {Function} predicate
	 * @returns {*[]}
	 * @private
	 */
	_iteratee(elements, predicate) {
		return _.compact(_.map(elements, predicate, this));
	}

	/**
	 * Default strategy to add elements into this collection.
	 * Optionally, a index can be passed to decide where to insert the new elements.
	 * If index is omitted, the elements will be added at the end.
	 * @private
	 * @param {*[]} elements
	 * @param {number} [index = this.size()]
	 */
	_add(elements, index = this.size()) {
		if (index < 0 || index > this.size()) index = this.size();
		this._iteratee(elements, (element, idx) => this.elements.splice(index + idx, 0, element));
		return this;
	}

	/**
	 * Default strategy to remove existing elements from this collection by predicate
	 * @private
	 * @param {*[]} elements
	 * @param {Function} predicate
	 * @returns {*[]}
	 */
	_remove(elements, predicate) {
		return this._iteratee(elements, (element) => {
			const index = this.findIndex(predicate.bind(this, element));
			if (index !== -1) {
				this.elements.splice(index, 1);
				return element;
			}
		});
	}

	/**
	 * Default Matcher strategy to determine equality
	 * @private
	 * @param {*} given
	 * @param {*} element
	 * @returns {boolean}
	 */
	_matcher(given, element) {
		return _.isEqual(this._json(given), this._json(element));
	}

	/**
	 * Generic strategy that resolves previous, next, isFirst and is Last element for iterations
	 * @private
	 * @param {*} element
	 * @param {number} ix
	 * @param {*[]} elements
	 * @returns {object}
	 */
	_metaIte(element, ix, elements) {
		const pIx = ix - 1, nIx = ix + 1,
			prev = pIx >= 0 && elements[pIx] ? elements[pIx] : element,
			next = nIx < elements.length && elements[nIx] ? elements[nIx] : element;
		return { prev, next, isFirst: ix === 0, isLast: ix === elements.length - 1 };
	}

	/**
	 * Fires an event for the instance of this classes
	 * @param {string} name
	 * @param {object} [options = {}]
	 * @param {*[]} [argv = []]
	 * @returns {Collection}
	 */
	_fireEvent(name, options = {}, ...argv) {
		if (!defined(name)) return this;
		if (!options.silent) this.emit(name, ...argv);
		return this;
	}

	/**
	 * Activates operation chaining.
	 * This implementation is a variation of the underscore `_.chain()` version, which
	 * will return a new collection instance with the results.
	 * @usage
	 * ```myCollection.chain().filter().map().first().value(); => <value>```
	 * ```myCollection.chain().filter().map().value() => <new collection>```
	 * @returns {Collection}
	 */
	chain() {
		// TODO: Think about implementation
		return this;
	}

	/**
	 * Reset elements within this collection and optionally, adds new element/s into it.
	 * @param {object} [options = {}]
	 * @param {*|*[]} [elements = []]
	 * @returns {Collection}
	 */
	reset(options = {}, elements = []) {
		this.elements = [];
		this._fireEvent(this.constructor.events.reset, options, ...this._resolveArgs());
		return this.push(elements, options);
	}

	/**
	 * Retrieves an element at the given index
	 * @param {number} [index = 0]
	 * @returns {*}
	 */
	at(index = 0) {
		return this.elements[index];
	}

	/**
	 * Adds new element/s at the end of this collection
	 * @param {*|*[]} element
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	push(element, options = {}) {
		const newElements = this._iteratee(this._resolveElements(element), this._resolveInstance);
		return this._add(newElements)._fireEvent(this.constructor.events.add, options, ...this._resolveArgs(newElements, options));
	}

	/**
	 * Adds new element/s at the beginning of this collection
	 * @param {*|*[]} element
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	unshift(element, options = {}) {
		const newElements = this._iteratee(this._resolveElements(element), this._resolveInstance);
		return this._add(newElements, 0)._fireEvent(this.constructor.events.add, options, ...this._resolveArgs(newElements, options));
	}

	/**
	 * Inserts new element/s at a given index inside this collection
	 * @param {*|*[]} element
	 * @param {number} [at = this.size()]
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	insert(element, at = this.size(), options = {}) {
		const newElements = this._iteratee(this._resolveElements(element), this._resolveInstance);
		return this._add(element, at)
			._fireEvent(this.constructor.events.add, options, ...this._resolveArgs(newElements, options));
	}

	/**
	 * Removes existing element/s from the collection.
	 * Optionally, you could pass your custom predicate in order to determine the condition evaluated.
	 * if not, the default matcher will be used.
	 * @param {*|*[]} element
	 * @param {object} [options = {}]
	 * @param {Function} [predicate = this._matcher]
	 * @returns {Collection}
	 */
	remove(element, options = {}, predicate = this._matcher) {
		const removed = this._remove(this._resolveElements(element), predicate);
		return this._fireEvent(this.constructor.events.remove, options, ...this._resolveArgs(removed, options));
	}

	/**
	 * Removes last element in this collection
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	pop(options = {}) {
		const removed = this._remove([this.last()], this._matcher);
		return this._fireEvent(this.constructor.events.remove, options, ...this._resolveArgs(removed, options));
	}

	/**
	 * Removes first element in this collection
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	shift(options = {}) {
		const removed = this._remove([this.first()], this._matcher);
		return this._fireEvent(this.constructor.events.remove, options, ...this._resolveArgs(removed, options));
	}

	/**
	 * Enhanced version of 'each' but providing information about prev, next, isFirst and isLast as
	 * an extra parameter to the iteratee predicate.
	 * @param {Function} predicate
	 * @return {*[]}
	 */
	eachOn(predicate) {
		return this.each(function(...args) {
			return predicate.call(this, ...args, this._metaIte(...args));
		}.bind(this));
	}

	/**
	 * Enhanced version of 'map' but it provides information about prev, next, isFirst and isLast element as
	 * an extra parameter to the iteratee predicate.
	 * @param {Function} predicate
	 * @return {*[]}
	 */
	mapOn(predicate) {
		return this.map(function(...args) {
			return predicate.call(this, ...args, this._metaIte(...args));
		}.bind(this));
	}

	/**
	 * Enhanced version of 'map' but it provides information about prev, next, isFirst and isLast element as
	 * an extra parameter to the iteratee predicate.
	 * @param {Function} predicate
	 * @param {*} initial
	 * @return {*[]}
	 */
	reduceOn(predicate, initial) {
		return this.reduce(function(memo, ...args) {
			return predicate.call(this, memo, ...args, this._metaIte(...args));
		}.bind(this), initial);
	}

	/**
	 * Returns true if the given predicate satisfy the contains condition, otherwise false.
	 * This is a variation of 'contains', to provide another way to define the equality criteria via a custom predicate.
	 * @param {Function} [predicate]
	 * @returns {boolean}
	 */
	containsBy(predicate) {
		return defined(this.find(predicate));
	}

	/**
	 * Pluck all the properties specified as parameter, for all the elements inside this collection.
	 * @param {string} [propertyNames]
	 * @returns {*[]}
	 */
	pluckAll(...propertyNames) {
		return this.map((element) => _.pick(this._json(element), ...propertyNames));
	}

	/**
	 * Serializes all the elements recursively into a json object representation.
	 * @returns {object}
	 */
	toJSON() {
		return this.map((element) => this._json(element));
	}
}
