import { flags } from '@oclif/command';

export default {
	flags: {
		config: flags.string({
			char: 'c',
			description: 'Where synapse configuration will be stored',
			hidden: false,
			env: 'SYNAPSE:INIT',
			options: ['file', 'package'],
			default: null,
			required: false
		}),
		archetypes: flags.string({
			char: 'a',
			description: 'Archetypes to install',
			hidden: false,
			multiple: true,
			env: 'SYNAPSE:INIT',
			default: 'backend:static-server',
			required: false
		})
	},
	hidden: false,
	examples: [
		'$ synapse init',
		'$ synapse init -c=file -c=remote',
		'$ synapse init -c=package -r -a=backend:static-server -a=frontend:cloud -a=testing:mocha-sinon-chai'
	],
	usage: 'synapse init --config [realtime|remote|file|package] --archetype [name]',
	description: 'Initializes synapse configuration in your project.'
};
