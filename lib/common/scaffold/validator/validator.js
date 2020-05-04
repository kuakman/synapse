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
	const { flags, availableArchetypes } = command, { archetypes } = flags;
	if (!defined(archetypes) || _.isEmpty(archetypes)) return null;
	const selected = availableArchetypes.filter((c) => archetypes.includes(`${c.type}:${c.name}`));
	return selected.length === archetypes.length ? selected : null;
};
