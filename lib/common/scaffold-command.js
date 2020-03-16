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
	 * @constructor
	 * @param {*[]} args
	 */
	constructor(...args) {
		super(...args);
		this.tasks.insert([this.prompting], 2);
	}

	/**
	 * Default Prompting
	 * @async
	 * @param {ScaffoldCommand | boolean} prev
	 * @returns {Promise<ScaffoldCommand>}
	 */
	async prompting(prev) {
		// TODO
		return this;
	}

	/**
	 * String representation of the instance
	 * @override
	 * @returns {string}
	 */
	toString() {
		return `[${this.constructor.name}]`;
	}
}
