/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/init.json5';
import { ClassProperties, PrototypeProperties } from 'utils/decorators/helpers';
import { ScaffoldCommand } from 'common/scaffold-command';
import Collection from 'utils/adt/collection';
import { dev } from 'utils/debug/debug';

/**
 * Class InitCommand
 * @class commands.InitCommand
 * @extends common.ScaffoldCommand
 */
@ClassProperties(Options)
@PrototypeProperties({ archetypes: new Collection(), answers: new Collection() })
export class InitCommand extends ScaffoldCommand {
	/**
	 * Configuration Options
	 * @type {*[]}
	 */
	static configuration = [
		{ name: 'Package' },
		{ name: 'File (json5/js)' },
		{ name: 'Remote' },
		{ name: 'Real Time' }
	];

	/**
	 * @constructor
	 * @param {*[]} args
	 */
	constructor(...args) {
		super(...args);
		this.tasks.insert([
			this.askConfiguration,
			this.loadArchetypes,
			this.askArchetypes,
			this.process
		], 2);
		this.answers.on(Collection.events.add, this.onCapture, this);
	}

	/**
	 * Asks for configuration option
	 * @async
	 * @returns {Promise<commands.InitCommand>}
	 */
	async askConfiguration() {
		// TODO: Prompt extra questions depending on options
		this.answers.push(await this.prompt({
			name: 'configuration',
			message: 'Select Configuration',
			type: 'list',
			choices: InitCommand.configuration
		}));
		return this;
	}

	/**
	 * Loads List of archetypes available
	 * @async
	 * @returns {Promise<commands.InitCommand>}
	 */
	async loadArchetypes() {
		// TODO
		return this;
	}

	/**
	 * Asks for archetypes option
	 * @returns {Promise<commands.InitCommand>}
	 */
	async askArchetypes() {
		this.answers.push(await this.prompt({
			name: 'archetypes',
			message: 'Select Archetype',
			type: 'list',
			choices: this.archetypes.pluck('name')
		}));
		return this;
	}

	/**
	 * Writes Configuration
	 * @returns {Promise<commands.InitCommand>}
	 */
	async process() {
		// TODO: Write configuration
		// TODO: Write package.json 'scripts' (test, dev, prod)
		// TODO: Install Archetypes
		return this;
	}

	/**
	 * Capture Options Handler
	 * @param answers
	 * @returns {commands.InitCommand}
	 */
	onCapture(answers) {
		dev('%o', answers.toJSON());
		return this;
	}
}
