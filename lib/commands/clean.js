/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Meta from 'meta/clean.json5';
import { SynapseCommand } from 'common/synapse-command';

/**
 * Class Clean
 * @class commands.Clean
 * @extends common.SynapseCommand
 */
export default class Clean extends SynapseCommand {
	static args = Meta.args;
	static flags = Meta.flags;
	static strict = Meta.strict;
	static hidden = Meta.hidden;
	static examples = Meta.examples;
	static usage = Meta.usage;
	static description = Meta.description;

	/**
	 * Configuration
	 * @returns {Promise<PipelineCommand>}
	 */
	async configuration() {
		// TODO: Configuration
		return this;
	}

	/**
	 * Run
	 * @override
	 * @returns {Promise<PipelineCommand>}
	 */
	async run() {
		return this.start()
			.configuration()
			.end();
	}
}
