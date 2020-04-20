/*
 * @module common.scaffold
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import PromiseSeq from 'promise-sequential';
import { defined } from 'utils/utils';

import synapse from 'common/core/synapse.json5';

/**
 * Singleton unique instance
 * @private
 * @type {Scaffold}
 */
let _instance = null;

/**
 * Scaffold Functions
 * @class Scaffold
 */
class Scaffold {
	/**
	 * synapse Configuration Output
	 * @type synapse.Synapse
	 */
	static get output() {
		return synapse;
	}

	/**
	 * Reads configuration options
	 * @returns {Promise<Scaffold>}
	 */
	async read() {
		// 1) Archetype Reading
		// 2) Build Archetype pipelines
		// 3) Optionally execute 'create' scripts if any
		// 4) Inject Archetype configuration into output
		return PromiseSeq();
	}

	/**
	 * Write Configuration
	 * @returns {Promise<Scaffold>}
	 */
	async write() {
		// Configuration output: package or file?
		// Configuration realtime configuration
		return this;
	}

	/**
	 * Install Dependencies
	 * @returns {Promise<Scaffold>}
	 */
	async install() {
		return this;
	}

	/**
	 * Singleton get instance
	 * @returns {Scaffold}
	 */
	static getInstance() {
		if (defined(_instance)) {
			return _instance;
		}
		return (_instance = new Scaffold());
	}
}

export default Scaffold.getInstance();
