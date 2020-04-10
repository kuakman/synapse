/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/clean';
import { ClassProperties } from 'utils/decorators/helpers';
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
