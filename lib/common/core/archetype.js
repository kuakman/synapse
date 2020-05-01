/**
 * @module common.core.loader
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { resolve } from 'path';
import * as _ from 'underscore';
import PromiseSeq from 'promise-sequential';

import Normalizer from 'common/core/normalizer';

import { defined } from 'utils/utils';
import Collection from 'utils/adt/collection';
import { warn } from 'utils/debug/debug';

class ArchetypeHelper {
	/**
	 * @type {string[]}
	 */
	static exclude = ['default', 'extend', 'banner'];

	/**
	 * Warning Messages
	 * @type {object}
	 */
	static warnings = {
		dependency: 'Archetype [s%] with dependency [s%] couldn\'t be found. Skipping...'
	}

	/**
	 * Load Archetype Configuration from disk
	 * @param {Archetype} archetype
	 * @param {object} [options = {}]
	 * @returns {Promise<synapse.Configuration|object>}
	 */
	async loadArchetype(archetype, options = {}) {
		if (!defined(archetype)) return {};
		const { resolve } = ArchetypeHelper;
		options.load = defined(options.load) ? options.load : ArchetypeHelper.fromDisk;
		return PromiseSeq(resolve(archetype, options));
	}

	/**
	 * Filters and returns
	 * @param {Collection} archetypes
	 */
	getTypes(archetypes) {
		// return archetypes.chain().filter((archetype) => archetype.type);
		return {};
	}

	/**
	 * Normalizes all configurations
	 * @param {synapse.Configuration} initial
	 * @param {synapse.Configuration[]} results
	 * @returns {synapse.Configuration}
	 */
	transform(initial, results) {
		return _.omit(new Collection(results).reduce((memo, current) =>
			Normalizer.normalize(memo, current), initial), ...ArchetypeHelper.exclude);
	}

	/**
	 * Strategy to load a single archetype configuration from disk
	 * @param {synapse.Archetype} archetype
	 * @param {object} options
	 * @returns Promise<synapse.Configuration|object>
	 */
	static async fromDisk(archetype, options) {
		const { basePath } = options;
		return defined(basePath) ? import(resolve(`${basePath}/${archetype.type}/${archetype.name}/.config.json5`)) : {};
	}

	/**
	 * Matching strategy by name
	 * @param {string} name
	 * @param {Archetype} current
	 * @returns {boolean}
	 */
	static matcherByName(name, current) {
		return `${current.type}:${current.name}` === name;
	}

	/**
	 * Resolves loading strategy
	 * @param {Archetype} archetype
	 * @param {object} options
	 * @returns {Promise<synapse.Configuration>[]}
	 */
	static resolve(archetype, options) {
		const queue = [options.load.bind(this, archetype, options)];
		return defined(archetype.extend) ? ArchetypeHelper.resolveExtend(queue, archetype, options) : queue;
	}

	/**
	 * Resolves queue by adding dependent archetypes
	 * @param {Promise<synapse.Configuration>[]} queue
	 * @param {Archetype} archetype
	 * @param {object} options
	 * @returns {Promise<synapse.Configuration>[]}
	 */
	static resolveExtend(queue, archetype, options) {
		const dependent = options.archetypes.find(ArchetypeHelper.matcherByName.bind(this, archetype.extend));
		if (defined(dependent)) {
			queue.push(options.load.bind(this, dependent, options));
		} else {
			warn(ArchetypeHelper.warnings.dependency, archetype.name, archetype.extend);
		}
		return queue;
	}
}

export default new ArchetypeHelper();
