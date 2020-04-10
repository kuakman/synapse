/**
 * @module common.scaffold.validator
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { dev } from 'utils/debug/debug';
/**
 *  this.onProgress('Validating Configuration....', 'Progress');
		if (!defined(this.package)) {
			this.onError(new Error('package.json is not valid'));
		} else if (!defined(this.package.synapse)) {
			// TODO
		}
		return this.onSuccess('Valid Configuration.');
 **/

/**
 * Configuration Validator
 * @param {commands.InitCommand} command
 * @returns {commands.InitCommand}
 */
export const ConfigurationValidator = (command) => {
	dev('o%', command.flags);
	return command;
};

/**
 * Archetype Validator
 * @param {commands.InitCommand} command
 * @returns {commands.InitCommand}
 */
export const ArchetypeValidator = (command) => {
	// TODO
	return command;
};

/**
 * Init Process Validator
 * @param {commands.InitCommand} command
 * @returns {commands.InitCommand}
 */
export const InitProcessValidator = (command) => {
	// TODO
	return command;
};
