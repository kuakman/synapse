/**
 * @module common.scaffold.transformer
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import { defined } from 'utils/utils';

/**
 * Inquirer Types
 * @type {object}
 */
const TYPES = {
	input: 'input',
	number: 'number',
	confirm: 'confirm',
	list: 'list',
	rawList: 'rawlist',
	expand: 'expand',
	checkbox: 'checkbox',
	password: 'password',
	editor: 'editor'
};

/**
 * Resolves name, description and default value for question
 * @param {string} name
 * @returns {object}
 */
const resolveName = (name) => {
	return { name };
};

/**
 * Resolves Question Type of answer
 * @param {string} name
 * @param {object} option
 * @returns {object}
 */
const resolveType = (name, option) => {
	const { type } = option, types = Object.keys(TYPES);
	return defined(type) && types.includes(type) ? { type } : { type: 'input' };
};

/**
 * Resolves Question Message
 * @param {string} name
 * @param {object} option
 * @returns {object}
 */
const resolveMessage = (name, option) => {
	let { description, defaultMessage } = option;
	defaultMessage = defined(defaultMessage) ? defaultMessage : 'Select Option';
	return { message: defined(description) ? description : defaultMessage };
};

/**
 * Resolves Question Default value
 * @param {string} name
 * @param {object} option
 * @returns {object}
 */
const resolveDefault = (name, option) => {
	return defined(option.default) ? { default: option.default } : {};
};

/**
 * Resolves Question choices
 * @param {string} name
 * @param {object} option
 * @returns {object}
 */
const resolveChoices = (name, option) => {
	const { options } = option;
	if (defined(options) && Array.isArray(options)) {
		return { choices: options };
	}
	return {};
};

/**
 * Resolves Question Validation
 * @param {string} name
 * @param {object} option
 * @returns {object}
 */
const resolveValidate = (name, option) => {
	const { validate } = option;
	return defined(validate) && typeof validate === 'function' ? { validate } : {};
};

/**
 * Creates Question from oc
 * @param {string} name
 * @param {object} option
 * @returns {object}
 */
const createQuestion = (name, option) => {
	return extend(true,
		resolveName(name, option),
		resolveMessage(name, option),
		resolveDefault(name, option),
		resolveChoices(name, option),
		resolveValidate(name, option)
	);
};

export const Inquirer = { createQuestion, resolveName, resolveMessage, resolveDefault, resolveType, resolveChoices, resolveValidate };
