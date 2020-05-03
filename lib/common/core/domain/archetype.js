/**
 * @module common.core.domain
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { resolve } from 'path';
import extend from 'extend';

import Core from 'common/core/domain/core';
import Synapse from 'common/core/domain/synapse';

import Collection from 'utils/adt/collection';
import { defined } from 'utils/utils';

/**
 * Class Archetype
 * @class Archetype
 */
class Archetype extends Core {
	/**
	 * Properties
	 * @type {string[]}
	 */
	static properties = Core.properties.concat(['uri', 'type', 'name', 'synapse']);

	/**
	 * Warning Messages
	 * @type {object}
	 */
	static warnings = {
		dependency: 'Archetype [s%] with dependency [s%] couldn\'t be found. Skipping...'
	}

	/**
	 * Default archetype matcher
	 * @param {Archetype} given
	 * @param {Archetype} current
	 * @returns {boolean}
	 */
	static matcher(given, current) {
		return `${current.type}:${current.name}` === given.name;
	}

	/**
	 * @private
	 * @type {string}
	 */
	_uri;

	/**
	 * @private
	 * @type {string}
	 */
	_type;

	/**
	 * @private
	 * @type {string}
	 */
	_name;

	/**
	 * @private
	 * @type {Collection}
	 */
	_extend = new Collection();

	/**
	 * @private
	 * @type {Synapse}
	 */
	_synapse = new Synapse();

	/**
	 * @private
	 * @type {Collection}
	 */
	_dependencies = new Collection();

	/**
	 * @private
	 * @type {Collection}
	 */
	_devDependencies = new Collection();

	/**
	 * @private
	 * @type {Collection}
	 */
	_peerDependencies = new Collection();

	/**
	 * @override
	 * @property defaults
	 * @returns {Partial<Archetype>}
	 */
	get defaults() {
		return extend({}, super.defaults, { name: 'unknown', type: 'unknown' });
	}

	/**
	 * @property uri
	 * @returns {string}
	 */
	get uri() {
		return this._uri;
	}

	/**
	 * @property type
	 * @returns {string}
	 */
	get type() {
		return this._type;
	}

	/**
	 * @property name
	 * @returns {string}
	 */
	get name() {
		return this._name;
	}

	/**
	 * @property extend
	 * @returns {Collection}
	 */
	get extend() {
		return this._extend;
	}

	/**
	 * @property synapse
	 * @returns {Synapse}
	 */
	get synapse() {
		return this._synapse;
	}

	/**
	 * @property dependencies
	 * @returns {Collection}
	 */
	get dependencies() {
		return this._dependencies;
	}

	/**
	 * @property devDependencies
	 * @returns {Collection}
	 */
	get devDependencies() {
		return this._devDependencies;
	}

	/**
	 * @property peerDependencies
	 * @returns {Collection}
	 */
	get peerDependencies() {
		return this._peerDependencies;
	}

	/**
	 * Resolve URI of the archetype configuration file
	 * @returns {string}
	 */
	resolveUri() {
		return resolve(`${this.uri}/${this.type}/${this.name}/.config.json5`);
	}

	/**
	 * Load Archetype config
	 * @returns Promise<Archetype>
	 */
	async load() {
		return this.parse(await import(this.resolveUri()));
	}

	/**
	 * Default Parsing Strategy
	 * @override
	 * @param {Partial<Archetype>} [attributes = {}]
	 * @return {Archetype}
	 */
	parse(attributes = {}) {
		return extend(super.parse(attributes), {
			extend: this.parseExtend(attributes),
			synapse: this.parseSynapse(attributes),
			dependencies: this.parseDependencies(attributes),
			devDependencies: this.parseDevDependencies(attributes),
			peerDependencies: this.parsePeerDependencies(attributes)
		});
	}

	/**
	 * Parse archetype extend
	 * @param {Partial<Archetype>} [attributes = {}]
	 * @returns {Archetype}
	 */
	parseExtend(attributes) {
		const { extend } = attributes;
		if (!defined(extend)) return this;
		this.extend.reset({}, extend);
		return this;
	}

	/**
	 * Parse archetype synapse
	 * @param {Partial<Archetype>} [attributes = {}]
	 * @returns {Archetype}
	 */
	parseSynapse(attributes) {
		const { synapse } = attributes;
		if (!defined(synapse)) return this;
		this.synapse.parse(synapse);
		return this;
	}

	/**
	 * Parse archetype dependencies
	 * @param {Partial<Archetype>} [attributes = {}]
	 * @returns {Archetype}
	 */
	parseDependencies(attributes) {
		const { dependencies } = attributes;
		if (!defined(dependencies)) return this;
		this.dependencies.reset({}, dependencies);
		return this;
	}

	/**
	 * Parse archetype dev dependencies
	 * @param {Partial<Archetype>} [attributes = {}]
	 * @returns {Archetype}
	 */
	parseDevDependencies(attributes) {
		const { devDependencies } = attributes;
		if (!defined(devDependencies)) return this;
		this.devDependencies.reset({}, devDependencies);
		return this;
	}

	/**
	 * Parse archetype peer dependencies
	 * @param {Partial<Archetype>} [attributes = {}]
	 * @returns {Archetype}
	 */
	parsePeerDependencies(attributes) {
		const { peerDependencies } = attributes;
		if (!defined(peerDependencies)) return this;
		this.peerDependencies.reset({}, peerDependencies);
		return this;
	}

	/**
	 * Serializes to plain json object
	 * @override
	 * @param {string} omit...
	 * @returns {Partial<synapse.Configuration>}
	 */
	toJSON(...omit) {
		return super.serialize({
			...this,
			extend: this.extend.toJSON(),
			synapse: this.synapse.toJSON(),
			dependencies: this.dependencies.toJSON(),
			devDependencies: this.devDependencies.toJSON(),
			peerDependencies: this.peerDependencies.toJSON()
		}, ...omit);
	}
}

export default Archetype;
