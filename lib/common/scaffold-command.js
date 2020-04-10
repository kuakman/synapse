/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import * as inquirer from 'inquirer';
import { SynapseCommand } from 'common/synapse-command';
import { defined } from 'utils/utils';
import Collection from 'utils/adt/collection';
import { PrototypeMethods } from 'utils/decorators/helpers';
import { Inquirer } from 'common/scaffold/transformer/inquirer';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 * @mixes PrototypeMethods(common.transformer.Inquirer)
 */
@PrototypeMethods(Inquirer)
export class ScaffoldCommand extends SynapseCommand {
	/**
	 * @type Collection
	 */
	answers = new Collection();

	/**
	 * Initialize
	 * @async
	 * @returns {Promise<SynapseCommand>}
	 */
	async init() {
		return super.init();
	}

	/**
	 * Default Prompt strategy
	 * @async
	 * @param {string} [name]
	 * @param {object} [opts = {}]
	 * @returns Promise<ScaffoldCommand>
	 */
	async prompt(name, opts = {}) {
		if (!defined(name) || !defined(this.flags[name])) return this;
		const option = extend(true, {}, this.flags[name], opts);
		this.answers.push(await inquirer.prompt([this.createQuestion(name, option)]));
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
