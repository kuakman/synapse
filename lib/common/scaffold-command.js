/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { SynapseCommand } from 'common/synapse-command';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 */
export class ScaffoldCommand extends SynapseCommand {
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
