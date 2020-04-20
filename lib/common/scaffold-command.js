/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import { prompt } from 'enquirer';
import colors from 'ansi-colors';

import { defined } from 'utils/utils';
import Collection from 'utils/adt/collection';

import { SynapseCommand } from 'common/synapse-command';
import { PrototypeMethods } from 'utils/decorators/helpers';
import Scaffold from './scaffold/scaffold';
import { EnquirerHelper } from 'common/scaffold/helper/enquirer';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 * @mixes PrototypeMethods(common.transformer.EnquirerHelper)
 */
@PrototypeMethods(Scaffold)
@PrototypeMethods(EnquirerHelper)
export class ScaffoldCommand extends SynapseCommand {
	/**
	 * List of answers
	 * @type Collection
	 */
	answers = new Collection();

	/**
	 * List of steps
	 * @type {Collection}
	 */
	steps = new Collection();

	/**
	 * Initialize
	 * @async
	 * @returns {Promise<ScaffoldCommand>}
	 */
	async init() {
		await super.init();
		return this.setupSteps().attachEvents();
	}

	/**
	 * Setup Steps
	 * @returns {common.ScaffoldCommand}
	 */
	setupSteps() {
		this.steps.push([this.read, this.write, this.install]);
		return this;
	}

	/**
	 * Attach Events
	 * @returns {ScaffoldCommand}
	 */
	attachEvents() {
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
	 * Finds answer value by name
	 * @param {string} [name = '']
	 * @returns {object}
	 */
	findAnswerValueByName(name = '') {
		const answer = this.answers.find((answer) => answer.name === name);
		return defined(answer) ? answer.value : null;
	}

	/**
	 * Creates question
	 * @param {object} [question = {}]
	 * @returns {object}
	 */
	question(question = {}) {
		const { name, ...filtered } = question,
			flagOpts = this.isFlagAvailable(question) ? this.constructor.flags[name] : {};
		return this.createQuestion(name, extend(true, {}, flagOpts, filtered));
	}

	/**
	 * Captures answer
	 * @param {string} name
	 * @param {object} answer
	 * @returns {common.ScaffoldCommand}
	 */
	answer(name, answer) {
		this.answers.push({ name, value: answer });
		return this;
	}

	/**
	 * Custom Prompt Strategy that uses a Prompt Constructor
	 * @async
	 * @param {Function} PromptType
	 * @param {object} [question]
	 * @returns Promise<Prompt>|null
	 */
	async createPrompt(PromptType, question) {
		const { events, ...filtered } = question,
			prompt = this.bindEvents(this.newPrompt(PromptType, this.question(filtered)), events);
		return defined(prompt) ? prompt.run() : null;
	}

	/**
	 * Default Prompt strategy
	 * @async
	 * @param {object} [question]
	 * @returns Promise<object|object[]>|null
	 */
	async prompt(question) {
		if (!this.isFlagAvailable(question)) return null;
		return prompt(this.question(question));
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
