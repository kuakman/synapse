/**
 * @module common.scaffold.transformer
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import _ from 'underscore';
import * as enq from 'enquirer';
import { defined } from 'utils/utils';

/**
 * Enquirer Prompt Type list
 * @type {object}
 */
export const PromptTypes = Object.keys(enq).reduce((memo, name) => {
	if (name.indexOf('Prompt') === -1) memo[name] = name;
	return memo;
}, {});

/**
 * OLFIf Flag Types
 * @type {string[]}
 */
const oclifTypes = [
	'char',
	'input',
	'description',
	'hidden',
	'multiple',
	'options',
	'default',
	'required',
	'parse',
	'env',
	'dependsOn',
	'exclusive'
];

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
	const { type } = option, types = Object.keys(PromptTypes);
	return defined(type) && types.includes(type) ? { type } : { type: 'text' };
};

/**
 * Resolves Question Message
 * @param {string} name
 * @param {object} option
 * @returns {object}
 */
const resolveMessage = (name, option) => {
	const { description, message } = option;
	return { message: defined(message) ? message : description };
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
 * Creates Question from oclif flags
 * @param {string} name
 * @param {object} option
 * @returns {object}
 */
const createQuestion = (name, option) => {
	return _.omit(extend(true,
		option,
		resolveName(name),
		resolveType(name, option),
		resolveMessage(name, option),
		resolveDefault(name, option)
	), ...oclifTypes);
};

export const Enquirer = {
	createQuestion,
	resolveName,
	resolveMessage,
	resolveType,
	resolveDefault
};
