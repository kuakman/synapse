import { flags } from '@oclif/command';

export default {
	args: [],
	flags: {
		clean: flags.boolean({
			char: 'c',
			description: 'Clean',
			hidden: false,
			multiple: false,
			env: 'SYNAPSE:CLEAN',
			default: false,
			required: false
		})
	},
	hidden: false,
	examples: [
		'$ synapse test',
		'$ synapse test --c'
	],
	usage: 'synapse test [--c]',
	description: 'Runs application in test environment.'
};
