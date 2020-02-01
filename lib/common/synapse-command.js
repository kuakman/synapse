/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Command from '@oclif/command';

/**
 * Class SynapseCommand
 * @class common.SynapseCommand
 * @extends @oclif.Command
 */
export class SynapseCommand extends Command {
	/**
	 * Default Start
	 * @async
	 * @returns {Promise<SynapseCommand>}
	 */
	async start() {
		// TODO: Start
		return this;
	}

	/**
	 * Default End
	 * @async
	 * @returns {Promise<SynapseCommand>}
	 */
	async end() {
		// TODO: End
		return this;
	}

	/**
	 * Default Run
	 * @async
	 * @returns {Promise<SynapseCommand>}
	 */
	async run() {
		return this.start().end();
	}
}
