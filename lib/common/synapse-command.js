/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 * @see Promise Sequential https://www.npmjs.com/package/promise-sequential
 */
import { test, dev, err } from 'utils/debug/debug';
import PromiseSeq from 'promise-sequential';
import Command from '@oclif/command';
import { Injector } from 'utils/decorators/injector';
import { Package } from 'utils/configuration/package';

/**
 * Class SynapseCommand
 * @class common.SynapseCommand
 * @extends @oclif.Command
 */
@Injector(Package)
export class SynapseCommand extends Command {
	/**
	 * Cli UX Options
	 * @property uxOptions
	 */
	static uxOptions = { stdout: true };

	/**
	 * Retrieves Tasks
	 * @returns Array
	 * @property package
	 */
	get package() {
		return SynapseCommand.package;
	}

	/**
	 * @property tasks
	 */
	get tasks() {
		test('%o', this.package);
		return [
			this.start.bind(this),
			this.end.bind(this)
		];
	}

	/**
	 * String representation of the instance
	 * @returns string
	 */
	toString() {
		return `[${this.constructor.name}]`;
	}

	/**
	 * Default Start
	 * @async
	 * @param {SynapseCommand | boolean} prev - Previous result
	 * @returns {Promise<SynapseCommand>}
	 */
	async start(prev) {
		dev(`${this.toString()} Start on %o`, this);
		// ux.action.start(`Initializing ${this.toString()}`, 'Initializing', SynapseCommand.uxOptions);
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
		// ux.action.stop();
		return this;
	}

	/**
	 * Default Run
	 * @async
	 * @returns {Promise<any>}
	 */
	async run() {
		return PromiseSeq(this.tasks).catch(this.onError.bind(this));
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
}
