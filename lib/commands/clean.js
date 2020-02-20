/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/clean.json5';
import { StaticProperties } from 'common/decorators/command';
import { SynapseCommand } from 'common/synapse-command';

/**
 * Class CleanCommand
 * @class commands.CleanCommand
 * @extends common.SynapseCommand
 */
@StaticProperties(Options)
export class CleanCommand extends SynapseCommand {
	/**
	 * Configuration
	 * @returns {Promise<CleanCommand>}
	 */
	async configuration() {
		// TODO: Configuration
		return this;
	}
}
