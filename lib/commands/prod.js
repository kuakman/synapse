/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import PipelineCommand from 'common/pipeline-command';

/**
 * Class Prod
 * @class commands.Prod
 * @extends common.PipelineCommand
 */
export class Prod extends PipelineCommand {
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
	 * @returns {Promise<commands.Prod>}
	 */
	async env() {
		await super.env();
		// TODO
		return this;
	}

	/**
	 * Process Run
	 * @override
	 * @returns {Promise<commands.Prod>}
	 */
	async process() {
		await super.process();
		// TODO
		return this;
	}
}
