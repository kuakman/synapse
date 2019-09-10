/**
 * Configuration Template
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import server from './templates/server.json';
import plugins from './templates/plugins.json';
import templates from './templates/templates.json';
import environments from './templates/environments.json';

export default {
	config: {
		source: './src', // 1. Question
		target: './public', // 2. Question,
		server, // 3. Dev Server
		plugins,
		templates,
		environments
	},
	scripts: { // Optional Overrides
		// Start
		'pre-start': null,
		// Configuration Parsing
		'pre-config': null,
		'config': null, // Non-Overridable
		'post-config': null,
		// Optional Clean
		'pre-clean': null,
		'clean': null,
		'post-clean': null,
		// Environment Execution
		// Unit Testing Env
		'pre-test': null,
		'test': null,
		'post-test': null,
		// Development Env
		'pre-dev': null,
		'dev': null,
		'post-dev': null,
		// Production Env
		'pre-prod': null,
		'prod': null,
		'post-prod': null,
		// Serve
		'pre-serve': null,
		'serve': null,
		'post-serve': null,
		// Release
		'pre-release': null,
		'release': null,
		'post-release': null,
		// End
		'post-end': null
	}
};
