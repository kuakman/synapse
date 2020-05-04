/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import PromiseSeq from 'promise-sequential';
import { prompt } from 'enquirer';

import { defined } from 'utils/utils';
import Collection from 'utils/adt/collection';
import { PrototypeMethods } from 'utils/decorators/helpers';

import { SynapseCommand } from 'common/synapse-command';
import Scaffold from 'common/scaffold/scaffold';
import { EnquirerHelper } from 'common/scaffold/helper/enquirer';

/**
 * Class ScaffoldCommand
 * @class common.ScaffoldCommand
 * @extends common.SynapseCommand
 * @mixes PrototypeMethods(common.scaffold.helper.EnquirerHelper)
 */
@PrototypeMethods(EnquirerHelper)
export class ScaffoldCommand extends SynapseCommand {
	/**
	 * List of answers
	 * @type Collection
	 */
	answers = new Collection();

	/**
	 * Setup Tasks
	 * @override
	 * @returns ScaffoldCommand
	 */
	setupTasks() {
		super.setupTasks();
		this.tasks.insert([this.process], 2);
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
	 * Finds answer's value by question name
	 * @param {string} [name = '']
	 * @returns {any}
	 */
	findAnswerByName(name = '') {
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
	 * Process Configuration
	 * @async
	 * @returns Promise<InitCommand>
	 */
	async process() {
		return PromiseSeq(Scaffold.workflows.invoke('bind', this))
			.catch((err) => Scaffold.onError(err, this, { code: 1 }));
	}
}
