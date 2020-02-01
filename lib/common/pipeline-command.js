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
	 * Default Configuration
	 * @async
	 * @returns {Promise<PipelineCommand>}
	 */
	async configuration() {
		// TODO: Configuration
		return this;
	}

	/**
	 * Default Clean
	 * @async
	 * @returns {Promise<PipelineCommand>}
	 */
	async clean() {
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
		// TODO: PreRelease
		// TODO: Release
		// TODO: PostRelease
		return this;
	}

	/**
	 * Default Run
	 * @override
	 * @async
	 * @returns {Promise<PipelineCommand>}
	 */
	async run() {
		return this.start()
			.configuration()
			.clean()
			.env()
			.process()
			.release()
			.end();
	}
}
