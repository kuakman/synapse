/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { dev, err } from 'utils/debug/debug';
import PromiseSeq from 'promise-sequential';
import Command from '@oclif/command';

/**
 * Class SynapseCommand
 * @class common.SynapseCommand
 * @extends @oclif.Command
 */
export class SynapseCommand extends Command {
	/**
	 * Retrieves Tasks
	 * @returns Array
	 */
	getTasks() {
		return [
			this.start.bind(this),
			this.end.bind(this)
		];
	}

	/**
	 * String representation
	 * @returns string
	 */
	toString() {
		return `[${this.constructor.name}]`;
	}

	/**
	 * Handles Error
	 * @param {Error} error
	 * @return void
	 */
	onError(error) {
		err(error.message);
		this.exit(error.statusCode);
	}

	/**
	 * Default Start
	 * @async
	 * @param {SynapseCommand | boolean} prev - Previous result
	 * @returns {Promise<SynapseCommand>}
	 */
	async start(prev) {
		dev(`${this.toString()} Start on %o`, this);
		return this;
	}

	/**
	 * Default End
	 * @async
	 * @param {SynapseCommand | boolean} prev - Previous result
	 * @returns {Promise<SynapseCommand>}
	 */
	async end(prev) {
		dev(`${this.toString()} End on %o`, this);
		return this;
	}

	/**
	 * Default Run
	 * @async
	 * @returns {Promise<any>}
	 */
	async run() {
		return PromiseSeq(this.getTasks()).catch(this.onError.bind(this));
	}
}
