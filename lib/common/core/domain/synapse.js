/**
 * @module common.core.domain
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';

import Core from 'common/core/domain/core';
import Script from 'common/core/domain/script';
import Environment from 'common/core/domain/environment';

import Collection from 'utils/adt/collection';
import { defined } from 'utils/utils';

/**
 * Class Synapse
 * @class Synapse
 */
class Synapse extends Core {
	/**
	 * Properties
	 * @type {string[]}
	 */
	static properties = Core.properties.concat(['source', 'target']);

	/**
	 * @private
	 * @type {string}
	 */
	_source;

	/**
	 * @private
	 * @type {string}
	 */
	_target;

	/**
	 * @private
	 * @type {Collection<Environment>}
	 */
	_environments = new Collection([], { _interface: Environment });

	/**
	 * @private
	 * @type {Collection<Script>}
	 */
	_scripts = new Collection([], { _interface: Script });

	/**
	 * @property source
	 * @returns {string}
	 */
	get source() {
		return this._source;
	}

	/**
	 * @property target
	 * @returns {string}
	 */
	get target() {
		return this._target;
	}

	/**
	 * @property scripts
	 * @returns {Collection<Script>}
	 */
	get scripts() {
		return this._scripts;
	}

	/**
	 * @property environments
	 * @returns {Collection<Environment>}
	 */
	get environments() {
		return this._environments;
	}

	/**
	 * @override
	 * @property defaults
	 * @returns {Partial<Archetype>}
	 */
	get defaults() {
		return extend({}, super.defaults, { source: './src', target: './target' });
	}

	/**
	 * Default Parsing Strategy
	 * @override
	 * @param {Partial<Synapse>} [attributes = {}]
	 * @return {Synapse}
	 */
	parse(attributes = {}) {
		super.parse(attributes);
		return this.parseScripts(attributes)
			.parseEnvironments(attributes);
	}

	/**
	 * Parses synapse scripts
	 * @param {Partial<Synapse>} [attributes = {}]
	 * @returns {Synapse}
	 */
	parseScripts(attributes = {}) {
		const { scripts } = attributes;
		if (!defined(scripts)) return this;
		this.scripts.reset({}, scripts);
		return this;
	}

	/**
	 * Parses synapse environments
	 * @param {Partial<Synapse>} [attributes = {}]
	 * @returns {Synapse}
	 */
	parseEnvironments(attributes = {}) {
		const { environments } = attributes;
		if (!defined(environments)) return this;
		this.environments.reset({}, environments);
		return this;
	}
}

export default Synapse;
