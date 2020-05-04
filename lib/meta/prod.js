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
		}),
		release: flags.boolean({
			char: 'r',
			description: 'Release',
			hidden: false,
			multiple: false,
			env: 'SYNAPSE:RELEASE',
			default: false,
			required: false
		})
	},
	hidden: false,
	examples: [
		'$ synapse prod',
		'$ synapse prod --c',
		'$ synapse prod --c --release'
	],
	usage: 'synapse prod [--c|--r]',
	description: 'Runs application in production environment. If --release is specified, only the build will be performed.'
};
