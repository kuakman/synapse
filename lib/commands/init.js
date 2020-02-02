/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Meta from 'meta/init.json5';
import { dev } from 'utils/debug/debug';
import { ScaffoldCommand } from 'common/scaffold-command';

/**
 * Class Init
 * @class commands.Init
 * @extends common.ScaffoldCommand
 */
export default class Init extends ScaffoldCommand {
	static args = Meta.args;
	static flags = Meta.flags;
	static strict = Meta.strict;
	static hidden = Meta.hidden;
	static examples = Meta.examples;
	static usage = Meta.usage;
	static description = Meta.description;

	/**
	 * Start
	 * @override
	 * @async
	 * @param {SynapseCommand | boolean} prev
	 * @returns {Promise<Init>}
	 */
	async start(prev) {
		super.start(prev);
		return this;
	}

	/**
	 * Prompting
	 * @override
	 * @async
	 * @param {SynapseCommand | boolean} prev
	 * @returns {Promise<ScaffoldCommand>}
	 */
	async prompting(prev) {
		super.prompting(prev);
		return this;
	}

	/**
	 * End
	 * @override
	 * @async
	 * @param {SynapseCommand | boolean} prev
	 * @returns {Promise<Init>}
	 */
	async end(prev) {
		super.end(prev);
		return this;
	}
}
