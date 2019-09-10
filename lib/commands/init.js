/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import ScaffoldCommand from 'common/scaffold-command';

/**
 * Class Init
 * @class commands.Init
 * @extends common.ScaffoldCommand
 */
export class Init extends ScaffoldCommand {
	static args = [];
	static flags = {};
	static strict = true;
	static hidden = false;
	static examples = [];
	static usage = '';
	static description = '';

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
