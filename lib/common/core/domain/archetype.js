/**
 * @module common.core.domain
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { resolve } from 'path';
import extend from 'extend';
import PromiseSeq from 'promise-sequential';

import Core from 'common/core/domain/core';
import Synapse from 'common/core/domain/synapse';

import Collection from 'utils/adt/collection';
import { defined } from 'utils/utils';
import { err } from 'utils/debug/debug';

/**
 * Class Archetype
 * @class Archetype
 */
class Archetype extends Core {
	/**
	 * Properties
	 * @type {string[]}
	 */
	static properties = Core.properties.concat(['uri', 'type', 'name']);

	/**
	 * Error & Warning messages
	 * @type {object}
	 */
	static errors = {
		configNotFound: 'Archetype configuration URI [s%] couldn\'t be found.'
	}

	/**
	 * Default archetype matcher by name against an archetype
	 * @param {string} name
	 * @param {Archetype} current
	 * @returns {boolean}
	 */
	static matcher(name, current) {
		return `${current.type}:${current.name}` === name;
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
	_uses = new Collection();

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
	 * @property uses
	 * @returns {Collection}
	 */
	get uses() {
		return this._uses;
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
	 * Retrieves name and type only
	 * @returns {Partial<Archetype>}
	 */
	get nameAndType() {
		return this.serialize(this, 'name', 'type');
	}

	/**
	 * Resolves archetype's dependent
	 * @private
	 * @param {string} dependent
	 * @returns {Partial<Archetype>}
	 */
	_resolveDependent(dependent) {
		const archetypes = this.execute('availableArchetypes');
		if (!defined(archetypes)) {} // TODO: exit with error
		const found = archetypes.find(Archetype.matcher.bind(this, dependent));
		return defined(found) ? found.nameAndType : null;
	}

	/**
	 * Resolves dependent archetype if it has. If not, archetype type and name will be used.
	 * @private
	 * @param {string} [dependent]
	 * @returns {Partial<Archetype>}
	 */
	_resolve(dependent) {
		return defined(dependent) && dependent !== '' ? this._resolveDependent(dependent) : this.nameAndType;
	}

	/**
	 * Configuration load success handler
	 * @private
	 * @param {Function} resolve
	 * @param {object} _config
	 */
	_onSuccess(resolve, _config) {
		resolve(_config);
	}

	/**
	 * Configuration load failure handler
	 * @private
	 * @param {Function} reject
	 * @param {string} archUri
	 * @param {Error} error
	 */
	_onFailure(reject, archUri, error) {
		err(Archetype.errors.configNotFound, archUri);
		reject(error);
	}

	/**
	 * Creates a a single configuration load
	 * @private
	 * @param {string} dependent
	 * @returns {Promise<Archetype>}
	 */
	async _new(dependent) {
		return new Promise((resolve, reject) => {
			const uri = this.resolveUri(dependent);
			import(uri).then(this._onSuccess.bind(this, resolve)).catch(this._onFailure.bind(this, reject, uri));
		});
	}

	/**
	 * Creates a single configuration loading promise
	 * @private
	 * @param {string} dependent
	 * @returns {Function}
	 */
	async _create(dependent) {
		return () => this._new(dependent);
	}

	/**
	 * Default URI resolver for archetype configuration file
	 * @param {string} [dependent]
	 * @returns {string}
	 */
	resolveUri(dependent) {
		const arch = this._resolve(dependent);
		if (!defined(arch)) {} // TODO: exit with error
		return resolve(`${this.uri}/${arch.type}/${arch.name}/.config.json5`);
	}

	/**
	 * Load Archetype configuration (and their extensions if exists)
	 * @returns Promise<Archetype>
	 */
	async load() {
		const results = await PromiseSeq([this._create.bind(this)]
			.concat(this.uses.chain().compact().map(this._create, this).toJSON()));
		// TODO: Parse multiple
		return this.parse();
	}

	/**
	 * Default Parsing Strategy
	 * @override
	 * @param {Partial<Archetype>} [attributes = {}]
	 * @return {Archetype}
	 */
	parse(attributes = {}) {
		super.parse(attributes);
		return this.parseUses(attributes)
			.parseSynapse(attributes)
			.parseDependencies(attributes)
			.parseDevDependencies(attributes)
			.parsePeerDependencies(attributes);
	}

	/**
	 * Parse archetype uses
	 * @param {Partial<Archetype>} [attributes = {}]
	 * @returns {Archetype}
	 */
	parseUses(attributes = {}) {
		const { uses } = attributes;
		if (!defined(uses)) return this;
		this.uses.reset({}, uses);
		return this;
	}

	/**
	 * Parse archetype synapse
	 * @param {Partial<Archetype>} [attributes = {}]
	 * @returns {Archetype}
	 */
	parseSynapse(attributes = {}) {
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
	parseDependencies(attributes = {}) {
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
	parseDevDependencies(attributes = {}) {
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
	parsePeerDependencies(attributes = {}) {
		const { peerDependencies } = attributes;
		if (!defined(peerDependencies)) return this;
		this.peerDependencies.reset({}, peerDependencies);
		return this;
	}

	/**
	 * Serializes to plain json object
	 * @override
	 * @param {string} omit...
	 * @returns {Partial<Archetype>}
	 */
	toJSON(...omit) {
		return super.serialize({
			...this,
			uses: this.uses.toJSON(),
			synapse: this.synapse.toJSON(),
			dependencies: this.dependencies.toJSON(),
			devDependencies: this.devDependencies.toJSON(),
			peerDependencies: this.peerDependencies.toJSON()
		}, ...omit);
	}
}

export default Archetype;
