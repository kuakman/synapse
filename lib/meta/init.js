import { flags } from '@oclif/command';

export default {
	flags: {
		config: flags.string({
			char: 'c',
			description: 'Select Configuration',
			hidden: false,
			multiple: true,
			env: 'SYNAPSE:INIT',
			options: ['realtime', 'remote', 'file', 'package'],
			default: 'package',
			required: false
		}),
		archetypes: flags.string({
			char: 'a',
			description: 'Select Archetypes',
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
		'$ synapse init -c=package -c=remote -a=backend:static-server'
	],
	usage: 'synapse init --config [realtime|remote|file|package] --archetype [name]',
	description: 'Initializes synapse configuration in your project.'
};
