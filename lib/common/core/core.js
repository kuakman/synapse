/**
 * @module common.core
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import _ from 'underscore';
import colors from 'ansi-colors';
import { accept } from 'utils/utils';
import { isProduction } from 'utils/debug/debug';

import SynapseConfig from 'common/core/synapse.json5';

const Core = {
	/**
	 * Synapse Configuration Output
	 * @returns {*}
	 */
	getOutput() {
		return SynapseConfig;
	},

	/**
	 * Retrieve Banner Defaults
	 * @returns {object}
	 */
	getBannerDefaults() {
		const currentYear = new Date().getFullYear();
		return {
			version: 'v[notAvailable]',
			year: (currentYear === 2020) ? currentYear : `2020-${currentYear}`
		};
	},

	/**
	 * Resolves banner options
	 * @param options
	 */
	getBannerOptions(options) {
		return accept(options, ['version', 'url', 'year'], Core.getBannerDefaults());
	},

	/**
	 * Render Synapse Banner to the stdout
	 * @returns Core
	 */
	banner: (options = {}) => {
		const model = Core.getBannerOptions(options);
		if (isProduction()) {
			console.log(colors.cyan(_.template(Core.getOutput().banner)(model)));
		}
	}
};

export default Core;
