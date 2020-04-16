/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 * @see Promise Sequential https://www.npmjs.com/package/promise-sequential
 */
import { resolve } from 'path';
import extend from 'extend';
import PromiseSeq from 'promise-sequential';
import Command from '@oclif/command';
import ux from 'cli-ux';

import { dev, err, isProduction } from 'utils/debug/debug';
import { PrototypeProperties } from 'utils/decorators/helpers';
import Collection from 'utils/adt/collection';
import { defined } from 'utils/utils';

/**
 * Class SynapseCommand
 * @class common.SynapseCommand
 * @extends @oclif.Command
 * @mixes ClassProperties
 */
@PrototypeProperties({ uxOptions: { stdout: true } })
export class SynapseCommand extends Command {
	/**
	 * Tasks
	 * @type Collection
	 */
	tasks = new Collection([this.start, this.load, this.end]);

	/**
	 * Package Path
	 * @type {string}
	 */
	packagePath = resolve(`${process.cwd()}/package.json`);

	/**
	 * Synapse Path
	 * @type {string|null}
	 */
	synapsePath = null;

	/**
	 * Package Json
	 * @type {object|null}
	 */
	package = null;

	/**
	 * Initialize
	 * @override
	 * @async
	 * @returns {Promise<SynapseCommand>}
	 */
	async init() {
		return extend(true, this, this.parse(this.constructor), { synapsePath: this.config.root });
	}

	/**
	 * Default Start
	 * @async
	 * @returns Promise<SynapseCommand>
	 */
	async start() {
		return this;
	}

	/**
	 * Default Package load
	 * @returns Promise<SynapseCommand>
	 */
	async load() {
		this.onProgress('Package', 'Reading...');
		await import(this.packagePath).then((data) => extend(this, { package: data.default }).onSuccess('Package Loaded.'));
		return this;
	}

	/**
	 * Default End
	 * @async
	 * @returns {Promise<SynapseCommand>}
	 */
	async end() {
		return this;
	}

	/**
	 * Default Run
	 * @async
	 * @returns {Promise}
	 */
	async run() {
		return PromiseSeq(this.tasks.invoke('bind', this)).catch((err) => this.onError(err));
	}

	/**
	 * Default strategy that handles progress status
	 * @param message
	 * @param status
	 * @returns SynapseCommand
	 */
	onProgress(message = '', status) {
		dev(`${this.toString()} - Progress: ${message} - ${status}`);
		if (isProduction() && defined(message) && defined(status)) {
			ux.action.start(message, status, this.uxOptions);
		}
		return this;
	}

	/**
	 * Default strategy that handles success status
	 * @param message
	 * @returns SynapseCommand
	 */
	onSuccess(message) {
		dev(`${this.toString()} - Success: ${message}`);
		if (isProduction()) {
			ux.action.stop(message || '');
		}
		return this;
	}

	/**
	 * Default strategy that handles error status
	 * @param {string|Error} error
	 * @param {{ code?: number }} [options = {}]
	 * @return void
	 */
	onError(error, options = {}) {
		dev('%o', error);
		if (isProduction()) {
			ux.action.stop(`${error.message}${defined(options.code) ? ' - Code: ' + options.code : ''}`);
		}
		err(error);
		this.exit(options.code);
	}

	/**
	 * String representation of the instance
	 * @returns string
	 */
	toString() {
		return `[${this.constructor.name}]`;
	}
}
