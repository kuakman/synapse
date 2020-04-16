/**
 * @module common.scaffold.validator
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import _ from 'underscore';
import { defined } from 'utils/utils';

/**
 * Configuration Validator
 * @param {commands.InitCommand} command
 * @returns {object}
 */
export const ConfigurationValidator = (command) => {
	const { flags } = command;
	return defined(flags.config) && !_.isEmpty(flags.config) ? flags.config : null;
};

/**
 * Realtime Validator
 * @param {commands.InitCommand} command
 * @returns {object}
 */
export const RealtimeValidator = (command) => {
	const { flags } = command;
	return defined(flags.realtime) ? flags.realtime : null;
};

/**
 * Archetype Validator
 * @param {commands.InitCommand} command
 * @returns {object}
 */
export const ArchetypeValidator = (command) => {
	const { flags, availableArchetypes } = command;
	if (!defined(flags.archetypes) || _.isEmpty(flags.archetypes)) return null;
	const allValid = availableArchetypes.containsAll(flags.archetypes, (c, g) => `${c.type}:${c.name}` === g);
	return allValid ? flags.archetypes : null;
};
