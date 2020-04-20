/*
 * @module common.pipeline
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Core from 'common/core/core';
import { defined } from 'utils/utils';

/**
 * Singleton unique instance
 * @private
 * @type {Pipeline}
 */
let _instance = null;

/**
 * Pipeline Functions
 * @class Pipeline
 */
class Pipeline extends Core {
	/**
	 * Singleton get instance
	 * @returns {Pipeline}
	 */
	static getInstance() {
		if (defined(_instance)) {
			return _instance;
		}
		return (_instance = new Pipeline());
	}
}

export default Pipeline.getInstance();
