/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import * as inquirer from 'inquirer';
import { SynapseCommand } from 'common/synapse-command';
import { defined } from 'utils/utils';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 */
export class ScaffoldCommand extends SynapseCommand {
	/**
	 * Default Prompting
	 * @async
	 * @param {object} [question]
	 * @returns {Promise<ScaffoldCommand>}
	 */
	async prompt(question) {
		return defined(question) ? inquirer.prompt([question]) : null;
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
