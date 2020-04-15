/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/init';
import { ScaffoldCommand } from 'common/scaffold-command';
import { ConfigurationValidator, RealtimeValidator, ArchetypeValidator } from 'common/scaffold/validator/validator';
import { formatArchetype, onGroupToggle } from 'common/scaffold/format/formatter';
import { PromptTypes } from 'common/scaffold/helper/enquirer';

import { defined } from 'utils/utils';
import { ClassProperties, before } from 'utils/decorators/helpers';
import Collection from 'utils/adt/collection';

/**
 * Class InitCommand
 * @class commands.InitCommand
 * @extends common.ScaffoldCommand
 * @mixes ClassProperties
 */
@ClassProperties(Options)
export class InitCommand extends ScaffoldCommand {
	/**
	 * List of available configurations
	 * @type Collection
	 */
	availableConfiguration = new Collection(InitCommand.flags.config.options);

	/**
	 * List of available archetypes
	 * @type Collection
	 */
	availableArchetypes = new Collection();

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
			this.selectRealtime,
			this.selectRealTimeConfiguration,
			this.loadArchetypes,
			this.selectArchetypes,
			this.process], 2);
		return this;
	}

	/**
	 * Select for configuration option
	 * @async
	 * @mixes before {ConfigurationValidator}
	 * @returns Promise<InitCommand>
	 */
	@before(ConfigurationValidator)
	async selectConfiguration(selected) {
		if (defined(selected)) {
			this.answer({ config: selected });
		} else {
			this.answer(await this.prompt({
				name: 'config',
				type: PromptTypes.select,
				hint: '(Use Arrow keys to navigate and Space bar to select)',
				choices: this.availableConfiguration.toJSON()
			}));
		}
		return this;
	}

	/**
	 * Select Real Time Configuration
	 * @param selected
	 * @mixes before {RealTimeValidator}
	 * @returns {Promise<InitCommand>}
	 */
	@before(RealtimeValidator)
	async selectRealtime(selected) {
		if (defined(selected)) {
			this.answer({ realtime: selected });
		} else {
			this.answer(await this.prompt({
				name: 'realtime',
				type: PromptTypes.confirm,
				message: 'Would you like to receive configuration data pushes from a remove server in real time?'
			}));
		}
		return this;
	}

	/**
	 * Select Realtime Configuration
	 * @async
	 * @returns {Promise<InitCommand>}
	 */
	async selectRealTimeConfiguration() {
		// TODO
		return this;
	}

	/**
	 * Load Archetypes
	 * @async
	 * @returns Promise<InitCommand>
	 */
	async loadArchetypes() {
		this.onProgress('Archetypes', 'Loading...');
		await import(`${this.synapsePath}/lib/archetypes/archetypes.json5`).then((archetypes) => {
			this.availableArchetypes.push(archetypes.default);
			this.onSuccess('Archetypes Loaded');
		});
		return this;
	}

	/**
	 * Select for archetypes option
	 * @async
	 * @mixes before {ArchetypeValidator}
	 * @returns Promise<InitCommand>
	 */
	@before(ArchetypeValidator)
	async selectArchetypes(selected) {
		if (selected) {
			this.answer({ archetypes: selected });
		} else {
			this.answer({
				archetypes: await this.createPrompt(PromptTypes.multiselect, {
					name: 'archetypes',
					message: 'Select Archetypes to install',
					hint: '(Use Arrow keys to navigate and Space bar to select/deselect)',
					choices: this.availableArchetypes.map(formatArchetype, this),
					events: { toggle: onGroupToggle }
				})
			});
		}
		return this;
	}

	/**
	 * Process Configuration
	 * @async
	 * @returns Promise<InitCommand>
	 */
	async process() {
		await this.write();
		await this.install();
		return this;
	}
}
