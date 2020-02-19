/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { dev } from 'utils/debug/debug';
import { SynapseCommand } from 'common/synapse-command';

/**
 * Class PipelineCommand
 * @class common.PipelineCommand
 * @extends common.SynapseCommand
 */
export class PipelineCommand extends SynapseCommand {
	/**
	 * Retrieves Tasks
	 * @override
	 * @returns Array
	 */
	getTasks() {
		const tasks = super.getTasks();
		tasks.splice(1, 0, this.configuration.bind(this));
		tasks.splice(2, 0, this.clean.bind(this));
		tasks.splice(3, 0, this.env.bind(this));
		tasks.splice(4, 0, this.process.bind(this));
		tasks.splice(5, 0, this.release.bind(this));
		return tasks;
	}

	/**
	 * String representation of the instance
	 * @override
	 * @returns {string}
	 */
	toString() {
		return `[${this.constructor.name}]`;
	}

	/**
	 * Default Configuration
	 * @async
	 * @returns {Promise<PipelineCommand>}
	 */
	async configuration() {
		dev(`${this.toString()} Configuration on %o`, this);
		return this;
	}

	/**
	 * Default Clean
	 * @async
	 * @returns {Promise<PipelineCommand>}
	 */
	async clean() {
		dev(`${this.toString()} Clean on %o`, this);
		// TODO: PreClean
		// TODO: Clean
		// TODO: PostClean
		return this;
	}

	/**
	 * Default Environment Run
	 * @async
	 * @returns {Promise<PipelineCommand>}
	 */
	async env() {
		dev(`${this.toString()} Environment on %o`, this);
		// TODO: PreEnv
		// TODO: Env
		// TODO: PostEnv
		return this;
	}

	/**
	 * Default Process Run
	 * @async
	 * @returns {Promise<PipelineCommand>}
	 */
	async process() {
		dev(`${this.toString()} Process on %o`, this);
		// TODO: PreProcess
		// TODO: Process
		// TODO: PostProcess
		return this;
	}

	/**
	 * Default Release Run
	 * @async
	 * @returns {Promise<PipelineCommand>}
	 */
	async release() {
		dev(`${this.toString()} Release on %o`, this);
		// TODO: PreRelease
		// TODO: Release
		// TODO: PostRelease
		return this;
	}
}
