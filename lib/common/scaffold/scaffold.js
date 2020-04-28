/*
 * @module common.scaffold
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import PromiseSeq from 'promise-sequential';
import CoreInstance, { Core } from 'common/core/core';
import ArchetypeHelper from 'common/core/archetype';
import Collection from 'utils/adt/collection';
import { before } from 'utils/decorators/helpers';
import { dev } from 'utils/debug/debug';

/**
 * Catch Error Handler
 * @param {*|Error} result
 * @returns {*|void}
 */
const catchError = function(result) {
	if (result instanceof Error) CoreInstance.onError(result, process, { code: 1 });
	return result;
};

/**
 * Scaffold Functions
 * @class Scaffold
 */
export class Scaffold extends Core {
	/**
	 * Scaffold Workflow
	 * @type {Collection}
	 */
	get workflows() {
		return new Collection([
			this.initialize,
			this.buildConfigurations,
			this.buildScripts,
			this.buildRealtime,
			this.mergeConfig,
			this.write,
			this.install,
			this.create]);
	}

	/**
	 * Initialize scaffold workflow
	 * @returns {Promise<synapse.Configuration>}
	 */
	async initialize() {
		return Scaffold.output;
	}

	/**
	 * Builds and merges archetypes configurations
	 * @scope ScaffoldCommand
	 * @param {synapse.Configuration} config
	 * @returns Synapse|Error
	 */
	@before(catchError)
	async buildConfigurations(config) {
		ArchetypeHelper.getTypes(this.availableArchetypes);
		const options = { basePath: `${this.synapsePath}/lib/archetypes`, archetypes: this.availableArchetypes };
		return ArchetypeHelper.transform(config, await PromiseSeq(this.findAnswerByName('archetypes').map((archetype) =>
			ArchetypeHelper.loadArchetype.bind(this, archetype, options, config))));
	}

	/**
	 * Build Scripts Configuration Pipeline
	 * @scope ScaffoldCommand
	 * @returns synapse.Synapse|Error
	 */
	@before(catchError)
	async buildScripts(config) {
		dev('BuildScripts: o%', config);
		return this;
	}

	/**
	 * Builds and Injects Real time configuration (if specified)
	 * @scope ScaffoldCommand
	 * @returns synapse.Synapse|Error
	 */
	@before(catchError)
	async buildRealtime(...args) {
		// dev('BuildRealtime: o%', args[0]);
		return this;
	}

	/**
	 * Merges all configuration
	 * @scope ScaffoldCommand
	 * @returns synapse.Synapse|Error
	 */
	@before(catchError)
	async mergeConfig(...args) {
		// dev('MergeConfig: o%', args[0]);
		return this;
	}

	/**
	 * Writes synapse configuration to output
	 * @scope ScaffoldCommand
	 * @returns synapse.Synapse|Error
	 */
	@before(catchError)
	async write(...args) {
		// dev('write: o%', args[0]);
		return this;
	}

	/**
	 * Install all archetypes dependencies
	 * @scope ScaffoldCommand
	 * @returns synapse.Synapse|Error
	 */
	@before(catchError)
	async install(...args) {
		// dev('install: o%', args[0]);
		return this;
	}

	/**
	 * Executes Archetype Create Script (if defined)
	 * @scope ScaffoldCommand
	 * @returns synapse.Synapse|Error
	 */
	@before(catchError)
	async create(...args) {
		// dev('crate: o%', args[0]);
		return this;
	}
}

export default new Scaffold();
