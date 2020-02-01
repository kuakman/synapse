/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Meta from 'meta/test.json5';
import { PipelineCommand } from 'common/pipeline-command';

/**
 * Class Test
 * @class commands.Test
 * @extends common.PipelineCommand
 */
export default class Test extends PipelineCommand {
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
	 * @returns {Promise<commands.Test>}
	 */
	async env() {
		await super.env();
		// TODO
		return this;
	}

	/**
	 * Process Run
	 * @override
	 * @returns {Promise<commands.Test>}
	 */
	async process() {
		await super.process();
		// TODO
		return this;
	}
}
