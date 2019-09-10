/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import PipelineCommand from 'common/pipeline-command';

/**
 * Class Dev
 * @class commands.Dev
 * @extends common.PipelineCommand
 */
export class Dev extends PipelineCommand {
	static args = [];
	static flags = {};
	static strict = true;
	static hidden = false;
	static examples = [];
	static usage = '';
	static description = '';

	/**
	 * Environment Run
	 * @override
	 * @returns {Promise<commands.Dev>}
	 */
	async env() {
		await super.env();
		// TODO
		return this;
	}

	/**
	 * Process Run
	 * @override
	 * @returns {Promise<commands.Dev>}
	 */
	async process() {
		await super.process();
		// TODO
		return this;
	}
}
