/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Meta from 'meta/prod.json5';
import { PipelineCommand } from 'common/pipeline-command';

/**
 * Class Prod
 * @class commands.Prod
 * @extends common.PipelineCommand
 */
export default class Prod extends PipelineCommand {
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
