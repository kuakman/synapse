/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/init.json5';
import { ClassProperties } from 'utils/decorators/helpers';
import { ScaffoldCommand } from 'common/scaffold-command';
import { ConfigurationValidator, ArchetypeValidator, InitProcessValidator } from 'common/validator/scaffold-validator';
import Collection from 'utils/adt/collection';
import { dev } from 'utils/debug/debug';

/**
 * Class InitCommand
 * @class commands.InitCommand
 * @extends common.ScaffoldCommand
 * @mixes ClassProperties
 */
@ClassProperties(Options)
export class InitCommand extends ScaffoldCommand {
	/**
	 * @type Collection
	 */
	configuration = new Collection();

	/**
	 * @type Collection
	 */
	archetypes = new Collection();

	/**
	 * Attach Events
	 * @returns {InitCommand}
	 */
	attachEvents() {
		this.archetypes.on(Collection.events.add, this.onCapture);
		this.answers.on(Collection.events.add, this.onCapture);
		return this;
	}

	/**
	 * Initialize
	 * @async
	 * @override
	 * @returns Promise<InitCommand>
	 */
	async init() {
		await super.init();
		this.tasks.insert([
			this.selectConfiguration,
			this.loadArchetypes,
			this.selectArchetypes,
			this.process], 2);
		return this.attachEvents();
	}

	/**
	 * Select for configuration option
	 * @async
	 * @mixes wrap {ConfigurationValidator}
	 * @returns Promise<InitCommand>
	 */
	@wrap(ConfigurationValidator)
	async selectConfiguration() {
		await this.ask('configuration');
		return this;
	}

	/**
	 * Load Archetypes
	 * @async
	 * @returns Promise<InitCommand>
	 */
	async loadArchetypes() {
		this.onProgress('Archetypes', 'Loading...');
		await import(`${this.synapsePath}/lib/archetypes/archetypes.json5`).then((list) => {
			this.archetypes.push(list);
			this.onSuccess('Loaded');
		});
		return this;
	}

	/**
	 * Select for archetypes option
	 * @async
	 * @mixes wrap {ArchetypeValidator}
	 * @returns Promise<InitCommand>
	 */
	@wrap(ArchetypeValidator)
	async selectArchetypes() {
		await this.ask('archetype');
		return this;
	}

	/**
	 * Process
	 * @async
	 * @mixes wrap {InitProcessValidator}
	 * @returns Promise<InitCommand>
	 */
	@wrap(InitProcessValidator)
	async process() {
		await this.write();
		await this.install();
		return this;
	}

	/**
	 * Capture Handler
	 * @param {Collection} collection
	 * @returns {InitCommand}
	 */
	onCapture(collection) {
		dev('%o', collection.toJSON());
		return this;
	}
}
