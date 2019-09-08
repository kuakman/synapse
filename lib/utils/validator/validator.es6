/**
 * Validation Utils
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import _ from 'underscore';

/**
 * Returns true if a given list of option names exists in the arguments object passed by parameter
 * false otherwise.
 * @param {object} args
 * @param {string[]} optionNames
 * @return {boolean}
 */
export const required = (args, ...optionNames) => {
	const argNames = _.keys(args);
	return _.every(optionNames, (name) => argNames.includes(name));
};
