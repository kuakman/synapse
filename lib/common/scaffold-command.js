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
import { EnquirerHelper } from 'common/scaffold/helper/enquirer';
import { dev } from 'utils/debug/debug';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 * @mixes PrototypeMethods(common.transformer.EnquirerHelper)
 */
@PrototypeMethods(EnquirerHelper)
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
		await super.init();
		return this.attachEvents();
	}

	/**
	 * Attach Events
	 * @returns {SynapseCommand}
	 */
	attachEvents() {
		this.answers.on(Collection.events.add, this.onCapture);
		return this;
	}

	/**
	 * Returns true if flag is available by name
	 * @param {object} [question = {}]
	 * @returns {boolean}
	 */
	isFlagAvailable(question = {}) {
		return defined(question.name) && defined(this.constructor.flags[question.name]);
	}

	/**
	 * Creates question
	 * @param {object} [question = {}]
	 * @returns {object}
	 */
	question(question = {}) {
		const { name, ...filtered } = question;
		return this.createQuestion(name, extend(true, {}, this.constructor.flags[name], filtered));
	}

	/**
	 * Captures answer
	 * @param answer
	 * @returns {common.ScaffoldCommand}
	 */
	answer(answer) {
		this.answers.push(answer);
		return this;
	}

	/**
	 * Custom Prompt Strategy that uses a Prompt Constructor
	 * @async
	 * @param {Function} PromptType
	 * @param {object} [question]
	 * @returns Enquirer.Prompt|null
	 */
	async createPrompt(PromptType, question) {
		if (!this.isFlagAvailable(question)) return null;
		const { events, ...filtered } = question,
			prompt = this.bindEvents(this.newPrompt(PromptType, this.question(filtered)), events);
		return defined(prompt) ? prompt.run() : null;
	}

	/**
	 * Default Prompt strategy
	 * @async
	 * @param {object} [question]
	 * @returns Promise<ScaffoldCommand>|null
	 */
	async prompt(question) {
		if (!this.isFlagAvailable(question)) return null;
		return prompt(this.question(question));
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
	 * Capture Handler
	 * @param {Collection} collection
	 * @returns InitCommand
	 */
	onCapture(collection) {
		dev('o%', collection.toJSON());
		return this;
	}

	/**
	 * String representation of the instance
	 * @override
	 * @returns string
	 */
	toString() {
		return `[${this.constructor.name}]`;
	}
}
