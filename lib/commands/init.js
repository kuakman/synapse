/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Meta from 'meta/init.json5';
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
	 * @returns {Promise<commands.Init>}
	 */
	async start() {
		return this;
	}

	/**
	 * Prompting
	 * @override
	 * @returns {Promise<ScaffoldCommand>}
	 */
	async prompting() {
		// TODO Prompting
		return this;
	}

	/**
	 * End
	 * @override
	 * @returns {Promise<commands.Init>}
	 */
	async end() {
		return this;
	}
}
