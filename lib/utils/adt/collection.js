/**
 * Collection Class
 * @module utils.adt
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import * as _ from 'underscore';
import extend from 'extend';
import { EventEmitter } from 'events';
import { accept, defined } from 'utils/utils';

/**
 * Class Collection
 * @class Collection
 * @extends NodeJS.EventEmitter
 */
class Collection extends EventEmitter {
	/**
	 * Constructor properties
	 * @type {string[]}
	 */
	static properties = ['_interface', '_parent'];

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
	 * Chain flag
	 * @private
	 * @type {boolean}
	 */
	_chain = false;

	/**
	 * Chain Cache
	 * @private
	 * @type {any[]}
	 */
	_cache = null;

	/**
	 * Elements
	 * @private
	 * @type {any[]}
	 */
	_elements = [];

	/**
	 * Interface
	 * @private
	 * @type {ElementConstructor}
	 */
	_interface = null;

	/**
	 * Parent Reference
	 * @private
	 * @type {any}
	 */
	_parent = null;

	/**
	 * @property isChaining
	 * @returns {boolean}
	 */
	get isChaining() {
		return defined(this._cache) && this._chain;
	}

	/**
	 * @property elements
	 * @returns {any[]}
	 */
	get elements() {
		return this._chain ? this._cache : this._elements;
	}

	/**
	 * @property interface
	 * @returns {ElementConstructor}
	 */
	get interface() {
		return this._interface;
	}

	/**
	 * @property parent
	 * @returns {any}
	 */
	get parent() {
		return this._parent;
	}

	/**
	 * Constructor
	 * @constructor
	 * @param {any|any[]} [initial]
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
	 * @param {any|any[]} [element]
	 * @returns {any[]}
	 */
	_resolveElements(element) {
		if (!defined(element)) return [];
		return Array.isArray(element) ? element : [element];
	}

	/**
	 * Resolves instantiating method of a given element.
	 * @private
	 * @param {any} element
	 * @returns {any}
	 */
	_resolveInstance(element) {
		return defined(this.interface) ? new this.interface(element) : element;
	}

	/**
	 * Resolves arguments to be passed to the event being dispatched
	 * @private
	 * @param {any} args
	 * @returns {any[]}
	 */
	_resolveArgs(...args) {
		return [this].concat(args);
	}

	/**
	 * Serializes a given element into json format if his interface has a 'toJSON' method.
	 * If not, the element will be return verbatim.
	 * @private
	 * @param {any} element
	 * @returns {object}
	 */
	_json(element) {
		return defined(element.toJSON) ? element.toJSON() : element;
	}

	/**
	 * Iterates over elements to be added/remove into/from this collection with a given predicate
	 * @private
	 * @param {any[]} elements
	 * @param {Function} predicate
	 * @returns {any[]}
	 */
	_iteratee(elements, predicate) {
		return elements.map(predicate, this);
	}

	/**
	 * Default strategy to add elements into this collection.
	 * Optionally, a index can be passed to decide where to insert the new elements.
	 * If index is omitted, the elements will be added at the end.
	 * @private
	 * @param {any[]} elements
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
	 * @param {any[]} elements
	 * @param {Function} predicate
	 * @returns {any[]}
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
	 * @param {any} given
	 * @param {any} element
	 * @returns {boolean}
	 */
	_matcher(given, element) {
		return _.isEqual(this._json(given), this._json(element));
	}

	/**
	 * Generic strategy that resolves previous, next, isFirst and is Last element for iterations
	 * @private
	 * @param {any} element
	 * @param {number} ix
	 * @param {any[]} elements
	 * @returns {IteratorInfo<any>}
	 */
	_metaIte(element, ix, elements) {
		const pIx = ix - 1, nIx = ix + 1,
			prev = pIx >= 0 && elements[pIx] ? elements[pIx] : element,
			next = nIx < elements.length && elements[nIx] ? elements[nIx] : element;
		return { prev, next, isFirst: (ix === 0), isLast: (ix === elements.length - 1) };
	}

	/**
	 * Fires an event for the instance of this classes
	 * @private
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
	 * Reset elements within this collection and optionally, adds new element/s into it.
	 * @unchain
	 * @param {object} [options = {}]
	 * @param {*|*[]} [elements = []]
	 * @returns {Collection}
	 */
	reset(options = {}, elements = []) {
		this._chainRelease(null);
		this._elements = [];
		this._fireEvent(this.constructor.events.reset, options, ...this._resolveArgs());
		return this.push(elements, options);
	}

