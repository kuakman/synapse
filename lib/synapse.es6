#!/usr/bin/env node
/**
 * Main CLI
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import 'supports-color';
import _ from 'underscore';
import { Args } from 'args';
import examples from './utils/examples';
import { dev } from './utils/debug';

const execute = (options = {}) => {
	// console.log(options);
};

export default (opts = {}, ...args) => {
	const options = new Args()
		.command('init', 'Bootstrap and initializes a project', require('./commands/init').init, ['i'])
		.command('run', 'Executes Project pipeline', require('./commands/run').run, ['r'])
		.command('clean', 'Flag that cleans directories and bundle builds.', require('./commands/clean').clean, ['c'])
		.examples(examples)
		.parse(args || process.argv, _.extend(opts, { name: 'Synapse', version: false }));
	dev('Synapse Options: %o', options);
	return options;
};
