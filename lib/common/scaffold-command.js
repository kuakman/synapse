/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { dev } from 'utils/debug/debug';
import { SynapseCommand } from 'common/synapse-command';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 */
export class ScaffoldCommand extends SynapseCommand {
	/**
	 * Retrieves Tasks
	 * @returns Array
	 */
	getTasks() {
		return super.getTasks().fill(this.prompting.bind(this), 1);
	}

	/**
	 * Default Prompting
	 * @async
	 * @param {SynapseCommand | boolean} prev
	 * @returns {Promise<ScaffoldCommand>}
	 */
	async prompting(prev) {
		dev(`${this.toString()} prompting on %o`, this);
		return this;
	}
}