	/**
	 * Adds new element/s at the end of this collection
	 * @unchain
	 * @param {*|*[]} element
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	push(element, options = {}) {
		this._chainRelease(null);
		const newElements = this._iteratee(this._resolveElements(element), this._resolveInstance);
		return this._add(newElements)._fireEvent(this.constructor.events.add, options, ...this._resolveArgs(newElements, options));
	}

	/**
	 * Adds new element/s at the beginning of this collection
	 * @unchain
	 * @param {*|*[]} element
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	unshift(element, options = {}) {
		this._chainRelease(null);
		const newElements = this._iteratee(this._resolveElements(element), this._resolveInstance);
		return this._add(newElements, 0)._fireEvent(this.constructor.events.add, options, ...this._resolveArgs(newElements, options));
	}

	/**
	 * Inserts new element/s at a given index inside this collection
	 * @unchain
	 * @param {*|*[]} element
	 * @param {number} [at = this.size()]
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	insert(element, at = this.size(), options = {}) {
		this._chainRelease(null);
		const newElements = this._iteratee(this._resolveElements(element), this._resolveInstance);
		return this._add(element, at)
			._fireEvent(this.constructor.events.add, options, ...this._resolveArgs(newElements, options));
	}

	/**
	 * Removes existing element/s from the collection.
	 * Optionally, you could pass your custom predicate in order to determine the condition evaluated.
	 * if not, the default matcher will be used.
	 * @unchain
	 * @param {*|*[]} element
	 * @param {object} [options = {}]
	 * @param {Function} [predicate = this._matcher]
	 * @returns {Collection}
	 */
	remove(element, options = {}, predicate = this._matcher) {
		this._chainRelease(null);
		const removed = this._remove(this._resolveElements(element), predicate);
		return this._fireEvent(this.constructor.events.remove, options, ...this._resolveArgs(removed, options));
	}

	/**
	 * Removes last element in this collection
	 * @unchain
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	pop(options = {}) {
		this._chainRelease(null);
		const removed = this._remove([this.last()], this._matcher);
		return this._fireEvent(this.constructor.events.remove, options, ...this._resolveArgs(removed, options));
	}

	/**
	 * Removes first element in this collection
	 * @unchain
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	shift(options = {}) {
		this._chainRelease(null);
		const removed = this._remove([this.first()], this._matcher);
		return this._fireEvent(this.constructor.events.remove, options, ...this._resolveArgs(removed, options));
	}

	/**
	 * Enhanced version of 'each' but providing information about prev, next, isFirst and isLast as
	 * an extra parameter to the iteratee predicate.
	 * @chain
	 * @param {_.ListIterator} predicate
	 * @param {any} [context]
	 * @return {any[]}
	 */
	eachOn(predicate, context) {
		return this.each(function(...args) { return predicate.call(context, ...args, this._metaIte(...args)); }, this);
	}

	/**
	 * Enhanced version of 'map' but it provides information about prev, next, isFirst and isLast element as
	 * an extra parameter to the iteratee predicate.
	 * @chain
	 * @param {_.ListIterator} predicate
	 * @param {any} [context]
	 * @return {any[]}
	 */
	mapOn(predicate, context) {
		return this.map(function(...args) { return predicate.call(context, ...args, this._metaIte(...args)); }, this);
	}

	/**
	 * Enhanced version of 'map' but it provides information about prev, next, isFirst and isLast element as
	 * an extra parameter to the iteratee predicate.
	 * @param {_.MemoIterator<any, any>} iterator
	 * @param {any} memo
	 * @param {any} [context]
	 * @return {any}
	 */
	reduceOn(iterator, memo, context) {
		return this.reduce(function(memo, ...args) {
			return iterator.call(context, memo, ...args, this._metaIte(...args));
		}, memo, this);
	}

	/**
	 * Returns true if the given predicate satisfy the contains condition, otherwise false.
	 * This is a variation of 'contains', to provide another way to define the equality criteria via a custom predicate.
	 * @unchain
	 * @param {_.ListIterator<any, boolean>} predicate
	 * @returns {boolean}
	 */
	containsBy(predicate) {
		return defined(this.find(predicate, this));
	}

	/**
	 * Returns true if all elements passed as arguments are contained in this collection, otherwise false.
	 * This method uses the internal matcher strategy for comparison, if it's not provided.
	 * @unchain
	 * @param {any[]} [list]
	 * @param {Function} [matcher = this._matcher]
	 * @returns boolean
	 */
	containsAll(list, matcher = this._matcher) {
		const filtered = this.filter((element) => list.find((e) => matcher.call(this, element, e)));
		return this._chainRelease(filtered.length === list.length);
	}

