/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { dev } from 'utils/debug/debug';
import { SynapseCommand } from 'common/synapse-command';
import ux from 'cli-ux';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 */
export class ScaffoldCommand extends SynapseCommand {
	/**
	 * Retrieves Tasks
	 * @override
	 * @returns Array
	 */
	getTasks() {
		const tasks = super.getTasks();
		tasks.splice(1, 0, this.prompting.bind(this));
		return tasks;
	}

	/**
	 * String representation of the instance
	 * @override
	 * @returns {string}
	 */
	toString() {
		return `[${this.constructor.name}]`;
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
