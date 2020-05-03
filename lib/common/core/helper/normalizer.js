/**
 * @module common.core
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import { defined } from 'utils/utils';
import Collection from 'utils/adt/collection';

/**
 * Class Normalizer
 * @class Normalizer
 */
class Normalizer {

	/**
	 * Dependency Type
	 * @type {synapse.DependencyType}
	 */
	static dependencyType = {
		dependencies: 'dependencies',
		devDependencies: 'devDependencies',
		peerDependencies: 'peerDependencies'
	};

	/**
	 * Dependencies
	 * @type {Collection}
	 */
	dependencies = new Collection([
		Normalizer.dependencyType.dependencies,
		Normalizer.dependencyType.devDependencies,
		Normalizer.dependencyType.peerDependencies
	]);

	/**
	 * Returns true if the given type is a non production dependency type, false otherwise.
	 * @param {string} type
	 * @returns {boolean}
	 */
	isNonProductionDependency(type) {
		return Object.values(Normalizer.dependencyType).includes(type);
	}

	/**
	 * Normalizes non production dependencies if they are already defined as production dependency.
	 * @param {synapse.Configuration} config
	 * @param {synapse.Configuration} current
	 * @param {string} type
	 * @returns {synapse.Configuration}
	 */
	normalizeNonProductionDependencies(config, current, type) {
		return config;
	}

	/**
	 * Normalizes scripts
	 * @param {synapse.Synapse} synapse
	 * @param {synapse.Synapse} current
	 * @returns synapse.Scripts
	 */
	resolveScripts(synapse, current) {
		if (!defined(current) || !defined(current.scripts)) return synapse.scripts;
		return extend(true, synapse.scripts, current.scripts);
	}

	/**
	 * Normalizes environment configurations
	 * @param {synapse.Synapse} synapse
	 * @param {synapse.Synapse} current
	 * @returns synapse.Environments
	 */
	resolveEnvironments(synapse, current) {
		if (!defined(current) || !defined(current.environments)) return synapse.environments;
		return synapse.environments;
	}

	/**
	 * Normalizes dependencies
	 * @param {synapse.Configuration} current
	 * @param {synapse.Configuration} memo
	 * @param {string} type
	 * @returns [name: keyof DependencyType]: string[]
	 */
	resolveDependencies(current, memo, type) {
		if (!defined(current[type])) return memo;
		memo[type] = this.isNonProductionDependency(type) ?
			this.normalizeNonProductionDependencies(memo, current, type) : extend(true, memo, current[type]);
		return memo;
	}

	/**
	 * Resolves Synapse Configuration
	 * @param {synapse.Configuration} config
	 * @param {synapse.Configuration} current
	 * @returns {synapse.Synapse}
	 */
	resolveSynapse(config, current) {
		const currentSynapse = defined(config.synapse) ? config.synapse : {};
		return defined(current) ? extend(true, currentSynapse, {
			scripts: this.resolveScripts(currentSynapse, current.synapse),
			environments: this.resolveEnvironments(currentSynapse, current.synapse)
		}) : currentSynapse;
	}

	/**
	 * Normalizes a given configuration with the current configuration
	 * @param {synapse.Configuration} config
	 * @param {synapse.Configuration} current
	 * @returns {synapse.Configuration}
	 */
	merge(config, current) {
		return extend(true, config, {
			synapse: this.resolveSynapse(config, current)
		});
	}

	/**
	 * Normalize Archetype Configurations
	 * @param {synapse.Configuration[]} results
	 * @returns {synapse.Configuration}
	 */
	normalize(results) {
		return new Collection(results).reduce((config, current) => this.merge(config, current), {});
	}
}

export default new Normalizer();
