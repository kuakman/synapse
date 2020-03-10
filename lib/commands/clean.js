/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/clean.json5';
import { ClassProperties } from 'utils/utils';
import { SynapseCommand } from 'common/synapse-command';

/**
 * Class CleanCommand
 * @class commands.CleanCommand
 * @extends common.SynapseCommand
 */
@ClassProperties(Options)
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
