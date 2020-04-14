/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import { prompt } from 'enquirer';
import { SynapseCommand } from 'common/synapse-command';
import { defined } from 'utils/utils';
import Collection from 'utils/adt/collection';
import { PrototypeMethods } from 'utils/decorators/helpers';
import { Enquirer } from 'common/scaffold/transformer/enquirer';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 * @mixes PrototypeMethods(common.transformer.Inquirer)
 */
@PrototypeMethods(Enquirer)
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
	 * Returns true if flag is available by name
	 * @param name
	 * @returns {boolean}
	 */
	isFlagAvailable(name) {
		return defined(name) && defined(this.constructor.flags[name]);
	}

	/**
	 * Saves answers
	 * @param answer
	 * @returns {common.ScaffoldCommand}
	 */
	answer(answer) {
		this.answers.push(answer);
		return this;
	}

	/**
	 * Default Prompt strategy
	 * @async
	 * @param {string} [name]
	 * @param {object} [opts = {}]
	 * @returns Promise<ScaffoldCommand>|null
	 */
	async prompt(name, opts = {}) {
		if (this.isFlagAvailable(name)) {
			const question = this.createQuestion(name, extend(true, {}, this.constructor.flags[name], opts));
			this.answer(await prompt(question));
		}
		return null;
	}

	/**
	 * Custom Prompt Strategy that uses a Prompt Constructor
	 * @param {Function} PromptType
	 * @param {string} name
	 * @param {object} [opts = {}]
	 * @returns Promise<ScaffoldCommand>|null
	 */
	async createPrompt(PromptType, name, opts = {}) {
		if (this.isFlagAvailable(name)) {

		}
		return null;
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
