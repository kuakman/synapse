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
 * @extends {EventEmitter}
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
		if (!defined(element)) return null;
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
	 * Generates new elements to be added into this collection.
	 * @param elements
	 * @returns {*[]}
	 * @private
	 */
	_generate(elements) {
		return _.compact(_.map(elements, this._resolveInstance, this));
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
		elements.forEach((element, idx) => {
			this.elements.splice(index + idx, 0, element);
		});
		return this;
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
	 * Fires an event for the instance of this classes
	 * @param {string} name
	 * @param {object} [options = {}]
	 * @param {*[]} [argv = []]
	 * @returns {Collection}
	 */
	fireEvent(name, options = {}, ...argv) {
		if (!defined(name)) return this;
		if (!options.silent) this.emit(name, ...argv);
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
		this.fireEvent(this.constructor.events.reset, options, ...this._resolveArgs());
		return this.push(elements, options);
	}

	/**
	 * Adds new element/s at the end of this collection
	 * @param {*|*[]} element
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	push(element, options = {}) {
		const newElements = this._generate(this._resolveElements(element));
		return this._add(newElements).fireEvent(this.constructor.events.add, options, ...this._resolveArgs(newElements, options));
	}

	/**
	 * Adds new element/s at the beginning of this collection
	 * @param {*|*[]} element
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	unshift(element, options = {}) {
		const newElements = this._generate(this._resolveElements(element));
		return this._add(newElements, 0).fireEvent(this.constructor.events.add, options, ...this._resolveArgs(newElements, options));
	}

	/**
	 * Inserts new element/s at a given index inside this collection
	 * @param {*|*[]} element
	 * @param {number} [at = this.size()]
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	insert(element, at = this.size(), options = {}) {
		const newElements = this._generate(this._resolveElements(element));
		return this._add(element, at)
			.fireEvent(this.constructor.events.add, options, ...this._resolveArgs(newElements, options));
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
		const toRemove = this._resolveElements(element);
		return this.fireEvent(this.constructor.events.remove, options, ...this._resolveArgs(toRemove, options));
	}

	/**
	 * Removes last element in this collection
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	pop(options = {}) {
		// TODO
		return this.fireEvent(this.constructor.events.remove, options, ...this._resolveArgs(options));
	}

	/**
	 * Removes first element in this collection
	 * @param {object} [options = {}]
	 * @returns {Collection}
	 */
	shift(options = {}) {
		// TODO
		return this.fireEvent(this.constructor.events.remove, options, ...this._resolveArgs(options));
	}

	/**
	 * Performs a look up and returns the first occurrence if the predicate satisfy the condition.
	 * @param {Function} [predicate]
	 * @returns {Collection}
	 */
	findBy(predicate) {
		if (!defined(predicate) && !_.isFunction(predicate)) return null;
		return this.find(predicate, this);
	}

	/**
	 * Returns true if the given predicate satisfy the contains condition, otherwise false.
	 * @param {Function} [predicate]
	 * @returns {boolean}
	 */
	containsBy(predicate) {
		if (!defined(predicate) && !_.isFunction(predicate)) return false;
		return defined(this.findBy(predicate));
	}

	/**
	 * Pluck all the properties specified as parameter, for all the elements inside this collection.
	 * @param {string[]} [propertyNames]
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
