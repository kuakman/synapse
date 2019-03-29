/**
 * CLI
 */
import args from 'args';
import examples from './utils/examples';
import debug from './utils/debug';

const options = args
	.command('init', 'Bootstrap and initializes a project', require('./commands/init').init, ['i'])
	.command('run', 'Executes Project pipeline', require('./commands/run').run, ['r'])
	.command('clean', 'Flag that cleans directories and bundle builds.', require('./commands/clean').clean, ['c'])
	.option('env', 'Environment', 'all')
	.examples(examples)
	.parse(process.argv);

debug('Options %o', options);
