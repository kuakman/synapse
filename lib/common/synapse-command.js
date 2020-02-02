/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import PromiseSeq from 'promise-sequential';
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
	 * @param {SynapseCommand | boolean} prev - Previous result
	 * @returns {Promise<SynapseCommand>}
	 */
	async start(prev, res, count) {
		// TODO: Start
		return this;
	}

	/**
	 * Default End
	 * @async
	 * @param {SynapseCommand | boolean} prev - Previous result
	 * @returns {Promise<SynapseCommand>}
	 */
	async end(prev) {
		// TODO: End
		return this;
	}

	/**
	 * Default Run
	 * @async
	 * @returns {Promise<SynapseCommand>}
	 */
	async run() {
		await PromiseSeq([this.start.bind(this), this.end.bind(this)]);
		return this;
	}
}
