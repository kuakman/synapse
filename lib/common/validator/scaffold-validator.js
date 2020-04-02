/**
 * @module common.validator
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */

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
 * @param {Function} method
 * @returns {Function}
 */
export const ConfigurationValidator = (method) => {
	// TODO
	console.log(this, method);
	return method;
};

/**
 * Archetype Validator
 * @param {Function} method
 * @returns {Function}
 */
export const ArchetypeValidator = (method) => {
	// TODO
	console.log(this, method);
	return method;
};

/**
 * Init Process Validator
 * @param {Function} method
 * @returns {Function}
 */
export const InitProcessValidator = (method) => {
	// TODO
	console.log(this, method);
	return method;
};
