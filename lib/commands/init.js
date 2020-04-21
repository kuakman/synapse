/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/init';
import colors from 'ansi-colors';

import { ScaffoldCommand } from 'common/scaffold-command';
import Scaffold from 'common/scaffold/scaffold';
import { ConfigurationValidator, RealtimeValidator, ArchetypeValidator } from 'common/scaffold/validator/validator';
import { formatArchetype, onGroupToggle } from 'common/scaffold/format/formatter';
import { PromptTypes } from 'common/scaffold/helper/enquirer';

import { ClassProperties, before } from 'utils/decorators/helpers';
import { defined } from 'utils/utils';
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
	 * Setup Tasks
	 * @override
	 * @returns {commands.InitCommand}
	 */
	setupTasks() {
		super.setupTasks();
		this.tasks.insert([this.selectConfiguration, this.selectRealtime, this.loadArchetypes, this.selectArchetypes], 2);
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
			this.answer('config', selected);
		} else {
			this.answer('config', await this.prompt({
				name: 'config',
				type: PromptTypes.select,
				hint: colors.white('(Use Arrow keys to navigate and <Enter> key to select)'),
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
			this.answer('realtime', selected);
		} else {
			this.answer('realtime', await this.prompt({
				name: 'realtime',
				type: PromptTypes.toggle,
				message: 'Would you like to receive configuration data pushes from a remove server in real time?',
				hint: colors.white('(Required information should be exported within the synapse config)'),
				enabled: 'Yes',
				disabled: 'No'
			}));
		}
		return this;
	}

	/**
	 * Load Archetypes
	 * @async
	 * @returns Promise<InitCommand>
	 */
	async loadArchetypes() {
		Scaffold.onProgress(this, 'Archetypes', colors.yellow.bold('[Loading...]'));
		const archetypes = await import(`${this.synapsePath}/lib/archetypes/archetypes.json5`);
		this.availableArchetypes.push(archetypes.default);
		return Scaffold.onSuccess(this, colors.green.bold('[Loaded]'));
	}

	/**
	 * Select for archetypes option
	 * @async
	 * @mixes before {ArchetypeValidator}
	 * @returns Promise<InitCommand>
	 */
	@before(ArchetypeValidator)
	async selectArchetypes(selected) {
		if (defined(selected)) {
			this.answer('archetypes', new Collection(selected));
		} else {
			this.answer('archetypes', new Collection(await this.createPrompt(PromptTypes.multiselect, {
				name: 'archetypes',
				message: 'Select Archetypes to install',
				hint: colors.white('(Use Arrow keys to navigate and <Space> key to select/deselect)'),
				choices: this.availableArchetypes.map(formatArchetype, this),
				events: { toggle: onGroupToggle }
			})));
		}
		return this;
	}
}
