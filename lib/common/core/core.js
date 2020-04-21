/**
 * @module common.core
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import _ from 'underscore';
import colors from 'ansi-colors';
import { accept, defined } from 'utils/utils';
import { dev, err, isProduction } from 'utils/debug/debug';

import synapse from 'common/core/synapse.json5';
import ux from 'cli-ux';
import { PrototypeProperties } from 'utils/decorators/helpers';

/**
 * Class Core
 * @class Core
 */
@PrototypeProperties({ uxOptions: { stdout: true } })
export class Core {
	/**
	 * synapse Configuration Output
	 * @type synapse.Synapse
	 */
	static get output() {
		return synapse;
	}

	/**
	 * Retrieve Banner Defaults
	 * @returns {object}
	 */
	static getBannerDefaults() {
		const currentYear = new Date().getFullYear();
		return { version: 'v[notAvailable]', year: (currentYear === 2020) ? currentYear : `2020-${currentYear}` };
	}

	/**
	 * Render Synapse Banner to the stdout
	 * @returns Core
	 */
	banner(options = {}) {
		const model = accept(options, ['version', 'url', 'year'], Core.getBannerDefaults());
		if (isProduction()) {
			console.log(colors.cyan(_.template(Core.output.banner)(model)));
		}
	}

	/**
	 * Default strategy that handles progress status
	 * @param {@oclif.command.Command} command
	 * @param {string} message
	 * @param {string} status
	 * @returns Promise<@oclif.command.Command>
	 */
	onProgress(command, message = '', status) {
		dev(`${command.toString()} - Progress: ${message} - ${status}`);
		if (isProduction() && defined(message) && defined(status)) {
			ux.action.start(message, status, this.uxOptions);
		}
		return command;
	}

	/**
	 * Default strategy that handles success status
	 * @param {@oclif.command.Command} command
	 * @param {string} message
	 * @returns Promise<@oclif.command.Command>
	 */
	onSuccess(command, message) {
		dev(`${command.toString()} - Success: ${message}`);
		if (isProduction()) {
			ux.action.stop(message || '');
		}
		return command;
	}

	/**
	 * Default strategy that handles error status
	 * @param {string|Error} error
	 * @param {@oclif.command.Command} command
	 * @param {{ code?: number }} [options = {}]
	 * @return void
	 */
	onError(error, command, options = {}) {
		dev('%o', error);
		if (isProduction()) {
			ux.action.stop(`${error.message}${defined(options.code) ? ' - Code: ' + options.code : ''}`);
		}
		err(error);
		command.exit(options.code);
	}
}

export default new Core();
