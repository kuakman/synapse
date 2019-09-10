/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import SynapseCommand from 'commands/synapse-command';

/**
 * Class PipelineCommand
 * @class common.PipelineCommand
 * @extends common.SynapseCommand
 */
export default class PipelineCommand extends SynapseCommand {
	static args = [];
	static flags = {};
	static strict = true;
	static hidden = false;
	static examples = [];
	static usage = '';
	static description = '';

	/**
	 * Default Configuration
	 * @returns {Promise<PipelineCommand>}
	 */
	async configuration() {
		// TODO: Configuration
		return this;
	}

	/**
	 * Default Clean
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
