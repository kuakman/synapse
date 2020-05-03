/**
 * @module common.core
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { spawn } from 'child_process';
import extend from 'extend';
import PromiseSeq from 'promise-sequential';

import Core from 'common/core/domain/core';

import Collection from 'utils/adt/collection';
import { defined } from 'utils/utils';
import { dev, err, isProduction, warn } from 'utils/debug/debug';

/**
 * Class Script
 * @class Script
 */
class Script extends Core {
	/**
	 * Execution
	 * // FIXME: Figure to execute in order this scripts (except for create which is fired somewhere else)
	 * @type {Collection}
	 */
	static execution = new Collection([
		'create',
		'start',
		'preConfig',
		'config',
		'postConfig',
		'preClean',
		'clean',
		'postClean',
		'preEnv',
		'preTest',
		'test',
		'postTest',
		'preDev',
		'dev',
		'postDev',
		'preProd',
		'prod',
		'postProd',
		'postEnv',
		'preServe',
		'serve',
		'postServe',
		'preRelease',
		'release',
		'postRelease',
		'end'
	]);

	/**
	 * @private
	 * @type {string}
	 */
	_name;

	/**
	 * @private
	 * @type {Collection}
	 */
	_queue = new Collection();

	/**
	 * @private
	 * @type {StdioOptions}
	 */
	_stdio = [];

	/**
	 * @property name
	 * @returns {string}
	 */
	get name() {
		return this._name;
	}

	/**
	 * @property queue
	 * @returns {Collection}
	 */
	get queue() {
		return this._queue;
	}

	/**
	 * @property
	 * @returns {StdioOptions}
	 */
	get stdio() {
		return this._stdio;
	}

	/**
	 * @override
	 * @returns {Partial<Script>}
	 */
	get defaults() {
		return extend({}, super.defaults, { stdio: 'ipc' });
	}

	/**
	 * Returns true if the given script is supported, false otherwise
	 * @param {string} name
	 * @returns boolean
	 */
	isSupported(name) {
		const result = Script.execution.containsBy((current) => current === name);
		if (!result) warn('Script [s%] is not supported. Skipping...', name);
		return result;
	}

	/**
	 * Default Parsing Strategy
	 * @override
	 * @param {Partial<Script>} [attributes = {}]
	 * @return {Script}
	 */
	parse(attributes = {}) {
		return extend(super.parse(attributes), {
			name: this.parseName(attributes),
			queue: this.parseQueue(attributes, this)
		});
	}

	/**
	 * Parses script name
	 * @param {Partial<Script>} [attributes = {}]
	 * @returns {Script}
	 */
	parseName(attributes) {
		const { name } = attributes;
		if (!defined(name) || this.isSupported(name)) return this;
		this._name = name;
		return this;
	}

	/**
	 * Parses script queue
	 * @param {Partial<Script>} [attributes = {}]
	 * @param {Script} script
	 * @returns {Script}
	 */
	parseQueue(attributes, script) {
		const { queue } = attributes;
		if (!defined(queue) && !defined(script.name)) return this;
		this.queue.reset({}, queue);
		return this;
	}

	/**
	 * Bind IPC process message events
	 * @param {ChildProcess} script
	 * @param {Function} resolve
	 * @param {Function} reject
	 * @returns {ChildProcess}
	 */
	bindScriptEvents(script, resolve, reject) {
		script.on('data', this.onScriptData.bind(this, script));
		script.on('close', this.onScriptEnd.bind(this, script, resolve));
		script.on('exit', this.onScriptEnd.bind(this, script, resolve));
		script.on('error', this.onScriptError.bind(this, script, reject));
		return script;
	}

	/**
	 * Default strategy for execution of script queue
	 * @returns {Promise<any>}
	 */
	async run() {
		return PromiseSeq(this.queue.map(this.create, this));
	}

	/**
	 * Default strategy for creating promise-based execution of a single script
	 * @param {string} scriptPath
	 * @returns Promise<Promise<void>
	 */
	async create(scriptPath) {
		return (prevResponse) => this.execute.bind(this, prevResponse, scriptPath);
	}

	/**
	 * Default strategy for executing a single script child process with IPC channel
	 * // FIXME: Parameters gather from config (use chain of responsability to get parent)
	 * @param {any} prevResponse
	 * @param {string} scriptPath
	 * @param {Function} resolve
	 * @param {Function} reject
	 * @returns {Promise<void>}
	 */
	async execute(prevResponse, scriptPath, resolve, reject) {
		this.onScriptStart(scriptPath);
		await this.bindScriptEvents(spawn(scriptPath, [], { stdio: this.stdio }), resolve, reject);
	}

	/**
	 * Script Start Handler
	 * @param {string} scriptPath
	 * @returns {Script}
	 */
	onScriptStart(scriptPath) {
		if (!isProduction()) {
			dev('Script [s%] Starts', scriptPath);
		}
		return this;
	}

	/**
	 * Script Data Handler
	 * @param {ChildProcess} script
	 * @param {any} data
	 * @returns {Script}
	 */
	onScriptData(script, data) {
		if (!isProduction()) {
			dev('Script PID [%s]: o%', script.pid, data);
		}
		return this;
	}

	/**
	 * Script End Handler
	 * @param {ChildProcess} script
	 * @param {Function} resolve
	 * @returns {Script}
	 */
	onScriptEnd(script, resolve) {
		if (!isProduction()) {
			dev('Script [s%] Ends', script.pid);
		}
		resolve(script.pid);
		return this;
	}

	/**
	 * Script Error Handler
	 * @param {ChildProcess} script
	 * @param {Function} reject
	 * @param {number} code
	 * @returns {Script}
	 */
	onScriptError(script, reject, code) {
		if (!isProduction()) {
			err('Script [s%] Failed with code: [s%]', script.pid, code);
		}
		reject(code);
		return this;
	}
}

export default Script;