	/**
	 * Pluck all the properties specified as parameter, for all the elements inside this collection.
	 * @chain
	 * @param {string} [propertyNames]
	 * @returns {any[]}
	 */
	pluckAll(...propertyNames) {
		return this._chainResult(this._iteratee(this.elements, (element) => Object.keys(element).reduce((memo, name) =>
			extend(memo, propertyNames.includes(name) ? { [name]: element[name] } : {}), {})));
	}

	/**
	 * Retrieves an element at the given index
	 * @unchain
	 * @param {number} [index = 0]
	 * @returns {any}
	 */
	at(index = 0) {
		return this._chainRelease(this.elements[index]);
	}

	/**
	 * Serializes all the elements recursively into a json object representation.
	 * @unchain
	 * @returns {object}
	 */
	toJSON() {
		return this._chainRelease(this.elements.map((element) => this._json(element)));
	}

	/** Underscore Binding **/

	/**
	 * Chain results if chaining is active and if result is suitable for chaning.
	 * @private
	 * @param {any} [result]
	 * @returns {Collection|any}
	 */
	_chainResult(result) {
		if (this.isChaining && defined(result) && _.isArray(result)) {
			this._cache = result;
			return this;
		}
		return this._chainRelease(result);
	}

	/**
	 * Releases chaining and returns the result.
	 * @private
	 * @param {any | undefined} [result]
	 * @returns {any | undefined}
	 */
	_chainRelease(result) {
		this._chain = false;
		this._cache = null;
		return result;
	}

	/**
	 * Activates chaining
	 * @returns {Collection}
	 */
	chain() {
		this._chain = true;
		this._cache = _.clone(this._elements);
		return this;
	}

