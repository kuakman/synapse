/**
 * @module common.core.domain
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';

import Core from 'common/core/domain/core';
import { warn } from 'utils/debug/debug';
import Collection from 'utils/adt/collection';
import { defined } from 'utils/utils';

/**
 * Class Environment
 * @class Environment
 */
class Environment extends Core {
	/**
	 * Environment Type
	 * @type {Collection<EnvironmentType>}
	 */
	static types = new Collection([
		'all',
		'test',
		'dev',
		'prod'
	]);

	/**
	 * @private
	 * @type {string}
	 */
	_name;

	/**
	 * @private
	 * @type {object}
	 */
	_config;

	/**
	 * @property name
	 * @returns {string}
	 */
	get name() {
		return this._name;
	}

	/**
	 * @property config
	 * @returns {object}
	 */
	get config() {
		return this._config;
	}

	/**
	 * @property defaults
	 * @returns {Partial<Environment>}
	 */
	get defaults() {
		return extend({}, super.defaults, { _name: 'all' });
	}

	/**
	 * Returns true if the given environment is supported, false otherwise
	 * @param {string} name
	 * @returns boolean
	 */
	isSupported(name) {
		const result = Environment.types.containsBy((current) => current === name);
		if (!result) warn('Environment [s%] is not supported. Skipping...', name);
		return result;
	}

	/**
	 * Default Parsing Strategy
	 * @override
	 * @param {Partial<Environment>} [attributes = {}]
	 * @return {Environment}
	 */
	parse(attributes = {}) {
		super.parse(attributes);
		return this.parseName(attributes).parseConfig(attributes, this);
	}

	/**
	 * Parses environment name
	 * @param {Partial<Environment>} [attributes = {}]
	 * @returns {Environment}
	 */
	parseName(attributes = {}) {
		const { name } = attributes;
		if (!defined(name) || this.isSupported(name)) return this;
		this._name = name;
		return this;
	}

	/**
	 * Parses environment config
	 * @param {Partial<Environment>} [attributes = {}]
	 * @param {Partial<Environment>} [environment = {}]
	 * @returns {Environment}
	 */
	parseConfig(attributes = {}, environment = {}) {
		const { queue } = attributes;
		if (!defined(queue) && !defined(environment.name)) return this;
		// FIXME: Overrides can happen if different archetypes override same properties (use namespaces)
		extend(true, this._config, attributes);
		return this;
	}
}

export default Environment;
