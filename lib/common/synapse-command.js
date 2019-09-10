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
export default class SynapseCommand extends Command {
	static args = [];
	static flags = {};
	static strict = true;
	static hidden = false;
	static examples = [];
	static usage = '';
	static description = '';

	/**
	 * Default Start
	 * @returns {Promise<SynapseCommand>}
	 */
	async start() {
		// TODO: Start
		return this;
	}

	/**
	 * Default End
	 * @returns {Promise<SynapseCommand>}
	 */
	async end() {
		// TODO: End
		return this;
	}

	/**
	 * Default Run
	 * @returns {Promise<SynapseCommand>}
	 */
	async run() {
		return this.start()
			.end();
	}
}