	/**
	 * @see {@link https://underscorejs.org/#each}
	 * @chain
	 * @param {_.ListIterator<any, void>} iterator
	 * @param {any} [context]
	 * @returns {Collection|any}
	 */
	each(iterator, context) {
		return this._chainResult(_.each(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#map}
	 * @chain
	 * @param {_.ListIterator<any, any>} iterator
	 * @param {any} [context]
	 * @returns {Collection|any}
	 */
	map(iterator, context) {
		return this._chainResult(_.map(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#reduce}
	 * @chain
	 * @param {_.MemoIterator<any, any>} iterator
	 * @param {any} memo
	 * @param {any} [context]
	 * @returns {Collection|any}
	 */
	reduce(iterator, memo, context) {
		return this._chainResult(_.reduce(this.elements, iterator, memo, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#reduceRight}
	 * @chain
	 * @param {_.MemoIterator<any, any>} iterator
	 * @param {any} memo
	 * @param {any} [context]
	 * @returns {Collection|any}
	 */
	reduceRight(iterator, memo, context) {
		return this._chainResult(_.reduceRight(this.elements, iterator, memo, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#find}
	 * @unchain
	 * @param {_.ListIterator<any, boolean>} iterator
	 * @param {any} [context]
	 * @returns {any | undefined}
	 */
	find(iterator, context) {
		return this._chainRelease(_.find(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#findIndex}
	 * @unchain
	 * @param {_.ListIterator<any, number>} predicate
	 * @param {any} [context]
	 * @returns {number}
	 */
	findIndex(predicate, context) {
		return this._chainRelease(_.findIndex(this.elements, predicate, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#findLastIndex}
	 * @unchain
	 * @param {_.ListIterator<any, number>} predicate
	 * @param {any} [context]
	 * @returns {number}
	 */
	findLastIndex(predicate, context) {
		return this._chainRelease(_.findLastIndex(this.elements, predicate, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#filter}
	 * @chain
	 * @param {_.ListIterator<any, boolean>} iterator
	 * @param {any} [context]
	 * @returns {Collection|any[]}
	 */
	filter(iterator, context) {
		return this._chainResult(_.filter(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#reject}
	 * @chain
	 * @param {_.ListIterator<any, boolean>} iterator
	 * @param {any} [context]
	 * @returns {Collection|any[]}
	 */
	reject(iterator, context) {
		return this._chainResult(_.reject(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#every}
	 * @unchain
	 * @param {_.ListIterator<any, boolean>} iterator
	 * @param {any} [context]
	 * @returns {boolean}
	 */
	every(iterator, context) {
		return this._chainRelease(_.every(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#some}
	 * @unchain
	 * @param {_.ListIterator<any, boolean>} iterator
	 * @param {any} [context]
	 * @returns {boolean}
	 */
	some(iterator, context) {
		return this._chainRelease(_.some(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#contains}
	 * @unchain
	 * @param {any} value
	 * @param {number} [fromIndex = 0]
	 * @returns {boolean}
	 */
	contains(value, fromIndex = 0) {
		return this._chainRelease(_.contains(this.elements, value, fromIndex));
	}

	/**
	 * @see {@link https://underscorejs.org/#invoke}
	 * @chain
	 * @param {string} methodName
	 * @param {any} [args]
	 * @returns {any}
	 */
	invoke(methodName, ...args) {
		return this._chainResult(_.invoke(this.elements, methodName, ...args));
	}

	/**
	 * @see {@link https://underscorejs.org/#pluck}
	 * @chain
	 * @param {string} propertyName
	 * @returns {string[]}
	 */
	pluck(propertyName) {
		return this._chainResult(_.pluck(this.elements, propertyName));
	}

	/**
	 * @see {@link https://underscorejs.org/#max}
	 * @unchain
	 * @param {_.ListIterator<any, any>} iterator
	 * @param {any} [context]
	 * @returns {any}
	 */
	max(iterator, context) {
		return this._chainRelease(_.max(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#min}
	 * @unchain
	 * @param {_.ListIterator<any, any>} iterator
	 * @param {any} [context]
	 * @returns {any}
	 */
	min(iterator, context) {
		return this._chainRelease(_.min(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#groupBy}
	 * @unchain
	 * @param {_.ListIterator<any, any>} iterator
	 * @param {any} [context]
	 * @returns {_.Dictionary<any[]>}
	 */
	groupBy(iterator, context) {
		return this._chainRelease(_.groupBy(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#countBy}
	 * @unchain
	 * @param {_.ListIterator<any, any>} iterator
	 * @param {any} [context]
	 * @returns {_.Dictionary<number>}
	 */
	countBy(iterator, context) {
		return this._chainRelease(_.countBy(this.elements, iterator, context));
	}

	/**
	 * @see {@link https://underscorejs.org/#sample}
	 * @unchain
	 * @param {number} n
	 * @returns {any}
	 */
	sample(n) {
		return this._chainResult(_.sample(this.elements, n));
	}

	/**
	 * @see {@link https://underscorejs.org/#size}
	 * @unchain
	 * @returns {number}
	 */
	size() {
		return this._chainResult(_.size(this.elements));
	}

	/**
	 * @see {@link https://underscorejs.org/#partition}
	 * @unchain
	 * @param {_.ListIterator<any, boolean>} iterator
	 * @returns {any[][]}
	 */
	partition(iterator) {
		return this._chainRelease(_.partition(this.elements, iterator));
	}

	/**
	 * @see {@link https://underscorejs.org/#first}
	 * @unchain
	 * @returns {any}
	 */
	first() {
		return this._chainRelease(_.first(this.elements));
	}

	/**
	 * @see {@link https://underscorejs.org/#last}
	 * @unchain
	 * @returns {any}
	 */
	last() {
		return this._chainRelease(_.last(this.elements));
	}

	/**
	 * @see {@link https://underscorejs.org/#compact}
	 * @chain
	 * @returns {Collection|any[]}
	 */
	compact() {
		return this._chainResult(_.compact(this.elements));
	}

	/**
	 * Sorts the collection with a given comparable iterator and an optional context
	 * This method releases chaining
	 * @see {@link https://underscorejs.org/#sortBy}
	 * @unchain
	 * @param {_.ListIterator<any, boolean>} iterator
	 * @param {any} [context]
	 * @returns {Collection}
	 */
	sortBy(iterator, context) {
		this._elements = _.sortBy(this.elements, iterator, context);
		return this._chainRelease(this);
	}

	/**
	 * Shuffles elements randomly inside this collection
	 * Similar to {@link https://underscorejs.org/#shuffle} but this method takes an optional parameter
	 * when the element in the collection is a complex object and not a number.
	 * This method releases chaining
	 * @see {@link https://underscorejs.org/#shuffle}
	 * @unchain
	 * @param {string} [propertyName]
	 * @returns {Collection}
	 */
	shuffle(propertyName) {
		this._elements = _.shuffle(this.elements);
		return this._chainRelease(this);
	}
}

export default Collection;
