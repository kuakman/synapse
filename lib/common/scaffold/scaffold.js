/**
 * @module common.scaffold
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import PromiseSeq from 'promise-sequential';
import Core from 'common/core/core';
import Collection from 'utils/adt/collection';

/**
 * Scaffold
 * @extends Core
 */
const Scaffold = {
	/**
	 * Workflow
	 * @type Collection
	 */
	workflow: new Collection([this.doArchetypes, this.doRealtime, this.doConfiguration]),

	/**
	 * Retrieve selected archetypes collection
	 * @returns {Collection}
	 */
	getArchetypes: function() {
		return new Collection(this.findAnswerValueByName('archetypes'));
	},

	/**
	 * Load Archetype configs
	 * @scope ScaffoldCommand
	 * @returns {Promise<void>}
	 */
	load: async function() {
		console.log(Scaffold.getArchetypes());
		return this;
	},

	/**
	 * Merge Archetype Configurations
	 * @scope ScaffoldCommand
	 * @returns {Promise<true>}
	 */
	merge: async function() {
		return this;
	},

	/**
	 * Archetypes processing
	 * @returns {Promise<>}
	 */
	doArchetypes: async function() {
		const out = await PromiseSeq([Scaffold.load.bind(this), Scaffold.merge.bind(this)]);
		console.log(out);
		return out;
	},

	/**
	 * Realtime configuration processing
	 * @returns {Promise<void>}
	 */
	doRealtime: async function() {
		// TODO
		return this;
	},

	/**
	 * Synapse configuration processing
	 * @returns {true}
	 */
	doConfiguration() {
		// TODO
		return this;
	},

	/**
	 * Writes Synapse Configuration
	 * @scope ScaffoldCommand
	 * @returns Scaffold
	 */
	write: async function() {
		return PromiseSeq(Scaffold.workflows.invoke('bind', this));
	},

	/**
	 * Install Archetypes
	 * @scope ScaffoldCommand
	 * @returns Scaffold
	 */
	install: async function() {
		return this;
	}
};

export default extend(true, Scaffold, Core);
