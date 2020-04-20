/*
 * @module common.pipeline
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import PromiseSeq from 'promise-sequential';

/**
 * Pipeline Decorator Functions
 * @class Pipeline
 */
export default class Pipeline {
	/**
	 * Reads configuration options
	 * @returns {Promise<Pipeline>}
	 */
	static async read() {
		return this;
	}

	/**
	 * Write Configuration
	 * @returns {Promise<Pipeline>}
	 */
	static async write() {
		return this;
	}

	/**
	 * Install Dependencies
	 * @returns {Promise<Pipeline>}
	 */
	static async install() {
		return this;
	}
}
