/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import SynapseCommand from 'common/synapse-command';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 */
export default class ScaffoldCommand extends SynapseCommand {
	static args = [];
	static flags = {};
	static strict = true;
	static hidden = false;
	static examples = [];
	static usage = '';
	static description = '';

	/**
	 * Default Prompting
	 * @returns {Promise<ScaffoldCommand>}
	 */
	async prompting() {
		// TODO Prompting
		return this;
	}

	/**
	 * Default Run
	 * @override
	 * @returns {Promise<ScaffoldCommand>}
	 */
	async run() {
		return this.start()
			.prompting()
			.end();
	}
}
