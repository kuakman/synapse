/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Meta from 'meta/dev.json5';
import { PipelineCommand } from 'common/pipeline-command';

/**
 * Class Dev
 * @class commands.Dev
 * @extends common.PipelineCommand
 */
export default class Dev extends PipelineCommand {
	static args = Meta.args;
	static flags = Meta.flags;
	static strict = Meta.strict;
	static hidden = Meta.hidden;
	static examples = Meta.examples;
	static usage = Meta.usage;
	static description = Meta.description;

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
