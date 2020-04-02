/**
 * Default Injector Configure
 * @version 1.0.0
 * @author Patricio Ferreira <3dimentionar@gmail.com
 */
import server from './config/server.json';
import plugins from './config/plugins.json';
import templates from './config/templates.json';
import environments from './config/environments.json';

export const configure = {
	config: {
		source: './src', // 1. Question
		target: './public', // 2. Question,
		server, // 3. Dev Server
		plugins,
		templates,
		environments
	},
	dependencies: {
		nunjucks: '3.2.0',
		rollup: '1.6.0',
		'rollup-plugin-commonjs': '9.2.1',
		'rollup-plugin-includepaths': '0.2.3',
		'rollup-plugin-node-resolve': '4.0.1',
		'serve-handler': '5.0.8',
		systemjs: '6.0.0',
		'systemjs-hmr': '2.0.9'
	},
	scripts: { // Optional Overrides
		// Start
		'pre-start': null,
		// Configuration Parsing
		'pre-config': null,
		config: null, // Non-Overridable
		'post-config': null,
		// Optional Clean
		'pre-clean': null,
		clean: null,
		'post-clean': null,
		// Environment Execution
		// Unit Testing Env
		'pre-test': null,
		test: null,
		'post-test': null,
		// Development Env
		'pre-dev': null,
		dev: null,
		'post-dev': null,
		// Production Env
		'pre-prod': null,
		prod: null,
		'post-prod': null,
		// Serve
		'pre-serve': null,
		serve: null,
		'post-serve': null,
		// Release
		'pre-release': null,
		release: null,
		'post-release': null,
		// End
		'post-end': null
	}
};
