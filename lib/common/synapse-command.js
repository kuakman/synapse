/**
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 * @see Promise Sequential https://www.npmjs.com/package/promise-sequential
 */
import { resolve } from 'path';
import extend from 'extend';
import colors from 'ansi-colors';
import PromiseSeq from 'promise-sequential';
import Command from '@oclif/command';

import Core from 'common/core/core';

import Collection from 'utils/adt/collection';

/**
 * Class SynapseCommand
 * @class common.SynapseCommand
 * @extends @oclif.Command
 */
export class SynapseCommand extends Command {
	/**
	 * Tasks
	 * @type Collection
	 */
	tasks = new Collection();

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
		extend(true, this, this.parse(this.constructor), { synapsePath: this.config.root });
		return this.attachEvents().setupTasks();
	}

	/**
	 * Attach Events
	 * @returns SynapseCommand
	 */
	attachEvents() {
		return this;
	}

	/**
	 * Setup Tasks
	 * @returns SynapseCommand
	 */
	setupTasks() {
		this.tasks.push([this.start, this.load, this.end]);
		return this;
	}

	/**
	 * Default Start
	 * @async
	 * @returns Promise<SynapseCommand>
	 */
	async start() {
		Core.banner({ version: `v${this.config.pjson.version}`, url: 'Documentation: http://nahuel.io/synapse' });
		return this;
	}

	/**
	 * Default Package load
	 * @returns Promise<SynapseCommand>
	 */
	async load() {
		Core.onProgress(this, 'Package Configuration', colors.yellow.bold('[Reading...]'));
		await import(this.packagePath).then((data) => extend(this, { package: data.default }));
		return Core.onSuccess(this, colors.green.bold('[Loaded]'));
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
		return PromiseSeq(this.tasks.invoke('bind', this)).catch((err) => Core.onError(err, this));
	}

	/**
	 * String representation of the instance
	 * @returns string
	 */
	toString() {
		return `[${this.constructor.name}]`;
	}
}
