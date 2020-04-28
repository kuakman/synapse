/**
 * @module common.core
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import { defined } from 'utils/utils';

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
	 * Resolves Synapse Configuration
	 * @param {synapse.Configuration} configuration
	 * @returns {synapse.Synapse}
	 */
	resolveSynapse(configuration) {
		return defined(configuration.synapse) ? configuration.synapse : {};
	}

	/**
	 * Normalizes scripts
	 * @param {synapse.Scripts} scripts
	 * @param {synapse.Synapse} synapse
	 * @returns synapse.Scripts
	 */
	scripts(scripts, synapse) {
		if (!defined(synapse.scripts)) return scripts;
		// console.log(synapse.scripts);
		return scripts;
	}

	/**
	 * Normalizes environment configurations
	 * @param {synapse.Environments} environments
	 * @param {synapse.Synapse} synapse
	 * @returns synapse.Environments
	 */
	environments(environments, synapse) {
		if (!defined(synapse.environments)) return environments;
		return environments;
	}

	/**
	 * Normalizes dependencies
	 * @param {string[]} [dependencies = []]
	 * @param {string} type
	 * @param {synapse.Synapse} synapse
	 * @returns string[]
	 */
	dependencies(dependencies = [], type, synapse) {
		if (!defined(synapse[type])) return dependencies;
		return dependencies;
	}

	/**
	 * Normalizes a given configuration with the current configuration
	 * @param {synapse.Configuration} config
	 * @param {synapse.Configuration} current
	 * @returns {synapse.Configuration}
	 */
	normalize(config, current) {
		const { synapse, dependencies, devDependencies, peerDependencies, ...others } = config,
			currentSynapse = this.resolveSynapse(current);
		return extend(true, defined(others) ? others : {}, {
			synapse: {
				scripts: this.scripts(synapse.scripts, currentSynapse),
				environments: this.environments(synapse.environments, currentSynapse)
			},
			dependencies: this.dependencies(dependencies, Normalizer.dependencyType.dependencies, currentSynapse),
			devDependencies: this.dependencies(devDependencies, Normalizer.dependencyType.devDependencies, currentSynapse),
			peerDependencies: this.dependencies(peerDependencies, Normalizer.dependencyType.peerDependencies, currentSynapse)
		});
	}
}

export default new Normalizer();
