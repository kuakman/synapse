import { flags } from '@oclif/command';

export default {
	args: [],
	flags: {
		env: flags.boolean({
			char: '',
			description: 'All',
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
