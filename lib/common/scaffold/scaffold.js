/*
 * @module common.scaffold
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { resolve } from 'path';
import extend from 'extend';
import CoreInstance, { Core } from 'common/core/core';
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
			this.loadConfig,
			this.buildConfig,
			this.buildScripts,
			this.buildRealtime,
			this.mergeConfig,
			this.write,
			this.install,
			this.create]);
	}

	/**
	 * Retrieves archetype config path
	 * @param {ScaffoldCommand} command
	 * @param {Archetype} archetype
	 * @returns {string}
	 */
	static getArchetypePath(command, archetype) {
		return resolve(`${command.synapsePath}/lib/archetypes/${archetype.type}/${archetype.name}/.config.json5`);
	}

	/**
	 * Load archetypes config
	 * @scope ScaffoldCommand
	 * @returns {Promise<void>}
	 */
	async loadConfig() {
		const selected = this.findAnswerByName('archetypes');
		return await selected.reduce(async (memo, archetype) => {
			return extend(true, memo, await import(Scaffold.getArchetypePath(this, archetype)));
		}, Scaffold.output, this);
	}

	/**
	 * Builds and merges archetypes configurations
	 * @scope ScaffoldCommand
	 * @param {synapse.Synapse} config
	 * @returns synapse.Synapse|Error
	 */
	async buildConfig(config) {
		dev('BuildConfig: o%', config);
		return config;
	}

	/**
	 * Build Scripts Configuration Pipeline
	 * @scope ScaffoldCommand
	 * @returns synapse.Synapse|Error
	 */
	@before(catchError)
	async buildScripts(...args) {
		// dev('BuildScripts: o%', args[0]);
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
