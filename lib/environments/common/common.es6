/**
 * Common Template
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import server from './templates/server.json';
import plugins from './templates/plugins.json';
import html from './templates/html.json';
import environments from './templates/environments.json';

export default {
	synapse: {
		source: './src',
		target: './public',
		system: './js/system.config.js',
		server,
		plugins,
		html,
		environments
	}
};
