'use strict';
require('@babel/register')({ cache: false });

/**
 * Mocha Configuration
 */
module.exports = {
	require: [
		'json5/lib/register',
		'chai/register-assert',
		'./test/globals'
	],
	ui: 'bdd',
	diff: true,
	extension: ['js', 'json5'],
	'inline-diffs': true,
	timeout: 2000,
	reporter: 'spec',
	'watch-files': ['lib/**/*.js', 'test/**/*.js']
};
