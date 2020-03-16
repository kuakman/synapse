/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { SynapseCommand } from 'common/synapse-command';

/**
 * Class PipelineCommand
 * @class common.PipelineCommand
 * @extends common.SynapseCommand
 */
export class PipelineCommand extends SynapseCommand {
	/**
	 * @constructor
	 * @param {*[]} args
	 */
	constructor(...args) {
		super(...args);
		this.tasks.insert([
			this.configuration,
			this.clean,
			this.env,
			this.process,
			this.release
		], 2);
	}

	/**
	 * Default Configuration
	 * @async
	 * @param {PipelineCommand | boolean} prev
	 * @returns {Promise<PipelineCommand>}
	 */
	async configuration(prev) {
		// TODO: PreConfiguration
		// TODO: Configuration
		// TODO: PostConiguration
		return this;
	}

	/**
	 * Default Clean
	 * @async
	 * @param {PipelineCommand | boolean} prev
	 * @returns {Promise<PipelineCommand>}
	 */
	async clean(prev) {
		// TODO: PreClean
		// TODO: Clean
		// TODO: PostClean
		return this;
	}

	/**
	 * Default Environment Run
	 * @async
	 * @param {PipelineCommand | boolean} prev
	 * @returns {Promise<PipelineCommand>}
	 */
	async env(prev) {
		// TODO: PreEnv
		// TODO: Env
		// TODO: PostEnv
		return this;
	}

	/**
	 * Default Process Run
	 * @async
	 * @param {PipelineCommand | boolean} prev
	 * @returns {Promise<PipelineCommand>}
	 */
	async process(prev) {
		// TODO: PreProcess
		// TODO: Process
		// TODO: PostProcess
		return this;
	}

	/**
	 * Default Release Run
	 * @async
	 * @param {PipelineCommand | boolean} prev
	 * @returns {Promise<PipelineCommand>}
	 */
	async release(prev) {
		// TODO: PreRelease
		// TODO: Release
		// TODO: PostRelease
		return this;
	}

	/**
	 * String representation of the instance
	 * @override
	 * @returns {string}
	 */
	toString() {
		return `[${this.constructor.name}]`;
	}
}
