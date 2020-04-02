/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import * as inquirer from 'inquirer';
import { SynapseCommand } from 'common/synapse-command';
import { defined } from 'utils/utils';
import Collection from 'utils/adt/collection';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 */
export class ScaffoldCommand extends SynapseCommand {
	/**
	 * @type Collection
	 */
	answers = new Collection();

	/**
	 * Resolves Question Message
	 * @param {string} name
	 * @param {object} option
	 * @returns object
	 */
	resolve(name, option) {
		return {
			name,
			message: option.description,
			default: option.default
		};
	}

	/**
	 * Resolves Question Type
	 * @param {string} name
	 * @param {object} option
	 * @returns object
	 */
	resolveType(name, option) {
		const { options } = option;
		return defined(options) && Array.isArray(options) ? { type: 'list' } : {};
	}

	/**
	 * Resolves Question Choices
	 * @param {string} name
	 * @param {object} option
	 * @returns object
	 */
	resolveChoices(name, option) {
		const { options } = option;
		return defined(options) && Array.isArray(options) ? { choices: options } : {};
	}

	/**
	 * Create Inquirer Question by name
	 * @private
	 * @param {string} name
	 * @param {object} option
	 * @returns {object}
	 */
	async prompt(name, option) {
		return inquirer.prompt([{
			...this.resolve(name, option),
			...this.resolveType(name, option),
			...this.resolveChoices(name, option)
		}]);
	}

	/**
	 * Default Prompting
	 * @async
	 * @param {string} [name]
	 * @returns Promise<ScaffoldCommand>
	 */
	async ask(name) {
		if (!defined(name) || !defined(this.flags[name])) return this;
		this.answers.push(await this.prompt(name, this.flags[name]));
		return this;
	}

	/**
	 * Write Configuration
	 * @async
	 * @returns Promise<ScaffoldCommand>
	 */
	async write() {
		this.onProgress('Configuration', 'Writing...');
		// TODO: Writing into package resolve answers
		return this;
	}

	/**
	 * Install Archetype dependencies
	 * @async
	 * @returns Promise<ScaffoldCommand>
	 */
	async install() {
		this.showProgress();
		// TODO: execute
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
